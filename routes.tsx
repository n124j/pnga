import type { RouteRecord } from 'vite-react-ssg';
import Layout from './components/Layout';
import Home from './pages/Home';
import Help from './pages/Help';
import Events from './pages/Events';
import News from './pages/News';
import Unsubscribe from './pages/Unsubscribe';
import Waiver from './pages/Waiver';
import Volunteer from './pages/Volunteer';
import PhotoRelease from './pages/PhotoRelease';
import Programs from './pages/Programs';
import ProgramDetail from './pages/ProgramDetail';
import About from './pages/About';
import Leadership from './pages/Leadership';
import History from './pages/History';
import GetInvolved from './pages/GetInvolved';
import Donate from './pages/Donate';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import { Accessibility, Privacy, Terms } from './pages/Legal';
import { BUILD_PROGRAMS } from './lib/sheets';

/** The page list. It is used twice: once for English (/) and once for Nepali (/ne). */
const pages = (): RouteRecord[] => [
  { index: true, Component: Home },
  { path: 'help', Component: Help },
  { path: 'events', Component: Events },
  { path: 'news', Component: News },
  { path: 'unsubscribe', Component: Unsubscribe },
  { path: 'waiver', Component: Waiver },
  { path: 'volunteer', Component: Volunteer },
  { path: 'photo-release', Component: PhotoRelease },
  { path: 'programs', Component: Programs },
  {
    path: 'programs/:id',
    Component: ProgramDetail,
    getStaticPaths: () => BUILD_PROGRAMS.map((p) => `programs/${p.id}`),
  },
  { path: 'about', Component: About },
  { path: 'about/history', Component: History },
  { path: 'about/leadership', Component: Leadership },
  { path: 'get-involved', Component: GetInvolved },
  { path: 'donate', Component: Donate },
  { path: 'gallery', Component: Gallery },
  { path: 'contact', Component: Contact },
  { path: 'privacy', Component: Privacy },
  { path: 'terms', Component: Terms },
  { path: 'accessibility', Component: Accessibility },
  { path: '404', Component: NotFound },
  { path: '*', Component: NotFound },
];

export const routes: RouteRecord[] = [
  { path: '/', Component: Layout, children: pages() },
  // Nepali site: the same pages under /ne. Language is read from the address (see lib/i18n.tsx).
  { path: '/ne', Component: Layout, children: pages() },
];

/** Every page that should appear in the sitemap. Kept next to the routes so they stay in sync. */
export const SITEMAP_PATHS = [
  '/', '/help', '/events', '/news', '/programs', ...BUILD_PROGRAMS.map((p) => `/programs/${p.id}`),
  '/about', '/about/history', '/about/leadership', '/get-involved', '/donate', '/gallery', '/contact',
  '/privacy', '/terms', '/accessibility',
];
