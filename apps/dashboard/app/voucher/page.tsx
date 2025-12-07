"use client";

import { Head } from "@/components/head";
import { Button } from "@repo/ui/components/button";
import { Plus, Trash2 } from "lucide-react";
import { useVoucher } from "@/hooks/use-voucher";
import { DataTable } from "@/components/data-table";
import { columns } from "@/app/voucher/_partials/columns";
import Loader from "@/components/loader";

export default function VoucherPage() {
  const { vouchers, isLoading, isError } = useVoucher();

  if (isError) {
    return (
      <div className="flex flex-1 flex-col gap-4 p-4 pt-3 items-center justify-center">
        <div className="text-red-500">Failed to load vouchers</div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex flex-1 flex-col gap-4 p-4 pt-3 items-center justify-center">
        <Loader />
      </div>
    );
  }

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
        <h1 className="text-2xl font-semibold">List Vouchers</h1>
        <Button size="sm" className="h-8 gap-1">
          <Plus className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Create Voucher
          </span>
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={vouchers.filter((v) => v.username !== "default-trial")}
        searchKey="username"
        searchPlaceholder="Search by code..."
        toolbar={(table) => {
          const selectedRows = table.getFilteredSelectedRowModel().rows;
          const hasSelection = selectedRows.length > 0;

          return (
            <Button
              variant="destructive"
              size="sm"
              disabled={!hasSelection}
              onClick={() => {
                console.log("Delete selected:", selectedRows.map((r) => r.original));
              }}
            >
              <Trash2 className="mr-1 h-4 w-4" />
              Delete {selectedRows.length === 0 ? "" : `(${selectedRows.length})`}
            </Button>
          );
        }}
      />
    </div>
  );
}
