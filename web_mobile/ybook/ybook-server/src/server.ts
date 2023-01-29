import * as express from "express";
import * as http from "http";
import { Server } from "socket.io";
import { env } from "./env";
import { appRouter } from "./router";

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

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use("/api", appRouter);

  server.listen(env.PORT, () => {
    console.log(`Server started on port ${env.PORT} :)`);
  });
};
