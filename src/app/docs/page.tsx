import Link from "next/link";
import { Terminal } from "@/components/terminal";
import { resolveExample } from "@/content/captures";
import { site } from "@/lib/site";

export const metadata = {
  title: "Documentation",
  description: "Overview and guide to using hollow DNS toolkit.",
};

export default function DocsPage() {
  return (
    <div className="space-y-10">
      <div>
        <span className="eyebrow">Documentation</span>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          hollow Documentation
        </h1>
        <p className="mt-4 text-sm text-muted leading-relaxed">
          Welcome to the hollow documentation. hollow is a zero-dependency recursive DNS resolver, filtering ad-block server, and protocol toolkit written entirely using only the Go standard library.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link
          href="/docs/quickstart/"
          className="p-5 rounded-xl border border-line bg-page hover:border-accent/50 transition-all shadow-sm group"
        >
          <span className="font-mono text-xs font-semibold text-accent">Getting Started →</span>
          <h3 className="font-medium text-base text-ink mt-1">2-Minute Quickstart</h3>
          <p className="mt-1 text-xs text-muted">Resolve your first domain from root hints.</p>
        </Link>

        <Link
          href="/docs/installation/"
          className="p-5 rounded-xl border border-line bg-page hover:border-accent/50 transition-all shadow-sm group"
        >
          <span className="font-mono text-xs font-semibold text-accent">Setup →</span>
          <h3 className="font-medium text-base text-ink mt-1">Installation Guide</h3>
          <p className="mt-1 text-xs text-muted">Install via curl, PowerShell, Go, or Docker.</p>
        </Link>

        <Link
          href="/docs/cli/"
          className="p-5 rounded-xl border border-line bg-page hover:border-accent/50 transition-all shadow-sm group"
        >
          <span className="font-mono text-xs font-semibold text-accent">Reference →</span>
          <h3 className="font-medium text-base text-ink mt-1">CLI Reference</h3>
          <p className="mt-1 text-xs text-muted">All 6 verbs, flags, exit codes, and examples.</p>
        </Link>

        <Link
          href="/docs/zero-dependencies/"
          className="p-5 rounded-xl border border-line bg-page hover:border-accent/50 transition-all shadow-sm group"
        >
          <span className="font-mono text-xs font-semibold text-accent">Engineering →</span>
          <h3 className="font-medium text-base text-ink mt-1">Zero Dependencies</h3>
          <p className="mt-1 text-xs text-muted">41 Go stdlib substitutions and trade-offs.</p>
        </Link>
      </div>

      <div className="space-y-4 pt-6 border-t border-line-soft">
        <h3 className="font-mono text-sm font-semibold text-ink">Basic Recursive Lookup</h3>
        <Terminal
          title={resolveExample.command}
          command={resolveExample.command}
          output={resolveExample.output}
        />
      </div>
    </div>
  );
}
