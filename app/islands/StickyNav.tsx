import { useState, useEffect } from 'preact/hooks';
import DarkModeToggle from "./DarkModeToggle.tsx";

const navLinks = [
  { href: "#top", label: "Top" },
  { href: "#sec_product", label: "Products" },
  { href: "#sec_work", label: "Work" },
  { href: "#sec_company", label: "Company" },
  { href: "#sec_contact", label: "Contact" },
];

export default function StickyNav() {
  const [visible, setVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 250);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      class={`fixed top-0 left-0 right-0 z-50 transition duration-300 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"
      }`}
      style="backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); background: rgba(17, 24, 39, 0.85);"
    >
      {/* Desktop */}
      <div class="hidden md:flex mx-auto max-w-screen-md py-3 flex-row items-center justify-center gap-1">
        {navLinks.map(l => (
          <a href={l.href} class="px-3 py-2 rounded-md text-sm font-medium tracking-wide uppercase text-white hover:bg-white hover:bg-opacity-10 transition duration-200">{l.label}</a>
        ))}
        <DarkModeToggle />
      </div>

      {/* Mobile */}
      <div class="md:hidden flex items-center justify-between px-4 py-3">
        <span class="text-white text-sm font-bold tracking-wide">LOOSEDAYS</span>
        <div class="flex items-center gap-2">
          <DarkModeToggle />
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            class="p-2 rounded-md text-white hover:bg-white hover:bg-opacity-10 transition duration-200"
            aria-label="Menu"
          >
            {menuOpen ? (
              <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>
      {menuOpen && (
        <div class="md:hidden border-t border-white border-opacity-10 pb-3">
          {navLinks.map(l => (
            <a
              href={l.href}
              class="block px-6 py-3 text-sm font-medium tracking-wide uppercase text-white hover:bg-white hover:bg-opacity-10 transition duration-200"
              onClick={() => setMenuOpen(false)}
            >{l.label}</a>
          ))}
        </div>
      )}
    </nav>
  );
}
