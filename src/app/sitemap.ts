import { MetadataRoute } from 'next';

const BASE_URL = 'https://whoamiiii04.netlify.app';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['', '/about', '/timeline', '/guestbook'];

  return routes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : 0.8,
  }));
}
