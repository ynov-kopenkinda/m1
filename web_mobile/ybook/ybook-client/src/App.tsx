import {
  QueryClient,
  QueryClientProvider,
  QueryFunction,
} from "@tanstack/react-query";
import { env } from "./env";
import AppRouter from "./router";
import { useAuth } from "./store/auth.store";

function App() {
  const { token } = useAuth();

  const defaultQueryFn: QueryFunction = async ({ queryKey }) => {
    return fetch(env.REACT_APP_BACKEND_URL + queryKey, {
      headers: {
        Authorization: `Bearer ${token}` ?? "",
      },
    }).then((res) => res.json().catch(() => null));
  };

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        queryFn: defaultQueryFn,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <AppRouter />
    </QueryClientProvider>
  );
}

export default App;
