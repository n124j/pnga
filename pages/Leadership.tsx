import Seo, { breadcrumbJsonLd } from '../components/Seo';
import PageHeader from '../components/PageHeader';
import { useBoard, type BoardSection } from '../lib/sheets';

function Section({ section }: { section: BoardSection }) {
  const hasRoles = section.people.some((p) => p.role);
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6">
      <h2 className="text-2xl font-bold text-navy">{section.title}</h2>
      {hasRoles ? (
        <dl className="mt-4 divide-y divide-slate-100">
          {section.people.map((r, i) => (
            <div key={`${r.role}-${r.name}-${i}`} className="flex flex-wrap justify-between gap-x-4 py-2">
              <dt className="font-semibold text-slate-700">{r.role}</dt>
              <dd>{r.name}</dd>
            </div>
          ))}
        </dl>
      ) : (
        <ul className="mt-4 space-y-1">
          {section.people.map((r, i) => (
            <li key={`${r.name}-${i}`}>{r.name}</li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default function Leadership() {
  const sections = useBoard();
  const current = sections.filter((x) => !x.past);
  const past = sections.filter((x) => x.past);
  return (
    <>
      <Seo
        path="/about/leadership"
        title="Board of Directors and Advisors"
        description="The volunteers who lead the Pennsylvania Nepalese Guthi Association: current board, advisors and past board members."
        jsonLd={[
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'About', path: '/about' },
            { name: 'Board of directors', path: '/about/leadership' },
          ]),
        ]}
      />
      <PageHeader
        title="Our board of directors"
        crumbs={[{ label: 'About', to: '/about' }, { label: 'Board of directors' }]}
        intro="PNGA is led by volunteers who care about our community."
      />
      <div className="mx-auto max-w-5xl space-y-10 px-4 py-10 sm:px-6">
        <div className="grid gap-6 md:grid-cols-2">
          {current.map((x) => <Section key={x.title} section={x} />)}
        </div>

        {past.length > 0 && (
          <div>
            <h2 className="mb-4 font-serif text-3xl font-bold text-navy">Past boards</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {past.map((x) => <Section key={x.title} section={x} />)}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
