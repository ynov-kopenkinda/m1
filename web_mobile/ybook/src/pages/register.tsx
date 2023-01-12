import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useAuthActions } from "../context/AuthContext";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { register } = useAuthActions();
  const handleSubmit = async () => {
    try {
      const registeredEmail = await register(email, password, name, surname);
      router.push(`/verify-code?email=${registeredEmail}`);
    } catch (e) {
      if (e instanceof Error) {
        window.alert(e.message);
      } else {
        console.error(e);
      }
    }
  };

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <h1 className="mb-2 text-2xl font-bold">Register</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="flex w-full max-w-xs flex-col gap-4 rounded-md border p-4"
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="name">Name</label>
          <input
            className="rounded-xs border p-2"
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
            className="rounded-xs border p-2"
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
          Register
        </button>
        <div className="flex justify-between">
          <Link href="/login" className="ml-auto text-xs underline text-blue-400">
            Already have an account? Log in instead
          </Link>
        </div>
      </form>
    </div>
  );
}
