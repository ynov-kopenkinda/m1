import { z } from "zod";
import prisma from "../db";
import { ApiError } from "../middleware/error.middleware";
import { extractSession } from "../middleware/session.middleware";
import { friendsService } from "../services/friends.service";
import type { ApiController } from "../types";
import { validateSchema } from "../utils/validateSchema";

export const chatroomController = {
  startConversation: async (req, res) => {
    const userId = validateSchema(z.coerce.number(), req.body.userId);
    const session = await extractSession(res);
    const friends = await friendsService.getFriends(session.email);
    if (!friends.map((friend) => friend.id).includes(userId)) {
      throw new ApiError(400, "User is not a friend");
    }
    const exists = await prisma.conversation.findFirst({
      where: {
        OR: [
          { fromId: session.user.id, toId: userId },
          { fromId: userId, toId: session.user.id },
        ],
      },
    });
    if (exists) {
      return res.json(exists);
    }
    const chatroom = await prisma.conversation.create({
      data: {
        from: { connect: { id: session.user.id } },
        to: { connect: { id: userId } },
      },
    });
    return res.json(chatroom);
  },
  getConversations: async (req, res) => {
    const session = await extractSession(res);
    const conversations = await prisma.conversation.findMany({
      where: {
        OR: [{ fromId: session.user.id }, { toId: session.user.id }],
      },
      include: {
        from: true,
        to: true,
        messages: { take: 1, orderBy: { createdAt: "desc" } },
      },
      distinct: "id",
    });
    return res.json(conversations);
  },
} satisfies ApiController;
