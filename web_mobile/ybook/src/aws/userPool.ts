import * as AmazonCognitoIdentity from "amazon-cognito-identity-js";
import { env } from "../env/client.cjs";

export const userPool = new AmazonCognitoIdentity.CognitoUserPool({
  ClientId: env.NEXT_PUBLIC_COGNITO_CLIENT_ID,
  UserPoolId: env.NEXT_PUBLIC_COGNITO_USERPOOL_ID,
});
