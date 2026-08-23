import Container from "@/components/ui/Container";
import { RevealSection, RevealItem } from "@/components/ui/RevealSection";
import { NAV_LINKS, SITE_NAME } from "@/lib/constants";

export default function Footer() {
  return (
    <RevealSection className="border-t border-border" id="footer-section">
      <footer>
        <Container className="flex flex-col gap-8 py-16 md:flex-row md:items-start md:justify-between">
          <RevealItem>
            <p className="font-display text-lg font-semibold">
              {SITE_NAME.replace("Craft", "")}
              <span className="text-gradient">Craft</span>
            </p>
            <p className="mt-3 max-w-xs text-sm text-text-muted">
              Websites built for restaurants, schools, hotels, clinics, and
              personal brands.
            </p>
          </RevealItem>

          <RevealItem>
            <nav className="flex gap-8">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-text-muted hover:text-text"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </RevealItem>

          <RevealItem>
            <p className="text-sm text-text-muted">
              © {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
            </p>
          </RevealItem>
        </Container>
      </footer>
    </RevealSection>
  );
}
