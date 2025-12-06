import "dotenv/config";
import { trpcServer } from "@hono/trpc-server";
import { createContext } from "@repo/api/context";
import { appRouter } from "@repo/api/routers/index";
import { auth } from "@repo/auth";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";

const app = new Hono();

app.use(logger());
app.use(
  "/*",
  cors({
    origin: (origin) => {
      const allowed = [
        process.env.CORS_ORIGIN || "",
        "http://localhost:3001",
        "http://localhost:3002",
      ];
      return allowed.includes(origin) ? origin : process.env.CORS_ORIGIN || "";
    },
    allowMethods: ["GET", "POST", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);

app.on(["POST", "GET"], "/api/auth/*", (c) => {
  return auth.handler(c.req.raw);
});

app.use(
  "/trpc/*",
  trpcServer({
    router: appRouter,
    createContext: (_opts, context) => {
      return createContext({ context });
    },
  }),
);

app.get("/", (c) => {
  return c.text("OK");
});

import { serve } from "@hono/node-server";

serve(
  {
    fetch: app.fetch,
    port: 4000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  },
);
