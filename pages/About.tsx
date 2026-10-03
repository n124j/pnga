import { Link } from 'react-router-dom';
import { Eye, ShieldCheck, Target } from 'lucide-react';
import Seo, { breadcrumbJsonLd } from '../components/Seo';
import PageHeader from '../components/PageHeader';
import { GALLERY_IMAGES } from '../data/gallery';
import { SITE } from '../lib/site';

const VALUES = ['Conviction', 'Persistence and perseverance', 'Fortitude', 'Collaboration', 'Respect'];
const SUPPORTERS = ['Montgomery County Recovery Office', 'Philip Jaisohn Memorial Foundation', 'Private contributors'];

export default function About() {
  return (
    <>
      <Seo
        path="/about"
        title="About PNGA – Nepali Nonprofit in Pennsylvania"
        description="Our mission, vision and values. PNGA is a 501(c)(3) community-based organization empowering low-income immigrant communities, especially Nepali and South Asian families, in Montgomery County and across Pennsylvania."
        jsonLd={[breadcrumbJsonLd([{ name: 'Home', path: '/' }, { name: 'About', path: '/about' }])]}
      />
      <PageHeader title="About PNGA" crumbs={[{ label: 'About' }]} intro={SITE.slogan} />
      <div className="mx-auto max-w-5xl space-y-14 px-4 py-10 sm:px-6">
        <section aria-labelledby="who" className="grid items-start gap-8 lg:grid-cols-[3fr_2fr]">
          <div className="space-y-4 text-lg text-slate-800">
            <h2 id="who" className="text-3xl font-bold text-navy">Who we are</h2>
            <p>
              The foundation of the Pennsylvania Nepalese Guthi Association (PNGA) was laid on spontaneous community
              actions spearheaded by a few Nepalese immigrants in Montgomery County to restore social justice and
              reduce vulnerabilities of immigrant communities in Pennsylvania. PNGA is a 501(c)(3) community-based
              organization.
            </p>
            <p>
              Unlike other communities of color, low-income immigrants, particularly Asians, face cultural and language
              barriers, including disproportionate racial disparities that reduce their access to opportunities and
              resources. PNGA strives to empower communities of color, particularly Asians. Our current programs focus
              primarily on Nepalese and other South Asian communities.
            </p>
            <p className="flex flex-wrap gap-x-6 gap-y-2">
              <Link to="/about/history" className="font-bold text-navy underline">Our history</Link>
              <Link to="/about/leadership" className="font-bold text-navy underline">Our board of directors</Link>
              <Link to="/programs" className="font-bold text-navy underline">What we do</Link>
            </p>
          </div>
          <img
            src={GALLERY_IMAGES[6].src}
            alt={GALLERY_IMAGES[6].alt}
            width={804}
            height={1270}
            loading="lazy"
            className="w-full rounded-3xl object-cover shadow-lg"
          />
        </section>

        <ul className="grid gap-6 md:grid-cols-3">
          <li className="rounded-2xl border border-slate-200 bg-white p-6">
            <Eye size={32} className="text-gold-dark" aria-hidden="true" />
            <h2 className="mt-3 text-2xl font-bold text-navy">Our vision</h2>
            <p className="mt-2 text-slate-800">
              A fair and just Pennsylvania where all residents, irrespective of race, ethnicity and gender, live with
              dignity and have equal opportunities to prosper.
            </p>
          </li>
          <li className="rounded-2xl border border-slate-200 bg-white p-6">
            <Target size={32} className="text-navy" aria-hidden="true" />
            <h2 className="mt-3 text-2xl font-bold text-navy">Our mission</h2>
            <p className="mt-2 text-slate-800">
              To improve the lives of low-income immigrant communities in Pennsylvania, especially Montgomery County,
              through community empowerment, capacity building, civic engagement and advocacy while promoting cultural
              harmony.
            </p>
          </li>
          <li className="rounded-2xl border border-slate-200 bg-white p-6">
            <ShieldCheck size={32} className="text-navy" aria-hidden="true" />
            <h2 className="mt-3 text-2xl font-bold text-navy">Our values</h2>
            <ul className="mt-2 list-disc pl-5 text-slate-800">
              {VALUES.map((v) => (
                <li key={v}>{v}</li>
              ))}
            </ul>
          </li>
        </ul>

        <section aria-labelledby="members" className="rounded-2xl border border-slate-200 bg-white p-6">
          <h2 id="members" className="text-2xl font-bold text-navy">Our members</h2>
          <p className="mt-2 text-lg text-slate-800">PNGA has four types of members:</p>
          <ul className="mt-2 list-disc pl-6 text-lg">
            <li>Founding Members</li>
            <li>Promoters</li>
            <li>Life Members</li>
            <li>Annual Members</li>
          </ul>
          <p className="mt-3 text-lg">
            Interested in joining? <Link to="/get-involved" className="font-bold text-navy underline">Find out how</Link>.
          </p>
        </section>

        <section aria-labelledby="supporters" className="rounded-2xl border border-slate-200 bg-white p-6">
          <h2 id="supporters" className="text-2xl font-bold text-navy">Our supporters</h2>
          <p className="mt-2 text-lg text-slate-800">PNGA's work has been supported by:</p>
          <ul className="mt-2 list-disc pl-6 text-lg">
            {SUPPORTERS.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
          <p className="mt-3 text-lg">
            Want to help? <Link to="/donate" className="font-bold text-navy underline">Ways to give</Link>.
          </p>
        </section>
      </div>
    </>
  );
}
