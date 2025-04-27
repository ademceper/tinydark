"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, Newspaper, BookOpen, Star } from "lucide-react"
import { Badge } from "@/components/ui/badge"

// Define interfaces for the actual data structures
interface MarketplaceItem {
  id: string
  name: string
  category: string
  rating: number
  installs: string
  price: string
}

interface NewsItem {
  id: string
  title: string
  description: string
  date: string
  category: string
}

// Optional help resources if needed
interface HelpResource {
  title: string
  link: string
}

interface ResourcesProps {
  marketplaceHighlights?: MarketplaceItem[]
  newsAndUpdates?: NewsItem[]
  helpAndResources?: HelpResource[]
}

export default function Resources({
  marketplaceHighlights = [],
  newsAndUpdates = [],
  helpAndResources = [],
}: ResourcesProps) {
  const hasResources = marketplaceHighlights.length > 0 || newsAndUpdates.length > 0 || helpAndResources.length > 0

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {marketplaceHighlights.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Package className="mr-2 h-5 w-5" />
              Marketplace
            </CardTitle>
            <CardDescription>Popular apps and integrations</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {marketplaceHighlights.map((item) => (
                <li key={item.id} className="rounded-md border p-3">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{item.name}</p>
                    <Badge variant="outline">{item.category}</Badge>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                      <div className="flex items-center">
                        <Star className="mr-1 h-3 w-3 fill-amber-500 text-amber-500" />
                        <span>{item.rating}</span>
                      </div>
                      <span>•</span>
                      <span>{item.installs} installs</span>
                    </div>
                    <Badge variant="secondary">{item.price}</Badge>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              <Package className="mr-2 h-4 w-4" />
              Visit Marketplace
            </Button>
          </CardFooter>
        </Card>
      )}

      {newsAndUpdates.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Newspaper className="mr-2 h-5 w-5" />
              News & Updates
            </CardTitle>
            <CardDescription>Latest announcements and updates</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {newsAndUpdates.map((item) => (
                <li key={item.id} className="rounded-md border p-3">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{item.title}</p>
                    <Badge variant="outline">{item.category}</Badge>
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">{item.description}</p>
                  <div className="mt-2 flex items-center justify-between">
                    <p className="text-xs text-muted-foreground">{item.date}</p>
                    <Button variant="link" size="sm" className="h-auto p-0">
                      Read More
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              <Newspaper className="mr-2 h-4 w-4" />
              View All Updates
            </Button>
          </CardFooter>
        </Card>
      )}

      {helpAndResources.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BookOpen className="mr-2 h-5 w-5" />
              Help & Resources
            </CardTitle>
            <CardDescription>Guides, documentation, and support</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {helpAndResources.map((item, index) => (
                <li key={index} className="rounded-md border p-3">
                  <Button variant="link" className="h-auto p-0 text-left font-normal" asChild>
                    <a href={item.link} target="_blank" rel="noopener noreferrer">
                      {item.title}
                    </a>
                  </Button>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              <BookOpen className="mr-2 h-4 w-4" />
              Browse All Resources
            </Button>
          </CardFooter>
        </Card>
      )}

      {!hasResources && (
        <Card className="col-span-full">
          <CardHeader>
            <CardTitle>Resources</CardTitle>
            <CardDescription>Helpful resources and information</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center py-6 text-center">
            <BookOpen className="h-10 w-10 text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground">No resources available.</p>
          </CardContent>
        </Card>
      )}

      {/* Default Help & Resources Card if no help resources are provided but we want to show something */}
      {helpAndResources.length === 0 && hasResources && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BookOpen className="mr-2 h-5 w-5" />
              Help & Resources
            </CardTitle>
            <CardDescription>Guides, documentation, and support</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="rounded-lg border p-3">
                <div className="flex items-center space-x-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100">
                    <BookOpen className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Documentation</p>
                    <p className="text-xs text-muted-foreground">Comprehensive guides and API references</p>
                  </div>
                </div>
                <Button variant="link" size="sm" className="mt-2 h-auto p-0">
                  Browse Documentation
                </Button>
              </div>
              <div className="rounded-lg border p-3">
                <div className="flex items-center space-x-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-100">
                    <Newspaper className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Community Forum</p>
                    <p className="text-xs text-muted-foreground">Connect with other users and share knowledge</p>
                  </div>
                </div>
                <Button variant="link" size="sm" className="mt-2 h-auto p-0">
                  Join Discussion
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
