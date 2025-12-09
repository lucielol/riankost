"use client";

import { useWhatsapp } from "@/hooks/use-whatsapp";
import { Head } from "@/components/head";
import { WhatsappPhoneNumber } from "@/components/whatsapp/phone-number";
import { WhatsappQrCode } from "@/components/whatsapp/qrcode";
import { Badge } from "@repo/ui/components/badge";
import { Button } from "@repo/ui/components/button";
import {
  CheckCircle2,
  LogOut,
  MoreVertical,
  Settings,
  Smartphone,
  MessageSquare,
  Users,
  Megaphone,
  Bot,
  Ticket,
} from "lucide-react";
import { useState } from "react";
import {
  WhatsappConnectingSkeleton,
  WhatsappConnectedSkeleton
} from "@/app/whatsapp/_partials/skeleton";

export default function WhatsappPage() {
  const { status, user, disconnect, isLoading } = useWhatsapp();
  const isConnected = status === "connected";
  const [loginMethod, setLoginMethod] = useState<"qr" | "phone">("qr");

  // Show skeleton when loading
  if (isLoading) {
    return (
      <>
        <Head
          title="Whatsapp"
          breadcrumbs={[
            { title: "Dashboard", href: "/" },
            { title: "Whatsapp", href: "/whatsapp" },
          ]}
        />
        <WhatsappConnectingSkeleton />
      </>
    );
  }

  // Show connecting skeleton when status is connecting
  if (status === "connecting") {
    return (
      <>
        <Head
          title="Whatsapp"
          breadcrumbs={[
            { title: "Dashboard", href: "/" },
            { title: "Whatsapp", href: "/whatsapp" },
          ]}
        />
        <WhatsappConnectingSkeleton />
      </>
    );
  }

  if (isConnected) {
    return (
      <>
        <Head
          title="Whatsapp"
          breadcrumbs={[
            { title: "Dashboard", href: "/" },
            { title: "Whatsapp", href: "/whatsapp" },
          ]}
        />
        <div className="flex items-stretch gap-6 p-4">

          {/* Left Column: Active Bot Status */}
          <div className="w-full md:w-1/3 lg:w-1/4">
            <div className="rounded-2xl border bg-card p-6 shadow-sm h-full">
              <div className="flex flex-col items-center gap-4">
                <div className="relative">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-linear-to-br from-green-400/20 to-emerald-600/20 ring-4 ring-background shadow-lg">
                    <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                      WA
                    </span>
                  </div>
                  <div className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-green-500 ring-2 ring-background shadow-sm">
                    <CheckCircle2 className="h-4 w-4 text-white" />
                  </div>
                </div>

                <div className="flex flex-col items-center text-center space-y-1">
                  <h3 className="text-xl font-bold tracking-tight break-all">
                    {user?.id ? user.id.split(":")[0] : "Optimized WA"}
                  </h3>
                  <p className="text-sm text-muted-foreground font-medium">
                    {user?.name || "Business Account"}
                  </p>
                </div>

                <Badge
                  variant="outline"
                  className="mt-2 text-xs font-semibold uppercase tracking-wider border-green-500/30 bg-green-500/10 text-green-600 dark:text-green-400 px-3 py-1"
                >
                  <span className="mr-1.5 flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                  Active Bot
                </Badge>

                <div className="w-full pt-4">
                  <Button
                    variant="destructive"
                    className="w-full hover:bg-red-600 transition-colors shadow-sm"
                    onClick={() => disconnect()}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Disconnect
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Bot Menu */}
          <div className="w-full md:w-2/3 lg:w-3/4">
            <div className="rounded-2xl border bg-card p-6 shadow-sm mb-6 h-full">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Bot className="h-5 w-5 text-primary" />
                Bot Menu
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { icon: MessageSquare, label: "Auto Reply", desc: "Configure key replies" },
                  { icon: Users, label: "Broadcast", desc: "Send bulk messages" },
                  { icon: Megaphone, label: "Campaigns", desc: "Manage marketing" },
                  { icon: Ticket, label: "Voucher", desc: "Auto voucher & settings" },
                  { icon: Users, label: "Contacts", desc: "Manage saved contacts" },
                  { icon: Settings, label: "Settings", desc: "Bot configuration" },
                ].map((item, i) => (
                  <button
                    key={i}
                    className="flex flex-col items-start p-4 rounded-xl border bg-card hover:bg-muted/50 transition-colors text-left group"
                  >
                    <div className="p-2 rounded-lg bg-primary/10 text-primary mb-3 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <span className="font-semibold text-sm">{item.label}</span>
                    <span className="text-xs text-muted-foreground">{item.desc}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

        </div>
      </>
    );
  }

  return (
    <>
      <Head
        title="Whatsapp"
        breadcrumbs={[
          { title: "Dashboard", href: "/" },
          { title: "Whatsapp", href: "/whatsapp" },
        ]}
      />

      <div className="flex flex-1 items-center justify-center md:p-4">
        <div className="w-full max-w-5xl rounded-xl md:border bg-card text-card-foreground md:shadow-sm">
          <div className="grid gap-6 md:p-6 md:grid-cols-2 lg:p-10">
            {/* Left Side: Instructions */}
            <div className="flex flex-col justify-center space-y-6">
              <div>
                <h2 className="text-2xl font-bold tracking-tight">
                  Use WhatsApp on your computer
                </h2>
                <p className="mt-2 text-muted-foreground">
                  Open WhatsApp on your phone to scan the QR code and link your device.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex flex-col gap-2">
                  <div className="flex items-start gap-4">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-sm font-medium">
                      1
                    </span>
                    <p className="text-sm">Open WhatsApp on your phone</p>
                  </div>
                  <div className="flex items-start gap-4">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-sm font-medium">
                      2
                    </span>
                    <p className="text-sm">
                      Tap <span className="font-semibold">Menu</span>{" "}
                      <MoreVertical className="inline h-4 w-4" /> on Android, or{" "}
                      <span className="font-semibold">Settings</span>{" "}
                      <Settings className="inline h-4 w-4" /> on iPhone
                    </p>
                  </div>
                  <div className="flex items-start gap-4">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-sm font-medium">
                      3
                    </span>
                    <p className="text-sm">
                      Tap <span className="font-semibold">Linked devices</span> and
                      then <span className="font-semibold">Link a device</span>
                    </p>
                  </div>
                  {loginMethod === "qr" && (
                    <div className="flex items-start gap-4">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-sm font-medium">
                        4
                      </span>
                      <p className="text-sm">
                        Point your phone to this screen to capture the QR code
                      </p>
                    </div>
                  )}
                </div>

                <div className="pt-4">
                  <Button
                    variant="link"
                    className="h-auto p-0 text-primary underline hover:cursor-pointer"
                    onClick={() =>
                      setLoginMethod(loginMethod === "qr" ? "phone" : "qr")
                    }
                  >
                    {loginMethod === "qr"
                      ? "Link with phone number instead"
                      : "Link with QR code instead"}
                  </Button>
                </div>
              </div>
            </div>

            {/* Right Side: QR Code / Phone Login */}
            {loginMethod === "qr" ? <WhatsappQrCode /> : <WhatsappPhoneNumber />}
          </div>
        </div>
      </div>
    </>
  );
}
