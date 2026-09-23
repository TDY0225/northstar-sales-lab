import type { Metadata } from "next";
import { Manrope, Newsreader } from "next/font/google";
import "./globals.css";
import { siteContent } from "@/content/site";
import { getSiteOrigin } from "@/lib/site-url";

const bodyFont = Manrope({ subsets: ["latin"], variable: "--font-body", display: "swap" });
const headingFont = Newsreader({ subsets: ["latin"], variable: "--font-heading", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(getSiteOrigin()),
  title: { default: siteContent.metadata.title, template: `%s | ${siteContent.brand.name}` },
  description: siteContent.metadata.description,
  alternates: { canonical: "/" },
  openGraph: {
    title: siteContent.metadata.title,
    description: siteContent.metadata.description,
    url: "/",
    siteName: siteContent.brand.name,
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Northstar Sales Lab" }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteContent.metadata.title,
    description: siteContent.metadata.description,
    images: ["/opengraph-image"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={`${bodyFont.variable} ${headingFont.variable}`} data-scroll-behavior="smooth"><body><a className="skip-link" href="#main-content">Skip to main content</a>{children}</body></html>;
}
