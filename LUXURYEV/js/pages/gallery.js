(function () {
  var items = [];
  var index = 0;
  var lastFocus = null;

  function openLightbox(i) {
    index = (i + items.length) % items.length;
    var lb = document.getElementById("lightbox");
    var media = document.getElementById("lb-media");
    var cap = document.getElementById("lb-caption");
    var it = items[index];
    media.innerHTML = '<img src="' + it.src + '" alt="' + it.caption + '" />';
    cap.textContent = it.caption;
    lb.classList.add("is-open");
    lastFocus = document.activeElement;
    document.getElementById("lb-close").focus();
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    document.getElementById("lightbox").classList.remove("is-open");
    document.body.style.overflow = "";
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  function init() {
    var grid = document.getElementById("gallery-grid");
    if (!grid) return;
    items = window.EV_CONFIG.gallery;

    grid.innerHTML = items.map(function (g, i) {
      return (
        '<figure class="gallery-item reveal" data-index="' + i + '" tabindex="0" role="button" aria-label="Open ' + g.caption + '">' +
          '<img src="' + g.src + '" alt="' + g.caption + '" loading="lazy" />' +
          '<figcaption class="gallery-caption">' + g.caption + "</figcaption>" +
        "</figure>"
      );
    }).join("");

    grid.querySelectorAll(".gallery-item").forEach(function (item) {
      var i = parseInt(item.dataset.index, 10);
      item.addEventListener("click", function () { openLightbox(i); });
      item.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openLightbox(i);
        }
      });
    });

    var lb = document.getElementById("lightbox");
    lb.addEventListener("click", function (e) {
      if (e.target === lb) closeLightbox();
    });
    document.getElementById("lb-close").addEventListener("click", closeLightbox);
    document.getElementById("lb-prev").addEventListener("click", function () { openLightbox(index - 1); });
    document.getElementById("lb-next").addEventListener("click", function () { openLightbox(index + 1); });

    document.addEventListener("keydown", function (e) {
      if (!lb.classList.contains("is-open")) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") openLightbox(index - 1);
      if (e.key === "ArrowRight") openLightbox(index + 1);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();