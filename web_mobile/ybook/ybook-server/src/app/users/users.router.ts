import { Router } from "express";
import { userController } from "./users.controller";
import { useApi } from "../_middlewares/error.middleware";
import { isAuthed } from "../_middlewares/session.middleware";

export const userRouter = Router();
userRouter.use(isAuthed(true));

userRouter.post("/change-avatar", useApi(userController.api_changeAvatar));
userRouter.post("/change-cover", useApi(userController.api_changeCover));
userRouter.get("/:id", useApi(userController.api_getDetails));
