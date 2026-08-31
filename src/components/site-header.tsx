"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Logo } from "./logo";
import { Button, cx } from "./ui";
import { primaryNav, productMenu } from "@/lib/nav";
import { site } from "@/lib/site";

function Caret({ open }: { open: boolean }) {
  return (
    <svg
      className={cx(
        "h-3 w-3 transition-transform duration-200",
        open && "rotate-180",
      )}
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3 4.5 6 7.5 9 4.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * The Product dropdown.
 *
 * It opens on hover for a pointer and on click or Enter for a keyboard, closes
 * on Escape and on focus leaving the group, and the trigger keeps
 * `aria-expanded` in step with the panel. The panel is a plain list of links so
 * Tab moves through it in reading order.
 */
function ProductMenu({ active }: { active: boolean }) {
  const [open, setOpen] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const id = useId();
  const reduced = useReducedMotion();

  useEffect(() => () => clearTimeout(closeTimer.current), []);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const hoverOpen = () => {
    clearTimeout(closeTimer.current);
    setOpen(true);
  };
  // A short delay stops the panel snapping shut while the pointer crosses the
  // gap between the trigger and the panel.
  const hoverClose = () => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  };

  return (
    <div
      ref={wrap}
      className="relative"
      onMouseEnter={hoverOpen}
      onMouseLeave={hoverClose}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(false);
      }}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((v) => !v)}
        className={cx(
          "inline-flex h-8 items-center gap-1 rounded-md px-2.5 text-[0.875rem] transition-colors",
          active || open ? "text-ink" : "text-body hover:text-ink",
        )}
      >
        Product
        <Caret open={open} />
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            id={id}
            initial={reduced ? false : { opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-1/2 top-full z-50 w-[34rem] -translate-x-1/2 pt-3"
          >
            <div className="overflow-hidden rounded-xl border border-line bg-page p-2 shadow-[0_1px_2px_rgba(9,9,11,0.04),0_16px_44px_-16px_rgba(9,9,11,0.24)]">
              <ul className="grid grid-cols-2 gap-0.5">
                {productMenu.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="block rounded-lg p-3 transition-colors hover:bg-raised"
                    >
                      <span className="block text-[0.875rem] font-medium text-ink">
                        {item.label}
                      </span>
                      <span className="mt-0.5 block text-[0.8125rem] leading-[1.5] text-muted">
                        {item.description}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

function MobileMenu({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();

  // The drawer covers the page, so the page behind it must not scroll.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? "Close menu" : "Open menu"}
        className="inline-flex h-9 w-9 items-center justify-center rounded-md text-ink transition-colors hover:bg-raised md:hidden"
      >
        <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5" aria-hidden="true">
          {open ? (
            <path
              d="m5.5 5.5 9 9m0-9-9 9"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          ) : (
            <path
              d="M3.5 6.5h13M3.5 13.5h13"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          )}
        </svg>
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[57px] bottom-0 z-40 overflow-y-auto overscroll-contain border-t border-line bg-page md:hidden"
          >
            <nav className="px-5 py-6" aria-label="Mobile">
              <ul className="flex flex-col">
                {primaryNav
                  .filter((l) => !l.menu)
                  .map((link) => (
                    <li key={link.href}>
                      {link.external ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="flex items-center justify-between border-b border-line-soft py-3.5 text-[1.0625rem] text-ink"
                        >
                          {link.label}
                          <span className="text-faint" aria-hidden="true">
                            ↗
                          </span>
                        </a>
                      ) : (
                        <Link
                          href={link.href}
                          className="block border-b border-line-soft py-3.5 text-[1.0625rem] text-ink"
                        >
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
              </ul>

              <p className="eyebrow mt-8 mb-3">Product</p>
              <ul className="flex flex-col gap-0.5">
                {productMenu.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="block rounded-lg py-2.5 text-[0.9375rem] text-body"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-col gap-3">
                <Button href="/docs/installation/">Get started</Button>
                <Button href="/architecture/" variant="secondary">
                  Explore the architecture
                </Button>
              </div>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

export function SiteHeader() {
  const pathname = usePathname() ?? "/";
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href.replace(/\/$/, ""));

  return (
    <header
      className={cx(
        "sticky top-0 z-50 border-b transition-colors duration-300",
        scrolled
          ? "border-line bg-page/85 backdrop-blur-md backdrop-saturate-150"
          : "border-transparent bg-page",
      )}
    >
      <div className="shell flex h-14 items-center gap-6">
        <Link href="/" className="shrink-0" aria-label="hollow, home">
          <Logo />
        </Link>

        <nav className="hidden md:flex md:items-center md:gap-0.5" aria-label="Main">
          {primaryNav.map((link) =>
            link.menu ? (
              <ProductMenu key={link.label} active={isActive("/architecture")} />
            ) : link.external ? (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex h-8 items-center gap-1 rounded-md px-2.5 text-[0.875rem] text-body transition-colors hover:text-ink"
              >
                {link.label}
                <svg
                  viewBox="0 0 12 12"
                  fill="none"
                  className="h-2.5 w-2.5 text-faint"
                  aria-hidden="true"
                >
                  <path
                    d="M4 8 8 4M8 4H5M8 4v3"
                    stroke="currentColor"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={cx(
                  "relative inline-flex h-8 items-center rounded-md px-2.5 text-[0.875rem] transition-colors",
                  isActive(link.href) ? "text-ink" : "text-body hover:text-ink",
                )}
              >
                {link.label}
                {isActive(link.href) ? (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-x-2.5 -bottom-[1px] h-[2px] rounded-full bg-ink"
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  />
                ) : null}
              </Link>
            ),
          )}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <span className="hidden font-mono text-[0.6875rem] text-faint lg:inline">
            {site.version}
          </span>
          <Button href="/docs/installation/" size="sm" className="hidden sm:inline-flex">
            Get started
          </Button>
          <MobileMenu pathname={pathname} />
        </div>
      </div>
    </header>
  );
}
