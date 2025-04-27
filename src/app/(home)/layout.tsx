"use client"

import type React from "react"
import { Header } from "@/components/home/header"
import { Footer } from "@/components/home/footer"
import { Inter } from "next/font/google"
import { PageLoader } from "@/components/shared/page-loader"
import { ThemeProvider } from "@/components/theme/theme-provider"

const inter = Inter({ subsets: ["latin"] })


export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <div className={`${inter.className} min-h-screen bg-background`}>
        <PageLoader>
          <Header />
          <main className="min-h-screen pt-20 md:pt-24 lg:pt-32 bg-white dark:bg-black overflow-hidden">{children}</main>
          <Footer />
        </PageLoader>
      </div>
    </ThemeProvider>
  )
}
