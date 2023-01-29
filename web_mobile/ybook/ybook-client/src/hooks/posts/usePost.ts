import { useQuery } from "@tanstack/react-query";
import { Post } from "./usePosts";

export function usePost(id?: number) {
  const { data, isLoading } = useQuery<Post>([`/posts/${id}`], {
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
