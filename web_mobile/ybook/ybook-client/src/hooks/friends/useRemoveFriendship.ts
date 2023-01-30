import { useMutation, useQueryClient } from "@tanstack/react-query";
import { env } from "../../env";
import { useAuth } from "../../store/auth.store";
import { FRIENDS_KEY } from "./useFriends";
import { SUGGESTED_FRIENDS_KEY } from "./useSuggestedFriends";

export function useRemoveFriendship() {
  const { token } = useAuth();
  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation(
    ({ friendId }: { friendId: number }) =>
      fetch(`${env.REACT_APP_BACKEND_URL}/friends/cancel`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id: friendId }),
      }).then((res) => res.json()),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries([FRIENDS_KEY()]);
        await queryClient.invalidateQueries([SUGGESTED_FRIENDS_KEY()]);
      },
    }
  );
  return mutateAsync;
}
