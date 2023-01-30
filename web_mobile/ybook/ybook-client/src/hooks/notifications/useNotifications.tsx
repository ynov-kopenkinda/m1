import { useQuery } from "@tanstack/react-query";

export interface Notification {
  id: number;
  createdAt: string;
  updatedAt: string;
  read: boolean;
  friendshipId: number;
  conversationMessageId: null;
  friendship: Friendship;
  message: null;
}

export interface Friendship {
  id: number;
  createdAt: string;
  updatedAt: string;
  status: string;
  fromId: number;
  toId: number;
}

const NOTIFICATIONS_KEY = () => "/notifications";

export function useNotifications() {
  const { data, isLoading } = useQuery<Notification[]>([
    NOTIFICATIONS_KEY(),
  ]);
  return [data, isLoading] as const;
}
