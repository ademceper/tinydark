import type React from "react";
import { DashboardHeader } from "@/components/dashboard/organization/header";
import { MobileNavigationBar } from "@/components/dashboard/organization/mobile-nav-bar";


export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />

      <div className="flex-1 space-y-4 p-8 pt-6">{children}</div>
      <MobileNavigationBar />
    </div>
  );
}
