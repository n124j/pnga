import { Gift, Heart, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import Seo, { breadcrumbJsonLd } from '../components/Seo';
import PageHeader from '../components/PageHeader';
import QrCode from '../components/QrCode';
import { SITE, addressLine } from '../lib/site';
import { driveImageUrl } from '../lib/sheets';

function QrPlaceholder({ name }: { name: string }) {
  return (
    <div
      role="img"
      aria-label={`${name} QR code coming soon`}
      className="mx-auto flex h-56 w-56 flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-400 bg-slate-50 p-4 text-slate-600"
    >
      <span className="text-lg font-bold">{name} QR code</span>
      <span>Coming soon</span>
    </div>
  );
}

export default function Donate() {
  const zelleQr = driveImageUrl(SITE.zelleQr);
  const taxNote = SITE.taxExempt
    ? `PNGA is a tax-exempt organization under section 501(c)(3) of the Internal Revenue Code${SITE.ein ? ` (EIN ${SITE.ein})` : ''}. Contributions are tax-deductible to the extent allowed by law. Unless we tell you otherwise, no goods or services were provided in exchange for your gift. Please keep your bank or PayPal record, and ask us if you would like a written receipt.`
    : '';

  return (
    <>
      <Seo
        path="/donate"
        title="Donate to PNGA – Support Nepali Families in PA"
        description="Give to the Pennsylvania Nepalese Guthi Association by check, Zelle or PayPal, or make a memorial or tribute gift."
        jsonLd={[breadcrumbJsonLd([{ name: 'Home', path: '/' }, { name: 'Donate', path: '/donate' }])]}
      />
      <PageHeader
        title="Giving"
        crumbs={[{ label: 'Donate' }]}
        intro="We accept contributions from individuals, groups, institutions, corporations, foundations and government agencies."
      />
      <div className="mx-auto max-w-4xl space-y-8 px-4 py-10 sm:px-6">
        <p className="text-lg text-slate-800">
          Contributions are very important to sustain and grow our programs and operations serving the Asian American
          community, particularly Nepalese Americans. See{' '}
          <Link to="/programs" className="font-bold text-navy underline">what your gift supports</Link>.
        </p>

        {taxNote && (
          <p className="rounded-2xl border-2 border-navy bg-navy/5 p-5 text-lg font-semibold text-navy">
            Your gift is tax-deductible to the extent allowed by law.
          </p>
        )}

        <section className="rounded-2xl border-2 border-crimson bg-white p-7" aria-labelledby="ways">
          <h2 id="ways" className="text-2xl font-bold text-navy">Check, Zelle or PayPal</h2>
          <div className="mt-4">
            <div className="space-y-6 text-lg">
              {SITE.donateUrl && (
                <p>
                  <a href={SITE.donateUrl} className="btn btn-primary text-lg" target="_blank" rel="noopener noreferrer">
                    <Heart size={22} aria-hidden="true" /> Donate online<span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </p>
              )}
              {SITE.paypalUrl && (
                <p>
                  <a href={SITE.paypalUrl} className="btn btn-outline text-lg" target="_blank" rel="noopener noreferrer">
                    Give with PayPal<span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </p>
              )}
              {SITE.zelle && (
                <p>
                  <span className="font-bold">Zelle: </span>send to <span className="font-mono font-semibold">{SITE.zelle}</span>
                </p>
              )}
              {!SITE.zelle && !SITE.paypalUrl && !SITE.donateUrl && (
                <p className="text-slate-800">
                  To give by Zelle or PayPal, please{' '}
                  <Link to="/contact?topic=Donation" className="font-bold text-navy underline">contact us</Link> for the
                  details.
                </p>
              )}
              <div>
                <h3 className="font-sans text-lg font-bold">By check</h3>
                <p className="mt-1">The easiest and most direct way to support our work is a personal check made out to:</p>
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
          <h2 id="scan" className="text-2xl font-bold text-navy">Scan to give</h2>
          <p className="mt-2 text-lg text-slate-700">Open your phone camera or banking app and point it at a code.</p>
          <div className="mt-6 grid gap-8 sm:grid-cols-2">
            <figure className="text-center">
              {SITE.paypalUrl ? (
                <QrCode value={SITE.paypalUrl} label="QR code that opens PNGA's PayPal page" />
              ) : (
                <QrPlaceholder name="PayPal" />
              )}
              <figcaption className="mt-2 text-xl font-bold text-navy">PayPal</figcaption>
            </figure>
            <figure className="text-center">
              {zelleQr ? (
                <img src={zelleQr} alt="QR code for sending a Zelle payment to PNGA" className="mx-auto h-56 w-56 bg-white object-contain" />
              ) : (
                <QrPlaceholder name="Zelle" />
              )}
              <figcaption className="mt-2 text-xl font-bold text-navy">Zelle</figcaption>
              {SITE.zelle && <p className="text-slate-700">or send to <span className="font-mono font-semibold">{SITE.zelle}</span></p>}
            </figure>
          </div>
          {SITE.donateUrl && (
            <figure className="mt-8 text-center">
              <QrCode value={SITE.donateUrl} label="QR code that opens the PNGA online donation page" />
              <figcaption className="mt-2 text-xl font-bold text-navy">Online donation page</figcaption>
            </figure>
          )}
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-7" aria-labelledby="memorial">
          <h2 id="memorial" className="flex items-center gap-3 text-2xl font-bold text-navy">
            <Gift size={28} aria-hidden="true" /> Memorial and tribute gifts
          </h2>
          <p className="mt-3 text-lg text-slate-800">
            Making a commemorative gift is a wonderful way to honor a special person in your life: a parent, spouse,
            child, grandchild or friend. Gifts can also support your favorite program to mark a memorable occasion,
            and help PNGA continue to serve the most deserving parts of our community.
          </p>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-7" aria-labelledby="pledges">
          <h2 id="pledges" className="flex items-center gap-3 text-2xl font-bold text-navy">
            <Mail size={28} aria-hidden="true" /> Pledges
          </h2>
          <p className="mt-3 text-lg text-slate-800">
            PNGA welcomes pledges payable over time, which may let you give more generously than you first
            considered. To arrange a payment plan, please{' '}
            <Link to="/contact?topic=Donation" className="font-bold text-navy underline">contact PNGA</Link>.
          </p>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-7" aria-labelledby="about-org">
          <h2 id="about-org" className="text-2xl font-bold text-navy">About the organization</h2>
          <dl className="mt-3 space-y-2 text-lg">
            <div><dt className="inline font-semibold">Legal name: </dt><dd className="inline">{SITE.name}</dd></div>
            <div><dt className="inline font-semibold">Address: </dt><dd className="inline">{addressLine}</dd></div>
            {SITE.ein && <div><dt className="inline font-semibold">Tax ID (EIN): </dt><dd className="inline">{SITE.ein}</dd></div>}
          </dl>
          {taxNote && <p className="mt-3 text-lg text-slate-800">{taxNote}</p>}
          {SITE.paRegistered && (
            <p className="mt-3 text-slate-700">
              The official registration and financial information of {SITE.name} may be obtained from the Pennsylvania
              Department of State by calling toll-free, within Pennsylvania, 1-800-732-0999. Registration does not imply
              endorsement.
            </p>
          )}
          <p className="mt-3 text-slate-700">
            Questions about receipts?{' '}
            <Link to="/contact?topic=Donation" className="font-bold text-navy underline">Contact us</Link>.
          </p>
        </section>
      </div>
    </>
  );
}
