import { useMutation, useQueryClient } from "@tanstack/react-query";
import { env } from "../../env";
import { useAuth } from "../../store/auth.store";
import { USE_POST_KEY } from "./usePost";
import { USE_POSTS_KEY } from "./usePosts";

export const useLikePost = (postId: number) => {
  const { token } = useAuth();
  const queryClient = useQueryClient();
  const { mutate } = useMutation(
    () =>
      fetch(`${env.REACT_APP_BACKEND_URL}/posts/${postId}/like`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => res.json()),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([USE_POSTS_KEY()]);
        queryClient.invalidateQueries([USE_POST_KEY(postId)]);
      },
    }
  );
  return mutate;
};
