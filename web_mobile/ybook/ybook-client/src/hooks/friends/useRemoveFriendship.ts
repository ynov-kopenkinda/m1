import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../api";
import { USE_DETAILED_USER_KEY } from "../users/useDetailedUser";
import { USE_FRIENDS_KEY } from "./useFriends";
import { USE_SUGGESTED_FRIENDS_KEY } from "./useSuggestedFriends";

export function useRemoveFriendship({ userId }: { userId: number }) {
  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation(
    () => api.friends.cancel({ friendId: userId }),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries([USE_FRIENDS_KEY]);
        await queryClient.invalidateQueries([USE_SUGGESTED_FRIENDS_KEY]);
        await queryClient.invalidateQueries([USE_DETAILED_USER_KEY, userId]);
      },
    }
  );
  return mutateAsync;
}
