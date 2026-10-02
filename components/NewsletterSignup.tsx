import { useState, type FormEvent } from 'react';
import { AlertCircle, CheckCircle2, Loader2, Mail } from 'lucide-react';
import { subscribeNewsletter, type SendResult } from '../lib/forms';
import { SITE } from '../lib/site';
import { Link, useI18n } from '../lib/i18n';

/** Newsletter sign-up. Saves the address to PNGA's private sheet; volunteers send the newsletter. */
export default function NewsletterSignup({ id = 'newsletter' }: { id?: string }) {
  const { t, lang } = useI18n();
  const [status, setStatus] = useState<'idle' | 'sending' | SendResult>('idle');
  const [error, setError] = useState('');

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    if (data.get('website')) return; // spam trap
    const email = String(data.get('email') ?? '').trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError(t('nl.emailError'));
      return;
    }
    setError('');
    setStatus('sending');
    const result = await subscribeNewsletter({
      email,
      name: String(data.get('name') ?? '').trim(),
      language: String(data.get('language') ?? ''),
    });
    setStatus(result);
    if (result === 'sent') form.reset();
  }

  const busy = status === 'sending';
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="rounded-3xl border-2 border-navy/20 bg-white p-6 sm:p-8">
      <h2 id={`${id}-title`} className="flex items-center gap-3 text-2xl font-bold text-navy md:text-3xl">
        <Mail size={30} aria-hidden="true" /> {t('nl.title')}
      </h2>
      <p className="mt-2 text-lg text-slate-800">
        {t('nl.text')}
      </p>
      <form onSubmit={onSubmit} className="mt-5 space-y-4" noValidate>
        <fieldset disabled={busy} className="space-y-4">
          <div>
            <label htmlFor={`${id}-email`} className="field-label">{t('nl.email')}</label>
            <input id={`${id}-email`} name="email" type="email" required autoComplete="email" inputMode="email" className="field" />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor={`${id}-name`} className="field-label">{t('nl.name')} <span className="font-normal text-slate-600">{t('nl.optional')}</span></label>
              <input id={`${id}-name`} name="name" type="text" autoComplete="name" className="field" />
            </div>
            <div>
              <label htmlFor={`${id}-lang`} className="field-label">{t('nl.language')}</label>
              <select id={`${id}-lang`} name="language" className="field" defaultValue={lang === 'ne' ? 'नेपाली (Nepali)' : 'English'}>
                <option value="English">{t('nl.langEn')}</option>
                <option value="नेपाली (Nepali)">{t('nl.langNe')}</option>
                <option value="Both">{t('nl.langBoth')}</option>
              </select>
            </div>
          </div>
          <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
            <label>Leave this empty<input type="text" name="website" tabIndex={-1} autoComplete="off" /></label>
          </div>
        </fieldset>
        <p className="text-slate-700">
          {t('nl.agree1')}<Link to="/unsubscribe" className="font-bold text-navy underline">{t('nl.unsubLink')}</Link>{t('nl.agree2')}<Link to="/privacy" className="font-bold text-navy underline">{t('nl.privacyLink')}</Link>{t('nl.agree3')}
        </p>
        {error && (
          <p role="alert" className="flex items-start gap-2 font-semibold text-crimson-dark">
            <AlertCircle size={22} className="mt-0.5 shrink-0" aria-hidden="true" /> {error}
          </p>
        )}
        <button type="submit" disabled={busy} className="btn btn-primary w-full sm:w-auto disabled:opacity-60">
          {busy ? <Loader2 size={20} className="animate-spin" aria-hidden="true" /> : <Mail size={20} aria-hidden="true" />}
          {busy ? t('nl.sending') : t('nl.subscribe')}
        </button>
        <div aria-live="polite">
          {status === 'sent' && (
            <p className="flex items-start gap-2 rounded-xl bg-green-50 p-4 font-semibold text-green-900">
              <CheckCircle2 size={22} className="mt-0.5 shrink-0" aria-hidden="true" />
              {t('nl.thanks')}
            </p>
          )}
          {(status === 'error' || status === 'not-configured') && (
            <p className="flex items-start gap-2 rounded-xl bg-red-50 p-4 font-semibold text-red-900">
              <AlertCircle size={22} className="mt-0.5 shrink-0" aria-hidden="true" />
              <span>
                {t('nl.sorry')}{' '}
                {SITE.email ? <>{t('nl.emailUs')}<a className="underline" href={`mailto:${SITE.email}`}>{SITE.email}</a>{t('nl.emailUs2')}</> : t('nl.later')}
              </span>
            </p>
          )}
        </div>
      </form>
    </section>
  );
}
