import { Link, useI18n } from '../lib/i18n';
import Seo, { breadcrumbJsonLd } from '../components/Seo';
import PageHeader from '../components/PageHeader';
import AgreementText from '../components/AgreementText';
import AgreementForm, { DraftNotice, type FieldDef } from '../components/AgreementForm';
import { EVENT_WAIVER } from '../data/agreements';
import { SITE } from '../lib/site';

export default function Waiver() {
  const { lang, t } = useI18n();
  const FIELDS: FieldDef[] = [
    { label: 'Your full name', labelNe: t('fld.name'), type: 'text', role: 'name', autoComplete: 'name' },
    { label: 'Phone', labelNe: t('form.phone'), type: 'tel', role: 'phone', required: false, autoComplete: 'tel', help: 'Phone or email is needed.', helpNe: t('fld.phoneHelp') },
    { label: 'Email', labelNe: t('form.email'), type: 'email', role: 'email', required: false, autoComplete: 'email' },
    { label: 'Event name', labelNe: t('wv.fEvent'), type: 'text', required: false, help: 'Leave blank if this covers PNGA events in general.', helpNe: t('wv.fEventHelp') },
    { label: 'Emergency contact name', labelNe: t('wv.fEcName'), type: 'text' },
    { label: 'Emergency contact phone', labelNe: t('wv.fEcPhone'), type: 'tel' },
    {
      label: 'Children under 18 attending with you',
      labelNe: t('wv.fKids'),
      type: 'textarea',
      required: false,
      help: 'Write each child\'s name and age. By signing you also sign for them.',
      helpNe: t('wv.fKidsHelp'),
    },
  ];
  return (
    <>
      <Seo
        path="/waiver"
        title={t('wv.seoTitle')}
        description={t('wv.seoDesc')}
        noindex={!SITE.waiversApproved}
        jsonLd={[breadcrumbJsonLd([{ name: t('crumb.home'), path: '/' }, { name: t('wv.h1'), path: '/waiver' }], lang)]}
      />
      <PageHeader
        title={t('wv.h1')}
        crumbs={[{ label: t('gi.h1'), to: '/get-involved' }, { label: t('wv.h1') }]}
        intro={t('wv.intro')}
      />
      <div className="mx-auto max-w-3xl space-y-8 px-4 py-10 sm:px-6">
        <DraftNotice />
        <AgreementText title={t('wv.agreementTitle')} agreement={EVENT_WAIVER} />
        <section aria-labelledby="sign" className="space-y-4">
          <h2 id="sign" className="text-2xl font-bold text-navy">{t('wv.details')}</h2>
          <AgreementForm
            formName="Event waiver"
            version={EVENT_WAIVER.version}
            fields={FIELDS}
            consentLabel="I have read this agreement and I agree to it."
            consentLabelNe={t('wv.consent')}
            submitLabel={t('wv.submit')}
            privacyNote={t('wv.privacy')}
          />
        </section>
        <p className="text-lg">
          {t('wv.also')}<Link to="/photo-release" className="font-bold text-navy underline">{t('wv.photoLink')}</Link>{t('wv.and')}
          <Link to="/volunteer" className="font-bold text-navy underline">{t('wv.volLink')}</Link>{t('wv.end')}
        </p>
      </div>
    </>
  );
}
