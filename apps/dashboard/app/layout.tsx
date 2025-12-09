import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@repo/ui/styles.css";
import "./nprogress.css";
import Providers from "@/components/providers";
import { ProgressBar } from "@/components/progress-bar";
import { authClient } from "@repo/ui/lib/auth-client";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { AppSidebar } from "@/components/app-sidebar";
import { Navbar } from "@/components/navbar";
import {
  SidebarInset,
  SidebarProvider,
} from "@repo/ui/components/sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard",
};


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <Providers>
          <ProgressBar />
          <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
              <Navbar />
              <div className="flex flex-1 flex-col gap-4 p-8 pt-6">
                {children}
              </div>
            </SidebarInset>
          </SidebarProvider>
        </Providers>
      </body>
    </html>
  );
}
