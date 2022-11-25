import { IconFidgetSpinner, IconLogin } from "@tabler/icons";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import router from "../router";

export default function LoginPage() {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={async (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.target as HTMLFormElement);
        const loginInfo = {
          l: formData.get("login"),
          p: formData.get("password"),
          t: formData.get("loginType"),
        };
        try {
          await login(
            loginInfo.l as string,
            loginInfo.p as string,
            loginInfo.t as "admin" | "rider"
          );
          router.navigate({ to: "/" });
        } catch (e) {
          alert((e as Error).message);
        } finally {
          setLoading(false);
        }
      }}
    >
      <h2 className="text-3xl">Se connecter</h2>
      <div className="flex flex-col gap-2">
        <label htmlFor="login">Login</label>
        <input
          type="login"
          id="login"
          name="login"
          className="p-2 border rounded"
          required
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          className="p-2 border rounded"
          required
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="loginType">Type de compte</label>
        <select name="loginType" id="loginType" className="p-2 border rounded">
          <option value="admin">Admin</option>
          <option value="rider">User</option>
        </select>
      </div>
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 font-bold rounded w-fit text-white flex gap-2 disabled:bg-blue-300 disabled:cursor-not-allowed"
        disabled={loading}
      >
        Login
        {loading ? (
          <IconFidgetSpinner className="animate-spin" />
        ) : (
          <IconLogin />
        )}
      </button>
    </form>
  );
}
