import * as express from "express";
import helmet from "helmet";
import * as cors from "cors";
import * as http from "http";
import { Server } from "socket.io";
import { env } from "./env";
import { appRouter } from "./app/router";
import {
  catchAllMiddleware,
  notFoundMiddleware,
} from "./app/_middlewares/error.middleware";

export const app = express();
export const server = http.createServer(app);
export const io = new Server(server, {
  cors: {
    origin: env.CLIENT_APP_URL,
  },
  transports: ["websocket"],
});

export const startServer = () => {
  io.on("connection", (socket) => {
    console.log("a user connected", socket.id);
    socket.on("disconnect", () => {
      console.log("user disconnected", socket.id);
    });
  });

  app.use(helmet());
  app.use(
    cors({
      origin: env.CLIENT_APP_URL,
    })
  );
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use("/api", appRouter);

  // write error handler here
  app.use(notFoundMiddleware);
  app.use(catchAllMiddleware);

  server.listen(env.PORT, () => {
    console.log(`Server started on port ${env.PORT} :)`);
  });
};
