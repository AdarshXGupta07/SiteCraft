import Container from "@/components/ui/Container";
import { RevealSection, RevealItem } from "@/components/ui/RevealSection";
import SectionHeading from "@/components/ui/SectionHeading";
import { PORTFOLIO_PLACEHOLDERS } from "@/lib/constants";

export default function Portfolio() {
  return (
    <RevealSection id="portfolio" className="border-b border-border py-24 md:py-32">
      <Container>
        <SectionHeading eyebrow="Portfolio">Case studies, coming soon</SectionHeading>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {PORTFOLIO_PLACEHOLDERS.map((item) => (
            <RevealItem
              key={item.title}
              className="group"
            >
              <div
                style={{ backgroundImage: `url(${item.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                className="relative overflow-hidden flex h-full w-full aspect-[4/3] flex-col justify-end rounded-2xl border border-border bg-bg-elevated p-6 transition-all duration-300 group-hover:border-accent-blue/40 group-hover:shadow-[0_16px_40px_-16px_var(--accent-blue-light)]"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none" />
                <div className="relative z-10 flex flex-col items-start">
                  <span className="w-fit rounded-full border border-white/20 bg-black/50 backdrop-blur-md px-3 py-1 text-xs text-white shadow-sm">
                    {item.tag}
                  </span>
                  <h3 className="mt-4 text-xl font-semibold text-white drop-shadow-md">{item.title}</h3>
                </div>
              </div>
            </RevealItem>
          ))}
        </div>
      </Container>
    </RevealSection>
  );
}
