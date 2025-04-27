"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { PlusCircle, Settings, Shield, Zap } from 'lucide-react'

// Types for our data
interface InvitationRequest {
  id: string
  name: string
  email: string
  role: string
  organization: string
  date: string
}

interface SecurityAlert {
  id: string
  title: string
  description: string
  severity: string // Changed from "High" | "Medium" | "Low" to string
  time: string
}

interface Integration {
  id: string
  name: string
  status: string // Changed from "Connected" | "Disconnected" | "Issue" to string
  lastSync: string
}

interface OrganizationCardsProps {
  invitationRequests?: InvitationRequest[]
  securityAlerts?: SecurityAlert[]
  integrations?: Integration[]
}

export default function OrganizationCards({
  invitationRequests = [],
  securityAlerts = [],
  integrations = [],
}: OrganizationCardsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle>Invitation Requests</CardTitle>
          <CardDescription>Pending team member invitations.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {invitationRequests.length > 0 ? (
              invitationRequests.map((invitation) => (
                <div 
                  key={invitation.id} 
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-lg border p-3"
                >
                  <div className="flex items-start space-x-3">
                    <Avatar className="h-9 w-9 flex-shrink-0">
                      <AvatarFallback>{invitation.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium truncate">{invitation.name}</p>
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground">
                        <span className="truncate max-w-[150px]">{invitation.email}</span>
                        <span className="hidden xs:inline-block">•</span>
                        <span>{invitation.role}</span>
                      </div>
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground mt-1">
                        <Badge variant="outline" className="truncate max-w-[120px]">{invitation.organization}</Badge>
                        <span className="hidden xs:inline-block">•</span>
                        <span>Requested: {invitation.date}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex sm:flex-col space-x-2 sm:space-x-0 sm:space-y-1 mt-2 sm:mt-0">
                    <Button size="sm" className="flex-1 sm:w-20 sm:flex-none">
                      Accept
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1 sm:w-20 sm:flex-none">
                      Decline
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">No pending invitation requests.</p>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Security Alerts</CardTitle>
          <CardDescription>Recent security-related notifications.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {securityAlerts.length > 0 ? (
              securityAlerts.map((alert) => (
                <div key={alert.id} className="rounded-lg border p-3">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div className="flex items-center space-x-2">
                      <div
                        className={`rounded-full p-1 flex-shrink-0 ${
                          alert.severity === "High"
                            ? "bg-red-100 text-red-600"
                            : alert.severity === "Medium"
                              ? "bg-amber-100 text-amber-600"
                              : "bg-green-100 text-green-600"
                        }`}
                      >
                        <Shield className="h-4 w-4" />
                      </div>
                      <p className="text-sm font-medium line-clamp-1">{alert.title}</p>
                    </div>
                    <Badge
                      variant={
                        alert.severity === "High" ? "destructive" : alert.severity === "Medium" ? "default" : "outline"
                      }
                      className="flex-shrink-0"
                    >
                      {alert.severity}
                    </Badge>
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground line-clamp-2">{alert.description}</p>
                  <div className="mt-2 flex items-center justify-between">
                    <p className="text-xs text-muted-foreground">{alert.time}</p>
                    <Button variant="link" size="sm" className="h-auto p-0">
                      View Details
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">No security alerts.</p>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Integrations</CardTitle>
          <CardDescription>Connected services and their status.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {integrations.length > 0 ? (
              integrations.map((integration) => (
                <div 
                  key={integration.id} 
                  className="flex flex-col xs:flex-row xs:items-center xs:justify-between gap-2 rounded-lg border p-3"
                >
                  <div className="flex items-center space-x-3">
                    <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <Zap className="h-5 w-5 text-primary" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium truncate">{integration.name}</p>
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground">
                        <Badge
                          variant={integration.status === "Connected" ? "outline" : "destructive"}
                          className="px-1 text-[10px]"
                        >
                          {integration.status}
                        </Badge>
                        <span className="hidden xs:inline-block">•</span>
                        <span>Synced: {integration.lastSync}</span>
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8 ml-auto xs:ml-0">
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">No integrations connected.</p>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Integration
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
