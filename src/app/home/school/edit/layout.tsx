import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "classEvo - Alteração de escola"
};

export default function SchoolEditLayout({
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
