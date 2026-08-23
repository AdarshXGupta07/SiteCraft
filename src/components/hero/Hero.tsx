"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import LaptopScrubber from "./LaptopScrubber";

export default function Hero() {
  const trackRef = useRef<HTMLDivElement>(null);
  // 250vh track for scroll-driven laptop 360 rotation & zoom
  const { scrollYProgress: heroProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  // Laptop starts at scale 1, zooms massively by progress 0.4
  const laptopScale = useTransform(heroProgress, [0, 0.38], [1, 3.5]);
  // Laptop rotates 360 degrees (0 to 1 progress scrubbed through 120 frames)
  const laptopScrub = useTransform(heroProgress, [0, 0.35], [0, 1]);
  // Laptop fades out early so it doesn't overlap the new text
  const laptopOpacity = useTransform(heroProgress, [0.32, 0.38], [1, 0]);
  const laptopDisplay = useTransform(heroProgress, (p) => (p > 0.4 ? "none" : "flex"));
  const cueOpacity = useTransform(heroProgress, [0, 0.03], [1, 0]);

  const textOpacity = useTransform(heroProgress, [0.42, 0.5], [0, 1]);
  const textY = useTransform(heroProgress, [0.42, 0.5], [30, 0]);
  const textDisplay = useTransform(heroProgress, (p) => (p < 0.38 ? "none" : "block"));

  // Alethia title overlay (fades out as you scroll to laptop zoom)
  const introTextOpacity = useTransform(heroProgress, [0, 0.15], [1, 0]);
  const introTextY = useTransform(heroProgress, [0, 0.15], [0, -30]);
  const introDisplay = useTransform(heroProgress, (p) => (p > 0.25 ? "none" : "flex"));

  return (
    <div ref={trackRef} style={{ height: "250vh" }} className="relative bg-bg">
      <section className="sticky top-0 isolate flex h-screen flex-col items-center justify-center overflow-hidden border-b border-border">

        {/* Subtle grid background mask */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-20 opacity-[0.25] [background-image:linear-gradient(var(--border)_1px,transparent_1px),linear-gradient(90deg,var(--border)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,black,transparent)]"
        />

        {/* Page-wide edge glow */}
        <div className="pointer-events-none absolute inset-0 -z-10 shadow-[inset_0_0_120px_var(--color-bg)] opacity-30" />

        {/* INITIAL HERO TITLE (Alethia vibe) */}
        <motion.div
          style={{ opacity: introTextOpacity, y: introTextY, display: introDisplay }}
          className="absolute z-10 w-full max-w-7xl px-6 md:px-12 top-32 flex-col pointer-events-none"
        >
          <div className="mb-6 flex flex-wrap gap-4">
            <span className="group inline-flex items-center gap-2 rounded-full border border-accent-blue bg-transparent px-5 py-2.5 text-xs font-semibold tracking-widest text-accent-blue backdrop-blur-md uppercase">
              Premium Freelance Development
            </span>
          </div>
          <h1 className="font-display text-[clamp(2.5rem,7vw,6.5rem)] font-bold leading-[1] tracking-tight text-text mb-6">
            Where Technical Precision and Brand Strategy Meet
          </h1>
        </motion.div>

        {/* 360-DEGREE LAPTOP CONTAINER */}
        <motion.div
          style={{ scale: laptopScale, opacity: laptopOpacity, display: laptopDisplay, transformOrigin: "center center" }}
          className="absolute inset-0 -z-10 flex w-full flex-col items-center justify-center pt-24"
        >
          <LaptopScrubber progress={laptopScrub} />
        </motion.div>

        {/* REVEALED TEXT CONTENT AFTER LAPTOP ZOOMS IN */}
        <motion.div
          style={{ opacity: textOpacity, y: textY, display: textDisplay }}
          className="relative z-10 w-full max-w-3xl px-6 text-center"
        >
          <p className="mb-6 text-sm uppercase tracking-[0.2em] text-text-muted">
            End-to-end digital experiences
          </p>
          <h1 className="font-display text-[clamp(2.5rem,5vw,5rem)] font-bold leading-[1.05] text-text">
            Transforming ideas into <br />
            <span className="text-gradient">Engineered Realities.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-text-muted font-light leading-relaxed">
            I build fast, highly scalable modern web applications precisely tailored for your enterprise. No generic templates—just raw performance, clean code, and premium design.
          </p>
          <div className="mt-10">
            <a
              href="#contact"
              className="bg-accent-blue inline-flex items-center rounded-full px-8 py-3.5 text-sm font-semibold text-white shadow-[0_4px_20px_var(--accent-blue-light)] transition-all hover:bg-accent-blue-light hover:scale-105 active:scale-95"
            >
              Start Your Project
            </a>
          </div>
        </motion.div>

        {/* CUE SCROLL INDICATOR */}
        <motion.div
          aria-hidden="true"
          style={{ opacity: cueOpacity }}
          className="absolute inset-x-0 bottom-12 z-10 flex justify-center items-center gap-3 text-xs font-semibold tracking-widest text-accent-blue opacity-80 uppercase"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="flex h-7 w-4 justify-center rounded-full border border-accent-blue/50 p-1"
          >
            <span className="bg-accent-blue h-1.5 w-1 rounded-full shadow-[0_0_8px_var(--accent-blue-light)]" />
          </motion.div>
          Scroll to discover
        </motion.div>

      </section>
    </div>
  );
}
