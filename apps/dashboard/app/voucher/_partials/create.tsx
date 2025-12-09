"use client";

import * as React from "react";
import { Button } from "@repo/ui/components/button";
import { Plus } from "lucide-react";
import { VoucherForm } from "@/app/voucher/_partials/form";

interface CreateVoucherButtonProps {
  label?: string;
}

export function CreateVoucherButton({ label = "Create Voucher" }: CreateVoucherButtonProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Button size="sm" className="h-9 gap-2" onClick={() => setOpen(true)}>
        <Plus className="h-4 w-4" />
        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
          {label}
        </span>
      </Button>

      <VoucherForm open={open} onOpenChange={setOpen} />
    </>
  );
}
