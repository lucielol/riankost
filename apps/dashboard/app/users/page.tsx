"use client";

import { Head } from "@/components/head";
import { Avatar, AvatarFallback, AvatarImage } from "@repo/ui/components/avatar";
import { Badge } from "@repo/ui/components/badge";
import { Button } from "@repo/ui/components/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@repo/ui/components/dropdown-menu";
import { Input } from "@repo/ui/components/input";
import { MoreHorizontal, Plus, Search } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";

// Mock Data
const users = [
  {
    id: "1",
    name: "Rian Kost",
    email: "rian@example.com",
    role: "Admin",
    status: "Active",
    avatar: "https://github.com/shadcn.png",
  },
  {
    id: "2",
    name: "Jane Doe",
    email: "jane@example.com",
    role: "User",
    status: "Active",
    avatar: null,
  },
  {
    id: "3",
    name: "John Smith",
    email: "john@example.com",
    role: "User",
    status: "Inactive",
    avatar: null,
  },
  {
    id: "4",
    name: "Bob Johnson",
    email: "bob@example.com",
    role: "User",
    status: "Active",
    avatar: null,
  },
  {
    id: "5",
    name: "Alice Brown",
    email: "alice@example.com",
    role: "Admin",
    status: "Active",
    avatar: null,
  },
];

export default function UsersPage() {
  const { t } = useLanguage();

  return (
    <>
      <Head
        title={t("users.title")}
        breadcrumbs={[
          { title: t("sidebar.dashboard"), href: "/" },
          { title: t("users.title"), href: "/users" },
        ]}
      />

      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder={t("users.title") + "..."}
              className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
            />
          </div>
        </div>
        <Button size="sm" className="h-8 gap-1">
          <Plus className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            {t("users.addUser")}
          </span>
        </Button>
      </div>

      <div className="rounded-md border">
        <div className="relative w-full overflow-auto">
          <table className="w-full caption-bottom text-sm">
            <thead className="[&_tr]:border-b">
              <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                  User
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                  {t("users.role")}
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                  {t("common.status")}
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                  <span className="sr-only">{t("common.actions")}</span>
                </th>
              </tr>
            </thead>
            <tbody className="[&_tr:last-child]:border-0">
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                >
                  <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={user.avatar || ""} alt={user.name} />
                        <AvatarFallback>
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="font-medium">{user.name}</span>
                        <span className="text-xs text-muted-foreground">{user.email}</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                    {user.role}
                  </td>
                  <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                    <Badge variant={user.status === "Active" ? "default" : "secondary"}>
                      {user.status}
                    </Badge>
                  </td>
                  <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>{t("common.actions")}</DropdownMenuLabel>
                        <DropdownMenuItem
                          onClick={() => navigator.clipboard.writeText(user.id)}
                        >
                          Copy user ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>{t("payments.viewDetails")}</DropdownMenuItem>
                        <DropdownMenuItem>{t("users.editUser")}</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          {t("users.deleteUser")}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
