import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "classEvo - Login"
};

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-zinc-950 w-full h-screen flex justify-center items-center">
      <div className="space-y-11">
        {/*LOGO + TITLE*/}
        <div className="flex flex-col w-full justify-center items-center space-y-2">
          <Image src='/logo-240x50.svg' width={240} height={50} alt="logo"/>
          <span className="text-zinc-100 text-sm">
            A gestão necessária sobre sua classe
          </span>
        </div>

        {/*PAGE CONTENT*/}
        {children}
      </div>
    </div>
  );
}
