import { useInfiniteQuery } from "@tanstack/react-query";
import { env } from "../../env";
import { useAuth } from "../../store/auth.store";

export interface PostsResponse {
  posts: Post[];
  page: number;
  pages: number;
}

export interface Post {
  id: number;
  createdAt: string;
  updatedAt: string;
  htmlContent: string;
  userId: number;
  user: User;
  postComments: PostCommentElement[];
  postLikes: PostCommentElement[];
  postAttachments: any[];
}

export interface PostCommentElement {
  id: number;
  createdAt: string;
  updatedAt: string;
  userId: number;
  postId: number;
  text?: string;
  user: User;
}

export interface User {
  id: number;
  createdAt: string;
  updatedAt: string;
  firstname: string;
  lastname: string;
  email: string;
  avatarS3Key: null;
  coverPicS3Key: null;
  config: null;
}

export const usePosts = () => {
  const { token } = useAuth();
  const fetchPosts = async ({ pageParam = 1 }) =>
    fetch(`${env.REACT_APP_BACKEND_URL}/posts?page=${pageParam}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => res.json());
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isInitialLoading,
  } = useInfiniteQuery<PostsResponse>(["/posts"], fetchPosts, {
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.page < lastPage.pages) return lastPage.page + 1;
      return false;
    },
  });
  return {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isInitialLoading,
  };
};
