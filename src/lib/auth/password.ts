import { hash, compare } from "bcryptjs"
import { logger } from "@/lib/logger"

/**
 * Service for password hashing and verification
 */
export class PasswordService {
  // Lower cost factor for faster hashing (still secure but faster)
  private static readonly SALT_ROUNDS = 10

  /**
   * Hash a password
   */
  static async hash(password: string): Promise<string> {
    try {
      return await hash(password, this.SALT_ROUNDS)
    } catch (error) {
      logger.error("Failed to hash password", { error })
      throw error
    }
  }

  /**
   * Verify a password
   */
  static async verify(password: string, hashedPassword: string): Promise<boolean> {
    try {
      return await compare(password, hashedPassword)
    } catch (error) {
      logger.error("Failed to verify password", { error })
      throw error
    }
  }

  /**
   * Generate a random password
   */
  static generateRandomPassword(length = 12): string {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-="
    let password = ""
    for (let i = 0; i < length; i++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length))
    }
    return password
  }
}
