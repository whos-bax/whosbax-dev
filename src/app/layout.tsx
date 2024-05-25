import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import Header from "@/app/_component/Header";
import Footer from "@/app/_component/Footer";
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';
import dayjs from "dayjs";
import {Providers} from "@/app/Providers";
import {customMeta} from "@/app/_utils/customMeta";
dayjs.locale('ko');
dayjs.extend(relativeTime)

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = customMeta;

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ko">
        <body className={inter.className}>
        <Providers>
            <Header/>
            {children}
            <Footer/>
        </Providers>
        </body>
        </html>
    );
}
