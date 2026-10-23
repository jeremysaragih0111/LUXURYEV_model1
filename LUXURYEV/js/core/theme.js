(function () {
  var KEY = "luxuryEv.theme";
  var saved = localStorage.getItem(KEY);
  var prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;

  if (saved === "light" || (!saved && prefersLight)) {
    document.documentElement.classList.add("light-theme");
  }

  document.addEventListener("click", function (e) {
    var btn = e.target.closest("#theme-toggle");
    if (!btn) return;
    var isLight = document.documentElement.classList.toggle("light-theme");
    btn.textContent = isLight ? "☀️" : "🌙";
    localStorage.setItem(KEY, isLight ? "light" : "dark");
  });

  var btn = document.getElementById("theme-toggle");
  if (btn) {
    btn.textContent = document.documentElement.classList.contains("light-theme") ? "☀️" : "🌙";
  }
})();