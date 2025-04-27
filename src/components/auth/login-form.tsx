"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Loader2, Mail, Lock, Github, ChromeIcon as Google } from 'lucide-react'
import Link from "next/link"
import { motion } from "framer-motion"
import { login, type AuthState } from "@/actions/auth.actions"
import { useActionState } from "react" 
import { toast } from "sonner"
import { TwoFactorVerificationForm } from "./two-factor-verification-form"

// Initial state for the form
const initialState: AuthState = {
  success: false,
  errors: {},
}

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [state, formAction] = useActionState(login, initialState) 
  const router = useRouter()

  // Effect to handle successful login and errors
  useEffect(() => {
    if (state.success) {
      router.push("/dashboard")
    } else if (state.errors && Object.keys(state.errors).length > 0) {
      const errorMessages = Object.values(state.errors).flat()
      errorMessages.forEach((error) => {
        toast.error("Login failed", {
          description: error,
        })
      })
      // Stop loading
      setIsLoading(false)
    } else if (!state.requiresTwoFactor) {
      // If not requiring 2FA and no errors, reset loading state
      setIsLoading(false)
    }
  }, [state, router])

  const formVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  }

  // If 2FA is required, show the verification form
  if (state.requiresTwoFactor && state.userId && state.twoFactorMethod) {
    return (
      <TwoFactorVerificationForm
        userId={state.userId}
        methodId={state.twoFactorMethod.id}
        methodType={state.twoFactorMethod.type}
      />
    )
  }

  return (
    <motion.div initial="hidden" animate="visible" variants={formVariants}>
      <motion.form
        action={formAction}
        onSubmit={() => setIsLoading(true)}
        className="grid gap-5"
        variants={formVariants}
      >
        <div className="grid gap-4">
          <motion.div className="space-y-2" variants={itemVariants}>
            <Label htmlFor="email" className="text-sm font-medium">
              Email
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                name="email"
                placeholder="name@example.com"
                type="email"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                disabled={isLoading}
                required
                className="pl-10"
              />
            </div>
          </motion.div>

          <motion.div className="space-y-2" variants={itemVariants}>
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="text-sm font-medium">
                Password
              </Label>
              <Link
                href="/forgot-password"
                className="text-xs text-muted-foreground hover:text-primary transition-colors"
              >
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                name="password"
                placeholder="••••••••"
                type="password"
                autoComplete="current-password"
                disabled={isLoading}
                required
                className="pl-10"
              />
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Button disabled={isLoading} className="w-full mt-2 transition-all" type="submit">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Logging in...
                </>
              ) : (
                "Log in"
              )}
            </Button>
          </motion.div>
        </div>

        <motion.div className="relative" variants={itemVariants}>
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
          </div>
        </motion.div>

        <motion.div className="grid grid-cols-2 gap-3" variants={itemVariants}>
          <Button variant="outline" type="button" disabled={isLoading} className="transition-all">
            <Github className="mr-2 h-4 w-4" />
            Github
          </Button>
          <Button variant="outline" type="button" disabled={isLoading} className="transition-all">
            <Google className="mr-2 h-4 w-4" />
            Google
          </Button>
        </motion.div>

        <motion.div className="text-center text-sm" variants={itemVariants}>
          Don't have an account?{" "}
          <Link href="/sign-up" className="font-medium text-primary hover:underline transition-all">
            Sign up
          </Link>
        </motion.div>
      </motion.form>
    </motion.div>
  )
}
