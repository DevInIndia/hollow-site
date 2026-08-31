import type { ReactNode } from "react";

/**
 * Highlighting for captured terminal output.
 *
 * The one rule this file obeys: it wraps characters, it never changes them.
 * Every highlighter below segments a line by matching regions and emits the
 * gaps between them verbatim, so concatenating the rendered text reproduces the
 * input byte for byte. That matters because the input is real output from the
 * binary and the site claims as much.
 *
 * It runs in server components at build time, so none of it ships to the
 * browser.
 */

export type Lang = "dig" | "trace" | "hex" | "json" | "shell" | "plain";

type Rule = { re: RegExp; cls: string };

/** A span, or a bare string when no rule claimed the region. */
function segment(line: string, rules: Rule[], keyBase: string): ReactNode[] {
  type Hit = { start: number; end: number; cls: string };
  const hits: Hit[] = [];

  for (const { re, cls } of rules) {
    // Each rule gets a fresh lastIndex; the caller's regexes are global.
    const re2 = new RegExp(re.source, re.flags.includes("g") ? re.flags : re.flags + "g");
    let m: RegExpExecArray | null;
    while ((m = re2.exec(line)) !== null) {
      // Group 1, when present, is the part to paint; otherwise the whole match.
      const whole = m[0];
      const target = m[1] ?? whole;
      const offset = m[1] !== undefined ? whole.indexOf(m[1]) : 0;
      const start = m.index + offset;
      const end = start + target.length;
      if (end === start) {
        re2.lastIndex++;
        continue;
      }
      // First rule to claim a region wins; later overlaps are dropped.
      if (hits.some((h) => start < h.end && end > h.start)) continue;
      hits.push({ start, end, cls });
      if (m.index === re2.lastIndex) re2.lastIndex++;
    }
  }

  if (hits.length === 0) return [line];
  hits.sort((a, b) => a.start - b.start);

  const out: ReactNode[] = [];
  let cursor = 0;
  hits.forEach((h, i) => {
    if (h.start > cursor) out.push(line.slice(cursor, h.start));
    out.push(
      <span key={`${keyBase}-${i}`} className={h.cls}>
        {line.slice(h.start, h.end)}
      </span>,
    );
    cursor = h.end;
  });
  if (cursor < line.length) out.push(line.slice(cursor));
  return out;
}

const DIM = "text-term-dim";
const GREEN = "text-term-green";
const AMBER = "text-term-amber";
const CYAN = "text-term-cyan";
const ROSE = "text-term-rose";
const VIOLET = "text-term-violet";
const STRONG = "text-term-text font-medium";

/** Record types the codec implements, plus OPT, which only ever appears in EDNS0. */
const RECORD_TYPES = "A|AAAA|CNAME|MX|NS|TXT|PTR|SOA|SRV|OPT";

/** dig-style presentation output, as `resolve` prints it. */
const digRules: Rule[] = [
  // A whole comment line, painted first so the rules below only see data lines.
  { re: /^;.*$/, cls: DIM },
  { re: /\b(NOERROR)\b/, cls: GREEN },
  { re: /\b(NXDOMAIN|SERVFAIL|REFUSED|FORMERR|NOTIMP)\b/, cls: ROSE },
  { re: /\b(IN)\b/, cls: DIM },
  { re: new RegExp(`\\s(${RECORD_TYPES})(?=\\s|$)`), cls: AMBER },
  // IPv4, IPv6 and a trailing-dot domain name.
  { re: /\b(\d{1,3}(?:\.\d{1,3}){3})\b/, cls: VIOLET },
  { re: /\b([0-9a-f]{0,4}(?::[0-9a-f]{0,4}){2,7})\b/, cls: VIOLET },
  { re: /(^[a-z0-9][a-z0-9.-]*\.)(?=\s)/i, cls: CYAN },
  { re: /\s([a-z0-9][a-z0-9-]*(?:\.[a-z0-9-]+)+\.)(?=\s|$)/i, cls: CYAN },
  { re: /\b(\d+)(?=\s+IN\s)/, cls: DIM },
];

/** The delegation tree drawn by `trace`. */
const traceRules: Rule[] = [
  { re: /^(\s*)(?:\+-|└─)/, cls: DIM },
  { re: /(\+-|└─)/, cls: "text-term-faint" },
  { re: /\b(referral)\b/, cls: AMBER },
  { re: /\b(answer)\b/, cls: GREEN },
  { re: /\b(cache)\b/, cls: VIOLET },
  // The 0x20 nonce: the whole line, because the mixed case is the point.
  { re: /(asked as \S+)/, cls: ROSE },
  { re: /\b(\d+ms)\b/, cls: STRONG },
  { re: /\b(\d+ B)\b/, cls: DIM },
  { re: /\b(\d+ NS|\d+ glue|no glue)\b/, cls: DIM },
  { re: /\b(1 of \d+ servers?)\b/, cls: DIM },
  { re: /\b(udp|tcp)\b/, cls: CYAN },
  { re: /\b(\d{1,3}(?:\.\d{1,3}){3}:\d+)/, cls: VIOLET },
  { re: /(\[[0-9a-f:]+\]:\d+)/i, cls: VIOLET },
  { re: /^(\s*)(\.\s\(root\))/, cls: STRONG },
  { re: /(\d+ queries?, \d+ zones?, .*)$/, cls: DIM },
];

/** The annotated hexdump `inspect` prints. */
const hexRules: Rule[] = [
  { re: /^;;.*$/, cls: DIM },
  // Offset column: four hex digits at the start of the line.
  { re: /^([0-9a-f]{4})(?=\s)/, cls: "text-term-faint" },
  // The octets themselves.
  { re: /^[0-9a-f]{4}\s\s((?:[0-9a-f]{2}\s?)+)/, cls: CYAN },
  { re: /^\s{6}((?:[0-9a-f]{2}\s?)+)$/, cls: CYAN },
  // Field names the decoder assigned.
  {
    re: /\b(QNAME|QTYPE|QCLASS|RDLENGTH|RDATA|QDCOUNT|ANCOUNT|NSCOUNT|ARCOUNT|TTL|NAME|TYPE|CLASS|flags|ID|UDP size)\b/,
    cls: AMBER,
  },
  { re: /(pointer to 0x[0-9a-f]{4})/, cls: ROSE },
  { re: /("(?:[^"]*)")/, cls: GREEN },
  { re: /\b(\d{1,3}(?:\.\d{1,3}){3})\b/, cls: VIOLET },
];

const jsonRules: Rule[] = [
  { re: /("(?:[^"\\]|\\.)*")\s*:/, cls: CYAN },
  { re: /:\s*("(?:[^"\\]|\\.)*")/, cls: GREEN },
  { re: /:\s*(-?\d+(?:\.\d+)?)/, cls: VIOLET },
  { re: /\b(true|false|null)\b/, cls: AMBER },
  { re: /([{}[\],])/, cls: "text-term-faint" },
];

const shellRules: Rule[] = [
  { re: /^(#.*)$/, cls: DIM },
  { re: /(^|\s)(hollow|dig|curl|go|docker|irm|iex|sh|less|make)(?=\s|$)/, cls: GREEN },
  { re: /(\s--?[a-z0-9][a-z0-9-]*)/, cls: AMBER },
  { re: /(\|)/, cls: "text-term-faint" },
  { re: /(https?:\/\/\S+)/, cls: CYAN },
];

const RULES: Record<Lang, Rule[]> = {
  dig: digRules,
  trace: traceRules,
  hex: hexRules,
  json: jsonRules,
  shell: shellRules,
  plain: [],
};

/**
 * Renders `text` as highlighted lines. The returned nodes contain exactly the
 * characters of the input, split on newlines.
 */
export function highlight(text: string, lang: Lang): ReactNode[] {
  const rules = RULES[lang];
  return text.split("\n").map((line, i) => (
    <span key={i} className="block min-h-[1.5em] whitespace-pre">
      {rules.length === 0 ? line : segment(line, rules, `l${i}`)}
    </span>
  ));
}
