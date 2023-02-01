import { Router } from "express";
import { friendsController } from "./friends.controller";
import { use } from "../_middlewares/error.middleware";
import { isAuthed } from "../_middlewares/session.middleware";

export const friendsRouter = Router();
friendsRouter.use(isAuthed(true));

friendsRouter.get("/", use(friendsController.api_getFriends));
friendsRouter.post("/", use(friendsController.api_sendOrAcceptFriendRequest));
friendsRouter.delete("/", use(friendsController.api_removeOrRejectFriendRequest));
friendsRouter.get("/suggested", use(friendsController.api_getSuggested));
friendsRouter.get("/global", use(friendsController.api_getOthers));
friendsRouter.get("/requests", use(friendsController.api_getFriendRequests));
