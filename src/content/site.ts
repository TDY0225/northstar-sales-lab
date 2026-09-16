export const siteContent = {
  brand: {
    name: "Northstar Sales Lab",
    shortName: "Northstar",
    descriptor: "Practical sales coaching for small B2B teams.",
  },
  navigation: [
    { label: "The agenda", href: "#agenda" },
    { label: "The method", href: "#method" },
    { label: "FAQs", href: "#faq" },
  ],
  footer: {
    disclosure: "A fictional portfolio demonstration for Northstar Sales Lab.",
    copyright: "© 2026 Northstar Sales Lab",
  },
  metadata: {
    title: "Northstar Sales Lab | Make every sales conversation clearer",
    description:
      "A practical sales coaching webinar for founders, sales managers, and small B2B teams that want a clearer path from first conversation to next step.",
  },
} as const;

export type SiteContent = typeof siteContent;
