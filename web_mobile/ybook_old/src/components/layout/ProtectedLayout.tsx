import { IconFidgetSpinner, IconLogin } from "@tabler/icons";
import Link from "next/link";
import type { PropsWithChildren } from "react";
import useSession from "../../hooks/useSession";
import DefaultAppLayout from "./DefaultLayout";

export default function ProtectedLayout({
  children,
}: PropsWithChildren<unknown>) {
  const [session, error] = useSession();
  if (!session && error == null) {
    return (
      <div className="flex h-screen w-screen flex-col items-center justify-center">
        <IconFidgetSpinner className="animate-spin" />
        <b>Loading</b>
      </div>
    );
  }
  if (error != null) {
    return (
      <div className="flex h-screen w-screen flex-col items-center justify-center">
        <div className="flex w-56 flex-col items-center justify-center rounded-md border p-4">
          <b className="mb-2">Not logged in</b>
          <Link
            href="/login"
            className="flex w-full items-center justify-center rounded-sm bg-blue-400 p-2 text-center text-white"
          >
            <span>Login</span>
            <IconLogin className="ml-1" />
          </Link>
        </div>
      </div>
    );
  }
  return <DefaultAppLayout>{children}</DefaultAppLayout>;
}
