export function themeToggler() {
  // Get the theme toggle button and body element
  const themeToggle = document.getElementById("theme-toggle");
  const darkBtn = document.getElementById("theme-toggle-dark-icon");
  const lightBtn = document.getElementById("theme-toggle-light-icon");
  const lightLogo = document.querySelector(".lightLogo");
  const darkLogo = document.querySelector(".darkLogo");

  // Check the current theme from local storage (or use a default)
  const currentTheme = localStorage.getItem("theme") || "dark";
  document.documentElement.classList.add(currentTheme);
  if (!darkBtn || !lightBtn || !themeToggle) return

  if (currentTheme == "dark") {
    darkBtn.classList.remove("hidden");
    lightBtn.classList.add("hidden");
    // darkLogo.classList.remove("hidden");
    // lightLogo.classList.add("hidden");
  } else {
    lightBtn.classList.remove("hidden");
    darkBtn.classList.add("hidden");
    // lightLogo.classList.remove("hidden");
    // darkLogo.classList.add("hidden");
  }

  // Listen for clicks on the theme toggle button
  themeToggle.addEventListener("click", () => {
    // Toggle between "light" and "dark" themes
    if (document.documentElement.classList.contains("light")) {
      document.documentElement.classList.replace("light", "dark");
      darkBtn.classList.remove("hidden");
      lightBtn.classList.add("hidden");
      // darkLogo.classList.remove("hidden");
      // lightLogo.classList.add("hidden");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.replace("dark", "light");
      lightBtn.classList.remove("hidden");
      darkBtn.classList.add("hidden");
      // lightLogo.classList.remove("hidden");
      // darkLogo.classList.add("hidden");
      localStorage.setItem("theme", "light");
    }
  });
}