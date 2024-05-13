import {utils} from "@/app/_utils/utils";

export const customMeta = {
    metadataBase: new URL("https://whosbax.netlify.app"),
    title: `${utils.title} : ${utils.author}`,
    description: `하고 싶은 것도 이루고 싶은 것도 너무나 많은, 어른이지만 아이처럼 - ${utils.title}`,
    applicationName: "whosbax",
    authors: [{ name: "whosbax", url: "https://whosbax.netlify.app" }],
    openGraph: {
        title: "박상호 | 꿈이 많은 어른 아이",
        description: "꿈이 많은 어른 아이, 개발자 박상호입니다.",
        url: "https://whosbax.netlify.app",
        siteName: "whosbax",
        images: [
            {
                url: new URL('https://whosbax.netlify.app/assets/images/profile.jpg'),
                width: 300,
                height: 300,
                alt: "whosbax",
            },
        ],
        locale: "ko-KR",
        type: "website",
    },

    verification: {
        google: "2S4XF8FbypCoZ-yKMqeIuFzjpDPtJAGA7W85CZaZbXA",
        other: {
            "naver-site-verification": ["25e28f0d4a8d3e8b9c24cc094a4e18f569c678b0"],
        },
    },
}
