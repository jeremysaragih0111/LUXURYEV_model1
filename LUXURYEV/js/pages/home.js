(function () {
  function init() {
    var brand = window.EV_CONFIG.brand;
    var title = document.getElementById("hero-title");
    if (title) {
      title.innerHTML = 'The Future of <span style="color: var(--cyan);">' + brand.name + brand.accent + "</span>";
    }

    var showcase = document.getElementById("model-showcase");
    if (showcase) {
      showcase.innerHTML = window.EV_CONFIG.models.map(function (m, i) {
        return (
          '<a class="holo-card car-card reveal" href="models.html" data-delay="' + (i % 3) + '">' +
            '<div class="car-image-wrap">' +
              '<img src="' + m.image + '" alt="' + m.name + '" loading="lazy" />' +
              '<span class="car-badge ' + m.badgeClass + '">' + m.badge + "</span>" +
            "</div>" +
            '<div class="car-body">' +
              '<h3 class="car-name">' + m.name + "</h3>" +
              '<p class="car-desc">' + m.desc + "</p>" +
              '<div class="car-stats">' +
                '<div class="car-stat"><p class="label">Range</p><p class="value">' + m.range + "</p></div>" +
                '<div class="car-stat"><p class="label">0-60</p><p class="value">' + m.accel + "</p></div>" +
                '<div class="car-stat"><p class="label">Top</p><p class="value">' + m.topSpeed + "</p></div>" +
              "</div>" +
              '<p style="color:var(--cyan); font-family:var(--font-display); font-size:18px; font-weight:600;">' + m.price + "</p>" +
            "</div>" +
          "</a>"
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