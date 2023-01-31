import { Router } from "express";
import { extractSession, isAuthed } from "../middleware/session.middleware";

export const chatroomRouter = Router();
chatroomRouter.use(isAuthed(true));

chatroomRouter.post("/", async (req, res) => {
  const session = await extractSession(res);
});
