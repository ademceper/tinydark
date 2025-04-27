"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useTheme } from "next-themes"
import { updateUserPreference } from "@/actions/user.actions"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"

interface AppearanceSettingsProps {
  preferences: Record<string, string>
}

export default function AppearanceSettings({ preferences }: AppearanceSettingsProps) {
  const { theme, setTheme } = useTheme()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    font: preferences.font || "inter",
    theme: theme || preferences.theme || "light",
  })

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (name === "theme") {
      setTheme(value)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const updates = [
        { preference: "theme", value: formData.theme },
        { preference: "font", value: formData.font },
      ]

      const results = await Promise.all(updates.map((update) => updateUserPreference(update.preference, update.value)))

      if (results.every((result) => result.success)) {
        toast.success("Appearance settings updated successfully")
      } else {
        toast.error("Failed to update some appearance settings")
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
        <h2 className="text-xl font-semibold">Appearance</h2>
        <p className="text-sm text-muted-foreground">
          Customize the appearance of the app. Automatically switch between day and night themes.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="font">Font</Label>
            <Select value={formData.font} onValueChange={(value) => handleSelectChange("font", value)}>
              <SelectTrigger id="font">
                <SelectValue placeholder="Select font" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="inter">Inter</SelectItem>
                <SelectItem value="manrope">Manrope</SelectItem>
                <SelectItem value="system">System</SelectItem>
                <SelectItem value="mono">Monospace</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">Set the font you want to use in the dashboard.</p>
          </div>

          <div className="space-y-2">
            <Label>Theme</Label>
            <p className="text-xs text-muted-foreground mb-3">Select the theme for the dashboard.</p>

            <div className="grid grid-cols-2 gap-4">
              <div
                className={`cursor-pointer border rounded-md p-3 ${formData.theme === "light" ? "border-primary" : "border-border"}`}
                onClick={() => handleSelectChange("theme", "light")}
              >
                <div className="h-20 bg-[#f8f9fa] border rounded-md flex items-center justify-center mb-2">
                  <div className="w-3/4">
                    <div className="h-2 bg-[#e9ecef] rounded mb-1"></div>
                    <div className="h-2 bg-[#e9ecef] rounded mb-1 w-3/4"></div>
                    <div className="h-2 bg-[#e9ecef] rounded w-1/2"></div>
                  </div>
                </div>
                <div className="text-center text-sm">Light</div>
              </div>

              <div
                className={`cursor-pointer border rounded-md p-3 ${formData.theme === "dark" ? "border-primary" : "border-border"}`}
                onClick={() => handleSelectChange("theme", "dark")}
              >
                <div className="h-20 bg-[#212529] border rounded-md flex items-center justify-center mb-2">
                  <div className="w-3/4">
                    <div className="h-2 bg-[#495057] rounded mb-1"></div>
                    <div className="h-2 bg-[#495057] rounded mb-1 w-3/4"></div>
                    <div className="h-2 bg-[#495057] rounded w-1/2"></div>
                  </div>
                </div>
                <div className="text-center text-sm">Dark</div>
              </div>
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
            "Update preferences"
          )}
        </Button>
      </form>
    </div>
  )
}
