import emailjs from '@emailjs/browser';

export type SendResult = 'sent' | 'not-configured' | 'error';

export interface FormPayload {
  /** What kind of message this is, e.g. "Need help", "Volunteer", "General question". */
  topic: string;
  name: string;
  email: string;
  phone: string;
  language: string;
  message: string;
}

const env = import.meta.env;

/**
 * Sends a form through EmailJS. It never pretends to succeed: if EmailJS is not
 * configured, or the request fails, the caller is told so and shows the visitor
 * another way to reach PNGA.
 */
export async function sendForm(payload: FormPayload): Promise<SendResult> {
  const serviceId = env.VITE_EMAILJS_SERVICE_ID;
  const templateId = env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = env.VITE_EMAILJS_PUBLIC_KEY;
  if (!serviceId || !templateId || !publicKey) return 'not-configured';

  try {
    await emailjs.send(
      serviceId,
      templateId,
      {
        topic: payload.topic,
        from_name: payload.name,
        from_email: payload.email,
        reply_to: payload.email,
        phone: payload.phone,
        language: payload.language,
        message: payload.message,
        to_name: 'PNGA',
      },
      { publicKey },
    );
    return 'sent';
  } catch (err) {
    console.error('Form send failed', err);
    return 'error';
  }
}

/* ---------- Waivers and sign-up forms ---------- */

export interface AgreementSubmission {
  /** Name of the form, e.g. "Event waiver". Also names the tab in the responses sheet. */
  form: string;
  /** Wording version the person agreed to. */
  version: string;
  name: string;
  email: string;
  phone: string;
  /** Every answer, keyed by its question, in the order shown on the page. */
  fields: Record<string, string>;
}

/**
 * Saves a copy of the form in PNGA's private Google Sheet through a small Google Apps Script
 * (see scripts/forms-receiver.gs). Google does not let a web page read the reply, so "sent"
 * means the request left the visitor's browser; a network or security-policy failure is "error".
 */
export async function sendToSheet(s: AgreementSubmission): Promise<SendResult> {
  const url = env.VITE_FORMS_WEBHOOK_URL;
  if (!url) return 'not-configured';
  try {
    await fetch(url, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({ form: s.form, fields: s.fields }),
    });
    return 'sent';
  } catch (err) {
    console.error('Sheet copy failed', err);
    return 'error';
  }
}

/** Email PNGA and save a copy in the sheet. Success means at least one of the two worked. */
export async function submitAgreement(s: AgreementSubmission): Promise<SendResult> {
  const message = Object.entries(s.fields)
    .map(([k, v]) => `${k}: ${v || '(blank)'}`)
    .join('\n');
  const [mail, sheet] = await Promise.all([
    sendForm({
      topic: `${s.form} (${s.version})`,
      name: s.name,
      email: s.email,
      phone: s.phone,
      language: '',
      message,
    }),
    sendToSheet(s),
  ]);
  if (mail === 'sent' || sheet === 'sent') return 'sent';
  if (mail === 'error' || sheet === 'error') return 'error';
  return 'not-configured';
}

/* ---------- Newsletter ---------- */

export interface NewsletterSignup {
  email: string;
  name: string;
  language: string;
}

/**
 * Adds a subscriber to the "Newsletter" tab of the private responses sheet. If the sheet is not
 * set up but EmailJS is, PNGA gets an email instead so the sign-up is not lost.
 */
export async function subscribeNewsletter(s: NewsletterSignup): Promise<SendResult> {
  const fields = {
    Email: s.email,
    Name: s.name,
    'Preferred language': s.language,
    'Agreed to': 'Send me PNGA newsletters and announcements by email. I can unsubscribe at any time.',
    'Subscribed at (UTC)': new Date().toISOString(),
  };
  const sheet = await sendToSheet({ form: 'Newsletter', version: 'newsletter-1', name: s.name, email: s.email, phone: '', fields });
  if (sheet === 'sent') return 'sent';
  const mail = await sendForm({
    topic: 'Newsletter sign-up',
    name: s.name || '(no name)',
    email: s.email,
    phone: '',
    language: s.language,
    message: 'Please add this person to the newsletter list.',
  });
  if (mail === 'sent') return 'sent';
  return sheet === 'error' || mail === 'error' ? 'error' : 'not-configured';
}

/** Asks to opt out by typing an address. The Apps Script emails that address a confirmation link. */
export async function unsubscribeNewsletter(email: string): Promise<SendResult> {
  const fields = { Email: email, 'Unsubscribed at (UTC)': new Date().toISOString() };
  const sheet = await sendToSheet({ form: 'Unsubscribe', version: 'newsletter-1', name: '', email, phone: '', fields });
  if (sheet === 'sent') return 'sent';
  const mail = await sendForm({
    topic: 'Newsletter UNSUBSCRIBE request',
    name: '(unsubscribe)',
    email,
    phone: '',
    language: '',
    message: 'Please remove this email address from the newsletter list.',
  });
  if (mail === 'sent') return 'sent';
  return sheet === 'error' || mail === 'error' ? 'error' : 'not-configured';
}

/** One-click opt-out from the personal link in a newsletter (the link carries a private token). */
export async function unsubscribeWithToken(token: string): Promise<SendResult> {
  return sendToSheet({ form: 'Unsubscribe', version: 'newsletter-1', name: '', email: '', phone: '', fields: { Token: token } });
}
