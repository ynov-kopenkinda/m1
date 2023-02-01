import { Router } from "express";
import { userController } from "./users.controller";
import { use } from "../_middlewares/error.middleware";
import { isAuthed } from "../_middlewares/session.middleware";

export const userRouter = Router();
userRouter.use(isAuthed(true));

userRouter.post("/change-avatar", use(userController.changeAvatar));
userRouter.post("/change-cover", use(userController.changeCover));
userRouter.get("/:id", use(userController.getDetails));