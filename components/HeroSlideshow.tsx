import { useEffect, useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';

export interface Slide {
  src: string;
  alt: string;
}

/**
 * A looping picture slideshow for the top of the home page.
 * - Fades from one picture to the next every few seconds, and starts over after the last one.
 * - Pauses while someone points at it or tabs into it, and has a Pause/Play button (people need to be able to stop moving content).
 * - Does not start moving by itself for visitors who asked their device to reduce motion.
 */
export default function HeroSlideshow({ slides: all, interval = 6000 }: { slides: Slide[]; interval?: number }) {
  // A photo whose link is broken (not shared, deleted, not an image) is skipped rather than shown as a blank frame.
  const [failed, setFailed] = useState<string[]>([]);
  const slides = all.filter((s) => !failed.includes(s.src));
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [held, setHeld] = useState(false);
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) setPlaying(false);
  }, []);

  useEffect(() => {
    if (index >= slides.length) setIndex(0);
  }, [index, slides.length]);

  useEffect(() => {
    if (!playing || held || slides.length < 2) return;
    const id = window.setTimeout(() => setIndex((i) => (i + 1) % slides.length), interval);
    return () => window.clearTimeout(id);
  }, [index, playing, held, slides.length, interval]);

  if (!slides.length) return null;

  return (
    <div
      ref={box}
      role="group"
      aria-roledescription="carousel"
      aria-label="Photos from our community"
      className="relative overflow-hidden rounded-3xl bg-navy-dark shadow-xl"
      onMouseEnter={() => setHeld(true)}
      onMouseLeave={() => setHeld(false)}
      onFocus={() => setHeld(true)}
      onBlur={(e) => { if (!box.current?.contains(e.relatedTarget as Node | null)) setHeld(false); }}
    >
      <div className="relative aspect-[16/10] w-full">
        {slides.map((s, i) => (
          <img
            key={s.src}
            src={s.src}
            alt={s.alt}
            width={1600}
            height={1000}
            loading={i === 0 ? 'eager' : 'lazy'}
            fetchPriority={i === 0 ? 'high' : undefined}
            onError={() => setFailed((f) => (f.includes(s.src) ? f : [...f, s.src]))}
            aria-hidden={i === index ? undefined : true}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 motion-reduce:transition-none ${i === index ? 'opacity-100' : 'opacity-0'}`}
          />
        ))}
      </div>

      <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 bg-gradient-to-t from-black/60 to-transparent px-4 pb-3 pt-8">
        <button
          type="button"
          onClick={() => setPlaying((p) => !p)}
          aria-label={playing ? 'Pause the photo slideshow' : 'Play the photo slideshow'}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-navy hover:bg-slate-100"
        >
          {playing ? <Pause size={20} aria-hidden="true" /> : <Play size={20} aria-hidden="true" />}
        </button>
        {slides.length > 1 && (
          <div className="flex items-center">
            {slides.map((s, i) => (
              <button
                key={s.src}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Show photo ${i + 1} of ${slides.length}`}
                aria-current={i === index ? 'true' : undefined}
                className="flex h-11 w-9 items-center justify-center"
              >
                <span className={`block h-3 rounded-full transition-all ${i === index ? 'w-7 bg-white' : 'w-3 bg-white/60'}`} />
              </button>
            ))}
          </div>
        )}
      </div>
      <p className="sr-only" aria-live={playing ? 'off' : 'polite'}>{`Photo ${index + 1} of ${slides.length}: ${slides[index]?.alt ?? ''}`}</p>
    </div>
  );
}
