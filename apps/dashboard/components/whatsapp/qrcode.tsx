"use client";

import { Badge } from "@repo/ui/components/badge";
import { Button } from "@repo/ui/components/button";
import { Loader2, QrCode, RefreshCw } from "lucide-react";

export function WhatsappQrCode() {
  return (
    <div className="flex flex-col items-center justify-center border-t pt-6 md:border-l md:border-t-0 md:pl-6 md:pt-0">
      <div className="flex flex-col items-center space-y-6">
        <div className="relative flex items-center justify-center">
          <div className="relative group cursor-pointer">
            <div className="pointer-events-none absolute -inset-0.5 rounded-xl bg-linear-to-r from-primary to-primary/50 opacity-20 blur transition duration-500 group-hover:opacity-40" />
            <div className="relative flex h-64 w-64 items-center justify-center rounded-xl border bg-white p-4 shadow-sm dark:bg-black">
              <div className="h-full w-full bg-neutral-100 dark:bg-neutral-900 rounded animate-[pulse_3s_ease-in-out_infinite]" />
              <div className="absolute inset-0 flex items-center justify-center">
                <QrCode className="h-16 w-16 text-muted-foreground opacity-20" />
              </div>
              <div className="absolute inset-x-0 bottom-4 text-center">
                <Badge
                  variant="secondary"
                  className="bg-background/80 backdrop-blur text-xs"
                >
                  <Loader2 className="mr-1 h-3 w-3 animate-spin" />
                  Generating QR...
                </Badge>
              </div>
            </div>
            <div className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md">
              <QrCode className="h-4 w-4" />
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-3">
          <Badge
            variant="secondary"
            className="px-4 py-1.5 text-sm font-medium"
          >
            Waiting for scan...
          </Badge>

          <Button variant="outline" className="w-full min-w-[200px] gap-2">
            <RefreshCw className="h-4 w-4" />
            Refresh Code
          </Button>
        </div>
      </div>
    </div>
  );
}
