"use server"

import { revalidatePath } from "next/cache"
import { z } from "zod"
import { UserService } from "@/services/user.service"
import { SessionService } from "@/lib/auth/session"
import { logger } from "@/lib/logger"
import { handleError, AppError } from "@/lib/errors"
import { cookies } from "next/headers"
import { JwtService } from "@/lib/auth/jwt"
import { prisma } from "@/lib/db/client"
import { PasswordService } from "@/lib/auth/password"
import { TwoFactorType } from "@prisma/client"
import { TOTPService } from "@/services/totp.service"

// Define the state types
export type AuthState = {
  success: boolean
  errors?: Record<string, string[]>
  requiresTwoFactor?: boolean
  userId?: string
  twoFactorMethod?: {
    id: string
    type: TwoFactorType
  }
}

// Validation schemas
const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
})

const registerSchema = z
  .object({
    name: z.string().min(2, { message: "Name must be at least 2 characters" }),
    email: z.string().email({ message: "Please enter a valid email address" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
      .regex(/[0-9]/, { message: "Password must contain at least one number" })
      .regex(/[^a-zA-Z0-9]/, { message: "Password must contain at least one special character" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
})

const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
      .regex(/[0-9]/, { message: "Password must contain at least one number" })
      .regex(/[^a-zA-Z0-9]/, { message: "Password must contain at least one special character" }),
    confirmPassword: z.string(),
    token: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

/**
 * Helper function to safely handle errors
 */
function safeHandleError(error: unknown) {
  if (error instanceof Error || error instanceof AppError) {
    return handleError(error)
  } else {
    // If it's not an Error or AppError, create a generic error
    logger.error("Unknown error type", { error })
    return handleError(new Error(String(error)))
  }
}

/**
 * Optimized login action
 */
export async function login(prevState: AuthState, formData: FormData): Promise<AuthState> {
  try {
    // Validate form data
    const validatedFields = loginSchema.safeParse({
      email: formData.get("email"),
      password: formData.get("password"),
    })

    if (!validatedFields.success) {
      return {
        success: false,
        errors: validatedFields.error.flatten().fieldErrors,
      }
    }

    const { email, password } = validatedFields.data

    // Find the user with a single optimized query
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        password: true,
        isActive: true,
        isLocked: true,
        loginAttempts: true,
        failedLoginAt: true,
        twoFactorMethods: {
          where: {
            OR: [{ isPrimary: true }, { isPrimary: false }],
          },
          orderBy: {
            isPrimary: "desc",
          },
          take: 1,
        },
      },
    })

    if (!user) {
      return {
        success: false,
        errors: {
          email: ["Invalid email or password"],
        },
      }
    }

    // Check if the user is active
    if (!user.isActive) {
      return {
        success: false,
        errors: {
          email: ["This account has been deactivated"],
        },
      }
    }

    // Check if the account is locked
    if (user.isLocked) {
      const lockoutDuration = 15 * 60 * 1000 // 15 minutes in milliseconds
      const lockoutExpires = user.failedLoginAt ? new Date(user.failedLoginAt.getTime() + lockoutDuration) : new Date()

      if (lockoutExpires > new Date()) {
        return {
          success: false,
          errors: {
            email: ["This account is temporarily locked. Please try again later."],
          },
        }
      }

      // If the lockout period has expired, unlock the account
      await prisma.user.update({
        where: { id: user.id },
        data: {
          isLocked: false,
          loginAttempts: 0,
        },
      })
    }

    // Verify the password
    const isPasswordValid = await PasswordService.verify(password, user.password)
    if (!isPasswordValid) {
      // Increment login attempts
      const loginAttempts = (user.loginAttempts || 0) + 1
      const updateData: any = {
        loginAttempts,
        failedLoginAt: new Date(),
      }

      // Lock the account after too many failed attempts
      if (loginAttempts >= 5) {
        updateData.isLocked = true
      }

      await prisma.user.update({
        where: { id: user.id },
        data: updateData,
      })

      return {
        success: false,
        errors: {
          email: ["Invalid email or password"],
        },
      }
    }

    // Reset login attempts since password is valid
    await prisma.user.update({
      where: { id: user.id },
      data: {
        loginAttempts: 0,
      },
    })

    // Check if two-factor authentication is enabled
    const twoFactorMethod = user.twoFactorMethods[0]

    if (twoFactorMethod) {
      // Handle 2FA based on the method type
      switch (twoFactorMethod.type) {
        case TwoFactorType.EMAIL:
          await generateAndSendEmailOTP(user.id, user.email, twoFactorMethod.id)
          break
        case TwoFactorType.SMS:
          // In a real implementation, you would fetch the user's phone number
          // await generateAndSendSMSOTP(user.id, userPhoneNumber, twoFactorMethod.id)
          break
        case TwoFactorType.TOTP:
        case TwoFactorType.AUTHENTICATOR:
          // For TOTP/Authenticator, we don't need to generate anything
          // The user will provide the code from their authenticator app
          break
      }

      // Return state indicating 2FA is required
      return {
        success: false,
        requiresTwoFactor: true,
        userId: user.id,
        twoFactorMethod: {
          id: twoFactorMethod.id,
          type: twoFactorMethod.type,
        },
      }
    }

    // If 2FA is not enabled, proceed with normal login
    return await completeLogin(user.id)
  } catch (error) {
    logger.error("Login error", { error })
    const { body } = safeHandleError(error)

    return {
      success: false,
      errors: {
        email: [body.error.message],
      },
    }
  }
}

// Function to generate and send Email OTP
async function generateAndSendEmailOTP(userId: string, email: string, methodId: string) {
  // Generate a 6-digit OTP code
  const otpCode = Math.floor(100000 + Math.random() * 900000).toString()

  // Store the OTP in the database with expiration (10 minutes)
  await prisma.twoFactorToken.create({
    data: {
      userId,
      methodId,
      token: await PasswordService.hash(otpCode),
      expiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes
    },
  })

  // In production, send the OTP via email
  // For development, log it to console
  if (process.env.NODE_ENV === "development") {
    console.log(`[DEV ONLY] Email OTP for ${email}: ${otpCode}`)
  } else {
    // Send email with OTP
    // await EmailService.sendOTP(email, otpCode)
  }
}

// Function to generate and send SMS OTP
async function generateAndSendSMSOTP(userId: string, phoneNumber: string, methodId: string) {
  // Generate a 6-digit OTP code
  const otpCode = Math.floor(100000 + Math.random() * 900000).toString()

  // Store the OTP in the database with expiration (10 minutes)
  await prisma.twoFactorToken.create({
    data: {
      userId,
      methodId,
      token: await PasswordService.hash(otpCode),
      expiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes
    },
  })

  // In production, send the OTP via SMS
  // For development, log it to console
  if (process.env.NODE_ENV === "development") {
    console.log(`[DEV ONLY] SMS OTP for ${phoneNumber}: ${otpCode}`)
  } else {
    // Send SMS with OTP
    // await SMSService.sendOTP(phoneNumber, otpCode)
  }
}

// Function to verify OTP or TOTP
export async function verifyTwoFactor(prevState: AuthState, formData: FormData): Promise<AuthState> {
  try {
    const userId = formData.get("userId") as string
    const methodId = formData.get("methodId") as string
    const code = formData.get("code") as string
    const methodType = formData.get("methodType") as TwoFactorType

    if (!userId || !methodId || !code || !methodType) {
      return {
        success: false,
        errors: {
          code: ["Invalid verification code"],
        },
      }
    }

    // Get the 2FA method
    const twoFactorMethod = await prisma.twoFactorMethod.findUnique({
      where: {
        id: methodId,
        userId,
      },
    })

    if (!twoFactorMethod) {
      return {
        success: false,
        errors: {
          code: ["Invalid authentication method"],
        },
      }
    }

    let isCodeValid = false

    // Verify based on method type
    switch (methodType) {
      case TwoFactorType.EMAIL:
      case TwoFactorType.SMS:
        // For Email and SMS, verify against stored OTP
        isCodeValid = await verifyOTP(userId, methodId, code)
        break

      case TwoFactorType.TOTP:
      case TwoFactorType.AUTHENTICATOR:
        // For TOTP/Authenticator, verify against the secret
        isCodeValid = TOTPService.verify({
          token: code,
          secret: twoFactorMethod.secret,
        })
        break
    }

    if (!isCodeValid) {
      return {
        success: false,
        errors: {
          code: ["Invalid verification code"],
        },
      }
    }

    // Update last used timestamp
    await prisma.twoFactorMethod.update({
      where: {
        id: methodId,
      },
      data: {
        lastUsedAt: new Date(),
      },
    })

    // Complete the login process
    return await completeLogin(userId)
  } catch (error) {
    logger.error("Two-factor verification error", { error })
    const { body } = safeHandleError(error)

    return {
      success: false,
      errors: {
        code: [body.error.message],
      },
    }
  }
}

// Function to verify OTP
async function verifyOTP(userId: string, methodId: string, otpCode: string): Promise<boolean> {
  // Find the most recent non-expired OTP for this user and method
  const twoFactorToken = await prisma.twoFactorToken.findFirst({
    where: {
      userId,
      methodId,
      expiresAt: {
        gt: new Date(),
      },
      used: false,
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  if (!twoFactorToken) {
    return false
  }

  // Verify the OTP
  const isOTPValid = await PasswordService.verify(otpCode, twoFactorToken.token)

  if (isOTPValid) {
    // Mark the token as used
    await prisma.twoFactorToken.update({
      where: {
        id: twoFactorToken.id,
      },
      data: {
        used: true,
      },
    })
  }

  return isOTPValid
}

// Function to complete the login process
async function completeLogin(userId: string): Promise<AuthState> {
  // Generate JWT token
  const token = await JwtService.generateToken({ userId })

  // Store the token in a cookie
  const cookieStore = await cookies()
  cookieStore.set("session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: "/",
    sameSite: "lax",
  })

  // Update user login info and create refresh token in parallel
  await Promise.all([
    // Update user login info
    prisma.user.update({
      where: { id: userId },
      data: {
        lastLoginAt: new Date(),
        lastActivityAt: new Date(),
      },
    }),

    // Create refresh token
    prisma.refreshToken.create({
      data: {
        userId,
        token: await PasswordService.hash(token),
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
      },
    }),

    // Create audit log
    prisma.auditLog.create({
      data: {
        action: "LOGIN",
        userId,
        ipAddress: "127.0.0.1", // In production, get the real IP
        userAgent: "Unknown", // In production, get the real user agent
      },
    }),
  ])

  // Revalidate the dashboard path
  revalidatePath("/dashboard")

  return { success: true }
}

/**
 * Register action
 */
export async function register(prevState: AuthState, formData: FormData): Promise<AuthState> {
  try {
    // Validate form data
    const validatedFields = registerSchema.safeParse({
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirm-password"),
    })

    if (!validatedFields.success) {
      return {
        success: false,
        errors: validatedFields.error.flatten().fieldErrors,
      }
    }

    const { name, email, password } = validatedFields.data

    // Create the user
    const user = await UserService.create({
      email,
      password,
      fullName: name,
    })

    // Create a session
    await SessionService.createSession(user.id)

    // Revalidate the dashboard path
    revalidatePath("/dashboard")

    // Return success
    return { success: true }
  } catch (error) {
    logger.error("Registration error", { error })
    const { body } = safeHandleError(error)

    return {
      success: false,
      errors: {
        email: [body.error.message],
      },
    }
  }
}

/**
 * Logout action
 */
export async function logout() {
  try {
    await SessionService.clearSession()
    revalidatePath("/")
    return { success: true }
  } catch (error) {
    logger.error("Logout error", { error })
    return {
      success: false,
      error: "Failed to log out",
    }
  }
}

/**
 * Request password reset action
 */
export async function requestPasswordReset(prevState: AuthState, formData: FormData): Promise<AuthState> {
  try {
    // Validate form data
    const validatedFields = forgotPasswordSchema.safeParse({
      email: formData.get("email"),
    })

    if (!validatedFields.success) {
      return {
        success: false,
        errors: validatedFields.error.flatten().fieldErrors,
      }
    }

    const { email } = validatedFields.data

    // Request password reset
    await UserService.requestPasswordReset(email)

    // Always return success, even if the email doesn't exist (for security reasons)
    return { success: true }
  } catch (error) {
    logger.error("Password reset request error", { error })

    // For security reasons, we don't want to reveal if the email exists or not
    // So we still return success even if there's an error
    return { success: true }
  }
}

/**
 * Reset password action
 */
export async function resetPassword(prevState: AuthState, formData: FormData): Promise<AuthState> {
  try {
    // Validate form data
    const validatedFields = resetPasswordSchema.safeParse({
      password: formData.get("password"),
      confirmPassword: formData.get("confirm-password"),
      token: formData.get("token"),
    })

    if (!validatedFields.success) {
      return {
        success: false,
        errors: validatedFields.error.flatten().fieldErrors,
      }
    }

    const { password, token } = validatedFields.data

    // Reset the password
    await UserService.resetPassword(token, password)

    return { success: true }
  } catch (error) {
    logger.error("Password reset error", { error })
    const { body } = safeHandleError(error)

    return {
      success: false,
      errors: {
        password: [body.error.message],
      },
    }
  }
}
