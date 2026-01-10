import type {Metadata} from "next";
import "./globals.css";
import Header from "@/app/_component/Header";
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import relativeTime from 'dayjs/plugin/relativeTime';
import {Providers} from "@/app/Providers";
import {customMeta} from "@/app/_utils/customMeta";
import NextTopLoader from 'nextjs-toploader';
import PageViewTracker from "@/app/_component/PageViewTracker";
import { Toaster } from 'sonner';

dayjs.locale('ko');
dayjs.extend(relativeTime);

import localFont from "next/font/local";

const pretendard = localFont({
    src: "../fonts/PretendardVariable.woff2",
    display: "swap",
    weight: "45 920",
    variable: "--font-pretendard",
});

export const metadata: Metadata = customMeta;

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ko">
        <body className={`${pretendard.variable} font-pretendard`}>
        <NextTopLoader color="#17C964" showSpinner={false} />
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: 'var(--brand-bg)',
              border: '1px solid var(--gray200)',
              color: 'var(--brand-text)',
            },
            classNames: {
              success: 'toast-success',
            },
          }}
        />
        <Providers>
            <PageViewTracker />
            <Header/>
            <div id="main-content">
                {children}
            </div>
        </Providers>
        </body>
        </html>
    );
}
