import { WhatsappController } from "@/controller/whatsapp.controller";
import { Hono } from "hono";

const whatsappRouter = new Hono();

whatsappRouter.get("/status", WhatsappController.getStatus);
whatsappRouter.post("/connect", WhatsappController.connect);
whatsappRouter.post("/pair", WhatsappController.pairPhone);

export default whatsappRouter;
