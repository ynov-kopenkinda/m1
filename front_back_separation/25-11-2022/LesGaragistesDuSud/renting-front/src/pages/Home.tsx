import { IconLogin } from "@tabler/icons";
import { useAuth } from "../context/AuthContext";
import router from "../router";

export default function HomePage() {
  const { loggedIn, user } = useAuth();
  if (loggedIn === "no") {
    return (
      <div className="text-center flex flex-col gap-4">
        <strong className="text-2xl font-bold">Vous n'êtes pas connecté</strong>
        <router.Link
          to="/login"
          className="transition-all gap-2 flex items-center justify-center text-blue-500 border border-blue-500 rounded-md px-4 py-2 hover:bg-blue-500 hover:text-white"
        >
          Log in
          <IconLogin size={16} stroke={1.5} />
        </router.Link>
      </div>
    );
  }
  return <>hi</>;
}
