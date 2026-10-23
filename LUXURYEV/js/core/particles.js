window.initParticles = function () {
  var canvas = document.getElementById("particles-canvas");
  if (!canvas) return;
  var ctx = canvas.getContext("2d");
  if (!ctx) return;

  var reduce = window.prefersReducedMotion();
  var dpr = Math.min(window.devicePixelRatio || 1, 2);
  var w = 0, h = 0, particles = [];
  var count = reduce ? 20 : window.EV_CONFIG.visuals.particleCount;

  function resize() {
    w = canvas.clientWidth;
    h = canvas.clientHeight;
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function make() {
    return {
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 2.5 + 0.5,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      hue: Math.random() > 0.5 ? 190 : 280,
      alpha: Math.random() * 0.5 + 0.3
    };
  }

  function seed() {
    particles = [];
    for (var i = 0; i < count; i++) particles.push(make());
  }

  function frame() {
    ctx.clearRect(0, 0, w, h);
    particles.forEach(function (p) {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < -10) p.x = w + 10;
      if (p.x > w + 10) p.x = -10;
      if (p.y < -10) p.y = h + 10;
      if (p.y > h + 10) p.y = -10;

      var g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4);
      g.addColorStop(0, "hsla(" + p.hue + ", 100%, 65%, " + p.alpha + ")");
      g.addColorStop(1, "hsla(" + p.hue + ", 100%, 65%, 0)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2);
      ctx.fill();
    });
    if (!document.hidden) requestAnimationFrame(frame);
  }

  window.addEventListener("resize", function () { resize(); seed(); });
  document.addEventListener("visibilitychange", function () {
    if (!document.hidden) requestAnimationFrame(frame);
  });

  resize();
  seed();
  requestAnimationFrame(frame);
};