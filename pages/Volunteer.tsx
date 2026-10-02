import { Link, useI18n } from '../lib/i18n';
import Seo, { breadcrumbJsonLd } from '../components/Seo';
import PageHeader from '../components/PageHeader';
import AgreementText from '../components/AgreementText';
import AgreementForm, { DraftNotice, type FieldDef } from '../components/AgreementForm';
import { VOLUNTEER_AGREEMENT, VOLUNTEER_AREAS, VOLUNTEER_AREAS_NE } from '../data/agreements';
import { SITE } from '../lib/site';

export default function Volunteer() {
  const { lang, t } = useI18n();
  const FIELDS: FieldDef[] = [
    { label: 'Your full name', labelNe: t('fld.name'), type: 'text', role: 'name', autoComplete: 'name' },
    { label: 'Phone', labelNe: t('form.phone'), type: 'tel', role: 'phone', required: false, autoComplete: 'tel', help: 'Phone or email is needed.', helpNe: t('fld.phoneHelp') },
    { label: 'Email', labelNe: t('form.email'), type: 'email', role: 'email', required: false, autoComplete: 'email' },
    { label: 'Language you prefer', labelNe: t('form.lang'), type: 'select', options: ['English', 'नेपाली (Nepali)', 'Other'], optionsNe: [t('fld.langEn'), t('fld.langNe'), t('fld.langOther')] },
    { label: 'How would you like to help?', labelNe: t('vol.fHow'), type: 'checkboxes', options: VOLUNTEER_AREAS, optionsNe: VOLUNTEER_AREAS_NE, help: 'Choose all that interest you.', helpNe: t('vol.fHowHelp') },
    { label: 'When are you usually free?', labelNe: t('vol.fFree'), type: 'textarea', required: false, help: 'For example, weekends or weekday evenings.', helpNe: t('vol.fFreeHelp') },
    { label: 'Anything else we should know?', labelNe: t('vol.fElse'), type: 'textarea', required: false, help: 'Skills, languages spoken, or ideas. Please do not include health details.', helpNe: t('vol.fElseHelp') },
  ];
  return (
    <>
      <Seo
        path="/volunteer"
        title={t('vol.seoTitle')}
        description={t('vol.seoDesc')}
        noindex={!SITE.waiversApproved}
        jsonLd={[breadcrumbJsonLd([{ name: t('crumb.home'), path: '/' }, { name: t('vol.h1'), path: '/volunteer' }], lang)]}
      />
      <PageHeader
        title={t('vol.h1')}
        crumbs={[{ label: t('gi.h1'), to: '/get-involved' }, { label: t('vol.h1') }]}
        intro={t('vol.intro')}
      />
      <div className="mx-auto max-w-3xl space-y-8 px-4 py-10 sm:px-6">
        <DraftNotice />
        <AgreementText title={t('vol.agreementTitle')} agreement={VOLUNTEER_AGREEMENT} />
        <section aria-labelledby="sign" className="space-y-4">
          <h2 id="sign" className="text-2xl font-bold text-navy">{t('vol.about')}</h2>
          <AgreementForm
            formName="Volunteer sign-up"
            version={VOLUNTEER_AGREEMENT.version}
            fields={FIELDS}
            confirmations={['I am 18 years old or older.']}
            confirmationsNe={[t('vol.confirm18')]}
            consentLabel="I have read the volunteer agreement and I agree to it."
            consentLabelNe={t('vol.consent')}
            submitLabel={t('vol.submit')}
            privacyNote={t('vol.privacy')}
          />
        </section>
        <p className="text-lg">
          {t('vol.under18')}<Link to="/contact?topic=Volunteering" className="font-bold text-navy underline">{t('vol.under18Link')}</Link>{t('vol.under18End')}
        </p>
      </div>
    </>
  );
}
