"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { Loader2, Key, Copy, Eye, EyeOff, Plus, Trash2 } from "lucide-react"
import { toast } from "sonner"
import { getApiKeys, createApiKey, deleteApiKey } from "@/actions/user.actions"

interface ApiKey {
  id: string
  name: string
  key: string
  scopes: string[]
  expiresAt: Date | null
  lastUsedAt: Date | null
  createdAt: Date
}

export default function ApiKeysSettings() {
  const [isLoading, setIsLoading] = useState(false)
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([])
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [showKeyDialog, setShowKeyDialog] = useState(false)
  const [newKeyData, setNewKeyData] = useState({
    name: "",
    scopes: [] as string[],
    expiresInDays: 30,
  })
  const [createdKey, setCreatedKey] = useState<string | null>(null)
  const [showKey, setShowKey] = useState(false)

  useEffect(() => {
    const fetchApiKeys = async () => {
      try {
        const result = await getApiKeys()
        if (result.success && result.keys) {
          setApiKeys(result.keys)
        }
      } catch (error) {
        console.error("Failed to fetch API keys:", error)
      }
    }

    fetchApiKeys()
  }, [])

  const handleCreateKey = async () => {
    if (!newKeyData.name) {
      toast.error("Please enter a name for your API key")
      return
    }

    setIsLoading(true)

    try {
      const result = await createApiKey({
        name: newKeyData.name,
        scopes: newKeyData.scopes,
        expiresInDays: newKeyData.expiresInDays,
      })

      if (result.success && result.key && result.keyData) {
        setShowCreateDialog(false)
        // Fix for the string | undefined error
        setCreatedKey(result.key || null)
        setShowKeyDialog(true)

        // Add the new key to the list - ensure keyData is of type ApiKey
        setApiKeys([...apiKeys, result.keyData as ApiKey])

        // Reset form
        setNewKeyData({
          name: "",
          scopes: [],
          expiresInDays: 30,
        })
      } else {
        toast.error("Failed to create API key", {
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

  const handleDeleteKey = async (keyId: string) => {
    try {
      const result = await deleteApiKey(keyId)
      if (result.success) {
        setApiKeys(apiKeys.filter((key) => key.id !== keyId))
        toast.success("API key deleted successfully")
      } else {
        toast.error("Failed to delete API key", {
          description: result.error,
        })
      }
    } catch (error) {
      toast.error("An error occurred")
      console.error(error)
    }
  }

  const handleCopyKey = () => {
    if (createdKey) {
      navigator.clipboard.writeText(createdKey)
      toast.success("API key copied to clipboard")
    }
  }

  const handleScopeChange = (scope: string, checked: boolean) => {
    if (checked) {
      setNewKeyData({
        ...newKeyData,
        scopes: [...newKeyData.scopes, scope],
      })
    } else {
      setNewKeyData({
        ...newKeyData,
        scopes: newKeyData.scopes.filter((s) => s !== scope),
      })
    }
  }

  const formatDate = (date: Date | null) => {
    if (!date) return "Never"
    return new Date(date).toLocaleString()
  }

  const formatExpiryDate = (date: Date | null) => {
    if (!date) return "Never expires"
    return new Date(date).toLocaleDateString()
  }

  const formatLastUsed = (date: Date | null) => {
    if (!date) return "Never used"
    return new Date(date).toLocaleString()
  }

  // Available scopes
  const availableScopes = [
    { value: "read:profile", label: "Read Profile" },
    { value: "write:profile", label: "Write Profile" },
    { value: "read:projects", label: "Read Projects" },
    { value: "write:projects", label: "Write Projects" },
    { value: "read:tasks", label: "Read Tasks" },
    { value: "write:tasks", label: "Write Tasks" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">API Keys</h2>
          <p className="text-sm text-muted-foreground">Manage API keys to access the Orbit API</p>
        </div>
        <Button onClick={() => setShowCreateDialog(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Create API Key
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your API Keys</CardTitle>
          <CardDescription>API keys allow external applications to authenticate with the Orbit API</CardDescription>
        </CardHeader>
        <CardContent>
          {apiKeys.length === 0 ? (
            <div className="text-center py-6">
              <Key className="h-12 w-12 mx-auto text-muted-foreground opacity-50" />
              <p className="mt-2 text-sm text-muted-foreground">No API keys found</p>
              <Button variant="outline" className="mt-4" onClick={() => setShowCreateDialog(true)}>
                Create your first API key
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {apiKeys.map((key) => (
                <div key={key.id} className="flex items-start justify-between p-4 border rounded-md">
                  <div className="space-y-1">
                    <div className="flex items-center">
                      <Key className="h-4 w-4 mr-2 text-primary" />
                      <p className="font-medium">{key.name}</p>
                    </div>
                    <p className="text-sm text-muted-foreground">Created: {formatDate(key.createdAt)}</p>
                    <p className="text-sm text-muted-foreground">Expires: {formatExpiryDate(key.expiresAt)}</p>
                    <p className="text-sm text-muted-foreground">Last used: {formatLastUsed(key.lastUsedAt)}</p>
                    {key.scopes.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {key.scopes.map((scope) => (
                          <span key={scope} className="px-2 py-1 text-xs rounded-full bg-muted">
                            {scope}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => handleDeleteKey(key.id)}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
        <CardFooter>
          <p className="text-sm text-muted-foreground">
            API keys grant access to your account. Keep them secure and never share them in public repositories or
            client-side code.
          </p>
        </CardFooter>
      </Card>

      {/* Create API Key Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create API Key</DialogTitle>
            <DialogDescription>Create a new API key to access the Orbit API</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Key Name</Label>
              <Input
                id="name"
                placeholder="e.g., Development Key"
                value={newKeyData.name}
                onChange={(e) => setNewKeyData({ ...newKeyData, name: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label>Scopes</Label>
              <p className="text-sm text-muted-foreground mb-2">Select the permissions for this API key</p>

              <div className="space-y-2">
                {availableScopes.map((scope) => (
                  <div key={scope.value} className="flex items-center space-x-2">
                    <Checkbox
                      id={scope.value}
                      checked={newKeyData.scopes.includes(scope.value)}
                      onCheckedChange={(checked) => handleScopeChange(scope.value, checked as boolean)}
                    />
                    <Label htmlFor={scope.value} className="font-normal">
                      {scope.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="expiry">Expiration</Label>
              <select
                id="expiry"
                className="w-full rounded-md border border-input bg-background px-3 py-2"
                value={newKeyData.expiresInDays}
                onChange={(e) =>
                  setNewKeyData({
                    ...newKeyData,
                    expiresInDays: Number.parseInt(e.target.value),
                  })
                }
              >
                <option value={7}>7 days</option>
                <option value={30}>30 days</option>
                <option value={90}>90 days</option>
                <option value={365}>1 year</option>
                <option value={0}>Never</option>
              </select>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateKey} disabled={isLoading || !newKeyData.name}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Create Key
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* API Key Created Dialog */}
      <Dialog open={showKeyDialog} onOpenChange={setShowKeyDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>API Key Created</DialogTitle>
            <DialogDescription>
              Your API key has been created. This is the only time you&apos;ll see this key, so make sure to copy it now.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="relative">
              <Input readOnly value={createdKey || ""} type={showKey ? "text" : "password"} className="pr-10" />
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0"
                onClick={() => setShowKey(!showKey)}
              >
                {showKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowKeyDialog(false)}>
              Close
            </Button>
            <Button onClick={handleCopyKey}>
              <Copy className="mr-2 h-4 w-4" />
              Copy Key
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
