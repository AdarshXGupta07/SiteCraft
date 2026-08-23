"use client";

import { createContext, useContext, useEffect, useRef } from "react";
import { useMotionValue, type MotionValue } from "framer-motion";
import Lenis from "lenis";

const ScrollProgressContext = createContext<MotionValue<number> | null>(null);

export function useScrollProgress() {
  const ctx = useContext(ScrollProgressContext);
  if (!ctx) {
    throw new Error("useScrollProgress must be used within SmoothScrollProvider");
  }
  return ctx;
}

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const scrollProgress = useMotionValue(0);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // Native scroll only; scrollProgress still updates via a plain listener below.
      const onScroll = () => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        scrollProgress.set(max > 0 ? window.scrollY / max : 0);
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => window.removeEventListener("scroll", onScroll);
    }

    const lenis = new Lenis({
      lerp: 0.1,
      duration: 1.2,
      smoothWheel: true,
      syncTouch: false,
    });
    lenisRef.current = lenis;

    lenis.on("scroll", ({ scroll, limit }: { scroll: number; limit: number }) => {
      scrollProgress.set(limit > 0 ? scroll / limit : 0);
    });

    const handleHashClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const anchor = target?.closest("a");
      if (anchor && anchor.hash && anchor.hash.startsWith("#")) {
        e.preventDefault();
        lenis.scrollTo(anchor.hash);
      }
    };
    document.addEventListener("click", handleHashClick);

    let frameId: number;
    function raf(time: number) {
      lenis.raf(time);
      frameId = requestAnimationFrame(raf);
    }
    frameId = requestAnimationFrame(raf);

    return () => {
      document.removeEventListener("click", handleHashClick);
      cancelAnimationFrame(frameId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [scrollProgress]);

  return (
    <ScrollProgressContext.Provider value={scrollProgress}>
      {children}
    </ScrollProgressContext.Provider>
  );
}
