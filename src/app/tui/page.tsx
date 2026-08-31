import { TUIDashboard } from "@/components/tui-dashboard";
import { Terminal } from "@/components/terminal";
import { dashFrame } from "@/content/captures";

export const metadata = {
  title: "Terminal Dashboard",
  description: "Live TUI dashboard over loopback control socket without raw mode.",
};

export default function TUIPage() {
  return (
    <div className="shell py-12 md:py-20 space-y-16">
      <div className="max-w-3xl">
        <span className="eyebrow">Observability</span>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
          Terminal User Interface
        </h1>
        <p className="mt-4 text-base text-muted leading-relaxed">
          <code className="font-mono text-ink">hollow dash</code> attaches to a running server over an opt-in loopback control socket (<code className="font-mono text-ink">127.0.0.1:15354</code>).
          It renders live QPS sparklines, cache hit ratios, latency metrics, and top blocked domains using hand-rolled ANSI escape codes without raw mode.
        </p>
      </div>

      {/* Interactive TUI Simulator */}
      <TUIDashboard />

      {/* Engineering Design */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-line-soft">
        <div className="rounded-xl border border-line bg-page p-6">
          <h3 className="font-mono text-sm font-semibold text-ink">Zero Raw Mode</h3>
          <p className="mt-2 text-xs text-muted leading-relaxed">
            By not requiring keyboard interactivity, hollow avoids Unix ioctl raw mode (<code className="font-mono text-[11px]">TCGETS/TCSETS</code>) and Windows console mode manipulation.
          </p>
        </div>

        <div className="rounded-xl border border-line bg-page p-6">
          <h3 className="font-mono text-sm font-semibold text-ink">Length-Prefixed Framing</h3>
          <p className="mt-2 text-xs text-muted leading-relaxed">
            The control socket uses 4-byte length-prefixed JSON frames over a loopback TCP socket, streaming stats snapshots every 500ms.
          </p>
        </div>

        <div className="rounded-xl border border-line bg-page p-6">
          <h3 className="font-mono text-sm font-semibold text-ink">Fixed Budget Counters</h3>
          <p className="mt-2 text-xs text-muted leading-relaxed">
            Top-N domains and client lists are capped in memory to ensure subdomain floods cannot exhaust server memory.
          </p>
        </div>
      </div>
    </div>
  );
}
