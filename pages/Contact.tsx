import { useSearchParams } from 'react-router-dom';
import { Mail, MapPin, Phone } from 'lucide-react';
import Seo, { breadcrumbJsonLd } from '../components/Seo';
import PageHeader from '../components/PageHeader';
import ContactForm from '../components/ContactForm';
import { SITE, addressLine, mapsUrl, telHref } from '../lib/site';
import { Link, useI18n, type Key } from '../lib/i18n';

// The value is what volunteers see in the email (always English); the label is what the visitor sees.
const TOPICS: { value: string; key: Key }[] = [
  { value: 'General question', key: 'con.topicGeneral' },
  { value: 'Volunteering', key: 'con.topicVolunteering' },
  { value: 'Membership', key: 'con.topicMembership' },
  { value: 'Donation', key: 'con.topicDonation' },
  { value: 'Events', key: 'con.topicEvents' },
  { value: 'Photos', key: 'con.topicPhotos' },
  { value: 'Other', key: 'con.topicOther' },
];

export default function Contact() {
  const { lang, t } = useI18n();
  const [params] = useSearchParams();
  const wanted = params.get('topic') ?? '';
  const defaultTopic = TOPICS.find((x) => x.value === wanted)?.value ?? '';

  return (
    <>
      <Seo
        path="/contact"
        title={t('con.seoTitle')}
        description={t('con.seoDesc')}
        jsonLd={[breadcrumbJsonLd([{ name: t('crumb.home'), path: '/' }, { name: t('nav.contact'), path: '/contact' }], lang)]}
      />
      <PageHeader title={t('con.h1')} crumbs={[{ label: t('nav.contact') }]} intro={t('con.intro')} />
      <div className="mx-auto grid max-w-5xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[2fr_3fr]">
        <div className="space-y-6 text-lg">
          <p className="flex gap-3">
            <MapPin size={24} className="mt-1 shrink-0 text-crimson-dark" aria-hidden="true" />
            <span>
              <span className="block font-bold">{t('con.mailing')}</span>
              <a href={mapsUrl} className="underline" target="_blank" rel="noopener noreferrer">
                {addressLine}<span className="sr-only">{t('common.mapTab')}</span>
              </a>
            </span>
          </p>
          {SITE.phone && (
            <p className="flex gap-3">
              <Phone size={24} className="mt-1 shrink-0 text-crimson-dark" aria-hidden="true" />
              <span><span className="block font-bold">{t('con.phone')}</span><a href={telHref} className="underline">{SITE.phone}</a></span>
            </p>
          )}
          {SITE.email && (
            <p className="flex gap-3">
              <Mail size={24} className="mt-1 shrink-0 text-crimson-dark" aria-hidden="true" />
              <span><span className="block font-bold">{t('con.email')}</span><a href={`mailto:${SITE.email}`} className="underline">{SITE.email}</a></span>
            </p>
          )}
          <p className="text-slate-700">{t('con.helpNow')}<Link to="/help" className="font-bold text-navy underline">{t('con.helpLink')}</Link>{t('con.helpNow2')}</p>
        </div>

        <div className="relative rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
          <ContactForm
            kind="Website message"
            topics={{ label: t('con.topicLabel'), options: TOPICS.map((x) => ({ value: x.value, label: t(x.key) })) }}
            defaultTopic={defaultTopic}
            messageLabel={t('con.msg')}
            submitLabel={t('con.submit')}
            privacyNote={t('con.privacy')}
            showLanguage
          />
        </div>
      </div>
    </>
  );
}
