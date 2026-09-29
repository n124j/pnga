// Leadership names and titles from PNGA's "List of Board Members" and website material.
// Only names and titles are published. Personal phone numbers, emails and LinkedIn
// links from that list are deliberately NOT shown on the public site.

import { BIOS } from './boardBios';

const withBio = (r: { role: string; name: string }) => ({ ...r, bio: BIOS[r.name] });

export const CURRENT_BOARD = [
  { role: 'President', name: 'Navaraj Dhakal' },
  { role: 'Vice President', name: 'Dr. Keshav Bhandari' },
  { role: 'Executive Director (pro bono)', name: 'Rajju Malla Dhakal' },
  { role: 'Secretary', name: 'Dhana Prakash Lama' },
  { role: 'Treasurer', name: 'Robin Pakhrin' },
  { role: 'Joint Secretary / Treasurer', name: 'Laxman Lama' },
  { role: 'Member', name: 'Soni Lama' },
  { role: 'Member', name: 'Hemanta / Bishnu' },
  { role: 'Member', name: 'Garbhi Lal Yadav' },
  { role: 'Member', name: 'Ramesh Ghising' },
  { role: 'Member', name: 'Roshan Simkhada' },
].map(withBio);

export const SENIOR_ADVISORS = ['Binod Moktan'];

// Recent past board, from the earlier website material.
export const RECENT_PAST_BOARD = [
  { role: 'President', name: 'Bimal Moktan' },
  { role: 'Vice President', name: 'Dipak Sapkota' },
  { role: 'Executive Director', name: 'Rajju Malla Dhakal' },
  { role: 'Secretary', name: 'Subash K. Baitha' },
  { role: 'Treasurer', name: 'Balram Shrestha' },
  { role: 'Member', name: 'Nikita Maharjan' },
  { role: 'Member', name: 'Soni Lama' },
  { role: 'Member', name: 'Robin Pakhrin' },
  { role: 'Member', name: 'Om Sapkota' },
  { role: 'Member', name: 'Bishnu Koirala' },
];

export const RECENT_PAST_ADVISORS = ['Hridai Moktan'];

// Earlier board.
export const EARLIER_BOARD = [
  { role: 'President', name: 'Bimal Moktan' },
  { role: 'Executive Director (since April 2022)', name: 'Rajju Malla Dhakal' },
  { role: 'Secretary', name: 'Hariom Shrestha' },
  { role: 'Treasurer', name: 'Jaindra Lama' },
  { role: 'Member', name: 'Nabin Lama' },
  { role: 'Member', name: 'Nikita Maharjan' },
  { role: 'Member', name: 'Bishnu Koirala' },
  { role: 'Member', name: 'Kabi Ghising' },
];

export const EARLIER_ADVISORS = ['Binod Moktan', 'Sunil Nepal'];
