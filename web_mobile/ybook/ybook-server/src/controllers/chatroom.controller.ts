import { z } from "zod";
import { ApiError } from "../middleware/error.middleware";
import { extractSession } from "../middleware/session.middleware";
import { friendsService } from "../services/friends.service";
import type { ApiController } from "../types";
import { validateSchema } from "../utils/validateSchema";

export const chatroomController = {
  createRoom: async (req, res) => {
    const userId = validateSchema(z.coerce.number(), req.body.userId);
    const session = await extractSession(res);
    const friends = await friendsService.getFriends(session.email);
    if (!friends.map((friend) => friend.id).includes(userId)) {
      throw new ApiError(400, "User is not a friend");
    }
  },
} satisfies ApiController;
