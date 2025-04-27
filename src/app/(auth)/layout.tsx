"use client"

import Link from "next/link"
import type { ReactNode } from "react"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { ChevronLeft } from "lucide-react"
import { motion } from "framer-motion"
import Image from "next/image"

interface AuthLayoutProps {
  children: ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  const pathname = usePathname()
  const isLoginPage = pathname === "/login"

  return (
    <div className="h-screen w-full flex items-center justify-center bg-background overflow-hidden">
      <div className="w-full h-full grid lg:grid-cols-2 lg:px-0 overflow-hidden">
        {/* Left side - Branding and testimonial */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="relative hidden h-full flex-col p-10 text-white lg:flex border-r bg-muted overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900" />

          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <svg className="h-full w-full" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          {/* Animated gradient blob */}
          <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-primary/30 blur-3xl animate-blob pointer-events-none" />
          <div className="absolute top-1/2 -right-32 h-96 w-96 rounded-full bg-primary/20 blur-3xl animate-blob animation-delay-2000 pointer-events-none" />

          {/* Logo and brand */}
          <Link href="/" className="relative z-20 flex items-center text-lg font-medium gap-2 group">
            <Image src="/logo.svg" height={32} width={32} alt="logo" />
          </Link>

          {/* Testimonial */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative z-20 mt-auto"
          >
            <div className="p-6 bg-black/20 backdrop-blur-sm rounded-xl border border-white/10">
              <svg className="h-8 w-8 text-primary/80 mb-3 opacity-80" fill="currentColor" viewBox="0 0 24 24">
                <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
              </svg>
              <blockquote className="space-y-2">
                <p className="text-lg leading-relaxed text-white/90">
                  This authentication system has saved us countless hours of development time. The security features and
                  user experience are top-notch!
                </p>
                <footer className="mt-4 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                    SJ
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">Sarah Johnson</p>
                    <p className="text-xs text-white/60">CTO, TechVentures</p>
                  </div>
                </footer>
              </blockquote>
            </div>

            <div className="mt-8 flex items-center justify-between text-white/60 text-sm">
              <p>© 2025 Orbit Suite</p>
              <div className="flex gap-4">
                <Link href="/terms" className="hover:text-primary transition-colors">
                  Terms
                </Link>
                <Link href="/privacy" className="hover:text-primary transition-colors">
                  Privacy
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Right side - Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="h-full flex items-center justify-center overflow-y-auto relative"
        >
          {/* Back to home button - moved to right side only */}
          <Link
            href="/"
            className={cn(
              "absolute left-4 top-4 md:left-8 md:top-8 z-10",
              "inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors",
            )}
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to home
          </Link>

          <div className="w-full max-w-[400px] flex flex-col justify-center space-y-6 px-4 py-12 mt-16">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-bold tracking-tight">{isLoginPage ? "Welcome back" : "Create account"}</h1>
              <p className="text-sm text-muted-foreground">
                {isLoginPage ? "Enter your credentials to access your account" : "Get started with our platform"}
              </p>
            </div>

            {children}


          </div>
        </motion.div>
      </div>
    </div>
  )
}
