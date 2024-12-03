import { openBlock as C, createElementBlock as H, normalizeStyle as W, renderSlot as k } from "vue";
function F(t, o) {
  var r;
  typeof o < "u" ? r = o : typeof window < "u" ? r = window : typeof self < "u" ? r = self : r = global;
  var a = typeof r.document < "u" && r.document.attachEvent;
  if (!a) {
    var _ = function() {
      var e = r.requestAnimationFrame || r.mozRequestAnimationFrame || r.webkitRequestAnimationFrame || function(i) {
        return r.setTimeout(i, 20);
      };
      return function(i) {
        return e(i);
      };
    }(), d = function() {
      var e = r.cancelAnimationFrame || r.mozCancelAnimationFrame || r.webkitCancelAnimationFrame || r.clearTimeout;
      return function(i) {
        return e(i);
      };
    }(), h = function(e) {
      var i = e.__resizeTriggers__, s = i.firstElementChild, n = i.lastElementChild, c = s.firstElementChild;
      n.scrollLeft = n.scrollWidth, n.scrollTop = n.scrollHeight, c.style.width = s.offsetWidth + 1 + "px", c.style.height = s.offsetHeight + 1 + "px", s.scrollLeft = s.scrollWidth, s.scrollTop = s.scrollHeight;
    }, g = function(e) {
      return e.offsetWidth !== e.__resizeLast__.width || e.offsetHeight !== e.__resizeLast__.height;
    }, u = function(e) {
      if (!(e.target.className && typeof e.target.className.indexOf == "function" && e.target.className.indexOf("contract-trigger") < 0 && e.target.className.indexOf("expand-trigger") < 0)) {
        var i = this;
        h(this), this.__resizeRAF__ && d(this.__resizeRAF__), this.__resizeRAF__ = _(function() {
          g(i) && (i.__resizeLast__.width = i.offsetWidth, i.__resizeLast__.height = i.offsetHeight, i.__resizeListeners__.forEach(function(s) {
            s.call(i, e);
          }));
        });
      }
    }, f = !1, z = "", p = "animationstart", v = "Webkit Moz O ms".split(" "), y = "webkitAnimationStart animationstart oAnimationStart MSAnimationStart".split(
      " "
    ), w = "", E = r.document.createElement("fakeelement");
    if (E.style.animationName !== void 0 && (f = !0), f === !1) {
      for (var l = 0; l < v.length; l++)
        if (E.style[v[l] + "AnimationName"] !== void 0) {
          w = v[l], z = "-" + w.toLowerCase() + "-", p = y[l], f = !0;
          break;
        }
    }
    var m = "resizeanim", N = "@" + z + "keyframes " + m + " { from { opacity: 0; } to { opacity: 0; } } ", b = z + "animation: 1ms " + m + "; ";
  }
  var R = function(e) {
    if (!e.getElementById("detectElementResize")) {
      var i = (N || "") + ".resize-triggers { " + (b || "") + 'visibility: hidden; opacity: 0; } .resize-triggers, .resize-triggers > div, .contract-trigger:before { content: " "; display: block; position: absolute; top: 0; left: 0; height: 100%; width: 100%; overflow: hidden; z-index: -1; } .resize-triggers > div { background: #eee; overflow: auto; } .contract-trigger:before { width: 200%; height: 200%; }', s = e.head || e.getElementsByTagName("head")[0], n = e.createElement("style");
      n.id = "detectElementResize", n.type = "text/css", t != null && n.setAttribute("nonce", t), n.styleSheet ? n.styleSheet.cssText = i : n.appendChild(e.createTextNode(i)), s.appendChild(n);
    }
  }, T = function(e, i) {
    if (a)
      e.attachEvent("onresize", i);
    else {
      if (!e.__resizeTriggers__) {
        var s = e.ownerDocument, n = r.getComputedStyle(e);
        n && n.position === "static" && (e.style.position = "relative"), R(s), e.__resizeLast__ = {}, e.__resizeListeners__ = [], (e.__resizeTriggers__ = s.createElement("div")).className = "resize-triggers";
        var c = s.createElement("div");
        c.className = "expand-trigger", c.appendChild(s.createElement("div"));
        var L = s.createElement("div");
        L.className = "contract-trigger", e.__resizeTriggers__.appendChild(c), e.__resizeTriggers__.appendChild(L), e.appendChild(e.__resizeTriggers__), h(e), e.addEventListener("scroll", u, !0), p && (e.__resizeTriggers__.__animationListener__ = function(A) {
          A.animationName === m && h(e);
        }, e.__resizeTriggers__.addEventListener(
          p,
          e.__resizeTriggers__.__animationListener__
        ));
      }
      e.__resizeListeners__.push(i);
    }
  }, S = function(e, i) {
    if (a)
      e.detachEvent("onresize", i);
    else if (e.__resizeListeners__.splice(
      e.__resizeListeners__.indexOf(i),
      1
    ), !e.__resizeListeners__.length) {
      e.removeEventListener("scroll", u, !0), e.__resizeTriggers__.__animationListener__ && (e.__resizeTriggers__.removeEventListener(
        p,
        e.__resizeTriggers__.__animationListener__
      ), e.__resizeTriggers__.__animationListener__ = null);
      try {
        e.__resizeTriggers__ = !e.removeChild(
          e.__resizeTriggers__
        );
      } catch {
      }
    }
  };
  return {
    addResizeListener: T,
    removeResizeListener: S
  };
}
const x = (t, o) => {
  const r = t.__vccOpts || t;
  for (const [a, _] of o)
    r[a] = _;
  return r;
}, B = {
  name: "AutoSizer",
  props: {
    /** Default height to use for initial render; useful for SSR */
    defaultHeight: Number,
    /** Default width to use for initial render; useful for SSR */
    defaultWidth: Number,
    /** Disable dynamic :height property */
    disableHeight: {
      type: Boolean,
      default: !1
    },
    /** Disable dynamic :width property */
    disableWidth: {
      type: Boolean,
      default: !1
    },
    /** Nonce of the inlined stylesheet for Content Security Policy */
    nonce: String,
    /** Callback to be invoked on-resize */
    onResize: {
      type: Function,
      default: () => {
      }
    }
  },
  data() {
    return {
      height: this.defaultHeight || 0,
      width: this.defaultWidth || 0
    };
  },
  computed: {
    outerStyle: function() {
      const t = { overflow: "visible" };
      return this.disableHeight || (t.height = 0), this.disableWidth || (t.width = 0), t;
    },
    childParams: function() {
      const t = {};
      return this.disableHeight || (t.height = this.height), this.disableWidth || (t.width = this.width), t;
    }
  },
  mounted() {
    const t = this.$refs.autoSizer;
    t && t.parentNode && t.parentElement.ownerDocument && t.parentNode.ownerDocument.defaultView && t.parentNode instanceof t.parentNode.ownerDocument.defaultView.HTMLElement && (this._parentNode = t.parentNode, this._window = t.parentNode.ownerDocument.defaultView, this._detectElementResize = F(this.nonce, this._window), this._detectElementResize.addResizeListener(this._parentNode, this._onResize), this._onResize());
  },
  beforeDestroy() {
    this._detectElementResize && this._parentNode && this._detectElementResize.removeResizeListener(
      this._parentNode,
      this._onResize
    );
  },
  methods: {
    _onResize() {
      if (this._parentNode) {
        const t = this._parentNode.offsetHeight || 0, o = this._parentNode.offsetWidth || 0, a = (this._window || window).getComputedStyle(this._parentNode) || {}, _ = parseInt(a.paddingLeft, 10) || 0, d = parseInt(a.paddingRight, 10) || 0, h = parseInt(a.paddingTop, 10) || 0, g = parseInt(a.paddingBottom, 10) || 0, u = t - h - g, f = o - _ - d;
        (!this._disableHeight && this.height !== u || !this._disableWidth && this.width !== f) && (this.height = t - h - g, this.width = o - _ - d, this.onResize({ height: t, width: o }));
      }
    }
  }
};
function D(t, o, r, a, _, d) {
  return C(), H("div", {
    ref: "autoSizer",
    style: W({ ...d.outerStyle })
  }, [
    k(t.$slots, "default", { size: d.childParams })
  ], 4);
}
const $ = /* @__PURE__ */ x(B, [["render", D]]);
export {
  $ as AutoSizer
};
