import { Hono } from "hono";
import VoucherController from "../controllers/voucher-controller";

const voucherRouter = new Hono();
const voucherController = new VoucherController();

voucherRouter.get("/", voucherController.getAll);
voucherRouter.post("/", voucherController.create);
voucherRouter.get("/status", voucherController.getStatus);
voucherRouter.post("/toggle", voucherController.toggleStatus);

export default voucherRouter;
