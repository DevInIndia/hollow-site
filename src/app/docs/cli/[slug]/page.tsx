import { notFound } from "next/navigation";
import Link from "next/link";
import { commands } from "@/content/cli";
import { Terminal } from "@/components/terminal";
import { resolveMX, resolveTrace, inspectExample, statsJSON, dashFrame } from "@/content/captures";

export function generateStaticParams() {
  return commands.map((c) => ({ slug: c.slug }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function CommandDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const cmd = commands.find((c) => c.slug === slug);
  if (!cmd) notFound();

  // Match sample capture output if available
  let sampleOutput = "";
  if (slug === "resolve") sampleOutput = resolveMX.output;
  else if (slug === "trace") sampleOutput = resolveTrace.output;
  else if (slug === "inspect") sampleOutput = inspectExample.output;
  else if (slug === "stats") sampleOutput = statsJSON.output;
  else if (slug === "dash") sampleOutput = dashFrame.output;

  return (
    <div className="space-y-10">
      <div>
        <Link href="/docs/cli/" className="text-xs font-mono text-accent hover:underline mb-2 block">
          ← Back to CLI Reference
        </Link>
        <span className="eyebrow">Command</span>
        <h1 className="mt-1 text-3xl font-semibold font-mono tracking-tight text-ink sm:text-4xl">
          hollow {cmd.name}
        </h1>
        <p className="mt-3 text-sm text-muted leading-relaxed">{cmd.description}</p>
      </div>

      <section className="space-y-3">
        <h3 className="text-base font-semibold text-ink">Usage Syntax</h3>
        <div className="rounded-lg border border-line bg-raised px-4 py-3 font-mono text-xs text-ink">
          {cmd.usage.join("\n")}
        </div>
      </section>

      {cmd.flags.length > 0 && (
        <section className="space-y-3">
          <h3 className="text-base font-semibold text-ink">Accepted Flags</h3>
          <div className="rounded-xl border border-line overflow-hidden font-mono text-xs">
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
        </section>
      )}

      {sampleOutput && (
        <section className="space-y-3 pt-6 border-t border-line-soft">
          <h3 className="text-base font-semibold text-ink">Real Output Example</h3>
          <Terminal
            title={cmd.usage[0]}
            command={cmd.usage[0]}
            output={sampleOutput}
          />
        </section>
      )}
    </div>
  );
}