try {
  const storedTheme = localStorage.getItem("theme");
  const prefersDark = globalThis.matchMedia(
    "(prefers-color-scheme: dark)",
  ).matches;
  const isDark = storedTheme === "dark" ||
    (storedTheme === null && prefersDark);
  document.documentElement.classList.toggle("dark", isDark);
} catch {
  // Keep the default light theme when browser storage is unavailable.
}
