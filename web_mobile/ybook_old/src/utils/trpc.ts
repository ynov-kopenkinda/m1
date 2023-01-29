import {
  createWSClient,
  httpBatchLink,
  loggerLink,
  wsLink,
} from "@trpc/client";
import { createTRPCNext } from "@trpc/next";
import { type inferRouterInputs, type inferRouterOutputs } from "@trpc/server";
import superjson from "superjson";

import { type AppRouter } from "../server/trpc/router/_app";

const getBaseUrl = () => {
  if (typeof window !== "undefined") return ""; // browser should use relative url
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // SSR should use vercel url
  return `http://localhost:${process.env.PORT ?? 3000}`; // dev SSR should use localhost
};

const wsClient = createWSClient({
  url: `ws://localhost:${process.env.PORT ?? 3001}`,
  WebSocket: typeof window === "undefined" ? undefined : window.WebSocket,
});

export const trpc = createTRPCNext<AppRouter>({
  config() {
    const logger = loggerLink<AppRouter>({
      enabled: (opts) =>
        process.env.NODE_ENV === "development" ||
        (opts.direction === "down" && opts.result instanceof Error),
    });
    const httpLink = httpBatchLink<AppRouter>({
      url: `${getBaseUrl()}/api/trpc`,
      headers() {
        const authData = JSON.parse(
          String(sessionStorage.getItem("ybook-auth")) || ""
        ) as { token: string | undefined } | null;
        if (authData?.token === undefined) return {};
        return {
          Authorization: `Bearer ${authData?.token}`,
        };
      },
    });
    const links = [logger, httpLink];
    if (process.env.VECEL_URL === undefined) {
      const ws = wsLink<AppRouter>({
        client: wsClient,
      });
      links.push(ws);
    }
    return {
      abortOnUnmount: true,
      transformer: superjson,
      links,
    };
  },
  ssr: false,
});

/**
 * Inference helper for inputs
 * @example type HelloInput = RouterInputs['example']['hello']
 **/
export type RouterInputs = inferRouterInputs<AppRouter>;
/**
 * Inference helper for outputs
 * @example type HelloOutput = RouterOutputs['example']['hello']
 **/
export type RouterOutputs = inferRouterOutputs<AppRouter>;
