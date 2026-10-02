import { useEffect, useState } from 'react';
import { Link as RouterLink, Outlet, ScrollRestoration, useLocation, useNavigate } from 'react-router-dom';
import { Facebook, Heart, Instagram, Languages, LifeBuoy, Mail, MapPin, Menu, Phone, Users, X, Youtube } from 'lucide-react';
import { NAV_LINKS, SITE, addressLine, mapsUrl, telHref } from '../lib/site';
import { Link, NavLink, isTranslated, otherLangPath, stripLang, useI18n } from '../lib/i18n';

export const LANG_STORAGE_KEY = 'pnga-lang';

function Banner() {
  const [open, setOpen] = useState(true);
  const { t } = useI18n();
  if (!SITE.announcement || !open) return null;
  return (
    <div role="region" aria-label={t('announce.region')} className="bg-gold text-slate-900">
      <div className="mx-auto flex max-w-7xl items-start justify-between gap-4 px-4 py-3 sm:px-6">
        <p className="font-semibold">
          <span className="sr-only">{t('announce.prefix')}</span>
          {SITE.announcement}
        </p>
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label={t('announce.dismiss')}
          className="-m-2 flex h-12 w-12 shrink-0 items-center justify-center rounded-full hover:bg-black/10"
        >
          <X size={22} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

/** One button that opens the same page in the other language, and remembers the choice. */
function LanguageSwitch() {
  const { pathname, search, hash } = useLocation();
  const { t } = useI18n();
  const { lang, to } = otherLangPath(pathname, search, hash);
  return (
    <RouterLink
      to={to}
      lang={lang}
      hrefLang={lang}
      aria-label={t('lang.otherAria')}
      onClick={() => {
        try { localStorage.setItem(LANG_STORAGE_KEY, lang); } catch { /* private mode: the choice just isn't remembered */ }
      }}
      className="btn btn-outline !px-3"
    >
      <Languages size={20} aria-hidden="true" />
      <span lang={lang}>{t('lang.other')}</span>
    </RouterLink>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const { pathname, hash } = useLocation();
  const { t, lang } = useI18n();

  useEffect(() => setOpen(false), [pathname]);
  // Jump to #section links (for example /news#newsletter) after the page has rendered.
  useEffect(() => {
    if (!hash) return;
    const timer = window.setTimeout(() => document.getElementById(hash.slice(1))?.scrollIntoView({ block: 'start' }), 50);
    return () => window.clearTimeout(timer);
  }, [pathname, hash]);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `whitespace-nowrap rounded-lg ${lang === 'ne' ? 'px-2' : 'px-3'} py-2 font-semibold hover:text-crimson ${isActive ? 'text-crimson underline underline-offset-8 decoration-2' : 'text-slate-800'}`;

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <Link to="/" className="flex items-center gap-3" aria-label={t('header.home', { name: t('site.name') })}>
          <img src={SITE.logoUrl} alt="" width={48} height={48} className="h-12 w-12 rounded-full object-contain" />
          <span className="font-serif text-lg font-bold leading-tight text-navy">
            {/* The Nepali name is long and the Nepali menu is wider, so Nepali pages show just "PNGA" here (the full name is in the page and footer). */}
            <span className={lang === 'ne' ? '' : 'xl:hidden'}>{SITE.shortName}</span>
            {lang !== 'ne' && <span className="hidden 2xl:inline">{t('site.name')}</span>}
          </span>
        </Link>

        <nav aria-label={t('header.main')} className="hidden shrink-0 items-center gap-1 xl:flex">
          {NAV_LINKS.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.to === '/'} className={linkClass}>
              {t(l.key)}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <LanguageSwitch />
          <div className="hidden items-center gap-3 xl:flex">
            <Link to="/help" className="btn btn-outline">
              <LifeBuoy size={20} aria-hidden="true" /> {t('header.help')}
            </Link>
            <Link to="/donate" className="btn btn-primary">
              <Heart size={20} aria-hidden="true" /> {t('header.donate')}
            </Link>
          </div>
          <button
            type="button"
            className="btn btn-outline !px-3 xl:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
            {open ? t('header.close') : t('header.menu')}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-menu" aria-label={t('header.main')} className="border-t border-slate-200 bg-white xl:hidden">
          <ul className="mx-auto max-w-7xl px-4 py-2 sm:px-6">
            {NAV_LINKS.map((l) => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  end={l.to === '/'}
                  className={({ isActive }) =>
                    `block rounded-lg px-3 py-4 text-lg font-semibold ${isActive ? 'bg-slate-100 text-crimson' : 'text-slate-800'}`
                  }
                >
                  {t(l.key)}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}

function Footer() {
  const year = new Date().getFullYear();
  const { t } = useI18n();
  const social = [
    { href: SITE.social.facebook, label: t('social.facebook'), Icon: Facebook },
    { href: SITE.social.instagram, label: t('social.instagram'), Icon: Instagram },
    { href: SITE.social.youtube, label: t('social.youtube'), Icon: Youtube },
    { href: SITE.social.facebookGroup, label: t('social.group'), Icon: Users },
  ].filter((s) => s.href);

  const links: [string, Parameters<typeof t>[0]][] = [
    ['/help', 'fl.help'],
    ['/events', 'fl.events'],
    ['/news', 'fl.news'],
    ['/news#newsletter', 'fl.newsletter'],
    ['/unsubscribe', 'fl.unsub'],
    ['/get-involved', 'fl.involved'],
    ['/volunteer', 'fl.volunteer'],
    ['/waiver', 'fl.waiver'],
    ['/photo-release', 'fl.photo'],
    ['/donate', 'fl.donate'],
    ['/about/history', 'fl.history'],
    ['/about/leadership', 'fl.board'],
    ['/gallery', 'fl.gallery'],
    ['/privacy', 'fl.privacy'],
    ['/accessibility', 'fl.access'],
    ['/terms', 'fl.terms'],
  ];

  return (
    <footer className="bg-slate-900 pb-28 pt-14 text-slate-200 xl:pb-14">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 md:grid-cols-3">
        <div className="space-y-3">
          <p className="font-serif text-2xl font-bold text-white">{t('site.name')}</p>
          <p>{t('site.tagline')}.</p>
          {SITE.taxExempt && (
            <p className="text-sm text-slate-300">
              {t('footer.taxExempt')}
              {SITE.ein ? t('footer.ein', { ein: SITE.ein }) : ''}
            </p>
          )}
          {!SITE.taxExempt && SITE.ein && <p className="text-sm text-slate-300">{t('footer.einOnly', { ein: SITE.ein })}</p>}
        </div>

        <div className="space-y-3">
          <h2 className="font-sans text-lg font-bold text-white">{t('footer.contact')}</h2>
          <p className="flex gap-2">
            <MapPin size={20} className="mt-1 shrink-0" aria-hidden="true" />
            <a href={mapsUrl} className="underline hover:text-white" target="_blank" rel="noopener noreferrer">
              {addressLine}
              <span className="sr-only">{t('common.mapTab')}</span>
            </a>
          </p>
          {SITE.phone && (
            <p className="flex gap-2">
              <Phone size={20} className="mt-1 shrink-0" aria-hidden="true" />
              <a href={telHref} className="underline hover:text-white">{SITE.phone}</a>
            </p>
          )}
          {SITE.email && (
            <p className="flex gap-2">
              <Mail size={20} className="mt-1 shrink-0" aria-hidden="true" />
              <a href={`mailto:${SITE.email}`} className="underline hover:text-white">{SITE.email}</a>
            </p>
          )}
          {social.length > 0 && (
            <ul className="flex gap-3 pt-2">
              {social.map(({ href, label, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    aria-label={label}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-500 hover:bg-white hover:text-navy"
                  >
                    <Icon size={22} aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        <nav aria-label={t('footer.nav')} className="space-y-3">
          <h2 className="font-sans text-lg font-bold text-white">{t('footer.quick')}</h2>
          <ul className="grid gap-2">
            {links.map(([to, key]) => (
              <li key={to}>
                <Link to={to} className="inline-block py-1 underline hover:text-white">{t(key)}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <p className="mx-auto mt-10 max-w-7xl border-t border-white/10 px-4 pt-6 text-sm text-slate-300 sm:px-6">
        {t('footer.copy', { year, name: t('site.name') })}
      </p>
    </footer>
  );
}

/** Two big buttons pinned to the bottom of phone screens. */
function MobileActionBar() {
  const { t } = useI18n();
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-3 border-t border-slate-200 bg-white p-3 shadow-[0_-4px_12px_rgba(0,0,0,0.08)] xl:hidden">
      <Link to="/help" className="btn btn-outline">
        <LifeBuoy size={20} aria-hidden="true" /> {t('header.help')}
      </Link>
      <Link to="/donate" className="btn btn-primary">
        <Heart size={20} aria-hidden="true" /> {t('header.donate')}
      </Link>
    </div>
  );
}

/** Shown on Nepali addresses whose page is not translated yet. */
function UntranslatedNotice() {
  const { pathname, search, hash } = useLocation();
  const { lang, t } = useI18n();
  if (lang !== 'ne' || isTranslated(stripLang(pathname))) return null;
  const { to } = otherLangPath(pathname, search, hash);
  return (
    <div role="note" className="border-b border-amber-300 bg-amber-50 text-amber-950">
      <p className="mx-auto max-w-7xl px-4 py-3 sm:px-6">
        {t('notice.untranslated')}{' '}
        <RouterLink to={to} className="font-bold underline">
          {t('notice.english')}
        </RouterLink>
      </p>
    </div>
  );
}

export default function Layout() {
  const { pathname, search, hash } = useLocation();
  const navigate = useNavigate();
  const { lang, t } = useI18n();

  // Keep <html lang> right when the visitor switches language without a full page load.
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  // A visitor who chose Nepali before is taken to the Nepali home page when they open the English one.
  useEffect(() => {
    try {
      if (pathname === '/' && localStorage.getItem(LANG_STORAGE_KEY) === 'ne') navigate(`/ne${search}${hash}`, { replace: true });
    } catch { /* storage blocked: stay on English */ }
    // only on the first load
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <a href="#main" className="skip-link">{t('skip')}</a>
      <Banner />
      <Header />
      <UntranslatedNotice />
      <main id="main" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
      <MobileActionBar />
      <ScrollRestoration />
    </>
  );
}
