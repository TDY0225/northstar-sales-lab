import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/layout/Container";
import type { Metadata } from "next";

const description = "A plain-language privacy notice for the Northstar Sales Lab portfolio demonstration.";

export const metadata: Metadata = {
  title: "Privacy",
  description,
  alternates: { canonical: "/privacy" },
  openGraph: { title: "Privacy", description, url: "/privacy", type: "website", images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Northstar Sales Lab" }] },
  twitter: { card: "summary_large_image", title: "Privacy", description, images: ["/opengraph-image"] },
};

export default function PrivacyPage() {
  return <div className="page-shell"><Header /><main id="main-content"><Container><article className="privacy-page"><p className="eyebrow">Plain-language notice</p><h1>Privacy, without the fine-print theatre.</h1><p>This page describes the intended data practices for the fictional Northstar Sales Lab portfolio demonstration. It is not legal advice or a certification of compliance.</p><h2>What a live version would collect</h2><p>A production version would collect an email address, and optionally a first name, only when someone asks to register for the webinar or receive the field guide. The information would be used to deliver the requested resource and relevant follow-up.</p><h2>What would not be collected</h2><p>The design does not require account passwords, payment details, sensitive personal information, or unnecessary profile data. Analytics events are planned without email addresses or form values.</p><h2>Provider and retention</h2><p>A future production integration would use a server-side CRM provider such as HubSpot. The final owner would need to confirm provider terms, retention periods, consent language, and unsubscribe handling before launch.</p><h2>Contact</h2><p>Because this is a fictional portfolio project, no real support inbox is provided. A live implementation must replace this section with an approved contact method.</p></article></Container></main><Footer /></div>;
}
