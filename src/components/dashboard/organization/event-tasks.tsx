"use client"

import { Button } from "@/components/ui/button"
import { Calendar, CheckCircle2, MoreHorizontal } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"

// Define types for events and tasks
interface Event {
  id: string
  title: string
  date: string
  duration: string
  attendees: number
  location: string
}

interface Task {
  id: string
  title: string
  project: string
  dueDate: string
  priority: string
  status: string
}

interface OrganizationEventsTasksProps {
  upcomingEvents: Event[]
  tasks: Task[]
  onViewCalendar?: () => void
  onViewAllTasks?: () => void
  onEventMoreClick?: (eventId: string) => void
  onTaskCheckboxChange?: (taskId: string, checked: boolean) => void
}

export function OrganizationEventsTasks({
  upcomingEvents = [],
  tasks = [],
  onViewCalendar,
  onViewAllTasks,
  onEventMoreClick,
  onTaskCheckboxChange,
}: OrganizationEventsTasksProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Upcoming Events</CardTitle>
          <CardDescription>Your scheduled meetings and events.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {upcomingEvents.map((event) => (
              <div
                key={event.id}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-lg border p-3"
              >
                <div className="flex items-start sm:items-center space-x-3">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <Calendar className="h-5 w-5 text-primary" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium truncate">{event.title}</p>
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground">
                      <span>{event.date}</span>
                      <span className="hidden xs:inline-block">•</span>
                      <span>{event.duration}</span>
                      <span className="hidden xs:inline-block">•</span>
                      <span className="truncate">{event.location}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between sm:justify-end space-x-2 ml-auto sm:ml-0">
                  <Badge variant="outline" className="whitespace-nowrap">
                    {event.attendees} attendees
                  </Badge>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 flex-shrink-0"
                    onClick={() => onEventMoreClick?.(event.id)}
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}

            {upcomingEvents.length === 0 && (
              <div className="flex flex-col items-center justify-center py-6 text-center">
                <Calendar className="h-10 w-10 text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">No upcoming events</p>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full" onClick={onViewCalendar}>
            <Calendar className="mr-2 h-4 w-4" />
            View Calendar
          </Button>
        </CardFooter>
      </Card>

      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Tasks</CardTitle>
          <CardDescription>Your assigned tasks and their status.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-lg border p-3"
              >
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id={`task-${task.id}`}
                    className="mt-0.5"
                    onCheckedChange={(checked) => onTaskCheckboxChange?.(task.id, checked as boolean)}
                  />
                  <div className="min-w-0 flex-1">
                    <label htmlFor={`task-${task.id}`} className="text-sm font-medium cursor-pointer line-clamp-2">
                      {task.title}
                    </label>
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground">
                      <span className="truncate">{task.project}</span>
                      <span className="hidden xs:inline-block">•</span>
                      <span>Due: {task.dueDate}</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-2 mt-2 sm:mt-0 ml-8 sm:ml-0">
                  <Badge
                    variant={
                      task.priority === "Critical"
                        ? "destructive"
                        : task.priority === "High"
                          ? "default"
                          : task.priority === "Medium"
                            ? "secondary"
                            : "outline"
                    }
                    className="whitespace-nowrap"
                  >
                    {task.priority}
                  </Badge>
                  <Badge className="whitespace-nowrap">{task.status}</Badge>
                </div>
              </div>
            ))}

            {tasks.length === 0 && (
              <div className="flex flex-col items-center justify-center py-6 text-center">
                <CheckCircle2 className="h-10 w-10 text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">No tasks assigned</p>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full" onClick={onViewAllTasks}>
            <CheckCircle2 className="mr-2 h-4 w-4" />
            View All Tasks
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
