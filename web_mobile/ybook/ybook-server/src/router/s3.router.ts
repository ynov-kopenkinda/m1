import { Router } from "express";
import { s3Controller } from "../controllers/s3.controller";
import { use } from "../middleware/error.middleware";
import { isAuthed } from "../middleware/session.middleware";

export const s3uploadRouter = Router();
s3uploadRouter.use(isAuthed(true));

s3uploadRouter.get("/upload", use(s3Controller.sendToS3));
s3uploadRouter.get("/image", use(s3Controller.getFromS3));
