import { useEffect, useState } from "preact/hooks";
import { navLinks } from "../../content.tsx";

interface Props {
  /** Wordmark shown on the left. */
  brand?: string;
}

/**
 * Fixed header: transparent over the hero, frosted once the page scrolls,
 * with the current section underlined.
 */
export default function NavBar({ brand = "LOOSEDAYS Co., Ltd." }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#top");

  useEffect(() => {
    const onScroll = () => setScrolled(globalThis.scrollY > 24);
    onScroll();
    globalThis.addEventListener("scroll", onScroll, { passive: true });
    return () => globalThis.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = navLinks
      .map((l) => document.getElementById(l.href.slice(1)))
      .filter((el): el is HTMLElement => !!el);
    if (!sections.length) return;

    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActive("#" + visible.target.id);
    }, { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.25, 0.5, 1] });

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <header
      class={`fixed inset-x-0 top-0 z-50 backdrop-blur-xl transition-all duration-300 ${
        scrolled
          ? "border-b border-white/10 bg-[#05070f]/80 shadow-lg shadow-black/5 supports-[backdrop-filter]:bg-[#05070f]/55"
          : "border-b border-transparent"
      }`}
    >
      <div class="mx-auto flex max-w-6xl items-center justify-between px-5 py-3 md:px-8">
        <a
          href="#top"
          class="text-xs font-bold tracking-[0.16em] text-white sm:text-sm sm:tracking-[0.2em]"
        >
          {brand}
        </a>

        <nav class="hidden items-center gap-1 md:flex">
          {navLinks.map((l) => {
            const on = active === l.href;
            return (
              <a
                href={l.href}
                class={`relative px-3 py-2 text-xs font-medium uppercase tracking-[0.14em] transition-colors duration-200 ${
                  on ? "text-white" : "text-slate-300 hover:text-white"
                }`}
              >
                {l.label}
                <span
                  class={`absolute inset-x-3 -bottom-0.5 h-px origin-left bg-gradient-to-r from-sky-400 to-indigo-400 transition-transform duration-300 ${
                    on ? "scale-x-100" : "scale-x-0"
                  }`}
                />
              </a>
            );
          })}
        </nav>

        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
          aria-expanded={open}
          class="rounded-md p-2 text-slate-200 transition-colors duration-200 hover:bg-white/10 md:hidden"
        >
          <svg
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="1.8"
          >
            <path
              stroke-linecap="round"
              d={open ? "M6 18 18 6M6 6l12 12" : "M4 7h16M4 12h16M4 17h16"}
            />
          </svg>
        </button>
      </div>

      {open && (
        <div class="border-t border-white/10 bg-[#05070f]/95 md:hidden">
          {navLinks.map((l) => (
            <a
              href={l.href}
              onClick={() => setOpen(false)}
              class={`block px-6 py-3.5 text-xs font-medium uppercase tracking-[0.18em] ${
                active === l.href ? "text-white" : "text-slate-300"
              }`}
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
