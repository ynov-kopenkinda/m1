import { Router } from "express";
import prisma from "../db";
import { getSession, isAuthed } from "../middleware/session.middleware";

export const authRouter = Router();

authRouter.get("/session", (req, res) => {
  return res.json({ session: res.locals.session ?? null });
});

authRouter.get("/createUser", isAuthed, async (_, res) => {
  const session = getSession(res);
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
