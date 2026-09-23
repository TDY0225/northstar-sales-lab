import type { LeadInput } from "./validation";

export type AntiSpamResult =
  | { ok: true }
  | { ok: false; code: "spam_rejected" };

const MIN_SUBMISSION_MS = 700;

export async function evaluateAntiSpam(input: LeadInput): Promise<AntiSpamResult> {
  if (input.honeypot) return { ok: false, code: "spam_rejected" };

  if (input.formStartedAt) {
    const elapsed = Date.now() - input.formStartedAt;
    if (elapsed >= 0 && elapsed < MIN_SUBMISSION_MS) return { ok: false, code: "spam_rejected" };
  }

  const secret = process.env.TURNSTILE_SECRET_KEY?.trim();
  if (!secret) return { ok: true };
  if (!input.turnstileToken) return { ok: false, code: "spam_rejected" };

  let timeout: ReturnType<typeof setTimeout> | undefined;
  try {
    const controller = new AbortController();
    timeout = setTimeout(() => controller.abort(), 3500);
    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret, response: input.turnstileToken }),
      signal: controller.signal,
    });
    if (!response.ok) return { ok: false, code: "spam_rejected" };
    const result = await response.json() as { success?: unknown };
    return result.success === true ? { ok: true } : { ok: false, code: "spam_rejected" };
  } catch {
    return { ok: false, code: "spam_rejected" };
  } finally {
    if (timeout) clearTimeout(timeout);
  }
}
