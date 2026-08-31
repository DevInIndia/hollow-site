import Link from "next/link";
import { Logo } from "./logo";
import { footerNav } from "@/lib/nav";
import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-page text-sm">
      <div className="shell py-16">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5 lg:gap-12">
          <div className="col-span-2 md:col-span-1">
            <Link
              href="/"
              className="inline-flex items-center font-medium text-ink"
            >
              <Logo />
            </Link>
            <p className="mt-4 text-xs leading-relaxed text-muted max-w-xs">
              A zero-dependency DNS resolver, filtering server, and protocol toolkit built entirely on the Go standard library alone.
            </p>
            <div className="mt-4 flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-raised px-2.5 py-0.5 text-[11px] font-mono text-muted">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                {site.version}
              </span>
              <span className="text-xs text-faint">·</span>
              <span className="text-xs text-muted">MIT Licensed</span>
            </div>
          </div>

          {footerNav.map((col) => (
            <div key={col.title} className="col-span-1">
              <h3 className="font-mono text-xs font-medium uppercase tracking-wider text-faint">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-2.5 text-xs">
                {col.links.map((link) => (
                  <li key={link.href}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        className="text-muted transition-colors hover:text-ink"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-muted transition-colors hover:text-ink"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-line-soft pt-8 text-xs text-muted sm:flex-row">
          <p>© {new Date().getFullYear()} hollow. Zero dependencies · Pure Go.</p>
          <div className="flex items-center gap-6">
            <Link href="/docs/limitations/" className="hover:text-ink transition-colors">
              Limitations
            </Link>
            <Link href="/docs/zero-dependencies/" className="hover:text-ink transition-colors">
              Zero-Dep Proof
            </Link>
            <a
              href={site.repo}
              target="_blank"
              rel="noreferrer"
              className="hover:text-ink transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}