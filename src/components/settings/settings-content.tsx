"use client"

import { useState, useEffect } from "react"
import ProfileSettings from "@/components/settings/profile-settings"
import AccountSettings from "@/components/settings/account-settings"
import SecuritySettings from "@/components/settings/security-setting"
import AppearanceSettings from "@/components/settings/appearance-settings"
import NotificationSettings from "@/components/settings/notifications-settings"
import SocialAccountsSettings from "@/components/settings/social-accounts-settings"
import ApiKeysSettings from "@/components/settings/api-keys-settings"
import SkillsSettings from "@/components/settings/skills-settings"
import SessionsSettings from "@/components/settings/sessions-settings"
import { getUserPreferences } from "@/actions/user.actions"
import { Loader2 } from "lucide-react"

interface SettingsContentProps {
  user: {
    id: string
    email: string
    fullName: string
    title?: string | null
    avatar?: { url: string } | null
    coverImage?: { url: string } | null
    isActive: boolean
    isVerified?: boolean
    timezone?: string
    locale?: string
    twoFactorEnabled?: boolean
    lastLoginAt?: Date | null
  }
}

export default function SettingsContent({ user }: SettingsContentProps) {
  const [activeTab, setActiveTab] = useState("profile")
  const [preferences, setPreferences] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(true)

  // Fetch user preferences
  useEffect(() => {
    const fetchPreferences = async () => {
      try {
        setIsLoading(true)
        const result = await getUserPreferences()
        if (result.success) {
          setPreferences(result.preferences)
        }
      } catch (error) {
        console.error("Failed to fetch user preferences:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchPreferences()
  }, [])

  const tabs = [
    { id: "profile", label: "Profile" },
    { id: "account", label: "Account" },
    { id: "security", label: "Security" },
    { id: "appearance", label: "Appearance" },
    { id: "notifications", label: "Notifications" },
    { id: "social-accounts", label: "Social Accounts" },
    { id: "api-keys", label: "API Keys" },
    { id: "skills", label: "Skills" },
    { id: "sessions", label: "Sessions" },
  ]

  return (
    <div className="container max-w-6xl py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Manage your account settings and set e-mail preferences.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Settings navigation */}
        <div className="md:w-48 shrink-0">
          <nav className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`block w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
                  activeTab === tab.id
                    ? "bg-muted text-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Settings content */}
        <div className="flex-1 min-w-0">
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <>
              {activeTab === "profile" && <ProfileSettings user={user} />}
              {activeTab === "account" && <AccountSettings user={user} />}
              {activeTab === "security" && <SecuritySettings user={user} />}
              {activeTab === "appearance" && <AppearanceSettings preferences={preferences} />}
              {activeTab === "notifications" && <NotificationSettings preferences={preferences} />}
              {activeTab === "social-accounts" && <SocialAccountsSettings />}
              {activeTab === "api-keys" && <ApiKeysSettings />}
              {activeTab === "skills" && <SkillsSettings />}
              {activeTab === "sessions" && <SessionsSettings />}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
