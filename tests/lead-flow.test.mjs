import assert from "node:assert/strict";
import test from "node:test";

const { evaluateAntiSpam } = await import("../src/lib/leads/anti-spam.ts");
const { DemoLeadProvider, HubSpotLeadProvider } = await import("../src/lib/leads/provider.ts");
const { isLeadResponse } = await import("../src/lib/leads/response.ts");
const { validateLead } = await import("../src/lib/leads/validation.ts");

function validLead(overrides = {}) {
  return {
    kind: "webinar",
    email: "buyer@example.com",
    firstName: "Avery",
    consent: true,
    honeypot: "",
    ...overrides,
  };
}

test("shared lead schema normalizes valid input and rejects malformed input", () => {
  const parsed = validateLead(validLead({ email: "  BUYER@EXAMPLE.COM " }));
  assert.equal(parsed.success, true);
  if (parsed.success) assert.equal(parsed.data.email, "buyer@example.com");

  const invalid = validateLead(validLead({ email: "not-an-email", consent: false }));
  assert.equal(invalid.success, false);
});

test("demo provider succeeds without persisting PII and exposes a deterministic safe error path", async () => {
  const provider = new DemoLeadProvider();
  assert.deepEqual(await provider.capture(validLead()), { ok: true, provider: "demo", delivery: "none" });
  assert.deepEqual(await provider.capture(validLead({ kind: "guide" })), { ok: true, provider: "demo", delivery: "email_pending" });
  assert.deepEqual(await provider.capture(validLead({ email: "demo-error@invalid.test" })), { ok: false, code: "provider_error" });
});

test("HubSpot duplicate responses resolve to neutral success", async () => {
  const provider = new HubSpotLeadProvider({
    token: "test-token",
    fetchImpl: async () => new Response(null, { status: 409 }),
  });
  assert.deepEqual(await provider.capture(validLead()), { ok: true, provider: "hubspot", delivery: "none" });
});

test("anti-spam rejects honeypot and implausibly fast submissions", async () => {
  assert.deepEqual(await evaluateAntiSpam(validLead({ honeypot: "filled" })), { ok: false, code: "spam_rejected" });
  assert.deepEqual(await evaluateAntiSpam(validLead({ formStartedAt: Date.now() })), { ok: false, code: "spam_rejected" });
  assert.deepEqual(await evaluateAntiSpam(validLead()), { ok: true });
});

test("lead response guard accepts only stable success/error shapes", () => {
  assert.equal(isLeadResponse({ ok: true, provider: "demo", delivery: "none" }), true);
  assert.equal(isLeadResponse({ ok: false, code: "recoverable_provider_error", message: "Try again." }), true);
  assert.equal(isLeadResponse({ ok: false, code: "unexpected", message: "Try again." }), false);
  assert.equal(isLeadResponse({ ok: false, code: "invalid_request", message: "Try again.", fieldErrors: { email: ["Invalid"] } }), true);
  assert.equal(isLeadResponse({ ok: false, code: "invalid_request", message: "Try again.", fieldErrors: { email: "Invalid" } }), false);
  assert.equal(isLeadResponse({ ok: true, provider: "unknown", delivery: "none" }), false);
});
