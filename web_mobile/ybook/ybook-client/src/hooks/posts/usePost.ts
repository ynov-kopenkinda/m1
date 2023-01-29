import { useQuery } from "@tanstack/react-query";
import { Post } from "./usePosts";

export const USE_POST_KEY = (id?: number) => `/posts/${id}`;

export function usePost(id?: number) {
  const { data, isLoading } = useQuery<Post>([USE_POST_KEY(id)], {
    enabled: typeof id === "number",
  });

  if (!id) {
    return {
      post: undefined,
      isLoading: false,
    };
  }
  return {
    post: data,
    isLoading,
  };
}
