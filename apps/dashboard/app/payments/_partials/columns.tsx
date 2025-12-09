"use client";

import type { ColumnDef } from "@tanstack/react-table";
import type { Payment } from "@/types";
import { Badge } from "@repo/ui/components/badge";
import { Checkbox } from "@repo/ui/components/checkbox";
import { formatDistanceToNow } from "date-fns";
import { ArrowUpDown, ExternalLink } from "lucide-react";
import { Button } from "@repo/ui/components/button";

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);
};

const getStatusBadge = (status: Payment["status"]) => {
  const variants = {
    success: "default" as const,
    pending: "secondary" as const,
    failed: "destructive" as const,
    expired: "outline" as const,
  };

  const labels = {
    success: "Success",
    pending: "Pending",
    failed: "Failed",
    expired: "Expired",
  };

  return (
    <Badge variant={variants[status]} className="capitalize">
      {labels[status]}
    </Badge>
  );
};

const getPaymentMethodBadge = (method: Payment["paymentMethod"]) => {
  const labels = {
    qris: "QRIS",
    bank_transfer: "Bank Transfer",
    e_wallet: "E-Wallet",
    credit_card: "Credit Card",
  };

  return (
    <span className="text-sm font-medium text-muted-foreground">
      {labels[method]}
    </span>
  );
};

export const columns: ColumnDef<Payment>[] = [
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
    accessorKey: "orderId",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Order ID
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="font-mono text-sm">{row.getValue("orderId")}</div>
    ),
  },
  {
    accessorKey: "customerName",
    header: "Customer",
    cell: ({ row }) => {
      const payment = row.original;
      return (
        <div className="flex flex-col">
          <span className="font-medium">{payment.customerName}</span>
          <span className="text-xs text-muted-foreground">
            {payment.customerPhone}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "amount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Amount
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="font-semibold">{formatCurrency(row.getValue("amount"))}</div>
    ),
  },
  {
    accessorKey: "paymentMethod",
    header: "Method",
    cell: ({ row }) => getPaymentMethodBadge(row.getValue("paymentMethod")),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => getStatusBadge(row.getValue("status")),
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Created
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = row.getValue("createdAt") as Date;
      return (
        <div className="text-sm text-muted-foreground">
          {formatDistanceToNow(date, { addSuffix: true })}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original;
      return (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            console.log("View payment:", payment);
          }}
        >
          <ExternalLink className="h-4 w-4" />
        </Button>
      );
    },
  },
];
