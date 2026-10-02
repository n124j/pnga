import { Link, useI18n } from '../lib/i18n';
import Seo from '../components/Seo';

export default function NotFound() {
  const { t } = useI18n();
  return (
    <>
      <Seo path="/404" title={t('nf.title')} noindex />
      <div className="mx-auto max-w-2xl px-4 py-20 text-center sm:px-6">
        <h1 className="text-4xl font-bold text-navy">{t('nf.title')}</h1>
        <p className="mt-4 text-xl text-slate-700">{t('nf.text')}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/" className="btn btn-navy">{t('nf.home')}</Link>
          <Link to="/help" className="btn btn-outline">{t('nf.help')}</Link>
        </div>
      </div>
    </>
  );
}
