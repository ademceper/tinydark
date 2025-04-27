"use client"

import type React from "react"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import { ArrowRight, List, X, ChevronDown, ChevronUp } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useDeviceType, useIsMobile } from "@/hooks/use-breakpoint"
import { ModeToggle } from "../theme/mode-toggle"
import { useTheme } from "next-themes"

// Define a proper interface for navigation items
interface NavItem {
  href: string
  label: string
  badge?: string
}

// Explicitly type all navigation arrays
const primaryNavItems: NavItem[] = [
  { href: "/solutions", label: "Solutions" },
  { href: "/features", label: "Features" },
  { href: "/pricing", label: "Pricing" },
]

const workspaceNavItems: NavItem[] = [
  { href: "/products", label: "Workspaces" },
  { href: "/integrations", label: "Integrations" },
  { href: "/ai", label: "AI Assist", badge: "Beta" },
]

const moreNavItems: NavItem[] = [
  { href: "/roadmap", label: "Roadmap" },
  { href: "/docs", label: "Docs" },
]

// Create a type-safe mega menu structure
interface MegaMenuItem {
  items: NavItem[]
}

const megaMenuItems: MegaMenuItem[] = [
  { items: primaryNavItems },
  { items: workspaceNavItems },
  { items: moreNavItems },
]

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

export function Header() {
  const deviceType = useDeviceType()
  const isMobile = useIsMobile()
  const { theme } = useTheme()
  const isDarkTheme = theme === "dark"

  // State
  const [menuOpen, setMenuOpen] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("up")
  const [lastScrollY, setLastScrollY] = useState(0)
  const [workspaceDropdownOpen, setWorkspaceDropdownOpen] = useState(false)
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false)

  // Refs
  const navRef = useRef<HTMLDivElement>(null)
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const workspaceDropdownRef = useRef<HTMLDivElement>(null)
  const moreDropdownRef = useRef<HTMLDivElement>(null)

  // Simplified scroll handling
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // Update scrolled state
      setScrolled(currentScrollY > 10)

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

  // Handle clicks outside dropdowns and mobile menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Close workspace dropdown when clicking outside
      if (
        workspaceDropdownOpen &&
        workspaceDropdownRef.current &&
        !workspaceDropdownRef.current.contains(event.target as Node)
      ) {
        setWorkspaceDropdownOpen(false)
      }

      // Close more dropdown when clicking outside
      if (moreDropdownOpen && moreDropdownRef.current && !moreDropdownRef.current.contains(event.target as Node)) {
        setMoreDropdownOpen(false)
      }

      // Close mobile menu when clicking outside
      if (menuOpen && mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node) && !isAnimating) {
        toggleMenu()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [menuOpen, isAnimating, workspaceDropdownOpen, moreDropdownOpen])

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

  // Toggle workspace dropdown
  const toggleWorkspaceDropdown = (e: React.MouseEvent) => {
    e.stopPropagation()
    setWorkspaceDropdownOpen(!workspaceDropdownOpen)
    setMoreDropdownOpen(false) // Close the other dropdown
  }

  // Toggle more dropdown
  const toggleMoreDropdown = (e: React.MouseEvent) => {
    e.stopPropagation()
    setMoreDropdownOpen(!moreDropdownOpen)
    setWorkspaceDropdownOpen(false) // Close the other dropdown
  }

  // Prevent event propagation for mode toggle
  const handleModeToggleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
  }

  // Badge component to avoid TypeScript errors
  const Badge = ({ text }: { text: string }) => (
    <span className="px-1.5 py-0.5 text-[10px] font-medium bg-[#ff0a0a] text-white rounded">{text}</span>
  )

  return (
    <>
      {/* Desktop Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={animations.spring}
        className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-3xl border-b border-border/30 transition-colors duration-300 bg-background/60 dark:bg-background/60 ${
          isMobile ? "hidden" : ""
        }`}
      >
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-3">
              <Image src="/logo.svg" alt="Orbit Suite" width={32} height={32} className="w-8 h-8" />
            </Link>

            {deviceType === "desktop" && (
              <nav className="flex items-center gap-8 text-sm text-foreground/70">
                {/* Workspace Dropdown */}
                <div ref={workspaceDropdownRef} className="relative">
                  <motion.button
                    onClick={toggleWorkspaceDropdown}
                    className="flex items-center gap-1 relative group hover:text-[#ff0a0a] transition-colors duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Workspace
                    {workspaceDropdownOpen ? (
                      <ChevronUp size={14} className="ml-1" />
                    ) : (
                      <ChevronDown size={14} className="ml-1" />
                    )}
                    <motion.span
                      className="absolute bottom-0 left-0 w-0 h-px bg-[#ff0a0a] group-hover:w-full transition-all duration-300"
                      initial={{ width: 0 }}
                      whileHover={{ width: "100%" }}
                    />
                  </motion.button>

                  <AnimatePresence>
                    {workspaceDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-2 w-48 bg-white dark:bg-gray-900 rounded-md shadow-lg border border-gray-200 dark:border-gray-800 overflow-hidden z-50"
                      >
                        <div className="py-1">
                          {workspaceNavItems.map((item) => (
                            <Link
                              key={item.href}
                              href={item.href}
                              className="flex items-center justify-between px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                              onClick={() => setWorkspaceDropdownOpen(false)}
                            >
                              {item.label}
                              {item.badge ? <Badge text={item.badge} /> : null}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Primary Nav Items */}
                {primaryNavItems.map((item) => (
                  <motion.div key={item.href} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link
                      href={item.href}
                      className="relative group hover:text-[#ff0a0a] transition-colors duration-300"
                    >
                      {item.label}
                      <motion.span
                        className="absolute bottom-0 left-0 w-0 h-px bg-[#ff0a0a] group-hover:w-full transition-all duration-300"
                        initial={{ width: 0 }}
                        whileHover={{ width: "100%" }}
                      />
                      {item.badge ? (
                        <motion.span
                          className="ml-2 px-1.5 py-0.5 text-[10px] font-medium bg-[#ff0a0a] text-white rounded group-hover:opacity-90"
                          whileHover={{ y: -2 }}
                        >
                          {item.badge}
                        </motion.span>
                      ) : null}
                    </Link>
                  </motion.div>
                ))}

                {/* More Dropdown */}
                <div ref={moreDropdownRef} className="relative">
                  <motion.button
                    onClick={toggleMoreDropdown}
                    className="flex items-center gap-1 relative group hover:text-[#ff0a0a] transition-colors duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    More
                    {moreDropdownOpen ? (
                      <ChevronUp size={14} className="ml-1" />
                    ) : (
                      <ChevronDown size={14} className="ml-1" />
                    )}
                    <motion.span
                      className="absolute bottom-0 left-0 w-0 h-px bg-[#ff0a0a] group-hover:w-full transition-all duration-300"
                      initial={{ width: 0 }}
                      whileHover={{ width: "100%" }}
                    />
                  </motion.button>

                  <AnimatePresence>
                    {moreDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-2 w-48 bg-white dark:bg-gray-900 rounded-md shadow-lg border border-gray-200 dark:border-gray-800 overflow-hidden z-50"
                      >
                        <div className="py-1">
                          {moreNavItems.map((item) => (
                            <Link
                              key={item.href}
                              href={item.href}
                              className="flex items-center justify-between px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                              onClick={() => setMoreDropdownOpen(false)}
                            >
                              {item.label}
                              {item.badge ? <Badge text={item.badge} /> : null}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </nav>
            )}
          </div>

          {deviceType === "desktop" && (
            <div className="flex items-center gap-4">
              <ModeToggle />
              <div className="h-6 w-px bg-gray-300 dark:bg-gray-700"></div>
              <motion.div whileHover={{ scale: 1.05 }}>
                <Link
                  href="/sign-in"
                  className="text-sm text-foreground hover:text-[#ff0a0a] transition-all duration-300 ease-in-out relative group flex items-center"
                >
                  <motion.span initial={{ x: 0 }} whileHover={{ x: -5 }}>
                    Sign in
                  </motion.span>
                  <motion.span className="ml-2" initial={{ opacity: 0, x: -10 }} whileHover={{ opacity: 1, x: 0 }}>
                    <ArrowRight size={16} />
                  </motion.span>
                </Link>
              </motion.div>
            </div>
          )}
        </div>
      </motion.header>

      {/* Mobile Navigation */}
      {isMobile && (
        <>
          {/* Overlay for detecting clicks outside */}
          {menuOpen && (
            <div className="fixed inset-0 z-40 bg-transparent" onClick={() => !isAnimating && toggleMenu()} />
          )}

          <motion.div
            ref={navRef}
            initial={{ height: 54, y: 100 }}
            animate={{
              height: menuOpen ? 370 : 54,
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
              isDarkTheme ? "bg-black/60 border-white/20" : "bg-white/90 border-gray-200"
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
                    className="w-full h-[310px] p-5"
                  >
                    <div className={`w-full h-full rounded-xl flex ${isDarkTheme ? "bg-black/40" : "bg-gray-50/80"}`}>
                      {megaMenuItems.map((category, idx) => (
                        <div key={idx} className="relative flex-1 h-full flex flex-col">
                          {category.items.map((item, itemIdx) => (
                            <div key={itemIdx} className="flex-1 p-[10px_15px]">
                              <Link
                                href={item.href}
                                onClick={() => setMenuOpen(false)}
                                className={`text-xs hover:text-[#ff0a0a] transition-colors ${
                                  isDarkTheme ? "text-white" : "text-gray-800"
                                }`}
                              >
                                {item.label}
                                {item.badge ? (
                                  <span className="ml-1.5 px-1 py-0.5 text-[9px] font-medium bg-[#ff0a0a] text-white rounded">
                                    {item.badge}
                                  </span>
                                ) : null}
                              </Link>
                            </div>
                          ))}

                          {idx > 0 && (
                            <div
                              className={`absolute top-[30px] left-0 w-[1px] h-[85%] border-l border-dashed ${
                                isDarkTheme ? "border-white/25" : "border-gray-300"
                              }`}
                            ></div>
                          )}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile Bottom Navigation */}
            <div className="absolute bottom-0 w-full h-[54px]">
              <div className="w-full h-full p-2">
                <div className="relative w-full h-full flex justify-between">
                  {/* Left side buttons */}
                  <div className="flex" style={{ width: "180px" }}>
                    {/* More Button */}
                    <motion.div
                      className={`h-full flex items-center justify-center cursor-pointer rounded-sm ${
                        isDarkTheme ? "bg-black/60 hover:bg-black/70" : "bg-gray-100 hover:bg-gray-200"
                      }`}
                      style={{ width: menuOpen ? "185px" : "88px" }}
                      animate={{
                        width: menuOpen ? 180 : 88,
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
                            <X size={16} className={isDarkTheme ? "text-white" : "text-gray-700"} />
                          ) : (
                            <List size={16} className={isDarkTheme ? "text-white" : "text-gray-700"} />
                          )}
                        </motion.div>
                        <p
                          className={
                            isDarkTheme ? "text-gray-300 text-xs font-medium" : "text-gray-600 text-xs font-medium"
                          }
                        >
                          More
                        </p>
                      </div>
                    </motion.div>

                    {/* Home Button */}
                    <motion.div
                      className={`h-full flex justify-center mr-2 items-center rounded-sm overflow-hidden ${
                        isDarkTheme
                          ? "bg-black/40 border border-white/15 hover:border-white/40"
                          : "bg-gray-100 border border-gray-200 hover:border-gray-300"
                      }`}
                      style={{ width: "88px" }}
                      animate={{
                        opacity: menuOpen ? 0 : 1,
                        width: menuOpen ? 0 : 88,
                        marginLeft: menuOpen ? 0 : 8,
                      }}
                      transition={animations.tween}
                      onClick={(e) => e.stopPropagation()}
                    >
                      {!menuOpen && (
                        <Link
                          href="/"
                          className={`text-xs font-medium transition-colors duration-300 whitespace-nowrap ${
                            isDarkTheme ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-gray-900"
                          }`}
                        >
                          Home
                        </Link>
                      )}
                    </motion.div>
                  </div>

                  {/* Right side buttons */}
                  <div className="flex space-x-2" style={{ width: "128px" }}>
                    {/* Sign In Button */}
                    <div
                      className={`h-full flex justify-center items-center rounded-sm transition-colors duration-300 bg-[#ff0a0a]/80 border border-transparent hover:bg-[#ff0a0a]`}
                      style={{ width: "88px" }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Link
                        href="/sign-in"
                        className="w-full h-full flex items-center justify-center text-xs font-medium text-white hover:text-white transition-colors whitespace-nowrap duration-300 gap-1"
                      >
                        Sign In
                        <ArrowRight size={12} className="ml-0.5" />
                      </Link>
                    </div>

                    {/* Mode Toggle */}
                    <div
                      className={`h-full flex justify-center mr-1 items-center rounded-sm ${
                        isDarkTheme ? "bg-black/40" : "bg-gray-100"
                      }`}
                      style={{ width: "36px" }}
                      onClick={handleModeToggleClick}
                    >
                      <ModeToggle />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </>
  )
}
