import { IconFidgetSpinner, IconLogin, IconUserPlus } from "@tabler/icons";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import router from "../router";

export default function RegisterPage() {
  const { register } = useAuth();
  const [loading, setLoading] = useState(false);
  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={async (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.target as HTMLFormElement);
        try {
          await register(
            formData.get("login") as string,
            formData.get("first_name") as string,
            formData.get("last_name") as string,
            new Date(formData.get("birth_date") as string),
            formData.get("password") as string,
            formData.get("sex") as "M" | "F"
          );
          router.navigate({ to: "/" });
        } catch (e) {
          alert((e as Error).message);
        } finally {
          setLoading(false);
        }
      }}
    >
      <h2 className="text-3xl">Créer un compte</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
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
          <label htmlFor="password">Date de naissance</label>
          <input
            type="date"
            id="birth_date"
            name="birth_date"
            className="p-2 border rounded"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 w-full">
        <div className="flex flex-col gap-2 grow">
          <label htmlFor="first_name">Prénom</label>
          <input
            type="text"
            id="first_name"
            name="first_name"
            className="p-2 border rounded"
            required
          />
        </div>

        <div className="flex flex-col gap-2 grow">
          <label htmlFor="last_name">Nom</label>
          <input
            type="text"
            id="last_name"
            name="last_name"
            className="p-2 border rounded"
            required
          />
        </div>
        <div className="flex flex-col gap-2 grow sm:col-span-2 md:col-span-1">
          <label htmlFor="sex">Sexe</label>
          <select id="sex" name="sex" className="p-2 border rounded" required>
            <option value="M">Homme</option>
            <option value="F">Femme</option>
          </select>
        </div>
      </div>
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 font-bold rounded w-fit text-white flex gap-2 disabled:bg-blue-300 disabled:cursor-not-allowed"
        disabled={loading}
      >
        Créer un compte
        {loading ? (
          <IconFidgetSpinner className="animate-spin" />
        ) : (
          <IconUserPlus />
        )}
      </button>
    </form>
  );
}
