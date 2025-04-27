"use client"

import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import {
  Check,
  ChevronRight,
  Plus,
  Star,
  ArrowRight,
  ExternalLink,
  Calendar,
  ThumbsUp,
  Clock,
  Sparkles,
  Zap,
} from "lucide-react"
import { useState, useRef, useEffect } from "react"

// Animation variants
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
}

export default function RoadmapPage() {
  const [activeQuarter, setActiveQuarter] = useState<string | null>(null)
  const [hoveredFeature, setHoveredFeature] = useState<string | null>(null)
  const [scrollY, setScrollY] = useState(0)
  const [windowSize, setWindowSize] = useState({ width: 1200, height: 800 })
  const timelineRef = useRef<HTMLDivElement>(null)

  // Handle scroll for parallax effects and initialize window size
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    // Initialize window size
    handleResize()

    window.addEventListener("scroll", handleScroll)
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  const roadmapItems = [
    {
      quarter: "Q3 2023",
      status: "Completed",
      description: "Foundation and core features launch phase with focus on performance and usability.",
      features: [
        {
          name: "AI Assist Beta Launch",
          description: "Intelligent assistance for common tasks with machine learning capabilities.",
          icon: "sparkles",
          votes: 156,
        },
        {
          name: "Figma Plugin v2.0",
          description: "Seamless design-to-code workflow with enhanced component mapping.",
          icon: "design",
          votes: 98,
        },
        {
          name: "Mobile App Redesign",
          description: "Complete overhaul of the mobile experience with offline capabilities.",
          icon: "mobile",
          votes: 124,
        },
        {
          name: "Dark Mode 2.0",
          description: "Enhanced dark mode with customizable accent colors and better contrast.",
          icon: "moon",
          votes: 87,
        },
        {
          name: "Performance Optimizations",
          description: "50% faster load times and reduced memory usage across all platforms.",
          icon: "zap",
          votes: 142,
        },
      ],
      progress: 100,
      color: "from-green-500 to-emerald-600",
      textColor: "text-green-500",
      borderColor: "border-green-500/20",
      shadowColor: "shadow-green-500/10",
      icon: <Check className="w-4 h-4" />,
    },
    {
      quarter: "Q4 2023",
      status: "In Progress",
      description: "Expanding platform capabilities with focus on team collaboration and analytics.",
      features: [
        {
          name: "Advanced Analytics Dashboard",
          description: "Comprehensive insights with customizable reports and data visualization.",
          icon: "chart",
          votes: 178,
        },
        {
          name: "Custom Workspace Templates",
          description: "Create and share workspace configurations for different project types.",
          icon: "layout",
          votes: 132,
        },
        {
          name: "Offline Mode",
          description: "Full functionality without internet connection with smart sync capabilities.",
          icon: "cloud-off",
          votes: 165,
        },
        {
          name: "Real-time Collaboration API",
          description: "Developer tools for building real-time collaborative applications.",
          icon: "users",
          votes: 94,
        },
        {
          name: "Enhanced Security Suite",
          description: "Enterprise-grade security features with granular access controls.",
          icon: "shield",
          votes: 112,
        },
      ],
      progress: 65,
      color: "from-amber-500 to-orange-600",
      textColor: "text-amber-500",
      borderColor: "border-amber-500/20",
      shadowColor: "shadow-amber-500/10",
      icon: <div className="w-4 h-4 rounded-full bg-amber-500 animate-pulse" />,
    },
    {
      quarter: "Q1 2024",
      status: "Planned",
      description: "Innovation phase focusing on cutting-edge features and enterprise capabilities.",
      features: [
        {
          name: "White-labeling Options",
          description: "Fully customizable branding options for enterprise customers.",
          icon: "palette",
          votes: 89,
        },
        {
          name: "AI-powered Search",
          description: "Natural language search with semantic understanding and context awareness.",
          icon: "search",
          votes: 203,
        },
        {
          name: "Zapier Integration",
          description: "Connect with thousands of apps through the Zapier automation platform.",
          icon: "link",
          votes: 147,
        },
        {
          name: "3D File Support",
          description: "View and manipulate 3D models directly within the platform.",
          icon: "cube",
          votes: 76,
        },
        {
          name: "Voice Commands",
          description: "Control the application using natural voice instructions and dictation.",
          icon: "mic",
          votes: 118,
        },
      ],
      progress: 0,
      color: "from-blue-500 to-indigo-600",
      textColor: "text-blue-500",
      borderColor: "border-blue-500/20",
      shadowColor: "shadow-blue-500/10",
      icon: <Plus className="w-4 h-4" />,
    },
    {
      quarter: "Q2 2024",
      status: "Future",
      description: "Expanding ecosystem and advanced enterprise capabilities.",
      features: [
        {
          name: "Advanced AI Workflows",
          description: "Create complex automation workflows powered by artificial intelligence.",
          icon: "brain",
          votes: 167,
        },
        {
          name: "Global CDN Infrastructure",
          description: "Ultra-fast content delivery with edge computing capabilities.",
          icon: "globe",
          votes: 92,
        },
        {
          name: "AR/VR Visualization",
          description: "Augmented and virtual reality support for immersive data visualization.",
          icon: "vr",
          votes: 134,
        },
        {
          name: "Enterprise SSO",
          description: "Single sign-on integration with major identity providers.",
          icon: "lock",
          votes: 156,
        },
        {
          name: "Advanced Analytics API",
          description: "Programmatic access to analytics data with custom query capabilities.",
          icon: "api",
          votes: 108,
        },
      ],
      progress: 0,
      color: "from-purple-500 to-pink-600",
      textColor: "text-purple-500",
      borderColor: "border-purple-500/20",
      shadowColor: "shadow-purple-500/10",
      icon: <Clock className="w-4 h-4" />,
    },
  ]

  const stats = [
    { value: "85%", label: "Features delivered on time", icon: <Clock className="w-5 h-5 text-blue-400" /> },
    { value: "24", label: "Features shipped this year", icon: <Zap className="w-5 h-5 text-amber-400" /> },
    { value: "5k+", label: "Community votes", icon: <ThumbsUp className="w-5 h-5 text-green-400" /> },
    { value: "98%", label: "Customer satisfaction", icon: <Sparkles className="w-5 h-5 text-purple-400" /> },
  ]

  // Feature icon mapping
  const getFeatureIcon = (iconName: string) => {
    switch (iconName) {
      case "sparkles":
        return <div className="text-yellow-400">✨</div>
      case "design":
        return <div className="text-purple-400">🎨</div>
      case "mobile":
        return <div className="text-blue-400">📱</div>
      case "moon":
        return <div className="text-indigo-400">🌙</div>
      case "zap":
        return <div className="text-amber-400">⚡</div>
      case "chart":
        return <div className="text-green-400">📊</div>
      case "layout":
        return <div className="text-pink-400">🔳</div>
      case "cloud-off":
        return <div className="text-gray-400">☁️</div>
      case "users":
        return <div className="text-cyan-400">👥</div>
      case "shield":
        return <div className="text-red-400">🛡️</div>
      case "palette":
        return <div className="text-rose-400">🎭</div>
      case "search":
        return <div className="text-amber-400">🔍</div>
      case "link":
        return <div className="text-blue-400">🔗</div>
      case "cube":
        return <div className="text-purple-400">📦</div>
      case "mic":
        return <div className="text-red-400">🎤</div>
      case "brain":
        return <div className="text-violet-400">🧠</div>
      case "globe":
        return <div className="text-blue-400">🌐</div>
      case "vr":
        return <div className="text-indigo-400">👓</div>
      case "lock":
        return <div className="text-gray-400">🔒</div>
      case "api":
        return <div className="text-green-400">🔌</div>
      default:
        return <Star className="w-4 h-4" />
    }
  }

  // Popular feature requests
  const popularRequests = [
    { name: "AI-powered content generation", votes: 342, category: "AI" },
    { name: "Advanced data visualization", votes: 287, category: "Analytics" },
    { name: "Custom branding options", votes: 256, category: "Enterprise" },
    { name: "Offline collaboration mode", votes: 231, category: "Collaboration" },
    { name: "Native mobile applications", votes: 198, category: "Mobile" },
  ]

  return (
    <motion.main
      initial="hidden"
      animate="show"
      variants={container}
      className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white dark:from-black dark:via-gray-900 dark:to-black pt-32 overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none opacity-30">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/10 via-transparent to-transparent dark:from-purple-900/20 dark:via-transparent dark:to-transparent opacity-40"></div>

        {/* Animated orbs */}
        <motion.div
          className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-screen filter blur-[120px] opacity-10"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
        <motion.div
          className="absolute bottom-1/3 left-1/3 w-96 h-96 bg-red-500 rounded-full mix-blend-screen filter blur-[120px] opacity-10"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.18, 0.1],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            delay: 2,
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-96 h-96 bg-yellow-500 rounded-full mix-blend-screen filter blur-[120px] opacity-5"
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{
            duration: 12,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            delay: 4,
          }}
        />

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMDIwMjAiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djZoNnYtNmgtNnptNiA2djZoNnYtNmgtNnptLTEyIDBoNnY2aC02di02em0xMiAwaDZ2NmgtNnYtNnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20"></div>

        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gray-500 dark:bg-white"
            initial={{
              x: Math.random() * windowSize.width,
              y: Math.random() * windowSize.height,
              scale: Math.random() * 0.5 + 0.5,
              opacity: Math.random() * 0.3 + 0.1,
            }}
            animate={{
              y: [null, Math.random() * -100 - 50],
              opacity: [null, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 5,
            }}
            style={{
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <section className="relative py-20 px-4 sm:px-6 max-w-7xl mx-auto z-10">
        {/* Hero Section */}
        <motion.div variants={item} className="text-center mb-24 relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute -top-24 left-1/2 -translate-x-1/2 w-64 h-64 bg-gradient-to-br from-red-500/10 to-purple-500/10 rounded-full filter blur-3xl opacity-50"
          />

          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-6 inline-flex items-center px-4 py-1.5 rounded-full border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-white/5 backdrop-blur-sm text-sm text-gray-600 dark:text-gray-300"
          >
            <span className="inline-block w-2 h-2 rounded-full bg-red-500 mr-2 animate-pulse" />
            Updated for 2024
          </motion.div>

          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6 tracking-tight"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#ff0a0a] to-[#ff6b6b]">
              Product
            </span>{" "}
            <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600 dark:from-[#fefefe] dark:to-[#a0a0a0]">
              Roadmap
            </span>
          </motion.h1>

          <motion.p
            className="text-gray-600 dark:text-gray-300 text-lg md:text-xl mb-10 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            See what we&apos;re building next and vote on upcoming features. We&apos;re committed to transparency in our
            development process and value your input.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <Button
              size="lg"
              className="relative overflow-hidden group bg-gradient-to-r from-[#ff0a0a] to-[#ff6b6b] hover:shadow-lg hover:shadow-red-500/20 transition-all duration-300 border-0 h-auto py-6 px-8 text-lg"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transform group-hover:translate-x-full transition-all duration-1000 ease-out" />
              <span className="relative z-10 flex items-center gap-2 font-medium">
                Feature Voting <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </span>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white hover:text-gray-900 dark:hover:text-white hover:border-gray-400 dark:hover:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-900/50 transition-all duration-300 backdrop-blur-sm h-auto py-6 px-8 text-lg"
            >
              Release Notes
            </Button>
          </motion.div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          className="relative mb-32 z-10"
          variants={item}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-gray-100/50 via-gray-200/50 to-gray-100/50 dark:from-gray-900/50 dark:via-gray-800/50 dark:to-gray-900/50 rounded-2xl transform -skew-y-1 scale-105 -z-10 blur-sm" />
          <div className="bg-white/40 dark:bg-gray-900/40 backdrop-blur-md rounded-2xl p-10 border border-gray-200 dark:border-gray-800 grid grid-cols-2 md:grid-cols-4 gap-8 relative overflow-hidden shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-blue-500/5 opacity-50" />

            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center relative z-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-blue-500/5 rounded-lg opacity-0"
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
                <div className="flex justify-center mb-3">
                  <div className="w-12 h-12 rounded-full bg-gray-100/80 dark:bg-gray-800/80 border border-gray-200/50 dark:border-gray-700/50 flex items-center justify-center">
                    {stat.icon}
                  </div>
                </div>
                <motion.p
                  className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 mb-3"
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                  }}
                >
                  {stat.value}
                </motion.p>
                <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Timeline Navigation */}
        <motion.div
          className="flex justify-center mb-16 relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="inline-flex bg-gray-100/70 dark:bg-gray-900/70 backdrop-blur-md rounded-full p-1.5 border border-gray-200 dark:border-gray-800 shadow-xl">
            {roadmapItems.map((item, index) => (
              <button
                key={item.quarter}
                onClick={() => setActiveQuarter(activeQuarter === item.quarter ? null : item.quarter)}
                className={`relative px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeQuarter === item.quarter
                    ? "text-white"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                {activeQuarter === item.quarter && (
                  <motion.div
                    layoutId="activeQuarter"
                    className={`absolute inset-0 rounded-full bg-gradient-to-r ${item.color} opacity-90`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
                <span className="relative flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {item.quarter}
                </span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Roadmap Timeline */}
        <motion.div className="mb-32 relative z-10" variants={container} ref={timelineRef}>
          <div className="relative">
            {/* Center line - visible on medium screens and up */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-gray-300/50 via-gray-200/50 to-gray-300/50 dark:from-gray-800/50 dark:via-gray-700/50 dark:to-gray-800/50 transform -translate-x-1/2" />

            {/* Timeline items */}
            <div className="space-y-32">
              {roadmapItems.map((item, index) => (
                <motion.div
                  key={item.quarter}
                  className={`relative ${
                    activeQuarter && activeQuarter !== item.quarter ? "opacity-50" : "opacity-100"
                  }`}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{
                    opacity: activeQuarter && activeQuarter !== item.quarter ? 0.5 : 1,
                    y: 0,
                  }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  {/* Quarter label - centered for all screens */}
                  <div className="flex justify-center mb-12">
                    <motion.div
                      className={`inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r ${item.color} bg-opacity-10 backdrop-blur-md border border-gray-200/10 dark:border-white/10 shadow-lg ${item.shadowColor}`}
                      whileHover={{ y: -3 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className={`w-3 h-3 rounded-full ${item.color.replace("from-", "bg-")}`} />
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">{item.quarter}</h3>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium bg-white/30 dark:bg-black/30 backdrop-blur-md ${item.textColor}`}
                      >
                        {item.status}
                      </span>
                    </motion.div>
                  </div>

                  {/* Timeline dot - desktop */}
                  <div className="hidden md:block absolute left-1/2 top-24 w-8 h-8 rounded-full transform -translate-x-1/2 z-10 border-4 border-white dark:border-gray-900 shadow-lg">
                    <motion.div
                      className={`w-full h-full rounded-full bg-gradient-to-r ${item.color} flex items-center justify-center`}
                      animate={
                        item.status === "In Progress"
                          ? {
                              scale: [1, 1.1, 1],
                              boxShadow: [
                                "0 0 0 0 rgba(255, 255, 255, 0.1)",
                                "0 0 0 10px rgba(255, 255, 255, 0)",
                                "0 0 0 0 rgba(255, 255, 255, 0)",
                              ],
                            }
                          : {}
                      }
                      transition={
                        item.status === "In Progress"
                          ? {
                              duration: 2,
                              repeat: Number.POSITIVE_INFINITY,
                              repeatType: "loop",
                            }
                          : {}
                      }
                    >
                      {item.icon}
                    </motion.div>
                  </div>

                  {/* Description - centered for all screens */}
                  <div className="text-center mb-12 max-w-2xl mx-auto">
                    <p className="text-gray-600 dark:text-gray-300 text-lg">{item.description}</p>
                  </div>

                  {/* Progress bar */}
                  {item.status !== "Planned" && item.status !== "Future" && (
                    <div className="max-w-2xl mx-auto mb-12">
                      <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300 mb-2">
                        <span>Progress</span>
                        <span>{item.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-full h-3 overflow-hidden border border-gray-300/50 dark:border-gray-700/50">
                        <motion.div
                          className={`h-3 rounded-full bg-gradient-to-r ${item.color}`}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${item.progress}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: index * 0.2 }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Content container */}
                  <div className={`md:flex ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} items-start`}>
                    {/* Empty space for alignment on desktop */}
                    <div className="hidden md:block md:w-1/2" />

                    {/* Content */}
                    <div className={`md:w-1/2 ${index % 2 === 0 ? "md:pl-16" : "md:pr-16"}`}>
                      <div className="grid md:grid-cols-2 gap-6">
                        {item.features.map((feature, featureIndex) => (
                          <motion.div
                            key={feature.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{
                              duration: 0.5,
                              delay: 0.1 * featureIndex,
                            }}
                            whileHover={{ y: -3, boxShadow: "0 10px 30px -10px rgba(0, 0, 0, 0.3)" }}
                            whileTap={{ scale: 0.98 }}
                            onHoverStart={() => setHoveredFeature(feature.name)}
                            onHoverEnd={() => setHoveredFeature(null)}
                            className={`group relative overflow-hidden bg-gradient-to-br from-white/80 to-gray-100/80 dark:from-gray-900/80 dark:to-gray-800/80 backdrop-blur-md p-6 rounded-xl border ${item.borderColor} hover:shadow-xl transition-all duration-300 ${item.shadowColor}`}
                          >
                            {/* Glow effect on hover */}
                            <AnimatePresence>
                              {hoveredFeature === feature.name && (
                                <motion.div
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  exit={{ opacity: 0 }}
                                  className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-10`}
                                  transition={{ duration: 0.3 }}
                                />
                              )}
                            </AnimatePresence>

                            {/* Feature content */}
                            <div className="relative z-10">
                              <div className="flex items-start gap-4 mb-3">
                                <div className="mt-1 w-8 h-8 rounded-lg flex-shrink-0 bg-gray-100/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 flex items-center justify-center">
                                  {getFeatureIcon(feature.icon)}
                                </div>
                                <div>
                                  <h3 className="font-medium text-lg mb-2 text-gray-900 dark:text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-gray-900 group-hover:to-gray-600 dark:group-hover:from-white dark:group-hover:to-gray-300 transition-all duration-300">
                                    {feature.name}
                                  </h3>
                                  <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2 min-h-[40px] transition-all duration-300">
                                    {feature.description}
                                  </p>
                                </div>
                              </div>

                              {item.status === "Planned" && (
                                <div className="mt-4 flex justify-between items-center">
                                  <div className="flex items-center gap-2">
                                    <Star className="w-4 h-4 text-amber-400" />
                                    <span className="text-xs text-gray-600 dark:text-gray-300">
                                      {feature.votes} votes
                                    </span>
                                  </div>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="bg-transparent border-gray-300 dark:border-gray-700 hover:border-blue-500/50 hover:text-blue-400 transition-colors text-xs"
                                  >
                                    + Vote
                                  </Button>
                                </div>
                              )}

                              {item.status === "Future" && (
                                <div className="mt-4 flex justify-between items-center">
                                  <div className="flex items-center gap-2">
                                    <Star className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                                    <span className="text-xs text-gray-500 dark:text-gray-400">
                                      {feature.votes} votes
                                    </span>
                                  </div>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="bg-transparent border-gray-300 dark:border-gray-700 hover:border-purple-500/50 hover:text-purple-400 transition-colors text-xs"
                                  >
                                    + Vote
                                  </Button>
                                </div>
                              )}

                              {item.status === "Completed" && (
                                <div className="mt-4 flex items-center gap-2">
                                  <div className="w-2 h-2 rounded-full bg-green-500" />
                                  <span className="text-xs text-green-500 flex items-center">
                                    Shipped in {item.quarter}
                                  </span>
                                </div>
                              )}

                              {item.status === "In Progress" && (
                                <div className="mt-4 flex items-center gap-2">
                                  <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                                  <span className="text-xs text-amber-500 flex items-center">In development</span>
                                </div>
                              )}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Popular Feature Requests */}
        <motion.div
          className="relative mb-32 z-10"
          variants={item}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-16">
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-6 tracking-tight text-gray-900 dark:text-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400">
                Most Popular Feature Requests
              </span>
            </motion.h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              These are the top-voted features from our community. Vote for your favorites to help us prioritize what to
              build next.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {popularRequests.map((request, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -3, boxShadow: "0 10px 30px -10px rgba(0, 0, 0, 0.3)" }}
                className="bg-white/40 dark:bg-gray-900/40 backdrop-blur-md rounded-xl border border-gray-200/50 dark:border-gray-800/50 p-6 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">{request.name}</h3>
                    <span className="inline-block px-3 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
                      {request.category}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 bg-gray-100/70 dark:bg-gray-800/70 px-3 py-1 rounded-full">
                    <ThumbsUp className="w-3.5 h-3.5 text-amber-400" />
                    <span className="text-sm font-medium text-amber-400">{request.votes}</span>
                  </div>
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <div className="flex -space-x-2">
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-800 bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-xs text-gray-700 dark:text-white"
                      >
                        {String.fromCharCode(65 + i)}
                      </div>
                    ))}
                    <div className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-800 bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-xs text-gray-700 dark:text-white">
                      +{Math.floor(request.votes / 100)}
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-transparent border-gray-300 dark:border-gray-700 hover:border-amber-500/50 hover:text-amber-400 transition-colors"
                  >
                    Vote
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Feature Request Section */}
        <motion.div
          className="relative mb-24 z-10 overflow-hidden"
          variants={item}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#6a11cb] to-[#2575fc] opacity-90 -z-10 rounded-xl" />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djZoNnYtNmgtNnptNiA2djZoNnYtNmgtNnptLTEyIDBoNnY2aC02di02em0xMiAwaDZ2NmgtNnYtNnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20 -z-10 rounded-xl" />

          <div className="relative rounded-2xl p-12 md:p-16 overflow-hidden">
            <div className="absolute top-0 right-0 -mt-16 -mr-16 w-64 h-64 bg-white/10 rounded-full filter blur-3xl opacity-70" />

            <div className="max-w-4xl mx-auto">
              <motion.h2
                className="text-3xl md:text-4xl font-bold mb-6 text-white text-center"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                Have a feature request?
              </motion.h2>

              <motion.p
                className="text-blue-100 mb-10 max-w-2xl mx-auto text-center text-lg"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                We prioritize features based on community feedback. Share your ideas with us and help shape the future
                of our product.
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                <input
                  type="text"
                  placeholder="Your feature idea..."
                  className="flex-grow px-6 py-4 rounded-xl bg-white/10 text-white placeholder-blue-200/70 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all shadow-lg"
                />
                <Button
                  size="lg"
                  className="bg-white text-[#2575fc] hover:bg-blue-50 hover:scale-105 transition-all duration-300 flex items-center gap-2 px-8 py-6 rounded-xl font-medium shadow-lg h-auto"
                >
                  Submit <ArrowRight className="w-4 h-4" />
                </Button>
              </motion.div>

              <div className="mt-10 flex flex-wrap justify-center gap-3">
                <span className="text-xs bg-white/10 px-3 py-1.5 rounded-full text-blue-100">#AI-features</span>
                <span className="text-xs bg-white/10 px-3 py-1.5 rounded-full text-blue-100">#mobile-app</span>
                <span className="text-xs bg-white/10 px-3 py-1.5 rounded-full text-blue-100">#integrations</span>
                <span className="text-xs bg-white/10 px-3 py-1.5 rounded-full text-blue-100">#performance</span>
                <span className="text-xs bg-white/10 px-3 py-1.5 rounded-full text-blue-100">#ui-improvements</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Changelog CTA */}
        <motion.div
          className="relative z-10"
          variants={item}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-md rounded-2xl p-10 border border-gray-200 dark:border-gray-800 overflow-hidden shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-r from-gray-100/50 via-gray-200/50 to-gray-100/50 dark:from-gray-900/50 dark:via-gray-800/50 dark:to-gray-900/50 -z-10" />

            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">Want to see what&apos;s new?</h3>
                <p className="text-gray-600 dark:text-gray-300 text-lg">
                  Check out our detailed release notes and changelog to stay up-to-date with all the latest features and
                  improvements.
                </p>
              </div>
              <Button
                variant="outline"
                size="lg"
                className="border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-all duration-300 backdrop-blur-sm flex items-center gap-2 px-8 h-auto py-6"
              >
                View Changelog <ExternalLink className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </motion.div>
      </section>
    </motion.main>
  )
}
