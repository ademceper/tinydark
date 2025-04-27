import { DashboardHeader } from "@/components/dashboard/organization/header";
import { DashboardStats } from "@/components/dashboard/organization/stat";
import { OrganizationTabs } from "@/components/dashboard/organization/tabs";
import { OrganizationEventsTasks } from "@/components/dashboard/organization/event-tasks";
import OrganizationCards from "@/components/dashboard/organization/cards";
import Resources from "@/components/dashboard/organization/resources";
import { ActivityQuickAccess } from "@/components/dashboard/organization/activity-quick-access";
import { MobileNavigationBar } from "@/components/dashboard/organization/mobile-nav-bar";

const organizations = [
  {
    id: "org-1",
    name: "Acme Inc",
    role: "Owner",
    members: 24,
    plan: "Enterprise",
    status: "Active",
    created: "Jan 12, 2023",
    lastActive: "2 hours ago",
    projects: [
      {
        id: "proj-1",
        name: "Website Redesign",
        description: "Company website overhaul",
        starred: true,
        updatedAt: "2 hours ago",
        members: 5,
        status: "In Progress",
        priority: "High",
        dueDate: "Jun 30, 2023",
        progress: 65,
        tags: ["design", "frontend", "marketing"],
        tasks: {
          total: 48,
          completed: 32,
        },
      },
      {
        id: "proj-2",
        name: "Mobile App",
        description: "iOS and Android application",
        starred: false,
        updatedAt: "1 day ago",
        members: 8,
        status: "Planning",
        priority: "Medium",
        dueDate: "Aug 15, 2023",
        progress: 25,
        tags: ["mobile", "development", "ui/ux"],
        tasks: {
          total: 76,
          completed: 19,
        },
      },
      {
        id: "proj-3",
        name: "Marketing Campaign",
        description: "Q3 marketing initiatives",
        starred: false,
        updatedAt: "3 days ago",
        members: 3,
        status: "Not Started",
        priority: "Low",
        dueDate: "Sep 1, 2023",
        progress: 10,
        tags: ["marketing", "social-media", "content"],
        tasks: {
          total: 32,
          completed: 3,
        },
      },
      {
        id: "proj-8",
        name: "CRM Integration",
        description: "Integrate new CRM system",
        starred: true,
        updatedAt: "5 hours ago",
        members: 4,
        status: "In Progress",
        priority: "Critical",
        dueDate: "Jul 15, 2023",
        progress: 45,
        tags: ["integration", "backend", "data"],
        tasks: {
          total: 56,
          completed: 25,
        },
      },
      {
        id: "proj-9",
        name: "Product Launch",
        description: "New product line launch",
        starred: false,
        updatedAt: "2 days ago",
        members: 12,
        status: "Planning",
        priority: "High",
        dueDate: "Oct 10, 2023",
        progress: 15,
        tags: ["product", "marketing", "sales"],
        tasks: {
          total: 87,
          completed: 13,
        },
      },
      {
        id: "proj-10",
        name: "Office Relocation",
        description: "Move to new headquarters",
        starred: false,
        updatedAt: "1 week ago",
        members: 6,
        status: "On Hold",
        priority: "Medium",
        dueDate: "Dec 1, 2023",
        progress: 5,
        tags: ["logistics", "facilities", "planning"],
        tasks: {
          total: 42,
          completed: 2,
        },
      },
    ],
    teams: [
      {
        id: "team-1",
        name: "Engineering",
        members: 12,
        projects: 5,
        lead: "Jane Smith",
      },
      {
        id: "team-2",
        name: "Marketing",
        members: 8,
        projects: 3,
        lead: "John Doe",
      },
      {
        id: "team-3",
        name: "Design",
        members: 6,
        projects: 4,
        lead: "Alice Johnson",
      },
    ],
    resources: {
      storage: {
        used: 75,
        total: 100,
        unit: "GB",
      },
      compute: {
        used: 60,
        total: 100,
        unit: "%",
      },
      bandwidth: {
        used: 45,
        total: 100,
        unit: "TB",
      },
    },
    billing: {
      plan: "Enterprise",
      amount: "$999/month",
      nextBilling: "Jun 15, 2023",
      paymentMethod: "Visa ending in 4242",
    },
    activity: [
      {
        id: "act-1",
        user: "Jane Smith",
        action: "created project",
        target: "Website Redesign",
        timestamp: "2 hours ago",
      },
      {
        id: "act-2",
        user: "John Doe",
        action: "completed task",
        target: "Design homepage mockup",
        timestamp: "5 hours ago",
      },
      {
        id: "act-3",
        user: "Alice Johnson",
        action: "commented on",
        target: "Mobile App project",
        timestamp: "1 day ago",
      },
    ],
  },
  {
    id: "org-2",
    name: "Personal",
    role: "Owner",
    members: 1,
    plan: "Free",
    status: "Active",
    created: "Mar 5, 2023",
    lastActive: "1 day ago",
    projects: [
      {
        id: "proj-4",
        name: "Portfolio",
        description: "Personal portfolio website",
        starred: true,
        updatedAt: "5 days ago",
        members: 1,
        status: "In Progress",
        priority: "Medium",
        dueDate: "Jul 20, 2023",
        progress: 70,
        tags: ["personal", "portfolio", "design"],
        tasks: {
          total: 24,
          completed: 17,
        },
      },
      {
        id: "proj-5",
        name: "Side Project",
        description: "Experimental web app",
        starred: false,
        updatedAt: "1 week ago",
        members: 2,
        status: "On Hold",
        priority: "Low",
        dueDate: "None",
        progress: 30,
        tags: ["experiment", "development", "personal"],
        tasks: {
          total: 18,
          completed: 5,
        },
      },
      {
        id: "proj-11",
        name: "Blog Redesign",
        description: "Update personal blog",
        starred: false,
        updatedAt: "3 days ago",
        members: 1,
        status: "Not Started",
        priority: "Low",
        dueDate: "Aug 30, 2023",
        progress: 5,
        tags: ["blog", "content", "design"],
        tasks: {
          total: 15,
          completed: 1,
        },
      },
    ],
    teams: [],
    resources: {
      storage: {
        used: 2,
        total: 5,
        unit: "GB",
      },
      compute: {
        used: 15,
        total: 100,
        unit: "%",
      },
      bandwidth: {
        used: 0.5,
        total: 1,
        unit: "TB",
      },
    },
    billing: {
      plan: "Free",
      amount: "$0/month",
      nextBilling: "N/A",
      paymentMethod: "None",
    },
    activity: [
      {
        id: "act-4",
        user: "You",
        action: "updated project",
        target: "Portfolio",
        timestamp: "5 days ago",
      },
      {
        id: "act-5",
        user: "You",
        action: "created project",
        target: "Side Project",
        timestamp: "1 week ago",
      },
    ],
  },
  {
    id: "org-3",
    name: "Startup Co",
    role: "Member",
    members: 8,
    plan: "Pro",
    status: "Active",
    created: "Feb 18, 2023",
    lastActive: "3 hours ago",
    projects: [
      {
        id: "proj-6",
        name: "Product Launch",
        description: "New product release",
        starred: false,
        updatedAt: "2 days ago",
        members: 12,
        status: "In Progress",
        priority: "Critical",
        dueDate: "Jun 25, 2023",
        progress: 85,
        tags: ["product", "launch", "marketing"],
        tasks: {
          total: 64,
          completed: 54,
        },
      },
      {
        id: "proj-7",
        name: "Investor Deck",
        description: "Funding presentation",
        starred: true,
        updatedAt: "12 hours ago",
        members: 4,
        status: "Review",
        priority: "High",
        dueDate: "Jun 10, 2023",
        progress: 95,
        tags: ["investor", "presentation", "funding"],
        tasks: {
          total: 28,
          completed: 26,
        },
      },
      {
        id: "proj-12",
        name: "Market Research",
        description: "Competitor analysis",
        starred: false,
        updatedAt: "4 days ago",
        members: 3,
        status: "Completed",
        priority: "Medium",
        dueDate: "May 30, 2023",
        progress: 100,
        tags: ["research", "market", "analysis"],
        tasks: {
          total: 32,
          completed: 32,
        },
      },
      {
        id: "proj-13",
        name: "Hiring Campaign",
        description: "Recruit new developers",
        starred: false,
        updatedAt: "1 day ago",
        members: 2,
        status: "In Progress",
        priority: "High",
        dueDate: "Jul 15, 2023",
        progress: 40,
        tags: ["hiring", "recruitment", "hr"],
        tasks: {
          total: 18,
          completed: 7,
        },
      },
    ],
    teams: [
      {
        id: "team-4",
        name: "Product",
        members: 5,
        projects: 2,
        lead: "Michael Brown",
      },
      {
        id: "team-5",
        name: "Sales",
        members: 3,
        projects: 1,
        lead: "Sarah Wilson",
      },
    ],
    resources: {
      storage: {
        used: 15,
        total: 20,
        unit: "GB",
      },
      compute: {
        used: 75,
        total: 100,
        unit: "%",
      },
      bandwidth: {
        used: 3,
        total: 5,
        unit: "TB",
      },
    },
    billing: {
      plan: "Pro",
      amount: "$99/month",
      nextBilling: "Jun 18, 2023",
      paymentMethod: "Mastercard ending in 5678",
    },
    activity: [
      {
        id: "act-6",
        user: "Michael Brown",
        action: "updated project",
        target: "Product Launch",
        timestamp: "2 days ago",
      },
      {
        id: "act-7",
        user: "Sarah Wilson",
        action: "completed task",
        target: "Finalize investor presentation",
        timestamp: "12 hours ago",
      },
      {
        id: "act-8",
        user: "David Lee",
        action: "commented on",
        target: "Market Research project",
        timestamp: "4 days ago",
      },
    ],
  },
  {
    id: "org-4",
    name: "Enterprise Corp",
    role: "Admin",
    members: 150,
    plan: "Enterprise Plus",
    status: "Active",
    created: "Jan 5, 2023",
    lastActive: "1 hour ago",
    projects: [
      {
        id: "proj-14",
        name: "Digital Transformation",
        description: "Company-wide digital initiative",
        starred: true,
        updatedAt: "6 hours ago",
        members: 45,
        status: "In Progress",
        priority: "Critical",
        dueDate: "Dec 31, 2023",
        progress: 35,
        tags: ["transformation", "digital", "enterprise"],
        tasks: {
          total: 248,
          completed: 87,
        },
      },
      {
        id: "proj-15",
        name: "Security Audit",
        description: "Annual security review",
        starred: false,
        updatedAt: "2 days ago",
        members: 8,
        status: "In Progress",
        priority: "High",
        dueDate: "Jul 30, 2023",
        progress: 60,
        tags: ["security", "audit", "compliance"],
        tasks: {
          total: 56,
          completed: 34,
        },
      },
      {
        id: "proj-16",
        name: "Cloud Migration",
        description: "Move infrastructure to cloud",
        starred: true,
        updatedAt: "1 day ago",
        members: 12,
        status: "Planning",
        priority: "High",
        dueDate: "Sep 15, 2023",
        progress: 20,
        tags: ["cloud", "infrastructure", "migration"],
        tasks: {
          total: 124,
          completed: 25,
        },
      },
    ],
    teams: [
      {
        id: "team-6",
        name: "IT Operations",
        members: 35,
        projects: 5,
        lead: "Robert Chen",
      },
      {
        id: "team-7",
        name: "Security",
        members: 12,
        projects: 3,
        lead: "Lisa Wong",
      },
      {
        id: "team-8",
        name: "Development",
        members: 48,
        projects: 8,
        lead: "James Miller",
      },
      {
        id: "team-9",
        name: "Data Science",
        members: 15,
        projects: 4,
        lead: "Emily Davis",
      },
    ],
    resources: {
      storage: {
        used: 750,
        total: 1000,
        unit: "GB",
      },
      compute: {
        used: 85,
        total: 100,
        unit: "%",
      },
      bandwidth: {
        used: 45,
        total: 50,
        unit: "TB",
      },
    },
    billing: {
      plan: "Enterprise Plus",
      amount: "$4,999/month",
      nextBilling: "Jun 5, 2023",
      paymentMethod: "ACH Transfer",
    },
    activity: [
      {
        id: "act-9",
        user: "Robert Chen",
        action: "updated project",
        target: "Cloud Migration",
        timestamp: "1 day ago",
      },
      {
        id: "act-10",
        user: "Lisa Wong",
        action: "completed task",
        target: "Security vulnerability assessment",
        timestamp: "2 days ago",
      },
      {
        id: "act-11",
        user: "James Miller",
        action: "created project",
        target: "API Gateway Implementation",
        timestamp: "3 days ago",
      },
    ],
  },
];

// Sample upcoming events
const upcomingEvents = [
  {
    id: "event-1",
    title: "Team Standup",
    date: "Today, 10:00 AM",
    duration: "30 minutes",
    attendees: 8,
    location: "Zoom Meeting",
  },
  {
    id: "event-2",
    title: "Project Review",
    date: "Today, 2:00 PM",
    duration: "1 hour",
    attendees: 5,
    location: "Conference Room A",
  },
  {
    id: "event-3",
    title: "Client Presentation",
    date: "Tomorrow, 11:00 AM",
    duration: "2 hours",
    attendees: 12,
    location: "Main Boardroom",
  },
  {
    id: "event-4",
    title: "Sprint Planning",
    date: "Jun 10, 9:00 AM",
    duration: "3 hours",
    attendees: 15,
    location: "Virtual Meeting",
  },
];

// Sample tasks
const tasks = [
  {
    id: "task-1",
    title: "Review homepage design",
    project: "Website Redesign",
    dueDate: "Today",
    priority: "High",
    status: "In Progress",
  },
  {
    id: "task-2",
    title: "Prepare investor presentation",
    project: "Investor Deck",
    dueDate: "Tomorrow",
    priority: "Critical",
    status: "In Progress",
  },
  {
    id: "task-3",
    title: "Update project timeline",
    project: "Mobile App",
    dueDate: "Jun 9",
    priority: "Medium",
    status: "Not Started",
  },
  {
    id: "task-4",
    title: "Review competitor analysis",
    project: "Market Research",
    dueDate: "Jun 12",
    priority: "Low",
    status: "Not Started",
  },
  {
    id: "task-5",
    title: "Finalize content strategy",
    project: "Marketing Campaign",
    dueDate: "Jun 15",
    priority: "Medium",
    status: "Not Started",
  },
];

// Sample invitation requests
const invitationRequests = [
  {
    id: "invite-1",
    name: "Emma Thompson",
    email: "emma.thompson@example.com",
    role: "Designer",
    organization: "Acme Inc",
    date: "Jun 5, 2023",
  },
  {
    id: "invite-2",
    name: "Michael Rodriguez",
    email: "michael.r@example.com",
    role: "Developer",
    organization: "Acme Inc",
    date: "Jun 4, 2023",
  },
  {
    id: "invite-3",
    name: "Sophia Chen",
    email: "sophia.chen@example.com",
    role: "Product Manager",
    organization: "Startup Co",
    date: "Jun 3, 2023",
  },
];

// Sample security alerts
const securityAlerts = [
  {
    id: "alert-1",
    title: "Unusual login attempt",
    description:
      "Unsuccessful login attempt from an unrecognized device in Berlin, Germany",
    severity: "High",
    time: "2 hours ago",
  },
  {
    id: "alert-2",
    title: "Password expiring soon",
    description: "Your password will expire in 5 days. Please update it.",
    severity: "Medium",
    time: "1 day ago",
  },
  {
    id: "alert-3",
    title: "New device logged in",
    description: "New login from MacBook Pro in San Francisco, CA",
    severity: "Low",
    time: "3 days ago",
  },
];

// Sample integrations
const integrations = [
  {
    id: "integration-1",
    name: "GitHub",
    status: "Connected",
    lastSync: "10 minutes ago",
  },
  {
    id: "integration-2",
    name: "Slack",
    status: "Connected",
    lastSync: "5 minutes ago",
  },
  {
    id: "integration-3",
    name: "Google Drive",
    status: "Connected",
    lastSync: "1 hour ago",
  },
  {
    id: "integration-4",
    name: "Jira",
    status: "Issue",
    lastSync: "Failed 2 hours ago",
  },
  {
    id: "integration-5",
    name: "Figma",
    status: "Connected",
    lastSync: "30 minutes ago",
  },
];

// Sample marketplace highlights
const marketplaceHighlights = [
  {
    id: "marketplace-1",
    name: "Advanced Analytics",
    category: "Analytics",
    rating: 4.8,
    installs: "5.2k",
    price: "Free",
  },
  {
    id: "marketplace-2",
    name: "Custom Workflows",
    category: "Productivity",
    rating: 4.6,
    installs: "3.8k",
    price: "$5/month",
  },
  {
    id: "marketplace-3",
    name: "AI Assistant",
    category: "Automation",
    rating: 4.9,
    installs: "10k+",
    price: "$10/month",
  },
];

// Sample news and updates
const newsAndUpdates = [
  {
    id: "news-1",
    title: "New Feature: Custom Dashboards",
    description: "Create personalized dashboards with drag-and-drop widgets",
    date: "Jun 5, 2023",
    category: "Product Update",
  },
  {
    id: "news-2",
    title: "Upcoming Maintenance",
    description:
      "Scheduled maintenance on Jun 10, 2023, from 2:00 AM to 4:00 AM UTC",
    date: "Jun 3, 2023",
    category: "Maintenance",
  },
  {
    id: "news-3",
    title: "New Integration: Microsoft Teams",
    description:
      "Connect your projects with Microsoft Teams for seamless collaboration",
    date: "Jun 1, 2023",
    category: "Integration",
  },
];

export default function DashboardPage() {
  return (
    <>
      <DashboardStats
        title="Dashboard"
        organizations={organizations}
        showDateRangePicker={true}
        showFilter={true}
        showNewButton={true}
      />

      <OrganizationTabs organizations={organizations} />

      <OrganizationEventsTasks upcomingEvents={upcomingEvents} tasks={tasks} />

      <ActivityQuickAccess organizations={organizations} />

      <OrganizationCards
        invitationRequests={invitationRequests}
        securityAlerts={securityAlerts}
        integrations={integrations}
      />

      <Resources
        marketplaceHighlights={marketplaceHighlights}
        newsAndUpdates={newsAndUpdates}
      />
    </>
  );
}
