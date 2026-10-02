import { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import Seo, { breadcrumbJsonLd } from '../components/Seo';
import PageHeader from '../components/PageHeader';
import { useBoard, type BoardPerson, type BoardSection } from '../lib/sheets';
import { pick, useI18n } from '../lib/i18n';
import { groupLabel, roleLabel } from '../lib/dates';

/** Two initials for the round picture when there is no photo ("Dr." and similar titles are skipped). */
const initials = (name: string) => {
  const words = name.split(/[\s/]+/).filter((w) => w && !w.endsWith('.'));
  return ((words[0]?.[0] ?? '') + (words.length > 1 ? words[words.length - 1][0] : '')).toUpperCase();
};

/** Popup with one person's picture and bio. Uses the browser's built-in modal dialog: Esc closes it and focus stays inside. */
function BioDialog({ person, onClose }: { person: BoardPerson; onClose: () => void }) {
  const { lang, t } = useI18n();
  const ref = useRef<HTMLDialogElement>(null);
  const opener = useRef<Element | null>(typeof document === 'undefined' ? null : document.activeElement);
  const paragraphs = pick(lang, person.bio ?? '', person.bioNe).split(/\n+/).filter(Boolean);

  useEffect(() => {
    const d = ref.current;
    if (d && !d.open) d.showModal();
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const from = opener.current as HTMLElement | null;
    return () => {
      document.body.style.overflow = previous;
      if (from?.isConnected) from.focus();
    };
  }, []);

  return (
    <dialog
      ref={ref}
      aria-labelledby="bio-name"
      onClose={onClose}
      onClick={(e) => { if (e.target === ref.current) onClose(); }}
      className="m-auto max-h-[92vh] w-[min(94vw,760px)] overflow-y-auto rounded-2xl bg-white p-0 text-slate-900 backdrop:bg-black/70"
    >
      <div className="flex items-start justify-between gap-4 border-b border-slate-200 p-5 sm:p-6">
        <div className="flex items-center gap-4">
          {person.photo ? (
            <img src={person.photo} alt={t('lead.photoOf', { name: pick(lang, person.name, person.nameNe) })} width={80} height={80} className="h-20 w-20 shrink-0 rounded-full object-cover" />
          ) : (
            <span aria-hidden="true" className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-navy text-3xl font-bold text-white">
              {initials(person.name)}
            </span>
          )}
          <div>
            <h2 id="bio-name" className="font-serif text-2xl font-bold text-navy sm:text-3xl">{pick(lang, person.name, person.nameNe)}</h2>
            {person.role && <p className="text-lg text-slate-700">{roleLabel(lang, person.role, person.roleNe)}</p>}
          </div>
        </div>
        <button
          type="button"
          onClick={() => ref.current?.close()}
          className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-navy px-4 py-2 text-base font-bold text-white hover:bg-navy/90"
        >
          <X size={20} aria-hidden="true" /> {t('lb.close')}
        </button>
      </div>
      <div className="space-y-4 p-5 text-lg leading-relaxed sm:p-6">
        {paragraphs.map((t, i) => <p key={i}>{t}</p>)}
      </div>
    </dialog>
  );
}

/** A name that opens the bio popup when the person has a bio, and plain text otherwise. */
function Name({ name, nameNe, bios, onOpen }: { name: string; nameNe?: string; bios: Map<string, BoardPerson>; onOpen: (p: BoardPerson) => void }) {
  const { lang, t } = useI18n();
  const shown = pick(lang, name, nameNe);
  const person = bios.get(name.toLowerCase());
  if (!person) return <>{shown}</>;
  return (
    <button
      type="button"
      onClick={() => onOpen(person)}
      className="cursor-pointer py-1 text-left font-semibold text-navy underline decoration-2 underline-offset-2 hover:text-crimson-dark"
    >
      {shown}
      <span className="sr-only">{t('lead.readBio')}</span>
    </button>
  );
}

function Section({ section, bios, onOpen }: { section: BoardSection; bios: Map<string, BoardPerson>; onOpen: (p: BoardPerson) => void }) {
  const { lang } = useI18n();
  const hasRoles = section.people.some((p) => p.role);
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6">
      <h2 className="text-2xl font-bold text-navy">{groupLabel(lang, section.title, section.titleNe)}</h2>
      {hasRoles ? (
        <dl className="mt-4 divide-y divide-slate-100">
          {section.people.map((r, i) => (
            <div key={`${r.role}-${r.name}-${i}`} className="flex flex-wrap items-center justify-between gap-x-4 py-2">
              <dt className="font-semibold text-slate-700">{roleLabel(lang, r.role, r.roleNe)}</dt>
              <dd><Name name={r.name} nameNe={r.nameNe} bios={bios} onOpen={onOpen} /></dd>
            </div>
          ))}
        </dl>
      ) : (
        <ul className="mt-4 space-y-1">
          {section.people.map((r, i) => (
            <li key={`${r.name}-${i}`}><Name name={r.name} nameNe={r.nameNe} bios={bios} onOpen={onOpen} /></li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default function Leadership() {
  const { lang, t } = useI18n();
  const sections = useBoard();
  const current = sections.filter((x) => !x.past);
  const past = sections.filter((x) => x.past);
  const [open, setOpen] = useState<BoardPerson | null>(null);
  // Anyone who has a bio anywhere in the sheet gets a link, in every group they appear in.
  const bios = new Map<string, BoardPerson>();
  sections.forEach((x) => x.people.forEach((p) => { if (p.bio && !bios.has(p.name.toLowerCase())) bios.set(p.name.toLowerCase(), p); }));
  return (
    <>
      <Seo
        path="/about/leadership"
        title={t('lead.seoTitle')}
        description={t('lead.seoDesc')}
        jsonLd={[
          breadcrumbJsonLd(
            [
              { name: t('crumb.home'), path: '/' },
              { name: t('nav.about'), path: '/about' },
              { name: t('fl.board'), path: '/about/leadership' },
            ],
            lang,
          ),
        ]}
      />
      <PageHeader
        title={t('about.board')}
        crumbs={[{ label: t('nav.about'), to: '/about' }, { label: t('fl.board') }]}
        intro={bios.size > 0 ? t('lead.intro1') : t('lead.intro2')}
      />
      <div className="mx-auto max-w-5xl space-y-10 px-4 py-10 sm:px-6">
        <div className="grid gap-6 md:grid-cols-2">
          {current.map((x) => <Section key={x.title} section={x} bios={bios} onOpen={setOpen} />)}
        </div>

        {past.length > 0 && (
          <div>
            <h2 className="mb-4 font-serif text-3xl font-bold text-navy">{t('lead.past')}</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {past.map((x) => <Section key={x.title} section={x} bios={bios} onOpen={setOpen} />)}
            </div>
          </div>
        )}
      </div>
      {open && <BioDialog person={open} onClose={() => setOpen(null)} />}
    </>
  );
}
