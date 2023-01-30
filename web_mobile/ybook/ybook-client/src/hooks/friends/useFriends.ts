import { useQuery } from "@tanstack/react-query";
import { User } from "../posts/usePosts";

export const FRIENDS_KEY = () => "/friends";

export const useFriends = () => {
  const { data, isLoading } = useQuery<User[]>([FRIENDS_KEY()]);
  return [data, isLoading] as const;
};
