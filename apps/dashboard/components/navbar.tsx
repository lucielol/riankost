import { Head } from "@/components/head";
import { UserNav } from "@/components/user-nav";

export function Navbar() {
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 sticky top-0 z-10 bg-background/50 backdrop-blur-md border-b border-sidebar-border/50">
      <div className="flex items-center gap-2 px-4 w-full">
        <Head />
        <div className="ml-auto flex items-center gap-2">
          <UserNav />
        </div>
      </div>
    </header>
  );
}
