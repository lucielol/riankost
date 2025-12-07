import type { Context } from "hono";
import prisma from "@repo/db";
import MicrotikConnection from "@repo/api/lib/routeros";

interface VoucherList {
  id: string;
  username: string;
  password: string;
  profile: string;
  uptime: string;
  "bytes-in": string;
  "bytes-out": string;
  "packets-in": string;
  "packets-out": string;
  dynamic: string;
  disabled: string;
  comment: string;
}

interface IRosUser {
  ".id": string;
  name: string;
  password: string;
  profile?: string;
  uptime?: string;
  "bytes-in"?: string;
  "bytes-out"?: string;
  "packets-in"?: string;
  "packets-out"?: string;
  dynamic?: string;
  disabled?: string;
  comment?: string;
}

export default class VoucherController {
  // Get all vouchers
  getAll = async (ctx: Context) => {
    const microtik = new MicrotikConnection();
    try {
      const clientResult = await microtik.connect();

      if (!clientResult.status) {
        return ctx.json({
          error: "Failed to connect to RouterOS",
          message: clientResult.message,
        }, 503);
      }

      const client = clientResult.data;
      const usersResult = await client.runCommand("/ip/hotspot/user/print");

      if (!usersResult.status) {
        return ctx.json({
          error: "Failed to fetch users from RouterOS",
          message: usersResult.message,
        }, 500);
      }

      const users = usersResult.data as unknown as IRosUser[];

      const vouchers: VoucherList[] = users.map((user: IRosUser) => ({
        id: user[".id"],
        username: user.name,
        password: user.password,
        profile: user.profile || "",
        uptime: user.uptime || "",
        "bytes-in": user["bytes-in"] || "",
        "bytes-out": user["bytes-out"] || "",
        "packets-in": user["packets-in"] || "",
        "packets-out": user["packets-out"] || "",
        dynamic: user.dynamic || "",
        disabled: user.disabled || "",
        comment: user.comment || "",
      }));

      return ctx.json({ vouchers });
    } catch (error: any) {
      console.error("Error fetching vouchers from RouterOS:", error);

      // Handle specific error types
      if (error?.message?.includes("Timed out")) {
        return ctx.json({
          error: "RouterOS connection timeout",
          message: "Unable to connect to RouterOS. Please check if the API service is enabled and the port is correctly configured.",
          details: "Verify that port forwarding maps to the API service (default 8728), not Winbox (8291)"
        }, 503);
      }

      if (error?.message?.includes("ECONNREFUSED")) {
        return ctx.json({
          error: "Connection refused",
          message: "RouterOS refused the connection. The service may be disabled or blocked by firewall."
        }, 503);
      }

      return ctx.json({
        error: "Failed to fetch vouchers",
        message: error?.message || "Unknown error occurred"
      }, 500);
    } finally {
      await microtik.disconnect().catch(() => { });
    }
  };

  // Create a new voucher manually
  create = async (ctx: Context) => {
    try {
      const { code, number } = await ctx.req.json();

      if (!code || !number) {
        return ctx.json({ error: "Code and phoneNumber are required" }, 400);
      }

      // 1. Sync to RouterOS first
      const microtik = new MicrotikConnection();
      try {
        const clientResult = await microtik.connect();

        if (!clientResult.status) {
          return ctx.json({
            error: "Failed to connect to RouterOS",
            message: clientResult.message,
          }, 503);
        }

        const client = clientResult.data;

        // Add user to RouterOS using the runCommand API
        const addResult = await client.runCommand("/ip/hotspot/user/add", {
          name: code,
          password: code,
          comment: number,
          // You might want to add profile or other limits here
        });

        if (!addResult.status) {
          return ctx.json({
            error: "Failed to add user to RouterOS",
            message: addResult.message,
          }, 500);
        }
      } catch (rosError: any) {
        console.error("RouterOS Error:", rosError);

        // Handle specific RouterOS errors
        if (rosError?.message?.includes("Timed out")) {
          return ctx.json({
            error: "RouterOS connection timeout",
            message: "Unable to connect to RouterOS. Please check if the API service is enabled and the port is correctly configured.",
            details: "Verify that port forwarding maps to the API service (default 8728), not Winbox (8291)"
          }, 503);
        }

        if (rosError?.message?.includes("ECONNREFUSED")) {
          return ctx.json({
            error: "Connection refused",
            message: "RouterOS refused the connection. The service may be disabled or blocked by firewall."
          }, 503);
        }

        if (rosError?.message?.includes("already exists")) {
          return ctx.json({
            error: "Voucher already exists",
            message: "A voucher with this code already exists in RouterOS"
          }, 409);
        }

        return ctx.json({
          error: "Failed to create voucher on RouterOS",
          message: rosError?.message || "Unknown RouterOS error",
          details: rosError
        }, 500);
      } finally {
        await microtik.disconnect().catch(() => { });
      }

      // 2. Find or create resident in DB
      let resident = await prisma.residents.findUnique({
        where: { number },
      });

      if (!resident) {
        resident = await prisma.residents.create({
          data: { number },
        });
      }

      // 3. Create Voucher in DB
      const voucher = await prisma.voucher.create({
        data: {
          code,
          userId: resident.id,
        },
      });

      return ctx.json({ voucher });
    } catch (error) {
      console.error("Error creating voucher:", error);
      return ctx.json({ error: "Failed to create voucher" }, 500);
    }
  };

  // Get status of auto-voucher (Mock implementation since no config table yet)
  getStatus = async (ctx: Context) => {
    // TODO: Implement actual config storage
    return ctx.json({ isEnabled: true });
  };

  // Toggle auto-voucher status (Mock implementation)
  toggleStatus = async (ctx: Context) => {
    // TODO: Implement actual config storage
    return ctx.json({ message: "Status toggled" });
  };
}
