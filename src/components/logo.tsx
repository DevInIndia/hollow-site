import { cx } from "./ui";

/**
 * The mark: a ring with the centre cut out, which is the name. The gap on the
 * right is where a delegation continues, so it reads as a node in a path rather
 * than a full stop.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      className={cx("h-[18px] w-[18px]", className)}
      aria-hidden="true"
    >
      <circle
        cx="10"
        cy="10"
        r="8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="38 12"
        transform="rotate(-38 10 10)"
      />
      <circle cx="10" cy="10" r="2.4" fill="currentColor" />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cx("inline-flex items-center gap-2 text-ink", className)}>
      <LogoMark />
      <span className="text-[0.9375rem] font-semibold tracking-[-0.02em]">
        hollow
      </span>
    </span>
  );
}
