import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Seo, { breadcrumbJsonLd } from '../components/Seo';
import PageHeader from '../components/PageHeader';
import ProgramIcon from '../components/ProgramIcon';
import { usePrograms } from '../lib/sheets';

export default function Programs() {
  const programs = usePrograms();
  return (
    <>
      <Seo
        path="/programs"
        title="Programs for Nepali Families in Pennsylvania"
        description="PNGA programs: social service, education and training, health and nutrition, civic engagement, research and volunteer mobilization."
        jsonLd={[breadcrumbJsonLd([{ name: 'Home', path: '/' }, { name: 'Programs', path: '/programs' }])]}
      />
      <PageHeader title="Programs" crumbs={[{ label: 'Programs' }]} intro="Support, education, health awareness and civic participation for Nepali and South Asian families in Pennsylvania." />
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <ul className="grid gap-6 md:grid-cols-2">
          {programs.map((p) => (
            <li key={p.id}>
              <Link to={`/programs/${p.id}`} className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-7 transition-shadow hover:shadow-lg">
                <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-navy/10 text-navy">
                  <ProgramIcon name={p.icon} />
                </span>
                <span className="text-2xl font-bold font-serif text-navy">{p.title}</span>
                <span className="mt-2 flex-grow text-lg text-slate-700">{p.summary}</span>
                <span className="mt-4 inline-flex items-center gap-1 font-bold text-crimson-dark">
                  Read more <ArrowRight size={18} aria-hidden="true" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
