import { Outlet, RouterProvider } from "@tanstack/react-router";
import AuthProvider from "./context/AuthContext";
import DefaultLayout from "./layout/DefaultLayout";
import router from "./router";

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router}>
        <DefaultLayout>
          <Outlet />
        </DefaultLayout>
      </RouterProvider>
    </AuthProvider>
  );
}

export default App;
