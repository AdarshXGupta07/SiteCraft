"use client";

import Image from "next/image";
import { motion, useTransform, type MotionValue } from "framer-motion";
import type { NICHES } from "@/lib/constants";

const BASE_OFFSET = 380;
const DIST = [-1.5, -1, 0, 1, 1.5];

export default function IndustryCard({
  niche,
  index,
  rawIndex,
  intensity,
}: {
  niche: (typeof NICHES)[number];
  index: number;
  rawIndex: MotionValue<number>;
  intensity: MotionValue<number>;
}) {
  const distance = useTransform(rawIndex, (v) => v - index);

  const xBase = useTransform(distance, DIST, [
    -BASE_OFFSET * 1.4,
    -BASE_OFFSET,
    0,
    BASE_OFFSET,
    BASE_OFFSET * 1.4,
  ]);
  const x = useTransform([xBase, intensity], ([xb, i]) => `calc(-50% + ${(xb as number) * (i as number)}px)`);

  const scale = useTransform(distance, DIST, [0.8, 0.85, 1, 0.85, 0.8]);
  const opacity = useTransform(distance, DIST, [0, 0.35, 1, 0.35, 0]);

  const rotateYBase = useTransform(distance, DIST, [8, 8, 0, -8, -8]);
  const rotateY = useTransform([rotateYBase, intensity], ([r, i]) => (r as number) * (i as number));

  const blurPx = useTransform(distance, DIST, [2, 1.5, 0, 1.5, 2]);
  const filter = useTransform([blurPx, intensity], ([b, i]) => `blur(${(b as number) * (i as number)}px)`);

  const zIndex = useTransform(distance, (d) => Math.round(50 - Math.min(Math.abs(d), 5) * 10));

  const glow = useTransform(distance, [-0.3, 0, 0.3], [0, 1, 0]);
  const boxShadow = useTransform(
    glow,
    (g) => `0 20px 60px -20px rgba(51,85,255,${(0.12 + g * 0.28).toFixed(2)})`,
  );
  const borderColor = useTransform(glow, (g) =>
    g > 0.5 ? "rgba(51,85,255,0.45)" : "var(--border)",
  );

  return (
    <motion.div
      style={{
        x,
        y: "-50%",
        scale,
        opacity,
        rotateY,
        filter,
        zIndex,
        boxShadow,
        borderColor,
      }}
      className="absolute left-1/2 top-1/2 w-[85vw] max-w-sm overflow-hidden rounded-2xl border bg-bg-elevated will-change-transform [transform-style:preserve-3d]"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image src={niche.image} alt={niche.title} fill unoptimized className="object-cover" />
      </div>
      <div className="p-6">
        <h3 className="text-lg font-medium">{niche.title}</h3>
        <p className="mt-2 text-sm text-text-muted">{niche.description}</p>
      </div>
    </motion.div>
  );
}
