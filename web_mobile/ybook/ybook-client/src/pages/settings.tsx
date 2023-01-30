import { IconLogout } from "@tabler/icons-react";
import { useNavigate } from "react-router";
import { logout } from "../aws/cognito";
import { useAuth, useAuthActions } from "../store/auth.store";

export default function SettingsPage() {
  const navigate = useNavigate();
  const { deauthenticate } = useAuthActions();
  const { email } = useAuth();
  return (
    <div className="flex flex-col gap-2">
      <h1 className="mb-4 text-4xl font-black">Settings</h1>
      <button
        className="flex items-center justify-center gap-2 rounded-md border border-red-500 px-4 py-2 text-red-500"
        onClick={() => {
          // INFO: Non-null assertion operator (!) is used here because we know that the user is logged in
          logout({ email: email! });
          deauthenticate();
          navigate("/login");
        }}
      >
        <IconLogout />
        Logout
      </button>
    </div>
  );
}
