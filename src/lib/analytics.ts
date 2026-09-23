import type { LeadKind } from "./leads/validation";

export type AnalyticsEvent =
  | "cta_clicked"
  | "webinar_form_started"
  | "lead_magnet_form_started"
  | "form_validation_failed"
  | "webinar_form_submitted"
  | "lead_magnet_form_submitted"
  | "lead_success"
  | "lead_recoverable_error"
  | "thank_you_viewed"
  | "download_clicked";

export type AnalyticsPayload = {
  kind?: LeadKind;
  source?: LeadKind;
  placement?: "hero" | "register_band" | "final_cta" | "form";
  fieldCount?: number;
  reason?: "invalid" | "provider_error" | "spam_rejected";
};

export function track(event: AnalyticsEvent, payload: AnalyticsPayload = {}) {
  // Contract only: connect a consent-aware analytics provider in a later phase.
  void event;
  void payload;
}
