export type AnalyticsEvent =
  | "cta_clicked"
  | "webinar_form_started"
  | "webinar_form_submitted"
  | "lead_magnet_form_submitted"
  | "thank_you_viewed"
  | "download_clicked";

export type AnalyticsPayload = Record<string, string | undefined>;

export function track(event: AnalyticsEvent, payload: AnalyticsPayload = {}) {
  // Phase 2 adapter: connect a consent-aware analytics provider in Phase 3.
  void event;
  void payload;
}
