"use client"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  BookOpen,
  Code,
  Video,
  Headphones,
  Search,
  ChevronRight,
  Star,
  Clock,
  Users,
  Zap,
  ArrowRight,
  MessageSquare,
  Github,
  FileText,
  Coffee,
  Terminal,
  Database,
  Settings,
  Shield,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

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

export default function DocsPage() {
  const [searchFocused, setSearchFocused] = useState(false)
  const [activeCategory, setActiveCategory] = useState("all")

  const categories = [
    { id: "all", name: "All Resources" },
    { id: "guides", name: "Guides" },
    { id: "api", name: "API Reference" },
    { id: "tutorials", name: "Tutorials" },
    { id: "examples", name: "Examples" },
  ]

  const resources = [
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Getting Started Guide",
      description: "Learn how to set up Orbit Suite for your team and configure your first project.",
      category: "guides",
      link: "#",
      popular: true,
      timeToRead: "10 min read",
    },
    {
      icon: <Code className="w-6 h-6" />,
      title: "API Documentation",
      description: "Build custom integrations with our developer API and extend functionality.",
      category: "api",
      link: "#",
      popular: true,
      timeToRead: "25 min read",
    },
    {
      icon: <Video className="w-6 h-6" />,
      title: "Video Tutorials",
      description: "Watch step-by-step guides for key features and learn advanced techniques.",
      category: "tutorials",
      link: "#",
      popular: false,
      timeToRead: "45 min watch",
    },
    {
      icon: <Headphones className="w-6 h-6" />,
      title: "Help Center",
      description: "Find answers to common questions and troubleshoot issues quickly.",
      category: "guides",
      link: "#",
      popular: false,
      timeToRead: "15 min read",
    },
    {
      icon: <Terminal className="w-6 h-6" />,
      title: "CLI Reference",
      description: "Master the command line interface for efficient workflow automation.",
      category: "api",
      link: "#",
      popular: false,
      timeToRead: "20 min read",
    },
    {
      icon: <Database className="w-6 h-6" />,
      title: "Data Management",
      description: "Learn best practices for organizing and managing your project data.",
      category: "guides",
      link: "#",
      popular: true,
      timeToRead: "15 min read",
    },
    {
      icon: <Github className="w-6 h-6" />,
      title: "GitHub Integration",
      description: "Connect your repositories and streamline your development workflow.",
      category: "tutorials",
      link: "#",
      popular: false,
      timeToRead: "12 min read",
    },
    {
      icon: <Settings className="w-6 h-6" />,
      title: "Advanced Configuration",
      description: "Customize Orbit Suite to match your team's specific requirements.",
      category: "guides",
      link: "#",
      popular: false,
      timeToRead: "18 min read",
    },
  ]

  const popularArticles = [
    {
      title: "Authentication & Authorization",
      description: "Learn how to implement secure user authentication and role-based access control.",
      icon: <Shield className="w-5 h-5" />,
      category: "Security",
    },
    {
      title: "Performance Optimization",
      description: "Tips and techniques to improve application performance and response times.",
      icon: <Zap className="w-5 h-5" />,
      category: "Best Practices",
    },
    {
      title: "Team Collaboration",
      description: "Set up effective workflows for multiple team members and departments.",
      icon: <Users className="w-5 h-5" />,
      category: "Workflows",
    },
  ]

  const filteredResources =
    activeCategory === "all" ? resources : resources.filter((resource) => resource.category === activeCategory)

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
      </div>

      {/* Content */}
      <section className="relative py-20 px-4 sm:px-6 max-w-7xl mx-auto z-10">
        {/* Hero Section */}
        <motion.div variants={item} className="text-center mb-20 relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute -top-24 left-1/2 -translate-x-1/2 w-64 h-64 bg-gradient-to-br from-red-500/10 to-purple-500/10 rounded-full filter blur-3xl opacity-50"
          ></motion.div>

          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6 tracking-tight"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#ff0a0a] to-[#ff6b6b]">
              Documentation
            </span>{" "}
            <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600 dark:from-[#fefefe] dark:to-[#a0a0a0]">
              & Resources
            </span>
          </motion.h1>

          <motion.p
            className="text-gray-600 dark:text-gray-400 text-lg md:text-xl mb-10 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Everything you need to get the most out of Orbit Suite. Explore our guides, API references, and tutorials to
            become an expert.
          </motion.p>

          {/* Search Bar */}
          <motion.div
            className="max-w-2xl mx-auto relative mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <div className="relative">
              {/* Glow effect that doesn't cause layout shift */}
              <div
                className={`absolute inset-0 bg-gradient-to-r from-red-500/20 to-purple-500/20 rounded-xl blur-md transition-opacity duration-300 ${
                  searchFocused ? "opacity-100" : "opacity-80"
                }`}
              ></div>

              {/* Main search container with fixed dimensions */}
              <div
                className={`relative bg-white/80 dark:bg-gray-900/80 z-20 backdrop-blur-md rounded-xl border transition-colors duration-300 overflow-hidden shadow-xl ${
                  searchFocused ? "border-red-500/30" : "border-gray-200 dark:border-gray-800"
                }`}
              >
                {/* Search input container with fixed height */}
                <div className="flex items-center relative h-14">
                  <Search className="absolute left-4 text-gray-400 dark:text-gray-500 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search documentation..."
                    className="w-full h-full px-12 bg-transparent text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none"
                    onFocus={() => setSearchFocused(true)}
                    onBlur={() => setSearchFocused(false)}
                  />
                  <div className="absolute right-2">
                    <Button className="bg-gradient-to-r from-[#ff0a0a] to-[#ff6b6b] hover:shadow-lg hover:shadow-red-500/20 transition-all duration-300 border-0">
                      Search
                    </Button>
                  </div>
                </div>

                {/* Dropdown that appears below without shifting layout */}
                <div className="relative">
                  <AnimatePresence>
                    {searchFocused && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="border-t border-gray-200 dark:border-gray-800 p-4"
                      >
                        <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">POPULAR SEARCHES</div>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white p-2 rounded-lg hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer">
                            <Clock className="w-4 h-4" />
                            <span>Authentication</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white p-2 rounded-lg hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer">
                            <Clock className="w-4 h-4" />
                            <span>API Keys</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white p-2 rounded-lg hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer">
                            <Clock className="w-4 h-4" />
                            <span>Webhooks</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white p-2 rounded-lg hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer">
                            <Clock className="w-4 h-4" />
                            <span>Deployment</span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            <div className="flex justify-center mt-4 gap-2 text-sm text-gray-500 dark:text-gray-400">
              <span>Popular:</span>
              <div className="flex gap-2">
                <button className="hover:text-gray-900 dark:hover:text-white transition-colors">Getting Started</button>
                <span>•</span>
                <button className="hover:text-gray-900 dark:hover:text-white transition-colors">API Reference</button>
                <span>•</span>
                <button className="hover:text-gray-900 dark:hover:text-white transition-colors">Tutorials</button>
              </div>
            </div>
          </motion.div>

          {/* Category Tabs */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <Tabs defaultValue="all" className="w-full" onValueChange={setActiveCategory}>
              <TabsList className="bg-gray-100/70 dark:bg-gray-900/70 backdrop-blur-md border border-gray-200 dark:border-gray-800 p-1 rounded-full mx-auto inline-flex">
                {categories.map((category) => (
                  <TabsTrigger
                    key={category.id}
                    value={category.id}
                    className="rounded-full px-4 py-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#ff0a0a] data-[state=active]:to-[#ff6b6b] data-[state=active]:text-white"
                  >
                    {category.name}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </motion.div>
        </motion.div>

        {/* Resources Grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {filteredResources.map((resource, index) => (
            <motion.div
              key={index}
              variants={item}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative overflow-hidden rounded-xl"
            >
              {/* Background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-black rounded-xl -z-10"></div>

              {/* Glow effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-purple-500/10 rounded-xl blur-xl"></div>
              </div>

              {/* Content */}
              <div className="p-8 border border-gray-200 dark:border-gray-800 rounded-xl bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm group-hover:border-red-500/30 transition-colors duration-300 h-full flex flex-col">
                <div className="w-12 h-12 bg-gradient-to-br from-red-500/20 to-red-500/10 rounded-lg flex items-center justify-center mb-6 text-red-500 group-hover:text-white group-hover:bg-gradient-to-r group-hover:from-red-500 group-hover:to-red-600 transition-all duration-300">
                  {resource.icon}
                </div>

                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-gray-900 group-hover:to-gray-600 dark:group-hover:from-white dark:group-hover:to-gray-300 transition-all duration-300">
                    {resource.title}
                  </h3>
                  {resource.popular && (
                    <div className="bg-red-500/10 text-red-500 text-xs px-2 py-0.5 rounded-full flex items-center gap-1">
                      <Star className="w-3 h-3" />
                      <span>Popular</span>
                    </div>
                  )}
                </div>

                <p className="text-gray-600 dark:text-gray-400 mb-6 flex-grow">{resource.description}</p>

                <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                    <Clock className="w-4 h-4 mr-1" />
                    {resource.timeToRead}
                  </div>

                  <Button
                    variant="link"
                    className="px-0 text-red-500 group-hover:text-red-400 transition-colors flex items-center gap-1"
                  >
                    <span>Explore</span>
                    <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Popular Articles Section */}
        <motion.div
          className="mb-24"
          variants={item}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Popular Articles</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Our most read documentation to help you get started quickly
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {popularArticles.map((article, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
                whileHover={{ y: -5 }}
                className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm border border-gray-200 dark:border-gray-800 rounded-xl p-6 hover:border-red-500/30 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center text-red-500">
                    {article.icon}
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{article.category}</div>
                    <h3 className="font-medium text-gray-900 dark:text-white">{article.title}</h3>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{article.description}</p>
                <Button
                  variant="link"
                  className="px-0 text-red-500 hover:text-red-400 transition-colors text-sm flex items-center gap-1"
                >
                  <span>Read article</span>
                  <ArrowRight className="w-3 h-3" />
                </Button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Documentation Navigation */}
        <motion.div className="mb-24 grid md:grid-cols-3 gap-6" variants={container} initial="hidden" animate="show">
          <motion.div
            variants={item}
            className="md:col-span-2 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-black border border-gray-200 dark:border-gray-800 rounded-xl p-8 relative overflow-hidden group hover:border-red-500/30 transition-all duration-300"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-red-500 rounded-full mix-blend-screen filter blur-[80px] opacity-10 group-hover:opacity-20 transition-opacity"></div>

            <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Documentation Structure</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Navigate through our comprehensive documentation sections
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-900/70 transition-colors">
                <FileText className="w-5 h-5 text-red-500 mb-2" />
                <h4 className="font-medium mb-1 text-gray-900 dark:text-white">Guides</h4>
                <p className="text-gray-500 dark:text-gray-400 text-sm">Step-by-step instructions for common tasks</p>
              </div>

              <div className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-900/70 transition-colors">
                <Code className="w-5 h-5 text-red-500 mb-2" />
                <h4 className="font-medium mb-1 text-gray-900 dark:text-white">API Reference</h4>
                <p className="text-gray-500 dark:text-gray-400 text-sm">Complete API documentation with examples</p>
              </div>

              <div className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-900/70 transition-colors">
                <Terminal className="w-5 h-5 text-red-500 mb-2" />
                <h4 className="font-medium mb-1 text-gray-900 dark:text-white">CLI Commands</h4>
                <p className="text-gray-500 dark:text-gray-400 text-sm">Command line interface documentation</p>
              </div>

              <div className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-900/70 transition-colors">
                <Coffee className="w-5 h-5 text-red-500 mb-2" />
                <h4 className="font-medium mb-1 text-gray-900 dark:text-white">Tutorials</h4>
                <p className="text-gray-500 dark:text-gray-400 text-sm">Learn through practical examples</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={item}
            className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-black border border-gray-200 dark:border-gray-800 rounded-xl p-8 relative overflow-hidden group hover:border-red-500/30 transition-all duration-300"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full mix-blend-screen filter blur-[80px] opacity-10 group-hover:opacity-20 transition-opacity"></div>

            <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Latest Updates</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">Recently updated documentation</p>

            <div className="space-y-4">
              <div className="border-b border-gray-200 dark:border-gray-800 pb-4">
                <div className="flex justify-between items-center mb-1">
                  <h4 className="font-medium text-gray-900 dark:text-white">Authentication API</h4>
                  <span className="text-xs text-gray-500 dark:text-gray-400">2 days ago</span>
                </div>
                <p className="text-gray-500 dark:text-gray-400 text-sm">Updated OAuth2 implementation guide</p>
              </div>

              <div className="border-b border-gray-200 dark:border-gray-800 pb-4">
                <div className="flex justify-between items-center mb-1">
                  <h4 className="font-medium text-gray-900 dark:text-white">Webhooks</h4>
                  <span className="text-xs text-gray-500 dark:text-gray-400">5 days ago</span>
                </div>
                <p className="text-gray-500 dark:text-gray-400 text-sm">Added new event types and examples</p>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <h4 className="font-medium text-gray-900 dark:text-white">Performance Guide</h4>
                  <span className="text-xs text-gray-500 dark:text-gray-400">1 week ago</span>
                </div>
                <p className="text-gray-500 dark:text-gray-400 text-sm">New section on optimizing large datasets</p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Help Section */}
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
                Still need help?
              </motion.h2>

              <motion.p
                className="text-blue-100 mb-10 max-w-2xl mx-auto text-center text-lg"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Our support team is available 24/7 to answer your questions and help you get the most out of Orbit
                Suite.
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Button
                  size="lg"
                  className="bg-white text-[#2575fc] hover:bg-blue-50 hover:scale-105 transition-all duration-300 flex items-center gap-2 px-8"
                >
                  <MessageSquare className="w-4 h-4" />
                  Contact Support
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white/20 text-black dark:text-white hover:text-white hover:bg-white/10 transition-all duration-300 flex items-center gap-2 px-8"
                >
                  <Users className="w-4 h-4" />
                  Join Community
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>
    </motion.main>
  )
}
