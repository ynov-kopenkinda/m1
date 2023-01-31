import prisma from "../db";
import { ApiError } from "../middleware/error.middleware";
import { extractSession } from "../middleware/session.middleware";
import { friendsService } from "../services/friends.service";
import type { ApiController } from "../types";
import { assertNumber } from "../utils/assertions";

export const userController = {
  changeAvatar: async (req, res) => {
    const { s3key } = req.body;
    if (typeof s3key !== "string") {
      throw new ApiError(400, "s3key must be a string");
    }
    const session = await extractSession(res);
    const user = await prisma.user.update({
      where: { id: session.user.id },
      data: { avatarS3Key: s3key },
    });
    return res.json({ user });
  },
  getDetails: async (req, res) => {
    const { id: qUserId } = req.params;
    const userId = parseInt(qUserId, 10);
    assertNumber(userId);
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
