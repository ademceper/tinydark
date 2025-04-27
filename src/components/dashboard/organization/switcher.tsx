"use client"

import * as React from "react"
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useRouter } from "next/navigation"
import { Search, ChevronDown } from "lucide-react"
import { useDeviceType, useIsMobile } from "@/hooks/use-breakpoint"

type Organization = {
  id: string
  name: string
  logo?: string
  role: string
  plan: string
  members: number
}

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>

interface OrganizationSwitcherProps extends PopoverTriggerProps {
  organizations?: Organization[]
}

export function OrganizationSwitcher({
  className,
  organizations = [
    {
      id: "org-1",
      name: "Acme Corporation",
      logo: "/logo.svg",
      role: "Owner",
      plan: "enterprise",
      members: 42,
    },
    {
      id: "org-2",
      name: "Startup Ventures",
      logo: "/logo.svg",
      role: "Admin",
      plan: "pro",
      members: 8,
    },
    {
      id: "org-3",
      name: "Personal Projects",
      logo: "/logo.svg",
      role: "Memberasddddddddddddddddddddddd",
      plan: "free",
      members: 1,
    },
    {
      id: "org-4",
      name: "Tech Innovators",
      logo: "/logo.svg",
      role: "Developer",
      plan: "enterprise",
      members: 36,
    },
    {
      id: "org-5",
      name: "Design Studio",
      logo: "/logo.svg",
      role: "Designer",
      plan: "pro",
      members: 12,
    },
    {
      id: "org-6",
      name: "Design Studio",
      logo: "/logo.svg",
      role: "Designer",
      plan: "pro",
      members: 12,
    },
    {
      id: "org-7",
      name: "Design Studio",
      logo: "/logo.svg",
      role: "Designer",
      plan: "pro",
      members: 12,
    },
  ],
}: OrganizationSwitcherProps) {
  const router = useRouter()
  const [open, setOpen] = React.useState(false)
  const [selectedOrg, setSelectedOrg] = React.useState<Organization>(organizations[0])
  const [searchQuery, setSearchQuery] = React.useState("")

  const isMobile = useIsMobile()
  const deviceType = useDeviceType()

  React.useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      console.log("OrganizationSwitcher - Device type:", deviceType)
      console.log("OrganizationSwitcher - Is mobile:", isMobile)
    }
  }, [deviceType, isMobile])

  // Filter organizations based on search query
  const filteredOrganizations = organizations.filter((org) =>
    org.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const getPlanDetails = (plan: string) => {
    switch (plan) {
      case "free":
        return { label: "Free", color: "bg-gray-100 text-gray-800" }
      case "pro":
        return { label: "Pro", color: "bg-blue-100 text-blue-800" }
      case "enterprise":
        return { label: "Enterprise", color: "bg-purple-100 text-purple-800" }
      default:
        return { label: plan, color: "bg-gray-100 text-gray-800" }
    }
  }

  // Reference for measuring text
  const nameRef = React.useRef<HTMLParagraphElement>(null)
  const roleRef = React.useRef<HTMLParagraphElement>(null)

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-label="Select an organization"
            className={cn(
              "justify-between",
              isMobile ? "h-9 px-2 py-1 min-w-[250px] max-w-[250px]" : "w-[250px]",
              className,
            )}
          >
            {isMobile ? (
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2">
                  <Avatar className="h-5 w-5 flex-shrink-0">
                    <AvatarImage src={selectedOrg.logo || `/logos/default.png`} alt={selectedOrg.name} />
                    <AvatarFallback>{selectedOrg.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col items-start">
                    <p ref={nameRef} className="text-xs font-medium truncate max-w-[100px]">
                      {selectedOrg.name}
                    </p>
                    <p ref={roleRef} className="text-[10px] text-muted-foreground truncate max-w-[100px]">
                      {selectedOrg.members} members • {selectedOrg.role}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-xs font-medium">{getPlanDetails(selectedOrg.plan).label}</span>
                  <ChevronDown className="h-3 w-3 opacity-50" />
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2 overflow-hidden">
                <Avatar className="h-5 w-5">
                  <AvatarImage src={selectedOrg.logo || `/logos/default.png`} alt={selectedOrg.name} />
                  <AvatarFallback>{selectedOrg.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="truncate font-medium text-sm">{selectedOrg.name}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    {selectedOrg.members} member
                    {selectedOrg.members !== 1 ? "s" : ""} • {selectedOrg.role}
                  </p>
                </div>
                <Badge variant="outline" className="hidden sm:flex text-xs">
                  {getPlanDetails(selectedOrg.plan).label}
                </Badge>
                <CaretSortIcon className="ml-1 h-4 w-4 shrink-0 opacity-50" />
              </div>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className={cn("p-0", isMobile ? "w-[260px]" : "w-[240px]")}
          align="start"
          sideOffset={isMobile ? 4 : 0}
        >
          <div className="py-2">
            <div className="px-3 pb-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
                <Input
                  placeholder="Search organizations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={cn(
                    "border-none shadow-none focus-visible:ring-0",
                    isMobile ? "h-8 pl-7 text-xs" : "h-9 pl-8",
                  )}
                  autoFocus={false}
                />
              </div>
            </div>

            <Separator className="mb-2" />

            <div className="px-2 pt-1 pb-2">
              <div
                className={cn("font-medium text-muted-foreground px-2", isMobile ? "text-[10px]" : "text-xs")}
              >
                Your Organizations
              </div>
              <div className={cn("mt-1 overflow-y-auto pr-1", isMobile ? "max-h-[180px]" : "max-h-[240px]")}>
                {filteredOrganizations.length === 0 ? (
                  <div className={cn("text-center py-4 text-muted-foreground", isMobile ? "text-xs" : "text-sm")}>
                    No organizations found.
                  </div>
                ) : (
                  filteredOrganizations.map((org) => (
                    <div
                      key={org.id}
                      className={cn(
                        "flex items-center gap-2 w-full my-1 rounded-sm px-2 cursor-pointer hover:bg-accent",
                        selectedOrg.id === org.id ? "bg-accent" : "",
                        isMobile ? "py-1 text-xs" : "py-1.5 text-sm",
                      )}
                      onClick={() => {
                        setSelectedOrg(org)
                        setOpen(false)
                        console.log(`Selected organization: ${org.name}`)
                      }}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          setSelectedOrg(org)
                          setOpen(false)
                        }
                      }}
                    >
                      <Avatar className={isMobile ? "h-4 w-4" : "h-5 w-5"}>
                        <AvatarImage src={org.logo || `/logos/default.png`} alt={org.name} />
                        <AvatarFallback>{org.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="truncate font-medium">{org.name}</p>
                        <p className={cn("truncate text-muted-foreground", isMobile ? "text-[10px]" : "text-xs")}>
                          {org.members} member{org.members !== 1 ? "s" : ""} • {org.role}
                        </p>
                      </div>
                      {selectedOrg.id === org.id && <CheckIcon className={isMobile ? "h-3 w-3" : "h-4 w-4"} />}
                    </div>
                  ))
                )}
              </div>
            </div>
            {/* Footer area removed */}
          </div>
        </PopoverContent>
      </Popover>
    </>
  )
}
