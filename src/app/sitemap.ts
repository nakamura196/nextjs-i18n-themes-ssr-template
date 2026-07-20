import { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import { SITE_URL } from '@/constants/metadata';

export const dynamic = 'force-static';
export const revalidate = false;

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_URL;

  // Define the static pages available in your template
  const staticPages = ['', '/about', '/example'];

  // Generate sitemap entries for all locales and static pages.
  // localePrefix: 'as-needed' → the default locale is served without a prefix,
  // so emit unprefixed URLs for it (avoids feeding redirecting URLs to crawlers).
  const sitemapEntries: MetadataRoute.Sitemap = routing.locales.flatMap((locale) => {
    const prefix = locale === routing.defaultLocale ? '' : `/${locale}`;
    return staticPages.map((page) => ({
      url: `${baseUrl}${prefix}${page}`,
      lastModified: new Date(),
      changeFrequency: page === '' ? ('daily' as const) : ('weekly' as const),
      priority: page === '' ? 1 : 0.8,
    }));
  });

  return sitemapEntries;
}
