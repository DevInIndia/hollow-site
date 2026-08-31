import { ArchitectureDiagram } from "@/components/architecture-diagram";
import { Terminal } from "@/components/terminal";
import { site, bounds } from "@/lib/site";

export const metadata = {
  title: "Architecture",
  description: "Strict downward layering and bounded concurrency in hollow.",
};

export default function ArchitecturePage() {
  return (
    <div className="shell py-12 md:py-20 space-y-16">
      <div className="max-w-3xl">
        <span className="eyebrow">Internal Design</span>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
          Zero-Dependency Architecture
        </h1>
        <p className="mt-4 text-base text-muted leading-relaxed">
          hollow is built with a strictly downward dependency graph. Packages never import upwards or circular dependencies.
          Every reply is untrusted input, work is bounded, and concurrency uses bounded worker pools.
        </p>
      </div>

      {/* Layered Diagram */}
      <ArchitectureDiagram />

      {/* Deep Dive Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-line-soft">
        <div className="rounded-xl border border-line bg-page p-6">
          <h3 className="font-mono text-base font-semibold text-ink" id="resolver">
            1. The Iterative Resolver Engine
          </h3>
          <p className="mt-3 text-xs text-muted leading-relaxed">
            Located in <code className="font-mono text-ink">internal/resolver</code>. Recursion begins at compiled-in root hints.
            Glue addresses are bailiwick-checked against the zone that provided them by comparing unescaped labels rather than naive string suffixes.
          </p>
          <ul className="mt-4 space-y-2 text-xs font-mono text-ink">
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Max Delegation Depth: {bounds.maxDepth}
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Max Queries Per Resolution: {bounds.maxQueries}
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Max CNAME Chain Depth: {bounds.maxCNAME}
            </li>
          </ul>
        </div>

        <div className="rounded-xl border border-line bg-page p-6">
          <h3 className="font-mono text-base font-semibold text-ink" id="server">
            2. Concurrent UDP & TCP Server
          </h3>
          <p className="mt-3 text-xs text-muted leading-relaxed">
            Located in <code className="font-mono text-ink">internal/server</code>. UDP packet worker pool (default 64 workers) with <code className="font-mono text-ink">sync.Pool</code> buffer recycling.
            TCP connections run with per-connection deadlines and semaphore-based connection caps.
          </p>
          <ul className="mt-4 space-y-2 text-xs font-mono text-ink">
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Default Address: 127.0.0.1:15353
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Partial Bind: Fatal startup check
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              EDNS0 Payload: 1232 octets
            </li>
          </ul>
        </div>

        <div className="rounded-xl border border-line bg-page p-6">
          <h3 className="font-mono text-base font-semibold text-ink" id="cache">
            3. Sharded Cache & Coalescing
          </h3>
          <p className="mt-3 text-xs text-muted leading-relaxed">
            Located in <code className="font-mono text-ink">internal/cache</code> and <code className="font-mono text-ink">internal/single</code>.
            Sharded using Go 1.24 <code className="font-mono text-ink">hash/maphash</code> with dynamic TTL rewrites.
            Request coalescing merges simultaneous identical queries into a single in-flight resolution.
          </p>
        </div>

        <div className="rounded-xl border border-line bg-page p-6">
          <h3 className="font-mono text-base font-semibold text-ink" id="abuse">
            4. Abuse Resistance & Rate Limiting
          </h3>
          <p className="mt-3 text-xs text-muted leading-relaxed">
            Located in <code className="font-mono text-ink">internal/rrl</code> and <code className="font-mono text-ink">internal/resolver/case0x20.go</code>.
            DNS 0x20 casing provides entropy against off-path spoofing. Subnet rate limiting prevents DNS amplification with BIND-style truncation slip.
          </p>
        </div>
      </div>
    </div>
  );
}
