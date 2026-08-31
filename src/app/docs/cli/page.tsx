import Link from "next/link";
import { commands } from "@/content/cli";
import { Terminal } from "@/components/terminal";
import { helpText } from "@/content/captures";

export const metadata = {
  title: "CLI Reference",
  description: "Complete command-line interface specification, flags, and exit codes.",
};

export default function CLIIndexPage() {
  return (
    <div className="space-y-12">
      <div>
        <span className="eyebrow">Reference</span>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          CLI Reference
        </h1>
        <p className="mt-3 text-sm text-muted leading-relaxed">
          hollow uses a verb-based command interface. Every command, flag, and exit code below is strictly verified against the hollow binary contract.
        </p>
      </div>

      {/* Exit Codes Section */}
      <section className="rounded-xl border border-line bg-page p-6 space-y-3 shadow-sm" id="exit-codes">
        <h3 className="font-mono text-sm font-semibold text-ink">Process Exit Codes</h3>
        <p className="text-xs text-muted leading-relaxed">
          Exit codes are part of the command-line contract so scripts can differentiate non-existent domains from operational resolution failures without parsing text output.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs pt-2">
          <div className="rounded border border-line bg-raised p-3">
            <span className="text-emerald-700 font-bold">0 (ExitOK)</span>
            <p className="mt-1 text-muted text-[11px] font-sans">Query answered successfully (NOERROR).</p>
          </div>
          <div className="rounded border border-line bg-raised p-3">
            <span className="text-amber-700 font-bold">1 (ExitNXDomain)</span>
            <p className="mt-1 text-muted text-[11px] font-sans">Domain does not exist or was blocked.</p>
          </div>
          <div className="rounded border border-line bg-raised p-3">
            <span className="text-rose-700 font-bold">2 (ExitFailure)</span>
            <p className="mt-1 text-muted text-[11px] font-sans">Flag syntax error, network timeout, or SERVFAIL.</p>
          </div>
        </div>
      </section>

      {/* Commands List */}
      <div className="space-y-10">
        {commands.map((cmd) => (
          <section key={cmd.slug} id={cmd.slug} className="space-y-4 pt-6 border-t border-line-soft">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="text-xl font-semibold font-mono text-ink">
                hollow {cmd.name}
              </h2>
              <Link href={`/docs/cli/${cmd.slug}/`} className="text-xs text-accent hover:underline font-mono">
                View dedicated docs →
              </Link>
            </div>

            <p className="text-xs text-muted leading-relaxed">{cmd.description}</p>

            <div className="rounded-lg border border-line bg-raised px-3.5 py-2 font-mono text-xs text-ink">
              {cmd.usage.join("\n")}
            </div>

            {cmd.flags.length > 0 && (
              <div className="rounded-xl border border-line overflow-hidden font-mono text-xs mt-3">
                <table className="w-full text-left">
                  <thead className="bg-raised border-b border-line text-muted text-[11px] uppercase">
                    <tr>
                      <th className="py-2.5 px-4 font-medium">Flag</th>
                      <th className="py-2.5 px-4 font-medium">Default</th>
                      <th className="py-2.5 px-4 font-medium">Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-line-soft text-xs">
                    {cmd.flags.map((flag) => (
                      <tr key={flag.name} className="hover:bg-raised/50">
                        <td className="py-2.5 px-4 font-semibold text-accent whitespace-nowrap">
                          --{flag.name} {flag.arg && <span className="text-muted font-normal">&lt;{flag.arg}&gt;</span>}
                        </td>
                        <td className="py-2.5 px-4 text-muted whitespace-nowrap">
                          {flag.default ? flag.default : "none"}
                        </td>
                        <td className="py-2.5 px-4 text-body font-sans text-xs">
                          {flag.description}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        ))}
      </div>
    </div>
  );
}
