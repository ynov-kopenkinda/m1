import { Router } from "express";
import { s3Controller } from "./s3.controller";
import { use } from "../_middlewares/error.middleware";
import { isAuthed } from "../_middlewares/session.middleware";

export const s3uploadRouter = Router();
s3uploadRouter.use(isAuthed(true));

s3uploadRouter.get("/upload", use(s3Controller.api_sendToS3));
s3uploadRouter.get("/image", use(s3Controller.api_getFromS3));
