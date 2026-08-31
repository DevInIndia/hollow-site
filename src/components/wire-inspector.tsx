"use client";

import { useState } from "react";
import { exampleWireSpans, WireSpan } from "@/content/wire-data";
import { cx } from "./ui";

export function WireInspector() {
  const [activeSpan, setActiveSpan] = useState<WireSpan>(exampleWireSpans[0]);

  return (
    <div className="overflow-hidden rounded-xl border border-term-line bg-term text-term-text shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-term-line/70 bg-term-raised px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-rose-500/80" />
          <span className="h-3 w-3 rounded-full bg-amber-500/80" />
          <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
          <span className="ml-2 font-mono text-xs text-term-dim">hollow inspect example.com</span>
        </div>
        <span className="rounded bg-term-line/50 px-2 py-0.5 font-mono text-[11px] text-term-dim">
          72 octets · DNS Response
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-term-line">
        {/* Octet list */}
        <div className="lg:col-span-7 p-4 sm:p-5 font-mono text-xs leading-relaxed max-h-[420px] overflow-y-auto term-scroll">
          <div className="space-y-1">
            {exampleWireSpans.map((span) => {
              const isSelected = activeSpan.offset === span.offset;
              return (
                <div
                  key={span.offset}
                  onClick={() => setActiveSpan(span)}
                  className={cx(
                    "flex items-start gap-4 px-2.5 py-1.5 rounded cursor-pointer transition-colors",
                    isSelected
                      ? "bg-accent/20 border border-accent/40 text-white"
                      : "hover:bg-term-raised/80 text-term-dim"
                  )}
                >
                  <span className="text-term-dim select-none w-10 font-bold">{span.offset}</span>
                  <span className={cx("w-36 font-semibold truncate", isSelected ? "text-term-cyan" : "text-term-text")}>
                    {span.hex}
                  </span>
                  <span className={cx("truncate flex-1", isSelected ? "text-white font-medium" : "text-term-dim")}>
                    {span.field}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Decoder Annotation Box */}
        <div className="lg:col-span-5 p-5 bg-term-raised/40 flex flex-col justify-between font-mono text-xs">
          <div>
            <div className="flex items-center justify-between border-b border-term-line/60 pb-3">
              <span className="text-[11px] uppercase tracking-wider text-term-dim font-bold">
                Offset 0x{activeSpan.offset}
              </span>
              <span className={cx(
                "text-[10px] px-2 py-0.5 rounded uppercase font-semibold",
                activeSpan.section === "header" && "bg-blue-500/20 text-blue-400",
                activeSpan.section === "question" && "bg-amber-500/20 text-amber-400",
                activeSpan.section === "answer" && "bg-emerald-500/20 text-emerald-400",
                activeSpan.section === "additional" && "bg-purple-500/20 text-purple-400"
              )}>
                {activeSpan.section}
              </span>
            </div>

            <div className="mt-4">
              <span className="text-term-dim text-[11px] block">Field:</span>
              <h4 className="text-base font-semibold text-white mt-0.5">{activeSpan.field}</h4>
            </div>

            <div className="mt-4">
              <span className="text-term-dim text-[11px] block">Raw Hex Octets:</span>
              <span className="inline-block mt-1 font-mono text-sm bg-term px-2.5 py-1 rounded text-term-amber border border-term-line">
                {activeSpan.hex}
              </span>
            </div>

            <div className="mt-4">
              <span className="text-term-dim text-[11px] block">Decoded Interpretation:</span>
              <p className="mt-1 text-term-text text-xs leading-relaxed">
                {activeSpan.description}
              </p>
            </div>
          </div>

          <div className="mt-6 border-t border-term-line/40 pt-3 text-[11px] text-term-dim">
            Click any octet line on the left to inspect its parsed wire structure.
          </div>
        </div>
      </div>
    </div>
  );
}
