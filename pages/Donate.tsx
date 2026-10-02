import { Gift, Heart, Mail } from 'lucide-react';
import { Link, useI18n } from '../lib/i18n';
import Seo, { breadcrumbJsonLd } from '../components/Seo';
import PageHeader from '../components/PageHeader';
import QrCode from '../components/QrCode';
import { SITE, addressLine } from '../lib/site';
import { driveImageUrl } from '../lib/sheets';

function QrPlaceholder({ name }: { name: string }) {
  const { t } = useI18n();
  return (
    <div
      role="img"
      aria-label={t('don.qrSoon', { name })}
      className="mx-auto flex h-56 w-56 flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-400 bg-slate-50 p-4 text-slate-600"
    >
      <span className="text-lg font-bold">{t('don.qrLabel', { name })}</span>
      <span>{t('don.soon')}</span>
    </div>
  );
}

export default function Donate() {
  const { lang, t } = useI18n();
  const zelleQr = driveImageUrl(SITE.zelleQr);
  const taxNote = SITE.taxExempt ? t('don.taxNote', { ein: SITE.ein ? t('don.einPart', { ein: SITE.ein }) : '' }) : '';

  return (
    <>
      <Seo
        path="/donate"
        title={t('don.seoTitle')}
        description={t('don.seoDesc')}
        jsonLd={[breadcrumbJsonLd([{ name: t('crumb.home'), path: '/' }, { name: t('fl.donate'), path: '/donate' }], lang)]}
      />
      <PageHeader
        title={t('don.h1')}
        crumbs={[{ label: t('fl.donate') }]}
        intro={t('don.intro')}
      />
      <div className="mx-auto max-w-4xl space-y-8 px-4 py-10 sm:px-6">
        <p className="text-lg text-slate-800">
          {t('don.p1a')}
          <Link to="/programs" className="font-bold text-navy underline">{t('don.p1link')}</Link>{t('don.p1b')}
        </p>

        {taxNote && (
          <p className="rounded-2xl border-2 border-navy bg-navy/5 p-5 text-lg font-semibold text-navy">
            {t('don.taxBadge')}
          </p>
        )}

        <section className="rounded-2xl border-2 border-crimson bg-white p-7" aria-labelledby="ways">
          <h2 id="ways" className="text-2xl font-bold text-navy">{t('don.ways')}</h2>
          <div className="mt-4">
            <div className="space-y-6 text-lg">
              {SITE.donateUrl && (
                <p>
                  <a href={SITE.donateUrl} className="btn btn-primary text-lg" target="_blank" rel="noopener noreferrer">
                    <Heart size={22} aria-hidden="true" /> {t('don.online')}<span className="sr-only">{t('common.newTab')}</span>
                  </a>
                </p>
              )}
              {SITE.paypalUrl && (
                <p>
                  <a href={SITE.paypalUrl} className="btn btn-outline text-lg" target="_blank" rel="noopener noreferrer">
                    {t('don.paypal')}<span className="sr-only">{t('common.newTab')}</span>
                  </a>
                </p>
              )}
              {SITE.zelle && (
                <p>
                  <span className="font-bold">{t('don.zelle')}</span>{t('don.zelleSend')}<span className="font-mono font-semibold">{SITE.zelle}</span>
                </p>
              )}
              {!SITE.zelle && !SITE.paypalUrl && !SITE.donateUrl && (
                <p className="text-slate-800">
                  {t('don.nodetail1')}
                  <Link to="/contact?topic=Donation" className="font-bold text-navy underline">{t('don.nodetailLink')}</Link>{t('don.nodetail2')}
                </p>
              )}
              <div>
                <h3 className="font-sans text-lg font-bold">{t('don.check')}</h3>
                <p className="mt-1">{t('don.checkText')}</p>
                <address className="mt-2 rounded-xl bg-slate-50 p-4 not-italic">
                  <span className="font-bold">PNGA (Pennsylvania Nepalese Guthi Association)</span>
                  <br />
                  {SITE.address.street}
                  <br />
                  {SITE.address.city}, {SITE.address.region} {SITE.address.zip}
                </address>
              </div>
            </div>

          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-7" aria-labelledby="scan">
          <h2 id="scan" className="text-2xl font-bold text-navy">{t('don.scan')}</h2>
          <p className="mt-2 text-lg text-slate-700">{t('don.scanText')}</p>
          <div className="mt-6 grid gap-8 sm:grid-cols-2">
            <figure className="text-center">
              {SITE.paypalUrl ? (
                <QrCode value={SITE.paypalUrl}  label={t('don.qrPaypal')} />
              ) : (
                <QrPlaceholder name="PayPal" />
              )}
              <figcaption className="mt-2 text-xl font-bold text-navy">PayPal</figcaption>
            </figure>
            <figure className="text-center">
              {zelleQr ? (
                <img src={zelleQr} alt={t('don.qrZelle')} className="mx-auto h-56 w-56 bg-white object-contain" />
              ) : (
                <QrPlaceholder name="Zelle" />
              )}
              <figcaption className="mt-2 text-xl font-bold text-navy">Zelle</figcaption>
              {SITE.zelle && <p className="text-slate-700">{t('don.orSend')}<span className="font-mono font-semibold">{SITE.zelle}</span></p>}
            </figure>
          </div>
          {SITE.donateUrl && (
            <figure className="mt-8 text-center">
              <QrCode value={SITE.donateUrl} label={t('don.qrOnline')} />
              <figcaption className="mt-2 text-xl font-bold text-navy">{t('don.onlinePage')}</figcaption>
            </figure>
          )}
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-7" aria-labelledby="memorial">
          <h2 id="memorial" className="flex items-center gap-3 text-2xl font-bold text-navy">
            <Gift size={28} aria-hidden="true" /> {t('don.memorial')}
          </h2>
          <p className="mt-3 text-lg text-slate-800">
            {t('don.memorialText')}
          </p>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-7" aria-labelledby="pledges">
          <h2 id="pledges" className="flex items-center gap-3 text-2xl font-bold text-navy">
            <Mail size={28} aria-hidden="true" /> {t('don.pledges')}
          </h2>
          <p className="mt-3 text-lg text-slate-800">
            {t('don.pledgesText')}
            <Link to="/contact?topic=Donation" className="font-bold text-navy underline">{t('don.pledgesLink')}</Link>{t('don.pledgesEnd')}
          </p>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-7" aria-labelledby="about-org">
          <h2 id="about-org" className="text-2xl font-bold text-navy">{t('don.org')}</h2>
          <dl className="mt-3 space-y-2 text-lg">
            <div><dt className="inline font-semibold">{t('don.legal')}</dt><dd className="inline">{t('site.name')}</dd></div>
            <div><dt className="inline font-semibold">{t('don.addr')}</dt><dd className="inline">{addressLine}</dd></div>
            {SITE.ein && <div><dt className="inline font-semibold">{t('don.einLabel')}</dt><dd className="inline">{SITE.ein}</dd></div>}
          </dl>
          {taxNote && <p className="mt-3 text-lg text-slate-800">{taxNote}</p>}
          {SITE.paRegistered && (
            <p className="mt-3 text-slate-700">
              {t('don.pa', { name: t('site.name') })}
            </p>
          )}
          <p className="mt-3 text-slate-700">
            {t('don.receipts')}<Link to="/contact?topic=Donation" className="font-bold text-navy underline">{t('don.contactUs')}</Link>{t('don.receiptsEnd')}
          </p>
        </section>
      </div>
    </>
  );
}
