import { Router } from "express";
import prisma from "../db";
import { getSession, isAuthed } from "../middleware/session.middleware";

export const friendsRouter = Router();

friendsRouter.get("/", isAuthed(true), async (req, res) => {
  const session = getSession(res);
  const friends = await prisma.friendship.findMany({
    where: {
      from: { email: session.email },
    },
  });
  return res.json(friends);
});

friendsRouter.get("/suggested", isAuthed(true), async (req, res) => {
  const session = getSession(res);
  const friends = await prisma.friendship.findMany({
    where: {
      from: { email: session.email },
    },
    include: {
      to: { select: { email: true } },
    },
  });
  const suggested = await prisma.user.findMany({
    where: {
      email: {
        notIn: friends.map((friend) => friend.to.email).concat(session.email),
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 5,
  });
  return res.json(suggested);
});

friendsRouter.get("/global", isAuthed(true), async (req, res) => {
  const session = getSession(res);
  const search = req.query.search as string;
  const friends = await prisma.friendship.findMany({
    where: {
      from: { email: session.email },
    },
    include: {
      to: { select: { email: true } },
    },
  });
  const suggested = await prisma.user.findMany({
    where: {
      AND: [
        {
          email: {
            notIn: friends
              .map((friend) => friend.to.email)
              .concat(session.email),
          },
        },
        {
          OR: [
            { email: { contains: search } },
            { firstname: { contains: search } },
            { lastname: { contains: search } },
          ],
        },
      ],
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return res.json(suggested);
});

friendsRouter.post("/", isAuthed(true), async (req, res) => {
  const session = getSession(res);
  const { email } = req.body;
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
