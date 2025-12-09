"use client";

import { Head } from "@/components/head";
import { Button } from "@repo/ui/components/button";
import { Trash2, Users, UserCheck } from "lucide-react";
import { CreateVoucherButton } from "@/app/voucher/_partials/create";
import { useVoucher, useActiveVoucher } from "@/hooks/use-voucher";
import { VoucherDataTable } from "@/app/voucher/_partials/data-table";
import { getColumns } from "@/app/voucher/_partials/columns";
import { VoucherTableSkeleton } from "@/app/voucher/_partials/skeleton";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@repo/ui/components/tabs";
import { Spinner } from "@repo/ui/components/spinner";
import { Card, CardContent } from "@repo/ui/components/card";
import { useLanguage } from "@/contexts/language-context";
import { PopoverProvider } from "@/contexts/popover-context";
import { useMemo } from "react";

export default function VoucherPage() {
  const { vouchers, isLoading, isError } = useVoucher();
  const { activeVouchers, isLoading: isLoadingActive } = useActiveVoucher();
  const { t } = useLanguage();

  const filteredVouchers = useMemo(() => {
    return vouchers.filter((voucher) => voucher.username !== "default-trial");
  }, [vouchers]);

  const activeUsernames = useMemo(() => {
    return new Set(activeVouchers.map((voucher) => voucher.username));
  }, [activeVouchers]);
  const activeFilteredVouchers = useMemo(() => {
    return filteredVouchers.filter((voucher) => activeUsernames.has(voucher.username));
  }, [filteredVouchers, activeUsernames]);

  if (isError) {
    return (
      <div className="items-center justify-center">
        <div className="text-red-500">{t("common.error")}</div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex flex-1 flex-col gap-6">
        <Head
          title={t("voucher.title")}
          breadcrumbs={[
            { title: "Dashboard", href: "/" },
            { title: t("voucher.title"), href: "/voucher" },
          ]}
        />
        <VoucherTableSkeleton />
      </div>
    );
  }

  return (
    <PopoverProvider>
      <div className="flex flex-col gap-4">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight">{t("voucher.title")}</h1>
            <p className="text-muted-foreground text-sm">
              {t("voucher.description")}
            </p>
          </div>
          <CreateVoucherButton label={t("voucher.create")} />
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className="border-l-4 border-l-blue-500">
            <CardContent className="flex items-center justify-between p-6">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">{t("voucher.total")}</p>
                <p className="text-2xl font-bold">{filteredVouchers.length}</p>
              </div>
              <div className="rounded-full bg-blue-500/10 p-3">
                <Users className="h-6 w-6 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500">
            <CardContent className="flex items-center justify-between p-6">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">{t("voucher.active")}</p>
                <p className="text-2xl font-bold">
                  {isLoadingActive ? <Spinner /> : activeFilteredVouchers.length}
                </p>
              </div>
              <div className="rounded-full bg-green-500/10 p-3">
                <UserCheck className="h-6 w-6 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-purple-500">
            <CardContent className="flex items-center justify-between p-6">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">{t("voucher.usage")}</p>
                <p className="text-2xl font-bold">
                  {filteredVouchers.length > 0
                    ? `${Math.round((activeFilteredVouchers.length / filteredVouchers.length) * 100)}%`
                    : "0%"}
                </p>
              </div>
              <div className="rounded-full bg-purple-500/10 p-3">
                <div className="h-6 w-6 flex items-center justify-center text-purple-500 font-bold">
                  %
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Main Content Card */}
      <Card>
        <CardContent>
          <Tabs defaultValue="all" className="w-full">
            <TabsContent value="all" className="mt-0">
              <VoucherDataTable
                columns={getColumns(activeVouchers || [])}
                data={filteredVouchers}
                searchKey="username"
                searchPlaceholder={t("voucher.search")}
                toolbar={(table) => {
                  const selectedRows = table.getFilteredSelectedRowModel().rows;
                  const hasSelection = selectedRows.length > 0;

                  return (
                    <div className="flex items-center gap-4 w-full">
                      {/* Tabs in the center */}
                      <TabsList>
                        <TabsTrigger value="all" className="gap-2">
                          <Users className="h-4 w-4" />
                          {t("voucher.all")} ({filteredVouchers.length})
                        </TabsTrigger>
                        <TabsTrigger value="active" className="gap-2">
                          <UserCheck className="h-4 w-4" />
                          {t("voucher.active")} ({isLoadingActive ? <Spinner /> : activeFilteredVouchers.length})
                        </TabsTrigger>
                      </TabsList>

                      {/* Spacer */}
                      <div className="flex-1" />

                      {/* Delete button on the right */}
                      <Button
                        variant="destructive"
                        size="sm"
                        disabled={!hasSelection}
                        onClick={() => {
                          console.log("Delete selected:", selectedRows.map((row) => row.original));
                        }}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        {t("common.delete")} {selectedRows.length === 0 ? "" : `(${selectedRows.length})`}
                      </Button>
                    </div>
                  );
                }}
              />
            </TabsContent>

            <TabsContent value="active" className="mt-0">
              {isLoadingActive ? (
                <VoucherTableSkeleton />
              ) : (
                <VoucherDataTable
                  columns={getColumns(activeVouchers || [])}
                  data={activeFilteredVouchers}
                  searchKey="username"
                  searchPlaceholder={t("voucher.search")}
                  toolbar={(table) => {
                    const selectedRows = table.getFilteredSelectedRowModel().rows;
                    const hasSelection = selectedRows.length > 0;

                    return (
                      <div className="flex items-center gap-4 w-full">
                        {/* Tabs in the center */}
                        <TabsList>
                          <TabsTrigger value="all" className="gap-2">
                            <Users className="h-4 w-4" />
                            {t("voucher.all")} ({filteredVouchers.length})
                          </TabsTrigger>
                          <TabsTrigger value="active" className="gap-2">
                            <UserCheck className="h-4 w-4" />
                            {t("voucher.active")} ({isLoadingActive ? <Spinner /> : activeFilteredVouchers.length})
                          </TabsTrigger>
                        </TabsList>

                        {/* Spacer */}
                        <div className="flex-1" />

                        {/* Delete button on the right */}
                        <Button
                          variant="destructive"
                          size="sm"
                          disabled={!hasSelection}
                          onClick={() => {
                            console.log("Delete selected:", selectedRows.map((row) => row.original));
                          }}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          {t("common.delete")} {selectedRows.length === 0 ? "" : `(${selectedRows.length})`}
                        </Button>
                      </div>
                    );
                  }}
                />
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </PopoverProvider >
  );
}
