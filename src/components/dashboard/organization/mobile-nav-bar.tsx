"use client"

import type React from "react"

import { X, Plus } from "lucide-react"
import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { useIsMobile } from "@/hooks/use-breakpoint"
import { useTheme } from "next-themes"
import { UserNav } from "./user-nav"
import Search from "./search"
import { QuickActionsPanel } from "./quick-actions"
import { NotificationsPanel } from "./notifications"
import { OrganizationSwitcher } from "./switcher"

// Define navigation items
interface NavItem {
  href: string
  label: string
  badge?: string
}

// Create an array of navigation items
const navigationItems: NavItem[] = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/projects", label: "Projects" },
  { href: "/settings", label: "Settings" },
]

// Create mega menu structure
interface MegaMenuItem {
  items: NavItem[]
}

// Animation configurations
const animations = {
  spring: {
    type: "spring",
    stiffness: 300,
    damping: 20,
  },
  tween: {
    type: "tween",
    ease: "easeInOut",
    duration: 0.3,
  },
}

export function MobileNavigationBar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("up")
  const [lastScrollY, setLastScrollY] = useState(0)

  const navRef = useRef<HTMLDivElement>(null)
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const isMobile = useIsMobile()
  const { theme } = useTheme()
  const isDarkTheme = theme === "dark"

  // Handle scroll direction
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // Determine scroll direction with a threshold
      if (Math.abs(currentScrollY - lastScrollY) > 15) {
        const newDirection = currentScrollY > lastScrollY ? "down" : "up"
        setScrollDirection(newDirection)
        setLastScrollY(currentScrollY)
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  // Toggle mobile menu
  const toggleMenu = () => {
    if (isAnimating) return

    setIsAnimating(true)
    setMenuOpen(!menuOpen)

    // Use setTimeout instead of animation controls for simpler code
    setTimeout(() => {
      setIsAnimating(false)
    }, 300)
  }

  // Handle clicks outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Close mobile menu when clicking outside
      if (menuOpen && mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node) && !isAnimating) {
        toggleMenu()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [menuOpen, isAnimating])

  // Handle escape key
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && menuOpen && !isAnimating) {
        toggleMenu()
      }
    }

    document.addEventListener("keydown", handleEscKey)
    return () => document.removeEventListener("keydown", handleEscKey)
  }, [menuOpen, isAnimating])

  // Prevent event propagation for mode toggle
  const handleModeToggleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
  }

  if (!isMobile) return null

  // Badge component
  const Badge = ({ text }: { text: string }) => (
    <span className="ml-1.5 px-1 py-0.5 text-[9px] font-medium bg-[#ff0a0a] text-white rounded">{text}</span>
  )

  return (
    <>
      {/* Overlay for detecting clicks outside */}
      {menuOpen && <div className="fixed inset-0 z-40 bg-transparent" onClick={() => !isAnimating && toggleMenu()} />}

      <motion.div
        ref={navRef}
        initial={{ height: 54, y: 100 }}
        animate={{
          height: menuOpen ? 300 : 54,
          y: scrollDirection === "up" || menuOpen ? 0 : 100,
        }}
        transition={{
          height: animations.tween,
          y: {
            ...animations.tween,
            duration: 0.4,
          },
        }}
        className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 w-[320px] z-50 flex flex-col items-center rounded-sm backdrop-blur-xl overflow-hidden will-change-[height,transform,opacity] border ${
          isDarkTheme
            ? "bg-slate-900/60 border-slate-700/40 shadow-lg shadow-slate-900/20"
            : "bg-white/70 border-gray-200/80"
        }`}
      >
        {/* Mobile Menu Content */}
        <div className="absolute top-0 left-0 right-0 w-full">
          <AnimatePresence mode="wait">
            {menuOpen && (
              <motion.div
                ref={mobileMenuRef}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ ...animations.tween, duration: 0.25 }}
                className="w-full h-[260px] p-5"
              >
                <div
                  className={`w-full h-full rounded-xl flex flex-col ${
                    isDarkTheme ? "bg-slate-800/50 backdrop-blur-md" : "bg-gray-50/60"
                  }`}
                >
                  <div className="flex flex-col h-full">
                    <div className="p-3 border-b border-slate-700/30">
                      <OrganizationSwitcher />
                    </div>

                    <div className="flex flex-col flex-1">
                      {navigationItems.map((item) => (
                        <Link
                          key={item.label}
                          href={item.href}
                          className={`flex items-center px-4 py-3 text-sm font-medium ${
                            isDarkTheme
                              ? "hover:bg-slate-700/70 text-slate-200 border-b border-slate-700/30"
                              : "hover:bg-gray-200/70 text-gray-700 border-b border-gray-200/30"
                          }`}
                        >
                          {item.label}
                          {item.badge && <Badge text={item.badge} />}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Mobile Bottom Navigation */}
        <div className="absolute bottom-0 w-full h-[52px]">
          <div className="w-full h-full pb-2">
            <div className="relative w-full h-full flex">
              <div className="flex pt-2 w-full justify-between">
                <motion.div
                  className={`h-full ml-2 flex items-center justify-center cursor-pointer rounded-sm ${
                    isDarkTheme ? "bg-slate-800/70 hover:bg-slate-700/80" : "bg-gray-100/80 hover:bg-gray-200/80"
                  }`}
                  style={{ width: menuOpen ? "320px" : "45px" }}
                  animate={{
                    width: menuOpen ? 320 : 45,
                  }}
                  transition={animations.tween}
                  onClick={(e) => {
                    e.stopPropagation()
                    if (!isAnimating) toggleMenu()
                  }}
                >
                  <div className="flex items-center justify-center gap-2">
                    <motion.div
                      animate={{
                        rotate: menuOpen ? 90 : 0,
                      }}
                      transition={{
                        type: "tween",
                        duration: 0.2,
                      }}
                    >
                      {menuOpen ? (
                        <X size={16} className={isDarkTheme ? "text-slate-200" : "text-gray-700"} />
                      ) : (
                        <Plus size={16} className={isDarkTheme ? "text-slate-200" : "text-gray-700"} />
                      )}
                    </motion.div>
                  </div>
                </motion.div>

                <motion.div
                  className={`h-full flex justify-center pl-4 mr-2 items-center rounded-sm overflow-hidden ${
                    isDarkTheme
                      ? "bg-slate-800/60 border border-slate-700/60 hover:border-slate-600"
                      : "bg-gray-100/70 border border-gray-200/70 hover:border-gray-300/80"
                  }`}
                  style={{ width: "150px" }}
                  animate={{
                    opacity: menuOpen ? 0 : 1,
                    width: menuOpen ? 0 : 150,
                    marginLeft: menuOpen ? 0 : 8,
                  }}
                  transition={animations.tween}
                  onClick={(e) => e.stopPropagation()}
                >
                  {!menuOpen && <Search />}
                </motion.div>
                <motion.div
                  className={`h-full flex justify-center items-center rounded-sm overflow-hidden`}
                  style={{ width: "20px" }}
                  animate={{
                    opacity: menuOpen ? 0 : 1,
                    width: menuOpen ? 0 : 20,
                    marginLeft: menuOpen ? 0 : 8,
                  }}
                  transition={animations.tween}
                  onClick={(e) => e.stopPropagation()}
                >
                  {!menuOpen && <QuickActionsPanel />}
                </motion.div>
                <motion.div
                  className={`h-full flex justify-center pt-1 items-center rounded-sm overflow-hidden`}
                  style={{ width: "60px" }}
                  animate={{
                    opacity: menuOpen ? 0 : 1,
                    width: menuOpen ? 0 : 60,
                    marginLeft: menuOpen ? 0 : 8,
                  }}
                  transition={animations.tween}
                  onClick={(e) => e.stopPropagation()}
                >
                  {!menuOpen && <NotificationsPanel />}
                </motion.div>
                <motion.div
                  className={`h-full flex justify-center items-center rounded-sm overflow-hidden ml-auto`}
                  style={{ width: "70px" }}
                  animate={{
                    opacity: menuOpen ? 0 : 1,
                    width: menuOpen ? 0 : 70,
                    marginLeft: menuOpen ? 0 : "auto",
                  }}
                  transition={animations.tween}
                  onClick={(e) => e.stopPropagation()}
                >
                  {!menuOpen && <UserNav />}
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  )
}
