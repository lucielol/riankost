import { UserController } from "@/controllers/user.controller";
import { Hono } from "hono";

const userRouter = new Hono();

userRouter.get("/", UserController.getUsers);

export default userRouter;
