import { Hono } from "hono";

const userRouter = new Hono();

userRouter.get("/", (c) => {
  return c.json({
    message: "User router",
  });
});

export default userRouter;
