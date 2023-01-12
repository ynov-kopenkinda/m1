import type { PropsWithChildren } from "react";
import * as AmazonCognitoIdentity from "amazon-cognito-identity-js";
import { useMemo, useContext, createContext, useState } from "react";
import { userPool } from "../aws/userPool";

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
        const attributeList = [
          new AmazonCognitoIdentity.CognitoUserAttribute({
            Name: "name",
            Value: name,
          }),
          new AmazonCognitoIdentity.CognitoUserAttribute({
            Name: "given_name",
            Value: surname,
          }),
          new AmazonCognitoIdentity.CognitoUserAttribute({
            Name: "email",
            Value: email,
          }),
        ];
        await new Promise<AmazonCognitoIdentity.ISignUpResult>((res, rej) => {
          userPool.signUp(email, password, attributeList, [], (err, data) => {
            if (err || data === undefined) {
              rej(err);
            } else {
              res(data);
            }
          });
        });
        return email;
      },
      async verifyEmail(email, code) {
        const userData = {
          Username: email,
          Pool: userPool,
        };
        const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
        return new Promise<unknown>((res, rej) => {
          cognitoUser.confirmRegistration(code, true, (err, result) => {
            if (err) {
              rej(err);
            } else {
              res(result);
            }
          });
        });
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
