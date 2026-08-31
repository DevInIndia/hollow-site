"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cx } from "./ui";

interface DocsNavSection {
  title: string;
  items: { label: string; href: string }[];
}

const docsNav: DocsNavSection[] = [
  {
    title: "Getting Started",
    items: [
      { label: "Overview", href: "/docs/" },
      { label: "Quickstart", href: "/docs/quickstart/" },
      { label: "Installation", href: "/docs/installation/" },
    ],
  },
  {
    title: "CLI Reference",
    items: [
      { label: "All Commands", href: "/docs/cli/" },
      { label: "hollow resolve", href: "/docs/cli/resolve/" },
      { label: "hollow trace", href: "/docs/cli/trace/" },
      { label: "hollow inspect", href: "/docs/cli/inspect/" },
      { label: "hollow serve", href: "/docs/cli/serve/" },
      { label: "hollow stats", href: "/docs/cli/stats/" },
      { label: "hollow dash", href: "/docs/cli/dash/" },
    ],
  },
  {
    title: "Core Mechanics",
    items: [
      { label: "Answer Caching", href: "/docs/caching/" },
      { label: "Adblock & Filtering", href: "/docs/blocking/" },
      { label: "Forgery Resistance & RRL", href: "/docs/security/" },
      { label: "Zero Dependencies", href: "/docs/zero-dependencies/" },
      { label: "Limitations", href: "/docs/limitations/" },
    ],
  },
];

export function DocsSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-full lg:w-64 shrink-0 font-sans text-xs">
      <nav className="space-y-6 lg:sticky lg:top-24">
        {docsNav.map((section) => (
          <div key={section.title}>
            <h4 className="font-mono text-[11px] font-semibold uppercase tracking-wider text-faint mb-2.5">
              {section.title}
            </h4>
            <ul className="space-y-1">
              {section.items.map((item) => {
                const isActive = pathname === item.href || (item.href !== "/docs/" && pathname.startsWith(item.href));
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cx(
                        "block px-2.5 py-1.5 rounded-md transition-colors",
                        isActive
                          ? "bg-accent-tint text-accent font-semibold"
                          : "text-muted hover:bg-raised hover:text-ink"
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}
