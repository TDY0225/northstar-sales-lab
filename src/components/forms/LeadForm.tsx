"use client";

import { FormEvent, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { track } from "@/lib/analytics";
import { getLeadFieldErrors, type LeadField, type LeadKind, validateLead } from "@/lib/leads/validation";
import { isLeadResponse, type LeadErrorResponse, type LeadResponse } from "@/lib/leads/response";
import { ArrowUpRightIcon } from "@/components/layout/Icons";

type FormStatus = "idle" | "invalid" | "submitting" | "server-validation-error" | "recoverable-provider-error" | "success";
type FieldErrors = Partial<Record<LeadField, string[]>>;

type FormState = {
  status: FormStatus;
  fieldErrors: FieldErrors;
  message?: string;
};

const FIELD_LABELS: Record<LeadField, string> = {
  email: "Email address",
  firstName: "First name",
  consent: "Consent",
};

function formEventName(kind: LeadKind, suffix: "started" | "submitted") {
  return kind === "webinar" ? `webinar_form_${suffix}` as const : `lead_magnet_form_${suffix}` as const;
}

function ErrorSummary({ kind, state, summaryRef }: { kind: LeadKind; state: FormState; summaryRef: React.RefObject<HTMLDivElement | null> }) {
  const fields = (Object.keys(state.fieldErrors) as LeadField[]).filter((field) => (state.fieldErrors[field]?.length ?? 0) > 0);
  if (state.status === "idle" || state.status === "submitting" || state.status === "success") return null;

  return (
    <div ref={summaryRef} id={`${kind}-form-error-summary`} className="form-error-summary" role="alert" tabIndex={-1} aria-labelledby={`${kind}-form-error-title`}>
      <h3 id={`${kind}-form-error-title`}>{fields.length > 0 ? "Check the highlighted fields" : "We could not complete that"}</h3>
      <p>{state.message ?? "Please review the form and try again."}</p>
      {fields.length > 0 ? (
        <ul>
          {fields.map((field) => (
            <li key={field}><a href={`#${kind}-${field}`} onClick={(event) => { event.preventDefault(); document.getElementById(`${kind}-${field}`)?.focus(); }}>{FIELD_LABELS[field]}: {state.fieldErrors[field]?.[0]}</a></li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

function responseMessage(response: LeadResponse) {
  if (response.ok) return undefined;
  if (response.code === "invalid_request") return response.message;
  if (response.code === "spam_rejected") return "Please wait a moment and try again.";
  if (response.code === "not_configured") return "This demo is not connected to a delivery provider yet. Please try again later.";
  return "We could not complete that just now. Please try again.";
}

export function LeadForm({ kind, title, submitLabel, helper, privacy }: { kind: LeadKind; title: string; submitLabel: string; helper: string; privacy: string }) {
  const router = useRouter();
  const summaryRef = useRef<HTMLDivElement>(null);
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [state, setState] = useState<FormState>({ status: "idle", fieldErrors: {} });

  function focusSummary() {
    window.requestAnimationFrame(() => summaryRef.current?.focus());
  }

  function markStarted() {
    if (startedAt !== null) return;
    setStartedAt(Date.now());
    track(formEventName(kind, "started"), { kind });
  }

  function clearFieldError(field: LeadField) {
    setState((current) => {
      if (!current.fieldErrors[field]) return current;
      const fieldErrors = { ...current.fieldErrors };
      delete fieldErrors[field];
      return { ...current, fieldErrors, status: Object.keys(fieldErrors).length === 0 ? "idle" : current.status, message: undefined };
    });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (state.status === "submitting" || state.status === "success") return;

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      kind,
      email: String(formData.get("email") ?? ""),
      firstName: String(formData.get("firstName") ?? ""),
      consent: formData.get("consent") === "on",
      honeypot: String(formData.get("honeypot") ?? ""),
      formStartedAt: startedAt ?? Date.now(),
    };
    const parsed = validateLead(payload);

    if (!parsed.success) {
      const fieldErrors = getLeadFieldErrors(parsed.error);
      setState({ status: "invalid", fieldErrors, message: "Please review the highlighted fields and try again." });
      track("form_validation_failed", { kind, fieldCount: Object.keys(fieldErrors).length, reason: "invalid" });
      focusSummary();
      return;
    }

    setState({ status: "submitting", fieldErrors: {} });
    track(formEventName(kind, "submitted"), { kind });

    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 8_000);
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(parsed.data),
        signal: controller.signal,
      });
      const body: unknown = await response.json().catch(() => null);

      if (!isLeadResponse(body) || !response.ok || !body.ok) {
        const safeResponse: LeadErrorResponse = isLeadResponse(body) && !body.ok ? body : { ok: false, code: "recoverable_provider_error", message: "We could not complete that just now. Please try again." };
        const fieldErrors = safeResponse.fieldErrors ?? {};
        const status: FormStatus = safeResponse.code === "invalid_request" ? "server-validation-error" : "recoverable-provider-error";
        setState({ status, fieldErrors, message: responseMessage(safeResponse) });
        track("lead_recoverable_error", { kind, reason: safeResponse.code === "spam_rejected" ? "spam_rejected" : "provider_error" });
        focusSummary();
        return;
      }

      setState({ status: "success", fieldErrors: {}, message: kind === "guide" ? "Your demo request was accepted. No email was sent or stored." : "Your demo registration was accepted. No personal data was stored." });
      track("lead_success", { kind });
      window.setTimeout(() => router.push(`/thank-you?source=${kind}`), 450);
    } catch {
      setState({ status: "recoverable-provider-error", fieldErrors: {}, message: "We could not reach the delivery service. Please try again." });
      track("lead_recoverable_error", { kind, reason: "provider_error" });
      focusSummary();
    } finally {
      window.clearTimeout(timeout);
    }
  }

  const isBusy = state.status === "submitting" || state.status === "success";
  const buttonLabel = state.status === "submitting" ? "Sending…" : state.status === "success" ? "Accepted" : submitLabel;
  const errorFor = (field: LeadField) => state.fieldErrors[field]?.[0];

  return (
    <form className="lead-form" onSubmit={handleSubmit} onFocusCapture={markStarted} aria-busy={state.status === "submitting"} noValidate>
      <div className="form-heading">
        <p className="eyebrow">{kind === "webinar" ? "Save your seat" : "A useful next step"}</p>
        <h2>{title}</h2>
      </div>
      <div className="form-fields">
        <ErrorSummary kind={kind} state={state} summaryRef={summaryRef} />
        <div className="field-group">
          <label htmlFor={`${kind}-email`}>Email address <span className="required-marker" aria-hidden="true">*</span><span className="sr-only"> required</span></label>
          <input id={`${kind}-email`} name="email" type="email" autoComplete="email" placeholder="you@company.com" required aria-invalid={Boolean(errorFor("email"))} aria-describedby={errorFor("email") ? `${kind}-email-error` : undefined} onChange={() => clearFieldError("email")} />
          {errorFor("email") ? <p id={`${kind}-email-error`} className="form-field-error">{errorFor("email")}</p> : null}
        </div>
        <div className="field-group">
          <label htmlFor={`${kind}-firstName`}>First name <span>(optional)</span></label>
          <input id={`${kind}-firstName`} name="firstName" type="text" autoComplete="given-name" placeholder="Your first name" aria-invalid={Boolean(errorFor("firstName"))} aria-describedby={errorFor("firstName") ? `${kind}-firstName-error` : undefined} onChange={() => clearFieldError("firstName")} />
          {errorFor("firstName") ? <p id={`${kind}-firstName-error`} className="form-field-error">{errorFor("firstName")}</p> : null}
        </div>
        <label className="checkbox-label" htmlFor={`${kind}-consent`}>
          <input id={`${kind}-consent`} name="consent" type="checkbox" required aria-invalid={Boolean(errorFor("consent"))} aria-describedby={errorFor("consent") ? `${kind}-consent-error` : undefined} onChange={() => clearFieldError("consent")} />
          <span>{privacy}</span>
        </label>
        {errorFor("consent") ? <p id={`${kind}-consent-error`} className="form-field-error">{errorFor("consent")}</p> : null}
        <input name="formStartedAt" type="hidden" value={startedAt ?? ""} readOnly />
        <div className="honeypot" aria-hidden="true" inert>
          <label htmlFor={`${kind}-honeypot`}>Leave this field empty</label>
          <input id={`${kind}-honeypot`} name="honeypot" type="text" tabIndex={-1} autoComplete="off" />
        </div>
        {state.status === "success" ? <p className="form-status form-status-success" role="status" aria-live="polite">{state.message}</p> : null}
        <button type="submit" className="button button-ink button-full" disabled={isBusy}>{buttonLabel}<ArrowUpRightIcon /></button>
        <p className="form-helper">{helper}</p>
      </div>
    </form>
  );
}
