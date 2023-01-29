import { useQuery } from "@tanstack/react-query";
import { env } from "../env";
import { useAuth } from "../store/auth.store";

type SessionData = {
  name: string;
  surname: string;
  email: string;
};

const fetchSession = (token?: string) => () =>
  fetch(env.REACT_APP_BACKEND_URL + "/auth/session", {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  }).then((res) => res.json() as Promise<{ session: SessionData }>);

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
  const { token } = useAuth();
  const { data, isInitialLoading } = useQuery(["session"], fetchSession(token));
  if (data === undefined || isInitialLoading) {
    return { status: "loading", data: undefined };
  }
  if (data.session === null) {
    return { status: "error", data: null };
  }
  return { status: "success", data: data.session };
}
