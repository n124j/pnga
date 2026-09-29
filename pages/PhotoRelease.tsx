import { Link } from 'react-router-dom';
import Seo, { breadcrumbJsonLd } from '../components/Seo';
import PageHeader from '../components/PageHeader';
import AgreementText from '../components/AgreementText';
import AgreementForm, { DraftNotice, type FieldDef } from '../components/AgreementForm';
import { PHOTO_RELEASE } from '../data/agreements';
import { SITE } from '../lib/site';

const FIELDS: FieldDef[] = [
  { label: 'Your full name', type: 'text', role: 'name', autoComplete: 'name' },
  { label: 'Phone', type: 'tel', role: 'phone', required: false, autoComplete: 'tel', help: 'Phone or email is needed.' },
  { label: 'Email', type: 'email', role: 'email', required: false, autoComplete: 'email' },
  {
    label: 'Your choice',
    type: 'radio',
    options: [
      'Yes, PNGA may use photos and videos of me and of the children I list below.',
      'No, please do not use photos or videos of me or of the children I list below.',
    ],
  },
  {
    label: 'Children under 18 this covers',
    type: 'textarea',
    required: false,
    help: 'Write each child\'s name and age. You must be the parent or legal guardian.',
  },
];

export default function PhotoRelease() {
  return (
    <>
      <Seo
        path="/photo-release"
        title="Photo and Video Release"
        description="Tell PNGA whether it may use photos and videos of you or your children."
        noindex={!SITE.waiversApproved}
        jsonLd={[breadcrumbJsonLd([{ name: 'Home', path: '/' }, { name: 'Photo release', path: '/photo-release' }])]}
      />
      <PageHeader
        title="Photo and video release"
        crumbs={[{ label: 'Get involved', to: '/get-involved' }, { label: 'Photo release' }]}
        intro="Tell us whether PNGA may use photos and videos of you or your children. You can say no, and you can change your mind."
      />
      <div className="mx-auto max-w-3xl space-y-8 px-4 py-10 sm:px-6">
        <DraftNotice />
        <AgreementText title="Photo and video release" agreement={PHOTO_RELEASE} />
        <section aria-labelledby="sign" className="space-y-4">
          <h2 id="sign" className="text-2xl font-bold text-navy">Your choice</h2>
          <AgreementForm
            formName="Photo release"
            version={PHOTO_RELEASE.version}
            fields={FIELDS}
            consentLabel="I have read this release and my choice above is my decision."
            submitLabel="Sign and send"
            privacyNote="PNGA volunteers use this only to keep a record of your choice."
          />
        </section>
        <p className="text-lg">
          Also see the <Link to="/waiver" className="font-bold text-navy underline">event waiver</Link>.
        </p>
      </div>
    </>
  );
}
