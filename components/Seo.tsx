import { Head } from 'vite-react-ssg';
import { SITE, absoluteUrl, addressLine } from '../lib/site';
import { isTranslated, localize, useI18n, type Lang } from '../lib/i18n';

interface SeoProps {
  /** Page title without the site name. Leave empty on the home page. */
  title?: string;
  description?: string;
  /** Path of this page, e.g. "/events". Used for the canonical link. */
  path: string;
  noindex?: boolean;
  jsonLd?: object[];
}

export default function Seo({ title, description, path, noindex, jsonLd = [] }: SeoProps) {
  const { lang, t } = useI18n();
  const desc = description ?? t('site.description');
  const fullTitle = title ? `${title} | ${SITE.shortName}` : `${t('site.name')} (${SITE.shortName})`;

  // `path` is always the English address of the page. Nepali pages live under /ne.
  const translated = isTranslated(path);
  const englishUrl = absoluteUrl(path);
  const nepaliUrl = absoluteUrl(localize(path, 'ne'));
  // A /ne page that is still English text is kept out of search results and points at the real English page.
  const stillEnglish = lang === 'ne' && !translated;
  const canonical = lang === 'ne' && translated ? nepaliUrl : englishUrl;
  const hide = noindex || stillEnglish;
  const alternates = translated && Boolean(englishUrl) && !noindex;
  const image = absoluteUrl('/og-image.png');

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      {canonical && <link rel="canonical" href={canonical} />}
      {alternates && <link rel="alternate" hrefLang="en" href={englishUrl} />}
      {alternates && <link rel="alternate" hrefLang="ne" href={nepaliUrl} />}
      {alternates && <link rel="alternate" hrefLang="x-default" href={englishUrl} />}
      {hide && <meta name="robots" content="noindex" />}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={t('site.name')} />
      <meta property="og:locale" content={lang === 'ne' ? 'ne_NP' : 'en_US'} />
      <meta property="og:locale:alternate" content={lang === 'ne' ? 'en_US' : 'ne_NP'} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      {canonical && <meta property="og:url" content={canonical} />}
      {image && <meta property="og:image" content={image} />}
      <meta name="twitter:card" content={image ? 'summary_large_image' : 'summary'} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      {jsonLd.map((data, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(data)}
        </script>
      ))}
    </Head>
  );
}

/** Organization data for search engines. Only fields PNGA has confirmed are included. */
export function organizationJsonLd(): object {
  const sameAs = Object.values(SITE.social).filter(Boolean);
  return {
    '@context': 'https://schema.org',
    '@type': 'NGO',
    name: SITE.name,
    alternateName: SITE.shortName,
    ...(SITE.url ? { url: SITE.url } : {}),
    ...(SITE.url ? { logo: absoluteUrl('/logo.png') } : {}),
    description: SITE.description,
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE.address.street,
      addressLocality: SITE.address.city,
      addressRegion: SITE.address.region,
      postalCode: SITE.address.zip,
      addressCountry: 'US',
    },
    ...(SITE.email || SITE.phone
      ? {
          contactPoint: {
            '@type': 'ContactPoint',
            contactType: 'general inquiries',
            ...(SITE.email ? { email: SITE.email } : {}),
            ...(SITE.phone ? { telephone: SITE.phone } : {}),
            availableLanguage: ['English', 'Nepali'],
          },
        }
      : {}),
    ...(sameAs.length ? { sameAs } : {}),
  };
}

export const breadcrumbJsonLd = (items: { name: string; path: string }[], lang: Lang = 'en'): object => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: item.name,
    ...(SITE.url ? { item: absoluteUrl(localize(item.path, lang)) } : {}),
  })),
});

export { addressLine };
