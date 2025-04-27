"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Globe,
  Users,
  Rocket,
  Palette,
  CheckCircle,
  MessageSquare,
  Building,
  Briefcase,
  BarChart,
  Shield,
  Zap,
  ChevronRight,
  Star,
  ArrowUpRight,
  Clock,
  Check,
} from "lucide-react";
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

const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};

export default function SolutionsPage() {
  const controls = useAnimation();
  const [activeSolution, setActiveSolution] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("enterprise");
  const industriesRef = useRef(null);
  const [ref, inView] = useInView({ threshold: 0.1 });
  const [scrollY, setScrollY] = useState(0)
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

  const solutions = [
    {
      id: "enterprise",
      title: "Enterprise Collaboration",
      description:
        "Secure, scalable solution for large organizations with advanced compliance needs",
      icon: <Building className="w-6 h-6" />,
      features: [
        "SOC 2 Compliance",
        "Advanced permissions",
        "Enterprise-grade security",
        "Dedicated support",
      ],
      bg: "from-red-500 to-red-600",
      color: "text-red-500",
      borderColor: "border-red-500/20",
      shadowColor: "shadow-red-500/10",
      gradient: "bg-gradient-to-r from-red-500 to-red-600",
      longDescription:
        "Designed for large organizations with complex security and compliance requirements. Our enterprise solution provides the tools and controls needed to manage large teams while maintaining the highest security standards.",
      benefits: [
        "Centralized team management",
        "Advanced security controls",
        "Custom integrations",
        "Dedicated support team",
        "Compliance reporting",
        "Audit logs",
      ],
      stats: [
        { value: "99.99%", label: "Uptime SLA" },
        { value: "24/7", label: "Dedicated Support" },
        { value: "100%", label: "SOC 2 Compliant" },
      ],
      caseStudy: {
        company: "Global Financial Services",
        logo: "/placeholder.svg?height=60&width=120",
        quote:
          "Orbit Suite's enterprise solution helped us unify our global operations while meeting strict compliance requirements.",
        author: "Sarah Johnson, CTO",
      },
    },
    {
      id: "remote",
      title: "Remote Teams",
      description:
        "Everything distributed teams need to stay connected across timezones",
      icon: <Globe className="w-6 h-6" />,
      features: [
        "Async communication",
        "Timezone management",
        "Video messaging",
        "Document collaboration",
      ],
      bg: "from-blue-500 to-blue-600",
      color: "text-blue-500",
      borderColor: "border-blue-500/20",
      shadowColor: "shadow-blue-500/10",
      gradient: "bg-gradient-to-r from-blue-500 to-blue-600",
      longDescription:
        "Built for teams that work across different locations and time zones. Our remote team solution focuses on asynchronous communication, timezone management, and tools that help maintain team cohesion regardless of physical location.",
      benefits: [
        "Timezone-aware scheduling",
        "Asynchronous workflows",
        "Global team directory",
        "Cultural integration tools",
        "Remote onboarding",
        "Virtual team building",
      ],
      stats: [
        { value: "32%", label: "Productivity Increase" },
        { value: "12+", label: "Timezone Support" },
        { value: "5x", label: "Faster Onboarding" },
      ],
      caseStudy: {
        company: "TechGlobal",
        logo: "/placeholder.svg?height=60&width=120",
        quote:
          "With teams across 8 countries, Orbit Suite's remote solution has been essential for maintaining our collaborative culture.",
        author: "Michael Chen, Head of Remote",
      },
    },
    {
      id: "startup",
      title: "Startups",
      description: "Fast-moving teams that need to stay aligned as they scale",
      icon: <Rocket className="w-6 h-6" />,
      features: [
        "Rapid onboarding",
        "Scalable infrastructure",
        "Investor reporting",
        "Growth analytics",
      ],
      bg: "from-green-500 to-green-600",
      color: "text-green-500",
      borderColor: "border-green-500/20",
      shadowColor: "shadow-green-500/10",
      gradient: "bg-gradient-to-r from-green-500 to-green-600",
      longDescription:
        "Perfect for fast-growing companies that need to move quickly while keeping everyone aligned. Our startup solution provides the flexibility and scalability needed to adapt as your team and business evolve.",
      benefits: [
        "Flexible team structures",
        "Investor dashboards",
        "Growth metrics",
        "Quick onboarding",
        "Fundraising tools",
        "Milestone tracking",
      ],
      stats: [
        { value: "3x", label: "Faster Decision Making" },
        { value: "87%", label: "Team Alignment" },
        { value: "40%", label: "Time Saved on Reporting" },
      ],
      caseStudy: {
        company: "NextGen AI",
        logo: "/placeholder.svg?height=60&width=120",
        quote:
          "As we grew from 5 to 50 people in 6 months, Orbit Suite kept our team aligned and our investors informed.",
        author: "Alex Rivera, Founder & CEO",
      },
    },
    {
      id: "creative",
      title: "Creative Agencies",
      description: "Client work and creative collaboration made seamless",
      icon: <Palette className="w-6 h-6" />,
      features: [
        "Client portals",
        "Creative tools",
        "Asset management",
        "Feedback workflows",
      ],
      bg: "from-yellow-500 to-yellow-600",
      color: "text-yellow-500",
      borderColor: "border-yellow-500/20",
      shadowColor: "shadow-yellow-500/10",
      gradient: "bg-gradient-to-r from-yellow-500 to-yellow-600",
      longDescription:
        "Tailored for creative teams working with multiple clients and projects. Our agency solution streamlines client communication, creative feedback, and asset management to help deliver exceptional work on time.",
      benefits: [
        "Client collaboration portals",
        "Visual feedback tools",
        "Asset organization",
        "Project timelines",
        "Creative briefs",
        "Approval workflows",
      ],
      stats: [
        { value: "40%", label: "Faster Approvals" },
        { value: "60%", label: "Less Revision Rounds" },
        { value: "25%", label: "More Projects Delivered" },
      ],
      caseStudy: {
        company: "Creative Collective",
        logo: "/placeholder.svg?height=60&width=120",
        quote:
          "Our clients love the transparency and our team loves the streamlined workflows. Win-win for everyone.",
        author: "Emma Rodriguez, Creative Director",
      },
    },
  ];

  const industries = [
    {
      name: "Technology",
      icon: <Zap className="w-5 h-5" />,
      description: "Software companies, SaaS providers, and tech startups",
      color: "text-blue-400",
      gradient: "from-blue-500/20 to-blue-400/10",
      border: "border-blue-500/20",
    },
    {
      name: "Finance",
      icon: <BarChart className="w-5 h-5" />,
      description: "Banks, investment firms, and financial service providers",
      color: "text-green-400",
      gradient: "from-green-500/20 to-green-400/10",
      border: "border-green-500/20",
    },
    {
      name: "Healthcare",
      icon: <Shield className="w-5 h-5" />,
      description: "Hospitals, clinics, and healthcare technology companies",
      color: "text-red-400",
      gradient: "from-red-500/20 to-red-400/10",
      border: "border-red-500/20",
    },
    {
      name: "Education",
      icon: <Building className="w-5 h-5" />,
      description: "Universities, schools, and educational technology",
      color: "text-purple-400",
      gradient: "from-purple-500/20 to-purple-400/10",
      border: "border-purple-500/20",
    },
    {
      name: "Professional Services",
      icon: <Briefcase className="w-5 h-5" />,
      description: "Consulting firms, legal practices, and service providers",
      color: "text-amber-400",
      gradient: "from-amber-500/20 to-amber-400/10",
      border: "border-amber-500/20",
    },
    {
      name: "Media & Entertainment",
      icon: <MessageSquare className="w-5 h-5" />,
      description: "Production companies, studios, and media organizations",
      color: "text-pink-400",
      gradient: "from-pink-500/20 to-pink-400/10",
      border: "border-pink-500/20",
    },
  ];

  const testimonials = [
    {
      quote:
        "Orbit Suite transformed how our global team collaborates. The async features are game-changing.",
      author: "Sarah K.",
      role: "Director of Remote Work",
      company: "TechCorp",
      avatar: "/placeholder.svg?height=80&width=80",
      rating: 5,
      logo: "/placeholder.svg?height=40&width=120",
    },
    {
      quote:
        "As a fast-growing startup, we needed tools that could scale with us. Orbit was the perfect fit.",
      author: "Michael T.",
      role: "CEO",
      company: "NextGen AI",
      avatar: "/placeholder.svg?height=80&width=80",
      rating: 5,
      logo: "/placeholder.svg?height=40&width=120",
    },
    {
      quote:
        "The client portal feature has completely transformed how we collaborate with our customers.",
      author: "Emma R.",
      role: "Creative Director",
      company: "Design Studio",
      avatar: "/placeholder.svg?height=80&width=80",
      rating: 5,
      logo: "/placeholder.svg?height=40&width=120",
    },
  ];

  const caseStudies = [
    {
      title: "TechCorp",
      category: "Enterprise",
      categoryColor: "text-red-400",
      description:
        "How TechCorp unified their global team of 5,000+ employees with Orbit Suite's enterprise solution.",
      image: "/placeholder.svg?height=192&width=384",
      stats: [
        { value: "30%", label: "Increase in Productivity" },
        { value: "45%", label: "Reduction in Meetings" },
      ],
    },
    {
      title: "NextGen AI",
      category: "Startup",
      categoryColor: "text-green-400",
      description:
        "How NextGen AI scaled from 10 to 150 employees while maintaining alignment and velocity.",
      image: "/placeholder.svg?height=192&width=384",
      stats: [
        { value: "3x", label: "Faster Onboarding" },
        { value: "87%", label: "Team Alignment" },
      ],
    },
    {
      title: "Creative Co",
      category: "Agency",
      categoryColor: "text-yellow-400",
      description:
        "How Creative Co improved client satisfaction by 40% with streamlined feedback workflows.",
      image: "/placeholder.svg?height=192&width=384",
      stats: [
        { value: "40%", label: "Client Satisfaction" },
        { value: "60%", label: "Faster Approvals" },
      ],
    },
  ];

  const activeSolutionData =
    solutions.find((s) => s.id === activeTab) || solutions[0];

  return (
    <motion.main
      initial="hidden"
      animate="show"
      variants={container}
      className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white dark:from-black dark:via-gray-900 dark:to-black pt-32 overflow-hidden"
    >
      {/* Background elements */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none opacity-30">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent opacity-40 dark:from-purple-900/20 dark:via-transparent dark:to-transparent"></div>
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
            Tailored for your industry
          </motion.div>

          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6 tracking-tight"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#ff0a0a] to-[#ff6b6b]">
              Solutions
            </span>{" "}
            <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600 dark:from-[#fefefe] dark:to-[#a0a0a0]">
              for Every Team
            </span>
          </motion.h1>

          <motion.p
            className="text-gray-600 dark:text-gray-300 text-lg md:text-xl mb-10 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Orbit Suite adapts to your team&apos;s unique workflow, with
            specialized solutions designed for different industries and work
            styles. Find the perfect fit for your organization.
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
                Compare all solutions{" "}
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </span>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-gray-300 dark:border-gray-700 hover:text-gray-900 dark:hover:text-white hover:border-gray-400 dark:hover:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-900/50 transition-all duration-300 backdrop-blur-sm h-14 text-base font-medium"
            >
              Book a demo
            </Button>
          </motion.div>
        </motion.div>

        {/* Solutions Tabs */}
        <motion.div
          className="mb-16"
          variants={item}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex justify-center mb-8 overflow-x-auto pb-2 hide-scrollbar">
            <div className="inline-flex bg-gray-100/70 dark:bg-gray-900/70 backdrop-blur-md rounded-full p-1.5 border border-gray-200 dark:border-gray-800 shadow-xl">
              {solutions.map((solution) => (
                <button
                  key={solution.id}
                  onClick={() => setActiveTab(solution.id)}
                  className={`relative px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeTab === solution.id
                      ? "text-white"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  }`}
                >
                  {activeTab === solution.id && (
                    <motion.div
                      layoutId="activeTab"
                      className={`absolute inset-0 rounded-full ${solution.gradient} opacity-90`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                  <span className="relative flex text-gray-500 dark:text-white items-center gap-2">
                    {solution.icon}
                    {solution.title}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Active Solution Detail */}
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
                className={`mb-4 px-4 py-1.5 text-sm bg-gradient-to-r ${activeSolutionData.bg
                  .replace("from-", "from-")
                  .replace("to-", "to-")}/20 ${
                  activeSolutionData.color
                } border-${activeSolutionData.color.replace("text-", "")}/20`}
              >
                {activeSolutionData.title}
              </Badge>
              <h2 className="text-4xl font-bold mb-6 tracking-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400">
                  {activeSolutionData.title} Solution
                </span>
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-lg mb-8 leading-relaxed">
                {activeSolutionData.longDescription}
              </p>

              <div className="grid grid-cols-3 gap-4 mb-8">
                {activeSolutionData.stats.map((stat, index) => (
                  <div
                    key={index}
                    className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200 dark:border-gray-800 rounded-xl p-4 text-center"
                  >
                    <div
                      className={`text-2xl font-bold mb-1 ${activeSolutionData.color}`}
                    >
                      {stat.value}
                    </div>
                    <div className="text-gray-500 dark:text-gray-400 text-sm">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3 mb-8">
                {activeSolutionData.features.map((feature) => (
                  <div
                    key={feature}
                    className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200 dark:border-gray-800 rounded-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 flex items-center gap-2"
                  >
                    <div
                      className={`w-2 h-2 rounded-full ${activeSolutionData.gradient}`}
                    />
                    {feature}
                  </div>
                ))}
              </div>

              <Button
                className={`${
                  activeSolutionData.gradient
                } hover:shadow-lg hover:shadow-${activeSolutionData.color.replace(
                  "text-",
                  ""
                )}/20 text-white transition-all duration-300 border-0`}
              >
                <span className="flex items-center gap-2">
                  Learn more about {activeSolutionData.title}
                  <ArrowRight className="w-4 h-4" />
                </span>
              </Button>
            </div>

            <div className="relative">
              <div
                className={`absolute inset-0 bg-gradient-to-br ${activeSolutionData.bg
                  .replace("from-", "from-")
                  .replace("to-", "to-")}/10 rounded-xl blur-xl -z-10`}
              ></div>
              <div className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200 dark:border-gray-800 rounded-xl p-8 shadow-xl">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700">
                    <img
                      src={
                        activeSolutionData.caseStudy.logo || "/placeholder.svg"
                      }
                      alt={activeSolutionData.caseStudy.company}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {activeSolutionData.caseStudy.company}
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400">
                      Case Study
                    </p>
                  </div>
                </div>

                <div className="text-4xl text-gray-300 dark:text-gray-700 mb-4">
                  &apos;
                </div>
                <p className="text-gray-700 dark:text-gray-300 text-lg mb-6 italic">
                  {activeSolutionData.caseStudy.quote}
                </p>
                <p className="text-gray-500 dark:text-gray-400">
                  {activeSolutionData.caseStudy.author}
                </p>

                <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800">
                  <h4 className="font-medium mb-4 text-gray-900 dark:text-white">
                    Key Benefits
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    {activeSolutionData.benefits
                      .slice(0, 6)
                      .map((benefit, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <div
                            className={`p-1 rounded-full ${activeSolutionData.gradient} mt-0.5`}
                          >
                            <Check className="w-3 h-3 text-white" />
                          </div>
                          <span className="text-gray-700 dark:text-gray-300 text-sm">
                            {benefit}
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Solutions Grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-32"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {solutions.map((solution, index) => (
            <motion.div
              key={solution.title}
              variants={item}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className="relative overflow-hidden text-gray-900 dark:text-white group"
              onMouseEnter={() => setActiveSolution(solution.title)}
              onMouseLeave={() => setActiveSolution(null)}
            >
              {/* Glow effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10">
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${solution.bg
                    .replace("from-", "from-")
                    .replace("to-", "to-")}/20 rounded-xl blur-xl`}
                ></div>
              </div>

              <div
                className={`p-8 border border-gray-200 dark:border-gray-800 rounded-xl bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm group-hover:border-${solution.color.replace(
                  "text-",
                  ""
                )}/30 transition-all duration-300 h-full flex flex-col hover:shadow-xl hover:shadow-${solution.color.replace(
                  "text-",
                  ""
                )}/5`}
              >
                <div
                  className={`w-14 h-14 rounded-xl ${solution.gradient} flex items-center justify-center text-white mb-6 shadow-lg`}
                >
                  {solution.icon}
                </div>

                <h3 className="text-xl font-semibold mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-gray-900 group-hover:to-gray-600 dark:group-hover:from-white dark:group-hover:to-gray-300 transition-all duration-300">
                  {solution.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  {solution.description}
                </p>

                <ul className="space-y-3 mb-6 flex-grow">
                  {solution.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <div
                        className={`${solution.gradient} rounded-full p-1 mr-3 mt-0.5 shadow-md`}
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
                  className={`px-0 ${solution.color} hover:text-opacity-80 transition-colors flex items-center gap-1 mt-auto`}
                  onClick={() => setActiveTab(solution.id)}
                >
                  <span>Learn more</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Custom Solution Section */}
        <motion.div
          className="mb-32"
          variants={item}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-gradient-to-br from-gray-50/80 to-white/40 dark:from-gray-900/80 dark:to-gray-900/40 backdrop-blur-md rounded-2xl p-10 border border-gray-200 dark:border-gray-800 relative overflow-hidden shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-blue-500/5 opacity-50 -z-10"></div>
            <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-red-500/10 blur-3xl -z-10"></div>

            <div className="relative z-10">
              <div className="text-center mb-12">
                <Badge className="mb-4 px-4 py-1.5 text-sm bg-gradient-to-r from-purple-500/20 to-purple-400/10 text-purple-400 border-purple-500/20">
                  Enterprise Solutions
                </Badge>
                <h2 className="text-4xl font-bold mb-6 tracking-tight">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400">
                    Need a custom solution?
                  </span>
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto text-lg">
                  Our team can tailor Orbit Suite to your organization&apos;s
                  specific requirements with custom workflows, integrations, and
                  security configurations.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
                <motion.div
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-200 dark:border-gray-800 hover:border-red-500/30 transition-all duration-300 hover:shadow-xl"
                >
                  <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center text-red-500 mb-4">
                    <Users className="w-5 h-5" />
                  </div>
                  <h3 className="font-medium text-gray-900 dark:text-white text-lg mb-2">
                    Custom Workflows
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Tailored processes that match exactly how your team works
                  </p>
                </motion.div>

                <motion.div
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-200 dark:border-gray-800 hover:border-red-500/30 transition-all duration-300 hover:shadow-xl"
                >
                  <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center text-red-500 mb-4">
                    <Zap className="w-5 h-5" />
                  </div>
                  <h3 className="font-medium text-gray-900 dark:text-white text-lg mb-2">
                    Enterprise Integrations
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Connect with your existing enterprise software stack
                  </p>
                </motion.div>

                <motion.div
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-200 dark:border-gray-800 hover:border-red-500/30 transition-all duration-300 hover:shadow-xl"
                >
                  <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center text-red-500 mb-4">
                    <Shield className="w-5 h-5" />
                  </div>
                  <h3 className="font-medium text-gray-900 dark:text-white text-lg mb-2">
                    Security & Compliance
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Meet your industry&apos;s specific regulatory requirements
                  </p>
                </motion.div>
              </div>

              <div className="text-center">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-[#ff0a0a] to-[#ff6b6b] hover:shadow-lg hover:shadow-red-500/20 transition-all duration-300 border-0 h-14 text-base font-medium"
                >
                  <span className="flex items-center gap-2">
                    Contact Sales <ArrowRight className="w-5 h-5" />
                  </span>
                </Button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Industries Section */}
        <motion.div
          ref={industriesRef}
          className="mb-32"
          variants={item}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-16">
            <Badge className="mb-4 px-4 py-1.5 text-sm bg-gradient-to-r from-blue-500/20 to-blue-400/10 text-blue-400 border-blue-500/20">
              Specialized Solutions
            </Badge>
            <h2 className="text-4xl font-bold mb-6 tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400">
                Industries We Serve
              </span>
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg">
              Orbit Suite is trusted by organizations across various industries,
              with specialized features for each sector&apos;s unique needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {industries.map((industry, index) => (
              <motion.div
                key={industry.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className={`bg-gradient-to-br from-white/80 to-gray-50/40 dark:from-gray-900/80 dark:to-gray-900/40 backdrop-blur-sm border ${industry.border} rounded-xl p-6 hover:shadow-xl transition-all duration-300 group`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-r ${industry.gradient} flex items-center justify-center ${industry.color} shadow-lg`}
                  >
                    {industry.icon}
                  </div>
                  <h3 className="font-medium text-gray-900 dark:text-white text-lg">
                    {industry.name}
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {industry.description}
                </p>
                <Button
                  variant="link"
                  className={`px-0 ${industry.color} hover:text-opacity-80 transition-colors flex items-center gap-1 text-sm`}
                >
                  <span>View {industry.name} solutions</span>
                  <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
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

        {/* Case Studies Section */}
        <motion.div
          className="mb-32"
          variants={item}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-16">
            <Badge className="mb-4 px-4 py-1.5 text-sm bg-gradient-to-r from-amber-500/20 to-amber-400/10 text-amber-400 border-amber-500/20">
              Success Stories
            </Badge>
            <h2 className="text-4xl font-bold mb-6 tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400">
                Real Results, Real Impact
              </span>
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg">
              See how organizations like yours have transformed their workflows
              with Orbit Suite
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {caseStudies.map((study, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className="bg-gradient-to-br from-white/80 to-gray-50/40 dark:from-gray-900/80 dark:to-gray-900/40 backdrop-blur-sm border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden group hover:border-gray-300 dark:hover:border-gray-700 hover:shadow-xl transition-all duration-300"
              >
                <div className="h-56 bg-gray-100 dark:bg-gray-800 relative overflow-hidden">
                  <img
                    src={study.image || "/placeholder.svg"}
                    alt={study.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60"></div>
                  <div className="absolute bottom-4 left-4">
                    <div
                      className={`text-sm ${study.categoryColor} mb-1 flex items-center gap-1.5`}
                    >
                      <Clock className="w-4 h-4" />
                      <span>{study.category}</span>
                    </div>
                    <h3 className="text-xl font-medium text-white">
                      {study.title}
                    </h3>
                  </div>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {study.stats.map((stat, statIndex) => (
                      <div
                        key={statIndex}
                        className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-lg p-3 text-center"
                      >
                        <div
                          className={`text-xl font-bold mb-1 ${study.categoryColor}`}
                        >
                          {stat.value}
                        </div>
                        <div className="text-gray-500 dark:text-gray-400 text-xs">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">
                    {study.description}
                  </p>
                  <Button
                    variant="outline"
                    className="w-full border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 group"
                  >
                    <span>Read case study</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              variant="outline"
              size="lg"
              className="border-gray-300 dark:border-gray-700 hover:text-gray-900 dark:hover:text-white hover:border-gray-400 dark:hover:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-900/50 transition-all duration-300 backdrop-blur-sm"
            >
              <span className="flex items-center gap-2">
                View all case studies <ArrowRight className="w-5 h-5" />
              </span>
            </Button>
          </div>
        </motion.div>

        {/* CTA section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-r from-red-50 via-white to-white dark:from-red-900/30 dark:via-black dark:to-black p-12 rounded-2xl border border-gray-200 dark:border-gray-800 text-center relative overflow-hidden"
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
      </section>
    </motion.main>
  );
}
