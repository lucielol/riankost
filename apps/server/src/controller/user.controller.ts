import type { Context } from "hono";

export const UserController = {
  getUsers: (c: Context) => {
    return c.json({
      message: "User router",
    });
  },
};
