import Container from "@/components/ui/Container";
import { RevealSection, RevealItem } from "@/components/ui/RevealSection";
import SectionHeading from "@/components/ui/SectionHeading";
import { VALUE_PROPS } from "@/lib/constants";

export default function ValueProps() {
  return (
    <RevealSection className="border-b border-border py-24 md:py-32">
      <Container>
        <SectionHeading eyebrow="Why SiteCraft">
          Why businesses build with SiteCraft
        </SectionHeading>

        <div className="mt-16 grid gap-4 md:grid-cols-2">
          {VALUE_PROPS.map((item) => (
            <RevealItem
              key={item.number}
              className="flex items-start gap-4 rounded-2xl bg-bg-elevated p-6 shadow-[0_4px_16px_-8px_rgba(20,22,31,0.12)] transition-shadow hover:shadow-[0_8px_24px_-8px_rgba(51,85,255,0.25)]"
            >
              <span className="bg-accent-blue flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-medium text-white">
                {item.number}
              </span>
              <div>
                <h3 className="text-lg font-medium">{item.title}</h3>
                <p className="mt-2 text-text-muted">{item.description}</p>
              </div>
            </RevealItem>
          ))}
        </div>
      </Container>
    </RevealSection>
  );
}
