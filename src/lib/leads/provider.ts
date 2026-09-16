import type { LeadInput } from "./validation";

export type LeadResult =
  | { ok: true; provider: "demo" | "hubspot" }
  | { ok: false; code: "not_configured" | "provider_error" };

export interface LeadProvider {
  capture(input: LeadInput): Promise<LeadResult>;
}

/** Phase 2 boundary only. It intentionally stores and logs no personal data. */
export class DemoLeadProvider implements LeadProvider {
  async capture(): Promise<LeadResult> {
    return { ok: false, code: "not_configured" };
  }
}

export function getLeadProvider(): LeadProvider {
  return new DemoLeadProvider();
}
