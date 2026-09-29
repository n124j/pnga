import { Link } from 'react-router-dom';
import Seo, { breadcrumbJsonLd } from '../components/Seo';
import PageHeader from '../components/PageHeader';
import AgreementText from '../components/AgreementText';
import AgreementForm, { DraftNotice, type FieldDef } from '../components/AgreementForm';
import { VOLUNTEER_AGREEMENT, VOLUNTEER_AREAS } from '../data/agreements';
import { SITE } from '../lib/site';

const FIELDS: FieldDef[] = [
  { label: 'Your full name', type: 'text', role: 'name', autoComplete: 'name' },
  { label: 'Phone', type: 'tel', role: 'phone', required: false, autoComplete: 'tel', help: 'Phone or email is needed.' },
  { label: 'Email', type: 'email', role: 'email', required: false, autoComplete: 'email' },
  { label: 'Language you prefer', type: 'select', options: ['English', 'नेपाली (Nepali)', 'Other'] },
  { label: 'How would you like to help?', type: 'checkboxes', options: VOLUNTEER_AREAS, help: 'Choose all that interest you.' },
  { label: 'When are you usually free?', type: 'textarea', required: false, help: 'For example, weekends or weekday evenings.' },
  { label: 'Anything else we should know?', type: 'textarea', required: false, help: 'Skills, languages spoken, or ideas. Please do not include health details.' },
];

export default function Volunteer() {
  return (
    <>
      <Seo
        path="/volunteer"
        title="Volunteer Sign-up"
        description="Sign up to volunteer with PNGA and agree to the volunteer agreement online."
        noindex={!SITE.waiversApproved}
        jsonLd={[breadcrumbJsonLd([{ name: 'Home', path: '/' }, { name: 'Volunteer sign-up', path: '/volunteer' }])]}
      />
      <PageHeader
        title="Volunteer sign-up"
        crumbs={[{ label: 'Get involved', to: '/get-involved' }, { label: 'Volunteer sign-up' }]}
        intro="Tell us how you would like to help and read the volunteer agreement. A PNGA volunteer will contact you."
      />
      <div className="mx-auto max-w-3xl space-y-8 px-4 py-10 sm:px-6">
        <DraftNotice />
        <AgreementText title="Volunteer agreement" agreement={VOLUNTEER_AGREEMENT} />
        <section aria-labelledby="sign" className="space-y-4">
          <h2 id="sign" className="text-2xl font-bold text-navy">About you</h2>
          <AgreementForm
            formName="Volunteer sign-up"
            version={VOLUNTEER_AGREEMENT.version}
            fields={FIELDS}
            confirmations={['I am 18 years old or older.']}
            consentLabel="I have read the volunteer agreement and I agree to it."
            submitLabel="Sign up to volunteer"
            privacyNote="PNGA volunteers use this to contact you and to keep a record of your agreement."
          />
        </section>
        <p className="text-lg">
          Under 18 and want to help? <Link to="/contact?topic=Volunteering" className="font-bold text-navy underline">Contact us</Link> and a parent or guardian can arrange it with us.
        </p>
      </div>
    </>
  );
}
