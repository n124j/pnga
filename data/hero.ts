/**
 * The pictures that fade in a loop at the top of the home page, used when the Hero
 * Google Sheet is not set up or is empty. Files live in public/images/hero.
 * (Volunteers change the live slideshow in the Hero sheet, not here.)
 */
export interface HeroSlide {
  src: string;
  alt: string;
  /** Optional Nepali description (from the "Description (Nepali)" column). */
  altNe?: string;
}

export const HERO_SLIDES: HeroSlide[] = [
  { src: '/images/hero/hero-1.jpg', alt: 'Temples and a carved stone pillar in a historic square in Nepal under a blue sky', altNe: 'नेपालको ऐतिहासिक चोकमा नीलो आकाशमुनि मन्दिरहरू र कुँदिएको ढुङ्गाको स्तम्भ' },
  { src: '/images/hero/hero-2.jpg', alt: 'A festival crowd in a Nepali town square around a chariot with a golden roof', altNe: 'नेपालको एक सहरको चोकमा सुनौलो छाना भएको रथवरिपरि जात्रामा जम्मा भएको भीड' },
  { src: '/images/hero/hero-3.jpg', alt: 'Six Nepali women in matching purple tops and headscarves standing arm in arm, holding rice seedlings', altNe: 'एकैनासका बैजनी रङका कुर्ता र टाउकोमा स्कार्फ लगाएका छ जना नेपाली महिला धानका बिरुवा समातेर हात समाई उभिएका' },
  { src: '/images/hero/hero-4.jpg', alt: 'Young people in colorful traditional dress and gold jewelry gathered at a cultural celebration', altNe: 'रङ्गीचङ्गी परम्परागत पोसाक र सुनका गहना लगाएका युवायुवती सांस्कृतिक उत्सवमा भेला भएका' },
];
