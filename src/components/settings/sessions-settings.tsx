"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Loader2, Monitor, Smartphone, Laptop, AlertTriangle, Tablet } from "lucide-react"
import { toast } from "sonner"
import { getUserSessions, revokeSession, revokeAllSessions } from "@/actions/user.actions"

interface Session {
  id: string
  ipAddress: string | null
  userAgent: {
    browser: string
    os: string
    device: string
  } | null
  createdAt: Date
  expiresAt: Date
  isCurrent: boolean
}

export default function SessionsSettings() {
  const [sessions, setSessions] = useState<Session[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [sessionToRevoke, setSessionToRevoke] = useState<string | null>(null)

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        setIsLoading(true)
        const result = await getUserSessions()
        if (result.success) {
          setSessions(result.sessions)
        }
      } catch (error) {
        console.error("Failed to fetch sessions:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchSessions()
  }, [])

  const handleRevokeSession = async (sessionId: string) => {
    try {
      const result = await revokeSession(sessionId)
      if (result.success) {
        setSessions(sessions.filter((session) => session.id !== sessionId))
        toast.success("Session revoked successfully")
      } else {
        toast.error("Failed to revoke session", {
          description: result.error,
        })
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
        toast.error("Failed to revoke sessions", {
          description: result.error,
        })
      }
    } catch (error) {
      toast.error("An error occurred")
      console.error(error)
    } finally {
      setShowConfirmDialog(false)
    }
  }

  const getDeviceIcon = (session: Session) => {
    if (!session.userAgent) return <Monitor className="h-5 w-5" />

    const device = session.userAgent.device.toLowerCase()

    if (device.includes("mobile") || device.includes("phone")) {
      return <Smartphone className="h-5 w-5" />
    } else if (device.includes("tablet")) {
      return <Tablet className="h-5 w-5" />
    } else {
      return <Laptop className="h-5 w-5" />
    }
  }

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleString()
  }

  const getTimeAgo = (date: Date) => {
    const now = new Date()
    const diffMs = now.getTime() - new Date(date).getTime()
    const diffSec = Math.round(diffMs / 1000)
    const diffMin = Math.round(diffSec / 60)
    const diffHour = Math.round(diffMin / 60)
    const diffDay = Math.round(diffHour / 24)

    if (diffSec < 60) return `${diffSec} seconds ago`
    if (diffMin < 60) return `${diffMin} minutes ago`
    if (diffHour < 24) return `${diffHour} hours ago`
    if (diffDay < 30) return `${diffDay} days ago`
    return formatDate(date)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Active Sessions</h2>
        <p className="text-sm text-muted-foreground">Manage your active sessions across different devices</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Device Sessions</CardTitle>
          <CardDescription>These are the devices that are currently logged into your account</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center py-6">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
            </div>
          ) : sessions.length === 0 ? (
            <div className="text-center py-6">
              <p className="text-sm text-muted-foreground">No active sessions found</p>
            </div>
          ) : (
            <div className="space-y-4">
              {sessions.map((session) => (
                <div key={session.id} className="flex items-start justify-between p-4 border rounded-md">
                  <div className="flex items-start space-x-3">
                    <div className="mt-1">{getDeviceIcon(session)}</div>
                    <div className="space-y-1">
                      <p className="font-medium">
                        {session.userAgent?.browser} on {session.userAgent?.os}
                        {session.isCurrent && " (Current)"}
                      </p>
                      <p className="text-sm text-muted-foreground">IP: {session.ipAddress || "Unknown"}</p>
                      <div className="flex items-center space-x-2">
                        <p className="text-xs text-muted-foreground">
                          {session.isCurrent ? "Active now" : `Last active ${getTimeAgo(session.createdAt)}`}
                        </p>
                        {session.isCurrent && <span className="flex h-2 w-2 rounded-full bg-green-500"></span>}
                      </div>
                    </div>
                  </div>
                  {!session.isCurrent && (
                    <Button variant="outline" size="sm" onClick={() => handleRevokeSession(session.id)}>
                      Revoke
                    </Button>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => setShowConfirmDialog(true)}
            disabled={sessions.length <= 1}
          >
            <AlertTriangle className="h-4 w-4 mr-2 text-destructive" />
            Log Out All Other Sessions
          </Button>
        </CardFooter>
      </Card>

      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Log out all other sessions?</AlertDialogTitle>
            <AlertDialogDescription>
              This will log you out from all devices except the current one. You&apos;ll need to log in again on those
              devices.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleRevokeAllSessions} className="bg-destructive text-destructive-foreground">
              Log Out All Other Sessions
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
