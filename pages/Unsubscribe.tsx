import { useEffect, useState, type FormEvent } from 'react';
import { AlertCircle, CheckCircle2, Loader2, MailX } from 'lucide-react';
import Seo from '../components/Seo';
import PageHeader from '../components/PageHeader';
import { unsubscribeNewsletter, unsubscribeWithToken, type SendResult } from '../lib/forms';
import { SITE } from '../lib/site';

export default function Unsubscribe() {
  const [status, setStatus] = useState<'idle' | 'sending' | SendResult>('idle');
  const [error, setError] = useState('');
  const [token, setToken] = useState('');

  // A personal link from a newsletter looks like /unsubscribe?t=<private code>.
  useEffect(() => {
    const t = new URLSearchParams(window.location.search).get('t') ?? '';
    if (/^[0-9a-f-]{36}$/i.test(t)) setToken(t);
  }, []);

  async function confirmToken() {
    setStatus('sending');
    setStatus(await unsubscribeWithToken(token));
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    if (data.get('website')) return; // spam trap
    const email = String(data.get('email') ?? '').trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please type a full email address, like name@example.com.');
      return;
    }
    setError('');
    setStatus('sending');
    setStatus(await unsubscribeNewsletter(email));
  }

  const busy = status === 'sending';
  return (
    <>
      <Seo path="/unsubscribe" title="Unsubscribe from the newsletter" noindex />
      <PageHeader
        title="Unsubscribe"
        crumbs={[{ label: 'Unsubscribe' }]}
        intro="Sorry to see you go. Every newsletter also has a personal unsubscribe link at the bottom."
      />
      <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
        {token ? (
          <div className="space-y-4">
            <p className="text-lg">Please confirm that you no longer want to receive the PNGA newsletter.</p>
            <button type="button" onClick={confirmToken} disabled={busy || status === 'sent'} className="btn btn-primary w-full sm:w-auto disabled:opacity-60">
              {busy ? <Loader2 size={20} className="animate-spin" aria-hidden="true" /> : <MailX size={20} aria-hidden="true" />}
              {busy ? 'Working…' : 'Yes, unsubscribe me'}
            </button>
            <div aria-live="polite">
              {status === 'sent' && (
                <p className="flex items-start gap-2 rounded-xl bg-green-50 p-4 font-semibold text-green-900">
                  <CheckCircle2 size={22} className="mt-0.5 shrink-0" aria-hidden="true" />
                  Done. You have been unsubscribed and will not get more newsletters.
                </p>
              )}
              {(status === 'error' || status === 'not-configured') && (
                <p className="flex items-start gap-2 rounded-xl bg-red-50 p-4 font-semibold text-red-900">
                  <AlertCircle size={22} className="mt-0.5 shrink-0" aria-hidden="true" />
                  <span>Sorry, that did not go through.{SITE.email ? <> Please email <a className="underline" href={`mailto:${SITE.email}`}>{SITE.email}</a> and we will remove you.</> : ' Please try again later.'}</span>
                </p>
              )}
            </div>
          </div>
        ) : (
        <form onSubmit={onSubmit} noValidate className="space-y-4">
          <fieldset disabled={busy || status === 'sent'} className="space-y-4">
            <div>
              <label htmlFor="unsub-email" className="field-label">Email address</label>
              <input id="unsub-email" name="email" type="email" required autoComplete="email" inputMode="email" className="field" />
            </div>
            <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
              <label>Leave this empty<input type="text" name="website" tabIndex={-1} autoComplete="off" /></label>
            </div>
          </fieldset>
          {error && (
            <p role="alert" className="flex items-start gap-2 font-semibold text-crimson-dark">
              <AlertCircle size={22} className="mt-0.5 shrink-0" aria-hidden="true" /> {error}
            </p>
          )}
          <button type="submit" disabled={busy || status === 'sent'} className="btn btn-primary w-full sm:w-auto disabled:opacity-60">
            {busy ? <Loader2 size={20} className="animate-spin" aria-hidden="true" /> : <MailX size={20} aria-hidden="true" />}
            {busy ? 'Working…' : 'Send me the link'}
          </button>
          <div aria-live="polite">
            {status === 'sent' && (
              <p className="flex items-start gap-2 rounded-xl bg-green-50 p-4 font-semibold text-green-900">
                <CheckCircle2 size={22} className="mt-0.5 shrink-0" aria-hidden="true" />
                If that address is on our list, we have just emailed it a link. Please open that email and click the link to finish unsubscribing. Check your spam folder if you do not see it.
              </p>
            )}
            {(status === 'error' || status === 'not-configured') && (
              <p className="flex items-start gap-2 rounded-xl bg-red-50 p-4 font-semibold text-red-900">
                <AlertCircle size={22} className="mt-0.5 shrink-0" aria-hidden="true" />
                <span>
                  Sorry, that did not go through.{' '}
                  {SITE.email ? <>Please email <a className="underline" href={`mailto:${SITE.email}`}>{SITE.email}</a> and we will remove you.</> : 'Please try again later.'}
                </span>
              </p>
            )}
          </div>
        </form>
        )}
      </div>
    </>
  );
}
