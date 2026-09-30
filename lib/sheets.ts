// Reads community-editable content (news, gallery) from Google Sheets that are
// "Published to the web" as CSV. Volunteers edit the sheet; the site picks up
// changes on the next page load. If the sheet cannot be reached, the copy saved
// at build time (data/generated/snapshot.json) is shown instead.
import { useEffect, useState } from 'react';
import { BIOS } from '../data/boardBios';
import snapshot from '../data/generated/snapshot.json';
import { GALLERY_IMAGES, type GalleryImage } from '../data/gallery';
import { EVENTS, type CommunityEvent } from '../data/events';
import { PROGRAMS, type Program, type ProgramSection } from '../data/programs';
import {
  CURRENT_BOARD, EARLIER_ADVISORS, EARLIER_BOARD, RECENT_PAST_ADVISORS, RECENT_PAST_BOARD, SENIOR_ADVISORS,
} from '../data/board';

export const NEWS_CSV_URL: string = import.meta.env.VITE_NEWS_CSV_URL ?? '';
export const GALLERY_CSV_URL: string = import.meta.env.VITE_GALLERY_CSV_URL ?? '';
export const EVENTS_CSV_URL: string = import.meta.env.VITE_EVENTS_CSV_URL ?? '';
export const PROGRAMS_CSV_URL: string = import.meta.env.VITE_PROGRAMS_CSV_URL ?? '';
export const BOARD_CSV_URL: string = import.meta.env.VITE_BOARD_CSV_URL ?? '';

/** Small RFC 4180 CSV parser (quoted fields, escaped quotes, newlines in cells). */
export function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = '';
  let quoted = false;
  const src = text.replace(/^﻿/, '');
  for (let i = 0; i < src.length; i++) {
    const ch = src[i];
    if (quoted) {
      if (ch === '"') {
        if (src[i + 1] === '"') { cell += '"'; i++; } else quoted = false;
      } else cell += ch;
    } else if (ch === '"') quoted = true;
    else if (ch === ',') { row.push(cell); cell = ''; }
    else if (ch === '\n' || ch === '\r') {
      if (ch === '\r' && src[i + 1] === '\n') i++;
      row.push(cell); cell = '';
      rows.push(row); row = [];
    } else cell += ch;
  }
  if (cell !== '' || row.length) { row.push(cell); rows.push(row); }
  return rows;
}

function toObjects(csv: string): Record<string, string>[] {
  const rows = parseCsv(csv).filter((r) => r.some((c) => c.trim() !== ''));
  if (rows.length < 2) return [];
  const head = rows[0].map((h) => h.trim().toLowerCase());
  return rows.slice(1).map((r) => {
    const o: Record<string, string> = {};
    head.forEach((h, i) => { o[h] = (r[i] ?? '').trim(); });
    return o;
  });
}

const httpsOnly = (u: string) => (/^https:\/\//i.test(u) ? u : '');

/**
 * Turns a Google Drive share link into a direct image URL. Also accepts photos stored
 * with the site itself (a path such as /images/teej-2026.webp) and other https links.
 */
export function driveImageUrl(link: string): string {
  const v = link.trim();
  if (!v) return '';
  if (/^\/images\/[\w./-]+$/.test(v) && !v.includes('..')) return v;
  const id =
    v.match(/drive\.google\.com\/file\/d\/([\w-]+)/)?.[1] ??
    v.match(/drive\.google\.com\/(?:open|uc|thumbnail)\?(?:[^#]*&)?id=([\w-]+)/)?.[1] ??
    v.match(/docs\.google\.com\/[^?#]*\/d\/([\w-]+)/)?.[1];
  if (id) return `https://lh3.googleusercontent.com/d/${id}=w1400`;
  return httpsOnly(v);
}

/* ---------- News ---------- */

export interface NewsItem {
  id: string;
  date: string; // ISO yyyy-mm-dd, or '' if unknown
  title: string;
  summary: string;
  content: string;
  image: string;
  category: string;
  link: string;
}

function isoDate(v: string): string {
  if (!v) return '';
  const m = v.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/) ?? [];
  if (m.length) return `${m[1]}-${m[2].padStart(2, '0')}-${m[3].padStart(2, '0')}`;
  const us = v.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})/);
  if (us) return `${us[3]}-${us[1].padStart(2, '0')}-${us[2].padStart(2, '0')}`;
  const d = new Date(v);
  return Number.isNaN(d.getTime()) ? '' : d.toISOString().slice(0, 10);
}

export function parseNews(csv: string): NewsItem[] {
  return toObjects(csv)
    .filter((o) => o.title)
    // The "Published" tab only holds published rows, but if someone publishes the
    // Editor tab by mistake, still honour the flag when it is present.
    .filter((o) => !('published' in o) || o.published.toUpperCase() === 'TRUE')
    .map((o, i) => ({
      id: `${isoDate(o.date)}-${i}`,
      date: isoDate(o.date),
      title: o.title,
      summary: o.summary ?? '',
      content: o.content ?? '',
      image: driveImageUrl(o.image ?? ''),
      category: o.category ?? '',
      link: httpsOnly(o.link ?? ''),
    }))
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function formatNewsDate(iso: string): string {
  if (!iso) return '';
  const d = new Date(`${iso}T12:00:00`);
  return Number.isNaN(d.getTime())
    ? ''
    : d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

/* ---------- Gallery ---------- */

export interface SheetPhoto extends GalleryImage {
  album: string;
}

export function parseGallery(csv: string): SheetPhoto[] {
  return toObjects(csv)
    .filter((o) => !('published' in o) || o.published.toUpperCase() === 'TRUE')
    .map((o) => ({
      src: driveImageUrl(o['photo link'] ?? o.photo ?? ''),
      alt: o.caption || 'PNGA community photo',
      caption: o.caption ?? '',
      album: o.album ?? '',
    }))
    .filter((p) => p.src);
}

/* ---------- Events ---------- */

/** Accepts 14:30, 2:30 PM, 2:30:00 PM, 14:30:00 and returns 24-hour HH:MM, or '' if unreadable. */
function hhmm(v: string): string {
  const m = v.trim().match(/^(\d{1,2}):(\d{2})(?::\d{2})?\s*([AaPp][Mm])?$/);
  if (!m) return '';
  let h = Number(m[1]);
  const min = Number(m[2]);
  if (m[3]) {
    const pm = m[3].toLowerCase() === 'pm';
    if (h < 1 || h > 12) return '';
    h = (h % 12) + (pm ? 12 : 0);
  }
  if (h > 23 || min > 59) return '';
  return `${String(h).padStart(2, '0')}:${String(min).padStart(2, '0')}`;
}

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 40);

export function parseEvents(csv: string): CommunityEvent[] {
  return toObjects(csv)
    .filter((o) => !('published' in o) || o.published.toUpperCase() === 'TRUE')
    .map((o) => ({ o, date: isoDate(o.date) }))
    .filter(({ o, date }) => o.title && date)
    .map(({ o, date }, i) => ({
      id: `${date}-${slug(o.title) || i}`,
      title: o.title,
      date,
      startTime: hhmm(o['start time'] ?? '') || undefined,
      endTime: hhmm(o['end time'] ?? '') || undefined,
      location: o.location ?? '',
      address: o.address || undefined,
      description: o.description ?? '',
      category: o.category || 'Community',
      registrationUrl: httpsOnly(o['registration link'] ?? '') || undefined,
    }))
    .sort((a, b) => a.date.localeCompare(b.date) || (a.startTime ?? '').localeCompare(b.startTime ?? ''));
}

/* ---------- Board ---------- */

export interface BoardSection {
  title: string;
  /** Group is shown under "Past boards" (its name contains past, earlier or former). */
  past: boolean;
  people: BoardPerson[];
}

export interface BoardPerson {
  role: string;
  name: string;
  /** Short biography, paragraphs separated by line breaks. */
  bio?: string;
  /** Picture address (Google Drive link or /images path already converted for display). */
  photo?: string;
}

/** Groups people by the "Group" column, in the order groups first appear in the sheet. */
/** Spelling-tolerant key so "Keshab Bhandari" and "Roshan Shimkhada" still find the built-in bios. */
const nameKey = (n: string) =>
  n.toLowerCase().replace(/\b(dr|mr|mrs|ms)\b\.?/g, '').replace(/[^a-z]/g, '').replace(/sh/g, 's').replace(/v/g, 'b').replace(/(.)\1+/g, '$1');
const BIO_BY_KEY = new Map(Object.entries(BIOS).map(([n, b]) => [nameKey(n), b]));

export function parseBoard(csv: string): BoardSection[] {
  const sections: BoardSection[] = [];
  for (const o of toObjects(csv)) {
    if ('published' in o && o.published.toUpperCase() !== 'TRUE') continue;
    const title = (o.group ?? '').trim();
    const name = (o.name ?? '').trim();
    if (!title || !name) continue;
    let sec = sections.find((x) => x.title.toLowerCase() === title.toLowerCase());
    if (!sec) {
      sec = { title, past: /\b(past|earlier|former|previous)\b/i.test(title), people: [] };
      sections.push(sec);
    }
    // A Bio typed in the sheet wins; if the cell is empty, the built-in bio for that name is used so links never vanish.
    sec.people.push({ role: (o.role ?? '').trim(), name, bio: (o.bio ?? '').trim() || BIO_BY_KEY.get(nameKey(name)) || undefined, photo: driveImageUrl(o.photo ?? '') || undefined });
  }
  return sections;
}

const rows = (group: string, list: BoardPerson[]) => ({ title: group, past: /past|earlier/i.test(group), people: list });
const names = (group: string, list: string[]) => rows(group, list.map((name) => ({ role: '', name })));

/** Built-in board, used until the board sheet is set up. */
export const BOARD_FALLBACK: BoardSection[] = [
  rows('Current board of directors', CURRENT_BOARD),
  names('Senior advisor', SENIOR_ADVISORS),
  rows('Recent past board', RECENT_PAST_BOARD),
  names('Recent past advisor', RECENT_PAST_ADVISORS),
  rows('Earlier board', EARLIER_BOARD),
  names('Earlier advisors', EARLIER_ADVISORS),
];

/* ---------- Programs ---------- */

const ICON_NAMES: Program['icon'][] = ['HeartHandshake', 'GraduationCap', 'HeartPulse', 'Vote', 'ClipboardList', 'HandHeart'];

/**
 * One row per bullet point. Rows with the same Program belong together, in the order they appear.
 * Web address, Summary, Icon and Intro are read from the first row that fills them in.
 */
export function parsePrograms(csv: string): Program[] {
  const byTitle = new Map<string, { p: Program; secs: Map<string, ProgramSection> }>();
  const iconSet = new Set<string>();
  for (const o of toObjects(csv)) {
    if ('published' in o && o.published.toUpperCase() !== 'TRUE') continue;
    const title = (o.program ?? '').trim();
    if (!title) continue;
    const key = title.toLowerCase();
    let entry = byTitle.get(key);
    if (!entry) {
      entry = { p: { id: slug(title), title, summary: '', icon: 'HandHeart', intro: '', sections: [] }, secs: new Map() };
      byTitle.set(key, entry);
    }
    const { p, secs } = entry;
    const addr = slug(o['web address'] ?? '');
    if (addr && p.id === slug(title)) p.id = addr;
    if (!p.summary && o.summary) p.summary = o.summary.trim();
    if (!p.intro && o.intro) p.intro = o.intro.trim();
    const icon = ICON_NAMES.find((n) => n.toLowerCase() === (o.icon ?? '').trim().toLowerCase());
    if (icon && !iconSet.has(key)) { p.icon = icon; iconSet.add(key); }
    const item = (o.item ?? '').trim();
    if (item) {
      const heading = (o.section ?? '').trim() || 'What this includes';
      let sec = secs.get(heading.toLowerCase());
      if (!sec) { sec = { heading, items: [] }; secs.set(heading.toLowerCase(), sec); p.sections.push(sec); }
      sec.items.push(item);
      const note = (o.description ?? '').trim();
      if (note) (sec.notes ??= {})[item] = note;
    }
  }
  return [...byTitle.values()].map(({ p }) => p).filter((p) => p.sections.length > 0);
}

/* ---------- Loading ---------- */

function useSheet<T>(url: string, parse: (csv: string) => T, initial: T): T {
  const [data, setData] = useState<T>(initial);
  useEffect(() => {
    if (!url) return;
    const ctrl = new AbortController();
    fetch(url, { signal: ctrl.signal, cache: 'no-store' })
      .then((r) => (r.ok ? r.text() : Promise.reject(new Error(String(r.status)))))
      .then((csv) => setData(parse(csv)))
      .catch(() => { /* keep the build-time copy */ });
    return () => ctrl.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);
  return data;
}

const NEWS_SNAPSHOT = parseNews(snapshot.news);
const GALLERY_SNAPSHOT = parseGallery(snapshot.gallery);
const PROGRAMS_SNAPSHOT = parsePrograms((snapshot as { programs?: string }).programs ?? '');
const BOARD_SNAPSHOT = parseBoard((snapshot as { board?: string }).board ?? '');
const EVENTS_SNAPSHOT = parseEvents((snapshot as { events?: string }).events ?? '');

export function useNews(): NewsItem[] {
  return useSheet(NEWS_CSV_URL, parseNews, NEWS_SNAPSHOT);
}

/** Photos from the volunteer-edited sheet, or the built-in set if the sheet is empty or not set up. */
export function useGallery(): SheetPhoto[] {
  const fromSheet = useSheet(GALLERY_CSV_URL, parseGallery, GALLERY_SNAPSHOT);
  return fromSheet.length ? fromSheet : GALLERY_IMAGES.map((g) => ({ ...g, album: '' }));
}

/** Events from the volunteer-edited sheet, or the fallback list in data/events.ts if the sheet is empty or not set up. */
export function useEvents(): CommunityEvent[] {
  const fromSheet = useSheet(EVENTS_CSV_URL, parseEvents, EVENTS_SNAPSHOT);
  return fromSheet.length ? fromSheet : EVENTS;
}

/** Board members from the volunteer-edited sheet, or the built-in list if the sheet is empty or not set up. */
export function useBoard(): BoardSection[] {
  const fromSheet = useSheet(BOARD_CSV_URL, parseBoard, BOARD_SNAPSHOT);
  return fromSheet.length ? fromSheet : BOARD_FALLBACK;
}

/** Programs from the build-time copy of the sheet (or the built-in list). Used to decide which pages to pre-build. */
export const BUILD_PROGRAMS: Program[] = PROGRAMS_SNAPSHOT.length ? PROGRAMS_SNAPSHOT : PROGRAMS;

/** Programs from the volunteer-edited sheet, or the built-in list if the sheet is empty or not set up. */
export function usePrograms(): Program[] {
  const fromSheet = useSheet(PROGRAMS_CSV_URL, parsePrograms, PROGRAMS_SNAPSHOT);
  return fromSheet.length ? fromSheet : PROGRAMS;
}
