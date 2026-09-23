import type { LeadInput } from "./validation";
import type { LeadDelivery } from "./response";

export type LeadResult =
  | { ok: true; provider: "demo" | "hubspot"; delivery: LeadDelivery }
  | { ok: false; code: "not_configured" | "provider_error" };

export interface LeadProvider {
  capture(input: LeadInput): Promise<LeadResult>;
}

export class DemoLeadProvider implements LeadProvider {
  async capture(input: LeadInput): Promise<LeadResult> {
    await new Promise((resolve) => setTimeout(resolve, 250));

    // Reserved test addresses make the recoverable-error path deterministic without logging or storing PII.
    if (input.email.endsWith("@invalid.test")) return { ok: false, code: "provider_error" };

    return {
      ok: true,
      provider: "demo",
      delivery: input.kind === "guide" ? "email_pending" : "none",
    };
  }
}

type HubSpotProviderOptions = {
  token?: string;
  fetchImpl?: typeof fetch;
};

export class HubSpotLeadProvider implements LeadProvider {
  private readonly token: string;
  private readonly fetchImpl: typeof fetch;

  constructor(options: HubSpotProviderOptions = {}) {
    this.token = options.token ?? process.env.HUBSPOT_PRIVATE_APP_TOKEN?.trim() ?? "";
    this.fetchImpl = options.fetchImpl ?? fetch;
  }

  async capture(input: LeadInput): Promise<LeadResult> {
    if (!this.token) return { ok: false, code: "not_configured" };

    let timeout: ReturnType<typeof setTimeout> | undefined;
    try {
      const controller = new AbortController();
      timeout = setTimeout(() => controller.abort(), 5000);
      const response = await this.fetchImpl("https://api.hubapi.com/crm/v3/objects/contacts", {
        method: "POST",
        headers: {
          authorization: `Bearer ${this.token}`,
          "content-type": "application/json",
        },
        body: JSON.stringify({
          properties: {
            email: input.email,
            firstname: input.firstName ?? "",
          },
        }),
        signal: controller.signal,
      });

      // HubSpot uses 409 for an existing contact. Treat it as neutral success to avoid enumeration.
      if (response.status === 409 || response.ok) {
        return { ok: true, provider: "hubspot", delivery: input.kind === "guide" ? "email_pending" : "none" };
      }

      return { ok: false, code: "provider_error" };
    } catch {
      return { ok: false, code: "provider_error" };
    } finally {
      if (timeout) clearTimeout(timeout);
    }
  }
}

export function getLeadProvider(): LeadProvider {
  return process.env.LEAD_PROVIDER?.trim().toLowerCase() === "hubspot"
    ? new HubSpotLeadProvider()
    : new DemoLeadProvider();
}
