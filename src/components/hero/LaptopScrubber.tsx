"use client";

import { useEffect, useRef, useState } from "react";
import { useMotionValueEvent, type MotionValue } from "framer-motion";

const FRAME_COUNT = 120;
const frameSrc = (i: number) => `/laptop-frames/frame-${String(i).padStart(3, "0")}.jpg`;

/**
 * Scroll-scrubs a pre-rendered 360° laptop rotation, drawing frames to a
 * <canvas> instead of seeking an actual <video> element — video.currentTime
 * seeking is too imprecise/laggy for rapid scroll-driven scrubbing, so this
 * decodes and swaps still frames instead, the same technique product sites
 * like Apple's use for this exact effect.
 */
export default function LaptopScrubber({ progress }: { progress: MotionValue<number> }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const images: HTMLImageElement[] = new Array(FRAME_COUNT);
    let loaded = 0;

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = frameSrc(i);
      img.onload = () => {
        loaded += 1;
        if (loaded === FRAME_COUNT && !cancelled) setReady(true);
      };
      images[i] = img;
    }
    imagesRef.current = images;

    return () => {
      cancelled = true;
    };
  }, []);

  function draw(p: number) {
    const canvas = canvasRef.current;
    const images = imagesRef.current;
    if (!canvas || images.length === 0) return;
    const index = Math.min(FRAME_COUNT - 1, Math.max(0, Math.round(p * (FRAME_COUNT - 1))));
    const img = images[index];
    if (!img || !img.complete || img.naturalWidth === 0) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  }

  useEffect(() => {
    if (ready) draw(progress.get());
  }, [ready]); // eslint-disable-line react-hooks/exhaustive-deps

  useMotionValueEvent(progress, "change", (p) => {
    if (ready) draw(p);
  });

  return (
    <canvas
      ref={canvasRef}
      width={848}
      height={478}
      aria-hidden="true"
      className={`h-auto w-full max-w-2xl transition-opacity duration-500 ${ready ? "opacity-100" : "opacity-0"}`}
      style={{
        // Feathers the video frame's own gray studio backdrop into the
        // page background instead of showing a hard rectangular edge.
        maskImage:
          "radial-gradient(ellipse 62% 60% at center, black 55%, transparent 96%)",
        WebkitMaskImage:
          "radial-gradient(ellipse 62% 60% at center, black 55%, transparent 96%)",
      }}
    />
  );
}
