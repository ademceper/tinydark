"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Loader2, Lock } from "lucide-react"
import { motion } from "framer-motion"
import { resetPassword, type AuthState } from "@/actions/auth.actions"
import { useFormState } from "react-dom"
import { toast } from "sonner"

// Initial state for the form
const initialState: AuthState = {
  success: false,
  errors: {},
}

export function ResetPasswordForm({ token }: { token: string }) {
  const [isLoading, setIsLoading] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(0)
  const [state, formAction] = useFormState(resetPassword, initialState)
  const router = useRouter()

  // Effect to handle successful reset and errors
  useEffect(() => {
    if (state.success) {
      toast.success("Password reset successful", {
        description: "Your password has been reset. Redirecting to login...",
      })
      // Redirect to login after a short delay
      setTimeout(() => {
        router.push("/sign-in")
      }, 2000)
    } else if (state.errors && Object.keys(state.errors).length > 0) {
      // Display errors with Sonner
      const errorMessages = Object.values(state.errors).flat()
      errorMessages.forEach((error) => {
        toast.error("Password reset failed", {
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
        action={async (formData) => {
          setIsLoading(true)
          formData.append("token", token)
          await formAction(formData)
          // We'll handle the success case in the useEffect
          setIsLoading(false)
        }}
        className="grid gap-5"
        variants={formVariants}
      >
        <div className="grid gap-4">
          <motion.div className="space-y-2" variants={itemVariants}>
            <Label htmlFor="password" className="text-sm font-medium">
              New Password
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
                  Resetting...
                </>
              ) : (
                "Reset Password"
              )}
            </Button>
          </motion.div>
        </div>
      </motion.form>
    </motion.div>
  )
}
