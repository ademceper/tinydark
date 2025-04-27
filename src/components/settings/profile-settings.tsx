"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { updateProfile } from "@/actions/user.actions"
import { toast } from "sonner"
import { Loader2, Upload } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface ProfileSettingsProps {
  user: {
    id: string
    email: string
    fullName: string
    title?: string | null
    avatar?: { url: string } | null
  }
}

export default function ProfileSettings({ user }: ProfileSettingsProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    fullName: user.fullName || "",
    title: user.title || "",
    bio: "",
    website: "",
    twitter: "",
  })

  // Get user initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const result = await updateProfile({
        fullName: formData.fullName,
        title: formData.title,
        bio: formData.bio,
        website: formData.website,
        twitter: formData.twitter,
      })

      if (result.success) {
        toast.success("Profile updated successfully")
      } else {
        toast.error("Failed to update profile", {
          description: result.error,
        })
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
        <h2 className="text-xl font-semibold">Profile</h2>
        <p className="text-sm text-muted-foreground">This is how others will see you on the site.</p>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative">
          <Avatar className="h-20 w-20">
            <AvatarImage src={user.avatar?.url || "/placeholder.svg"} alt={user.fullName} />
            <AvatarFallback className="text-xl">{getInitials(user.fullName)}</AvatarFallback>
          </Avatar>
          <Button
            size="icon"
            variant="outline"
            className="absolute bottom-0 right-0 h-6 w-6 rounded-full bg-background shadow-sm hover:bg-accent"
          >
            <Upload className="h-3 w-3" />
          </Button>
        </div>
        <div>
          <h3 className="font-medium">Profile Picture</h3>
          <p className="text-sm text-muted-foreground">JPG, GIF or PNG. Max size of 800K</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} />
            <p className="text-xs text-muted-foreground">
              This is your public display name. It can be your real name or a pseudonym.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Job Title</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Software Engineer"
            />
            <p className="text-xs text-muted-foreground">Your role or position will be visible to team members.</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Select defaultValue="primary">
              <SelectTrigger>
                <SelectValue placeholder="Select a verified email to display" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="primary">{user.email}</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              You can manage verified email addresses in your email settings.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea id="bio" name="bio" value={formData.bio} onChange={handleChange} rows={3} />
            <p className="text-xs text-muted-foreground">
              You can @mention other users and organizations to link to them.
            </p>
          </div>

          <div className="space-y-2">
            <Label>URLs</Label>
            <p className="text-xs text-muted-foreground mb-2">
              Add links to your website, blog, or social media profiles.
            </p>

            <div className="space-y-3">
              <Input
                name="website"
                value={formData.website}
                onChange={handleChange}
                placeholder="https://example.com"
              />

              <Input
                name="twitter"
                value={formData.twitter}
                onChange={handleChange}
                placeholder="https://twitter.com/username"
              />

              <Button type="button" variant="outline" size="sm" className="w-full">
                Add URL
              </Button>
            </div>
          </div>
        </div>

        <Button type="submit" disabled={isLoading} className="w-32 bg-black text-white hover:bg-gray-800">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            "Update profile"
          )}
        </Button>
      </form>
    </div>
  )
}
