import { redirect } from "next/navigation"

import SettingsContent from "@/components/settings/settings-content"
import type { Metadata } from "next"
import { prisma } from "@/lib/db/client"
import { getCurrentUser } from "@/actions/user.actions"

export const metadata: Metadata = {
  title: "Settings | Orbit Suite",
  description: "Manage your account settings and preferences",
}

export default async function SettingsPage() {
  // Get the current user with all the necessary data
  const { success, user } = await getCurrentUser()

  if (!success || !user) {
    redirect("/sign-in")
  }

  // Get the user with more details
  const fullUser = await prisma.user.findUnique({
    where: { id: user.id },
    select: {
      id: true,
      email: true,
      fullName: true,
      title: true,
      avatar: true,
      coverImage: true,
      timezone: true,
      locale: true,
      isActive: true,
      isVerified: true,
      twoFactorEnabled: true,
      lastLoginAt: true,
      createdAt: true,
    },
  })

  if (!fullUser) {
    redirect("/sign-in")
  }

  return <SettingsContent user={fullUser} />
}
