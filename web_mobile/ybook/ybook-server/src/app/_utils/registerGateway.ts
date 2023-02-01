import type { Socket } from "socket.io";
import type { ApiGateway } from "../../types";
import { useGateway } from "../_middlewares/error.middleware";

const events = new Set<string>();

export function registerGateway(socket: Socket, gateway: ApiGateway) {
  for (const [event, handler] of Object.values(gateway)) {
    if (events.has(event)) {
      continue;
    }
    events.add(event);
    const _handler = useGateway(handler);
    socket.on(
      event,
      useGateway((data) => _handler(socket, data))
    );
  }
}
