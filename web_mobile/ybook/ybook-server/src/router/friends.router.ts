import { Router } from "express";
import prisma from "../db";
import { getSession, isAuthed } from "../middleware/session.middleware";
import { friendsService } from "../services/friends.service";

export const friendsRouter = Router();
friendsRouter.use(isAuthed(true));

friendsRouter.get("/", async (req, res) => {
  const session = await getSession(res);
  const friends = await friendsService.getFriends(session.email);
  return res.json(friends);
});

friendsRouter.get("/suggested", async (req, res) => {
  const session = await getSession(res);
  const friends = await friendsService.getFriends(session.email);
  const exclude = friends.map((friend) => friend.id);
  const suggested = await prisma.user.findMany({
    where: { id: { notIn: exclude.concat(session.user.id) } },
    orderBy: { createdAt: "desc" },
    take: 5,
  });
  return res.json(suggested);
});

friendsRouter.get("/global", async (req, res) => {
  const session = await getSession(res);
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
});

friendsRouter.post("/", async (req, res) => {
  const session = await getSession(res);
  const { email } = req.body;
  const requestExists = await prisma.friendship.findFirst({
    where: {
      from: { email },
      to: { email: session.email },
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
      from: { connect: { email: session.email } },
      to: { connect: { email } },
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
});

friendsRouter.post("/accept", async (req, res) => {
  const { id } = req.body;
  await prisma.friendship.update({
    where: { id },
    data: { status: "ACCEPTED" },
  });
  return res.json({ success: true });
});

friendsRouter.post("/reject", async (req, res) => {
  const { id } = req.body;
  await prisma.friendship.delete({ where: { id } });
  return res.json({ success: true });
});

friendsRouter.delete("/cancel", async (req, res) => {
  const { id: friendId } = req.body;
  const session = await getSession(res);
  const friendship = await prisma.friendship.findFirst({
    where: {
      OR: [
        { from: { email: session.email }, to: { id: friendId } },
        { from: { id: friendId }, to: { email: session.email } },
      ],
    },
  });
  if (friendship === null) {
    return res.status(400).json({ error: "Friendship not found" });
  }
  await prisma.friendship.delete({ where: { id: friendship.id } });
  return res.json({ success: true });
});

friendsRouter.get("/requests", async (req, res) => {
  const session = await getSession(res);
  const requests = await friendsService.getRequests(session.email);
  return res.json(requests);
});
