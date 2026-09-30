/**
 * The pictures that fade in a loop at the top of the home page, used when the Hero
 * Google Sheet is not set up or is empty. Files live in public/images/hero.
 * (Volunteers change the live slideshow in the Hero sheet, not here.)
 */
export interface HeroSlide {
  src: string;
  alt: string;
}

export const HERO_SLIDES: HeroSlide[] = [
  { src: '/images/hero/hero-1.jpg', alt: 'Temples and a carved stone pillar in a historic square in Nepal under a blue sky' },
  { src: '/images/hero/hero-2.jpg', alt: 'A festival crowd in a Nepali town square around a chariot with a golden roof' },
  { src: '/images/hero/hero-3.jpg', alt: 'Six Nepali women in matching purple tops and headscarves standing arm in arm, holding rice seedlings' },
  { src: '/images/hero/hero-4.jpg', alt: 'Young people in colorful traditional dress and gold jewelry gathered at a cultural celebration' },
];
