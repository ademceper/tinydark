"use client"

import type * as React from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from "@/components/ui/drawer"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useEffect, useRef, useState } from "react"
import { DottedSeperator } from "@/components/shared/dotted-separator"
import { useDeviceType } from "@/hooks/use-breakpoint"

interface ResponsiveDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  children: React.ReactNode
  title: string
  description?: string
}

export function ResponsiveDialog({ open, onOpenChange, children, title, description }: ResponsiveDialogProps) {
  const deviceType = useDeviceType()
  const contentRef = useRef<HTMLDivElement>(null)
  const [maxHeight, setMaxHeight] = useState<string | undefined>(undefined)

  // For debugging
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      console.log("Current device type:", deviceType)
    }
  }, [deviceType])

  useEffect(() => {
    // This prevents the dialog from closing if the device type changes while it's open
    // For example, when rotating the device or resizing the window
    if (!open) return

    // We don't want to modify the open state here, just let the parent component control it
  }, [deviceType, open])

  useEffect(() => {
    if (!open || !contentRef.current) return

    const calculateHeight = () => {
      if (!contentRef.current) return
      const contentHeight = contentRef.current.scrollHeight
      const viewportMaxHeight = window.innerHeight * 0.9 - 152
      setMaxHeight(contentHeight > viewportMaxHeight ? `${viewportMaxHeight}px` : undefined)
    }

    calculateHeight()

    const resizeObserver = new ResizeObserver(calculateHeight)
    resizeObserver.observe(contentRef.current)

    return () => {
      resizeObserver.disconnect()
    }
  }, [open, children])

  const Content = (
    <>
      <DottedSeperator />
      <ScrollArea className={`overflow-y-auto ${maxHeight ? "overscroll-contain" : ""}`} style={{ maxHeight }}>
        <div ref={contentRef} className="px-4 pb-4">
          {children}
        </div>
      </ScrollArea>
    </>
  )

  const isMobileOrTablet = deviceType === "mobile" || deviceType === "tablet"

  // Make sure we're not changing the component type while it's open
  // This prevents the drawer from closing unexpectedly
  return (
    <>
      {isMobileOrTablet ? (
        <Drawer open={open} onOpenChange={onOpenChange}>
          <DrawerContent>
            <DrawerHeader className="pt-5 text-left">
              <DrawerTitle>{title}</DrawerTitle>
              {description && <DrawerDescription>{description}</DrawerDescription>}
            </DrawerHeader>
            {Content}
          </DrawerContent>
        </Drawer>
      ) : (
        <Dialog open={open} onOpenChange={onOpenChange}>
          <DialogContent className="sm:max-w-[550px]">
            <DialogHeader>
              <DialogTitle>{title}</DialogTitle>
              {description && <DialogDescription>{description}</DialogDescription>}
            </DialogHeader>
            {Content}
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}
