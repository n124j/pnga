import { Link, useParams } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import Seo, { breadcrumbJsonLd } from '../components/Seo';
import PageHeader from '../components/PageHeader';
import ProgramIcon from '../components/ProgramIcon';
import NotFound from './NotFound';
import { usePrograms } from '../lib/sheets';

export default function ProgramDetail() {
  const { id } = useParams();
  const programs = usePrograms();
  const program = programs.find((p) => p.id === id);
  if (!program) return <NotFound />;

  const path = `/programs/${program.id}`;
  const others = programs.filter((p) => p.id !== program.id);
  return (
    <>
      <Seo
        path={path}
        title={`${program.title} – PNGA Programs`}
        description={`${program.summary} A program of the Pennsylvania Nepalese Guthi Association.`}
        jsonLd={[
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Programs', path: '/programs' },
            { name: program.title, path },
          ]),
        ]}
      />
      <PageHeader
        title={program.title}
        crumbs={[{ label: 'Programs', to: '/programs' }, { label: program.title }]}
        intro={program.intro}
      />
      <div className="mx-auto max-w-4xl space-y-8 px-4 py-10 sm:px-6">
        {program.sections.map((section) => (
          <section key={section.heading} className="rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="flex items-center gap-3 text-2xl font-bold text-navy">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-navy/10 text-navy">
                <ProgramIcon name={program.icon} size={24} />
              </span>
              {section.heading}
            </h2>
            <ul className="mt-4 grid gap-3">
              {section.items.map((item) => (
                <li key={item} className="flex items-start gap-3 text-lg">
                  <CheckCircle2 size={24} className="mt-0.5 shrink-0 text-crimson-dark" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </section>
        ))}

        <div className="flex flex-wrap gap-3">
          <Link to="/get-involved" className="btn btn-primary">Volunteer with PNGA</Link>
          <Link to="/contact" className="btn btn-outline">Ask a question</Link>
        </div>

        <nav aria-label="Other programs" className="border-t border-slate-200 pt-6">
          <h2 className="text-xl font-bold text-navy">Other programs</h2>
          <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-lg">
            {others.map((p) => (
              <li key={p.id}>
                <Link to={`/programs/${p.id}`} className="font-semibold text-navy underline">{p.title}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}
