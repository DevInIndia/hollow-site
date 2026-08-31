export const metadata = {
  title: "Adblocking & Filtering",
  description: "Filter ads, trackers, and malware with hosts files, domain lists, and ABP rules.",
};

export default function BlockingPage() {
  return (
    <div className="space-y-10">
      <div>
        <span className="eyebrow">Filtering</span>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          Adblocking & Filter Engine
        </h1>
        <p className="mt-3 text-sm text-muted leading-relaxed">
          hollow includes a high-performance filtering engine capable of holding over 80,000 rules in 5.5MB of RAM with instant 0ms lookups.
        </p>
      </div>

      <div className="space-y-8">
        <section className="space-y-3">
          <h2 className="text-lg font-medium text-ink">Supported Blocklist Formats</h2>
          <p className="text-xs text-muted leading-relaxed">
            The same parser automatically handles three standard formats without configuration:
          </p>
          <div className="space-y-2 font-mono text-xs">
            <div className="rounded-lg border border-line bg-raised p-3">
              <span className="text-muted"># 1. /etc/hosts format</span>
              <div className="text-ink">0.0.0.0 ads.doubleclick.net</div>
              <div className="text-ink">127.0.0.1 tracker.example.com</div>
            </div>
            <div className="rounded-lg border border-line bg-raised p-3">
              <span className="text-muted"># 2. Domain-per-line format</span>
              <div className="text-ink">telemetry.analytics.io</div>
            </div>
            <div className="rounded-lg border border-line bg-raised p-3">
              <span className="text-muted"># 3. Adblock Plus wildcard format</span>
              <div className="text-ink">||malicious-tracking.com^</div>
            </div>
          </div>
        </section>

        <section className="space-y-3 pt-6 border-t border-line-soft">
          <h2 className="text-lg font-medium text-ink">Block Modes (--block-mode)</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
            <div className="rounded border border-line bg-page p-3">
              <span className="font-semibold text-accent">nxdomain (Default)</span>
              <p className="mt-1 text-muted text-[11px] font-sans">Returns RCODE 3 (NXDOMAIN) with synthetic SOA record.</p>
            </div>
            <div className="rounded border border-line bg-page p-3">
              <span className="font-semibold text-accent">null</span>
              <p className="mt-1 text-muted text-[11px] font-sans">Returns 0.0.0.0 for A and :: for AAAA queries.</p>
            </div>
            <div className="rounded border border-line bg-page p-3">
              <span className="font-semibold text-accent">nodata</span>
              <p className="mt-1 text-muted text-[11px] font-sans">Returns NOERROR with 0 answer records.</p>
            </div>
          </div>
        </section>

        <section className="space-y-3 pt-6 border-t border-line-soft">
          <h2 className="text-lg font-medium text-ink">Allowlists (--allow)</h2>
          <p className="text-xs text-muted leading-relaxed">
            Allowlists override any block rule unconditionally. Repeat the flag to specify multiple allowlist files:
          </p>
          <div className="rounded-lg border border-line bg-raised p-3 font-mono text-xs text-ink">
            hollow serve --block hosts.txt --allow keep.txt
          </div>
        </section>
      </div>
    </div>
  );
}