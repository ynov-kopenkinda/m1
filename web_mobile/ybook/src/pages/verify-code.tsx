import * as AmazonCognitoIdentity from "amazon-cognito-identity-js";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { userPool } from "../aws/userPool";

export default function VerifyCodePage() {
  const router = useRouter();
  const queryEmail = router.query.email;
  const queryEmailCheck =
    typeof queryEmail === "string" && queryEmail.trim() !== "";
  const [email, setEmail] = useState(queryEmailCheck ? queryEmail : "");
  useEffect(() => {
    if (queryEmailCheck) {
      setEmail(queryEmail.trim());
    }
  }, [queryEmail, queryEmailCheck]);
  const [code, setCode] = useState("");
  const userData = {
    Username: email,
    Pool: userPool,
  };
  const handleSubmit = () => {
    const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    cognitoUser.confirmRegistration(code, true, (err, result) => {
      if (err) {
        console.error(err);
      } else {
        console.log(result);
      }
    });
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
      className="flex flex-col gap-4 p-4"
    >
      <div className="flex flex-col gap-2">
        <label htmlFor="name">Email</label>
        <input
          className="border disabled:bg-gray-300"
          type="email"
          disabled={queryEmail != null && queryEmail !== ""}
          name="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="surname">Surname</label>
        <input
          className="border"
          type="number"
          maxLength={6}
          name="surname"
          id="surname"
          value={code}
          onChange={(e) => setCode(e.currentTarget.value)}
        />
      </div>
      <button type="submit" disabled={code.length !== 6}>
        Finish registration
      </button>
    </form>
  );
}
