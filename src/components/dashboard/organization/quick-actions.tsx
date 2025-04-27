"use client";

import Link from "next/link";
import { ArrowRight, Briefcase, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useRef, useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useIsMobile } from "@/hooks/use-breakpoint";
import {
  PlusCircle,
  Users,
  Calendar,
  CheckCircle2,
  FileText,
  LayoutDashboard,
} from "lucide-react";

// Sample quick actions
export const quickActions = [
  {
    id: "action-1",
    name: "Create Project",
    description: "Start a new project",
    icon: PlusCircle,
    color:
      "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400",
    href: "/dashboard/projects/new",
  },
  {
    id: "action-2",
    name: "Add Team Member",
    description: "Invite people to your team",
    icon: Users,
    color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
    href: "/dashboard/team/invite",
  },
  {
    id: "action-3",
    name: "Schedule Meeting",
    description: "Plan a new meeting",
    icon: Calendar,
    color:
      "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400",
    href: "/dashboard/calendar/new",
  },
  {
    id: "action-4",
    name: "Create Task",
    description: "Add a new task",
    icon: CheckCircle2,
    color:
      "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400",
    href: "/dashboard/tasks/new",
  },
  {
    id: "action-5",
    name: "Generate Report",
    description: "Create analytics report",
    icon: FileText,
    color: "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400",
    href: "/dashboard/reports/new",
  },
  {
    id: "action-6",
    name: "View Analytics",
    description: "See project statistics",
    icon: LayoutDashboard,
    color:
      "bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400",
    href: "/dashboard/analytics",
  },
];

export const recentProjects = [
  {
    id: "proj-1",
    name: "Website Redesign",
    description: "Company website overhaul",
    progress: 65,
    href: "/dashboard/projects/proj-1",
  },
  {
    id: "proj-2",
    name: "Mobile App Development",
    description: "iOS and Android application",
    progress: 25,
    href: "/dashboard/projects/proj-2",
  },
  {
    id: "proj-3",
    name: "Marketing Campaign",
    description: "Q3 marketing initiatives",
    progress: 10,
    href: "/dashboard/projects/proj-3",
  },
];

interface QuickActionsContentProps {
  isMobile: boolean;
  onClose?: () => void;
}

export function QuickActionsContent({
  isMobile,
  onClose,
}: QuickActionsContentProps) {
  return (
    <div className="flex flex-col h-full">
      {/* Content */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-6 pb-2">
          {/* Quick Actions */}
          <div className="grid grid-cols-1 gap-2">
            {quickActions.map((action) => (
              <Link
                href={action.href}
                key={action.id}
                className="group flex items-center gap-3 p-3 rounded-md transition-colors hover:bg-accent/50"
                onClick={onClose}
              >
                <div className={`rounded-lg p-2 ${action.color}`}>
                  <action.icon className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium">{action.name}</h3>
                  <p className="text-xs text-muted-foreground line-clamp-1">
                    {action.description}
                  </p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            ))}
          </div>

          {/* Projects */}
          <div>
            <h3 className="text-sm font-medium mb-3">Featured Projects</h3>
            <div className="space-y-2">
              {recentProjects.map((project) => (
                <Link
                  key={project.id}
                  href={project.href}
                  className="flex items-center justify-between p-3 rounded-md border transition-colors hover:bg-accent/30"
                  onClick={onClose}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Briefcase className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">
                        {project.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>Progress: {project.progress}%</span>
                      <div className="w-20 h-1.5 bg-secondary rounded-full">
                        <div
                          className="h-full bg-primary rounded-full"
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="h-7 w-7">
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </ScrollArea>

      <div className="sticky bottom-0 bg-background border-t p-4">
        <Button variant="outline" className="w-full h-8 text-sm" asChild>
          <Link href="/dashboard/projects" onClick={onClose}>
            View All Projects
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}

export function QuickActionsPanel() {
  const [open, setOpen] = useState(false);
  const isMobile = useIsMobile(); // This will be true for both mobile and tablet
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleClose = () => {
    setOpen(false);
  };

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
        setOpen(false);
      }
    };

    // Only add the event listener if the dropdown is open
    if (open && !isMobile) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, isMobile]);

  // Render drawer for mobile and tablet
  if (isMobile) {
    return (
      <>
        <Button
          variant="ghost"
          size="icon"
          className="relative hover:bg-accent/50 h-8 w-8"
          aria-label="Quick Actions"
          onClick={() => setOpen(true)}
        >
          <Zap className="h-4 w-4" />
        </Button>

        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerContent>
            <DrawerHeader className="border-b">
              <div className="flex items-center justify-between">
                <DrawerTitle>Quick Actions</DrawerTitle>
              </div>
            </DrawerHeader>

            <div className="flex-1 overflow-auto">
              <QuickActionsContent isMobile={true} onClose={handleClose} />
            </div>
          </DrawerContent>
        </Drawer>
      </>
    );
  }

  // Render dropdown for desktop and laptop
  return (
    <div className="relative">
      <Button
        ref={buttonRef}
        variant="ghost"
        size="icon"
        className="relative hover:bg-accent/50 h-8 w-8"
        aria-label="Quick Actions"
        onClick={() => setOpen(!open)}
      >
        <Zap className="h-4 w-4" />
      </Button>

      {open && (
        <div
          ref={dropdownRef}
          className="absolute right-0 mt-2 w-[380px] rounded-md border bg-popover shadow-md z-50 flex flex-col"
          style={{ maxHeight: "80vh" }}
        >
          <div className="flex items-center justify-between px-4 py-3 border-b">
            <h3 className="text-base font-semibold">Quick Actions</h3>
          </div>

          <div className="flex-1 overflow-auto">
            <QuickActionsContent isMobile={false} onClose={handleClose} />
          </div>
        </div>
      )}
    </div>
  );
}
