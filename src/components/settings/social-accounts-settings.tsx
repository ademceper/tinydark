"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Github, ChromeIcon as Google, Twitter, Linkedin } from "lucide-react"
import { toast } from "sonner"
import { getSocialAccounts, connectSocialAccount, disconnectSocialAccount } from "@/actions/user.actions"

interface SocialAccount {
  id: string
  provider: string
  providerId: string
  email?: string | null
  name?: string | null
  avatar?: string | null
  createdAt: Date
}

export default function SocialAccountsSettings() {
  const [isLoading, setIsLoading] = useState<string | null>(null)
  const [socialAccounts, setSocialAccounts] = useState<SocialAccount[]>([])

  useEffect(() => {
    const fetchSocialAccounts = async () => {
      try {
        const result = await getSocialAccounts()
        if (result.success) {
          setSocialAccounts(result.accounts)
        }
      } catch (error) {
        console.error("Failed to fetch social accounts:", error)
      }
    }

    fetchSocialAccounts()
  }, [])

  const getProviderIcon = (provider: string) => {
    switch (provider.toLowerCase()) {
      case "google":
        return <Google className="h-5 w-5" />
      case "github":
        return <Github className="h-5 w-5" />
      case "twitter":
        return <Twitter className="h-5 w-5" />
      case "linkedin":
        return <Linkedin className="h-5 w-5" />
      default:
        return null
    }
  }

  const getProviderName = (provider: string) => {
    switch (provider.toLowerCase()) {
      case "google":
        return "Google"
      case "github":
        return "GitHub"
      case "twitter":
        return "Twitter"
      case "linkedin":
        return "LinkedIn"
      default:
        return provider
    }
  }

  const handleConnect = async (provider: string) => {
    setIsLoading(provider)

    try {
      const result = await connectSocialAccount(provider)

      if (result.success) {
        toast.success(`Connected to ${getProviderName(provider)}`)

        // Refresh social accounts list
        const accountsResult = await getSocialAccounts()
        if (accountsResult.success) {
          setSocialAccounts(accountsResult.accounts)
        }
      } else {
        toast.error(`Failed to connect to ${getProviderName(provider)}`, {
          description: result.error,
        })
      }
    } catch (error) {
      toast.error("An error occurred")
      console.error(error)
    } finally {
      setIsLoading(null)
    }
  }

  const handleDisconnect = async (accountId: string, provider: string) => {
    setIsLoading(provider)

    try {
      const result = await disconnectSocialAccount(accountId)

      if (result.success) {
        toast.success(`Disconnected from ${getProviderName(provider)}`)
        setSocialAccounts(socialAccounts.filter((account) => account.id !== accountId))
      } else {
        toast.error(`Failed to disconnect from ${getProviderName(provider)}`, {
          description: result.error,
        })
      }
    } catch (error) {
      toast.error("An error occurred")
      console.error(error)
    } finally {
      setIsLoading(null)
    }
  }

  // List of available providers
  const availableProviders = ["google", "github", "twitter", "linkedin"]

  // Filter out providers that are already connected
  const connectedProviders = socialAccounts.map((account) => account.provider.toLowerCase())
  const unconnectedProviders = availableProviders.filter(
    (provider) => !connectedProviders.includes(provider.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Social Accounts</h2>
        <p className="text-sm text-muted-foreground">
          Connect your social accounts to enable single sign-on and other features
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Connected Accounts</CardTitle>
          <CardDescription>Connect your accounts to enable single sign-on and other features</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {socialAccounts.length > 0 ? (
            socialAccounts.map((account) => (
              <div key={account.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {getProviderIcon(account.provider)}
                  <div>
                    <p className="font-medium">{getProviderName(account.provider)}</p>
                    {account.email && <p className="text-sm text-muted-foreground">{account.email}</p>}
                    {account.name && !account.email && <p className="text-sm text-muted-foreground">{account.name}</p>}
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDisconnect(account.id, account.provider)}
                  disabled={isLoading === account.provider}
                >
                  {isLoading === account.provider && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Disconnect
                </Button>
              </div>
            ))
          ) : (
            <p className="text-sm text-muted-foreground">No social accounts connected.</p>
          )}

          {unconnectedProviders.length > 0 && (
            <>
              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">Available Connections</span>
                </div>
              </div>

              {unconnectedProviders.map((provider) => (
                <div key={provider} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {getProviderIcon(provider)}
                    <div>
                      <p className="font-medium">{getProviderName(provider)}</p>
                      <p className="text-sm text-muted-foreground">Not connected</p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleConnect(provider)}
                    disabled={isLoading === provider}
                  >
                    {isLoading === provider && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Connect
                  </Button>
                </div>
              ))}
            </>
          )}
        </CardContent>
        <CardFooter>
          <p className="text-sm text-muted-foreground">
            Connecting accounts allows for single sign-on and data synchronization
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
