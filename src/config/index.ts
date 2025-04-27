/**
 * Application configuration
 * Centralizes all environment variables and configuration settings
 */

// Database configuration
export const database = {
    url: process.env.DATABASE_URL,
    connectionPoolSize: Number.parseInt(process.env.DATABASE_CONNECTION_POOL_SIZE || "10"),
    connectionTimeout: Number.parseInt(process.env.DATABASE_CONNECTION_TIMEOUT || "30000"),
    logQueries: process.env.NODE_ENV !== "production",
  }
  
  // Authentication configuration
  export const auth = {
    jwtSecret: process.env.JWT_SECRET || "211111111111312333333333333331sadsaddddddddddddasdadasdad",
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || "7d",
    refreshTokenExpiresIn: Number.parseInt(process.env.REFRESH_TOKEN_EXPIRES_IN || "2592000"), // 30 days in seconds
    passwordResetExpiresIn: Number.parseInt(process.env.PASSWORD_RESET_EXPIRES_IN || "3600"), // 1 hour in seconds
    maxLoginAttempts: Number.parseInt(process.env.MAX_LOGIN_ATTEMPTS || "5"),
    lockoutDuration: Number.parseInt(process.env.LOCKOUT_DURATION || "1800"), // 30 minutes in seconds
  }
  
  // Application configuration
  export const app = {
    name: process.env.APP_NAME || "Orbit Suite",
    environment: process.env.NODE_ENV || "development",
    isProduction: process.env.NODE_ENV === "production",
    isDevelopment: process.env.NODE_ENV === "development",
    isTest: process.env.NODE_ENV === "test",
    baseUrl: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
    apiUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api",
  }
  
  // Email configuration
  export const email = {
    from: process.env.EMAIL_FROM || "noreply@orbitsuite.com",
    host: process.env.EMAIL_HOST,
    port: Number.parseInt(process.env.EMAIL_PORT || "587"),
    user: process.env.EMAIL_USER,
    password: process.env.EMAIL_PASSWORD,
    secure: process.env.EMAIL_SECURE === "true",
  }
  
  // Social login configuration
  export const socialLogin = {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
      callbackUrl: `${app.baseUrl}/api/auth/github/callback`,
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      callbackUrl: `${app.baseUrl}/api/auth/google/callback`,
    },
  }
  
  // Feature flags
  export const features = {
    socialLogin: process.env.FEATURE_SOCIAL_LOGIN === "true",
    twoFactorAuth: process.env.FEATURE_TWO_FACTOR_AUTH === "true",
    emailVerification: process.env.FEATURE_EMAIL_VERIFICATION === "true",
  }
  
  // Logging configuration
  export const logging = {
    level: process.env.LOG_LEVEL || "info",
    format: process.env.LOG_FORMAT || "json",
    destination: process.env.LOG_DESTINATION || "console",
  }
  