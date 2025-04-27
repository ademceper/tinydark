import * as OTPAuth from "otpauth"

interface VerifyTOTPParams {
  token: string
  secret: string
}

interface GenerateTOTPParams {
  accountName: string
  issuer?: string
}

export class TOTPService {
  /**
   * Verify a TOTP token
   */
  static verify({ token, secret }: VerifyTOTPParams): boolean {
    try {
      // Create a new TOTP object
      const totp = new OTPAuth.TOTP({
        issuer: "Orbit Suite",
        label: "User",
        algorithm: "SHA1",
        digits: 6,
        period: 30,
        secret: OTPAuth.Secret.fromBase32(secret),
      })

      // Verify the token
      const delta = totp.validate({ token, window: 1 })

      // If delta is null, the token is invalid
      return delta !== null
    } catch (error) {
      console.error("TOTP verification error:", error)
      return false
    }
  }

  /**
   * Generate a new TOTP secret
   */
  static generateSecret(): string {
    // Create a new Secret instance with random bytes
    const secret = new OTPAuth.Secret()

    // Return the secret in base32 format
    return secret.base32
  }

  /**
   * Generate a TOTP URI for QR code generation
   */
  static generateURI({ accountName, issuer = "Orbit Suite" }: GenerateTOTPParams, secret: string): string {
    // Create a new TOTP object
    const totp = new OTPAuth.TOTP({
      issuer,
      label: accountName,
      algorithm: "SHA1",
      digits: 6,
      period: 30,
      secret: OTPAuth.Secret.fromBase32(secret),
    })

    // Return the URI
    return totp.toString()
  }
}
