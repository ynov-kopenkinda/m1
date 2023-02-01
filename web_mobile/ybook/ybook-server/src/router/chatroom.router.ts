import { Router } from "express";
import { chatroomController } from "../controllers/chatroom.controller";
import { use } from "../middleware/error.middleware";
import { isAuthed } from "../middleware/session.middleware";

export const chatroomRouter = Router();
chatroomRouter.use(isAuthed(true));

chatroomRouter.get("/", use(chatroomController.getConversations));
chatroomRouter.post("/", use(chatroomController.startConversation));
chatroomRouter.get("/:id", use(chatroomController.getConversation));
