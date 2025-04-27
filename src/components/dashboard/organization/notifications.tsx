"use client"

import Link from "next/link"
import { Bell, BellOff, CheckCircle2, Settings, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useEffect, useState, useRef } from "react"
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerFooter } from "@/components/ui/drawer"
import { useIsMobile } from "@/hooks/use-breakpoint"

export const notifications = [
  {
    id: "notif-1",
    title: "New team member",
    description: "John Doe added you to the Design Team",
    time: "2 hours ago",
    read: false,
    type: "team",
    avatar: "/green-tractor-field.png",
    user: "John Doe",
  },
  {
    id: "notif-2",
    title: "Project deadline approaching",
    description: "Website Redesign is due in 3 days",
    time: "5 hours ago",
    read: false,
    type: "deadline",
    avatar: "/abstract-geometric-wr.png",
    project: "Website Redesign",
  },
  {
    id: "notif-3",
    title: "Comment on your task",
    description: "Alice left a comment on 'Create homepage wireframe'",
    time: "1 day ago",
    read: true,
    type: "comment",
    avatar: "/abstract-aj.png",
    user: "Alice Johnson",
  },
  {
    id: "notif-4",
    title: "New project invitation",
    description: "You've been invited to join Mobile App project",
    time: "2 days ago",
    read: true,
    type: "invitation",
    avatar: "/Massachusetts-State-Map.png",
    project: "Mobile App",
  },
  {
    id: "notif-5",
    title: "Task assigned to you",
    description: "Michael assigned 'Design user profile page' to you",
    time: "3 days ago",
    read: true,
    type: "task",
    avatar: "/abstract-blue-burst.png",
    user: "Michael Brown",
  },
  {
    id: "notif-6",
    title: "Task assigned to you",
    description: "Michael assigned 'Design user profile page' to you",
    time: "3 days ago",
    read: true,
    type: "task",
    avatar: "/abstract-blue-burst.png",
    user: "Michael Brown",
  },
  {
    id: "notif-7",
    title: "Task assigned to you",
    description: "Michael assigned 'Design user profile page' to you",
    time: "3 days ago",
    read: true,
    type: "task",
    avatar: "/abstract-blue-burst.png",
    user: "Michael Brown",
  },
  {
    id: "notif-8",
    title: "Task assigned to you",
    description: "Michael assigned 'Design user profile page' to you",
    time: "3 days ago",
    read: true,
    type: "task",
    avatar: "/abstract-blue-burst.png",
    user: "Michael Brown",
  },
]

export function NotificationsPanel() {
  const [unreadCount, setUnreadCount] = useState(0)
  const [open, setOpen] = useState(false)
  const isMobile = useIsMobile() // This will be true for both mobile and tablet
  const dropdownRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    // Count unread notifications
    setUnreadCount(notifications.filter((n) => !n.read).length)
  }, [])

  // Add click outside handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        open &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setOpen(false)
      }
    }

    // Only add the event listener if the dropdown is open
    if (open && !isMobile) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [open, isMobile])

  const markAllAsRead = () => {
    // In a real app, you would update this in your database
    setUnreadCount(0)
  }

  const markAsRead = (id: string) => {
    // In a real app, you would update this in your database
    setUnreadCount((prev) => Math.max(0, prev - 1))
  }

  // Render drawer for mobile and tablet
  if (isMobile) {
    return (
      <>
        <Button
          variant="ghost"
          size="icon"
          className="relative hover:bg-accent/50 h-8 w-8"
          aria-label="Notifications"
          onClick={() => setOpen(true)}
        >
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </Button>

        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerContent>
            <DrawerHeader className="border-b">
              <div className="flex items-center justify-between">
                <DrawerTitle>Notifications</DrawerTitle>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
                    onClick={markAllAsRead}
                    disabled={unreadCount === 0}
                  >
                    <CheckCircle2 className="h-4 w-4" />
                    <span className="sr-only">Mark all as read</span>
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground">
                    <Settings className="h-4 w-4" />
                    <span className="sr-only">Notification settings</span>
                  </Button>
                </div>
              </div>
            </DrawerHeader>

            <div className="overflow-y-auto max-h-[70vh]">
              {notifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8 px-4 text-center">
                  <BellOff className="h-12 w-12 text-muted-foreground mb-3" />
                  <p className="text-base font-medium">No notifications</p>
                  <p className="text-sm text-muted-foreground mt-1">You&apos;re all caught up</p>
                </div>
              ) : (
                <div className="divide-y">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 transition-colors ${!notification.read ? "bg-accent/50" : ""}`}
                    >
                      <div className="flex gap-3">
                        <Avatar className="h-10 w-10 flex-shrink-0">
                          <AvatarImage
                            src={notification.avatar || "/placeholder.svg"}
                            alt={notification.user || notification.project || ""}
                          />
                          <AvatarFallback>
                            {(
                              notification.user?.substring(0, 2) ||
                              notification.project?.substring(0, 2) ||
                              ""
                            ).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>

                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start">
                            <p className="text-sm font-medium line-clamp-1">{notification.title}</p>
                            {!notification.read && (
                              <Badge variant="default" className="ml-2 h-1.5 w-1.5 rounded-full p-0" />
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{notification.description}</p>
                          <div className="flex justify-between items-center mt-2">
                            <span className="text-xs text-muted-foreground">{notification.time}</span>
                            {!notification.read && (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 px-2 text-xs text-muted-foreground hover:text-foreground"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  markAsRead(notification.id)
                                }}
                              >
                                Mark as read
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <DrawerFooter className="border-t px-4 py-2">
              <Button variant="outline" size="sm" className="w-full text-sm" asChild>
                <Link href="/notifications">View all notifications</Link>
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </>
    )
  }

  // Render dropdown for desktop and laptop
  return (
    <div className="relative">
      <Button
        ref={buttonRef}
        variant="ghost"
        size="icon"
        className="relative hover:bg-accent/50 h-8 w-8"
        aria-label="Notifications"
        onClick={() => setOpen(!open)}
      >
        <Bell className="h-4 w-4" />
        {unreadCount > 0 && (
          <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </Button>

      {open && (
        <div ref={dropdownRef} className="absolute right-0 mt-2 w-[380px] rounded-md border bg-popover shadow-md z-50">
          <div className="flex items-center justify-between px-4 py-3 border-b">
            <h3 className="text-base font-semibold">Notifications</h3>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
                onClick={markAllAsRead}
                disabled={unreadCount === 0}
              >
                <CheckCircle2 className="h-4 w-4" />
                <span className="sr-only">Mark all as read</span>
              </Button>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground">
                <Settings className="h-4 w-4" />
                <span className="sr-only">Notification settings</span>
              </Button>
            </div>
          </div>

          <div className="overflow-y-auto max-h-[400px]">
            {notifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 px-4 text-center">
                <BellOff className="h-12 w-12 text-muted-foreground mb-3" />
                <p className="text-base font-medium">No notifications</p>
                <p className="text-sm text-muted-foreground mt-1">You&apos;re all caught up</p>
              </div>
            ) : (
              <div className="divide-y">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 transition-colors ${
                      !notification.read ? "bg-accent/50" : ""
                    } hover:bg-accent focus:bg-accent`}
                  >
                    <div className="flex gap-3">
                      <Avatar className="h-10 w-10 flex-shrink-0">
                        <AvatarImage
                          src={notification.avatar || "/placeholder.svg"}
                          alt={notification.user || notification.project || ""}
                        />
                        <AvatarFallback>
                          {(
                            notification.user?.substring(0, 2) ||
                            notification.project?.substring(0, 2) ||
                            ""
                          ).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <p className="text-sm font-medium line-clamp-1">{notification.title}</p>
                          {!notification.read && (
                            <Badge variant="default" className="ml-2 h-1.5 w-1.5 rounded-full p-0" />
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{notification.description}</p>
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-xs text-muted-foreground">{notification.time}</span>
                          {!notification.read && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 px-2 text-xs text-muted-foreground hover:text-foreground"
                              onClick={(e) => {
                                e.stopPropagation()
                                markAsRead(notification.id)
                              }}
                            >
                              Mark as read
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="border-t px-4 py-2 bg-background">
            <Button variant="outline" size="sm" className="w-full text-sm" asChild>
              <Link href="/notifications">View all notifications</Link>
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
