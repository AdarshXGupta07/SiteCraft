"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useScroll, useTransform, type MotionValue } from "framer-motion";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { NICHES } from "@/lib/constants";
import IndustryCard from "./IndustryCard";

/** 1 on desktop, scaled down on narrower viewports so the 3D depth/travel doesn't overwhelm small screens. */
function useCarouselIntensity() {
  const intensity = useMotionValue(1);
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      intensity.set(w < 640 ? 0.45 : w < 1024 ? 0.7 : 1);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [intensity]);
  return intensity;
}

function CarouselDot({ index, rawIndex }: { index: number; rawIndex: MotionValue<number> }) {
  const opacity = useTransform(rawIndex, (v) => (Math.round(v) === index ? 1 : 0.3));
  const width = useTransform(rawIndex, (v) => (Math.round(v) === index ? 24 : 6));
  return (
    <motion.span
      style={{ opacity, width }}
      className="bg-accent-blue h-1.5 rounded-full transition-[width]"
    />
  );
}

export default function IndustryCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const intensity = useCarouselIntensity();
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });
  const rawIndex = useTransform(scrollYProgress, [0, 1], [0, NICHES.length - 1]);
  const headingOpacity = useTransform(scrollYProgress, [0, 0.06], [1, 0.92]);

  return (
    <div
      ref={trackRef}
      id="niches"
      style={{ height: `${NICHES.length * 100}vh` }}
      className="relative"
    >
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden border-b border-border">
        <Container className="pt-8">
          <motion.div style={{ opacity: headingOpacity }}>
            <SectionHeading eyebrow="Who we build for">
              Built around your industry, not a generic template
            </SectionHeading>
          </motion.div>
        </Container>

        <div className="relative mt-4 flex-1" style={{ perspective: "1400px" }}>
          {NICHES.map((niche, i) => (
            <IndustryCard
              key={niche.slug}
              niche={niche}
              index={i}
              rawIndex={rawIndex}
              intensity={intensity}
            />
          ))}
        </div>

        <div className="pointer-events-none relative z-10 flex justify-center gap-2 pb-8">
          {NICHES.map((_, i) => (
            <CarouselDot key={i} index={i} rawIndex={rawIndex} />
          ))}
        </div>
      </div>
    </div>
  );
}
