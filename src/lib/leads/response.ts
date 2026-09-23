import type { LeadField, LeadKind } from "./validation";

export type LeadErrorCode = "invalid_request" | "spam_rejected" | "recoverable_provider_error" | "not_configured";
export type LeadDelivery = "none" | "email_pending";

export type LeadSuccessResponse = {
  ok: true;
  provider: "demo" | "hubspot";
  delivery: LeadDelivery;
};

export type LeadErrorResponse = {
  ok: false;
  code: LeadErrorCode;
  message: string;
  fieldErrors?: Partial<Record<LeadField, string[]>>;
};

export type LeadResponse = LeadSuccessResponse | LeadErrorResponse;

const LEAD_ERROR_CODES = new Set<LeadErrorCode>([
  "invalid_request",
  "spam_rejected",
  "recoverable_provider_error",
  "not_configured",
]);

export function isLeadResponse(value: unknown): value is LeadResponse {
  if (!value || typeof value !== "object") return false;
  const response = value as { ok?: unknown; code?: unknown; provider?: unknown; delivery?: unknown; message?: unknown; fieldErrors?: unknown };
  if (response.ok === true) {
    return (response.provider === "demo" || response.provider === "hubspot") &&
      (response.delivery === "none" || response.delivery === "email_pending");
  }
  if (response.ok !== false || typeof response.code !== "string" || !LEAD_ERROR_CODES.has(response.code as LeadErrorCode) || typeof response.message !== "string") return false;
  if (response.fieldErrors === undefined) return true;
  if (!response.fieldErrors || typeof response.fieldErrors !== "object") return false;
  return Object.entries(response.fieldErrors).every(([field, messages]) =>
    (field === "email" || field === "firstName" || field === "consent") &&
    Array.isArray(messages) && messages.every((message) => typeof message === "string"),
  );
}

export function thankYouSource(kind: LeadKind) {
  return kind === "guide" ? "guide" : "webinar";
}
