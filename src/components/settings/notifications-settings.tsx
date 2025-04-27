"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import { updateUserPreference } from "@/actions/user.actions"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"

interface NotificationSettingsProps {
  preferences: Record<string, string>
}

export default function NotificationSettings({ preferences }: NotificationSettingsProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [notifyAbout, setNotifyAbout] = useState(preferences.notification_level || "all")
  const [emailSettings, setEmailSettings] = useState<{
    communication: boolean
    marketing: boolean
    social: boolean
    security: boolean
  }>({
    communication: preferences.email_communication === "true" || true,
    marketing: preferences.email_marketing === "true" || false,
    social: preferences.email_social === "true" || true,
    security: preferences.email_security === "true" || true,
  })
  const [useDifferentSettings, setUseDifferentSettings] = useState(
    preferences.different_mobile_settings === "true" || false,
  )

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const updates = [
        { preference: "notification_level", value: notifyAbout },
        { preference: "email_communication", value: emailSettings.communication.toString() },
        { preference: "email_marketing", value: emailSettings.marketing.toString() },
        { preference: "email_social", value: emailSettings.social.toString() },
        { preference: "email_security", value: emailSettings.security.toString() },
        { preference: "different_mobile_settings", value: useDifferentSettings.toString() },
      ]

      const results = await Promise.all(updates.map((update) => updateUserPreference(update.preference, update.value)))

      if (results.every((result) => result.success)) {
        toast.success("Notification settings updated successfully")
      } else {
        toast.error("Failed to update some notification settings")
      }
    } catch (error) {
      toast.error("An error occurred")
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Notifications</h2>
        <p className="text-sm text-muted-foreground">Configure how you receive notifications.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-3">
            <Label>Notify me about...</Label>
            <RadioGroup value={notifyAbout} onValueChange={setNotifyAbout}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="all" id="all" />
                <Label htmlFor="all" className="font-normal">
                  All new messages
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="direct" id="direct" />
                <Label htmlFor="direct" className="font-normal">
                  Direct messages and mentions
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="none" id="none" />
                <Label htmlFor="none" className="font-normal">
                  Nothing
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-3">
            <Label>Email Notifications</Label>

            <div className="space-y-3">
              <div className="flex justify-between items-center border rounded-md p-3">
                <div>
                  <p className="font-medium">Communication emails</p>
                  <p className="text-sm text-muted-foreground">Receive emails about your account activity.</p>
                </div>
                <Switch
                  checked={emailSettings.communication}
                  onCheckedChange={(checked) => setEmailSettings((prev) => ({ ...prev, communication: checked }))}
                />
              </div>

              <div className="flex justify-between items-center border rounded-md p-3">
                <div>
                  <p className="font-medium">Marketing emails</p>
                  <p className="text-sm text-muted-foreground">
                    Receive emails about new products, features, and more.
                  </p>
                </div>
                <Switch
                  checked={emailSettings.marketing}
                  onCheckedChange={(checked) => setEmailSettings((prev) => ({ ...prev, marketing: checked }))}
                />
              </div>

              <div className="flex justify-between items-center border rounded-md p-3">
                <div>
                  <p className="font-medium">Social emails</p>
                  <p className="text-sm text-muted-foreground">
                    Receive emails for friend requests, follows, and more.
                  </p>
                </div>
                <Switch
                  checked={emailSettings.social}
                  onCheckedChange={(checked) => setEmailSettings((prev) => ({ ...prev, social: checked }))}
                />
              </div>

              <div className="flex justify-between items-center border rounded-md p-3">
                <div>
                  <p className="font-medium">Security emails</p>
                  <p className="text-sm text-muted-foreground">
                    Receive emails about your account activity and security.
                  </p>
                </div>
                <Switch
                  checked={emailSettings.security}
                  onCheckedChange={(checked) => setEmailSettings((prev) => ({ ...prev, security: checked }))}
                />
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2 pt-2">
            <Checkbox
              id="different-settings"
              checked={useDifferentSettings}
              onCheckedChange={(checked) => setUseDifferentSettings(checked as boolean)}
            />
            <div className="grid gap-1.5">
              <Label htmlFor="different-settings" className="font-normal">
                Use different settings for my mobile devices
              </Label>
              <p className="text-sm text-muted-foreground">
                You can manage your mobile notifications in the mobile settings page.
              </p>
            </div>
          </div>
        </div>

        <Button type="submit" disabled={isLoading} className="w-36 bg-black text-white hover:bg-gray-800">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            "Update notifications"
          )}
        </Button>
      </form>
    </div>
  )
}
