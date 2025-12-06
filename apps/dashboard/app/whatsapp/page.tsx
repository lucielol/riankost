"use client";

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
} from "lucide-react";
import { useState } from "react";

export default function WhatsappPage() {
  const isConnected = false;
  const [loginMethod, setLoginMethod] = useState<"qr" | "phone">("qr");

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-3">
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
            {/* Left Side: Instructions / Status Info */}
            <div className="flex flex-col justify-center space-y-6">
              <div>
                <h2 className="text-2xl font-bold tracking-tight">
                  {isConnected
                    ? "Device Connected"
                    : "Use WhatsApp on your computer"}
                </h2>
                <p className="mt-2 text-muted-foreground">
                  {isConnected
                    ? "Your device is successfully linked and synchronization is active."
                    : "Open WhatsApp on your phone to scan the QR code and link your device."}
                </p>
              </div>

              {!isConnected ? (
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
                      className="h-auto p-0 text-primary"
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
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center gap-4 rounded-lg border p-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400">
                      <Smartphone className="h-6 w-6" />
                    </div>
                    <div className="space-y-1">
                      <p className="font-medium leading-none">iPhone 13 Pro Max</p>
                      <p className="text-sm text-muted-foreground">
                        Active now • Battery 80%
                      </p>
                    </div>
                    <Badge
                      variant="outline"
                      className="ml-auto border-green-200 text-green-700 dark:border-green-800 dark:text-green-400"
                    >
                      Online
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span>Messages are syncing in the background</span>
                  </div>
                  <Button variant="destructive" className="w-full gap-2 mt-4">
                    <LogOut className="h-4 w-4" />
                    Disconnect Device
                  </Button>
                </div>
              )}
            </div>

            {/* Right Side: QR Code / Phone Login */}
            {isConnected ? (
              <div className="hidden md:flex flex-col items-center justify-center border-l pl-6">
                <div className="flex h-64 w-64 items-center justify-center rounded-full bg-green-50 dark:bg-green-900/10 mb-4">
                  <div className="relative flex h-48 w-48 items-center justify-center rounded-full bg-green-100 shadow-lg dark:bg-green-900/20 animate-pulse">
                    <Smartphone className="h-24 w-24 text-green-600 dark:text-green-400" />
                    <Badge className="absolute -bottom-2 px-3 py-1 bg-green-600 hover:bg-green-600">
                      Connected
                    </Badge>
                  </div>
                </div>
              </div>
            ) : (
              loginMethod === "qr" ? <WhatsappQrCode /> : <WhatsappPhoneNumber />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
