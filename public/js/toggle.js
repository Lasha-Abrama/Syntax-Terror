(() => {
  // localStorage key for persisting theme preference
  const STORAGE_KEY = "theme";
  const body = document.body;
  const toggle = document.getElementById("themeToggle");

  if (!toggle) return;

  // Apply theme to DOM + accessibility state
  const setTheme = (theme) => {
    const isLight = theme === "light";
    body.classList.toggle("theme-light", isLight);
    toggle.setAttribute("aria-pressed", isLight ? "true" : "false");
  };

  // Restore saved theme, or fall back to system preference
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === "light" || stored === "dark") {
    setTheme(stored);
  } else {
    const prefersLight =
      window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches;
    setTheme(prefersLight ? "light" : "dark");
  }

  // Toggle and persist
  toggle.addEventListener("click", () => {
    const next = body.classList.contains("theme-light") ? "dark" : "light";
    localStorage.setItem(STORAGE_KEY, next);
    setTheme(next);
  });
})();
