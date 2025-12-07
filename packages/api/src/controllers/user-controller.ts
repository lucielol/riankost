import type { Context } from "hono";

export const UserController = {
  getUsers: (ctx: Context) => {
    return ctx.json({
      message: "User router",
    });
  },
};
