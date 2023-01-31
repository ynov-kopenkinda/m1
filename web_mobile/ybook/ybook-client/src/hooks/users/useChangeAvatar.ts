import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../api";
import { USE_SESSION_KEY } from "../auth/useSession";
import { USE_POSTS_KEY } from "../posts/usePosts";
import { USE_DETAILED_USER_KEY } from "./useDetailedUser";

export function useChangeAvatar() {
  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation(api.settings.changeAvatar, {
    onSuccess: async (res) => {
      const [data, error] = res;
      if (error) {
        return;
      }
      await Promise.allSettled([
        queryClient.invalidateQueries([USE_SESSION_KEY]),
        queryClient.invalidateQueries([USE_POSTS_KEY]),
        queryClient.invalidateQueries([USE_DETAILED_USER_KEY, data.user.id]),
      ]);
    },
  });
  return mutateAsync;
}
