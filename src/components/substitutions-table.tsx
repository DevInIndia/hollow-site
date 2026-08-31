"use client";

import { useState } from "react";
import { substitutions, Substitution } from "@/content/stdlib";
import { cx } from "./ui";

function formatNumber(n: number): string {
  return n.toLocaleString("en-US");
}

export function SubstitutionsTable() {
  const [filter, setFilter] = useState<string>("all");

  const filtered = filter === "all"
    ? substitutions
    : substitutions.filter((s) => s.category === filter);

  return (
    <div className="rounded-xl border border-line bg-page p-6 sm:p-8 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-line-soft pb-6">
        <div>
          <span className="eyebrow">Zero Dependencies</span>
          <h3 className="mt-1 text-xl font-medium text-ink tracking-tight">
            17 Third-Party Modules Replaced
          </h3>
          <p className="mt-1 text-xs text-muted">
            Every standard library substitution and the engineering trade-offs made.
          </p>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {["all", "codec", "concurrency", "storage", "cli", "crypto"].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={cx(
                "rounded px-2.5 py-1 text-xs font-mono capitalize transition-colors",
                filter === cat
                  ? "bg-ink text-white font-medium"
                  : "bg-sunken text-muted hover:text-ink"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-line text-muted font-mono text-[11px] uppercase">
              <th className="pb-3 pr-4 font-medium">Would Normally Import</th>
              <th className="pb-3 px-4 font-medium">Importers</th>
              <th className="pb-3 px-4 font-medium">hollow Stdlib Replacement</th>
              <th className="pb-3 pl-4 font-medium">What It Cost / Trade-off</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line-soft font-mono">
            {filtered.map((item, idx) => (
              <tr key={idx} className="hover:bg-raised/60 transition-colors">
                <td className="py-3.5 pr-4 font-semibold text-ink whitespace-nowrap">
                  {item.pkg}
                </td>
                <td className="py-3.5 px-4 text-muted whitespace-nowrap">
                  {item.importers ? formatNumber(item.importers) : "N/A"}
                </td>
                <td className="py-3.5 px-4 text-accent font-medium whitespace-nowrap">
                  {item.stdlib}
                </td>
                <td className="py-3.5 pl-4 text-muted font-sans text-xs min-w-[280px]">
                  {item.tradeoff}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}