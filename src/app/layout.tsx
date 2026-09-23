import type { Metadata } from "next";
import { Manrope, Newsreader } from "next/font/google";
import "./globals.css";
import { siteContent } from "@/content/site";

const bodyFont = Manrope({ subsets: ["latin"], variable: "--font-body", display: "swap" });
const headingFont = Newsreader({ subsets: ["latin"], variable: "--font-heading", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://northstar-sales-lab.example"),
  title: { default: siteContent.metadata.title, template: `%s | ${siteContent.brand.name}` },
  description: siteContent.metadata.description,
  openGraph: { title: siteContent.metadata.title, description: siteContent.metadata.description, type: "website" },
  twitter: { card: "summary_large_image", title: siteContent.metadata.title, description: siteContent.metadata.description },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={`${bodyFont.variable} ${headingFont.variable}`} data-scroll-behavior="smooth"><body><a className="skip-link" href="#main-content">Skip to main content</a>{children}</body></html>;
}
