import Seo, { breadcrumbJsonLd } from '../components/Seo';
import PageHeader from '../components/PageHeader';
import EventList from '../components/EventList';
import { Link } from 'react-router-dom';

export default function Events() {
  return (
    <>
      <Seo
        path="/events"
        title="Nepali Events in Pennsylvania"
        description="Cultural celebrations, community events and meetings of the Nepali community in Pennsylvania, with dates, places and how to register."
        jsonLd={[breadcrumbJsonLd([{ name: 'Home', path: '/' }, { name: 'Events', path: '/events' }])]}
      />
      <PageHeader
        title="Events"
        crumbs={[{ label: 'Events' }]}
        intro="Festivals, meetings and community gatherings. Add any event to your phone calendar with one tap."
      />
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <EventList />
        <p className="mt-10 text-lg text-slate-700">
          Attending an event? Please sign the <Link to="/waiver" className="font-bold text-navy underline">event waiver</Link> once. Want to see photos from past celebrations? <Link to="/gallery" className="font-bold text-navy underline">Visit the photo gallery</Link>.
        </p>
      </div>
    </>
  );
}
