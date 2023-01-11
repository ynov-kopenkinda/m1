import * as AmazonCognitoIdentity from "amazon-cognito-identity-js";
import { useRouter } from "next/router";
import { useState } from "react";
import { userPool } from "../aws/userPool";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const handleSubmit = () => {
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
    userPool.signUp(email, password, attributeList, [], (err, data) => {
      if (err) {
        console.error(err);
      } else {
        data?.user.getUserAttributes((err, attrs) => {
          router.push(
            `/verify-code?email=${
              attrs?.find((a) => a.Name === "email")?.Value
            }`
          );
        });
      }
    });
  };

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className={"flex flex-col gap-4 p-4"}
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="name">Name</label>
          <input
            className="border"
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={(e) => setName(e.currentTarget.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="surname">Surname</label>
          <input
            className="border"
            type="text"
            name="surname"
            id="surname"
            value={surname}
            onChange={(e) => setSurname(e.currentTarget.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email">Email</label>
          <input
            className="border"
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password">Password</label>
          <input
            className="border"
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </>
  );
}
