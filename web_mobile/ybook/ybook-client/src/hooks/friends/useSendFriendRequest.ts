import { useMutation, useQueryClient } from "@tanstack/react-query";
import { env } from "../../env";
import { useAuth } from "../../store/auth.store";
import { FRIENDS_KEY } from "./useFriends";
import { SUGGESTED_FRIENDS_KEY } from "./useSuggestedFriends";

export function useSendFriendRequest() {
  const { token } = useAuth();
  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation(
    (email: string) =>
      fetch(`${env.REACT_APP_BACKEND_URL}/friends`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ email }),
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
