"use client";

import * as React from "react";
import { Head } from "@/components/head";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/ui/components/card";
import { Label } from "@repo/ui/components/label";
import { Input } from "@repo/ui/components/input";
import { Switch } from "@repo/ui/components/switch";
import { Button } from "@repo/ui/components/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@repo/ui/components/select";
import { Separator } from "@repo/ui/components/separator";
import { Settings, Save, RotateCcw } from "lucide-react";
import { toast } from "sonner";

export default function VoucherSettingsPage() {
  const [settings, setSettings] = React.useState({
    // General Settings
    defaultProfile: "1GB",
    autoGeneratePassword: true,
    passwordLength: 8,

    // Expiration Settings
    enableAutoExpiration: false,
    expirationDays: 30,
    deleteExpiredVouchers: false,

    // Notifications
    notifyOnCreation: true,
    notifyOnExpiration: false,
    notificationEmail: "",

    // Advanced
    maxActiveDevices: 1,
    allowDuplicateUsernames: false,
  });

  const handleSave = () => {
    // TODO: Implement save settings API call
    toast.success("Settings saved successfully");
  };

  const handleReset = () => {
    // Reset to default values
    setSettings({
      defaultProfile: "1GB",
      autoGeneratePassword: true,
      passwordLength: 8,
      enableAutoExpiration: false,
      expirationDays: 30,
      deleteExpiredVouchers: false,
      notifyOnCreation: true,
      notifyOnExpiration: false,
      notificationEmail: "",
      maxActiveDevices: 1,
      allowDuplicateUsernames: false,
    });
    toast.info("Settings reset to defaults");
  };

  return (
    <>
      <Head title="Voucher Settings" />

      <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
              <Settings className="h-8 w-8" />
              Voucher Settings
            </h1>
            <p className="text-muted-foreground text-sm">
              Configure voucher generation and management settings
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleReset}>
              <RotateCcw className="mr-2 h-4 w-4" />
              Reset
            </Button>
            <Button onClick={handleSave}>
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </Button>
          </div>
        </div>

        <Separator />

        <div className="grid gap-6">
          {/* General Settings */}
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>
                Configure default voucher creation settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="defaultProfile">Default Profile</Label>
                  <Select
                    value={settings.defaultProfile}
                    onValueChange={(value) =>
                      setSettings({ ...settings, defaultProfile: value })
                    }
                  >
                    <SelectTrigger id="defaultProfile">
                      <SelectValue />
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
                  <p className="text-xs text-muted-foreground">
                    Default profile to use when creating new vouchers
                  </p>
                </div>

                <div className="flex items-center justify-between space-x-2">
                  <div className="space-y-0.5">
                    <Label htmlFor="autoGeneratePassword">Auto-generate Password</Label>
                    <p className="text-xs text-muted-foreground">
                      Automatically use username as password if not specified
                    </p>
                  </div>
                  <Switch
                    id="autoGeneratePassword"
                    checked={settings.autoGeneratePassword}
                    onCheckedChange={(checked) =>
                      setSettings({ ...settings, autoGeneratePassword: checked })
                    }
                  />
                </div>

                {settings.autoGeneratePassword && (
                  <div className="grid gap-2">
                    <Label htmlFor="passwordLength">Password Length</Label>
                    <Input
                      id="passwordLength"
                      type="number"
                      min="6"
                      max="32"
                      value={settings.passwordLength}
                      onChange={(e) =>
                        setSettings({ ...settings, passwordLength: parseInt(e.target.value) })
                      }
                    />
                    <p className="text-xs text-muted-foreground">
                      Length of auto-generated passwords (6-32 characters)
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Expiration Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Expiration Settings</CardTitle>
              <CardDescription>
                Configure voucher expiration and cleanup rules
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between space-x-2">
                <div className="space-y-0.5">
                  <Label htmlFor="enableAutoExpiration">Enable Auto-Expiration</Label>
                  <p className="text-xs text-muted-foreground">
                    Automatically expire vouchers after a set number of days
                  </p>
                </div>
                <Switch
                  id="enableAutoExpiration"
                  checked={settings.enableAutoExpiration}
                  onCheckedChange={(checked) =>
                    setSettings({ ...settings, enableAutoExpiration: checked })
                  }
                />
              </div>

              {settings.enableAutoExpiration && (
                <>
                  <div className="grid gap-2">
                    <Label htmlFor="expirationDays">Expiration Period (Days)</Label>
                    <Input
                      id="expirationDays"
                      type="number"
                      min="1"
                      max="365"
                      value={settings.expirationDays}
                      onChange={(e) =>
                        setSettings({ ...settings, expirationDays: parseInt(e.target.value) })
                      }
                    />
                    <p className="text-xs text-muted-foreground">
                      Number of days before vouchers expire automatically
                    </p>
                  </div>

                  <div className="flex items-center justify-between space-x-2">
                    <div className="space-y-0.5">
                      <Label htmlFor="deleteExpiredVouchers">Delete Expired Vouchers</Label>
                      <p className="text-xs text-muted-foreground">
                        Automatically delete vouchers after expiration
                      </p>
                    </div>
                    <Switch
                      id="deleteExpiredVouchers"
                      checked={settings.deleteExpiredVouchers}
                      onCheckedChange={(checked) =>
                        setSettings({ ...settings, deleteExpiredVouchers: checked })
                      }
                    />
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>
                Configure email notifications for voucher events
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-2">
                <Label htmlFor="notificationEmail">Notification Email</Label>
                <Input
                  id="notificationEmail"
                  type="email"
                  placeholder="admin@example.com"
                  value={settings.notificationEmail}
                  onChange={(e) =>
                    setSettings({ ...settings, notificationEmail: e.target.value })
                  }
                />
                <p className="text-xs text-muted-foreground">
                  Email address to receive voucher notifications
                </p>
              </div>

              <div className="flex items-center justify-between space-x-2">
                <div className="space-y-0.5">
                  <Label htmlFor="notifyOnCreation">Notify on Creation</Label>
                  <p className="text-xs text-muted-foreground">
                    Send email when new vouchers are created
                  </p>
                </div>
                <Switch
                  id="notifyOnCreation"
                  checked={settings.notifyOnCreation}
                  onCheckedChange={(checked) =>
                    setSettings({ ...settings, notifyOnCreation: checked })
                  }
                />
              </div>

              <div className="flex items-center justify-between space-x-2">
                <div className="space-y-0.5">
                  <Label htmlFor="notifyOnExpiration">Notify on Expiration</Label>
                  <p className="text-xs text-muted-foreground">
                    Send email when vouchers are about to expire
                  </p>
                </div>
                <Switch
                  id="notifyOnExpiration"
                  checked={settings.notifyOnExpiration}
                  onCheckedChange={(checked) =>
                    setSettings({ ...settings, notifyOnExpiration: checked })
                  }
                />
              </div>
            </CardContent>
          </Card>

          {/* Advanced Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Advanced Settings</CardTitle>
              <CardDescription>
                Advanced configuration options for voucher management
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-2">
                <Label htmlFor="maxActiveDevices">Max Active Devices</Label>
                <Input
                  id="maxActiveDevices"
                  type="number"
                  min="1"
                  max="10"
                  value={settings.maxActiveDevices}
                  onChange={(e) =>
                    setSettings({ ...settings, maxActiveDevices: parseInt(e.target.value) })
                  }
                />
                <p className="text-xs text-muted-foreground">
                  Maximum number of devices that can use a voucher simultaneously
                </p>
              </div>

              <div className="flex items-center justify-between space-x-2">
                <div className="space-y-0.5">
                  <Label htmlFor="allowDuplicateUsernames">Allow Duplicate Usernames</Label>
                  <p className="text-xs text-muted-foreground">
                    Allow creating vouchers with duplicate usernames
                  </p>
                </div>
                <Switch
                  id="allowDuplicateUsernames"
                  checked={settings.allowDuplicateUsernames}
                  onCheckedChange={(checked) =>
                    setSettings({ ...settings, allowDuplicateUsernames: checked })
                  }
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
