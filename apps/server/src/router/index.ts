import { Hono } from "hono";
import authRouter from "@/router/auth";
import userRouter from "@/router/user";
import whatsappRouter from "@/router/whatsapp";

const router = new Hono();

router.route("/auth", authRouter);
router.route("/user", userRouter);
router.route("/whatsapp", whatsappRouter);

export default router;
