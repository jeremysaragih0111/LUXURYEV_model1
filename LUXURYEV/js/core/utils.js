window.$ = function (sel, root) { return (root || document).querySelector(sel); };
window.$$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };

window.prefersReducedMotion = function () {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

window.el = function (tag, attrs, children) {
  var node = document.createElement(tag);
  attrs = attrs || {};
  children = children || [];
  Object.keys(attrs).forEach(function (k) {
    var v = attrs[k];
    if (k === "class") node.className = v;
    else if (k === "dataset") Object.assign(node.dataset, v);
    else if (k === "style" && typeof v === "object") Object.assign(node.style, v);
    else if (k.indexOf("on") === 0 && typeof v === "function")
      node.addEventListener(k.slice(2).toLowerCase(), v);
    else if (v === true) node.setAttribute(k, "");
    else if (v !== false && v != null) node.setAttribute(k, v);
  });
  [].concat(children).forEach(function (c) {
    if (c == null) return;
    node.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
  });
  return node;
};

window.imageFallback = function (imgEl, fallbackHTML) {
  imgEl.addEventListener("error", function () {
    imgEl.style.display = "none";
    var wrap = imgEl.parentElement;
    if (wrap && !wrap.querySelector(".img-fallback")) {
      var div = document.createElement("div");
      div.className = "img-fallback";
      div.innerHTML = fallbackHTML;
      wrap.appendChild(div);
    }
  }, { once: true });
};