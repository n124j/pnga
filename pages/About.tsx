import { Eye, ShieldCheck, Target } from 'lucide-react';
import Seo, { breadcrumbJsonLd } from '../components/Seo';
import PageHeader from '../components/PageHeader';
import { GALLERY_IMAGES } from '../data/gallery';
import { Link, useI18n, type Key } from '../lib/i18n';

const VALUES: Key[] = ['about.v1', 'about.v2', 'about.v3', 'about.v4', 'about.v5'];
const MEMBERS: Key[] = ['about.m1', 'about.m2', 'about.m3', 'about.m4'];
const SUPPORTERS: Key[] = ['about.s1', 'about.s2', 'about.s3'];

export default function About() {
  const { lang, t } = useI18n();
  return (
    <>
      <Seo
        path="/about"
        title={t('about.seoTitle')}
        description={t('about.seoDesc')}
        jsonLd={[breadcrumbJsonLd([{ name: t('crumb.home'), path: '/' }, { name: t('nav.about'), path: '/about' }], lang)]}
      />
      <PageHeader title={t('about.h1')} crumbs={[{ label: t('nav.about') }]} intro={t('site.slogan')} />
      <div className="mx-auto max-w-5xl space-y-14 px-4 py-10 sm:px-6">
        <section aria-labelledby="who" className="grid items-start gap-8 lg:grid-cols-[3fr_2fr]">
          <div className="space-y-4 text-lg text-slate-800">
            <h2 id="who" className="text-3xl font-bold text-navy">{t('about.who')}</h2>
            <p>
              {t('about.p1')}
            </p>
            <p>
              {t('about.p2')}
            </p>
            <p className="flex flex-wrap gap-x-6 gap-y-2">
              <Link to="/about/history" className="font-bold text-navy underline">{t('about.history')}</Link>
              <Link to="/about/leadership" className="font-bold text-navy underline">{t('about.board')}</Link>
              <Link to="/programs" className="font-bold text-navy underline">{t('about.whatwedo')}</Link>
            </p>
          </div>
          <img
            src={GALLERY_IMAGES[6].src}
            alt={GALLERY_IMAGES[6].alt}
            width={804}
            height={1270}
            loading="lazy"
            className="w-full rounded-3xl object-cover shadow-lg"
          />
        </section>

        <ul className="grid gap-6 md:grid-cols-3">
          <li className="rounded-2xl border border-slate-200 bg-white p-6">
            <Eye size={32} className="text-crimson-dark" aria-hidden="true" />
            <h2 className="mt-3 text-2xl font-bold text-navy">{t('about.vision')}</h2>
            <p className="mt-2 text-slate-800">
              {t('about.visionText')}
            </p>
          </li>
          <li className="rounded-2xl border border-slate-200 bg-white p-6">
            <Target size={32} className="text-navy" aria-hidden="true" />
            <h2 className="mt-3 text-2xl font-bold text-navy">{t('about.mission')}</h2>
            <p className="mt-2 text-slate-800">
              {t('about.missionText')}
            </p>
          </li>
          <li className="rounded-2xl border border-slate-200 bg-white p-6">
            <ShieldCheck size={32} className="text-navy" aria-hidden="true" />
            <h2 className="mt-3 text-2xl font-bold text-navy">{t('about.values')}</h2>
            <ul className="mt-2 list-disc pl-5 text-slate-800">
              {VALUES.map((v) => (
                <li key={v}>{t(v)}</li>
              ))}
            </ul>
          </li>
        </ul>

        <section aria-labelledby="members" className="rounded-2xl border border-slate-200 bg-white p-6">
          <h2 id="members" className="text-2xl font-bold text-navy">{t('about.members')}</h2>
          <p className="mt-2 text-lg text-slate-800">{t('about.membersIntro')}</p>
          <ul className="mt-2 list-disc pl-6 text-lg">
            {MEMBERS.map((m) => (
              <li key={m}>{t(m)}</li>
            ))}
          </ul>
          <p className="mt-3 text-lg">
            {t('about.join')}<Link to="/get-involved" className="font-bold text-navy underline">{t('about.joinLink')}</Link>{t('about.joinEnd')}
          </p>
        </section>

        <section aria-labelledby="supporters" className="rounded-2xl border border-slate-200 bg-white p-6">
          <h2 id="supporters" className="text-2xl font-bold text-navy">{t('about.supporters')}</h2>
          <p className="mt-2 text-lg text-slate-800">{t('about.supportersIntro')}</p>
          <ul className="mt-2 list-disc pl-6 text-lg">
            {SUPPORTERS.map((s) => (
              <li key={s}>{t(s)}</li>
            ))}
          </ul>
          <p className="mt-3 text-lg">
            {t('about.help')}<Link to="/donate" className="font-bold text-navy underline">{t('about.helpLink')}</Link>{t('about.helpEnd')}
          </p>
        </section>
      </div>
    </>
  );
}
