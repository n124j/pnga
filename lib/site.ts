// Single source of truth for the organization's public details.
// Change a value here (or in .env.local) and it updates everywhere:
// header, footer, contact page, structured data and the sitemap.

const env = import.meta.env;

const clean = (v: unknown): string => (typeof v === 'string' ? v.trim() : '');

export const SITE = {
  name: 'Pennsylvania Nepalese Guthi Association',
  shortName: 'PNGA',
  tagline: 'Supporting and empowering the Nepali community in Pennsylvania',
  slogan: 'Investing in Community to Spark Change for Social Justice',
  description:
    'PNGA is a Pennsylvania 501(c)(3) nonprofit empowering Nepali and South Asian immigrant families through education, health awareness, civic engagement and community support.',
  /** Public address of the site, no trailing slash. Empty until the domain is chosen. */
  url: clean(env.VITE_SITE_URL).replace(/\/+$/, ''),
  address: {
    street: '1000 Germantown Pike, B5',
    city: 'Plymouth Meeting',
    region: 'PA',
    zip: '19462',
  },
  email: clean(env.VITE_CONTACT_EMAIL),
  phone: clean(env.VITE_CONTACT_PHONE),
  social: {
    facebook: clean(env.VITE_FACEBOOK_URL),
    instagram: clean(env.VITE_INSTAGRAM_URL),
    youtube: clean(env.VITE_YOUTUBE_URL),
    /** Community Facebook group. Defaults to PNGA's group; set VITE_FACEBOOK_GROUP_URL to change it, or to "off" to hide it. */
    facebookGroup: ((v) => (v.toLowerCase() === 'off' ? '' : v || 'https://www.facebook.com/pa.nepaleseguthi.71'))(clean(env.VITE_FACEBOOK_GROUP_URL)),
  },
  ein: clean(env.VITE_EIN),
  donateUrl: clean(env.VITE_DONATE_URL),
  paypalUrl: clean(env.VITE_PAYPAL_URL),
  /** Email address or phone number registered for Zelle. */
  zelle: clean(env.VITE_ZELLE_ID),
  /** Picture of PNGA's Zelle QR code, saved in public/images (for example /images/zelle-qr.png). Made in your bank's app. */
  zelleQr: clean(env.VITE_ZELLE_QR_IMAGE),
  /** Set VITE_WAIVERS_APPROVED=true only after the board has approved the waiver, volunteer and photo-release wording in data/agreements.ts. */
  waiversApproved: clean(env.VITE_WAIVERS_APPROVED).toLowerCase() === 'true',
  /** Set VITE_TAX_EXEMPT=true only once PNGA holds an IRS determination letter for 501(c)(3) status. */
  taxExempt: clean(env.VITE_TAX_EXEMPT).toLowerCase() === 'true',
  /** Set VITE_PA_CHARITY_REGISTERED=true only if PNGA is registered with the Pennsylvania Department of State. */
  paRegistered: clean(env.VITE_PA_CHARITY_REGISTERED).toLowerCase() === 'true',
  /** Short notice shown at the top of every page. Leave empty to hide it. */
  announcement: '',
  logoUrl: '/logo.png',
} as const;

export const addressLine = `${SITE.address.street}, ${SITE.address.city}, ${SITE.address.region} ${SITE.address.zip}`;
export const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(addressLine)}`;
export const telHref = SITE.phone ? `tel:${SITE.phone.replace(/[^+\d]/g, '')}` : '';

export const absoluteUrl = (path: string): string => (SITE.url ? `${SITE.url}${path}` : '');

export const NAV_LINKS = [
  { to: '/', label: 'Home', key: 'nav.home' },
  { to: '/programs', label: 'Programs', key: 'nav.programs' },
  { to: '/events', label: 'Events', key: 'nav.events' },
  { to: '/news', label: 'News', key: 'nav.news' },
  { to: '/about', label: 'About', key: 'nav.about' },
  { to: '/get-involved', label: 'Get Involved', key: 'nav.involved' },
  { to: '/contact', label: 'Contact', key: 'nav.contact' },
] as const;
