import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const metadata = { title: "Thank you", robots: { index: false, follow: true } };

export default async function ThankYouPage({ searchParams }: { searchParams: Promise<{ source?: string }> }) {
  const { source } = await searchParams;
  const isGuide = source === "guide";
  return <div className="page-shell"><Header /><main id="main-content" className="thank-you"><div className="thank-you-inner"><p className="eyebrow">{isGuide ? "Your guide is on its way" : "You are on the list"}</p><h1>Good next step.</h1><p>{isGuide ? "Check your inbox for the field guide delivery details. If you do not see it, check your promotions or spam folder." : "Watch your inbox for the session details and a short reminder before the workshop."}</p><div className="thank-you-actions"><Link href="/" className="button button-ink">Back to the webinar</Link><Link href="/follow-up-frameworks" className="button button-outline">Explore the field guide</Link></div></div></main><Footer /></div>;
}
