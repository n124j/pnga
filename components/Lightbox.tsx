import { useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import type { SheetPhoto } from '../lib/sheets';
import { pick, useI18n } from '../lib/i18n';

interface Props {
  album?: string;
  photos: SheetPhoto[];
  index: number;
  onChange: (index: number) => void;
  onClose: () => void;
}

/** Full-size photo popup. Uses the browser's built-in modal dialog, which traps focus and closes with Esc. */
export default function Lightbox({ album, photos, index, onChange, onClose }: Props) {
  const ref = useRef<HTMLDialogElement>(null);
  const opener = useRef<Element | null>(typeof document === 'undefined' ? null : document.activeElement);
  const { lang, t } = useI18n();
  const photo = photos[index];
  const caption = photo ? pick(lang, photo.caption ?? '', photo.captionNe) : '';
  const last = photos.length - 1;
  const prev = () => onChange(index === 0 ? last : index - 1);
  const next = () => onChange(index === last ? 0 : index + 1);

  useEffect(() => {
    const d = ref.current;
    if (d && !d.open) d.showModal();
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const from = opener.current as HTMLElement | null;
    return () => {
      document.body.style.overflow = previous;
      if (from?.isConnected) from.focus();
    };
  }, []);

  if (!photo) return null;
  return (
    <dialog
      ref={ref}
      aria-label={album ? `${album}: ${caption || t('lb.photo')}` : caption || t('lb.photo')}
      onClose={onClose}
      onClick={(e) => { if (e.target === ref.current) onClose(); }}
      onKeyDown={(e) => {
        if (e.key === 'ArrowLeft') { e.preventDefault(); prev(); }
        if (e.key === 'ArrowRight') { e.preventDefault(); next(); }
      }}
      className="m-auto max-h-[96vh] w-[min(96vw,1100px)] overflow-hidden rounded-2xl bg-slate-900 p-0 text-white backdrop:bg-black/80"
    >
      <div className="flex items-center justify-between gap-3 px-4 py-3">
        <div className="min-w-0">
          {album && <h2 className="truncate font-serif text-2xl font-bold">{pick(lang, album, photo.albumNe)}</h2>}
          <p className="text-base text-slate-200" aria-live="polite">{t('lb.count', { n: index + 1, total: photos.length })}</p>
        </div>
        <button
          type="button"
          onClick={() => ref.current?.close()}
          className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-base font-bold text-navy hover:bg-slate-200"
        >
          <X size={20} aria-hidden="true" /> {t('lb.close')}
        </button>
      </div>
      <div className="relative flex items-center justify-center bg-black">
        <img src={photo.src} alt={pick(lang, photo.alt, photo.altNe)} className="max-h-[70vh] w-auto max-w-full object-contain" />
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3">
        <p className="basis-full text-lg sm:min-w-0 sm:flex-1 sm:basis-auto">{caption}</p>
        {photos.length > 1 && (
          <div className="flex gap-2">
            <button type="button" onClick={prev} className="inline-flex items-center gap-1 rounded-lg bg-white px-4 py-2 text-base font-bold text-navy hover:bg-slate-200">
              <ChevronLeft size={20} aria-hidden="true" /> {t('gal.prev')}
            </button>
            <button type="button" onClick={next} className="inline-flex items-center gap-1 rounded-lg bg-white px-4 py-2 text-base font-bold text-navy hover:bg-slate-200">
              {t('gal.next')} <ChevronRight size={20} aria-hidden="true" />
            </button>
          </div>
        )}
      </div>
    </dialog>
  );
}
