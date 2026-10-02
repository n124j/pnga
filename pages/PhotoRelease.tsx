import { Link, useI18n } from '../lib/i18n';
import Seo, { breadcrumbJsonLd } from '../components/Seo';
import PageHeader from '../components/PageHeader';
import AgreementText from '../components/AgreementText';
import AgreementForm, { DraftNotice, type FieldDef } from '../components/AgreementForm';
import { PHOTO_RELEASE } from '../data/agreements';
import { SITE } from '../lib/site';

export default function PhotoRelease() {
  const { lang, t } = useI18n();
  const FIELDS: FieldDef[] = [
    { label: 'Your full name', labelNe: t('fld.name'), type: 'text', role: 'name', autoComplete: 'name' },
    { label: 'Phone', labelNe: t('form.phone'), type: 'tel', role: 'phone', required: false, autoComplete: 'tel', help: 'Phone or email is needed.', helpNe: t('fld.phoneHelp') },
    { label: 'Email', labelNe: t('form.email'), type: 'email', role: 'email', required: false, autoComplete: 'email' },
    {
      label: 'Your choice',
      labelNe: t('pr.choice'),
      type: 'radio',
      options: [
        'Yes, PNGA may use photos and videos of me and of the children I list below.',
        'No, please do not use photos or videos of me or of the children I list below.',
      ],
      optionsNe: [t('pr.yes'), t('pr.no')],
    },
    {
      label: 'Children under 18 this covers',
      labelNe: t('pr.fKids'),
      type: 'textarea',
      required: false,
      help: 'Write each child\'s name and age. You must be the parent or legal guardian.',
      helpNe: t('pr.fKidsHelp'),
    },
  ];
  return (
    <>
      <Seo
        path="/photo-release"
        title={t('pr.seoTitle')}
        description={t('pr.seoDesc')}
        noindex={!SITE.waiversApproved}
        jsonLd={[breadcrumbJsonLd([{ name: t('crumb.home'), path: '/' }, { name: t('pr.h1'), path: '/photo-release' }], lang)]}
      />
      <PageHeader
        title={t('pr.h1')}
        crumbs={[{ label: t('gi.h1'), to: '/get-involved' }, { label: t('pr.h1') }]}
        intro={t('pr.intro')}
      />
      <div className="mx-auto max-w-3xl space-y-8 px-4 py-10 sm:px-6">
        <DraftNotice />
        <AgreementText title={t('pr.h1')} agreement={PHOTO_RELEASE} />
        <section aria-labelledby="sign" className="space-y-4">
          <h2 id="sign" className="text-2xl font-bold text-navy">{t('pr.choice')}</h2>
          <AgreementForm
            formName="Photo release"
            version={PHOTO_RELEASE.version}
            fields={FIELDS}
            consentLabel="I have read this release and my choice above is my decision."
            consentLabelNe={t('pr.consent')}
            submitLabel={t('wv.submit')}
            privacyNote={t('pr.privacy')}
          />
        </section>
        <p className="text-lg">
          {t('pr.also')}<Link to="/waiver" className="font-bold text-navy underline">{t('events.waiverLink')}</Link>{t('wv.end')}
        </p>
      </div>
    </>
  );
}
