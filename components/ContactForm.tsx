import { useId, useState } from 'react';
import { AlertCircle, CheckCircle2, Loader2, Send } from 'lucide-react';
import { sendForm, type SendResult } from '../lib/forms';
import { SITE } from '../lib/site';

export interface FormOption {
  value: string;
  label: string;
}

interface Props {
  /** Shown in the email subject/body so PNGA knows what the message is about. */
  kind: string;
  topics?: { label: string; options: FormOption[] };
  defaultTopic?: string;
  messageLabel: string;
  messagePlaceholder?: string;
  submitLabel: string;
  /** Sentence shown beside the button about how the information is used. */
  privacyNote: string;
  showLanguage?: boolean;
  /** Require at least a phone or an email. */
  requireContact?: boolean;
}

export default function ContactForm({
  kind,
  topics,
  defaultTopic,
  messageLabel,
  messagePlaceholder,
  submitLabel,
  privacyNote,
  showLanguage,
  requireContact = true,
}: Props) {
  const uid = useId();
  const [status, setStatus] = useState<'idle' | 'sending' | SendResult>('idle');
  const [formError, setFormError] = useState('');

  const id = (name: string) => `${uid}-${name}`;

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    // Hidden field: real visitors leave it empty, simple spam bots fill it in.
    if (data.get('website')) return;

    const email = String(data.get('email') ?? '').trim();
    const phone = String(data.get('phone') ?? '').trim();
    if (requireContact && !email && !phone) {
      setFormError('Please give us a phone number or an email address so we can reply.');
      return;
    }
    setFormError('');
    setStatus('sending');

    const topic = String(data.get('topic') ?? '');
    const result = await sendForm({
      topic: [kind, topic].filter(Boolean).join(': '),
      name: String(data.get('name') ?? '').trim(),
      email,
      phone,
      language: String(data.get('language') ?? ''),
      message: String(data.get('message') ?? '').trim(),
    });
    setStatus(result);
    if (result === 'sent') form.reset();
  }

  const busy = status === 'sending';

  return (
    <form onSubmit={onSubmit} className="space-y-6" noValidate={false}>
      <div>
        <label htmlFor={id('name')} className="field-label">Your name</label>
        <input id={id('name')} name="name" type="text" required autoComplete="name" className="field" disabled={busy} />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor={id('phone')} className="field-label">Phone {requireContact && <span className="font-normal text-slate-600">(phone or email)</span>}</label>
          <input id={id('phone')} name="phone" type="tel" autoComplete="tel" inputMode="tel" className="field" disabled={busy} />
        </div>
        <div>
          <label htmlFor={id('email')} className="field-label">Email {requireContact && <span className="font-normal text-slate-600">(phone or email)</span>}</label>
          <input id={id('email')} name="email" type="email" autoComplete="email" className="field" disabled={busy} />
        </div>
      </div>

      {topics && (
        <div>
          <label htmlFor={id('topic')} className="field-label">{topics.label}</label>
          <select id={id('topic')} name="topic" required defaultValue={defaultTopic ?? ''} className="field" disabled={busy}>
            <option value="" disabled>Choose one</option>
            {topics.options.map((o) => (
              <option key={o.value} value={o.label}>{o.label}</option>
            ))}
          </select>
        </div>
      )}

      {showLanguage && (
        <div>
          <label htmlFor={id('language')} className="field-label">Language you prefer</label>
          <select id={id('language')} name="language" defaultValue="English" className="field" disabled={busy}>
            <option>English</option>
            <option>नेपाली (Nepali)</option>
            <option>Other</option>
          </select>
        </div>
      )}

      <div>
        <label htmlFor={id('message')} className="field-label">{messageLabel}</label>
        <textarea
          id={id('message')}
          name="message"
          rows={5}
          required
          placeholder={messagePlaceholder}
          className="field resize-y"
          disabled={busy}
        />
      </div>

      {/* Spam trap: hidden from people and assistive technology. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Leave this empty
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <p className="text-slate-700">{privacyNote}</p>

      {formError && (
        <p role="alert" className="flex items-start gap-2 font-semibold text-red-700">
          <AlertCircle size={22} className="mt-0.5 shrink-0" aria-hidden="true" /> {formError}
        </p>
      )}

      <button type="submit" disabled={busy} className="btn btn-primary w-full sm:w-auto disabled:opacity-60">
        {busy ? <Loader2 size={20} className="animate-spin" aria-hidden="true" /> : <Send size={20} aria-hidden="true" />}
        {busy ? 'Sending…' : submitLabel}
      </button>

      <div role="status" aria-live="polite">
        {status === 'sent' && (
          <p className="flex items-start gap-2 rounded-xl bg-green-50 p-4 font-semibold text-green-900">
            <CheckCircle2 size={22} className="mt-0.5 shrink-0" aria-hidden="true" />
            Thank you. Your message was sent and a PNGA volunteer will reply as soon as they can.
          </p>
        )}
        {(status === 'error' || status === 'not-configured') && (
          <p className="flex items-start gap-2 rounded-xl bg-red-50 p-4 font-semibold text-red-900">
            <AlertCircle size={22} className="mt-0.5 shrink-0" aria-hidden="true" />
            <span>
              Sorry, your message was not sent.{' '}
              {SITE.email ? (
                <>Please email us at <a className="underline" href={`mailto:${SITE.email}`}>{SITE.email}</a>.</>
              ) : SITE.phone ? (
                <>Please call us at <a className="underline" href={`tel:${SITE.phone.replace(/[^+\d]/g, '')}`}>{SITE.phone}</a>.</>
              ) : (
                <>Please try again later or write to us at {SITE.address.street}, {SITE.address.city}, {SITE.address.region} {SITE.address.zip}.</>
              )}
            </span>
          </p>
        )}
      </div>
    </form>
  );
}
