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
    const authUrl = process.env.NEXT_PUBLIC_AUTH_URL || "http://localhost:3002";
    redirect(`${authUrl}/login` as any);
  }

  return (
    <>
      <Head title="Dashboard" />
      <Dashboard session={session} />
    </>
  );
}
