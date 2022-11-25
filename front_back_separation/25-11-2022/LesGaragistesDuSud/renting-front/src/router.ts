import { createReactRouter, createRouteConfig } from "@tanstack/react-router";
import AuthLayout from "./layout/AuthLayout";
import CreateCarPage from "./pages/CreateCar";
import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import RentedCars from "./pages/Rented";

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
  createRoute({
    path: "/rented",
    component: RentedCars,
  }),
  createRoute({
    path: "/create",
    component: CreateCarPage,
  }),
]);

const router = createReactRouter({ routeConfig });

export default router;
