"use server"

import { revalidatePath } from "next/cache"
import { prisma } from "@/lib/db/client"
import { SessionService } from "@/lib/auth/session"
import { PasswordService } from "@/lib/auth/password"
import { TwoFactorService } from "@/lib/auth/two-factor"
import { logger } from "@/lib/logger"
import { type TwoFactorType, type SkillLevel, MediaType } from "@prisma/client"
import { v4 as uuidv4 } from "uuid"
import { UAParser } from "ua-parser-js"
import { cookies } from "next/headers"

/**
 * Get the current logged-in user
 */
export async function getCurrentUser() {
  try {
    // Get the session from cookies
    const session = await SessionService.getSession()

    if (!session || !session.userId) {
      return { success: false, user: null }
    }

    // Get the user from the database
    const user = await prisma.user.findUnique({
      where: { id: session.userId },
      select: {
        id: true,
        email: true,
        fullName: true,
        title: true,
        avatar: true,
        coverImage: true,
        timezone: true,
        locale: true,
        isActive: true,
        isVerified: true,
        twoFactorEnabled: true,
        lastLoginAt: true,
        createdAt: true,
      },
    })

    return {
      success: true,
      user,
    }
  } catch (error) {
    logger.error("Error getting current user", { error })
    return { success: false, user: null }
  }
}

/**
 * Get user preferences
 */
export async function getUserPreferences() {
  try {
    const session = await SessionService.getSession()

    if (!session || !session.userId) {
      return { success: false, preferences: {} }
    }

    // Get all user preferences
    const userPreferences = await prisma.userPreference.findMany({
      where: { userId: session.userId },
    })

    // Convert to a key-value object
    const preferences = userPreferences.reduce(
      (acc, pref) => {
        acc[pref.preference] = pref.value
        return acc
      },
      {} as Record<string, string>,
    )

    return { success: true, preferences }
  } catch (error) {
    logger.error("Error getting user preferences", { error })
    return { success: false, preferences: {} }
  }
}

/**
 * Update a user preference
 */
export async function updateUserPreference(preference: string, value: string) {
  try {
    const session = await SessionService.getSession()

    if (!session || !session.userId) {
      return { success: false, error: "Not authenticated" }
    }

    // Upsert the preference (create if it doesn't exist, update if it does)
    await prisma.userPreference.upsert({
      where: {
        userId_preference: {
          userId: session.userId,
          preference,
        },
      },
      update: { value },
      create: {
        userId: session.userId,
        preference,
        value,
      },
    })

    // Create activity log
    await prisma.activityLog.create({
      data: {
        action: "UPDATE",
        entityType: "USER_PREFERENCE",
        entityId: preference,
        userId: session.userId,
      },
    })

    revalidatePath("/settings")
    return { success: true }
  } catch (error) {
    logger.error("Error updating user preference", { error })
    return { success: false, error: "Failed to update preference" }
  }
}

/**
 * Update user profile
 */
export async function updateProfile(data: {
  fullName?: string
  title?: string
  bio?: string
  website?: string
  twitter?: string
}) {
  try {
    const session = await SessionService.getSession()

    if (!session || !session.userId) {
      return { success: false, error: "Not authenticated" }
    }

    // Update the user
    await prisma.user.update({
      where: { id: session.userId },
      data: {
        fullName: data.fullName,
        title: data.title,
        // Note: bio, website, and twitter are not in the schema directly
        // You might want to store these in metadata or create custom fields
        metadata: {
          bio: data.bio,
          website: data.website,
          twitter: data.twitter,
        },
      },
    })

    // Create activity log
    await prisma.activityLog.create({
      data: {
        action: "UPDATE",
        entityType: "USER",
        entityId: session.userId,
        userId: session.userId,
      },
    })

    revalidatePath("/settings")
    return { success: true }
  } catch (error) {
    logger.error("Error updating profile", { error })
    return { success: false, error: "Failed to update profile" }
  }
}

/**
 * Update account settings
 */
export async function updateAccountSettings(data: {
  fullName: string
  language: string
  timezone: string
}) {
  try {
    const session = await SessionService.getSession()

    if (!session || !session.userId) {
      return { success: false, error: "Not authenticated" }
    }

    // Update the user
    await prisma.user.update({
      where: { id: session.userId },
      data: {
        fullName: data.fullName,
        locale: data.language,
        timezone: data.timezone,
      },
    })

    // Create activity log
    await prisma.activityLog.create({
      data: {
        action: "UPDATE",
        entityType: "USER",
        entityId: session.userId,
        userId: session.userId,
      },
    })

    revalidatePath("/settings")
    return { success: true }
  } catch (error) {
    logger.error("Error updating account settings", { error })
    return { success: false, error: "Failed to update account settings" }
  }
}

/**
 * Change password
 */
export async function changePassword(data: {
  currentPassword: string
  newPassword: string
}) {
  try {
    const session = await SessionService.getSession()

    if (!session || !session.userId) {
      return { success: false, error: "Not authenticated" }
    }

    // Get the user
    const user = await prisma.user.findUnique({
      where: { id: session.userId },
      select: { password: true },
    })

    if (!user) {
      return { success: false, error: "User not found" }
    }

    // Verify current password
    const isPasswordValid = await PasswordService.verify(data.currentPassword, user.password)

    if (!isPasswordValid) {
      return { success: false, error: "Current password is incorrect" }
    }

    // Hash the new password
    const hashedPassword = await PasswordService.hash(data.newPassword)

    // Update the password
    await prisma.user.update({
      where: { id: session.userId },
      data: {
        password: hashedPassword,
        lastPasswordChangeAt: new Date(),
      },
    })

    // Create audit log
    await prisma.auditLog.create({
      data: {
        action: "PASSWORD_CHANGE",
        entityType: "USER_ACCOUNT", // Added required field
        entityId: session.userId, // Added required field
        userId: session.userId,
      },
    })

    return { success: true }
  } catch (error) {
    logger.error("Error changing password", { error })
    return { success: false, error: "Failed to change password" }
  }
}

/**
 * Enable two-factor authentication
 */
export async function enableTwoFactor() {
  try {
    const session = await SessionService.getSession()

    if (!session || !session.userId) {
      return { success: false, error: "Not authenticated" }
    }

    // Generate TOTP secret
    const { secret, qrCode } = await TwoFactorService.generateTOTP(session.userId)

    return {
      success: true,
      secret,
      qrCode,
    }
  } catch (error) {
    logger.error("Error enabling two-factor authentication", { error })
    return { success: false, error: "Failed to enable two-factor authentication" }
  }
}

/**
 * Verify two-factor setup
 */
export async function verifyTwoFactorSetup(data: { code: string; secret: string }) {
  try {
    const session = await SessionService.getSession()

    if (!session || !session.userId) {
      return { success: false, error: "Not authenticated" }
    }

    // Verify the code
    const isValid = await TwoFactorService.verifyTOTP(data.code, data.secret)

    if (!isValid) {
      return { success: false, error: "Invalid verification code" }
    }

    // Save the TOTP method
    await prisma.twoFactorMethod.create({
      data: {
        userId: session.userId,
        type: "TOTP",
        secret: data.secret,
        isPrimary: true,
      },
    })

    // Enable 2FA on the user
    await prisma.user.update({
      where: { id: session.userId },
      data: {
        twoFactorEnabled: true,
      },
    })

    // Create audit log
    await prisma.auditLog.create({
      data: {
        action: "TWO_FACTOR_ENABLED",
        entityType: "SECURITY", // Added required field
        entityId: session.userId, // Added required field
        userId: session.userId,
      },
    })

    return { success: true }
  } catch (error) {
    logger.error("Error verifying two-factor setup", { error })
    return { success: false, error: "Failed to verify two-factor setup" }
  }
}

/**
 * Disable two-factor authentication
 */
export async function disableTwoFactor() {
  try {
    const session = await SessionService.getSession()

    if (!session || !session.userId) {
      return { success: false, error: "Not authenticated" }
    }

    // Disable 2FA on the user
    await prisma.user.update({
      where: { id: session.userId },
      data: {
        twoFactorEnabled: false,
      },
    })

    // Delete all 2FA methods
    await prisma.twoFactorMethod.deleteMany({
      where: { userId: session.userId },
    })

    // Create audit log
    await prisma.auditLog.create({
      data: {
        action: "TWO_FACTOR_DISABLED",
        entityType: "SECURITY", // Added required field
        entityId: session.userId, // Added required field
        userId: session.userId,
      },
    })

    return { success: true }
  } catch (error) {
    logger.error("Error disabling two-factor authentication", { error })
    return { success: false, error: "Failed to disable two-factor authentication" }
  }
}

/**
 * Get two-factor methods
 */
export async function getTwoFactorMethods() {
  try {
    const session = await SessionService.getSession()

    if (!session || !session.userId) {
      return { success: false, error: "Not authenticated", methods: [] }
    }

    // Get all 2FA methods
    const methods = await prisma.twoFactorMethod.findMany({
      where: { userId: session.userId },
      orderBy: { createdAt: "desc" },
    })

    return { success: true, methods }
  } catch (error) {
    logger.error("Error getting two-factor methods", { error })
    return { success: false, error: "Failed to get two-factor methods", methods: [] }
  }
}

/**
 * Add two-factor method
 */
export async function addTwoFactorMethod(type: TwoFactorType) {
  try {
    const session = await SessionService.getSession()

    if (!session || !session.userId) {
      return { success: false, error: "Not authenticated" }
    }

    // Check if user already has this type of method
    const existingMethod = await prisma.twoFactorMethod.findFirst({
      where: {
        userId: session.userId,
        type,
      },
    })

    if (existingMethod) {
      return { success: false, error: `You already have a ${type} authentication method` }
    }

    // For TOTP/Authenticator, generate a new secret
    if (type === "TOTP" || type === "AUTHENTICATOR") {
      const { secret, qrCode } = await TwoFactorService.generateTOTP(session.userId)
      return { success: true, secret, qrCode }
    }

    // For SMS and EMAIL, we would typically send a verification code
    // This is a simplified implementation
    const secret = uuidv4()

    // Create the method
    await prisma.twoFactorMethod.create({
      data: {
        userId: session.userId,
        type,
        secret,
        isPrimary: false,
      },
    })

    // Enable 2FA on the user if not already enabled
    await prisma.user.update({
      where: { id: session.userId },
      data: {
        twoFactorEnabled: true,
      },
    })

    // Create audit log
    await prisma.auditLog.create({
      data: {
        action: "TWO_FACTOR_METHOD_ADDED",
        entityType: "SECURITY", // Added required field
        entityId: `2FA_${type}`, // Added required field
        userId: session.userId,
        metadata: { type },
      },
    })

    return { success: true }
  } catch (error) {
    logger.error("Error adding two-factor method", { error })
    return { success: false, error: "Failed to add two-factor method" }
  }
}

/**
 * Remove two-factor method
 */
export async function removeTwoFactorMethod(methodId: string) {
  try {
    const session = await SessionService.getSession()

    if (!session || !session.userId) {
      return { success: false, error: "Not authenticated" }
    }

    // Get the method to check if it's primary
    const method = await prisma.twoFactorMethod.findFirst({
      where: {
        id: methodId,
        userId: session.userId,
      },
    })

    if (!method) {
      return { success: false, error: "Method not found" }
    }

    // Delete the method
    await prisma.twoFactorMethod.delete({
      where: { id: methodId },
    })

    // If it was primary, set another method as primary if available
    if (method.isPrimary) {
      const anotherMethod = await prisma.twoFactorMethod.findFirst({
        where: { userId: session.userId },
      })

      if (anotherMethod) {
        await prisma.twoFactorMethod.update({
          where: { id: anotherMethod.id },
          data: { isPrimary: true },
        })
      } else {
        // If no methods left, disable 2FA
        await prisma.user.update({
          where: { id: session.userId },
          data: { twoFactorEnabled: false },
        })
      }
    }

    // Create audit log
    await prisma.auditLog.create({
      data: {
        action: "TWO_FACTOR_METHOD_REMOVED",
        entityType: "SECURITY", // Added required field
        entityId: methodId, // Added required field
        userId: session.userId,
        metadata: { type: method.type },
      },
    })

    return { success: true }
  } catch (error) {
    logger.error("Error removing two-factor method", { error })
    return { success: false, error: "Failed to remove two-factor method" }
  }
}

/**
 * Set default two-factor method
 */
export async function setDefaultTwoFactorMethod(methodId: string) {
  try {
    const session = await SessionService.getSession()

    if (!session || !session.userId) {
      return { success: false, error: "Not authenticated" }
    }

    // First, set all methods to non-primary
    await prisma.twoFactorMethod.updateMany({
      where: { userId: session.userId },
      data: { isPrimary: false },
    })

    // Then set the selected method as primary
    await prisma.twoFactorMethod.update({
      where: {
        id: methodId,
        userId: session.userId,
      },
      data: { isPrimary: true },
    })

    // Create audit log
    await prisma.auditLog.create({
      data: {
        action: "TWO_FACTOR_DEFAULT_CHANGED",
        entityType: "SECURITY", // Added required field
        entityId: methodId, // Added required field
        userId: session.userId,
      },
    })

    return { success: true }
  } catch (error) {
    logger.error("Error setting default two-factor method", { error })
    return { success: false, error: "Failed to set default two-factor method" }
  }
}

/**
 * Get user sessions
 */
export async function getUserSessions() {
  try {
    const session = await SessionService.getSession()

    if (!session || !session.userId) {
      return { success: false, error: "Not authenticated", sessions: [] }
    }

    // Get all sessions for the user
    const sessions = await prisma.session.findMany({
      where: { userId: session.userId },
      orderBy: { createdAt: "desc" },
    })

    // Get the current session token
    const cookieStore = await cookies()
    const sessionToken = cookieStore.get("session")?.value

    // Map sessions to include user agent info and current session flag
    const mappedSessions = sessions.map((s) => {
      let userAgentInfo = null

      if (s.userAgent) {
        const parser = new UAParser(s.userAgent)
        userAgentInfo = {
          browser: `${parser.getBrowser().name || "Unknown"} ${parser.getBrowser().version || ""}`,
          os: parser.getOS().name || "Unknown",
          device: parser.getDevice().type || "Desktop",
        }
      }

      return {
        ...s,
        userAgent: userAgentInfo,
        isCurrent: s.token === sessionToken,
      }
    })

    return { success: true, sessions: mappedSessions }
  } catch (error) {
    logger.error("Error getting user sessions", { error })
    return { success: false, error: "Failed to get user sessions", sessions: [] }
  }
}

/**
 * Revoke a session
 */
export async function revokeSession(sessionId: string) {
  try {
    const session = await SessionService.getSession()

    if (!session || !session.userId) {
      return { success: false, error: "Not authenticated" }
    }

    // Delete the session
    await prisma.session.delete({
      where: {
        id: sessionId,
        userId: session.userId, // Ensure the session belongs to the user
      },
    })

    // Create audit log
    await prisma.auditLog.create({
      data: {
        action: "SESSION_REVOKED",
        entityType: "SESSION", // Added required field
        entityId: sessionId, // Added required field
        userId: session.userId,
      },
    })

    return { success: true }
  } catch (error) {
    logger.error("Error revoking session", { error })
    return { success: false, error: "Failed to revoke session" }
  }
}

/**
 * Revoke all sessions except the current one
 */
export async function revokeAllSessions() {
  try {
    const session = await SessionService.getSession()

    if (!session || !session.userId) {
      return { success: false, error: "Not authenticated" }
    }

    // Get the current session token
    const cookieStore = await cookies()
    const sessionToken = cookieStore.get("session")?.value

    if (!sessionToken) {
      return { success: false, error: "Current session not found" }
    }

    // Delete all sessions except the current one
    await prisma.session.deleteMany({
      where: {
        userId: session.userId,
        token: { not: sessionToken },
      },
    })

    // Create audit log
    await prisma.auditLog.create({
      data: {
        action: "ALL_SESSIONS_REVOKED",
        entityType: "SESSION", // Added required field
        entityId: session.userId, // Added required field - using userId as the entity ID for "all sessions"
        userId: session.userId,
      },
    })

    return { success: true }
  } catch (error) {
    logger.error("Error revoking all sessions", { error })
    return { success: false, error: "Failed to revoke all sessions" }
  }
}

/**
 * Get social accounts
 */
export async function getSocialAccounts() {
  try {
    const session = await SessionService.getSession()

    if (!session || !session.userId) {
      return { success: false, error: "Not authenticated", accounts: [] }
    }

    // Get all social accounts for the user
    const accounts = await prisma.socialAccount.findMany({
      where: { userId: session.userId },
      orderBy: { createdAt: "desc" },
    })

    return { success: true, accounts }
  } catch (error) {
    logger.error("Error getting social accounts", { error })
    return { success: false, error: "Failed to get social accounts", accounts: [] }
  }
}

/**
 * Connect social account
 * Note: In a real implementation, this would redirect to the OAuth provider
 */
export async function connectSocialAccount(provider: string) {
  try {
    const session = await SessionService.getSession()

    if (!session || !session.userId) {
      return { success: false, error: "Not authenticated" }
    }

    // This is a mock implementation
    // In a real app, you would redirect to the OAuth provider
    // and handle the callback to create the social account

    // For demo purposes, create a mock social account
    const mockSocialAccount = await prisma.socialAccount.create({
      data: {
        userId: session.userId,
        provider,
        providerId: uuidv4(),
        email: `mock-${provider}@example.com`,
        name: `Mock ${provider} User`,
        avatar: null,
        accessToken: "mock-token",
        refreshToken: null,
        expiresAt: new Date(Date.now() + 3600000), // 1 hour from now
      },
    })

    // Create audit log
    await prisma.auditLog.create({
      data: {
        action: "SOCIAL_ACCOUNT_CONNECTED",
        entityType: "SOCIAL_ACCOUNT", // Added required field
        entityId: mockSocialAccount.id, // Added required field
        userId: session.userId,
        metadata: { provider },
      },
    })

    return {
      success: true,
      email: mockSocialAccount.email,
    }
  } catch (error) {
    logger.error("Error connecting social account", { error })
    return { success: false, error: "Failed to connect social account" }
  }
}

/**
 * Disconnect social account
 */
export async function disconnectSocialAccount(accountId: string) {
  try {
    const session = await SessionService.getSession()

    if (!session || !session.userId) {
      return { success: false, error: "Not authenticated" }
    }

    // Get the account to check if it belongs to the user
    const account = await prisma.socialAccount.findFirst({
      where: {
        id: accountId,
        userId: session.userId,
      },
    })

    if (!account) {
      return { success: false, error: "Account not found" }
    }

    // Delete the account
    await prisma.socialAccount.delete({
      where: { id: accountId },
    })

    // Create audit log
    await prisma.auditLog.create({
      data: {
        action: "SOCIAL_ACCOUNT_DISCONNECTED",
        entityType: "SOCIAL_ACCOUNT", // Added required field
        entityId: accountId, // Added required field
        userId: session.userId,
        metadata: { provider: account.provider },
      },
    })

    return { success: true }
  } catch (error) {
    logger.error("Error disconnecting social account", { error })
    return { success: false, error: "Failed to disconnect social account" }
  }
}

/**
 * Get API keys
 */
export async function getApiKeys() {
  try {
    const session = await SessionService.getSession()

    if (!session || !session.userId) {
      return { success: false, error: "Not authenticated", keys: [] }
    }

    // Get all API keys for the user
    const keys = await prisma.aPIKey.findMany({
      where: { userId: session.userId },
      orderBy: { createdAt: "desc" },
    })

    return { success: true, keys }
  } catch (error) {
    logger.error("Error getting API keys", { error })
    return { success: false, error: "Failed to get API keys", keys: [] }
  }
}

/**
 * Create API key
 */
export async function createApiKey(data: {
  name: string
  scopes: string[]
  expiresInDays: number
}) {
  try {
    const session = await SessionService.getSession()

    if (!session || !session.userId) {
      return { success: false, error: "Not authenticated" }
    }

    // Generate a unique API key
    const apiKey = `orb_${uuidv4().replace(/-/g, "")}`

    // Calculate expiry date
    const expiresAt = data.expiresInDays > 0 ? new Date(Date.now() + data.expiresInDays * 24 * 60 * 60 * 1000) : null

    // Create the API key
    const createdKey = await prisma.aPIKey.create({
      data: {
        userId: session.userId,
        name: data.name,
        key: apiKey,
        scopes: data.scopes,
        expiresAt,
      },
    })

    // Create audit log
    await prisma.auditLog.create({
      data: {
        action: "API_KEY_CREATED",
        entityType: "API_KEY", // Added required field
        entityId: createdKey.id, // Added required field
        userId: session.userId,
        metadata: { name: data.name },
      },
    })

    return {
      success: true,
      key: apiKey,
      keyData: createdKey,
    }
  } catch (error) {
    logger.error("Error creating API key", { error })
    return { success: false, error: "Failed to create API key" }
  }
}

/**
 * Delete API key
 */
export async function deleteApiKey(keyId: string) {
  try {
    const session = await SessionService.getSession()

    if (!session || !session.userId) {
      return { success: false, error: "Not authenticated" }
    }

    // Delete the API key
    await prisma.aPIKey.delete({
      where: {
        id: keyId,
        userId: session.userId, // Ensure the key belongs to the user
      },
    })

    // Create audit log
    await prisma.auditLog.create({
      data: {
        action: "API_KEY_DELETED",
        entityType: "API_KEY", // Added required field
        entityId: keyId, // Added required field
        userId: session.userId,
      },
    })

    return { success: true }
  } catch (error) {
    logger.error("Error deleting API key", { error })
    return { success: false, error: "Failed to delete API key" }
  }
}

/**
 * Get user skills
 */
export async function getUserSkills() {
  try {
    const session = await SessionService.getSession()

    if (!session || !session.userId) {
      return { success: false, error: "Not authenticated", skills: [] }
    }

    // Get all skills for the user
    const skills = await prisma.userSkill.findMany({
      where: { userId: session.userId },
      orderBy: { createdAt: "desc" },
    })

    return { success: true, skills }
  } catch (error) {
    logger.error("Error getting user skills", { error })
    return { success: false, error: "Failed to get user skills", skills: [] }
  }
}

/**
 * Add user skill
 */
export async function addUserSkill(data: {
  skill: string
  level: SkillLevel
}) {
  try {
    const session = await SessionService.getSession()

    if (!session || !session.userId) {
      return { success: false, error: "Not authenticated" }
    }

    // Check if the skill already exists
    const existingSkill = await prisma.userSkill.findFirst({
      where: {
        userId: session.userId,
        skill: data.skill,
      },
    })

    if (existingSkill) {
      return { success: false, error: "You already have this skill" }
    }

    // Create the skill
    const skill = await prisma.userSkill.create({
      data: {
        userId: session.userId,
        skill: data.skill,
        level: data.level,
      },
    })

    // Create activity log
    await prisma.activityLog.create({
      data: {
        action: "SKILL_ADDED",
        userId: session.userId,
        entityType: "USER_SKILL",
        entityId: skill.id,
      },
    })

    return { success: true, skill }
  } catch (error) {
    logger.error("Error adding user skill", { error })
    return { success: false, error: "Failed to add user skill" }
  }
}

/**
 * Update user skill
 */
export async function updateUserSkill(skillId: string, level: SkillLevel) {
  try {
    const session = await SessionService.getSession()

    if (!session || !session.userId) {
      return { success: false, error: "Not authenticated" }
    }

    // Update the skill
    await prisma.userSkill.update({
      where: {
        id: skillId,
        userId: session.userId, // Ensure the skill belongs to the user
      },
      data: { level },
    })

    // Create activity log
    await prisma.activityLog.create({
      data: {
        action: "SKILL_UPDATED",
        userId: session.userId,
        entityType: "USER_SKILL",
        entityId: skillId,
      },
    })

    return { success: true }
  } catch (error) {
    logger.error("Error updating user skill", { error })
    return { success: false, error: "Failed to update user skill" }
  }
}

/**
 * Remove user skill
 */
export async function removeUserSkill(skillId: string) {
  try {
    const session = await SessionService.getSession()

    if (!session || !session.userId) {
      return { success: false, error: "Not authenticated" }
    }

    // Delete the skill
    await prisma.userSkill.delete({
      where: {
        id: skillId,
        userId: session.userId, // Ensure the skill belongs to the user
      },
    })

    // Create activity log
    await prisma.activityLog.create({
      data: {
        action: "SKILL_REMOVED",
        userId: session.userId,
        entityType: "USER_SKILL",
        entityId: skillId,
      },
    })

    return { success: true }
  } catch (error) {
    logger.error("Error removing user skill", { error })
    return { success: false, error: "Failed to remove user skill" }
  }
}

/**
 * Upload avatar
 */
export async function uploadAvatar(file: File) {
  try {
    const session = await SessionService.getSession()

    if (!session || !session.userId) {
      return { success: false, error: "Not authenticated" }
    }

    // In a real implementation, you would upload the file to a storage service
    // For this example, we'll create a mock media entry

    // Create the media entry
    const media = await prisma.media.create({
      data: {
        url: URL.createObjectURL(file),
        type: MediaType.IMAGE,
        size: file.size,
        mimeType: file.type,
        createdById: session.userId,
      },
    })

    // Update the user's avatar
    await prisma.user.update({
      where: { id: session.userId },
      data: { avatarId: media.id },
    })

    // Create activity log
    await prisma.activityLog.create({
      data: {
        action: "AVATAR_UPDATED",
        userId: session.userId,
        entityType: "USER_PROFILE",
        entityId: session.userId,
      },
    })

    return { success: true, media }
  } catch (error) {
    logger.error("Error uploading avatar", { error })
    return { success: false, error: "Failed to upload avatar" }
  }
}

/**
 * Upload cover image
 */
export async function uploadCoverImage(file: File) {
  try {
    const session = await SessionService.getSession()

    if (!session || !session.userId) {
      return { success: false, error: "Not authenticated" }
    }

    // In a real implementation, you would upload the file to a storage service
    // For this example, we'll create a mock media entry

    // Create the media entry
    const media = await prisma.media.create({
      data: {
        url: URL.createObjectURL(file),
        type: MediaType.IMAGE,
        size: file.size,
        mimeType: file.type,
        createdById: session.userId,
      },
    })

    // Update the user's cover image
    await prisma.user.update({
      where: { id: session.userId },
      data: { coverImageId: media.id },
    })

    // Create activity log
    await prisma.activityLog.create({
      data: {
        action: "COVER_IMAGE_UPDATED",
        userId: session.userId,
        entityType: "USER_PROFILE",
        entityId: session.userId,
      },
    })

    return { success: true, media }
  } catch (error) {
    logger.error("Error uploading cover image", { error })
    return { success: false, error: "Failed to upload cover image" }
  }
}

/**
 * Verify email
 */
export async function verifyEmail(token: string) {
  try {
    // In a real implementation, you would verify the token
    // For this example, we'll assume the token is valid

    const session = await SessionService.getSession()

    if (!session || !session.userId) {
      return { success: false, error: "Not authenticated" }
    }

    // Update the user's email verification status
    await prisma.user.update({
      where: { id: session.userId },
      data: {
        isVerified: true,
        emailVerifiedAt: new Date(),
      },
    })

    // Create audit log
    await prisma.auditLog.create({
      data: {
        action: "EMAIL_VERIFIED",
        userId: session.userId,
        entityType: "USER_ACCOUNT",
        entityId: session.userId,
      },
    })

    return { success: true }
  } catch (error) {
    logger.error("Error verifying email", { error })
    return { success: false, error: "Failed to verify email" }
  }
}

/**
 * Send verification email
 */
export async function sendVerificationEmail() {
  try {
    const session = await SessionService.getSession()

    if (!session || !session.userId) {
      return { success: false, error: "Not authenticated" }
    }

    // Get the user
    const user = await prisma.user.findUnique({
      where: { id: session.userId },
      select: { email: true, isVerified: true },
    })

    if (!user) {
      return { success: false, error: "User not found" }
    }

    if (user.isVerified) {
      return { success: false, error: "Email already verified" }
    }

    // In a real implementation, you would send an email with a verification link
    // For this example, we'll just return success

    // Create activity log
    await prisma.activityLog.create({
      data: {
        action: "VERIFICATION_EMAIL_SENT",
        userId: session.userId,
        entityType: "USER_ACCOUNT",
        entityId: session.userId,
      },
    })

    return { success: true }
  } catch (error) {
    logger.error("Error sending verification email", { error })
    return { success: false, error: "Failed to send verification email" }
  }
}

/**
 * Update appearance settings
 */
export async function updateAppearanceSettings(data: {
  theme?: string
  font?: string
  colorScheme?: string
}) {
  try {
    const session = await SessionService.getSession()

    if (!session || !session.userId) {
      return { success: false, error: "Not authenticated" }
    }

    // Update preferences
    const updates = []

    if (data.theme) {
      updates.push(
        prisma.userPreference.upsert({
          where: {
            userId_preference: {
              userId: session.userId,
              preference: "theme",
            },
          },
          update: { value: data.theme },
          create: {
            userId: session.userId,
            preference: "theme",
            value: data.theme,
          },
        }),
      )
    }

    if (data.font) {
      updates.push(
        prisma.userPreference.upsert({
          where: {
            userId_preference: {
              userId: session.userId,
              preference: "font",
            },
          },
          update: { value: data.font },
          create: {
            userId: session.userId,
            preference: "font",
            value: data.font,
          },
        }),
      )
    }

    if (data.colorScheme) {
      updates.push(
        prisma.userPreference.upsert({
          where: {
            userId_preference: {
              userId: session.userId,
              preference: "colorScheme",
            },
          },
          update: { value: data.colorScheme },
          create: {
            userId: session.userId,
            preference: "colorScheme",
            value: data.colorScheme,
          },
        }),
      )
    }

    await Promise.all(updates)

    // Create activity log
    await prisma.activityLog.create({
      data: {
        action: "UPDATE",
        entityType: "USER_PREFERENCES",
        entityId: "appearance",
        userId: session.userId,
      },
    })

    revalidatePath("/settings")
    return { success: true }
  } catch (error) {
    logger.error("Error updating appearance settings", { error })
    return { success: false, error: "Failed to update appearance settings" }
  }
}

/**
 * Update notification settings
 */
export async function updateNotificationSettings(data: {
  notifyAbout?: string
  emailSettings?: Record<string, boolean>
  useDifferentSettings?: boolean
}) {
  try {
    const session = await SessionService.getSession()

    if (!session || !session.userId) {
      return { success: false, error: "Not authenticated" }
    }

    const updates = []

    // Update notification level preference
    if (data.notifyAbout) {
      updates.push(
        prisma.userPreference.upsert({
          where: {
            userId_preference: {
              userId: session.userId,
              preference: "notification_level",
            },
          },
          update: { value: data.notifyAbout },
          create: {
            userId: session.userId,
            preference: "notification_level",
            value: data.notifyAbout,
          },
        }),
      )
    }

    // Update email settings
    if (data.emailSettings) {
      for (const [key, value] of Object.entries(data.emailSettings)) {
        updates.push(
          prisma.userPreference.upsert({
            where: {
              userId_preference: {
                userId: session.userId,
                preference: `email_${key}`,
              },
            },
            update: { value: value.toString() },
            create: {
              userId: session.userId,
              preference: `email_${key}`,
              value: value.toString(),
            },
          }),
        )
      }
    }

    // Update mobile settings preference
    if (data.useDifferentSettings !== undefined) {
      updates.push(
        prisma.userPreference.upsert({
          where: {
            userId_preference: {
              userId: session.userId,
              preference: "different_mobile_settings",
            },
          },
          update: { value: data.useDifferentSettings.toString() },
          create: {
            userId: session.userId,
            preference: "different_mobile_settings",
            value: data.useDifferentSettings.toString(),
          },
        }),
      )
    }

    await Promise.all(updates)

    // Create activity log
    await prisma.activityLog.create({
      data: {
        action: "UPDATE",
        entityType: "USER_PREFERENCES",
        entityId: "notifications",
        userId: session.userId,
      },
    })

    revalidatePath("/settings")
    return { success: true }
  } catch (error) {
    logger.error("Error updating notification settings", { error })
    return { success: false, error: "Failed to update notification settings" }
  }
}

/**
 * Update display settings
 */
export async function updateDisplaySettings(data: {
  sidebarItems: Record<string, boolean>
}) {
  try {
    const session = await SessionService.getSession()

    if (!session || !session.userId) {
      return { success: false, error: "Not authenticated" }
    }

    const updates = []

    // Update sidebar item preferences
    for (const [key, value] of Object.entries(data.sidebarItems)) {
      updates.push(
        prisma.userPreference.upsert({
          where: {
            userId_preference: {
              userId: session.userId,
              preference: `sidebar_${key}`,
            },
          },
          update: { value: value.toString() },
          create: {
            userId: session.userId,
            preference: `sidebar_${key}`,
            value: value.toString(),
          },
        }),
      )
    }

    await Promise.all(updates)

    // Create activity log
    await prisma.activityLog.create({
      data: {
        action: "UPDATE",
        entityType: "USER_PREFERENCES",
        entityId: "display",
        userId: session.userId,
      },
    })

    revalidatePath("/settings")
    return { success: true }
  } catch (error) {
    logger.error("Error updating display settings", { error })
    return { success: false, error: "Failed to update display settings" }
  }
}
