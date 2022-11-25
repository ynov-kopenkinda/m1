import { createReactRouter, createRouteConfig } from "@tanstack/react-router";
import AuthLayout from "./layout/AuthLayout";
import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";

const routeConfig = createRouteConfig().createChildren((createRoute) => [
  createRoute({
    id: "/auth",
    component: AuthLayout,
  }).addChildren([
    createRoute({
      path: "/login",
      component: LoginPage,
    }),
    createRoute({
      path: "/register",
      component: RegisterPage,
    }),
  ]),
  createRoute({
    path: "/",
    component: HomePage,
  }),
]);

const router = createReactRouter({ routeConfig });

export default router;
