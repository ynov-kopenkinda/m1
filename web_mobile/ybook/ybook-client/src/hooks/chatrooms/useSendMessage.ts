import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { Message, User } from "../../api/api.types";
import { useSocketClient } from "../../store/socketClient.store";
import { USE_MESSAGES_KEY } from "./useMessages";

export function useSendMessage({ conversationId }: { conversationId: number }) {
  const ioClient = useSocketClient();
  const queryClient = useQueryClient();
  useEffect(() => {
    ioClient.on("sendMessage", (message: Message & { from: User }) => {
      // queryClient.setQueryData<Message[]>(
      //   [USE_MESSAGES_KEY, conversationId],
      //   (oldData) => {
      //     if (oldData === undefined) return [];
      //     return [...oldData, message];
      //   }
      // );
      queryClient.invalidateQueries([USE_MESSAGES_KEY, conversationId]);
    });
  }, [conversationId, ioClient, queryClient]);
  return (content: string) => {
    ioClient.emit("sendMessage", { conversationId, content });
  };
}
