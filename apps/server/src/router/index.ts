import { Hono } from "hono";
import authRouter from "@/router/auth";
import userRouter from "@/router/user";

const router = new Hono();

router.route("/auth", authRouter);
router.route("/user", userRouter);

export default router;
