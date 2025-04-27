"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Loader2, ShieldCheck, Smartphone, Mail, KeyRound, ArrowLeft } from "lucide-react"
import { motion } from "framer-motion"
import { verifyTwoFactor, type AuthState } from "@/actions/auth.actions"
import { useActionState } from "react"
import { toast } from "sonner"
import { TwoFactorType } from "@prisma/client"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

// Initial state for the form
const initialState: AuthState = {
  success: false,
  errors: {},
}

interface TwoFactorVerificationFormProps {
  userId: string
  methodId: string
  methodType: TwoFactorType
}

export function TwoFactorVerificationForm({ userId, methodId, methodType }: TwoFactorVerificationFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [code, setCode] = useState("")
  const formRef = useRef<HTMLFormElement>(null)
  const router = useRouter()

  // Use the action state hook
  const [state, formAction] = useActionState(verifyTwoFactor, initialState)

  // Effect to handle successful verification and errors
  useEffect(() => {
    if (state.success) {
      router.push("/dashboard")
    } else if (state.errors && Object.keys(state.errors).length > 0) {
      const errorMessages = Object.values(state.errors).flat()
      errorMessages.forEach((error) => {
        toast.error("Verification failed", {
          description: error,
        })
      })
      // Stop loading
      setIsLoading(false)
    }
  }, [state, router])

  // Handle OTP value change
  const handleOTPChange = (value: string) => {
    setCode(value)

    // Submit form if all digits are entered
    if (value.length === 6 && formRef.current) {
      formRef.current.requestSubmit()
    }
  }

  // Handle change for TOTP/Authenticator input
  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 6)
    setCode(value)
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

  // Get the appropriate icon and title based on method type
  const getMethodDetails = () => {
    switch (methodType) {
      case TwoFactorType.EMAIL:
        return {
          icon: <Mail className="h-16 w-16 text-primary" />,
          title: "Email Verification",
          description: "We've sent a verification code to your email. Please enter the 6-digit code to continue.",
        }
      case TwoFactorType.SMS:
        return {
          icon: <Smartphone className="h-16 w-16 text-primary" />,
          title: "SMS Verification",
          description: "We've sent a verification code to your phone. Please enter the 6-digit code to continue.",
        }
      case TwoFactorType.TOTP:
      case TwoFactorType.AUTHENTICATOR:
        return {
          icon: <KeyRound className="h-16 w-16 text-primary" />,
          title: "Authenticator Verification",
          description: "Enter the 6-digit code from your authenticator app to continue.",
        }
      default:
        return {
          icon: <ShieldCheck className="h-16 w-16 text-primary" />,
          title: "Two-Factor Authentication",
          description: "Enter the verification code to continue.",
        }
    }
  }

  const { icon, title, description } = getMethodDetails()

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={formVariants}
      className="max-w-md mx-auto w-full px-4 sm:px-0"
    >
      <Card className="border-0 shadow-lg bg-gradient-to-b from-card/50 to-card">
        <CardHeader className="pb-4 space-y-4">
          <div className="mx-auto rounded-full bg-primary/10 p-4 w-24 h-24 flex items-center justify-center">
            {icon}
          </div>
          <div className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold">{title}</CardTitle>
            <CardDescription className="text-muted-foreground">{description}</CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          <motion.form
            ref={formRef}
            action={formAction}
            onSubmit={() => setIsLoading(true)}
            className="grid gap-6"
            variants={formVariants}
          >
            <input type="hidden" name="userId" value={userId} />
            <input type="hidden" name="methodId" value={methodId} />
            <input type="hidden" name="methodType" value={methodType} />
            <input type="hidden" name="code" value={code} />

            <motion.div variants={itemVariants} className="py-4">
              {methodType === TwoFactorType.EMAIL || methodType === TwoFactorType.SMS ? (
                <>
                  <Label htmlFor="otp-input" className="sr-only">
                    Verification Code
                  </Label>
                  <div className="flex justify-center">
                    <InputOTP maxLength={6} value={code} onChange={handleOTPChange} disabled={isLoading}>
                      <InputOTPGroup>
                        <InputOTPSlot
                          index={0}
                          className="w-12 h-14 text-center text-xl font-medium rounded-md border-2 focus-within:ring-2 focus-within:ring-primary focus-within:border-primary transition-all"
                        />
                        <InputOTPSlot
                          index={1}
                          className="w-12 h-14 text-center text-xl font-medium rounded-md border-2 focus-within:ring-2 focus-within:ring-primary focus-within:border-primary transition-all"
                        />
                        <InputOTPSlot
                          index={2}
                          className="w-12 h-14 text-center text-xl font-medium rounded-md border-2 focus-within:ring-2 focus-within:ring-primary focus-within:border-primary transition-all"
                        />
                        <InputOTPSlot
                          index={3}
                          className="w-12 h-14 text-center text-xl font-medium rounded-md border-2 focus-within:ring-2 focus-within:ring-primary focus-within:border-primary transition-all"
                        />
                        <InputOTPSlot
                          index={4}
                          className="w-12 h-14 text-center text-xl font-medium rounded-md border-2 focus-within:ring-2 focus-within:ring-primary focus-within:border-primary transition-all"
                        />
                        <InputOTPSlot
                          index={5}
                          className="w-12 h-14 text-center text-xl font-medium rounded-md border-2 focus-within:ring-2 focus-within:ring-primary focus-within:border-primary transition-all"
                        />
                      </InputOTPGroup>
                    </InputOTP>
                  </div>
                </>
              ) : (
                <>
                  <Label htmlFor="authenticator-code" className="sr-only">
                    Authenticator Code
                  </Label>
                  <Input
                    id="authenticator-code"
                    type="text"
                    inputMode="numeric"
                    placeholder="Enter 6-digit code"
                    value={code}
                    onChange={handleCodeChange}
                    disabled={isLoading}
                    className="text-center text-xl font-medium h-14 rounded-md border-2 focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-primary transition-all"
                    autoFocus
                    maxLength={6}
                  />
                </>
              )}
            </motion.div>

            <motion.div variants={itemVariants}>
              <Button
                disabled={isLoading || code.length !== 6}
                className="w-full h-12 text-base font-medium transition-all bg-primary hover:bg-primary/90"
                type="submit"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  "Verify Code"
                )}
              </Button>
            </motion.div>
          </motion.form>
        </CardContent>

        <CardFooter className="flex flex-col gap-4 pt-2 pb-6">
          <div className="text-center text-sm text-muted-foreground">
            Didn't receive a code?{" "}
            <Button variant="link" className="p-0 h-auto font-medium" disabled={isLoading}>
              Resend Code
            </Button>
          </div>

          <Button
            variant="ghost"
            size="sm"
            className="mx-auto flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => router.push("/sign-in")}
          >
            <ArrowLeft className="h-4 w-4" />
            Back to login
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
