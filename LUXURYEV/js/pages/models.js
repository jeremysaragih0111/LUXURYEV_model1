(function () {
  function init() {
    var grid = document.getElementById("models-grid");
    if (grid) {
      grid.innerHTML = window.EV_CONFIG.models.map(function (m, i) {
        return (
          '<article class="holo-card car-card reveal" data-delay="' + (i % 3) + '">' +
            '<div class="car-image-wrap">' +
              '<img src="' + m.image + '" alt="' + m.name + '" loading="lazy" />' +
              '<span class="car-badge ' + m.badgeClass + '">' + m.badge + "</span>" +
              '<div class="scanline"></div>' +
            "</div>" +
            '<div class="car-body">' +
              '<h2 class="car-name">' + m.name + "</h2>" +
              '<p class="car-desc">' + m.desc + "</p>" +
              '<div class="car-stats">' +
                '<div class="car-stat"><p class="label">Range</p><p class="value">' + m.range + "</p></div>" +
                '<div class="car-stat"><p class="label">0-60</p><p class="value">' + m.accel + "</p></div>" +
                '<div class="car-stat"><p class="label">Top</p><p class="value">' + m.topSpeed + "</p></div>" +
              "</div>" +
              '<p style="color:var(--cyan); font-family:var(--font-display); font-size:22px; font-weight:700;">' + m.price + "</p>" +
              '<div class="car-actions">' +
                '<a class="btn" href="contact.html">Test Drive</a>' +
              "</div>" +
            "</div>" +
          "</article>"
        );
      }).join("");
    }

    if (document.getElementById("three-canvas")) {
      window.initThree();
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();