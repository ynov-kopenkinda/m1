import { Router } from "express";
import prisma from "../db";
import {
  getSession,
  getSessionOrNull,
  isAuthed,
} from "../middleware/session.middleware";

export const authRouter = Router();

authRouter.get("/session", isAuthed(false), async (req, res) => {
  const session = await getSessionOrNull(res);
  return res.json({ session });
});

authRouter.post("/createUser", isAuthed(true), async (_, res) => {
  const session = await getSession(res);
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
});
