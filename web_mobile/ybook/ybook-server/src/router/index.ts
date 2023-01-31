import { Router } from "express";
import { authRouter } from "./auth.router";
import { chatroomRouter } from "./chatroom.router";
import { friendsRouter } from "./friends.router";
import { notificationsRouter } from "./notifications.router";
import { postsRouter } from "./posts.router";
import { s3uploadRouter } from "./s3.router";
import { userRouter } from "./user.router";

export const appRouter = Router();

appRouter.use("/auth", authRouter);
appRouter.use("/posts", postsRouter);
appRouter.use("/friends", friendsRouter);
appRouter.use("/notifications", notificationsRouter);
appRouter.use("/users", userRouter);
appRouter.use("/s3", s3uploadRouter);
appRouter.use("/chatroom", chatroomRouter);
