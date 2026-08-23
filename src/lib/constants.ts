export const SITE_NAME = "SiteCraft";

export const NAV_LINKS = [
  { label: "Work", href: "#niches" },
  { label: "Process", href: "#process" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Contact", href: "#contact" },
] as const;

export const VALUE_PROPS = [
  {
    number: "01",
    title: "Custom-Designed, Not Templated",
    description:
      "Every site is designed around your business and your customers, not stretched from a generic theme.",
  },
  {
    number: "02",
    title: "Built for Speed & SEO",
    description:
      "Modern, lightweight code that loads fast and is structured so search engines can actually find you.",
  },
  {
    number: "03",
    title: "Mobile-First, Every Time",
    description:
      "Most of your visitors arrive on a phone. We design and test for that reality first, desktop second.",
  },
  {
    number: "04",
    title: "Real Support After Launch",
    description:
      "Launch day isn't the finish line. We stay reachable for updates, fixes, and growth as your business changes.",
  },
] as const;

export const NICHES = [
  {
    slug: "restaurants",
    title: "Restaurants & Cafés",
    description:
      "Menus that make people hungry, online ordering, reservations, and a look that matches the room.",
    image: "/images/niches/restaurants.png",
  },
  {
    slug: "educational",
    title: "Educational",
    description:
      "Course catalogs, faculty pages, and enrollment flows built for schools, tutors, and training programs.",
    image: "/images/niches/educational.png",
  },
  {
    slug: "personal",
    title: "Personal",
    description:
      "Portfolios, resumes, and personal brands for creators, consultants, and professionals building an audience.",
    image: "/images/niches/personal.png",
  },
  {
    slug: "hotels",
    title: "Hotels",
    description:
      "Bookings, room galleries, and local guides that turn browsers into confirmed reservations.",
    image: "/images/niches/hotels.png",
  },
  {
    slug: "clinics",
    title: "Clinics & Doctors",
    description:
      "Appointment requests, provider bios, and service pages designed around patient trust.",
    image: "/images/niches/clinics.png",
  },
] as const;

export const PROCESS_STEPS = [
  {
    number: "01",
    title: "Discovery",
    description: "We learn your business, your customers, and what the site needs to do for you.",
  },
  {
    number: "02",
    title: "Design",
    description: "A visual direction and page layout you approve before a line of code is written.",
  },
  {
    number: "03",
    title: "Build",
    description: "Your site is built, tested on real devices, and filled in with your content.",
  },
  {
    number: "04",
    title: "Launch & Support",
    description: "We ship it, hand over access, and stay on for updates as your needs evolve.",
  },
] as const;

export const PORTFOLIO_PLACEHOLDERS = [
  { title: "Restaurant Launch", tag: "Coming soon", image: "/images/niches/restaurants.png" },
  { title: "Clinic Rebuild", tag: "Coming soon", image: "/images/niches/clinics.png" },
  { title: "Boutique Hotel Site", tag: "Coming soon", image: "/images/niches/hotels.png" },
] as const;

export const PROJECT_TYPES = [
  "Restaurant / Café",
  "Educational",
  "Personal",
  "Hotel",
  "Clinic / Doctor",
  "Something else",
] as const;
