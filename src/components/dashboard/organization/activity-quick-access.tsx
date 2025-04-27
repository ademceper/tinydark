"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Activity, Users, Settings, BarChart3, FileText, Zap, HelpCircle } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

// Define the organization type
interface Organization {
  id: string
  name: string
  activity: {
    id: string
    user: string
    action: string
    target: string
    timestamp: string
  }[]
}

// Define the quick access item type
interface QuickAccessItem {
  id: string
  icon: string
  title: string
  description: string
  iconColor: string
  onClick: () => void
}

interface ActivityQuickAccessProps {
  organizations: Organization[]
  quickAccessItems?: QuickAccessItem[]
  onViewAllActivity?: () => void
}

// Default quick access items
const defaultQuickAccessItems: QuickAccessItem[] = [
  {
    id: "qa-1",
    icon: "Users",
    title: "Team Members",
    description: "Manage your team",
    iconColor: "text-blue-500",
    onClick: () => console.log("Team Members clicked"),
  },
  {
    id: "qa-2",
    icon: "Settings",
    title: "Settings",
    description: "Configure workspace",
    iconColor: "text-gray-500",
    onClick: () => console.log("Settings clicked"),
  },
  {
    id: "qa-3",
    icon: "BarChart3",
    title: "Analytics",
    description: "View insights",
    iconColor: "text-purple-500",
    onClick: () => console.log("Analytics clicked"),
  },
  {
    id: "qa-4",
    icon: "FileText",
    title: "Documents",
    description: "Access files",
    iconColor: "text-green-500",
    onClick: () => console.log("Documents clicked"),
  },
  {
    id: "qa-5",
    icon: "Zap",
    title: "Integrations",
    description: "Connect services",
    iconColor: "text-amber-500",
    onClick: () => console.log("Integrations clicked"),
  },
  {
    id: "qa-6",
    icon: "HelpCircle",
    title: "Help & Support",
    description: "Get assistance",
    iconColor: "text-red-500",
    onClick: () => console.log("Help clicked"),
  },
]

export function ActivityQuickAccess({
  organizations,
  quickAccessItems = defaultQuickAccessItems,
  onViewAllActivity,
}: ActivityQuickAccessProps) {
  // Get all activities from all organizations
  const allActivities = organizations.flatMap((org) => org.activity || []).slice(0, 5)

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {/* Activity Section */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-md font-medium">Recent Activity</CardTitle>
          <Button variant="link" className="h-8 px-2" onClick={onViewAllActivity}>
            View All
          </Button>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[250px] sm:h-[300px] pr-4">
            <div className="space-y-4">
              {allActivities.length > 0 ? (
                allActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <Avatar className="h-8 w-8 flex-shrink-0">
                      <AvatarFallback className="text-xs">{activity.user.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="space-y-1 min-w-0">
                      <div className="text-sm break-words">
                        <span className="font-medium">{activity.user}</span>{" "}
                        <span className="text-muted-foreground">{activity.action}</span>{" "}
                        <span className="font-medium">{activity.target}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-6 text-center">
                  <Activity className="h-10 w-10 text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">No recent activity</p>
                </div>
              )}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Quick Access Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-md font-medium">Quick Access</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 xs:grid-cols-2 gap-3">
            {quickAccessItems.map((item) => {
              let IconComponent
              switch (item.icon) {
                case "Users":
                  IconComponent = Users
                  break
                case "Settings":
                  IconComponent = Settings
                  break
                case "BarChart3":
                  IconComponent = BarChart3
                  break
                case "FileText":
                  IconComponent = FileText
                  break
                case "Zap":
                  IconComponent = Zap
                  break
                case "HelpCircle":
                  IconComponent = HelpCircle
                  break
                default:
                  IconComponent = Activity // Fallback
              }

              return (
                <Button
                  key={item.id}
                  variant="outline"
                  className="h-auto p-3 text-left flex items-start"
                  onClick={item.onClick}
                >
                  <div className="flex items-start space-x-2 w-full">
                    {IconComponent && <IconComponent className={`h-4 w-4 mt-0.5 flex-shrink-0 ${item.iconColor}`} />}
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium truncate">{item.title}</p>
                      <p className="text-xs text-muted-foreground truncate">{item.description}</p>
                    </div>
                  </div>
                </Button>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
