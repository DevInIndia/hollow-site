"use client";

import { useState } from "react";
import { cx } from "./ui";
import { CopyButton } from "./copy-button";

interface TraceExample {
  target: string;
  type: string;
  output: string;
  queries: number;
  zones: number;
  totalTime: string;
}

const traces: Record<string, TraceExample> = {
  github: {
    target: "www.github.com",
    type: "A",
    totalTime: "395ms",
    queries: 3,
    zones: 3,
    output: `. (root)
+- 198.97.190.53:53                                              169ms  udp, referral, 839 B, 13 NS + 26 glue, 1 of 26 servers
   asked as WWw.gitHub.COM.
   com.
   +- f.gtld-servers.net. ([2001:503:d414::30]:53)               194ms  udp, referral, 310 B, 8 NS + 2 glue, 1 of 26 servers
      asked as wWW.Github.COM.
      github.com.
      +- ns-421.awsdns-52.com. ([2600:9000:5301:a500::1]:53)      32ms  udp, answer, 296 B, 1 of 2 servers

www.github.com. 3600 IN CNAME github.com.
github.com. 60 IN A 20.207.73.82

3 queries, 3 zones, 0 answers from cache, 395ms`,
  },
  wikipedia: {
    target: "wikipedia.org",
    type: "A",
    totalTime: "510ms",
    queries: 3,
    zones: 3,
    output: `. (root)
+- [2001:dc3::35]:53                                101ms  udp, referral, 447 B, 6 NS + 12 glue, 1 of 26 servers
   asked as wIKiPEdIa.org.
   org.
   +- d0.org.afilias-nst.org. (199.19.57.1:53)      102ms  udp, referral, 251 B, 3 NS + 6 glue, 1 of 12 servers
      asked as WikipEdIA.oRg.
      wikipedia.org.
      +- ns1.wikimedia.org. (208.80.153.231:53)     307ms  udp, answer, 58 B, 1 of 6 servers
         asked as wiKipEdia.oRg.

wikipedia.org. 180 IN A 103.102.166.224

3 queries, 3 zones, 0 answers from cache, 510ms`,
  },
};

export function TraceTree() {
  const [selected, setSelected] = useState<"github" | "wikipedia">("github");
  const data = traces[selected];

  return (
    <div className="overflow-hidden rounded-xl border border-term-line bg-term text-term-text shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-term-line/70 bg-term-raised px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-rose-500/80" />
          <span className="h-3 w-3 rounded-full bg-amber-500/80" />
          <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
          <span className="ml-2 font-mono text-xs text-term-dim">hollow trace</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setSelected("github")}
            className={cx(
              "rounded px-2.5 py-1 text-xs font-mono transition-colors",
              selected === "github"
                ? "bg-accent text-white font-medium"
                : "text-term-dim hover:text-term-text"
            )}
          >
            github.com
          </button>
          <button
            onClick={() => setSelected("wikipedia")}
            className={cx(
              "rounded px-2.5 py-1 text-xs font-mono transition-colors",
              selected === "wikipedia"
                ? "bg-accent text-white font-medium"
                : "text-term-dim hover:text-term-text"
            )}
          >
            wikipedia.org
          </button>
          <CopyButton value={`hollow trace ${data.target}`} className="text-term-dim hover:text-white" />
        </div>
      </div>

      <div className="p-5 font-mono text-xs leading-relaxed overflow-x-auto term-scroll">
        <div className="mb-4 flex items-center gap-4 text-[11px] text-term-dim border-b border-term-line/50 pb-2">
          <span>Target: <strong className="text-white">{data.target}</strong></span>
          <span>Queries: <strong className="text-white">{data.queries}</strong></span>
          <span>Zones: <strong className="text-white">{data.zones}</strong></span>
          <span>Elapsed: <strong className="text-term-green">{data.totalTime}</strong></span>
        </div>
        <pre className="text-term-text whitespace-pre">{data.output}</pre>
      </div>
    </div>
  );
}