import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

export function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

/** The page measure. Everything sits inside one of these. */
export function Shell({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cx("shell", className)}>{children}</div>;
}

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "md" | "sm";
  external?: boolean;
  className?: string;
};

/**
 * Actions are links, because every one of them navigates. Rendering them as
 * <button> would take them out of the link semantics a keyboard user expects.
 */
export function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  external,
  className,
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-200 whitespace-nowrap";
  const sizes = {
    md: "h-10 px-5 text-[0.875rem]",
    sm: "h-8 px-4 text-[0.8125rem]",
  };
  const variants = {
    primary:
      "bg-ink text-white hover:bg-[#27272a] active:scale-[0.98] shadow-[0_1px_2px_rgba(9,9,11,0.16)]",
    secondary:
      "border border-line bg-page text-ink hover:border-[#d4d4d8] hover:bg-raised active:scale-[0.98]",
    ghost: "text-body hover:text-ink",
  };
  const cls = cx(base, sizes[size], variants[variant], className);

  if (external) {
    return (
      <a href={href} className={cls} target="_blank" rel="noreferrer noopener">
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}

/** Small monospace label that sits above a section title. */
export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="eyebrow">{children}</p>;
}

/**
 * A section header. `align` centres it for full-width sections and leaves it
 * ranged left for the ones that carry a visual beside them.
 */
export function SectionHeading({
  eyebrow,
  title,
  lede,
  align = "left",
  as: As = "h2",
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
  align?: "left" | "center";
  as?: "h1" | "h2" | "h3";
  className?: string;
}) {
  return (
    <div
      className={cx(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <As className="text-[1.75rem] leading-[1.15] sm:text-[2.125rem] md:text-[2.5rem]">
        {title}
      </As>
      {lede ? (
        <p
          className={cx(
            "max-w-[46rem] text-[1.0625rem] leading-[1.65] text-muted",
            align === "center" && "mx-auto",
          )}
        >
          {lede}
        </p>
      ) : null}
    </div>
  );
}

/** A full-bleed hairline, used to separate major sections. */
export function Rule({ className }: { className?: string }) {
  return <hr className={cx("h-px w-full border-0 bg-line-soft", className)} />;
}

/** A vertical rhythm wrapper so section spacing is decided in one place. */
export function Section({
  children,
  className,
  id,
  tone = "page",
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  tone?: "page" | "raised";
}) {
  return (
    <section
      id={id}
      className={cx(
        "py-20 md:py-28",
        tone === "raised" && "bg-raised",
        className,
      )}
    >
      {children}
    </section>
  );
}

/** An arrow that nudges on hover, for text links that lead somewhere. */
export function ArrowLink({
  href,
  children,
  external,
  className,
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
  className?: string;
}) {
  const inner = (
    <>
      {children}
      <svg
        className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
        viewBox="0 0 14 14"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M3 7h8M7.5 3.5 11 7l-3.5 3.5"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </>
  );
  const cls = cx(
    "group inline-flex items-center gap-1.5 text-[0.9375rem] font-medium text-ink transition-colors hover:text-accent",
    className,
  );
  if (external) {
    return (
      <a href={href} className={cls} target="_blank" rel="noreferrer noopener">
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}

/** Inline code inside prose. */
export function Code({ children, className, ...rest }: ComponentProps<"code">) {
  return (
    <code
      className={cx(
        "rounded-[4px] border border-line-soft bg-sunken px-[0.35em] py-[0.15em] text-[0.875em] text-ink",
        className,
      )}
      {...rest}
    >
      {children}
    </code>
  );
}

/** A small pill, used for versions and statuses. */
export function Badge({
  children,
  tone = "neutral",
}: {
  children: ReactNode;
  tone?: "neutral" | "accent" | "warn";
}) {
  const tones = {
    neutral: "border-line bg-raised text-muted",
    accent: "border-[#c8d2f5] bg-accent-tint text-accent",
    warn: "border-[#f0dfc0] bg-[#fdf6e9] text-[#8a6420]",
  };
  return (
    <span
      className={cx(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 font-mono text-[0.6875rem] tracking-tight",
        tones[tone],
      )}
    >
      {children}
    </span>
  );
}
