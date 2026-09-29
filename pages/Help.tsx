import { Phone } from 'lucide-react';
import Seo, { breadcrumbJsonLd } from '../components/Seo';
import PageHeader from '../components/PageHeader';
import ContactForm from '../components/ContactForm';

const HELP_TOPICS = ['Immigration', 'Health', 'Food', 'Housing', 'Employment', 'Transportation', 'Senior assistance', 'Family', 'Language', 'Other'].map(
  (t) => ({ value: t, label: t }),
);

export default function Help() {
  return (
    <>
      <Seo
        path="/help"
        title="Get Help – Nepali Community Support in Pennsylvania"
        description="Ask PNGA for help with immigration questions, health, jobs, food and more. Nepali-speaking volunteers reply or point you to trusted local services."
        jsonLd={[breadcrumbJsonLd([{ name: 'Home', path: '/' }, { name: 'Get Help', path: '/help' }])]}
      />
      <PageHeader
        title="Get help"
        crumbs={[{ label: 'Get help' }]}
        intro="Tell us what you need. In English or Nepali, a PNGA volunteer will reply, or point you to a trusted service that can help."
      />

      <div className="mx-auto max-w-4xl space-y-10 px-4 py-10 sm:px-6">
        <section aria-labelledby="emergency" className="rounded-2xl border-2 border-crimson bg-white p-6">
          <h2 id="emergency" className="text-2xl font-bold text-crimson-dark">In an emergency, do not wait for a form</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            <li>
              <a href="tel:911" className="btn btn-primary w-full text-lg"><Phone size={20} aria-hidden="true" /> Call 911</a>
              <p className="mt-1 text-slate-700">Danger, fire, or a medical emergency</p>
            </li>
            <li>
              <a href="tel:988" className="btn btn-outline w-full text-lg"><Phone size={20} aria-hidden="true" /> Call or text 988</a>
              <p className="mt-1 text-slate-700">Suicide and crisis lifeline</p>
            </li>
            <li>
              <a href="tel:18007997233" className="btn btn-outline w-full text-lg"><Phone size={20} aria-hidden="true" /> 1-800-799-7233</a>
              <p className="mt-1 text-slate-700">National Domestic Violence Hotline</p>
            </li>
            <li>
              <a href="tel:211" className="btn btn-outline w-full text-lg"><Phone size={20} aria-hidden="true" /> Call 211</a>
              <p className="mt-1 text-slate-700">Free help finding food, housing and other local services</p>
            </li>
          </ul>
        </section>

        <section aria-labelledby="request">
          <h2 id="request" className="text-3xl font-bold text-navy">Ask for help</h2>
          <p className="mt-2 text-lg text-slate-700">
            PNGA is a volunteer organization. We listen, answer what we can, and refer you to trusted services. We do
            not give legal, medical or immigration advice. Please do not include your immigration status or health
            details in this form.
          </p>
          <div className="relative mt-6 rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
            <ContactForm
              kind="Need help"
              topics={{ label: 'What do you need help with?', options: HELP_TOPICS }}
              showLanguage
              messageLabel="Tell us a little about what you need"
              submitLabel="Send my request"
              privacyNote="Your information will be treated respectfully and used only to respond to your request."
            />
          </div>
        </section>
      </div>
    </>
  );
}
