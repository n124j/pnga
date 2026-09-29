import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Seo, { breadcrumbJsonLd } from '../components/Seo';
import PageHeader from '../components/PageHeader';
import Lightbox from '../components/Lightbox';
import { useGallery } from '../lib/sheets';

const PAGE_SIZE = 12;

/** Google-hosted photos can be requested at a smaller size for the thumbnail grid. */
const thumb = (src: string) => src.replace(/=w\d+$/, '=w600');

export default function Gallery() {
  const all = useGallery();
  const albums = Array.from(new Set(all.map((p) => p.album).filter(Boolean)));
  const [album, setAlbum] = useState('All');
  const [page, setPage] = useState(1);
  // The popup only browses the album of the photo that was clicked, never the whole gallery.
  const [viewer, setViewer] = useState<{ album: string; index: number } | null>(null);
  const top = useRef<HTMLHeadingElement>(null);
  const first = useRef(true);

  const photos = album === 'All' ? all : all.filter((p) => p.album === album);
  const pages = Math.max(1, Math.ceil(photos.length / PAGE_SIZE));
  const current = Math.min(page, pages);
  const shown = photos.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);

  // After changing page, bring the top of the gallery into view (not on first load).
  useEffect(() => {
    if (first.current) { first.current = false; return; }
    top.current?.scrollIntoView({ block: 'start' });
  }, [current, album]);

  const viewerPhotos = viewer ? all.filter((p) => p.album === viewer.album) : [];

  const openPhoto = (src: string, photoAlbum: string) => {
    const index = all.filter((p) => p.album === photoAlbum).findIndex((p) => p.src === src);
    setViewer({ album: photoAlbum, index: Math.max(0, index) });
  };

  const closeViewer = () => {
    const last = viewer ? viewerPhotos[viewer.index] : undefined;
    const at = last ? photos.findIndex((p) => p.src === last.src) : -1;
    if (at >= 0) setPage(Math.floor(at / PAGE_SIZE) + 1); // show the page of the last photo viewed
    setViewer(null);
    // If the thumbnail that opened the viewer is no longer on screen, keep keyboard focus at the top of the gallery.
    requestAnimationFrame(() => {
      const a = document.activeElement;
      if (!a || a === document.body) top.current?.focus();
    });
  };

  const pageBtn = 'min-w-[3rem] rounded-lg border-2 px-3 py-2 text-lg font-bold';

  return (
    <>
      <Seo
        path="/gallery"
        title="Photo Gallery"
        description="Photos from PNGA celebrations and community gatherings in Pennsylvania."
        jsonLd={[breadcrumbJsonLd([{ name: 'Home', path: '/' }, { name: 'Photo gallery', path: '/gallery' }])]}
      />
      <PageHeader title="Photo gallery" crumbs={[{ label: 'Photo gallery' }]} intro="Moments from our celebrations and gatherings. Select a photo to see it larger." />
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <h2 ref={top} tabIndex={-1} className="sr-only">Photos</h2>

        {albums.length > 1 && (
          <div role="group" aria-label="Filter by album" className="mb-8 flex flex-wrap gap-2">
            {['All', ...albums].map((a) => (
              <button
                key={a}
                type="button"
                aria-pressed={a === album}
                onClick={() => { setAlbum(a); setPage(1); }}
                className={`rounded-full border-2 px-4 py-2 text-base font-bold ${
                  a === album ? 'border-navy bg-navy text-white' : 'border-navy bg-white text-navy hover:bg-slate-100'
                }`}
              >
                {a}
              </button>
            ))}
          </div>
        )}

        <ul className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
          {shown.map((img) => {
            return (
              <li key={img.src} className="overflow-hidden rounded-2xl bg-white shadow-sm">
                <button
                  type="button"
                  onClick={() => openPhoto(img.src, img.album)}
                  className="group block w-full text-left"
                  aria-label={`View larger: ${img.caption || img.alt}`}
                >
                  <img src={thumb(img.src)} alt="" loading="lazy" className="aspect-square w-full object-cover transition-transform group-hover:scale-105" />
                  {img.caption && <span className="block p-3 text-base text-slate-800 [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2] overflow-hidden">{img.caption}</span>}
                </button>
              </li>
            );
          })}
        </ul>

        {pages > 1 && (
          <nav aria-label="Gallery pages" className="mt-10 flex flex-wrap items-center justify-center gap-2">
            <button type="button" disabled={current === 1} onClick={() => setPage(current - 1)} className={`${pageBtn} border-navy bg-white text-navy hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40`}>
              Previous
            </button>
            {Array.from({ length: pages }, (_, n) => n + 1).map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setPage(n)}
                aria-current={n === current ? 'page' : undefined}
                aria-label={`Page ${n}`}
                className={`${pageBtn} ${n === current ? 'border-navy bg-navy text-white' : 'border-navy bg-white text-navy hover:bg-slate-100'}`}
              >
                {n}
              </button>
            ))}
            <button type="button" disabled={current === pages} onClick={() => setPage(current + 1)} className={`${pageBtn} border-navy bg-white text-navy hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40`}>
              Next
            </button>
          </nav>
        )}
        {pages > 1 && <p className="mt-3 text-center text-slate-700">Page {current} of {pages}</p>}

        <p className="mt-10 text-lg">
          Have photos from a PNGA event to share? <Link to="/contact?topic=Photos" className="font-bold text-navy underline">Send them to us</Link>.
        </p>
      </div>

      {viewer && (
        <Lightbox
          album={viewer.album}
          photos={viewerPhotos}
          index={viewer.index}
          onChange={(index) => setViewer({ album: viewer.album, index })}
          onClose={closeViewer}
        />
      )}
    </>
  );
}
