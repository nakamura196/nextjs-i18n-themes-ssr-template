// Shared canonical site URL. Also consumed by app/sitemap.ts so both
// stay in sync. Set NEXT_PUBLIC_SITE_URL to your production origin.
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const SITE_CONFIG = {
  name: {
    ja: 'Next.js 国際化テンプレート',
    en: 'Next.js i18n Template',
  },
  description: {
    ja: 'Next.js、next-intl、next-themesを使用した多言語・テーマ対応のSSRテンプレート',
    en: 'A multilingual and theme-enabled SSR template using Next.js, next-intl, and next-themes',
  },
  url: SITE_URL,
  ogImage: {
    ja: '/ogp-ja.svg',
    en: '/ogp-en.svg',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@yoursite',
    creator: '@yourcreator',
  },
} as const;

export const getMetadata = (locale: 'ja' | 'en') => {
  const title = SITE_CONFIG.name[locale];
  const description = SITE_CONFIG.description[locale];
  const ogImage = SITE_CONFIG.ogImage[locale];

  return {
    title: {
      default: title,
      template: `%s | ${title}`,
    },
    description,
    metadataBase: new URL(SITE_CONFIG.url),
    openGraph: {
      title,
      description,
      url: SITE_CONFIG.url,
      siteName: title,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: locale === 'ja' ? 'ja_JP' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: SITE_CONFIG.twitter.card,
      title,
      description,
      site: SITE_CONFIG.twitter.site,
      creator: SITE_CONFIG.twitter.creator,
      images: [ogImage],
    },
    alternates: {
      // localePrefix: 'as-needed' → the default locale (ja) is served unprefixed.
      // Per-page canonicals are intentionally left to each page; setting one here
      // would point every route at the site root.
      languages: {
        'ja': SITE_CONFIG.url,
        'en': `${SITE_CONFIG.url}/en`,
        'x-default': SITE_CONFIG.url,
      },
    },
  };
};

export const getPageMetadata = (
  locale: 'ja' | 'en',
  page: {
    title: string;
    description?: string;
    ogImage?: string;
  }
) => {
  const siteTitle = SITE_CONFIG.name[locale];
  const defaultDescription = SITE_CONFIG.description[locale];
  const defaultOgImage = SITE_CONFIG.ogImage[locale];

  return {
    title: `${page.title} | ${siteTitle}`,
    description: page.description || defaultDescription,
    openGraph: {
      title: `${page.title} | ${siteTitle}`,
      description: page.description || defaultDescription,
      images: [
        {
          url: page.ogImage || defaultOgImage,
          width: 1200,
          height: 630,
          alt: page.title,
        },
      ],
    },
    twitter: {
      card: SITE_CONFIG.twitter.card,
      title: `${page.title} | ${siteTitle}`,
      description: page.description || defaultDescription,
      images: [page.ogImage || defaultOgImage],
    },
  };
};