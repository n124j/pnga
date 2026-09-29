import { Link } from 'react-router-dom';
import Seo, { breadcrumbJsonLd } from '../components/Seo';
import PageHeader from '../components/PageHeader';
import AgreementText from '../components/AgreementText';
import AgreementForm, { DraftNotice, type FieldDef } from '../components/AgreementForm';
import { EVENT_WAIVER } from '../data/agreements';
import { SITE } from '../lib/site';

const FIELDS: FieldDef[] = [
  { label: 'Your full name', type: 'text', role: 'name', autoComplete: 'name' },
  { label: 'Phone', type: 'tel', role: 'phone', required: false, autoComplete: 'tel', help: 'Phone or email is needed.' },
  { label: 'Email', type: 'email', role: 'email', required: false, autoComplete: 'email' },
  { label: 'Event name', type: 'text', required: false, help: 'Leave blank if this covers PNGA events in general.' },
  { label: 'Emergency contact name', type: 'text' },
  { label: 'Emergency contact phone', type: 'tel' },
  {
    label: 'Children under 18 attending with you',
    type: 'textarea',
    required: false,
    help: 'Write each child\'s name and age. By signing you also sign for them.',
  },
];

export default function Waiver() {
  return (
    <>
      <Seo
        path="/waiver"
        title="Event Participation Waiver"
        description="Read and sign the PNGA event participation waiver online."
        noindex={!SITE.waiversApproved}
        jsonLd={[breadcrumbJsonLd([{ name: 'Home', path: '/' }, { name: 'Event waiver', path: '/waiver' }])]}
      />
      <PageHeader
        title="Event waiver"
        crumbs={[{ label: 'Get involved', to: '/get-involved' }, { label: 'Event waiver' }]}
        intro="Please read this agreement and sign it once. It covers PNGA events you attend over the next 12 months."
      />
      <div className="mx-auto max-w-3xl space-y-8 px-4 py-10 sm:px-6">
        <DraftNotice />
        <AgreementText title="Event participation agreement" agreement={EVENT_WAIVER} />
        <section aria-labelledby="sign" className="space-y-4">
          <h2 id="sign" className="text-2xl font-bold text-navy">Your details</h2>
          <AgreementForm
            formName="Event waiver"
            version={EVENT_WAIVER.version}
            fields={FIELDS}
            consentLabel="I have read this agreement and I agree to it."
            submitLabel="Sign and send"
            privacyNote="PNGA volunteers use this only to keep a record of your agreement and to reach your emergency contact if needed. Please do not write health details here."
          />
        </section>
        <p className="text-lg">
          Also see our <Link to="/photo-release" className="font-bold text-navy underline">photo and video release</Link> and{' '}
          <Link to="/volunteer" className="font-bold text-navy underline">volunteer sign-up</Link>.
        </p>
      </div>
    </>
  );
}
