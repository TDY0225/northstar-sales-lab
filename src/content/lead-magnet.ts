export const leadMagnetContent = {
  eyebrow: "Free field guide",
  title: "7 Follow-Up Frameworks That Keep Deals Moving",
  intro:
    "A concise guide for replacing awkward check-ins with follow-up that gives the buyer a useful reason to reply.",
  benefits: [
    "Choose a follow-up angle based on the buyer's last signal.",
    "Turn a stalled thread into a clear decision question.",
    "Keep momentum without over-emailing or creating pressure.",
  ],
  contents: [
    "The recap-and-confirm framework",
    "The decision-path framework",
    "The useful-contrast framework",
    "Four more prompts for common deal moments",
  ],
  form: {
    title: "Send me the field guide",
    submitLabel: "Get the guide",
    helper: "In a live version, one practical email would deliver the download details. Unsubscribe anytime.",
    privacy: "We only use your email to deliver this guide and relevant Northstar updates.",
  },
  faq: {
    question: "What format is the guide?",
    answer: "The planned asset is a short, printable PDF field guide.",
  },
} as const;

export type LeadMagnetContent = typeof leadMagnetContent;
