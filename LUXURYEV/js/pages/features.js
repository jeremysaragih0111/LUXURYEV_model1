(function () {
  function init() {
    var grid = document.getElementById("features-grid");
    if (!grid) return;
    grid.innerHTML = window.EV_CONFIG.features.map(function (f, i) {
      return (
        '<article class="holo-card reveal" data-delay="' + (i % 4) + '" style="padding: 32px;">' +
          '<div class="feature-icon" style="font-size: 32px;">' + f.icon + "</div>" +
          '<h3 class="title" style="font-size: 22px; margin-bottom: 10px;">' + f.title + "</h3>" +
          '<p class="text-muted" style="font-size: 14px;">' + f.desc + "</p>" +
        "</article>"
      );
    }).join("");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();