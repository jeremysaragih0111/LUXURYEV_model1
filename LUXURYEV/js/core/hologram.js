window.initHologramCards = function () {
  if (window.prefersReducedMotion()) return;
  var cards = document.querySelectorAll(".holo-card, .car-card, .gallery-item");
  cards.forEach(function (card) {
    var raf = null;
    card.addEventListener("pointermove", function (e) {
      var r = card.getBoundingClientRect();
      var px = (e.clientX - r.left) / r.width - 0.5;
      var py = (e.clientY - r.top) / r.height - 0.5;
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(function () {
        card.style.transform =
          "perspective(900px) rotateX(" +
          (-py * 8).toFixed(2) +
          "deg) rotateY(" +
          (px * 8).toFixed(2) +
          "deg) translateZ(8px)";
      });
    });
    card.addEventListener("pointerleave", function () {
      if (raf) cancelAnimationFrame(raf);
      card.style.transform = "";
    });
  });
};