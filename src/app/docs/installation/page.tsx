import { CopyButton } from "@/components/copy-button";
import { site, install, artifacts } from "@/lib/site";

export const metadata = {
  title: "Installation",
  description: "Install hollow via shell script, PowerShell, Go toolchain, or Docker.",
};

export default function InstallationPage() {
  return (
    <div className="space-y-10">
      <div>
        <span className="eyebrow">Setup</span>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          Installation
        </h1>
        <p className="mt-3 text-sm text-muted leading-relaxed">
          hollow is distributed as a single statically linked binary with zero external dependencies and no libc requirements.
        </p>
      </div>

      <div className="space-y-8">
        {/* Linux / macOS */}
        <section className="space-y-2">
          <h3 className="text-base font-semibold text-ink">Linux & macOS</h3>
          <p className="text-xs text-muted">
            The shell installer downloads the verified binary for your platform and verifies it against the published <code className="font-mono text-ink">SHA256SUMS</code> before installing to <code className="font-mono text-ink">~/.local/bin</code>:
          </p>
          <div className="flex items-center justify-between rounded-lg border border-line bg-raised px-4 py-3 font-mono text-xs text-ink shadow-sm">
            <span className="truncate">{install.unix}</span>
            <CopyButton value={install.unix} tone="light" />
          </div>
        </section>

        {/* Windows */}
        <section className="space-y-2">
          <h3 className="text-base font-semibold text-ink">Windows (PowerShell)</h3>
          <div className="flex items-center justify-between rounded-lg border border-line bg-raised px-4 py-3 font-mono text-xs text-ink shadow-sm">
            <span className="truncate">{install.windows}</span>
            <CopyButton value={install.windows} tone="light" />
          </div>
        </section>

        {/* Go Install */}
        <section className="space-y-2">
          <h3 className="text-base font-semibold text-ink">Via Go Toolchain</h3>
          <div className="flex items-center justify-between rounded-lg border border-line bg-raised px-4 py-3 font-mono text-xs text-ink shadow-sm">
            <span className="truncate">{install.go}</span>
            <CopyButton value={install.go} tone="light" />
          </div>
        </section>

        {/* Docker */}
        <section className="space-y-2">
          <h3 className="text-base font-semibold text-ink">Docker Scratch Container (5.1MB)</h3>
          <div className="flex items-center justify-between rounded-lg border border-line bg-raised px-4 py-3 font-mono text-xs text-ink shadow-sm">
            <span className="truncate">{install.docker}</span>
            <CopyButton value={install.docker} tone="light" />
          </div>
        </section>

        {/* Checksum Table */}
        <section className="space-y-3 pt-6 border-t border-line-soft">
          <h3 className="text-base font-semibold text-ink">Published Release Artifacts & Checksums</h3>
          <div className="rounded-xl border border-line overflow-hidden font-mono text-xs">
            <table className="w-full text-left">
              <thead className="bg-raised border-b border-line text-muted text-[11px] uppercase">
                <tr>
                  <th className="py-2.5 px-4 font-medium">Platform</th>
                  <th className="py-2.5 px-4 font-medium">Binary Artifact</th>
                  <th className="py-2.5 px-4 font-medium">SHA-256 Checksum</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line-soft text-xs">
                {artifacts.map((a) => (
                  <tr key={a.target} className="hover:bg-raised/50">
                    <td className="py-3 px-4 font-medium text-ink">{a.target}</td>
                    <td className="py-3 px-4 text-muted">{a.file}</td>
                    <td className="py-3 px-4 text-muted text-[11px] select-all truncate">{a.sha256}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}