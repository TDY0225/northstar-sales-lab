import { NextResponse } from "next/server";
import { evaluateAntiSpam } from "@/lib/leads/anti-spam";
import { getLeadProvider } from "@/lib/leads/provider";
import type { LeadErrorResponse } from "@/lib/leads/response";
import { getLeadFieldErrors, validateLead } from "@/lib/leads/validation";

const MAX_BODY_BYTES = 8_192;

function errorResponse(
  code: LeadErrorResponse["code"],
  message: string,
  status: number,
  fieldErrors?: LeadErrorResponse["fieldErrors"],
) {
  return NextResponse.json(
    { ok: false, code, message, ...(fieldErrors && Object.keys(fieldErrors).length > 0 ? { fieldErrors } : {}) },
    { status },
  );
}

function isAllowedOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return true;

  try {
    const requestOrigin = new URL(request.url).origin;
    const configuredOrigin = process.env.NEXT_PUBLIC_SITE_URL?.trim();
    const allowedOrigins = new Set([requestOrigin]);
    if (configuredOrigin) allowedOrigins.add(new URL(configuredOrigin).origin);
    return allowedOrigins.has(new URL(origin).origin);
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  const contentType = request.headers.get("content-type")?.toLowerCase() ?? "";
  if (!contentType.startsWith("application/json")) {
    return errorResponse("invalid_request", "This request format is not supported.", 415);
  }

  if (!isAllowedOrigin(request)) {
    return errorResponse("invalid_request", "This request could not be accepted.", 403);
  }

  const rawBody = await request.text();
  if (new TextEncoder().encode(rawBody).byteLength > MAX_BODY_BYTES) {
    return errorResponse("invalid_request", "This request is too large.", 413);
  }

  let payload: unknown;
  try {
    payload = JSON.parse(rawBody);
  } catch {
    return errorResponse("invalid_request", "Please send a valid request.", 400);
  }

  const parsed = validateLead(payload);
  if (!parsed.success) {
    return errorResponse(
      "invalid_request",
      "Please check the highlighted fields and try again.",
      400,
      getLeadFieldErrors(parsed.error),
    );
  }

  const antiSpam = await evaluateAntiSpam(parsed.data);
  if (!antiSpam.ok) {
    return errorResponse("spam_rejected", "Please wait a moment and try again.", 400);
  }

  const result = await getLeadProvider().capture(parsed.data);
  if (!result.ok) {
    if (result.code === "not_configured") {
      return errorResponse("not_configured", "This demo is not connected to a delivery provider yet.", 503);
    }
    return errorResponse("recoverable_provider_error", "We could not complete that just now. Please try again.", 503);
  }

  return NextResponse.json({ ok: true, provider: result.provider, delivery: result.delivery });
}
