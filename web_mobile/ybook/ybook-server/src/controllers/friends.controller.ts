import prisma from "../db";
import { ApiError } from "../middleware/error.middleware";
import { extractSession } from "../middleware/session.middleware";
import { friendsService } from "../services/friends.service";
import type { ApiController } from "../types";
import { assertNumber } from "../utils/assertions";

export const friendsController = {
  getFriends: async (req, res) => {
    const session = await extractSession(res);
    const friends = await friendsService.getFriends(session.email);
    return res.json(friends);
  },
  getSuggested: async (req, res) => {
    const session = await extractSession(res);
    const friends = await friendsService.getFriends(session.email);
    const exclude = friends.map((friend) => friend.id);
    const suggested = await prisma.user.findMany({
      where: { id: { notIn: exclude.concat(session.user.id) } },
      orderBy: { createdAt: "desc" },
      take: 5,
    });
    return res.json(suggested);
  },
  getOthers: async (req, res) => {
    const session = await extractSession(res);
    const search = req.query.search as string;
    const friends = await friendsService.getFriends(session.email);
    const exclude = friends.map((friend) => friend.id);
    const suggested = await prisma.user.findMany({
      where: {
        AND: [
          { id: { notIn: exclude.concat(session.user.id) } },
          {
            OR: [
              { email: { contains: search } },
              { firstname: { contains: search } },
              { lastname: { contains: search } },
            ],
          },
        ],
      },
      orderBy: { createdAt: "desc" },
    });
    return res.json(suggested);
  },
  sendOrAcceptFriendRequest: async (req, res) => {
    const { userId: qUserId } = req.body;
    const userId = parseInt(qUserId, 10);
    assertNumber(userId);
    const session = await extractSession(res);
    if (userId === session.user.id) {
      throw new ApiError(400, "You can't add yourself as a friend");
    }
    const requestExists = await prisma.friendship.findFirst({
      where: {
        from: { id: userId },
        to: { id: session.user.id },
      },
    });
    if (requestExists !== null) {
      await prisma.friendship.update({
        where: { id: requestExists.id },
        data: { status: "ACCEPTED" },
      });
      return res.json({ success: true });
    }
    const friendship = await prisma.friendship.create({
      data: {
        from: { connect: { id: session.user.id } },
        to: { connect: { id: userId } },
        status: "PENDING",
      },
    });
    await prisma.notification.create({
      data: {
        friendship: { connect: { id: friendship.id } },
        read: false,
      },
    });
    return res.json({ success: true });
  },
  removeOrRejectFriendRequest: async (req, res) => {
    const { id: qFriendId } = req.body;
    const friendId = parseInt(qFriendId, 10);
    assertNumber(friendId);
    const session = await extractSession(res);
    const friendship = await prisma.friendship.findFirst({
      where: {
        OR: [
          { from: { email: session.email }, to: { id: friendId } },
          { from: { id: friendId }, to: { email: session.email } },
        ],
      },
    });
    if (friendship === null) {
      throw new ApiError(404, "Friendship not found");
    }
    await prisma.friendship.delete({ where: { id: friendship.id } });
    return res.json({ success: true });
  },
  getFriendRequests: async (req, res) => {
    const session = await extractSession(res);
    const requests = await friendsService.getRequests(session.email);
    return res.json(requests);
  },
} satisfies ApiController;
