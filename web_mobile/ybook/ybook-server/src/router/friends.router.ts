import { Router } from "express";
import prisma from "../db";
import { getSession, isAuthed } from "../middleware/session.middleware";

export const friendsRouter = Router();
friendsRouter.use(isAuthed(true));

friendsRouter.get("/", async (req, res) => {
  const session = await getSession(res);
  const friends = await prisma.user.findMany({
    where: {
      OR: [
        {
          toFrienship: {
            some: {
              OR: [
                { from: { email: session.email } },
                {
                  to: { email: session.email },
                },
              ],
            },
            every: {
              status: "ACCEPTED",
            },
          },
        },
        {
          fromFriendship: {
            some: {
              OR: [
                { from: { email: session.email } },
                {
                  to: { email: session.email },
                },
              ],
            },
            every: {
              status: "ACCEPTED",
            },
          },
        },
      ],
    },
    distinct: "id",
  });
  return res.json(friends);
});

friendsRouter.get("/suggested", async (req, res) => {
  const session = await getSession(res);
  const friends = await prisma.friendship.findMany({
    where: {
      AND: [
        {
          status: "ACCEPTED",
        },
        {
          OR: [
            { from: { email: session.email } },
            { to: { email: session.email } },
          ],
        },
      ],
    },
    include: {
      to: { select: { email: true } },
      from: { select: { email: true } },
    },
  });
  const excludedEmails = Array.from(
    new Set(
      friends
        .map((friend) => friend.to.email)
        .concat(...friends.map((friend) => friend.from.email))
    )
  );
  const suggested = await prisma.user.findMany({
    where: {
      email: {
        notIn: excludedEmails.concat(session.email),
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 5,
  });
  return res.json(suggested);
});

friendsRouter.get("/global", async (req, res) => {
  const session = await getSession(res);
  const search = req.query.search as string;
  const friends = await prisma.friendship.findMany({
    where: {
      AND: [
        {
          status: "ACCEPTED",
        },
        {
          OR: [
            { from: { email: session.email } },
            { to: { email: session.email } },
          ],
        },
      ],
    },
    include: {
      to: { select: { email: true } },
      from: { select: { email: true } },
    },
  });
  const excludedEmails = Array.from(
    new Set(
      friends
        .map((friend) => friend.to.email)
        .concat(...friends.map((friend) => friend.from.email))
    )
  );
  const suggested = await prisma.user.findMany({
    where: {
      AND: [
        {
          email: {
            notIn: excludedEmails.concat(session.email),
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
  const requests = await prisma.user.findMany({
    where: {
      fromFriendship: {
        some: {
          to: { email: session.email },
        },
        every: {
          status: "PENDING",
        },
      },
    },
  });
  return res.json(requests);
});
