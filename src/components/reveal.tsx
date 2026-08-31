"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

/**
 * Fades and lifts its children once, when they first enter the viewport.
 *
 * Under `prefers-reduced-motion` the element renders in its final state with no
 * transition at all, rather than a faster one: the point is to remove the
 * movement, not to speed it up.
 */
export function Reveal({
  children,
  delay = 0,
  y = 16,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "section" | "li" | "span";
}) {
  const reduced = useReducedMotion();
  const Component = motion[as];

  if (reduced) {
    const Plain = as;
    return <Plain className={className}>{children}</Plain>;
  }

  return (
    <Component
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </Component>
  );
}

/**
 * Staggers a list of children. Each child is revealed `step` seconds after the
 * one before it, which is what makes a grid read as a sequence rather than a
 * flash.
 */
export function RevealGroup({
  children,
  className,
  step = 0.07,
  as = "div",
}: {
  children: ReactNode[];
  className?: string;
  step?: number;
  as?: "div" | "ul";
}) {
  const Wrapper = as;
  return (
    <Wrapper className={className}>
      {children.map((child, i) => (
        <Reveal key={i} delay={i * step} as={as === "ul" ? "li" : "div"}>
          {child}
        </Reveal>
      ))}
    </Wrapper>
  );
}
