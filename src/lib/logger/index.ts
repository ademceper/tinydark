import { logging, app } from "@/config"

type LogLevel = "debug" | "info" | "warn" | "error"

interface LogPayload {
  message: string
  [key: string]: any
}

/**
 * Application logger
 * Centralizes all logging functionality
 */
class Logger {
  private logLevels: Record<LogLevel, number> = {
    debug: 0,
    info: 1,
    warn: 2,
    error: 3,
  }

  private currentLogLevel: number

  constructor() {
    this.currentLogLevel = this.logLevels[logging.level as LogLevel] || this.logLevels.info
  }

  /**
   * Log a debug message
   */
  debug(message: string, data: Record<string, any> = {}): void {
    this.log("debug", message, data)
  }

  /**
   * Log an info message
   */
  info(message: string, data: Record<string, any> = {}): void {
    this.log("info", message, data)
  }

  /**
   * Log a warning message
   */
  warn(message: string, data: Record<string, any> = {}): void {
    this.log("warn", message, data)
  }

  /**
   * Log an error message
   */
  error(message: string, data: Record<string, any> = {}): void {
    this.log("error", message, data)
  }

  /**
   * Log a message with the specified level
   */
  private log(level: LogLevel, message: string, data: Record<string, any> = {}): void {
    if (this.logLevels[level] < this.currentLogLevel) {
      return
    }

    const timestamp = new Date().toISOString()
    const logPayload: LogPayload = {
      timestamp,
      level,
      message,
      environment: app.environment,
      ...data,
    }

    if (logging.format === "json") {
      console[level === "debug" ? "log" : level](JSON.stringify(logPayload))
    } else {
      console[level === "debug" ? "log" : level](
        `[${timestamp}] [${level.toUpperCase()}] ${message}`,
        Object.keys(data).length ? data : "",
      )
    }

    // In a production environment, you would send logs to a service like
    // Datadog, New Relic, Sentry, etc.
  }
}

export const logger = new Logger()
