(function () {
  var KEY = "portfolio-theme";
  var root = document.documentElement;

  function preferred() {
    try {
      var saved = localStorage.getItem(KEY);
      if (saved === "dark" || saved === "light") return saved;
    } catch (e) {}
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  function syncLogos(theme) {
    document.querySelectorAll('.topnav .logo img, img[data-theme-logo]').forEach(function (img) {
      if (!img.dataset.darkSrc) {
        img.dataset.darkSrc = "images/logo-light.png";
      }
      if (!img.dataset.lightSrc) {
        img.dataset.lightSrc = img.getAttribute("src") || "images/logo.png";
        if (img.dataset.lightSrc.indexOf("logo-light") !== -1) {
          img.dataset.lightSrc = "images/logo.png";
        }
      }
      img.src = theme === "dark" ? img.dataset.darkSrc : img.dataset.lightSrc;
    });
  }

  function syncToggle(theme) {
    document.querySelectorAll(".theme-toggle").forEach(function (btn) {
      btn.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
      btn.setAttribute(
        "aria-label",
        theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
      );
    });
  }

  function apply(theme) {
    root.setAttribute("data-theme", theme);
    try {
      localStorage.setItem(KEY, theme);
    } catch (e) {}
    syncLogos(theme);
    syncToggle(theme);
  }

  window.__setPortfolioTheme = apply;
  window.__togglePortfolioTheme = function () {
    apply(root.getAttribute("data-theme") === "dark" ? "light" : "dark");
  };

  apply(preferred());

  document.addEventListener("DOMContentLoaded", function () {
    apply(root.getAttribute("data-theme") || preferred());
    document.querySelectorAll(".theme-toggle").forEach(function (btn) {
      btn.addEventListener("click", function () {
        window.__togglePortfolioTheme();
      });
    });
  });
})();
