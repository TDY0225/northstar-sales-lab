const FALLBACK_SITE_URL = "https://northstar-sales-lab.example";

export function getSiteUrl() {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!configured) return new URL(FALLBACK_SITE_URL);

  try {
    return new URL(configured);
  } catch {
    return new URL(FALLBACK_SITE_URL);
  }
}

export function getSiteOrigin() {
  return getSiteUrl().origin;
}
