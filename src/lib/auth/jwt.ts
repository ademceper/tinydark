import { SignJWT, jwtVerify } from "jose"

/**
 * Service for JWT token generation and verification
 */
export class JwtService {
  private static readonly JWT_SECRET = new TextEncoder().encode(
    process.env.JWT_SECRET || "your-secret-key-at-least-32-characters",
  )
  private static readonly EXPIRES_IN = "7d"

  /**
   * Generate a JWT token
   */
  static async generateToken(payload: Record<string, any>): Promise<string> {
    return new SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime(this.EXPIRES_IN)
      .sign(this.JWT_SECRET)
  }

  /**
   * Verify a JWT token
   */
  static async verifyToken(token: string): Promise<any> {
    const { payload } = await jwtVerify(token, this.JWT_SECRET)
    return payload
  }
}
