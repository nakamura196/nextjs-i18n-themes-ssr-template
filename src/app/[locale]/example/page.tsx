import { routing } from '@/i18n/routing';
import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import PageLayout from '@/components/layout/PageLayout';
import ExampleContent from '@/components/page/example/ExampleContent';
import { getPageMetadata } from '@/constants/metadata';
import { hasLocale } from 'next-intl';
import type { Metadata } from 'next';

// SSR対応
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const activeLocale = hasLocale(routing.locales, locale) ? locale : routing.defaultLocale;
  const t = await getTranslations({ locale: activeLocale, namespace: 'Example' });
  return getPageMetadata(activeLocale, {
    title: t('title'),
    description: t('description'),
  });
}

export default async function ExamplePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  
  const t = await getTranslations('Example');
  const breadcrumbItems = [{ title: t('title') }];

  return (
    <PageLayout 
      breadcrumbItems={breadcrumbItems} 
      title={t('title')}
      description={t('description')}
    >
      <ExampleContent />
    </PageLayout>
  );
}