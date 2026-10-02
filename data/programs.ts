// What PNGA does, as described in PNGA's own website material.

export interface ProgramSection {
  heading: string;
  /** Nepali heading (optional). */
  headingNe?: string;
  items: string[];
  /** Nepali version of each item, in the same order as `items` (an empty entry means "use the English"). */
  itemsNe?: string[];
  /** Optional one-sentence explanation shown under an item, keyed by the item's text. */
  notes?: Record<string, string>;
  /** Nepali version of a note, keyed by the English item text. */
  notesNe?: Record<string, string>;
}

export interface Program {
  id: string;
  title: string;
  summary: string;
  icon: 'HeartHandshake' | 'GraduationCap' | 'HeartPulse' | 'Vote' | 'ClipboardList' | 'HandHeart';
  intro: string;
  /** Optional Nepali versions. Anything missing falls back to the English. */
  titleNe?: string;
  summaryNe?: string;
  introNe?: string;
  sections: ProgramSection[];
}

export const PROGRAMS: Program[] = [
  {
    id: 'social-service',
    title: 'Social Service',
    titleNe: 'सामाजिक सेवा',
    summary: 'Support for community members, Nepali and American celebrations, and the annual picnic.',
    summaryNe: 'समुदायका सदस्यलाई सहयोग, नेपाली र अमेरिकी उत्सव, र वार्षिक पिकनिक।',
    icon: 'HeartHandshake',
    intro:
      'PNGA supports community members as their needs arise and brings people together to celebrate both Nepali and American heritage.',
    introNe: 'PNGA ले समुदायका सदस्यलाई आवश्यकता पर्दा सहयोग गर्छ र नेपाली तथा अमेरिकी दुवै सम्पदाको उत्सव मनाउन मानिसहरूलाई एकसाथ ल्याउँछ।',
    sections: [
      {
        heading: 'What this includes',
        headingNe: 'यसमा के के पर्छन्',
        itemsNe: ['आवश्यकताअनुसार समुदायका सदस्यलाई सेवा र सहयोग', 'सांस्कृतिक र सम्पदा सम्बन्धी उत्सवहरू, नेपाली र अमेरिकी', 'वार्षिक पिकनिक'],
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
    titleNe: 'शिक्षा र तालिम',
    summary: 'Heritage and language classes, a resource center, English classes and youth development.',
    summaryNe: 'सम्पदा र भाषा कक्षा, स्रोत केन्द्र, अङ्ग्रेजी कक्षा र युवा विकास।',
    icon: 'GraduationCap',
    intro:
      'From children learning Nepali to adults learning English, PNGA helps people build the skills to thrive.',
    introNe: 'नेपाली सिक्ने बालबालिकादेखि अङ्ग्रेजी सिक्ने वयस्कसम्म, PNGA ले मानिसलाई सफल हुने सीप निर्माण गर्न मद्दत गर्छ।',
    sections: [
      {
        heading: 'Heritage and language',
        headingNe: 'सम्पदा र भाषा',
        itemsNe: ['युवा र बालबालिकाका लागि सम्पदा र भाषा कक्षा'],
        items: ['Heritage and language classes for youth and children'],
      },
      {
        heading: 'Resource center',
        headingNe: 'स्रोत केन्द्र',
        itemsNe: ['युवाहरू (७ देखि १२ वर्ष) का लागि डिजिटल शिक्षा', 'वयस्कहरूका लागि डिजिटल शिक्षा', 'स्कुलपछिको कार्यक्रम'],
        items: ['Digital education for youth (ages 7 to 12)', 'Digital education for adults', 'After-school program'],
      },
      {
        heading: 'Language barriers',
        headingNe: 'भाषिक अवरोध',
        itemsNe: ['वयस्क महिला र पुरुषका लागि अङ्ग्रेजी दोस्रो भाषाका रूपमा (ESL)'],
        items: ['English as a Second Language (ESL) for adult women and men'],
      },
      {
        heading: 'Youth development',
        headingNe: 'युवा विकास',
        itemsNe: ['नेतृत्व विकास', 'कलेज तयारी'],
        items: ['Leadership development', 'College preparation'],
      },
    ],
  },
  {
    id: 'health-nutrition',
    title: 'Health and Nutrition',
    titleNe: 'स्वास्थ्य र पोषण',
    summary: 'Health awareness, nutrition education, COVID-19 education and vaccine clinics.',
    summaryNe: 'स्वास्थ्य सचेतना, पोषण शिक्षा, कोभिड-१९ शिक्षा र खोप क्लिनिकहरू।',
    icon: 'HeartPulse',
    intro:
      'PNGA raises awareness about health and nutrition so that families can prevent common problems and find care.',
    introNe: 'PNGA ले स्वास्थ्य र पोषणबारे सचेतना फैलाउँछ ताकि परिवारले सामान्य समस्या रोक्न र स्वास्थ्य सेवा पाउन सकून्।',
    sections: [
      {
        heading: 'COVID-19',
        headingNe: 'कोभिड-१९',
        itemsNe: ['निकटतम समुदाय र अग्रपङ्क्तिका कामदारलाई सेवा, २०२० देखि २०२१', 'कोभिड-१९ शिक्षा र सचेतना, २०२२ देखि २०२३', 'खोप शिक्षा र क्लिनिक, २०२० देखि २०२३'],
        items: [
          'Service to the immediate community and frontline workers, 2020 to 2021',
          'COVID-19 education and awareness, 2022 to 2023',
          'Vaccine education and clinics, 2020 to 2023',
        ],
      },
      {
        heading: 'Mental and behavioral health',
        headingNe: 'मानसिक तथा व्यवहारगत स्वास्थ्य',
        itemsNe: ['मानसिक तथा व्यवहारगत स्वास्थ्य, र लागुपदार्थ सेवन सम्बन्धी सचेतना'],
        items: ['Mental and behavioral health, and substance use awareness'],
      },
      {
        heading: 'Nutrition awareness',
        headingNe: 'पोषण सचेतना',
        itemsNe: ['पौष्टिक खानेकुराले मधुमेह र उच्च रक्तचाप जस्ता सामान्य स्वास्थ्य समस्या रोक्न किन मद्दत गर्छ', 'आफ्नो थाली योजना बनाउने तरिका'],
        items: [
          'Why nutritious food helps prevent common health problems such as diabetes and high blood pressure',
          'Planning your plate',
        ],
      },
      {
        heading: 'Health awareness series',
        headingNe: 'स्वास्थ्य सचेतना शृङ्खला',
        itemsNe: ['मधुमेह र उच्च रक्तचाप रोकथाम', 'पाठेघरको मुख र स्तन क्यान्सर', 'दन्त स्वच्छता', 'प्रजनन स्वास्थ्य'],
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
    titleNe: 'नागरिक सहभागिता',
    summary: 'Learn why civic engagement matters, and get help with voter education and registration.',
    summaryNe: 'नागरिक सहभागिता किन महत्त्वपूर्ण छ भन्ने जान्नुहोस्, र मतदाता शिक्षा तथा दर्तामा सहयोग पाउनुहोस्।',
    icon: 'Vote',
    intro: 'A strong community takes part in the decisions that affect it. PNGA helps people understand how.',
    introNe: 'बलियो समुदायले आफूलाई असर गर्ने निर्णयहरूमा भाग लिन्छ। PNGA ले मानिसलाई कसरी भनेर बुझ्न मद्दत गर्छ।',
    sections: [
      {
        heading: 'What this includes',
        headingNe: 'यसमा के के पर्छन्',
        itemsNe: ['नागरिक सहभागिता के हो र किन महत्त्वपूर्ण छ', 'मतदाता शिक्षा', 'मतदाता दर्ता'],
        items: ['What civic engagement is and why it is important', 'Voter education', 'Voter registration'],
      },
    ],
  },
  {
    id: 'research',
    title: 'Research and Studies',
    titleNe: 'अनुसन्धान र अध्ययन',
    summary: 'Issue-based research, needs assessments and program evaluation.',
    summaryNe: 'मुद्दामा आधारित अनुसन्धान, आवश्यकता मूल्याङ्कन र कार्यक्रम मूल्याङ्कन।',
    icon: 'ClipboardList',
    intro: 'PNGA studies what the community needs, so programs are built on evidence.',
    introNe: 'PNGA ले समुदायलाई के चाहिन्छ भनेर अध्ययन गर्छ, ताकि कार्यक्रमहरू प्रमाणमा आधारित होऊन्।',
    sections: [
      {
        heading: 'What this includes',
        headingNe: 'यसमा के के पर्छन्',
        itemsNe: ['मुद्दामा आधारित अनुसन्धान', 'आवश्यकता मूल्याङ्कन', 'कार्यक्रम विकास', 'कार्यक्रम मूल्याङ्कन र समीक्षा'],
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
    titleNe: 'स्वयंसेवक परिचालन',
    summary: 'Recruiting and organizing volunteers, and membership drives.',
    summaryNe: 'स्वयंसेवकको भर्ना र सङ्गठन, र सदस्यता अभियान।',
    icon: 'HandHeart',
    intro: 'PNGA runs on the time and skills of volunteers. We recruit them and help them make a difference.',
    introNe: 'PNGA स्वयंसेवकको समय र सीपमा चल्छ। हामी उनीहरूलाई भर्ना गर्छौँ र फरक पार्न मद्दत गर्छौँ।',
    sections: [
      {
        heading: 'What this includes',
        headingNe: 'यसमा के के पर्छन्',
        itemsNe: ['स्वयंसेवक भर्ना', 'स्वयंसेवक परिचालन', 'सदस्यता अभियान'],
        items: ['Volunteer recruitment', 'Volunteer mobilization', 'Membership drive'],
      },
    ],
  },
];

export const getProgram = (id: string | undefined) => PROGRAMS.find((p) => p.id === id);
