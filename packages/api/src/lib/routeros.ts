import { createRouterOSClient } from "./ts-router-os/index";
import type { Result } from "./ts-router-os/index";

class MicrotikConnection {
  private client: ReturnType<typeof createRouterOSClient> | null = null;
  private connected: boolean = false;
  private authenticated: boolean = false;

  constructor() { }

  async connect(): Promise<Result<ReturnType<typeof createRouterOSClient>>> {
    try {
      const config = {
        host: process.env.ROUTEROS_HOST || "",
        user: process.env.ROUTEROS_USER || "admin",
        password: process.env.ROUTEROS_PASSWORD || "",
        port: Number(process.env.ROUTEROS_PORT || 8728),
        timeout: 30,
      };

      // Create client
      this.client = createRouterOSClient({
        host: config.host,
        port: config.port,
        ssl: false,
        timeout: config.timeout * 1000, // Convert to milliseconds
      });

      // Connect to RouterOS
      const connected = await this.client.connect();
      if (!connected.status) {
        return {
          status: false,
          message: connected.message,
          error: connected.error,
        };
      }
      this.connected = true;

      // Authenticate
      const auth = await this.client.login(config.user, config.password);
      if (!auth.status) {
        return {
          status: false,
          message: auth.message,
          error: auth.error,
        };
      }
      this.authenticated = true;

      return { status: true, data: this.client };
    } catch (error) {
      console.error("Failed to connect to RouterOS:", error);
      return {
        status: false,
        message: error instanceof Error ? error.message : "Unknown error",
        error,
      };
    }
  }

  async disconnect(): Promise<void> {
    if (!this.client || !this.connected) return;

    try {
      this.client.close();
      this.connected = false;
      this.authenticated = false;
    } catch (error) {
      console.error("Failed to disconnect from RouterOS:", error);
      throw error;
    }
  }

  getClient(): ReturnType<typeof createRouterOSClient> | null {
    return this.connected && this.authenticated ? this.client : null;
  }

  // Backward compatibility
  mikrotik(): ReturnType<typeof createRouterOSClient> | null {
    return this.connected && this.authenticated ? this.client : null;
  }
}

export default MicrotikConnection;
