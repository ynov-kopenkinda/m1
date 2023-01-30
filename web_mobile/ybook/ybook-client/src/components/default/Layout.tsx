import { PropsWithChildren } from "react";
import { AppNavbar } from "./Navbar";
import { ProfilePreview } from "./ProfilePreview";

export function AppLayout({ children }: PropsWithChildren) {
  return (
    <>
      <main className="p-2 pb-24">{children}</main>
      <AppNavbar />
      <ProfilePreview />
    </>
  );
}
