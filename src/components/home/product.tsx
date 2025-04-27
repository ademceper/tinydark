"use client"
import { GradientCard } from "@/components/ui/gradient-card"
import { Button } from "@/components/ui/button"
import { motion, useAnimation } from "framer-motion"
import {
  FaUsers,
  FaLightbulb,
  FaProjectDiagram,
  FaSyncAlt,
  FaChartLine,
  FaCode,
  FaMobileAlt,
  FaServer,
  FaShieldAlt,
} from "react-icons/fa"
import { FiArrowRight } from "react-icons/fi"
import { useInView } from "react-intersection-observer"
import { useEffect } from "react"
import { useDeviceType } from "@/hooks/use-breakpoint"

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const FeatureVisualization = ({ type }: { type: string }) => {
  const controls = useAnimation()
  const [ref, inView] = useInView({ threshold: 0.1 })
  const deviceType = useDeviceType()
  const isMobile = deviceType === "mobile"
  const isTablet = deviceType === "tablet"

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  const variants = {
    visible: { opacity: 1, transition: { duration: 0.5 } },
    hidden: { opacity: 0 },
  }

  const renderVisualization = () => {
    switch (type) {
      case "dashboard":
        return (
          <motion.div
            className="relative w-full h-full"
            initial="hidden"
            animate={controls}
            variants={variants}
            ref={ref}
          >
            {/* Dashboard grid animation */}
            <div className="absolute inset-0 grid grid-cols-3 gap-1 p-2">
              {[...Array(9)].map((_, i) => (
                <motion.div
                  key={i}
                  className="bg-gray-800 dark:bg-gray-800 rounded-sm"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{
                    opacity: [0, 1, 1],
                    scale: [0.8, 1.05, 1],
                    transition: {
                      delay: i * 0.1,
                      duration: 0.6,
                    },
                  }}
                >
                  <div className="h-4 bg-gradient-to-r from-red-500 to-red-300 rounded-sm"></div>
                  <div className="p-1">
                    <div className="h-2 bg-gray-700 dark:bg-gray-700 rounded mb-1 w-3/4"></div>
                    <div className="h-1 bg-gray-700 dark:bg-gray-700 rounded w-1/2"></div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* App icons floating in */}
            {["📊", "📅", "📝", "💬"].map((emoji, i) => (
              <motion.div
                key={i}
                className="absolute text-2xl"
                style={{
                  top: `${20 + i * 15}%`,
                  left: `${10 + i * 20}%`,
                }}
                initial={{ y: 50, opacity: 0 }}
                animate={{
                  y: 0,
                  opacity: 1,
                  transition: { delay: 0.5 + i * 0.2, type: "spring" },
                }}
              >
                {emoji}
              </motion.div>
            ))}
          </motion.div>
        )

      case "collaboration":
        return (
          <motion.div
            className="relative w-full h-full flex items-center justify-center"
            initial="hidden"
            animate={controls}
            variants={variants}
            ref={ref}
          >
            {/* Avatars animation */}
            <div className="relative w-32 h-32">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute bg-gray-800 dark:bg-gray-800 rounded-full w-12 h-12 flex items-center justify-center border-2 border-red-500"
                  style={{
                    left: `${i * 40}px`,
                    top: `${i * 10}px`,
                  }}
                  initial={{ scale: 0 }}
                  animate={{
                    scale: 1,
                    transition: {
                      delay: i * 0.2,
                      type: "spring",
                    },
                  }}
                >
                  <span className="text-lg">👩‍💻</span>
                </motion.div>
              ))}

              {/* Connecting lines */}
              <motion.svg width="100%" height="100%" viewBox="0 0 100 100" className="absolute top-0 left-0">
                <motion.path
                  d="M20,30 Q50,50 80,30"
                  stroke="rgba(239, 68, 68, 0.5)"
                  strokeWidth="2"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, delay: 0.6 }}
                />
                <motion.path
                  d="M20,50 Q50,30 80,50"
                  stroke="rgba(239, 68, 68, 0.5)"
                  strokeWidth="2"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, delay: 0.8 }}
                />
              </motion.svg>

              {/* Document being edited */}
              <motion.div
                className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-gray-800 dark:bg-gray-800 p-2 rounded w-20"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1 }}
              >
                <div className="h-2 bg-gray-700 dark:bg-gray-700 rounded mb-1 w-full"></div>
                <div className="h-2 bg-gray-700 dark:bg-gray-700 rounded mb-1 w-3/4"></div>
                <div className="h-2 bg-red-500 rounded w-1/2"></div>
              </motion.div>
            </div>
          </motion.div>
        )

      case "workspaces":
        return (
          <motion.div
            className="relative w-full h-full"
            initial="hidden"
            animate={controls}
            variants={variants}
            ref={ref}
          >
            {/* Workspace switcher animation */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="relative w-24 h-32 bg-gray-800 dark:bg-gray-800 rounded-lg shadow-lg mx-1"
                initial={{ rotate: -5, y: 20 }}
                animate={{ rotate: -5, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 dark:from-gray-800 dark:to-gray-900 rounded-lg p-2">
                  <div className="h-2 bg-gray-700 dark:bg-gray-700 rounded mb-2 w-full"></div>
                  <div className="h-2 bg-gray-700 dark:bg-gray-700 rounded mb-2 w-3/4"></div>
                  <div className="h-1 bg-gray-700 dark:bg-gray-700 rounded mb-1 w-1/2"></div>
                </div>
              </motion.div>

              <motion.div
                className="relative w-28 h-36 bg-gray-800 dark:bg-gray-800 rounded-lg shadow-lg mx-1 z-10"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-900 dark:from-black dark:to-gray-900 rounded-lg p-3 border border-red-500/30">
                  <div className="flex justify-between mb-2">
                    <div className="h-2 bg-red-500 rounded w-1/4"></div>
                    <div className="h-2 bg-gray-700 dark:bg-gray-700 rounded w-1/4"></div>
                  </div>
                  <div className="h-2 bg-gray-700 dark:bg-gray-700 rounded mb-1 w-full"></div>
                  <div className="h-2 bg-gray-700 dark:bg-gray-700 rounded mb-1 w-3/4"></div>
                  <div className="h-1 bg-gray-700 dark:bg-gray-700 rounded mb-1 w-1/2"></div>
                </div>
              </motion.div>

              <motion.div
                className="relative w-24 h-32 bg-gray-800 dark:bg-gray-800 rounded-lg shadow-lg mx-1"
                initial={{ rotate: 5, y: 20 }}
                animate={{ rotate: 5, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 dark:from-gray-800 dark:to-gray-900 rounded-lg p-2">
                  <div className="h-2 bg-gray-700 dark:bg-gray-700 rounded mb-2 w-full"></div>
                  <div className="h-2 bg-gray-700 dark:bg-gray-700 rounded mb-2 w-3/4"></div>
                  <div className="h-1 bg-gray-700 dark:bg-gray-700 rounded mb-1 w-1/2"></div>
                </div>
              </motion.div>
            </div>

            {/* Template selector animation */}
            <motion.div
              className="absolute bottom-2 left-0 right-0 flex justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <div className="flex space-x-1">
                {["Project", "Team", "Personal"].map((item, i) => (
                  <motion.div
                    key={i}
                    className="text-xs bg-gray-800 dark:bg-gray-800 px-2 py-1 rounded"
                    whileHover={{
                      scale: 1.05,
                      backgroundColor: "rgba(239, 68, 68, 0.2)",
                    }}
                  >
                    {item}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )

      default:
        return null
    }
  }

  return renderVisualization()
}

export default function WorkspacePage() {
  const deviceType = useDeviceType()
  const isMobile = deviceType === "mobile"
  const isTablet = deviceType === "tablet"

  const features = [
    {
      title: "Unified Dashboard",
      description:
        "Access all your tools and projects from a single interface with our smart workspace aggregator. Connect Jira, Notion, Figma and more in one view with customizable widgets and real-time updates.",
      icon: <FaProjectDiagram className="text-red-500" size={24} />,
      visualizationType: "dashboard",
    },
    {
      title: "Real-time Collaboration",
      description:
        "Work simultaneously with your team on documents, designs, and tasks with zero latency. See cursor positions, live edits, and get instant notifications with our high-performance sync engine.",
      icon: <FaSyncAlt className="text-red-500" size={24} />,
      visualizationType: "collaboration",
    },
    {
      title: "Custom Workspaces",
      description:
        "Create tailored environments for different projects and teams with flexible templates. Save workspace configurations, set custom permissions, and switch contexts with one click.",
      icon: <FaLightbulb className="text-red-500" size={24} />,
      visualizationType: "workspaces",
    },
  ]

  const securityFeatures = [
    {
      title: "Enterprise-Grade Encryption",
      description:
        "All data encrypted in transit and at rest with AES-256. End-to-end encryption for sensitive communications.",
      icon: <FaShieldAlt className="text-red-500" size={20} />,
    },
    {
      title: "Zero Trust Architecture",
      description:
        "Continuous verification of all users and devices. Least privilege access controls for all resources.",
      icon: <FaServer className="text-red-500" size={20} />,
    },
    {
      title: "Compliance Certifications",
      description: "SOC 2 Type II, ISO 27001, and GDPR compliant. Regular third-party security audits.",
      icon: <FaChartLine className="text-red-500" size={20} />,
    },
  ]

  const teamUseCases = [
    {
      team: "Product Teams",
      icon: <FaChartLine className="text-red-500" size={20} />,
      features: [
        "Roadmap planning with timeline visualization",
        "Feature prioritization matrix with scoring",
        "Cross-team alignment boards",
        "Customer feedback integration from Intercom/Zendesk",
        "Release tracking with Jira sync",
      ],
      stats: "62% faster decision making",
    },
    {
      team: "Engineering",
      icon: <FaCode className="text-red-500" size={20} />,
      features: [
        "Code collaboration with live editing",
        "Sprint planning with Jira/GitHub sync",
        "Bug tracking with automated workflows",
        "API documentation hub with Swagger",
        "Incident response tracking",
      ],
      stats: "45% reduction in meeting time",
    },
    {
      team: "Marketing",
      icon: <FaUsers className="text-red-500" size={20} />,
      features: [
        "Campaign management dashboard",
        "Content calendar with approvals",
        "Asset sharing with version control",
        "Performance analytics integration",
        "Social media scheduling",
      ],
      stats: "38% faster campaign execution",
    },
  ]

  return (
    <div className="overflow-hidden w-screen">
      <main className="min-h-screen bg-white dark:bg-black pt-32 overflow-hidden">
        {/* Animated background elements */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
        >
          <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-red-500/10 blur-3xl"></div>
          <div className="absolute bottom-1/3 right-1/3 w-80 h-80 rounded-full bg-gray-500/5 dark:bg-white/5 blur-3xl"></div>
          <div className="absolute top-2/3 left-1/3 w-96 h-96 rounded-full bg-red-500/5 blur-3xl"></div>
        </motion.div>

        <section className="relative z-10 py-12 sm:py-20 px-4 sm:px-6 max-w-7xl mx-auto overflow-hidden">
          {/* Hero section */}
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="text-center mb-24">
            <motion.div
              variants={fadeIn}
              className="inline-flex items-center px-4 py-1 rounded-full bg-red-500/20 text-red-500 text-sm font-medium mb-6"
            >
              <span className="relative flex h-2 w-2 mr-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
              NEW WORKSPACE 2.0
            </motion.div>

            <motion.h1
              variants={fadeIn}
              className="text-4xl md:text-6xl font-bold mb-6 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#ff0a0a] to-red-400 dark:from-[#ff0a0a] dark:to-[#fefefe] leading-tight"
            >
              Your Team&apos;s <span className="underline decoration-red-500">Command Center</span>
            </motion.h1>

            <motion.p
              variants={fadeIn}
              className="text-gray-600 dark:text-gray-400 text-lg md:text-xl mb-8 max-w-4xl mx-auto leading-relaxed"
            >
              Orbit Suite&apos;s Workspace brings all your tools, people, and projects together in one intuitive
              interface. Eliminate app switching and context shifting with our unified collaboration hub powered by AI.
            </motion.p>

            <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="group relative overflow-hidden">
                <span className="relative z-10 flex items-center">
                  Start Free Trial
                  <FiArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
                </span>
                <motion.span
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "0%" }}
                  transition={{ duration: 0.4 }}
                />
              </Button>
            </motion.div>
          </motion.div>

          {/* Features grid */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-8 mb-28"
          >
            {features.map((feature) => (
              <motion.div key={feature.title} variants={fadeIn}>
                <GradientCard className="h-full hover:border-red-500/50 transition-all duration-300 group">
                  <motion.div whileHover={{ y: -5 }} className="h-full flex flex-col">
                    <div className="relative overflow-hidden rounded-lg aspect-video mb-5 bg-gray-100 dark:bg-gray-900">
                      <FeatureVisualization type={feature.visualizationType} />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 dark:from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                        <button className="text-white text-sm font-medium flex items-center">
                          Learn more <FiArrowRight className="ml-1" />
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center mb-3">
                      <div className="p-2 bg-red-500/10 rounded-lg mr-3">{feature.icon}</div>
                      <h3 className="text-xl text-gray-900 dark:text-white font-semibold">{feature.title}</h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-4 flex-grow">{feature.description}</p>
                    <Button variant="link" className="w-fit px-0 text-red-500 hover:text-red-400 group">
                      Explore feature
                      <span className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <FiArrowRight />
                      </span>
                    </Button>
                  </motion.div>
                </GradientCard>
              </motion.div>
            ))}
          </motion.div>

          {/* Team use cases */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-br from-gray-100 via-white to-gray-50 dark:from-black dark:via-gray-900 dark:to-gray-900/80 p-10 rounded-2xl border border-gray-200 dark:border-gray-800 mb-20 relative overflow-hidden"
          >
            <div className="absolute inset-0 opacity-10 bg-[url('/grid-pattern.svg')] bg-center"></div>
            <div className="relative z-10">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-white/80">
                  How Teams Use Orbit Workspace
                </h2>
                <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                  Discover how different teams leverage Orbit Suite to streamline their workflows
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {teamUseCases.map((teamCase) => (
                  <motion.div
                    key={teamCase.team}
                    whileHover={{ y: -5 }}
                    className="bg-white/50 dark:bg-gray-900/50 p-6 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-red-500/50 transition-all group"
                  >
                    <div className="flex items-center mb-4">
                      <div className="p-2 bg-red-500/10 rounded-lg mr-3">{teamCase.icon}</div>
                      <h3 className="text-xl text-gray-900 dark:text-white font-semibold">{teamCase.team}</h3>
                    </div>
                    <ul className="space-y-3 mb-4">
                      {teamCase.features.map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <span className="text-red-500 mr-2 mt-1">•</span>
                          <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="text-sm text-red-400 dark:text-red-400 font-medium mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      {teamCase.stats}
                    </div>
                    <Button variant="link" className="mt-4 px-0 text-red-500 hover:text-red-400 group">
                      View {teamCase.team} template
                      <span className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <FiArrowRight />
                      </span>
                    </Button>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* New Security Section */}
          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="py-20 px-6 max-w-7xl mx-auto mb-20 overflow-hidden w-full"
          >
            <div className="flex flex-col md:flex-row gap-12 items-center w-full">
              <motion.div
                className="md:w-1/2 w-full"
                initial={{ x: -50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-white/80">
                  Enterprise-Grade Security
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                  Your data&apos;s security is our top priority. Orbit Suite implements the most rigorous security
                  standards to protect your sensitive information.
                </p>

                <div className="space-y-6">
                  {securityFeatures.map((feature, i) => (
                    <motion.div
                      key={i}
                      className="flex items-start"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <div className="p-2 bg-red-500/10 rounded-lg mr-4">{feature.icon}</div>
                      <div>
                        <h3 className="font-semibold mb-1 text-gray-900 dark:text-white">{feature.title}</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">{feature.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                className="md:w-1/2 w-full relative flex justify-center"
                initial={{ x: 50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
              >
                {/* Security Dashboard Card */}
                <div className="w-full max-w-[500px] bg-[#0f1117] rounded-xl overflow-hidden shadow-2xl border border-gray-800">
                  {/* Window Controls */}
                  <div className="flex items-center px-4 py-3 bg-[#0f1117] border-b border-gray-800">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="ml-auto text-sm text-gray-400">security-dashboard.js</div>
                  </div>

                  {/* Code Block */}
                  <div className="bg-[#0f1117] p-4 overflow-hidden">
                    <pre className="text-green-400 text-sm font-mono whitespace-pre overflow-x-auto">
                      <code>
                        {`// Multi-factor authentication
function enableMFA(user) {
  return {
    ...user,
    auth: {
      ...user.auth,
      mfa: true,
      methods: ['biometric', 'authenticator', 'sms']
    }
  };
}

// Data encryption pipeline
function encryptData(data, key) {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
  return Buffer.concat([iv, cipher.update(data), cipher.final()]);
}`}
                      </code>
                    </pre>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 px-4 py-3 bg-[#0f1117] border-t border-gray-800">
                    <span className="px-3 py-1 bg-gray-800 rounded-full text-xs text-gray-300">AES-256</span>
                    <span className="px-3 py-1 bg-gray-800 rounded-full text-xs text-gray-300">OAuth 2.0</span>
                  </div>

                  {/* Active Session Card */}
                  <div className="absolute -bottom-6 -right-6 bg-[#0f1117] rounded-xl p-4 border border-gray-800 w-[200px] shadow-lg">
                    <div className="flex items-center mb-2">
                      <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                      <span className="text-xs text-gray-400">Active Session</span>
                    </div>
                    <div className="text-sm">
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-400">Location:</span>
                        <span className="text-gray-300">San Francisco, CA</span>
                      </div>
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-400">Device:</span>
                        <span className="text-gray-300">MacBook Pro</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">IP:</span>
                        <span className="text-gray-300">192.168.1.***</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.section>

          {/* New Mobile Experience Section */}
          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="py-20 px-6 max-w-7xl mx-auto mb-20 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-black dark:via-gray-900 dark:to-gray-900/80 rounded-2xl overflow-hidden w-full"
          >
            <div className="flex flex-col md:flex-row gap-12 items-center w-full">
              <motion.div
                className="md:w-1/2 w-full relative flex justify-center"
                initial={{ x: -50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
              >
                {/* Mobile Phone Mockup */}
                <div className="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[600px] w-[300px] shadow-xl overflow-hidden">
                  {/* Phone Notch */}
                  <div className="w-[148px] h-[18px] bg-black top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute"></div>

                  {/* Phone Content */}
                  <div className="h-[572px] w-[272px] bg-[#0f1117] overflow-hidden">
                    {/* App Header */}
                    <div className="flex justify-between items-center p-4">
                      <span className="text-white font-medium">Orbit</span>
                      <span className="text-xs text-gray-400">9:41 AM</span>
                    </div>

                    {/* Mobile Dashboard Card */}
                    <div className="mx-4 p-4 bg-[#1a1d26] rounded-xl mb-4">
                      <div className="flex items-center mb-3">
                        <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center mr-2">
                          <FaMobileAlt className="text-red-500 text-sm" />
                        </div>
                        <h3 className="text-white font-medium">Mobile Dashboard</h3>
                      </div>
                      <div className="h-2 bg-gray-700 rounded-full mb-2 w-full"></div>
                      <div className="h-2 bg-gray-700 rounded-full mb-2 w-3/4"></div>
                      <div className="h-2 bg-red-500 rounded-full w-1/2"></div>
                    </div>

                    {/* App Icons Grid */}
                    <div className="grid grid-cols-4 gap-2 mx-4 mb-4">
                      <div className="bg-[#1a1d26] rounded-lg aspect-square flex items-center justify-center text-2xl">
                        <span role="img" aria-label="chart" className="text-green-500">
                          📊
                        </span>
                      </div>
                      <div className="bg-[#1a1d26] rounded-lg aspect-square flex items-center justify-center text-2xl">
                        <span role="img" aria-label="calendar" className="text-blue-500">
                          📅
                        </span>
                      </div>
                      <div className="bg-[#1a1d26] rounded-lg aspect-square flex items-center justify-center text-2xl">
                        <span role="img" aria-label="document" className="text-orange-500">
                          📝
                        </span>
                      </div>
                      <div className="bg-[#1a1d26] rounded-lg aspect-square flex items-center justify-center text-2xl">
                        <span role="img" aria-label="people" className="text-purple-500">
                          👥
                        </span>
                      </div>
                    </div>

                    {/* Recent Activity */}
                    <div className="mx-4 p-4 bg-[#1a1d26] rounded-xl">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs text-gray-400">Recent Activity</span>
                        <span className="text-xs text-red-500">3 new</span>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-start">
                          <div className="w-2 h-2 rounded-full bg-red-500 mt-1 mr-2"></div>
                          <span className="text-xs text-white">Lisa commented</span>
                        </div>
                        <div className="flex items-start">
                          <div className="w-2 h-2 rounded-full bg-red-500 mt-1 mr-2"></div>
                          <span className="text-xs text-white">PR #42 merged</span>
                        </div>
                        <div className="flex items-start">
                          <div className="w-2 h-2 rounded-full bg-red-500 mt-1 mr-2"></div>
                          <span className="text-xs text-white">Sprint updated</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="md:w-1/2 w-full"
                initial={{ x: 50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
              >
                <div className="inline-flex items-center px-4 py-1 rounded-full bg-red-500/20 text-red-500 dark:text-red-500 text-sm font-medium mb-6">
                  <FaMobileAlt className="mr-2" />
                  MOBILE EXPERIENCE
                </div>
                <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-white/80">
                  Full Power in Your Pocket
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                  Access all Orbit Suite features from your mobile device with our optimized iOS and Android apps. Stay
                  productive on the go with real-time sync across all your devices.
                </p>

                <div className="grid sm:grid-cols-2 gap-4 mb-8">
                  <div className="bg-white/50 dark:bg-gray-900/50 p-4 rounded-lg border border-gray-200 dark:border-gray-800">
                    <h3 className="font-medium mb-2 flex items-center text-gray-900 dark:text-white">
                      <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                      Real-time Sync
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Changes update instantly across all devices
                    </p>
                  </div>
                  <div className="bg-white/50 dark:bg-gray-900/50 p-4 rounded-lg border border-gray-200 dark:border-gray-800">
                    <h3 className="font-medium mb-2 flex items-center text-gray-900 dark:text-white">
                      <span className="w-2 h-2 rounded-full bg-blue-500 mr-2"></span>
                      Offline Mode
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Work without connection, sync when back online
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Button className="bg-gray-900 text-white hover:bg-gray-800 dark:bg-black dark:text-white dark:hover:bg-gray-900">
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8.94-.19 1.83-.7 2.76-.64 1.17.07 2.21.49 3.08 1.37-2.72 1.68-2.1 5.58.48 6.52-.61 1.65-1.44 3.25-2.4 4.86zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"></path>
                    </svg>
                    App Store
                  </Button>
                  <Button className="bg-gray-900 text-white hover:bg-gray-800 dark:bg-black dark:text-white dark:hover:bg-gray-900">
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M3 20.5v-17c0-.59.34-1.11.84-1.35L13.69 12l-9.85 9.85c-.5-.25-.84-.76-.84-1.35m13.81-5.38L6.05 21.34l8.49-8.49 2.27 2.27m3.35-4.31c.34.27.59.69.59 1.07 0 .38-.22.79-.55 1.06L17.26 12l3.09-2.47c.33-.27.55-.68.55-1.06 0-.38-.25-.8-.59-1.07l-9.02-7.21c-.34-.27-.8-.27-1.15 0L2.4 7.13c-.34.27-.55.69-.55 1.07 0 .38.21.8.55 1.07L6.72 12l-3.37 2.73c-.34.27-.55.69-.55 1.07 0 .38.21.8.55 1.07l9.02 7.21c.34.27.8.27 1.15 0l9.02-7.21z"></path>
                    </svg>
                    Google Play
                  </Button>
                </div>
              </motion.div>
            </div>
          </motion.section>

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
                Join thousands of teams who have revolutionized their collaboration with Orbit Suite
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
      </main>
    </div>
  )
}
