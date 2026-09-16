import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://northstar-sales-lab.example";
  return { rules: { userAgent: "*", allow: "/", disallow: "/thank-you" }, sitemap: `${base}/sitemap.xml` };
}
