import { useEffect, useState } from "react";
import { trpc } from "../utils/trpc";

export default function useSession() {
  const [error, setError] = useState<Error | undefined>(undefined);
  const {
    data: session,
    error: sessionError,
    refetch,
  } = trpc.auth.getSession.useQuery(undefined, {
    enabled: false,
    retry: false,
  });

  useEffect(() => {
    const id = setInterval(async () => {
      try {
        const data = await refetch();
        if (data.error != null) throw data.error;
        setError(undefined);
      } catch (err) {
        setError(err as Error);
      }
    }, 2500);
    return () => clearInterval(id);
  }, [refetch, sessionError]);

  console.log({ session }, { error });
  return [session, error];
}
