export function themeToggler() {

  // Get the theme toggle button and body element
  const themeToggle = document.getElementById("theme-toggle");
  const darkBtn = document.getElementById("theme-toggle-dark-icon");
  const lightBtn = document.getElementById("theme-toggle-light-icon");

  // Check the current theme from local storage (or use a default)
  const currentTheme = localStorage.getItem("theme") || "dark";
  document.documentElement.classList.add(currentTheme);

  if (!darkBtn || !lightBtn || !themeToggle) return

  if (currentTheme == "dark") {
    darkBtn.classList.remove("hidden");
    lightBtn.classList.add("hidden");
  } else {
    lightBtn.classList.remove("hidden");
    darkBtn.classList.add("hidden");
  }
}