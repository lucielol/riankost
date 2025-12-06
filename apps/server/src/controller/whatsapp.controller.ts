import makeWASocket, {
  DisconnectReason,
  useMultiFileAuthState,
} from "baileys";
import type { Context } from "hono";
import { Boom } from "@hapi/boom";

let sock: any;
let qrCode: string | undefined;
let status: "connecting" | "connected" | "disconnected" = "disconnected";

export const WhatsappController = {
  init: async () => {
    const { state, saveCreds } = await useMultiFileAuthState("auth_info_baileys");

    sock = makeWASocket({
      auth: state,
      printQRInTerminal: true,
    });

    sock.ev.on("connection.update", (update: any) => {
      const { connection, lastDisconnect, qr } = update;

      if (qr) {
        qrCode = qr;
        status = "connecting";
      }

      if (connection === "close") {
        const shouldReconnect =
          (lastDisconnect?.error as Boom)?.output?.statusCode !==
          DisconnectReason.loggedOut;
        console.log(
          "connection closed due to ",
          lastDisconnect?.error,
          ", reconnecting ",
          shouldReconnect
        );
        status = "disconnected";
        if (shouldReconnect) {
          WhatsappController.init();
        }
      } else if (connection === "open") {
        console.log("opened connection");
        status = "connected";
        qrCode = undefined;
      }
    });

    sock.ev.on("creds.update", saveCreds);
  },

  getStatus: (c: Context) => {
    return c.json({ status, qrCode });
  },

  connect: async (c: Context) => {
    if (!sock) {
      await WhatsappController.init();
    }
    return c.json({ message: "Initializing connection" });
  },

  pairPhone: async (c: Context) => {
    const { phoneNumber } = await c.req.json();
    if (!sock) {
      await WhatsappController.init();
    }

    // Wait a bit for socket to be ready if it was just initialized
    if (!sock.authState.creds.me) {
      await new Promise(r => setTimeout(r, 1000));
    }

    try {
      const code = await sock.requestPairingCode(phoneNumber);
      return c.json({ code });
    } catch (error) {
      return c.json({ error: "Failed to request pairing code" }, 500);
    }
  }
};
