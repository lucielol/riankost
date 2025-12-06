import { Hono } from "hono";
import authRouter from "@/routes/auth";
import userRouter from "@/routes/user";
import whatsappRouter from "@/routes/whatsapp";

const router = new Hono();

router.route("/auth", authRouter);
router.route("/user", userRouter);
router.route("/whatsapp", whatsappRouter);

export default router;
