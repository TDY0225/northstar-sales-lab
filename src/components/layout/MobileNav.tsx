"use client";

import { useRef, type KeyboardEvent } from "react";
import Link from "next/link";
import { siteContent } from "@/content/site";
import { MenuIcon } from "./Icons";

export function MobileNav() {
  const detailsRef = useRef<HTMLDetailsElement>(null);

  function handleKeyDown(event: KeyboardEvent<HTMLDetailsElement>) {
    if (event.key !== "Escape" || !detailsRef.current?.open) return;

    event.preventDefault();
    const details = detailsRef.current;
    details.open = false;
    details.querySelector<HTMLElement>("summary")?.focus();
  }

  return (
    <details ref={detailsRef} className="mobile-nav" onKeyDown={handleKeyDown}>
      <summary aria-label="Toggle navigation">
        <span aria-hidden="true">Menu</span>
        <MenuIcon />
      </summary>
      <nav id="mobile-navigation" aria-label="Mobile navigation">
        {siteContent.navigation.map((item) => (
          <a key={item.href} href={item.href} className="mobile-nav-link">{item.label}</a>
        ))}
        <Link href="/follow-up-frameworks" className="button button-small button-ink">Get the field guide</Link>
      </nav>
    </details>
  );
}
