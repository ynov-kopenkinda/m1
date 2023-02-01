import { Router } from "express";
import { authController } from "./auth.controller";
import { use } from "../_middlewares/error.middleware";
import { isAuthed } from "../_middlewares/session.middleware";

export const authRouter = Router();

authRouter.get("/session", isAuthed(false), use(authController.getSession));
authRouter.post("/createUser", isAuthed(true), use(authController.createUser));
