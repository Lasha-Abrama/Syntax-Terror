(() => {
  const STORAGE_KEY = "theme";
  const body = document.body;
  const toggle = document.getElementById("themeToggle");

  if (!toggle) return;

  const setTheme = (theme) => {
    const isLight = theme === "light";
    body.classList.toggle("theme-light", isLight);
    toggle.setAttribute("aria-pressed", isLight ? "true" : "false");
  };

  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === "light" || stored === "dark") {
    setTheme(stored);
  } else {
    const prefersLight =
      window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches;
    setTheme(prefersLight ? "light" : "dark");
  }

  toggle.addEventListener("click", () => {
    const next = body.classList.contains("theme-light") ? "dark" : "light";
    localStorage.setItem(STORAGE_KEY, next);
    setTheme(next);
  });
})();
