import { Outlet } from "@tanstack/react-router";

export default function AuthLayout() {
  return (
    <div className="border border-gray-200 rounded-xl p-4">
      <Outlet />
    </div>
  );
}
