import { Hono } from "hono";
import authRouter from "./auth";
import userRouter from "./user";
import voucherRouter from "./voucher";
import whatsappRouter from "./whatsapp";

const router = new Hono();

router.route("/auth", authRouter);
router.route("/user", userRouter);
router.route("/voucher", voucherRouter);
router.route("/whatsapp", whatsappRouter);

export default router;
