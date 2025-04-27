"use client"

import * as React from "react"
import { addDays, format, isEqual, isToday } from "date-fns"
import { CalendarIcon } from "lucide-react"
import type { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function CalendarDateRangePicker({ className }: React.HTMLAttributes<HTMLDivElement>) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 7),
  })

  const [isOpen, setIsOpen] = React.useState(false)

  // Predefined date ranges
  const dateRanges = [
    { label: "Today", value: "today", days: 0 },
    { label: "Yesterday", value: "yesterday", days: -1 },
    { label: "Last 7 days", value: "last7days", days: -7 },
    { label: "Last 30 days", value: "last30days", days: -30 },
    { label: "This month", value: "thisMonth", days: "thisMonth" },
    { label: "Last month", value: "lastMonth", days: "lastMonth" },
    { label: "Custom range", value: "custom", days: "custom" },
  ]

  const handleSelectPreset = (value: string) => {
    const today = new Date()

    switch (value) {
      case "today":
        setDate({ from: today, to: today })
        break
      case "yesterday":
        const yesterday = addDays(today, -1)
        setDate({ from: yesterday, to: yesterday })
        break
      case "last7days":
        setDate({ from: addDays(today, -7), to: today })
        break
      case "last30days":
        setDate({ from: addDays(today, -30), to: today })
        break
      case "thisMonth":
        const thisMonthStart = new Date(today.getFullYear(), today.getMonth(), 1)
        const thisMonthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0)
        setDate({ from: thisMonthStart, to: thisMonthEnd })
        break
      case "lastMonth":
        const lastMonthStart = new Date(today.getFullYear(), today.getMonth() - 1, 1)
        const lastMonthEnd = new Date(today.getFullYear(), today.getMonth(), 0)
        setDate({ from: lastMonthStart, to: lastMonthEnd })
        break
      case "custom":
        // Keep current selection or set a default
        if (!date) {
          setDate({ from: today, to: addDays(today, 7) })
        }
        break
    }

    if (value !== "custom") {
      setIsOpen(false)
    }
  }

  // Format the date range for display
  const formatDateRange = () => {
    if (!date?.from) {
      return "Select date range"
    }

    if (date.to) {
      if (isEqual(date.from, date.to)) {
        if (isToday(date.from)) {
          return "Today"
        }
        return format(date.from, "MMM d, yyyy")
      }

      // Check if it's one of our predefined ranges
      const today = new Date()

      if (isToday(date.to) && isEqual(date.from, addDays(today, -7))) {
        return "Last 7 days"
      }

      if (isToday(date.to) && isEqual(date.from, addDays(today, -30))) {
        return "Last 30 days"
      }

      // This month
      const thisMonthStart = new Date(today.getFullYear(), today.getMonth(), 1)
      const thisMonthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0)
      if (isEqual(date.from, thisMonthStart) && isEqual(date.to, thisMonthEnd)) {
        return "This month"
      }

      // Last month
      const lastMonthStart = new Date(today.getFullYear(), today.getMonth() - 1, 1)
      const lastMonthEnd = new Date(today.getFullYear(), today.getMonth(), 0)
      if (isEqual(date.from, lastMonthStart) && isEqual(date.to, lastMonthEnd)) {
        return "Last month"
      }

      return `${format(date.from, "MMM d, yyyy")} - ${format(date.to, "MMM d, yyyy")}`
    }

    return format(date.from, "MMM d, yyyy")
  }

  return (
    <div className={cn("grid gap-2 w-full", className)}>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button id="date" variant={"outline"} className={cn("w-full font-normal", !date && "text-muted-foreground")}>
            <CalendarIcon className="mr-2 h-4 w-4 flex-shrink-0" />
            <span className="truncate sm:text-left sm:justify-start text-center">{formatDateRange()}</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <div className="p-3 border-b">
            <div className="space-y-2">
              <Select onValueChange={handleSelectPreset} defaultValue="custom">
                <SelectTrigger>
                  <SelectValue placeholder="Select a preset" />
                </SelectTrigger>
                <SelectContent position="popper">
                  {dateRanges.map((range) => (
                    <SelectItem key={range.value} value={range.value}>
                      {range.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
            className="p-3"
          />
          <div className="flex items-center justify-between p-3 border-t">
            <p className="text-sm text-muted-foreground">
              {date?.from && date?.to
                ? `${date.to.getDate() - date.from.getDate() + 1} days selected`
                : "Select a date range"}
            </p>
            <div className="space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setDate(undefined)
                }}
              >
                Reset
              </Button>
              <Button
                size="sm"
                onClick={() => {
                  setIsOpen(false)
                }}
              >
                Apply
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
