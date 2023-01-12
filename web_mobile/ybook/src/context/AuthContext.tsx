import type { PropsWithChildren } from "react";
import * as AmazonCognitoIdentity from "amazon-cognito-identity-js";
import { useMemo, useContext, createContext } from "react";
import { userPool } from "../aws/userPool";
import { useSessionStorageState } from "ahooks";

type AuthState = {
  token: string | undefined;
};

const defaultAuthContext: AuthState = {
  token: undefined,
};

type AuthFunctions = {
  login(email: string, password: string): Promise<void>;
  logout(): void;
  register(
    name: string,
    surname: string,
    email: string,
    password: string
  ): Promise<string>;
  verifyEmail(email: string, code: string): Promise<unknown>;
};

const defaultAuthActions: AuthFunctions = {
  login: async () => undefined,
  logout: () => undefined,
  register: async () => "",
  verifyEmail: async () => undefined,
} as const;

const authContext = createContext<AuthState>(defaultAuthContext);
const authFunctionsContext = createContext<AuthFunctions>(defaultAuthActions);

export default function AuthProvider({ children }: PropsWithChildren<unknown>) {
  const [state, setState] = useSessionStorageState<AuthState>("ybook-auth", {
    defaultValue: defaultAuthContext,
  });
  const authActions: AuthFunctions = useMemo(
    () => ({
      async login(email, password) {
        const authenticationData = {
          Username: email,
          Password: password,
        };
        const authenticationDetails =
          new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);
        const userData = {
          Username: email,
          Pool: userPool,
        };
        const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
        return new Promise((res, rej) => {
          cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess(session, userConfirmationNecessary) {
              if (userConfirmationNecessary) {
                rej(new Error("User is not confirmed"));
              }
              const token = session.getIdToken().getJwtToken();
              setState({
                token,
              });
              res();
            },
            onFailure(err) {
              rej(err);
            },
          });
        });
      },
      logout() {
        setState(defaultAuthContext);
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
    [setState]
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
