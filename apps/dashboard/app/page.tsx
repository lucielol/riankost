import { redirect } from "next/navigation";
import Dashboard from "./dashboard";
import { headers } from "next/headers";
import { authClient } from "@repo/ui/lib/auth-client";
import { Head } from "@/components/head";

export default async function DashboardPage() {
  const session = await authClient.getSession({
    fetchOptions: {
      headers: await headers(),
      throw: true,
    },
  });

  if (!session?.user) {
    redirect("http://localhost:3002/login?callbackURL=http://localhost:3001/");
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-3">
      <Head title="Dashboard" />
      <Dashboard session={session} />
    </div>
  );
}
