// DRAFT wording for board review. This is plain-language text, not legal advice.
// Have the board (and ideally a lawyer) approve it, then set VITE_WAIVERS_APPROVED=true.
// Change `version` whenever the wording changes; it is saved with every submission.

export interface AgreementSection {
  heading: string;
  paragraphs: string[];
}

export interface Agreement {
  version: string;
  sections: AgreementSection[];
}

export const VOLUNTEER_AREAS = [
  'Events',
  'Education and youth',
  'Health awareness',
  'Translation',
  'Technology',
  'Fundraising',
  'Community outreach',
  'Administration',
  'Photography and video',
];

/** Same order as VOLUNTEER_AREAS. Display only; the English name is what gets saved with the sign-up. */
export const VOLUNTEER_AREAS_NE = [
  'आयोजनाहरू',
  'शिक्षा र युवा',
  'स्वास्थ्य सचेतना',
  'अनुवाद',
  'प्रविधि',
  'कोष सङ्कलन',
  'सामुदायिक पहुँच',
  'प्रशासन',
  'फोटोग्राफी र भिडियो',
];

export const EVENT_WAIVER: Agreement = {
  version: 'event-waiver-draft-1',
  sections: [
    {
      heading: 'I take part by choice',
      paragraphs: [
        'I have chosen to take part in events and activities of the Pennsylvania Nepalese Guthi Association (PNGA), including festivals, meetings, meals, programs, trips and workshops.',
      ],
    },
    {
      heading: 'I understand the risks',
      paragraphs: [
        'Events can involve crowds, food and drink, walking, dancing, children playing, travel, weather and other ordinary risks. These can lead to illness, injury or loss of property. I understand that I take part at my own risk.',
      ],
    },
    {
      heading: 'My health and food needs',
      paragraphs: [
        'I am responsible for my own health, medicines, allergies and dietary needs. PNGA cannot promise that food is free of allergens.',
      ],
    },
    {
      heading: 'Release of responsibility',
      paragraphs: [
        'To the fullest extent the law allows, I release PNGA, its directors, officers, volunteers and the people who host or lend space for its events from claims for injury, loss or damage connected to my taking part. This does not cover harm caused by their gross negligence or willful misconduct.',
      ],
    },
    {
      heading: 'Emergencies',
      paragraphs: [
        'If I cannot speak for myself in an emergency, I allow PNGA volunteers to call emergency services and to contact the emergency person I list on this form. I am responsible for the cost of any medical care.',
      ],
    },
    {
      heading: 'Behavior',
      paragraphs: [
        'I will follow the instructions of event organizers and treat others with respect. PNGA may ask me to leave an event if my behavior puts others at risk.',
      ],
    },
    {
      heading: 'Children under 18',
      paragraphs: [
        'If I sign for a child under 18, I confirm that I am the parent or legal guardian, that I accept this agreement for my child, and that I will supervise my child at events unless PNGA has told me a program includes supervision.',
      ],
    },
    {
      heading: 'How long this lasts and which law applies',
      paragraphs: [
        'This agreement applies to PNGA events I attend during the 12 months after I sign. It is governed by the laws of the Commonwealth of Pennsylvania.',
      ],
    },
  ],
};

export const VOLUNTEER_AGREEMENT: Agreement = {
  version: 'volunteer-agreement-draft-1',
  sections: [
    {
      heading: 'Volunteering freely',
      paragraphs: [
        'I volunteer my time without pay. I am not an employee of PNGA. Either PNGA or I may end my volunteering at any time.',
      ],
    },
    {
      heading: 'Respect and conduct',
      paragraphs: [
        'I will treat everyone with respect and follow PNGA instructions. I will not harass, threaten or discriminate against anyone.',
      ],
    },
    {
      heading: 'Keeping information private',
      paragraphs: [
        'If I learn personal information about people PNGA helps, such as phone numbers, addresses or problems they share, I will keep it private. I will use it only to help PNGA serve them, and I will not share it without the person\'s permission, unless the law requires it.',
      ],
    },
    {
      heading: 'Children and vulnerable adults',
      paragraphs: [
        'I will not spend time alone with a child or a vulnerable adult while volunteering for PNGA. I will report any safety concern to a PNGA board member right away. I understand PNGA may ask for a background check for some roles.',
      ],
    },
    {
      heading: 'Using the PNGA name',
      paragraphs: [
        'I will use PNGA\'s name only for PNGA activities that its board has approved. I will not use it for personal business, or to promote a political candidate or party.',
      ],
    },
    {
      heading: 'Safety and release of responsibility',
      paragraphs: [
        'I understand volunteering can involve ordinary risks such as lifting, travel and crowds. To the fullest extent the law allows, I release PNGA, its directors, officers and other volunteers from claims for injury, loss or damage connected to my volunteering. This does not cover harm caused by their gross negligence or willful misconduct.',
      ],
    },
    {
      heading: 'Governing law',
      paragraphs: ['This agreement is governed by the laws of the Commonwealth of Pennsylvania.'],
    },
  ],
};

export const PHOTO_RELEASE: Agreement = {
  version: 'photo-release-draft-1',
  sections: [
    {
      heading: 'What I am allowing',
      paragraphs: [
        'If I choose "Yes" below, I allow PNGA to take photos and videos of me, and of any child I list who is under my care, at PNGA events and activities, and to use them to tell the story of PNGA\'s work.',
      ],
    },
    {
      heading: 'Where they may be used',
      paragraphs: [
        'PNGA\'s website, social media pages, newsletters, flyers, presentations, and reports to funders and partners.',
      ],
    },
    {
      heading: 'No payment, and names',
      paragraphs: [
        'I will not be paid for the use of these photos and videos. PNGA will not publish full names next to photos of children. It will publish an adult\'s name only if the adult agrees.',
      ],
    },
    {
      heading: 'Changing my mind',
      paragraphs: [
        'I may withdraw this permission at any time by contacting PNGA. PNGA will stop using the photos and videos in new materials and will remove them from its website and social media pages where it can. It cannot take back printed items or things that others have already copied or shared.',
      ],
    },
    {
      heading: 'Children under 18',
      paragraphs: [
        'If I list a child, I confirm that I am the child\'s parent or legal guardian and that I have the right to give this permission for the child.',
      ],
    },
  ],
};
