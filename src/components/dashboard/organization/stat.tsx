"use client"

import { Button } from "@/components/ui/button"
import { CalendarDateRangePicker } from "@/components/dashboard/organization/date-range-picker"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Building2,
  ChevronDown,
  CheckCircle2,
  Filter,
  Layers,
  PlusCircle,
  Users,
  TrendingUp,
  TrendingDown,
  Minus,
  RefreshCw,
  Clock,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Skeleton } from "@/components/ui/skeleton"
import { useState } from "react"

interface Organization {
  id: string
  name: string
  members: number
  projects: {
    id: string
    tasks?: {
      total: number
      completed: number
    }
  }[]
}

interface DashboardStatsProps {
  title: string
  organizations: Organization[]
  showDateRangePicker?: boolean
  showFilter?: boolean
  showNewButton?: boolean
  newButtonText?: string
  onNewButtonClick?: () => void
}

export function DashboardStats({
  title,
  organizations,
  showDateRangePicker = true,
  showFilter = true,
  showNewButton = true,
  newButtonText = "New Organization",
  onNewButtonClick,
}: DashboardStatsProps) {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)

  // Calculate stats
  const totalOrganizations = organizations.length
  const totalProjects = organizations.reduce((acc, org) => acc + org.projects.length, 0)

  // Fix for TypeScript errors - safely access tasks properties
  const activeTasks = organizations
    .flatMap((org) => org.projects)
    .reduce((acc, project) => {
      // Check if tasks exists and safely access its properties
      const total = project.tasks?.total ?? 0
      const completed = project.tasks?.completed ?? 0
      return acc + (total - completed)
    }, 0)

  const completedTasks = organizations
    .flatMap((org) => org.projects)
    .reduce((acc, project) => {
      return acc + (project.tasks?.completed ?? 0)
    }, 0)

  const totalTasks = organizations
    .flatMap((org) => org.projects)
    .reduce((acc, project) => {
      return acc + (project.tasks?.total ?? 0)
    }, 0)

  const totalMembers = organizations.reduce((acc, org) => acc + org.members, 0)

  // Sample trend data (in a real app, this would come from your data source)
  const trends = {
    organizations: { value: 1, direction: "up", percentage: 5 },
    projects: { value: 5, direction: "up", percentage: 12 },
    tasks: { value: 12, direction: "up", percentage: 18 },
    members: { value: 3, direction: "up", percentage: 7 },
  }

  const toggleFilter = (filter: string) => {
    setSelectedFilters((prev) => (prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]))
  }

  const getTrendIcon = (direction: string) => {
    if (direction === "up") return <TrendingUp className="h-3 w-3 text-emerald-500" />
    if (direction === "down") return <TrendingDown className="h-3 w-3 text-rose-500" />
    return <Minus className="h-3 w-3 text-muted-foreground" />
  }

  const handleRefresh = () => {
    setIsLoading(true)
    // Simulate data refresh
    setTimeout(() => {
      setIsLoading(false)
    }, 1500) // Increased timeout to better see the skeleton loading
  }

  // Skeleton component for card content
  const CardSkeleton = () => (
    <div className="space-y-2">
      <div className="flex items-baseline justify-between">
        <Skeleton className="h-6 w-10" />
        <Skeleton className="h-4 w-12" />
      </div>
      <div>
        <div className="flex justify-between">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-8" />
        </div>
        <Skeleton className="h-1 w-full mt-1" />
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Skeleton className="h-3 w-3 mr-1 rounded-full" />
          <Skeleton className="h-3 w-12" />
        </div>
        <Skeleton className="h-3 w-14" />
      </div>
    </div>
  )

  return (
    <TooltipProvider>
      <div className="space-y-4">
        {/* Header Section - Improved mobile responsiveness */}
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          <h2 className="text-xl font-bold tracking-tight md:text-2xl lg:text-3xl">{title}</h2>
          <div className="flex flex-wrap items-center gap-2">
            {showDateRangePicker && (
              <div className="w-full sm:w-auto pr-0">
                <CalendarDateRangePicker className="w-full max-w-full !mr-0" />
              </div>
            )}

            <div className="flex items-center gap-2 w-full sm:w-auto">
              {showFilter && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="h-8 flex-shrink-0 px-2 sm:px-3 flex-1 sm:flex-none">
                      <Filter className="h-4 w-4" />
                      <span className="ml-2">Filter</span>
                      {selectedFilters.length > 0 && (
                        <Badge variant="secondary" className="ml-1 rounded-full px-1">
                          {selectedFilters.length}
                        </Badge>
                      )}
                      <ChevronDown className="ml-1 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-[200px]">
                    <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleFilter("status")
                      }}
                      className="cursor-pointer"
                      onSelect={(e) => {
                        e.preventDefault()
                      }}
                    >
                      <Checkbox
                        id="status"
                        className="mr-2"
                        checked={selectedFilters.includes("status")}
                        onCheckedChange={(checked) => {
                          if (checked !== "indeterminate") {
                            toggleFilter("status")
                          }
                        }}
                      />
                      <label htmlFor="status" className="flex-1 cursor-pointer">
                        Status
                      </label>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleFilter("priority")
                      }}
                      className="cursor-pointer"
                      onSelect={(e) => {
                        e.preventDefault()
                      }}
                    >
                      <Checkbox
                        id="priority"
                        className="mr-2"
                        checked={selectedFilters.includes("priority")}
                        onCheckedChange={(checked) => {
                          if (checked !== "indeterminate") {
                            toggleFilter("priority")
                          }
                        }}
                      />
                      <label htmlFor="priority" className="flex-1 cursor-pointer">
                        Priority
                      </label>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleFilter("team")
                      }}
                      className="cursor-pointer"
                      onSelect={(e) => {
                        e.preventDefault()
                      }}
                    >
                      <Checkbox
                        id="team"
                        className="mr-2"
                        checked={selectedFilters.includes("team")}
                        onCheckedChange={(checked) => {
                          if (checked !== "indeterminate") {
                            toggleFilter("team")
                          }
                        }}
                      />
                      <label htmlFor="team" className="flex-1 cursor-pointer">
                        Team
                      </label>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleFilter("date")
                      }}
                      className="cursor-pointer"
                      onSelect={(e) => {
                        e.preventDefault()
                      }}
                    >
                      <Checkbox
                        id="date"
                        className="mr-2"
                        checked={selectedFilters.includes("date")}
                        onCheckedChange={(checked) => {
                          if (checked !== "indeterminate") {
                            toggleFilter("date")
                          }
                        }}
                      />
                      <label htmlFor="date" className="flex-1 cursor-pointer">
                        Date
                      </label>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full"
                        onClick={(e) => {
                          e.stopPropagation()
                          setSelectedFilters([])
                        }}
                        disabled={selectedFilters.length === 0}
                      >
                        {selectedFilters.length > 0 ? "Clear Filters" : "Apply Filters"}
                      </Button>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}

              <Button
                variant="outline"
                size="sm"
                className="h-8 flex-shrink-0 px-2 sm:px-3 flex-1 sm:flex-none"
                onClick={handleRefresh}
                disabled={isLoading}
              >
                <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
                <span className="ml-2">Retry</span>
              </Button>

              {showNewButton && (
                <Button
                  onClick={onNewButtonClick}
                  size="sm"
                  className="h-8 flex-shrink-0 px-2 sm:px-3 flex-1 sm:flex-none"
                >
                  <PlusCircle className="h-4 w-4" />
                  <span className="ml-2">New</span>
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Stats Cards Section - shadcn style with balanced spacing */}
        <div className="grid gap-4 grid-cols-2 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 pt-2 px-4">
              <div className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>
                <CardTitle className="text-xs sm:text-sm font-medium">Organizations</CardTitle>
              </div>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 p-0 text-muted-foreground hover:text-foreground"
                  >
                    <Building2 className="h-3.5 w-3.5" />
                    <span className="sr-only">Organization Info</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Total number of organizations in the system</p>
                </TooltipContent>
              </Tooltip>
            </CardHeader>
            <CardContent className="pb-2 pt-0 px-4 space-y-2">
              {isLoading ? (
                <CardSkeleton />
              ) : (
                <>
                  <div className="flex items-baseline justify-between">
                    <div className="text-base sm:text-lg font-bold">{totalOrganizations}</div>
                    <div className="flex items-center text-[10px] sm:text-xs text-muted-foreground">
                      {getTrendIcon(trends.organizations.direction)}
                      <span className="ml-1">+{trends.organizations.value}</span>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-[10px] sm:text-xs">
                      <span className="text-muted-foreground">Growth</span>
                      <span className="font-medium text-emerald-500">{trends.organizations.percentage}%</span>
                    </div>
                    <Progress value={trends.organizations.percentage} className="h-1 mt-1" />
                  </div>
                  <div className="flex items-center justify-between text-[10px] sm:text-xs text-muted-foreground">
                    <div className="flex items-center">
                      <Clock className="h-2.5 w-2.5 mr-1" />
                      <span>2h ago</span>
                    </div>
                    <a href="#" className="text-primary hover:underline">
                      Details
                    </a>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 pt-2 px-4">
              <div className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-500"></div>
                <CardTitle className="text-xs sm:text-sm font-medium">Projects</CardTitle>
              </div>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 p-0 text-muted-foreground hover:text-foreground"
                  >
                    <Layers className="h-3.5 w-3.5" />
                    <span className="sr-only">Projects Info</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Total number of active projects</p>
                </TooltipContent>
              </Tooltip>
            </CardHeader>
            <CardContent className="pb-2 pt-0 px-4 space-y-2">
              {isLoading ? (
                <CardSkeleton />
              ) : (
                <>
                  <div className="flex items-baseline justify-between">
                    <div className="text-base sm:text-lg font-bold">{totalProjects}</div>
                    <div className="flex items-center text-[10px] sm:text-xs text-muted-foreground">
                      {getTrendIcon(trends.projects.direction)}
                      <span className="ml-1">+{trends.projects.value}</span>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-[10px] sm:text-xs">
                      <span className="text-muted-foreground">Completion</span>
                      <span className="font-medium text-cyan-500">68%</span>
                    </div>
                    <Progress value={68} className="h-1 mt-1" />
                  </div>
                  <div className="flex items-center justify-between text-[10px] sm:text-xs text-muted-foreground">
                    <div className="flex items-center">
                      <Clock className="h-2.5 w-2.5 mr-1" />
                      <span>3h ago</span>
                    </div>
                    <a href="#" className="text-primary hover:underline">
                      Details
                    </a>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 pt-2 px-4">
              <div className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div>
                <CardTitle className="text-xs sm:text-sm font-medium">Active Tasks</CardTitle>
              </div>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 p-0 text-muted-foreground hover:text-foreground"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    <span className="sr-only">Tasks Info</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Number of tasks currently in progress</p>
                </TooltipContent>
              </Tooltip>
            </CardHeader>
            <CardContent className="pb-2 pt-0 px-4 space-y-2">
              {isLoading ? (
                <CardSkeleton />
              ) : (
                <>
                  <div className="flex items-baseline justify-between">
                    <div className="text-base sm:text-lg font-bold">{activeTasks}</div>
                    <div className="flex items-center text-[10px] sm:text-xs text-muted-foreground">
                      {getTrendIcon(trends.tasks.direction)}
                      <span className="ml-1">+{trends.tasks.value}</span>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-[10px] sm:text-xs">
                      <span className="text-muted-foreground">Completion</span>
                      <span className="font-medium text-amber-500">
                        {totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0}%
                      </span>
                    </div>
                    <Progress value={totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0} className="h-1 mt-1" />
                  </div>
                  <div className="flex items-center justify-between text-[10px] sm:text-xs text-muted-foreground">
                    <div className="flex items-center">
                      <Clock className="h-2.5 w-2.5 mr-1" />
                      <span>1h ago</span>
                    </div>
                    <a href="#" className="text-primary hover:underline">
                      Details
                    </a>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 pt-2 px-4">
              <div className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                <CardTitle className="text-xs sm:text-sm font-medium">Team Members</CardTitle>
              </div>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 p-0 text-muted-foreground hover:text-foreground"
                  >
                    <Users className="h-3.5 w-3.5" />
                    <span className="sr-only">Team Info</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Total number of team members across all organizations</p>
                </TooltipContent>
              </Tooltip>
            </CardHeader>
            <CardContent className="pb-2 pt-0 px-4 space-y-2">
              {isLoading ? (
                <CardSkeleton />
              ) : (
                <>
                  <div className="flex items-baseline justify-between">
                    <div className="text-base sm:text-lg font-bold">{totalMembers}</div>
                    <div className="flex items-center text-[10px] sm:text-xs text-muted-foreground">
                      {getTrendIcon(trends.members.direction)}
                      <span className="ml-1">+{trends.members.value}</span>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-[10px] sm:text-xs">
                      <span className="text-muted-foreground">Activity</span>
                      <span className="font-medium text-emerald-500">92%</span>
                    </div>
                    <Progress value={92} className="h-1 mt-1" />
                  </div>
                  <div className="flex items-center justify-between text-[10px] sm:text-xs text-muted-foreground">
                    <div className="flex items-center">
                      <Clock className="h-2.5 w-2.5 mr-1" />
                      <span>30m ago</span>
                    </div>
                    <a href="#" className="text-primary hover:underline">
                      Details
                    </a>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </TooltipProvider>
  )
}
