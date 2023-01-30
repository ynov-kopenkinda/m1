import { Router } from "express";
import { authRouter } from "./auth.router";
import { friendsRouter } from "./friends.router";
import { postsRouter } from "./posts.router";

export const appRouter = Router();

appRouter.use("/auth", authRouter);
appRouter.use("/posts", postsRouter);
appRouter.use("/friends", friendsRouter);
