import { useMutation, useQueryClient } from "@tanstack/react-query";
import { env } from "../../env";
import { useAuth } from "../../store/auth.store";
import { USE_POST_KEY } from "./usePost";
import { USE_POSTS_KEY } from "./usePosts";

export function useReplyToPost(postId: number) {
  const queryClient = useQueryClient();
  const { token } = useAuth();
  const { error, isLoading, mutateAsync } = useMutation(
    (reply: string) => {
      return fetch(`${env.REACT_APP_BACKEND_URL}/posts/${postId}/reply`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content: reply }),
      }).then((res) => res.json());
    },
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries([USE_POSTS_KEY()]);
        await queryClient.invalidateQueries([USE_POST_KEY(postId)]);
      },
    }
  );
  return { error, isLoading, mutateAsync };
}
