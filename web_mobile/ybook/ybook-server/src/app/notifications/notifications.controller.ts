import prisma from "../../db";
import { extractSession } from "../_middlewares/session.middleware";
import type { ApiController } from "../../types";

export const notificationsController = {
  api_getNotifications: async (req, res) => {
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
                  from: { id: { not: session.user.id } },
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
