import { useQuery } from "@tanstack/react-query";

type SessionData = {
  name: string;
  surname: string;
  email: string;
};

type SessionResult =
  | {
      status: "success";
      data: SessionData;
    }
  | {
      status: "error";
      data: null;
    }
  | {
      status: "loading";
      data: undefined;
    };

export function useSession(): SessionResult {
  const { data, isInitialLoading } = useQuery<{ session: SessionData }>([
    "/auth/session",
  ]);
  if (data === undefined || isInitialLoading) {
    return { status: "loading", data: undefined };
  }
  if (data.session === null) {
    return { status: "error", data: null };
  }
  return { status: "success", data: data.session };
}
