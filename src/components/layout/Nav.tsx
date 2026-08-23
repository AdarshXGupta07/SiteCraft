"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Container from "@/components/ui/Container";
import { NAV_LINKS } from "@/lib/constants";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [activeHref, setActiveHref] = useState<string | null>(null);

  useEffect(() => {
    const sections = NAV_LINKS.map((link) =>
      document.querySelector<HTMLElement>(link.href),
    ).filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) {
          setActiveHref(`#${visible.target.id}`);
        }
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-bg/70 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between">
        <a href="#top" className="font-display text-lg font-semibold">
          Site<span className="text-gradient">Craft</span>
        </a>

        <nav className="hidden gap-8 md:flex">
          {NAV_LINKS.map((link) => {
            const isActive = activeHref === link.href;
            return (
              <a
                key={link.href}
                href={link.href}
                className={`group relative text-sm transition-colors ${isActive ? "text-text" : "text-text-muted hover:text-text"
                  }`}
              >
                {link.label}
                <span
                  className={`bg-gradient-accent absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100 ${isActive ? "scale-x-100" : ""
                    }`}
                />
              </a>
            );
          })}
        </nav>

        <a
          href="#contact"
          className="bg-accent-blue hidden rounded-full px-5 py-2 text-sm font-semibold text-black transition-transform hover:scale-105 md:inline-flex shadow-[0_0_15px_rgba(179,240,144,0.3)]"
        >
          Let&rsquo;s talk
        </a>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 md:hidden"
        >
          <span
            className={`h-0.5 w-6 bg-text transition-transform ${open ? "translate-y-2 rotate-45" : ""}`}
          />
          <span className={`h-0.5 w-6 bg-text transition-opacity ${open ? "opacity-0" : ""}`} />
          <span
            className={`h-0.5 w-6 bg-text transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`}
          />
        </button>
      </Container>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-border/60 md:hidden"
          >
            <Container className="flex flex-col gap-4 py-6">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={
                    activeHref === link.href
                      ? "text-base text-text"
                      : "text-base text-text-muted hover:text-text"
                  }
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="bg-accent-blue inline-flex w-fit rounded-full px-5 py-2 text-sm font-semibold text-black shadow-[0_0_15px_rgba(179,240,144,0.3)]"
              >
                Let&rsquo;s talk
              </a>
            </Container>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
