import { Router } from "express";
import { userController } from "../controllers/user.controller";
import { use } from "../middleware/error.middleware";
import { isAuthed } from "../middleware/session.middleware";

export const userRouter = Router();
userRouter.use(isAuthed(true));

userRouter.post("/change-avatar", use(userController.changeAvatar));
userRouter.get("/:id", use(userController.getDetails));
