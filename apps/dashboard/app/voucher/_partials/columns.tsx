"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { Badge } from "@repo/ui/components/badge";
import { Button } from "@repo/ui/components/button";
import { Checkbox } from "@repo/ui/components/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@repo/ui/components/dropdown-menu";
import { Copy, MoreHorizontal, ArrowUpDown, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import type { Voucher } from "@/types";

const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text);
  toast.success("Copied to clipboard", {
    position: "top-right",
  });
};

const formatBytes = (bytes: string): string => {
  const num = parseInt(bytes);
  if (isNaN(num) || num === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(num) / Math.log(k));
  return Math.round(num / Math.pow(k, i) * 100) / 100 + " " + sizes[i];
};

const formatUptime = (uptime: string): string => {
  if (!uptime || uptime === "0s") return "0s";

  const weeks = uptime.match(/(\d+)w/);
  const days = uptime.match(/(\d+)d/);
  const hours = uptime.match(/(\d+)h/);
  const minutes = uptime.match(/(\d+)m/);
  const seconds = uptime.match(/(\d+)s/);

  const parts: string[] = [];

  if (weeks) parts.push(`${weeks[1]}w`);
  if (days) parts.push(`${days[1]}d`);
  if (hours) parts.push(`${hours[1]}h`);
  if (minutes) parts.push(`${minutes[1]}m`);
  if (seconds && parts.length === 0) parts.push(`${seconds[1]}s`);

  return parts.slice(0, 2).join(" ") || "0s";
};

export const columns: ColumnDef<Voucher>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "username",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Code
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const username = row.getValue("username") as string;
      return (
        <div className="flex items-center gap-2 font-mono">
          {username}
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 text-muted-foreground hover:text-foreground"
            onClick={() => copyToClipboard(username)}
          >
            <Copy className="h-3 w-3" />
            <span className="sr-only">Copy username</span>
          </Button>
        </div>
      );
    },
  },
  {
    accessorKey: "profile",
    header: "Profile",
    cell: ({ row }) => {
      const profile = row.getValue("profile") as string;
      return profile || "-";
    },
  },
  {
    accessorKey: "comment",
    header: "Comment",
    cell: ({ row }) => {
      const comment = row.getValue("comment") as string;
      return comment || "-";
    },
  },
  {
    accessorKey: "uptime",
    header: "Uptime",
    cell: ({ row }) => {
      const uptime = row.getValue("uptime") as string;
      return formatUptime(uptime);
    },
  },
  {
    accessorKey: "bytes-in",
    header: "Download",
    cell: ({ row }) => {
      const bytesIn = row.getValue("bytes-in") as string;
      return formatBytes(bytesIn);
    },
  },
  {
    accessorKey: "bytes-out",
    header: "Upload",
    cell: ({ row }) => {
      const bytesOut = row.getValue("bytes-out") as string;
      return formatBytes(bytesOut);
    },
  },
  {
    accessorKey: "disabled",
    header: "Status",
    cell: ({ row }) => {
      const disabled = row.getValue("disabled") as string;
      const isDynamic = row.original.dynamic === "true";

      return (
        <div className="flex gap-1">
          <Badge variant={disabled === "false" ? "outline" : "secondary"}>
            {disabled === "false" ? "Active" : "Disabled"}
          </Badge>
          {isDynamic && (
            <Badge variant="default">Dynamic</Badge>
          )}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const voucher = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Pencil className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            {voucher.password === voucher.username && (
              <DropdownMenuItem onClick={() => copyToClipboard(voucher.username!)}>
                <Copy className="mr-2 h-4 w-4" />
                Copy Code
              </DropdownMenuItem>
            )}
            <DropdownMenuItem className="text-destructive">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

