import type { Agreement } from '../data/agreements';

export default function AgreementText({ title, agreement }: { title: string; agreement: Agreement }) {
  return (
    <section aria-labelledby="agreement-title" className="rounded-2xl border border-slate-200 bg-white p-7">
      <h2 id="agreement-title" className="text-2xl font-bold text-navy">{title}</h2>
      <p className="mt-1 text-sm text-slate-600">Wording version: {agreement.version}</p>
      <ol className="mt-5 space-y-5 text-lg text-slate-800">
        {agreement.sections.map((s, i) => (
          <li key={s.heading}>
            <h3 className="font-sans text-xl font-bold">{i + 1}. {s.heading}</h3>
            {s.paragraphs.map((p) => <p key={p} className="mt-1">{p}</p>)}
          </li>
        ))}
      </ol>
    </section>
  );
}
