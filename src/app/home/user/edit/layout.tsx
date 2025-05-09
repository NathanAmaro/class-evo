import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "classEvo - Alteração de usuário"
};

export default function UserEditLayout({
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
