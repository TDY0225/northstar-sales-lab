import type { MetadataRoute } from "next";
import { getSiteOrigin } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteOrigin();
  return ["/", "/follow-up-frameworks", "/privacy"].map((path) => ({ url: `${base}${path}`, changeFrequency: "monthly", priority: path === "/" ? 1 : 0.7 }));
}
