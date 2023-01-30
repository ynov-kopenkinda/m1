import { useQuery } from "@tanstack/react-query";

const NOTIFICATIONS_KEY = () => "/notifications";

export function useNotifications() {
  const { data, isLoading } = useQuery([NOTIFICATIONS_KEY()]);
  return [data, isLoading] as const;
}
