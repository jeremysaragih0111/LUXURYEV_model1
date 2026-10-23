window.initThree = function () {
  var canvas = document.getElementById("three-canvas");
  if (!canvas) return;
  if (!window.EV_CONFIG.visuals.enableThree || !window.THREE) {
    var fb = document.getElementById("three-fallback");
    if (fb) fb.hidden = false;
    canvas.style.display = "none";
    return;
  }

  var THREE = window.THREE;
  var reduce = window.prefersReducedMotion();

  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
  camera.position.set(0, 0, 6.5);

  var renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.2;

  scene.add(new THREE.AmbientLight(0x88ccff, 0.5));
  var key = new THREE.PointLight(0x00e5ff, 4, 20);
  key.position.set(3, 3, 4);
  scene.add(key);
  var fill = new THREE.PointLight(0xa855f7, 3, 20);
  fill.position.set(-4, -2, 2);
  scene.add(fill);

  var carGroup = new THREE.Group();

  var bodyGeo = new THREE.BoxGeometry(2.8, 0.7, 1.2);
  var bodyMat = new THREE.MeshPhysicalMaterial({
    color: 0x00e5ff, metalness: 0.9, roughness: 0.15,
    transmission: 0.6, thickness: 1, transparent: true, opacity: 0.85,
    clearcoat: 1, emissive: 0x003a4d, emissiveIntensity: 0.5
  });
  var body = new THREE.Mesh(bodyGeo, bodyMat);
  body.position.y = 0.5;
  carGroup.add(body);

  var cabinGeo = new THREE.BoxGeometry(1.4, 0.6, 1);
  var cabinMat = new THREE.MeshPhysicalMaterial({
    color: 0x6ef0ff, metalness: 0.7, roughness: 0.1,
    transmission: 0.8, transparent: true, opacity: 0.9
  });
  var cabin = new THREE.Mesh(cabinGeo, cabinMat);
  cabin.position.set(-0.1, 1.1, 0);
  carGroup.add(cabin);

  var wheelGeo = new THREE.TorusGeometry(0.32, 0.12, 16, 32);
  var wheelMat = new THREE.MeshStandardMaterial({
    color: 0x0a1428, metalness: 0.9, roughness: 0.3,
    emissive: 0x00e5ff, emissiveIntensity: 0.2
  });
  [[-0.9, 0.35, 0.65], [-0.9, 0.35, -0.65], [0.9, 0.35, 0.65], [0.9, 0.35, -0.65]].forEach(function (p) {
    var w = new THREE.Mesh(wheelGeo, wheelMat);
    w.position.set(p[0], p[1], p[2]);
    w.rotation.y = Math.PI / 2;
    carGroup.add(w);
  });

  var gridHelper = new THREE.GridHelper(20, 40, 0x00e5ff, 0x1a2a4a);
  gridHelper.position.y = -0.1;
  gridHelper.material.transparent = true;
  gridHelper.material.opacity = 0.3;
  scene.add(gridHelper);

  scene.add(carGroup);

  var pointer = { x: 0, y: 0 };
  var smooth = { x: 0, y: 0 };
  window.addEventListener("pointermove", function (e) {
    pointer.x = (e.clientX / window.innerWidth - 0.5) * 2;
    pointer.y = (e.clientY / window.innerHeight - 0.5) * 2;
  }, { passive: true });

  function resize() {
    var w = canvas.clientWidth;
    var h = canvas.clientHeight;
    if (!w || !h) return;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h, false);
  }
  window.addEventListener("resize", resize, { passive: true });
  if (window.ResizeObserver) {
    new ResizeObserver(resize).observe(canvas);
  }

  var raf = null;
  var t0 = performance.now();

  function animate(now) {
    var t = (now - t0) / 1000;
    smooth.x += (pointer.x - smooth.x) * 0.05;
    smooth.y += (pointer.y - smooth.y) * 0.05;
    carGroup.rotation.y = t * 0.4 + smooth.x * 0.5;
    carGroup.rotation.x = Math.sin(t * 0.5) * 0.05 - smooth.y * 0.15;
    carGroup.position.y = Math.sin(t * 1.2) * 0.08;
    renderer.render(scene, camera);
    if (!document.hidden) raf = requestAnimationFrame(animate);
  }
  function start() { t0 = performance.now(); if (!raf) raf = requestAnimationFrame(animate); }
  function stop() { if (raf) { cancelAnimationFrame(raf); raf = null; } }

  document.addEventListener("visibilitychange", function () {
    if (document.hidden) stop(); else start();
  });

  start();
};