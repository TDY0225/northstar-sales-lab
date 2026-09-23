import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ThankYouContent, type ThankYouSource } from "@/components/marketing/ThankYouContent";

export const metadata = { title: "Thank you", robots: { index: false, follow: true } };

export default async function ThankYouPage({ searchParams }: { searchParams: Promise<{ source?: string }> }) {
  const { source } = await searchParams;
  const resolvedSource: ThankYouSource = source === "guide" || source === "webinar" ? source : "unknown";
  return <div className="page-shell"><Header /><main id="main-content" className="thank-you"><ThankYouContent source={resolvedSource} /></main><Footer /></div>;
}
