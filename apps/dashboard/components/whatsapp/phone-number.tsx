"use client";

import { useWhatsapp } from "@/hooks/use-whatsapp";
import { Button } from "@repo/ui/components/button";
import { Input } from "@repo/ui/components/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components/select";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@repo/ui/components/input-otp";
import { Phone, ArrowLeft, Loader2, Copy } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function WhatsappPhoneNumber() {
  const { pairPhone } = useWhatsapp();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [pairingCode, setPairingCode] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneNumber) {
      setLoading(true);
      try {
        const fullNumber = "62" + phoneNumber.replace(/^0+/, "");
        const res = await pairPhone(fullNumber);
        if (res.code) {
          setPairingCode(res.code);
          setStep("otp");
          toast.success("Pairing code generated!");
        } else {
          toast.error("Failed to generate code");
        }
      } catch (error) {
        toast.error("Failed to generate pairing code");
      } finally {
        setLoading(false);
      }
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(pairingCode);
    toast.success("Copied to clipboard");
  }

  if (step === "otp") {
    return (
      <div className="flex flex-col items-center justify-center border-t pt-6 md:border-l md:border-t-0 md:pl-6 md:pt-0">
        <div className="flex w-full max-w-sm flex-col items-center space-y-6">
          <div className="text-center">
            <div className="mb-4 flex justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Phone className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h3 className="text-lg font-semibold">Enter Code on WhatsApp</h3>
            <p className="text-sm text-muted-foreground">
              Enter this code on your WhatsApp "Link with phone number" screen.
            </p>
          </div>

          <div className="w-full space-y-4">
            <div className="flex flex-col items-center justify-center gap-4">
              <div className="text-4xl font-mono font-bold tracking-widest text-center break-all">
                {pairingCode.split("").map((char, i) => (
                  <span key={i} className="mx-1">{char}</span>
                ))}
              </div>
              <Button variant="outline" size="sm" onClick={copyToClipboard} className="gap-2">
                <Copy className="h-4 w-4" /> Copy Code
              </Button>
            </div>

            <Button
              type="button"
              variant="ghost"
              className="w-full"
              onClick={() => {
                setStep("phone");
                setPairingCode("");
              }}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Try another number
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center border-t pt-6 md:border-l md:border-t-0 md:pl-6 md:pt-0">
      <div className="flex w-full max-w-sm flex-col items-center space-y-6">
        <div className="text-center">
          <div className="mb-4 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <Phone className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h3 className="text-lg font-semibold">Login with Phone Number</h3>
          <p className="text-sm text-muted-foreground">
            Select your country and enter your WhatsApp phone number.
          </p>
        </div>

        <form onSubmit={handlePhoneSubmit} className="w-full space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Country
            </label>
            <Select defaultValue="ID">
              <SelectTrigger>
                <SelectValue placeholder="Select Country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ID">Indonesia (+62)</SelectItem>
                <SelectItem value="US">United States (+1)</SelectItem>
                <SelectItem value="UK">United Kingdom (+44)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Phone Number
            </label>
            <div className="flex gap-2">
              <div className="flex items-center justify-center rounded-md border bg-muted px-3 text-sm font-medium text-muted-foreground">
                +62
              </div>
              <Input
                type="tel"
                placeholder="812-3456-7890"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="flex-1"
                required
              />
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            Next
          </Button>
        </form>
      </div>
    </div>
  );
}
