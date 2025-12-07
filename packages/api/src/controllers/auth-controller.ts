import { auth } from "@repo/auth";
import type { Context } from "hono";

export const AuthController = {
  handler: (ctx: Context) => {
    return auth.handler(ctx.req.raw);
  },
};
