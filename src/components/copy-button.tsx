"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { cx } from "./ui";

/**
 * Copies `value` to the clipboard and says so for two seconds.
 *
 * The confirmation is announced as well as drawn, since a screen reader user
 * gets nothing from an icon swap. `navigator.clipboard` is absent on insecure
 * origins, so the failure path leaves the label alone rather than lying.
 */
export function CopyButton({
  value,
  label = "Copy",
  tone = "dark",
  className,
}: {
  value: string;
  label?: string;
  tone?: "dark" | "light";
  className?: string;
}) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(value);
      setState("copied");
    } catch {
      setState("failed");
    }
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setState("idle"), 2000);
  }, [value]);

  const tones = {
    dark: "border-term-line bg-term-raised text-term-dim hover:text-term-text hover:border-[#33364f]",
    light: "border-line bg-page text-muted hover:text-ink hover:border-[#d4d4d8]",
  };

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={`${label} to clipboard`}
      className={cx(
        "inline-flex h-7 items-center gap-1.5 rounded-md border px-2 font-sans text-[0.6875rem] font-medium transition-colors",
        tones[tone],
        className,
      )}
    >
      {state === "copied" ? (
        <svg className="h-3 w-3" viewBox="0 0 12 12" fill="none" aria-hidden="true">
          <path
            d="M2.5 6.5 5 9l4.5-6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        <svg className="h-3 w-3" viewBox="0 0 12 12" fill="none" aria-hidden="true">
          <rect
            x="4"
            y="4"
            width="6.5"
            height="6.5"
            rx="1.3"
            stroke="currentColor"
            strokeWidth="1.2"
          />
          <path
            d="M8 3.2V2.8A1.3 1.3 0 0 0 6.7 1.5H2.8A1.3 1.3 0 0 0 1.5 2.8v3.9A1.3 1.3 0 0 0 2.8 8h.4"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        </svg>
      )}
      <span aria-hidden="true">
        {state === "copied" ? "Copied" : state === "failed" ? "Press Ctrl+C" : label}
      </span>
      <span role="status" aria-live="polite" className="sr-only">
        {state === "copied" ? "Copied to clipboard" : ""}
      </span>
    </button>
  );
}
