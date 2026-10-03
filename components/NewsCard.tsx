import { ExternalLink } from 'lucide-react';
import { formatNewsDate, type NewsItem } from '../lib/sheets';

export default function NewsCard({ item, compact = false }: { item: NewsItem; compact?: boolean }) {
  const paragraphs = item.content.split(/\n{2,}|\r\n\r\n/).map((p) => p.trim()).filter(Boolean);
  const date = formatNewsDate(item.date);
  return (
    <li className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      {item.image && (
        <img src={item.image} alt="" loading="lazy" className="aspect-[16/9] w-full object-cover" />
      )}
      <div className="flex flex-1 flex-col p-6">
        <p className="text-sm font-bold uppercase tracking-wide text-gold-dark">
          {[item.category, date].filter(Boolean).join(' · ')}
        </p>
        <h3 className="mt-1 text-2xl font-bold text-navy">{item.title}</h3>
        {item.summary && <p className="mt-2 text-lg text-slate-700">{item.summary}</p>}
        {!compact && paragraphs.length > 0 && (
          <details className="mt-3 group">
            <summary className="cursor-pointer py-2 font-bold text-navy underline">
              Read the full story<span className="sr-only">: {item.title}</span>
            </summary>
            <div className="mt-2 space-y-3 text-lg text-slate-800">
              {paragraphs.map((p, i) => <p key={i}>{p}</p>)}
            </div>
          </details>
        )}
        {item.link && (
          <a href={item.link} className="btn btn-outline mt-4 self-start" target="_blank" rel="noopener noreferrer">
            <ExternalLink size={20} aria-hidden="true" /> More information<span className="sr-only"> about {item.title}</span>
          </a>
        )}
      </div>
    </li>
  );
}
