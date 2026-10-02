import { Link, useI18n } from '../lib/i18n';
import { ChevronRight } from 'lucide-react';
import type { ReactNode } from 'react';

interface Props {
  title: string;
  intro?: ReactNode;
  crumbs?: { label: string; to?: string }[];
}

export default function PageHeader({ title, intro, crumbs }: Props) {
  const { t } = useI18n();
  return (
    <div className="border-b border-slate-200 bg-white">
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 md:py-14">
        {crumbs && (
          <nav aria-label={t('crumb.nav')} className="mb-4 text-sm">
            <ol className="flex flex-wrap items-center gap-1 text-slate-700">
              <li><Link to="/" className="underline">{t('crumb.home')}</Link></li>
              {crumbs.map((c) => (
                <li key={c.label} className="flex items-center gap-1">
                  <ChevronRight size={14} aria-hidden="true" />
                  {c.to ? <Link to={c.to} className="underline">{c.label}</Link> : <span aria-current="page">{c.label}</span>}
                </li>
              ))}
            </ol>
          </nav>
        )}
        <h1 className="text-4xl font-bold text-navy md:text-5xl">{title}</h1>
        <div className="mt-4 h-1.5 w-20 rounded-full bg-crimson" aria-hidden="true" />
        {intro && <div className="mt-6 text-xl text-slate-700">{intro}</div>}
      </div>
    </div>
  );
}
