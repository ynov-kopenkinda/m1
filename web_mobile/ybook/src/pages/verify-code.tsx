import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuthActions } from "../context/AuthContext";

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
  const { verifyEmail } = useAuthActions();

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        await verifyEmail(email, code);
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
