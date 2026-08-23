import Container from "@/components/ui/Container";
import { RevealSection, RevealItem } from "@/components/ui/RevealSection";
import SectionHeading from "@/components/ui/SectionHeading";
import ContactForm from "@/components/contact/ContactForm";

export default function Contact() {
  return (
    <RevealSection id="contact" className="py-24 md:py-32">
      <Container className="grid gap-12 md:grid-cols-2">
        <div>
          <SectionHeading eyebrow="Get in touch">Let&rsquo;s build your website</SectionHeading>
          <RevealItem>
            <p className="mt-4 max-w-sm text-text-muted">
              Tell us about your business and what you need. We&rsquo;ll reply
              with next steps — no obligation.
            </p>
          </RevealItem>
        </div>

        <RevealItem>
          <ContactForm />
        </RevealItem>
      </Container>
    </RevealSection>
  );
}
