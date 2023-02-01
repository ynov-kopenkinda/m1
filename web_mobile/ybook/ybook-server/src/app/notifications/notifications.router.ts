import { Router } from "express";
import { notificationsController } from "./notifications.controller";
import { use } from "../_middlewares/error.middleware";
import { isAuthed } from "../_middlewares/session.middleware";

export const notificationsRouter = Router();
notificationsRouter.use(isAuthed(true));

notificationsRouter.get("/", use(notificationsController.api_getNotifications));
