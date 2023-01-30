import { Router } from "express";
import * as s3 from "../aws/s3";
import { getSession, isAuthed } from "../middleware/session.middleware";

export const s3uploadRouter = Router();
s3uploadRouter.use(isAuthed(true));

s3uploadRouter.get("/upload", async (req, res) => {
  const session = await getSession(res);
  const { url, key } = await s3.getSignedPostUrl(session.user.id);
  return res.json({ url, key });
});

s3uploadRouter.get("/image", async (req, res) => {
  const { s3key } = req.query;
  const url = await s3.getSignedGetUrl(s3key as string);
  return res.json({ url });
});
