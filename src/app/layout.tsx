import type { Metadata } from "next";
import { Providers } from "./providers";
import "./globals.css";
import 'react-confirm-alert/src/react-confirm-alert.css';

export const metadata: Metadata = {
  title: "classEvo",
  icons: "/logo.png"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="font-inter box-border h-screen overflow-hidden">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
