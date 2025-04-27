"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Loader2, Mail, Lock, User, Github, ChromeIcon as Google } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { register, type AuthState } from "@/actions/auth.actions"
import { useFormState } from "react-dom"
import { showToast } from "@/lib/toast"

// Initial state for the form
const initialState: AuthState = {
  success: false,
  errors: {},
}

export function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(0)
  const [state, formAction] = useFormState(register, initialState)
  const router = useRouter()

  // Effect to handle successful registration and errors
  useEffect(() => {
    if (state.success) {
      showToast("success", "Registration successful", {
        description: "Your account has been created. Redirecting to dashboard...",
      })
      router.push("/dashboard")
    } else if (state.errors && Object.keys(state.errors).length > 0) {
      // Display errors with Sonner
      const errorMessages = Object.values(state.errors).flat()
      errorMessages.forEach((error) => {
        showToast("error", "Registration failed", {
          description: error,
        })
      })
      // Stop loading
      setIsLoading(false)
    }
  }, [state, router])

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value
    // Simple password strength calculation
    let strength = 0
    if (password.length > 6) strength += 1
    if (password.match(/[A-Z]/)) strength += 1
    if (password.match(/[0-9]/)) strength += 1
    if (password.match(/[^a-zA-Z0-9]/)) strength += 1
    setPasswordStrength(strength)
  }

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
            <Label htmlFor="name" className="text-sm font-medium">
              Full Name
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="name"
                name="name"
                placeholder="John Doe"
                type="text"
                autoCapitalize="words"
                autoComplete="name"
                disabled={isLoading}
                required
                className="pl-10"
              />
            </div>
          </motion.div>

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
            <Label htmlFor="password" className="text-sm font-medium">
              Password
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                name="password"
                placeholder="••••••••"
                type="password"
                autoComplete="new-password"
                disabled={isLoading}
                required
                className="pl-10"
                onChange={handlePasswordChange}
              />
            </div>
            {/* Password strength indicator */}
            <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-300 ${
                  passwordStrength === 0
                    ? "w-0"
                    : passwordStrength === 1
                      ? "w-1/4 bg-red-500"
                      : passwordStrength === 2
                        ? "w-2/4 bg-yellow-500"
                        : passwordStrength === 3
                          ? "w-3/4 bg-blue-500"
                          : "w-full bg-green-500"
                }`}
              />
            </div>
            <p className="text-xs text-muted-foreground">Use 8+ characters with a mix of letters, numbers & symbols</p>
          </motion.div>

          <motion.div className="space-y-2" variants={itemVariants}>
            <Label htmlFor="confirm-password" className="text-sm font-medium">
              Confirm Password
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="confirm-password"
                name="confirm-password"
                placeholder="••••••••"
                type="password"
                autoComplete="new-password"
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
                  Creating Account...
                </>
              ) : (
                "Create Account"
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
          Already have an account?{" "}
          <Link href="/sign-in" className="font-medium text-primary hover:underline transition-all">
            Sign in
          </Link>
        </motion.div>
      </motion.form>
    </motion.div>
  )
}
