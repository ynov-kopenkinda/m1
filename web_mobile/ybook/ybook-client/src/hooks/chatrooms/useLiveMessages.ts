import { useEffect, useState } from "react";
import { useSocketClient } from "./useSocketClient";

export function useLiveMessages() {
  const ioClient = useSocketClient();
  const [messages, setMessages] = useState<unknown[]>([]);
  useEffect(() => {
    ioClient.on("message", (data: unknown) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });
  }, [ioClient]);
  return messages;
}
