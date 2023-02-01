import type { ApiGateway } from "../../types";
import { chatroomController } from "./chatroom.controller";

export const chatroomGateway = {
  authenticate: ["authenticate", chatroomController.gw_authenticate],
  disconnect: [
    "disconnect",
    (socket, data) => {
      console.log("disconnect", socket.id, data);
    },
  ],
} satisfies ApiGateway;
