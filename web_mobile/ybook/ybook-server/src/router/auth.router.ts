import { Router } from "express";
import prisma from "../db";
import {
  extractSession,
  extractSessionOrNull,
  isAuthed,
} from "../middleware/session.middleware";

export const authRouter = Router();

authRouter.get("/session", isAuthed(false), async (req, res) => {
  const session = await extractSessionOrNull(res);
  return res.json({ session });
});

authRouter.post("/createUser", isAuthed(true), async (_, res) => {
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
});
