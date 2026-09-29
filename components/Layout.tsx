import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, ScrollRestoration, useLocation } from 'react-router-dom';
import { Facebook, Heart, Instagram, LifeBuoy, Mail, MapPin, Menu, Phone, Users, X, Youtube } from 'lucide-react';
import { NAV_LINKS, SITE, addressLine, mapsUrl, telHref } from '../lib/site';

function Banner() {
  const [open, setOpen] = useState(true);
  if (!SITE.announcement || !open) return null;
  return (
    <div role="region" aria-label="Community announcement" className="bg-gold text-slate-900">
      <div className="mx-auto flex max-w-7xl items-start justify-between gap-4 px-4 py-3 sm:px-6">
        <p className="font-semibold">
          <span className="sr-only">Announcement: </span>
          {SITE.announcement}
        </p>
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Dismiss announcement"
          className="-m-2 flex h-12 w-12 shrink-0 items-center justify-center rounded-full hover:bg-black/10"
        >
          <X size={22} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const { pathname, hash } = useLocation();

  useEffect(() => setOpen(false), [pathname]);
  // Jump to #section links (for example /news#newsletter) after the page has rendered.
  useEffect(() => {
    if (!hash) return;
    const t = window.setTimeout(() => document.getElementById(hash.slice(1))?.scrollIntoView({ block: 'start' }), 50);
    return () => window.clearTimeout(t);
  }, [pathname, hash]);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `whitespace-nowrap rounded-lg px-3 py-2 font-semibold hover:text-crimson ${isActive ? 'text-crimson underline underline-offset-8 decoration-2' : 'text-slate-800'}`;

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <Link to="/" className="flex items-center gap-3" aria-label={`${SITE.name}, home`}>
          <img src={SITE.logoUrl} alt="" width={48} height={48} className="h-12 w-12 rounded-full object-contain" />
          <span className="font-serif text-lg font-bold leading-tight text-navy">
            <span className="xl:hidden">{SITE.shortName}</span>
            <span className="hidden 2xl:inline">{SITE.name}</span>
          </span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 xl:flex">
          {NAV_LINKS.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.to === '/'} className={linkClass}>
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 xl:flex">
          <Link to="/help" className="btn btn-outline">
            <LifeBuoy size={20} aria-hidden="true" /> Need Help?
          </Link>
          <Link to="/donate" className="btn btn-primary">
            <Heart size={20} aria-hidden="true" /> Donate
          </Link>
        </div>

        <button
          type="button"
          className="btn btn-outline xl:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
          {open ? 'Close' : 'Menu'}
        </button>
      </div>

      {open && (
        <nav id="mobile-menu" aria-label="Main" className="border-t border-slate-200 bg-white xl:hidden">
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
                  {l.label}
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
  const social = [
    { href: SITE.social.facebook, label: 'PNGA on Facebook', Icon: Facebook },
    { href: SITE.social.instagram, label: 'PNGA on Instagram', Icon: Instagram },
    { href: SITE.social.youtube, label: 'PNGA on YouTube', Icon: Youtube },
    { href: SITE.social.facebookGroup, label: 'PNGA Facebook group', Icon: Users },
  ].filter((s) => s.href);

  return (
    <footer className="bg-slate-900 pb-28 pt-14 text-slate-200 xl:pb-14">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 md:grid-cols-3">
        <div className="space-y-3">
          <p className="font-serif text-2xl font-bold text-white">{SITE.name}</p>
          <p>{SITE.tagline}.</p>
          {SITE.taxExempt && <p className="text-sm text-slate-300">PNGA is a 501(c)(3) tax-exempt organization.{SITE.ein ? ` EIN ${SITE.ein}.` : ''}</p>}
          {!SITE.taxExempt && SITE.ein && <p className="text-sm text-slate-300">Tax ID (EIN): {SITE.ein}</p>}
        </div>

        <div className="space-y-3">
          <h2 className="font-sans text-lg font-bold text-white">Contact</h2>
          <p className="flex gap-2">
            <MapPin size={20} className="mt-1 shrink-0" aria-hidden="true" />
            <a href={mapsUrl} className="underline hover:text-white" target="_blank" rel="noopener noreferrer">
              {addressLine}
              <span className="sr-only"> (opens map in a new tab)</span>
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

        <nav aria-label="Footer" className="space-y-3">
          <h2 className="font-sans text-lg font-bold text-white">Quick links</h2>
          <ul className="grid gap-2">
            {[
              ['/help', 'Get help'],
              ['/events', 'Events'],
              ['/news', 'News'],
              ['/news#newsletter', 'Newsletter sign-up'],
              ['/unsubscribe', 'Unsubscribe'],
              ['/get-involved', 'Volunteer and membership'],
              ['/volunteer', 'Volunteer sign-up'],
              ['/waiver', 'Event waiver'],
              ['/photo-release', 'Photo release'],
              ['/donate', 'Donate'],
              ['/about/history', 'Our history'],
              ['/about/leadership', 'Board of directors'],
              ['/gallery', 'Photo gallery'],
              ['/privacy', 'Privacy policy'],
              ['/accessibility', 'Accessibility'],
              ['/terms', 'Terms of use'],
            ].map(([to, label]) => (
              <li key={to}>
                <Link to={to} className="inline-block py-1 underline hover:text-white">{label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <p className="mx-auto mt-10 max-w-7xl border-t border-white/10 px-4 pt-6 text-sm text-slate-300 sm:px-6">
        © {year} {SITE.name}. All rights reserved.
      </p>
    </footer>
  );
}

/** Two big buttons pinned to the bottom of phone screens. */
function MobileActionBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-3 border-t border-slate-200 bg-white p-3 shadow-[0_-4px_12px_rgba(0,0,0,0.08)] xl:hidden">
      <Link to="/help" className="btn btn-outline">
        <LifeBuoy size={20} aria-hidden="true" /> Need Help?
      </Link>
      <Link to="/donate" className="btn btn-primary">
        <Heart size={20} aria-hidden="true" /> Donate
      </Link>
    </div>
  );
}

export default function Layout() {
  return (
    <>
      <a href="#main" className="skip-link">Skip to main content</a>
      <Banner />
      <Header />
      <main id="main" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
      <MobileActionBar />
      <ScrollRestoration />
    </>
  );
}
