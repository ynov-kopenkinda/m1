import { useQuery } from "@tanstack/react-query";
import { User } from "../posts/usePosts";

export const FRIEND_REQUESTS_KEY = () => "/friends/requests";

export function useFriendRequests() {
  const { data, isLoading } = useQuery<User[]>([FRIEND_REQUESTS_KEY()]);
  return [data, isLoading] as const;
}
