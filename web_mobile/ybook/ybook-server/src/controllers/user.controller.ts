import { z } from "zod";
import prisma from "../db";
import { ApiError } from "../middleware/error.middleware";
import { extractSession } from "../middleware/session.middleware";
import { friendsService } from "../services/friends.service";
import type { ApiController } from "../types";
import { validateSchema } from "../utils/validateSchema";

export const userController = {
  changeAvatar: async (req, res) => {
    const s3Key = validateSchema(z.string(), req.body.s3key);
    const session = await extractSession(res);
    const user = await prisma.user.update({
      where: { id: session.user.id },
      data: { avatarS3Key: s3Key },
    });
    return res.json({ user });
  },
  changeCover: async (req, res) => {
    const s3Key = validateSchema(z.string(), req.body.s3key);
    const session = await extractSession(res);
    const user = await prisma.user.update({
      where: { id: session.user.id },
      data: { coverPicS3Key: s3Key },
    });
    return res.json({ user });
  },
  getDetails: async (req, res) => {
    const userId = validateSchema(z.coerce.number(), req.params.id);
    const session = await extractSession(res);
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        blockedByUsers: true,
      },
    });
    if (!user) {
      throw new ApiError(404, "User not found");
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
  },
} satisfies ApiController;
