import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/app/_component/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "꿈이 많은 어른 아이 | 박상호",
  description: "꿈이 많은 어른 아이 | 박상호",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <Header/>
      {children}
      </body>
    </html>
  );
}
