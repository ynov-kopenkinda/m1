import { useMutation, useQueryClient } from "@tanstack/react-query";
import { env } from "../../env";
import { useAuth } from "../../store/auth.store";
import { USE_SESSION_KEY } from "../auth/useSession";
import { USE_POSTS_KEY } from "../posts/usePosts";

export function useChangeAvatar() {
  const { token } = useAuth();
  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation(
    async (s3key: string) => {
      await fetch(`${env.REACT_APP_BACKEND_URL}/users/change-avatar`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ s3key }),
      });
    },
    {
      onSuccess: (user) => {
        queryClient.invalidateQueries([USE_SESSION_KEY()]);
        queryClient.invalidateQueries([USE_POSTS_KEY]);
      },
    }
  );
  return mutateAsync;
}
