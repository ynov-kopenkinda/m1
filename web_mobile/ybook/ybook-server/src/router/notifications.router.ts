import { Router } from "express";
import prisma from "../db";
import { getSession, isAuthed } from "../middleware/session.middleware";

export const notificationsRouter = Router();
notificationsRouter.use(isAuthed(true));

notificationsRouter.get("/", async (req, res) => {
  const session = await getSession(res);
  const notifications = await prisma.notification.findMany({
    where: {
      AND: [
        { read: false },
        {
          OR: [
            {
              friendship: {
                to: { email: session.email },
              },
            },
            {
              message: {
                userId: session.user.id,
              },
            },
          ],
        },
      ],
    },
    include: {
      friendship: true,
      message: true,
    },
  });
  return res.json(notifications);
});
