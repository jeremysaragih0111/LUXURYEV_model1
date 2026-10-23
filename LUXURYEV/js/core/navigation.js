window.buildHeader = function (mount) {
  if (!mount) return;
  var brand = window.EV_CONFIG.brand;
  var path = window.location.pathname.split("/").pop() || "index.html";
  if (path === "") path = "index.html";

  var pages = [
    { href: "index.html", label: "Home" },
    { href: "models.html", label: "Models" },
    { href: "features.html", label: "Features" },
    { href: "gallery.html", label: "Gallery" },
    { href: "contact.html", label: "Contact" }
  ];

  var links = pages.map(function (p) {
    var active = p.href === path;
    return '<li><a href="' + p.href + '"' + (active ? ' aria-current="page"' : "") + '>' + p.label + "</a></li>";
  }).join("");

  mount.innerHTML =
    '<header class="site-header" role="banner">' +
      '<a class="brand" href="index.html" aria-label="LUXURYEV — home">' +
        '<span class="brand-mark" aria-hidden="true">⚡</span>' +
        "<span>" + brand.name + '<span class="brand-accent">' + brand.accent + "</span></span>" +
      "</a>" +
      '<nav id="primary-nav" class="primary-nav" aria-label="Primary"><ul>' + links + "</ul></nav>" +
      '<div class="nav-actions">' +
        '<button class="btn-icon" id="theme-toggle" aria-label="Toggle theme">🌙</button>' +
        '<a class="btn" href="contact.html" style="padding:10px 22px; font-size:12px;">Test Drive</a>' +
      "</div>" +
      '<button class="nav-toggle" id="nav-toggle" aria-expanded="false" aria-controls="primary-nav" aria-label="Toggle menu"><span></span><span></span><span></span></button>' +
    "</header>";

  var toggle = document.getElementById("nav-toggle");
  var nav = document.getElementById("primary-nav");
  toggle.addEventListener("click", function () {
    var open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  });
  nav.addEventListener("click", function (e) {
    if (e.target.tagName === "A") {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });
};

window.buildFooter = function (mount) {
  if (!mount) return;
  mount.innerHTML =
    '<footer class="site-footer" role="contentinfo">' +
      "<p>© 2026 <strong>LUXURYEV</strong> — Modern Holographic Showroom</p>" +
      '<p style="margin-top:8px; font-size:11px; opacity:0.6;">Personalize in <code>js/config.js</code></p>' +
    "</footer>";
};