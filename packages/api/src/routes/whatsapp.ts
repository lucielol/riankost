import { WhatsappController } from "../controllers/whatsapp-controller";
import { Hono } from "hono";

const whatsappRouter = new Hono();

whatsappRouter.get("/status", WhatsappController.getStatus);
whatsappRouter.post("/connect", WhatsappController.connect);
whatsappRouter.post("/pair", WhatsappController.pairPhone);
whatsappRouter.post("/disconnect", WhatsappController.disconnect);
whatsappRouter.post("/send", WhatsappController.sendMessage);
whatsappRouter.post("/broadcast", WhatsappController.sendBroadcast);
whatsappRouter.get("/contacts", WhatsappController.getContacts);

export default whatsappRouter;

