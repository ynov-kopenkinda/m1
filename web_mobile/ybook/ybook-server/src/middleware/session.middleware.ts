import type { User } from "@prisma/client";
import { CognitoJwtVerifier } from "aws-jwt-verify";
import type { RequestHandler, Response } from "express";
import prisma from "../db";
import { env } from "../env";

const verifier = CognitoJwtVerifier.create({
  userPoolId: env.COGNITO_USERPOOL_ID,
  tokenUse: "id",
  clientId: env.COGNITO_CLIENT_ID,
});

export const isAuthed: (error: boolean) => RequestHandler =
  (error) => async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (token === undefined) {
      if (error) {
        return res.status(401).send("Unauthorized");
      }
      return next();
    }
    try {
      const session = await verifier.verify(token);
      const sessionData = {
        name: session.name as string,
        surname: session.given_name as string,
        email: session.email as string,
      };
      res.locals.session = sessionData;
      return next();
    } catch (e) {
      if (error) {
        return res.status(401).send("Unauthorized");
      }
      return next();
    }
  };

type Session = {
  user: User;
  name: string;
  surname: string;
  email: string;
};

export const getSessionOrNull = async (
  res: Response
): Promise<Session | null> => {
  const session = res.locals.session;
  if (session === undefined) {
    return null;
  }
  const user = await prisma.user.findUnique({
    where: {
      email: session.email,
    },
  });
  if (user === null) {
    return null;
  }
  const _session = { user, ...session };
  return _session;
};

export const getSession = async (res: Response): Promise<Session> => {
  const session = await getSessionOrNull(res);
  if (session === null) {
    throw new Error("Session not found");
  }
  return session;
};
