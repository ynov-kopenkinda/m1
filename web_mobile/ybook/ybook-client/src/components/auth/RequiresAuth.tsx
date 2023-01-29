import { Navigate, Outlet } from "react-router";
import { useSession } from "../../hooks/auth/useSession";
import { AppLayout } from "../default/Layout";

export const RequiresAuth = () => {
  const { status, data } = useSession();
  if (status === "error") {
    return <Navigate to={"/login"} />;
  }
  if (status === "loading") {
    return <div>Loading...</div>;
  }
  return (
    <AppLayout>
      <Outlet context={{ session: data }} />
    </AppLayout>
  );
};
