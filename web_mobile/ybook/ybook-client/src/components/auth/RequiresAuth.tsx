import { Navigate, Outlet } from "react-router";
import { refreshSession } from "../../aws/cognito";
import { useSession } from "../../hooks/auth/useSession";
import { useInterval } from "../../hooks/utils/useInterval";
import { AppLayout } from "../default/Layout";
import { CenterLoader } from "../default/Loader";

const FIVTEEN_MINUTES = 1_000 * 60 * 15;

export const RequiresAuth = () => {
  const { status } = useSession();
  useInterval(() => {
    refreshSession();
  }, FIVTEEN_MINUTES);
  if (status === "error") {
    return <Navigate to={"/login"} />;
  }
  if (status === "loading") {
    return <CenterLoader />;
  }
  return (
    <AppLayout>
      <Outlet />
    </AppLayout>
  );
};
