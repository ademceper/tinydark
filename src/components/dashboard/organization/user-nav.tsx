"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import {
  User,
  CreditCard,
  Settings,
  LogOut,
  HelpCircle,
  Users,
  Bell,
  Moon,
  Sun,
  Laptop,
  UserPlus,
  Shield,
  History,
  ChevronRight,
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTheme } from "next-themes"
import { Badge } from "@/components/ui/badge"
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer"
import { useIsMobile } from "@/hooks/use-breakpoint"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { logout } from "@/actions/auth.actions"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { getCurrentUser } from "@/actions/user.actions"

export function UserNav() {
  const { theme, setTheme } = useTheme()
  const [status, setStatus] = useState<"online" | "busy" | "away" | "offline">("online")
  const isMobile = useIsMobile()
  const router = useRouter()
  const [userData, setUserData] = useState<{
    id?: string
    fullName?: string
    email?: string
    avatar?: any
  } | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Get user initials from full name
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  // Fetch user data when component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(true)
        const { success, user } = await getCurrentUser()
        if (success && user) {
          setUserData(user)
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchUserData()
  }, [])

  // User info with fallback for when data is loading
  const userInfo = {
    name: userData?.fullName || "User",
    email: userData?.email || "Loading...",
    avatar: userData?.avatar?.url || null,
    initials: userData?.fullName ? getInitials(userData.fullName) : "U",
  }

  const statusOptions = {
    online: { label: "Online", color: "bg-green-500" },
    busy: { label: "Busy", color: "bg-red-500" },
    away: { label: "Away", color: "bg-yellow-500" },
    offline: { label: "Offline", color: "bg-gray-500" },
  }

  const handleLogout = async () => {
    try {
      // Use toast.promise instead of toast.loading
      toast.promise(logout(), {
        loading: "Logging out...",
        success: () => {
          router.push("/sign-in")
          return "Logged out successfully"
        },
        error: "Failed to log out",
      })
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  return isMobile ? (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="ghost" className="relative h-9 w-9 rounded-full">
          <div className="relative">
            <Avatar className="h-9 w-9 border-2 border-background">
              <AvatarImage src={userInfo.avatar || "/placeholder.svg"} alt={userInfo.name} />
              <AvatarFallback className="bg-primary/10 text-primary">{userInfo.initials}</AvatarFallback>
            </Avatar>
            <span
              className={`absolute bottom-0 right-0 h-3 w-3 rounded-full ${statusOptions[status].color} ring-2 ring-background`}
            ></span>
          </div>
        </Button>
      </DrawerTrigger>
      <DrawerContent className="focus:outline-none flex flex-col max-h-[90vh]">
        <div className="bg-gradient-to-b from-background to-primary/20 pt-6 pb-4">
          <div className="flex items-center justify-center">
            <div className="relative">
              <Avatar className="h-20 w-20 border-4 border-background shadow-lg">
                <AvatarImage src={userInfo.avatar || "/placeholder.svg"} alt={userInfo.name} />
                <AvatarFallback className="bg-primary/10 text-primary text-xl">{userInfo.initials}</AvatarFallback>
              </Avatar>
              <span
                className={`absolute bottom-1 right-1 h-4 w-4 rounded-full ${statusOptions[status].color} ring-2 ring-background`}
              ></span>
            </div>
          </div>
          <div className="mt-3 text-center">
            <h3 className="text-lg font-semibold">{userInfo.name}</h3>
            <p className="text-sm text-muted-foreground">{userInfo.email}</p>
          </div>
        </div>

        <ScrollArea className="flex-1 overflow-auto" style={{ maxHeight: "calc(100vh - 13rem - 72px)" }}>
          <div className="px-4 py-2">
            <div className="space-y-6">
              <div className="space-y-1.5">
                <h4 className="px-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">Account</h4>
                <div className="grid gap-1">
                  <MobileNavLink href="/profile" icon={User} label="Profile" />
                  <MobileNavLink href="/settings" icon={Settings} label="Settings" />
                  <MobileNavLink href="/billing" icon={CreditCard} label="Billing" />
                </div>
              </div>

              <div className="space-y-1.5">
                <h4 className="px-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">Teams</h4>
                <div className="rounded-md border bg-card">
                  <div className="grid divide-y">
                    <MobileNavTeam href="/teams/design" label="Design Team" badge="Owner" />
                    <MobileNavTeam href="/teams/marketing" label="Marketing Team" badge="Member" />
                    <MobileNavTeam href="/teams/development" label="Development Team" badge="Admin" />
                  </div>
                  <div className="p-1">
                    <MobileNavLink href="/teams/create" icon={UserPlus} label="Create Team" />
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <h4 className="px-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Notifications
                </h4>
                <div className="rounded-md border bg-card">
                  <MobileNavLink href="/notifications" icon={Bell} label="All Notifications" />
                  <MobileNavLink href="/notifications/mentions" label="Mentions" className="pl-11" />
                  <MobileNavLink href="/notifications/settings" label="Notification Settings" className="pl-11" />
                </div>
              </div>

              <div className="space-y-1.5">
                <h4 className="px-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">Theme</h4>
                <div className="rounded-md border bg-card p-1">
                  <div className="grid grid-cols-3 gap-1">
                    <ThemeButton
                      icon={Sun}
                      label="Light"
                      isActive={theme === "light"}
                      onClick={() => setTheme("light")}
                    />
                    <ThemeButton
                      icon={Moon}
                      label="Dark"
                      isActive={theme === "dark"}
                      onClick={() => setTheme("dark")}
                    />
                    <ThemeButton
                      icon={Laptop}
                      label="System"
                      isActive={theme === "system"}
                      onClick={() => setTheme("system")}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <h4 className="px-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">Status</h4>
                <div className="rounded-md border bg-card p-1">
                  <div className="grid grid-cols-2 gap-1">
                    <StatusButton
                      color="bg-green-500"
                      label="Online"
                      isActive={status === "online"}
                      onClick={() => setStatus("online")}
                    />
                    <StatusButton
                      color="bg-red-500"
                      label="Busy"
                      isActive={status === "busy"}
                      onClick={() => setStatus("busy")}
                    />
                    <StatusButton
                      color="bg-yellow-500"
                      label="Away"
                      isActive={status === "away"}
                      onClick={() => setStatus("away")}
                    />
                    <StatusButton
                      color="bg-gray-500"
                      label="Offline"
                      isActive={status === "offline"}
                      onClick={() => setStatus("offline")}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <h4 className="px-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">More</h4>
                <div className="grid gap-1">
                  <MobileNavLink href="/security" icon={Shield} label="Security" />
                  <MobileNavLink href="/activity" icon={History} label="Activity Log" />
                  <MobileNavLink href="/help" icon={HelpCircle} label="Help & Support" />
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>

        <div className="p-4 border-t mt-auto">
          <Button variant="destructive" className="w-full" size="lg" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </Button>
        </div>
      </DrawerContent>
    </Drawer>
  ) : (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-9 w-9 rounded-full">
          <div className="relative">
            <Avatar className="h-9 w-9 border-2 border-background">
              <AvatarImage src={userInfo.avatar || "/placeholder.svg"} alt={userInfo.name} />
              <AvatarFallback className="bg-primary/10 text-primary">{userInfo.initials}</AvatarFallback>
            </Avatar>
            <span
              className={`absolute bottom-0 right-0 h-3 w-3 rounded-full ${statusOptions[status].color} ring-2 ring-background`}
            ></span>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64" align="end" sideOffset={8} collisionPadding={16}>
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
            <Avatar className="h-9 w-9">
              <AvatarImage src={userInfo.avatar || "/placeholder.svg"} alt={userInfo.name} />
              <AvatarFallback className="bg-primary/10 text-primary">{userInfo.initials}</AvatarFallback>
            </Avatar>
          </div>
          <div className="flex flex-col space-y-0.5">
            <p className="text-sm font-medium">{userInfo.name}</p>
            <p className="text-xs text-muted-foreground">{userInfo.email}</p>
          </div>
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuGroup className="p-1">
          <DropdownMenuItem asChild>
            <Link href="/profile" className="flex cursor-pointer items-center">
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/dashboard/settings" className="flex cursor-pointer items-center">
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
              <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/billing" className="flex cursor-pointer items-center">
              <CreditCard className="mr-2 h-4 w-4" />
              <span>Billing</span>
              <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup className="p-1">
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <Users className="mr-2 h-4 w-4" />
              <span>Teams</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent className="w-56">
                <DropdownMenuItem>
                  <span>Design Team</span>
                  <Badge variant="outline" className="ml-auto">
                    Owner
                  </Badge>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Marketing Team</span>
                  <Badge variant="outline" className="ml-auto">
                    Member
                  </Badge>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Development Team</span>
                  <Badge variant="outline" className="ml-auto">
                    Admin
                  </Badge>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <UserPlus className="mr-2 h-4 w-4" />
                  <span>Create Team</span>
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>

          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <Bell className="mr-2 h-4 w-4" />
              <span>Notifications</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent className="w-56">
                <DropdownMenuItem>
                  <span>All Notifications</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Mentions</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <span>Notification Settings</span>
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>

          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <span className="flex items-center">
                <span className="mr-2 flex h-4 w-4 items-center justify-center">
                  {theme === "light" ? (
                    <Sun className="h-4 w-4" />
                  ) : theme === "dark" ? (
                    <Moon className="h-4 w-4" />
                  ) : (
                    <Laptop className="h-4 w-4" />
                  )}
                </span>
                <span>Theme</span>
              </span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent className="w-40">
                <DropdownMenuRadioGroup value={theme} onValueChange={(value) => setTheme(value)}>
                  <DropdownMenuRadioItem value="light">
                    <Sun className="mr-2 h-4 w-4" />
                    <span>Light</span>
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="dark">
                    <Moon className="mr-2 h-4 w-4" />
                    <span>Dark</span>
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="system">
                    <Laptop className="mr-2 h-4 w-4" />
                    <span>System</span>
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup className="p-1">
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <span className="flex items-center">
                <span className={`mr-2 h-2 w-2 rounded-full ${statusOptions[status].color}`}></span>
                <span>{statusOptions[status].label}</span>
              </span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent className="w-40">
                <DropdownMenuRadioGroup
                  value={status}
                  onValueChange={(value) => {
                    // Type assertion to ensure value is a valid status
                    if (value === "online" || value === "busy" || value === "away" || value === "offline") {
                      setStatus(value)
                    }
                  }}
                >
                  <DropdownMenuRadioItem value="online">
                    <span className="mr-2 h-2 w-2 rounded-full bg-green-500"></span>
                    <span>Online</span>
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="busy">
                    <span className="mr-2 h-2 w-2 rounded-full bg-red-500"></span>
                    <span>Busy</span>
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="away">
                    <span className="mr-2 h-2 w-2 rounded-full bg-yellow-500"></span>
                    <span>Away</span>
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="offline">
                    <span className="mr-2 h-2 w-2 rounded-full bg-gray-500"></span>
                    <span>Offline</span>
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup className="p-1">
          <DropdownMenuItem asChild>
            <Link href="/security" className="flex cursor-pointer items-center">
              <Shield className="mr-2 h-4 w-4" />
              <span>Security</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/activity" className="flex cursor-pointer items-center">
              <History className="mr-2 h-4 w-4" />
              <span>Activity Log</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/help" className="flex cursor-pointer items-center">
              <HelpCircle className="mr-2 h-4 w-4" />
              <span>Help & Support</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          className="p-2 text-red-600 focus:bg-red-50 focus:text-red-600 dark:focus:bg-red-950"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

// Helper components for mobile design
interface MobileNavLinkProps {
  href: string
  icon?: React.ElementType
  label: string
  className?: string
}

function MobileNavLink({ href, icon: Icon, label, className }: MobileNavLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center justify-between rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent",
        className,
      )}
    >
      <div className="flex items-center gap-3">
        {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
        <span>{label}</span>
      </div>
      <ChevronRight className="h-4 w-4 text-muted-foreground" />
    </Link>
  )
}

interface MobileNavTeamProps {
  href: string
  label: string
  badge: string
}

function MobileNavTeam({ href, label, badge }: MobileNavTeamProps) {
  return (
    <Link href={href} className="flex items-center justify-between p-3 transition-colors hover:bg-accent">
      <span className="text-sm">{label}</span>
      <div className="flex items-center gap-2">
        <Badge variant="outline" className="font-normal">
          {badge}
        </Badge>
        <ChevronRight className="h-4 w-4 text-muted-foreground" />
      </div>
    </Link>
  )
}

interface ThemeButtonProps {
  icon: React.ElementType
  label: string
  isActive: boolean
  onClick: () => void
}

function ThemeButton({ icon: Icon, label, isActive, onClick }: ThemeButtonProps) {
  return (
    <Button
      variant={isActive ? "default" : "outline"}
      size="sm"
      className="h-auto py-1.5 px-2 flex flex-col items-center gap-1"
      onClick={onClick}
    >
      <Icon className="h-4 w-4" />
      <span className="text-xs">{label}</span>
    </Button>
  )
}

interface StatusButtonProps {
  color: string
  label: string
  isActive: boolean
  onClick: () => void
}

function StatusButton({ color, label, isActive, onClick }: StatusButtonProps) {
  return (
    <Button
      variant={isActive ? "default" : "outline"}
      size="sm"
      className="h-auto py-1.5 px-2 flex items-center gap-2 justify-start"
      onClick={onClick}
    >
      <span className={`h-2 w-2 rounded-full ${color}`}></span>
      <span className="text-xs">{label}</span>
    </Button>
  )
}
