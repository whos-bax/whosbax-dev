import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/app/_component/Header";
import {utils} from "@/app/_utils/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: `${utils.title} | ${utils.author}`,
  description: `${utils.title} | ${utils.author}`,
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
