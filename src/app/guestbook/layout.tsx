import Footer from "@/app/_component/Footer";

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
