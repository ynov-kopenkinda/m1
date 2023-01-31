import { env } from "../env";
import { authStore } from "../store/auth.store";
import * as types from "./api.types";

const getToken = () => authStore.getState().token;

const logging = env.NODE_ENV === "development";

async function _fetch<T = unknown>(
  url: string,
  options: RequestInit = {}
): Promise<[T, null] | [null, Error]> {
  if (!url.startsWith("/")) {
    throw new Error("Api URL must start with a /");
  }
  const token = getToken();
  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
  try {
    const response = await fetch(`${env.REACT_APP_BACKEND_URL}${url}`, {
      ...options,
      headers: { ...headers, ...options.headers },
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data = (await response.json()) as T;
    if (logging) {
      console.log(
        "%cAPI",
        "background: #3d82f6; color: white; font-weight: bold; padding: 4px;",
        url,
        data
      );
    }
    return [data, null];
  } catch (error) {
    if (logging) {
      console.error(
        "%cAPI",
        "background: #ef4444; color: white; font-weight: bold; padding: 4px;",
        url,
        error
      );
    }
    return [null, error as Error];
  }
}

export const api = {
  s3: {
    getUploadUrl() {
      return _fetch<types.ApiS3UploadResponse>("/s3/upload");
    },
    getResourceUrl({ s3key }: { s3key: string }) {
      return _fetch<types.ApiS3GetResourceResponse>(
        `/s3/image?s3key=${encodeURIComponent(s3key)}`
      );
    },
  },
  auth: {
    createUser() {
      return _fetch<types.ApiCreateUserResponse>("/auth/createUser", {
        method: "POST",
      });
    },
  },
  friends: {
    getAll() {
      return _fetch<types.ApiGetFriendsResponse>("/friends");
    },
    getSuggested() {
      return _fetch<types.ApiGetSuggestedFriendsResponse>("/friends/suggested");
    },
    getRequests() {
      return _fetch<types.ApiGetFriendRequestsResponse>("/friends/requests");
    },
    cancel({ friendId }: { friendId: number }) {
      return _fetch<types.ApiCancelFriendRequestResponse>("/friends/cancel", {
        method: "DELETE",
        body: JSON.stringify({ id: friendId }),
      });
    },
    request({ email }: { email: string }) {
      return _fetch<types.ApiRequestFriendResponse>("/friends", {
        method: "POST",
        body: JSON.stringify({ email }),
      });
    },
  },
  posts: {
    getAll({ page = 1 }) {
      return _fetch<types.ApiGetPostsResponse>(`/posts?page=${page}`);
    },
    getOne({ id }: { id: number }) {
      return _fetch<types.ApiGetPostResponse>(`/posts/${id}`);
    },
    create({ content }: { content: string }) {
      return _fetch<types.ApiCreatePostResponse>("/posts", {
        method: "POST",
        body: JSON.stringify({ content }),
      });
    },
    like({ postId }: { postId: number }) {
      return _fetch(`/posts/${postId}/like`, {
        method: "POST",
      });
    },
    reply({ postId, content }: { postId: number; content: string }) {
      return _fetch(`/posts/${postId}/reply`, {
        method: "POST",
        body: JSON.stringify({ content }),
      });
    },
  },
  users: {
    getAll(search = "") {
      return _fetch<types.ApiGetUsersResponse>(
        `/friends/global?search=${search}`
      );
    },
  },
  settings: {
    changeAvatar({ s3key }: { s3key: string }) {
      return _fetch("/users/change-avatar", {
        method: "POST",
        body: JSON.stringify({ s3key }),
      });
    },
  },
};
