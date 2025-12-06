"use client";
import { authClient } from "@repo/ui/lib/auth-client";
import { Metrics } from "@/components/dashboard/metrics";
import { Overview } from "@/components/dashboard/overview";
import { RecentSales } from "@/components/dashboard/recent-sales";

export default function Dashboard({
  session,
}: {
  session: typeof authClient.$Infer.Session;
}) {
  return (
    <div className="flex flex-col gap-4">
      <Metrics />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Overview />
        <RecentSales />
      </div>
    </div>
  );
}
