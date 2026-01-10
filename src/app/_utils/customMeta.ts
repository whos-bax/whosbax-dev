const BASE_URL = 'https://whoamiiii04.netlify.app';

export const customMeta = {
  metadataBase: new URL(BASE_URL),
  title: `꿈이 많은 어른 아이 | 박상호`,
  description: `하고 싶은 것도 이루고 싶은 것도 너무나 많은, 어른이지만 아이처럼 - 꿈이 많은 어른 아이`,
  applicationName: 'whosbax',
  authors: [{ name: 'whosbax', url: BASE_URL }],
  siteName: '꿈이 많은 어른 아이',
  icons: {
    icon: '/icon.png',
    apple: '/icon.png',
  },
  openGraph: {
    title: `꿈이 많은 어른 아이 | 박상호`,
    description:
      '하고 싶은 것도 이루고 싶은 것도 너무나 많은, 어른이지만 아이처럼 - 꿈이 많은 어른 아이',
    url: BASE_URL,
    siteName: '꿈이 많은 어른 아이',
    images: [
      {
        url: new URL(`${BASE_URL}/assets/images/profile.jpg`),
        width: 300,
        height: 300,
        alt: 'whosbax',
      },
    ],
    locale: 'ko-KR',
    type: 'website',
  },

  verification: {
    google: 'KY3o6fgIlK1W7fNfbL3Kbu0G_ExmcGC4zoS0PtPSqq0',
    other: {
      'naver-site-verification': ['25e28f0d4a8d3e8b9c24cc094a4e18f569c678b0'],
    },
  },
};
