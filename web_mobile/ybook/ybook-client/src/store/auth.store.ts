import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface AuthStore {
  token: string | undefined;
  email: string | undefined;
  authenticate: ({ email, token }: { email: string; token: string }) => void;
  deauthenticate: () => void;
}

const useAuthStore = create(
  persist<AuthStore>(
    (set) => ({
      token: undefined,
      email: undefined,
      authenticate: ({ email, token }) => set({ email, token }),
      deauthenticate: () => set({ token: undefined, email: undefined }),
    }),
    {
      name: "ybook-auth",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export const useAuth = () => {
  const token = useAuthStore((state) => state.token);
  const email = useAuthStore((state) => state.email);
  return { token, email };
};

export const useAuthActions = () => {
  const authenticate = useAuthStore((state) => state.authenticate);
  const deauthenticate = useAuthStore((state) => state.deauthenticate);
  return { authenticate, deauthenticate };
};
