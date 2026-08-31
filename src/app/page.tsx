import { Terminal } from "@/components/terminal";
import { CopyButton } from "@/components/copy-button";
import { Button } from "@/components/ui";
import { DNSWalk } from "@/components/dns-walk";
import { TraceTree } from "@/components/trace-tree";
import { WireInspector } from "@/components/wire-inspector";
import { TUIDashboard } from "@/components/tui-dashboard";
import { ArchitectureDiagram } from "@/components/architecture-diagram";
import { SubstitutionsTable } from "@/components/substitutions-table";
import { resolveExample, resolveMX } from "@/content/captures";
import { site, install, artifacts } from "@/lib/site";

export default function HomePage() {
  return (
    <div className="space-y-24 py-12 md:py-20 lg:py-24">
      {/* 1. HERO SECTION */}
      <section className="shell">
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-line bg-raised px-3.5 py-1 text-xs font-mono text-muted mb-6 shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            <span className="font-semibold text-ink">{site.version}</span>
            <span className="text-faint">·</span>
            <span>0 dependencies</span>
            <span className="text-faint">·</span>
            <span>Pure Go stdlib</span>
          </div>

          <h1 className="text-4xl font-semibold tracking-tight text-ink sm:text-5xl lg:text-6xl text-balance">
            A DNS resolver, server and toolkit that answers to nobody.
          </h1>

          <p className="mt-6 text-base sm:text-lg text-muted max-w-2xl mx-auto leading-relaxed text-balance">
            Walks the root servers itself. Filters ads and trackers. Shows its work.
            One static binary, four platforms, and an empty <code className="text-ink font-mono text-sm bg-sunken px-1.5 py-0.5 rounded">go.mod</code>.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button href="/docs/quickstart/" size="md" variant="primary">
              Get Started
            </Button>
            <Button href="/architecture/" size="md" variant="secondary">
              Explore the Architecture
            </Button>
          </div>

          {/* Install Command One-Liner */}
          <div className="mt-8 mx-auto max-w-xl">
            <div className="flex items-center justify-between rounded-lg border border-line bg-raised px-4 py-2.5 font-mono text-xs text-ink shadow-sm">
              <div className="flex items-center gap-2 overflow-x-auto">
                <span className="text-muted select-none">$</span>
                <span className="truncate">{install.unix}</span>
              </div>
              <CopyButton value={install.unix} tone="light" />
            </div>
          </div>
        </div>

        {/* Hero Terminal Preview */}
        <div className="mt-14 mx-auto max-w-4xl">
          <Terminal
            title="hollow resolve google.com MX"
            command={resolveMX.command}
            output={resolveMX.output}
          />
        </div>
      </section>

      {/* 2. PROOFS & METRICS BAR */}
      <section className="border-y border-line-soft bg-raised/50 py-10">
        <div className="shell">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6 text-center font-mono">
            <div>
              <div className="text-2xl font-bold text-ink">0</div>
              <div className="mt-1 text-xs text-muted">Dependencies</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-ink">0</div>
              <div className="mt-1 text-xs text-muted">go.sum & vendor/</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-ink">342</div>
              <div className="mt-1 text-xs text-muted">Tests (-race)</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-ink">86%</div>
              <div className="mt-1 text-xs text-muted">Coverage</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-ink">4</div>
              <div className="mt-1 text-xs text-muted">Platform Binaries</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-ink">5.1 MB</div>
              <div className="mt-1 text-xs text-muted">Scratch Image</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. INTERACTIVE RESOLUTION WALK */}
      <section className="shell">
        <div className="mx-auto max-w-2xl text-center mb-10">
          <span className="eyebrow">The Iterative Engine</span>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-ink">
            Follow the delegation from the root
          </h2>
          <p className="mt-2 text-sm text-muted">
            Most resolvers forward queries to an upstream stub. hollow queries the IANA root servers directly, validating every referral down to the authoritative answer.
          </p>
        </div>
        <div className="mx-auto max-w-4xl">
          <DNSWalk />
        </div>
      </section>

      {/* 4. CORE CAPABILITIES (BENTO GRID) */}
      <section className="shell">
        <div className="mx-auto max-w-2xl text-center mb-12">
          <span className="eyebrow">Features</span>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-ink">
            Engineered for precision and resilience
          </h2>
          <p className="mt-2 text-sm text-muted">
            Every feature is purpose-built without external wrappers or transitive dependencies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Cache */}
          <div className="rounded-xl border border-line bg-page p-6 shadow-sm hover:border-line transition-all">
            <div className="h-8 w-8 rounded-lg bg-accent-tint flex items-center justify-center text-accent font-mono text-sm font-bold mb-4">
              LRU
            </div>
            <h3 className="text-base font-semibold text-ink">Sharded Answer Cache</h3>
            <p className="mt-2 text-xs text-muted leading-relaxed">
              Sharded across maphash buckets with dynamic TTL decrementing on egress. Implements RFC 2308 negative caching and RFC 8767 serve-stale when upstreams go down.
            </p>
            <div className="mt-4 rounded bg-sunken p-2.5 font-mono text-[11px] text-ink">
              168ms cold miss ➔ &lt;1ms warm hit
            </div>
          </div>

          {/* Card 2: Adblocking */}
          <div className="rounded-xl border border-line bg-page p-6 shadow-sm hover:border-line transition-all">
            <div className="h-8 w-8 rounded-lg bg-rose-100 flex items-center justify-center text-rose-700 font-mono text-sm font-bold mb-4">
              BLK
            </div>
            <h3 className="text-base font-semibold text-ink">Multi-Format Adblocking</h3>
            <p className="mt-2 text-xs text-muted leading-relaxed">
              Parses /etc/hosts, domain lists, and Adblock Plus <code className="font-mono text-[11px]">||domain^</code> wildcards. Drops tracker queries in 0ms with synthetic SOA records.
            </p>
            <div className="mt-4 rounded bg-sunken p-2.5 font-mono text-[11px] text-ink truncate">
              --block hosts.txt --block-mode nxdomain
            </div>
          </div>

          {/* Card 3: Forgery Resistance */}
          <div className="rounded-xl border border-line bg-page p-6 shadow-sm hover:border-line transition-all">
            <div className="h-8 w-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-800 font-mono text-sm font-bold mb-4">
              0x20
            </div>
            <h3 className="text-base font-semibold text-ink">DNS 0x20 Forgery Resistance</h3>
            <p className="mt-2 text-xs text-muted leading-relaxed">
              Randomises query name casing and rejects mismatched replies. Paired with <code className="font-mono text-[11px]">crypto/rand</code> transaction IDs and connected UDP source ports.
            </p>
            <div className="mt-4 rounded bg-sunken p-2.5 font-mono text-[11px] text-ink">
              34 to 51 bits attacker must guess
            </div>
          </div>

          {/* Card 4: Rate Limiting */}
          <div className="rounded-xl border border-line bg-page p-6 shadow-sm hover:border-line transition-all">
            <div className="h-8 w-8 rounded-lg bg-amber-100 flex items-center justify-center text-amber-800 font-mono text-sm font-bold mb-4">
              RRL
            </div>
            <h3 className="text-base font-semibold text-ink">Response Rate Limiting</h3>
            <p className="mt-2 text-xs text-muted leading-relaxed">
              Token buckets per /24 (IPv4) and /56 (IPv6) client networks. Drops packet floods and applies BIND-style TC slip so authentic clients recover over TCP.
            </p>
          </div>

          {/* Card 5: Singleflight */}
          <div className="rounded-xl border border-line bg-page p-6 shadow-sm hover:border-line transition-all">
            <div className="h-8 w-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-800 font-mono text-sm font-bold mb-4">
              1-FL
            </div>
            <h3 className="text-base font-semibold text-ink">Request Coalescing</h3>
            <p className="mt-2 text-xs text-muted leading-relaxed">
              Custom generic singleflight implementation keys directly on <code className="font-mono text-[11px]">wire.Question</code>. 100 simultaneous queries for one domain trigger exactly one root walk.
            </p>
          </div>

          {/* Card 6: Portability */}
          <div className="rounded-xl border border-line bg-page p-6 shadow-sm hover:border-line transition-all">
            <div className="h-8 w-8 rounded-lg bg-purple-100 flex items-center justify-center text-purple-800 font-mono text-sm font-bold mb-4">
              UNIX
            </div>
            <h3 className="text-base font-semibold text-ink">Non-Root Port 15353</h3>
            <p className="mt-2 text-xs text-muted leading-relaxed">
              Listens by default on 127.0.0.1:15353. Needs no sudo or root capabilities. Avoids port 53 and mDNS 5353 collisions out of the box.
            </p>
          </div>
        </div>
      </section>

      {/* 5. PROTOCOL X-RAY: TRACE & INSPECT */}
      <section className="shell">
        <div className="mx-auto max-w-2xl text-center mb-10">
          <span className="eyebrow">Protocol X-Ray</span>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-ink">
            Inspect the delegation and raw wire octets
          </h2>
          <p className="mt-2 text-sm text-muted">
            hollow trace shows the real delegation path. hollow inspect annotates every single byte of a DNS response.
          </p>
        </div>

        <div className="space-y-8 mx-auto max-w-4xl">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-xs font-semibold text-ink">Delegation Path Tree</span>
              <Button href="/docs/cli/trace/" variant="ghost" size="sm">
                Read trace docs →
              </Button>
            </div>
            <TraceTree />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-xs font-semibold text-ink">Wire Format Octet Inspector</span>
              <Button href="/wire/" variant="ghost" size="sm">
                Explore wire codec →
              </Button>
            </div>
            <WireInspector />
          </div>
        </div>
      </section>

      {/* 6. LIVE TUI DASHBOARD SHOWCASE */}
      <section className="shell">
        <div className="mx-auto max-w-2xl text-center mb-10">
          <span className="eyebrow">Observability</span>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-ink">
            Live Terminal Dashboard over Control Socket
          </h2>
          <p className="mt-2 text-sm text-muted">
            hollow dash attaches to a running server over loopback. Built with hand-rolled ANSI without raw mode for 100% cross-platform portability.
          </p>
        </div>
        <div className="mx-auto max-w-4xl">
          <TUIDashboard />
        </div>
      </section>

      {/* 7. ARCHITECTURE & ZERO-DEP PROOFS */}
      <section className="shell">
        <div className="space-y-12 mx-auto max-w-4xl">
          <ArchitectureDiagram />
          <SubstitutionsTable />
        </div>
      </section>

      {/* 8. INSTALLATION & CTA */}
      <section className="shell">
        <div className="rounded-2xl border border-line bg-raised p-8 sm:p-12 text-center max-w-4xl mx-auto shadow-sm">
          <h2 className="text-3xl font-semibold tracking-tight text-ink">
            Ready to resolve with zero dependencies?
          </h2>
          <p className="mt-3 text-sm text-muted max-w-lg mx-auto leading-relaxed">
            Install the pre-built binary, run from source, or spin up the 5MB scratch container in seconds.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button href="/docs/installation/" size="md" variant="primary">
              Installation Guide
            </Button>
            <Button href={site.repo} external size="md" variant="secondary">
              View on GitHub
            </Button>
          </div>

          {/* Release Hashes Table */}
          <div className="mt-12 text-left border-t border-line-soft pt-8">
            <h4 className="font-mono text-xs font-medium uppercase tracking-wider text-muted mb-4">
              Published SHA-256 Release Hashes ({site.version})
            </h4>
            <div className="divide-y divide-line-soft font-mono text-xs">
              {artifacts.map((a) => (
                <div key={a.target} className="py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <span className="font-medium text-ink">{a.target}</span>
                  <span className="text-muted font-mono text-[11px] truncate select-all">{a.sha256}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}