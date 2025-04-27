import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { JwtService } from "@/lib/auth/jwt"
import { logger } from "@/lib/logger"

// Routes that don't require authentication
const publicRoutes = ["/", "/login", "/sign-in", "/sign-up", "/register", "/forgot-password"]

// Routes that are only accessible to unauthenticated users
const authRoutes = ["/login", "/sign-in", "/sign-up", "/register", "/forgot-password"]

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if the route is public
  const isPublicRoute = publicRoutes.some(
    (route) =>
      pathname === route || pathname.startsWith("/api/") || pathname.includes(".") || pathname.includes("_next"),
  )

  // Check if the route is auth-only
  const isAuthRoute = authRoutes.some((route) => pathname === route)

  // Get the token from the cookies
  const token = request.cookies.get("session")?.value

  // If there's no token and the route is not public, redirect to login
  if (!token && !isPublicRoute) {
    const url = new URL("/sign-in", request.url)
    url.searchParams.set("callbackUrl", encodeURI(pathname))
    return NextResponse.redirect(url)
  }

  // If there's a token, verify it
  if (token) {
    try {
      // Verify the token
      await JwtService.verifyToken(token)

      // If the user is authenticated and trying to access an auth route, redirect to dashboard
      if (isAuthRoute) {
        return NextResponse.redirect(new URL("/dashboard", request.url))
      }
    } catch (error) {
      // If the token is invalid, try to refresh it
      const refreshToken = request.cookies.get("refresh_token")?.value

      if (refreshToken) {
        try {
          // Create a new response
          const response = NextResponse.next()

          // Clone the headers to the server
          const headers = new Headers(request.headers)
          headers.set("x-middleware-refresh", "true")

          // Make a request to the refresh endpoint
          const refreshResponse = await fetch(`${request.nextUrl.origin}/api/auth/refresh`, {
            method: "POST",
            headers,
          })

          if (refreshResponse.ok) {
            // Get the new tokens from the response
            const { session, refresh_token } = await refreshResponse.json()

            // Set the new tokens in the response cookies
            response.cookies.set("session", session, {
              httpOnly: true,
              secure: process.env.NODE_ENV === "production",
              maxAge: 60 * 60 * 24 * 7, // 1 week
              path: "/",
              sameSite: "lax",
            })

            response.cookies.set("refresh_token", refresh_token, {
              httpOnly: true,
              secure: process.env.NODE_ENV === "production",
              maxAge: 60 * 60 * 24 * 30, // 30 days
              path: "/",
              sameSite: "lax",
            })

            return response
          }
        } catch (refreshError) {
          logger.error("Failed to refresh token", { error: refreshError })
        }
      }

      // If the token is invalid and couldn't be refreshed, clear it and redirect to login if necessary
      const response = isPublicRoute ? NextResponse.next() : NextResponse.redirect(new URL("/sign-in", request.url))

      response.cookies.delete("session")
      response.cookies.delete("refresh_token")
      return response
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api/auth|_next/static|_next/image|favicon.ico).*)"],
}
