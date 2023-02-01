import type { Socket } from "socket.io";
import type { ApiGateway } from "../../types";

const events = new Set<string>();

export function registerGateway(socket: Socket, gateway: ApiGateway) {
  for (const [event, handler] of Object.values(gateway)) {
    if (events.has(event)) {
      continue;
    }
    events.add(event);
    socket.on(event, (data) => handler(socket.id, data));
  }
}
