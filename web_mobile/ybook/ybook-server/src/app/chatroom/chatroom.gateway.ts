import type { ApiGateway } from "../../types";
import { chatroomController } from "./chatroom.controller";

export const chatroomGateway = {
  authenticate: ["authenticate", chatroomController.gw_authenticate],
  disconnect: [
    "disconnect",
    (id, data) => {
      console.log("disconnect", id, data);
    },
  ],
} satisfies ApiGateway;
