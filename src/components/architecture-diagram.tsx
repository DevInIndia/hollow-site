"use client";

import { useState } from "react";
import { cx } from "./ui";

interface PackageInfo {
  name: string;
  role: string;
  layer: string;
  description: string;
  source: string;
}

const packages: Record<string, PackageInfo> = {
  wire: {
    name: "internal/wire",
    layer: "Layer 0 · Codec",
    role: "DNS wire format codec: Header, Question, RR, EDNS0, compression.",
    description: "1,341 lines of hand-written codec over encoding/binary and net/netip. Zero memory allocations on fast path with custom pointer decompression and native fuzz target.",
    source: "1,341 lines · 9 record types",
  },
  resolver: {
    name: "internal/resolver",
    layer: "Layer 1 · Resolution",
    role: "Iterative root walker, referral tracker, 0x20 casing, forwarder.",
    description: "Begins at IANA root hints, checks bailiwick on every glue address, strictly validates referrals, and bounds work to 16 delegations, 64 queries, and 8 CNAMEs.",
    source: "685 lines · UDP/TCP transport",
  },
  server: {
    name: "internal/server",
    layer: "Layer 1 · Server",
    role: "Concurrent UDP worker pool and TCP listener.",
    description: "Non-blocking UDP worker pool with sync.Pool buffer reuse. Listens on 127.0.0.1:15353. Partial bind is fatal to prevent ghost half-open servers.",
    source: "747 lines · UDP pool & TCP listeners",
  },
  cache: {
    name: "internal/cache",
    layer: "Layer 2 · Storage",
    role: "Sharded LRU answer cache, RFC 2308 negative cache, serve-stale.",
    description: "Sharded across maphash keys with sync.Mutex. Rewrites every record TTL to remaining lifetime on egress. Implements RFC 8767 serve-stale when upstream fails.",
    source: "542 lines · LRU & dynamic TTL",
  },
  blocklist: {
    name: "internal/blocklist",
    layer: "Layer 2 · Filtering",
    role: "Hosts, domain, and Adblock Plus filter parser.",
    description: "Zero-dependency parser for /etc/hosts, raw domain lists, and ABP ||domain^ wildcards. Handles 80k rules in 5.5MB with instant 0ms map lookups and allowlists.",
    source: "420 lines · 3 format parser",
  },
  rrl: {
    name: "internal/rrl",
    layer: "Layer 2 · Security",
    role: "Response Rate Limiting per /24 and /56 with TC slip.",
    description: "Token buckets per client network. Drops over-limit responses to prevent amplification attacks, and truncates every Nth response so real clients recover over TCP.",
    source: "210 lines · Subnet token bucket",
  },
  single: {
    name: "internal/single",
    layer: "Layer 2 · Concurrency",
    role: "Request coalescing generic over wire.Question.",
    description: "Generic singleflight implementation. Deduplicates concurrent in-flight queries so a thundering herd costs exactly one root walk.",
    source: "130 lines · Generic coalescer",
  },
};

export function ArchitectureDiagram() {
  const [selected, setSelected] = useState<string>("wire");
  const pkg = packages[selected] || packages.wire;

  return (
    <div className="rounded-xl border border-line bg-page p-6 sm:p-8 shadow-sm">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-b border-line-soft pb-6">
        <div>
          <span className="eyebrow">Layered Architecture</span>
          <h3 className="mt-1 text-xl font-medium text-ink tracking-tight">
            Strict Downward Dependency Hierarchy
          </h3>
          <p className="mt-1 text-xs text-muted">
            Click any package layer to inspect its responsibilities and Go stdlib design.
          </p>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Layer boxes */}
        <div className="lg:col-span-6 space-y-3">
          <div className="text-[11px] font-mono text-muted uppercase tracking-wider mb-2">
            Top Level (CLI & Entrypoint)
          </div>

          <div className="p-3 rounded-lg border border-line bg-sunken font-mono text-xs text-ink flex justify-between items-center">
            <span>cmd/hollow + internal/cli</span>
            <span className="text-[10px] text-muted">Flags & Verbs</span>
          </div>

          <div className="text-[11px] font-mono text-muted uppercase tracking-wider mt-4 mb-2">
            Layer 1 (Server & Recursor Engine)
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setSelected("server")}
              className={cx(
                "p-3 rounded-lg border font-mono text-xs text-left transition-all",
                selected === "server"
                  ? "border-accent bg-accent-tint/30 font-semibold text-ink shadow-sm"
                  : "border-line bg-raised hover:bg-page text-muted"
              )}
            >
              internal/server
            </button>
            <button
              onClick={() => setSelected("resolver")}
              className={cx(
                "p-3 rounded-lg border font-mono text-xs text-left transition-all",
                selected === "resolver"
                  ? "border-accent bg-accent-tint/30 font-semibold text-ink shadow-sm"
                  : "border-line bg-raised hover:bg-page text-muted"
              )}
            >
              internal/resolver
            </button>
          </div>

          <div className="text-[11px] font-mono text-muted uppercase tracking-wider mt-4 mb-2">
            Layer 2 (State, Filters & Caching)
          </div>

          <div className="grid grid-cols-2 gap-2">
            {["cache", "blocklist", "rrl", "single"].map((key) => (
              <button
                key={key}
                onClick={() => setSelected(key)}
                className={cx(
                  "p-2.5 rounded-lg border font-mono text-xs text-left transition-all",
                  selected === key
                    ? "border-accent bg-accent-tint/30 font-semibold text-ink shadow-sm"
                    : "border-line bg-raised hover:bg-page text-muted"
                )}
              >
                internal/{key}
              </button>
            ))}
          </div>

          <div className="text-[11px] font-mono text-muted uppercase tracking-wider mt-4 mb-2">
            Layer 0 (Foundation Codec)
          </div>

          <button
            onClick={() => setSelected("wire")}
            className={cx(
              "w-full p-3 rounded-lg border font-mono text-xs text-left transition-all flex justify-between items-center",
              selected === "wire"
                ? "border-accent bg-accent-tint/40 font-semibold text-ink shadow-sm"
                : "border-line bg-raised hover:bg-page text-muted"
            )}
          >
            <span>internal/wire</span>
            <span className="text-[10px] text-accent">Zero Dep Codec</span>
          </button>
        </div>

        {/* Selected Package Details */}
        <div className="lg:col-span-6 rounded-xl border border-line bg-raised p-6">
          <div className="flex items-center justify-between border-b border-line-soft pb-4">
            <div>
              <span className="eyebrow">{pkg.layer}</span>
              <h4 className="font-mono text-base font-semibold text-ink mt-0.5">{pkg.name}</h4>
            </div>
            <span className="rounded bg-page border border-line px-2.5 py-1 font-mono text-[11px] text-muted">
              {pkg.source}
            </span>
          </div>

          <div className="mt-4 space-y-3 text-xs">
            <div>
              <span className="font-semibold text-ink block mb-0.5">Primary Role:</span>
              <p className="text-body leading-relaxed">{pkg.role}</p>
            </div>

            <div className="pt-2 border-t border-line-soft">
              <span className="font-semibold text-ink block mb-0.5">Implementation Details:</span>
              <p className="text-muted leading-relaxed">{pkg.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
