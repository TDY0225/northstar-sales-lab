import Link from "next/link";
import { siteContent } from "@/content/site";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div>
          <div className="footer-brand">{siteContent.brand.name}</div>
          <p className="footer-disclosure">{siteContent.footer.disclosure}</p>
        </div>
        <div className="footer-links">
          <Link href="/privacy">Privacy</Link>
          <Link href="/follow-up-frameworks">Free field guide</Link>
          <span>{siteContent.footer.copyright}</span>
        </div>
      </div>
    </footer>
  );
}
