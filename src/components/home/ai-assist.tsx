"use client"
import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Sparkles,
  Brain,
  BarChart,
  MessageSquare,
  FileText,
  CheckCircle,
  ArrowRight,
  ChevronRight,
  Lightbulb,
  Layers,
  Lock,
  Cpu,
  Wand2,
  Bot,
  Rocket,
  Star,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { GradientCard } from "@/components/ui/gradient-card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"

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

export default function AIAssistPage() {
  const [activeTab, setActiveTab] = useState("productivity")
  const demoRef = useRef(null)
  const [demoStep, setDemoStep] = useState(0)

  const useCases = [
    {
      title: "Smart Drafting",
      description: "Generate documents, emails, and code snippets in seconds with context-aware AI assistance.",
      icon: <FileText className="w-5 h-5" />,
      color: "from-red-500 to-orange-500",
    },
    {
      title: "Data Insights",
      description: "Get automatic summaries and trends from your team's work with intelligent data analysis.",
      icon: <BarChart className="w-5 h-5" />,
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Task Automation",
      description: "Let AI handle repetitive tasks, follow-ups, and routine communications automatically.",
      icon: <CheckCircle className="w-5 h-5" />,
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "Meeting Assistant",
      description: "Transcribe, summarize, and extract action items from meetings with perfect accuracy.",
      icon: <MessageSquare className="w-5 h-5" />,
      color: "from-purple-500 to-indigo-500",
    },
  ]

  const features = [
    {
      title: "Context-Aware",
      description: "Our AI understands your team's projects, history, and workflows for relevant assistance.",
      icon: <Layers className="w-5 h-5" />,
    },
    {
      title: "Privacy-First",
      description: "Your data never trains our models. Enterprise-grade security and compliance built-in.",
      icon: <Lock className="w-5 h-5" />,
    },
    {
      title: "Customizable",
      description: "Train the AI on your company's style, terminology, and processes for perfect alignment.",
      icon: <Wand2 className="w-5 h-5" />,
    },
    {
      title: "Multi-Modal",
      description: "Works with text, images, code, and data for comprehensive assistance across formats.",
      icon: <Cpu className="w-5 h-5" />,
    },
  ]

  const testimonials = [
    {
      quote:
        "The AI Assist features have cut our documentation time in half. It's like having an extra team member who knows exactly what we need.",
      author: "Alex Chen",
      role: "Product Manager at TechFlow",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      quote:
        "I was skeptical about AI tools, but this one actually understands context. It's helped us automate our most tedious tasks.",
      author: "Sarah Johnson",
      role: "Engineering Lead at DataSphere",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  const demoSteps = [
    {
      title: "Meeting Summary",
      content: "Summarizing your 45-minute product planning meeting...",
      result:
        "Key decisions: (1) Prioritize mobile redesign for Q3, (2) Delay API v2 launch until security audit complete, (3) Hire two more frontend developers by August.",
    },
    {
      title: "Email Draft",
      content: "Drafting follow-up email to the design team...",
      result:
        "Subject: Mobile Redesign Kickoff - Next Steps\n\nHi team,\n\nFollowing our planning meeting, we're moving forward with the mobile redesign as our Q3 priority. Please prepare your initial concepts by Friday for review.\n\nLet me know if you need any resources or clarification.\n\nRegards,\nAlex",
    },
    {
      title: "Task Creation",
      content: "Creating and assigning tasks based on meeting outcomes...",
      result: "Created 8 tasks and assigned to appropriate team members. Added to Sprint 24 planning board.",
    },
  ]

  const tabs = [
    { id: "productivity", label: "Productivity" },
    { id: "coding", label: "Coding" },
    { id: "analytics", label: "Analytics" },
    { id: "communication", label: "Communication" },
  ]

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

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center px-4 py-1 rounded-full bg-red-500/10 text-red-500 text-sm font-medium mb-4"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Beta
          </motion.div>

          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6 tracking-tight"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#ff0a0a] to-[#ff6b6b]">
              AI-Powered
            </span>{" "}
            <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600 dark:from-[#fefefe] dark:to-[#a0a0a0]">
              Productivity
            </span>
          </motion.h1>

          <motion.p
            className="text-gray-600 dark:text-gray-400 text-lg md:text-xl mb-10 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Orbit Suite&apos;s AI Assist helps your team work smarter, not harder. Our beta features are constantly
            learning and improving to deliver intelligent automation that feels like magic.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <Button
              size="lg"
              className="relative overflow-hidden group bg-gradient-to-r from-[#ff0a0a] to-[#ff6b6b] hover:shadow-lg hover:shadow-red-500/20 transition-all duration-300 border-0"
            >
              <span className="relative z-10 flex items-center gap-2 font-medium">
                Join the Beta Program{" "}
                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white hover:text-gray-900 dark:hover:text-white hover:border-gray-400 dark:hover:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-900/50 transition-all duration-300 backdrop-blur-sm flex items-center gap-2"
            >
              <Bot className="w-4 h-4" />
              Watch Demo
            </Button>
          </motion.div>
        </motion.div>

        {/* Animated Demo Section */}
        <motion.div
          ref={demoRef}
          className="mb-24 relative"
          variants={item}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-gray-100/50 via-gray-200/50 to-gray-100/50 dark:from-gray-900/50 dark:via-gray-800/50 dark:to-gray-900/50 rounded-2xl transform -skew-y-1 scale-105 -z-10 blur-sm"></div>
          <div className="bg-white/40 dark:bg-gray-900/40 backdrop-blur-md rounded-2xl p-8 md:p-10 border border-gray-200 dark:border-gray-800 relative overflow-hidden shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-blue-500/5 opacity-50"></div>

            <div className="flex flex-col md:flex-row gap-8 items-center">
              {/* Demo Controls */}
              <div className="md:w-1/3">
                <h2 className="text-2xl font-bold mb-4 flex items-center text-gray-900 dark:text-white">
                  <Brain className="w-5 h-5 mr-2 text-red-500" />
                  See AI Assist in Action
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Watch how our AI transforms meeting notes into actionable outcomes.
                </p>

                <div className="space-y-3">
                  {demoSteps.map((step, index) => (
                    <button
                      key={index}
                      onClick={() => setDemoStep(index)}
                      className={`w-full text-left p-3 rounded-lg transition-all ${
                        demoStep === index
                          ? "bg-gradient-to-r from-red-500/20 to-red-500/10 border border-red-500/30"
                          : "bg-gray-100/50 dark:bg-gray-800/50 border border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600"
                      }`}
                    >
                      <div className="flex items-center">
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${
                            demoStep === index
                              ? "bg-red-500 text-white"
                              : "bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                          }`}
                        >
                          {index + 1}
                        </div>
                        <div>
                          <div
                            className={`font-medium ${demoStep === index ? "text-gray-900 dark:text-white" : "text-gray-700 dark:text-gray-300"}`}
                          >
                            {step.title}
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Demo Display */}
              <div className="md:w-2/3 bg-white/50 dark:bg-black/50 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
                <div className="bg-gray-100 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 p-3 flex items-center">
                  <div className="flex space-x-2 mr-3">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 flex-1 text-center">AI Assist</div>
                </div>
                <div className="p-6">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={demoStep}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="flex items-start mb-4">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-red-500 to-red-600 flex items-center justify-center text-white mr-3 flex-shrink-0">
                          AI
                        </div>
                        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3 text-gray-700 dark:text-gray-300">
                          {demoSteps[demoStep].content}
                          <div className="mt-2 flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            <span className="text-xs text-green-500">Processing...</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-red-500 to-red-600 flex items-center justify-center text-white mr-3 flex-shrink-0">
                          AI
                        </div>
                        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3 text-gray-700 dark:text-gray-300">
                          <div className="font-medium text-gray-900 dark:text-white mb-2">Completed</div>
                          <div className="whitespace-pre-line">{demoSteps[demoStep].result}</div>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Use Cases Tabs */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Supercharge Your Workflow</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Explore how AI Assist can transform different aspects of your team&apos;s work
            </p>
          </div>

          <Tabs defaultValue="productivity" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="bg-gray-100/70 dark:bg-gray-900/70 backdrop-blur-md border border-gray-200 dark:border-gray-800 p-1 rounded-full mx-auto inline-flex">
              {tabs.map((tab) => (
                <TabsTrigger
                  key={tab.id}
                  value={tab.id}
                  className="rounded-full px-4 py-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#ff0a0a] data-[state=active]:to-[#ff6b6b] data-[state=active]:text-white"
                >
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </motion.div>

        {/* Use Cases Grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {useCases.map((useCase, index) => (
            <motion.div key={index} variants={item}>
              <GradientCard>
                <div
                  className={`w-12 h-12 bg-gradient-to-br ${useCase.color} rounded-lg flex items-center justify-center mb-6 text-white`}
                >
                  {useCase.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-gray-900 group-hover:to-gray-600 dark:group-hover:from-white dark:group-hover:to-gray-300 transition-all duration-300">
                  {useCase.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">{useCase.description}</p>
                <Button
                  variant="link"
                  className="px-0 text-red-500 group-hover:text-red-400 transition-colors flex items-center gap-1"
                >
                  <span>Try it now</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </GradientCard>
            </motion.div>
          ))}
        </motion.div>

        {/* Features Section */}
        <motion.div className="mb-24 grid md:grid-cols-2 gap-6" variants={container} initial="hidden" animate="show">
          <motion.div
            variants={item}
            className="md:col-span-2 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-black border border-gray-200 dark:border-gray-800 rounded-xl p-8 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-red-500 rounded-full mix-blend-screen filter blur-[80px] opacity-10"></div>

            <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Key Features</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Our AI is designed to enhance your team&apos;s capabilities, not replace them
            </p>

            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.5 }}
                  className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-lg p-6 hover:bg-gray-50 dark:hover:bg-gray-900/70 transition-colors border border-gray-200 dark:border-gray-800 hover:border-red-500/30"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-red-500/20 to-red-500/10 rounded-lg flex items-center justify-center text-red-500 mb-4">
                    {feature.icon}
                  </div>
                  <h4 className="font-medium text-lg mb-2 text-gray-900 dark:text-white">{feature.title}</h4>
                  <p className="text-gray-600 dark:text-gray-500 text-sm">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Testimonials */}
        <motion.div className="mb-24 grid md:grid-cols-2 gap-6" variants={container} initial="hidden" animate="show">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={item}
              className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200 dark:border-gray-800 rounded-xl p-8 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-red-500 rounded-full mix-blend-screen filter blur-[80px] opacity-5"></div>

              <div className="text-4xl text-red-500/20 mb-4">&quot;</div>
              <p className="text-gray-700 dark:text-gray-300 mb-6 relative z-10">{testimonial.quote}</p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-800">
                  <Image
                    src={"/placeholder.svg"}
                    width={10}
                    height={10}
                    alt={testimonial.author}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">{testimonial.author}</div>
                  <div className="text-gray-500 text-sm">{testimonial.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
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
                The Future of Work
              </motion.h2>

              <motion.p
                className="text-blue-100 mb-10 max-w-2xl mx-auto text-center text-lg"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                We&apos;re pioneering AI that augments human collaboration rather than replacing it. Help shape the future by
                participating in our beta program and providing feedback.
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
                  <Rocket className="w-4 h-4" />
                  Get Early Access
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white/20 text-black dark:text-white hover:text-white hover:bg-white/10 transition-all duration-300 flex items-center gap-2 px-8"
                >
                  <Lightbulb className="w-4 h-4" />
                  Learn About Our AI
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Beta Program Info */}
        <motion.div
          className="text-center"
          variants={item}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="inline-flex items-center gap-2 bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm border border-gray-200 dark:border-gray-800 rounded-full px-6 py-3">
            <Star className="w-4 h-4 text-red-500" />
            <span className="text-gray-700 dark:text-gray-300">
              Beta participants get 3 months of Pro plan free when we launch
            </span>
          </div>
        </motion.div>
      </section>
    </motion.main>
  )
}
