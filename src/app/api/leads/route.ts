import { NextResponse } from "next/server";
import { getLeadProvider } from "@/lib/leads/provider";
import { validateLead } from "@/lib/leads/validation";

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);
  const parsed = validateLead(payload);

  if (!parsed.success || parsed.data.honeypot) {
    return NextResponse.json({ ok: false, code: "invalid_request" }, { status: 400 });
  }

  const result = await getLeadProvider().capture(parsed.data);
  if (!result.ok) {
    return NextResponse.json({ ok: false, code: result.code }, { status: 503 });
  }

  return NextResponse.json({ ok: true });
}
