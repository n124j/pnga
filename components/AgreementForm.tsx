import { useId, useState } from 'react';
import { AlertCircle, CheckCircle2, Loader2, PenLine, TriangleAlert } from 'lucide-react';
import { submitAgreement, type SendResult } from '../lib/forms';
import { SITE } from '../lib/site';
import { pick, useI18n } from '../lib/i18n';

/**
 * label, options and help are the English text: the label is also the column name that is saved with the
 * form, so it never changes. The Ne fields only change what a Nepali visitor sees.
 */
export interface FieldDef {
  label: string;
  labelNe?: string;
  helpNe?: string;
  optionsNe?: string[];
  type: 'text' | 'email' | 'tel' | 'textarea' | 'select' | 'radio' | 'checkboxes';
  role?: 'name' | 'email' | 'phone';
  required?: boolean;
  options?: string[];
  help?: string;
  autoComplete?: string;
}

interface Props {
  formName: string;
  version: string;
  fields: FieldDef[];
  /** Extra tick-boxes the person must tick before signing, e.g. "I am 18 or older." */
  confirmations?: string[];
  confirmationsNe?: string[];
  consentLabel: string;
  consentLabelNe?: string;
  submitLabel: string;
  privacyNote: string;
}

/** Shown on every agreement page until the board approves the wording. */
export function DraftNotice() {
  const { t } = useI18n();
  if (SITE.waiversApproved) return null;
  return (
    <p role="note" className="flex items-start gap-3 rounded-2xl border-2 border-amber-500 bg-amber-50 p-5 text-lg font-semibold text-amber-950">
      <TriangleAlert size={26} className="mt-0.5 shrink-0" aria-hidden="true" />
      <span>
        {t('ag.draft')}
      </span>
    </p>
  );
}

export default function AgreementForm({
  formName,
  version,
  fields,
  confirmations = [],
  confirmationsNe,
  consentLabel,
  consentLabelNe,
  submitLabel,
  privacyNote,
}: Props) {
  const uid = useId();
  const { lang, t } = useI18n();
  const [status, setStatus] = useState<'idle' | 'sending' | SendResult>('idle');
  const [formError, setFormError] = useState('');
  const locked = !SITE.waiversApproved;
  const busy = status === 'sending';
  const fid = (n: string | number) => `${uid}-${n}`;

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (locked) return;
    const form = e.currentTarget;
    const data = new FormData(form);
    if (data.get('website')) return; // spam trap

    const values: Record<string, string> = {};
    let name = '';
    let email = '';
    let phone = '';
    for (let i = 0; i < fields.length; i++) {
      const f = fields[i];
      const raw = f.type === 'checkboxes' ? data.getAll(`f${i}`).map(String).join(', ') : String(data.get(`f${i}`) ?? '').trim();
      if (f.type === 'checkboxes' && f.required && !raw) {
        setFormError(t('ag.chooseOne', { label: pick(lang, f.label, f.labelNe) }));
        return;
      }
      values[f.label] = raw;
      if (f.role === 'name') name = raw;
      if (f.role === 'email') email = raw;
      if (f.role === 'phone') phone = raw;
    }
    const signature = String(data.get('signature') ?? '').trim();
    if (signature.length < 2) {
      setFormError(t('ag.sigError'));
      return;
    }
    if (!email && !phone) {
      setFormError(t('ag.contactError'));
      return;
    }
    setFormError('');
    setStatus('sending');

    values['Agreed to'] = [...confirmations, consentLabel].join(' | ');
    values['Signature (typed name)'] = signature;
    values['Wording version'] = version;
    values['Signed at (UTC)'] = new Date().toISOString();

    const result = await submitAgreement({ form: formName, version, name: name || signature, email, phone, fields: values });
    setStatus(result);
    if (result === 'sent') form.reset();
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <fieldset disabled={busy || locked} className="space-y-6 disabled:opacity-70">
        {fields.map((f, i) => {
          const id = fid(i);
          const name = `f${i}`;
          const req = f.required !== false;
          const label = (
            <>
              {pick(lang, f.label, f.labelNe)} {!req && <span className="font-normal text-slate-600">{t('nl.optional')}</span>}
            </>
          );
          const help = f.help ? <p id={`${id}-h`} className="mb-2 text-slate-700">{pick(lang, f.help, f.helpNe)}</p> : null;
          const described = f.help ? `${id}-h` : undefined;

          if (f.type === 'radio' || f.type === 'checkboxes') {
            const kind = f.type === 'radio' ? 'radio' : 'checkbox';
            return (
              <fieldset key={i} aria-describedby={described}>
                <legend className="field-label">{label}</legend>
                {help}
                <div className="space-y-2">
                  {f.options?.map((o, j) => (
                    <label key={o} className="flex items-start gap-3 text-lg">
                      <input type={kind} name={name} value={o} required={kind === 'radio' && req} className="mt-1.5 h-5 w-5 shrink-0" />
                      <span>{pick(lang, o, f.optionsNe?.[j])}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
            );
          }
          return (
            <div key={i}>
              <label htmlFor={id} className="field-label">{label}</label>
              {help}
              {f.type === 'textarea' ? (
                <textarea id={id} name={name} rows={4} required={req} aria-describedby={described} className="field resize-y" />
              ) : f.type === 'select' ? (
                <select id={id} name={name} required={req} defaultValue={f.options?.[0]} aria-describedby={described} className="field">
                  {f.options?.map((o, j) => <option key={o} value={o}>{pick(lang, o, f.optionsNe?.[j])}</option>)}
                </select>
              ) : (
                <input
                  id={id}
                  name={name}
                  type={f.type}
                  required={req}
                  autoComplete={f.autoComplete}
                  inputMode={f.type === 'tel' ? 'tel' : undefined}
                  aria-describedby={described}
                  className="field"
                />
              )}
            </div>
          );
        })}

        <div className="space-y-3 rounded-2xl border-2 border-navy/30 bg-white p-5">
          <h3 className="flex items-center gap-2 font-sans text-xl font-bold text-navy">
            <PenLine size={22} aria-hidden="true" /> {t('ag.agreeSign')}
          </h3>
          {confirmations.map((c, ci) => (
            <label key={c} className="flex items-start gap-3 text-lg">
              <input type="checkbox" required className="mt-1.5 h-5 w-5 shrink-0" />
              <span>{pick(lang, c, confirmationsNe?.[ci])}</span>
            </label>
          ))}
          <label className="flex items-start gap-3 text-lg">
            <input type="checkbox" required className="mt-1.5 h-5 w-5 shrink-0" />
            <span>{pick(lang, consentLabel, consentLabelNe)}</span>
          </label>
          <div>
            <label htmlFor={fid('sig')} className="field-label">{t('ag.sigLabel')}</label>
            <input id={fid('sig')} name="signature" type="text" required autoComplete="name" className="field" />
            <p className="mt-2 text-slate-700">{t('ag.sigHelp')}</p>
          </div>
        </div>

        <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
          <label>Leave this empty<input type="text" name="website" tabIndex={-1} autoComplete="off" /></label>
        </div>

        <p className="text-slate-700">{privacyNote}</p>
      </fieldset>

      {formError && (
        <p role="alert" className="flex items-start gap-2 font-semibold text-crimson-dark">
          <AlertCircle size={22} className="mt-0.5 shrink-0" aria-hidden="true" /> {formError}
        </p>
      )}

      <button type="submit" disabled={busy || locked} className="btn btn-primary w-full sm:w-auto disabled:opacity-60">
        {busy ? <Loader2 size={20} className="animate-spin" aria-hidden="true" /> : <PenLine size={20} aria-hidden="true" />}
        {busy ? t('form.sending') : locked ? t('ag.notOpen') : submitLabel}
      </button>

      <div role="status" aria-live="polite">
        {status === 'sent' && (
          <p className="flex items-start gap-2 rounded-xl bg-green-50 p-4 font-semibold text-green-900">
            <CheckCircle2 size={22} className="mt-0.5 shrink-0" aria-hidden="true" />
            {t('ag.sent')}
          </p>
        )}
        {(status === 'error' || status === 'not-configured') && (
          <p className="flex items-start gap-2 rounded-xl bg-red-50 p-4 font-semibold text-red-900">
            <AlertCircle size={22} className="mt-0.5 shrink-0" aria-hidden="true" />
            <span>
              {t('ag.fail')}{' '}
              {SITE.email ? (
                <>{t('form.failEmail')}<a className="underline" href={`mailto:${SITE.email}`}>{SITE.email}</a>.</>
              ) : SITE.phone ? (
                <>{t('form.failPhone')}<a className="underline" href={`tel:${SITE.phone.replace(/[^+\d]/g, '')}`}>{SITE.phone}</a>.</>
              ) : (
                <>{t('form.failAddr')}{SITE.address.street}, {SITE.address.city}, {SITE.address.region} {SITE.address.zip}.</>
              )}
            </span>
          </p>
        )}
      </div>
    </form>
  );
}
