import { auth } from "@repo/auth";
import type { Context } from "hono";

export const AuthController = {
  handler: (c: Context) => {
    return auth.handler(c.req.raw);
  },
};
