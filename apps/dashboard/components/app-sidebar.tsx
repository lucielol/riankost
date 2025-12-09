"use client";

import * as React from "react";
import {
  AudioWaveform,
  ChevronsUpDown,
  ChevronRight,
  Command,
  GalleryVerticalEnd,
  LayoutDashboard,
  MessageCircle,
  Plus,
  Ticket,
  Tickets,
  UsersRound,
  BanknoteArrowUp,
  Settings,
  UserRoundPen,
  WandSparkles
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@repo/ui/components/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@repo/ui/components/sidebar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@repo/ui/components/collapsible";
import { authClient } from "@repo/ui/lib/auth-client";
import { usePathname, useRouter } from "next/navigation";
import { useLanguage } from "@/contexts/language-context";
import Link from "next/link";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    image: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [activeTeam, setActiveTeam] = React.useState(data.teams[0]);
  const router = useRouter();
  const pathname = usePathname();
  const { data: session } = authClient.useSession();
  const { t } = useLanguage();

  const navMain = [
    {
      title: t("sidebar.dashboard"),
      url: "/",
      icon: LayoutDashboard,
    },
    {
      title: t("sidebar.voucher"),
      url: "/voucher",
      icon: Ticket,
      items: [
        {
          title: "All Vouchers",
          url: "/voucher",
          icon: Tickets,
        },
        {
          title: "Profiles",
          url: "/voucher/profiles",
          icon: UserRoundPen,
        },
        {
          title: "Generate",
          url: "/voucher/generate",
          icon: WandSparkles,
        },
        {
          title: "Settings",
          url: "/voucher/settings",
          icon: Settings,
        },
      ],
    },
    {
      title: t("sidebar.whatsapp"),
      url: "/whatsapp",
      icon: MessageCircle,
    },
    {
      title: t("sidebar.payments"),
      url: "/payments",
      icon: BanknoteArrowUp
    },
    {
      title: t("sidebar.users"),
      url: "/users",
      icon: UsersRound,
    },
  ];

  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/");
  };

  const user = session?.user || data.user;

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                    <activeTeam.logo className="size-4" />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">
                      {activeTeam.name}
                    </span>
                    <span className="truncate text-xs">{activeTeam.plan}</span>
                  </div>
                  <ChevronsUpDown className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                align="start"
                side="bottom"
                sideOffset={4}
              >
                <DropdownMenuLabel className="text-xs text-muted-foreground">
                  Teams
                </DropdownMenuLabel>
                {data.teams.map((team, index) => (
                  <DropdownMenuItem
                    key={team.name}
                    onClick={() => setActiveTeam(team)}
                    className="gap-2 p-2"
                  >
                    <div className="flex size-6 items-center justify-center rounded-sm border">
                      <team.logo className="size-4 shrink-0" />
                    </div>
                    {team.name}
                    <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem className="gap-2 p-2">
                  <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                    <Plus className="size-4" />
                  </div>
                  <div className="font-medium text-muted-foreground">
                    Add team
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="px-2">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold mb-3 px-2 text-muted-foreground/80">Navigation</SidebarGroupLabel>
          <SidebarMenu className="gap-1.5">
            {navMain.map((item) => {
              const hasSubmenu = item.items && item.items.length > 0;
              const isActive = pathname === item.url || (hasSubmenu && item.items.some(sub => pathname.startsWith(sub.url)));

              if (hasSubmenu) {
                return (
                  <Collapsible key={item.title} asChild defaultOpen={isActive} className="group/collapsible">
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton
                          tooltip={item.title}
                          isActive={isActive}
                          className="h-11 px-3 hover:bg-sidebar-accent/80 transition-all duration-200 group/button"
                        >
                          {item.icon && (
                            <div className="flex items-center justify-center">
                              <span className="p-2 bg-linear-to-br from-sidebar-accent to-sidebar-accent/50 mr-1 rounded-lg shadow-sm group-hover/button:shadow-md transition-shadow">
                                <item.icon className="size-4" />
                              </span>
                            </div>
                          )}
                          <span className="font-medium text-sm">{item.title}</span>
                          <ChevronRight className="ml-auto size-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub className="ml-4 border-l-2 pr-4 w-full border-sidebar-border/70 mt-1 space-y-1">
                          {item.items.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton
                                asChild
                                isActive={pathname === subItem.url}
                                className="h-9 hover:bg-sidebar-accent/60 transition-all duration-200"
                              >
                                <Link href={subItem.url as any}>
                                  {subItem.icon && (
                                    <subItem.icon className="size-3.5 mr-2 opacity-70" />
                                  )}
                                  <span className="text-sm">{subItem.title}</span>
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                );
              }

              return (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    tooltip={item.title}
                    isActive={pathname === item.url}
                    className="h-11 px-3 hover:bg-sidebar-accent/80 transition-all duration-200 group/button"
                  >
                    <Link href={item.url as any}>
                      {item.icon && (
                        <div className="flex items-center justify-center">
                          <span className="p-2 bg-linear-to-br from-sidebar-accent to-sidebar-accent/50 mr-1 rounded-lg shadow-sm group-hover/button:shadow-md transition-shadow">
                            <item.icon className="size-4" />
                          </span>
                        </div>
                      )}
                      <span className="font-medium text-sm">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>

      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
}
