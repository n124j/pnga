import { Link } from 'react-router-dom';
import Seo, { breadcrumbJsonLd } from '../components/Seo';
import PageHeader from '../components/PageHeader';

export default function History() {
  return (
    <>
      <Seo
        path="/about/history"
        title="Our History"
        description="How the Pennsylvania Nepalese Guthi Association began, and the grant that changed its course."
        jsonLd={[
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'About', path: '/about' },
            { name: 'Our history', path: '/about/history' },
          ]),
        ]}
      />
      <PageHeader
        title="Our history"
        crumbs={[{ label: 'About', to: '/about' }, { label: 'Our history' }]}
        intro="How PNGA came into being."
      />
      <div className="prose-block mx-auto max-w-3xl px-4 py-10 text-lg sm:px-6">
        <h2>How we began</h2>
        <p>
          PNGA began with spontaneous community action led by a few Nepalese immigrants in Montgomery County. They
          wanted to restore social justice and reduce the vulnerabilities that immigrant communities in Pennsylvania
          face. From those first efforts grew a community-based organization.
        </p>
        <h2>What changed our course</h2>
        <p>
          A grant opportunity through the American Rescue Plan Act (ARPA) proved to be the long-awaited turning
          point for PNGA.
        </p>
        <h2>Who has supported us</h2>
        <ul>
          <li>Montgomery County Recovery Office</li>
          <li>Philip Jaisohn Memorial Foundation</li>
          <li>Private contributors</li>
        </ul>
        <p>
          Read about <Link to="/programs">what we do today</Link> or meet <Link to="/about/leadership">our board</Link>.
        </p>
      </div>
    </>
  );
}
