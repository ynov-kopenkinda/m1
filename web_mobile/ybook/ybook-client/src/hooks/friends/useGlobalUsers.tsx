import { useQuery } from "@tanstack/react-query";
import { User } from "../posts/usePosts";

export const GLOBAL_USERS_KEY = (search: string) =>
  `/friends/global?search=${search}`;

export function useGlobalUsers(search: string) {
  const { data, isLoading } = useQuery<User[]>([GLOBAL_USERS_KEY(search)]);
  return [data, isLoading] as const;
}
