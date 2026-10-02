// Nepali / English support. The language comes from the address: anything under /ne is Nepali.
// Links written as <Link to="/events"> automatically become /ne/events on Nepali pages.
import { forwardRef, type ComponentProps } from 'react';
import { Link as RouterLink, NavLink as RouterNavLink, useLocation } from 'react-router-dom';
import { en, type Key } from '../locales/en';
import { ne } from '../locales/ne';

export type Lang = 'en' | 'ne';
export type { Key };

const DICT: Record<Lang, Record<Key, string>> = { en, ne };

export const langOf = (pathname: string): Lang => (pathname === '/ne' || pathname.startsWith('/ne/') ? 'ne' : 'en');

/** "/ne/events" becomes "/events"; "/ne" becomes "/". English paths are unchanged. */
export const stripLang = (pathname: string): string =>
  pathname === '/ne' ? '/' : pathname.startsWith('/ne/') ? pathname.slice(3) : pathname;

/** Adds the /ne prefix to a site-internal path when the page is Nepali. */
export function localize(to: string, lang: Lang): string {
  if (lang !== 'ne' || !to.startsWith('/') || to.startsWith('//')) return to;
  if (/^\/ne(\/|\?|#|$)/.test(to)) return to;
  return to === '/' ? '/ne' : `/ne${to}`;
}

/** The same page in the other language, keeping any ?search and #section. */
export function otherLangPath(pathname: string, search: string, hash: string): { lang: Lang; to: string } {
  const lang = langOf(pathname);
  const logical = stripLang(pathname).replace(/(.)\/+$/, '$1');
  const target: Lang = lang === 'ne' ? 'en' : 'ne';
  return { lang: target, to: `${localize(logical, target)}${search}${hash}` };
}

const TRANSLATED = [
  '/', '/about', '/about/history', '/about/leadership', '/programs', '/events', '/news', '/donate', '/contact', '/404',
  '/help', '/get-involved', '/gallery', '/volunteer', '/waiver', '/photo-release', '/unsubscribe',
  '/privacy', '/terms', '/accessibility',
];

/** Pages that have a Nepali version. Other /ne pages show English with a notice, and are kept out of search results. */
export function isTranslated(logicalPath: string): boolean {
  const p = logicalPath.replace(/(.)\/+$/, '$1');
  return TRANSLATED.includes(p) || p.startsWith('/programs/');
}

export function translate(lang: Lang, key: Key, params?: Record<string, string | number>): string {
  let s = DICT[lang][key] ?? en[key];
  if (params) for (const [k, v] of Object.entries(params)) s = s.split(`{${k}}`).join(String(v));
  return s;
}

export function useLang(): Lang {
  return langOf(useLocation().pathname);
}

export type TFn = (key: Key, params?: Record<string, string | number>) => string;

/** const { t, lang } = useI18n();  t('nav.home') */
export function useI18n(): { lang: Lang; t: TFn } {
  const lang = useLang();
  return { lang, t: (key, params) => translate(lang, key, params) };
}

/** Picks the Nepali text on Nepali pages when one was provided (for example from a sheet), otherwise the English. */
export const pick = (lang: Lang, english: string, nepali?: string): string => (lang === 'ne' && nepali?.trim() ? nepali : english);

export const Link = forwardRef<HTMLAnchorElement, ComponentProps<typeof RouterLink>>(function Link({ to, ...props }, ref) {
  const lang = useLang();
  return <RouterLink ref={ref} to={typeof to === 'string' ? localize(to, lang) : to} {...props} />;
});

export const NavLink = forwardRef<HTMLAnchorElement, ComponentProps<typeof RouterNavLink>>(function NavLink({ to, ...props }, ref) {
  const lang = useLang();
  return <RouterNavLink ref={ref} to={typeof to === 'string' ? localize(to, lang) : to} {...props} />;
});
