"use client";

import { type ReactNode } from "react";
import { motion } from "framer-motion";
import { RevealItem } from "./RevealSection";

export default function SectionHeading({
  eyebrow,
  children,
  className,
}: {
  eyebrow: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <RevealItem className={className}>
      <div className="flex items-center gap-3">
        <motion.span
          variants={{
            hidden: { scaleX: 0 },
            visible: { scaleX: 1, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
          }}
          style={{ transformOrigin: "left" }}
          className="bg-gradient-accent h-px w-8 shrink-0"
        />
        <p className="text-sm uppercase tracking-[0.2em] text-text-muted">{eyebrow}</p>
      </div>
      <h2 className="font-display mt-4 max-w-xl text-[clamp(1.75rem,3.5vw,2.75rem)] font-medium">
        {children}
      </h2>
    </RevealItem>
  );
}
