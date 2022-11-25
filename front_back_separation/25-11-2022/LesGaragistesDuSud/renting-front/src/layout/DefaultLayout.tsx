import { IconLogin, IconLogout, IconUserPlus } from "@tabler/icons";
import { ReactNode } from "react";
import { useAuth } from "../context/AuthContext";
import router from "../router";
// import bgImg from "../assets/coolcarbro.jpg";

export default function DefaultLayout({ children }: { children: ReactNode }) {
  const { loggedIn, logout, user } = useAuth();
  return (
    <>
      <nav className="sticky left-0 top-0 right-0 bg-white shadow-lg flex p-2 px-4 justify-end gap-2">
        {loggedIn === "no" ? (
          <>
            <router.Link
              to="/login"
              className="transition-all gap-2 flex items-center justify-center text-blue-500 border border-blue-500 rounded-md px-4 py-2 hover:bg-blue-500 hover:text-white"
            >
              Log in
              <IconLogin size={16} stroke={1.5} />
            </router.Link>

            <router.Link
              to="/register"
              className="transition-all gap-2 flex items-center justify-center text-white bg-blue-500 rounded-md px-4 py-2 hover:bg-blue-600"
            >
              Register
              <IconUserPlus size={16} stroke={1.5} />
            </router.Link>
          </>
        ) : null}
        {loggedIn === "yes" ? (
          <div className="flex items-center gap-2">
            <b>Hello, {user.first_name}!</b>
            <button
              onClick={logout}
              className="transition-all gap-2 flex items-center justify-center border text-red-500 border-red-500 rounded-md px-4 py-2 hover:bg-red-500 hover:text-white"
            >
              Logout
              <IconLogout size={16} stroke={1.5} />
            </button>
          </div>
        ) : null}
      </nav>
      <main className="w-full max-w-5xl mx-auto pt-4">{children}</main>
    </>
  );
}
