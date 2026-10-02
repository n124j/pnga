import { useState } from 'react';
import { Link, useI18n } from '../lib/i18n';
import { categoryLabel } from '../lib/dates';
import Seo, { breadcrumbJsonLd } from '../components/Seo';
import PageHeader from '../components/PageHeader';
import NewsCard from '../components/NewsCard';
import NewsletterSignup from '../components/NewsletterSignup';
import FacebookGroupCard from '../components/FacebookGroupCard';
import { useNews } from '../lib/sheets';

export default function News() {
  const { lang, t } = useI18n();
  const items = useNews();
  const [category, setCategory] = useState('All');
  const categories = ['All', ...Array.from(new Set(items.map((i) => i.category).filter(Boolean)))];
  const shown = category === 'All' ? items : items.filter((i) => i.category === category);

  return (
    <>
      <Seo
        path="/news"
        title={t('news.seoTitle')}
        description={t('news.seoDesc')}
        jsonLd={[breadcrumbJsonLd([{ name: t('crumb.home'), path: '/' }, { name: t('nav.news'), path: '/news' }], lang)]}
      />
      <PageHeader title={t('news.h1')} crumbs={[{ label: t('nav.news') }]} intro={t('news.intro')} />
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        {categories.length > 2 && (
          <div role="group" aria-label={t('news.filter')} className="mb-8 flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                aria-pressed={c === category}
                onClick={() => setCategory(c)}
                className={`rounded-full border-2 px-4 py-2 text-base font-bold ${
                  c === category ? 'border-navy bg-navy text-white' : 'border-navy bg-white text-navy hover:bg-slate-100'
                }`}
              >
                {c === 'All' ? t('category.all') : categoryLabel(lang, c)}
              </button>
            ))}
          </div>
        )}
        {shown.length ? (
          <ul className="grid gap-6 md:grid-cols-2">
            {shown.map((item) => <NewsCard key={item.id} item={item} />)}
          </ul>
        ) : (
          <p className="rounded-2xl border border-slate-200 bg-white p-8 text-xl">
            {t('news.empty1')}<Link to="/events" className="font-bold text-navy underline">{t('news.emptyLink')}</Link>{t('news.empty2')}
          </p>
        )}
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <NewsletterSignup />
          <FacebookGroupCard />
        </div>
      </div>
    </>
  );
}
