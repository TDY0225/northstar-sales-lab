export const webinarContent = {
  eyebrow: "Live online workshop · Free to attend",
  title: "Make the next sales conversation easier to say yes to.",
  intro:
    "A practical 45-minute session for small B2B teams that want a clearer way to move good-fit deals forward — without adding pressure or more tools.",
  cta: {
    primary: "Reserve my free seat",
    secondary: "See what we will cover",
  },
  date: "Thursday, 15 October 2026 · 12:00 PM MYT",
  dateNote: "A fictional event date for this portfolio demonstration.",
  outcomes: [
    "Turn vague interest into a specific, mutual next step.",
    "Spot the difference between a real objection and a missing decision.",
    "Build follow-up around buyer momentum instead of seller anxiety.",
  ],
  agenda: [
    {
      number: "01",
      title: "Find the decision signal",
      body: "A short diagnostic for separating curiosity from a problem someone is ready to solve.",
    },
    {
      number: "02",
      title: "Name the next useful step",
      body: "A conversation pattern that turns a promising call into a clear commitment on both sides.",
    },
    {
      number: "03",
      title: "Follow up with context",
      body: "A simple way to keep a deal moving without sending another generic check-in.",
    },
  ],
  audience: [
    "Founders still leading their own sales",
    "Sales managers coaching a lean team",
    "Small B2B teams with a few good opportunities in motion",
  ],
  method: [
    {
      label: "Orient",
      title: "Start with the buyer's decision",
      body: "Clarify what has to become true before a buyer can move, rather than rushing to pitch.",
    },
    {
      label: "Frame",
      title: "Make the trade-off visible",
      body: "Give the conversation a useful shape: current friction, desired change, and the cost of waiting.",
    },
    {
      label: "Advance",
      title: "Earn the next step",
      body: "Close each conversation around an action that is specific, small enough to take, and owned by someone.",
    },
  ],
  instructor: {
    name: "Avery Cole",
    role: "Sales coach and facilitator",
    bio: "A fictional portfolio profile for a coach who helps small B2B teams replace reactive follow-up with a calmer, more useful sales rhythm.",
    note: "Fictional instructor profile",
  },
  proof: [
    { label: "A clear point of view", body: "Practical conversation design over performance theatre." },
    { label: "A repeatable structure", body: "Three moves you can teach, practise, and review with a team." },
    { label: "A useful next action", body: "Leave with a prompt you can use in your next live opportunity." },
  ],
  faqs: [
    {
      question: "Is this webinar for experienced salespeople?",
      answer: "Yes. The session is designed for people who already have real sales conversations and want a more consistent way to move them forward.",
    },
    {
      question: "How long is the session?",
      answer: "The planned session is 45 minutes, including a short Q&A at the end.",
    },
    {
      question: "Will there be a recording?",
      answer: "Recording details will be shared with registered attendees after the event information is finalised.",
    },
    {
      question: "Is this a product demo?",
      answer: "No. It is a practical coaching session focused on sales conversations, follow-up, and decision clarity.",
    },
  ],
  finalCta: "Reserve your free seat",
} as const;

export type WebinarContent = typeof webinarContent;
