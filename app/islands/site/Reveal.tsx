import { ComponentChildren } from "preact";
import { useLayoutEffect, useRef } from "preact/hooks";

interface Props {
  children: ComponentChildren;
  /** Stagger in milliseconds. */
  delay?: number;
  /** Direction the content travels in from. */
  from?: "up" | "left" | "none";
  class?: string;
}

const OFFSET = {
  up: "translateY(2rem)",
  left: "translateX(-1.5rem)",
  none: "none",
};

/**
 * Fades content in the first time it scrolls into view.
 *
 * The markup ships visible, and the hidden state is applied from a layout
 * effect — so if scripting is off or the island fails to load, the section is
 * still readable instead of a blank page.
 */
export default function Reveal(
  { children, delay = 0, from = "up", class: className = "" }: Props,
) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Nothing to animate when motion is unwanted, the tab is in the
    // background (no observer callbacks arrive there), or the content is
    // already on screen at mount.
    const rect = el.getBoundingClientRect();
    if (
      globalThis.matchMedia?.("(prefers-reduced-motion: reduce)").matches ||
      document.hidden ||
      (rect.top < globalThis.innerHeight && rect.bottom > 0)
    ) {
      return;
    }

    el.style.opacity = "0";
    el.style.transform = OFFSET[from];
    if (delay) el.style.transitionDelay = `${delay}ms`;

    const observer = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        el.style.opacity = "";
        el.style.transform = "";
        observer.disconnect();
      }
    }, { rootMargin: "0px 0px -12% 0px", threshold: 0.05 });

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, from]);

  return (
    <div
      ref={ref}
      class={`transition-all duration-700 ease-out ${className}`}
    >
      {children}
    </div>
  );
}
