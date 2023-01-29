import { RequestHandler, Response } from "express";
import { CognitoJwtVerifier } from "aws-jwt-verify";
import { env } from "../env";

const verifier = CognitoJwtVerifier.create({
  userPoolId: env.COGNITO_USERPOOL_ID,
  tokenUse: "id",
  clientId: env.COGNITO_CLIENT_ID,
});

export const isAuthed: RequestHandler = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (token === undefined) {
    return res.status(401).send("Unauthorized");
  }
  const session = await verifier.verify(token);
  const sessionData = {
    name: session.name as string,
    surname: session.given_name as string,
    email: session.email as string,
  };
  res.locals.session = sessionData;
  return next();
};

export const getSession = (res: Response) => {
  const session = res.locals.session;
  if (session === undefined) {
    throw new Error("Session is undefined");
  }
  return session;
};
