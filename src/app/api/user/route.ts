import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { JwtService } from "@/lib/auth/jwt"
import { UserService } from "@/services/user.service"
import { logger } from "@/lib/logger"
import { handleError, AppError } from "@/lib/errors"

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

export async function GET() {
  try {
    // Use await with cookies() if it returns a Promise
    const cookieStore = await cookies()
    const token = cookieStore.get("session")?.value

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Verify the token
    const payload = await JwtService.verifyToken(token)
    const userId = payload.userId as string

    // Get the user
    const user = await UserService.findById(userId)

    return NextResponse.json({ user })
  } catch (error) {
    logger.error("Failed to get user", { error })
    const { statusCode, body } = safeHandleError(error)
    return NextResponse.json(body, { status: statusCode })
  }
}
