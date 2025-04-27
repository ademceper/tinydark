import { MainNav } from "./nav";
import { OrganizationSwitcher } from "./switcher";
import { UserNav } from "./user-nav";
import Search from "@/components/dashboard/organization/search";
import { NotificationsPanel } from "./notifications";
import { QuickActionsPanel } from "./quick-actions";

export function DashboardHeader() {

  return (
    <header className="hidden lg:block sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 sm:h-16 items-center px-3 sm:px-4 md:px-6">
        <OrganizationSwitcher className="mr-2 sm:mr-4" />

        <MainNav />

        <div className="ml-auto flex items-center gap-1 sm:gap-2 md:gap-4">
          <div className="hidden sm:block">
            <Search />
          </div>

          <NotificationsPanel />

          <QuickActionsPanel />

          <UserNav />
        </div>
      </div>
    </header>
  );
}
