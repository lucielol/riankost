import { Hono } from "hono";
import authRouter from "./routes/auth";
import userRouter from "./routes/user";
import whatsappRouter from "./routes/whatsapp";
import voucherRouter from "./routes/voucher";

export const apiRouter = new Hono();

apiRouter.route("/auth", authRouter);
apiRouter.route("/user", userRouter);
apiRouter.route("/whatsapp", whatsappRouter);
apiRouter.route("/voucher", voucherRouter);

export { appRouter } from "./routers/index";
export * from "./context";
export * from "./lib/routeros";
