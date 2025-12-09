import "dotenv/config";
import { trpcServer } from "@hono/trpc-server";
import { createContext } from "@repo/api/context";
import { apiRouter, appRouter } from "@repo/api";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";

const app = new Hono();

app.use(logger());
app.use(
  "/*",
  cors({
    origin: [
      process.env.NEXT_PUBLIC_DASHBOARD_URL || "http://localhost:3001",
      process.env.NEXT_PUBLIC_AUTH_URL || "http://localhost:3002",
    ],
    allowMethods: ["GET", "POST", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);

app.route("/api", apiRouter);

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
