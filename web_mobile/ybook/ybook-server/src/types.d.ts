import type { RequestHandler } from "express";
import type { Socket } from "socket.io";

export type ApiController = {
  [key: `api_${string}`]: RequestHandler;
  [key: `gw_${string}`]: GatewayHandler;
};

export type ApiGateway = Record<
  string,
  [event: string, handler: GatewayHandler]
>;

export type GatewayHandler = (
  socket: Socket,
  data: unknown
) => void | Promise<void>;
