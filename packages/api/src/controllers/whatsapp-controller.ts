import { whatsappService } from "../lib/whatsapp-service";
import type { Context } from "hono";

export const WhatsappController = {
  init: async () => {
    await whatsappService.init();
  },

  getStatus: (ctx: Context) => {
    const status = whatsappService.getStatus();
    return ctx.json(status);
  },

  connect: async (ctx: Context) => {
    try {
      const result = await whatsappService.connect();
      return ctx.json(result);
    } catch (error) {
      console.error("Connect error:", error);
      return ctx.json({ error: "Failed to connect" }, 500);
    }
  },

  pairPhone: async (ctx: Context) => {
    try {
      const { phoneNumber } = await ctx.req.json();
      const result = await whatsappService.pairPhone(phoneNumber);
      return ctx.json(result);
    } catch (error) {
      console.error("Pairing error:", error);
      return ctx.json({ error: "Failed to request pairing code" }, 500);
    }
  },

  disconnect: async (ctx: Context) => {
    try {
      const result = await whatsappService.disconnect();
      return ctx.json(result);
    } catch (error) {
      console.error("Disconnect error:", error);
      return ctx.json({ error: "Failed to disconnect" }, 500);
    }
  },

  sendMessage: async (ctx: Context) => {
    try {
      const { to, message } = await ctx.req.json();

      if (!to || !message) {
        return ctx.json({ error: "Missing required fields: to, message" }, 400);
      }

      const result = await whatsappService.sendMessage(to, message);
      return ctx.json(result);
    } catch (error) {
      console.error("Send message error:", error);
      return ctx.json(
        { error: error instanceof Error ? error.message : "Failed to send message" },
        500
      );
    }
  },

  sendBroadcast: async (ctx: Context) => {
    try {
      const { contacts, message, delay } = await ctx.req.json();

      if (!contacts || !Array.isArray(contacts) || !message) {
        return ctx.json(
          { error: "Missing required fields: contacts (array), message" },
          400
        );
      }

      const result = await whatsappService.sendBroadcast(contacts, message, delay);
      return ctx.json(result);
    } catch (error) {
      console.error("Broadcast error:", error);
      return ctx.json(
        { error: error instanceof Error ? error.message : "Failed to send broadcast" },
        500
      );
    }
  },

  getContacts: async (ctx: Context) => {
    try {
      const result = await whatsappService.getContacts();
      return ctx.json(result);
    } catch (error) {
      console.error("Get contacts error:", error);
      return ctx.json(
        { error: error instanceof Error ? error.message : "Failed to get contacts" },
        500
      );
    }
  },
};

