"use client"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  CheckIcon,
  ChevronDown,
  Users,
  Building,
  Zap,
  MessageSquare,
  X,
  Check,
  BarChart,
  Clock,
  Sparkles,
  Shield,
  Database,
  Globe,
  Headphones,
  Star,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

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

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState("monthly")
  const [selectedPlan, setSelectedPlan] = useState("pro")
  const [openFaq, setOpenFaq] = useState<number | null>(null)
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

  const plans = [
    {
      id: "starter",
      name: "Starter",
      price: billingCycle === "monthly" ? "$0" : "$0",
      description: "For individuals and small teams just getting started",
      features: [
        "Up to 5 team members",
        "Basic collaboration features",
        "5GB storage",
        "Community support",
        "Standard security",
        "Basic analytics",
      ],
      cta: "Get Started",
      icon: <Users className="w-5 h-5" />,
      color: "from-blue-500 to-cyan-400",
      textColor: "text-blue-500",
      borderColor: "border-blue-500/20",
      shadowColor: "shadow-blue-500/10",
      gradient: "bg-gradient-to-r from-blue-500 to-cyan-400",
    },
    {
      id: "pro",
      name: "Pro",
      price: billingCycle === "monthly" ? "$15" : "$144",
      priceDetail: billingCycle === "monthly" ? "/user/month" : "/user/year",
      savings: billingCycle === "yearly" ? "Save $36/year" : null,
      description: "For growing teams that need more power and flexibility",
      features: [
        "Up to 20 team members",
        "Advanced collaboration",
        "100GB storage",
        "Priority support",
        "AI Assist (Beta)",
        "Advanced security",
        "Detailed analytics",
        "Custom branding",
      ],
      cta: "Start Free Trial",
      popular: true,
      icon: <Zap className="w-5 h-5" />,
      color: "from-red-500 to-orange-500",
      textColor: "text-red-500",
      borderColor: "border-red-500/20",
      shadowColor: "shadow-red-500/10",
      gradient: "bg-gradient-to-r from-red-500 to-orange-500",
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: "Custom",
      description: "For large organizations with specific requirements",
      features: [
        "Unlimited members",
        "Enterprise-grade security",
        "Custom storage",
        "Dedicated support",
        "On-premise options",
        "Custom integrations",
        "SLA guarantees",
        "Advanced permissions",
        "Audit logs",
      ],
      cta: "Contact Sales",
      icon: <Building className="w-5 h-5" />,
      color: "from-purple-500 to-indigo-500",
      textColor: "text-purple-500",
      borderColor: "border-purple-500/20",
      shadowColor: "shadow-purple-500/10",
      gradient: "bg-gradient-to-r from-purple-500 to-indigo-500",
    },
  ]

  const faqs = [
    {
      question: "Can I change plans later?",
      answer:
        "Yes, you can upgrade or downgrade your plan at any time. If you upgrade, you'll be charged the prorated amount for the remainder of your billing cycle. If you downgrade, you'll receive credit towards your next billing cycle.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards including Visa, Mastercard, American Express, and Discover. We also support payment via PayPal and bank transfers for annual Enterprise plans.",
    },
    {
      question: "Is there a free trial?",
      answer:
        "Yes, we offer a 14-day free trial on our Pro plan with no credit card required. You can try all the Pro features before deciding if it's right for your team.",
    },
    {
      question: "How does billing work?",
      answer:
        "For monthly plans, you'll be billed on the same day each month. For annual plans, you'll be billed once a year. You can view your billing history and download invoices from your account settings.",
    },
    {
      question: "What happens when I reach my user limit?",
      answer:
        "When you reach your user limit, you'll need to upgrade to a higher tier plan to add more users. We'll notify you when you're approaching your limit so you can plan accordingly.",
    },
  ]

  const testimonials = [
    {
      quote:
        "Switching to the Pro plan was a game-changer for our team. The advanced collaboration features and AI Assist have boosted our productivity by at least 30%.",
      author: "Sarah Johnson",
      role: "Product Manager at Acme Inc.",
      avatar: "/placeholder.svg?height=80&width=80",
      rating: 5,
    },
    {
      quote:
        "The Enterprise plan gave us exactly what we needed - custom integrations with our existing tools and the security features required by our IT department.",
      author: "Michael Chen",
      role: "CTO at TechGlobal",
      avatar: "/placeholder.svg?height=80&width=80",
      rating: 5,
    },
    {
      quote:
        "We started with the Starter plan and as we grew, upgrading to Pro was seamless. The pricing structure is transparent and the value is exceptional.",
      author: "Emma Rodriguez",
      role: "Operations Director at CreativeFlow",
      avatar: "/placeholder.svg?height=80&width=80",
      rating: 4,
    },
  ]

  const comparisonFeatures = [
    {
      category: "Team & Collaboration",
      features: [
        {
          name: "Team members",
          starter: "Up to 5",
          pro: "Up to 20",
          enterprise: "Unlimited",
        },
        {
          name: "Collaboration tools",
          starter: "Basic",
          pro: "Advanced",
          enterprise: "Enterprise-grade",
        },
        {
          name: "Project templates",
          starter: <X className="w-5 h-5 text-gray-500 dark:text-gray-500" />,
          pro: <Check className="w-5 h-5 text-green-500" />,
          enterprise: <Check className="w-5 h-5 text-green-500" />,
        },
        {
          name: "Team workspaces",
          starter: "1",
          pro: "5",
          enterprise: "Unlimited",
        },
      ],
    },
    {
      category: "Storage & Security",
      features: [
        {
          name: "Storage capacity",
          starter: "5GB",
          pro: "100GB",
          enterprise: "Custom",
        },
        {
          name: "Advanced security",
          starter: <X className="w-5 h-5 text-gray-500 dark:text-gray-500" />,
          pro: <Check className="w-5 h-5 text-green-500" />,
          enterprise: <Check className="w-5 h-5 text-green-500" />,
        },
        {
          name: "SSO integration",
          starter: <X className="w-5 h-5 text-gray-500 dark:text-gray-500" />,
          pro: <X className="w-5 h-5 text-gray-500 dark:text-gray-500" />,
          enterprise: <Check className="w-5 h-5 text-green-500" />,
        },
        {
          name: "Data encryption",
          starter: "Standard",
          pro: "Advanced",
          enterprise: "Military-grade",
        },
      ],
    },
    {
      category: "Support & Services",
      features: [
        {
          name: "Customer support",
          starter: "Community",
          pro: "Priority",
          enterprise: "Dedicated",
        },
        {
          name: "Onboarding",
          starter: "Self-service",
          pro: "Guided",
          enterprise: "White-glove",
        },
        {
          name: "SLA guarantees",
          starter: <X className="w-5 h-5 text-gray-500 dark:text-gray-500" />,
          pro: <X className="w-5 h-5 text-gray-500 dark:text-gray-500" />,
          enterprise: <Check className="w-5 h-5 text-green-500" />,
        },
        {
          name: "Training sessions",
          starter: <X className="w-5 h-5 text-gray-500 dark:text-gray-500" />,
          pro: "Monthly",
          enterprise: "Weekly",
        },
      ],
    },
  ]

  const features = [
    {
      icon: <Shield className="w-6 h-6 text-blue-400" />,
      title: "Enterprise Security",
      description: "Bank-level security with advanced encryption and compliance certifications.",
    },
    {
      icon: <Database className="w-6 h-6 text-green-400" />,
      title: "Unlimited Storage",
      description: "Scale your storage needs as your team grows without worrying about limits.",
    },
    {
      icon: <Globe className="w-6 h-6 text-purple-400" />,
      title: "Global Infrastructure",
      description: "Fast access from anywhere with our globally distributed data centers.",
    },
    {
      icon: <Headphones className="w-6 h-6 text-amber-400" />,
      title: "24/7 Support",
      description: "Our support team is available around the clock to help with any issues.",
    },
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
            New pricing for 2024
          </motion.div>

          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6 tracking-tight"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#ff0a0a] to-[#ff6b6b]">
              Simple, Transparent
            </span>{" "}
            <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600 dark:from-[#fefefe] dark:to-[#a0a0a0]">
              Pricing
            </span>
          </motion.h1>

          <motion.p
            className="text-gray-600 dark:text-gray-300 text-lg md:text-xl mb-10 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Choose the plan that fits your team&apos;s needs. Scale up or down as you grow. No hidden fees or surprises.
            All plans include our core features.
          </motion.p>

          {/* Billing Toggle */}
          <motion.div
            className="flex justify-center items-center mb-16 gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <div className="relative inline-flex bg-gray-100/70 dark:bg-gray-900/70 backdrop-blur-md border border-gray-200 dark:border-gray-800 p-1 rounded-full shadow-xl">
              <Tabs
                defaultValue="monthly"
                value={billingCycle}
                onValueChange={setBillingCycle}
                className="relative z-10"
              >
                <TabsList className="bg-transparent border-0">
                  <TabsTrigger
                    value="monthly"
                    className="rounded-full px-6 py-2.5 data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#ff0a0a] data-[state=active]:to-[#ff6b6b] data-[state=active]:text-white transition-all duration-300"
                  >
                    Monthly
                  </TabsTrigger>
                  <TabsTrigger
                    value="yearly"
                    className="rounded-full px-6 py-2.5 data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#ff0a0a] data-[state=active]:to-[#ff6b6b] data-[state=active]:text-white transition-all duration-300"
                  >
                    Yearly
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            {billingCycle === "yearly" && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-gradient-to-r from-red-500/20 to-red-500/10 text-red-400 text-sm px-4 py-1.5 rounded-full flex items-center gap-1.5 border border-red-500/20 shadow-lg shadow-red-500/5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Save 20%</span>
              </motion.span>
            )}
          </motion.div>
        </motion.div>

        {/* Pricing Cards */}
        <motion.div className="grid md:grid-cols-3 gap-8 mb-32" variants={container} initial="hidden" animate="show">
          {plans.map((plan) => (
            <motion.div
              key={plan.id}
              variants={item}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className={`relative rounded-xl overflow-hidden ${plan.popular ? "md:-mt-4 md:mb-4" : ""}`}
            >
              {/* Glow effect */}
              <div
                className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10`}
              >
                <div className={`absolute inset-0 ${plan.gradient} rounded-xl blur-xl opacity-30`}></div>
              </div>

              {/* Card content */}
              <div
                className={`relative p-8 border ${
                  plan.id === selectedPlan ? `${plan.borderColor}` : "border-gray-200 dark:border-gray-800"
                } bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-xl h-full flex flex-col transition-all duration-300 group hover:${plan.borderColor} hover:shadow-xl hover:${plan.shadowColor}`}
              >
                {plan.popular && (
                  <div className="absolute -top-5 -right-5">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-[#ff0a0a] to-[#ff6b6b] blur-md opacity-70 rounded-full"></div>
                      <div className="relative bg-gradient-to-r from-[#ff0a0a] to-[#ff6b6b] text-white text-xs font-medium px-6 py-1.5 rounded-full shadow-lg transform rotate-12">
                        Most Popular
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`w-12 h-12 rounded-xl ${plan.gradient} flex items-center justify-center text-white shadow-lg`}
                  >
                    {plan.icon}
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{plan.name}</h2>
                </div>

                <p className="text-gray-600 dark:text-gray-400 mb-6">{plan.description}</p>

                <div className="mb-6">
                  <div className="flex items-baseline">
                    <span className={`text-5xl font-bold ${plan.textColor}`}>{plan.price}</span>
                    {plan.priceDetail && (
                      <span className="text-lg text-gray-500 dark:text-gray-400 ml-1">{plan.priceDetail}</span>
                    )}
                  </div>
                  {plan.savings && (
                    <div className="text-green-500 text-sm mt-1 flex items-center gap-1">
                      <Check className="w-4 h-4" />
                      {plan.savings}
                    </div>
                  )}
                </div>

                <ul className="space-y-4 mb-8 flex-grow">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <div className={`${plan.gradient} rounded-full p-1 mr-3 mt-0.5 shadow-md`}>
                        <CheckIcon className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  size="lg"
                  onClick={() => setSelectedPlan(plan.id)}
                  className={`w-full ${
                    plan.id === "pro"
                      ? "bg-gradient-to-r from-[#ff0a0a] to-[#ff6b6b] hover:shadow-lg hover:shadow-red-500/20 text-white border-0"
                      : plan.id === selectedPlan
                        ? `${plan.gradient} text-white border-0 hover:shadow-lg hover:${plan.shadowColor}`
                        : "bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white"
                  } h-14 text-base font-medium transition-all duration-300`}
                >
                  {plan.cta}
                </Button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Key Features Section */}
        <motion.div
          className="mb-32"
          variants={item}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-16">
            <Badge className="mb-4 px-4 py-1.5 text-sm bg-gradient-to-r from-red-500/20 to-red-500/10 text-red-400 border-red-500/20">
              All Plans Include
            </Badge>
            <h2 className="text-4xl font-bold mb-6 tracking-tight text-gray-900 dark:text-white">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400">
                Core Features for Every Team
              </span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              No matter which plan you choose, you&apos;ll get access to these essential features
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200 dark:border-gray-800 rounded-xl p-6 hover:border-gray-300 dark:hover:border-gray-700 transition-all duration-300 hover:shadow-xl"
              >
                <div className="w-12 h-12 rounded-xl bg-gray-100/80 dark:bg-gray-800/80 flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Feature Comparison */}
        <motion.div
          className="mb-32"
          variants={item}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-16">
            <Badge className="mb-4 px-4 py-1.5 text-sm bg-gradient-to-r from-blue-500/20 to-blue-500/10 text-blue-400 border-blue-500/20">
              Detailed Comparison
            </Badge>
            <h2 className="text-4xl font-bold mb-6 tracking-tight text-gray-900 dark:text-white">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400">
                Compare Plans
              </span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              See which features are included in each plan to find the perfect fit for your team
            </p>
          </div>

          <div className="overflow-x-auto bg-white/30 dark:bg-gray-900/30 backdrop-blur-md rounded-xl border border-gray-200 dark:border-gray-800 shadow-xl">
            <div className="min-w-[768px]">
              {comparisonFeatures.map((section, sectionIndex) => (
                <div key={section.category} className={sectionIndex > 0 ? "" : ""}>
                  <div className="bg-gray-100/70 dark:bg-gray-900/70 backdrop-blur-sm p-4 border-b border-gray-200 dark:border-gray-800">
                    <h3 className="font-medium text-lg text-gray-900 dark:text-white">{section.category}</h3>
                  </div>
                  <div className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm overflow-hidden">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200 dark:border-gray-800">
                          <th className="text-left p-4 w-1/3 text-gray-900 dark:text-white">Feature</th>
                          <th className="text-center p-4 w-2/9">
                            <div className="flex flex-col items-center">
                              <span className="text-blue-400 font-medium">Starter</span>
                              <span className="text-gray-500 dark:text-gray-400 text-sm">$0</span>
                            </div>
                          </th>
                          <th className="text-center p-4 w-2/9 bg-gray-100/70 dark:bg-gray-900/70">
                            <div className="flex flex-col items-center">
                              <span className="text-red-400 font-medium">Pro</span>
                              <span className="text-gray-500 dark:text-gray-400 text-sm">
                                ${billingCycle === "monthly" ? "15" : "144"}/user
                              </span>
                            </div>
                          </th>
                          <th className="text-center p-4 w-2/9">
                            <div className="flex flex-col items-center">
                              <span className="text-purple-400 font-medium">Enterprise</span>
                              <span className="text-gray-500 dark:text-gray-400 text-sm">Custom</span>
                            </div>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {section.features.map((feature, index) => (
                          <tr
                            key={feature.name}
                            className={`border-b border-gray-200 dark:border-gray-800 ${index % 2 === 1 ? "bg-gray-50/30 dark:bg-gray-900/30" : ""}`}
                          >
                            <td className="p-4 text-gray-700 dark:text-gray-300">{feature.name}</td>
                            <td className="p-4 text-center">
                              {typeof feature.starter === "object" ? (
                                feature.starter
                              ) : (
                                <span className="text-gray-700 dark:text-gray-300">{feature.starter}</span>
                              )}
                            </td>
                            <td className="p-4 text-center bg-gray-100/30 dark:bg-gray-900/30">
                              {typeof feature.pro === "object" ? (
                                feature.pro
                              ) : (
                                <span className="text-gray-700 dark:text-gray-300">{feature.pro}</span>
                              )}
                            </td>
                            <td className="p-4 text-center">
                              {typeof feature.enterprise === "object" ? (
                                feature.enterprise
                              ) : (
                                <span className="text-gray-700 dark:text-gray-300">{feature.enterprise}</span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Testimonials */}
        <motion.div className="mb-32" variants={container} initial="hidden" animate="show">
          <div className="text-center mb-16">
            <Badge className="mb-4 px-4 py-1.5 text-sm bg-gradient-to-r from-purple-500/20 to-purple-500/10 text-purple-400 border-purple-500/20">
              Customer Stories
            </Badge>
            <h2 className="text-4xl font-bold mb-6 tracking-tight text-gray-900 dark:text-white">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400">
                Loved by Teams Worldwide
              </span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              See what our customers have to say about their experience with our plans
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
                    <div className="text-gray-500 dark:text-gray-400">{testimonial.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          className="mb-32"
          variants={item}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-16">
            <Badge className="mb-4 px-4 py-1.5 text-sm bg-gradient-to-r from-green-500/20 to-green-500/10 text-green-400 border-green-500/20">
              Questions & Answers
            </Badge>
            <h2 className="text-4xl font-bold mb-6 tracking-tight text-gray-900 dark:text-white">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400">
                Frequently Asked Questions
              </span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Find answers to common questions about our pricing and plans
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-gradient-to-br from-white/80 to-gray-50/40 dark:from-gray-900/80 dark:to-gray-900/40 backdrop-blur-sm border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden shadow-lg hover:border-gray-300 dark:hover:border-gray-700 transition-all duration-300"
              >
                <button
                  className="w-full p-6 text-left flex justify-between items-center"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  <h3 className="font-medium text-lg text-gray-900 dark:text-white">{faq.question}</h3>
                  <div
                    className={`w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center transition-transform duration-300 ${
                      openFaq === index ? "rotate-180" : ""
                    }`}
                  >
                    <ChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                  </div>
                </button>
                <AnimatePresence>
                  {openFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-6 text-gray-600 dark:text-gray-400 border-t border-gray-200 dark:border-gray-800 pt-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="relative mb-24 z-10 overflow-hidden"
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
                Need help deciding?
              </motion.h2>

              <motion.p
                className="text-blue-100 mb-10 max-w-2xl mx-auto text-center text-lg"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Compare plans in detail or talk to our team about your specific needs. We&apos;re here to help you find
                the perfect plan for your team.
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
                  <BarChart className="w-5 h-5" />
                  Compare Plans
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white/20 text-black dark:text-white hover:text-white hover:bg-white/10 transition-all duration-300 flex items-center gap-2 px-8 h-14 text-base font-medium"
                >
                  <MessageSquare className="w-5 h-5" />
                  Contact Sales
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Money Back Guarantee */}
        <motion.div
          className="text-center mb-12"
          variants={item}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="inline-flex items-center gap-3 bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm border border-gray-200 dark:border-gray-800 rounded-full px-8 py-4 shadow-xl">
            <Clock className="w-5 h-5 text-red-400" />
            <span className="text-gray-700 dark:text-gray-300 font-medium">
              30-day money-back guarantee on all paid plans
            </span>
          </div>
        </motion.div>
      </section>
    </motion.main>
  )
}
