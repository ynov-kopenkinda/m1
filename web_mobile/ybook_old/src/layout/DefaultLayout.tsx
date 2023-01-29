import type { PropsWithChildren } from "react";

export default function DefaultLayout({
  children,
}: PropsWithChildren<unknown>) {
  return (
    <>
      <main className="mx-auto max-w-3xl">{children}</main>
    </>
  );
}
