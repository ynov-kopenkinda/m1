import type { RequestHandler } from "express";

export type ApiController = {
  [key: `api_${string}`]: RequestHandler;
  [key: `gw_${string}`]: GatewayHandler;
};

export type ApiGateway = Record<
  string,
  [event: string, handler: GatewayHandler]
>;

export type GatewayHandler = <T = unknown>(
  id: string,
  data: T
) => void | Promise<void>;
