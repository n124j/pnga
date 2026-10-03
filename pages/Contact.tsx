import { Link, useSearchParams } from 'react-router-dom';
import { Mail, MapPin, Phone } from 'lucide-react';
import Seo, { breadcrumbJsonLd } from '../components/Seo';
import PageHeader from '../components/PageHeader';
import ContactForm from '../components/ContactForm';
import { SITE, addressLine, mapsUrl, telHref } from '../lib/site';

const TOPICS = ['General question', 'Volunteering', 'Membership', 'Donation', 'Events', 'Photos', 'Other'].map((t) => ({ value: t, label: t }));

export default function Contact() {
  const [params] = useSearchParams();
  const wanted = params.get('topic') ?? '';
  const defaultTopic = TOPICS.find((t) => t.label === wanted)?.label ?? '';

  return (
    <>
      <Seo
        path="/contact"
        title="Contact PNGA"
        description="Contact the Pennsylvania Nepalese Guthi Association in Plymouth Meeting, PA with questions about events, volunteering, membership or donations."
        jsonLd={[breadcrumbJsonLd([{ name: 'Home', path: '/' }, { name: 'Contact', path: '/contact' }])]}
      />
      <PageHeader title="Contact us" crumbs={[{ label: 'Contact' }]} intro="Questions about events, volunteering, membership or donations? Write to us." />
      <div className="mx-auto grid max-w-5xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[2fr_3fr]">
        <div className="space-y-6 text-lg">
          <p className="flex gap-3">
            <MapPin size={24} className="mt-1 shrink-0 text-gold-dark" aria-hidden="true" />
            <span>
              <span className="block font-bold">Mailing address</span>
              <a href={mapsUrl} className="underline" target="_blank" rel="noopener noreferrer">
                {addressLine}<span className="sr-only"> (opens map in a new tab)</span>
              </a>
            </span>
          </p>
          {SITE.phone && (
            <p className="flex gap-3">
              <Phone size={24} className="mt-1 shrink-0 text-gold-dark" aria-hidden="true" />
              <span><span className="block font-bold">Phone</span><a href={telHref} className="underline">{SITE.phone}</a></span>
            </p>
          )}
          {SITE.email && (
            <p className="flex gap-3">
              <Mail size={24} className="mt-1 shrink-0 text-gold-dark" aria-hidden="true" />
              <span><span className="block font-bold">Email</span><a href={`mailto:${SITE.email}`} className="underline">{SITE.email}</a></span>
            </p>
          )}
          <p className="text-slate-700">Need help right now? Please use the <Link to="/help" className="font-bold text-navy underline">Get help</Link> page.</p>
        </div>

        <div className="relative rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
          <ContactForm
            kind="Website message"
            topics={{ label: 'What is your message about?', options: TOPICS }}
            defaultTopic={defaultTopic}
            messageLabel="Your message"
            submitLabel="Send message"
            privacyNote="We use your details only to reply to you."
            showLanguage
          />
        </div>
      </div>
    </>
  );
}
