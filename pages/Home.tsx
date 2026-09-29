import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, HandHeart, Heart, LifeBuoy, Users } from 'lucide-react';
import Seo, { organizationJsonLd } from '../components/Seo';
import EventList from '../components/EventList';
import NewsCard from '../components/NewsCard';
import NewsletterSignup from '../components/NewsletterSignup';
import FacebookGroupCard from '../components/FacebookGroupCard';
import { useNews, usePrograms } from '../lib/sheets';
import ProgramIcon from '../components/ProgramIcon';
import { GALLERY_IMAGES } from '../data/gallery';
import { SITE } from '../lib/site';

const QUICK = [
  { to: '/help', label: 'Get Help', text: 'Ask for support or find a trusted service', Icon: LifeBuoy, style: 'bg-crimson text-white hover:bg-crimson-dark' },
  { to: '/events', label: 'Upcoming Events', text: 'Festivals, meetings and gatherings', Icon: Calendar, style: 'bg-navy text-white hover:bg-navy-dark' },
  { to: '/get-involved', label: 'Volunteer or Join', text: 'Give your time and skills', Icon: HandHeart, style: 'bg-white text-navy border-2 border-navy hover:bg-slate-100' },
  { to: '/donate', label: 'Donate', text: 'Support families in our community', Icon: Heart, style: 'bg-white text-crimson-dark border-2 border-crimson hover:bg-slate-100' },
];

export default function Home() {
  const news = useNews().slice(0, 3);
  const programs = usePrograms();
  return (
    <>
      <Seo path="/" jsonLd={[organizationJsonLd()]} />

      {/* 1. Who we are + the four things people come here to do */}
      <section aria-labelledby="hero-title">
        <div className="bg-navy text-white">
          <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-10 sm:px-6 md:py-16 lg:grid-cols-2">
            <div>
              <img src={SITE.logoUrl} alt="" width={96} height={96} className="mb-5 h-24 w-24 rounded-full" />
              <h1 id="hero-title" className="text-4xl font-bold md:text-6xl">{SITE.name}</h1>
              <p className="mt-4 font-serif text-2xl font-semibold text-sky md:text-3xl">{SITE.slogan}</p>
              <p className="mt-5 text-xl text-slate-100">
                We support and empower Nepali and South Asian families in Pennsylvania through community
                empowerment, capacity building, civic engagement and advocacy.
              </p>
            </div>
            <div className="overflow-hidden rounded-3xl shadow-xl">
              <img
                src={GALLERY_IMAGES[5].src}
                alt={GALLERY_IMAGES[5].alt}
                width={1358}
                height={762}
                fetchPriority="high"
                className="aspect-[16/10] w-full object-cover"
              />
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {QUICK.map(({ to, label, text, Icon, style }) => (
              <li key={to}>
                <Link to={to} className={`flex h-full flex-col gap-2 rounded-2xl p-6 transition-colors ${style}`}>
                  <Icon size={32} aria-hidden="true" />
                  <span className="text-2xl font-bold font-serif">{label}</span>
                  <span className="opacity-95">{text}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 2. What is happening */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6" aria-labelledby="events-title">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <h2 id="events-title" className="text-3xl font-bold text-navy md:text-4xl">Coming up</h2>
          <Link to="/events" className="inline-flex items-center gap-1 font-bold text-navy underline">
            All events <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
        <EventList limit={3} />
      </section>

      {news.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 pb-14 sm:px-6" aria-labelledby="news-title">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <h2 id="news-title" className="text-3xl font-bold text-navy md:text-4xl">Latest news</h2>
            <Link to="/news" className="inline-flex items-center gap-1 font-bold text-navy underline">
              All news <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
          <ul className="grid gap-6 md:grid-cols-3">
            {news.map((item) => <NewsCard key={item.id} item={item} compact />)}
          </ul>
        </section>
      )}

      <section className="mx-auto grid max-w-7xl gap-6 px-4 pb-14 sm:px-6 lg:grid-cols-2" aria-label="Stay connected">
        <NewsletterSignup id="home-newsletter" />
        <FacebookGroupCard />
      </section>

      {/* 3. What we do */}
      <section className="bg-white py-14" aria-labelledby="programs-title">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 id="programs-title" className="text-3xl font-bold text-navy md:text-4xl">What we do</h2>
          <p className="mt-3 max-w-3xl text-xl text-slate-700">
            Areas of work for Nepali and South Asian families.
          </p>
          <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {programs.map((p) => (
              <li key={p.id}>
                <Link
                  to={`/programs/${p.id}`}
                  className="flex h-full flex-col rounded-2xl border border-slate-200 bg-slate-50 p-6 transition-shadow hover:shadow-lg"
                >
                  <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-navy/10 text-navy">
                    <ProgramIcon name={p.icon} />
                  </span>
                  <span className="text-2xl font-bold font-serif text-navy">{p.title}</span>
                  <span className="mt-2 flex-grow text-slate-700">{p.summary}</span>
                  <span className="mt-4 inline-flex items-center gap-1 font-bold text-crimson-dark">
                    Learn more <ArrowRight size={18} aria-hidden="true" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 4. Need help band */}
      <section className="bg-navy text-white" aria-labelledby="help-title">
        <div className="mx-auto grid max-w-7xl items-center gap-6 px-4 py-14 sm:px-6 md:grid-cols-[1fr_auto]">
          <div>
            <h2 id="help-title" className="text-3xl font-bold md:text-4xl">New to Pennsylvania, or need a hand?</h2>
            <p className="mt-3 max-w-3xl text-xl text-slate-100">
              Tell us what you need, in English or Nepali. Our volunteers will reply, or point you to a trusted service
              that can help.
            </p>
          </div>
          <Link to="/help" className="btn btn-light text-lg">
            <LifeBuoy size={22} aria-hidden="true" /> Get help
          </Link>
        </div>
      </section>

      {/* 5. Get involved + donate */}
      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-14 sm:px-6 md:grid-cols-2" aria-label="Ways to take part">
        <div className="rounded-3xl border border-slate-200 bg-white p-8">
          <Users size={36} className="text-navy" aria-hidden="true" />
          <h2 className="mt-4 text-3xl font-bold text-navy">Take part</h2>
          <p className="mt-3 text-lg text-slate-700">
            Help at events, teach, translate, or support newcomers and neighbors. Every volunteer makes a difference.
          </p>
          <Link to="/get-involved" className="btn btn-navy mt-6">Volunteer or join</Link>
        </div>
        <div className="rounded-3xl bg-crimson p-8 text-white">
          <Heart size={36} aria-hidden="true" />
          <h2 className="mt-4 text-3xl font-bold">Support our work</h2>
          <p className="mt-3 text-lg">
            Gifts help PNGA run community programs for Nepali families in Pennsylvania.
          </p>
          <Link to="/donate" className="btn btn-light mt-6">Ways to give</Link>
        </div>
      </section>
    </>
  );
}
