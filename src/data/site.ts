export type WorkItem = {
  slug: string;
  title: string;
  category: string;
  summary: string;
  challenge: string;
  solution: string;
  outcome: string;
};

export type ProductItem = {
  name: string;
  price: string;
  desc: string;
  href: string;
};

export const navItems = [
  { label: "work", href: "/work" },
  { label: "gallery", href: "/gallery" },
  { label: "shop", href: "/shop" },
  { label: "about", href: "/about" },
  { label: "contact", href: "/contact" },
];

export const workItems: WorkItem[] = [
  {
    slug: "northline-rebrand",
    title: "northline rebrand",
    category: "identity + web",
    summary: "Repositioned a consulting studio with a sharper visual system and conversion-led homepage.",
    challenge: "Their old brand felt generic and couldn't explain premium pricing.",
    solution: "Built a tighter narrative, stronger typography system, and modular web sections for services.",
    outcome: "Homepage conversion up 34% and average lead quality improved within 30 days.",
  },
  {
    slug: "arc-labs-launch",
    title: "arc labs launch",
    category: "product marketing",
    summary: "Designed launch narrative and landing page architecture for an internal tools startup.",
    challenge: "The product was technical and hard to explain to non-engineers.",
    solution: "Simplified message hierarchy with visual demos and outcome-first copy.",
    outcome: "Launch list grew to 2,700 signups before public release.",
  },
  {
    slug: "quietframe-site",
    title: "quietframe site",
    category: "editorial web design",
    summary: "Created an immersive portfolio experience balancing art direction and speed.",
    challenge: "Portfolio needed to feel premium without becoming slow or noisy.",
    solution: "Used sparse motion, high-contrast layouts, and strict content hierarchy.",
    outcome: "Bounce rate dropped 21% and project inquiry rate doubled.",
  },
];

export const workDetailBgBySlug: Record<string, string> = {
  "northline-rebrand": "#0d0d0d",
  "arc-labs-launch": "#ffcc00",
  "quietframe-site": "#0d0d0d",
};

export const workDetailInkBySlug: Record<string, "light" | "dark"> = {
  "northline-rebrand": "light",
  "arc-labs-launch": "dark",
  "quietframe-site": "light",
};

export const products: ProductItem[] = [
  {
    name: "site teardown",
    price: "$49",
    desc: "15-minute UX + copy audit video.",
    href: "https://anypercent.run/collections/archetype/products/archetype-24-hoodie-golden-retriever",
  },
  {
    name: "portfolio starter",
    price: "$79",
    desc: "Figma + Next.js starter section pack.",
    href: "https://buy.stripe.com/test_8wM4gA8Ecfake01",
  },
  {
    name: "launch copy kit",
    price: "$29",
    desc: "Headline and CTA templates for product pages.",
    href: "https://buy.stripe.com/test_3cs5kE7A8fake02",
  },
];
