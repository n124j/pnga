import { useEffect, useState, type FormEvent } from 'react';
import { AlertCircle, CheckCircle2, Loader2, MailX } from 'lucide-react';
import Seo from '../components/Seo';
import PageHeader from '../components/PageHeader';
import { unsubscribeNewsletter, unsubscribeWithToken, type SendResult } from '../lib/forms';
import { SITE } from '../lib/site';
import { useI18n } from '../lib/i18n';

export default function Unsubscribe() {
  const { t: tr } = useI18n();
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
      setError(tr('nl.emailError'));
      return;
    }
    setError('');
    setStatus('sending');
    setStatus(await unsubscribeNewsletter(email));
  }

  const busy = status === 'sending';
  return (
    <>
      <Seo path="/unsubscribe" title={tr('un.seoTitle')} noindex />
      <PageHeader
        title={tr('un.h1')}
        crumbs={[{ label: tr('un.h1') }]}
        intro={tr('un.intro')}
      />
      <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
        {token ? (
          <div className="space-y-4">
            <p className="text-lg">{tr('un.confirm')}</p>
            <button type="button" onClick={confirmToken} disabled={busy || status === 'sent'} className="btn btn-primary w-full sm:w-auto disabled:opacity-60">
              {busy ? <Loader2 size={20} className="animate-spin" aria-hidden="true" /> : <MailX size={20} aria-hidden="true" />}
              {busy ? tr('un.working') : tr('un.yes')}
            </button>
            <div aria-live="polite">
              {status === 'sent' && (
                <p className="flex items-start gap-2 rounded-xl bg-green-50 p-4 font-semibold text-green-900">
                  <CheckCircle2 size={22} className="mt-0.5 shrink-0" aria-hidden="true" />
                  {tr('un.done')}
                </p>
              )}
              {(status === 'error' || status === 'not-configured') && (
                <p className="flex items-start gap-2 rounded-xl bg-red-50 p-4 font-semibold text-red-900">
                  <AlertCircle size={22} className="mt-0.5 shrink-0" aria-hidden="true" />
                  <span>{tr('un.sorry')}{SITE.email ? <>{tr('un.emailRemove1')}<a className="underline" href={`mailto:${SITE.email}`}>{SITE.email}</a>{tr('un.emailRemove2')}</> : ' ' + tr('nl.later')}</span>
                </p>
              )}
            </div>
          </div>
        ) : (
        <form onSubmit={onSubmit} noValidate className="space-y-4">
          <fieldset disabled={busy || status === 'sent'} className="space-y-4">
            <div>
              <label htmlFor="unsub-email" className="field-label">{tr('un.emailLabel')}</label>
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
            {busy ? tr('un.working') : tr('un.send')}
          </button>
          <div aria-live="polite">
            {status === 'sent' && (
              <p className="flex items-start gap-2 rounded-xl bg-green-50 p-4 font-semibold text-green-900">
                <CheckCircle2 size={22} className="mt-0.5 shrink-0" aria-hidden="true" />
                {tr('un.linkSent')}
              </p>
            )}
            {(status === 'error' || status === 'not-configured') && (
              <p className="flex items-start gap-2 rounded-xl bg-red-50 p-4 font-semibold text-red-900">
                <AlertCircle size={22} className="mt-0.5 shrink-0" aria-hidden="true" />
                <span>
                  {tr('un.sorry')}{' '}
                  {SITE.email ? <>{tr('un.emailRemove1').trim()} <a className="underline" href={`mailto:${SITE.email}`}>{SITE.email}</a>{tr('un.emailRemove2')}</> : tr('nl.later')}
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
