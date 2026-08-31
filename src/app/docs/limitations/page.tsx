import { limitations } from "@/lib/site";

export const metadata = {
  title: "Limitations",
  description: "Honest disclosure of architectural boundaries and non-implemented features.",
};

export default function LimitationsPage() {
  return (
    <div className="space-y-10">
      <div>
        <span className="eyebrow">Integrity</span>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          Architectural Limitations
        </h1>
        <p className="mt-3 text-sm text-muted leading-relaxed">
          Stated plainly because a resolver that hides its constraints is worse than one that names them.
        </p>
      </div>

      <div className="space-y-4">
        {limitations.map((lim, idx) => (
          <div key={idx} className="rounded-xl border border-line bg-page p-5 shadow-sm">
            <h3 className="font-mono text-sm font-semibold text-ink">
              {idx + 1}. {lim.title}
            </h3>
            <p className="mt-2 text-xs text-muted leading-relaxed">
              {lim.body}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}