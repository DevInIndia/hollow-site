import { WireInspector } from "@/components/wire-inspector";
import { Terminal } from "@/components/terminal";
import { inspectExample } from "@/content/captures";

export const metadata = {
  title: "Wire Format",
  description: "RFC 1035 wire codec, header anatomy, and pointer decompression.",
};

export default function WirePage() {
  return (
    <div className="shell py-12 md:py-20 space-y-16">
      <div className="max-w-3xl">
        <span className="eyebrow">Protocol X-Ray</span>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
          DNS Wire Format Codec
        </h1>
        <p className="mt-4 text-base text-muted leading-relaxed">
          hollow implements a complete RFC 1035 and RFC 6891 wire codec in pure Go using <code className="font-mono text-ink">encoding/binary</code> and <code className="font-mono text-ink">net/netip</code>.
          Zero external DNS libraries.
        </p>
      </div>

      {/* Interactive Wire Inspector */}
      <WireInspector />

      {/* Wire Anatomy Details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-line-soft">
        <div className="rounded-xl border border-line bg-page p-6">
          <h3 className="font-mono text-sm font-semibold text-ink">1. The 12-Byte Header</h3>
          <p className="mt-2 text-xs text-muted leading-relaxed">
            Transaction ID (2 octets) + 16 bits of flags (QR, Opcode, AA, TC, RD, RA, AD, CD, RCODE) + 4 count words (QDCOUNT, ANCOUNT, NSCOUNT, ARCOUNT).
          </p>
        </div>

        <div className="rounded-xl border border-line bg-page p-6">
          <h3 className="font-mono text-sm font-semibold text-ink">2. Name Compression</h3>
          <p className="mt-2 text-xs text-muted leading-relaxed">
            Pointers start with top 2 bits set (<code className="font-mono text-accent">0b11xxxxxx</code>), pointing back to previously encoded label offsets to shrink packet sizes.
          </p>
        </div>

        <div className="rounded-xl border border-line bg-page p-6">
          <h3 className="font-mono text-sm font-semibold text-ink">3. EDNS0 OPT Pseudo-Record</h3>
          <p className="mt-2 text-xs text-muted leading-relaxed">
            RFC 6891 extension carries UDP buffer size (1232 bytes), extended RCODEs, and DNSSEC OK (DO) flags without changing DNS query framing.
          </p>
        </div>
      </div>

      {/* Full Capture Terminal */}
      <div className="space-y-4">
        <h3 className="font-mono text-sm font-semibold text-ink">Raw Output from hollow inspect</h3>
        <Terminal
          title={inspectExample.command}
          command={inspectExample.command}
          output={inspectExample.output}
        />
      </div>
    </div>
  );
}
