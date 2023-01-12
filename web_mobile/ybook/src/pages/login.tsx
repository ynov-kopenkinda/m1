import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useAuthActions } from "../context/AuthContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { login } = useAuthActions();
  const handleSubmit = async () => {
    try {
      await login(email, password);
      router.push(`/`);
    } catch (e) {
      if (e instanceof Error) {
        if (e.message === "User is not verified") {
          router.push(`/verify-code?email=${email}`);
        }
        window.alert(e.message);
      } else {
        console.error(e);
      }
    }
  };

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <h1 className="mb-2 text-2xl font-bold">Login</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="flex w-full max-w-xs flex-col gap-4 rounded-md border p-4"
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="email">Email</label>
          <input
            className="rounded-xs border p-2"
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
            className="rounded-xs border p-2"
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
          />
        </div>
        <button type="submit" className="rounded-xs bg-blue-400 p-2 text-white">
          Log in
        </button>
        <div className="flex justify-between">
          <Link
            href="/forgot-password"
            className="text-xs text-blue-400 underline"
          >
            Forgot password
          </Link>
          <Link href="/register" className="text-xs text-blue-400 underline">
            Create an account
          </Link>
        </div>
      </form>
    </div>
  );
}
