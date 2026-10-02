import { Link, pick, useI18n } from '../lib/i18n';
import { HandHeart, Users } from 'lucide-react';
import Seo, { breadcrumbJsonLd } from '../components/Seo';
import PageHeader from '../components/PageHeader';
import { VOLUNTEER_AREAS as AREAS, VOLUNTEER_AREAS_NE as AREAS_NE } from '../data/agreements';


export default function GetInvolved() {
  const { lang, t } = useI18n();
  return (
    <>
      <Seo
        path="/get-involved"
        title={t('gi.seoTitle')}
        description={t('gi.seoDesc')}
        jsonLd={[breadcrumbJsonLd([{ name: t('crumb.home'), path: '/' }, { name: t('gi.h1'), path: '/get-involved' }], lang)]}
      />
      <PageHeader
        title={t('gi.h1')}
        crumbs={[{ label: t('gi.h1') }]}
        intro={t('gi.intro')}
      />
      <div className="mx-auto grid max-w-5xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-2">
        <section className="rounded-2xl border border-slate-200 bg-white p-7" aria-labelledby="volunteer">
          <HandHeart size={36} className="text-crimson-dark" aria-hidden="true" />
          <h2 id="volunteer" className="mt-3 text-3xl font-bold text-navy">{t('gi.vol')}</h2>
          <p className="mt-3 text-lg text-slate-700">{t('gi.canHelp')}</p>
          <ul className="mt-2 list-disc space-y-1 pl-6 text-lg">
            {AREAS.map((a, i) => (
              <li key={a}>{pick(lang, a, AREAS_NE[i])}</li>
            ))}
          </ul>
          <Link to="/volunteer" className="btn btn-primary mt-6">{t('gi.signup')}</Link>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-7" aria-labelledby="join">
          <Users size={36} className="text-navy" aria-hidden="true" />
          <h2 id="join" className="mt-3 text-3xl font-bold text-navy">{t('gi.member')}</h2>
          <p className="mt-3 text-lg text-slate-700">{t('about.membersIntro')}</p>
          <ul className="mt-2 list-disc space-y-1 pl-6 text-lg">
            <li>{t('about.m1')}</li>
            <li>{t('about.m2')}</li>
            <li>{t('about.m3')}</li>
            <li>{t('about.m4')}</li>
          </ul>
          <p className="mt-3 text-slate-700">
            {t('gi.tell')}
          </p>
          <Link to="/contact?topic=Membership" className="btn btn-navy mt-6">{t('gi.interested')}</Link>
        </section>
      </div>
    </>
  );
}
