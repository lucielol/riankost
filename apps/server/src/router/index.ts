import { Hono } from "hono";
import authRouter from "./auth";
import userRouter from "./user";

const router = new Hono();

router.route("/auth", authRouter);
router.route("/user", userRouter);

export default router;
