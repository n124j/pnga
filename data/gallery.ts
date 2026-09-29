// Photos are currently linked from PNGA's Google Photos album. Links like these
// can stop working. Before launch, download the originals, compress them
// (about 1600px wide, WebP, under 200 KB) and store them in /public/images.
// Add an accurate description in `alt` for each photo.

export interface GalleryImage {
  caption?: string;
  src: string;
  alt: string;
}

const g = (id: string, size: string) =>
  `https://lh3.googleusercontent.com/pw/${id}=${size}-s-no-gm`;

export const GALLERY_IMAGES: GalleryImage[] = [
  { src: g('AP1GczPyxoq86IlJYfnH-egp7p09zK6DeS2fi848ev_XXMV_-JU2tRlkQnaycS7hk9FjfnN51TgR3Ol4AFsVIy5V_rvnrUa76JT8o5XjjtV4mMRevWbN5PASCZuUtPbPSJ7nCgTvJsbrkfcB9qtMB7sccSn4', 'w1358-h905'), alt: 'PNGA community gathering' },
  { src: g('AP1GczPmayIi1ubnd8yRovpYlzoDbMz1UBWHR4gl3xp_GCEHlIkpTHSfFkXRz49SUHmWZkJtz3UtYR_EewRWrEyupPMTydQmaJLFh7FxEXTWnODbq5TPqb1erAH0GdQF6QTn9v9KNMo-B9RvNfUfc6XTWRSj', 'w1358-h905'), alt: 'PNGA community celebration' },
  { src: g('AP1GczMIKqR6-zkBaUfIgRLa0MFog5AGTP0mJVnJIXmpCehbc6_7Fcd4BhcWU_TSC_JfrtSpkF1-HvsyEE5ivVKspW0onbGAvSJI4NuZG4jWtHU5WKEe5FM3Dod9egJ7riJx-X1UEyOfV3sJ-IujmhJlD3xC', 'w1358-h905'), alt: 'Community members at a PNGA event' },
  { src: g('AP1GczOmT8RseusuqFdjL9asNz2tcN1LYIFyDoS9Ok3ekFCFi5CsT9bSTWwb1NGAMoubFJiKTtLpvYhM0j94ikc7ZL9deqFQyj0bqlS9IYvzH_woBYpJCsmdwvYodLe9f-TADIRtCSGJbF71ktFLLJxsD6qc', 'w1358-h893'), alt: 'PNGA event participants' },
  { src: g('AP1GczMeGLEE5x41H1VLFdzeqXW-7I6G43XPzU7Qqbfzm9-BdKDynjI4fzNucyWMBSqZfgs-iiYXEZeGHAWsoOrdwrkGvSvk8h4R5o0Qb0o1_8yEPRjlghQHVfBWQ-NZUu-qz4V0pDZiOs8-Rm0OUcxrsINQ', 'w1358-h1018'), alt: 'Community members together' },
  { src: g('AP1GczNOB26t_fUAcBqP4DX2P8zZWlhqsDuHLjYrGKD3cf9xIiyYLKd0rsIisxoqQ6Vn9JDhmZeLuzdtNLzS0UjpbNHEtBpZn7nacEQOhBshPiJOInXOg0OetXJvOrq4hNzwS8bOuG1Afa4CiJMqTplxHBA', 'w1358-h762'), alt: 'PNGA community celebration outdoors' },
  { src: g('AP1GczPWbizY-0in8YUwM-py66gmNJBw9dKhItUMFHyfFeH2cAPQm2sEqghMT9VUKSEH5PcH5nCRRtcmp4XSCeGdXoNl7Nqi__-4cFojgJTRCXqrH6ZpO5d-2vE6upGjcXyB_tBlhUVgySypwcN94Xsxx7_P', 'w804-h1270'), alt: 'PNGA board members and community' },
];
