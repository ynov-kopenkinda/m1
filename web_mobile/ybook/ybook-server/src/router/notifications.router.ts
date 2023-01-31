import { Router } from "express";
import { notificationsController } from "../controllers/notifications.controller";
import { use } from "../middleware/error.middleware";
import { isAuthed } from "../middleware/session.middleware";

export const notificationsRouter = Router();
notificationsRouter.use(isAuthed(true));

notificationsRouter.get("/", use(notificationsController.getNotifications));
