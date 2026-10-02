// Upcoming events. Add one entry per event; past events are hidden automatically.
// Events normally come from the Events Google Sheet (see README). Anything listed
// here is only a fallback shown when the sheet is empty or not set up.
// Dates use YYYY-MM-DD and times use 24-hour HH:MM.
//
// Example:
// {
//   id: 'dashain-2026',
//   title: 'Dashain Celebration',
//   date: '2026-10-24',
//   startTime: '12:00',
//   endTime: '16:00',
//   location: 'Venue name',
//   address: 'Street, City, PA 19444',
//   description: 'One or two sentences about the event.',
//   category: 'Festival',
//   registrationUrl: 'https://...',
// },

export interface CommunityEvent {
  id: string;
  title: string;
  date: string;
  startTime?: string;
  endTime?: string;
  location: string;
  address?: string;
  description: string;
  /** Optional Nepali text (from the "... (Nepali)" sheet columns). Empty means "show the English". */
  titleNe?: string;
  locationNe?: string;
  descriptionNe?: string;
  category: string;
  registrationUrl?: string;
}

export const EVENTS: CommunityEvent[] = [];
