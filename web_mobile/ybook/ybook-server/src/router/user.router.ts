import { Router } from "express";
import prisma from "../db";
import { getSession, isAuthed } from "../middleware/session.middleware";

export const userRouter = Router();
userRouter.use(isAuthed(true));

userRouter.post("/change-avatar", async (req, res) => {
  const { s3key } = req.body;
  const session = await getSession(res);
  const user = await prisma.user.update({
    where: { id: session.user.id },
    data: { avatarS3Key: s3key },
  });
  return res.json({ user });
});
