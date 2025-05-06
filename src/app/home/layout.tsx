import type { Metadata } from "next";
import { VerifyUserProvider } from "../providers";
import { Separator } from "@/components/ui/separator";
import { UserSpace } from "@/components/custom/user-space";
import { Navbar } from "@/components/custom/navbar";
import { LogoButton } from "@/components/custom/logo-button";


export const metadata: Metadata = {
  title: "classEvo - Home"
};

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <VerifyUserProvider>
      <div className="bg-zinc-950 w-full h-screen flex-col flex items-center px-16 pt-6 pb-6 gap-6">
        <header className="w-full h-14 flex bg-zinc-900 rounded-lg py-3 px-6 gap-2 shrink-0">
          <LogoButton />

          <Separator orientation="vertical" className="bg-zinc-700" />

          <UserSpace />

        </header>
        <main className="flex w-full gap-9 flex-1 overflow-hidden">
          <nav className="w-3xs h-full flex gap-6 px-3">
            <Navbar />
          </nav>
          <section className="w-full flex flex-1 overflow-y-auto">
            {children}
          </section>
        </main>

      </div>
    </VerifyUserProvider>
  );
}
