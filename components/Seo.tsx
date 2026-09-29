import { Head } from 'vite-react-ssg';
import { SITE, absoluteUrl, addressLine } from '../lib/site';

interface SeoProps {
  /** Page title without the site name. Leave empty on the home page. */
  title?: string;
  description?: string;
  /** Path of this page, e.g. "/events". Used for the canonical link. */
  path: string;
  noindex?: boolean;
  jsonLd?: object[];
}

export default function Seo({ title, description = SITE.description, path, noindex, jsonLd = [] }: SeoProps) {
  const fullTitle = title ? `${title} | ${SITE.shortName}` : `${SITE.name} (${SITE.shortName})`;
  const canonical = absoluteUrl(path === '/' ? '/' : path);
  const image = absoluteUrl('/og-image.png');

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {canonical && <link rel="canonical" href={canonical} />}
      {noindex && <meta name="robots" content="noindex" />}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE.name} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      {canonical && <meta property="og:url" content={canonical} />}
      {image && <meta property="og:image" content={image} />}
      <meta name="twitter:card" content={image ? 'summary_large_image' : 'summary'} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
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

export const breadcrumbJsonLd = (items: { name: string; path: string }[]): object => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: item.name,
    ...(SITE.url ? { item: absoluteUrl(item.path) } : {}),
  })),
});

export { addressLine };
