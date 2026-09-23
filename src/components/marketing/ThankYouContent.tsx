"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { track } from "@/lib/analytics";

export type ThankYouSource = "webinar" | "guide" | "unknown";

export function ThankYouContent({ source }: { source: ThankYouSource }) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const isGuide = source === "guide";
  const isWebinar = source === "webinar";

  useEffect(() => {
    headingRef.current?.focus();
    if (isGuide || isWebinar) track("thank_you_viewed", { source });
  }, [isGuide, isWebinar, source]);

  const eyebrow = isGuide ? "Demo guide request accepted" : isWebinar ? "Demo registration accepted" : "A safe next step";
  const message = isGuide
    ? "No email was sent or stored in this portfolio demo. A production delivery provider would send the printable field guide after activation."
    : isWebinar
      ? "No personal details were stored in this portfolio demo. A production provider would send the session details after activation."
      : "This confirmation is safe to revisit directly. Choose where you would like to continue.";

  return (
    <div className="thank-you-inner">
      <p className="eyebrow">{eyebrow}</p>
      <h1 ref={headingRef} tabIndex={-1}>Good next step.</h1>
      <p>{message}</p>
      <div className="thank-you-actions">
        <Link href="/" className="button button-ink">Back to the webinar</Link>
        <Link href="/follow-up-frameworks" className="button button-outline">{isGuide ? "Back to the field guide" : "Explore the field guide"}</Link>
      </div>
    </div>
  );
}
