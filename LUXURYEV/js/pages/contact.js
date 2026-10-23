(function () {
  function init() {
    var grid = document.getElementById("dealers-grid");
    if (grid) {
      grid.innerHTML = window.EV_CONFIG.dealers.map(function (d, i) {
        return (
          '<article class="holo-card dealer-card reveal" data-delay="' + (i % 3) + '">' +
            '<div class="dealer-icon">📍</div>' +
            '<h3 class="dealer-name">' + d.city + "</h3>" +
            '<div class="dealer-info">' +
              '<div class="row"><span>🏢</span> ' + d.address + "</div>" +
              '<div class="row"><span>📞</span> ' + d.phone + "</div>" +
              '<div class="row"><span>🕒</span> ' + d.hours + "</div>" +
            "</div>" +
            '<a class="btn" href="#" style="margin-top: 12px; font-size: 12px;">Get Directions</a>' +
          "</article>"
        );
      }).join("");
    }

    var form = document.getElementById("contact-form");
    if (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var btn = form.querySelector("button[type='submit']");
        if (btn) {
          btn.textContent = "✓ Message Sent!";
          btn.disabled = true;
          setTimeout(function () {
            btn.textContent = "Send Message";
            btn.disabled = false;
            form.reset();
          }, 2500);
        }
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();