import Footer from "@/app/_component/Footer";

export default function TimelineLayout({
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
