import { Message } from "../../api/api.types";
import { useSocketClient } from "../../store/socketClient.store";

export const USE_LIVE_MESSAGES_KEY = "get-messages";

export function useLiveMessages({
  chatroomId,
  onReceive,
}: {
  chatroomId: number;
  onReceive: (message: Message) => void;
}) {
  const ioClient = useSocketClient();

  ioClient.on(USE_LIVE_MESSAGES_KEY, (message: Message) => {
    onReceive(message);
  });
}
