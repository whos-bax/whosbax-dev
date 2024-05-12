import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/app/_component/Header";
import {utils} from "@/app/_utils/utils";
import Footer from "@/app/_component/Footer";
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';
import dayjs from "dayjs";

dayjs.locale('ko');
dayjs.extend(relativeTime)

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
      <Footer/>
      </body>
    </html>
  );
}
