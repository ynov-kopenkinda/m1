import { useQuery } from "@tanstack/react-query";
import { api } from "../../api";

export const USE_MESSAGES_KEY = "USE_MESSAGES";

export function useMessages({ chatroomId }: { chatroomId: number }) {
  const { data, isLoading } = useQuery(
    [USE_MESSAGES_KEY, chatroomId],
    async () => {
      const [messages, error] = await api.chatrooms.getMessages({
        id: chatroomId,
      });
      if (error) {
        throw error;
      }
      return messages;
    }
  );
  return [data, isLoading] as const;
}
