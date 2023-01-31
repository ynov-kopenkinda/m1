import * as express from "express";
import helmet from "helmet";
import * as cors from "cors";
import * as http from "http";
import { Server } from "socket.io";
import { env } from "./env";
import { appRouter } from "./router";
import { catchAllMiddleware, notFoundMiddleware } from './middleware/error.middleware';

export const app = express();
export const server = http.createServer(app);
export const io = new Server(server);

export const startServer = () => {
  io.on("connection", (socket) => {
    console.log("a user connected");
    socket.on("disconnect", () => {
      console.log("user disconnected");
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
  app.use(catchAllMiddleware)

  server.listen(env.PORT, () => {
    console.log(`Server started on port ${env.PORT} :)`);
  });
};
