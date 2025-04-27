import { prisma } from "@/lib/db/client"
import { PasswordService } from "@/lib/auth/password"
import { SessionService } from "@/lib/auth/session"
import { logger } from "@/lib/logger"
import {
  NotFoundError,
  ConflictError,
  InvalidCredentialsError,
  AccountLockedError,
  AccountInactiveError,
  ValidationError,
} from "@/lib/errors"
import { auth } from "@/config"
import { v4 as uuidv4 } from "uuid"

/**
 * User service for managing users
 */
export class UserService {
  /**
   * Find a user by ID
   */
  static async findById(id: string) {
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        fullName: true,
        avatar: true,
        isActive: true,
        isVerified: true,
        createdAt: true,
        updatedAt: true,
      },
    })

    if (!user) {
      throw new NotFoundError("User not found")
    }

    return user
  }

  /**
   * Find a user by email
   */
  static async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      throw new NotFoundError("User not found")
    }

    return user
  }

  /**
   * Create a new user
   */
  static async create(data: {
    email: string
    password: string
    fullName: string
  }) {
    // Check if the email is already in use
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    })

    if (existingUser) {
      throw new ConflictError("Email is already in use")
    }

    // Hash the password
    const hashedPassword = await PasswordService.hash(data.password)

    // Create the user
    const user = await prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
        fullName: data.fullName,
        isActive: true,
      },
    })

    // Create an audit log
    await prisma.auditLog.create({
      data: {
        action: "REGISTER",
        userId: user.id,
        ipAddress: "127.0.0.1", // In production, get the real IP
        userAgent: "Unknown", // In production, get the real user agent
      },
    })

    return user
  }

  /**
   * Authenticate a user
   */
  static async authenticate(email: string, password: string) {
    // Find the user
    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      throw new InvalidCredentialsError()
    }

    // Check if the user is active
    if (!user.isActive) {
      throw new AccountInactiveError()
    }

    // Check if the account is locked
    if (user.isLocked) {
      // Check if the lockout period has expired
      // Since there's no lockedUntil field, we'll calculate it based on failedLoginAt
      if (user.failedLoginAt) {
        const lockoutDuration = auth.lockoutDuration * 1000 // Convert to milliseconds
        const lockoutExpires = new Date(user.failedLoginAt.getTime() + lockoutDuration)

        if (lockoutExpires > new Date()) {
          throw new AccountLockedError()
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
      if (loginAttempts >= auth.maxLoginAttempts) {
        updateData.isLocked = true
      }

      await prisma.user.update({
        where: { id: user.id },
        data: updateData,
      })

      throw new InvalidCredentialsError()
    }

    // Reset login attempts and update last login
    await prisma.user.update({
      where: { id: user.id },
      data: {
        loginAttempts: 0,
        lastLoginAt: new Date(),
        lastActivityAt: new Date(),
      },
    })

    // Create a session
    const session = await SessionService.createSession(user.id)

    if (!session.success) {
      throw new Error(session.error || "Failed to create session")
    }

    // Create an audit log
    await prisma.auditLog.create({
      data: {
        action: "LOGIN",
        userId: user.id,
        ipAddress: "127.0.0.1", // In production, get the real IP
        userAgent: "Unknown", // In production, get the real user agent
      },
    })

    return user
  }

  /**
   * Update a user
   */
  static async update(id: string, data: Partial<{ fullName: string; email: string }>) {
    // Check if the email is already in use
    if (data.email) {
      const existingUser = await prisma.user.findFirst({
        where: {
          email: data.email,
          id: {
            not: id,
          },
        },
      })

      if (existingUser) {
        throw new ConflictError("Email is already in use")
      }
    }

    // Update the user
    const user = await prisma.user.update({
      where: { id },
      data,
    })

    return user
  }

  /**
   * Change a user's password
   */
  static async changePassword(id: string, currentPassword: string, newPassword: string) {
    // Find the user
    const user = await prisma.user.findUnique({
      where: { id },
    })

    if (!user) {
      throw new NotFoundError("User not found")
    }

    // Verify the current password
    const isPasswordValid = await PasswordService.verify(currentPassword, user.password)

    if (!isPasswordValid) {
      throw new InvalidCredentialsError("Current password is incorrect")
    }

    // Hash the new password
    const hashedPassword = await PasswordService.hash(newPassword)

    // Update the user
    await prisma.user.update({
      where: { id },
      data: {
        password: hashedPassword,
        lastPasswordChangeAt: new Date(), // Changed from passwordChangedAt to match your schema
      },
    })

    // Create an audit log
    await prisma.auditLog.create({
      data: {
        action: "PASSWORD_CHANGE",
        userId: user.id,
        ipAddress: "127.0.0.1", // In production, get the real IP
        userAgent: "Unknown", // In production, get the real user agent
      },
    })

    return { success: true }
  }

  /**
   * Request a password reset
   */
  static async requestPasswordReset(email: string) {
    // Find the user
    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      // Don't reveal that the user doesn't exist
      return { success: true }
    }

    // Generate a reset token
    const resetToken = uuidv4()
    const hashedResetToken = await PasswordService.hash(resetToken)

    // Create a session for password reset
    // Since there's no PasswordReset model, we'll use the Session model
    await prisma.session.create({
      data: {
        userId: user.id,
        token: hashedResetToken,
        expiresAt: new Date(Date.now() + auth.passwordResetExpiresIn * 1000),
      },
    })

    // In a real application, you would send an email with the reset link
    // For now, we'll just log it
    logger.info(`Password reset token for ${email}: ${resetToken}`)

    return { success: true }
  }

  /**
   * Reset a password
   */
  static async resetPassword(token: string, newPassword: string) {
    // Find the reset token in sessions
    const sessions = await prisma.session.findMany({
      where: {
        expiresAt: {
          gt: new Date(),
        },
      },
      include: {
        user: true,
      },
    })

    // Find a matching token
    const matchingSession = await Promise.all(
      sessions.map(async (session) => {
        const isMatch = await PasswordService.verify(token, session.token)
        return isMatch ? session : null
      }),
    ).then((results) => results.find((result) => result !== null))

    if (!matchingSession) {
      throw new ValidationError("Invalid or expired reset token")
    }

    // Hash the new password
    const hashedPassword = await PasswordService.hash(newPassword)

    // Update the user
    await prisma.user.update({
      where: { id: matchingSession.userId },
      data: {
        password: hashedPassword,
        lastPasswordChangeAt: new Date(), // Changed from passwordChangedAt to match your schema
      },
    })

    // Delete the used session
    await prisma.session.delete({
      where: {
        id: matchingSession.id,
      },
    })

    // Create an audit log
    await prisma.auditLog.create({
      data: {
        action: "PASSWORD_RESET",
        userId: matchingSession.userId,
        ipAddress: "127.0.0.1", // In production, get the real IP
        userAgent: "Unknown", // In production, get the real user agent
      },
    })

    return { success: true }
  }
}
