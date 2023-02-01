import { Router } from "express";
import { friendsController } from "./friends.controller";
import { use } from "../_middlewares/error.middleware";
import { isAuthed } from "../_middlewares/session.middleware";

export const friendsRouter = Router();
friendsRouter.use(isAuthed(true));

friendsRouter.get("/", use(friendsController.getFriends));
friendsRouter.post("/", use(friendsController.sendOrAcceptFriendRequest));
friendsRouter.delete("/", use(friendsController.removeOrRejectFriendRequest));
friendsRouter.get("/suggested", use(friendsController.getSuggested));
friendsRouter.get("/global", use(friendsController.getOthers));
friendsRouter.get("/requests", use(friendsController.getFriendRequests));
