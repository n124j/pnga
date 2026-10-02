import { ArrowRight } from 'lucide-react';
import Seo, { breadcrumbJsonLd } from '../components/Seo';
import PageHeader from '../components/PageHeader';
import ProgramIcon from '../components/ProgramIcon';
import { usePrograms } from '../lib/sheets';
import { Link, pick, useI18n } from '../lib/i18n';

export default function Programs() {
  const { lang, t } = useI18n();
  const programs = usePrograms();
  return (
    <>
      <Seo
        path="/programs"
        title={t('prog.seoTitle')}
        description={t('prog.seoDesc')}
        jsonLd={[breadcrumbJsonLd([{ name: t('crumb.home'), path: '/' }, { name: t('nav.programs'), path: '/programs' }], lang)]}
      />
      <PageHeader title={t('prog.h1')} crumbs={[{ label: t('nav.programs') }]} intro={t('prog.intro')} />
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <ul className="grid gap-6 md:grid-cols-2">
          {programs.map((p) => (
            <li key={p.id}>
              <Link to={`/programs/${p.id}`} className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-7 transition-shadow hover:shadow-lg">
                <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-navy/10 text-navy">
                  <ProgramIcon name={p.icon} />
                </span>
                <span className="text-2xl font-bold font-serif text-navy">{pick(lang, p.title, p.titleNe)}</span>
                <span className="mt-2 flex-grow text-lg text-slate-700">{pick(lang, p.summary, p.summaryNe)}</span>
                <span className="mt-4 inline-flex items-center gap-1 font-bold text-crimson-dark">
                  {t('prog.readMore')} <ArrowRight size={18} aria-hidden="true" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
