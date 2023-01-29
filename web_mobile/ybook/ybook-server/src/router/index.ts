import { Router } from "express";
import { authRouter } from "./auth.router";
import { postsRouter } from "./posts.router";

export const appRouter = Router();

appRouter.use("/auth", authRouter);
appRouter.use("/posts", postsRouter);
