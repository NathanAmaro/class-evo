import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "classEvo - Cadastro de escolas"
};

export default function SchoolRegisterLayout({
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
