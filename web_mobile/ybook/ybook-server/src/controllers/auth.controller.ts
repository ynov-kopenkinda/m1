import prisma from "../db";
import {
  extractSession,
  extractSessionOrNull,
} from "../middleware/session.middleware";
import type { ApiController } from "../types";

export const authController = {
  getSession: async (req, res) => {
    const session = await extractSessionOrNull(res);
    return res.json({ session });
  },
  createUser: async (req, res) => {
    const session = await extractSession(res);
    const user = await prisma.user.upsert({
      where: {
        email: session.email,
      },
      create: {
        email: session.email,
        firstname: session.name,
        lastname: session.surname,
      },
      update: {
        email: session.email,
        firstname: session.name,
        lastname: session.surname,
      },
    });
    return res.json({ user });
  },
} satisfies ApiController;
