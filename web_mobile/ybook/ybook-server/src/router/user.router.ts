import { Router } from "express";
import prisma from "../db";
import { getSession, isAuthed } from "../middleware/session.middleware";
import { friendsService } from "../services/friends.service";

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

userRouter.get("/:id", async (req, res) => {
  const { id: qUserId } = req.params;
  const session = await getSession(res);
  if (!qUserId) {
    return res.status(400).json({ error: "Missing userId" });
  }
  const userId = parseInt(qUserId as string);
  if (Number.isNaN(userId)) {
    return res.status(400).json({ error: "Invalid userId" });
  }
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      blockedByUsers: true,
    },
  });
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  const friends = await friendsService.getFriends(user.email);
  const pendingFriendship = await prisma.friendship.findFirst({
    where: {
      AND: [
        {
          OR: [
            { fromId: session.user.id, toId: user.id },
            { toId: session.user.id, fromId: user.id },
          ],
        },
        { status: "PENDING" },
      ],
    },
  });
  return res.json({ user, friends, pending: pendingFriendship });
});
