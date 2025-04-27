"use client";
import { useState, useRef, useEffect } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import {
  Zap,
  Users,
  Plug,
  ArrowRight,
  CheckCircle,
  Shield,
  Smartphone,
  Wifi,
  Sparkles,
  BarChart,
  Palette,
  Lock,
  ChevronRight,
  Play,
  Star,
  Clock,
  Check,
  MessageSquare,
  Layers,
  Globe,
  Cpu,
  FileText,
  Bell,
  Calendar,
  Search,
  Lightbulb,
  Headphones,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useInView } from "react-intersection-observer";

// Animation variants
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function FeaturesPage() {
  const [activeFeature, setActiveFeature] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("collaboration");
  const [activeDemo, setActiveDemo] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const featuresRef = useRef(null);
  const [ref, inView] = useInView({ threshold: 0.1 });
  const controls = useAnimation();
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
      controls.start("visible");
    }
  }, [controls, inView]);

  // Auto-rotate demo screenshots
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveDemo((prev) => (prev + 1) % demoScreenshots.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const featureCategories = [
    {
      id: "collaboration",
      name: "Collaboration",
      icon: <Users className="w-6 h-6" />,
      features: [
        "Real-time co-editing",
        "Comments & annotations",
        "Team chat",
        "Video conferencing",
        "Version history",
        "Approval workflows",
      ],
      gradient: "from-[#ff0a0a] to-[#ff6b6b]",
      color: "text-red-500",
      borderColor: "border-red-500/20",
      description:
        "Work together seamlessly with your team, no matter where they are. Our real-time collaboration tools make remote work feel like you're in the same room.",
      benefits: [
        "Reduce meeting time by 30%",
        "Faster feedback cycles",
        "Improved team alignment",
        "Seamless remote collaboration",
      ],
      screenshot: "/placeholder.svg?height=600&width=800",
      detailedFeatures: [
        {
          name: "Real-time co-editing",
          description:
            "Multiple team members can edit the same document simultaneously, with changes appearing instantly for all participants.",
          icon: <Users className="w-5 h-5" />,
        },
        {
          name: "Comments & annotations",
          description:
            "Leave contextual feedback directly on documents, designs, and other assets with rich formatting options.",
          icon: <MessageSquare className="w-5 h-5" />,
        },
        {
          name: "Version history",
          description:
            "Track changes over time with comprehensive version history. Compare versions and restore previous states with one click.",
          icon: <Layers className="w-5 h-5" />,
        },
        {
          name: "Approval workflows",
          description:
            "Create custom approval processes for documents, designs, and other deliverables to ensure quality control.",
          icon: <CheckCircle className="w-5 h-5" />,
        },
      ],
    },
    {
      id: "productivity",
      name: "Productivity",
      icon: <Zap className="w-6 h-6" />,
      features: [
        "Task management",
        "Time tracking",
        "Calendar integration",
        "Notifications",
        "Focus mode",
        "Smart templates",
      ],
      gradient: "from-[#00c6ff] to-[#0072ff]",
      color: "text-blue-500",
      borderColor: "border-blue-500/20",
      description:
        "Boost your team's efficiency with powerful productivity tools designed to streamline workflows and eliminate busywork.",
      benefits: [
        "Save 5+ hours per week",
        "Improved task completion rates",
        "Better time management",
        "Reduced context switching",
      ],
      screenshot: "/placeholder.svg?height=600&width=800",
      detailedFeatures: [
        {
          name: "Task management",
          description:
            "Create, assign, and track tasks with customizable workflows. Set priorities, deadlines, and dependencies.",
          icon: <CheckCircle className="w-5 h-5" />,
        },
        {
          name: "Time tracking",
          description:
            "Track time spent on tasks and projects with one-click timers. Generate detailed reports for billing and productivity analysis.",
          icon: <Clock className="w-5 h-5" />,
        },
        {
          name: "Calendar integration",
          description:
            "Sync with Google Calendar, Outlook, and other calendar services. Schedule meetings and set reminders directly from the platform.",
          icon: <Calendar className="w-5 h-5" />,
        },
        {
          name: "Smart templates",
          description:
            "Create reusable templates for common workflows, documents, and projects to maintain consistency and save time.",
          icon: <FileText className="w-5 h-5" />,
        },
      ],
    },
    {
      id: "integration",
      name: "Integration",
      icon: <Plug className="w-6 h-6" />,
      features: [
        "100+ app connections",
        "Unified search",
        "Cross-tool workflows",
        "API access",
        "Zapier/IFTTT",
        "Custom connectors",
      ],
      gradient: "from-[#6a11cb] to-[#2575fc]",
      color: "text-purple-500",
      borderColor: "border-purple-500/20",
      description:
        "Connect with all your favorite tools and services. Orbit Suite works with the apps you already use, creating a seamless experience across your entire stack.",
      benefits: [
        "Centralize your tech stack",
        "Eliminate data silos",
        "Automate cross-tool workflows",
        "Reduce tool switching",
      ],
      screenshot: "/placeholder.svg?height=600&width=800",
      detailedFeatures: [
        {
          name: "100+ app connections",
          description:
            "Native integrations with popular tools like Slack, Google Workspace, Microsoft 365, Jira, Asana, and many more.",
          icon: <Plug className="w-5 h-5" />,
        },
        {
          name: "Unified search",
          description:
            "Search across all your connected tools and services from a single interface. Find what you need instantly.",
          icon: <Search className="w-5 h-5" />,
        },
        {
          name: "API access",
          description:
            "Full API access for custom integrations and automations. Build your own connections to any service.",
          icon: <Cpu className="w-5 h-5" />,
        },
        {
          name: "Cross-tool workflows",
          description:
            "Create automated workflows that span multiple tools. Trigger actions in one tool based on events in another.",
          icon: <Zap className="w-5 h-5" />,
        },
      ],
    },
    {
      id: "ai",
      name: "AI Assistant",
      icon: <Sparkles className="w-6 h-6" />,
      features: [
        "Smart content generation",
        "Automated summarization",
        "Data analysis",
        "Personalized recommendations",
        "Meeting transcription",
        "Language translation",
      ],
      gradient: "from-[#FF8008] to-[#FFC837]",
      color: "text-amber-500",
      borderColor: "border-amber-500/20",
      description:
        "Leverage the power of artificial intelligence to automate routine tasks, generate content, and gain valuable insights from your data.",
      benefits: [
        "Automate repetitive tasks",
        "Generate high-quality content",
        "Extract insights from data",
        "Enhance decision making",
      ],
      screenshot: "/placeholder.svg?height=600&width=800",
      detailedFeatures: [
        {
          name: "Smart content generation",
          description:
            "Generate high-quality content for emails, reports, and other documents based on simple prompts.",
          icon: <Lightbulb className="w-5 h-5" />,
        },
        {
          name: "Automated summarization",
          description:
            "Automatically summarize long documents, meeting transcripts, and conversations to save time.",
          icon: <FileText className="w-5 h-5" />,
        },
        {
          name: "Data analysis",
          description:
            "Extract insights from your data with AI-powered analysis. Identify trends and patterns automatically.",
          icon: <BarChart className="w-5 h-5" />,
        },
        {
          name: "Personalized recommendations",
          description:
            "Receive personalized suggestions for tasks, content, and workflows based on your usage patterns.",
          icon: <Sparkles className="w-5 h-5" />,
        },
      ],
    },
  ];

  const stats = [
    {
      value: "10x",
      label: "Faster workflows",
      icon: <Zap className="w-5 h-5 text-blue-400" />,
    },
    {
      value: "24/7",
      label: "Support",
      icon: <Headphones className="w-5 h-5 text-green-400" />,
    },
    {
      value: "99.9%",
      label: "Uptime",
      icon: <Shield className="w-5 h-5 text-purple-400" />,
    },
    {
      value: "1M+",
      label: "Users",
      icon: <Users className="w-5 h-5 text-red-400" />,
    },
  ];

  const testimonials = [
    {
      quote:
        "Orbit Suite transformed how our remote team collaborates. Game changer!",
      author: "Sarah K.",
      role: "Product Manager",
      company: "TechCorp",
      avatar: "/placeholder.svg?height=80&width=80",
      logo: "/placeholder.svg?height=40&width=120",
      rating: 5,
    },
    {
      quote:
        "The automation features saved us hundreds of hours in the first month alone.",
      author: "James L.",
      role: "CTO",
      company: "StartUp Inc",
      avatar: "/placeholder.svg?height=80&width=80",
      logo: "/placeholder.svg?height=40&width=120",
      rating: 5,
    },
    {
      quote:
        "The AI assistant feels like having an extra team member. It's incredibly powerful.",
      author: "Emma R.",
      role: "Marketing Director",
      company: "Global Media",
      avatar: "/placeholder.svg?height=80&width=80",
      logo: "/placeholder.svg?height=40&width=120",
      rating: 5,
    },
  ];

  const additionalFeatures = [
    {
      name: "Advanced analytics",
      icon: <BarChart className="w-5 h-5" />,
      description:
        "Gain insights into your team's performance with detailed reports and visualizations.",
      color: "text-blue-400",
      gradient: "from-blue-500/20 to-blue-400/10",
      border: "border-blue-500/20",
    },
    {
      name: "Custom branding",
      icon: <Palette className="w-5 h-5" />,
      description:
        "Make Orbit Suite your own with customizable colors, logos, and domain names.",
      color: "text-purple-400",
      gradient: "from-purple-500/20 to-purple-400/10",
      border: "border-purple-500/20",
    },
    {
      name: "Role-based access",
      icon: <Lock className="w-5 h-5" />,
      description:
        "Control who can access what with granular permission settings for teams and projects.",
      color: "text-amber-400",
      gradient: "from-amber-500/20 to-amber-400/10",
      border: "border-amber-500/20",
    },
    {
      name: "Audit logs",
      icon: <Shield className="w-5 h-5" />,
      description:
        "Keep track of all activity within your workspace for security and compliance.",
      color: "text-green-400",
      gradient: "from-green-500/20 to-green-400/10",
      border: "border-green-500/20",
    },
    {
      name: "Mobile apps",
      icon: <Smartphone className="w-5 h-5" />,
      description:
        "Stay productive on the go with our native iOS and Android applications.",
      color: "text-red-400",
      gradient: "from-red-500/20 to-red-400/10",
      border: "border-red-500/20",
    },
    {
      name: "Offline mode",
      icon: <Wifi className="w-5 h-5" />,
      description:
        "Continue working even without an internet connection. Changes sync when you're back online.",
      color: "text-cyan-400",
      gradient: "from-cyan-500/20 to-cyan-400/10",
      border: "border-cyan-500/20",
    },
    {
      name: "AI assistant",
      icon: <Sparkles className="w-5 h-5" />,
      description:
        "Let our AI help you with repetitive tasks, content generation, and smart suggestions.",
      color: "text-amber-400",
      gradient: "from-amber-500/20 to-amber-400/10",
      border: "border-amber-500/20",
    },
    {
      name: "Data encryption",
      icon: <Shield className="w-5 h-5" />,
      description:
        "Enterprise-grade security with end-to-end encryption for all your sensitive data.",
      color: "text-indigo-400",
      gradient: "from-indigo-500/20 to-indigo-400/10",
      border: "border-indigo-500/20",
    },
    {
      name: "Single sign-on",
      icon: <Lock className="w-5 h-5" />,
      description:
        "Simplify authentication with SSO support for Google, Microsoft, Okta, and more.",
      color: "text-pink-400",
      gradient: "from-pink-500/20 to-pink-400/10",
      border: "border-pink-500/20",
    },
    {
      name: "Global access",
      icon: <Globe className="w-5 h-5" />,
      description:
        "Access your workspace from anywhere in the world with our global CDN infrastructure.",
      color: "text-emerald-400",
      gradient: "from-emerald-500/20 to-emerald-400/10",
      border: "border-emerald-500/20",
    },
    {
      name: "Smart notifications",
      icon: <Bell className="w-5 h-5" />,
      description:
        "Stay informed with intelligent notifications that prioritize what's important to you.",
      color: "text-orange-400",
      gradient: "from-orange-500/20 to-orange-400/10",
      border: "border-orange-500/20",
    },
    {
      name: "Advanced search",
      icon: <Search className="w-5 h-5" />,
      description:
        "Find anything in seconds with our powerful search engine that understands natural language.",
      color: "text-violet-400",
      gradient: "from-violet-500/20 to-violet-400/10",
      border: "border-violet-500/20",
    },
  ];

  const demoScreenshots = [
    {
      title: "Team Collaboration",
      image: "/placeholder.svg?height=600&width=1000",
      description: "Real-time collaboration with your team members",
    },
    {
      title: "Project Dashboard",
      image: "/placeholder.svg?height=600&width=1000",
      description: "Comprehensive overview of all your projects",
    },
    {
      title: "Task Management",
      image: "/placeholder.svg?height=600&width=1000",
      description: "Organize and track tasks with customizable workflows",
    },
    {
      title: "AI Assistant",
      image: "/placeholder.svg?height=600&width=1000",
      description: "Get intelligent suggestions and automate routine tasks",
    },
  ];

  const activeCategoryData =
    featureCategories.find((c) => c.id === activeTab) || featureCategories[0];

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
            Constantly evolving with new features
          </motion.div>

          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6 tracking-tight"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#ff0a0a] to-[#ff6b6b]">
              Powerful
            </span>{" "}
            <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600 dark:from-[#fefefe] dark:to-[#a0a0a0]">
              Features
            </span>
          </motion.h1>

          <motion.p
            className="text-gray-600 dark:text-gray-300 text-lg md:text-xl mb-10 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Discover how Orbit Suite&apos;s comprehensive feature set can
            transform your team&apos;s workflow and boost productivity across
            your entire organization.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <Button
              size="lg"
              className="relative overflow-hidden group bg-gradient-to-r from-[#ff0a0a] to-[#ff6b6b] hover:shadow-lg hover:shadow-red-500/20 transition-all duration-300 border-0 h-14 text-base font-medium"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transform group-hover:translate-x-full transition-all duration-1000 ease-out" />
              <span className="relative z-10 flex items-center gap-2">
                Get Started{" "}
                <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </span>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-gray-300 dark:border-gray-700 hover:text-gray-900 dark:hover:text-white hover:border-gray-400 dark:hover:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-900/50 transition-all duration-300 backdrop-blur-sm h-14 text-base font-medium flex items-center gap-2"
            >
              <Play className="w-5 h-5" />
              Watch Demo
            </Button>
          </motion.div>
        </motion.div>

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
                {demoScreenshots[activeDemo].title}
              </div>
              <div className="w-16"></div> {/* Spacer for balance */}
            </div>

            {/* Demo content */}
            <div className="relative h-[500px] overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeDemo}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0"
                >
                  <img
                    src={
                      demoScreenshots[activeDemo].image || "/placeholder.svg"
                    }
                    alt={demoScreenshots[activeDemo].title}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Navigation dots */}
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
                {demoScreenshots.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveDemo(index)}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                      activeDemo === index ? "bg-white w-8" : "bg-white/50"
                    }`}
                  />
                ))}
              </div>

              {/* Caption */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-center">
                <p className="text-white text-lg">
                  {demoScreenshots[activeDemo].description}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Feature Categories Tabs */}
        <motion.div
          className="mb-16"
          variants={item}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex justify-center mb-8 overflow-x-auto pb-2 hide-scrollbar">
            <div className="inline-flex bg-gray-100/70 dark:bg-gray-900/70 backdrop-blur-md rounded-full p-1.5 border border-gray-200 dark:border-gray-800 shadow-xl">
              {featureCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveTab(category.id)}
                  className={`relative px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeTab === category.id
                      ? "text-white"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  }`}
                >
                  {activeTab === category.id && (
                    <motion.div
                      layoutId="activeFeatureTab"
                      className={`absolute inset-0 rounded-full bg-gradient-to-r ${category.gradient} opacity-90`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                  <span className="relative flex items-center gap-2">
                    {category.icon}
                    {category.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Active Feature Category Detail */}
        <motion.div
          className="mb-32"
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <Badge
                className={`mb-4 px-4 py-1.5 text-sm bg-gradient-to-r ${activeCategoryData.gradient
                  .replace("from-", "from-")
                  .replace("to-", "to-")}/20 ${
                  activeCategoryData.color
                } border-${activeCategoryData.color.replace("text-", "")}/20`}
              >
                {activeCategoryData.name}
              </Badge>
              <h2 className="text-4xl font-bold mb-6 tracking-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400">
                  {activeCategoryData.name} Features
                </span>
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-lg mb-8 leading-relaxed">
                {activeCategoryData.description}
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                {activeCategoryData.benefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200 dark:border-gray-800 rounded-xl p-4 flex items-start gap-3"
                  >
                    <div
                      className={`p-1.5 rounded-full bg-gradient-to-r ${activeCategoryData.gradient} flex-shrink-0 mt-0.5`}
                    >
                      <Check className="w-3.5 h-3.5 text-white" />
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3 mb-8">
                {activeCategoryData.features.map((feature) => (
                  <div
                    key={feature}
                    className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200 dark:border-gray-800 rounded-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 flex items-center gap-2"
                  >
                    <div
                      className={`w-2 h-2 rounded-full bg-gradient-to-r ${activeCategoryData.gradient}`}
                    />
                    {feature}
                  </div>
                ))}
              </div>

              <Button
                className={`bg-gradient-to-r ${
                  activeCategoryData.gradient
                } hover:shadow-lg hover:shadow-${activeCategoryData.color.replace(
                  "text-",
                  ""
                )}/20 text-white transition-all duration-300 border-0`}
              >
                <span className="flex items-center gap-2">
                  Learn more about {activeCategoryData.name}
                  <ArrowRight className="w-4 h-4" />
                </span>
              </Button>
            </div>

            <div className="relative">
              <div
                className={`absolute inset-0 bg-gradient-to-br ${activeCategoryData.gradient
                  .replace("from-", "from-")
                  .replace("to-", "to-")}/10 rounded-xl blur-xl -z-10`}
              ></div>
              <div className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden shadow-xl">
                <img
                  src={activeCategoryData.screenshot || "/placeholder.svg"}
                  alt={`${activeCategoryData.name} screenshot`}
                  className="w-full h-auto"
                />
                <div className="p-8">
                  <h3 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">
                    Key Capabilities
                  </h3>
                  <div className="space-y-6">
                    {activeCategoryData.detailedFeatures.map(
                      (feature, index) => (
                        <div key={index} className="flex gap-4">
                          <div
                            className={`w-10 h-10 rounded-lg bg-gradient-to-r ${activeCategoryData.gradient} flex items-center justify-center text-white flex-shrink-0`}
                          >
                            {feature.icon}
                          </div>
                          <div>
                            <h4 className="font-medium mb-1 text-gray-900 dark:text-white">
                              {feature.name}
                            </h4>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">
                              {feature.description}
                            </p>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Feature Categories Grid */}
        <motion.div
          ref={featuresRef}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-32"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {featureCategories.map((category, index) => (
            <motion.div
              key={category.name}
              variants={item}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className="relative overflow-hidden group"
              onMouseEnter={() => setActiveFeature(category.name)}
              onMouseLeave={() => setActiveFeature(null)}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300 -z-10 rounded-xl`}
              ></div>

              <div
                className={`p-8 border border-gray-200 dark:border-gray-800 rounded-xl bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm group-hover:border-${category.color.replace(
                  "text-",
                  ""
                )}/30 transition-all duration-300 h-full hover:shadow-xl hover:shadow-${category.color.replace(
                  "text-",
                  ""
                )}/5`}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className={`w-14 h-14 rounded-xl bg-gradient-to-br ${category.gradient} flex items-center justify-center text-white shadow-lg`}
                  >
                    {category.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-gray-900 group-hover:to-gray-600 dark:group-hover:from-white dark:group-hover:to-gray-300 transition-all duration-300">
                    {category.name}
                  </h3>
                </div>

                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  {category.description}
                </p>

                <ul className="space-y-3 mb-6">
                  {category.features.slice(0, 4).map((feature) => (
                    <li key={feature} className="flex items-start">
                      <div
                        className={`bg-gradient-to-r ${category.gradient} rounded-full p-1 mr-3 mt-0.5 shadow-md`}
                      >
                        <CheckCircle className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-gray-700 dark:text-gray-300">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Button
                  variant="link"
                  className={`px-0 ${category.color} hover:text-opacity-80 transition-colors flex items-center gap-1 mt-auto`}
                  onClick={() => setActiveTab(category.id)}
                >
                  <span>Learn more</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Section */}
        <motion.div
          className="relative mb-32 z-10"
          variants={item}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-gray-100/50 via-gray-200/50 to-gray-100/50 dark:from-gray-900/50 dark:via-gray-800/50 dark:to-gray-900/50 rounded-2xl transform -skew-y-1 scale-105 -z-10 blur-sm"></div>
          <div className="bg-white/40 dark:bg-gray-900/40 backdrop-blur-md rounded-2xl p-10 border border-gray-200 dark:border-gray-800 grid grid-cols-2 md:grid-cols-4 gap-8 relative overflow-hidden shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-blue-500/5 opacity-50"></div>

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
                ></motion.div>
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
                <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Testimonials */}
        <motion.div
          className="mb-32"
          variants={container}
          initial="hidden"
          animate="show"
        >
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
              Hear from teams who have transformed their workflows with Orbit
              Suite
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
                        i < testimonial.rating
                          ? "text-amber-400 fill-amber-400"
                          : "text-gray-300 dark:text-gray-600"
                      }`}
                    />
                  ))}
                </div>

                <div className="text-4xl text-red-500/20 mb-4">&quot;</div>
                <p className="text-gray-700 dark:text-gray-300 mb-8 relative z-10 text-lg leading-relaxed">
                  {testimonial.quote}
                </p>

                <div className="flex items-center gap-4 mt-auto">
                  <div className="w-14 h-14 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                    <img
                      src="/placeholder.svg"
                      alt={testimonial.author}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-medium text-lg text-gray-900 dark:text-white">
                      {testimonial.author}
                    </div>
                    <div className="text-gray-500">
                      {testimonial.role}, {testimonial.company}
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-800">
                  <img
                    src={testimonial.logo || "/placeholder.svg"}
                    alt={testimonial.company}
                    className="h-8 w-auto opacity-70"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Additional Features */}
        <motion.div
          className="mb-32"
          variants={item}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-16">
            <Badge className="mb-4 px-4 py-1.5 text-sm bg-gradient-to-r from-amber-500/20 to-amber-400/10 text-amber-400 border-amber-500/20">
              Comprehensive Platform
            </Badge>
            <h2 className="text-4xl font-bold mb-6 tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400">
                And So Much More...
              </span>
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg">
              From advanced permissions to custom automations, Orbit Suite has
              everything your team needs to succeed.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {additionalFeatures.map((feature, index) => (
              <motion.div
                key={feature.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className={`bg-gradient-to-br from-white/80 to-gray-50/40 dark:from-gray-900/80 dark:to-gray-900/40 backdrop-blur-sm border ${feature.border} rounded-xl p-6 hover:shadow-xl transition-all duration-300 group`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center ${feature.color} shadow-lg`}
                  >
                    {feature.icon}
                  </div>
                  <h3 className="font-medium text-lg text-gray-900 dark:text-white">
                    {feature.name}
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-[#ff0a0a] to-[#ff6b6b] hover:shadow-lg hover:shadow-red-500/20 transition-all duration-300 border-0 h-14 text-base font-medium"
            >
              <span className="flex items-center gap-2">
                See all features <ArrowRight className="w-5 h-5" />
              </span>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-gray-300 dark:border-gray-700 hover:text-gray-900 dark:hover:text-white hover:border-gray-400 dark:hover:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-900/50 transition-all duration-300 backdrop-blur-sm h-14 text-base font-medium"
            >
              Compare plans
            </Button>
          </div>
        </motion.div>

        {/* CTA section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-r from-red-50 mb-10 via-white to-white dark:from-red-900/30 dark:via-black dark:to-black p-12 rounded-2xl border border-gray-200 dark:border-gray-800 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center opacity-10"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 dark:via-black/50 to-transparent"></div>
          <div className="relative z-10">
            <h2 className="text-3xl text-gray-900 dark:text-white font-bold mb-6">
              Ready to Transform Your Workflow?
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              Join thousands of teams who have revolutionized their
              collaboration with Orbit Suite
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-[#ff0a0a] to-[#ff5252] hover:opacity-90 relative overflow-hidden"
              >
                <span className="relative z-10">Start Free 14-Day Trial</span>
                <motion.span className="absolute inset-0 bg-gradient-to-r from-[#ff5252] to-[#ff0a0a] opacity-0 hover:opacity-100 transition-opacity" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="relative overflow-hidden border-gray-300 text-gray-900 dark:border-white/20 dark:text-white"
              >
                <span className="relative z-10">Book a Demo</span>
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Free Trial Info */}
        <motion.div
          className="text-center"
          variants={item}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="inline-flex items-center gap-3 bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm border border-gray-200 dark:border-gray-800 rounded-full px-6 py-3 shadow-xl">
            <Star className="w-5 h-5 text-red-500" />
            <span className="text-gray-700 dark:text-gray-300">
              14-day free trial, no credit card required
            </span>
          </div>
        </motion.div>
      </section>
    </motion.main>
  );
}
