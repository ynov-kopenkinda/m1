import { Router } from "express";
import { chatroomController } from "./chatroom.controller";
import { use } from "../_middlewares/error.middleware";
import { isAuthed } from "../_middlewares/session.middleware";

export const chatroomRouter = Router();
chatroomRouter.use(isAuthed(true));

chatroomRouter.get("/", use(chatroomController.getConversations));
chatroomRouter.post("/", use(chatroomController.startConversation));
chatroomRouter.get("/:id", use(chatroomController.getConversation));
