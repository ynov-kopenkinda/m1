import { useQuery } from "@tanstack/react-query";
import { User } from "../posts/usePosts";

export const SUGGESTED_FRIENDS_KEY = () => "/friends/suggested";

export const useSuggestedFriends = () => {
  const { data, isLoading } = useQuery<User[]>([SUGGESTED_FRIENDS_KEY()]);
  return [data, isLoading] as const;
};
