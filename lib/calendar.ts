import type { CommunityEvent } from '../data/events';

const stamp = (date: string, time = '09:00') => `${date.replace(/-/g, '')}T${time.replace(':', '')}00`;

const endOf = (e: CommunityEvent) => stamp(e.date, e.endTime ?? e.startTime ?? '10:00');

export function googleCalendarUrl(e: CommunityEvent): string {
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: e.title,
    dates: `${stamp(e.date, e.startTime)}/${endOf(e)}`,
    details: e.description,
    location: [e.location, e.address].filter(Boolean).join(', '),
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

/** A downloadable .ics link that works with Apple Calendar and Outlook. */
export function icsHref(e: CommunityEvent): string {
  const esc = (s: string) => s.replace(/[\;,]/g, (m) => `\\${m}`).replace(/\n/g, '\\n');
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//PNGA//Website//EN',
    'BEGIN:VEVENT',
    `UID:${e.id}@pnga`,
    `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
    `DTSTART:${stamp(e.date, e.startTime)}`,
    `DTEND:${endOf(e)}`,
    `SUMMARY:${esc(e.title)}`,
    `DESCRIPTION:${esc(e.description)}`,
    `LOCATION:${esc([e.location, e.address].filter(Boolean).join(', '))}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ];
  return `data:text/calendar;charset=utf-8,${encodeURIComponent(lines.join('\r\n'))}`;
}

export const directionsUrl = (e: CommunityEvent): string =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    [e.location, e.address].filter(Boolean).join(', '),
  )}`;

export function formatEventDate(e: CommunityEvent): string {
  const [y, m, d] = e.date.split('-').map(Number);
  const day = new Date(y, m - 1, d).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
  const t = (hhmm?: string) => {
    if (!hhmm) return '';
    const [h, min] = hhmm.split(':').map(Number);
    return new Date(2000, 0, 1, h, min).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  };
  const time = e.startTime ? (e.endTime ? `${t(e.startTime)} – ${t(e.endTime)}` : t(e.startTime)) : '';
  return time ? `${day}, ${time}` : day;
}
