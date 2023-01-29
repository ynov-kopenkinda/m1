import { Navigate, Outlet } from "react-router";
import { useSession } from "../../hooks/useSession";

export const RequiresAuth = () => {
  const { status, data } = useSession();
  if (status === "error") {
    return <Navigate to={"/login"} />;
  }
  if (status === "loading") {
    return <div>Loading...</div>;
  }
  return <Outlet context={{ session: data }} />;
};
