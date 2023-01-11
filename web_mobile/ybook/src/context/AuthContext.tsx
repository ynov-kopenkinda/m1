import type { PropsWithChildren } from "react";
import { useMemo, useContext, createContext, useState } from "react";

type AuthState =
  | {
      token: string;
      loggedIn: true;
    }
  | {
      token: null;
      loggedIn: false;
    };

type AuthFunctions = {
  login(email: string, password: string): Promise<void>;
  register(
    name: string,
    surname: string,
    email: string,
    password: string
  ): Promise<void>;
  verifyEmail(email: string, code: string): Promise<void>;
};

const defaultAuthContext: AuthState = {
  loggedIn: false,
  token: null,
};

const defaultAuthActions: AuthFunctions = {
  login: async () => undefined,
  register: async () => undefined,
  verifyEmail: async () => undefined,
};

const authContext = createContext<AuthState>(defaultAuthContext);
const authFunctionsContext = createContext<AuthFunctions>(defaultAuthActions);

export default function AuthProvider({ children }: PropsWithChildren<unknown>) {
  const [state, setState] = useState<AuthState>(defaultAuthContext);
  const authActions: AuthFunctions = useMemo(
    () => ({
      async login(email, password) {
        //
      },
      async register(name, surname, email, password) {
        //
      },
      async verifyEmail(email, code) {
        //
      },
    }),
    []
  );
  return (
    <authContext.Provider value={state}>
      <authFunctionsContext.Provider value={authActions}>
        {children}
      </authFunctionsContext.Provider>
    </authContext.Provider>
  );
}

export const useAuth = () => useContext(authContext);
export const useAuthActions = () => useContext(authFunctionsContext);
