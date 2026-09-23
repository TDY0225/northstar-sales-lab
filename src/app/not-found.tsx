import Link from "next/link";
import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/layout/Container";

export const metadata: Metadata = {
  title: "Page not found",
  description: "The requested page could not be found in the Northstar Sales Lab portfolio demonstration.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="page-shell">
      <Header />
      <main id="main-content">
        <Container>
          <article className="not-found-page">
            <p className="eyebrow">A wrong turn</p>
            <h1>That page is not here.</h1>
            <p>The link may be out of date, but there is still a useful next step.</p>
            <Link href="/" className="button button-ink">Back to the webinar</Link>
          </article>
        </Container>
      </main>
      <Footer />
    </div>
  );
}
