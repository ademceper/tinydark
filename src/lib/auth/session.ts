import { cookies } from "next/headers"
import { v4 as uuidv4 } from "uuid"
import { auth } from "@/config"
import { prisma } from "@/lib/db/client"
import { JwtService } from "@/lib/auth/jwt"
import { logger } from "@/lib/logger"
import { PasswordService } from "@/lib/auth/password"

/**
 * Session service for managing user sessions
 */
export class SessionService {
  /**
   * Create a new session
   */
  static async createSession(userId: string): Promise<{ success: boolean; error?: string }> {
    try {
      // Generate a JWT token
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

      // Generate a refresh token
      const refreshToken = uuidv4()
      const hashedRefreshToken = await PasswordService.hash(refreshToken)

      // Store the refresh token in the database
      await prisma.refreshToken.create({
        data: {
          userId,
          token: hashedRefreshToken,
          expiresAt: new Date(Date.now() + auth.refreshTokenExpiresIn * 1000),
        },
      })

      // Store the refresh token in a cookie
      cookieStore.set("refresh_token", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: auth.refreshTokenExpiresIn,
        path: "/",
        sameSite: "lax",
      })

      return { success: true }
    } catch (error) {
      logger.error("Failed to create session", { error })
      return { success: false, error: "Failed to create session" }
    }
  }

  /**
   * Clear the current session
   */
  static async clearSession(): Promise<void> {
    const cookieStore = await cookies()
    cookieStore.delete("session")
    cookieStore.delete("refresh_token")
  }

  /**
   * Refresh the current session
   */
  static async refreshSession(): Promise<{ success: boolean; error?: string }> {
    try {
      const cookieStore = await cookies()
      const refreshToken = cookieStore.get("refresh_token")?.value

      if (!refreshToken) {
        return { success: false, error: "No refresh token found" }
      }

      // Find the refresh token in the database
      const tokens = await prisma.refreshToken.findMany({
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
      const matchingToken = await Promise.all(
        tokens.map(async (token) => {
          const isMatch = await PasswordService.verify(refreshToken, token.token)
          return isMatch ? token : null
        }),
      ).then((results) => results.find((result) => result !== null))

      if (!matchingToken) {
        return { success: false, error: "Invalid refresh token" }
      }

      // Delete the used refresh token
      await prisma.refreshToken.delete({
        where: {
          id: matchingToken.id,
        },
      })

      // Create a new session
      return await SessionService.createSession(matchingToken.userId)
    } catch (error) {
      logger.error("Failed to refresh session", { error })
      return { success: false, error: "Failed to refresh session" }
    }
  }

  /**
   * Get the current session
   */
  static async getSession() {
    try {
      const cookieStore = await cookies()
      const token = cookieStore.get("session")?.value

      if (!token) {
        return null
      }

      // Verify the token
      const payload = await JwtService.verifyToken(token)

      return {
        userId: payload.userId as string,
        expiresAt: payload.exp ? new Date(payload.exp * 1000) : null,
      }
    } catch (error) {
      logger.error("Failed to get session", { error })
      return null
    }
  }
}
