"use client";

import { Head } from "@/components/head";
import { DataTable } from "@/components/data-table";
import { columns } from "@/app/payments/_partials/columns";
import { mockPayments, mockStats } from "@/app/payments/_partials/mock-data";
import { useLanguage } from "@/contexts/language-context";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";
import {
  BanknoteArrowUp,
  TrendingUp,
  CreditCard,
  Clock,
  Download,
  Filter,
} from "lucide-react";
import { Button } from "@repo/ui/components/button";

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);
};

export default function PaymentsPage() {
  const { t } = useLanguage();
  const stats = mockStats;

  return (
    <>
      <Head
        title={t("payments.title")}
        breadcrumbs={[
          { title: t("sidebar.dashboard"), href: "/" },
          { title: t("payments.title"), href: "/payments" },
        ]}
      />

      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">{t("payments.title")}</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {t("payments.description")}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="h-8 gap-1">
            <Filter className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              {t("payments.filter")}
            </span>
          </Button>
          <Button variant="outline" size="sm" className="h-8 gap-1">
            <Download className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              {t("payments.export")}
            </span>
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t("payments.totalRevenue")}
            </CardTitle>
            <BanknoteArrowUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(stats.totalRevenue)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              From {mockPayments.filter((p) => p.status === "success").length}{" "}
              successful transactions
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t("payments.all")}
            </CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalTransactions}</div>
            <p className="text-xs text-muted-foreground mt-1">
              All payment transactions
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.successRate.toFixed(1)}%
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Payment success rate
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Amount
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(stats.pendingAmount)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {mockPayments.filter((p) => p.status === "pending").length}{" "}
              pending payments
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Payment Methods Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[
          { method: "qris", label: "QRIS", color: "bg-blue-500" },
          { method: "bank_transfer", label: "Bank Transfer", color: "bg-green-500" },
          { method: "e_wallet", label: "E-Wallet", color: "bg-purple-500" },
          { method: "credit_card", label: "Credit Card", color: "bg-orange-500" },
        ].map(({ method, label, color }) => {
          const count = mockPayments.filter(
            (p) => p.paymentMethod === method
          ).length;
          const amount = mockPayments
            .filter((p) => p.paymentMethod === method && p.status === "success")
            .reduce((sum, p) => sum + p.amount, 0);

          return (
            <Card key={method}>
              <CardHeader className="pb-3">
                <CardDescription className="flex items-center gap-2">
                  <div className={`h-2 w-2 rounded-full ${color}`} />
                  {label}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-xl font-bold">{formatCurrency(amount)}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {count} transactions
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Transactions Table */}
      <div className="space-y-4 mt-5">
        <div>
          <h2 className="text-lg font-semibold">{t("payments.all")}</h2>
          <p className="text-sm text-muted-foreground">
            {t("payments.description")}
          </p>
        </div>
        <DataTable
          columns={columns}
          data={mockPayments}
          searchKey="orderId"
          searchPlaceholder="Search by order ID..."
        />
      </div>
    </>
  );
}
