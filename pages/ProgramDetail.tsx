import { useParams } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import Seo, { breadcrumbJsonLd } from '../components/Seo';
import PageHeader from '../components/PageHeader';
import ProgramIcon from '../components/ProgramIcon';
import NotFound from './NotFound';
import { usePrograms } from '../lib/sheets';
import { Link, pick, useI18n } from '../lib/i18n';

export default function ProgramDetail() {
  const { id } = useParams();
  const { lang, t } = useI18n();
  const programs = usePrograms();
  const program = programs.find((p) => p.id === id);
  if (!program) return <NotFound />;

  const path = `/programs/${program.id}`;
  const others = programs.filter((p) => p.id !== program.id);
  const title = pick(lang, program.title, program.titleNe);
  const summary = pick(lang, program.summary, program.summaryNe);
  return (
    <>
      <Seo
        path={path}
        title={t('pd.seoTitle', { title })}
        description={t('pd.seoDesc', { summary })}
        jsonLd={[
          breadcrumbJsonLd(
            [
              { name: t('crumb.home'), path: '/' },
              { name: t('nav.programs'), path: '/programs' },
              { name: title, path },
            ],
            lang,
          ),
        ]}
      />
      <PageHeader
        title={title}
        crumbs={[{ label: t('nav.programs'), to: '/programs' }, { label: title }]}
        intro={pick(lang, program.intro, program.introNe)}
      />
      <div className="mx-auto max-w-4xl space-y-8 px-4 py-10 sm:px-6">
        {program.sections.map((section) => (
          <section key={section.heading} className="rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="flex items-center gap-3 text-2xl font-bold text-navy">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-navy/10 text-navy">
                <ProgramIcon name={program.icon} size={24} />
              </span>
              {lang === 'ne' && !section.headingNe && section.heading === 'What this includes' ? t('pd.includes') : pick(lang, section.heading, section.headingNe)}
            </h2>
            <ul className="mt-4 grid gap-3">
              {section.items.map((item, i) => (
                <li key={item} className="flex items-start gap-3 text-lg">
                  <CheckCircle2 size={24} className="mt-0.5 shrink-0 text-crimson-dark" aria-hidden="true" />
                  <span>
                    <span className="font-semibold">{pick(lang, item, section.itemsNe?.[i])}</span>
                    {section.notes?.[item] && (
                      <span className="mt-1 block text-slate-700">{pick(lang, section.notes[item], section.notesNe?.[item])}</span>
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        ))}

        <div className="flex flex-wrap gap-3">
          <Link to="/get-involved" className="btn btn-primary">{t('pd.volunteer')}</Link>
          <Link to="/contact" className="btn btn-outline">{t('pd.ask')}</Link>
        </div>

        <nav aria-label={t('pd.othersNav')} className="border-t border-slate-200 pt-6">
          <h2 className="text-xl font-bold text-navy">{t('pd.others')}</h2>
          <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-lg">
            {others.map((p) => (
              <li key={p.id}>
                <Link to={`/programs/${p.id}`} className="font-semibold text-navy underline">{pick(lang, p.title, p.titleNe)}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}
