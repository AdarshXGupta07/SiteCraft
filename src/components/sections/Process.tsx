import Container from "@/components/ui/Container";
import { RevealSection, RevealItem } from "@/components/ui/RevealSection";
import SectionHeading from "@/components/ui/SectionHeading";
import { PROCESS_STEPS } from "@/lib/constants";

export default function Process() {
  return (
    <RevealSection id="process" className="border-b border-border py-24 md:py-32">
      <Container>
        <SectionHeading eyebrow="How we work">From first call to launch</SectionHeading>

        <div className="mt-16 grid gap-x-8 gap-y-14 md:grid-cols-4">
          {PROCESS_STEPS.map((step) => (
            <RevealItem key={step.number}>
              <span className="text-gradient font-display text-4xl font-light">
                {step.number}
              </span>
              <h3 className="mt-4 text-lg font-medium">{step.title}</h3>
              <p className="mt-2 text-sm text-text-muted">{step.description}</p>
            </RevealItem>
          ))}
        </div>
      </Container>
    </RevealSection>
  );
}
