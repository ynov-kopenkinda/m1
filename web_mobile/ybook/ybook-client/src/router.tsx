import {
  createHashRouter, RouterProvider
} from "react-router-dom";
import { RequiresAuth } from './components/auth/RequiresAuth';
import ForgotPasswordPage from "./pages/forgot-password";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import VerifyCodePage from "./pages/verify-code";

const router = createHashRouter([
  {
    element: <RequiresAuth />,
    children: [{ path: "/", element: <div>Home</div> }],
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
    element: <div>404</div>,
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
