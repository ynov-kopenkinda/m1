import type { PropsWithChildren } from "react";
import AppNavbar from "./Navbar";

export default function DefaultAppLayout({
  children,
}: PropsWithChildren<unknown>) {
  return (
    <>
      {children}
      <AppNavbar />
    </>
  );
}
