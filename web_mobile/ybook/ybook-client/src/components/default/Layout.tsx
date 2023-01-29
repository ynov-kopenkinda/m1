import { PropsWithChildren } from "react";
import { AppNavbar } from "./Navbar";

export function AppLayout({ children }: PropsWithChildren) {
  return (
    <>
      <main className="p-2 pb-24">{children}</main>
      <AppNavbar />
    </>
  );
}
