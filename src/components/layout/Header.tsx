import Link from "next/link";
import { siteContent } from "@/content/site";
import { MenuIcon, StarIcon } from "./Icons";

function Wordmark() {
  return (
    <Link href="/" className="wordmark" aria-label="Northstar Sales Lab home">
      <span className="wordmark-mark"><StarIcon /></span>
      <span>{siteContent.brand.name}</span>
    </Link>
  );
}

export function Header() {
  return (
    <header className="site-header">
      <div className="header-inner">
        <Wordmark />
        <nav className="desktop-nav" aria-label="Primary navigation">
          {siteContent.navigation.map((item) => (
            <a key={item.href} href={item.href} className="nav-link">{item.label}</a>
          ))}
          <Link href="/follow-up-frameworks" className="button button-small button-outline">Get the field guide</Link>
        </nav>
        <details className="mobile-nav">
          <summary aria-label="Open navigation"><span aria-hidden="true">Menu</span><MenuIcon /></summary>
          <nav aria-label="Mobile navigation">
            {siteContent.navigation.map((item) => (
              <a key={item.href} href={item.href} className="mobile-nav-link">{item.label}</a>
            ))}
            <Link href="/follow-up-frameworks" className="button button-small button-ink">Get the field guide</Link>
          </nav>
        </details>
      </div>
    </header>
  );
}
