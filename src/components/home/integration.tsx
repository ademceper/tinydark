"use client"
import { useState, useRef, useEffect } from "react"
import { motion, useAnimation, AnimatePresence } from "framer-motion"
import {
  Search,
  ArrowRight,
  Zap,
  Lock,
  BarChart,
  Clock,
  Settings,
  Code,
  Plus,
  ExternalLink,
  MessageSquare,
  FileText,
  Layers,
  Star,
  Check,
  Shield,
  Globe,
  Sparkles,
  Cpu,
  Database,
} from "lucide-react"
import { FaSlack, FaFigma, FaGoogle, FaDropbox, FaMicrosoft, FaShopify } from "react-icons/fa"
import {
  SiNotion,
  SiJira,
  SiMiro,
  SiCanva,
  SiGithub,
  SiAdobecreativecloud,
  SiTrello,
  SiAsana,
  SiZapier,
  SiZoom,
} from "react-icons/si"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useInView } from "react-intersection-observer"

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

export default function IntegrationsPage() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [hoveredIntegration, setHoveredIntegration] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("popular")
  const [activeShowcase, setActiveShowcase] = useState(0)
  const [scrollY, setScrollY] = useState(0)
  const featuredRef = useRef(null)
  const controls = useAnimation()
  const [ref, inView] = useInView({ threshold: 0.1 })
  const [windowSize, setWindowSize] = useState({ width: 1200, height: 800 });

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Initialize window size
    handleResize();

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  // Auto-rotate showcase
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveShowcase((prev) => (prev + 1) % showcaseExamples.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const categories = [
    { id: "all", name: "All Integrations" },
    { id: "productivity", name: "Productivity" },
    { id: "design", name: "Design" },
    { id: "development", name: "Development" },
    { id: "communication", name: "Communication" },
    { id: "analytics", name: "Analytics" },
    { id: "security", name: "Security" },
  ]

  const tabs = [
    { id: "popular", name: "Popular" },
    { id: "new", name: "New & Trending" },
    { id: "enterprise", name: "Enterprise" },
    { id: "recommended", name: "Recommended for You" },
  ]

  const popularIntegrations = [
    {
      icon: <SiNotion className="w-8 h-8" />,
      name: "Notion",
      category: "productivity",
      description: "Connect your Notion workspace for seamless document sharing and collaboration.",
      popular: true,
      color: "bg-white text-black",
      users: "2M+",
      rating: 4.9,
    },
    {
      icon: <SiJira className="w-8 h-8" />,
      name: "Jira",
      category: "development",
      description: "Sync tasks and issues between Orbit Suite and Jira for streamlined project management.",
      popular: true,
      color: "bg-blue-500",
      users: "1.5M+",
      rating: 4.7,
    },
    {
      icon: <SiMiro className="w-8 h-8" />,
      name: "Miro",
      category: "design",
      description: "Import Miro boards directly into your projects for visual collaboration.",
      popular: false,
      color: "bg-yellow-400 text-black",
      users: "800K+",
      rating: 4.8,
    },
    {
      icon: <SiCanva className="w-8 h-8" />,
      name: "Canva",
      category: "design",
      description: "Access your Canva designs and templates without leaving Orbit Suite.",
      popular: false,
      color: "bg-purple-600",
      users: "1.2M+",
      rating: 4.6,
    },
    {
      icon: <FaSlack className="w-8 h-8" />,
      name: "Slack",
      category: "communication",
      description: "Get notifications and updates directly in your Slack channels.",
      popular: true,
      color: "bg-green-500",
      users: "3M+",
      rating: 4.9,
    },
    {
      icon: <FaFigma className="w-8 h-8" />,
      name: "Figma",
      category: "design",
      description: "Import designs from Figma and keep them in sync with your development workflow.",
      popular: true,
      color: "bg-black border border-white",
      users: "1.8M+",
      rating: 4.8,
    },
    {
      icon: <FaGoogle className="w-8 h-8" />,
      name: "Google Workspace",
      category: "productivity",
      description: "Integrate with Google Docs, Sheets, and Drive for seamless file management.",
      popular: true,
      color: "bg-white text-black",
      users: "5M+",
      rating: 4.9,
    },
    {
      icon: <SiGithub className="w-8 h-8" />,
      name: "GitHub",
      category: "development",
      description: "Connect your repositories for code integration and automated workflows.",
      popular: true,
      color: "bg-gray-900",
      users: "2.5M+",
      rating: 4.8,
    },
    {
      icon: <SiAdobecreativecloud className="w-8 h-8" />,
      name: "Adobe CC",
      category: "design",
      description: "Import assets from Adobe Creative Cloud applications.",
      popular: false,
      color: "bg-red-600",
      users: "900K+",
      rating: 4.7,
    },
    {
      icon: <SiTrello className="w-8 h-8" />,
      name: "Trello",
      category: "productivity",
      description: "Sync your Trello boards with Orbit Suite for unified project tracking.",
      popular: false,
      color: "bg-blue-400",
      users: "1.3M+",
      rating: 4.6,
    },
    {
      icon: <SiAsana className="w-8 h-8" />,
      name: "Asana",
      category: "productivity",
      description: "Connect your Asana projects and tasks with Orbit Suite.",
      popular: true,
      color: "bg-orange-500",
      users: "1.1M+",
      rating: 4.7,
    },
    {
      icon: <SiZapier className="w-8 h-8" />,
      name: "Zapier",
      category: "productivity",
      description: "Automate workflows between Orbit Suite and thousands of other apps.",
      popular: true,
      color: "bg-orange-600",
      users: "1.7M+",
      rating: 4.8,
    },
    {
      icon: <FaDropbox className="w-8 h-8" />,
      name: "Dropbox",
      category: "productivity",
      description: "Sync your Dropbox files with Orbit Suite for easy access.",
      popular: false,
      color: "bg-blue-600",
      users: "1.4M+",
      rating: 4.6,
    },
    {
      icon: <FaMicrosoft className="w-8 h-8" />,
      name: "Microsoft 365",
      category: "productivity",
      description: "Connect with Microsoft 365 apps for seamless document collaboration.",
      popular: true,
      color: "bg-blue-700",
      users: "4M+",
      rating: 4.7,
    },
    {
      icon: <FaShopify className="w-8 h-8" />,
      name: "Shopify",
      category: "analytics",
      description: "Connect your Shopify store for e-commerce analytics and management.",
      popular: false,
      color: "bg-green-600",
      users: "600K+",
      rating: 4.5,
    },
    {
      icon: <SiZoom className="w-8 h-8" />,
      name: "Zoom",
      category: "communication",
      description: "Schedule and join Zoom meetings directly from Orbit Suite.",
      popular: false,
      color: "bg-blue-500",
      users: "2.2M+",
      rating: 4.7,
    },
  ]

  const featuredIntegrations = [
    {
      name: "Notion + Orbit",
      description:
        "Connect your Notion workspace to automatically sync documents, databases, and project information with Orbit Suite.",
      icon: <SiNotion className="w-10 h-10" />,
      features: [
        "Two-way sync between Notion and Orbit",
        "Automatic document updates",
        "Link Notion databases to Orbit projects",
        "Share Notion pages directly in Orbit",
      ],
      image: "/placeholder.svg?height=600&width=800",
      color: "from-gray-500 to-gray-700",
      setupTime: "5 min",
      users: "2M+",
      rating: 4.9,
    },
    {
      name: "Slack + Orbit",
      description:
        "Receive notifications, updates, and alerts from Orbit Suite directly in your team's Slack channels.",
      icon: <FaSlack className="w-10 h-10" />,
      features: [
        "Customizable notifications",
        "Command-line interface within Slack",
        "Share Orbit content in Slack",
        "User activity and status updates",
      ],
      image: "/placeholder.svg?height=600&width=800",
      color: "from-green-500 to-green-700",
      setupTime: "3 min",
      users: "3M+",
      rating: 4.9,
    },
    {
      name: "GitHub + Orbit",
      description:
        "Connect your GitHub repositories to Orbit Suite for seamless code integration and project management.",
      icon: <SiGithub className="w-10 h-10" />,
      features: [
        "Automatic PR and issue tracking",
        "Code review integration",
        "Commit history visualization",
        "Deployment status updates",
      ],
      image: "/placeholder.svg?height=600&width=800",
      color: "from-gray-700 to-gray-900",
      setupTime: "4 min",
      users: "2.5M+",
      rating: 4.8,
    },
    {
      name: "Figma + Orbit",
      description:
        "Bring your Figma designs directly into Orbit Suite and keep them in sync with your development workflow.",
      icon: <FaFigma className="w-10 h-10" />,
      features: [
        "Live design previews",
        "Comment syncing between platforms",
        "Design handoff tools",
        "Automatic asset extraction",
      ],
      image: "/placeholder.svg?height=600&width=800",
      color: "from-purple-500 to-purple-700",
      setupTime: "2 min",
      users: "1.8M+",
      rating: 4.8,
    },
  ]

  const integrationCategories = [
    {
      name: "Productivity",
      count: 24,
      examples: ["Notion", "Asana", "Todoist"],
      icon: <Clock className="w-5 h-5" />,
      color: "from-green-500 to-emerald-600",
      textColor: "text-green-500",
      borderColor: "border-green-500/20",
      shadowColor: "shadow-green-500/10",
    },
    {
      name: "Design",
      count: 18,
      examples: ["Figma", "Adobe CC", "Canva"],
      icon: <Layers className="w-5 h-5" />,
      color: "from-purple-500 to-indigo-600",
      textColor: "text-purple-500",
      borderColor: "border-purple-500/20",
      shadowColor: "shadow-purple-500/10",
    },
    {
      name: "Development",
      count: 32,
      examples: ["GitHub", "GitLab", "Jira"],
      icon: <Code className="w-5 h-5" />,
      color: "from-blue-500 to-cyan-600",
      textColor: "text-blue-500",
      borderColor: "border-blue-500/20",
      shadowColor: "shadow-blue-500/10",
    },
    {
      name: "Communication",
      count: 15,
      examples: ["Slack", "Discord", "Teams"],
      icon: <MessageSquare className="w-5 h-5" />,
      color: "from-yellow-500 to-orange-600",
      textColor: "text-yellow-500",
      borderColor: "border-yellow-500/20",
      shadowColor: "shadow-yellow-500/10",
    },
    {
      name: "Analytics",
      count: 12,
      examples: ["Google Analytics", "Mixpanel", "Amplitude"],
      icon: <BarChart className="w-5 h-5" />,
      color: "from-red-500 to-pink-600",
      textColor: "text-red-500",
      borderColor: "border-red-500/20",
      shadowColor: "shadow-red-500/10",
    },
    {
      name: "Security",
      count: 8,
      examples: ["Okta", "Auth0", "LastPass"],
      icon: <Lock className="w-5 h-5" />,
      color: "from-gray-500 to-gray-600",
      textColor: "text-gray-500",
      borderColor: "border-gray-500/20",
      shadowColor: "shadow-gray-500/10",
    },
  ]

  const testimonials = [
    {
      quote:
        "The Slack integration has transformed how our team communicates about projects. We get real-time updates without ever leaving our main communication channel.",
      author: "Michael Chen",
      role: "Engineering Manager at TechFlow",
      avatar: "/placeholder.svg?height=80&width=80",
      logo: "/placeholder.svg?height=40&width=120",
      rating: 5,
    },
    {
      quote:
        "Being able to connect our Notion workspace with Orbit Suite has eliminated so much duplicate work. Everything stays in sync automatically.",
      author: "Sarah Johnson",
      role: "Product Lead at InnovateCo",
      avatar: "/placeholder.svg?height=80&width=80",
      logo: "/placeholder.svg?height=40&width=120",
      rating: 5,
    },
    {
      quote:
        "The GitHub integration is seamless. Our development and project management workflows are now perfectly aligned, saving us hours every week.",
      author: "Alex Rodriguez",
      role: "CTO at DevStudio",
      avatar: "/placeholder.svg?height=80&width=80",
      logo: "/placeholder.svg?height=40&width=120",
      rating: 5,
    },
  ]

  const showcaseExamples = [
    {
      title: "Slack + Orbit",
      description: "Get real-time notifications and updates in your Slack channels",
      image: "/placeholder.svg?height=600&width=1000",
    },
    {
      title: "Notion + Orbit",
      description: "Sync your Notion workspace with Orbit Suite",
      image: "/placeholder.svg?height=600&width=1000",
    },
    {
      title: "GitHub + Orbit",
      description: "Connect your repositories for seamless code integration",
      image: "/placeholder.svg?height=600&width=1000",
    },
    {
      title: "Figma + Orbit",
      description: "Import designs from Figma and keep them in sync",
      image: "/placeholder.svg?height=600&width=1000",
    },
  ]

  const enterpriseFeatures = [
    {
      name: "SSO Integration",
      icon: <Shield className="w-5 h-5" />,
      description: "Connect with your identity provider for secure single sign-on",
    },
    {
      name: "Custom Workflows",
      icon: <Settings className="w-5 h-5" />,
      description: "Build tailored integration workflows specific to your organization",
    },
    {
      name: "Global Deployment",
      icon: <Globe className="w-5 h-5" />,
      description: "Deploy integrations across your global infrastructure",
    },
    {
      name: "Advanced Security",
      icon: <Lock className="w-5 h-5" />,
      description: "Enterprise-grade security with audit logs and compliance controls",
    },
    {
      name: "AI-Powered Automation",
      icon: <Sparkles className="w-5 h-5" />,
      description: "Intelligent automation for your integration workflows",
    },
    {
      name: "API Access",
      icon: <Cpu className="w-5 h-5" />,
      description: "Full API access for custom integration development",
    },
  ]

  const filteredIntegrations =
    activeCategory === "all"
      ? popularIntegrations
      : popularIntegrations.filter((integration) => integration.category === activeCategory)

  const searchedIntegrations = searchQuery
    ? filteredIntegrations.filter((integration) => integration.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : filteredIntegrations

  return (
    <motion.main
      initial="hidden"
      animate="show"
      variants={container}
      className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white dark:from-black dark:via-gray-900 dark:to-black pt-32 overflow-hidden"
    >
      {/* Background elements */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none opacity-30">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/10 via-transparent to-transparent dark:from-purple-900/20 dark:via-transparent dark:to-transparent opacity-40"></div>
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-screen filter blur-[120px] opacity-10 animate-pulse"></div>
        <div
          className="absolute bottom-1/3 left-1/3 w-96 h-96 bg-red-500 rounded-full mix-blend-screen filter blur-[120px] opacity-10 animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>

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
          ></motion.div>

          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-6 inline-flex items-center px-4 py-1.5 rounded-full border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-white/5 backdrop-blur-sm text-sm text-gray-600 dark:text-gray-300"
          >
            <span className="inline-block w-2 h-2 rounded-full bg-red-500 mr-2 animate-pulse" />
            100+ integrations and growing
          </motion.div>

          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6 tracking-tight"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#ff0a0a] to-[#ff6b6b]">
              Connect
            </span>{" "}
            <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600 dark:from-[#fefefe] dark:to-[#a0a0a0]">
              Your Tools
            </span>
          </motion.h1>

          <motion.p
            className="text-gray-600 dark:text-gray-300 text-lg md:text-xl mb-10 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Orbit Suite integrates with the apps you already use, creating a seamless workflow across your entire stack.
            Connect once and watch your productivity soar.
          </motion.p>

          {/* Search Bar */}
          <motion.div
            className="max-w-2xl mx-auto relative mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-purple-500/20 rounded-xl blur-md opacity-80"></div>

              {/* Main search container */}
              <div className="relative bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-xl border border-gray-200 dark:border-gray-800 transition-colors duration-300 overflow-hidden shadow-xl">
                <div className="flex items-center relative h-14">
                  <Search className="absolute left-4 text-gray-400 dark:text-gray-500 w-5 h-5" />
                  <Input
                    type="text"
                    placeholder="Search integrations..."
                    className="w-full h-full px-12 bg-transparent text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none border-0"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <div className="absolute right-2">
                    <Button className="bg-gradient-to-r from-[#ff0a0a] to-[#ff6b6b] hover:shadow-lg hover:shadow-red-500/20 transition-all duration-300 border-0">
                      Search
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center mt-4 gap-2 text-sm text-gray-500">
              <span>Popular:</span>
              <div className="flex gap-2">
                <button
                  onClick={() => setSearchQuery("Slack")}
                  className="hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  Slack
                </button>
                <span>•</span>
                <button
                  onClick={() => setSearchQuery("Notion")}
                  className="hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  Notion
                </button>
                <span>•</span>
                <button
                  onClick={() => setSearchQuery("GitHub")}
                  className="hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  GitHub
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Integration Showcase */}
        <motion.div
          className="mb-32 relative"
          variants={item}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-50/80 to-white/40 dark:from-gray-900/80 dark:to-black/80 backdrop-blur-sm -z-10"></div>

            {/* Demo header bar */}
            <div className="bg-gray-100/80 dark:bg-gray-900/80 backdrop-blur-sm p-4 border-b border-gray-200 dark:border-gray-800 flex items-center">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="mx-auto text-sm text-gray-600 dark:text-gray-400 font-medium">
                {showcaseExamples[activeShowcase].title}
              </div>
              <div className="w-16"></div> {/* Spacer for balance */}
            </div>

            {/* Demo content */}
            <div className="relative h-[500px] overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeShowcase}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0"
                >
                  <img
                    src={showcaseExamples[activeShowcase].image || "/placeholder.svg"}
                    alt={showcaseExamples[activeShowcase].title}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Navigation dots */}
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
                {showcaseExamples.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveShowcase(index)}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                      activeShowcase === index ? "bg-white w-8" : "bg-white/50"
                    }`}
                  />
                ))}
              </div>

              {/* Caption */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-center">
                <p className="text-white text-lg">{showcaseExamples[activeShowcase].description}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          className="mb-16"
          variants={item}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex justify-center mb-8 overflow-x-auto pb-2 hide-scrollbar">
            <div className="inline-flex bg-gray-100/70 dark:bg-gray-900/70 backdrop-blur-md rounded-full p-1.5 border border-gray-200 dark:border-gray-800 shadow-xl">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`relative px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeCategory === category.id
                      ? "text-white"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  }`}
                >
                  {activeCategory === category.id && (
                    <motion.div
                      layoutId="activeCategory"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-[#ff0a0a] to-[#ff6b6b] opacity-90"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                  <span className="relative z-10">{category.name}</span>
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Integration Tabs */}
        <motion.div
          className="mb-8"
          variants={item}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex justify-center overflow-x-auto pb-2 hide-scrollbar">
            <div className="inline-flex bg-gray-100/70 dark:bg-gray-900/70 backdrop-blur-md rounded-full p-1.5 border border-gray-200 dark:border-gray-800 shadow-xl">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeTab === tab.id
                      ? "text-white"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  }`}
                >
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-90"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                  <span className="relative z-10">{tab.name}</span>
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Popular Integrations Grid */}
        <motion.div className="mb-32" variants={container} initial="hidden" animate="show">
          <motion.div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6" variants={container}>
            {searchedIntegrations.map((integration, index) => (
              <motion.div
                key={integration.name}
                variants={item}
                whileHover={{ y: -8, scale: 1.05 }}
                onHoverStart={() => setHoveredIntegration(integration.name)}
                onHoverEnd={() => setHoveredIntegration(null)}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-gray-200/50 to-gray-100/50 dark:from-gray-800/50 dark:to-gray-900/50 rounded-xl blur-sm -z-10 group-hover:from-red-500/10 group-hover:to-purple-500/10 transition-all duration-300"></div>
                <div className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm border border-gray-200 dark:border-gray-800 rounded-xl p-6 flex flex-col items-center transition-all duration-300 group-hover:border-red-500/30 h-full hover:shadow-xl">
                  <div
                    className={`w-16 h-16 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 ${integration.color}`}
                  >
                    {integration.icon}
                  </div>
                  <span className="text-gray-900 dark:text-gray-300 font-medium text-center mb-2">
                    {integration.name}
                  </span>

                  <AnimatePresence>
                    {hoveredIntegration === integration.name && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="text-gray-600 dark:text-gray-400 text-sm text-center mt-2"
                      >
                        {integration.description}
                        <div className="flex items-center justify-center gap-2 mt-2 mb-3">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-3 h-3 ${
                                  i < Math.floor(integration.rating)
                                    ? "text-amber-400 fill-amber-400"
                                    : "text-gray-300 dark:text-gray-600"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-xs text-gray-500">{integration.users} users</span>
                        </div>
                        <Button
                          variant="default"
                          className="w-full mt-1 bg-gradient-to-r from-[#ff0a0a] to-[#ff6b6b] hover:shadow-lg hover:shadow-red-500/20 transition-all duration-300 border-0"
                        >
                          Connect
                        </Button>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {integration.popular && hoveredIntegration !== integration.name && (
                    <div className="bg-red-500/10 text-red-500 text-xs px-2 py-0.5 rounded-full mt-2">Popular</div>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Featured Integrations */}
        <motion.div
          ref={featuredRef}
          className="mb-32"
          variants={item}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-16">
            <Badge className="mb-4 px-4 py-1.5 text-sm bg-gradient-to-r from-red-500/20 to-red-400/10 text-red-400 border-red-500/20">
              Featured Integrations
            </Badge>
            <h2 className="text-4xl font-bold mb-6 tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400">
                Powerful Connections
              </span>
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg">
              Discover how our most popular integrations can transform your workflow
            </p>
          </div>

          <div className="space-y-24">
            {featuredIntegrations.map((integration, index) => (
              <div
                key={integration.name}
                className={`flex flex-col ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } gap-8 items-center`}
              >
                <div className="md:w-1/2">
                  <motion.div
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="relative rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-xl"
                  >
                    {/* Status bar */}
                    <div className="bg-gray-100 dark:bg-gray-900 p-3 border-b border-gray-200 dark:border-gray-800 flex items-center">
                      <div className="flex space-x-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      </div>
                      <div className="ml-4 text-sm text-gray-600 dark:text-gray-400">{integration.name}</div>
                    </div>

                    <img
                      src={integration.image || "/placeholder.svg"}
                      alt={integration.name}
                      className="w-full h-auto object-cover"
                    />

                    {/* Overlay with stats */}
                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 to-transparent p-4">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-300">{integration.setupTime} setup</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-3 h-3 ${
                                  i < Math.floor(integration.rating) ? "text-amber-400 fill-amber-400" : "text-gray-600"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-300">{integration.users} users</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>

                <div className="md:w-1/2">
                  <motion.div
                    initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <div className="flex items-center gap-4 mb-6">
                      <div
                        className={`w-16 h-16 rounded-xl bg-gradient-to-r ${integration.color} flex items-center justify-center text-white shadow-lg`}
                      >
                        {integration.icon}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{integration.name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge className="bg-green-500/20 text-green-400 border-green-500/20">Easy Setup</Badge>
                          <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/20">Popular</Badge>
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-600 dark:text-gray-300 text-lg mb-6 leading-relaxed">
                      {integration.description}
                    </p>

                    <div className="space-y-3 mb-8">
                      {integration.features.map((feature) => (
                        <div key={feature} className="flex items-start">
                          <div className="p-1 rounded-full bg-gradient-to-r from-red-500 to-red-600 mr-3 mt-0.5">
                            <Check className="w-3 h-3 text-white" />
                          </div>
                          <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-[#ff0a0a] to-[#ff6b6b] hover:shadow-lg hover:shadow-red-500/20 transition-all duration-300 border-0 h-12"
                    >
                      <span className="flex items-center gap-2">
                        Connect {integration.name.split(" + ")[0]}
                        <ArrowRight className="w-5 h-5" />
                      </span>
                    </Button>
                  </motion.div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Integration Categories */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-32"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {integrationCategories.map((category) => (
            <motion.div
              key={category.name}
              variants={item}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-black rounded-xl -z-10"></div>

              {/* Glow effect */}
              <div
                className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10`}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${category.color} rounded-xl blur-xl opacity-30`}
                ></div>
              </div>

              <div
                className={`p-8 border ${
                  category.borderColor
                } rounded-xl bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm hover:border-${category.textColor.replace(
                  "text-",
                  "",
                )}/30 transition-all duration-300 h-full hover:shadow-xl hover:shadow-${category.shadowColor}`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center text-white shadow-lg`}
                  >
                    {category.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{category.name}</h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">{category.count}+ integrations</p>
                  </div>
                </div>

                <div className="space-y-2 mb-6">
                  {category.examples.map((example) => (
                    <div key={example} className="flex items-center text-gray-700 dark:text-gray-300">
                      <span className={`w-2 h-2 bg-gradient-to-r ${category.color} rounded-full mr-3`}></span>
                      {example}
                    </div>
                  ))}
                </div>

                <Button
                  variant="link"
                  className={`px-0 ${category.textColor} hover:text-opacity-80 transition-colors flex items-center gap-1`}
                >
                  <span>View all {category.name} integrations</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Enterprise Integration Section */}
        <motion.div
          className="mb-32"
          variants={item}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-gradient-to-br from-white/80 to-gray-50/40 dark:from-gray-900/80 dark:to-gray-900/40 backdrop-blur-md rounded-2xl p-10 border border-gray-200 dark:border-gray-800 relative overflow-hidden shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-blue-500/5 opacity-50 -z-10"></div>
            <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-red-500/10 blur-3xl -z-10"></div>

            <div className="relative z-10">
              <div className="text-center mb-12">
                <Badge className="mb-4 px-4 py-1.5 text-sm bg-gradient-to-r from-blue-500/20 to-blue-400/10 text-blue-400 border-blue-500/20">
                  Enterprise Solutions
                </Badge>
                <h2 className="text-4xl font-bold mb-6 tracking-tight">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400">
                    Enterprise-Grade Integrations
                  </span>
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto text-lg">
                  Secure, scalable, and customizable integration solutions designed for enterprise requirements
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
                {enterpriseFeatures.map((feature, index) => (
                  <motion.div
                    key={feature.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-200 dark:border-gray-800 hover:border-blue-500/30 transition-all duration-300 hover:shadow-xl"
                  >
                    <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 mb-4">
                      {feature.icon}
                    </div>
                    <h3 className="font-medium text-lg mb-2 text-gray-900 dark:text-white">{feature.name}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
                  </motion.div>
                ))}
              </div>

              <div className="text-center">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-blue-400 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300 border-0 h-14 text-base font-medium"
                >
                  <span className="flex items-center gap-2">
                    Contact Enterprise Sales <ArrowRight className="w-5 h-5" />
                  </span>
                </Button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Testimonials */}
        <motion.div className="mb-32" variants={container} initial="hidden" animate="show">
          <div className="text-center mb-16">
            <Badge className="mb-4 px-4 py-1.5 text-sm bg-gradient-to-r from-green-500/20 to-green-400/10 text-green-400 border-green-500/20">
              Customer Stories
            </Badge>
            <h2 className="text-4xl font-bold mb-6 tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400">
                What Our Customers Say
              </span>
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg">
              Hear from teams who have transformed their workflows with our integrations
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                variants={item}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className="bg-gradient-to-br from-white/80 to-gray-50/40 dark:from-gray-900/80 dark:to-gray-900/40 backdrop-blur-sm border border-gray-200 dark:border-gray-800 rounded-xl p-8 relative overflow-hidden group hover:border-red-500/30 transition-all duration-300 shadow-xl"
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-red-500 rounded-full mix-blend-screen filter blur-[80px] opacity-5 group-hover:opacity-10 transition-opacity"></div>

                <div className="flex mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < testimonial.rating ? "text-amber-400 fill-amber-400" : "text-gray-300 dark:text-gray-600"
                      }`}
                    />
                  ))}
                </div>

                <div className="text-4xl text-red-500/20 mb-4">&apos;</div>
                <p className="text-gray-700 dark:text-gray-300 mb-8 relative z-10 text-lg leading-relaxed">
                  {testimonial.quote}
                </p>

                <div className="flex items-center gap-4 mt-auto">
                  <div className="w-14 h-14 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                    <img
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.author}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-medium text-lg text-gray-900 dark:text-white">{testimonial.author}</div>
                    <div className="text-gray-500">{testimonial.role}</div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-800">
                  <img
                    src={testimonial.logo || "/placeholder.svg"}
                    alt="Company logo"
                    className="h-8 w-auto opacity-70"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* API & Developer Section */}
        <motion.div
          className="mb-32"
          variants={item}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-white/40 dark:bg-gray-900/40 backdrop-blur-md rounded-2xl p-10 border border-gray-200 dark:border-gray-800 relative overflow-hidden shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-blue-500/5 opacity-50"></div>

            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="md:w-1/2">
                <Badge className="mb-4 px-4 py-1.5 text-sm bg-gradient-to-r from-purple-500/20 to-purple-400/10 text-purple-400 border-purple-500/20">
                  Developer Tools
                </Badge>
                <h2 className="text-3xl font-bold mb-6 flex items-center text-gray-900 dark:text-white">
                  Build Your Own Integration
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-8 text-lg">
                  Don&apos;t see your favorite tool? Use our developer API to build custom integrations for your
                  specific needs.
                </p>

                <div className="space-y-6 mb-8">
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-red-500 mr-4 flex-shrink-0">
                      <Zap className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-medium text-lg mb-1 text-gray-900 dark:text-white">Powerful REST API</h4>
                      <p className="text-gray-600 dark:text-gray-400">
                        Comprehensive API with webhooks, authentication, and real-time capabilities.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-red-500 mr-4 flex-shrink-0">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-medium text-lg mb-1 text-gray-900 dark:text-white">Detailed Documentation</h4>
                      <p className="text-gray-600 dark:text-gray-400">
                        Step-by-step guides, API reference, and code examples in multiple languages.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-red-500 mr-4 flex-shrink-0">
                      <Database className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-medium text-lg mb-1 text-gray-900 dark:text-white">Developer Tools</h4>
                      <p className="text-gray-600 dark:text-gray-400">
                        SDKs, testing environments, and integration templates to accelerate development.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-[#ff0a0a] to-[#ff6b6b] text-black dark:text-white hover:shadow-lg hover:shadow-red-500/20 transition-all duration-300 border-0 h-14 text-base font-medium"
                  >
                    <span className="flex items-center gap-2">
                      Developer Docs
                      <ArrowRight className="w-5 h-5" />
                    </span>
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-gray-300 dark:border-gray-700 hover:text-gray-900 dark:hover:text-white hover:border-gray-400 dark:hover:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-900/50 transition-all duration-300 backdrop-blur-sm flex items-center gap-2 h-14 text-base font-medium"
                  >
                    <ExternalLink className="w-5 h-5" />
                    API Reference
                  </Button>
                </div>
              </div>

              <div className="md:w-1/2 bg-white/50 dark:bg-black/50 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-xl">
                <div className="bg-gray-100 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 p-3 flex items-center">
                  <div className="flex space-x-2 mr-3">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 flex-1 text-center">API Example</div>
                </div>
                <div className="p-6">
                  <pre className="text-sm text-gray-700 dark:text-gray-300 overflow-x-auto">
                    <code>{`// Example: Connect to Orbit API
const orbit = require('orbit-sdk');

// Initialize with your API key
const client = new orbit.Client({
  apiKey: process.env.ORBIT_API_KEY
});

// Create a new integration
async function createIntegration() {
  try {
    const integration = await client.integrations.create({
      type: 'custom',
      name: 'My Custom Tool',
      webhookUrl: 'https://example.com/webhook',
      events: ['project.created', 'task.updated']
    });
    
    console.log('Integration created:', integration.id);
  } catch (error) {
    console.error('Error:', error);
  }
}`}</code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="relative mb-12 z-10 overflow-hidden"
          variants={item}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#6a11cb] to-[#2575fc] opacity-90 -z-10 rounded-xl"></div>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djZoNnYtNmgtNnptNiA2djZoNnYtNmgtNnptLTEyIDBoNnY2aC02di02em0xMiAwaDZ2NmgtNnYtNnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20 -z-10 rounded-xl"></div>

          <div className="relative rounded-xl p-12 md:p-16 overflow-hidden">
            <div className="absolute top-0 right-0 -mt-16 -mr-16 w-64 h-64 bg-white/10 rounded-full filter blur-3xl opacity-70"></div>

            <div className="max-w-4xl mx-auto">
              <motion.h2
                className="text-3xl md:text-4xl font-bold mb-6 text-white text-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Don&apos;t see your favorite tool?
              </motion.h2>

              <motion.p
                className="text-blue-100 mb-10 max-w-2xl mx-auto text-center text-lg"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                We&apos;re constantly adding new integrations. Request one or build your own with our API. Our team
                prioritizes integrations based on community demand.
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Button
                  size="lg"
                  className="bg-white text-[#2575fc] hover:bg-blue-50 hover:scale-105 transition-all duration-300 flex items-center gap-2 px-8 h-14 text-base font-medium shadow-xl"
                >
                  <Plus className="w-5 h-5" />
                  Request Integration
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white/20 text-black dark:text-white hover:text-white hover:bg-white/10 transition-all duration-300 flex items-center gap-2 px-8 h-14 text-base font-medium"
                >
                  <Code className="w-5 h-5" />
                  Developer Docs
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Integration Count */}
        <motion.div
          className="text-center"
          variants={item}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="inline-flex items-center gap-3 bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm border border-gray-200 dark:border-gray-800 rounded-full px-6 py-3 shadow-xl">
            <Zap className="w-5 h-5 text-red-500" />
            <span className="text-gray-700 dark:text-gray-300">100+ integrations and growing every month</span>
          </div>
        </motion.div>
      </section>
    </motion.main>
  )
}
