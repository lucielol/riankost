"use client";

import { Badge } from "@repo/ui/components/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@repo/ui/components/popover";
import { Wifi } from "lucide-react";
import { useMemo, memo } from "react";
import type { ActiveVoucher } from "@/hooks/use-voucher";
import { usePopoverState } from "@/contexts/popover-context";
import { useLanguage } from "@/contexts/language-context";

interface DeviceCountBadgeProps {
  username: string;
  activeVouchers: ActiveVoucher[];
}

export const DeviceCountBadge = memo(function DeviceCountBadge({ username, activeVouchers }: DeviceCountBadgeProps) {
  const { isPopoverOpen, setPopoverOpen } = usePopoverState();
  const { t } = useLanguage();
  const popoverId = `device-badge-${username}`;

  const devices = useMemo(() => {
    return activeVouchers.filter((v) => v.username === username);
  }, [activeVouchers, username]);

  const deviceCount = devices.length;
  const open = isPopoverOpen(popoverId);

  if (deviceCount === 0) {
    if (open) setPopoverOpen(popoverId, false);
    return null;
  }

  return (
    <Popover open={open} onOpenChange={(newOpen) => setPopoverOpen(popoverId, newOpen)}>
      <PopoverTrigger asChild>
        <Badge
          variant="secondary"
          className="cursor-pointer hover:bg-secondary/80 gap-1 text-xs"
        >
          <Wifi className="h-3 w-3" />
          {deviceCount}
        </Badge>
      </PopoverTrigger>
      <PopoverContent side="right" align="start" className="w-70 p-0">
        <div className="space-y-2 p-3">
          <div className="flex items-center gap-2 pb-2 border-b">
            <Wifi className="h-4 w-4" />
            <h4 className="font-semibold text-sm">{t('voucher.activeDevices')} ({deviceCount})</h4>
          </div>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {devices.map((device, index) => (
              <div
                key={device.id}
                className="p-2 rounded-md bg-muted/50 hover:bg-muted transition-colors space-y-1.5"
              >
                <div className="text-xs font-medium text-muted-foreground mb-1">
                  {t('voucher.device')} {index + 1}
                </div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs text-muted-foreground min-w-[32px]">MAC</span>
                  <code className="text-xs font-mono select-all flex-1 text-right">
                    {device["mac-address"]}
                  </code>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs text-muted-foreground min-w-[32px]">IP</span>
                  <code className="text-xs font-mono select-all flex-1 text-right">
                    {device.address}
                  </code>
                </div>
              </div>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
});
