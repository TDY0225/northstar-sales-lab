"use client";

import { FormEvent, useState } from "react";
import type { LeadKind } from "@/lib/leads/validation";
import { ArrowUpRightIcon } from "@/components/layout/Icons";

export function LeadForm({ kind, title, submitLabel, helper, privacy }: { kind: LeadKind; title: string; submitLabel: string; helper: string; privacy: string }) {
  const [started, setStarted] = useState(false);
  const [status, setStatus] = useState<"idle" | "error">("idle");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("error");
  }

  return (
    <form className="lead-form" onSubmit={handleSubmit}>
      <div className="form-heading">
        <p className="eyebrow">{kind === "webinar" ? "Save your seat" : "A useful next step"}</p>
        <h2>{title}</h2>
      </div>
      <div className="form-fields">
        <div className="field-group">
          <label htmlFor={`${kind}-email`}>Email address</label>
          <input id={`${kind}-email`} name="email" type="email" autoComplete="email" placeholder="you@company.com" required onFocus={() => setStarted(true)} />
        </div>
        <div className="field-group">
          <label htmlFor={`${kind}-first-name`}>First name <span>(optional)</span></label>
          <input id={`${kind}-first-name`} name="firstName" type="text" autoComplete="given-name" placeholder="Your first name" />
        </div>
        <label className="checkbox-label">
          <input name="consent" type="checkbox" required />
          <span>{privacy}</span>
        </label>
        <input name="kind" type="hidden" value={kind} />
        {status === "error" ? <p className="form-status form-status-error" role="alert">This registration is not open yet. Please check back soon. Your details were not submitted.</p> : null}
        <button type="submit" className="button button-ink button-full">{submitLabel}<ArrowUpRightIcon /></button>
        <p className="form-helper">{helper}</p>
        {started ? <p className="sr-only" aria-live="polite">Form started</p> : null}
      </div>
    </form>
  );
}
