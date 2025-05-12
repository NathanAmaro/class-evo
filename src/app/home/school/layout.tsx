import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "classEvo - Escolas"
};

export default function SchoolLayout({
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
