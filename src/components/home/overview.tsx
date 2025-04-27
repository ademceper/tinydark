"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ShineBorder } from "@/components/ui/shine-border";
import { InteractiveGrid } from "@/components/ui/interactive-grid";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import {
  ArrowRight,
  BarChart2,
  ChevronRight,
  ExternalLink,
  Layers,
  LayoutGrid,
  MessageSquare,
  Play,
  Quote,
  ThumbsUp,
  Users,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useDeviceType } from "@/hooks/use-breakpoint";
import Link from "next/link";

const stats = [
  {
    value: "10K+",
    label: "Global Enterprises",
    description: "Trusted by Fortune 500 companies worldwide",
    icon: <Users className="w-6 h-6" />,
    color: "from-blue-600 to-blue-400",
    glow: "rgba(59, 130, 246, 0.4)",
  },
  {
    value: "98%",
    label: "Client Retention",
    description: "Industry-leading customer satisfaction",
    icon: <ThumbsUp className="w-6 h-6" />,
    color: "from-emerald-600 to-emerald-400",
    glow: "rgba(16, 185, 129, 0.4)",
  },
  {
    value: "4.9/5",
    label: "Expert Rating",
    description: "Recognized by industry analysts",
    icon: <BarChart2 className="w-6 h-6" />,
    color: "from-amber-600 to-amber-400",
    glow: "rgba(245, 158, 11, 0.4)",
  },
  {
    value: "50+",
    label: "Countries Served",
    description: "Global presence across continents",
    icon: <Zap className="w-6 h-6" />,
    color: "from-violet-600 to-violet-400",
    glow: "rgba(139, 92, 246, 0.4)",
  },
];

const features = [
  {
    title: "Project Management",
    description:
      "Track tasks, set deadlines, and manage resources all in one place",
    image: "/placeholder.svg?height=200&width=300",
    icon: <Layers className="w-5 h-5" />,
    color: "from-pink-500 to-purple-500",
  },
  {
    title: "Team Collaboration",
    description:
      "Real-time document editing, commenting, and sharing with your team",
    image: "/placeholder.svg?height=200&width=300",
    icon: <Users className="w-5 h-5" />,
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "Visual Workspace",
    description:
      "Create diagrams, wireframes, and visual maps to bring ideas to life",
    image: "/placeholder.svg?height=200&width=300",
    icon: <LayoutGrid className="w-5 h-5" />,
    color: "from-amber-500 to-orange-500",
  },
  {
    title: "Integrated Communication",
    description:
      "Chat, video calls, and messaging integrated directly into your workflow",
    image: "/placeholder.svg?height=200&width=300",
    icon: <MessageSquare className="w-5 h-5" />,
    color: "from-green-500 to-emerald-500",
  },
];

const integrations = [
  {
    name: "Jira",
    icon: "/placeholder.svg?height=48&width=48",
    category: "Project Management",
  },
  {
    name: "Notion",
    icon: "/placeholder.svg?height=48&width=48",
    category: "Knowledge Base",
  },
  {
    name: "Slack",
    icon: "/placeholder.svg?height=48&width=48",
    category: "Communication",
  },
  {
    name: "Miro",
    icon: "/placeholder.svg?height=48&width=48",
    category: "Whiteboarding",
  },
  {
    name: "Canva",
    icon: "/placeholder.svg?height=48&width=48",
    category: "Design",
  },
  {
    name: "Figma",
    icon: "/placeholder.svg?height=48&width=48",
    category: "Design",
  },
  {
    name: "Google Docs",
    icon: "/placeholder.svg?height=48&width=48",
    category: "Documents",
  },
  {
    name: "Trello",
    icon: "/placeholder.svg?height=48&width=48",
    category: "Project Management",
  },
  {
    name: "Asana",
    icon: "/placeholder.svg?height=48&width=48",
    category: "Project Management",
  },
  {
    name: "Zoom",
    icon: "/placeholder.svg?height=48&width=48",
    category: "Communication",
  },
  {
    name: "Microsoft Teams",
    icon: "/placeholder.svg?height=48&width=48",
    category: "Communication",
  },
  {
    name: "GitHub",
    icon: "/placeholder.svg?height=48&width=48",
    category: "Development",
  },
  {
    name: "Dropbox",
    icon: "/placeholder.svg?height=48&width=48",
    category: "Storage",
  },
  {
    name: "Shopify",
    icon: "/placeholder.svg?height=48&width=48",
    category: "E-commerce",
  },
  {
    name: "Zapier",
    icon: "/placeholder.svg?height=48&width=48",
    category: "Automation",
  },
];

const testimonials = [
  {
    quote:
      "This platform transformed how our remote team collaborates. The real-time features are game-changing for our global operations.",
    author: "Sarah Johnson",
    role: "CTO at TechCorp",
    avatar: "/placeholder.svg?height=64&width=64",
    company: "/placeholder.svg?height=24&width=120",
  },
  {
    quote:
      "We've reduced meeting times by 40% since implementing this platform. The intuitive interface makes onboarding a breeze for new team members.",
    author: "Michael Chen",
    role: "Product Lead at DesignHub",
    avatar: "/placeholder.svg?height=64&width=64",
    company: "/placeholder.svg?height=24&width=120",
  },
  {
    quote:
      "The all-in-one approach eliminated our tool sprawl. Now we have everything in a single, powerful platform that's transformed our workflow.",
    author: "Emma Rodriguez",
    role: "CEO at CreativeLabs",
    avatar: "/placeholder.svg?height=64&width=64",
    company: "/placeholder.svg?height=24&width=120",
  },
];

const partners = [
  { name: "Tech Innovators", logo: "/placeholder.svg?height=40&width=120" },
  { name: "Creative Labs", logo: "/placeholder.svg?height=40&width=120" },
  { name: "Design Co.", logo: "/placeholder.svg?height=40&width=120" },
  { name: "Visionary Studios", logo: "/placeholder.svg?height=40&width=120" },
  { name: "Future Systems", logo: "/placeholder.svg?height=40&width=120" },
  { name: "Global Solutions", logo: "/placeholder.svg?height=40&width=120" },
];

const useCases = [
  {
    title: "Product Development",
    description:
      "Streamline your product development process from ideation to launch",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    title: "Marketing Campaigns",
    description:
      "Plan, execute, and analyze marketing campaigns in one workspace",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    title: "Design Projects",
    description:
      "Collaborate on design projects with real-time feedback and version control",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    title: "Remote Team Management",
    description: "Keep your remote team aligned, engaged, and productive",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    title: "Client Collaboration",
    description:
      "Create dedicated spaces for client collaboration and feedback",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    title: "Strategic Planning",
    description:
      "Develop and execute strategic plans with clear visibility and accountability",
    image: "/placeholder.svg?height=300&width=400",
  },
];

export default function Overview() {
  const heroRef = useRef(null);
  const statsRef = useRef(null);
  const featuresRef = useRef(null);
  const [activeIntegrationCategory, setActiveIntegrationCategory] = useState<
    string | null
  >(null);
  const [isVisible, setIsVisible] = useState(false);

  const deviceType = useDeviceType();
  const isMobile = deviceType === "mobile";
  const isTablet = deviceType === "tablet";
  const isDesktop = deviceType === "desktop";

  // Scroll animations
  const { scrollYProgress: heroScrollY } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const yHero = useTransform(heroScrollY, [0, 1], [0, -100]);

  const { scrollYProgress: statsScrollY } = useScroll({
    target: statsRef,
    offset: ["start end", "end start"],
  });
  const yStats = useTransform(statsScrollY, [0, 1], [100, -50]);
  const opacityStats = useTransform(
    statsScrollY,
    [0, 0.2, 0.8, 1],
    [0, 1, 1, 0]
  );

  const { scrollYProgress: featuresScrollY } = useScroll({
    target: featuresRef,
    offset: ["start end", "center center"],
  });
  const yFeatures = useTransform(featuresScrollY, [0, 1], [100, 0]);
  const opacityFeatures = useTransform(featuresScrollY, [0, 0.5], [0, 1]);

  // Animation variants
  const containerVariant = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 },
    },
  };

  const itemVariant = {
    hidden: { opacity: 0, y: 80, scale: 0.85 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", damping: 10, stiffness: 120, mass: 0.4 },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 70,
      },
    },
  };

  // Filter integrations by category
  const filteredIntegrations = activeIntegrationCategory
    ? integrations.filter(
        (integration) => integration.category === activeIntegrationCategory
      )
    : integrations;

  // Get unique categories
  const integrationCategories = Array.from(
    new Set(integrations.map((integration) => integration.category))
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Determine grid columns based on device type
  const getGridCols = (section: string) => {
    if (section === "features") {
      return isMobile
        ? "grid-cols-1"
        : isTablet
        ? "grid-cols-2"
        : "grid-cols-4";
    } else if (section === "integrations") {
      return isMobile
        ? "grid-cols-2"
        : isTablet
        ? "grid-cols-3"
        : "grid-cols-5";
    } else if (section === "useCases") {
      return isMobile
        ? "grid-cols-1"
        : isTablet
        ? "grid-cols-2"
        : "grid-cols-3";
    } else if (section === "testimonials") {
      return isMobile ? "grid-cols-1" : "grid-cols-3";
    }
    return "grid-cols-1";
  };

  // Determine number of particles based on device type
  const particleCount = isMobile ? 8 : isTablet ? 15 : 20;

  // Determine grid points based on device type
  const gridPoints = isMobile ? 20 : isTablet ? 30 : 40;

  return (
    <main className="bg-gradient-to-b from-white via-gray-50 to-white text-gray-900 overflow-hidden dark:from-black dark:via-gray-950 dark:to-black dark:text-white">
      {/* Floating orbs background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-32 sm:w-48 md:w-64 h-32 sm:h-48 md:h-64 rounded-full bg-gradient-to-r from-red-500/20 to-transparent blur-3xl animate-float1 dark:from-red-500/20"></div>
        <div className="absolute top-1/3 right-1/4 w-48 sm:w-64 md:w-96 h-48 sm:h-64 md:h-96 rounded-full bg-gradient-to-b from-blue-500/10 to-transparent blur-3xl animate-float2 dark:from-blue-500/10"></div>
        <div className="absolute bottom-1/4 left-1/2 w-40 sm:w-64 md:w-80 h-40 sm:h-64 md:h-80 rounded-full bg-gradient-to-l from-purple-500/15 to-transparent blur-3xl animate-float3 dark:from-purple-500/15"></div>
      </div>

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-screen overflow-hidden pt-10 sm:pt-16 md:pt-20 pb-16 sm:pb-24 md:pb-32"
      >
        <InteractiveGrid
          containerClassName="absolute inset-0"
          className="opacity-30 dark:opacity-30"
          points={gridPoints}
        />

        {/* Animated particles */}
        {[...Array(particleCount)].map((_, i) => {
          const size = Math.random() * 8 + 4;
          return (
            <motion.div
              key={i}
              className="absolute rounded-full bg-[#ff0a0a] dark:bg-[#ff0a0a]"
              initial={{
                opacity: 0,
                x: Math.random() * 100 - 50,
                y: Math.random() * 100 - 50,
                scale: Math.random() * 0.5 + 0.3,
              }}
              animate={{
                opacity: [0, 0.7, 0],
                x: Math.random() * 300 - 150,
                y: Math.random() * 300 - 150,
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: Math.random() * 10 + 6,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                delay: i * 0.3,
              }}
              style={{
                width: `${size}px`,
                height: `${size}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                filter: "blur(1px)",
                mixBlendMode: "screen",
              }}
            />
          );
        })}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6"
        >
          <ShineBorder
            className="relative"
            borderClassName="border border-gray-200 dark:border-white/10 rounded-xl overflow-hidden"
          >
            <motion.div
              className="text-center mb-8 sm:mb-12 md:mb-16 pt-8 sm:pt-12 md:pt-16 px-4 md:px-8"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="flex justify-center mb-4 sm:mb-6"
              >
                <span className="px-3 sm:px-4 py-1 sm:py-1.5 bg-gray-100/80 dark:bg-white/10 backdrop-blur-sm rounded-full text-xs sm:text-sm font-medium text-gray-800 dark:text-white/80 border border-gray-200 dark:border-white/20">
                  Introducing the Ultimate Collaboration Platform
                </span>
              </motion.div>

              <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold mb-4 sm:mb-6 tracking-tight">
                <motion.span
                  className="block text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-400 dark:from-[#ff0a0a] dark:to-[#fefefe]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <motion.span
                    className="inline-block"
                    style={{ textShadow: "0 0 7.5px rgba(239, 68, 68, 0.2)" }}
                  >
                    All-in-One Workspace
                  </motion.span>
                </motion.span>
                <motion.span
                  className="block text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 dark:from-white dark:via-white/80 dark:to-white/60 mt-1 sm:mt-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  For Your Team&apos;s Success
                </motion.span>
              </h1>

              <motion.p
                className="text-gray-700 dark:text-gray-300 text-base sm:text-lg md:text-xl mb-6 sm:mb-8 md:mb-10 max-w-3xl mx-auto leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                Transform the way your team collaborates with our all-in-one
                platform. Combine the power of Jira, Notion, Miro, Slack, Figma,
                and more in a single, seamless workspace.
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center mb-8 sm:mb-10 md:mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1 }}
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
                  className="border-gray-700 hover:text-white hover:border-gray-600 hover:bg-gray-900/50 transition-all duration-300 backdrop-blur-sm h-14 text-base font-medium flex items-center gap-2"
                >
                  <Play className="w-5 h-5" />
                  Watch Demo
                </Button>
              </motion.div>
            </motion.div>

            <ShineBorder
              className="relative mx-auto"
              borderClassName="border border-gray-200 dark:border-white/10 rounded-xl overflow-hidden"
            >
              <motion.div
                className="relative"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 1 }}
              >
                <motion.div style={{ y: yHero }}>
                  <Image
                    src="/heroimage.webp"
                    alt="Platform Overview"
                    width={1920}
                    height={1080}
                    className="w-full h-auto object-cover"
                    priority
                  />
                </motion.div>

                <motion.div
                  className="absolute inset-0 flex items-end justify-center pb-8 sm:pb-12 md:pb-16"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 1.2 }}
                >
                  {!isMobile && (
                    <div className="bg-white/20 dark:bg-black/20 backdrop-blur-sm p-2 sm:p-4 rounded-xl w-[90%] h-[60%] sm:h-[70%] flex flex-col sm:flex-row gap-2 sm:gap-4">
                      <motion.div
                        className="flex-1"
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.6, delay: 1.4 }}
                        whileHover={{ scale: 1.02 }}
                      >
                        <Image
                          src="/browser.webp"
                          alt="Dashboard View"
                          width={800}
                          height={600}
                          className="w-full h-full object-cover rounded-lg"
                          priority
                        />
                      </motion.div>

                      <motion.div
                        className="flex-1"
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.6, delay: 1.6 }}
                        whileHover={{ scale: 1.02 }}
                      >
                        <Image
                          src="/editor.webp"
                          alt="Collaboration View"
                          width={800}
                          height={600}
                          className="w-full h-full object-cover rounded-lg"
                          priority
                        />
                      </motion.div>
                    </div>
                  )}
                </motion.div>
              </motion.div>
            </ShineBorder>
          </ShineBorder>
        </motion.div>
      </section>

      {/* Features Section */}
      <section
        ref={featuresRef}
        className="py-16 sm:py-24 md:py-32 relative overflow-hidden"
      >
        <motion.div
          className="max-w-7xl mx-auto px-4 sm:px-6"
          style={{ opacity: opacityFeatures, y: yFeatures }}
        >
          <motion.div
            className="text-center mb-12 sm:mb-16 md:mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.span
              className="inline-block px-3 sm:px-4 py-1 sm:py-1.5 mb-4 sm:mb-6 text-xs sm:text-sm font-medium text-white bg-gradient-to-r from-red-600/20 to-red-400/20 rounded-full border border-red-500/30"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Powerful Features
            </motion.span>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-white/70">
                Everything Your Team Needs
              </span>
            </h2>

            <p className="text-base sm:text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
              Combine the best features from your favorite tools into one
              seamless platform
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className={`grid ${getGridCols("features")} gap-6 sm:gap-8`}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className="group"
              >
                <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-900/80 dark:to-gray-900/40 border border-gray-200 dark:border-gray-800/50 rounded-2xl p-5 sm:p-6 h-full backdrop-blur-sm relative overflow-hidden">
                  {/* Gradient background that appears on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 opacity-0 group-hover:opacity-10 transition-opacity duration-500 -z-10" />

                  {/* Feature icon with gradient background */}
                  <div
                    className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg mb-4 sm:mb-5 flex items-center justify-center bg-gradient-to-br ${feature.color} text-white`}
                  >
                    {feature.icon}
                  </div>

                  <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-gray-900 dark:text-white group-hover:text-gray-800 dark:group-hover:text-white/90 transition-colors">
                    {feature.title}
                  </h3>

                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors">
                    {feature.description}
                  </p>

                  <motion.div
                    className="mt-4 sm:mt-6 flex items-center text-red-600 dark:text-red-400 font-medium"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    <Link href="#">Learn more</Link>
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{
                        duration: 1.5,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "loop",
                      }}
                    >
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </motion.span>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Integrations Section */}
      <section className="py-16 sm:py-24 md:py-32 relative overflow-hidden bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            className="text-center mb-10 sm:mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.span
              className="inline-block px-3 sm:px-4 py-1 sm:py-1.5 mb-4 sm:mb-6 text-xs sm:text-sm font-medium text-white bg-gradient-to-r from-blue-500/20 to-blue-400/20 rounded-full border border-blue-500/30"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Seamless Integrations
            </motion.span>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-white/70">
                Connect With Your Favorite Tools
              </span>
            </h2>

            <p className="text-base sm:text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
              Our platform integrates with the tools your team already loves,
              creating a unified workspace
            </p>
          </motion.div>

          {/* Integration category filter */}
          <motion.div
            className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Button
              variant={
                activeIntegrationCategory === null ? "default" : "outline"
              }
              className={cn(
                "rounded-full text-xs sm:text-sm",
                activeIntegrationCategory === null
                  ? "bg-gray-900 text-white hover:bg-gray-800 dark:bg-white/10 dark:text-white dark:hover:bg-white/20"
                  : "border-gray-300 text-gray-900 hover:bg-gray-100 dark:border-white/20 dark:text-white dark:hover:bg-white/10"
              )}
              onClick={() => setActiveIntegrationCategory(null)}
            >
              All
            </Button>
            {integrationCategories.map((category, index) => (
              <Button
                key={index}
                variant={
                  activeIntegrationCategory === category ? "default" : "outline"
                }
                className={cn(
                  "rounded-full text-xs sm:text-sm",
                  activeIntegrationCategory === category
                    ? "bg-gray-900 text-white hover:bg-gray-800 dark:bg-white/10 dark:text-white dark:hover:bg-white/20"
                    : "border-gray-300 text-gray-900 hover:bg-gray-100 dark:border-white/20 dark:text-white dark:hover:bg-white/10"
                )}
                onClick={() => setActiveIntegrationCategory(category)}
              >
                {category}
              </Button>
            ))}
          </motion.div>

          <motion.div
            className={`grid ${getGridCols(
              "integrations"
            )} gap-4 sm:gap-6 md:gap-8`}
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {filteredIntegrations.map((integration, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -5, scale: 1.05 }}
                className="bg-white dark:bg-white/5 text-gray-900 dark:text-white backdrop-blur-sm border border-gray-200 dark:border-white/10 rounded-xl p-3 sm:p-4 flex flex-col items-center justify-center transition-all duration-300 hover:border-gray-300 hover:shadow-md dark:hover:border-white/20 dark:hover:bg-white/10"
              >
                <Image
                  src={integration.icon || "/placeholder.svg"}
                  alt={integration.name}
                  width={48}
                  height={48}
                  className="mb-2 sm:mb-3 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12"
                />
                <p className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white">
                  {integration.name}
                </p>
                <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">
                  {integration.category}
                </p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="mt-10 sm:mt-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Button
              variant="outline"
              className="border-gray-300 text-gray-900 hover:bg-gray-100 dark:border-white/20 dark:text-white dark:hover:bg-white/10"
            >
              View All Integrations
              <ExternalLink className="ml-2 h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-16 sm:py-24 md:py-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            className="text-center mb-12 sm:mb-16 md:mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.span
              className="inline-block px-3 sm:px-4 py-1 sm:py-1.5 mb-4 sm:mb-6 text-xs sm:text-sm font-medium text-white bg-gradient-to-r from-purple-600/20 to-purple-400/20 rounded-full border border-purple-500/30"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Success Stories
            </motion.span>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-white/70">
                Transforming How Teams Work
              </span>
            </h2>

            <p className="text-base sm:text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
              See how teams across industries use our platform to achieve their
              goals
            </p>
          </motion.div>

          <motion.div
            className={`grid ${getGridCols("useCases")} gap-6 sm:gap-8`}
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
          >
            {useCases.slice(0, isMobile ? 3 : 6).map((useCase, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -10 }}
                className="group"
              >
                <div className="bg-white dark:bg-gradient-to-br dark:from-gray-900/80 dark:to-gray-900/40 border border-gray-200 dark:border-gray-800/50 rounded-2xl overflow-hidden h-full shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="relative overflow-hidden">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Image
                        src={useCase.image || "/placeholder.svg"}
                        alt={useCase.title}
                        width={400}
                        height={300}
                        className="w-full aspect-video object-cover"
                      />
                    </motion.div>
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                      <div className="p-4 sm:p-6">
                        <Button
                          variant="outline"
                          size="sm"
                          className="bg-black/50 border-white/30 text-white dark:bg-black/50 dark:border-white/30 dark:text-white"
                        >
                          View Case Study
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                      {useCase.title}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
                      {useCase.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {isMobile && (
            <div className="mt-8 text-center">
              <Button
                variant="outline"
                className="border-gray-300 text-gray-900 hover:bg-gray-100 dark:border-white/20 dark:text-white dark:hover:bg-white/10"
              >
                View More Use Cases
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 sm:py-24 md:py-32 bg-gray-50 dark:bg-gradient-to-b dark:from-black dark:to-gray-900/50 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-red-500/5 via-transparent to-blue-500/5"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <motion.div
            className="text-center mb-12 sm:mb-16 md:mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.span
              className="inline-block px-3 sm:px-4 py-1 sm:py-1.5 mb-4 sm:mb-6 text-xs sm:text-sm font-medium text-white bg-gradient-to-r from-amber-600/20 to-amber-400/20 rounded-full border border-amber-500/30"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Customer Stories
            </motion.span>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-white/70">
                Loved by Teams Worldwide
              </span>
            </h2>

            <p className="text-base sm:text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
              Hear what our customers have to say about their experience
            </p>
          </motion.div>

          <motion.div
            className={`grid ${getGridCols("testimonials")} gap-6 sm:gap-8`}
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className="bg-white dark:bg-white/5 backdrop-blur-sm p-6 sm:p-8 rounded-xl border border-gray-200 dark:border-white/10 hover:border-red-500/30 hover:shadow-md transition-all duration-300 h-full flex flex-col dark:hover:border-red-500/30"
              >
                <Quote className="w-8 h-8 sm:w-10 sm:h-10 text-red-500 rotate-180 mb-4 sm:mb-6 opacity-70" />
                <p className="text-base sm:text-lg text-gray-700 dark:text-white/90 mb-6 sm:mb-8 flex-grow">
                  {testimonial.quote}
                </p>
                <div className="flex items-center">
                  <Image
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.author}
                    width={48}
                    height={48}
                    className="rounded-full border-2 border-gray-200 dark:border-white/20 mr-3 sm:mr-4 w-10 h-10 sm:w-12 sm:h-12"
                  />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white text-sm sm:text-base">
                      {testimonial.author}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-white/60">
                      {testimonial.role}
                    </p>
                  </div>
                  {!isMobile && (
                    <Image
                      src={testimonial.company || "/placeholder.svg"}
                      alt="Company logo"
                      width={120}
                      height={24}
                      className="ml-auto opacity-70 hidden sm:block"
                    />
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-red-500/5 via-transparent to-blue-500/5"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] rounded-full bg-radial-gradient from-gray-100/30 to-transparent dark:from-white/5 dark:to-transparent animate-pulse-slow"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white dark:bg-gradient-to-br dark:from-gray-900/80 dark:to-gray-900/40 border border-gray-200 dark:border-white/10 rounded-2xl p-6 sm:p-8 md:p-12 backdrop-blur-sm shadow-lg"
          >
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 sm:mb-6"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-white/70">
                Ready to transform your team&apos;s collaboration?
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-white/70 max-w-3xl mx-auto mb-6 sm:mb-8 md:mb-10"
            >
              Join thousands of teams who are already working smarter with our
              all-in-one platform.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-red-600 to-red-400 hover:from-red-500 hover:to-red-300 text-white px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg h-auto"
              >
                Get Started for Free
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-gray-300 hover:bg-gray-100 text-gray-900 hover:text-gray-900 px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg h-auto dark:border-white/20 dark:text-white dark:hover:bg-white/10 dark:hover:text-white"
              >
                Book a Demo
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
