"use client";

import { Head } from "@/components/head";
import { Badge } from "@repo/ui/components/badge";
import { Button } from "@repo/ui/components/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@repo/ui/components/dropdown-menu";
import { Input } from "@repo/ui/components/input";
import { Copy, MoreHorizontal, Plus, Search } from "lucide-react";
import { toast } from "sonner";

// Mock Data
const vouchers = [
  {
    id: "1",
    code: "WELCOME50",
    discount: "50%",
    status: "Active",
    expiresAt: "2024-12-31",
  },
  {
    id: "2",
    code: "SUMMER2024",
    discount: "20%",
    status: "Expired",
    expiresAt: "2024-06-30",
  },
  {
    id: "3",
    code: "SPECIAL10",
    discount: "10%",
    status: "Active",
    expiresAt: "2024-11-15",
  },
];

export default function VoucherPage() {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Voucher code copied to clipboard", {
      position: 'top-right'
    });
  };

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-3">
      <Head
        title="Voucher"
        breadcrumbs={[
          { title: "Dashboard", href: "/" },
          { title: "Voucher", href: "/voucher" },
        ]}
      />

      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search vouchers..."
              className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
            />
          </div>
        </div>
        <Button size="sm" className="h-8 gap-1">
          <Plus className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Create Voucher
          </span>
        </Button>
      </div>

      <div className="rounded-md border">
        <div className="relative w-full overflow-auto">
          <table className="w-full caption-bottom text-sm">
            <thead className="[&_tr]:border-b">
              <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                  Code
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                  Discount
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                  Status
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                  Expires At
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="[&_tr:last-child]:border-0">
              {vouchers.map((voucher) => (
                <tr
                  key={voucher.id}
                  className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                >
                  <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                    <div className="flex items-center gap-2 font-mono">
                      {voucher.code}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 text-muted-foreground hover:text-foreground"
                        onClick={() => copyToClipboard(voucher.code)}
                      >
                        <Copy className="h-3 w-3" />
                        <span className="sr-only">Copy code</span>
                      </Button>
                    </div>
                  </td>
                  <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                    {voucher.discount}
                  </td>
                  <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                    <Badge variant={voucher.status === "Active" ? "outline" : "secondary"}>
                      {voucher.status}
                    </Badge>
                  </td>
                  <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                    {voucher.expiresAt}
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
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => copyToClipboard(voucher.code)}>
                          Copy Code
                        </DropdownMenuItem>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          Delete
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
    </div>
  );
}
