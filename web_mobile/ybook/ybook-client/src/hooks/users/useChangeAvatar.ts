import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../api";
import { USE_SESSION_KEY } from "../auth/useSession";
import { USE_POSTS_KEY } from "../posts/usePosts";

export function useChangeAvatar() {
  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation(api.settings.changeAvatar, {
    onSuccess: (user) => {
      queryClient.invalidateQueries([USE_SESSION_KEY()]);
      queryClient.invalidateQueries([USE_POSTS_KEY]);
    },
  });
  return mutateAsync;
}
