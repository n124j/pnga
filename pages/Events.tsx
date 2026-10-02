import Seo, { breadcrumbJsonLd } from '../components/Seo';
import PageHeader from '../components/PageHeader';
import EventList from '../components/EventList';
import { Link, useI18n } from '../lib/i18n';

export default function Events() {
  const { lang, t } = useI18n();
  return (
    <>
      <Seo
        path="/events"
        title={t('events.seoTitle')}
        description={t('events.seoDesc')}
        jsonLd={[breadcrumbJsonLd([{ name: t('crumb.home'), path: '/' }, { name: t('nav.events'), path: '/events' }], lang)]}
      />
      <PageHeader title={t('events.h1')} crumbs={[{ label: t('nav.events') }]} intro={t('events.intro')} />
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <EventList />
        <p className="mt-10 text-lg text-slate-700">
          {t('events.attend')}<Link to="/waiver" className="font-bold text-navy underline">{t('events.waiverLink')}</Link>{t('events.attend2')}<Link to="/gallery" className="font-bold text-navy underline">{t('events.galleryLink')}</Link>{t('events.end')}
        </p>
      </div>
    </>
  );
}
