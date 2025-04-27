import { logger } from "@/lib/logger"

/**
 * Base application error class
 */
export class AppError extends Error {
  public readonly statusCode: number
  public readonly code: string
  public readonly isOperational: boolean
  public readonly context?: Record<string, any>

  constructor(
    message: string,
    statusCode = 500,
    code = "INTERNAL_SERVER_ERROR",
    isOperational = true,
    context?: Record<string, any>,
  ) {
    super(message)
    this.statusCode = statusCode
    this.code = code
    this.isOperational = isOperational
    this.context = context

    Error.captureStackTrace(this, this.constructor)
  }
}

/**
 * Authentication errors
 */
export class AuthenticationError extends AppError {
  constructor(message = "Authentication failed", context?: Record<string, any>) {
    super(message, 401, "AUTHENTICATION_FAILED", true, context)
  }
}

export class InvalidCredentialsError extends AuthenticationError {
  constructor(message = "Invalid email or password", context?: Record<string, any>) {
    // Pass the code directly to the parent constructor instead of reassigning it
    super(message, context)
    // Override the parent's code by passing it to the AppError constructor
    Object.defineProperty(this, "code", {
      value: "INVALID_CREDENTIALS",
    })
  }
}

export class AccountLockedError extends AuthenticationError {
  constructor(message = "Account is locked due to too many failed login attempts", context?: Record<string, any>) {
    super(message, context)
    // Override the parent's code by passing it to the AppError constructor
    Object.defineProperty(this, "code", {
      value: "ACCOUNT_LOCKED",
    })
  }
}

export class AccountInactiveError extends AuthenticationError {
  constructor(message = "Account is inactive", context?: Record<string, any>) {
    super(message, context)
    // Override the parent's code by passing it to the AppError constructor
    Object.defineProperty(this, "code", {
      value: "ACCOUNT_INACTIVE",
    })
  }
}

export class SessionExpiredError extends AuthenticationError {
  constructor(message = "Session has expired", context?: Record<string, any>) {
    super(message, context)
    // Override the parent's code by passing it to the AppError constructor
    Object.defineProperty(this, "code", {
      value: "SESSION_EXPIRED",
    })
  }
}

/**
 * Authorization errors
 */
export class AuthorizationError extends AppError {
  constructor(message = "You are not authorized to perform this action", context?: Record<string, any>) {
    super(message, 403, "AUTHORIZATION_FAILED", true, context)
  }
}

/**
 * Validation errors
 */
export class ValidationError extends AppError {
  constructor(message = "Validation failed", context?: Record<string, any>) {
    super(message, 400, "VALIDATION_FAILED", true, context)
  }
}

/**
 * Not found errors
 */
export class NotFoundError extends AppError {
  constructor(message = "Resource not found", context?: Record<string, any>) {
    super(message, 404, "NOT_FOUND", true, context)
  }
}

/**
 * Conflict errors
 */
export class ConflictError extends AppError {
  constructor(message = "Resource already exists", context?: Record<string, any>) {
    super(message, 409, "CONFLICT", true, context)
  }
}

/**
 * Rate limit errors
 */
export class RateLimitError extends AppError {
  constructor(message = "Too many requests", context?: Record<string, any>) {
    super(message, 429, "RATE_LIMIT_EXCEEDED", true, context)
  }
}

/**
 * Database errors
 */
export class DatabaseError extends AppError {
  constructor(message = "Database error", context?: Record<string, any>) {
    super(message, 500, "DATABASE_ERROR", false, context)
  }
}

/**
 * External service errors
 */
export class ExternalServiceError extends AppError {
  constructor(message = "External service error", context?: Record<string, any>) {
    super(message, 502, "EXTERNAL_SERVICE_ERROR", false, context)
  }
}

/**
 * Error handler
 */
export const handleError = (error: Error | AppError): { statusCode: number; body: any } => {
  // If it's an operational error, we can send the details to the client
  if (error instanceof AppError && error.isOperational) {
    logger.warn(`Operational error: ${error.message}`, {
      code: error.code,
      statusCode: error.statusCode,
      stack: error.stack,
      context: error.context,
    })

    return {
      statusCode: error.statusCode,
      body: {
        error: {
          code: error.code,
          message: error.message,
        },
      },
    }
  }

  // For non-operational errors, log them but don't expose details to the client
  logger.error(`Unhandled error: ${error.message}`, {
    stack: error.stack,
  })

  return {
    statusCode: 500,
    body: {
      error: {
        code: "INTERNAL_SERVER_ERROR",
        message: "An unexpected error occurred",
      },
    },
  }
}
