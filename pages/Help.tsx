import { Phone } from 'lucide-react';
import Seo, { breadcrumbJsonLd } from '../components/Seo';
import PageHeader from '../components/PageHeader';
import ContactForm from '../components/ContactForm';
import { useI18n, type Key } from '../lib/i18n';

// The value is what volunteers see in the email (always English); the label is what the visitor sees.
const HELP_TOPICS: { value: string; key: Key }[] = [
  ['Immigration', 'help.t1'], ['Health', 'help.t2'], ['Food', 'help.t3'], ['Housing', 'help.t4'], ['Employment', 'help.t5'],
  ['Transportation', 'help.t6'], ['Senior assistance', 'help.t7'], ['Family', 'help.t8'], ['Language', 'help.t9'], ['Other', 'help.t10'],
].map(([value, key]) => ({ value, key: key as Key }));

export default function Help() {
  const { lang, t } = useI18n();
  return (
    <>
      <Seo
        path="/help"
        title={t('help.seoTitle')}
        description={t('help.seoDesc')}
        jsonLd={[breadcrumbJsonLd([{ name: t('crumb.home'), path: '/' }, { name: t('help.h1'), path: '/help' }], lang)]}
      />
      <PageHeader
        title={t('help.h1')}
        crumbs={[{ label: t('help.h1') }]}
        intro={t('help.intro')}
      />

      <div className="mx-auto max-w-4xl space-y-10 px-4 py-10 sm:px-6">
        <section aria-labelledby="emergency" className="rounded-2xl border-2 border-crimson bg-white p-6">
          <h2 id="emergency" className="text-2xl font-bold text-crimson-dark">{t('help.emergency')}</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            <li>
              <a href="tel:911" className="btn btn-primary w-full text-lg"><Phone size={20} aria-hidden="true" /> {t('help.call911')}</a>
              <p className="mt-1 text-slate-700">{t('help.call911Text')}</p>
            </li>
            <li>
              <a href="tel:988" className="btn btn-outline w-full text-lg"><Phone size={20} aria-hidden="true" /> {t('help.call988')}</a>
              <p className="mt-1 text-slate-700">{t('help.call988Text')}</p>
            </li>
            <li>
              <a href="tel:18007997233" className="btn btn-outline w-full text-lg"><Phone size={20} aria-hidden="true" /> 1-800-799-7233</a>
              <p className="mt-1 text-slate-700">{t('help.dvText')}</p>
            </li>
            <li>
              <a href="tel:211" className="btn btn-outline w-full text-lg"><Phone size={20} aria-hidden="true" /> {t('help.call211')}</a>
              <p className="mt-1 text-slate-700">{t('help.call211Text')}</p>
            </li>
          </ul>
        </section>

        <section aria-labelledby="request">
          <h2 id="request" className="text-3xl font-bold text-navy">{t('help.ask')}</h2>
          <p className="mt-2 text-lg text-slate-700">
            {t('help.askText')}
          </p>
          <div className="relative mt-6 rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
            <ContactForm
              kind="Need help"
              topics={{ label: t('help.topicLabel'), options: HELP_TOPICS.map((x) => ({ value: x.value, label: t(x.key) })) }}
              showLanguage
              messageLabel={t('help.msg')}
              submitLabel={t('help.submit')}
              privacyNote={t('help.privacy')}
            />
          </div>
        </section>
      </div>
    </>
  );
}
