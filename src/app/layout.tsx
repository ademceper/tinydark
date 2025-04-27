import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Orbit Suite - All-in-One Collaboration Platform",
  description:
    "Transform the way your team collaborates with our all-in-one platform for creative, strategic, and operational workflows.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <TooltipProvider>{children}</TooltipProvider>
        <Toaster/>
      </body>
    </html>
  );
}
