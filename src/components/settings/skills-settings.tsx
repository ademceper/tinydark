"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Loader2, Plus, Trash2 } from 'lucide-react'
import { toast } from "sonner"
import { getUserSkills, addUserSkill, updateUserSkill, removeUserSkill } from "@/actions/user.actions"
import type { SkillLevel } from "@prisma/client"

interface UserSkill {
  id: string
  skill: string
  level: SkillLevel
  createdAt: Date
  updatedAt: Date
}

export default function SkillsSettings() {
  const [isLoading, setIsLoading] = useState(false)
  const [skills, setSkills] = useState<UserSkill[]>([])
  const [newSkill, setNewSkill] = useState({
    skill: "",
    level: "INTERMEDIATE" as SkillLevel,
  })

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const result = await getUserSkills()
        if (result.success) {
          setSkills(result.skills)
        }
      } catch (error) {
        console.error("Failed to fetch skills:", error)
      }
    }

    fetchSkills()
  }, [])

  const handleAddSkill = async () => {
    if (!newSkill.skill) {
      toast.error("Please enter a skill name")
      return
    }

    setIsLoading(true)

    try {
      const result = await addUserSkill({
        skill: newSkill.skill,
        level: newSkill.level,
      })

      if (result.success && result.skill) {
        setSkills([...skills, result.skill])
        setNewSkill({
          skill: "",
          level: "INTERMEDIATE",
        })
        toast.success("Skill added successfully")
      } else {
        toast.error("Failed to add skill", {
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

  const handleUpdateSkillLevel = async (skillId: string, level: SkillLevel) => {
    try {
      const result = await updateUserSkill(skillId, level)
      if (result.success) {
        setSkills(skills.map((skill) => (skill.id === skillId ? { ...skill, level } : skill)))
        toast.success("Skill updated successfully")
      } else {
        toast.error("Failed to update skill", {
          description: result.error,
        })
      }
    } catch (error) {
      toast.error("An error occurred")
      console.error(error)
    }
  }

  const handleRemoveSkill = async (skillId: string) => {
    try {
      const result = await removeUserSkill(skillId)
      if (result.success) {
        setSkills(skills.filter((skill) => skill.id !== skillId))
        toast.success("Skill removed successfully")
      } else {
        toast.error("Failed to remove skill", {
          description: result.error,
        })
      }
    } catch (error) {
      toast.error("An error occurred")
      console.error(error)
    }
  }

  const getProgressValue = (level: SkillLevel) => {
    switch (level) {
      case "BEGINNER":
        return 25
      case "INTERMEDIATE":
        return 50
      case "ADVANCED":
        return 75
      case "EXPERT":
        return 100
      default:
        return 0
    }
  }

  const getProgressColor = (level: SkillLevel) => {
    switch (level) {
      case "BEGINNER":
        return "bg-blue-400"
      case "INTERMEDIATE":
        return "bg-blue-500"
      case "ADVANCED":
        return "bg-blue-600"
      case "EXPERT":
        return "bg-blue-700"
      default:
        return "bg-blue-500"
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Skills & Expertise</h2>
        <p className="text-sm text-muted-foreground">Manage your skills and expertise levels</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your Skills</CardTitle>
          <CardDescription>Add skills to showcase your expertise to team members and on your profile</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex space-x-2">
            <div className="flex-1">
              <Input
                placeholder="Add a skill..."
                value={newSkill.skill}
                onChange={(e) => setNewSkill({ ...newSkill, skill: e.target.value })}
              />
            </div>
            <Select
              value={newSkill.level}
              onValueChange={(value) => setNewSkill({ ...newSkill, level: value as SkillLevel })}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="BEGINNER">Beginner</SelectItem>
                <SelectItem value="INTERMEDIATE">Intermediate</SelectItem>
                <SelectItem value="ADVANCED">Advanced</SelectItem>
                <SelectItem value="EXPERT">Expert</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={handleAddSkill} disabled={isLoading || !newSkill.skill}>
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
            </Button>
          </div>

          {skills.length === 0 ? (
            <div className="text-center py-6">
              <p className="text-sm text-muted-foreground">No skills added yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {skills.map((skill) => (
                <div key={skill.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="font-medium">{skill.skill}</Label>
                    <div className="flex items-center space-x-2">
                      <Select
                        value={skill.level}
                        onValueChange={(value) => handleUpdateSkillLevel(skill.id, value as SkillLevel)}
                      >
                        <SelectTrigger className="w-[140px] h-8">
                          <SelectValue placeholder="Select level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="BEGINNER">Beginner</SelectItem>
                          <SelectItem value="INTERMEDIATE">Intermediate</SelectItem>
                          <SelectItem value="ADVANCED">Advanced</SelectItem>
                          <SelectItem value="EXPERT">Expert</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleRemoveSkill(skill.id)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                  <Progress value={getProgressValue(skill.level)} className={`h-2 ${getProgressColor(skill.level)}`} />
                </div>
              ))}
            </div>
          )}
        </CardContent>
        <CardFooter>
          <p className="text-sm text-muted-foreground">
            Skills you add here will be visible on your profile and may be used for project matching
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}