"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cx, Badge } from "./ui";

interface StepData {
  id: string;
  stage: string;
  zone: string;
  server: string;
  protocol: string;
  rtt: string;
  type: string;
  details: string;
  qname: string;
  response: string[];
  glue?: string;
}

const steps: StepData[] = [
  {
    id: "root",
    stage: "1. Root Server Referral",
    zone: ". (Root)",
    server: "198.97.190.53:53 (h.root-servers.net)",
    protocol: "UDP",
    rtt: "21 ms",
    type: "REFERRAL",
    qname: "WWw.gitHub.COM.",
    details: "13 NS records + 26 glue addresses returned. Validated strict downward delegation.",
    glue: "13 NS · 26 A/AAAA glue",
    response: [
      "com.  172800  IN  NS  a.gtld-servers.net.",
      "com.  172800  IN  NS  b.gtld-servers.net.",
      "... + 11 more TLD nameservers",
    ],
  },
  {
    id: "tld",
    stage: "2. TLD Nameserver Referral",
    zone: "com.",
    server: "2001:503:231d::2:30:53 (b.gtld-servers.net)",
    protocol: "UDP",
    rtt: "229 ms",
    type: "REFERRAL",
    qname: "wWW.Github.COM.",
    details: "Referral to github.com authoritative servers. Glue addresses bailiwick-checked.",
    glue: "8 NS · 2 glue records",
    response: [
      "github.com.  172800  IN  NS  ns-421.awsdns-52.com.",
      "github.com.  172800  IN  NS  ns-1283.awsdns-32.org.",
      "github.com.  172800  IN  NS  ns-1707.awsdns-21.co.uk.",
      "github.com.  172800  IN  NS  ns-523.awsdns-01.net.",
    ],
  },
  {
    id: "auth",
    stage: "3. Authoritative Answer",
    zone: "github.com.",
    server: "205.251.193.165:53 (ns-421.awsdns-52.com)",
    protocol: "UDP",
    rtt: "32 ms",
    type: "ANSWER",
    qname: "www.github.com.",
    details: "Authoritative nameserver answers with CNAME and final A record. RD was cleared on every query.",
    response: [
      "www.github.com.  3600  IN  CNAME  github.com.",
      "github.com.      60    IN  A      20.207.73.82",
    ],
  },
];

export function DNSWalk() {
  const [activeStep, setActiveStep] = useState<number>(0);
  const current = steps[activeStep];

  return (
    <div className="rounded-xl border border-line bg-page p-6 sm:p-8 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-line-soft pb-6">
        <div>
          <span className="eyebrow">Interactive Recursion</span>
          <h3 className="mt-1 text-xl font-medium text-ink tracking-tight">
            Root-to-Authoritative Delegation
          </h3>
          <p className="mt-1 text-xs text-muted">
            Click each delegation hop to see what hollow sends, validates, and receives.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono text-muted">Query:</span>
          <span className="rounded bg-sunken px-2.5 py-1 font-mono text-xs font-medium text-ink">
            www.github.com A
          </span>
        </div>
      </div>

      {/* Step Tabs */}
      <div className="mt-6 grid grid-cols-3 gap-2 sm:gap-4">
        {steps.map((s, idx) => {
          const isSelected = activeStep === idx;
          return (
            <button
              key={s.id}
              onClick={() => setActiveStep(idx)}
              className={cx(
                "relative flex flex-col items-start rounded-lg border p-3 text-left transition-all",
                isSelected
                  ? "border-accent bg-accent-tint/30 text-ink shadow-sm"
                  : "border-line bg-raised/50 text-muted hover:border-line hover:text-body"
              )}
            >
              <div className="flex w-full items-center justify-between">
                <span className="text-[10px] font-mono font-medium uppercase tracking-wider text-muted">
                  Hop {idx + 1}
                </span>
                <span
                  className={cx(
                    "text-[10px] font-mono font-medium px-1.5 py-0.5 rounded",
                    s.type === "ANSWER"
                      ? "bg-emerald-100 text-emerald-800"
                      : "bg-blue-100 text-blue-800"
                  )}
                >
                  {s.rtt}
                </span>
              </div>
              <span className="mt-1.5 font-mono text-xs font-semibold text-ink truncate w-full">
                {s.zone}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Hop Details */}
      <div className="mt-6 rounded-lg border border-term-line bg-term p-5 text-term-text font-mono text-xs shadow-inner">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-term-line/60 pb-3">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-term-green" />
            <span className="font-semibold text-white">{current.stage}</span>
          </div>
          <span className="rounded bg-term-raised px-2 py-0.5 text-[11px] text-term-dim">
            {current.server}
          </span>
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div>
              <span className="text-term-dim text-[11px] block">0x20 Randomized Nonce:</span>
              <span className="text-term-amber font-semibold">{current.qname}</span>
            </div>
            <div>
              <span className="text-term-dim text-[11px] block">Protocol & Limits:</span>
              <span className="text-term-text">UDP ({current.rtt}) · RD=0 (Iterative)</span>
            </div>
            {current.glue && (
              <div>
                <span className="text-term-dim text-[11px] block">Glue Validation:</span>
                <span className="text-term-cyan">{current.glue}</span>
              </div>
            )}
          </div>

          <div>
            <span className="text-term-dim text-[11px] block mb-1">Received Records:</span>
            <div className="rounded bg-term-raised p-2.5 text-[11px] space-y-1 text-term-text/90 overflow-x-auto">
              {current.response.map((line, i) => (
                <div key={i} className="whitespace-pre">{line}</div>
              ))}
            </div>
          </div>
        </div>

        <p className="mt-4 border-t border-term-line/50 pt-3 text-[11px] text-term-dim leading-relaxed">
          {current.details}
        </p>
      </div>
    </div>
  );
}
