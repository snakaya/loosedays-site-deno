import { useEffect, useState } from "preact/hooks";
import { navLinks } from "../../content.tsx";

type Variant = "a" | "b" | "c";

const skin = {
  a: {
    shell:
      "border-b border-white/10 bg-[#05070f]/80 supports-[backdrop-filter]:bg-[#05070f]/55",
    brand: "text-white",
    link: "text-slate-300 hover:text-white",
    active: "text-white",
    marker: "bg-gradient-to-r from-sky-400 to-indigo-400",
    button: "text-slate-200 hover:bg-white/10",
    panel: "border-t border-white/10 bg-[#05070f]/95",
  },
  b: {
    shell:
      "border-b border-black/5 bg-white/70 supports-[backdrop-filter]:bg-white/45 dark:border-white/10 dark:bg-[#0b0b16]/70",
    brand: "text-slate-900 dark:text-white",
    link:
      "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white",
    active: "text-slate-900 dark:text-white",
    marker: "bg-slate-900 dark:bg-white",
    button:
      "text-slate-600 hover:bg-black/5 dark:text-slate-300 dark:hover:bg-white/10",
    panel:
      "border-t border-black/5 bg-white/95 dark:border-white/10 dark:bg-[#0b0b16]/95",
  },
  c: {
    shell: "border-b border-cyan-400/20 bg-[#03060c]/85",
    brand: "text-cyan-300",
    link: "text-slate-400 hover:text-cyan-300",
    active: "text-cyan-300",
    marker: "bg-cyan-400",
    button: "text-slate-300 hover:bg-cyan-400/10",
    panel: "border-t border-cyan-400/20 bg-[#03060c]/97",
  },
} satisfies Record<Variant, Record<string, string>>;

interface Props {
  variant: Variant;
  /** Small wordmark shown on the left. */
  brand?: string;
  /** Proposal B is the only skin with a light mode worth toggling. */
  themeToggle?: boolean;
}

export default function NavBar(
  { variant, brand = "LOOSEDAYS Co., Ltd.", themeToggle = false }: Props,
) {
  const s = skin[variant];
  const mono = variant === "c" ? "font-mono" : "";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#top");
  const [dark, setDark] = useState(true);

  useEffect(() => {
    const onScroll = () => setScrolled(globalThis.scrollY > 24);
    onScroll();
    globalThis.addEventListener("scroll", onScroll, { passive: true });
    return () => globalThis.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  useEffect(() => {
    const ids = navLinks.map((l) => l.href.slice(1));
    const sections = ids
      .map((id) => document.getElementById(id))
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

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch { /* private mode */ }
  };

  return (
    <header
      class={`fixed inset-x-0 top-0 z-50 transition-all duration-300 backdrop-blur-xl ${
        scrolled
          ? `${s.shell} shadow-lg shadow-black/5`
          : "border-b border-transparent"
      }`}
    >
      <div class="mx-auto flex max-w-6xl items-center justify-between px-5 py-3 md:px-8">
        <a
          href="#top"
          class={`text-xs font-bold tracking-[0.16em] sm:text-sm sm:tracking-[0.2em] ${s.brand} ${mono}`}
        >
          {brand}
        </a>

        <nav class="hidden items-center gap-1 md:flex">
          {navLinks.map((l) => {
            const on = active === l.href;
            return (
              <a
                href={l.href}
                class={`relative px-3 py-2 text-xs font-medium uppercase tracking-[0.14em] transition-colors duration-200 ${mono} ${
                  on ? s.active : s.link
                }`}
              >
                {l.label}
                <span
                  class={`absolute inset-x-3 -bottom-0.5 h-px origin-left transition-transform duration-300 ${s.marker} ${
                    on ? "scale-x-100" : "scale-x-0"
                  }`}
                />
              </a>
            );
          })}
          {themeToggle && (
            <button
              type="button"
              onClick={toggleTheme}
              aria-label="Toggle color theme"
              class={`ml-2 rounded-md p-2 text-sm transition-colors duration-200 ${s.button}`}
            >
              {dark ? "☀" : "☾"}
            </button>
          )}
        </nav>

        <div class="flex items-center gap-1 md:hidden">
          {themeToggle && (
            <button
              type="button"
              onClick={toggleTheme}
              aria-label="Toggle color theme"
              class={`rounded-md p-2 text-sm transition-colors duration-200 ${s.button}`}
            >
              {dark ? "☀" : "☾"}
            </button>
          )}
          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
            aria-expanded={open}
            class={`rounded-md p-2 transition-colors duration-200 ${s.button}`}
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
      </div>

      {open && (
        <div class={`md:hidden ${s.panel}`}>
          {navLinks.map((l) => (
            <a
              href={l.href}
              onClick={() => setOpen(false)}
              class={`block px-6 py-3.5 text-xs font-medium uppercase tracking-[0.18em] ${mono} ${
                active === l.href ? s.active : s.link
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
