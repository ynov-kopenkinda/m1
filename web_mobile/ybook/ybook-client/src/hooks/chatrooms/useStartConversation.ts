import { useMutation } from "@tanstack/react-query";
import { api } from "../../api";

export function useStartConversation(withUserId: number) {
  const { mutateAsync } = useMutation(() =>
    api.chatrooms.startConversation({ withUserId })
  );
  return mutateAsync;
}
