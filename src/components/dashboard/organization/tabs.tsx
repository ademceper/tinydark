"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Activity,
  ArrowRight,
  BarChart3,
  Bell,
  Calendar,
  CheckCircle2,
  Clock,
  CreditCard,
  Cpu,
  Download,
  HardDrive,
  Layers,
  LineChart,
  MessageSquare,
  MoreHorizontal,
  PieChart,
  PlusCircle,
  RefreshCw,
  Settings,
  Share2,
  Star,
  User,
  Users,
  Wifi,
  Menu,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Define types for the component props
interface Organization {
  id: string
  name: string
  role: string
  members: number
  plan: string
  status: string
  created: string
  lastActive: string
  projects: Project[]
  teams?: Team[]
  resources: {
    storage: Resource
    compute: Resource
    bandwidth: Resource
  }
  billing: {
    plan: string
    amount: string
    nextBilling: string
    paymentMethod: string
  }
  activity: OrgActivity[]
}

interface Project {
  id: string
  name: string
  description: string
  starred: boolean
  updatedAt: string
  members: number
  status: string
  priority: string
  dueDate: string
  progress: number
  tags: string[]
  tasks: {
    total: number
    completed: number
  }
  organization?: string
  organizationId?: string
}

interface Team {
  id: string
  name: string
  members: number
  projects: number
  lead: string
  organization?: string
  organizationId?: string
}

interface Resource {
  used: number
  total: number
  unit: string
}

interface OrgActivity {
  id: string
  user: string
  action: string
  target: string
  timestamp: string
}

interface OrganizationTabsProps {
  organizations: Organization[]
  defaultTab?: string
  onCreateOrganization?: () => void
  onCreateTeam?: () => void
  onCreateProject?: (organizationId: string) => void
}

export function OrganizationTabs({
  organizations,
  defaultTab = "all",
  onCreateOrganization,
  onCreateTeam,
  onCreateProject,
}: OrganizationTabsProps) {
  const [viewType, setViewType] = useState("grid")

  return (
    <Tabs defaultValue={defaultTab} className="space-y-4">
      <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <TabsList className="flex-wrap h-auto p-1">
          <TabsTrigger value="all" className="text-xs sm:text-sm">
            All Organizations
          </TabsTrigger>
          <TabsTrigger value="recent" className="text-xs sm:text-sm">
            Recent Projects
          </TabsTrigger>
          <TabsTrigger value="starred" className="text-xs sm:text-sm">
            Starred
          </TabsTrigger>
          <TabsTrigger value="teams" className="text-xs sm:text-sm">
            Teams
          </TabsTrigger>
          <TabsTrigger value="analytics" className="text-xs sm:text-sm">
            Analytics
          </TabsTrigger>
        </TabsList>
        <div className="flex items-center space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="sm:hidden">
                <Menu className="h-4 w-4 mr-2" />
                View
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setViewType("grid")}>Grid View</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setViewType("list")}>List View</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setViewType("board")}>Board View</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setViewType("calendar")}>Calendar View</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Select defaultValue={viewType} onValueChange={setViewType} className="hidden sm:flex">
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="View" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="grid">Grid View</SelectItem>
              <SelectItem value="list">List View</SelectItem>
              <SelectItem value="board">Board View</SelectItem>
              <SelectItem value="calendar">Calendar View</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <TabsContent value="all" className="space-y-4">
        {organizations.map((org) => (
          <Card key={org.id} className="mb-6 overflow-hidden">
            <CardHeader className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0 pb-2">
              <div className="flex items-center space-x-2">
                <Avatar className="h-9 w-9">
                  <AvatarImage
                    src={`/abstract-geometric-shapes.png?key=ii4s8&key=9t6fw&key=czgsc&height=36&width=36&query=${org.name}`}
                    alt={org.name}
                  />
                  <AvatarFallback>{org.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <CardTitle className="text-xl">{org.name}</CardTitle>
                    <Badge variant={org.status === "Active" ? "default" : "destructive"}>{org.status}</Badge>
                    <Badge variant="outline">{org.plan}</Badge>
                  </div>
                  <CardDescription className="flex flex-wrap items-center gap-1 sm:gap-2">
                    <span>{org.role}</span>
                    <span className="hidden sm:inline">•</span>
                    <span>{org.members} members</span>
                    <span className="hidden sm:inline">•</span>
                    <span className="hidden sm:inline">Created {org.created}</span>
                    <span className="hidden sm:inline">•</span>
                    <span className="hidden sm:inline">Active {org.lastActive}</span>
                  </CardDescription>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2 mt-2 sm:mt-0">
                <div className="flex items-center space-x-1">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="outline" size="icon" className="h-8 w-8">
                          <Bell className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Notifications</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="outline" size="icon" className="h-8 w-8">
                          <BarChart3 className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Analytics</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <div className="flex items-center space-x-1">
                  <Button variant="outline" size="sm" className="h-8">
                    <Users className="mr-2 h-4 w-4" />
                    <span className="hidden sm:inline">Members</span>
                  </Button>
                  <Button variant="outline" size="sm" className="h-8">
                    <Settings className="mr-2 h-4 w-4" />
                    <span className="hidden sm:inline">Settings</span>
                  </Button>
                  <Button size="sm" className="h-8" onClick={() => onCreateProject?.(org.id)}>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    <span className="hidden sm:inline">New Project</span>
                    <span className="sm:hidden">New</span>
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <div className="space-y-1 rounded-lg border p-3">
                  <div className="text-sm text-muted-foreground">Storage</div>
                  <div className="flex items-center justify-between">
                    <div className="text-lg font-semibold">
                      {org.resources.storage.used} / {org.resources.storage.total} {org.resources.storage.unit}
                    </div>
                    <HardDrive className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <Progress value={(org.resources.storage.used / org.resources.storage.total) * 100} className="h-2" />
                </div>
                <div className="space-y-1 rounded-lg border p-3">
                  <div className="text-sm text-muted-foreground">Compute</div>
                  <div className="flex items-center justify-between">
                    <div className="text-lg font-semibold">
                      {org.resources.compute.used}
                      {org.resources.compute.unit}
                    </div>
                    <Cpu className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <Progress value={(org.resources.compute.used / org.resources.compute.total) * 100} className="h-2" />
                </div>
                <div className="space-y-1 rounded-lg border p-3 sm:col-span-2 md:col-span-1">
                  <div className="text-sm text-muted-foreground">Bandwidth</div>
                  <div className="flex items-center justify-between">
                    <div className="text-lg font-semibold">
                      {org.resources.bandwidth.used} / {org.resources.bandwidth.total} {org.resources.bandwidth.unit}
                    </div>
                    <Wifi className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <Progress
                    value={(org.resources.bandwidth.used / org.resources.bandwidth.total) * 100}
                    className="h-2"
                  />
                </div>
              </div>

              <div className="mb-4">
                <div className="mb-2 flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                  <h3 className="text-lg font-semibold">Projects</h3>
                  <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                    <Input placeholder="Search projects..." className="h-8 w-full sm:w-[200px]" />
                    <Select defaultValue="all">
                      <SelectTrigger className="h-8 w-full sm:w-[130px]">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        <SelectItem value="planning">Planning</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="on-hold">On Hold</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                  {org.projects.map((project) => (
                    <Link href={`/dashboard/project/${project.id}`} key={project.id} className="block">
                      <Card className="hover:bg-muted/50 transition-colors cursor-pointer overflow-hidden">
                        <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                          <div>
                            <div className="flex flex-wrap items-center gap-2">
                              <CardTitle className="text-base font-medium">
                                {project.name}
                                {project.starred && <Star className="h-4 w-4 text-yellow-500 inline ml-2" />}
                              </CardTitle>
                              <Badge>{project.status}</Badge>
                            </div>
                            <CardDescription className="mt-1">{project.description}</CardDescription>
                          </div>
                          <Button variant="ghost" size="icon" className="rounded-full">
                            <ArrowRight className="h-4 w-4" />
                          </Button>
                        </CardHeader>
                        <CardContent className="pb-2">
                          <div className="mb-2">
                            <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                              <span>Progress</span>
                              <span>{project.progress}%</span>
                            </div>
                            <Progress value={project.progress} className="h-1" />
                          </div>
                          <div className="flex flex-wrap gap-1 mb-2">
                            {project.tags.map((tag, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                        <CardFooter className="flex flex-col sm:flex-row sm:justify-between pt-0 space-y-2 sm:space-y-0">
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Clock className="mr-1 h-3 w-3" />
                            {project.updatedAt}
                          </div>
                          <div className="flex flex-wrap gap-3">
                            <div className="flex items-center text-xs text-muted-foreground">
                              <CheckCircle2 className="mr-1 h-3 w-3" />
                              {project.tasks.completed}/{project.tasks.total}
                            </div>
                            <div className="flex items-center text-xs text-muted-foreground">
                              <Users className="mr-1 h-3 w-3" />
                              {project.members}
                            </div>
                            <div className="flex items-center text-xs text-muted-foreground">
                              <Calendar className="mr-1 h-3 w-3" />
                              {project.dueDate}
                            </div>
                          </div>
                        </CardFooter>
                      </Card>
                    </Link>
                  ))}
                  <Card
                    className="border-dashed hover:border-muted-foreground/50 hover:bg-muted/50 transition-colors cursor-pointer flex items-center justify-center h-[220px]"
                    onClick={() => onCreateProject?.(org.id)}
                  >
                    <CardContent className="flex flex-col items-center justify-center p-6">
                      <PlusCircle className="h-10 w-10 text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">Create a new project</p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {org.activity.map((activity) => (
                        <div key={activity.id} className="flex items-start space-x-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="text-xs">
                              {activity.user.substring(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div className="space-y-1">
                            <div className="text-sm">
                              <span className="font-medium">{activity.user}</span>{" "}
                              <span className="text-muted-foreground">{activity.action}</span>{" "}
                              <span className="font-medium">{activity.target}</span>
                            </div>
                            <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Teams</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {/* Fixed TypeScript error by checking if teams exists and has length */}
                    {org.teams && org.teams.length > 0 ? (
                      <div className="space-y-2">
                        {org.teams.map((team) => (
                          <div key={team.id} className="flex items-center justify-between rounded-lg border p-3">
                            <div className="flex items-center space-x-3">
                              <Avatar className="h-8 w-8">
                                <AvatarFallback className="text-xs">
                                  {team.name.substring(0, 2).toUpperCase()}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="text-sm font-medium">{team.name}</p>
                                <p className="text-xs text-muted-foreground">
                                  {team.members} members • {team.projects} projects
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <HoverCard>
                                <HoverCardTrigger asChild>
                                  <Button variant="ghost" size="sm">
                                    <User className="mr-1 h-3.5 w-3.5" />
                                    <span className="text-xs">Lead</span>
                                  </Button>
                                </HoverCardTrigger>
                                <HoverCardContent className="w-60">
                                  <div className="flex items-center space-x-2">
                                    <Avatar className="h-10 w-10">
                                      <AvatarFallback>{team.lead.substring(0, 2).toUpperCase()}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                      <h4 className="text-sm font-semibold">{team.lead}</h4>
                                      <p className="text-xs text-muted-foreground">Team Lead</p>
                                    </div>
                                  </div>
                                </HoverCardContent>
                              </HoverCard>
                              <Button variant="ghost" size="sm">
                                <Settings className="h-3.5 w-3.5" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex h-[140px] flex-col items-center justify-center rounded-lg border border-dashed">
                        <Users className="h-10 w-10 text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground">No teams created yet</p>
                        <Button variant="link" size="sm" className="mt-2">
                          Create a team
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-t bg-muted/50 px-6 py-3 space-y-3 sm:space-y-0">
              <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                <div className="flex items-center space-x-2">
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                  <div className="text-sm">
                    <span className="font-medium">{org.billing.plan}</span>{" "}
                    <span className="text-muted-foreground">({org.billing.amount})</span>
                  </div>
                </div>
                <Separator orientation="vertical" className="hidden sm:block h-4" />
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div className="text-sm">
                    <span className="text-muted-foreground">Next billing:</span>{" "}
                    <span className="font-medium">{org.billing.nextBilling}</span>
                  </div>
                </div>
                <Separator orientation="vertical" className="hidden sm:block h-4" />
                <div className="flex items-center space-x-2">
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                  <div className="text-sm">
                    <span className="text-muted-foreground">Payment method:</span>{" "}
                    <span className="font-medium">{org.billing.paymentMethod}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  <span className="hidden sm:inline">Export</span>
                </Button>
                <Button variant="outline" size="sm">
                  <Share2 className="mr-2 h-4 w-4" />
                  <span className="hidden sm:inline">Share</span>
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
        <Card
          className="border-dashed hover:border-muted-foreground/50 hover:bg-muted/50 transition-colors cursor-pointer"
          onClick={onCreateOrganization}
        >
          <CardContent className="flex flex-col items-center justify-center p-6">
            <div className="mb-4 rounded-full bg-background p-6">
              <PlusCircle className="h-10 w-10 text-muted-foreground" />
            </div>
            <h3 className="mb-2 text-xl font-semibold text-center">Create a new organization</h3>
            <p className="mb-4 text-center text-muted-foreground">
              Create a new organization to manage projects, teams, and resources.
            </p>
            <Button>Get Started</Button>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="recent" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Recent Projects</CardTitle>
            <CardDescription>Projects you&apos;ve worked on recently across all organizations.</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px] sm:h-[600px] pr-4">
              <div className="space-y-4">
                {organizations
                  .flatMap((org) =>
                    org.projects.map((project) => ({
                      ...project,
                      organization: org.name,
                      organizationId: org.id,
                    })),
                  )
                  .sort((a, b) => {
                    // Sort by updatedAt (this is a simple string comparison, in a real app you'd use dates)
                    return a.updatedAt.localeCompare(b.updatedAt)
                  })
                  .map((project) => (
                    <Link href={`/dashboard/project/${project.id}`} key={project.id} className="block">
                      <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
                        <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                          <div>
                            <div className="flex flex-wrap items-center gap-2">
                              <CardTitle className="text-base font-medium">
                                {project.name}
                                {project.starred && <Star className="h-4 w-4 text-yellow-500 inline ml-2" />}
                              </CardTitle>
                              <Badge>{project.status}</Badge>
                            </div>
                            <div className="flex flex-wrap items-center gap-2 mt-1">
                              <CardDescription>{project.description}</CardDescription>
                              <Badge variant="outline">{project.organization}</Badge>
                            </div>
                          </div>
                          <Button variant="ghost" size="icon" className="rounded-full">
                            <ArrowRight className="h-4 w-4" />
                          </Button>
                        </CardHeader>
                        <CardContent className="pb-2">
                          <div className="mb-2">
                            <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                              <span>Progress</span>
                              <span>{project.progress}%</span>
                            </div>
                            <Progress value={project.progress} className="h-1" />
                          </div>
                          <div className="flex flex-wrap gap-1 mb-2">
                            {project.tags.map((tag, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                        <CardFooter className="flex flex-col sm:flex-row sm:justify-between pt-0 space-y-2 sm:space-y-0">
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Clock className="mr-1 h-3 w-3" />
                            {project.updatedAt}
                          </div>
                          <div className="flex flex-wrap gap-3">
                            <div className="flex items-center text-xs text-muted-foreground">
                              <CheckCircle2 className="mr-1 h-3 w-3" />
                              {project.tasks.completed}/{project.tasks.total}
                            </div>
                            <div className="flex items-center text-xs text-muted-foreground">
                              <Users className="mr-1 h-3 w-3" />
                              {project.members}
                            </div>
                            <div className="flex items-center text-xs text-muted-foreground">
                              <Calendar className="mr-1 h-3 w-3" />
                              {project.dueDate}
                            </div>
                          </div>
                        </CardFooter>
                      </Card>
                    </Link>
                  ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="starred" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Starred Projects</CardTitle>
            <CardDescription>Your favorite projects across all organizations.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {organizations
                .flatMap((org) =>
                  org.projects
                    .filter((project) => project.starred)
                    .map((project) => ({
                      ...project,
                      organization: org.name,
                      organizationId: org.id,
                    })),
                )
                .map((project) => (
                  <Link href={`/dashboard/project/${project.id}`} key={project.id} className="block">
                    <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
                      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <CardTitle className="text-base font-medium">
                              {project.name}
                              <Star className="h-4 w-4 text-yellow-500 inline ml-2" />
                            </CardTitle>
                            <Badge>{project.status}</Badge>
                          </div>
                          <div className="flex flex-wrap items-center gap-2 mt-1">
                            <CardDescription>{project.description}</CardDescription>
                            <Badge variant="outline">{project.organization}</Badge>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon" className="rounded-full">
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <div className="mb-2">
                          <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                            <span>Progress</span>
                            <span>{project.progress}%</span>
                          </div>
                          <Progress value={project.progress} className="h-1" />
                        </div>
                        <div className="flex flex-wrap gap-1 mb-2">
                          {project.tags.map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                      <CardFooter className="flex flex-col sm:flex-row sm:justify-between pt-0 space-y-2 sm:space-y-0">
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Clock className="mr-1 h-3 w-3" />
                          {project.updatedAt}
                        </div>
                        <div className="flex flex-wrap gap-3">
                          <div className="flex items-center text-xs text-muted-foreground">
                            <CheckCircle2 className="mr-1 h-3 w-3" />
                            {project.tasks.completed}/{project.tasks.total}
                          </div>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Users className="mr-1 h-3 w-3" />
                            {project.members}
                          </div>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Calendar className="mr-1 h-3 w-3" />
                            {project.dueDate}
                          </div>
                        </div>
                      </CardFooter>
                    </Card>
                  </Link>
                ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="teams" className="space-y-4">
        <Card>
          <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
            <div>
              <CardTitle>Teams</CardTitle>
              <CardDescription>Manage your teams across all organizations.</CardDescription>
            </div>
            <Button onClick={onCreateTeam}>
              <PlusCircle className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Create Team</span>
              <span className="sm:hidden">New Team</span>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {organizations
                .filter((org) => org.teams && org.teams.length > 0)
                .flatMap((org) =>
                  org.teams!.map((team) => ({
                    ...team,
                    organization: org.name,
                    organizationId: org.id,
                  })),
                )
                .map((team) => (
                  <Card key={team.id} className="hover:bg-muted/50 transition-colors cursor-pointer">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>{team.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                          </Avatar>
                          <div>
                            <CardTitle className="text-base">{team.name}</CardTitle>
                            <CardDescription>{team.organization}</CardDescription>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex flex-col items-center justify-center rounded-lg border p-3">
                          <Users className="mb-1 h-5 w-5 text-muted-foreground" />
                          <div className="text-xl font-bold">{team.members}</div>
                          <div className="text-xs text-muted-foreground">Members</div>
                        </div>
                        <div className="flex flex-col items-center justify-center rounded-lg border p-3">
                          <Layers className="mb-1 h-5 w-5 text-muted-foreground" />
                          <div className="text-xl font-bold">{team.projects}</div>
                          <div className="text-xs text-muted-foreground">Projects</div>
                        </div>
                      </div>
                      <div className="mt-3 flex items-center justify-between rounded-lg border p-3">
                        <div className="flex items-center space-x-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <div className="text-sm">
                            <span className="text-muted-foreground">Lead:</span>{" "}
                            <span className="font-medium">{team.lead}</span>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          <MessageSquare className="mr-1 h-3.5 w-3.5" />
                          <span className="text-xs">Contact</span>
                        </Button>
                      </div>
                    </CardContent>
                    <CardFooter className="flex flex-wrap justify-between gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Users className="mr-1 h-3.5 w-3.5" />
                        <span className="text-xs">Members</span>
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Layers className="mr-1 h-3.5 w-3.5" />
                        <span className="text-xs">Projects</span>
                      </Button>
                      <Button size="sm" className="flex-1">
                        <Settings className="mr-1 h-3.5 w-3.5" />
                        <span className="text-xs">Manage</span>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              <Card
                className="border-dashed hover:border-muted-foreground/50 hover:bg-muted/50 transition-colors cursor-pointer flex items-center justify-center h-[250px]"
                onClick={onCreateTeam}
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <Users className="h-10 w-10 text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">Create a new team</p>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="analytics" className="space-y-4">
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Project Status Distribution</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-center">
              <div className="h-[300px] w-full flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <BarChart3 className="mx-auto h-10 w-10 mb-2" />
                  <p>Project status chart will appear here</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Task Completion Rate</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-center">
              <div className="h-[300px] w-full flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <PieChart className="mx-auto h-10 w-10 mb-2" />
                  <p>Task completion chart will appear here</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="md:col-span-2 lg:col-span-1">
            <CardHeader>
              <CardTitle>Resource Utilization</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-center">
              <div className="h-[300px] w-full flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <LineChart className="mx-auto h-10 w-10 mb-2" />
                  <p>Resource utilization chart will appear here</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Activity Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] sm:h-[400px] w-full flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <Activity className="mx-auto h-10 w-10 mb-2" />
                <p>Activity timeline will appear here</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
