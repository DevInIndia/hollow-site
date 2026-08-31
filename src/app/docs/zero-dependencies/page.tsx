import { SubstitutionsTable } from "@/components/substitutions-table";

export const metadata = {
  title: "Zero Dependencies Proof",
  description: "Standard library substitutions, trade-offs, and dependency proofs.",
};

export default function ZeroDependenciesPage() {
  return (
    <div className="space-y-10">
      <div>
        <span className="eyebrow">Engineering</span>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          Zero-Dependency Architecture
        </h1>
        <p className="mt-3 text-sm text-muted leading-relaxed">
          hollow is built entirely on the Go standard library. There is no require block in go.mod, no go.sum, and no vendor directory.
        </p>
      </div>

      <div className="space-y-6">
        <section className="space-y-3">
          <h2 className="text-lg font-medium text-ink">Verifying the Dependency Manifest</h2>
          <div className="rounded-lg border border-term-line bg-term p-4 font-mono text-xs text-term-text space-y-2">
            <div>
              <span className="text-term-dim">$ </span>
              <span>cat go.mod</span>
            </div>
            <div className="text-term-green">module github.com/DevInIndia/hollow<br />go 1.25</div>
            <div className="pt-2 text-term-dim"># No require block exists</div>
          </div>
        </section>

        <section className="space-y-3 pt-6 border-t border-line-soft">
          <SubstitutionsTable />
        </section>
      </div>
    </div>
  );
}