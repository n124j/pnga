import { Link, pick, useI18n } from '../lib/i18n';
import { ArrowRight, Calendar, HandHeart, Heart, LifeBuoy, Users } from 'lucide-react';
import Seo, { organizationJsonLd } from '../components/Seo';
import EventList from '../components/EventList';
import NewsCard from '../components/NewsCard';
import NewsletterSignup from '../components/NewsletterSignup';
import FacebookGroupCard from '../components/FacebookGroupCard';
import { useHeroSlides, useNews, usePrograms } from '../lib/sheets';
import ProgramIcon from '../components/ProgramIcon';
import HeroSlideshow from '../components/HeroSlideshow';
import { SITE } from '../lib/site';

const QUICK = [
  { to: '/help', label: 'home.quick.help', text: 'home.quick.helpText', Icon: LifeBuoy, style: 'bg-crimson text-white hover:bg-crimson-dark' },
  { to: '/events', label: 'home.quick.events', text: 'home.quick.eventsText', Icon: Calendar, style: 'bg-navy text-white hover:bg-navy-dark' },
  { to: '/get-involved', label: 'home.quick.involved', text: 'home.quick.involvedText', Icon: HandHeart, style: 'bg-white text-navy border-2 border-navy hover:bg-slate-100' },
  { to: '/donate', label: 'home.quick.donate', text: 'home.quick.donateText', Icon: Heart, style: 'bg-white text-crimson-dark border-2 border-crimson hover:bg-slate-100' },
] as const;

export default function Home() {
  const { lang, t } = useI18n();
  const news = useNews().slice(0, 3);
  const programs = usePrograms();
  const heroSlides = useHeroSlides();
  return (
    <>
      <Seo path="/" jsonLd={[organizationJsonLd()]} />

      {/* 1. Who we are + the four things people come here to do */}
      <section aria-labelledby="hero-title">
        <div className="bg-navy text-white">
          <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-10 sm:px-6 md:py-16 lg:grid-cols-2">
            <div>
              <img src={SITE.logoUrl} alt="" width={96} height={96} className="mb-5 h-24 w-24 rounded-full" />
              <h1 id="hero-title" className="text-4xl font-bold md:text-6xl">{t('site.name')}</h1>
              <p className="mt-4 font-serif text-2xl font-semibold text-sky md:text-3xl">{t('site.slogan')}</p>
              <p className="mt-5 text-xl text-slate-100">
                {t('home.intro')}
              </p>
            </div>
            <HeroSlideshow slides={heroSlides} />
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {QUICK.map(({ to, label, text, Icon, style }) => (
              <li key={to}>
                <Link to={to} className={`flex h-full flex-col gap-2 rounded-2xl p-6 transition-colors ${style}`}>
                  <Icon size={32} aria-hidden="true" />
                  <span className="text-2xl font-bold font-serif">{t(label)}</span>
                  <span className="opacity-95">{t(text)}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 2. What is happening */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6" aria-labelledby="events-title">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <h2 id="events-title" className="text-3xl font-bold text-navy md:text-4xl">{t('home.coming')}</h2>
          <Link to="/events" className="inline-flex items-center gap-1 font-bold text-navy underline">
            {t('home.allEvents')} <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
        <EventList limit={3} />
      </section>

      {news.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 pb-14 sm:px-6" aria-labelledby="news-title">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <h2 id="news-title" className="text-3xl font-bold text-navy md:text-4xl">{t('home.latest')}</h2>
            <Link to="/news" className="inline-flex items-center gap-1 font-bold text-navy underline">
              {t('home.allNews')} <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
          <ul className="grid gap-6 md:grid-cols-3">
            {news.map((item) => <NewsCard key={item.id} item={item} compact />)}
          </ul>
        </section>
      )}

      <section className="mx-auto grid max-w-7xl gap-6 px-4 pb-14 sm:px-6 lg:grid-cols-2" aria-label={t('home.stay')}>
        <NewsletterSignup id="home-newsletter" />
        <FacebookGroupCard />
      </section>

      {/* 3. What we do */}
      <section className="bg-white py-14" aria-labelledby="programs-title">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 id="programs-title" className="text-3xl font-bold text-navy md:text-4xl">{t('home.whatWeDo')}</h2>
          <p className="mt-3 max-w-3xl text-xl text-slate-700">
            {t('home.whatWeDoText')}
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
                  <span className="text-2xl font-bold font-serif text-navy">{pick(lang, p.title, p.titleNe)}</span>
                  <span className="mt-2 flex-grow text-slate-700">{pick(lang, p.summary, p.summaryNe)}</span>
                  <span className="mt-4 inline-flex items-center gap-1 font-bold text-crimson-dark">
                    {t('home.learnMore')} <ArrowRight size={18} aria-hidden="true" />
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
            <h2 id="help-title" className="text-3xl font-bold md:text-4xl">{t('home.helpTitle')}</h2>
            <p className="mt-3 max-w-3xl text-xl text-slate-100">
              {t('home.helpText')}
            </p>
          </div>
          <Link to="/help" className="btn btn-light text-lg">
            <LifeBuoy size={22} aria-hidden="true" /> {t('home.helpBtn')}
          </Link>
        </div>
      </section>

      {/* 5. Get involved + donate */}
      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-14 sm:px-6 md:grid-cols-2" aria-label={t('ways.take')}>
        <div className="rounded-3xl border border-slate-200 bg-white p-8">
          <Users size={36} className="text-navy" aria-hidden="true" />
          <h2 className="mt-4 text-3xl font-bold text-navy">{t('home.take')}</h2>
          <p className="mt-3 text-lg text-slate-700">
            {t('home.takeText')}
          </p>
          <Link to="/get-involved" className="btn btn-navy mt-6">{t('home.volJoin')}</Link>
        </div>
        <div className="rounded-3xl bg-crimson p-8 text-white">
          <Heart size={36} aria-hidden="true" />
          <h2 className="mt-4 text-3xl font-bold">{t('home.support')}</h2>
          <p className="mt-3 text-lg">
            {t('home.supportText')}
          </p>
          <Link to="/donate" className="btn btn-light mt-6">{t('home.waysToGive')}</Link>
        </div>
      </section>
    </>
  );
}
