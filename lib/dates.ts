// Date and time wording for English and Nepali. Written by hand (not Intl) so the built page and the
// visitor's browser always produce exactly the same text.
import type { Lang } from './i18n';

const MONTHS = ['जनवरी', 'फेब्रुअरी', 'मार्च', 'अप्रिल', 'मे', 'जुन', 'जुलाई', 'अगस्ट', 'सेप्टेम्बर', 'अक्टोबर', 'नोभेम्बर', 'डिसेम्बर'];
const DAYS = ['आइतबार', 'सोमबार', 'मङ्गलबार', 'बुधबार', 'बिहीबार', 'शुक्रबार', 'शनिबार'];

/** Western digits to Devanagari digits (2026 becomes २०२६). */
export const devanagari = (s: string | number): string => String(s).replace(/\d/g, (d) => '०१२३४५६७८९'[Number(d)]);

/** y, m (1-12), d. Includes the weekday when asked. */
export function formatDay(lang: Lang, y: number, m: number, d: number, weekday: boolean): string {
  if (lang === 'ne') {
    const date = new Date(Date.UTC(y, m - 1, d));
    const base = `${devanagari(d)} ${MONTHS[m - 1]} ${devanagari(y)}`;
    return weekday ? `${DAYS[date.getUTCDay()]}, ${base}` : base;
  }
  return new Date(y, m - 1, d).toLocaleDateString('en-US', {
    ...(weekday ? { weekday: 'long' as const } : {}),
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

/** hh:mm in 24-hour form. Nepali gets a part-of-day word (बिहान, दिउँसो, साँझ, राति). */
export function formatTime(lang: Lang, hhmm?: string): string {
  if (!hhmm) return '';
  const [h, min] = hhmm.split(':').map(Number);
  if (lang === 'ne') {
    const part = h < 12 ? 'बिहान' : h < 17 ? 'दिउँसो' : h < 20 ? 'साँझ' : 'राति';
    const h12 = h % 12 === 0 ? 12 : h % 12;
    return `${part} ${devanagari(`${h12}:${String(min).padStart(2, '0')}`)}`;
  }
  return new Date(2000, 0, 1, h, min).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
}

export function formatTimeRange(lang: Lang, start?: string, end?: string): string {
  if (!start) return '';
  const range = end ? `${formatTime(lang, start)} – ${formatTime(lang, end)}` : formatTime(lang, start);
  return lang === 'ne' ? `${range} बजे` : range;
}

/** Common English category words shown in Nepali. Anything else is shown as typed in the sheet. */
const CATEGORY_NE: Record<string, string> = {
  community: 'सामुदायिक', festival: 'चाडपर्व', meeting: 'बैठक', health: 'स्वास्थ्य', education: 'शिक्षा',
  culture: 'संस्कृति', cultural: 'सांस्कृतिक', volunteer: 'स्वयंसेवा', fundraiser: 'कोष सङ्कलन',
  announcement: 'सूचना', event: 'आयोजना', celebration: 'उत्सव', training: 'तालिम', sports: 'खेलकुद',
  youth: 'युवा', news: 'समाचार', update: 'अद्यावधिक', general: 'सामान्य', civic: 'नागरिक',
};
export const categoryLabel = (lang: Lang, c: string): string =>
  lang === 'ne' ? CATEGORY_NE[c.trim().toLowerCase()] ?? c : c;

/** Board titles and group names that appear in the built-in board list, shown in Nepali. Sheet rows can override with the "(Nepali)" columns. */
const ROLE_NE: Record<string, string> = {
  'president': 'अध्यक्ष', 'vice president': 'उपाध्यक्ष', 'executive director': 'कार्यकारी निर्देशक',
  'executive director (pro bono)': 'कार्यकारी निर्देशक (निःशुल्क सेवा)', 'secretary': 'सचिव', 'treasurer': 'कोषाध्यक्ष',
  'joint secretary / treasurer': 'सह-सचिव / कोषाध्यक्ष', 'member': 'सदस्य',
  'executive director (since april 2022)': 'कार्यकारी निर्देशक (अप्रिल २०२२ देखि)',
};
const GROUP_NE: Record<string, string> = {
  'current board of directors': 'हालको सञ्चालक समिति', 'senior advisor': 'वरिष्ठ सल्लाहकार',
  'recent past board': 'हालैका पूर्व सञ्चालक समिति', 'recent past advisor': 'हालैका पूर्व सल्लाहकार',
  'earlier board': 'अघिल्ला सञ्चालक समिति', 'earlier advisors': 'अघिल्ला सल्लाहकारहरू',
};
export const roleLabel = (lang: Lang, role: string, roleNe?: string): string =>
  lang === 'ne' ? roleNe?.trim() || ROLE_NE[role.trim().toLowerCase()] || role : role;
export const groupLabel = (lang: Lang, group: string, groupNe?: string): string =>
  lang === 'ne' ? groupNe?.trim() || GROUP_NE[group.trim().toLowerCase()] || group : group;
