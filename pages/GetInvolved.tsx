import { Link } from 'react-router-dom';
import { HandHeart, Users } from 'lucide-react';
import Seo, { breadcrumbJsonLd } from '../components/Seo';
import PageHeader from '../components/PageHeader';
import { VOLUNTEER_AREAS as AREAS } from '../data/agreements';


export default function GetInvolved() {
  return (
    <>
      <Seo
        path="/get-involved"
        title="Volunteer with PNGA – Nepali Community Pennsylvania"
        description="Volunteer with PNGA or become a member. Help at events, teach, translate, support newcomers and more."
        jsonLd={[breadcrumbJsonLd([{ name: 'Home', path: '/' }, { name: 'Get involved', path: '/get-involved' }])]}
      />
      <PageHeader
        title="Get involved"
        crumbs={[{ label: 'Get involved' }]}
        intro="PNGA runs on volunteers. There is a way to help whatever your time or skills."
      />
      <div className="mx-auto grid max-w-5xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-2">
        <section className="rounded-2xl border border-slate-200 bg-white p-7" aria-labelledby="volunteer">
          <HandHeart size={36} className="text-crimson-dark" aria-hidden="true" />
          <h2 id="volunteer" className="mt-3 text-3xl font-bold text-navy">Volunteer</h2>
          <p className="mt-3 text-lg text-slate-700">You can help with:</p>
          <ul className="mt-2 list-disc space-y-1 pl-6 text-lg">
            {AREAS.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
          <Link to="/volunteer" className="btn btn-primary mt-6">Sign up to volunteer</Link>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-7" aria-labelledby="join">
          <Users size={36} className="text-navy" aria-hidden="true" />
          <h2 id="join" className="mt-3 text-3xl font-bold text-navy">Become a member</h2>
          <p className="mt-3 text-lg text-slate-700">PNGA has four types of members:</p>
          <ul className="mt-2 list-disc space-y-1 pl-6 text-lg">
            <li>Founding Members</li>
            <li>Promoters</li>
            <li>Life Members</li>
            <li>Annual Members</li>
          </ul>
          <p className="mt-3 text-slate-700">
            Tell us you are interested and we will send you the details.
          </p>
          <Link to="/contact?topic=Membership" className="btn btn-navy mt-6">Tell us you are interested</Link>
        </section>
      </div>
    </>
  );
}
