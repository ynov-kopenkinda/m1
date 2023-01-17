import { trpc } from "../utils/trpc";

export default function useSession() {
  const { data: session, error } = trpc.auth.getSession.useQuery(undefined);
  return [session, error];
}
