import { Router } from "express";
import { authRouter } from "./auth.router";

export const appRouter = Router();

appRouter.use("/auth", authRouter);
