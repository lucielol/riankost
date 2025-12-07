export const getMikrotikConfig = () => ({
  host: process.env.ROUTEROS_HOST || "",
  user: process.env.ROUTEROS_USER || "admin",
  password: process.env.ROUTEROS_PASSWORD || "",
  port: Number(process.env.ROUTEROS_PORT || 8728),
  timeout: 30,
  keepalive: true,
});

export default getMikrotikConfig;