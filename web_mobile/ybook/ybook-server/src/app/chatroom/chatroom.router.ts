import { Router } from "express";
import { chatroomController } from "./chatroom.controller";
import { use } from "../_middlewares/error.middleware";
import { isAuthed } from "../_middlewares/session.middleware";

export const chatroomRouter = Router();
chatroomRouter.use(isAuthed(true));

chatroomRouter.get("/", use(chatroomController.api_getConversations));
chatroomRouter.post("/", use(chatroomController.api_startConversation));
chatroomRouter.get("/:id", use(chatroomController.api_getConversation));
