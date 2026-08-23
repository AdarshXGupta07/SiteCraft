# SiteCraft - Freelance Web Development Portfolio

A premium, highly-performant landing page and portfolio for modern freelance web development.

## Features

- **High-End "Tech" Theme**: Professionally designed utilizing a sleek light mode UI with modern blue accents, glassmorphic elements, and premium typography.
- **360° Scroll-Driven Laptop Animation**: Uses a canvas-based frame scrubber triggered by user scroll progress to elegantly transition sections.
- **Lenis Smooth Scrolling**: Overhauled silky smooth scrolling experience integrated across the site and navigation anchors.
- **Targeted Industry & Portfolio Cards**: Built-in support for multiple niches with custom-generated abstract 3D UI illustrations representing various client types (clinics, restaurants, boutique hotels).
- **Responsive Layout**: Designed to scale flawlessly from massive desktop displays to mobile viewports.

## Tech Stack

- [Next.js](https://nextjs.org/) (App Router)
- [React](https://reactjs.org/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Lenis](https://lenis.studiofreight.com/)

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Customization

- To alter the site's primary colors, modify the root CSS variables in `src/app/globals.css`.
- Update your portfolio references to actual case studies in `src/lib/constants.ts`.
- Place your 120-frame laptop scrub sequence in the `public/laptop-frames/` directory to customize the scroll transition.
