import { useMutation } from "@tanstack/react-query";
import { env } from "../../env";
import { useAuth } from "../../store/auth.store";
import { Post } from "./usePosts";

export const useCreatePost = () => {
  const { token } = useAuth();
  const { mutateAsync } = useMutation((content: string) =>
    fetch(`${env.REACT_APP_BACKEND_URL}/posts/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ content }),
    }).then((res) => res.json() as Promise<Post>)
  );
  return mutateAsync;
};
