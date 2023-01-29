import { createHashRouter, RouterProvider } from "react-router-dom";
import { RequiresAuth } from "./components/auth/RequiresAuth";
import { AppLayout } from "./components/default/Layout";
import ForgotPasswordPage from "./pages/forgot-password";
import HomePage from "./pages/home";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import VerifyCodePage from "./pages/verify-code";

const router = createHashRouter([
  {
    element: <RequiresAuth />,
    children: [{ path: "/", element: <HomePage /> }],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPasswordPage />,
  },
  {
    path: "/verify-code",
    element: <VerifyCodePage />,
  },
  {
    path: "*",
    element: (
      <AppLayout>
        <h1 className="mt-20 text-center text-8xl font-black">404</h1>
      </AppLayout>
    ),
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
