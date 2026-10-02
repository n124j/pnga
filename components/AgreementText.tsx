import { Info } from 'lucide-react';
import type { Agreement } from '../data/agreements';
import { useI18n } from '../lib/i18n';

/** The agreement wording is English only: the English text is what a person agrees to (see data/agreements.ts). */
export default function AgreementText({ title, agreement }: { title: string; agreement: Agreement }) {
  const { lang, t } = useI18n();
  return (
    <section aria-labelledby="agreement-title" className="rounded-2xl border border-slate-200 bg-white p-7">
      <h2 id="agreement-title" className="text-2xl font-bold text-navy">{title}</h2>
      {lang === 'ne' && (
        <p role="note" className="mt-3 flex items-start gap-2 rounded-xl bg-navy/5 p-4 text-lg font-semibold text-navy">
          <Info size={22} className="mt-0.5 shrink-0" aria-hidden="true" /> {t('ag.englishOnly')}
        </p>
      )}
      <div lang="en">
        <p className="mt-1 text-sm text-slate-600">Wording version: {agreement.version}</p>
        <ol className="mt-5 space-y-5 text-lg text-slate-800">
          {agreement.sections.map((s, i) => (
            <li key={s.heading}>
              <h3 className="font-sans text-xl font-bold">{i + 1}. {s.heading}</h3>
              {s.paragraphs.map((p) => <p key={p} className="mt-1">{p}</p>)}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
