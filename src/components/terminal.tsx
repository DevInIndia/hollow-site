import type { ReactNode } from "react";
import { CopyButton } from "./copy-button";
import { highlight, type Lang } from "@/lib/highlight";
import { cx } from "./ui";

/** The window chrome: three restrained dots and a title. */
function Chrome({
  title,
  copyValue,
  copyLabel,
}: {
  title?: ReactNode;
  copyValue?: string;
  copyLabel?: string;
}) {
  return (
    <div className="flex h-11 shrink-0 items-center gap-3 border-b border-term-line px-4">
      <div className="flex gap-[6px]" aria-hidden="true">
        <span className="h-[9px] w-[9px] rounded-full bg-[#2e3145]" />
        <span className="h-[9px] w-[9px] rounded-full bg-[#2e3145]" />
        <span className="h-[9px] w-[9px] rounded-full bg-[#2e3145]" />
      </div>
      {title ? (
        <span className="truncate font-mono text-[0.75rem] text-term-dim">
          {title}
        </span>
      ) : null}
      {copyValue ? (
        <div className="ml-auto">
          <CopyButton value={copyValue} label={copyLabel} />
        </div>
      ) : null}
    </div>
  );
}

export type TerminalProps = {
  /** The command shown after the prompt. Omitted for a bare output window. */
  command?: string;
  /** Captured output, verbatim. */
  output?: string;
  lang?: Lang;
  /** Window title, defaults to the shell name. */
  title?: ReactNode;
  /** Value the copy button puts on the clipboard. Defaults to the command. */
  copyValue?: string;
  /** Fixed height with internal scrolling, for long dumps. */
  maxHeight?: string;
  className?: string;
  /** Renders a blinking block caret after the last line. */
  caret?: boolean;
  children?: ReactNode;
};

/**
 * A terminal window.
 *
 * Output is highlighted at build time and shipped as static markup; the only
 * client code is the copy button. The output element is focusable and marked as
 * a region so a keyboard user can scroll a long dump without a pointer.
 */
export function Terminal({
  command,
  output,
  lang = "plain",
  title,
  copyValue,
  maxHeight,
  className,
  caret,
  children,
}: TerminalProps) {
  const clipboard = copyValue ?? command ?? output;

  return (
    <div
      className={cx(
        "overflow-hidden rounded-xl border border-term-line bg-term",
        "shadow-[0_1px_2px_rgba(9,9,11,0.04),0_12px_32px_-12px_rgba(9,9,11,0.22)]",
        className,
      )}
    >
      <Chrome
        title={title ?? "hollow"}
        copyValue={clipboard}
        copyLabel={command ? "Copy" : "Copy output"}
      />
      <div
        className="term-scroll overflow-auto px-4 py-3.5"
        style={maxHeight ? { maxHeight } : undefined}
        tabIndex={0}
        role="region"
        aria-label={command ? `Output of ${command}` : "Terminal output"}
      >
        <pre className="w-fit min-w-full font-mono text-[0.78125rem] leading-[1.7] text-term-text sm:text-[0.8125rem]">
          {command ? (
            <span className="block whitespace-pre">
              <span className="select-none text-term-green">$ </span>
              <span className="text-term-text">{command}</span>
            </span>
          ) : null}
          {output ? highlight(output, lang) : null}
          {caret ? (
            <span
              className="ml-0.5 inline-block h-[1em] w-[0.55em] translate-y-[0.15em] bg-term-green align-baseline animate-caret"
              aria-hidden="true"
            />
          ) : null}
          {children}
        </pre>
      </div>
    </div>
  );
}

/**
 * A single command with a copy button and no output. Used for install routes,
 * where the command is the whole point and a window would be noise.
 */
export function CommandLine({
  command,
  className,
}: {
  command: string;
  className?: string;
}) {
  return (
    <div
      className={cx(
        "group flex items-center gap-3 rounded-lg border border-term-line bg-term px-4 py-3",
        className,
      )}
    >
      <span className="select-none font-mono text-[0.8125rem] text-term-green">
        $
      </span>
      <code className="term-scroll flex-1 overflow-x-auto whitespace-nowrap font-mono text-[0.78125rem] text-term-text sm:text-[0.8125rem]">
        {command}
      </code>
      <CopyButton value={command} className="shrink-0" />
    </div>
  );
}
