import { Link } from 'react-router-dom';
import Seo from '../components/Seo';

export default function NotFound() {
  return (
    <>
      <Seo path="/404" title="Page not found" noindex />
      <div className="mx-auto max-w-2xl px-4 py-20 text-center sm:px-6">
        <h1 className="text-4xl font-bold text-navy">Page not found</h1>
        <p className="mt-4 text-xl text-slate-700">Sorry, we could not find that page. It may have moved.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/" className="btn btn-navy">Go to the home page</Link>
          <Link to="/help" className="btn btn-outline">Get help</Link>
        </div>
      </div>
    </>
  );
}
