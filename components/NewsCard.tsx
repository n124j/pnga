import { ExternalLink } from 'lucide-react';
import { formatNewsDate, type NewsItem } from '../lib/sheets';
import { pick, useI18n } from '../lib/i18n';
import { categoryLabel } from '../lib/dates';

export default function NewsCard({ item, compact = false }: { item: NewsItem; compact?: boolean }) {
  const { lang, t } = useI18n();
  const title = pick(lang, item.title, item.titleNe);
  const summary = pick(lang, item.summary, item.summaryNe);
  const paragraphs = pick(lang, item.content, item.contentNe).split(/\n{2,}|\r\n\r\n/).map((p) => p.trim()).filter(Boolean);
  const date = formatNewsDate(item.date, lang);
  return (
    <li className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      {item.image && (
        <img src={item.image} alt="" loading="lazy" className="aspect-[16/9] w-full object-cover" />
      )}
      <div className="flex flex-1 flex-col p-6">
        <p className="text-sm font-bold uppercase tracking-wide text-crimson-dark">
          {[categoryLabel(lang, item.category), date].filter(Boolean).join(' · ')}
        </p>
        <h3 className="mt-1 text-2xl font-bold text-navy">{title}</h3>
        {summary && <p className="mt-2 text-lg text-slate-700">{summary}</p>}
        {!compact && paragraphs.length > 0 && (
          <details className="mt-3 group">
            <summary className="cursor-pointer py-2 font-bold text-navy underline">
              {t('news.readFull')}<span className="sr-only">: {title}</span>
            </summary>
            <div className="mt-2 space-y-3 text-lg text-slate-800">
              {paragraphs.map((p, i) => <p key={i}>{p}</p>)}
            </div>
          </details>
        )}
        {item.link && (
          <a href={item.link} className="btn btn-outline mt-4 self-start" target="_blank" rel="noopener noreferrer">
            <ExternalLink size={20} aria-hidden="true" /> {t('news.more')}<span className="sr-only">{t('news.about', { title })}</span>
          </a>
        )}
      </div>
    </li>
  );
}
