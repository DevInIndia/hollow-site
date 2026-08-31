"use client";

import { useState, useEffect } from "react";

export function TUIDashboard() {
  const [qps, setQps] = useState(539);
  const [cacheRate, setCacheRate] = useState(87.4);
  const [blockedRate, setBlockedRate] = useState(21.8);
  const [sparkline] = useState(" ▂▁▁▁▁▁▂▂▂▂▂▂▃▃▃▃▃▄▄▄▄▄▄▅▅▅▅▅▆▆▆▆▆▆▇▇▇▇▇█");

  useEffect(() => {
    const timer = setInterval(() => {
      setQps((prev) => Math.max(300, Math.min(850, prev + Math.floor(Math.random() * 41) - 20)));
      setCacheRate((prev) => +(Math.max(82, Math.min(94, prev + (Math.random() * 0.4 - 0.2))).toFixed(1)));
      setBlockedRate((prev) => +(Math.max(18, Math.min(26, prev + (Math.random() * 0.4 - 0.2))).toFixed(1)));
    }, 1200);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="overflow-hidden rounded-xl border border-term-line bg-term text-term-text font-mono text-xs shadow-2xl">
      {/* Frame Top Header */}
      <div className="flex items-center justify-between border-b border-term-line bg-term-raised px-4 py-2 text-[11px] text-term-dim">
        <div className="flex items-center gap-2 text-white font-semibold">
          <span className="h-2 w-2 rounded-full bg-term-green animate-pulse" />
          <span>┌─ hollow ─────────────────────────────────────</span>
        </div>
        <div>127.0.0.1:15354 &nbsp; up 4m12s ─┐</div>
      </div>

      {/* Metrics Row */}
      <div className="p-4 border-b border-term-line/60 bg-term/90">
        <div className="flex flex-wrap items-center justify-between gap-4 text-xs">
          <div>
            <span className="text-term-dim">qps: </span>
            <strong className="text-white text-sm">{qps}</strong>
          </div>
          <div>
            <span className="text-term-dim">cache: </span>
            <strong className="text-term-green text-sm">{cacheRate}%</strong>
          </div>
          <div>
            <span className="text-term-dim">blocked: </span>
            <strong className="text-term-rose text-sm">{blockedRate}%</strong>
          </div>
          <div>
            <span className="text-term-dim">p50: </span>
            <strong className="text-term-cyan">0.38ms</strong>
          </div>
          <div>
            <span className="text-term-dim">p99: </span>
            <strong className="text-term-amber">54ms</strong>
          </div>
        </div>

        {/* Sparkline */}
        <div className="mt-3 text-term-cyan text-sm tracking-widest overflow-hidden truncate">
          {sparkline}
        </div>
      </div>

      {/* Tables Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-term-line">
        {/* Left: Live stream */}
        <div className="md:col-span-7 p-4 space-y-1.5 text-[11px]">
          <div className="text-[10px] uppercase font-bold text-term-dim border-b border-term-line/40 pb-1 mb-2">
            LIVE QUERIES
          </div>
          <div className="flex items-center justify-between text-term-text/90">
            <span className="text-term-dim">18:41:07 10.0.0.7</span>
            <span className="text-term-cyan font-semibold">A</span>
            <span className="text-term-green">NOERROR</span>
            <span className="truncate w-32 text-right">cdn.example.com. ~</span>
          </div>
          <div className="flex items-center justify-between text-term-text/90">
            <span className="text-term-dim">18:41:06 2001:db8::1</span>
            <span className="text-term-cyan font-semibold">MX</span>
            <span className="text-term-amber">SERVFAIL</span>
            <span className="truncate w-32 text-right">mail.example.org.</span>
          </div>
          <div className="flex items-center justify-between text-term-text/90">
            <span className="text-term-dim">18:41:04 10.0.0.9</span>
            <span className="text-term-cyan font-semibold">AAAA</span>
            <span className="text-term-rose font-bold">blocked</span>
            <span className="truncate w-32 text-right">ads.tracker.net.</span>
          </div>
          <div className="flex items-center justify-between text-term-text/90">
            <span className="text-term-dim">18:41:03 10.0.0.4</span>
            <span className="text-term-cyan font-semibold">A</span>
            <span className="text-term-green">NOERROR</span>
            <span className="truncate w-32 text-right">api.service.io. +</span>
          </div>
        </div>

        {/* Right: Top Lists */}
        <div className="md:col-span-5 p-4 space-y-3 text-[11px]">
          <div>
            <div className="text-[10px] uppercase font-bold text-term-dim border-b border-term-line/40 pb-1 mb-1.5">
              TOP NAMES
            </div>
            <div className="space-y-1">
              <div className="flex justify-between">
                <span className="text-term-text truncate">1 cdn.example.com.</span>
                <span className="text-term-dim">4821</span>
              </div>
              <div className="flex justify-between">
                <span className="text-term-text truncate">2 api.service.io.</span>
                <span className="text-term-dim">3204</span>
              </div>
            </div>
          </div>

          <div>
            <div className="text-[10px] uppercase font-bold text-term-rose border-b border-term-line/40 pb-1 mb-1.5">
              TOP BLOCKED
            </div>
            <div className="space-y-1">
              <div className="flex justify-between">
                <span className="text-term-rose/90 truncate">1 ads.doubleclick.net</span>
                <span className="text-term-dim">1420</span>
              </div>
              <div className="flex justify-between">
                <span className="text-term-rose/90 truncate">2 telemetry.tracker.io</span>
                <span className="text-term-dim">894</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer bar */}
      <div className="border-t border-term-line bg-term-raised px-4 py-2 flex flex-wrap items-center justify-between text-[11px] text-term-dim">
        <span>cache 84,213 entries · stale 41 · dropped 0</span>
        <span className="text-term-amber">^C quit</span>
      </div>
    </div>
  );
}
