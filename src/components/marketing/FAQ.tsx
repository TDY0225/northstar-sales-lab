import { webinarContent } from "@/content/webinar";
import { SectionHeading } from "./SectionHeading";

export function FAQ() {
  return (
    <div className="faq-layout">
      <SectionHeading eyebrow="Questions, answered" title="Useful context before you register." />
      <div className="faq-list">
        {webinarContent.faqs.map((item) => (
          <details className="faq-item" key={item.question}>
            <summary>{item.question}<span aria-hidden="true">+</span></summary>
            <p>{item.answer}</p>
          </details>
        ))}
      </div>
    </div>
  );
}
