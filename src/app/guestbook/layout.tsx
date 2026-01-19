import Footer from "@/app/_component/Footer";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '꿈이 많은 어른 아이 | 박상호',
  description:
    '하고 싶은 것도 이루고 싶은 것도 너무나 많은, 어른이지만 아이처럼 - 소중한 한마디를 남겨주세요.',
};

export default function GuestbookLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            {children}
            <Footer />
        </>
    );
}
