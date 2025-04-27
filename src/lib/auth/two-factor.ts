import { authenticator } from "otplib"
import QRCode from "qrcode"

export class TwoFactorService {
  /**
   * Generate a TOTP secret and QR code
   */
  static async generateTOTP(userId: string): Promise<{ secret: string; qrCode: string }> {
    // Generate a secret
    const secret = authenticator.generateSecret()

    // Create a QR code
    const otpauth = authenticator.keyuri(userId, "Orbit Suite", secret)
    const qrCode = await QRCode.toDataURL(otpauth)

    return { secret, qrCode }
  }

  /**
   * Verify a TOTP code
   */
  static async verifyTOTP(token: string, secret: string): Promise<boolean> {
    try {
      return authenticator.verify({ token, secret })
    } catch {
      return false
    }
  }

  /**
   * Generate a recovery code
   */
  static generateRecoveryCode(): string {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    let code = ""

    // Generate 4 groups of 4 characters
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length))
      }
      if (i < 3) code += "-"
    }

    return code
  }
}
