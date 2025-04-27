"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Loader2, Shield, Key, AlertTriangle, Smartphone, Mail } from "lucide-react"
import { toast } from "sonner"
import {
  changePassword,
  enableTwoFactor,
  disableTwoFactor,
  verifyTwoFactorSetup,
  getUserSessions,
  revokeSession,
  revokeAllSessions,
  getTwoFactorMethods,
  addTwoFactorMethod,
  removeTwoFactorMethod,
  setDefaultTwoFactorMethod,
} from "@/actions/user.actions"
import type { TwoFactorType } from "@prisma/client"

interface SecuritySettingsProps {
  user?: {
    id: string
    email: string
    twoFactorEnabled?: boolean
  }
}

export default function SecuritySettings({ user }: SecuritySettingsProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [isTwoFactorEnabled, setIsTwoFactorEnabled] = useState(user?.twoFactorEnabled || false)
  const [sessions, setSessions] = useState<any[]>([])
  const [twoFactorMethods, setTwoFactorMethods] = useState<any[]>([])
  const [showTwoFactorSetupDialog, setShowTwoFactorSetupDialog] = useState(false)
  const [showAddMethodDialog, setShowAddMethodDialog] = useState(false)
  const [selectedMethodType, setSelectedMethodType] = useState<TwoFactorType | null>(null)
  const [setupData, setSetupData] = useState<{
    qrCode?: string
    secret?: string
    verificationCode: string
  }>({
    verificationCode: "",
  })
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  // Fetch sessions and 2FA methods on component mount
  useEffect(() => {
    const fetchSecurityData = async () => {
      try {
        const [sessionsResult, methodsResult] = await Promise.all([getUserSessions(), getTwoFactorMethods()])

        if (sessionsResult.success) {
          setSessions(sessionsResult.sessions)
        }

        if (methodsResult.success) {
          setTwoFactorMethods(methodsResult.methods)
        }
      } catch (error) {
        console.error("Failed to fetch security data:", error)
      }
    }

    fetchSecurityData()
  }, [])

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPasswordData((prev) => ({ ...prev, [name]: value }))
  }

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("Passwords do not match")
      return
    }

    setIsLoading(true)

    try {
      const result = await changePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      })

      if (result.success) {
        toast.success("Password changed successfully")
        setPasswordData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        })
      } else {
        toast.error("Failed to change password", {
          description: result.error,
        })
      }
    } catch (error) {
      toast.error("An error occurred")
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleTwoFactorToggle = async () => {
    if (isTwoFactorEnabled) {
      // Disable 2FA
      handleDisableTwoFactor()
    } else {
      // Show setup dialog
      setShowTwoFactorSetupDialog(true)
      const result = await enableTwoFactor()
      if (result.success) {
        setSetupData({
          ...setupData,
          qrCode: result.qrCode,
          secret: result.secret,
        })
      } else {
        toast.error("Failed to initialize two-factor authentication")
        setShowTwoFactorSetupDialog(false)
      }
    }
  }

  const handleDisableTwoFactor = async () => {
    setIsLoading(true)
    try {
      const result = await disableTwoFactor()
      if (result.success) {
        setIsTwoFactorEnabled(false)
        toast.success("Two-factor authentication disabled")
      } else {
        toast.error("Failed to disable two-factor authentication", {
          description: result.error,
        })
      }
    } catch (error) {
      toast.error("An error occurred")
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleVerifyTwoFactorSetup = async () => {
    setIsLoading(true)
    try {
      const result = await verifyTwoFactorSetup({
        code: setupData.verificationCode,
        secret: setupData.secret || "",
      })

      if (result.success) {
        setIsTwoFactorEnabled(true)
        setShowTwoFactorSetupDialog(false)
        toast.success("Two-factor authentication enabled successfully")

        // Refresh 2FA methods
        const methodsResult = await getTwoFactorMethods()
        if (methodsResult.success) {
          setTwoFactorMethods(methodsResult.methods)
        }
      } else {
        toast.error("Failed to verify code", {
          description: result.error,
        })
      }
    } catch (error) {
      toast.error("An error occurred")
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleRevokeSession = async (sessionId: string) => {
    try {
      const result = await revokeSession(sessionId)
      if (result.success) {
        setSessions(sessions.filter((session) => session.id !== sessionId))
        toast.success("Session revoked successfully")
      } else {
        toast.error("Failed to revoke session")
      }
    } catch (error) {
      toast.error("An error occurred")
      console.error(error)
    }
  }

  const handleRevokeAllSessions = async () => {
    try {
      const result = await revokeAllSessions()
      if (result.success) {
        // Keep only current session
        const currentSession = sessions.find((session) => session.isCurrent)
        setSessions(currentSession ? [currentSession] : [])
        toast.success("All other sessions revoked successfully")
      } else {
        toast.error("Failed to revoke sessions")
      }
    } catch (error) {
      toast.error("An error occurred")
      console.error(error)
    }
  }

  const handleAddTwoFactorMethod = async () => {
    if (!selectedMethodType) return

    setIsLoading(true)
    try {
      const result = await addTwoFactorMethod(selectedMethodType)
      if (result.success) {
        if (selectedMethodType === "TOTP" || selectedMethodType === "AUTHENTICATOR") {
          setSetupData({
            ...setupData,
            qrCode: result.qrCode,
            secret: result.secret,
            verificationCode: "",
          })
          setShowAddMethodDialog(false)
          setShowTwoFactorSetupDialog(true)
        } else {
          // For SMS and EMAIL, we might have a different flow
          toast.success(`${selectedMethodType} authentication method added`)
          setShowAddMethodDialog(false)

          // Refresh 2FA methods
          const methodsResult = await getTwoFactorMethods()
          if (methodsResult.success) {
            setTwoFactorMethods(methodsResult.methods)
          }
        }
      } else {
        toast.error(`Failed to add ${selectedMethodType} authentication method`, {
          description: result.error,
        })
      }
    } catch (error) {
      toast.error("An error occurred")
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleRemoveTwoFactorMethod = async (methodId: string) => {
    try {
      const result = await removeTwoFactorMethod(methodId)
      if (result.success) {
        setTwoFactorMethods(twoFactorMethods.filter((method) => method.id !== methodId))
        toast.success("Authentication method removed successfully")

        // If no methods left, disable 2FA
        if (twoFactorMethods.length <= 1) {
          setIsTwoFactorEnabled(false)
        }
      } else {
        toast.error("Failed to remove authentication method")
      }
    } catch (error) {
      toast.error("An error occurred")
      console.error(error)
    }
  }

  const handleSetDefaultMethod = async (methodId: string) => {
    try {
      const result = await setDefaultTwoFactorMethod(methodId)
      if (result.success) {
        // Update the methods list to reflect the new default
        setTwoFactorMethods(
          twoFactorMethods.map((method) => ({
            ...method,
            isPrimary: method.id === methodId,
          })),
        )
        toast.success("Default authentication method updated")
      } else {
        toast.error("Failed to update default method")
      }
    } catch (error) {
      toast.error("An error occurred")
      console.error(error)
    }
  }

  const getMethodIcon = (type: TwoFactorType) => {
    switch (type) {
      case "TOTP":
      case "AUTHENTICATOR":
        return <Smartphone className="h-5 w-5" />
      case "SMS":
        return <Smartphone className="h-5 w-5" />
      case "EMAIL":
        return <Mail className="h-5 w-5" />
      default:
        return <Shield className="h-5 w-5" />
    }
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="password" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="password">Password</TabsTrigger>
          <TabsTrigger value="two-factor">Two-Factor Auth</TabsTrigger>
          <TabsTrigger value="sessions">Active Sessions</TabsTrigger>
        </TabsList>

        <TabsContent value="password" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
              <CardDescription>Update your password to keep your account secure</CardDescription>
            </CardHeader>
            <CardContent>
              <form id="password-form" onSubmit={handlePasswordSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input
                    id="currentPassword"
                    name="currentPassword"
                    type="password"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input
                    id="newPassword"
                    name="newPassword"
                    type="password"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                    required
                  />
                </div>
              </form>
            </CardContent>
            <CardFooter>
              <Button type="submit" form="password-form" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Change Password
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="two-factor" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center">
                <Shield className="h-5 w-5 mr-2 text-primary" />
                <CardTitle>Two-Factor Authentication</CardTitle>
              </div>
              <CardDescription>Add an extra layer of security to your account</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="font-medium">Two-Factor Authentication</p>
                  <p className="text-sm text-muted-foreground">
                    {isTwoFactorEnabled
                      ? "Your account is protected with two-factor authentication"
                      : "Protect your account with two-factor authentication"}
                  </p>
                </div>
                <Switch checked={isTwoFactorEnabled} onCheckedChange={handleTwoFactorToggle} disabled={isLoading} />
              </div>

              {isTwoFactorEnabled && twoFactorMethods.length > 0 && (
                <div className="mt-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-medium">Authentication Methods</h3>
                    <Button variant="outline" size="sm" onClick={() => setShowAddMethodDialog(true)}>
                      Add Method
                    </Button>
                  </div>

                  <div className="space-y-3">
                    {twoFactorMethods.map((method) => (
                      <div key={method.id} className="flex items-center justify-between p-3 border rounded-md">
                        <div className="flex items-center space-x-3">
                          {getMethodIcon(method.type)}
                          <div>
                            <p className="font-medium">{method.type}</p>
                            <p className="text-xs text-muted-foreground">
                              {method.isPrimary && "Default method • "}
                              Last used:{" "}
                              {method.lastUsedAt ? new Date(method.lastUsedAt).toLocaleDateString() : "Never"}
                            </p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          {!method.isPrimary && (
                            <Button variant="ghost" size="sm" onClick={() => handleSetDefaultMethod(method.id)}>
                              Set Default
                            </Button>
                          )}
                          <Button variant="outline" size="sm" onClick={() => handleRemoveTwoFactorMethod(method.id)}>
                            Remove
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sessions" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center">
                <Key className="h-5 w-5 mr-2 text-primary" />
                <CardTitle>Active Sessions</CardTitle>
              </div>
              <CardDescription>Manage your active sessions and devices</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sessions.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No active sessions found.</p>
                ) : (
                  sessions.map((session) => (
                    <div key={session.id} className="flex items-start justify-between">
                      <div className="space-y-1">
                        <p className="font-medium">
                          {session.userAgent?.os} • {session.userAgent?.browser}
                          {session.isCurrent && " (Current)"}
                        </p>
                        <p className="text-sm text-muted-foreground">{session.ipAddress}</p>
                        <p className="text-xs text-muted-foreground">
                          {session.isCurrent
                            ? "Active now"
                            : `Last active ${new Date(session.createdAt).toLocaleString()}`}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        {session.isCurrent ? (
                          <div className="flex h-2 w-2 rounded-full bg-green-500" />
                        ) : (
                          <Button variant="outline" size="sm" onClick={() => handleRevokeSession(session.id)}>
                            Revoke
                          </Button>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button
                variant="outline"
                className="w-full"
                onClick={handleRevokeAllSessions}
                disabled={sessions.length <= 1}
              >
                <AlertTriangle className="h-4 w-4 mr-2 text-destructive" />
                Log Out All Other Sessions
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Two-Factor Setup Dialog */}
      <Dialog open={showTwoFactorSetupDialog} onOpenChange={setShowTwoFactorSetupDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Set up Two-Factor Authentication</DialogTitle>
            <DialogDescription>
              Scan the QR code with your authenticator app or enter the code manually.
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col items-center space-y-4 py-4">
            {setupData.qrCode && (
              <div className="border p-2 rounded-md">
                <img src={setupData.qrCode || "/placeholder.svg"} alt="QR Code" className="w-48 h-48" />
              </div>
            )}

            {setupData.secret && (
              <div className="flex flex-col items-center space-y-2">
                <p className="text-sm font-medium">Manual entry code:</p>
                <code className="bg-muted px-2 py-1 rounded text-sm">{setupData.secret}</code>
              </div>
            )}

            <div className="w-full space-y-2">
              <Label htmlFor="verificationCode">Verification Code</Label>
              <Input
                id="verificationCode"
                placeholder="Enter 6-digit code"
                value={setupData.verificationCode}
                onChange={(e) => setSetupData({ ...setupData, verificationCode: e.target.value })}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowTwoFactorSetupDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleVerifyTwoFactorSetup} disabled={isLoading || !setupData.verificationCode}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Verify
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add 2FA Method Dialog */}
      <Dialog open={showAddMethodDialog} onOpenChange={setShowAddMethodDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add Authentication Method</DialogTitle>
            <DialogDescription>Choose an authentication method to add to your account.</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="grid grid-cols-1 gap-4">
              <Button
                variant="outline"
                className={`flex justify-start items-center h-auto p-4 ${
                  selectedMethodType === "AUTHENTICATOR" ? "border-primary" : ""
                }`}
                onClick={() => setSelectedMethodType("AUTHENTICATOR")}
              >
                <Smartphone className="h-5 w-5 mr-3" />
                <div className="text-left">
                  <p className="font-medium">Authenticator App</p>
                  <p className="text-sm text-muted-foreground">Use an app like Google Authenticator or Authy</p>
                </div>
              </Button>

              <Button
                variant="outline"
                className={`flex justify-start items-center h-auto p-4 ${
                  selectedMethodType === "SMS" ? "border-primary" : ""
                }`}
                onClick={() => setSelectedMethodType("SMS")}
              >
                <Smartphone className="h-5 w-5 mr-3" />
                <div className="text-left">
                  <p className="font-medium">SMS Authentication</p>
                  <p className="text-sm text-muted-foreground">Receive codes via text message</p>
                </div>
              </Button>

              <Button
                variant="outline"
                className={`flex justify-start items-center h-auto p-4 ${
                  selectedMethodType === "EMAIL" ? "border-primary" : ""
                }`}
                onClick={() => setSelectedMethodType("EMAIL")}
              >
                <Mail className="h-5 w-5 mr-3" />
                <div className="text-left">
                  <p className="font-medium">Email Authentication</p>
                  <p className="text-sm text-muted-foreground">Receive codes via email</p>
                </div>
              </Button>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddMethodDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddTwoFactorMethod} disabled={isLoading || !selectedMethodType}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Add Method
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
