import { AuthController } from "@/controller/auth.controller";
import { Hono } from "hono";

const authRouter = new Hono();

authRouter.on(["POST", "GET"], "/*", AuthController.handler);

export default authRouter;
