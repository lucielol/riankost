"use client";

import { useWhatsapp } from "@/hooks/use-whatsapp";
import { Badge } from "@repo/ui/components/badge";
import { Button } from "@repo/ui/components/button";
import { Loader2, QrCode, RefreshCw } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { useEffect } from "react";
import { toast } from "sonner";

export function WhatsappQrCode() {
  const { status, qrCode, connect, isLoading } = useWhatsapp();

  useEffect(() => {
    if (status === "disconnected" && !qrCode) {
      connect();
    }
  }, [status, qrCode, connect]);

  const handleRefresh = () => {
    connect();
    toast.success("Refreshing QR Code...");
  };

  return (
    <div className="flex flex-col items-center justify-center border-t pt-6 md:border-l md:border-t-0 md:pl-6 md:pt-0">
      <div className="flex flex-col items-center space-y-6">
        <div className="relative flex items-center justify-center">
          <div className="relative group cursor-pointer">
            <div className="pointer-events-none absolute -inset-0.5 rounded-xl bg-linear-to-r from-primary to-primary/50 opacity-20 blur transition duration-500 group-hover:opacity-40" />
            <div className="relative flex h-64 w-64 items-center justify-center rounded-xl border bg-white p-2 shadow-sm">
              {qrCode ? (
                <QRCodeSVG className="rounded-xl"
                  value={qrCode}
                  size={300}
                  level={"Q"}
                  bgColor={"#ffffff"}
                  fgColor={"#000000"}
                />
              ) : (
                <>
                  <div className="h-full w-full bg-neutral-100 rounded animate-[pulse_3s_ease-in-out_infinite]" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <QrCode className="h-16 w-16 text-black opacity-20" />
                  </div>
                </>
              )}

              {!qrCode && (
                <div className="absolute inset-x-0 bottom-4 text-center">
                  <Badge
                    variant="secondary"
                    className="bg-background/80 backdrop-blur text-xs"
                  >
                    <Loader2 className="mr-1 h-3 w-3 animate-spin" />
                    {status === "connecting" ? "Connecting..." : "Generating QR..."}
                  </Badge>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-3">
          <span className="text-muted-foreground">

            {qrCode ? "Scan with WhatsApp" : "Waiting for code..."}
          </span>

          <Button
            variant="outline"
            className="w-full min-w-[200px] rounded-full gap-2"
            onClick={handleRefresh}
          >
            <RefreshCw className="h-4 w-4" />
            Refresh Code
          </Button>
        </div>
      </div>
    </div>
  );
}
