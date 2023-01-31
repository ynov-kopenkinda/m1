import { Router } from "express";
import prisma from "../db";
import { use } from "../middleware/error.middleware";
import { extractSession, isAuthed } from "../middleware/session.middleware";

export const notificationsRouter = Router();
notificationsRouter.use(isAuthed(true));

notificationsRouter.get(
  "/",
  use(async (req, res) => {
    const session = await extractSession(res);
    const notifications = await prisma.notification.findMany({
      where: {
        AND: [
          { read: false },
          {
            OR: [
              {
                friendship: {
                  to: { email: session.email },
                  status: "PENDING",
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
  })
);
