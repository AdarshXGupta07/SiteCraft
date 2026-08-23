import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { MotionConfig } from "framer-motion";
import SmoothScrollProvider from "@/components/scroll/SmoothScrollProvider";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SiteCraft — Websites, built for your business",
  description:
    "SiteCraft designs and builds fast, modern websites for restaurants, schools, hotels, clinics, and personal brands.",
  icons: {
    icon: "/icon.png",
  }
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-bg text-text">
        <MotionConfig reducedMotion="never">
          <SmoothScrollProvider>{children}</SmoothScrollProvider>
        </MotionConfig>
      </body>
    </html>
  );
}
