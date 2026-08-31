import { Terminal } from "@/components/terminal";
import { resolveExample, resolveMX } from "@/content/captures";

export const metadata = {
  title: "Quickstart",
  description: "2-minute quickstart guide for hollow.",
};

export default function QuickstartPage() {
  return (
    <div className="space-y-10">
      <div>
        <span className="eyebrow">Quickstart</span>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          Quickstart Guide
        </h1>
        <p className="mt-3 text-sm text-muted leading-relaxed">
          Resolve names from root hints, trace delegation hierarchies, and run a local caching DNS server in minutes.
        </p>
      </div>

      <div className="space-y-6">
        <section className="space-y-3">
          <h2 className="text-lg font-medium text-ink">1. Resolve a Domain</h2>
          <p className="text-xs text-muted leading-relaxed">
            By default, <code className="font-mono text-ink">hollow resolve</code> walks from the root servers down to the authoritative answer:
          </p>
          <Terminal
            title="hollow resolve example.com"
            command={resolveExample.command}
            output={resolveExample.output}
          />
        </section>

        <section className="space-y-3 pt-6 border-t border-line-soft">
          <h2 className="text-lg font-medium text-ink">2. Query Specific Record Types</h2>
          <p className="text-xs text-muted leading-relaxed">
            Pass the record type (e.g. <code className="font-mono text-ink">MX</code>, <code className="font-mono text-ink">AAAA</code>, <code className="font-mono text-ink">TXT</code>) as the second argument:
          </p>
          <Terminal
            title="hollow resolve google.com MX"
            command={resolveMX.command}
            output={resolveMX.output}
          />
        </section>

        <section className="space-y-3 pt-6 border-t border-line-soft">
          <h2 className="text-lg font-medium text-ink">3. Run the Standalone Filtering Server</h2>
          <p className="text-xs text-muted leading-relaxed">
            Start the DNS server on unprivileged port 15353 with an adblock hosts list and control socket enabled:
          </p>
          <div className="rounded-lg border border-term-line bg-term p-4 font-mono text-xs text-term-text">
            <span className="text-term-dim select-none">$ </span>
            <span>hollow serve --control 127.0.0.1:15354 --block hosts.txt</span>
          </div>
        </section>
      </div>
    </div>
  );
}
