import type { RequestHandler } from "express";

export type ApiController = Record<string, RequestHandler>;
