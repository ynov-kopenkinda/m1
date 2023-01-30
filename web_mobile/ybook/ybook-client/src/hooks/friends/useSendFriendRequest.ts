import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../api";
import { USE_FRIEND_REQUESTS_KEY } from "./useFriendRequests";
import { USE_FRIENDS_KEY } from "./useFriends";
import { USE_SUGGESTED_FRIENDS_KEY } from "./useSuggestedFriends";

export function useSendFriendRequest() {
  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation(api.friends.request, {
    onSuccess: async () => {
      await queryClient.invalidateQueries([USE_FRIENDS_KEY]);
      await queryClient.invalidateQueries([USE_SUGGESTED_FRIENDS_KEY]);
      await queryClient.invalidateQueries([USE_FRIEND_REQUESTS_KEY]);
    },
  });
  return mutateAsync;
}
