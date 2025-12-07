import makeWASocket, {
  DisconnectReason,
  useMultiFileAuthState,
  type WASocket,
} from "baileys";
import { Boom } from "@hapi/boom";
import fs from "fs";

interface WhatsappServiceState {
  sock?: WASocket;
  qrCode?: string;
  status: "connecting" | "connected" | "disconnected";
  reconnectAttempts: number;
}

class WhatsappService {
  private state: WhatsappServiceState = {
    status: "disconnected",
    reconnectAttempts: 0,
  };

  private authPath = "auth_info_baileys";
  private maxReconnectAttempts = 5;
  private reconnectDelay = 5000; // 5 seconds

  async init() {
    const { state, saveCreds } = await useMultiFileAuthState(this.authPath);

    this.state.sock = makeWASocket({
      auth: state,
      printQRInTerminal: false,
    });

    this.state.sock.ev.on("connection.update", (update: any) => {
      const { connection, lastDisconnect, qr } = update;

      if (qr) {
        this.state.qrCode = qr;
        this.state.status = "connecting";
      }

      if (connection === "close") {
        const statusCode = (lastDisconnect?.error as Boom)?.output?.statusCode;

        // Check if it's a conflict error (another instance connected)
        if (statusCode === 440) {
          console.log("⚠️  Conflict detected: Another WhatsApp instance is connected.");
          console.log("Please disconnect other instances or logout from WhatsApp Web/Desktop.");
          this.state.status = "disconnected";
          this.state.reconnectAttempts = 0;
          return; // Don't reconnect on conflict
        }

        const shouldReconnect = statusCode !== DisconnectReason.loggedOut;

        console.log(
          "connection closed due to ",
          lastDisconnect?.error,
          ", reconnecting ",
          shouldReconnect
        );

        this.state.status = "disconnected";

        if (shouldReconnect && this.state.reconnectAttempts < this.maxReconnectAttempts) {
          this.state.reconnectAttempts++;
          console.log(`Reconnect attempt ${this.state.reconnectAttempts}/${this.maxReconnectAttempts}`);

          // Add delay before reconnecting
          setTimeout(() => {
            this.init();
          }, this.reconnectDelay);
        } else if (this.state.reconnectAttempts >= this.maxReconnectAttempts) {
          console.log("❌ Max reconnection attempts reached. Please reconnect manually.");
          this.state.reconnectAttempts = 0;
        } else {
          // Logged out or banned, clear session
          console.log("Session invalid, clearing auth data...");
          this.clearSession();
          this.state.reconnectAttempts = 0;
        }
      } else if (connection === "open") {
        console.log("✅ WhatsApp connected successfully");
        this.state.status = "connected";
        this.state.qrCode = undefined;
        this.state.reconnectAttempts = 0; // Reset on successful connection
      }
    });

    this.state.sock.ev.on("creds.update", saveCreds);
  }

  private clearSession() {
    this.state.sock = undefined;
    this.state.qrCode = undefined;
    try {
      fs.rmSync(this.authPath, { recursive: true, force: true });
    } catch (err) {
      console.error("Failed to remove auth directory:", err);
    }
  }

  getStatus() {
    return {
      status: this.state.status,
      qrCode: this.state.qrCode,
      user: this.state.sock?.user,
    };
  }

  async connect() {
    if (!this.state.sock) {
      await this.init();
    }
    return { message: "Initializing connection" };
  }

  async pairPhone(phoneNumber: string) {
    if (!this.state.sock) {
      await this.init();
    }

    // Wait for socket to be ready
    let attempts = 0;
    while (!this.state.sock?.authState?.creds?.me && attempts < 10) {
      await new Promise((r) => setTimeout(r, 500));
      attempts++;
    }

    try {
      const code = await this.state.sock!.requestPairingCode(phoneNumber);
      return { code };
    } catch (error) {
      console.error("Pairing error:", error);
      throw new Error("Failed to request pairing code");
    }
  }

  async disconnect() {
    try {
      if (this.state.sock) {
        await this.state.sock.logout();
      }
      this.state.status = "disconnected";
      this.state.qrCode = undefined;
      this.clearSession();
      return { message: "Disconnected successfully" };
    } catch (error) {
      console.error("Disconnect error:", error);
      throw new Error("Failed to disconnect");
    }
  }

  async sendMessage(to: string, message: string) {
    if (!this.state.sock || this.state.status !== "connected") {
      throw new Error("WhatsApp is not connected");
    }

    try {
      // Format the phone number to JID format
      const jid = to.includes("@") ? to : `${to}@s.whatsapp.net`;

      const result = await this.state.sock.sendMessage(jid, {
        text: message,
      });

      return {
        success: true,
        messageId: result?.key?.id,
      };
    } catch (error) {
      console.error("Send message error:", error);
      throw new Error("Failed to send message");
    }
  }

  async sendBroadcast(contacts: string[], message: string, delay = 1000) {
    if (!this.state.sock || this.state.status !== "connected") {
      throw new Error("WhatsApp is not connected");
    }

    const results = {
      sent: 0,
      failed: 0,
      errors: [] as Array<{ contact: string; error: string }>,
    };

    for (const contact of contacts) {
      try {
        await this.sendMessage(contact, message);
        results.sent++;

        // Add delay between messages to avoid spam detection
        if (delay > 0 && contact !== contacts[contacts.length - 1]) {
          await new Promise((r) => setTimeout(r, delay));
        }
      } catch (error) {
        results.failed++;
        results.errors.push({
          contact,
          error: error instanceof Error ? error.message : "Unknown error",
        });
      }
    }

    return {
      success: results.failed === 0,
      ...results,
    };
  }

  async getContacts() {
    if (!this.state.sock || this.state.status !== "connected") {
      throw new Error("WhatsApp is not connected");
    }

    try {
      // Note: Baileys doesn't provide a built-in contacts store in the current version
      // You would need to implement your own contact storage or use the database
      // For now, returning empty array as placeholder
      return { contacts: [] };
    } catch (error) {
      console.error("Get contacts error:", error);
      throw new Error("Failed to get contacts");
    }
  }
}

// Export singleton instance
export const whatsappService = new WhatsappService();
