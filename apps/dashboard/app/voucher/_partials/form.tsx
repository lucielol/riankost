"use client";

import * as React from "react";
import { Button } from "@repo/ui/components/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@repo/ui/components/dialog";
import { Input } from "@repo/ui/components/input";
import { Label } from "@repo/ui/components/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components/select";
import { Textarea } from "@repo/ui/components/textarea";

interface VoucherFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function VoucherForm({ open, onOpenChange }: VoucherFormProps) {
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      username: formData.get("username"),
      password: formData.get("password"),
      profile: formData.get("profile"),
      comment: formData.get("comment"),
    };

    try {
      // TODO: Implement API call to create voucher
      console.log("Creating voucher:", data);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      onOpenChange(false);
      // TODO: Show success toast
    } catch (error) {
      console.error("Error creating voucher:", error);
      // TODO: Show error toast
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create New Voucher</DialogTitle>
          <DialogDescription>
            Fill in the details to create a new voucher code.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            {/* Username */}
            <div className="grid gap-2">
              <Label htmlFor="username">
                Username <span className="text-destructive">*</span>
              </Label>
              <Input
                id="username"
                name="username"
                placeholder="Enter username"
                required
                disabled={isSubmitting}
              />
            </div>

            {/* Password */}
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Leave empty to use username as password"
                disabled={isSubmitting}
              />
              <p className="text-xs text-muted-foreground">
                If left empty, username will be used as password
              </p>
            </div>

            {/* Profile */}
            <div className="grid gap-2">
              <Label htmlFor="profile">
                Profile <span className="text-destructive">*</span>
              </Label>
              <Select name="profile" required disabled={isSubmitting}>
                <SelectTrigger id="profile">
                  <SelectValue placeholder="Select profile" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1GB">1GB</SelectItem>
                  <SelectItem value="2GB">2GB</SelectItem>
                  <SelectItem value="3GB">3GB</SelectItem>
                  <SelectItem value="5GB">5GB</SelectItem>
                  <SelectItem value="10GB">10GB</SelectItem>
                  <SelectItem value="unlimited">Unlimited</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Comment */}
            <div className="grid gap-2">
              <Label htmlFor="comment">Comment</Label>
              <Textarea
                id="comment"
                name="comment"
                placeholder="Add a comment (optional)"
                rows={3}
                disabled={isSubmitting}
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Create Voucher"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
