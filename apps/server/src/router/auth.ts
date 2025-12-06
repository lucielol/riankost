import { auth } from "@repo/auth";
import { Hono } from "hono";

const authRouter = new Hono();

authRouter.on(["POST", "GET"], "/*", (c) => {
  return auth.handler(c.req.raw);
});

export default authRouter;
