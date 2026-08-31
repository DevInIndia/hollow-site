import { site } from "./site";

export type NavLink = {
  label: string;
  href: string;
  description?: string;
  external?: boolean;
};

/** The Product mega-menu. Each entry points at a real page or a real anchor. */
export const productMenu: NavLink[] = [
  {
    label: "Iterative resolver",
    href: "/architecture/#resolver",
    description: "Root to authoritative, with the delegation path checked at every hop.",
  },
  {
    label: "Filtering server",
    href: "/architecture/#server",
    description: "Concurrent UDP and TCP, blocklists in three formats, rate limiting.",
  },
  {
    label: "Cache and coalescing",
    href: "/architecture/#cache",
    description: "Sharded LRU, negative caching, serve-stale, one walk per herd.",
  },
  {
    label: "Wire format",
    href: "/wire/",
    description: "Every octet of a reply, named by the decoder that read it.",
  },
  {
    label: "Trace",
    href: "/docs/cli/trace/",
    description: "The delegation path actually walked, drawn as a tree.",
  },
  {
    label: "Dashboard",
    href: "/tui/",
    description: "A live view of a running server over the control socket.",
  },
];

/** Top-level navigation, in the order it appears. */
export const primaryNav: Array<
  NavLink & { menu?: NavLink[] }
> = [
  { label: "Product", href: "/architecture/", menu: productMenu },
  { label: "Documentation", href: "/docs/" },
  { label: "Architecture", href: "/architecture/" },
  { label: "CLI", href: "/docs/cli/" },
  { label: "TUI", href: "/tui/" },
  { label: "GitHub", href: site.repo, external: true },
];

/** Footer columns. */
export const footerNav: Array<{ title: string; links: NavLink[] }> = [
  {
    title: "Product",
    links: [
      { label: "Overview", href: "/" },
      { label: "Architecture", href: "/architecture/" },
      { label: "Wire format", href: "/wire/" },
      { label: "Dashboard", href: "/tui/" },
    ],
  },
  {
    title: "Documentation",
    links: [
      { label: "Installation", href: "/docs/installation/" },
      { label: "Quickstart", href: "/docs/quickstart/" },
      { label: "CLI reference", href: "/docs/cli/" },
      { label: "Exit codes", href: "/docs/cli/#exit-codes" },
    ],
  },
  {
    title: "Engineering",
    links: [
      { label: "Zero dependencies", href: "/docs/zero-dependencies/" },
      { label: "Caching", href: "/docs/caching/" },
      { label: "Blocking", href: "/docs/blocking/" },
      { label: "Forgery resistance", href: "/docs/security/" },
    ],
  },
  {
    title: "Project",
    links: [
      { label: "Limitations", href: "/docs/limitations/" },
      { label: "Repository", href: site.repo, external: true },
      { label: "Releases", href: site.releases, external: true },
      {
        label: "License",
        href: `${site.repo}/blob/main/LICENSE`,
        external: true,
      },
    ],
  },
];
