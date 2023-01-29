import { type inferAsyncReturnType } from "@trpc/server";
import { type CreateNextContextOptions } from "@trpc/server/adapters/next";
import type { NodeHTTPCreateContextFnOptions } from "@trpc/server/dist/adapters/node-http/types.js";
import { CognitoJwtVerifier } from "aws-jwt-verify";
import { env } from "../../env/server.mjs";

const verifier = CognitoJwtVerifier.create({
  userPoolId: env.NEXT_PUBLIC_COGNITO_USERPOOL_ID,
  tokenUse: "id",
  clientId: env.NEXT_PUBLIC_COGNITO_CLIENT_ID,
});

import { prisma } from "../db/client";

export type SessionData = {
  name: string;
  surname: string;
  email: string;
};

type CreateContextOptions = {
  session?: SessionData;
};

/** Use this helper for:
 * - testing, so we dont have to mock Next.js' req/res
 * - trpc's `createSSGHelpers` where we don't have req/res
 * @see https://create.t3.gg/en/usage/trpc#-servertrpccontextts
 **/
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const createContextInner = async (opts: CreateContextOptions) => {
  return {
    prisma,
    session: opts.session,
  };
};

/**
 * This is the actual context you'll use in your router
 * @link https://trpc.io/docs/context
 **/
export const createContext = async (
  opts: CreateNextContextOptions
) => {
  try {
    const { req } = opts;
    if (!req.headers.authorization) {
      throw new Error("No authorization header");
    }
    const token = req.headers.authorization.slice("Bearer ".length);
    const session = await verifier.verify(token);
    const sessionData = {
      name: session.name as string,
      surname: session.given_name as string,
      email: session.email as string,
    };
    return await createContextInner({ session: sessionData });
  } catch (e) {
    return await createContextInner({});
  }
};

export type Context = inferAsyncReturnType<typeof createContext>;
