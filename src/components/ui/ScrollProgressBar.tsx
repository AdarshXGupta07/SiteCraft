"use client";

import { motion, useTransform } from "framer-motion";
import { useScrollProgress } from "@/components/scroll/SmoothScrollProvider";

export default function ScrollProgressBar() {
  const scrollProgress = useScrollProgress();
  const scaleX = useTransform(scrollProgress, [0, 1], [0, 1]);

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="bg-gradient-accent fixed inset-x-0 top-16 z-50 h-[2px] origin-left"
    />
  );
}
