import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/marketing/SectionHeading";
import { LeadForm } from "@/components/forms/LeadForm";
import { leadMagnetContent } from "@/content/lead-magnet";

export const metadata = { title: leadMagnetContent.title, description: leadMagnetContent.intro };

export default function LeadMagnetPage() {
  return <div className="page-shell"><Header /><main id="main-content"><section className="lead-page-hero"><Container><div className="lead-hero-grid"><div><p className="eyebrow">{leadMagnetContent.eyebrow}</p><h1>{leadMagnetContent.title}</h1><p className="hero-copy">{leadMagnetContent.intro}</p></div><div className="guide-contents"><p className="hero-aside-label">Inside the guide</p>{leadMagnetContent.contents.map((item, index) => <div className="guide-content-item" key={item}><span>0{index + 1}</span>{item}</div>)}</div></div></Container></section><Section><div className="lead-capture-layout"><SectionHeading eyebrow="Use it in your next deal" title="Follow up with a reason to reply." body="The guide gives you seven conversation-ready frameworks for the moments when a deal goes quiet, drifts, or needs a clearer decision." /><div><div className="outcome-grid outcome-grid-flat">{leadMagnetContent.benefits.map((item, index) => <article className="outcome-item" key={item}><span className="item-number">0{index + 1}</span><p>{item}</p></article>)}</div></div></div></Section><Section id="download" className="section-evergreen"><div className="lead-capture-layout"><SectionHeading eyebrow="Free field guide" title="Send it to my inbox." body="In a live version, this form would trigger delivery details. In the portfolio demo, no email is sent or stored." /><LeadForm kind="guide" title={leadMagnetContent.form.title} submitLabel={leadMagnetContent.form.submitLabel} helper={leadMagnetContent.form.helper} privacy={leadMagnetContent.form.privacy} /></div></Section><Section className="section-line"><SectionHeading eyebrow="One last thing" title={leadMagnetContent.faq.question} body={leadMagnetContent.faq.answer} /></Section></main><Footer /></div>;
}
