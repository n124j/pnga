// What PNGA does, as described in PNGA's own website material.

export interface ProgramSection {
  heading: string;
  items: string[];
  /** Optional one-sentence explanation shown under an item, keyed by the item's text. */
  notes?: Record<string, string>;
}

export interface Program {
  id: string;
  title: string;
  summary: string;
  icon: 'HeartHandshake' | 'GraduationCap' | 'HeartPulse' | 'Vote' | 'ClipboardList' | 'HandHeart';
  intro: string;
  sections: ProgramSection[];
}

export const PROGRAMS: Program[] = [
  {
    id: 'social-service',
    title: 'Social Service',
    summary: 'Support for community members, Nepali and American celebrations, and the annual picnic.',
    icon: 'HeartHandshake',
    intro:
      'PNGA supports community members as their needs arise and brings people together to celebrate both Nepali and American heritage.',
    sections: [
      {
        heading: 'What this includes',
        items: [
          'Services and support to community members as required',
          'Cultural and heritage celebrations, Nepali and American',
          'Annual picnic',
        ],
      },
    ],
  },
  {
    id: 'education-training',
    title: 'Education and Training',
    summary: 'Heritage and language classes, a resource center, English classes and youth development.',
    icon: 'GraduationCap',
    intro:
      'From children learning Nepali to adults learning English, PNGA helps people build the skills to thrive.',
    sections: [
      {
        heading: 'Heritage and language',
        items: ['Heritage and language classes for youth and children'],
      },
      {
        heading: 'Resource center',
        items: ['Digital education for youth (ages 7 to 12)', 'Digital education for adults', 'After-school program'],
      },
      {
        heading: 'Language barriers',
        items: ['English as a Second Language (ESL) for adult women and men'],
      },
      {
        heading: 'Youth development',
        items: ['Leadership development', 'College preparation'],
      },
    ],
  },
  {
    id: 'health-nutrition',
    title: 'Health and Nutrition',
    summary: 'Health awareness, nutrition education, COVID-19 education and vaccine clinics.',
    icon: 'HeartPulse',
    intro:
      'PNGA raises awareness about health and nutrition so that families can prevent common problems and find care.',
    sections: [
      {
        heading: 'COVID-19',
        items: [
          'Service to the immediate community and frontline workers, 2020 to 2021',
          'COVID-19 education and awareness, 2022 to 2023',
          'Vaccine education and clinics, 2020 to 2023',
        ],
      },
      {
        heading: 'Mental and behavioral health',
        items: ['Mental and behavioral health, and substance use awareness'],
      },
      {
        heading: 'Nutrition awareness',
        items: [
          'Why nutritious food helps prevent common health problems such as diabetes and high blood pressure',
          'Planning your plate',
        ],
      },
      {
        heading: 'Health awareness series',
        items: [
          'Preventing diabetes and high blood pressure',
          'Cervical and breast cancer',
          'Dental hygiene',
          'Reproductive health',
        ],
      },
    ],
  },
  {
    id: 'civic-engagement',
    title: 'Civic Engagement',
    summary: 'Learn why civic engagement matters, and get help with voter education and registration.',
    icon: 'Vote',
    intro: 'A strong community takes part in the decisions that affect it. PNGA helps people understand how.',
    sections: [
      {
        heading: 'What this includes',
        items: ['What civic engagement is and why it is important', 'Voter education', 'Voter registration'],
      },
    ],
  },
  {
    id: 'research',
    title: 'Research and Studies',
    summary: 'Issue-based research, needs assessments and program evaluation.',
    icon: 'ClipboardList',
    intro: 'PNGA studies what the community needs, so programs are built on evidence.',
    sections: [
      {
        heading: 'What this includes',
        items: [
          'Issue-based research',
          'Needs assessments',
          'Program development',
          'Program assessment and evaluation',
        ],
      },
    ],
  },
  {
    id: 'volunteer-mobilization',
    title: 'Volunteer Mobilization',
    summary: 'Recruiting and organizing volunteers, and membership drives.',
    icon: 'HandHeart',
    intro: 'PNGA runs on the time and skills of volunteers. We recruit them and help them make a difference.',
    sections: [
      {
        heading: 'What this includes',
        items: ['Volunteer recruitment', 'Volunteer mobilization', 'Membership drive'],
      },
    ],
  },
];

export const getProgram = (id: string | undefined) => PROGRAMS.find((p) => p.id === id);
