"use client";

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
import { Phone, ArrowLeft } from "lucide-react";
import { useState } from "react";

export function WhatsappPhoneNumber() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [code, setCode] = useState("");

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneNumber) {
      setStep("otp");
    }
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Verifying OTP:", code);
  };

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
            <h3 className="text-lg font-semibold">Enter Code</h3>
            <p className="text-sm text-muted-foreground">
              We've sent an 6-digit code to +62 {phoneNumber}
            </p>
          </div>

          <form onSubmit={handleOtpSubmit} className="w-full space-y-4">
            <div className="flex justify-center">
              <InputOTP maxLength={6} value={code} onChange={setCode}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>

            <Button type="submit" className="w-full">
              Verify
            </Button>
            <Button
              type="button"
              variant="ghost"
              className="w-full"
              onClick={() => setStep("phone")}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Change Phone Number
            </Button>
          </form>
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
              />
            </div>
          </div>

          <Button type="submit" className="w-full">
            Next
          </Button>
        </form>
      </div>
    </div>
  );
}
