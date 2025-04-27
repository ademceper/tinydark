import { type NextRequest, NextResponse } from "next/server"
import { SessionService } from "@/lib/auth/session"
import { logger } from "@/lib/logger"
import { AppError } from "@/lib/errors"

/**
 * Helper function to safely handle errors
 */
function safeHandleError(error: unknown) {
  if (error instanceof Error || error instanceof AppError) {
    logger.error("Refresh token error", { error: error.message, stack: error.stack })
  } else {
    // If it's not an Error or AppError, log it as an unknown error
    logger.error("Unknown refresh token error", { error })
  }
  return { error: "Failed to refresh token" }
}

export async function POST(request: NextRequest) {
  try {
    // Check if this is a middleware refresh request
    const isMiddlewareRefresh = request.headers.get("x-middleware-refresh") === "true"

    if (!isMiddlewareRefresh) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Refresh the session
    const result = await SessionService.refreshSession()

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 401 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    const errorResponse = safeHandleError(error)
    return NextResponse.json(errorResponse, { status: 500 })
  }
}
