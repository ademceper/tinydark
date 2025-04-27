"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Loader2, Mail } from 'lucide-react'
import { motion } from "framer-motion"
import { requestPasswordReset, type AuthState } from "@/actions/auth.actions"
import { useFormState } from "react-dom"
import { toast } from "sonner"

// Initial state for the form
const initialState: AuthState = {
  success: false,
  errors: {},
}

export function ForgotPasswordForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [state, formAction] = useFormState(requestPasswordReset, initialState)
  const [emailSent, setEmailSent] = useState(false)

  // Effect to handle successful request and errors
  useEffect(() => {
    if (state.success) {
      setEmailSent(true)
      toast.success("Reset link sent", {
        description: "Check your email for a link to reset your password.",
      })
    } else if (state.errors && Object.keys(state.errors).length > 0) {
      // Display errors with Sonner
      const errorMessages = Object.values(state.errors).flat()
      errorMessages.forEach((error) => {
        toast.error("Request failed", {
          description: error,
        })
      })
      // Stop loading
      setIsLoading(false)
    }
  }, [state])

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

  if (emailSent) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-muted p-6 rounded-lg text-center"
      >
        <div className="flex flex-col items-center space-y-4">
          <div className="bg-primary/10 p-3 rounded-full">
            <Mail className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-lg font-medium">Check your email</h3>
          <p className="text-sm text-muted-foreground">
            We&apos;ve sent a password reset link to your email address. Please check your inbox.
          </p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => {
              setEmailSent(false)
              setIsLoading(false)
            }}
          >
            Send again
          </Button>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div initial="hidden" animate="visible" variants={formVariants}>
      <motion.form
        action={async (formData) => {
          setIsLoading(true)
          await formAction(formData)
          // We'll handle the success case in the useEffect
          setIsLoading(false)
        }}
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

          <motion.div variants={itemVariants}>
            <Button disabled={isLoading} className="w-full mt-2 transition-all" type="submit">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                "Send Reset Link"
              )}
            </Button>
          </motion.div>
        </div>
      </motion.form>
    </motion.div>
  )
}
