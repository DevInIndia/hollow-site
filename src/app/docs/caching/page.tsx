export const metadata = {
  title: "Answer Caching",
  description: "Sharded LRU caching, live TTL decrementing, negative caching, and serve-stale.",
};

export default function CachingPage() {
  return (
    <div className="space-y-10">
      <div>
        <span className="eyebrow">Architecture</span>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          Answer Caching Engine
        </h1>
        <p className="mt-3 text-sm text-muted leading-relaxed">
          hollow features a sharded, zero-dependency LRU cache built over Go standard library container/list and hash/maphash.
        </p>
      </div>

      <div className="space-y-8">
        <section className="space-y-3">
          <h2 className="text-lg font-medium text-ink">Dynamic TTL Decrementing</h2>
          <p className="text-xs text-muted leading-relaxed">
            Standard off-the-shelf caches return records with static TTLs. hollow stores absolute expiration timestamps and dynamically rewrites every answer record TTL to remaining lifetime on egress.
          </p>
          <div className="rounded-lg border border-line bg-raised p-4 font-mono text-xs text-ink">
            Cold Query: TTL 300 (168ms) ➔ 10s later: TTL 290 (1ms)
          </div>
        </section>

        <section className="space-y-3 pt-6 border-t border-line-soft">
          <h2 className="text-lg font-medium text-ink">RFC 2308 Negative Caching</h2>
          <p className="text-xs text-muted leading-relaxed">
            NXDOMAIN and NODATA answers are cached for the minimum TTL specified in the authoritative SOA record, preventing upstream flood attacks on non-existent domains.
          </p>
        </section>

        <section className="space-y-3 pt-6 border-t border-line-soft">
          <h2 className="text-lg font-medium text-ink">RFC 8767 Serve-Stale</h2>
          <p className="text-xs text-muted leading-relaxed">
            When configured with <code className="font-mono text-ink">--serve-stale &lt;duration&gt;</code>, hollow serves expired cache entries with a 30-second TTL if all upstream authoritative servers fail to respond.
          </p>
        </section>

        <section className="space-y-3 pt-6 border-t border-line-soft">
          <h2 className="text-lg font-medium text-ink">Request Coalescing (Singleflight)</h2>
          <p className="text-xs text-muted leading-relaxed">
            Concurrent queries for the same domain and record type share a single in-flight resolution. A thundering herd of 100 simultaneous queries results in exactly one recursive walk.
          </p>
        </section>
      </div>
    </div>
  );
}