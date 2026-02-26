import { useState, useEffect } from 'preact/hooks';

export default function DarkModeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark') ||
      (!('theme' in localStorage) && globalThis.matchMedia('(prefers-color-scheme: dark)').matches);
    setDark(isDark);
    if (isDark) document.documentElement.classList.add('dark');
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
  };

  return (
    <button
      onClick={toggle}
      class="p-2 rounded-md text-sm transition duration-200 hover:bg-gray-200 dark:hover:bg-gray-600"
      aria-label="Toggle dark mode"
      title={dark ? "Light mode" : "Dark mode"}
    >
      {dark ? "\u2600\uFE0F" : "\uD83C\uDF19"}
    </button>
  );
}
