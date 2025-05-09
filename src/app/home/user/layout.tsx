import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "classEvo - Usuários"
};

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
        {children}
    </>
  );
}
