"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@repo/ui/components/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@repo/ui/components/dropdown-menu";
import {
  BadgeCheck,
  CircleUserRound,
  ChevronDown,
  ChevronsUpDown,
  CreditCard,
  Laptop,
  Settings,
  LogOut,
  Moon,
  Sparkles,
  Sun,
} from "lucide-react";
import { authClient } from "@repo/ui/lib/auth-client";
import { useRouter } from "next/navigation";
import { Button } from "@repo/ui/components/button";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function UserNav() {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const { theme, setTheme } = useTheme();
  const [isThemeOpen, setIsThemeOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/");
  };

  const user = session?.user;
  const initialName = mounted ? user?.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase() : "CN";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user?.image!} alt={user?.name!} />
            <AvatarFallback>
              {initialName}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user?.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <CircleUserRound className="mr-2 h-4 w-4" />
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuGroup>
          <DropdownMenuItem
            className="flex w-full items-center justify-between"
            onSelect={(e) => {
              e.preventDefault();
              setIsThemeOpen(!isThemeOpen);
            }}
          >
            <div className="flex items-center">
              {!mounted ? (
                <>
                  <Sun className="mr-2 h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute mr-2 h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                </>
              ) : (
                <>
                  {theme === "light" && <Sun className="mr-4 h-4 w-4" />}
                  {theme === "dark" && <Moon className="mr-4 h-4 w-4" />}
                  {theme === "system" && <Laptop className="mr-4 h-4 w-4" />}
                </>
              )}
              <span>Theme</span>
            </div>
            <ChevronDown
              className={`h-4 w-4 transition-transform ${isThemeOpen ? "rotate-180" : ""
                }`}
            />
          </DropdownMenuItem>
          {isThemeOpen && (
            <>
              <DropdownMenuItem
                onClick={() => setTheme("light")}
                className="pl-8"
              >
                <Sun className="mr-2 h-4 w-4" />
                Light
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setTheme("dark")}
                className="pl-8"
              >
                <Moon className="mr-2 h-4 w-4" />
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setTheme("system")}
                className="pl-8"
              >
                <Laptop className="mr-2 h-4 w-4" />
                System
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
