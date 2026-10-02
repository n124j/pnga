import { useEffect, useState } from 'react';
import { CalendarPlus, Download, MapPin, Navigation, Ticket } from 'lucide-react';
import type { CommunityEvent } from '../data/events';
import { useEvents } from '../lib/sheets';
import { pick, useI18n } from '../lib/i18n';
import { categoryLabel } from '../lib/dates';
import { directionsUrl, formatEventDate, googleCalendarUrl, icsHref } from '../lib/calendar';

function EventCard({ event: source }: { event: CommunityEvent }) {
  const { lang, t } = useI18n();
  // On Nepali pages, use the Nepali text from the sheet where there is some (calendar files and directions too).
  const event: CommunityEvent = {
    ...source,
    title: pick(lang, source.title, source.titleNe),
    location: pick(lang, source.location, source.locationNe),
    description: pick(lang, source.description, source.descriptionNe),
  };
  return (
    <li className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-sm font-bold uppercase tracking-wide text-crimson-dark">{categoryLabel(lang, event.category)}</p>
      <h3 className="mt-1 text-2xl font-bold text-navy">{event.title}</h3>
      <p className="mt-2 font-semibold">{formatEventDate(event, lang)}</p>
      <p className="mt-1 flex items-start gap-2 text-slate-700">
        <MapPin size={20} className="mt-0.5 shrink-0" aria-hidden="true" />
        <span>{[event.location, event.address].filter(Boolean).join(', ')}</span>
      </p>
      <p className="mt-3 text-slate-700">{event.description}</p>
      <div className="mt-5 flex flex-wrap gap-3">
        {event.registrationUrl && (
          <a href={event.registrationUrl} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
            <Ticket size={20} aria-hidden="true" /> {t('ev.register')}<span className="sr-only">{t('ev.for', { title: event.title })}</span>
          </a>
        )}
        <a href={googleCalendarUrl(event)} className="btn btn-outline" target="_blank" rel="noopener noreferrer">
          <CalendarPlus size={20} aria-hidden="true" /> {t('ev.gcal')}<span className="sr-only">{t('ev.for', { title: event.title })}</span>
        </a>
        <a href={icsHref(event)} download={`${event.id}.ics`} className="btn btn-outline">
          <Download size={20} aria-hidden="true" /> {t('ev.ics')}<span className="sr-only">{t('ev.icsFor', { title: event.title })}</span>
        </a>
        <a href={directionsUrl(event)} className="btn btn-outline" target="_blank" rel="noopener noreferrer">
          <Navigation size={20} aria-hidden="true" /> {t('ev.dir')}<span className="sr-only">{t('ev.dirTo', { title: event.title })}</span>
        </a>
      </div>
    </li>
  );
}

export default function EventList({ limit, emptyClass = '' }: { limit?: number; emptyClass?: string }) {
  // Hide events that have already happened. This runs in the visitor's browser,
  // so a page built last week still hides yesterday's event.
  const { t } = useI18n();
  const [today, setToday] = useState<string | null>(null);
  useEffect(() => {
    const d = new Date();
    setToday(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`);
  }, []);

  const events = useEvents();
  const upcoming = events.filter((e) => (today ? e.date >= today : true))
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, limit);

  if (upcoming.length === 0) {
    return (
      <div className={`rounded-2xl border-2 border-dashed border-slate-300 bg-white p-8 text-center ${emptyClass}`}>
        <p className="text-xl font-semibold text-slate-800">{t('ev.none')}</p>
        <p className="mt-2 text-slate-700">{t('ev.none2')}</p>
      </div>
    );
  }
  return (
    <ul className="grid gap-6 lg:grid-cols-2">
      {upcoming.map((e) => (
        <EventCard key={e.id} event={e} />
      ))}
    </ul>
  );
}
