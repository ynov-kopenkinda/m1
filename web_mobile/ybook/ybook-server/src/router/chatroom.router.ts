import { Router } from "express";
import { ApiError, use } from "../middleware/error.middleware";
import { extractSession, isAuthed } from "../middleware/session.middleware";
import { friendsService } from "../services/friends.service";
import { assertNumber } from "../utils/assertions";

export const chatroomRouter = Router();
chatroomRouter.use(isAuthed(true));

chatroomRouter.post(
  "/",
  use(async (req, res) => {
    const { userId } = req.body;
    assertNumber(userId);
    const session = await extractSession(res);
    const friends = await friendsService.getFriends(session.email);
    if (!friends.map((friend) => friend.id).includes(userId)) {
      throw new ApiError(400, "User is not a friend");
    }
  })
);
