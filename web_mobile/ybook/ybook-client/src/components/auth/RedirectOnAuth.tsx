import { Navigate, Outlet } from "react-router";
import { useSession } from "../../hooks/auth/useSession";
import { AppLayout } from "../default/Layout";
import { CenterLoader } from "../default/Loader";

export const RedirectOnAuth = () => {
  const { status } = useSession();
  if (status === "loading") {
    return <CenterLoader />;
  }
  if (status === "success") {
    return <Navigate to={"/"} />;
  }
  return (
    <AppLayout>
      <Outlet />
    </AppLayout>
  );
};
