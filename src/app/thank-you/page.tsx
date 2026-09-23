import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ThankYouContent, type ThankYouSource } from "@/components/marketing/ThankYouContent";
import type { Metadata } from "next";

const description = "A confirmation page for the Northstar Sales Lab portfolio demonstration.";

export const metadata: Metadata = {
  title: "Thank you",
  description,
  alternates: { canonical: "/thank-you" },
  robots: { index: false, follow: true },
  openGraph: { title: "Thank you", description, url: "/thank-you", type: "website", images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Northstar Sales Lab" }] },
  twitter: { card: "summary_large_image", title: "Thank you", description, images: ["/opengraph-image"] },
};

export default async function ThankYouPage({ searchParams }: { searchParams: Promise<{ source?: string }> }) {
  const { source } = await searchParams;
  const resolvedSource: ThankYouSource = source === "guide" || source === "webinar" ? source : "unknown";
  return <div className="page-shell"><Header /><main id="main-content" className="thank-you"><ThankYouContent source={resolvedSource} /></main><Footer /></div>;
}
