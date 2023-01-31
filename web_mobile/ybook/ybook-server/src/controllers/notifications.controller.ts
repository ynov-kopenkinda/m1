import prisma from "../db";
import { extractSession } from "../middleware/session.middleware";
import type { ApiController } from "../types";

export const notificationsController = {
  getNotifications: async (req, res) => {
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
  },
} satisfies ApiController;
