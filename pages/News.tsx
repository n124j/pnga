import { useState } from 'react';
import { Link } from 'react-router-dom';
import Seo, { breadcrumbJsonLd } from '../components/Seo';
import PageHeader from '../components/PageHeader';
import NewsCard from '../components/NewsCard';
import NewsletterSignup from '../components/NewsletterSignup';
import FacebookGroupCard from '../components/FacebookGroupCard';
import { useNews } from '../lib/sheets';

export default function News() {
  const items = useNews();
  const [category, setCategory] = useState('All');
  const categories = ['All', ...Array.from(new Set(items.map((i) => i.category).filter(Boolean)))];
  const shown = category === 'All' ? items : items.filter((i) => i.category === category);

  return (
    <>
      <Seo
        path="/news"
        title="News and Announcements"
        description="News, announcements and updates from the Pennsylvania Nepalese Guthi Association."
        jsonLd={[breadcrumbJsonLd([{ name: 'Home', path: '/' }, { name: 'News', path: '/news' }])]}
      />
      <PageHeader title="News" crumbs={[{ label: 'News' }]} intro="Announcements and updates from our community." />
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        {categories.length > 2 && (
          <div role="group" aria-label="Filter by topic" className="mb-8 flex flex-wrap gap-2">
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
                {c}
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
            No news has been posted yet. Please check back soon, or see our <Link to="/events" className="font-bold text-navy underline">events</Link>.
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
