import { Router } from "express";
import { authController } from "../controllers/auth.controller";
import { use } from "../middleware/error.middleware";
import { isAuthed } from "../middleware/session.middleware";

export const authRouter = Router();

authRouter.get("/session", isAuthed(false), use(authController.getSession));
authRouter.post("/createUser", isAuthed(true), use(authController.createUser));
