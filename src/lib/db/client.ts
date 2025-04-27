import { PrismaClient } from "@prisma/client"
import { database } from "@/config"
import { logger } from "@/lib/logger"

/**
 * Prisma client with connection pooling and query logging
 */
class PrismaClientSingleton {
  private static instance: PrismaClient

  public static getInstance(): PrismaClient {
    if (!PrismaClientSingleton.instance) {
      const prismaOptions: any = {}

      // Add logging in development
      if (database.logQueries) {
        prismaOptions.log = [
          {
            emit: "event",
            level: "query",
          },
          {
            emit: "event",
            level: "error",
          },
          {
            emit: "event",
            level: "info",
          },
          {
            emit: "event",
            level: "warn",
          },
        ]
      }

      PrismaClientSingleton.instance = new PrismaClient(prismaOptions)

      // Set up logging
      if (database.logQueries) {
        PrismaClientSingleton.instance.$on("query", (e: any) => {
          logger.debug("Prisma Query", {
            query: e.query,
            params: e.params,
            duration: e.duration,
          })
        })

        PrismaClientSingleton.instance.$on("error", (e: any) => {
          logger.error("Prisma Error", { message: e.message, stack: e.stack })
        })

        PrismaClientSingleton.instance.$on("info", (e: any) => {
          logger.info("Prisma Info", { message: e.message })
        })

        PrismaClientSingleton.instance.$on("warn", (e: any) => {
          logger.warn("Prisma Warning", { message: e.message })
        })
      }

      // Connect to the database
      PrismaClientSingleton.instance
        .$connect()
        .then(() => {
          logger.info("Connected to database")
        })
        .catch((error) => {
          logger.error("Failed to connect to database", { error })
        })

      // Handle application shutdown
      process.on("beforeExit", async () => {
        await PrismaClientSingleton.instance.$disconnect()
        logger.info("Disconnected from database")
      })
    }

    return PrismaClientSingleton.instance
  }
}

// Export a singleton instance
export const prisma = PrismaClientSingleton.getInstance()

// For testing purposes
export const disconnectPrisma = async () => {
  if (PrismaClientSingleton.instance) {
    await PrismaClientSingleton.instance.$disconnect()
  }
}
