import { createContext, ReactNode, useContext, useState } from "react";

const API_URL = "http://localhost:8000/api";

export type User = {
  id: number;
  first_name: string;
  type: "admin" | "rider";
};

type TAuthContext =
  | (
      | {
          loggedIn: "no";
          user: undefined;
          token: undefined;
        }
      | {
          loggedIn: "yes";
          user: User;
          token: string;
        }
    ) & {
      login: (
        login: string,
        password: string,
        type: "admin" | "rider"
      ) => Promise<void>;
      register: (
        login: string,
        last_name: string,
        first_name: string,
        birth_date: Date,
        password: string,
        sex: "M" | "F"
      ) => Promise<void>;
      logout: () => void;
    };
const authCtx = createContext<TAuthContext>(null as unknown as TAuthContext);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [loggedIn, setLoggedIn] = useState<TAuthContext["loggedIn"]>("no");
  const [user, setUser] = useState<TAuthContext["user"]>(undefined);
  const [token, setToken] = useState<TAuthContext["token"]>(undefined);
  const login: TAuthContext["login"] = async (login, password, type) => {
    const res = await fetch(`${API_URL}/${type}/login/`, {
      method: "POST",
      body: JSON.stringify({ login, password }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message);
    }
    setToken(data.token);
    setUser(data.user);
    setLoggedIn("yes");
    console.log(data);
  };
  const register: TAuthContext["register"] = async (
    _login,
    last_name,
    first_name,
    birth_date,
    password,
    sex
  ) => {
    const res = await fetch(`${API_URL}/rider/signup/`, {
      method: "POST",
      body: JSON.stringify({
        login: _login,
        password,
        first_name,
        last_name,
        sex,
        birth_date: `${birth_date.getFullYear()}-${birth_date.getMonth()}-${birth_date.getDate()}`,
      }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message);
    }
    await login(_login, password, "rider");
  };
  const logout: TAuthContext["logout"] = () => {
    setLoggedIn("no");
    setUser(undefined);
    setToken(undefined);
  };
  const value = {
    loggedIn,
    user,
    logout,
    login,
    token,
    register,
  } as TAuthContext;
  return <authCtx.Provider value={value}>{children}</authCtx.Provider>;
};

export const useAuth = () => useContext(authCtx);

export default AuthProvider;
