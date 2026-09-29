import { ExternalLink, Facebook } from 'lucide-react';
import { SITE } from '../lib/site';

/** Invitation to PNGA's Facebook group. Hidden when no group link is set. */
export default function FacebookGroupCard() {
  if (!SITE.social.facebookGroup) return null;
  return (
    <section aria-labelledby="fbgroup-title" className="rounded-3xl border-2 border-navy/20 bg-navy p-6 text-white sm:p-8">
      <h2 id="fbgroup-title" className="flex items-center gap-3 text-2xl font-bold md:text-3xl">
        <Facebook size={30} aria-hidden="true" /> Join our Facebook group
      </h2>
      <p className="mt-2 text-lg">
        Chat with neighbors, hear about events first and share news with the Nepali community in Pennsylvania.
      </p>
      <a
        href={SITE.social.facebookGroup}
        target="_blank"
        rel="noopener noreferrer"
        className="btn mt-5 bg-white text-navy hover:bg-slate-100"
      >
        Open the Facebook group <ExternalLink size={18} aria-hidden="true" />
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
      <p className="mt-3 text-sm text-slate-200">You need a Facebook account. The group may ask you to answer a question to join.</p>
    </section>
  );
}
