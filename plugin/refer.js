function handleRecaptcha() {
    $(".myForm button").removeAttr("disabled")
}

function handleExpiredRecaptcha() {
    $(".myForm button").attr("disabled", "disabled")
}

function preview(e) {
    e.play()
}

function pause(e) {
    e.pause()
}

function playFrom(e) {
    media.currentTime(e), media.play()
}
if (function(e, t) {
        "object" == typeof module && "object" == typeof module.exports ? module.exports = e.document ? t(e, !0) : function(e) {
            if (!e.document) throw new Error("jQuery requires a window with a document");
            return t(e)
        } : t(e)
    }("undefined" != typeof window ? window : this, function(e, t) {
        function n(e) {
            var t = !!e && "length" in e && e.length,
                n = fe.type(e);
            return "function" !== n && !fe.isWindow(e) && ("array" === n || 0 === t || "number" == typeof t && t > 0 && t - 1 in e)
        }

        function i(e, t, n) {
            if (fe.isFunction(t)) return fe.grep(e, function(e, i) {
                return !!t.call(e, i, e) !== n
            });
            if (t.nodeType) return fe.grep(e, function(e) {
                return e === t !== n
            });
            if ("string" == typeof t) {
                if (Se.test(t)) return fe.filter(t, e, n);
                t = fe.filter(t, e)
            }
            return fe.grep(e, function(e) {
                return fe.inArray(e, t) > -1 !== n
            })
        }

        function o(e, t) {
            do {
                e = e[t]
            } while (e && 1 !== e.nodeType);
            return e
        }

        function r(e) {
            var t = {};
            return fe.each(e.match(Ee) || [], function(e, n) {
                t[n] = !0
            }), t
        }

        function s() {
            ie.addEventListener ? (ie.removeEventListener("DOMContentLoaded", a), e.removeEventListener("load", a)) : (ie.detachEvent("onreadystatechange", a), e.detachEvent("onload", a))
        }

        function a() {
            (ie.addEventListener || "load" === e.event.type || "complete" === ie.readyState) && (s(), fe.ready())
        }

        function l(e, t, n) {
            if (n === undefined && 1 === e.nodeType) {
                var i = "data-" + t.replace(Ie, "-$1").toLowerCase();
                if ("string" == typeof(n = e.getAttribute(i))) {
                    try {
                        n = "true" === n || "false" !== n && ("null" === n ? null : +n + "" === n ? +n : _e.test(n) ? fe.parseJSON(n) : n)
                    } catch (o) {}
                    fe.data(e, t, n)
                } else n = undefined
            }
            return n
        }

        function u(e) {
            var t;
            for (t in e)
                if (("data" !== t || !fe.isEmptyObject(e[t])) && "toJSON" !== t) return !1;
            return !0
        }

        function c(e, t, n, i) {
            if (Ne(e)) {
                var o, r, s = fe.expando,
                    a = e.nodeType,
                    l = a ? fe.cache : e,
                    u = a ? e[s] : e[s] && s;
                if (u && l[u] && (i || l[u].data) || n !== undefined || "string" != typeof t) return u || (u = a ? e[s] = ne.pop() || fe.guid++ : s), l[u] || (l[u] = a ? {} : {
                    toJSON: fe.noop
                }), "object" != typeof t && "function" != typeof t || (i ? l[u] = fe.extend(l[u], t) : l[u].data = fe.extend(l[u].data, t)), r = l[u], i || (r.data || (r.data = {}), r = r.data), n !== undefined && (r[fe.camelCase(t)] = n), "string" == typeof t ? null == (o = r[t]) && (o = r[fe.camelCase(t)]) : o = r, o
            }
        }

        function d(e, t, n) {
            if (Ne(e)) {
                var i, o, r = e.nodeType,
                    s = r ? fe.cache : e,
                    a = r ? e[fe.expando] : fe.expando;
                if (s[a]) {
                    if (t && (i = n ? s[a] : s[a].data)) {
                        o = (t = fe.isArray(t) ? t.concat(fe.map(t, fe.camelCase)) : t in i ? [t] : (t = fe.camelCase(t)) in i ? [t] : t.split(" ")).length;
                        for (; o--;) delete i[t[o]];
                        if (n ? !u(i) : !fe.isEmptyObject(i)) return
                    }(n || (delete s[a].data, u(s[a]))) && (r ? fe.cleanData([e], !0) : de.deleteExpando || s != s.window ? delete s[a] : s[a] = undefined)
                }
            }
        }

        function p(e, t, n, i) {
            var o, r = 1,
                s = 20,
                a = i ? function() {
                    return i.cur()
                } : function() {
                    return fe.css(e, t, "")
                },
                l = a(),
                u = n && n[3] || (fe.cssNumber[t] ? "" : "px"),
                c = (fe.cssNumber[t] || "px" !== u && +l) && ze.exec(fe.css(e, t));
            if (c && c[3] !== u) {
                u = u || c[3], n = n || [], c = +l || 1;
                do {
                    c /= r = r || ".5", fe.style(e, t, c + u)
                } while (r !== (r = a() / l) && 1 !== r && --s)
            }
            return n && (c = +c || +l || 0, o = n[1] ? c + (n[1] + 1) * n[2] : +n[2], i && (i.unit = u, i.start = c, i.end = o)), o
        }

        function f(e) {
            var t = Ge.split("|"),
                n = e.createDocumentFragment();
            if (n.createElement)
                for (; t.length;) n.createElement(t.pop());
            return n
        }

        function h(e, t) {
            var n, i, o = 0,
                r = "undefined" != typeof e.getElementsByTagName ? e.getElementsByTagName(t || "*") : "undefined" != typeof e.querySelectorAll ? e.querySelectorAll(t || "*") : undefined;
            if (!r)
                for (r = [], n = e.childNodes || e; null != (i = n[o]); o++) !t || fe.nodeName(i, t) ? r.push(i) : fe.merge(r, h(i, t));
            return t === undefined || t && fe.nodeName(e, t) ? fe.merge([e], r) : r
        }

        function g(e, t) {
            for (var n, i = 0; null != (n = e[i]); i++) fe._data(n, "globalEval", !t || fe._data(t[i], "globalEval"))
        }

        function m(e) {
            We.test(e.type) && (e.defaultChecked = e.checked)
        }

        function y(e, t, n, i, o) {
            for (var r, s, a, l, u, c, d, p = e.length, y = f(t), v = [], w = 0; w < p; w++)
                if ((s = e[w]) || 0 === s)
                    if ("object" === fe.type(s)) fe.merge(v, s.nodeType ? [s] : s);
                    else if (Ze.test(s)) {
                for (l = l || y.appendChild(t.createElement("div")), u = (qe.exec(s) || ["", ""])[1].toLowerCase(), d = Ue[u] || Ue._default, l.innerHTML = d[1] + fe.htmlPrefilter(s) + d[2], r = d[0]; r--;) l = l.lastChild;
                if (!de.leadingWhitespace && Qe.test(s) && v.push(t.createTextNode(Qe.exec(s)[0])), !de.tbody)
                    for (r = (s = "table" !== u || Ve.test(s) ? "<table>" !== d[1] || Ve.test(s) ? 0 : l : l.firstChild) && s.childNodes.length; r--;) fe.nodeName(c = s.childNodes[r], "tbody") && !c.childNodes.length && s.removeChild(c);
                for (fe.merge(v, l.childNodes), l.textContent = ""; l.firstChild;) l.removeChild(l.firstChild);
                l = y.lastChild
            } else v.push(t.createTextNode(s));
            for (l && y.removeChild(l), de.appendChecked || fe.grep(h(v, "input"), m), w = 0; s = v[w++];)
                if (i && fe.inArray(s, i) > -1) o && o.push(s);
                else if (a = fe.contains(s.ownerDocument, s), l = h(y.appendChild(s), "script"), a && g(l), n)
                for (r = 0; s = l[r++];) Ye.test(s.type || "") && n.push(s);
            return l = null, y
        }

        function v() {
            return !0
        }

        function w() {
            return !1
        }

        function b() {
            try {
                return ie.activeElement
            } catch (e) {}
        }

        function x(e, t, n, i, o, r) {
            var s, a;
            if ("object" == typeof t) {
                for (a in "string" != typeof n && (i = i || n, n = undefined), t) x(e, a, n, i, t[a], r);
                return e
            }
            if (null == i && null == o ? (o = n, i = n = undefined) : null == o && ("string" == typeof n ? (o = i, i = undefined) : (o = i, i = n, n = undefined)), !1 === o) o = w;
            else if (!o) return e;
            return 1 === r && (s = o, (o = function(e) {
                return fe().off(e), s.apply(this, arguments)
            }).guid = s.guid || (s.guid = fe.guid++)), e.each(function() {
                fe.event.add(this, t, o, i, n)
            })
        }

        function C(e, t) {
            return fe.nodeName(e, "table") && fe.nodeName(11 !== t.nodeType ? t : t.firstChild, "tr") ? e.getElementsByTagName("tbody")[0] || e.appendChild(e.ownerDocument.createElement("tbody")) : e
        }

        function S(e) {
            return e.type = (null !== fe.find.attr(e, "type")) + "/" + e.type, e
        }

        function T(e) {
            var t = at.exec(e.type);
            return t ? e.type = t[1] : e.removeAttribute("type"), e
        }

        function k(e, t) {
            if (1 === t.nodeType && fe.hasData(e)) {
                var n, i, o, r = fe._data(e),
                    s = fe._data(t, r),
                    a = r.events;
                if (a)
                    for (n in delete s.handle, s.events = {}, a)
                        for (i = 0, o = a[n].length; i < o; i++) fe.event.add(t, n, a[n][i]);
                s.data && (s.data = fe.extend({}, s.data))
            }
        }

        function A(e, t) {
            var n, i, o;
            if (1 === t.nodeType) {
                if (n = t.nodeName.toLowerCase(), !de.noCloneEvent && t[fe.expando]) {
                    for (i in (o = fe._data(t)).events) fe.removeEvent(t, i, o.handle);
                    t.removeAttribute(fe.expando)
                }
                "script" === n && t.text !== e.text ? (S(t).text = e.text, T(t)) : "object" === n ? (t.parentNode && (t.outerHTML = e.outerHTML), de.html5Clone && e.innerHTML && !fe.trim(t.innerHTML) && (t.innerHTML = e.innerHTML)) : "input" === n && We.test(e.type) ? (t.defaultChecked = t.checked = e.checked, t.value !== e.value && (t.value = e.value)) : "option" === n ? t.defaultSelected = t.selected = e.defaultSelected : "input" !== n && "textarea" !== n || (t.defaultValue = e.defaultValue)
            }
        }

        function D(e, t, n, i) {
            t = re.apply([], t);
            var o, r, s, a, l, u, c = 0,
                d = e.length,
                p = d - 1,
                f = t[0],
                g = fe.isFunction(f);
            if (g || d > 1 && "string" == typeof f && !de.checkClone && st.test(f)) return e.each(function(o) {
                var r = e.eq(o);
                g && (t[0] = f.call(this, o, r.html())), D(r, t, n, i)
            });
            if (d && (o = (u = y(t, e[0].ownerDocument, !1, e, i)).firstChild, 1 === u.childNodes.length && (u = o), o || i)) {
                for (s = (a = fe.map(h(u, "script"), S)).length; c < d; c++) r = u, c !== p && (r = fe.clone(r, !0, !0), s && fe.merge(a, h(r, "script"))), n.call(e[c], r, c);
                if (s)
                    for (l = a[a.length - 1].ownerDocument, fe.map(a, T), c = 0; c < s; c++) r = a[c], Ye.test(r.type || "") && !fe._data(r, "globalEval") && fe.contains(l, r) && (r.src ? fe._evalUrl && fe._evalUrl(r.src) : fe.globalEval((r.text || r.textContent || r.innerHTML || "").replace(lt, "")));
                u = o = null
            }
            return e
        }

        function M(e, t, n) {
            for (var i, o = t ? fe.filter(t, e) : e, r = 0; null != (i = o[r]); r++) n || 1 !== i.nodeType || fe.cleanData(h(i)), i.parentNode && (n && fe.contains(i.ownerDocument, i) && g(h(i, "script")), i.parentNode.removeChild(i));
            return e
        }

        function j(e, t) {
            var n = fe(t.createElement(e)).appendTo(t.body),
                i = fe.css(n[0], "display");
            return n.detach(), i
        }

        function E(e) {
            var t = ie,
                n = dt[e];
            return n || ("none" !== (n = j(e, t)) && n || ((t = ((ct = (ct || fe("<iframe frameborder='0' width='0' height='0'/>")).appendTo(t.documentElement))[0].contentWindow || ct[0].contentDocument).document).write(), t.close(), n = j(e, t), ct.detach()), dt[e] = n), n
        }

        function L(e, t) {
            return {
                get: function() {
                    if (!e()) return (this.get = t).apply(this, arguments);
                    delete this.get
                }
            }
        }

        function N(e) {
            if (e in At) return e;
            for (var t = e.charAt(0).toUpperCase() + e.slice(1), n = kt.length; n--;)
                if ((e = kt[n] + t) in At) return e
        }

        function _(e, t) {
            for (var n, i, o, r = [], s = 0, a = e.length; s < a; s++)(i = e[s]).style && (r[s] = fe._data(i, "olddisplay"), n = i.style.display, t ? (r[s] || "none" !== n || (i.style.display = ""), "" === i.style.display && Fe(i) && (r[s] = fe._data(i, "olddisplay", E(i.nodeName)))) : (o = Fe(i), (n && "none" !== n || !o) && fe._data(i, "olddisplay", o ? n : fe.css(i, "display"))));
            for (s = 0; s < a; s++)(i = e[s]).style && (t && "none" !== i.style.display && "" !== i.style.display || (i.style.display = t ? r[s] || "" : "none"));
            return e
        }

        function I(e, t, n) {
            var i = Ct.exec(t);
            return i ? Math.max(0, i[1] - (n || 0)) + (i[2] || "px") : t
        }

        function $(e, t, n, i, o) {
            for (var r = n === (i ? "border" : "content") ? 4 : "width" === t ? 1 : 0, s = 0; r < 4; r += 2) "margin" === n && (s += fe.css(e, n + He[r], !0, o)), i ? ("content" === n && (s -= fe.css(e, "padding" + He[r], !0, o)), "margin" !== n && (s -= fe.css(e, "border" + He[r] + "Width", !0, o))) : (s += fe.css(e, "padding" + He[r], !0, o), "padding" !== n && (s += fe.css(e, "border" + He[r] + "Width", !0, o)));
            return s
        }

        function P(e, t, n) {
            var i = !0,
                o = "width" === t ? e.offsetWidth : e.offsetHeight,
                r = mt(e),
                s = de.boxSizing && "border-box" === fe.css(e, "boxSizing", !1, r);
            if (o <= 0 || null == o) {
                if (((o = yt(e, t, r)) < 0 || null == o) && (o = e.style[t]), ft.test(o)) return o;
                i = s && (de.boxSizingReliable() || o === e.style[t]), o = parseFloat(o) || 0
            }
            return o + $(e, t, n || (s ? "border" : "content"), i, r) + "px"
        }

        function O(e, t, n, i, o) {
            return new O.prototype.init(e, t, n, i, o)
        }

        function B() {
            return e.setTimeout(function() {
                Dt = undefined
            }), Dt = fe.now()
        }

        function z(e, t) {
            var n, i = {
                    height: e
                },
                o = 0;
            for (t = t ? 1 : 0; o < 4; o += 2 - t) i["margin" + (n = He[o])] = i["padding" + n] = e;
            return t && (i.opacity = i.width = e), i
        }

        function H(e, t, n) {
            for (var i, o = (W.tweeners[t] || []).concat(W.tweeners["*"]), r = 0, s = o.length; r < s; r++)
                if (i = o[r].call(n, t, e)) return i
        }

        function F(e, t, n) {
            var i, o, r, s, a, l, u, c = this,
                d = {},
                p = e.style,
                f = e.nodeType && Fe(e),
                h = fe._data(e, "fxshow");
            for (i in n.queue || (null == (a = fe._queueHooks(e, "fx")).unqueued && (a.unqueued = 0, l = a.empty.fire, a.empty.fire = function() {
                    a.unqueued || l()
                }), a.unqueued++, c.always(function() {
                    c.always(function() {
                        a.unqueued--, fe.queue(e, "fx").length || a.empty.fire()
                    })
                })), 1 === e.nodeType && ("height" in t || "width" in t) && (n.overflow = [p.overflow, p.overflowX, p.overflowY], "inline" === ("none" === (u = fe.css(e, "display")) ? fe._data(e, "olddisplay") || E(e.nodeName) : u) && "none" === fe.css(e, "float") && (de.inlineBlockNeedsLayout && "inline" !== E(e.nodeName) ? p.zoom = 1 : p.display = "inline-block")), n.overflow && (p.overflow = "hidden", de.shrinkWrapBlocks() || c.always(function() {
                    p.overflow = n.overflow[0], p.overflowX = n.overflow[1], p.overflowY = n.overflow[2]
                })), t)
                if (o = t[i], It.exec(o)) {
                    if (delete t[i], r = r || "toggle" === o, o === (f ? "hide" : "show")) {
                        if ("show" !== o || !h || h[i] === undefined) continue;
                        f = !0
                    }
                    d[i] = h && h[i] || fe.style(e, i)
                } else u = undefined;
            if (fe.isEmptyObject(d)) "inline" === ("none" === u ? E(e.nodeName) : u) && (p.display = u);
            else
                for (i in h ? "hidden" in h && (f = h.hidden) : h = fe._data(e, "fxshow", {}), r && (h.hidden = !f), f ? fe(e).show() : c.done(function() {
                        fe(e).hide()
                    }), c.done(function() {
                        var t;
                        for (t in fe._removeData(e, "fxshow"), d) fe.style(e, t, d[t])
                    }), d) s = H(f ? h[i] : 0, i, c), i in h || (h[i] = s.start, f && (s.end = s.start, s.start = "width" === i || "height" === i ? 1 : 0))
        }

        function R(e, t) {
            var n, i, o, r, s;
            for (n in e)
                if (o = t[i = fe.camelCase(n)], r = e[n], fe.isArray(r) && (o = r[1], r = e[n] = r[0]), n !== i && (e[i] = r, delete e[n]), (s = fe.cssHooks[i]) && "expand" in s)
                    for (n in r = s.expand(r), delete e[i], r) n in e || (e[n] = r[n], t[n] = o);
                else t[i] = o
        }

        function W(e, t, n) {
            var i, o, r = 0,
                s = W.prefilters.length,
                a = fe.Deferred().always(function() {
                    delete l.elem
                }),
                l = function() {
                    if (o) return !1;
                    for (var t = Dt || B(), n = Math.max(0, u.startTime + u.duration - t), i = 1 - (n / u.duration || 0), r = 0, s = u.tweens.length; r < s; r++) u.tweens[r].run(i);
                    return a.notifyWith(e, [u, i, n]), i < 1 && s ? n : (a.resolveWith(e, [u]), !1)
                },
                u = a.promise({
                    elem: e,
                    props: fe.extend({}, t),
                    opts: fe.extend(!0, {
                        specialEasing: {},
                        easing: fe.easing._default
                    }, n),
                    originalProperties: t,
                    originalOptions: n,
                    startTime: Dt || B(),
                    duration: n.duration,
                    tweens: [],
                    createTween: function(t, n) {
                        var i = fe.Tween(e, u.opts, t, n, u.opts.specialEasing[t] || u.opts.easing);
                        return u.tweens.push(i), i
                    },
                    stop: function(t) {
                        var n = 0,
                            i = t ? u.tweens.length : 0;
                        if (o) return this;
                        for (o = !0; n < i; n++) u.tweens[n].run(1);
                        return t ? (a.notifyWith(e, [u, 1, 0]), a.resolveWith(e, [u, t])) : a.rejectWith(e, [u, t]), this
                    }
                }),
                c = u.props;
            for (R(c, u.opts.specialEasing); r < s; r++)
                if (i = W.prefilters[r].call(u, e, c, u.opts)) return fe.isFunction(i.stop) && (fe._queueHooks(u.elem, u.opts.queue).stop = fe.proxy(i.stop, i)), i;
            return fe.map(c, H, u), fe.isFunction(u.opts.start) && u.opts.start.call(e, u), fe.fx.timer(fe.extend(l, {
                elem: e,
                anim: u,
                queue: u.opts.queue
            })), u.progress(u.opts.progress).done(u.opts.done, u.opts.complete).fail(u.opts.fail).always(u.opts.always)
        }

        function q(e) {
            return fe.attr(e, "class") || ""
        }

        function Y(e) {
            return function(t, n) {
                "string" != typeof t && (n = t, t = "*");
                var i, o = 0,
                    r = t.toLowerCase().match(Ee) || [];
                if (fe.isFunction(n))
                    for (; i = r[o++];) "+" === i.charAt(0) ? (i = i.slice(1) || "*", (e[i] = e[i] || []).unshift(n)) : (e[i] = e[i] || []).push(n)
            }
        }

        function Q(e, t, n, i) {
            function o(a) {
                var l;
                return r[a] = !0, fe.each(e[a] || [], function(e, a) {
                    var u = a(t, n, i);
                    return "string" != typeof u || s || r[u] ? s ? !(l = u) : void 0 : (t.dataTypes.unshift(u), o(u), !1)
                }), l
            }
            var r = {},
                s = e === sn;
            return o(t.dataTypes[0]) || !r["*"] && o("*")
        }

        function G(e, t) {
            var n, i, o = fe.ajaxSettings.flatOptions || {};
            for (i in t) t[i] !== undefined && ((o[i] ? e : n || (n = {}))[i] = t[i]);
            return n && fe.extend(!0, e, n), e
        }

        function U(e, t, n) {
            for (var i, o, r, s, a = e.contents, l = e.dataTypes;
                "*" === l[0];) l.shift(), o === undefined && (o = e.mimeType || t.getResponseHeader("Content-Type"));
            if (o)
                for (s in a)
                    if (a[s] && a[s].test(o)) {
                        l.unshift(s);
                        break
                    } if (l[0] in n) r = l[0];
            else {
                for (s in n) {
                    if (!l[0] || e.converters[s + " " + l[0]]) {
                        r = s;
                        break
                    }
                    i || (i = s)
                }
                r = r || i
            }
            if (r) return r !== l[0] && l.unshift(r), n[r]
        }

        function Z(e, t, n, i) {
            var o, r, s, a, l, u = {},
                c = e.dataTypes.slice();
            if (c[1])
                for (s in e.converters) u[s.toLowerCase()] = e.converters[s];
            for (r = c.shift(); r;)
                if (e.responseFields[r] && (n[e.responseFields[r]] = t), !l && i && e.dataFilter && (t = e.dataFilter(t, e.dataType)), l = r, r = c.shift())
                    if ("*" === r) r = l;
                    else if ("*" !== l && l !== r) {
                if (!(s = u[l + " " + r] || u["* " + r]))
                    for (o in u)
                        if ((a = o.split(" "))[1] === r && (s = u[l + " " + a[0]] || u["* " + a[0]])) {
                            !0 === s ? s = u[o] : !0 !== u[o] && (r = a[0], c.unshift(a[1]));
                            break
                        } if (!0 !== s)
                    if (s && e["throws"]) t = s(t);
                    else try {
                        t = s(t)
                    } catch (d) {
                        return {
                            state: "parsererror",
                            error: s ? d : "No conversion from " + l + " to " + r
                        }
                    }
            }
            return {
                state: "success",
                data: t
            }
        }

        function V(e) {
            return e.style && e.style.display || fe.css(e, "display")
        }

        function X(e) {
            if (!fe.contains(e.ownerDocument || ie, e)) return !0;
            for (; e && 1 === e.nodeType;) {
                if ("none" === V(e) || "hidden" === e.type) return !0;
                e = e.parentNode
            }
            return !1
        }

        function J(e, t, n, i) {
            var o;
            if (fe.isArray(t)) fe.each(t, function(t, o) {
                n || dn.test(e) ? i(e, o) : J(e + "[" + ("object" == typeof o && null != o ? t : "") + "]", o, n, i)
            });
            else if (n || "object" !== fe.type(t)) i(e, t);
            else
                for (o in t) J(e + "[" + o + "]", t[o], n, i)
        }

        function K() {
            try {
                return new e.XMLHttpRequest
            } catch (t) {}
        }

        function ee() {
            try {
                return new e.ActiveXObject("Microsoft.XMLHTTP")
            } catch (t) {}
        }

        function te(e) {
            return fe.isWindow(e) ? e : 9 === e.nodeType && (e.defaultView || e.parentWindow)
        }
        var ne = [],
            ie = e.document,
            oe = ne.slice,
            re = ne.concat,
            se = ne.push,
            ae = ne.indexOf,
            le = {},
            ue = le.toString,
            ce = le.hasOwnProperty,
            de = {},
            pe = "1.12.4",
            fe = function(e, t) {
                return new fe.fn.init(e, t)
            },
            he = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
            ge = /^-ms-/,
            me = /-([\da-z])/gi,
            ye = function(e, t) {
                return t.toUpperCase()
            };
        fe.fn = fe.prototype = {
            jquery: pe,
            constructor: fe,
            selector: "",
            length: 0,
            toArray: function() {
                return oe.call(this)
            },
            get: function(e) {
                return null != e ? e < 0 ? this[e + this.length] : this[e] : oe.call(this)
            },
            pushStack: function(e) {
                var t = fe.merge(this.constructor(), e);
                return t.prevObject = this, t.context = this.context, t
            },
            each: function(e) {
                return fe.each(this, e)
            },
            map: function(e) {
                return this.pushStack(fe.map(this, function(t, n) {
                    return e.call(t, n, t)
                }))
            },
            slice: function() {
                return this.pushStack(oe.apply(this, arguments))
            },
            first: function() {
                return this.eq(0)
            },
            last: function() {
                return this.eq(-1)
            },
            eq: function(e) {
                var t = this.length,
                    n = +e + (e < 0 ? t : 0);
                return this.pushStack(n >= 0 && n < t ? [this[n]] : [])
            },
            end: function() {
                return this.prevObject || this.constructor()
            },
            push: se,
            sort: ne.sort,
            splice: ne.splice
        }, fe.extend = fe.fn.extend = function() {
            var e, t, n, i, o, r, s = arguments[0] || {},
                a = 1,
                l = arguments.length,
                u = !1;
            for ("boolean" == typeof s && (u = s, s = arguments[a] || {}, a++), "object" == typeof s || fe.isFunction(s) || (s = {}), a === l && (s = this, a--); a < l; a++)
                if (null != (o = arguments[a]))
                    for (i in o) e = s[i], s !== (n = o[i]) && (u && n && (fe.isPlainObject(n) || (t = fe.isArray(n))) ? (t ? (t = !1, r = e && fe.isArray(e) ? e : []) : r = e && fe.isPlainObject(e) ? e : {}, s[i] = fe.extend(u, r, n)) : n !== undefined && (s[i] = n));
            return s
        }, fe.extend({
            expando: "jQuery" + (pe + Math.random()).replace(/\D/g, ""),
            isReady: !0,
            error: function(e) {
                throw new Error(e)
            },
            noop: function() {},
            isFunction: function(e) {
                return "function" === fe.type(e)
            },
            isArray: Array.isArray || function(e) {
                return "array" === fe.type(e)
            },
            isWindow: function(e) {
                return null != e && e == e.window
            },
            isNumeric: function(e) {
                var t = e && e.toString();
                return !fe.isArray(e) && t - parseFloat(t) + 1 >= 0
            },
            isEmptyObject: function(e) {
                var t;
                for (t in e) return !1;
                return !0
            },
            isPlainObject: function(e) {
                var t;
                if (!e || "object" !== fe.type(e) || e.nodeType || fe.isWindow(e)) return !1;
                try {
                    if (e.constructor && !ce.call(e, "constructor") && !ce.call(e.constructor.prototype, "isPrototypeOf")) return !1
                } catch (n) {
                    return !1
                }
                if (!de.ownFirst)
                    for (t in e) return ce.call(e, t);
                for (t in e);
                return t === undefined || ce.call(e, t)
            },
            type: function(e) {
                return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? le[ue.call(e)] || "object" : typeof e
            },
            globalEval: function(t) {
                t && fe.trim(t) && (e.execScript || function(t) {
                    e.eval.call(e, t)
                })(t)
            },
            camelCase: function(e) {
                return e.replace(ge, "ms-").replace(me, ye)
            },
            nodeName: function(e, t) {
                return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
            },
            each: function(e, t) {
                var i, o = 0;
                if (n(e))
                    for (i = e.length; o < i && !1 !== t.call(e[o], o, e[o]); o++);
                else
                    for (o in e)
                        if (!1 === t.call(e[o], o, e[o])) break;
                return e
            },
            trim: function(e) {
                return null == e ? "" : (e + "").replace(he, "")
            },
            makeArray: function(e, t) {
                var i = t || [];
                return null != e && (n(Object(e)) ? fe.merge(i, "string" == typeof e ? [e] : e) : se.call(i, e)), i
            },
            inArray: function(e, t, n) {
                var i;
                if (t) {
                    if (ae) return ae.call(t, e, n);
                    for (i = t.length, n = n ? n < 0 ? Math.max(0, i + n) : n : 0; n < i; n++)
                        if (n in t && t[n] === e) return n
                }
                return -1
            },
            merge: function(e, t) {
                for (var n = +t.length, i = 0, o = e.length; i < n;) e[o++] = t[i++];
                if (n != n)
                    for (; t[i] !== undefined;) e[o++] = t[i++];
                return e.length = o, e
            },
            grep: function(e, t, n) {
                for (var i = [], o = 0, r = e.length, s = !n; o < r; o++) !t(e[o], o) !== s && i.push(e[o]);
                return i
            },
            map: function(e, t, i) {
                var o, r, s = 0,
                    a = [];
                if (n(e))
                    for (o = e.length; s < o; s++) null != (r = t(e[s], s, i)) && a.push(r);
                else
                    for (s in e) null != (r = t(e[s], s, i)) && a.push(r);
                return re.apply([], a)
            },
            guid: 1,
            proxy: function(e, t) {
                var n, i, o;
                return "string" == typeof t && (o = e[t], t = e, e = o), fe.isFunction(e) ? (n = oe.call(arguments, 2), (i = function() {
                    return e.apply(t || this, n.concat(oe.call(arguments)))
                }).guid = e.guid = e.guid || fe.guid++, i) : undefined
            },
            now: function() {
                return +new Date
            },
            support: de
        }), "function" == typeof Symbol && (fe.fn[Symbol.iterator] = ne[Symbol.iterator]), fe.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function(e, t) {
            le["[object " + t + "]"] = t.toLowerCase()
        });
        var ve = function(e) {
            function t(e, t, n, i) {
                var o, r, s, a, l, u, d, f, h = t && t.ownerDocument,
                    g = t ? t.nodeType : 9;
                if (n = n || [], "string" != typeof e || !e || 1 !== g && 9 !== g && 11 !== g) return n;
                if (!i && ((t ? t.ownerDocument || t : H) !== N && L(t), t = t || N, I)) {
                    if (11 !== g && (u = ye.exec(e)))
                        if (o = u[1]) {
                            if (9 === g) {
                                if (!(s = t.getElementById(o))) return n;
                                if (s.id === o) return n.push(s), n
                            } else if (h && (s = h.getElementById(o)) && B(t, s) && s.id === o) return n.push(s), n
                        } else {
                            if (u[2]) return J.apply(n, t.getElementsByTagName(e)), n;
                            if ((o = u[3]) && x.getElementsByClassName && t.getElementsByClassName) return J.apply(n, t.getElementsByClassName(o)), n
                        } if (x.qsa && !Y[e + " "] && (!$ || !$.test(e))) {
                        if (1 !== g) h = t, f = e;
                        else if ("object" !== t.nodeName.toLowerCase()) {
                            for ((a = t.getAttribute("id")) ? a = a.replace(we, "\\$&") : t.setAttribute("id", a = z), r = (d = k(e)).length, l = pe.test(a) ? "#" + a : "[id='" + a + "']"; r--;) d[r] = l + " " + p(d[r]);
                            f = d.join(","), h = ve.test(e) && c(t.parentNode) || t
                        }
                        if (f) try {
                            return J.apply(n, h.querySelectorAll(f)), n
                        } catch (m) {} finally {
                            a === z && t.removeAttribute("id")
                        }
                    }
                }
                return D(e.replace(ae, "$1"), t, n, i)
            }

            function n() {
                function e(n, i) {
                    return t.push(n + " ") > C.cacheLength && delete e[t.shift()], e[n + " "] = i
                }
                var t = [];
                return e
            }

            function i(e) {
                return e[z] = !0, e
            }

            function o(e) {
                var t = N.createElement("div");
                try {
                    return !!e(t)
                } catch (n) {
                    return !1
                } finally {
                    t.parentNode && t.parentNode.removeChild(t), t = null
                }
            }

            function r(e, t) {
                for (var n = e.split("|"), i = n.length; i--;) C.attrHandle[n[i]] = t
            }

            function s(e, t) {
                var n = t && e,
                    i = n && 1 === e.nodeType && 1 === t.nodeType && (~t.sourceIndex || G) - (~e.sourceIndex || G);
                if (i) return i;
                if (n)
                    for (; n = n.nextSibling;)
                        if (n === t) return -1;
                return e ? 1 : -1
            }

            function a(e) {
                return function(t) {
                    return "input" === t.nodeName.toLowerCase() && t.type === e
                }
            }

            function l(e) {
                return function(t) {
                    var n = t.nodeName.toLowerCase();
                    return ("input" === n || "button" === n) && t.type === e
                }
            }

            function u(e) {
                return i(function(t) {
                    return t = +t, i(function(n, i) {
                        for (var o, r = e([], n.length, t), s = r.length; s--;) n[o = r[s]] && (n[o] = !(i[o] = n[o]))
                    })
                })
            }

            function c(e) {
                return e && "undefined" != typeof e.getElementsByTagName && e
            }

            function d() {}

            function p(e) {
                for (var t = 0, n = e.length, i = ""; t < n; t++) i += e[t].value;
                return i
            }

            function f(e, t, n) {
                var i = t.dir,
                    o = n && "parentNode" === i,
                    r = R++;
                return t.first ? function(t, n, r) {
                    for (; t = t[i];)
                        if (1 === t.nodeType || o) return e(t, n, r)
                } : function(t, n, s) {
                    var a, l, u, c = [F, r];
                    if (s) {
                        for (; t = t[i];)
                            if ((1 === t.nodeType || o) && e(t, n, s)) return !0
                    } else
                        for (; t = t[i];)
                            if (1 === t.nodeType || o) {
                                if ((a = (l = (u = t[z] || (t[z] = {}))[t.uniqueID] || (u[t.uniqueID] = {}))[i]) && a[0] === F && a[1] === r) return c[2] = a[2];
                                if (l[i] = c, c[2] = e(t, n, s)) return !0
                            }
                }
            }

            function h(e) {
                return e.length > 1 ? function(t, n, i) {
                    for (var o = e.length; o--;)
                        if (!e[o](t, n, i)) return !1;
                    return !0
                } : e[0]
            }

            function g(e, n, i) {
                for (var o = 0, r = n.length; o < r; o++) t(e, n[o], i);
                return i
            }

            function m(e, t, n, i, o) {
                for (var r, s = [], a = 0, l = e.length, u = null != t; a < l; a++)(r = e[a]) && (n && !n(r, i, o) || (s.push(r), u && t.push(a)));
                return s
            }

            function y(e, t, n, o, r, s) {
                return o && !o[z] && (o = y(o)), r && !r[z] && (r = y(r, s)), i(function(i, s, a, l) {
                    var u, c, d, p = [],
                        f = [],
                        h = s.length,
                        y = i || g(t || "*", a.nodeType ? [a] : a, []),
                        v = !e || !i && t ? y : m(y, p, e, a, l),
                        w = n ? r || (i ? e : h || o) ? [] : s : v;
                    if (n && n(v, w, a, l), o)
                        for (u = m(w, f), o(u, [], a, l), c = u.length; c--;)(d = u[c]) && (w[f[c]] = !(v[f[c]] = d));
                    if (i) {
                        if (r || e) {
                            if (r) {
                                for (u = [], c = w.length; c--;)(d = w[c]) && u.push(v[c] = d);
                                r(null, w = [], u, l)
                            }
                            for (c = w.length; c--;)(d = w[c]) && (u = r ? ee(i, d) : p[c]) > -1 && (i[u] = !(s[u] = d))
                        }
                    } else w = m(w === s ? w.splice(h, w.length) : w), r ? r(null, s, w, l) : J.apply(s, w)
                })
            }

            function v(e) {
                for (var t, n, i, o = e.length, r = C.relative[e[0].type], s = r || C.relative[" "], a = r ? 1 : 0, l = f(function(e) {
                        return e === t
                    }, s, !0), u = f(function(e) {
                        return ee(t, e) > -1
                    }, s, !0), c = [function(e, n, i) {
                        var o = !r && (i || n !== M) || ((t = n).nodeType ? l(e, n, i) : u(e, n, i));
                        return t = null, o
                    }]; a < o; a++)
                    if (n = C.relative[e[a].type]) c = [f(h(c), n)];
                    else {
                        if ((n = C.filter[e[a].type].apply(null, e[a].matches))[z]) {
                            for (i = ++a; i < o && !C.relative[e[i].type]; i++);
                            return y(a > 1 && h(c), a > 1 && p(e.slice(0, a - 1).concat({
                                value: " " === e[a - 2].type ? "*" : ""
                            })).replace(ae, "$1"), n, a < i && v(e.slice(a, i)), i < o && v(e = e.slice(i)), i < o && p(e))
                        }
                        c.push(n)
                    } return h(c)
            }

            function w(e, n) {
                var o = n.length > 0,
                    r = e.length > 0,
                    s = function(i, s, a, l, u) {
                        var c, d, p, f = 0,
                            h = "0",
                            g = i && [],
                            y = [],
                            v = M,
                            w = i || r && C.find.TAG("*", u),
                            b = F += null == v ? 1 : Math.random() || .1,
                            x = w.length;
                        for (u && (M = s === N || s || u); h !== x && null != (c = w[h]); h++) {
                            if (r && c) {
                                for (d = 0, s || c.ownerDocument === N || (L(c), a = !I); p = e[d++];)
                                    if (p(c, s || N, a)) {
                                        l.push(c);
                                        break
                                    } u && (F = b)
                            }
                            o && ((c = !p && c) && f--, i && g.push(c))
                        }
                        if (f += h, o && h !== f) {
                            for (d = 0; p = n[d++];) p(g, y, s, a);
                            if (i) {
                                if (f > 0)
                                    for (; h--;) g[h] || y[h] || (y[h] = V.call(l));
                                y = m(y)
                            }
                            J.apply(l, y), u && !i && y.length > 0 && f + n.length > 1 && t.uniqueSort(l)
                        }
                        return u && (F = b, M = v), g
                    };
                return o ? i(s) : s
            }
            var b, x, C, S, T, k, A, D, M, j, E, L, N, _, I, $, P, O, B, z = "sizzle" + 1 * new Date,
                H = e.document,
                F = 0,
                R = 0,
                W = n(),
                q = n(),
                Y = n(),
                Q = function(e, t) {
                    return e === t && (E = !0), 0
                },
                G = 1 << 31,
                U = {}.hasOwnProperty,
                Z = [],
                V = Z.pop,
                X = Z.push,
                J = Z.push,
                K = Z.slice,
                ee = function(e, t) {
                    for (var n = 0, i = e.length; n < i; n++)
                        if (e[n] === t) return n;
                    return -1
                },
                te = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
                ne = "[\\x20\\t\\r\\n\\f]",
                ie = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
                oe = "\\[" + ne + "*(" + ie + ")(?:" + ne + "*([*^$|!~]?=)" + ne + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + ie + "))|)" + ne + "*\\]",
                re = ":(" + ie + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + oe + ")*)|.*)\\)|)",
                se = new RegExp(ne + "+", "g"),
                ae = new RegExp("^" + ne + "+|((?:^|[^\\\\])(?:\\\\.)*)" + ne + "+$", "g"),
                le = new RegExp("^" + ne + "*," + ne + "*"),
                ue = new RegExp("^" + ne + "*([>+~]|" + ne + ")" + ne + "*"),
                ce = new RegExp("=" + ne + "*([^\\]'\"]*?)" + ne + "*\\]", "g"),
                de = new RegExp(re),
                pe = new RegExp("^" + ie + "$"),
                fe = {
                    ID: new RegExp("^#(" + ie + ")"),
                    CLASS: new RegExp("^\\.(" + ie + ")"),
                    TAG: new RegExp("^(" + ie + "|[*])"),
                    ATTR: new RegExp("^" + oe),
                    PSEUDO: new RegExp("^" + re),
                    CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + ne + "*(even|odd|(([+-]|)(\\d*)n|)" + ne + "*(?:([+-]|)" + ne + "*(\\d+)|))" + ne + "*\\)|)", "i"),
                    bool: new RegExp("^(?:" + te + ")$", "i"),
                    needsContext: new RegExp("^" + ne + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + ne + "*((?:-\\d)?\\d*)" + ne + "*\\)|)(?=[^-]|$)", "i")
                },
                he = /^(?:input|select|textarea|button)$/i,
                ge = /^h\d$/i,
                me = /^[^{]+\{\s*\[native \w/,
                ye = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
                ve = /[+~]/,
                we = /'|\\/g,
                be = new RegExp("\\\\([\\da-f]{1,6}" + ne + "?|(" + ne + ")|.)", "ig"),
                xe = function(e, t, n) {
                    var i = "0x" + t - 65536;
                    return i != i || n ? t : i < 0 ? String.fromCharCode(i + 65536) : String.fromCharCode(i >> 10 | 55296, 1023 & i | 56320)
                },
                Ce = function() {
                    L()
                };
            try {
                J.apply(Z = K.call(H.childNodes), H.childNodes), Z[H.childNodes.length].nodeType
            } catch (Se) {
                J = {
                    apply: Z.length ? function(e, t) {
                        X.apply(e, K.call(t))
                    } : function(e, t) {
                        for (var n = e.length, i = 0; e[n++] = t[i++];);
                        e.length = n - 1
                    }
                }
            }
            for (b in x = t.support = {}, T = t.isXML = function(e) {
                    var t = e && (e.ownerDocument || e).documentElement;
                    return !!t && "HTML" !== t.nodeName
                }, L = t.setDocument = function(e) {
                    var t, n, i = e ? e.ownerDocument || e : H;
                    return i !== N && 9 === i.nodeType && i.documentElement ? (_ = (N = i).documentElement, I = !T(N), (n = N.defaultView) && n.top !== n && (n.addEventListener ? n.addEventListener("unload", Ce, !1) : n.attachEvent && n.attachEvent("onunload", Ce)), x.attributes = o(function(e) {
                        return e.className = "i", !e.getAttribute("className")
                    }), x.getElementsByTagName = o(function(e) {
                        return e.appendChild(N.createComment("")), !e.getElementsByTagName("*").length
                    }), x.getElementsByClassName = me.test(N.getElementsByClassName), x.getById = o(function(e) {
                        return _.appendChild(e).id = z, !N.getElementsByName || !N.getElementsByName(z).length
                    }), x.getById ? (C.find.ID = function(e, t) {
                        if ("undefined" != typeof t.getElementById && I) {
                            var n = t.getElementById(e);
                            return n ? [n] : []
                        }
                    }, C.filter.ID = function(e) {
                        var t = e.replace(be, xe);
                        return function(e) {
                            return e.getAttribute("id") === t
                        }
                    }) : (delete C.find.ID, C.filter.ID = function(e) {
                        var t = e.replace(be, xe);
                        return function(e) {
                            var n = "undefined" != typeof e.getAttributeNode && e.getAttributeNode("id");
                            return n && n.value === t
                        }
                    }), C.find.TAG = x.getElementsByTagName ? function(e, t) {
                        return "undefined" != typeof t.getElementsByTagName ? t.getElementsByTagName(e) : x.qsa ? t.querySelectorAll(e) : void 0
                    } : function(e, t) {
                        var n, i = [],
                            o = 0,
                            r = t.getElementsByTagName(e);
                        if ("*" === e) {
                            for (; n = r[o++];) 1 === n.nodeType && i.push(n);
                            return i
                        }
                        return r
                    }, C.find.CLASS = x.getElementsByClassName && function(e, t) {
                        if ("undefined" != typeof t.getElementsByClassName && I) return t.getElementsByClassName(e)
                    }, P = [], $ = [], (x.qsa = me.test(N.querySelectorAll)) && (o(function(e) {
                        _.appendChild(e).innerHTML = "<a id='" + z + "'></a><select id='" + z + "-\r\\' msallowcapture=''><option selected=''></option></select>", e.querySelectorAll("[msallowcapture^='']").length && $.push("[*^$]=" + ne + "*(?:''|\"\")"), e.querySelectorAll("[selected]").length || $.push("\\[" + ne + "*(?:value|" + te + ")"), e.querySelectorAll("[id~=" + z + "-]").length || $.push("~="), e.querySelectorAll(":checked").length || $.push(":checked"), e.querySelectorAll("a#" + z + "+*").length || $.push(".#.+[+~]")
                    }), o(function(e) {
                        var t = N.createElement("input");
                        t.setAttribute("type", "hidden"), e.appendChild(t).setAttribute("name", "D"), e.querySelectorAll("[name=d]").length && $.push("name" + ne + "*[*^$|!~]?="), e.querySelectorAll(":enabled").length || $.push(":enabled", ":disabled"), e.querySelectorAll("*,:x"), $.push(",.*:")
                    })), (x.matchesSelector = me.test(O = _.matches || _.webkitMatchesSelector || _.mozMatchesSelector || _.oMatchesSelector || _.msMatchesSelector)) && o(function(e) {
                        x.disconnectedMatch = O.call(e, "div"), O.call(e, "[s!='']:x"), P.push("!=", re)
                    }), $ = $.length && new RegExp($.join("|")), P = P.length && new RegExp(P.join("|")), t = me.test(_.compareDocumentPosition), B = t || me.test(_.contains) ? function(e, t) {
                        var n = 9 === e.nodeType ? e.documentElement : e,
                            i = t && t.parentNode;
                        return e === i || !(!i || 1 !== i.nodeType || !(n.contains ? n.contains(i) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(i)))
                    } : function(e, t) {
                        if (t)
                            for (; t = t.parentNode;)
                                if (t === e) return !0;
                        return !1
                    }, Q = t ? function(e, t) {
                        if (e === t) return E = !0, 0;
                        var n = !e.compareDocumentPosition - !t.compareDocumentPosition;
                        return n || (1 & (n = (e.ownerDocument || e) === (t.ownerDocument || t) ? e.compareDocumentPosition(t) : 1) || !x.sortDetached && t.compareDocumentPosition(e) === n ? e === N || e.ownerDocument === H && B(H, e) ? -1 : t === N || t.ownerDocument === H && B(H, t) ? 1 : j ? ee(j, e) - ee(j, t) : 0 : 4 & n ? -1 : 1)
                    } : function(e, t) {
                        if (e === t) return E = !0, 0;
                        var n, i = 0,
                            o = e.parentNode,
                            r = t.parentNode,
                            a = [e],
                            l = [t];
                        if (!o || !r) return e === N ? -1 : t === N ? 1 : o ? -1 : r ? 1 : j ? ee(j, e) - ee(j, t) : 0;
                        if (o === r) return s(e, t);
                        for (n = e; n = n.parentNode;) a.unshift(n);
                        for (n = t; n = n.parentNode;) l.unshift(n);
                        for (; a[i] === l[i];) i++;
                        return i ? s(a[i], l[i]) : a[i] === H ? -1 : l[i] === H ? 1 : 0
                    }, N) : N
                }, t.matches = function(e, n) {
                    return t(e, null, null, n)
                }, t.matchesSelector = function(e, n) {
                    if ((e.ownerDocument || e) !== N && L(e), n = n.replace(ce, "='$1']"), x.matchesSelector && I && !Y[n + " "] && (!P || !P.test(n)) && (!$ || !$.test(n))) try {
                        var i = O.call(e, n);
                        if (i || x.disconnectedMatch || e.document && 11 !== e.document.nodeType) return i
                    } catch (Se) {}
                    return t(n, N, null, [e]).length > 0
                }, t.contains = function(e, t) {
                    return (e.ownerDocument || e) !== N && L(e), B(e, t)
                }, t.attr = function(e, t) {
                    (e.ownerDocument || e) !== N && L(e);
                    var n = C.attrHandle[t.toLowerCase()],
                        i = n && U.call(C.attrHandle, t.toLowerCase()) ? n(e, t, !I) : undefined;
                    return i !== undefined ? i : x.attributes || !I ? e.getAttribute(t) : (i = e.getAttributeNode(t)) && i.specified ? i.value : null
                }, t.error = function(e) {
                    throw new Error("Syntax error, unrecognized expression: " + e)
                }, t.uniqueSort = function(e) {
                    var t, n = [],
                        i = 0,
                        o = 0;
                    if (E = !x.detectDuplicates, j = !x.sortStable && e.slice(0), e.sort(Q), E) {
                        for (; t = e[o++];) t === e[o] && (i = n.push(o));
                        for (; i--;) e.splice(n[i], 1)
                    }
                    return j = null, e
                }, S = t.getText = function(e) {
                    var t, n = "",
                        i = 0,
                        o = e.nodeType;
                    if (o) {
                        if (1 === o || 9 === o || 11 === o) {
                            if ("string" == typeof e.textContent) return e.textContent;
                            for (e = e.firstChild; e; e = e.nextSibling) n += S(e)
                        } else if (3 === o || 4 === o) return e.nodeValue
                    } else
                        for (; t = e[i++];) n += S(t);
                    return n
                }, (C = t.selectors = {
                    cacheLength: 50,
                    createPseudo: i,
                    match: fe,
                    attrHandle: {},
                    find: {},
                    relative: {
                        ">": {
                            dir: "parentNode",
                            first: !0
                        },
                        " ": {
                            dir: "parentNode"
                        },
                        "+": {
                            dir: "previousSibling",
                            first: !0
                        },
                        "~": {
                            dir: "previousSibling"
                        }
                    },
                    preFilter: {
                        ATTR: function(e) {
                            return e[1] = e[1].replace(be, xe), e[3] = (e[3] || e[4] || e[5] || "").replace(be, xe), "~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4)
                        },
                        CHILD: function(e) {
                            return e[1] = e[1].toLowerCase(), "nth" === e[1].slice(0, 3) ? (e[3] || t.error(e[0]), e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])), e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && t.error(e[0]), e
                        },
                        PSEUDO: function(e) {
                            var t, n = !e[6] && e[2];
                            return fe.CHILD.test(e[0]) ? null : (e[3] ? e[2] = e[4] || e[5] || "" : n && de.test(n) && (t = k(n, !0)) && (t = n.indexOf(")", n.length - t) - n.length) && (e[0] = e[0].slice(0, t), e[2] = n.slice(0, t)), e.slice(0, 3))
                        }
                    },
                    filter: {
                        TAG: function(e) {
                            var t = e.replace(be, xe).toLowerCase();
                            return "*" === e ? function() {
                                return !0
                            } : function(e) {
                                return e.nodeName && e.nodeName.toLowerCase() === t
                            }
                        },
                        CLASS: function(e) {
                            var t = W[e + " "];
                            return t || (t = new RegExp("(^|" + ne + ")" + e + "(" + ne + "|$)")) && W(e, function(e) {
                                return t.test("string" == typeof e.className && e.className || "undefined" != typeof e.getAttribute && e.getAttribute("class") || "")
                            })
                        },
                        ATTR: function(e, n, i) {
                            return function(o) {
                                var r = t.attr(o, e);
                                return null == r ? "!=" === n : !n || (r += "", "=" === n ? r === i : "!=" === n ? r !== i : "^=" === n ? i && 0 === r.indexOf(i) : "*=" === n ? i && r.indexOf(i) > -1 : "$=" === n ? i && r.slice(-i.length) === i : "~=" === n ? (" " + r.replace(se, " ") + " ").indexOf(i) > -1 : "|=" === n && (r === i || r.slice(0, i.length + 1) === i + "-"))
                            }
                        },
                        CHILD: function(e, t, n, i, o) {
                            var r = "nth" !== e.slice(0, 3),
                                s = "last" !== e.slice(-4),
                                a = "of-type" === t;
                            return 1 === i && 0 === o ? function(e) {
                                return !!e.parentNode
                            } : function(t, n, l) {
                                var u, c, d, p, f, h, g = r !== s ? "nextSibling" : "previousSibling",
                                    m = t.parentNode,
                                    y = a && t.nodeName.toLowerCase(),
                                    v = !l && !a,
                                    w = !1;
                                if (m) {
                                    if (r) {
                                        for (; g;) {
                                            for (p = t; p = p[g];)
                                                if (a ? p.nodeName.toLowerCase() === y : 1 === p.nodeType) return !1;
                                            h = g = "only" === e && !h && "nextSibling"
                                        }
                                        return !0
                                    }
                                    if (h = [s ? m.firstChild : m.lastChild], s && v) {
                                        for (w = (f = (u = (c = (d = (p = m)[z] || (p[z] = {}))[p.uniqueID] || (d[p.uniqueID] = {}))[e] || [])[0] === F && u[1]) && u[2], p = f && m.childNodes[f]; p = ++f && p && p[g] || (w = f = 0) || h.pop();)
                                            if (1 === p.nodeType && ++w && p === t) {
                                                c[e] = [F, f, w];
                                                break
                                            }
                                    } else if (v && (w = f = (u = (c = (d = (p = t)[z] || (p[z] = {}))[p.uniqueID] || (d[p.uniqueID] = {}))[e] || [])[0] === F && u[1]), !1 === w)
                                        for (;
                                            (p = ++f && p && p[g] || (w = f = 0) || h.pop()) && ((a ? p.nodeName.toLowerCase() !== y : 1 !== p.nodeType) || !++w || (v && ((c = (d = p[z] || (p[z] = {}))[p.uniqueID] || (d[p.uniqueID] = {}))[e] = [F, w]), p !== t)););
                                    return (w -= o) === i || w % i == 0 && w / i >= 0
                                }
                            }
                        },
                        PSEUDO: function(e, n) {
                            var o, r = C.pseudos[e] || C.setFilters[e.toLowerCase()] || t.error("unsupported pseudo: " + e);
                            return r[z] ? r(n) : r.length > 1 ? (o = [e, e, "", n], C.setFilters.hasOwnProperty(e.toLowerCase()) ? i(function(e, t) {
                                for (var i, o = r(e, n), s = o.length; s--;) e[i = ee(e, o[s])] = !(t[i] = o[s])
                            }) : function(e) {
                                return r(e, 0, o)
                            }) : r
                        }
                    },
                    pseudos: {
                        not: i(function(e) {
                            var t = [],
                                n = [],
                                o = A(e.replace(ae, "$1"));
                            return o[z] ? i(function(e, t, n, i) {
                                for (var r, s = o(e, null, i, []), a = e.length; a--;)(r = s[a]) && (e[a] = !(t[a] = r))
                            }) : function(e, i, r) {
                                return t[0] = e, o(t, null, r, n), t[0] = null, !n.pop()
                            }
                        }),
                        has: i(function(e) {
                            return function(n) {
                                return t(e, n).length > 0
                            }
                        }),
                        contains: i(function(e) {
                            return e = e.replace(be, xe),
                                function(t) {
                                    return (t.textContent || t.innerText || S(t)).indexOf(e) > -1
                                }
                        }),
                        lang: i(function(e) {
                            return pe.test(e || "") || t.error("unsupported lang: " + e), e = e.replace(be, xe).toLowerCase(),
                                function(t) {
                                    var n;
                                    do {
                                        if (n = I ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang")) return (n = n.toLowerCase()) === e || 0 === n.indexOf(e + "-")
                                    } while ((t = t.parentNode) && 1 === t.nodeType);
                                    return !1
                                }
                        }),
                        target: function(t) {
                            var n = e.location && e.location.hash;
                            return n && n.slice(1) === t.id
                        },
                        root: function(e) {
                            return e === _
                        },
                        focus: function(e) {
                            return e === N.activeElement && (!N.hasFocus || N.hasFocus()) && !!(e.type || e.href || ~e.tabIndex)
                        },
                        enabled: function(e) {
                            return !1 === e.disabled
                        },
                        disabled: function(e) {
                            return !0 === e.disabled
                        },
                        checked: function(e) {
                            var t = e.nodeName.toLowerCase();
                            return "input" === t && !!e.checked || "option" === t && !!e.selected
                        },
                        selected: function(e) {
                            return e.parentNode && e.parentNode.selectedIndex, !0 === e.selected
                        },
                        empty: function(e) {
                            for (e = e.firstChild; e; e = e.nextSibling)
                                if (e.nodeType < 6) return !1;
                            return !0
                        },
                        parent: function(e) {
                            return !C.pseudos.empty(e)
                        },
                        header: function(e) {
                            return ge.test(e.nodeName)
                        },
                        input: function(e) {
                            return he.test(e.nodeName)
                        },
                        button: function(e) {
                            var t = e.nodeName.toLowerCase();
                            return "input" === t && "button" === e.type || "button" === t
                        },
                        text: function(e) {
                            var t;
                            return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || "text" === t.toLowerCase())
                        },
                        first: u(function() {
                            return [0]
                        }),
                        last: u(function(e, t) {
                            return [t - 1]
                        }),
                        eq: u(function(e, t, n) {
                            return [n < 0 ? n + t : n]
                        }),
                        even: u(function(e, t) {
                            for (var n = 0; n < t; n += 2) e.push(n);
                            return e
                        }),
                        odd: u(function(e, t) {
                            for (var n = 1; n < t; n += 2) e.push(n);
                            return e
                        }),
                        lt: u(function(e, t, n) {
                            for (var i = n < 0 ? n + t : n; --i >= 0;) e.push(i);
                            return e
                        }),
                        gt: u(function(e, t, n) {
                            for (var i = n < 0 ? n + t : n; ++i < t;) e.push(i);
                            return e
                        })
                    }
                }).pseudos.nth = C.pseudos.eq, {
                    radio: !0,
                    checkbox: !0,
                    file: !0,
                    password: !0,
                    image: !0
                }) C.pseudos[b] = a(b);
            for (b in {
                    submit: !0,
                    reset: !0
                }) C.pseudos[b] = l(b);
            return d.prototype = C.filters = C.pseudos, C.setFilters = new d, k = t.tokenize = function(e, n) {
                var i, o, r, s, a, l, u, c = q[e + " "];
                if (c) return n ? 0 : c.slice(0);
                for (a = e, l = [], u = C.preFilter; a;) {
                    for (s in i && !(o = le.exec(a)) || (o && (a = a.slice(o[0].length) || a), l.push(r = [])), i = !1, (o = ue.exec(a)) && (i = o.shift(), r.push({
                            value: i,
                            type: o[0].replace(ae, " ")
                        }), a = a.slice(i.length)), C.filter) !(o = fe[s].exec(a)) || u[s] && !(o = u[s](o)) || (i = o.shift(), r.push({
                        value: i,
                        type: s,
                        matches: o
                    }), a = a.slice(i.length));
                    if (!i) break
                }
                return n ? a.length : a ? t.error(e) : q(e, l).slice(0)
            }, A = t.compile = function(e, t) {
                var n, i = [],
                    o = [],
                    r = Y[e + " "];
                if (!r) {
                    for (t || (t = k(e)), n = t.length; n--;)(r = v(t[n]))[z] ? i.push(r) : o.push(r);
                    (r = Y(e, w(o, i))).selector = e
                }
                return r
            }, D = t.select = function(e, t, n, i) {
                var o, r, s, a, l, u = "function" == typeof e && e,
                    d = !i && k(e = u.selector || e);
                if (n = n || [], 1 === d.length) {
                    if ((r = d[0] = d[0].slice(0)).length > 2 && "ID" === (s = r[0]).type && x.getById && 9 === t.nodeType && I && C.relative[r[1].type]) {
                        if (!(t = (C.find.ID(s.matches[0].replace(be, xe), t) || [])[0])) return n;
                        u && (t = t.parentNode), e = e.slice(r.shift().value.length)
                    }
                    for (o = fe.needsContext.test(e) ? 0 : r.length; o-- && (s = r[o], !C.relative[a = s.type]);)
                        if ((l = C.find[a]) && (i = l(s.matches[0].replace(be, xe), ve.test(r[0].type) && c(t.parentNode) || t))) {
                            if (r.splice(o, 1), !(e = i.length && p(r))) return J.apply(n, i), n;
                            break
                        }
                }
                return (u || A(e, d))(i, t, !I, n, !t || ve.test(e) && c(t.parentNode) || t), n
            }, x.sortStable = z.split("").sort(Q).join("") === z, x.detectDuplicates = !!E, L(), x.sortDetached = o(function(e) {
                return 1 & e.compareDocumentPosition(N.createElement("div"))
            }), o(function(e) {
                return e.innerHTML = "<a href='#'></a>", "#" === e.firstChild.getAttribute("href")
            }) || r("type|href|height|width", function(e, t, n) {
                if (!n) return e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2)
            }), x.attributes && o(function(e) {
                return e.innerHTML = "<input/>", e.firstChild.setAttribute("value", ""), "" === e.firstChild.getAttribute("value")
            }) || r("value", function(e, t, n) {
                if (!n && "input" === e.nodeName.toLowerCase()) return e.defaultValue
            }), o(function(e) {
                return null == e.getAttribute("disabled")
            }) || r(te, function(e, t, n) {
                var i;
                if (!n) return !0 === e[t] ? t.toLowerCase() : (i = e.getAttributeNode(t)) && i.specified ? i.value : null
            }), t
        }(e);
        fe.find = ve, fe.expr = ve.selectors, fe.expr[":"] = fe.expr.pseudos, fe.uniqueSort = fe.unique = ve.uniqueSort, fe.text = ve.getText, fe.isXMLDoc = ve.isXML, fe.contains = ve.contains;
        var we = function(e, t, n) {
                for (var i = [], o = n !== undefined;
                    (e = e[t]) && 9 !== e.nodeType;)
                    if (1 === e.nodeType) {
                        if (o && fe(e).is(n)) break;
                        i.push(e)
                    } return i
            },
            be = function(e, t) {
                for (var n = []; e; e = e.nextSibling) 1 === e.nodeType && e !== t && n.push(e);
                return n
            },
            xe = fe.expr.match.needsContext,
            Ce = /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/,
            Se = /^.[^:#\[\.,]*$/;
        fe.filter = function(e, t, n) {
            var i = t[0];
            return n && (e = ":not(" + e + ")"), 1 === t.length && 1 === i.nodeType ? fe.find.matchesSelector(i, e) ? [i] : [] : fe.find.matches(e, fe.grep(t, function(e) {
                return 1 === e.nodeType
            }))
        }, fe.fn.extend({
            find: function(e) {
                var t, n = [],
                    i = this,
                    o = i.length;
                if ("string" != typeof e) return this.pushStack(fe(e).filter(function() {
                    for (t = 0; t < o; t++)
                        if (fe.contains(i[t], this)) return !0
                }));
                for (t = 0; t < o; t++) fe.find(e, i[t], n);
                return (n = this.pushStack(o > 1 ? fe.unique(n) : n)).selector = this.selector ? this.selector + " " + e : e, n
            },
            filter: function(e) {
                return this.pushStack(i(this, e || [], !1))
            },
            not: function(e) {
                return this.pushStack(i(this, e || [], !0))
            },
            is: function(e) {
                return !!i(this, "string" == typeof e && xe.test(e) ? fe(e) : e || [], !1).length
            }
        });
        var Te, ke = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/;
        (fe.fn.init = function(e, t, n) {
            var i, o;
            if (!e) return this;
            if (n = n || Te, "string" == typeof e) {
                if (!(i = "<" === e.charAt(0) && ">" === e.charAt(e.length - 1) && e.length >= 3 ? [null, e, null] : ke.exec(e)) || !i[1] && t) return !t || t.jquery ? (t || n).find(e) : this.constructor(t).find(e);
                if (i[1]) {
                    if (t = t instanceof fe ? t[0] : t, fe.merge(this, fe.parseHTML(i[1], t && t.nodeType ? t.ownerDocument || t : ie, !0)), Ce.test(i[1]) && fe.isPlainObject(t))
                        for (i in t) fe.isFunction(this[i]) ? this[i](t[i]) : this.attr(i, t[i]);
                    return this
                }
                if ((o = ie.getElementById(i[2])) && o.parentNode) {
                    if (o.id !== i[2]) return Te.find(e);
                    this.length = 1, this[0] = o
                }
                return this.context = ie, this.selector = e, this
            }
            return e.nodeType ? (this.context = this[0] = e, this.length = 1, this) : fe.isFunction(e) ? "undefined" != typeof n.ready ? n.ready(e) : e(fe) : (e.selector !== undefined && (this.selector = e.selector, this.context = e.context), fe.makeArray(e, this))
        }).prototype = fe.fn, Te = fe(ie);
        var Ae = /^(?:parents|prev(?:Until|All))/,
            De = {
                children: !0,
                contents: !0,
                next: !0,
                prev: !0
            };
        fe.fn.extend({
            has: function(e) {
                var t, n = fe(e, this),
                    i = n.length;
                return this.filter(function() {
                    for (t = 0; t < i; t++)
                        if (fe.contains(this, n[t])) return !0
                })
            },
            closest: function(e, t) {
                for (var n, i = 0, o = this.length, r = [], s = xe.test(e) || "string" != typeof e ? fe(e, t || this.context) : 0; i < o; i++)
                    for (n = this[i]; n && n !== t; n = n.parentNode)
                        if (n.nodeType < 11 && (s ? s.index(n) > -1 : 1 === n.nodeType && fe.find.matchesSelector(n, e))) {
                            r.push(n);
                            break
                        } return this.pushStack(r.length > 1 ? fe.uniqueSort(r) : r)
            },
            index: function(e) {
                return e ? "string" == typeof e ? fe.inArray(this[0], fe(e)) : fe.inArray(e.jquery ? e[0] : e, this) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
            },
            add: function(e, t) {
                return this.pushStack(fe.uniqueSort(fe.merge(this.get(), fe(e, t))))
            },
            addBack: function(e) {
                return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
            }
        }), fe.each({
            parent: function(e) {
                var t = e.parentNode;
                return t && 11 !== t.nodeType ? t : null
            },
            parents: function(e) {
                return we(e, "parentNode")
            },
            parentsUntil: function(e, t, n) {
                return we(e, "parentNode", n)
            },
            next: function(e) {
                return o(e, "nextSibling")
            },
            prev: function(e) {
                return o(e, "previousSibling")
            },
            nextAll: function(e) {
                return we(e, "nextSibling")
            },
            prevAll: function(e) {
                return we(e, "previousSibling")
            },
            nextUntil: function(e, t, n) {
                return we(e, "nextSibling", n)
            },
            prevUntil: function(e, t, n) {
                return we(e, "previousSibling", n)
            },
            siblings: function(e) {
                return be((e.parentNode || {}).firstChild, e)
            },
            children: function(e) {
                return be(e.firstChild)
            },
            contents: function(e) {
                return fe.nodeName(e, "iframe") ? e.contentDocument || e.contentWindow.document : fe.merge([], e.childNodes)
            }
        }, function(e, t) {
            fe.fn[e] = function(n, i) {
                var o = fe.map(this, t, n);
                return "Until" !== e.slice(-5) && (i = n), i && "string" == typeof i && (o = fe.filter(i, o)), this.length > 1 && (De[e] || (o = fe.uniqueSort(o)), Ae.test(e) && (o = o.reverse())), this.pushStack(o)
            }
        });
        var Me, je, Ee = /\S+/g;
        for (je in fe.Callbacks = function(e) {
                e = "string" == typeof e ? r(e) : fe.extend({}, e);
                var t, n, i, o, s = [],
                    a = [],
                    l = -1,
                    u = function() {
                        for (o = e.once, i = t = !0; a.length; l = -1)
                            for (n = a.shift(); ++l < s.length;) !1 === s[l].apply(n[0], n[1]) && e.stopOnFalse && (l = s.length, n = !1);
                        e.memory || (n = !1), t = !1, o && (s = n ? [] : "")
                    },
                    c = {
                        add: function() {
                            return s && (n && !t && (l = s.length - 1, a.push(n)), function i(t) {
                                fe.each(t, function(t, n) {
                                    fe.isFunction(n) ? e.unique && c.has(n) || s.push(n) : n && n.length && "string" !== fe.type(n) && i(n)
                                })
                            }(arguments), n && !t && u()), this
                        },
                        remove: function() {
                            return fe.each(arguments, function(e, t) {
                                for (var n;
                                    (n = fe.inArray(t, s, n)) > -1;) s.splice(n, 1), n <= l && l--
                            }), this
                        },
                        has: function(e) {
                            return e ? fe.inArray(e, s) > -1 : s.length > 0
                        },
                        empty: function() {
                            return s && (s = []), this
                        },
                        disable: function() {
                            return o = a = [], s = n = "", this
                        },
                        disabled: function() {
                            return !s
                        },
                        lock: function() {
                            return o = !0, n || c.disable(), this
                        },
                        locked: function() {
                            return !!o
                        },
                        fireWith: function(e, n) {
                            return o || (n = [e, (n = n || []).slice ? n.slice() : n], a.push(n), t || u()), this
                        },
                        fire: function() {
                            return c.fireWith(this, arguments), this
                        },
                        fired: function() {
                            return !!i
                        }
                    };
                return c
            }, fe.extend({
                Deferred: function(e) {
                    var t = [
                            ["resolve", "done", fe.Callbacks("once memory"), "resolved"],
                            ["reject", "fail", fe.Callbacks("once memory"), "rejected"],
                            ["notify", "progress", fe.Callbacks("memory")]
                        ],
                        n = "pending",
                        i = {
                            state: function() {
                                return n
                            },
                            always: function() {
                                return o.done(arguments).fail(arguments), this
                            },
                            then: function() {
                                var e = arguments;
                                return fe.Deferred(function(n) {
                                    fe.each(t, function(t, r) {
                                        var s = fe.isFunction(e[t]) && e[t];
                                        o[r[1]](function() {
                                            var e = s && s.apply(this, arguments);
                                            e && fe.isFunction(e.promise) ? e.promise().progress(n.notify).done(n.resolve).fail(n.reject) : n[r[0] + "With"](this === i ? n.promise() : this, s ? [e] : arguments)
                                        })
                                    }), e = null
                                }).promise()
                            },
                            promise: function(e) {
                                return null != e ? fe.extend(e, i) : i
                            }
                        },
                        o = {};
                    return i.pipe = i.then, fe.each(t, function(e, r) {
                        var s = r[2],
                            a = r[3];
                        i[r[1]] = s.add, a && s.add(function() {
                            n = a
                        }, t[1 ^ e][2].disable, t[2][2].lock), o[r[0]] = function() {
                            return o[r[0] + "With"](this === o ? i : this, arguments), this
                        }, o[r[0] + "With"] = s.fireWith
                    }), i.promise(o), e && e.call(o, o), o
                },
                when: function(e) {
                    var t, n, i, o = 0,
                        r = oe.call(arguments),
                        s = r.length,
                        a = 1 !== s || e && fe.isFunction(e.promise) ? s : 0,
                        l = 1 === a ? e : fe.Deferred(),
                        u = function(e, n, i) {
                            return function(o) {
                                n[e] = this, i[e] = arguments.length > 1 ? oe.call(arguments) : o, i === t ? l.notifyWith(n, i) : --a || l.resolveWith(n, i)
                            }
                        };
                    if (s > 1)
                        for (t = new Array(s), n = new Array(s), i = new Array(s); o < s; o++) r[o] && fe.isFunction(r[o].promise) ? r[o].promise().progress(u(o, n, t)).done(u(o, i, r)).fail(l.reject) : --a;
                    return a || l.resolveWith(i, r), l.promise()
                }
            }), fe.fn.ready = function(e) {
                return fe.ready.promise().done(e), this
            }, fe.extend({
                isReady: !1,
                readyWait: 1,
                holdReady: function(e) {
                    e ? fe.readyWait++ : fe.ready(!0)
                },
                ready: function(e) {
                    (!0 === e ? --fe.readyWait : fe.isReady) || (fe.isReady = !0, !0 !== e && --fe.readyWait > 0 || (Me.resolveWith(ie, [fe]), fe.fn.triggerHandler && (fe(ie).triggerHandler("ready"), fe(ie).off("ready"))))
                }
            }), fe.ready.promise = function(t) {
                if (!Me)
                    if (Me = fe.Deferred(), "complete" === ie.readyState || "loading" !== ie.readyState && !ie.documentElement.doScroll) e.setTimeout(fe.ready);
                    else if (ie.addEventListener) ie.addEventListener("DOMContentLoaded", a), e.addEventListener("load", a);
                else {
                    ie.attachEvent("onreadystatechange", a), e.attachEvent("onload", a);
                    var n = !1;
                    try {
                        n = null == e.frameElement && ie.documentElement
                    } catch (i) {}
                    n && n.doScroll && function o() {
                        if (!fe.isReady) {
                            try {
                                n.doScroll("left")
                            } catch (i) {
                                return e.setTimeout(o, 50)
                            }
                            s(), fe.ready()
                        }
                    }()
                }
                return Me.promise(t)
            }, fe.ready.promise(), fe(de)) break;
        de.ownFirst = "0" === je, de.inlineBlockNeedsLayout = !1, fe(function() {
                var e, t, n, i;
                (n = ie.getElementsByTagName("body")[0]) && n.style && (t = ie.createElement("div"), (i = ie.createElement("div")).style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", n.appendChild(i).appendChild(t), "undefined" != typeof t.style.zoom && (t.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1", de.inlineBlockNeedsLayout = e = 3 === t.offsetWidth, e && (n.style.zoom = 1)), n.removeChild(i))
            }),
            function() {
                var e = ie.createElement("div");
                de.deleteExpando = !0;
                try {
                    delete e.test
                } catch (t) {
                    de.deleteExpando = !1
                }
                e = null
            }();
        var Le, Ne = function(e) {
                var t = fe.noData[(e.nodeName + " ").toLowerCase()],
                    n = +e.nodeType || 1;
                return (1 === n || 9 === n) && (!t || !0 !== t && e.getAttribute("classid") === t)
            },
            _e = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
            Ie = /([A-Z])/g;
        fe.extend({
            cache: {},
            noData: {
                "applet ": !0,
                "embed ": !0,
                "object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
            },
            hasData: function(e) {
                return !!(e = e.nodeType ? fe.cache[e[fe.expando]] : e[fe.expando]) && !u(e)
            },
            data: function(e, t, n) {
                return c(e, t, n)
            },
            removeData: function(e, t) {
                return d(e, t)
            },
            _data: function(e, t, n) {
                return c(e, t, n, !0)
            },
            _removeData: function(e, t) {
                return d(e, t, !0)
            }
        }), fe.fn.extend({
            data: function(e, t) {
                var n, i, o, r = this[0],
                    s = r && r.attributes;
                if (e === undefined) {
                    if (this.length && (o = fe.data(r), 1 === r.nodeType && !fe._data(r, "parsedAttrs"))) {
                        for (n = s.length; n--;) s[n] && 0 === (i = s[n].name).indexOf("data-") && l(r, i = fe.camelCase(i.slice(5)), o[i]);
                        fe._data(r, "parsedAttrs", !0)
                    }
                    return o
                }
                return "object" == typeof e ? this.each(function() {
                    fe.data(this, e)
                }) : arguments.length > 1 ? this.each(function() {
                    fe.data(this, e, t)
                }) : r ? l(r, e, fe.data(r, e)) : undefined
            },
            removeData: function(e) {
                return this.each(function() {
                    fe.removeData(this, e)
                })
            }
        }), fe.extend({
            queue: function(e, t, n) {
                var i;
                if (e) return t = (t || "fx") + "queue", i = fe._data(e, t), n && (!i || fe.isArray(n) ? i = fe._data(e, t, fe.makeArray(n)) : i.push(n)), i || []
            },
            dequeue: function(e, t) {
                t = t || "fx";
                var n = fe.queue(e, t),
                    i = n.length,
                    o = n.shift(),
                    r = fe._queueHooks(e, t),
                    s = function() {
                        fe.dequeue(e, t)
                    };
                "inprogress" === o && (o = n.shift(), i--), o && ("fx" === t && n.unshift("inprogress"), delete r.stop, o.call(e, s, r)), !i && r && r.empty.fire()
            },
            _queueHooks: function(e, t) {
                var n = t + "queueHooks";
                return fe._data(e, n) || fe._data(e, n, {
                    empty: fe.Callbacks("once memory").add(function() {
                        fe._removeData(e, t + "queue"), fe._removeData(e, n)
                    })
                })
            }
        }), fe.fn.extend({
            queue: function(e, t) {
                var n = 2;
                return "string" != typeof e && (t = e, e = "fx", n--), arguments.length < n ? fe.queue(this[0], e) : t === undefined ? this : this.each(function() {
                    var n = fe.queue(this, e, t);
                    fe._queueHooks(this, e), "fx" === e && "inprogress" !== n[0] && fe.dequeue(this, e)
                })
            },
            dequeue: function(e) {
                return this.each(function() {
                    fe.dequeue(this, e)
                })
            },
            clearQueue: function(e) {
                return this.queue(e || "fx", [])
            },
            promise: function(e, t) {
                var n, i = 1,
                    o = fe.Deferred(),
                    r = this,
                    s = this.length,
                    a = function() {
                        --i || o.resolveWith(r, [r])
                    };
                for ("string" != typeof e && (t = e, e = undefined), e = e || "fx"; s--;)(n = fe._data(r[s], e + "queueHooks")) && n.empty && (i++, n.empty.add(a));
                return a(), o.promise(t)
            }
        }), de.shrinkWrapBlocks = function() {
            return null != Le ? Le : (Le = !1, (t = ie.getElementsByTagName("body")[0]) && t.style ? (e = ie.createElement("div"), (n = ie.createElement("div")).style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", t.appendChild(n).appendChild(e), "undefined" != typeof e.style.zoom && (e.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:1px;width:1px;zoom:1", e.appendChild(ie.createElement("div")).style.width = "5px", Le = 3 !== e.offsetWidth), t.removeChild(n), Le) : void 0);
            var e, t, n
        };
        var $e, Pe, Oe, Be = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
            ze = new RegExp("^(?:([+-])=|)(" + Be + ")([a-z%]*)$", "i"),
            He = ["Top", "Right", "Bottom", "Left"],
            Fe = function(e, t) {
                return e = t || e, "none" === fe.css(e, "display") || !fe.contains(e.ownerDocument, e)
            },
            Re = function(e, t, n, i, o, r, s) {
                var a = 0,
                    l = e.length,
                    u = null == n;
                if ("object" === fe.type(n))
                    for (a in o = !0, n) Re(e, t, a, n[a], !0, r, s);
                else if (i !== undefined && (o = !0, fe.isFunction(i) || (s = !0), u && (s ? (t.call(e, i), t = null) : (u = t, t = function(e, t, n) {
                        return u.call(fe(e), n)
                    })), t))
                    for (; a < l; a++) t(e[a], n, s ? i : i.call(e[a], a, t(e[a], n)));
                return o ? e : u ? t.call(e) : l ? t(e[0], n) : r
            },
            We = /^(?:checkbox|radio)$/i,
            qe = /<([\w:-]+)/,
            Ye = /^$|\/(?:java|ecma)script/i,
            Qe = /^\s+/,
            Ge = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|dialog|figcaption|figure|footer|header|hgroup|main|mark|meter|nav|output|picture|progress|section|summary|template|time|video";
        $e = ie.createElement("div"), Pe = ie.createDocumentFragment(), Oe = ie.createElement("input"), $e.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", de.leadingWhitespace = 3 === $e.firstChild.nodeType, de.tbody = !$e.getElementsByTagName("tbody").length, de.htmlSerialize = !!$e.getElementsByTagName("link").length, de.html5Clone = "<:nav></:nav>" !== ie.createElement("nav").cloneNode(!0).outerHTML, Oe.type = "checkbox", Oe.checked = !0, Pe.appendChild(Oe), de.appendChecked = Oe.checked, $e.innerHTML = "<textarea>x</textarea>", de.noCloneChecked = !!$e.cloneNode(!0).lastChild.defaultValue, Pe.appendChild($e), (Oe = ie.createElement("input")).setAttribute("type", "radio"), Oe.setAttribute("checked", "checked"), Oe.setAttribute("name", "t"), $e.appendChild(Oe), de.checkClone = $e.cloneNode(!0).cloneNode(!0).lastChild.checked, de.noCloneEvent = !!$e.addEventListener, $e[fe.expando] = 1, de.attributes = !$e.getAttribute(fe.expando);
        var Ue = {
            option: [1, "<select multiple='multiple'>", "</select>"],
            legend: [1, "<fieldset>", "</fieldset>"],
            area: [1, "<map>", "</map>"],
            param: [1, "<object>", "</object>"],
            thead: [1, "<table>", "</table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            _default: de.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"]
        };
        Ue.optgroup = Ue.option, Ue.tbody = Ue.tfoot = Ue.colgroup = Ue.caption = Ue.thead, Ue.th = Ue.td;
        var Ze = /<|&#?\w+;/,
            Ve = /<tbody/i;
        ! function() {
            var t, n, i = ie.createElement("div");
            for (t in {
                    submit: !0,
                    change: !0,
                    focusin: !0
                }) n = "on" + t, (de[t] = n in e) || (i.setAttribute(n, "t"), de[t] = !1 === i.attributes[n].expando);
            i = null
        }();
        var Xe = /^(?:input|select|textarea)$/i,
            Je = /^key/,
            Ke = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
            et = /^(?:focusinfocus|focusoutblur)$/,
            tt = /^([^.]*)(?:\.(.+)|)/;
        fe.event = {
            global: {},
            add: function(e, t, n, i, o) {
                var r, s, a, l, u, c, d, p, f, h, g, m = fe._data(e);
                if (m) {
                    for (n.handler && (n = (l = n).handler, o = l.selector), n.guid || (n.guid = fe.guid++), (s = m.events) || (s = m.events = {}), (c = m.handle) || ((c = m.handle = function(e) {
                            return void 0 === fe || e && fe.event.triggered === e.type ? undefined : fe.event.dispatch.apply(c.elem, arguments)
                        }).elem = e), a = (t = (t || "").match(Ee) || [""]).length; a--;) f = g = (r = tt.exec(t[a]) || [])[1], h = (r[2] || "").split(".").sort(), f && (u = fe.event.special[f] || {}, f = (o ? u.delegateType : u.bindType) || f, u = fe.event.special[f] || {}, d = fe.extend({
                        type: f,
                        origType: g,
                        data: i,
                        handler: n,
                        guid: n.guid,
                        selector: o,
                        needsContext: o && fe.expr.match.needsContext.test(o),
                        namespace: h.join(".")
                    }, l), (p = s[f]) || ((p = s[f] = []).delegateCount = 0, u.setup && !1 !== u.setup.call(e, i, h, c) || (e.addEventListener ? e.addEventListener(f, c, !1) : e.attachEvent && e.attachEvent("on" + f, c))), u.add && (u.add.call(e, d), d.handler.guid || (d.handler.guid = n.guid)), o ? p.splice(p.delegateCount++, 0, d) : p.push(d), fe.event.global[f] = !0);
                    e = null
                }
            },
            remove: function(e, t, n, i, o) {
                var r, s, a, l, u, c, d, p, f, h, g, m = fe.hasData(e) && fe._data(e);
                if (m && (c = m.events)) {
                    for (u = (t = (t || "").match(Ee) || [""]).length; u--;)
                        if (f = g = (a = tt.exec(t[u]) || [])[1], h = (a[2] || "").split(".").sort(), f) {
                            for (d = fe.event.special[f] || {}, p = c[f = (i ? d.delegateType : d.bindType) || f] || [], a = a[2] && new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)"), l = r = p.length; r--;) s = p[r], !o && g !== s.origType || n && n.guid !== s.guid || a && !a.test(s.namespace) || i && i !== s.selector && ("**" !== i || !s.selector) || (p.splice(r, 1), s.selector && p.delegateCount--, d.remove && d.remove.call(e, s));
                            l && !p.length && (d.teardown && !1 !== d.teardown.call(e, h, m.handle) || fe.removeEvent(e, f, m.handle), delete c[f])
                        } else
                            for (f in c) fe.event.remove(e, f + t[u], n, i, !0);
                    fe.isEmptyObject(c) && (delete m.handle, fe._removeData(e, "events"))
                }
            },
            trigger: function(t, n, i, o) {
                var r, s, a, l, u, c, d, p = [i || ie],
                    f = ce.call(t, "type") ? t.type : t,
                    h = ce.call(t, "namespace") ? t.namespace.split(".") : [];
                if (a = c = i = i || ie, 3 !== i.nodeType && 8 !== i.nodeType && !et.test(f + fe.event.triggered) && (f.indexOf(".") > -1 && (f = (h = f.split(".")).shift(), h.sort()), s = f.indexOf(":") < 0 && "on" + f, (t = t[fe.expando] ? t : new fe.Event(f, "object" == typeof t && t)).isTrigger = o ? 2 : 3, t.namespace = h.join("."), t.rnamespace = t.namespace ? new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, t.result = undefined, t.target || (t.target = i), n = null == n ? [t] : fe.makeArray(n, [t]), u = fe.event.special[f] || {}, o || !u.trigger || !1 !== u.trigger.apply(i, n))) {
                    if (!o && !u.noBubble && !fe.isWindow(i)) {
                        for (l = u.delegateType || f, et.test(l + f) || (a = a.parentNode); a; a = a.parentNode) p.push(a), c = a;
                        c === (i.ownerDocument || ie) && p.push(c.defaultView || c.parentWindow || e)
                    }
                    for (d = 0;
                        (a = p[d++]) && !t.isPropagationStopped();) t.type = d > 1 ? l : u.bindType || f, (r = (fe._data(a, "events") || {})[t.type] && fe._data(a, "handle")) && r.apply(a, n), (r = s && a[s]) && r.apply && Ne(a) && (t.result = r.apply(a, n), !1 === t.result && t.preventDefault());
                    if (t.type = f, !o && !t.isDefaultPrevented() && (!u._default || !1 === u._default.apply(p.pop(), n)) && Ne(i) && s && i[f] && !fe.isWindow(i)) {
                        (c = i[s]) && (i[s] = null), fe.event.triggered = f;
                        try {
                            i[f]()
                        } catch (g) {}
                        fe.event.triggered = undefined, c && (i[s] = c)
                    }
                    return t.result
                }
            },
            dispatch: function(e) {
                e = fe.event.fix(e);
                var t, n, i, o, r, s = [],
                    a = oe.call(arguments),
                    l = (fe._data(this, "events") || {})[e.type] || [],
                    u = fe.event.special[e.type] || {};
                if (a[0] = e, e.delegateTarget = this, !u.preDispatch || !1 !== u.preDispatch.call(this, e)) {
                    for (s = fe.event.handlers.call(this, e, l), t = 0;
                        (o = s[t++]) && !e.isPropagationStopped();)
                        for (e.currentTarget = o.elem, n = 0;
                            (r = o.handlers[n++]) && !e.isImmediatePropagationStopped();) e.rnamespace && !e.rnamespace.test(r.namespace) || (e.handleObj = r, e.data = r.data, (i = ((fe.event.special[r.origType] || {}).handle || r.handler).apply(o.elem, a)) !== undefined && !1 === (e.result = i) && (e.preventDefault(), e.stopPropagation()));
                    return u.postDispatch && u.postDispatch.call(this, e), e.result
                }
            },
            handlers: function(e, t) {
                var n, i, o, r, s = [],
                    a = t.delegateCount,
                    l = e.target;
                if (a && l.nodeType && ("click" !== e.type || isNaN(e.button) || e.button < 1))
                    for (; l != this; l = l.parentNode || this)
                        if (1 === l.nodeType && (!0 !== l.disabled || "click" !== e.type)) {
                            for (i = [], n = 0; n < a; n++) i[o = (r = t[n]).selector + " "] === undefined && (i[o] = r.needsContext ? fe(o, this).index(l) > -1 : fe.find(o, this, null, [l]).length), i[o] && i.push(r);
                            i.length && s.push({
                                elem: l,
                                handlers: i
                            })
                        } return a < t.length && s.push({
                    elem: this,
                    handlers: t.slice(a)
                }), s
            },
            fix: function(e) {
                if (e[fe.expando]) return e;
                var t, n, i, o = e.type,
                    r = e,
                    s = this.fixHooks[o];
                for (s || (this.fixHooks[o] = s = Ke.test(o) ? this.mouseHooks : Je.test(o) ? this.keyHooks : {}), i = s.props ? this.props.concat(s.props) : this.props, e = new fe.Event(r), t = i.length; t--;) e[n = i[t]] = r[n];
                return e.target || (e.target = r.srcElement || ie), 3 === e.target.nodeType && (e.target = e.target.parentNode), e.metaKey = !!e.metaKey, s.filter ? s.filter(e, r) : e
            },
            props: "altKey bubbles cancelable ctrlKey currentTarget detail eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
            fixHooks: {},
            keyHooks: {
                props: "char charCode key keyCode".split(" "),
                filter: function(e, t) {
                    return null == e.which && (e.which = null != t.charCode ? t.charCode : t.keyCode), e
                }
            },
            mouseHooks: {
                props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
                filter: function(e, t) {
                    var n, i, o, r = t.button,
                        s = t.fromElement;
                    return null == e.pageX && null != t.clientX && (o = (i = e.target.ownerDocument || ie).documentElement, n = i.body, e.pageX = t.clientX + (o && o.scrollLeft || n && n.scrollLeft || 0) - (o && o.clientLeft || n && n.clientLeft || 0), e.pageY = t.clientY + (o && o.scrollTop || n && n.scrollTop || 0) - (o && o.clientTop || n && n.clientTop || 0)), !e.relatedTarget && s && (e.relatedTarget = s === e.target ? t.toElement : s), e.which || r === undefined || (e.which = 1 & r ? 1 : 2 & r ? 3 : 4 & r ? 2 : 0), e
                }
            },
            special: {
                load: {
                    noBubble: !0
                },
                focus: {
                    trigger: function() {
                        if (this !== b() && this.focus) try {
                            return this.focus(), !1
                        } catch (e) {}
                    },
                    delegateType: "focusin"
                },
                blur: {
                    trigger: function() {
                        if (this === b() && this.blur) return this.blur(), !1
                    },
                    delegateType: "focusout"
                },
                click: {
                    trigger: function() {
                        if (fe.nodeName(this, "input") && "checkbox" === this.type && this.click) return this.click(), !1
                    },
                    _default: function(e) {
                        return fe.nodeName(e.target, "a")
                    }
                },
                beforeunload: {
                    postDispatch: function(e) {
                        e.result !== undefined && e.originalEvent && (e.originalEvent.returnValue = e.result)
                    }
                }
            },
            simulate: function(e, t, n) {
                var i = fe.extend(new fe.Event, n, {
                    type: e,
                    isSimulated: !0
                });
                fe.event.trigger(i, null, t), i.isDefaultPrevented() && n.preventDefault()
            }
        }, fe.removeEvent = ie.removeEventListener ? function(e, t, n) {
            e.removeEventListener && e.removeEventListener(t, n)
        } : function(e, t, n) {
            var i = "on" + t;
            e.detachEvent && ("undefined" == typeof e[i] && (e[i] = null), e.detachEvent(i, n))
        }, fe.Event = function(e, t) {
            if (!(this instanceof fe.Event)) return new fe.Event(e, t);
            e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || e.defaultPrevented === undefined && !1 === e.returnValue ? v : w) : this.type = e, t && fe.extend(this, t), this.timeStamp = e && e.timeStamp || fe.now(), this[fe.expando] = !0
        }, fe.Event.prototype = {
            constructor: fe.Event,
            isDefaultPrevented: w,
            isPropagationStopped: w,
            isImmediatePropagationStopped: w,
            preventDefault: function() {
                var e = this.originalEvent;
                this.isDefaultPrevented = v, e && (e.preventDefault ? e.preventDefault() : e.returnValue = !1)
            },
            stopPropagation: function() {
                var e = this.originalEvent;
                this.isPropagationStopped = v, e && !this.isSimulated && (e.stopPropagation && e.stopPropagation(), e.cancelBubble = !0)
            },
            stopImmediatePropagation: function() {
                var e = this.originalEvent;
                this.isImmediatePropagationStopped = v, e && e.stopImmediatePropagation && e.stopImmediatePropagation(), this.stopPropagation()
            }
        }, fe.each({
            mouseenter: "mouseover",
            mouseleave: "mouseout",
            pointerenter: "pointerover",
            pointerleave: "pointerout"
        }, function(e, t) {
            fe.event.special[e] = {
                delegateType: t,
                bindType: t,
                handle: function(e) {
                    var n, i = this,
                        o = e.relatedTarget,
                        r = e.handleObj;
                    return o && (o === i || fe.contains(i, o)) || (e.type = r.origType, n = r.handler.apply(this, arguments), e.type = t), n
                }
            }
        }), de.submit || (fe.event.special.submit = {
            setup: function() {
                if (fe.nodeName(this, "form")) return !1;
                fe.event.add(this, "click._submit keypress._submit", function(e) {
                    var t = e.target,
                        n = fe.nodeName(t, "input") || fe.nodeName(t, "button") ? fe.prop(t, "form") : undefined;
                    n && !fe._data(n, "submit") && (fe.event.add(n, "submit._submit", function(e) {
                        e._submitBubble = !0
                    }), fe._data(n, "submit", !0))
                })
            },
            postDispatch: function(e) {
                e._submitBubble && (delete e._submitBubble, this.parentNode && !e.isTrigger && fe.event.simulate("submit", this.parentNode, e))
            },
            teardown: function() {
                if (fe.nodeName(this, "form")) return !1;
                fe.event.remove(this, "._submit")
            }
        }), de.change || (fe.event.special.change = {
            setup: function() {
                if (Xe.test(this.nodeName)) return "checkbox" !== this.type && "radio" !== this.type || (fe.event.add(this, "propertychange._change", function(e) {
                    "checked" === e.originalEvent.propertyName && (this._justChanged = !0)
                }), fe.event.add(this, "click._change", function(e) {
                    this._justChanged && !e.isTrigger && (this._justChanged = !1), fe.event.simulate("change", this, e)
                })), !1;
                fe.event.add(this, "beforeactivate._change", function(e) {
                    var t = e.target;
                    Xe.test(t.nodeName) && !fe._data(t, "change") && (fe.event.add(t, "change._change", function(e) {
                        !this.parentNode || e.isSimulated || e.isTrigger || fe.event.simulate("change", this.parentNode, e)
                    }), fe._data(t, "change", !0))
                })
            },
            handle: function(e) {
                var t = e.target;
                if (this !== t || e.isSimulated || e.isTrigger || "radio" !== t.type && "checkbox" !== t.type) return e.handleObj.handler.apply(this, arguments)
            },
            teardown: function() {
                return fe.event.remove(this, "._change"), !Xe.test(this.nodeName)
            }
        }), de.focusin || fe.each({
            focus: "focusin",
            blur: "focusout"
        }, function(e, t) {
            var n = function(e) {
                fe.event.simulate(t, e.target, fe.event.fix(e))
            };
            fe.event.special[t] = {
                setup: function() {
                    var i = this.ownerDocument || this,
                        o = fe._data(i, t);
                    o || i.addEventListener(e, n, !0), fe._data(i, t, (o || 0) + 1)
                },
                teardown: function() {
                    var i = this.ownerDocument || this,
                        o = fe._data(i, t) - 1;
                    o ? fe._data(i, t, o) : (i.removeEventListener(e, n, !0), fe._removeData(i, t))
                }
            }
        }), fe.fn.extend({
            on: function(e, t, n, i) {
                return x(this, e, t, n, i)
            },
            one: function(e, t, n, i) {
                return x(this, e, t, n, i, 1)
            },
            off: function(e, t, n) {
                var i, o;
                if (e && e.preventDefault && e.handleObj) return i = e.handleObj, fe(e.delegateTarget).off(i.namespace ? i.origType + "." + i.namespace : i.origType, i.selector, i.handler), this;
                if ("object" == typeof e) {
                    for (o in e) this.off(o, t, e[o]);
                    return this
                }
                return !1 !== t && "function" != typeof t || (n = t, t = undefined), !1 === n && (n = w), this.each(function() {
                    fe.event.remove(this, e, n, t)
                })
            },
            trigger: function(e, t) {
                return this.each(function() {
                    fe.event.trigger(e, t, this)
                })
            },
            triggerHandler: function(e, t) {
                var n = this[0];
                if (n) return fe.event.trigger(e, t, n, !0)
            }
        });
        var nt = / jQuery\d+="(?:null|\d+)"/g,
            it = new RegExp("<(?:" + Ge + ")[\\s/>]", "i"),
            ot = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,
            rt = /<script|<style|<link/i,
            st = /checked\s*(?:[^=]|=\s*.checked.)/i,
            at = /^true\/(.*)/,
            lt = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
            ut = f(ie).appendChild(ie.createElement("div"));
        fe.extend({
            htmlPrefilter: function(e) {
                return e.replace(ot, "<$1></$2>")
            },
            clone: function(e, t, n) {
                var i, o, r, s, a, l = fe.contains(e.ownerDocument, e);
                if (de.html5Clone || fe.isXMLDoc(e) || !it.test("<" + e.nodeName + ">") ? r = e.cloneNode(!0) : (ut.innerHTML = e.outerHTML, ut.removeChild(r = ut.firstChild)), !(de.noCloneEvent && de.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || fe.isXMLDoc(e)))
                    for (i = h(r), a = h(e), s = 0; null != (o = a[s]); ++s) i[s] && A(o, i[s]);
                if (t)
                    if (n)
                        for (a = a || h(e), i = i || h(r), s = 0; null != (o = a[s]); s++) k(o, i[s]);
                    else k(e, r);
                return (i = h(r, "script")).length > 0 && g(i, !l && h(e, "script")), i = a = o = null, r
            },
            cleanData: function(e, t) {
                for (var n, i, o, r, s = 0, a = fe.expando, l = fe.cache, u = de.attributes, c = fe.event.special; null != (n = e[s]); s++)
                    if ((t || Ne(n)) && (r = (o = n[a]) && l[o])) {
                        if (r.events)
                            for (i in r.events) c[i] ? fe.event.remove(n, i) : fe.removeEvent(n, i, r.handle);
                        l[o] && (delete l[o], u || "undefined" == typeof n.removeAttribute ? n[a] = undefined : n.removeAttribute(a), ne.push(o))
                    }
            }
        }), fe.fn.extend({
            domManip: D,
            detach: function(e) {
                return M(this, e, !0)
            },
            remove: function(e) {
                return M(this, e)
            },
            text: function(e) {
                return Re(this, function(e) {
                    return e === undefined ? fe.text(this) : this.empty().append((this[0] && this[0].ownerDocument || ie).createTextNode(e))
                }, null, e, arguments.length)
            },
            append: function() {
                return D(this, arguments, function(e) {
                    1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || C(this, e).appendChild(e)
                })
            },
            prepend: function() {
                return D(this, arguments, function(e) {
                    if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                        var t = C(this, e);
                        t.insertBefore(e, t.firstChild)
                    }
                })
            },
            before: function() {
                return D(this, arguments, function(e) {
                    this.parentNode && this.parentNode.insertBefore(e, this)
                })
            },
            after: function() {
                return D(this, arguments, function(e) {
                    this.parentNode && this.parentNode.insertBefore(e, this.nextSibling)
                })
            },
            empty: function() {
                for (var e, t = 0; null != (e = this[t]); t++) {
                    for (1 === e.nodeType && fe.cleanData(h(e, !1)); e.firstChild;) e.removeChild(e.firstChild);
                    e.options && fe.nodeName(e, "select") && (e.options.length = 0)
                }
                return this
            },
            clone: function(e, t) {
                return e = null != e && e, t = null == t ? e : t, this.map(function() {
                    return fe.clone(this, e, t)
                })
            },
            html: function(e) {
                return Re(this, function(e) {
                    var t = this[0] || {},
                        n = 0,
                        i = this.length;
                    if (e === undefined) return 1 === t.nodeType ? t.innerHTML.replace(nt, "") : undefined;
                    if ("string" == typeof e && !rt.test(e) && (de.htmlSerialize || !it.test(e)) && (de.leadingWhitespace || !Qe.test(e)) && !Ue[(qe.exec(e) || ["", ""])[1].toLowerCase()]) {
                        e = fe.htmlPrefilter(e);
                        try {
                            for (; n < i; n++) 1 === (t = this[n] || {}).nodeType && (fe.cleanData(h(t, !1)), t.innerHTML = e);
                            t = 0
                        } catch (o) {}
                    }
                    t && this.empty().append(e)
                }, null, e, arguments.length)
            },
            replaceWith: function() {
                var e = [];
                return D(this, arguments, function(t) {
                    var n = this.parentNode;
                    fe.inArray(this, e) < 0 && (fe.cleanData(h(this)), n && n.replaceChild(t, this))
                }, e)
            }
        }), fe.each({
            appendTo: "append",
            prependTo: "prepend",
            insertBefore: "before",
            insertAfter: "after",
            replaceAll: "replaceWith"
        }, function(e, t) {
            fe.fn[e] = function(e) {
                for (var n, i = 0, o = [], r = fe(e), s = r.length - 1; i <= s; i++) n = i === s ? this : this.clone(!0), fe(r[i])[t](n), se.apply(o, n.get());
                return this.pushStack(o)
            }
        });
        var ct, dt = {
                HTML: "block",
                BODY: "block"
            },
            pt = /^margin/,
            ft = new RegExp("^(" + Be + ")(?!px)[a-z%]+$", "i"),
            ht = function(e, t, n, i) {
                var o, r, s = {};
                for (r in t) s[r] = e.style[r], e.style[r] = t[r];
                for (r in o = n.apply(e, i || []), t) e.style[r] = s[r];
                return o
            },
            gt = ie.documentElement;
        ! function() {
            function t() {
                var t, c, d = ie.documentElement;
                d.appendChild(l), u.style.cssText = "-webkit-box-sizing:border-box;box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%", n = o = a = !1, i = s = !0, e.getComputedStyle && (c = e.getComputedStyle(u), n = "1%" !== (c || {}).top, a = "2px" === (c || {}).marginLeft, o = "4px" === (c || {
                        width: "4px"
                    }).width, u.style.marginRight = "50%", i = "4px" === (c || {
                        marginRight: "4px"
                    }).marginRight, (t = u.appendChild(ie.createElement("div"))).style.cssText = u.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0",
                    t.style.marginRight = t.style.width = "0", u.style.width = "1px", s = !parseFloat((e.getComputedStyle(t) || {}).marginRight), u.removeChild(t)), u.style.display = "none", (r = 0 === u.getClientRects().length) && (u.style.display = "", u.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", u.childNodes[0].style.borderCollapse = "separate", (t = u.getElementsByTagName("td"))[0].style.cssText = "margin:0;border:0;padding:0;display:none", (r = 0 === t[0].offsetHeight) && (t[0].style.display = "", t[1].style.display = "none", r = 0 === t[0].offsetHeight)), d.removeChild(l)
            }
            var n, i, o, r, s, a, l = ie.createElement("div"),
                u = ie.createElement("div");
            u.style && (u.style.cssText = "float:left;opacity:.5", de.opacity = "0.5" === u.style.opacity, de.cssFloat = !!u.style.cssFloat, u.style.backgroundClip = "content-box", u.cloneNode(!0).style.backgroundClip = "", de.clearCloneStyle = "content-box" === u.style.backgroundClip, (l = ie.createElement("div")).style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute", u.innerHTML = "", l.appendChild(u), de.boxSizing = "" === u.style.boxSizing || "" === u.style.MozBoxSizing || "" === u.style.WebkitBoxSizing, fe.extend(de, {
                reliableHiddenOffsets: function() {
                    return null == n && t(), r
                },
                boxSizingReliable: function() {
                    return null == n && t(), o
                },
                pixelMarginRight: function() {
                    return null == n && t(), i
                },
                pixelPosition: function() {
                    return null == n && t(), n
                },
                reliableMarginRight: function() {
                    return null == n && t(), s
                },
                reliableMarginLeft: function() {
                    return null == n && t(), a
                }
            }))
        }();
        var mt, yt, vt = /^(top|right|bottom|left)$/;
        e.getComputedStyle ? (mt = function(t) {
            var n = t.ownerDocument.defaultView;
            return n && n.opener || (n = e), n.getComputedStyle(t)
        }, yt = function(e, t, n) {
            var i, o, r, s, a = e.style;
            return "" !== (s = (n = n || mt(e)) ? n.getPropertyValue(t) || n[t] : undefined) && s !== undefined || fe.contains(e.ownerDocument, e) || (s = fe.style(e, t)), n && !de.pixelMarginRight() && ft.test(s) && pt.test(t) && (i = a.width, o = a.minWidth, r = a.maxWidth, a.minWidth = a.maxWidth = a.width = s, s = n.width, a.width = i, a.minWidth = o, a.maxWidth = r), s === undefined ? s : s + ""
        }) : gt.currentStyle && (mt = function(e) {
            return e.currentStyle
        }, yt = function(e, t, n) {
            var i, o, r, s, a = e.style;
            return null == (s = (n = n || mt(e)) ? n[t] : undefined) && a && a[t] && (s = a[t]), ft.test(s) && !vt.test(t) && (i = a.left, (r = (o = e.runtimeStyle) && o.left) && (o.left = e.currentStyle.left), a.left = "fontSize" === t ? "1em" : s, s = a.pixelLeft + "px", a.left = i, r && (o.left = r)), s === undefined ? s : s + "" || "auto"
        });
        var wt = /alpha\([^)]*\)/i,
            bt = /opacity\s*=\s*([^)]*)/i,
            xt = /^(none|table(?!-c[ea]).+)/,
            Ct = new RegExp("^(" + Be + ")(.*)$", "i"),
            St = {
                position: "absolute",
                visibility: "hidden",
                display: "block"
            },
            Tt = {
                letterSpacing: "0",
                fontWeight: "400"
            },
            kt = ["Webkit", "O", "Moz", "ms"],
            At = ie.createElement("div").style;
        fe.extend({
            cssHooks: {
                opacity: {
                    get: function(e, t) {
                        if (t) {
                            var n = yt(e, "opacity");
                            return "" === n ? "1" : n
                        }
                    }
                }
            },
            cssNumber: {
                animationIterationCount: !0,
                columnCount: !0,
                fillOpacity: !0,
                flexGrow: !0,
                flexShrink: !0,
                fontWeight: !0,
                lineHeight: !0,
                opacity: !0,
                order: !0,
                orphans: !0,
                widows: !0,
                zIndex: !0,
                zoom: !0
            },
            cssProps: {
                "float": de.cssFloat ? "cssFloat" : "styleFloat"
            },
            style: function(e, t, n, i) {
                if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
                    var o, r, s, a = fe.camelCase(t),
                        l = e.style;
                    if (t = fe.cssProps[a] || (fe.cssProps[a] = N(a) || a), s = fe.cssHooks[t] || fe.cssHooks[a], n === undefined) return s && "get" in s && (o = s.get(e, !1, i)) !== undefined ? o : l[t];
                    if ("string" === (r = typeof n) && (o = ze.exec(n)) && o[1] && (n = p(e, t, o), r = "number"), null != n && n == n && ("number" === r && (n += o && o[3] || (fe.cssNumber[a] ? "" : "px")), de.clearCloneStyle || "" !== n || 0 !== t.indexOf("background") || (l[t] = "inherit"), !(s && "set" in s && (n = s.set(e, n, i)) === undefined))) try {
                        l[t] = n
                    } catch (u) {}
                }
            },
            css: function(e, t, n, i) {
                var o, r, s, a = fe.camelCase(t);
                return t = fe.cssProps[a] || (fe.cssProps[a] = N(a) || a), (s = fe.cssHooks[t] || fe.cssHooks[a]) && "get" in s && (r = s.get(e, !0, n)), r === undefined && (r = yt(e, t, i)), "normal" === r && t in Tt && (r = Tt[t]), "" === n || n ? (o = parseFloat(r), !0 === n || isFinite(o) ? o || 0 : r) : r
            }
        }), fe.each(["height", "width"], function(e, t) {
            fe.cssHooks[t] = {
                get: function(e, n, i) {
                    if (n) return xt.test(fe.css(e, "display")) && 0 === e.offsetWidth ? ht(e, St, function() {
                        return P(e, t, i)
                    }) : P(e, t, i)
                },
                set: function(e, n, i) {
                    var o = i && mt(e);
                    return I(e, n, i ? $(e, t, i, de.boxSizing && "border-box" === fe.css(e, "boxSizing", !1, o), o) : 0)
                }
            }
        }), de.opacity || (fe.cssHooks.opacity = {
            get: function(e, t) {
                return bt.test((t && e.currentStyle ? e.currentStyle.filter : e.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : t ? "1" : ""
            },
            set: function(e, t) {
                var n = e.style,
                    i = e.currentStyle,
                    o = fe.isNumeric(t) ? "alpha(opacity=" + 100 * t + ")" : "",
                    r = i && i.filter || n.filter || "";
                n.zoom = 1, (t >= 1 || "" === t) && "" === fe.trim(r.replace(wt, "")) && n.removeAttribute && (n.removeAttribute("filter"), "" === t || i && !i.filter) || (n.filter = wt.test(r) ? r.replace(wt, o) : r + " " + o)
            }
        }), fe.cssHooks.marginRight = L(de.reliableMarginRight, function(e, t) {
            if (t) return ht(e, {
                display: "inline-block"
            }, yt, [e, "marginRight"])
        }), fe.cssHooks.marginLeft = L(de.reliableMarginLeft, function(e, t) {
            if (t) return (parseFloat(yt(e, "marginLeft")) || (fe.contains(e.ownerDocument, e) ? e.getBoundingClientRect().left - ht(e, {
                marginLeft: 0
            }, function() {
                return e.getBoundingClientRect().left
            }) : 0)) + "px"
        }), fe.each({
            margin: "",
            padding: "",
            border: "Width"
        }, function(e, t) {
            fe.cssHooks[e + t] = {
                expand: function(n) {
                    for (var i = 0, o = {}, r = "string" == typeof n ? n.split(" ") : [n]; i < 4; i++) o[e + He[i] + t] = r[i] || r[i - 2] || r[0];
                    return o
                }
            }, pt.test(e) || (fe.cssHooks[e + t].set = I)
        }), fe.fn.extend({
            css: function(e, t) {
                return Re(this, function(e, t, n) {
                    var i, o, r = {},
                        s = 0;
                    if (fe.isArray(t)) {
                        for (i = mt(e), o = t.length; s < o; s++) r[t[s]] = fe.css(e, t[s], !1, i);
                        return r
                    }
                    return n !== undefined ? fe.style(e, t, n) : fe.css(e, t)
                }, e, t, arguments.length > 1)
            },
            show: function() {
                return _(this, !0)
            },
            hide: function() {
                return _(this)
            },
            toggle: function(e) {
                return "boolean" == typeof e ? e ? this.show() : this.hide() : this.each(function() {
                    Fe(this) ? fe(this).show() : fe(this).hide()
                })
            }
        }), fe.Tween = O, O.prototype = {
            constructor: O,
            init: function(e, t, n, i, o, r) {
                this.elem = e, this.prop = n, this.easing = o || fe.easing._default, this.options = t, this.start = this.now = this.cur(), this.end = i, this.unit = r || (fe.cssNumber[n] ? "" : "px")
            },
            cur: function() {
                var e = O.propHooks[this.prop];
                return e && e.get ? e.get(this) : O.propHooks._default.get(this)
            },
            run: function(e) {
                var t, n = O.propHooks[this.prop];
                return this.options.duration ? this.pos = t = fe.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : this.pos = t = e, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : O.propHooks._default.set(this), this
            }
        }, O.prototype.init.prototype = O.prototype, O.propHooks = {
            _default: {
                get: function(e) {
                    var t;
                    return 1 !== e.elem.nodeType || null != e.elem[e.prop] && null == e.elem.style[e.prop] ? e.elem[e.prop] : (t = fe.css(e.elem, e.prop, "")) && "auto" !== t ? t : 0
                },
                set: function(e) {
                    fe.fx.step[e.prop] ? fe.fx.step[e.prop](e) : 1 !== e.elem.nodeType || null == e.elem.style[fe.cssProps[e.prop]] && !fe.cssHooks[e.prop] ? e.elem[e.prop] = e.now : fe.style(e.elem, e.prop, e.now + e.unit)
                }
            }
        }, O.propHooks.scrollTop = O.propHooks.scrollLeft = {
            set: function(e) {
                e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
            }
        }, fe.easing = {
            linear: function(e) {
                return e
            },
            swing: function(e) {
                return .5 - Math.cos(e * Math.PI) / 2
            },
            _default: "swing"
        }, fe.fx = O.prototype.init, fe.fx.step = {};
        var Dt, Mt, jt, Et, Lt, Nt, _t, It = /^(?:toggle|show|hide)$/,
            $t = /queueHooks$/;
        fe.Animation = fe.extend(W, {
            tweeners: {
                "*": [function(e, t) {
                    var n = this.createTween(e, t);
                    return p(n.elem, e, ze.exec(t), n), n
                }]
            },
            tweener: function(e, t) {
                fe.isFunction(e) ? (t = e, e = ["*"]) : e = e.match(Ee);
                for (var n, i = 0, o = e.length; i < o; i++) n = e[i], W.tweeners[n] = W.tweeners[n] || [], W.tweeners[n].unshift(t)
            },
            prefilters: [F],
            prefilter: function(e, t) {
                t ? W.prefilters.unshift(e) : W.prefilters.push(e)
            }
        }), fe.speed = function(e, t, n) {
            var i = e && "object" == typeof e ? fe.extend({}, e) : {
                complete: n || !n && t || fe.isFunction(e) && e,
                duration: e,
                easing: n && t || t && !fe.isFunction(t) && t
            };
            return i.duration = fe.fx.off ? 0 : "number" == typeof i.duration ? i.duration : i.duration in fe.fx.speeds ? fe.fx.speeds[i.duration] : fe.fx.speeds._default, null != i.queue && !0 !== i.queue || (i.queue = "fx"), i.old = i.complete, i.complete = function() {
                fe.isFunction(i.old) && i.old.call(this), i.queue && fe.dequeue(this, i.queue)
            }, i
        }, fe.fn.extend({
            fadeTo: function(e, t, n, i) {
                return this.filter(Fe).css("opacity", 0).show().end().animate({
                    opacity: t
                }, e, n, i)
            },
            animate: function(e, t, n, i) {
                var o = fe.isEmptyObject(e),
                    r = fe.speed(t, n, i),
                    s = function() {
                        var t = W(this, fe.extend({}, e), r);
                        (o || fe._data(this, "finish")) && t.stop(!0)
                    };
                return s.finish = s, o || !1 === r.queue ? this.each(s) : this.queue(r.queue, s)
            },
            stop: function(e, t, n) {
                var i = function(e) {
                    var t = e.stop;
                    delete e.stop, t(n)
                };
                return "string" != typeof e && (n = t, t = e, e = undefined), t && !1 !== e && this.queue(e || "fx", []), this.each(function() {
                    var t = !0,
                        o = null != e && e + "queueHooks",
                        r = fe.timers,
                        s = fe._data(this);
                    if (o) s[o] && s[o].stop && i(s[o]);
                    else
                        for (o in s) s[o] && s[o].stop && $t.test(o) && i(s[o]);
                    for (o = r.length; o--;) r[o].elem !== this || null != e && r[o].queue !== e || (r[o].anim.stop(n), t = !1, r.splice(o, 1));
                    !t && n || fe.dequeue(this, e)
                })
            },
            finish: function(e) {
                return !1 !== e && (e = e || "fx"), this.each(function() {
                    var t, n = fe._data(this),
                        i = n[e + "queue"],
                        o = n[e + "queueHooks"],
                        r = fe.timers,
                        s = i ? i.length : 0;
                    for (n.finish = !0, fe.queue(this, e, []), o && o.stop && o.stop.call(this, !0), t = r.length; t--;) r[t].elem === this && r[t].queue === e && (r[t].anim.stop(!0), r.splice(t, 1));
                    for (t = 0; t < s; t++) i[t] && i[t].finish && i[t].finish.call(this);
                    delete n.finish
                })
            }
        }), fe.each(["toggle", "show", "hide"], function(e, t) {
            var n = fe.fn[t];
            fe.fn[t] = function(e, i, o) {
                return null == e || "boolean" == typeof e ? n.apply(this, arguments) : this.animate(z(t, !0), e, i, o)
            }
        }), fe.each({
            slideDown: z("show"),
            slideUp: z("hide"),
            slideToggle: z("toggle"),
            fadeIn: {
                opacity: "show"
            },
            fadeOut: {
                opacity: "hide"
            },
            fadeToggle: {
                opacity: "toggle"
            }
        }, function(e, t) {
            fe.fn[e] = function(e, n, i) {
                return this.animate(t, e, n, i)
            }
        }), fe.timers = [], fe.fx.tick = function() {
            var e, t = fe.timers,
                n = 0;
            for (Dt = fe.now(); n < t.length; n++)(e = t[n])() || t[n] !== e || t.splice(n--, 1);
            t.length || fe.fx.stop(), Dt = undefined
        }, fe.fx.timer = function(e) {
            fe.timers.push(e), e() ? fe.fx.start() : fe.timers.pop()
        }, fe.fx.interval = 13, fe.fx.start = function() {
            Mt || (Mt = e.setInterval(fe.fx.tick, fe.fx.interval))
        }, fe.fx.stop = function() {
            e.clearInterval(Mt), Mt = null
        }, fe.fx.speeds = {
            slow: 600,
            fast: 200,
            _default: 400
        }, fe.fn.delay = function(t, n) {
            return t = fe.fx && fe.fx.speeds[t] || t, n = n || "fx", this.queue(n, function(n, i) {
                var o = e.setTimeout(n, t);
                i.stop = function() {
                    e.clearTimeout(o)
                }
            })
        }, Et = ie.createElement("input"), Lt = ie.createElement("div"), Nt = ie.createElement("select"), _t = Nt.appendChild(ie.createElement("option")), (Lt = ie.createElement("div")).setAttribute("className", "t"), Lt.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", jt = Lt.getElementsByTagName("a")[0], Et.setAttribute("type", "checkbox"), Lt.appendChild(Et), (jt = Lt.getElementsByTagName("a")[0]).style.cssText = "top:1px", de.getSetAttribute = "t" !== Lt.className, de.style = /top/.test(jt.getAttribute("style")), de.hrefNormalized = "/a" === jt.getAttribute("href"), de.checkOn = !!Et.value, de.optSelected = _t.selected, de.enctype = !!ie.createElement("form").enctype, Nt.disabled = !0, de.optDisabled = !_t.disabled, (Et = ie.createElement("input")).setAttribute("value", ""), de.input = "" === Et.getAttribute("value"), Et.value = "t", Et.setAttribute("type", "radio"), de.radioValue = "t" === Et.value;
        var Pt = /\r/g,
            Ot = /[\x20\t\r\n\f]+/g;
        fe.fn.extend({
            val: function(e) {
                var t, n, i, o = this[0];
                return arguments.length ? (i = fe.isFunction(e), this.each(function(n) {
                    var o;
                    1 === this.nodeType && (null == (o = i ? e.call(this, n, fe(this).val()) : e) ? o = "" : "number" == typeof o ? o += "" : fe.isArray(o) && (o = fe.map(o, function(e) {
                        return null == e ? "" : e + ""
                    })), (t = fe.valHooks[this.type] || fe.valHooks[this.nodeName.toLowerCase()]) && "set" in t && t.set(this, o, "value") !== undefined || (this.value = o))
                })) : o ? (t = fe.valHooks[o.type] || fe.valHooks[o.nodeName.toLowerCase()]) && "get" in t && (n = t.get(o, "value")) !== undefined ? n : "string" == typeof(n = o.value) ? n.replace(Pt, "") : null == n ? "" : n : void 0
            }
        }), fe.extend({
            valHooks: {
                option: {
                    get: function(e) {
                        var t = fe.find.attr(e, "value");
                        return null != t ? t : fe.trim(fe.text(e)).replace(Ot, " ")
                    }
                },
                select: {
                    get: function(e) {
                        for (var t, n, i = e.options, o = e.selectedIndex, r = "select-one" === e.type || o < 0, s = r ? null : [], a = r ? o + 1 : i.length, l = o < 0 ? a : r ? o : 0; l < a; l++)
                            if (((n = i[l]).selected || l === o) && (de.optDisabled ? !n.disabled : null === n.getAttribute("disabled")) && (!n.parentNode.disabled || !fe.nodeName(n.parentNode, "optgroup"))) {
                                if (t = fe(n).val(), r) return t;
                                s.push(t)
                            } return s
                    },
                    set: function(e, t) {
                        for (var n, i, o = e.options, r = fe.makeArray(t), s = o.length; s--;)
                            if (i = o[s], fe.inArray(fe.valHooks.option.get(i), r) > -1) try {
                                i.selected = n = !0
                            } catch (a) {
                                i.scrollHeight
                            } else i.selected = !1;
                        return n || (e.selectedIndex = -1), o
                    }
                }
            }
        }), fe.each(["radio", "checkbox"], function() {
            fe.valHooks[this] = {
                set: function(e, t) {
                    if (fe.isArray(t)) return e.checked = fe.inArray(fe(e).val(), t) > -1
                }
            }, de.checkOn || (fe.valHooks[this].get = function(e) {
                return null === e.getAttribute("value") ? "on" : e.value
            })
        });
        var Bt, zt, Ht = fe.expr.attrHandle,
            Ft = /^(?:checked|selected)$/i,
            Rt = de.getSetAttribute,
            Wt = de.input;
        fe.fn.extend({
            attr: function(e, t) {
                return Re(this, fe.attr, e, t, arguments.length > 1)
            },
            removeAttr: function(e) {
                return this.each(function() {
                    fe.removeAttr(this, e)
                })
            }
        }), fe.extend({
            attr: function(e, t, n) {
                var i, o, r = e.nodeType;
                if (3 !== r && 8 !== r && 2 !== r) return "undefined" == typeof e.getAttribute ? fe.prop(e, t, n) : (1 === r && fe.isXMLDoc(e) || (t = t.toLowerCase(), o = fe.attrHooks[t] || (fe.expr.match.bool.test(t) ? zt : Bt)), n !== undefined ? null === n ? void fe.removeAttr(e, t) : o && "set" in o && (i = o.set(e, n, t)) !== undefined ? i : (e.setAttribute(t, n + ""), n) : o && "get" in o && null !== (i = o.get(e, t)) ? i : null == (i = fe.find.attr(e, t)) ? undefined : i)
            },
            attrHooks: {
                type: {
                    set: function(e, t) {
                        if (!de.radioValue && "radio" === t && fe.nodeName(e, "input")) {
                            var n = e.value;
                            return e.setAttribute("type", t), n && (e.value = n), t
                        }
                    }
                }
            },
            removeAttr: function(e, t) {
                var n, i, o = 0,
                    r = t && t.match(Ee);
                if (r && 1 === e.nodeType)
                    for (; n = r[o++];) i = fe.propFix[n] || n, fe.expr.match.bool.test(n) ? Wt && Rt || !Ft.test(n) ? e[i] = !1 : e[fe.camelCase("default-" + n)] = e[i] = !1 : fe.attr(e, n, ""), e.removeAttribute(Rt ? n : i)
            }
        }), zt = {
            set: function(e, t, n) {
                return !1 === t ? fe.removeAttr(e, n) : Wt && Rt || !Ft.test(n) ? e.setAttribute(!Rt && fe.propFix[n] || n, n) : e[fe.camelCase("default-" + n)] = e[n] = !0, n
            }
        }, fe.each(fe.expr.match.bool.source.match(/\w+/g), function(e, t) {
            var n = Ht[t] || fe.find.attr;
            Wt && Rt || !Ft.test(t) ? Ht[t] = function(e, t, i) {
                var o, r;
                return i || (r = Ht[t], Ht[t] = o, o = null != n(e, t, i) ? t.toLowerCase() : null, Ht[t] = r), o
            } : Ht[t] = function(e, t, n) {
                if (!n) return e[fe.camelCase("default-" + t)] ? t.toLowerCase() : null
            }
        }), Wt && Rt || (fe.attrHooks.value = {
            set: function(e, t, n) {
                if (!fe.nodeName(e, "input")) return Bt && Bt.set(e, t, n);
                e.defaultValue = t
            }
        }), Rt || (Bt = {
            set: function(e, t, n) {
                var i = e.getAttributeNode(n);
                if (i || e.setAttributeNode(i = e.ownerDocument.createAttribute(n)), i.value = t += "", "value" === n || t === e.getAttribute(n)) return t
            }
        }, Ht.id = Ht.name = Ht.coords = function(e, t, n) {
            var i;
            if (!n) return (i = e.getAttributeNode(t)) && "" !== i.value ? i.value : null
        }, fe.valHooks.button = {
            get: function(e, t) {
                var n = e.getAttributeNode(t);
                if (n && n.specified) return n.value
            },
            set: Bt.set
        }, fe.attrHooks.contenteditable = {
            set: function(e, t, n) {
                Bt.set(e, "" !== t && t, n)
            }
        }, fe.each(["width", "height"], function(e, t) {
            fe.attrHooks[t] = {
                set: function(e, n) {
                    if ("" === n) return e.setAttribute(t, "auto"), n
                }
            }
        })), de.style || (fe.attrHooks.style = {
            get: function(e) {
                return e.style.cssText || undefined
            },
            set: function(e, t) {
                return e.style.cssText = t + ""
            }
        });
        var qt = /^(?:input|select|textarea|button|object)$/i,
            Yt = /^(?:a|area)$/i;
        fe.fn.extend({
            prop: function(e, t) {
                return Re(this, fe.prop, e, t, arguments.length > 1)
            },
            removeProp: function(e) {
                return e = fe.propFix[e] || e, this.each(function() {
                    try {
                        this[e] = undefined, delete this[e]
                    } catch (t) {}
                })
            }
        }), fe.extend({
            prop: function(e, t, n) {
                var i, o, r = e.nodeType;
                if (3 !== r && 8 !== r && 2 !== r) return 1 === r && fe.isXMLDoc(e) || (t = fe.propFix[t] || t, o = fe.propHooks[t]), n !== undefined ? o && "set" in o && (i = o.set(e, n, t)) !== undefined ? i : e[t] = n : o && "get" in o && null !== (i = o.get(e, t)) ? i : e[t]
            },
            propHooks: {
                tabIndex: {
                    get: function(e) {
                        var t = fe.find.attr(e, "tabindex");
                        return t ? parseInt(t, 10) : qt.test(e.nodeName) || Yt.test(e.nodeName) && e.href ? 0 : -1
                    }
                }
            },
            propFix: {
                "for": "htmlFor",
                "class": "className"
            }
        }), de.hrefNormalized || fe.each(["href", "src"], function(e, t) {
            fe.propHooks[t] = {
                get: function(e) {
                    return e.getAttribute(t, 4)
                }
            }
        }), de.optSelected || (fe.propHooks.selected = {
            get: function(e) {
                var t = e.parentNode;
                return t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex), null
            },
            set: function(e) {
                var t = e.parentNode;
                t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex)
            }
        }), fe.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
            fe.propFix[this.toLowerCase()] = this
        }), de.enctype || (fe.propFix.enctype = "encoding");
        var Qt = /[\t\r\n\f]/g;
        fe.fn.extend({
            addClass: function(e) {
                var t, n, i, o, r, s, a, l = 0;
                if (fe.isFunction(e)) return this.each(function(t) {
                    fe(this).addClass(e.call(this, t, q(this)))
                });
                if ("string" == typeof e && e)
                    for (t = e.match(Ee) || []; n = this[l++];)
                        if (o = q(n), i = 1 === n.nodeType && (" " + o + " ").replace(Qt, " ")) {
                            for (s = 0; r = t[s++];) i.indexOf(" " + r + " ") < 0 && (i += r + " ");
                            o !== (a = fe.trim(i)) && fe.attr(n, "class", a)
                        } return this
            },
            removeClass: function(e) {
                var t, n, i, o, r, s, a, l = 0;
                if (fe.isFunction(e)) return this.each(function(t) {
                    fe(this).removeClass(e.call(this, t, q(this)))
                });
                if (!arguments.length) return this.attr("class", "");
                if ("string" == typeof e && e)
                    for (t = e.match(Ee) || []; n = this[l++];)
                        if (o = q(n), i = 1 === n.nodeType && (" " + o + " ").replace(Qt, " ")) {
                            for (s = 0; r = t[s++];)
                                for (; i.indexOf(" " + r + " ") > -1;) i = i.replace(" " + r + " ", " ");
                            o !== (a = fe.trim(i)) && fe.attr(n, "class", a)
                        } return this
            },
            toggleClass: function(e, t) {
                var n = typeof e;
                return "boolean" == typeof t && "string" === n ? t ? this.addClass(e) : this.removeClass(e) : fe.isFunction(e) ? this.each(function(n) {
                    fe(this).toggleClass(e.call(this, n, q(this), t), t)
                }) : this.each(function() {
                    var t, i, o, r;
                    if ("string" === n)
                        for (i = 0, o = fe(this), r = e.match(Ee) || []; t = r[i++];) o.hasClass(t) ? o.removeClass(t) : o.addClass(t);
                    else e !== undefined && "boolean" !== n || ((t = q(this)) && fe._data(this, "__className__", t), fe.attr(this, "class", t || !1 === e ? "" : fe._data(this, "__className__") || ""))
                })
            },
            hasClass: function(e) {
                var t, n, i = 0;
                for (t = " " + e + " "; n = this[i++];)
                    if (1 === n.nodeType && (" " + q(n) + " ").replace(Qt, " ").indexOf(t) > -1) return !0;
                return !1
            }
        }), fe.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(e, t) {
            fe.fn[t] = function(e, n) {
                return arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t)
            }
        }), fe.fn.extend({
            hover: function(e, t) {
                return this.mouseenter(e).mouseleave(t || e)
            }
        });
        var Gt = e.location,
            Ut = fe.now(),
            Zt = /\?/,
            Vt = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;
        fe.parseJSON = function(t) {
            if (e.JSON && e.JSON.parse) return e.JSON.parse(t + "");
            var n, i = null,
                o = fe.trim(t + "");
            return o && !fe.trim(o.replace(Vt, function(e, t, o, r) {
                return n && t && (i = 0), 0 === i ? e : (n = o || t, i += !r - !o, "")
            })) ? Function("return " + o)() : fe.error("Invalid JSON: " + t)
        }, fe.parseXML = function(t) {
            var n, i;
            if (!t || "string" != typeof t) return null;
            try {
                e.DOMParser ? (i = new e.DOMParser, n = i.parseFromString(t, "text/xml")) : ((n = new e.ActiveXObject("Microsoft.XMLDOM")).async = "false", n.loadXML(t))
            } catch (o) {
                n = undefined
            }
            return n && n.documentElement && !n.getElementsByTagName("parsererror").length || fe.error("Invalid XML: " + t), n
        };
        var Xt = /#.*$/,
            Jt = /([?&])_=[^&]*/,
            Kt = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm,
            en = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
            tn = /^(?:GET|HEAD)$/,
            nn = /^\/\//,
            on = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,
            rn = {},
            sn = {},
            an = "*/".concat("*"),
            ln = Gt.href,
            un = on.exec(ln.toLowerCase()) || [];
        fe.extend({
            active: 0,
            lastModified: {},
            etag: {},
            ajaxSettings: {
                url: ln,
                type: "GET",
                isLocal: en.test(un[1]),
                global: !0,
                processData: !0,
                async: !0,
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                accepts: {
                    "*": an,
                    text: "text/plain",
                    html: "text/html",
                    xml: "application/xml, text/xml",
                    json: "application/json, text/javascript"
                },
                contents: {
                    xml: /\bxml\b/,
                    html: /\bhtml/,
                    json: /\bjson\b/
                },
                responseFields: {
                    xml: "responseXML",
                    text: "responseText",
                    json: "responseJSON"
                },
                converters: {
                    "* text": String,
                    "text html": !0,
                    "text json": fe.parseJSON,
                    "text xml": fe.parseXML
                },
                flatOptions: {
                    url: !0,
                    context: !0
                }
            },
            ajaxSetup: function(e, t) {
                return t ? G(G(e, fe.ajaxSettings), t) : G(fe.ajaxSettings, e)
            },
            ajaxPrefilter: Y(rn),
            ajaxTransport: Y(sn),
            ajax: function(t, n) {
                function i(t, n, i, o) {
                    var r, d, v, w, x, S = n;
                    2 !== b && (b = 2, l && e.clearTimeout(l), c = undefined, a = o || "", C.readyState = t > 0 ? 4 : 0, r = t >= 200 && t < 300 || 304 === t, i && (w = U(p, C, i)), w = Z(p, w, C, r), r ? (p.ifModified && ((x = C.getResponseHeader("Last-Modified")) && (fe.lastModified[s] = x), (x = C.getResponseHeader("etag")) && (fe.etag[s] = x)), 204 === t || "HEAD" === p.type ? S = "nocontent" : 304 === t ? S = "notmodified" : (S = w.state, d = w.data, r = !(v = w.error))) : (v = S, !t && S || (S = "error", t < 0 && (t = 0))), C.status = t, C.statusText = (n || S) + "", r ? g.resolveWith(f, [d, S, C]) : g.rejectWith(f, [C, S, v]), C.statusCode(y), y = undefined, u && h.trigger(r ? "ajaxSuccess" : "ajaxError", [C, p, r ? d : v]), m.fireWith(f, [C, S]), u && (h.trigger("ajaxComplete", [C, p]), --fe.active || fe.event.trigger("ajaxStop")))
                }
                "object" == typeof t && (n = t, t = undefined), n = n || {};
                var o, r, s, a, l, u, c, d, p = fe.ajaxSetup({}, n),
                    f = p.context || p,
                    h = p.context && (f.nodeType || f.jquery) ? fe(f) : fe.event,
                    g = fe.Deferred(),
                    m = fe.Callbacks("once memory"),
                    y = p.statusCode || {},
                    v = {},
                    w = {},
                    b = 0,
                    x = "canceled",
                    C = {
                        readyState: 0,
                        getResponseHeader: function(e) {
                            var t;
                            if (2 === b) {
                                if (!d)
                                    for (d = {}; t = Kt.exec(a);) d[t[1].toLowerCase()] = t[2];
                                t = d[e.toLowerCase()]
                            }
                            return null == t ? null : t
                        },
                        getAllResponseHeaders: function() {
                            return 2 === b ? a : null
                        },
                        setRequestHeader: function(e, t) {
                            var n = e.toLowerCase();
                            return b || (e = w[n] = w[n] || e, v[e] = t), this
                        },
                        overrideMimeType: function(e) {
                            return b || (p.mimeType = e), this
                        },
                        statusCode: function(e) {
                            var t;
                            if (e)
                                if (b < 2)
                                    for (t in e) y[t] = [y[t], e[t]];
                                else C.always(e[C.status]);
                            return this
                        },
                        abort: function(e) {
                            var t = e || x;
                            return c && c.abort(t), i(0, t), this
                        }
                    };
                if (g.promise(C).complete = m.add, C.success = C.done, C.error = C.fail, p.url = ((t || p.url || ln) + "").replace(Xt, "").replace(nn, un[1] + "//"), p.type = n.method || n.type || p.method || p.type, p.dataTypes = fe.trim(p.dataType || "*").toLowerCase().match(Ee) || [""], null == p.crossDomain && (o = on.exec(p.url.toLowerCase()), p.crossDomain = !(!o || o[1] === un[1] && o[2] === un[2] && (o[3] || ("http:" === o[1] ? "80" : "443")) === (un[3] || ("http:" === un[1] ? "80" : "443")))), p.data && p.processData && "string" != typeof p.data && (p.data = fe.param(p.data, p.traditional)), Q(rn, p, n, C), 2 === b) return C;
                for (r in (u = fe.event && p.global) && 0 == fe.active++ && fe.event.trigger("ajaxStart"), p.type = p.type.toUpperCase(), p.hasContent = !tn.test(p.type), s = p.url, p.hasContent || (p.data && (s = p.url += (Zt.test(s) ? "&" : "?") + p.data, delete p.data), !1 === p.cache && (p.url = Jt.test(s) ? s.replace(Jt, "$1_=" + Ut++) : s + (Zt.test(s) ? "&" : "?") + "_=" + Ut++)), p.ifModified && (fe.lastModified[s] && C.setRequestHeader("If-Modified-Since", fe.lastModified[s]), fe.etag[s] && C.setRequestHeader("If-None-Match", fe.etag[s])), (p.data && p.hasContent && !1 !== p.contentType || n.contentType) && C.setRequestHeader("Content-Type", p.contentType), C.setRequestHeader("Accept", p.dataTypes[0] && p.accepts[p.dataTypes[0]] ? p.accepts[p.dataTypes[0]] + ("*" !== p.dataTypes[0] ? ", " + an + "; q=0.01" : "") : p.accepts["*"]), p.headers) C.setRequestHeader(r, p.headers[r]);
                if (p.beforeSend && (!1 === p.beforeSend.call(f, C, p) || 2 === b)) return C.abort();
                for (r in x = "abort", {
                        success: 1,
                        error: 1,
                        complete: 1
                    }) C[r](p[r]);
                if (c = Q(sn, p, n, C)) {
                    if (C.readyState = 1, u && h.trigger("ajaxSend", [C, p]), 2 === b) return C;
                    p.async && p.timeout > 0 && (l = e.setTimeout(function() {
                        C.abort("timeout")
                    }, p.timeout));
                    try {
                        b = 1, c.send(v, i)
                    } catch (S) {
                        if (!(b < 2)) throw S;
                        i(-1, S)
                    }
                } else i(-1, "No Transport");
                return C
            },
            getJSON: function(e, t, n) {
                return fe.get(e, t, n, "json")
            },
            getScript: function(e, t) {
                return fe.get(e, undefined, t, "script")
            }
        }), fe.each(["get", "post"], function(e, t) {
            fe[t] = function(e, n, i, o) {
                return fe.isFunction(n) && (o = o || i, i = n, n = undefined), fe.ajax(fe.extend({
                    url: e,
                    type: t,
                    dataType: o,
                    data: n,
                    success: i
                }, fe.isPlainObject(e) && e))
            }
        }), fe._evalUrl = function(e) {
            return fe.ajax({
                url: e,
                type: "GET",
                dataType: "script",
                cache: !0,
                async: !1,
                global: !1,
                "throws": !0
            })
        }, fe.fn.extend({
            wrapAll: function(e) {
                if (fe.isFunction(e)) return this.each(function(t) {
                    fe(this).wrapAll(e.call(this, t))
                });
                if (this[0]) {
                    var t = fe(e, this[0].ownerDocument).eq(0).clone(!0);
                    this[0].parentNode && t.insertBefore(this[0]), t.map(function() {
                        for (var e = this; e.firstChild && 1 === e.firstChild.nodeType;) e = e.firstChild;
                        return e
                    }).append(this)
                }
                return this
            },
            wrapInner: function(e) {
                return fe.isFunction(e) ? this.each(function(t) {
                    fe(this).wrapInner(e.call(this, t))
                }) : this.each(function() {
                    var t = fe(this),
                        n = t.contents();
                    n.length ? n.wrapAll(e) : t.append(e)
                })
            },
            wrap: function(e) {
                var t = fe.isFunction(e);
                return this.each(function(n) {
                    fe(this).wrapAll(t ? e.call(this, n) : e)
                })
            },
            unwrap: function() {
                return this.parent().each(function() {
                    fe.nodeName(this, "body") || fe(this).replaceWith(this.childNodes)
                }).end()
            }
        }), fe.expr.filters.hidden = function(e) {
            return de.reliableHiddenOffsets() ? e.offsetWidth <= 0 && e.offsetHeight <= 0 && !e.getClientRects().length : X(e)
        }, fe.expr.filters.visible = function(e) {
            return !fe.expr.filters.hidden(e)
        };
        var cn = /%20/g,
            dn = /\[\]$/,
            pn = /\r?\n/g,
            fn = /^(?:submit|button|image|reset|file)$/i,
            hn = /^(?:input|select|textarea|keygen)/i;
        fe.param = function(e, t) {
            var n, i = [],
                o = function(e, t) {
                    t = fe.isFunction(t) ? t() : null == t ? "" : t, i[i.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t)
                };
            if (t === undefined && (t = fe.ajaxSettings && fe.ajaxSettings.traditional), fe.isArray(e) || e.jquery && !fe.isPlainObject(e)) fe.each(e, function() {
                o(this.name, this.value)
            });
            else
                for (n in e) J(n, e[n], t, o);
            return i.join("&").replace(cn, "+")
        }, fe.fn.extend({
            serialize: function() {
                return fe.param(this.serializeArray())
            },
            serializeArray: function() {
                return this.map(function() {
                    var e = fe.prop(this, "elements");
                    return e ? fe.makeArray(e) : this
                }).filter(function() {
                    var e = this.type;
                    return this.name && !fe(this).is(":disabled") && hn.test(this.nodeName) && !fn.test(e) && (this.checked || !We.test(e))
                }).map(function(e, t) {
                    var n = fe(this).val();
                    return null == n ? null : fe.isArray(n) ? fe.map(n, function(e) {
                        return {
                            name: t.name,
                            value: e.replace(pn, "\r\n")
                        }
                    }) : {
                        name: t.name,
                        value: n.replace(pn, "\r\n")
                    }
                }).get()
            }
        }), fe.ajaxSettings.xhr = e.ActiveXObject !== undefined ? function() {
            return this.isLocal ? ee() : ie.documentMode > 8 ? K() : /^(get|post|head|put|delete|options)$/i.test(this.type) && K() || ee()
        } : K;
        var gn = 0,
            mn = {},
            yn = fe.ajaxSettings.xhr();
        e.attachEvent && e.attachEvent("onunload", function() {
            for (var e in mn) mn[e](undefined, !0)
        }), de.cors = !!yn && "withCredentials" in yn, (yn = de.ajax = !!yn) && fe.ajaxTransport(function(t) {
            var n;
            if (!t.crossDomain || de.cors) return {
                send: function(i, o) {
                    var r, s = t.xhr(),
                        a = ++gn;
                    if (s.open(t.type, t.url, t.async, t.username, t.password), t.xhrFields)
                        for (r in t.xhrFields) s[r] = t.xhrFields[r];
                    for (r in t.mimeType && s.overrideMimeType && s.overrideMimeType(t.mimeType), t.crossDomain || i["X-Requested-With"] || (i["X-Requested-With"] = "XMLHttpRequest"), i) i[r] !== undefined && s.setRequestHeader(r, i[r] + "");
                    s.send(t.hasContent && t.data || null), n = function(e, i) {
                        var r, l, u;
                        if (n && (i || 4 === s.readyState))
                            if (delete mn[a], n = undefined, s.onreadystatechange = fe.noop, i) 4 !== s.readyState && s.abort();
                            else {
                                u = {}, r = s.status, "string" == typeof s.responseText && (u.text = s.responseText);
                                try {
                                    l = s.statusText
                                } catch (c) {
                                    l = ""
                                }
                                r || !t.isLocal || t.crossDomain ? 1223 === r && (r = 204) : r = u.text ? 200 : 404
                            } u && o(r, l, u, s.getAllResponseHeaders())
                    }, t.async ? 4 === s.readyState ? e.setTimeout(n) : s.onreadystatechange = mn[a] = n : n()
                },
                abort: function() {
                    n && n(undefined, !0)
                }
            }
        }), fe.ajaxSetup({
            accepts: {
                script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
            },
            contents: {
                script: /\b(?:java|ecma)script\b/
            },
            converters: {
                "text script": function(e) {
                    return fe.globalEval(e), e
                }
            }
        }), fe.ajaxPrefilter("script", function(e) {
            e.cache === undefined && (e.cache = !1), e.crossDomain && (e.type = "GET", e.global = !1)
        }), fe.ajaxTransport("script", function(e) {
            if (e.crossDomain) {
                var t, n = ie.head || fe("head")[0] || ie.documentElement;
                return {
                    send: function(i, o) {
                        (t = ie.createElement("script")).async = !0, e.scriptCharset && (t.charset = e.scriptCharset), t.src = e.url, t.onload = t.onreadystatechange = function(e, n) {
                            (n || !t.readyState || /loaded|complete/.test(t.readyState)) && (t.onload = t.onreadystatechange = null, t.parentNode && t.parentNode.removeChild(t), t = null, n || o(200, "success"))
                        }, n.insertBefore(t, n.firstChild)
                    },
                    abort: function() {
                        t && t.onload(undefined, !0)
                    }
                }
            }
        });
        var vn = [],
            wn = /(=)\?(?=&|$)|\?\?/;
        fe.ajaxSetup({
            jsonp: "callback",
            jsonpCallback: function() {
                var e = vn.pop() || fe.expando + "_" + Ut++;
                return this[e] = !0, e
            }
        }), fe.ajaxPrefilter("json jsonp", function(t, n, i) {
            var o, r, s, a = !1 !== t.jsonp && (wn.test(t.url) ? "url" : "string" == typeof t.data && 0 === (t.contentType || "").indexOf("application/x-www-form-urlencoded") && wn.test(t.data) && "data");
            if (a || "jsonp" === t.dataTypes[0]) return o = t.jsonpCallback = fe.isFunction(t.jsonpCallback) ? t.jsonpCallback() : t.jsonpCallback, a ? t[a] = t[a].replace(wn, "$1" + o) : !1 !== t.jsonp && (t.url += (Zt.test(t.url) ? "&" : "?") + t.jsonp + "=" + o), t.converters["script json"] = function() {
                return s || fe.error(o + " was not called"), s[0]
            }, t.dataTypes[0] = "json", r = e[o], e[o] = function() {
                s = arguments
            }, i.always(function() {
                r === undefined ? fe(e).removeProp(o) : e[o] = r, t[o] && (t.jsonpCallback = n.jsonpCallback, vn.push(o)), s && fe.isFunction(r) && r(s[0]), s = r = undefined
            }), "script"
        }), fe.parseHTML = function(e, t, n) {
            if (!e || "string" != typeof e) return null;
            "boolean" == typeof t && (n = t, t = !1), t = t || ie;
            var i = Ce.exec(e),
                o = !n && [];
            return i ? [t.createElement(i[1])] : (i = y([e], t, o), o && o.length && fe(o).remove(), fe.merge([], i.childNodes))
        };
        var bn = fe.fn.load;
        fe.fn.load = function(e, t, n) {
            if ("string" != typeof e && bn) return bn.apply(this, arguments);
            var i, o, r, s = this,
                a = e.indexOf(" ");
            return a > -1 && (i = fe.trim(e.slice(a, e.length)), e = e.slice(0, a)), fe.isFunction(t) ? (n = t, t = undefined) : t && "object" == typeof t && (o = "POST"), s.length > 0 && fe.ajax({
                url: e,
                type: o || "GET",
                dataType: "html",
                data: t
            }).done(function(e) {
                r = arguments, s.html(i ? fe("<div>").append(fe.parseHTML(e)).find(i) : e)
            }).always(n && function(e, t) {
                s.each(function() {
                    n.apply(this, r || [e.responseText, t, e])
                })
            }), this
        }, fe.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(e, t) {
            fe.fn[t] = function(e) {
                return this.on(t, e)
            }
        }), fe.expr.filters.animated = function(e) {
            return fe.grep(fe.timers, function(t) {
                return e === t.elem
            }).length
        }, fe.offset = {
            setOffset: function(e, t, n) {
                var i, o, r, s, a, l, u = fe.css(e, "position"),
                    c = fe(e),
                    d = {};
                "static" === u && (e.style.position = "relative"), a = c.offset(), r = fe.css(e, "top"), l = fe.css(e, "left"), ("absolute" === u || "fixed" === u) && fe.inArray("auto", [r, l]) > -1 ? (s = (i = c.position()).top, o = i.left) : (s = parseFloat(r) || 0, o = parseFloat(l) || 0), fe.isFunction(t) && (t = t.call(e, n, fe.extend({}, a))), null != t.top && (d.top = t.top - a.top + s), null != t.left && (d.left = t.left - a.left + o), "using" in t ? t.using.call(e, d) : c.css(d)
            }
        }, fe.fn.extend({
            offset: function(e) {
                if (arguments.length) return e === undefined ? this : this.each(function(t) {
                    fe.offset.setOffset(this, e, t)
                });
                var t, n, i = {
                        top: 0,
                        left: 0
                    },
                    o = this[0],
                    r = o && o.ownerDocument;
                return r ? (t = r.documentElement, fe.contains(t, o) ? ("undefined" != typeof o.getBoundingClientRect && (i = o.getBoundingClientRect()), n = te(r), {
                    top: i.top + (n.pageYOffset || t.scrollTop) - (t.clientTop || 0),
                    left: i.left + (n.pageXOffset || t.scrollLeft) - (t.clientLeft || 0)
                }) : i) : void 0
            },
            position: function() {
                if (this[0]) {
                    var e, t, n = {
                            top: 0,
                            left: 0
                        },
                        i = this[0];
                    return "fixed" === fe.css(i, "position") ? t = i.getBoundingClientRect() : (e = this.offsetParent(), t = this.offset(), fe.nodeName(e[0], "html") || (n = e.offset()), n.top += fe.css(e[0], "borderTopWidth", !0), n.left += fe.css(e[0], "borderLeftWidth", !0)), {
                        top: t.top - n.top - fe.css(i, "marginTop", !0),
                        left: t.left - n.left - fe.css(i, "marginLeft", !0)
                    }
                }
            },
            offsetParent: function() {
                return this.map(function() {
                    for (var e = this.offsetParent; e && !fe.nodeName(e, "html") && "static" === fe.css(e, "position");) e = e.offsetParent;
                    return e || gt
                })
            }
        }), fe.each({
            scrollLeft: "pageXOffset",
            scrollTop: "pageYOffset"
        }, function(e, t) {
            var n = /Y/.test(t);
            fe.fn[e] = function(i) {
                return Re(this, function(e, i, o) {
                    var r = te(e);
                    if (o === undefined) return r ? t in r ? r[t] : r.document.documentElement[i] : e[i];
                    r ? r.scrollTo(n ? fe(r).scrollLeft() : o, n ? o : fe(r).scrollTop()) : e[i] = o
                }, e, i, arguments.length, null)
            }
        }), fe.each(["top", "left"], function(e, t) {
            fe.cssHooks[t] = L(de.pixelPosition, function(e, n) {
                if (n) return n = yt(e, t), ft.test(n) ? fe(e).position()[t] + "px" : n
            })
        }), fe.each({
            Height: "height",
            Width: "width"
        }, function(e, t) {
            fe.each({
                padding: "inner" + e,
                content: t,
                "": "outer" + e
            }, function(n, i) {
                fe.fn[i] = function(i, o) {
                    var r = arguments.length && (n || "boolean" != typeof i),
                        s = n || (!0 === i || !0 === o ? "margin" : "border");
                    return Re(this, function(t, n, i) {
                        var o;
                        return fe.isWindow(t) ? t.document.documentElement["client" + e] : 9 === t.nodeType ? (o = t.documentElement, Math.max(t.body["scroll" + e], o["scroll" + e], t.body["offset" + e], o["offset" + e], o["client" + e])) : i === undefined ? fe.css(t, n, s) : fe.style(t, n, i, s)
                    }, t, r ? i : undefined, r, null)
                }
            })
        }), fe.fn.extend({
            bind: function(e, t, n) {
                return this.on(e, null, t, n)
            },
            unbind: function(e, t) {
                return this.off(e, null, t)
            },
            delegate: function(e, t, n, i) {
                return this.on(t, e, n, i)
            },
            undelegate: function(e, t, n) {
                return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n)
            }
        }), fe.fn.size = function() {
            return this.length
        }, fe.fn.andSelf = fe.fn.addBack, "function" == typeof define && define.amd && define("jquery", [], function() {
            return fe
        });
        var xn = e.jQuery,
            Cn = e.$;
        return fe.noConflict = function(t) {
            return e.$ === fe && (e.$ = Cn), t && e.jQuery === fe && (e.jQuery = xn), fe
        }, t || (e.jQuery = e.$ = fe), fe
    }), function() {
        var e = this;
        (function() {
            (function() {
                this.Rails = {
                    linkClickSelector: "a[data-confirm], a[data-method], a[data-remote]:not([disabled]), a[data-disable-with], a[data-disable]",
                    buttonClickSelector: {
                        selector: "button[data-remote]:not([form]), button[data-confirm]:not([form])",
                        exclude: "form button"
                    },
                    inputChangeSelector: "select[data-remote], input[data-remote], textarea[data-remote]",
                    formSubmitSelector: "form",
                    formInputClickSelector: "form input[type=submit], form input[type=image], form button[type=submit], form button:not([type]), input[type=submit][form], input[type=image][form], button[type=submit][form], button[form]:not([type])",
                    formDisableSelector: "input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled",
                    formEnableSelector: "input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled",
                    fileInputSelector: "input[name][type=file]:not([disabled])",
                    linkDisableSelector: "a[data-disable-with], a[data-disable]",
                    buttonDisableSelector: "button[data-remote][data-disable-with], button[data-remote][data-disable]"
                }
            }).call(this)
        }).call(e);
        var t = e.Rails;
        (function() {
            (function() {
                var e, n;
                n = Element.prototype.matches || Element.prototype.matchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector || Element.prototype.oMatchesSelector || Element.prototype.webkitMatchesSelector, t.matches = function(e, t) {
                    return null != t.exclude ? n.call(e, t.selector) && !n.call(e, t.exclude) : n.call(e, t)
                }, e = "_ujsData", t.getData = function(t, n) {
                    var i;
                    return null != (i = t[e]) ? i[n] : void 0
                }, t.setData = function(t, n, i) {
                    return null == t[e] && (t[e] = {}), t[e][n] = i
                }, t.$ = function(e) {
                    return Array.prototype.slice.call(document.querySelectorAll(e))
                }
            }).call(this),
                function() {
                    var e, n, i;
                    e = t.$, i = t.csrfToken = function() {
                        var e;
                        return (e = document.querySelector("meta[name=csrf-token]")) && e.content
                    }, n = t.csrfParam = function() {
                        var e;
                        return (e = document.querySelector("meta[name=csrf-param]")) && e.content
                    }, t.CSRFProtection = function(e) {
                        var t;
                        if (null != (t = i())) return e.setRequestHeader("X-CSRF-Token", t)
                    }, t.refreshCSRFTokens = function() {
                        var t, o;
                        if (o = i(), t = n(), null != o && null != t) return e('form input[name="' + t + '"]').forEach(function(e) {
                            return e.value = o
                        })
                    }
                }.call(this),
                function() {
                    var e, n, i;
                    i = t.matches, "function" != typeof(e = window.CustomEvent) && ((e = function(e, t) {
                        var n;
                        return (n = document.createEvent("CustomEvent")).initCustomEvent(e, t.bubbles, t.cancelable, t.detail), n
                    }).prototype = window.Event.prototype), n = t.fire = function(t, n, i) {
                        var o;
                        return o = new e(n, {
                            bubbles: !0,
                            cancelable: !0,
                            detail: i
                        }), t.dispatchEvent(o), !o.defaultPrevented
                    }, t.stopEverything = function(e) {
                        return n(e.target, "ujs:everythingStopped"), e.preventDefault(), e.stopPropagation(), e.stopImmediatePropagation()
                    }, t.delegate = function(e, t, n, o) {
                        return e.addEventListener(n, function(e) {
                            var n;
                            for (n = e.target; n instanceof Element && !i(n, t);) n = n.parentNode;
                            if (n instanceof Element && !1 === o.call(n, e)) return e.preventDefault(), e.stopPropagation()
                        })
                    }
                }.call(this),
                function() {
                    var e, n, i, o, r, s;
                    n = t.CSRFProtection, o = t.fire, e = {
                        "*": "*/*",
                        text: "text/plain",
                        html: "text/html",
                        xml: "application/xml, text/xml",
                        json: "application/json, text/javascript",
                        script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
                    }, t.ajax = function(e) {
                        var t;
                        return e = r(e), t = i(e, function() {
                            var n;
                            return n = s(t.response, t.getResponseHeader("Content-Type")), 2 === Math.floor(t.status / 100) ? "function" == typeof e.success && e.success(n, t.statusText, t) : "function" == typeof e.error && e.error(n, t.statusText, t), "function" == typeof e.complete ? e.complete(t, t.statusText) : void 0
                        }), "function" == typeof e.beforeSend && e.beforeSend(t, e), t.readyState === XMLHttpRequest.OPENED ? t.send(e.data) : o(document, "ajaxStop")
                    }, r = function(t) {
                        return t.url = t.url || location.href, t.type = t.type.toUpperCase(), "GET" === t.type && t.data && (t.url.indexOf("?") < 0 ? t.url += "?" + t.data : t.url += "&" + t.data), null == e[t.dataType] && (t.dataType = "*"), t.accept = e[t.dataType], "*" !== t.dataType && (t.accept += ", */*; q=0.01"), t
                    }, i = function(e, t) {
                        var i;
                        return (i = new XMLHttpRequest).open(e.type, e.url, !0), i.setRequestHeader("Accept", e.accept), "string" == typeof e.data && i.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8"), e.crossDomain || i.setRequestHeader("X-Requested-With", "XMLHttpRequest"), n(i), i.withCredentials = !!e.withCredentials, i.onreadystatechange = function() {
                            if (i.readyState === XMLHttpRequest.DONE) return t(i)
                        }, i
                    }, s = function(e, t) {
                        var n, i;
                        if ("string" == typeof e && "string" == typeof t)
                            if (t.match(/\bjson\b/)) try {
                                    e = JSON.parse(e)
                                } catch (o) {} else if (t.match(/\b(?:java|ecma)script\b/))(i = document.createElement("script")).text = e, document.head.appendChild(i).parentNode.removeChild(i);
                                else if (t.match(/\b(xml|html|svg)\b/)) {
                            n = new DOMParser, t = t.replace(/;.+/, "");
                            try {
                                e = n.parseFromString(e, t)
                            } catch (o) {}
                        }
                        return e
                    }, t.href = function(e) {
                        return e.href
                    }, t.isCrossDomain = function(e) {
                        var t, n;
                        (t = document.createElement("a")).href = location.href, n = document.createElement("a");
                        try {
                            return n.href = e, !((!n.protocol || ":" === n.protocol) && !n.host || t.protocol + "//" + t.host == n.protocol + "//" + n.host)
                        } catch (i) {
                            return i, !0
                        }
                    }
                }.call(this),
                function() {
                    var e, n;
                    e = t.matches, n = function(e) {
                        return Array.prototype.slice.call(e)
                    }, t.serializeElement = function(t, i) {
                        var o, r;
                        return o = [t], e(t, "form") && (o = n(t.elements)), r = [], o.forEach(function(t) {
                            if (t.name) return e(t, "select") ? n(t.options).forEach(function(e) {
                                if (e.selected) return r.push({
                                    name: t.name,
                                    value: e.value
                                })
                            }) : t.checked || -1 === ["radio", "checkbox", "submit"].indexOf(t.type) ? r.push({
                                name: t.name,
                                value: t.value
                            }) : void 0
                        }), i && r.push(i), r.map(function(e) {
                            return null != e.name ? encodeURIComponent(e.name) + "=" + encodeURIComponent(e.value) : e
                        }).join("&")
                    }, t.formElements = function(t, i) {
                        return e(t, "form") ? n(t.elements).filter(function(t) {
                            return e(t, i)
                        }) : n(t.querySelectorAll(i))
                    }
                }.call(this),
                function() {
                    var e, n, i;
                    n = t.fire, i = t.stopEverything, t.handleConfirm = function(t) {
                        if (!e(this)) return i(t)
                    }, e = function(e) {
                        var t, i, o;
                        if (!(o = e.getAttribute("data-confirm"))) return !0;
                        if (t = !1, n(e, "confirm")) {
                            try {
                                t = confirm(o)
                            } catch (r) {}
                            i = n(e, "confirm:complete", [t])
                        }
                        return t && i
                    }
                }.call(this),
                function() {
                    var e, n, i, o, r, s, a, l, u, c, d;
                    u = t.matches, l = t.getData, c = t.setData, d = t.stopEverything, a = t.formElements, t.handleDisabledElement = function(e) {
                        if (this.disabled) return d(e)
                    }, t.enableElement = function(e) {
                        var n;
                        return n = e instanceof Event ? e.target : e, u(n, t.linkDisableSelector) ? s(n) : u(n, t.buttonDisableSelector) || u(n, t.formEnableSelector) ? o(n) : u(n, t.formSubmitSelector) ? r(n) : void 0
                    }, t.disableElement = function(o) {
                        var r;
                        return r = o instanceof Event ? o.target : o, u(r, t.linkDisableSelector) ? i(r) : u(r, t.buttonDisableSelector) || u(r, t.formDisableSelector) ? e(r) : u(r, t.formSubmitSelector) ? n(r) : void 0
                    }, i = function(e) {
                        var t;
                        return null != (t = e.getAttribute("data-disable-with")) && (c(e, "ujs:enable-with", e.innerHTML), e.innerHTML = t), e.addEventListener("click", d), c(e, "ujs:disabled", !0)
                    }, s = function(e) {
                        var t;
                        return null != (t = l(e, "ujs:enable-with")) && (e.innerHTML = t, c(e, "ujs:enable-with", null)), e.removeEventListener("click", d), c(e, "ujs:disabled", null)
                    }, n = function(n) {
                        return a(n, t.formDisableSelector).forEach(e)
                    }, e = function(e) {
                        var t;
                        return null != (t = e.getAttribute("data-disable-with")) && (u(e, "button") ? (c(e, "ujs:enable-with", e.innerHTML), e.innerHTML = t) : (c(e, "ujs:enable-with", e.value), e.value = t)), e.disabled = !0, c(e, "ujs:disabled", !0)
                    }, r = function(e) {
                        return a(e, t.formEnableSelector).forEach(o)
                    }, o = function(e) {
                        var t;
                        return null != (t = l(e, "ujs:enable-with")) && (u(e, "button") ? e.innerHTML = t : e.value = t, c(e, "ujs:enable-with", null)), e.disabled = !1, c(e, "ujs:disabled", null)
                    }
                }.call(this),
                function() {
                    var e;
                    e = t.stopEverything, t.handleMethod = function(n) {
                        var i, o, r, s, a, l, u;
                        if (u = (l = this).getAttribute("data-method")) return a = t.href(l), o = t.csrfToken(), i = t.csrfParam(), r = document.createElement("form"), s = "<input name='_method' value='" + u + "' type='hidden' />", null == i || null == o || t.isCrossDomain(a) || (s += "<input name='" + i + "' value='" + o + "' type='hidden' />"), s += '<input type="submit" />', r.method = "post", r.action = a, r.target = l.target, r.innerHTML = s, r.style.display = "none", document.body.appendChild(r), r.querySelector('[type="submit"]').click(), e(n)
                    }
                }.call(this),
                function() {
                    var e, n, i, o, r, s, a, l, u, c = [].slice;
                    s = t.matches, i = t.getData, l = t.setData, n = t.fire, u = t.stopEverything, e = t.ajax, o = t.isCrossDomain, a = t.serializeElement, r = function(e) {
                        var t;
                        return null != (t = e.getAttribute("data-remote")) && "false" !== t
                    }, t.handleRemote = function(d) {
                        var p, f, h, g, m, y, v;
                        return !r(g = this) || (n(g, "ajax:before") ? (v = g.getAttribute("data-with-credentials"), h = g.getAttribute("data-type") || "script", s(g, t.formSubmitSelector) ? (p = i(g, "ujs:submit-button"), m = i(g, "ujs:submit-button-formmethod") || g.method, y = i(g, "ujs:submit-button-formaction") || g.getAttribute("action") || location.href, "GET" === m.toUpperCase() && (y = y.replace(/\?.*$/, "")), "multipart/form-data" === g.enctype ? (f = new FormData(g), null != p && f.append(p.name, p.value)) : f = a(g, p), l(g, "ujs:submit-button", null), l(g, "ujs:submit-button-formmethod", null), l(g, "ujs:submit-button-formaction", null)) : s(g, t.buttonClickSelector) || s(g, t.inputChangeSelector) ? (m = g.getAttribute("data-method"), y = g.getAttribute("data-url"), f = a(g, g.getAttribute("data-params"))) : (m = g.getAttribute("data-method"), y = t.href(g), f = g.getAttribute("data-params")), e({
                            type: m || "GET",
                            url: y,
                            data: f,
                            dataType: h,
                            beforeSend: function(e, t) {
                                return n(g, "ajax:beforeSend", [e, t]) ? n(g, "ajax:send", [e]) : (n(g, "ajax:stopped"), e.abort())
                            },
                            success: function() {
                                var e;
                                return e = 1 <= arguments.length ? c.call(arguments, 0) : [], n(g, "ajax:success", e)
                            },
                            error: function() {
                                var e;
                                return e = 1 <= arguments.length ? c.call(arguments, 0) : [], n(g, "ajax:error", e)
                            },
                            complete: function() {
                                var e;
                                return e = 1 <= arguments.length ? c.call(arguments, 0) : [], n(g, "ajax:complete", e)
                            },
                            crossDomain: o(y),
                            withCredentials: null != v && "false" !== v
                        }), u(d)) : (n(g, "ajax:stopped"), !1))
                    }, t.formSubmitButtonClick = function() {
                        var e, t;
                        if (t = (e = this).form) return e.name && l(t, "ujs:submit-button", {
                            name: e.name,
                            value: e.value
                        }), l(t, "ujs:formnovalidate-button", e.formNoValidate), l(t, "ujs:submit-button-formaction", e.getAttribute("formaction")), l(t, "ujs:submit-button-formmethod", e.getAttribute("formmethod"))
                    }, t.handleMetaClick = function(e) {
                        var t, n, i;
                        if (i = ((n = this).getAttribute("data-method") || "GET").toUpperCase(), t = n.getAttribute("data-params"), (e.metaKey || e.ctrlKey) && "GET" === i && !t) return e.stopImmediatePropagation()
                    }
                }.call(this),
                function() {
                    var e, n, i, o, r, s, a, l, u, c, d, p, f, h;
                    s = t.fire, i = t.delegate, l = t.getData, e = t.$, h = t.refreshCSRFTokens, n = t.CSRFProtection, r = t.enableElement, o = t.disableElement, c = t.handleDisabledElement, u = t.handleConfirm, f = t.handleRemote, a = t.formSubmitButtonClick, d = t.handleMetaClick, p = t.handleMethod, "undefined" == typeof jQuery || null === jQuery || null == jQuery.ajax || jQuery.rails || (jQuery.rails = t, jQuery.ajaxPrefilter(function(e, t, i) {
                        if (!e.crossDomain) return n(i)
                    })), t.start = function() {
                        if (window._rails_loaded) throw new Error("rails-ujs has already been loaded!");
                        return window.addEventListener("pageshow", function() {
                            return e(t.formEnableSelector).forEach(function(e) {
                                if (l(e, "ujs:disabled")) return r(e)
                            }), e(t.linkDisableSelector).forEach(function(e) {
                                if (l(e, "ujs:disabled")) return r(e)
                            })
                        }), i(document, t.linkDisableSelector, "ajax:complete", r), i(document, t.linkDisableSelector, "ajax:stopped", r), i(document, t.buttonDisableSelector, "ajax:complete", r), i(document, t.buttonDisableSelector, "ajax:stopped", r), i(document, t.linkClickSelector, "click", c), i(document, t.linkClickSelector, "click", u), i(document, t.linkClickSelector, "click", d), i(document, t.linkClickSelector, "click", o), i(document, t.linkClickSelector, "click", f), i(document, t.linkClickSelector, "click", p), i(document, t.buttonClickSelector, "click", c), i(document, t.buttonClickSelector, "click", u), i(document, t.buttonClickSelector, "click", o), i(document, t.buttonClickSelector, "click", f), i(document, t.inputChangeSelector, "change", c), i(document, t.inputChangeSelector, "change", u), i(document, t.inputChangeSelector, "change", f), i(document, t.formSubmitSelector, "submit", c), i(document, t.formSubmitSelector, "submit", u), i(document, t.formSubmitSelector, "submit", f), i(document, t.formSubmitSelector, "submit", function(e) {
                            return setTimeout(function() {
                                return o(e)
                            }, 13)
                        }), i(document, t.formSubmitSelector, "ajax:send", o), i(document, t.formSubmitSelector, "ajax:complete", r), i(document, t.formInputClickSelector, "click", c), i(document, t.formInputClickSelector, "click", u), i(document, t.formInputClickSelector, "click", a), document.addEventListener("DOMContentLoaded", h), window._rails_loaded = !0
                    }, window.Rails === t && s(document, "rails:attachBindings") && t.start()
                }.call(this)
        }).call(this), "object" == typeof module && module.exports ? module.exports = t : "function" == typeof define && define.amd && define(t)
    }.call(this), "undefined" == typeof jQuery) throw new Error("Bootstrap's JavaScript requires jQuery");
! function(e) {
    "use strict";
    var t = e.fn.jquery.split(" ")[0].split(".");
    if (t[0] < 2 && t[1] < 9 || 1 == t[0] && 9 == t[1] && t[2] < 1 || t[0] > 3) throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher, but lower than version 4")
}(jQuery),
function(e) {
    "use strict";

    function t(t) {
        var n = t.attr("data-target");
        n || (n = (n = t.attr("href")) && /#[A-Za-z]/.test(n) && n.replace(/.*(?=#[^\s]*$)/, ""));
        var i = n && e(n);
        return i && i.length ? i : t.parent()
    }

    function n(n) {
        n && 3 === n.which || (e(o).remove(), e(r).each(function() {
            var i = e(this),
                o = t(i),
                r = {
                    relatedTarget: this
                };
            o.hasClass("open") && (n && "click" == n.type && /input|textarea/i.test(n.target.tagName) && e.contains(o[0], n.target) || (o.trigger(n = e.Event("hide.bs.dropdown", r)), n.isDefaultPrevented() || (i.attr("aria-expanded", "false"), o.removeClass("open").trigger(e.Event("hidden.bs.dropdown", r)))))
        }))
    }

    function i(t) {
        return this.each(function() {
            var n = e(this),
                i = n.data("bs.dropdown");
            i || n.data("bs.dropdown", i = new s(this)), "string" == typeof t && i[t].call(n)
        })
    }
    var o = ".dropdown-backdrop",
        r = '[data-toggle="dropdown"]',
        s = function(t) {
            e(t).on("click.bs.dropdown", this.toggle)
        };
    s.VERSION = "3.3.7", s.prototype.toggle = function(i) {
        var o = e(this);
        if (!o.is(".disabled, :disabled")) {
            var r = t(o),
                s = r.hasClass("open");
            if (n(), !s) {
                "ontouchstart" in document.documentElement && !r.closest(".navbar-nav").length && e(document.createElement("div")).addClass("dropdown-backdrop").insertAfter(e(this)).on("click", n);
                var a = {
                    relatedTarget: this
                };
                if (r.trigger(i = e.Event("show.bs.dropdown", a)), i.isDefaultPrevented()) return;
                o.trigger("focus").attr("aria-expanded", "true"), r.toggleClass("open").trigger(e.Event("shown.bs.dropdown", a))
            }
            return !1
        }
    }, s.prototype.keydown = function(n) {
        if (/(38|40|27|32)/.test(n.which) && !/input|textarea/i.test(n.target.tagName)) {
            var i = e(this);
            if (n.preventDefault(), n.stopPropagation(), !i.is(".disabled, :disabled")) {
                var o = t(i),
                    s = o.hasClass("open");
                if (!s && 27 != n.which || s && 27 == n.which) return 27 == n.which && o.find(r).trigger("focus"), i.trigger("click");
                var a = " li:not(.disabled):visible a",
                    l = o.find(".dropdown-menu" + a);
                if (l.length) {
                    var u = l.index(n.target);
                    38 == n.which && u > 0 && u--, 40 == n.which && u < l.length - 1 && u++, ~u || (u = 0), l.eq(u).trigger("focus")
                }
            }
        }
    };
    var a = e.fn.dropdown;
    e.fn.dropdown = i, e.fn.dropdown.Constructor = s, e.fn.dropdown.noConflict = function() {
        return e.fn.dropdown = a, this
    }, e(document).on("click.bs.dropdown.data-api", n).on("click.bs.dropdown.data-api", ".dropdown form", function(e) {
        e.stopPropagation()
    }).on("click.bs.dropdown.data-api", r, s.prototype.toggle).on("keydown.bs.dropdown.data-api", r, s.prototype.keydown).on("keydown.bs.dropdown.data-api", ".dropdown-menu", s.prototype.keydown)
}(jQuery),
function(e) {
    "use strict";

    function t(t) {
        var n, i = t.attr("data-target") || (n = t.attr("href")) && n.replace(/.*(?=#[^\s]+$)/, "");
        return e(i)
    }

    function n(t) {
        return this.each(function() {
            var n = e(this),
                o = n.data("bs.collapse"),
                r = e.extend({}, i.DEFAULTS, n.data(), "object" == typeof t && t);
            !o && r.toggle && /show|hide/.test(t) && (r.toggle = !1), o || n.data("bs.collapse", o = new i(this, r)), "string" == typeof t && o[t]()
        })
    }
    var i = function(t, n) {
        this.$element = e(t), this.options = e.extend({}, i.DEFAULTS, n), this.$trigger = e('[data-toggle="collapse"][href="#' + t.id + '"],[data-toggle="collapse"][data-target="#' + t.id + '"]'), this.transitioning = null, this.options.parent ? this.$parent = this.getParent() : this.addAriaAndCollapsedClass(this.$element, this.$trigger), this.options.toggle && this.toggle()
    };
    i.VERSION = "3.3.7", i.TRANSITION_DURATION = 350, i.DEFAULTS = {
        toggle: !0
    }, i.prototype.dimension = function() {
        return this.$element.hasClass("width") ? "width" : "height"
    }, i.prototype.show = function() {
        if (!this.transitioning && !this.$element.hasClass("in")) {
            var t, o = this.$parent && this.$parent.children(".panel").children(".in, .collapsing");
            if (!(o && o.length && (t = o.data("bs.collapse")) && t.transitioning)) {
                var r = e.Event("show.bs.collapse");
                if (this.$element.trigger(r), !r.isDefaultPrevented()) {
                    o && o.length && (n.call(o, "hide"), t || o.data("bs.collapse", null));
                    var s = this.dimension();
                    this.$element.removeClass("collapse").addClass("collapsing")[s](0).attr("aria-expanded", !0), this.$trigger.removeClass("collapsed").attr("aria-expanded", !0), this.transitioning = 1;
                    var a = function() {
                        this.$element.removeClass("collapsing").addClass("collapse in")[s](""), this.transitioning = 0, this.$element.trigger("shown.bs.collapse")
                    };
                    if (!e.support.transition) return a.call(this);
                    var l = e.camelCase(["scroll", s].join("-"));
                    this.$element.one("bsTransitionEnd", e.proxy(a, this)).emulateTransitionEnd(i.TRANSITION_DURATION)[s](this.$element[0][l])
                }
            }
        }
    }, i.prototype.hide = function() {
        if (!this.transitioning && this.$element.hasClass("in")) {
            var t = e.Event("hide.bs.collapse");
            if (this.$element.trigger(t), !t.isDefaultPrevented()) {
                var n = this.dimension();
                this.$element[n](this.$element[n]())[0].offsetHeight, this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded", !1), this.$trigger.addClass("collapsed").attr("aria-expanded", !1), this.transitioning = 1;
                var o = function() {
                    this.transitioning = 0, this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse")
                };
                if (!e.support.transition) return o.call(this);
                this.$element[n](0).one("bsTransitionEnd", e.proxy(o, this)).emulateTransitionEnd(i.TRANSITION_DURATION)
            }
        }
    }, i.prototype.toggle = function() {
        this[this.$element.hasClass("in") ? "hide" : "show"]()
    }, i.prototype.getParent = function() {
        return e(this.options.parent).find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]').each(e.proxy(function(n, i) {
            var o = e(i);
            this.addAriaAndCollapsedClass(t(o), o)
        }, this)).end()
    }, i.prototype.addAriaAndCollapsedClass = function(e, t) {
        var n = e.hasClass("in");
        e.attr("aria-expanded", n), t.toggleClass("collapsed", !n).attr("aria-expanded", n)
    };
    var o = e.fn.collapse;
    e.fn.collapse = n, e.fn.collapse.Constructor = i, e.fn.collapse.noConflict = function() {
        return e.fn.collapse = o, this
    }, e(document).on("click.bs.collapse.data-api", '[data-toggle="collapse"]', function(i) {
        var o = e(this);
        o.attr("data-target") || i.preventDefault();
        var r = t(o),
            s = r.data("bs.collapse") ? "toggle" : o.data();
        n.call(r, s)
    })
}(jQuery),
function(e) {
    "use strict";

    function t() {
        var e = document.createElement("bootstrap"),
            t = {
                WebkitTransition: "webkitTransitionEnd",
                MozTransition: "transitionend",
                OTransition: "oTransitionEnd otransitionend",
                transition: "transitionend"
            };
        for (var n in t)
            if (e.style[n] !== undefined) return {
                end: t[n]
            };
        return !1
    }
    e.fn.emulateTransitionEnd = function(t) {
        var n = !1,
            i = this;
        return e(this).one("bsTransitionEnd", function() {
            n = !0
        }), setTimeout(function() {
            n || e(i).trigger(e.support.transition.end)
        }, t), this
    }, e(function() {
        e.support.transition = t(), e.support.transition && (e.event.special.bsTransitionEnd = {
            bindType: e.support.transition.end,
            delegateType: e.support.transition.end,
            handle: function(t) {
                if (e(t.target).is(this)) return t.handleObj.handler.apply(this, arguments)
            }
        })
    })
}(jQuery);
var slice = [].slice,
    extend = function(e, t) {
        function n() {
            this.constructor = e
        }
        for (var i in t) hasProp.call(t, i) && (e[i] = t[i]);
        return n.prototype = t.prototype, e.prototype = new n, e.__super__ = t.prototype, e
    },
    hasProp = {}.hasOwnProperty;
! function(e, t) {
    var n, i, o, r;
    if ("function" == typeof define && define.amd) return define(["jquery"], t);
    if ("object" == typeof exports) return module.exports = t(require("jquery"));
    for (n in e.cloudinary || (e.cloudinary = {}), o = [], i = t(jQuery)) r = i[n], o.push(e.cloudinary[n] = r)
}(this, function(e) {
    var t, n, i, o, r, s, a, l, u, c, d, p, f, h, g, m, y, v, w, b, x, C, S, T, k, A, D, M, j, E, L, N, _, I, $, P, O, B, z, H, F, R, W, q, Y, Q, G, U, Z, V, X, J, K, ee, te, ne;
    return k = function(e) {
        var t, n, i;
        for (n = 0, i = e.length; n < i; n++)
            if (t = e[n], !C.isString(t)) return !1;
        return !0
    }, ee = function(e, t) {
        var n, i, o;
        for (o = [], n = -1, i = e.length; ++n < i;) e[n] !== t && o.push(e[n]);
        return o
    }, H = function(e) {
        return null != e && !isNaN(parseFloat(e))
    }, V = function(e, t) {
        return null == t && (t = /([^a-zA-Z0-9_.\-\/:]+)/g), e.replace(t, function(e) {
            return e.split("").map(function(e) {
                return "%" + e.charCodeAt(0).toString(16).toUpperCase()
            }).join("")
        })
    }, N = function() {
        var e;
        return e = arguments[0], (2 <= arguments.length ? slice.call(arguments, 1) : []).reduce(function(e, t) {
            var n, i;
            for (n in t) i = t[n], void 0 === e[n] && (e[n] = i);
            return e
        }, e)
    }, ne = "[A-Z]", te = "[a-z]+", Y = RegExp(ne + "+(?=" + ne + te + ")|" + ne + "?" + te + "|" + ne + "+|[0-9]+", "g"), n = {
        allStrings: k,
        camelCase: function(e) {
            var t, n, i;
            return i = e.match(Y), (i = function() {
                var e, o, r;
                for (r = [], t = e = 0, o = i.length; e < o; t = ++e) n = (n = i[t]).toLocaleLowerCase(), t ? r.push(n.charAt(0).toLocaleUpperCase() + n.slice(1)) : r.push(n);
                return r
            }()).join("")
        },
        convertKeys: E = function(e, t) {
            var n, i, o;
            for (n in null == t && (t = C.identity), i = {}, e) o = e[n], n = t(n), C.isEmpty(n) || (i[n] = o);
            return i
        },
        defaults: N,
        snakeCase: function(e) {
            var t, n, i;
            return i = e.match(Y), (i = function() {
                var e, o, r;
                for (r = [], t = e = 0, o = i.length; e < o; t = ++e) n = i[t], r.push(n.toLocaleLowerCase());
                return r
            }()).join("_")
        },
        without: ee,
        isNumberLike: H,
        smartEscape: V,
        withCamelCaseKeys: function(e) {
            return E(e, C.camelCase)
        },
        withSnakeCaseKeys: function(e) {
            return E(e, C.snakeCase)
        }
    }, P = function(t, n) {
        return e(t).data(n)
    }, Z = function(t, n, i) {
        return e(t).data(n, i)
    }, $ = function(t, n) {
        return e(t).attr(n)
    }, G = function(t, n, i) {
        return e(t).attr(n, i)
    }, Q = function(t, n) {
        return e(t).removeAttr(n)
    }, U = function(t, n) {
        return e(t).attr(n)
    }, O = function(t, n) {
        return e(t).hasClass(n)
    }, T = function(t, n) {
        return e(t).addClass(n)
    }, K = function(t) {
        return e(t).width()
    }, z = function(t) {
        return null == t || (e.isArray(t) || C.isString(t)) && 0 === t.length || e.isPlainObject(t) && e.isEmptyObject(t)
    }, F = function(e) {
        return "string" == typeof e || "[object String]" === (null != e ? e.toString() : void 0)
    }, W = function() {
        var t, n;
        return (t = function() {
            var e, t, i;
            for (i = [], e = 0, t = arguments.length; e < t; e++) n = arguments[e], i.push(n);
            return i
        }.apply(this, arguments)).unshift(!0), e.extend.apply(this, t)
    }, M = function(e) {
        var t, n, i, o;
        for (o = [], n = 0, i = e.length; n < i; n++)(t = e[n]) && o.push(t);
        return o
    }, A = function() {
        var t;
        return (t = e.makeArray(arguments)).unshift({}), t.unshift(!0), e.extend.apply(this, t)
    }, j = function(e, t) {
        var n, i;
        for (n = 0, i = e.length; n < i; n++)
            if (e[n] === t) return !0;
        return !1
    }, _ = function(e, t) {
        var n, i, o, r;
        for (r = [], i = 0, o = e.length; i < o; i++) n = e[i], j(t, n) || r.push(n);
        return r
    }, I = function(t) {
        var n, i;
        for (n in i = [], t) e.isFunction(t[n]) && i.push(n);
        return i
    }, B = function(e) {
        return e
    }, C = e.extend(n, {
        hasClass: O,
        addClass: T,
        getAttribute: $,
        setAttribute: G,
        removeAttribute: Q,
        setAttributes: U,
        getData: P,
        setData: Z,
        width: K,
        isString: F,
        isArray: e.isArray,
        isEmpty: z,
        assign: e.extend,
        merge: W,
        cloneDeep: A,
        compact: M,
        contains: j,
        difference: _,
        isFunction: e.isFunction,
        functions: I,
        identity: B,
        isPlainObject: e.isPlainObject,
        trim: e.trim
    }), X = function(e) {
        var t, n, i, o, r, s, a, l;
        if (null === e || void 0 === e) return "";
        for (l = "", r = void 0, i = void 0, a = 0, r = i = 0, a = (s = e + "").length, o = 0; o < a;) n = null, (t = s.charCodeAt(o)) < 128 ? i++ : n = t > 127 && t < 2048 ? String.fromCharCode(t >> 6 | 192, 63 & t | 128) : String.fromCharCode(t >> 12 | 224, t >> 6 & 63 | 128, 63 & t | 128), null !== n && (i > r && (l += s.slice(r, i)), l += n, r = i = o + 1), o++;
        return i > r && (l += s.slice(r, a)), l
    }, L = function(e) {
        var t, n, i, o, r;
        for (o = "00000000 77073096 EE0E612C 990951BA 076DC419 706AF48F E963A535 9E6495A3 0EDB8832 79DCB8A4 E0D5E91E 97D2D988 09B64C2B 7EB17CBD E7B82D07 90BF1D91 1DB71064 6AB020F2 F3B97148 84BE41DE 1ADAD47D 6DDDE4EB F4D4B551 83D385C7 136C9856 646BA8C0 FD62F97A 8A65C9EC 14015C4F 63066CD9 FA0F3D63 8D080DF5 3B6E20C8 4C69105E D56041E4 A2677172 3C03E4D1 4B04D447 D20D85FD A50AB56B 35B5A8FA 42B2986C DBBBC9D6 ACBCF940 32D86CE3 45DF5C75 DCD60DCF ABD13D59 26D930AC 51DE003A C8D75180 BFD06116 21B4F4B5 56B3C423 CFBA9599 B8BDA50F 2802B89E 5F058808 C60CD9B2 B10BE924 2F6F7C87 58684C11 C1611DAB B6662D3D 76DC4190 01DB7106 98D220BC EFD5102A 71B18589 06B6B51F 9FBFE4A5 E8B8D433 7807C9A2 0F00F934 9609A88E E10E9818 7F6A0DBB 086D3D2D 91646C97 E6635C01 6B6B51F4 1C6C6162 856530D8 F262004E 6C0695ED 1B01A57B 8208F4C1 F50FC457 65B0D9C6 12B7E950 8BBEB8EA FCB9887C 62DD1DDF 15DA2D49 8CD37CF3 FBD44C65 4DB26158 3AB551CE A3BC0074 D4BB30E2 4ADFA541 3DD895D7 A4D1C46D D3D6F4FB 4369E96A 346ED9FC AD678846 DA60B8D0 44042D73 33031DE5 AA0A4C5F DD0D7CC9 5005713C 270241AA BE0B1010 C90C2086 5768B525 206F85B3 B966D409 CE61E49F 5EDEF90E 29D9C998 B0D09822 C7D7A8B4 59B33D17 2EB40D81 B7BD5C3B C0BA6CAD EDB88320 9ABFB3B6 03B6E20C 74B1D29A EAD54739 9DD277AF 04DB2615 73DC1683 E3630B12 94643B84 0D6D6A3E 7A6A5AA8 E40ECF0B 9309FF9D 0A00AE27 7D079EB1 F00F9344 8708A3D2 1E01F268 6906C2FE F762575D 806567CB 196C3671 6E6B06E7 FED41B76 89D32BE0 10DA7A5A 67DD4ACC F9B9DF6F 8EBEEFF9 17B7BE43 60B08ED5 D6D6A3E8 A1D1937E 38D8C2C4 4FDFF252 D1BB67F1 A6BC5767 3FB506DD 48B2364B D80D2BDA AF0A1B4C 36034AF6 41047A60 DF60EFC3 A867DF55 316E8EEF 4669BE79 CB61B38C BC66831A 256FD2A0 5268E236 CC0C7795 BB0B4703 220216B9 5505262F C5BA3BBE B2BD0B28 2BB45A92 5CB36A04 C2D7FFA7 B5D0CF31 2CD99E8B 5BDEAE1D 9B64C2B0 EC63F226 756AA39C 026D930A 9C0906A9 EB0E363F 72076785 05005713 95BF4A82 E2B87A14 7BB12BAE 0CB61B38 92D28E9B E5D5BE0D 7CDCEFB7 0BDBDF21 86D3D2D4 F1D4E242 68DDB3F8 1FDA836E 81BE16CD F6B9265B 6FB077E1 18B74777 88085AE6 FF0F6A70 66063BCA 11010B5C 8F659EFF F862AE69 616BFFD3 166CCF45 A00AE278 D70DD2EE 4E048354 3903B3C2 A7672661 D06016F7 4969474D 3E6E77DB AED16A4A D9D65ADC 40DF0B66 37D83BF0 A9BCAE53 DEBB9EC5 47B2CF7F 30B5FFE9 BDBDF21C CABAC28A 53B39330 24B4A3A6 BAD03605 CDD70693 54DE5729 23D967BF B3667A2E C4614AB8 5D681B02 2A6F2B94 B40BBE37 C30C8EA1 5A05DF1B 2D02EF8D", t = 0, 0, r = 0, t ^= -1, n = 0, i = (e = X(e)).length; n < i;) r = 255 & (t ^ e.charCodeAt(n)), t = t >>> 8 ^ "0x" + o.substr(9 * r, 8), n++;
        return (t ^= -1) < 0 && (t += 4294967296), t
    }, p = function() {
        function e(e) {
            var t;
            this.options = {}, null != e && ["resourceType", "type", "publicId", "format"].forEach((t = this, function(n) {
                var i;
                return t.options[n] = null != (i = e[n]) ? i : e[C.snakeCase(n)]
            }))
        }
        return e.prototype.resourceType = function(e) {
            return this.options.resourceType = e, this
        }, e.prototype.type = function(e) {
            return this.options.type = e, this
        }, e.prototype.publicId = function(e) {
            return this.options.publicId = e, this
        }, e.prototype.getPublicId = function() {
            var e;
            return null != (e = this.options.publicId) ? e.replace(/\//g, ":") : void 0
        }, e.prototype.getFullPublicId = function() {
            return null != this.options.format ? this.getPublicId() + "." + this.options.format : this.getPublicId()
        }, e.prototype.format = function(e) {
            return this.options.format = e, this
        }, e.prototype.toString = function() {
            var e;
            if (e = [], null == this.options.publicId) throw "Must supply publicId";
            return "image" !== this.options.resourceType && e.push(this.options.resourceType), "upload" !== this.options.type && e.push(this.options.type), e.push(this.getFullPublicId()), C.compact(e).join(":")
        }, e
    }(), v = function() {
        function e(t) {
            var n;
            e.__super__.constructor.call(this, t), null != t && ["resourceType", "resourceType", "fontFamily", "fontSize", "fontWeight", "fontStyle", "textDecoration", "textAlign", "stroke", "letterSpacing", "lineSpacing", "text"].forEach((n = this, function(e) {
                var i;
                return n.options[e] = null != (i = t[e]) ? i : t[C.snakeCase(e)]
            })), this.options.resourceType = "text"
        }
        return extend(e, p), e.prototype.resourceType = function() {
            throw "Cannot modify resourceType for text layers"
        }, e.prototype.type = function() {
            throw "Cannot modify type for text layers"
        }, e.prototype.format = function() {
            throw "Cannot modify format for text layers"
        }, e.prototype.fontFamily = function(e) {
            return this.options.fontFamily = e, this
        }, e.prototype.fontSize = function(e) {
            return this.options.fontSize = e, this
        }, e.prototype.fontWeight = function(e) {
            return this.options.fontWeight = e, this
        }, e.prototype.fontStyle = function(e) {
            return this.options.fontStyle = e, this
        }, e.prototype.textDecoration = function(e) {
            return this.options.textDecoration = e, this
        }, e.prototype.textAlign = function(e) {
            return this.options.textAlign = e, this
        }, e.prototype.stroke = function(e) {
            return this.options.stroke = e, this
        }, e.prototype.letterSpacing = function(e) {
            return this.options.letterSpacing = e, this
        }, e.prototype.lineSpacing = function(e) {
            return this.options.lineSpacing = e, this
        }, e.prototype.text = function(e) {
            return this.options.text = e, this
        }, e.prototype.toString = function() {
            var e, t, n, i, o, r, s, a, l, u;
            if (a = this.textStyleIdentifier(), null != this.options.publicId && (i = this.getFullPublicId()), null != this.options.text) {
                if (t = !C.isEmpty(i), n = !C.isEmpty(a), t && n || !t && !n) throw "Must supply either style parameters or a public_id when providing text parameter in a text overlay/underlay, but not both!";
                for (o = /\$\([a-zA-Z]\w*\)/g, s = 0, u = C.smartEscape(this.options.text, /[,\/]/g), l = ""; r = o.exec(u);) l += C.smartEscape(u.slice(s, r.index)), l += r[0], s = r.index + r[0].length;
                l += C.smartEscape(u.slice(s))
            }
            return e = [this.options.resourceType, a, i, l], C.compact(e).join(":")
        }, e.prototype.textStyleIdentifier = function() {
            var e;
            if (e = [], "normal" !== this.options.fontWeight && e.push(this.options.fontWeight), "normal" !== this.options.fontStyle && e.push(this.options.fontStyle), "none" !== this.options.textDecoration && e.push(this.options.textDecoration), e.push(this.options.textAlign), "none" !== this.options.stroke && e.push(this.options.stroke), C.isEmpty(this.options.letterSpacing) && !C.isNumberLike(this.options.letterSpacing) || e.push("letter_spacing_" + this.options.letterSpacing), C.isEmpty(this.options.lineSpacing) && !C.isNumberLike(this.options.lineSpacing) || e.push("line_spacing_" + this.options.lineSpacing), !C.isEmpty(C.compact(e))) {
                if (C.isEmpty(this.options.fontFamily)) throw "Must supply fontFamily. " + e;
                if (C.isEmpty(this.options.fontSize) && !C.isNumberLike(this.options.fontSize)) throw "Must supply fontSize."
            }
            return e.unshift(this.options.fontFamily, this.options.fontSize), e = C.compact(e).join("_")
        }, e
    }(), y = function() {
        function e(t) {
            e.__super__.constructor.call(this, t), this.options.resourceType = "subtitles"
        }
        return extend(e, v), e
    }(), h = function() {
        function e(e, t, n) {
            null == n && (n = D.Util.identity), this.name = e, this.shortName = t, this.process = n
        }
        return e.prototype.set = function(e) {
            return this.origValue = e, this
        }, e.prototype.serialize = function() {
            var e, t;
            return e = this.value(), t = D.Util.isArray(e) || D.Util.isPlainObject(e) || D.Util.isString(e) ? !D.Util.isEmpty(e) : null != e, null != this.shortName && t ? this.shortName + "_" + e : ""
        }, e.prototype.value = function() {
            return this.process(this.origValue)
        }, e.norm_color = function(e) {
            return null != e ? e.replace(/^#/, "rgb:") : void 0
        }, e.prototype.build_array = function(e) {
            return null == e && (e = []), D.Util.isArray(e) ? e : [e]
        }, e.process_video_params = function(e) {
            var t;
            switch (e.constructor) {
                case Object:
                    return t = "", "codec" in e && (t = e.codec, "profile" in e && (t += ":" + e.profile, "level" in e && (t += ":" + e.level))), t;
                case String:
                    return e;
                default:
                    return null
            }
        }, e
    }(), t = function() {
        function e(t, n, i, o) {
            null == i && (i = "."), this.sep = i, e.__super__.constructor.call(this, t, n, o)
        }
        return extend(e, h), e.prototype.serialize = function() {
            var e, t, n;
            return null != this.shortName ? (e = this.value(), D.Util.isEmpty(e) ? "" : D.Util.isString(e) ? this.shortName + "_" + e : (t = function() {
                var t, i, o;
                for (o = [], t = 0, i = e.length; t < i; t++) n = e[t], D.Util.isFunction(n.serialize) ? o.push(n.serialize()) : o.push(n);
                return o
            }(), this.shortName + "_" + t.join(this.sep))) : ""
        }, e.prototype.value = function() {
            var e, t, n, i, o;
            if (D.Util.isArray(this.origValue)) {
                for (i = [], e = 0, t = (n = this.origValue).length; e < t; e++) o = n[e], i.push(this.process(o));
                return i
            }
            return this.process(this.origValue)
        }, e.prototype.set = function(t) {
            return null == t || D.Util.isArray(t) ? e.__super__.set.call(this, t) : e.__super__.set.call(this, [t])
        }, e
    }(), x = function() {
        function e(t, n, i, o) {
            null == n && (n = "t"), null == i && (i = "."), this.sep = i, e.__super__.constructor.call(this, t, n, o)
        }
        return extend(e, h), e.prototype.serialize = function() {
            var e, t, n;
            return D.Util.isEmpty(this.value()) ? "" : D.Util.allStrings(this.value()) ? (e = this.value().join(this.sep), D.Util.isEmpty(e) ? "" : this.shortName + "_" + e) : (t = function() {
                var e, t, i, o;
                for (o = [], e = 0, t = (i = this.value()).length; e < t; e++) null != (n = i[e]) && (D.Util.isString(n) && !D.Util.isEmpty(n) ? o.push(this.shortName + "_" + n) : D.Util.isFunction(n.serialize) ? o.push(n.serialize()) : D.Util.isPlainObject(n) && !D.Util.isEmpty(n) ? o.push(new w(n).serialize()) : o.push(void 0));
                return o
            }.call(this), D.Util.compact(t))
        }, e.prototype.set = function(t) {
            return this.origValue = t, D.Util.isArray(this.origValue) ? e.__super__.set.call(this, this.origValue) : e.__super__.set.call(this, [this.origValue])
        }, e
    }(), g = function() {
        function e(t, n, i) {
            null == i && (i = this.norm_range_value), e.__super__.constructor.call(this, t, n, i)
        }
        return extend(e, h), e.norm_range_value = function(e) {
            var t, n;
            return (n = String(e).match(new RegExp("^" + offset_any_pattern + "$"))) && (t = null != n[5] ? "p" : "", e = (n[1] || n[4]) + t), e
        }, e
    }(), m = function() {
        function e(t, n, i) {
            null == i && (i = D.Util.identity), e.__super__.constructor.call(this, t, n, i)
        }
        return extend(e, h), e.prototype.serialize = function() {
            return this.value()
        }, e
    }(), f = function() {
        function e() {
            return e.__super__.constructor.apply(this, arguments)
        }
        return extend(e, h), e.prototype.value = function() {
            var e;
            return e = this.origValue, D.Util.isPlainObject(e) ? "text" === e.resource_type || null != e.text ? new D.TextLayer(e).toString() : "subtitles" === e.resource_type ? new D.SubtitlesLayer(e).toString() : new D.Layer(e).toString() : e
        }, [
            ["font_weight", "normal"],
            ["font_style", "normal"],
            ["text_decoration", "none"],
            ["text_align", null],
            ["stroke", "none"],
            ["letter_spacing", null],
            ["line_spacing", null]
        ], e.prototype.textStyle = function(e) {
            return new D.TextLayer(e).textStyleIdentifier()
        }, e
    }(), u = function() {
        function e() {
            return e.__super__.constructor.apply(this, arguments)
        }
        return extend(e, h), e.prototype.serialize = function() {
            return l.normalize(e.__super__.serialize.call(this))
        }, e
    }(), (q = {}).Param = h, q.ArrayParam = t, q.RangeParam = g, q.RawParam = m, q.TransformationParam = x, q.LayerParam = f, q.ExpressionParam = u, l = function() {
        function e(t) {
            this.expressions = [], null != t && this.expressions.push(e.normalize(t))
        }
        return e.OPERATORS = {
                "=": "eq",
                "!=": "ne",
                "<": "lt",
                ">": "gt",
                "<=": "lte",
                ">=": "gte",
                "&&": "and",
                "||": "or",
                "*": "mul",
                "/": "div",
                "+": "add",
                "-": "sub"
            }, e.PREDEFINED_VARS = {
                aspect_ratio: "ar",
                aspectRatio: "ar",
                current_page: "cp",
                currentPage: "cp",
                face_count: "fc",
                faceCount: "fc",
                height: "h",
                initial_aspect_ratio: "iar",
                initial_height: "ih",
                initial_width: "iw",
                initialAspectRatio: "iar",
                initialHeight: "ih",
                initialWidth: "iw",
                page_count: "pc",
                page_x: "px",
                page_y: "py",
                pageCount: "pc",
                pageX: "px",
                pageY: "py",
                tags: "tags",
                width: "w"
            }, e.BOUNDRY = "[ _]+", e["new"] = function(e) {
                return new this(e)
            }, e.normalize = function(t) {
                var n, i;
                return null == t ? t : (t = String(t), n = "((" + "\\|\\||>=|<=|&&|!=|>|=|<|/|-|\\+|\\*" + ")(?=[ _])|" + Object.keys(e.PREDEFINED_VARS).join("|") + ")", i = new RegExp(n, "g"), (t = t.replace(i, function(t) {
                    return e.OPERATORS[t] || e.PREDEFINED_VARS[t]
                })).replace(/[ _]+/g, "_"))
            }, e.prototype.serialize = function() {
                return e.normalize(this.expressions.join("_"))
            }, e.prototype.toString = function() {
                return this.serialize()
            }, e.prototype.getParent = function() {
                return this.parent
            }, e.prototype.setParent = function(e) {
                return this.parent = e, this
            }, e.prototype.predicate = function(t, n, i) {
                return null != e.OPERATORS[n] && (n = e.OPERATORS[n]), this.expressions.push(t + "_" + n + "_" + i), this
            }, e.prototype.and = function() {
                return this.expressions.push("and"), this
            }, e.prototype.or = function() {
                return this.expressions.push("or"), this
            }, e.prototype.then = function() {
                return this.getParent()["if"](this.toString())
            }, e.prototype.height = function(e, t) {
                return this.predicate("h", e, t)
            }, e.prototype.width = function(e, t) {
                return this.predicate("w", e, t)
            }, e.prototype.aspectRatio = function(e, t) {
                return this.predicate("ar", e, t)
            }, e.prototype.pageCount = function(e, t) {
                return this.predicate("pc", e, t)
            }, e.prototype.faceCount = function(e, t) {
                return this.predicate("fc", e, t)
            }, e.prototype.value = function(e) {
                return this.expressions.push(e), this
            }, e.variable = function(e, t) {
                return new this(e).value(t)
            }, e.width = function() {
                return new this("width")
            }, e.height = function() {
                return new this("height")
            }, e.initialWidth = function() {
                return new this("initialWidth")
            }, e.initialHeight = function() {
                return new this("initialHeight")
            }, e.aspectRatio = function() {
                return new this("aspectRatio")
            }, e.initialAspectRatio = function() {
                return new this("initialAspectRatio")
            }, e.pageCount = function() {
                return new this("pageCount")
            },
            function() {
                return new this("faceCount")
            }, e.currentPage = function() {
                return new this("currentPage")
            }, e.tags = function() {
                return new this("tags")
            }, e.pageX = function() {
                return new this("pageX")
            }, e.pageY = function() {
                return new this("pageY")
            }, e
    }(), s = function() {
        function e(t) {
            e.__super__.constructor.call(this, t)
        }
        return extend(e, l), e.prototype.height = function(e, t) {
            return this.predicate("h", e, t)
        }, e.prototype.width = function(e, t) {
            return this.predicate("w", e, t)
        }, e.prototype.aspectRatio = function(e, t) {
            return this.predicate("ar", e, t)
        }, e.prototype.pageCount = function(e, t) {
            return this.predicate("pc", e, t)
        }, e.prototype.faceCount = function(e, t) {
            return this.predicate("fc", e, t)
        }, e
    }(), a = function() {
        function e(e) {
            null == e && (e = {}), this.configuration = C.cloneDeep(e), C.defaults(this.configuration, t)
        }
        var t, n;
        return t = {
            responsive_class: "cld-responsive",
            responsive_use_breakpoints: !0,
            round_dpr: !0,
            secure: "https:" === ("undefined" != typeof window && null !== window && null != (n = window.location) ? n.protocol : void 0)
        }, e.CONFIG_PARAMS = ["api_key", "api_secret", "callback", "cdn_subdomain", "cloud_name", "cname", "private_cdn", "protocol", "resource_type", "responsive", "responsive_class", "responsive_use_breakpoints", "responsive_width", "round_dpr", "secure", "secure_cdn_subdomain", "secure_distribution", "shorten", "type", "upload_preset", "url_suffix", "use_root_path", "version"], e.prototype.init = function() {
            return this.fromEnvironment(), this.fromDocument(), this
        }, e.prototype.set = function(e, t) {
            return this.configuration[e] = t, this
        }, e.prototype.get = function(e) {
            return this.configuration[e]
        }, e.prototype.merge = function(e) {
            return null == e && (e = {}), C.assign(this.configuration, C.cloneDeep(e)), this
        }, e.prototype.fromDocument = function() {
            var e, t, n, i;
            if (i = "undefined" != typeof document && null !== document ? document.querySelectorAll('meta[name^="cloudinary_"]') : void 0)
                for (t = 0, n = i.length; t < n; t++) e = i[t], this.configuration[e.getAttribute("name").replace("cloudinary_", "")] = e.getAttribute("content");
            return this
        }, e.prototype.fromEnvironment = function() {
            var e, t, n, i, o, r, s, a, l, u;
            if (null != (e = "undefined" != typeof process && null !== process && null != (r = process.env) ? r.CLOUDINARY_URL : void 0) && (l = /cloudinary:\/\/(?:(\w+)(?:\:(\w+))?@)?([\w\.-]+)(?:\/([^?]*))?(?:\?(.+))?/.exec(e)) && (null != l[3] && (this.configuration.cloud_name = l[3]), null != l[1] && (this.configuration.api_key = l[1]), null != l[2] && (this.configuration.api_secret = l[2]), null != l[4] && (this.configuration.private_cdn = null != l[4]), null != l[4] && (this.configuration.secure_distribution = l[4]), null != (o = l[5])))
                for (t = 0, i = (s = o.split("&")).length; t < i; t++) n = (a = s[t].split("="))[0], null == (u = a[1]) && (u = !0), this.configuration[n] = u;
            return this
        }, e.prototype.config = function(e, t) {
            switch (!1) {
                case void 0 === t:
                    return this.set(e, t), this.configuration;
                case !C.isString(e):
                    return this.get(e);
                case !C.isPlainObject(e):
                    return this.merge(e), this.configuration;
                default:
                    return this.configuration
            }
        }, e.prototype.toOptions = function() {
            return C.cloneDeep(this.configuration)
        }, e
    }(), b = function() {
        function e(e) {
            var o, r;
            null == e && (e = {}), o = void 0, r = {}, this.toOptions || (this.toOptions = function(e) {
                var t, n, i, o, s, a, l;
                for (t in null == e && (e = !0), i = {}, r) l = r[t], i[t] = l.origValue;
                for (t in o = this.otherOptions) void 0 !== (l = o[t]) && (i[t] = l);
                if (e && !C.isEmpty(this.chained)) {
                    for (t in (n = function() {
                            var e, t, n, i;
                            for (i = [], e = 0, t = (n = this.chained).length; e < t; e++) a = n[e], i.push(a.toOptions());
                            return i
                        }.call(this)).push(i), i = {}, s = this.otherOptions) void 0 !== (l = s[t]) && (i[t] = l);
                    i.transformation = n
                }
                return i
            }), this.setParent || (this.setParent = function(e) {
                return o = e, null != e && this.fromOptions("function" == typeof e.toOptions ? e.toOptions() : void 0), this
            }), this.getParent || (this.getParent = function() {
                return o
            }), this.param || (this.param = function(e, t, n, i, o) {
                return null == o && (o = C.isFunction(i) ? i : C.identity), r[t] = new h(t, n, o).set(e), this
            }), this.rawParam || (this.rawParam = function(e, t, n, o, s) {
                return null == s && (s = C.identity), s = i(arguments), r[t] = new m(t, n, s).set(e), this
            }), this.rangeParam || (this.rangeParam = function(e, t, n, o, s) {
                return null == s && (s = C.identity), s = i(arguments), r[t] = new g(t, n, s).set(e), this
            }), this.arrayParam || (this.arrayParam = function(e, n, o, s, a, l) {
                return null == s && (s = ":"), null == a && (a = []), null == l && (l = C.identity), l = i(arguments), r[n] = new t(n, o, s, l).set(e), this
            }), this.transformationParam || (this.transformationParam = function(e, t, n, o, s, a) {
                return null == o && (o = "."), null == a && (a = C.identity), a = i(arguments), r[t] = new x(t, n, o, a).set(e), this
            }), this.layerParam || (this.layerParam = function(e, t, n) {
                return r[t] = new f(t, n).set(e), this
            }), this.getValue || (this.getValue = function(e) {
                var t, n;
                return null != (t = null != (n = r[e]) ? n.value() : void 0) ? t : this.otherOptions[e]
            }), this.get || (this.get = function(e) {
                return r[e]
            }), this.remove || (this.remove = function(e) {
                var t;
                switch (!1) {
                    case null == r[e]:
                        return t = r[e], delete r[e], t.origValue;
                    case null == this.otherOptions[e]:
                        return t = this.otherOptions[e], delete this.otherOptions[e], t;
                    default:
                        return null
                }
            }), this.keys || (this.keys = function() {
                var e;
                return function() {
                    var t;
                    for (e in t = [], r) null != e && t.push(e.match(n) ? e : C.snakeCase(e));
                    return t
                }().sort()
            }), this.toPlainObject || (this.toPlainObject = function() {
                var e, t, n, i;
                for (t in e = {}, r) e[t] = r[t].value(), C.isPlainObject(e[t]) && (e[t] = C.cloneDeep(e[t]));
                return C.isEmpty(this.chained) || ((n = function() {
                    var e, t, n, o;
                    for (o = [], e = 0, t = (n = this.chained).length; e < t; e++) i = n[e], o.push(i.toPlainObject());
                    return o
                }.call(this)).push(e), e = {
                    transformation: n
                }), e
            }), this.chain || (this.chain = function() {
                var e;
                return 0 !== Object.getOwnPropertyNames(r).length && (e = new this.constructor(this.toOptions(!1)), this.resetTransformations(), this.chained.push(e)), this
            }), this.resetTransformations || (this.resetTransformations = function() {
                return r = {}, this
            }), this.otherOptions || (this.otherOptions = {}), this.chained = [], C.isEmpty(e) || this.fromOptions(e)
        }
        var n, i, o;
        return n = /^\$[a-zA-Z0-9]+$/, e.prototype.trans_separator = "/", e.prototype.param_separator = ",", i = function(e) {
            var t;
            return t = null != e ? e[e.length - 1] : void 0, C.isFunction(t) ? t : void 0
        }, e.prototype.fromOptions = function(t) {
            var i, o;
            if (t instanceof e) this.fromTransformation(t);
            else
                for (i in t || (t = {}), (C.isString(t) || C.isArray(t)) && (t = {
                        transformation: t
                    }), (t = C.cloneDeep(t, function(t) {
                        if (t instanceof e) return new t.constructor(t.toOptions())
                    }))["if"] && (this.set("if", t["if"]), delete t["if"]), t) o = t[i], i.match(n) ? "$attr" !== i && this.set("variable", i, o) : this.set(i, o);
            return this
        }, e.prototype.fromTransformation = function(t) {
            var n, i, o, r;
            if (t instanceof e)
                for (n = 0, o = (r = t.keys()).length; n < o; n++) i = r[n], this.set(i, t.get(i).origValue);
            return this
        }, e.prototype.set = function() {
            var e, t, n;
            return t = arguments[0], n = 2 <= arguments.length ? slice.call(arguments, 1) : [], e = C.camelCase(t), C.contains(w.methods, e) ? this[e].apply(this, n) : this.otherOptions[t] = n[0], this
        }, e.prototype.hasLayer = function() {
            return this.getValue("overlay") || this.getValue("underlay")
        }, e.prototype.serialize = function() {
            var e, t, i, r, s, a, u, c, d, p, f, h, g, m, y, v, w, b;
            for (p = function() {
                    var e, t, n, i;
                    for (i = [], e = 0, t = (n = this.chained).length; e < t; e++) h = n[e], i.push(h.serialize());
                    return i
                }.call(this), r = this.keys(), y = null != (s = this.get("transformation")) ? s.serialize() : void 0, e = null != (a = this.get("if")) ? a.serialize() : void 0, w = o(null != (u = this.get("variables")) ? u.value() : void 0), r = C.difference(r, ["transformation", "if", "variables"]), b = [], g = [], t = 0, i = r.length; t < i; t++)(f = r[t]).match(n) ? b.push(f + "_" + l.normalize(null != (c = this.get(f)) ? c.value() : void 0)) : g.push(null != (d = this.get(f)) ? d.serialize() : void 0);
            switch (!1) {
                case !C.isString(y):
                    g.push(y);
                    break;
                case !C.isArray(y):
                    p = p.concat(y)
            }
            return g = function() {
                var e, t, n;
                for (n = [], e = 0, t = g.length; e < t; e++) v = g[e], (C.isArray(v) && !C.isEmpty(v) || !C.isArray(v) && v) && n.push(v);
                return n
            }(), g = b.sort().concat(w).concat(g.sort()), "if_end" === e ? g.push(e) : C.isEmpty(e) || g.unshift(e), m = C.compact(g).join(this.param_separator), C.isEmpty(m) || p.push(m), C.compact(p).join(this.trans_separator)
        }, e.prototype.listNames = function() {
            return w.methods
        }, e.prototype.toHtmlAttributes = function() {
            var e, t, n, i, o, r, s, a, l, u;
            for (n in o = {}, r = this.otherOptions) u = r[n], C.contains(w.PARAM_NAMES, C.snakeCase(n)) || (o[/^html_/.test(n) ? n.slice(5) : n] = u);
            for (t = 0, i = (s = this.keys()).length; t < i; t++) n = s[t], /^html_/.test(n) && (o[C.camelCase(n.slice(5))] = this.getValue(n));
            return this.hasLayer() || this.getValue("angle") || C.contains(["fit", "limit", "lfill"], this.getValue("crop")) || (K = null != (a = this.get("width")) ? a.origValue : void 0, e = null != (l = this.get("height")) ? l.origValue : void 0, parseFloat(K) >= 1 && null == o.width && (o.width = K), parseFloat(e) >= 1 && null == o.height && (o.height = e)), o
        }, e.prototype.isValidParamName = function(e) {
            return w.methods.indexOf(C.camelCase(e)) >= 0
        }, e.prototype.toHtml = function() {
            var e;
            return null != (e = this.getParent()) && "function" == typeof e.toHtml ? e.toHtml() : void 0
        }, e.prototype.toString = function() {
            return this.serialize()
        }, o = function(e) {
            var t, n, i, o, r, s;
            if (C.isArray(e)) {
                for (r = [], t = 0, n = e.length; t < n; t++) i = (o = e[t])[0], s = o[1], r.push(i + "_" + l.normalize(s));
                return r
            }
            return e
        }, e
    }(), (w = function() {
        function e(t) {
            null == t && (t = {}), e.__super__.constructor.call(this, t)
        }
        return extend(e, b), e["new"] = function(t) {
            return new e(t)
        }, e.prototype.angle = function(e) {
            return this.arrayParam(e, "angle", "a", ".", l.normalize)
        }, e.prototype.audioCodec = function(e) {
            return this.param(e, "audio_codec", "ac")
        }, e.prototype.audioFrequency = function(e) {
            return this.param(e, "audio_frequency", "af")
        }, e.prototype.aspectRatio = function(e) {
            return this.param(e, "aspect_ratio", "ar", l.normalize)
        }, e.prototype.background = function(e) {
            return this.param(e, "background", "b", h.norm_color)
        }, e.prototype.bitRate = function(e) {
            return this.param(e, "bit_rate", "br")
        }, e.prototype.border = function(e) {
            return this.param(e, "border", "bo", function(e) {
                return C.isPlainObject(e) ? (e = C.assign({}, {
                    color: "black",
                    width: 2
                }, e)).width + "px_solid_" + h.norm_color(e.color) : e
            })
        }, e.prototype.color = function(e) {
            return this.param(e, "color", "co", h.norm_color)
        }, e.prototype.colorSpace = function(e) {
            return this.param(e, "color_space", "cs")
        }, e.prototype.crop = function(e) {
            return this.param(e, "crop", "c")
        }, e.prototype.defaultImage = function(e) {
            return this.param(e, "default_image", "d")
        }, e.prototype.delay = function(e) {
            return this.param(e, "delay", "dl")
        }, e.prototype.density = function(e) {
            return this.param(e, "density", "dn")
        }, e.prototype.duration = function(e) {
            return this.rangeParam(e, "duration", "du")
        }, e.prototype.dpr = function(e) {
            return this.param(e, "dpr", "dpr", function(e) {
                return (null != (e = e.toString()) ? e.match(/^\d+$/) : void 0) ? e + ".0" : l.normalize(e)
            })
        }, e.prototype.effect = function(e) {
            return this.arrayParam(e, "effect", "e", ":", l.normalize)
        }, e.prototype["else"] = function() {
            return this["if"]("else")
        }, e.prototype.endIf = function() {
            return this["if"]("end")
        }, e.prototype.endOffset = function(e) {
            return this.rangeParam(e, "end_offset", "eo")
        }, e.prototype.fallbackContent = function(e) {
            return this.param(e, "fallback_content")
        }, e.prototype.fetchFormat = function(e) {
            return this.param(e, "fetch_format", "f")
        }, e.prototype.format = function(e) {
            return this.param(e, "format")
        }, e.prototype.flags = function(e) {
            return this.arrayParam(e, "flags", "fl", ".")
        }, e.prototype.gravity = function(e) {
            return this.param(e, "gravity", "g")
        }, e.prototype.height = function(e) {
            return this.param(e, "height", "h", (t = this, function() {
                return t.getValue("crop") || t.getValue("overlay") || t.getValue("underlay") ? l.normalize(e) : null
            }));
            var t
        }, e.prototype.htmlHeight = function(e) {
            return this.param(e, "html_height")
        }, e.prototype.htmlWidth = function(e) {
            return this.param(e, "html_width")
        }, e.prototype["if"] = function(t) {
            var n, i, o, r, a;
            switch (null == t && (t = ""), t) {
                case "else":
                    return this.chain(), this.param(t, "if", "if");
                case "end":
                    for (this.chain(), n = o = this.chained.length - 1; o >= 0 && "end" !== (i = this.chained[n].getValue("if")) && (null == i || (r = e["new"]()["if"](i), this.chained[n].remove("if"), a = this.chained[n], this.chained[n] = e["new"]().transformation([r, a]), "else" === i)); n = o += -1);
                    return this.param(t, "if", "if");
                case "":
                    return s["new"]().setParent(this);
                default:
                    return this.param(t, "if", "if", function(e) {
                        return s["new"](e).toString()
                    })
            }
        }, e.prototype.keyframeInterval = function(e) {
            return this.param(e, "keyframe_interval", "ki")
        }, e.prototype.offset = function(e) {
            var t, n, i;
            if (i = (n = C.isFunction(null != e ? e.split : void 0) ? e.split("..") : C.isArray(e) ? e : [null, null])[0], t = n[1], null != i && this.startOffset(i), null != t) return this.endOffset(t)
        }, e.prototype.opacity = function(e) {
            return this.param(e, "opacity", "o", l.normalize)
        }, e.prototype.overlay = function(e) {
            return this.layerParam(e, "overlay", "l")
        }, e.prototype.page = function(e) {
            return this.param(e, "page", "pg")
        }, e.prototype.poster = function(e) {
            return this.param(e, "poster")
        }, e.prototype.prefix = function(e) {
            return this.param(e, "prefix", "p")
        }, e.prototype.quality = function(e) {
            return this.param(e, "quality", "q", l.normalize)
        }, e.prototype.radius = function(e) {
            return this.param(e, "radius", "r", l.normalize)
        }, e.prototype.rawTransformation = function(e) {
            return this.rawParam(e, "raw_transformation")
        }, e.prototype.size = function(e) {
            var t, n;
            if (C.isFunction(null != e ? e.split : void 0)) return n = e.split("x"), K = n[0], t = n[1], this.width(K), this.height(t)
        }, e.prototype.sourceTypes = function(e) {
            return this.param(e, "source_types")
        }, e.prototype.sourceTransformation = function(e) {
            return this.param(e, "source_transformation")
        }, e.prototype.startOffset = function(e) {
            return this.rangeParam(e, "start_offset", "so")
        }, e.prototype.streamingProfile = function(e) {
            return this.param(e, "streaming_profile", "sp")
        }, e.prototype.transformation = function(e) {
            return this.transformationParam(e, "transformation", "t")
        }, e.prototype.underlay = function(e) {
            return this.layerParam(e, "underlay", "u")
        }, e.prototype.variable = function(e, t) {
            return this.param(t, e, e)
        }, e.prototype.variables = function(e) {
            return this.arrayParam(e, "variables")
        }, e.prototype.videoCodec = function(e) {
            return this.param(e, "video_codec", "vc", h.process_video_params)
        }, e.prototype.videoSampling = function(e) {
            return this.param(e, "video_sampling", "vs")
        }, e.prototype.width = function(e) {
            return this.param(e, "width", "w", (t = this, function() {
                return t.getValue("crop") || t.getValue("overlay") || t.getValue("underlay") ? l.normalize(e) : null
            }));
            var t
        }, e.prototype.x = function(e) {
            return this.param(e, "x", "x", l.normalize)
        }, e.prototype.y = function(e) {
            return this.param(e, "y", "y", l.normalize)
        }, e.prototype.zoom = function(e) {
            return this.param(e, "zoom", "z", l.normalize)
        }, e
    }()).methods || (w.methods = C.difference(C.functions(w.prototype), C.functions(b.prototype))), w.PARAM_NAMES || (w.PARAM_NAMES = function() {
        var e, t, n, i;
        for (i = [], e = 0, t = (n = w.methods).length; e < t; e++) R = n[e], i.push(C.snakeCase(R));
        return i
    }().concat(a.CONFIG_PARAMS)), c = function() {
        function e(e, t, n) {
            var i;
            this.name = e, this.publicId = t, null == n && (C.isPlainObject(t) ? (n = t, this.publicId = void 0) : n = {}), (i = new w(n)).setParent(this), this.transformation = function() {
                return i
            }
        }
        var t;
        return e["new"] = function(e, t, n) {
            return new this(e, t, n)
        }, t = function(e, t) {
            return t ? !0 === t ? e : e + '="' + t + '"' : void 0
        }, e.prototype.htmlAttrs = function(e) {
            var n, i;
            return function() {
                var o;
                for (n in o = [], e)(i = e[n]) && o.push(t(n, i));
                return o
            }().sort().join(" ")
        }, e.prototype.getOptions = function() {
            return this.transformation().toOptions()
        }, e.prototype.getOption = function(e) {
            return this.transformation().getValue(e)
        }, e.prototype.attributes = function() {
            return this.transformation().toHtmlAttributes()
        }, e.prototype.setAttr = function(e, t) {
            return this.transformation().set("html_" + e, t), this
        }, e.prototype.getAttr = function(e) {
            return this.attributes()["html_" + e] || this.attributes()[e]
        }, e.prototype.removeAttr = function(e) {
            var t;
            return null != (t = this.transformation().remove("html_" + e)) ? t : this.transformation().remove(e)
        }, e.prototype.content = function() {
            return ""
        }, e.prototype.openTag = function() {
            return "<" + this.name + " " + this.htmlAttrs(this.attributes()) + ">"
        }, e.prototype.closeTag = function() {
            return "</" + this.name + ">"
        }, e.prototype.toHtml = function() {
            return this.openTag() + this.content() + this.closeTag()
        }, e.prototype.toDOM = function() {
            var e, t, n, i;
            if (!C.isFunction("undefined" != typeof document && null !== document ? document.createElement : void 0)) throw "Can't create DOM if document is not present!";
            for (t in e = document.createElement(this.name), n = this.attributes()) i = n[t], e[t] = i;
            return e
        }, e.isResponsive = function(e, t) {
            var n;
            return n = C.getData(e, "src-cache") || C.getData(e, "src"), C.hasClass(e, t) && /\bw_auto\b/.exec(n)
        }, e
    }(), d = function() {
        function e(t, n) {
            null == n && (n = {}), e.__super__.constructor.call(this, "img", t, n)
        }
        return extend(e, c), e.prototype.closeTag = function() {
            return ""
        }, e.prototype.attributes = function() {
            var t, n, i;
            return null == (t = e.__super__.attributes.call(this) || [])[i = (n = this.getOptions()).responsive && !n.client_hints ? "data-src" : "src"] && (t[i] = new o(this.getOptions()).url(this.publicId)), t
        }, e
    }(), S = function() {
        function e(t, n) {
            null == n && (n = {}), n = C.defaults({}, n, o.DEFAULT_VIDEO_PARAMS), e.__super__.constructor.call(this, "video", t.replace(/\.(mp4|ogv|webm)$/, ""), n)
        }
        var t, n;
        return extend(e, c), n = ["source_types", "source_transformation", "fallback_content", "poster"], ["webm", "mp4", "ogv"], t = {
            format: "jpg",
            resource_type: "video"
        }, e.prototype.setSourceTransformation = function(e) {
            return this.transformation().sourceTransformation(e), this
        }, e.prototype.setSourceTypes = function(e) {
            return this.transformation().sourceTypes(e), this
        }, e.prototype.setPoster = function(e) {
            return this.transformation().poster(e), this
        }, e.prototype.setFallbackContent = function(e) {
            return this.transformation().fallbackContent(e), this
        }, e.prototype.content = function() {
            var e, t, n, i, r, s, a, l, u;
            return s = this.transformation().getValue("source_types"), r = this.transformation().getValue("source_transformation"), t = this.transformation().getValue("fallback_content"), C.isArray(s) ? (e = new o(this.getOptions()), n = function() {
                var t, n, o;
                for (o = [], t = 0, n = s.length; t < n; t++) l = s[t], u = r[l] || {}, a = e.url("" + this.publicId, C.defaults({}, u, {
                    resource_type: "video",
                    format: l
                })), i = "video/" + ("ogv" === l ? "ogg" : l), o.push("<source " + this.htmlAttrs({
                    src: a,
                    type: i
                }) + ">");
                return o
            }.call(this)) : n = [], n.join("") + t
        }, e.prototype.attributes = function() {
            var i, r, s, a, l, u, c, d;
            for (d = this.getOption("source_types"), l = null != (u = this.getOption("poster")) ? u : {}, C.isPlainObject(l) && (N = null != l.public_id ? o.DEFAULT_IMAGE_PARAMS : t, l = new o(this.getOptions()).url(null != (c = l.public_id) ? c : this.publicId, C.defaults({}, l, N))), s = 0, a = (r = e.__super__.attributes.call(this) || []).length; s < a; s++) i = r[s], C.contains(n) || (r = i);
            return C.isArray(d) || (r.src = new o(this.getOptions()).url(this.publicId, {
                resource_type: "video",
                format: d
            })), null != l && (r.poster = l), r
        }, e
    }(), i = function() {
        function e(t) {
            e.__super__.constructor.call(this, "meta", void 0, C.assign({
                "http-equiv": "Accept-CH",
                content: "DPR, Viewport-Width, Width"
            }, t))
        }
        return extend(e, c), e.prototype.closeTag = function() {
            return ""
        }, e
    }(), o = function() {
        function e(e) {
            var t;
            this.devicePixelRatioCache = {}, this.responsiveConfig = {}, this.responsiveResizeInitialized = !1, t = new a(e), this.config = function(e, n) {
                return t.config(e, n)
            }, this.fromDocument = function() {
                return t.fromDocument(), this
            }, this.fromEnvironment = function() {
                return t.fromEnvironment(), this
            }, this.init = function() {
                return t.init(), this
            }
        }
        var t, n, i, o, r, s, l, u, p, f, h, g, m, y;
        return "2.3.0", "d3jpl91pxevbkh.cloudfront.net", i = "cloudinary-a.akamaihd.net", o = "res.cloudinary.com", t = {
            format: "jpg",
            resource_type: "video"
        }, n = ["webm", "mp4", "ogv"], e.DEFAULT_IMAGE_PARAMS = {
            resource_type: "image",
            transformation: [],
            type: "upload"
        }, e.DEFAULT_VIDEO_PARAMS = {
            fallback_content: "",
            resource_type: "video",
            source_transformation: {},
            source_types: n,
            transformation: [],
            type: "upload"
        }, e["new"] = function(e) {
            return new this(e)
        }, h = function(e, t, n, i, o) {
            var r;
            if (C.isPlainObject(e) && (e = (r = e).resource_type, t = r.type, n = r.url_suffix, i = r.use_root_path, o = r.shorten), null == t && (t = "upload"), null != n)
                if ("image" === e && "upload" === t) e = "images", t = null;
                else {
                    if ("raw" !== e || "upload" !== t) throw new Error("URL Suffix only supported for image/upload and raw/upload");
                    e = "files", t = null
                } if (i) {
                if (("image" !== e || "upload" !== t) && "images" !== e) throw new Error("Root path only supported for image/upload");
                e = null, t = null
            }
            return o && "image" === e && "upload" === t && (e = "iu", t = null), [e, t].join("/")
        }, r = function(e) {
            var t;
            return e.match(/^https?:\//) || (t = document.location.protocol + "//" + document.location.host, "?" === e[0] ? t += document.location.pathname : "/" !== e[0] && (t += document.location.pathname.replace(/\/[^\/]*$/, "/")), e = t + e), e
        }, e.prototype.url = function(t, n) {
            var i, o, s, a, l, u, c;
            if (null == n && (n = {}), !t) return t;
            if (n instanceof w && (n = n.toOptions()), "fetch" === (n = C.defaults({}, n, this.config(), e.DEFAULT_IMAGE_PARAMS)).type && (n.fetch_format = n.fetch_format || n.format, t = r(t)), l = new w(n).serialize(), !n.cloud_name) throw "Unknown cloud_name";
            if (n.url_suffix && !n.private_cdn) throw "URL Suffix only supported in private CDN";
            if (t.search("/") >= 0 && !t.match(/^v[0-9]+/) && !t.match(/^https?:\//) && !(null != (s = n.version) ? s.toString() : void 0) && (n.version = 1), t.match(/^https?:/)) "upload" === n.type || "asset" === n.type ? u = t : t = encodeURIComponent(t).replace(/%3A/g, ":").replace(/%2F/g, "/");
            else {
                try {
                    t = decodeURIComponent(t)
                } catch (i) {
                    i
                }
                if (t = encodeURIComponent(t).replace(/%3A/g, ":").replace(/%2F/g, "/"), n.url_suffix) {
                    if (n.url_suffix.match(/[\.\/]/)) throw "url_suffix should not include . or /";
                    t = t + "/" + n.url_suffix
                }
                n.format && (n.trust_public_id || (t = t.replace(/\.(jpg|png|gif|webp)$/, "")), t = t + "." + n.format)
            }
            return o = p(t, n), a = h(n.resource_type, n.type, n.url_suffix, n.use_root_path, n.shorten), c = n.version ? "v" + n.version : "", u || C.compact([o, a, l, c, t]).join("/").replace(/([^:])\/+/g, "$1/")
        }, e.prototype.video_url = function(e, t) {
            return t = C.assign({
                resource_type: "video"
            }, t), this.url(e, t)
        }, e.prototype.video_thumbnail_url = function(e, n) {
            return n = C.assign({}, t, n), this.url(e, n)
        }, e.prototype.transformation_string = function(e) {
            return new w(e).serialize()
        }, e.prototype.image = function(e, t) {
            var n, i, o, r;
            return null == t && (t = {}), i = this.imageTag(e, t), n = null != (o = null != (r = t.client_hints) ? r : this.config("client_hints")) && o, null != t.src || n || i.setAttr("src", ""), i = i.toDOM(), n || (C.setData(i, "src-cache", this.url(e, t)), this.cloudinary_update(i, t)), i
        }, e.prototype.imageTag = function(e, t) {
            var n;
            return (n = new d(e, this.config())).transformation().fromOptions(t), n
        }, e.prototype.video_thumbnail = function(e, n) {
            return this.image(e, C.merge({}, t, n))
        }, e.prototype.facebook_profile_image = function(e, t) {
            return this.image(e, C.assign({
                type: "facebook"
            }, t))
        }, e.prototype.twitter_profile_image = function(e, t) {
            return this.image(e, C.assign({
                type: "twitter"
            }, t))
        }, e.prototype.twitter_name_profile_image = function(e, t) {
            return this.image(e, C.assign({
                type: "twitter_name"
            }, t))
        }, e.prototype.gravatar_image = function(e, t) {
            return this.image(e, C.assign({
                type: "gravatar"
            }, t))
        }, e.prototype.fetch_image = function(e, t) {
            return this.image(e, C.assign({
                type: "fetch"
            }, t))
        }, e.prototype.video = function(e, t) {
            return null == t && (t = {}), this.videoTag(e, t).toHtml()
        }, e.prototype.videoTag = function(e, t) {
            return t = C.defaults({}, t, this.config()), new S(e, t)
        }, e.prototype.sprite_css = function(e, t) {
            return t = C.assign({
                type: "sprite"
            }, t), e.match(/.css$/) || (t.format = "css"), this.url(e, t)
        }, e.prototype.responsive = function(e, t) {
            var n, i, o, r, s, a;
            if (null == t && (t = !0), this.responsiveConfig = C.merge(this.responsiveConfig || {}, e), r = null != (n = this.responsiveConfig.responsive_class) ? n : this.config("responsive_class"), t && this.cloudinary_update("img." + r + ", img.cld-hidpi", this.responsiveConfig), (null == (i = null != (o = this.responsiveConfig.responsive_resize) ? o : this.config("responsive_resize")) || i) && !this.responsiveResizeInitialized) return this.responsiveConfig.resizing = this.responsiveResizeInitialized = !0, s = null, window.addEventListener("resize", (a = this, function() {
                var e, t, n, i, o, l;
                return e = null != (t = null != (n = a.responsiveConfig.responsive_debounce) ? n : a.config("responsive_debounce")) ? t : 100, i = function() {
                    if (s) return clearTimeout(s), s = null
                }, o = function() {
                    return a.cloudinary_update("img." + r, a.responsiveConfig)
                }, l = function() {
                    return i(), o()
                }, e ? (i(), s = setTimeout(l, e)) : o()
            }))
        }, e.prototype.calc_breakpoint = function(e, t, n) {
            var i, o;
            return i = C.getData(e, "breakpoints") || C.getData(e, "stoppoints") || this.config("breakpoints") || this.config("stoppoints") || f, C.isFunction(i) ? i(t, n) : (C.isString(i) && (i = function() {
                var e, t, n, r;
                for (r = [], e = 0, t = (n = i.split(",")).length; e < t; e++) o = n[e], r.push(parseInt(o));
                return r
            }().sort(function(e, t) {
                return e - t
            })), u(i, t))
        }, e.prototype.calc_stoppoint = e.prototype.calc_breakpoint, e.prototype.device_pixel_ratio = function(e) {
            var t, n;
            return null == e && (e = !0), t = ("undefined" != typeof window && null !== window ? window.devicePixelRatio : void 0) || 1, e && (t = Math.ceil(t)), (t <= 0 || t === NaN) && (t = 1), (n = t.toString()).match(/^\d+$/) && (n += ".0"), n
        }, f = function(e, t) {
            return null == t && (t = 100), t * Math.ceil(e / t)
        }, u = function(e, t) {
            var n;
            for (n = e.length - 2; n >= 0 && e[n] >= t;) n--;
            return e[n + 1]
        }, l = function(e) {
            return L(e) % 5 + 1
        }, p = function(e, t) {
            var n, r, s, a, u, c;
            return 0 === (null != (u = t.cloud_name) ? u.indexOf("/") : void 0) ? "/res" + t.cloud_name : (a = "http://", n = "", c = "res", r = ".cloudinary.com", s = "/" + t.cloud_name, t.protocol && (a = t.protocol + "//"), t.private_cdn && (n = t.cloud_name + "-", s = ""), t.cdn_subdomain && (c = "res-" + l(e)), t.secure ? (a = "https://", !1 === t.secure_cdn_subdomain && (c = "res"), null != t.secure_distribution && t.secure_distribution !== i && t.secure_distribution !== o && (n = "", c = "", r = t.secure_distribution)) : t.cname && (a = "http://", n = "", c = t.cdn_subdomain ? "a" + (L(e) % 5 + 1) + "." : "", r = t.cname), [a, n, c, r, s].join(""))
        }, e.prototype.processImageTags = function(e, t) {
            var n, i, o, r, s;
            return null == t && (t = {}), C.isEmpty(e) ? this : (t = C.defaults({}, t, this.config()), n = function() {
                var n, a, l, u;
                for (u = [], n = 0, a = e.length; n < a; n++) "IMG" === (null != (l = (o = e[n]).tagName) ? l.toUpperCase() : void 0) && (i = C.assign({
                    width: o.getAttribute("width"),
                    height: o.getAttribute("height"),
                    src: o.getAttribute("src")
                }, t), r = i.source || i.src, delete i.source, delete i.src, s = this.url(r, i), i = new w(i).toHtmlAttributes(), C.setData(o, "src-cache", s), o.setAttribute("width", i.width), o.setAttribute("height", i.height), u.push(o));
                return u
            }.call(this), this.cloudinary_update(n, t), this)
        }, s = function(e, t, n, i) {
            var o, r, s, a;
            return !(a = null != (o = null != (r = null != (s = i.responsive_use_breakpoints) ? s : i.responsive_use_stoppoints) ? r : this.config("responsive_use_breakpoints")) ? o : this.config("responsive_use_stoppoints")) || "resize" === a && !i.resizing ? t : this.calc_breakpoint(e, t, n)
        }, g = function(e) {
            var t, n;
            for (t = 0;
                (e = null != e ? e.parentNode : void 0) instanceof Element && !t;) n = window.getComputedStyle(e), /^inline/.test(n.display) || (t = C.width(e));
            return t
        }, y = function(e, t) {
            return e.replace(/\bdpr_(1\.0|auto)\b/g, "dpr_" + this.device_pixel_ratio(t))
        }, m = function(e, t) {
            var n;
            return e > (n = C.getData(t, "width") || 0) && (n = e, C.setData(t, "width", e)), n
        }, e.prototype.cloudinary_update = function(e, t) {
            var n, i, o, r, a, l, u, d, p, f, h, v, w, b, x, S, T;
            if (null == t && (t = {}), null === e) return this;
            for (w = null != (l = null != (u = t.responsive) ? u : this.config("responsive")) && l, e = function() {
                    switch (!1) {
                        case !C.isArray(e):
                        case "NodeList" !== e.constructor.name:
                            return e;
                        case !C.isString(e):
                            return document.querySelectorAll(e);
                        default:
                            return [e]
                    }
                }(), b = null != (d = null != (p = this.responsiveConfig.responsive_class) ? p : t.responsive_class) ? d : this.config("responsive_class"), x = null != (f = t.round_dpr) ? f : this.config("round_dpr"), o = 0, r = e.length; o < r; o++)
                if ((null != (h = (T = e[o]).tagName) ? h.match(/img/i) : void 0) && (S = !0, w && C.addClass(T, b), i = C.getData(T, "src-cache") || C.getData(T, "src"), !C.isEmpty(i))) {
                    if (i = y.call(this, i, x), c.isResponsive(T, b))
                        if (0 !== (n = g(T))) {
                            switch (!1) {
                                case !/w_auto:breakpoints/.test(i):
                                    v = m(n, T), i = i.replace(/w_auto:breakpoints([_0-9]*)(:[0-9]+)?/, "w_auto:breakpoints$1:" + v);
                                    break;
                                case !(a = /w_auto(:(\d+))?/.exec(i)):
                                    v = s.call(this, T, n, a[2], t), v = m(v, T), i = i.replace(/w_auto[^,\/]*/g, "w_" + v)
                            }
                            C.removeAttribute(T, "width"), t.responsive_preserve_height || C.removeAttribute(T, "height")
                        } else S = !1;
                    S && C.setAttribute(T, "src", i)
                } return this
        }, e.prototype.transformation = function(e) {
            return w["new"](this.config()).fromOptions(e).setParent(this)
        }, e
    }(), r = function() {
        function t(e) {
            t.__super__.constructor.call(this, e)
        }
        return extend(t, o), t.prototype.image = function(t, n) {
            var i, o, r, s;
            return null == n && (n = {}), o = this.imageTag(t, n), i = null != (r = null != (s = n.client_hints) ? s : this.config("client_hints")) && r, null != n.src || i || o.setAttr("src", ""), o = e(o.toHtml()), i || o.data("src-cache", this.url(t, n)).cloudinary_update(n), o
        }, t.prototype.responsive = function(t) {
            var n, i, o, r, s, a, l, u;
            if (s = e.extend(s || {}, t), r = null != (n = this.responsiveConfig.responsive_class) ? n : this.config("responsive_class"), e("img." + r + ", img.cld-hidpi").cloudinary_update(s), (null == (i = null != (o = s.responsive_resize) ? o : this.config("responsive_resize")) || i) && !a) return s.resizing = a = !0, l = null, e(window).on("resize", (u = this, function() {
                var t, n, i, o, a;
                return t = null != (n = null != (i = s.responsive_debounce) ? i : u.config("responsive_debounce")) ? n : 100, o = function() {
                    if (l) return clearTimeout(l), l = null
                }, a = function() {
                    return e("img." + r).cloudinary_update(s)
                }, t ? (o(), setTimeout(function() {
                    return o(), a()
                }, t)) : a()
            }))
        }, t
    }(), e.fn.cloudinary = function(t) {
        return this.filter("img").each(function() {
            var n, i, o;
            return i = (n = e.extend({
                width: e(this).attr("width"),
                height: e(this).attr("height"),
                src: e(this).attr("src")
            }, e(this).data(), t)).source || n.src, delete n.source, delete n.src, o = e.cloudinary.url(i, n), n = new w(n).toHtmlAttributes(), e(this).data("src-cache", o).attr({
                width: n.width,
                height: n.height
            })
        }).cloudinary_update(t), this
    }, e.fn.cloudinary_update = function(t) {
        return null == t && (t = {}), e.cloudinary.cloudinary_update(this.filter("img").toArray(), t), this
    }, J = null, e.fn.webpify = function(t, n) {
        var i, o;
        return null == t && (t = {}), i = this, n = null != n ? n : t, J || (J = e.Deferred(), (o = new Image).onerror = J.reject, o.onload = J.resolve, o.src = "data:image/webp;base64,UklGRi4AAABXRUJQVlA4TCEAAAAvAUAAEB8wAiMwAgSSNtse/cXjxyCCmrYNWPwmHRH9jwMA"), e(function() {
            return J.done(function() {
                return e(i).cloudinary(e.extend({}, n, {
                    format: "webp"
                }))
            }).fail(function() {
                return e(i).cloudinary(t)
            })
        }), this
    }, e.fn.fetchify = function(t) {
        return this.cloudinary(e.extend(t, {
            type: "fetch"
        }))
    }, e.cloudinary = new r, e.cloudinary.fromDocument(), r.prototype.delete_by_token = function(t, n) {
        var i, o;
        return (o = (n = n || {}).url) || (o = "https://api.cloudinary.com/v1_1/" + (n.cloud_name || e.cloudinary.config().cloud_name) + "/delete_by_token"), i = e.support.xhrFileUpload ? "json" : "iframe json", e.ajax({
            url: o,
            method: "POST",
            data: {
                token: t
            },
            headers: {
                "X-Requested-With": "XMLHttpRequest"
            },
            dataType: i
        })
    }, r.prototype.unsigned_upload_tag = function(t, n, i) {
        return e("<input/>").attr({
            type: "file",
            name: "file"
        }).unsigned_cloudinary_upload(t, n, i)
    }, e.fn.cloudinary_fileupload = function(t) {
        var n, i;
        return C.isFunction(e.fn.fileupload) ? ((n = !this.data("blueimpFileupload")) && (t = e.extend({
            maxFileSize: 2e7,
            dataType: "json",
            headers: {
                "X-Requested-With": "XMLHttpRequest"
            }
        }, t)), this.fileupload(t), n && (this.bind("fileuploaddone", function(t, n) {
            var i, o, r;
            if (!n.result.error) return n.result.path = ["v", n.result.version, "/", n.result.public_id, n.result.format ? "." + n.result.format : ""].join(""), n.cloudinaryField && n.form.length > 0 && (r = [n.result.resource_type, n.result.type, n.result.path].join("/") + "#" + n.result.signature, i = function() {
                return e("<input/>").attr({
                    type: "hidden",
                    name: n.cloudinaryField
                }).val(r).appendTo(n.form)
            }, e(t.target).prop("multiple") ? i() : (o = e(n.form).find('input[name="' + n.cloudinaryField + '"]')).length > 0 ? o.val(r) : i()), e(t.target).trigger("cloudinarydone", n)
        }), this.bind("fileuploadsend", function(t, n) {
            return n.headers = e.extend({}, n.headers, {
                "X-Unique-Upload-Id": (1e10 * Math.random()).toString(16)
            }), !0
        }), this.bind("fileuploadstart", function(t) {
            return e(t.target).trigger("cloudinarystart")
        }), this.bind("fileuploadstop", function(t) {
            return e(t.target).trigger("cloudinarystop")
        }), this.bind("fileuploadprogress", function(t, n) {
            return e(t.target).trigger("cloudinaryprogress", n)
        }), this.bind("fileuploadprogressall", function(t, n) {
            return e(t.target).trigger("cloudinaryprogressall", n)
        }), this.bind("fileuploadfail", function(t, n) {
            return e(t.target).trigger("cloudinaryfail", n)
        }), this.bind("fileuploadalways", function(t, n) {
            return e(t.target).trigger("cloudinaryalways", n)
        }), this.fileupload("option").url || (i = "https://api.cloudinary.com/v1_1/" + (t.cloud_name || e.cloudinary.config().cloud_name) + "/" + (t.resource_type || "auto") + "/" + (t.type || "upload"), this.fileupload("option", "url", i))), this) : this
    }, e.fn.cloudinary_upload_url = function(t) {
        return C.isFunction(e.fn.fileupload) ? (this.fileupload("option", "formData").file = t, this.fileupload("add", {
            files: [t]
        }), delete this.fileupload("option", "formData").file, this) : this
    }, e.fn.unsigned_cloudinary_upload = function(t, n, i) {
        var o, r, s, a, l, u;
        for (null == n && (n = {}), null == i && (i = {}), n = C.cloneDeep(n), i = C.cloneDeep(i), r = ["cloud_name", "resource_type", "type"], a = 0; a < r.length;) n[o = r[a]] && (i[o] = n[o], delete n[o]), a++;
        for (l in n) u = n[l], C.isPlainObject(u) ? n[l] = e.map(u, function(e, t) {
            return C.isString(e) && (e = e.replace(/[\|=]/g, "\\$&")), t + "=" + e
        }).join("|") : C.isArray(u) && (u.length > 0 && e.isArray(u[0]) ? n[l] = e.map(u, function(e) {
            return e.join(",")
        }).join("|") : n[l] = u.join(","));
        return n.callback || (n.callback = "/cloudinary_cors.html"), n.upload_preset = t, i.formData = n, i.cloudinary_field && (i.cloudinaryField = i.cloudinary_field, delete i.cloudinary_field), (s = i.html || {})["class"] = C.trim("cloudinary_fileupload " + (s["class"] || "")), i.multiple && (s.multiple = !0), this.attr(s).cloudinary_fileupload(i), this
    }, e.cloudinary = new r, D = {
        utf8_encode: X,
        crc32: L,
        Util: C,
        Condition: s,
        Transformation: w,
        Configuration: a,
        HtmlTag: c,
        ImageTag: d,
        VideoTag: S,
        ClientHintsMetaTag: i,
        Layer: p,
        TextLayer: v,
        SubtitlesLayer: y,
        Cloudinary: o,
        VERSION: "2.3.0",
        CloudinaryJQuery: r
    }
}), $(document).ready(function() {
        function e(e) {
            $(".multi_code").each(function(t, n) {
                var i = $(n).find(".framework_links a[data-framework=" + e + "]").length > 0;
                i && ($(n).find(".framework_sample, .framework_links a").removeClass("active"), "all" == e ? ($(n).find(".framework_sample").addClass("active"), $(n).addClass("all_mode")) : ($(n).find(".framework_sample[data-framework=" + e + "]").addClass("active"), $(n).removeClass("all_mode")), i && $(n).find(".framework_links a[data-framework=" + e + "]").addClass("active"), $("#content").trigger("do_resize"))
            })
        }
        $(".multi_code .framework_links a").click(function(t) {
            var n = $(this),
                i = n.data("framework"),
                o = n.get(0).getBoundingClientRect().top;
            e(i);
            var r = n.get(0).getBoundingClientRect().top;
            window.scrollBy(0, r - o), "undefined" != typeof dataLayer && dataLayer.push({
                event: "event to GA",
                eventCategory: "website codewidget",
                eventAction: "code language selected",
                eventLabel: "active language: " + i
            }), localStorage.setItem("codeWidgetFramework", i), t.preventDefault()
        });
        var t = localStorage.getItem("codeWidgetFramework");
        t && e(t), $("body").on("click", ".copy_container", function() {
            var e = $(this),
                t = e.next(".code_inner").children().text().trim(),
                n = $("<textarea>").addClass("hidden-input").val(t).appendTo("body").select(),
                i = e.find(".tooltiptext");
            document.execCommand("copy"), $(n).remove(), i.text("Copied")
        }), $("body").on("mouseleave", ".copy_container", function() {
            $(this).find(".tooltiptext").text("Copy to clipboard")
        })
    }),
    function(e) {
        "use strict";
        "function" == typeof define && define.amd ? define(["jquery"], e) : "undefined" != typeof exports ? module.exports = e(require("jquery")) : e(jQuery)
    }(function(e) {
        "use strict";
        var t = window.Slick || {};
        (t = function() {
            function t(t, i) {
                var o, r = this;
                r.defaults = {
                    accessibility: !0,
                    adaptiveHeight: !1,
                    appendArrows: e(t),
                    appendDots: e(t),
                    arrows: !0,
                    asNavFor: null,
                    prevArrow: '<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',
                    nextArrow: '<button class="slick-next" aria-label="Next" type="button">Next</button>',
                    autoplay: !1,
                    autoplaySpeed: 3e3,
                    centerMode: !1,
                    centerPadding: "50px",
                    cssEase: "ease",
                    customPaging: function(t, n) {
                        return e('<button type="button" />').text(n + 1)
                    },
                    dots: !1,
                    dotsClass: "slick-dots",
                    draggable: !0,
                    easing: "linear",
                    edgeFriction: .35,
                    fade: !1,
                    focusOnSelect: !1,
                    focusOnChange: !1,
                    infinite: !0,
                    initialSlide: 0,
                    lazyLoad: "ondemand",
                    mobileFirst: !1,
                    pauseOnHover: !0,
                    pauseOnFocus: !0,
                    pauseOnDotsHover: !1,
                    respondTo: "window",
                    responsive: null,
                    rows: 1,
                    rtl: !1,
                    slide: "",
                    slidesPerRow: 1,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    speed: 500,
                    swipe: !0,
                    swipeToSlide: !1,
                    touchMove: !0,
                    touchThreshold: 5,
                    useCSS: !0,
                    useTransform: !0,
                    variableWidth: !1,
                    vertical: !1,
                    verticalSwiping: !1,
                    waitForAnimate: !0,
                    zIndex: 1e3
                }, r.initials = {
                    animating: !1,
                    dragging: !1,
                    autoPlayTimer: null,
                    currentDirection: 0,
                    currentLeft: null,
                    currentSlide: 0,
                    direction: 1,
                    $dots: null,
                    listWidth: null,
                    listHeight: null,
                    loadIndex: 0,
                    $nextArrow: null,
                    $prevArrow: null,
                    scrolling: !1,
                    slideCount: null,
                    slideWidth: null,
                    $slideTrack: null,
                    $slides: null,
                    sliding: !1,
                    slideOffset: 0,
                    swipeLeft: null,
                    swiping: !1,
                    $list: null,
                    touchObject: {},
                    transformsEnabled: !1,
                    unslicked: !1
                }, e.extend(r, r.initials), r.activeBreakpoint = null, r.animType = null, r.animProp = null, r.breakpoints = [], r.breakpointSettings = [], r.cssTransitions = !1, r.focussed = !1, r.interrupted = !1, r.hidden = "hidden", r.paused = !0, r.positionProp = null, r.respondTo = null, r.rowCount = 1, r.shouldClick = !0, r.$slider = e(t), r.$slidesCache = null, r.transformType = null, r.transitionType = null, r.visibilityChange = "visibilitychange", r.windowWidth = 0, r.windowTimer = null, o = e(t).data("slick") || {}, r.options = e.extend({}, r.defaults, i, o), r.currentSlide = r.options.initialSlide, r.originalSettings = r.options, "undefined" != typeof document.mozHidden ? (r.hidden = "mozHidden", r.visibilityChange = "mozvisibilitychange") : "undefined" != typeof document.webkitHidden && (r.hidden = "webkitHidden", r.visibilityChange = "webkitvisibilitychange"), r.autoPlay = e.proxy(r.autoPlay, r), r.autoPlayClear = e.proxy(r.autoPlayClear, r), r.autoPlayIterator = e.proxy(r.autoPlayIterator, r), r.changeSlide = e.proxy(r.changeSlide, r), r.clickHandler = e.proxy(r.clickHandler, r), r.selectHandler = e.proxy(r.selectHandler, r), r.setPosition = e.proxy(r.setPosition, r), r.swipeHandler = e.proxy(r.swipeHandler, r), r.dragHandler = e.proxy(r.dragHandler, r), r.keyHandler = e.proxy(r.keyHandler, r), r.instanceUid = n++, r.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/, r.registerBreakpoints(), r.init(!0)
            }
            var n = 0;
            return t
        }()).prototype.activateADA = function() {
            this.$slideTrack.find(".slick-active").attr({
                "aria-hidden": "false"
            }).find("a, input, button, select").attr({
                tabindex: "0"
            })
        }, t.prototype.addSlide = t.prototype.slickAdd = function(t, n, i) {
            var o = this;
            if ("boolean" == typeof n) i = n, n = null;
            else if (n < 0 || n >= o.slideCount) return !1;
            o.unload(), "number" == typeof n ? 0 === n && 0 === o.$slides.length ? e(t).appendTo(o.$slideTrack) : i ? e(t).insertBefore(o.$slides.eq(n)) : e(t).insertAfter(o.$slides.eq(n)) : !0 === i ? e(t).prependTo(o.$slideTrack) : e(t).appendTo(o.$slideTrack), o.$slides = o.$slideTrack.children(this.options.slide), o.$slideTrack.children(this.options.slide).detach(), o.$slideTrack.append(o.$slides), o.$slides.each(function(t, n) {
                e(n).attr("data-slick-index", t)
            }), o.$slidesCache = o.$slides, o.reinit()
        }, t.prototype.animateHeight = function() {
            var e = this;
            if (1 === e.options.slidesToShow && !0 === e.options.adaptiveHeight && !1 === e.options.vertical) {
                var t = e.$slides.eq(e.currentSlide).outerHeight(!0);
                e.$list.animate({
                    height: t
                }, e.options.speed)
            }
        }, t.prototype.animateSlide = function(t, n) {
            var i = {},
                o = this;
            o.animateHeight(), !0 === o.options.rtl && !1 === o.options.vertical && (t = -t), !1 === o.transformsEnabled ? !1 === o.options.vertical ? o.$slideTrack.animate({
                left: t
            }, o.options.speed, o.options.easing, n) : o.$slideTrack.animate({
                top: t
            }, o.options.speed, o.options.easing, n) : !1 === o.cssTransitions ? (!0 === o.options.rtl && (o.currentLeft = -o.currentLeft), e({
                animStart: o.currentLeft
            }).animate({
                animStart: t
            }, {
                duration: o.options.speed,
                easing: o.options.easing,
                step: function(e) {
                    e = Math.ceil(e), !1 === o.options.vertical ? (i[o.animType] = "translate(" + e + "px, 0px)", o.$slideTrack.css(i)) : (i[o.animType] = "translate(0px," + e + "px)", o.$slideTrack.css(i))
                },
                complete: function() {
                    n && n.call()
                }
            })) : (o.applyTransition(), t = Math.ceil(t), !1 === o.options.vertical ? i[o.animType] = "translate3d(" + t + "px, 0px, 0px)" : i[o.animType] = "translate3d(0px," + t + "px, 0px)", o.$slideTrack.css(i), n && setTimeout(function() {
                o.disableTransition(), n.call()
            }, o.options.speed))
        }, t.prototype.getNavTarget = function() {
            var t = this,
                n = t.options.asNavFor;
            return n && null !== n && (n = e(n).not(t.$slider)), n
        }, t.prototype.asNavFor = function(t) {
            var n = this.getNavTarget();
            null !== n && "object" == typeof n && n.each(function() {
                var n = e(this).slick("getSlick");
                n.unslicked || n.slideHandler(t, !0)
            })
        }, t.prototype.applyTransition = function(e) {
            var t = this,
                n = {};
            !1 === t.options.fade ? n[t.transitionType] = t.transformType + " " + t.options.speed + "ms " + t.options.cssEase : n[t.transitionType] = "opacity " + t.options.speed + "ms " + t.options.cssEase, !1 === t.options.fade ? t.$slideTrack.css(n) : t.$slides.eq(e).css(n)
        }, t.prototype.autoPlay = function() {
            var e = this;
            e.autoPlayClear(), e.slideCount > e.options.slidesToShow && (e.autoPlayTimer = setInterval(e.autoPlayIterator, e.options.autoplaySpeed))
        }, t.prototype.autoPlayClear = function() {
            var e = this;
            e.autoPlayTimer && clearInterval(e.autoPlayTimer)
        }, t.prototype.autoPlayIterator = function() {
            var e = this,
                t = e.currentSlide + e.options.slidesToScroll;
            e.paused || e.interrupted || e.focussed || (!1 === e.options.infinite && (1 === e.direction && e.currentSlide + 1 === e.slideCount - 1 ? e.direction = 0 : 0 === e.direction && (t = e.currentSlide - e.options.slidesToScroll, e.currentSlide - 1 == 0 && (e.direction = 1))), e.slideHandler(t))
        }, t.prototype.buildArrows = function() {
            var t = this;
            !0 === t.options.arrows && (t.$prevArrow = e(t.options.prevArrow).addClass("slick-arrow"), t.$nextArrow = e(t.options.nextArrow).addClass("slick-arrow"), t.slideCount > t.options.slidesToShow ? (t.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), t.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), t.htmlExpr.test(t.options.prevArrow) && t.$prevArrow.prependTo(t.options.appendArrows), t.htmlExpr.test(t.options.nextArrow) && t.$nextArrow.appendTo(t.options.appendArrows), !0 !== t.options.infinite && t.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true")) : t.$prevArrow.add(t.$nextArrow).addClass("slick-hidden").attr({
                "aria-disabled": "true",
                tabindex: "-1"
            }))
        }, t.prototype.buildDots = function() {
            var t, n, i = this;
            if (!0 === i.options.dots && i.slideCount > i.options.slidesToShow) {
                for (i.$slider.addClass("slick-dotted"), n = e("<ul />").addClass(i.options.dotsClass), t = 0; t <= i.getDotCount(); t += 1) n.append(e("<li />").append(i.options.customPaging.call(this, i, t)));
                i.$dots = n.appendTo(i.options.appendDots), i.$dots.find("li").first().addClass("slick-active")
            }
        }, t.prototype.buildOut = function() {
            var t = this;
            t.$slides = t.$slider.children(t.options.slide + ":not(.slick-cloned)").addClass("slick-slide"), t.slideCount = t.$slides.length, t.$slides.each(function(t, n) {
                e(n).attr("data-slick-index", t).data("originalStyling", e(n).attr("style") || "")
            }), t.$slider.addClass("slick-slider"), t.$slideTrack = 0 === t.slideCount ? e('<div class="slick-track"/>').appendTo(t.$slider) : t.$slides.wrapAll('<div class="slick-track"/>').parent(), t.$list = t.$slideTrack.wrap('<div class="slick-list"/>').parent(), t.$slideTrack.css("opacity", 0), !0 !== t.options.centerMode && !0 !== t.options.swipeToSlide || (t.options.slidesToScroll = 1), e("img[data-lazy]", t.$slider).not("[src]").addClass("slick-loading"), t.setupInfinite(), t.buildArrows(), t.buildDots(), t.updateDots(), t.setSlideClasses("number" == typeof t.currentSlide ? t.currentSlide : 0), !0 === t.options.draggable && t.$list.addClass("draggable")
        }, t.prototype.buildRows = function() {
            var e, t, n, i, o, r, s, a = this;
            if (i = document.createDocumentFragment(), r = a.$slider.children(), a.options.rows > 0) {
                for (s = a.options.slidesPerRow * a.options.rows, o = Math.ceil(r.length / s), e = 0; e < o; e++) {
                    var l = document.createElement("div");
                    for (t = 0; t < a.options.rows; t++) {
                        var u = document.createElement("div");
                        for (n = 0; n < a.options.slidesPerRow; n++) {
                            var c = e * s + (t * a.options.slidesPerRow + n);
                            r.get(c) && u.appendChild(r.get(c))
                        }
                        l.appendChild(u)
                    }
                    i.appendChild(l)
                }
                a.$slider.empty().append(i), a.$slider.children().children().children().css({
                    width: 100 / a.options.slidesPerRow + "%",
                    display: "inline-block"
                })
            }
        }, t.prototype.checkResponsive = function(t, n) {
            var i, o, r, s = this,
                a = !1,
                l = s.$slider.width(),
                u = window.innerWidth || e(window).width();
            if ("window" === s.respondTo ? r = u : "slider" === s.respondTo ? r = l : "min" === s.respondTo && (r = Math.min(u, l)), s.options.responsive && s.options.responsive.length && null !== s.options.responsive) {
                for (i in o = null, s.breakpoints) s.breakpoints.hasOwnProperty(i) && (!1 === s.originalSettings.mobileFirst ? r < s.breakpoints[i] && (o = s.breakpoints[i]) : r > s.breakpoints[i] && (o = s.breakpoints[i]));
                null !== o ? null !== s.activeBreakpoint ? (o !== s.activeBreakpoint || n) && (s.activeBreakpoint = o, "unslick" === s.breakpointSettings[o] ? s.unslick(o) : (s.options = e.extend({}, s.originalSettings, s.breakpointSettings[o]), !0 === t && (s.currentSlide = s.options.initialSlide), s.refresh(t)), a = o) : (s.activeBreakpoint = o, "unslick" === s.breakpointSettings[o] ? s.unslick(o) : (s.options = e.extend({}, s.originalSettings, s.breakpointSettings[o]), !0 === t && (s.currentSlide = s.options.initialSlide), s.refresh(t)), a = o) : null !== s.activeBreakpoint && (s.activeBreakpoint = null, s.options = s.originalSettings, !0 === t && (s.currentSlide = s.options.initialSlide), s.refresh(t), a = o), t || !1 === a || s.$slider.trigger("breakpoint", [s, a])
            }
        }, t.prototype.changeSlide = function(t, n) {
            var i, o, r = this,
                s = e(t.currentTarget);
            switch (s.is("a") && t.preventDefault(), s.is("li") || (s = s.closest("li")), i = r.slideCount % r.options.slidesToScroll != 0 ? 0 : (r.slideCount - r.currentSlide) % r.options.slidesToScroll, t.data.message) {
                case "previous":
                    o = 0 === i ? r.options.slidesToScroll : r.options.slidesToShow - i, r.slideCount > r.options.slidesToShow && r.slideHandler(r.currentSlide - o, !1, n);
                    break;
                case "next":
                    o = 0 === i ? r.options.slidesToScroll : i, r.slideCount > r.options.slidesToShow && r.slideHandler(r.currentSlide + o, !1, n);
                    break;
                case "index":
                    var a = 0 === t.data.index ? 0 : t.data.index || s.index() * r.options.slidesToScroll;
                    r.slideHandler(r.checkNavigable(a), !1, n), s.children().trigger("focus");
                    break;
                default:
                    return
            }
        }, t.prototype.checkNavigable = function(e) {
            var t, n;
            if (n = 0, e > (t = this.getNavigableIndexes())[t.length - 1]) e = t[t.length - 1];
            else
                for (var i in t) {
                    if (e < t[i]) {
                        e = n;
                        break
                    }
                    n = t[i]
                }
            return e
        }, t.prototype.cleanUpEvents = function() {
            var t = this;
            t.options.dots && null !== t.$dots && (e("li", t.$dots).off("click.slick", t.changeSlide).off("mouseenter.slick", e.proxy(t.interrupt, t, !0)).off("mouseleave.slick", e.proxy(t.interrupt, t, !1)), !0 === t.options.accessibility && t.$dots.off("keydown.slick", t.keyHandler)), t.$slider.off("focus.slick blur.slick"), !0 === t.options.arrows && t.slideCount > t.options.slidesToShow && (t.$prevArrow && t.$prevArrow.off("click.slick", t.changeSlide), t.$nextArrow && t.$nextArrow.off("click.slick", t.changeSlide), !0 === t.options.accessibility && (t.$prevArrow && t.$prevArrow.off("keydown.slick", t.keyHandler), t.$nextArrow && t.$nextArrow.off("keydown.slick", t.keyHandler))), t.$list.off("touchstart.slick mousedown.slick", t.swipeHandler), t.$list.off("touchmove.slick mousemove.slick", t.swipeHandler), t.$list.off("touchend.slick mouseup.slick", t.swipeHandler), t.$list.off("touchcancel.slick mouseleave.slick", t.swipeHandler), t.$list.off("click.slick", t.clickHandler), e(document).off(t.visibilityChange, t.visibility), t.cleanUpSlideEvents(), !0 === t.options.accessibility && t.$list.off("keydown.slick", t.keyHandler), !0 === t.options.focusOnSelect && e(t.$slideTrack).children().off("click.slick", t.selectHandler), e(window).off("orientationchange.slick.slick-" + t.instanceUid, t.orientationChange), e(window).off("resize.slick.slick-" + t.instanceUid, t.resize), e("[draggable!=true]", t.$slideTrack).off("dragstart", t.preventDefault), e(window).off("load.slick.slick-" + t.instanceUid, t.setPosition)
        }, t.prototype.cleanUpSlideEvents = function() {
            var t = this;
            t.$list.off("mouseenter.slick", e.proxy(t.interrupt, t, !0)), t.$list.off("mouseleave.slick", e.proxy(t.interrupt, t, !1))
        }, t.prototype.cleanUpRows = function() {
            var e, t = this;
            t.options.rows > 0 && ((e = t.$slides.children().children()).removeAttr("style"), t.$slider.empty().append(e))
        }, t.prototype.clickHandler = function(e) {
            !1 === this.shouldClick && (e.stopImmediatePropagation(), e.stopPropagation(), e.preventDefault())
        }, t.prototype.destroy = function(t) {
            var n = this;
            n.autoPlayClear(), n.touchObject = {}, n.cleanUpEvents(), e(".slick-cloned", n.$slider).detach(), n.$dots && n.$dots.remove(), n.$prevArrow && n.$prevArrow.length && (n.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), n.htmlExpr.test(n.options.prevArrow) && n.$prevArrow.remove()), n.$nextArrow && n.$nextArrow.length && (n.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), n.htmlExpr.test(n.options.nextArrow) && n.$nextArrow.remove()), n.$slides && (n.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function() {
                e(this).attr("style", e(this).data("originalStyling"))
            }), n.$slideTrack.children(this.options.slide).detach(), n.$slideTrack.detach(), n.$list.detach(), n.$slider.append(n.$slides)), n.cleanUpRows(), n.$slider.removeClass("slick-slider"), n.$slider.removeClass("slick-initialized"), n.$slider.removeClass("slick-dotted"), n.unslicked = !0, t || n.$slider.trigger("destroy", [n])
        }, t.prototype.disableTransition = function(e) {
            var t = this,
                n = {};
            n[t.transitionType] = "", !1 === t.options.fade ? t.$slideTrack.css(n) : t.$slides.eq(e).css(n)
        }, t.prototype.fadeSlide = function(e, t) {
            var n = this;
            !1 === n.cssTransitions ? (n.$slides.eq(e).css({
                zIndex: n.options.zIndex
            }), n.$slides.eq(e).animate({
                opacity: 1
            }, n.options.speed, n.options.easing, t)) : (n.applyTransition(e), n.$slides.eq(e).css({
                opacity: 1,
                zIndex: n.options.zIndex
            }), t && setTimeout(function() {
                n.disableTransition(e), t.call()
            }, n.options.speed))
        }, t.prototype.fadeSlideOut = function(e) {
            var t = this;
            !1 === t.cssTransitions ? t.$slides.eq(e).animate({
                opacity: 0,
                zIndex: t.options.zIndex - 2
            }, t.options.speed, t.options.easing) : (t.applyTransition(e), t.$slides.eq(e).css({
                opacity: 0,
                zIndex: t.options.zIndex - 2
            }))
        }, t.prototype.filterSlides = t.prototype.slickFilter = function(e) {
            var t = this;
            null !== e && (t.$slidesCache = t.$slides, t.unload(), t.$slideTrack.children(this.options.slide).detach(), t.$slidesCache.filter(e).appendTo(t.$slideTrack), t.reinit())
        }, t.prototype.focusHandler = function() {
            var t = this;
            t.$slider.off("focus.slick blur.slick").on("focus.slick", "*", function() {
                var n = e(this);
                setTimeout(function() {
                    t.options.pauseOnFocus && n.is(":focus") && (t.focussed = !0, t.autoPlay())
                }, 0)
            }).on("blur.slick", "*", function() {
                e(this), t.options.pauseOnFocus && (t.focussed = !1, t.autoPlay())
            })
        }, t.prototype.getCurrent = t.prototype.slickCurrentSlide = function() {
            return this.currentSlide
        }, t.prototype.getDotCount = function() {
            var e = this,
                t = 0,
                n = 0,
                i = 0;
            if (!0 === e.options.infinite)
                if (e.slideCount <= e.options.slidesToShow) ++i;
                else
                    for (; t < e.slideCount;) ++i, t = n + e.options.slidesToScroll, n += e.options.slidesToScroll <= e.options.slidesToShow ? e.options.slidesToScroll : e.options.slidesToShow;
            else if (!0 === e.options.centerMode) i = e.slideCount;
            else if (e.options.asNavFor)
                for (; t < e.slideCount;) ++i, t = n + e.options.slidesToScroll, n += e.options.slidesToScroll <= e.options.slidesToShow ? e.options.slidesToScroll : e.options.slidesToShow;
            else i = 1 + Math.ceil((e.slideCount - e.options.slidesToShow) / e.options.slidesToScroll);
            return i - 1
        }, t.prototype.getLeft = function(e) {
            var t, n, i, o, r = this,
                s = 0;
            return r.slideOffset = 0, n = r.$slides.first().outerHeight(!0), !0 === r.options.infinite ? (r.slideCount > r.options.slidesToShow && (r.slideOffset = r.slideWidth * r.options.slidesToShow * -1, o = -1, !0 === r.options.vertical && !0 === r.options.centerMode && (2 === r.options.slidesToShow ? o = -1.5 : 1 === r.options.slidesToShow && (o = -2)), s = n * r.options.slidesToShow * o), r.slideCount % r.options.slidesToScroll != 0 && e + r.options.slidesToScroll > r.slideCount && r.slideCount > r.options.slidesToShow && (e > r.slideCount ? (r.slideOffset = (r.options.slidesToShow - (e - r.slideCount)) * r.slideWidth * -1, s = (r.options.slidesToShow - (e - r.slideCount)) * n * -1) : (r.slideOffset = r.slideCount % r.options.slidesToScroll * r.slideWidth * -1, s = r.slideCount % r.options.slidesToScroll * n * -1))) : e + r.options.slidesToShow > r.slideCount && (r.slideOffset = (e + r.options.slidesToShow - r.slideCount) * r.slideWidth, s = (e + r.options.slidesToShow - r.slideCount) * n), r.slideCount <= r.options.slidesToShow && (r.slideOffset = 0, s = 0), !0 === r.options.centerMode && r.slideCount <= r.options.slidesToShow ? r.slideOffset = r.slideWidth * Math.floor(r.options.slidesToShow) / 2 - r.slideWidth * r.slideCount / 2 : !0 === r.options.centerMode && !0 === r.options.infinite ? r.slideOffset += r.slideWidth * Math.floor(r.options.slidesToShow / 2) - r.slideWidth : !0 === r.options.centerMode && (r.slideOffset = 0, r.slideOffset += r.slideWidth * Math.floor(r.options.slidesToShow / 2)), t = !1 === r.options.vertical ? e * r.slideWidth * -1 + r.slideOffset : e * n * -1 + s, !0 === r.options.variableWidth && (i = r.slideCount <= r.options.slidesToShow || !1 === r.options.infinite ? r.$slideTrack.children(".slick-slide").eq(e) : r.$slideTrack.children(".slick-slide").eq(e + r.options.slidesToShow), t = !0 === r.options.rtl ? i[0] ? -1 * (r.$slideTrack.width() - i[0].offsetLeft - i.width()) : 0 : i[0] ? -1 * i[0].offsetLeft : 0, !0 === r.options.centerMode && (i = r.slideCount <= r.options.slidesToShow || !1 === r.options.infinite ? r.$slideTrack.children(".slick-slide").eq(e) : r.$slideTrack.children(".slick-slide").eq(e + r.options.slidesToShow + 1), t = !0 === r.options.rtl ? i[0] ? -1 * (r.$slideTrack.width() - i[0].offsetLeft - i.width()) : 0 : i[0] ? -1 * i[0].offsetLeft : 0, t += (r.$list.width() - i.outerWidth()) / 2)), t
        }, t.prototype.getOption = t.prototype.slickGetOption = function(e) {
            return this.options[e]
        }, t.prototype.getNavigableIndexes = function() {
            var e, t = this,
                n = 0,
                i = 0,
                o = [];
            for (!1 === t.options.infinite ? e = t.slideCount : (n = -1 * t.options.slidesToScroll, i = -1 * t.options.slidesToScroll, e = 2 * t.slideCount); n < e;) o.push(n), n = i + t.options.slidesToScroll, i += t.options.slidesToScroll <= t.options.slidesToShow ? t.options.slidesToScroll : t.options.slidesToShow;
            return o
        }, t.prototype.getSlick = function() {
            return this
        }, t.prototype.getSlideCount = function() {
            var t, n, i, o = this;
            return i = !0 === o.options.centerMode ? Math.floor(o.$list.width() / 2) : 0, n = -1 * o.swipeLeft + i, !0 === o.options.swipeToSlide ? (o.$slideTrack.find(".slick-slide").each(function(i, r) {
                var s, a;
                if (s = e(r).outerWidth(), a = r.offsetLeft, !0 !== o.options.centerMode && (a += s / 2), n < a + s) return t = r, !1
            }), Math.abs(e(t).attr("data-slick-index") - o.currentSlide) || 1) : o.options.slidesToScroll
        }, t.prototype.goTo = t.prototype.slickGoTo = function(e, t) {
            this.changeSlide({
                data: {
                    message: "index",
                    index: parseInt(e)
                }
            }, t)
        }, t.prototype.init = function(t) {
            var n = this;
            e(n.$slider).hasClass("slick-initialized") || (e(n.$slider).addClass("slick-initialized"), n.buildRows(), n.buildOut(), n.setProps(), n.startLoad(), n.loadSlider(), n.initializeEvents(), n.updateArrows(), n.updateDots(), n.checkResponsive(!0), n.focusHandler()), t && n.$slider.trigger("init", [n]), !0 === n.options.accessibility && n.initADA(), n.options.autoplay && (n.paused = !1, n.autoPlay())
        }, t.prototype.initADA = function() {
            var t = this,
                n = Math.ceil(t.slideCount / t.options.slidesToShow),
                i = t.getNavigableIndexes().filter(function(e) {
                    return e >= 0 && e < t.slideCount
                });
            t.$slides.add(t.$slideTrack.find(".slick-cloned")).attr({
                "aria-hidden": "true",
                tabindex: "-1"
            }).find("a, input, button, select").attr({
                tabindex: "-1"
            }), null !== t.$dots && (t.$slides.not(t.$slideTrack.find(".slick-cloned")).each(function(n) {
                var o = i.indexOf(n);
                if (e(this).attr({
                        role: "tabpanel",
                        id: "slick-slide" + t.instanceUid + n,
                        tabindex: -1
                    }), -1 !== o) {
                    var r = "slick-slide-control" + t.instanceUid + o;
                    e("#" + r).length && e(this).attr({
                        "aria-describedby": r
                    })
                }
            }), t.$dots.attr("role", "tablist").find("li").each(function(o) {
                var r = i[o];
                e(this).attr({
                    role: "presentation"
                }), e(this).find("button").first().attr({
                    role: "tab",
                    id: "slick-slide-control" + t.instanceUid + o,
                    "aria-controls": "slick-slide" + t.instanceUid + r,
                    "aria-label": o + 1 + " of " + n,
                    "aria-selected": null,
                    tabindex: "-1"
                })
            }).eq(t.currentSlide).find("button").attr({
                "aria-selected": "true",
                tabindex: "0"
            }).end());
            for (var o = t.currentSlide, r = o + t.options.slidesToShow; o < r; o++) t.options.focusOnChange ? t.$slides.eq(o).attr({
                tabindex: "0"
            }) : t.$slides.eq(o).removeAttr("tabindex");
            t.activateADA()
        }, t.prototype.initArrowEvents = function() {
            var e = this;
            !0 === e.options.arrows && e.slideCount > e.options.slidesToShow && (e.$prevArrow.off("click.slick").on("click.slick", {
                message: "previous"
            }, e.changeSlide), e.$nextArrow.off("click.slick").on("click.slick", {
                message: "next"
            }, e.changeSlide), !0 === e.options.accessibility && (e.$prevArrow.on("keydown.slick", e.keyHandler), e.$nextArrow.on("keydown.slick", e.keyHandler)))
        }, t.prototype.initDotEvents = function() {
            var t = this;
            !0 === t.options.dots && t.slideCount > t.options.slidesToShow && (e("li", t.$dots).on("click.slick", {
                message: "index"
            }, t.changeSlide), !0 === t.options.accessibility && t.$dots.on("keydown.slick", t.keyHandler)), !0 === t.options.dots && !0 === t.options.pauseOnDotsHover && t.slideCount > t.options.slidesToShow && e("li", t.$dots).on("mouseenter.slick", e.proxy(t.interrupt, t, !0)).on("mouseleave.slick", e.proxy(t.interrupt, t, !1))
        }, t.prototype.initSlideEvents = function() {
            var t = this;
            t.options.pauseOnHover && (t.$list.on("mouseenter.slick", e.proxy(t.interrupt, t, !0)), t.$list.on("mouseleave.slick", e.proxy(t.interrupt, t, !1)))
        }, t.prototype.initializeEvents = function() {
            var t = this;
            t.initArrowEvents(), t.initDotEvents(), t.initSlideEvents(), t.$list.on("touchstart.slick mousedown.slick", {
                action: "start"
            }, t.swipeHandler), t.$list.on("touchmove.slick mousemove.slick", {
                action: "move"
            }, t.swipeHandler), t.$list.on("touchend.slick mouseup.slick", {
                action: "end"
            }, t.swipeHandler), t.$list.on("touchcancel.slick mouseleave.slick", {
                action: "end"
            }, t.swipeHandler), t.$list.on("click.slick", t.clickHandler), e(document).on(t.visibilityChange, e.proxy(t.visibility, t)), !0 === t.options.accessibility && t.$list.on("keydown.slick", t.keyHandler), !0 === t.options.focusOnSelect && e(t.$slideTrack).children().on("click.slick", t.selectHandler), e(window).on("orientationchange.slick.slick-" + t.instanceUid, e.proxy(t.orientationChange, t)), e(window).on("resize.slick.slick-" + t.instanceUid, e.proxy(t.resize, t)), e("[draggable!=true]", t.$slideTrack).on("dragstart", t.preventDefault), e(window).on("load.slick.slick-" + t.instanceUid, t.setPosition), e(t.setPosition)
        }, t.prototype.initUI = function() {
            var e = this;
            !0 === e.options.arrows && e.slideCount > e.options.slidesToShow && (e.$prevArrow.show(), e.$nextArrow.show()), !0 === e.options.dots && e.slideCount > e.options.slidesToShow && e.$dots.show()
        }, t.prototype.keyHandler = function(e) {
            var t = this;
            e.target.tagName.match("TEXTAREA|INPUT|SELECT") || (37 === e.keyCode && !0 === t.options.accessibility ? t.changeSlide({
                data: {
                    message: !0 === t.options.rtl ? "next" : "previous"
                }
            }) : 39 === e.keyCode && !0 === t.options.accessibility && t.changeSlide({
                data: {
                    message: !0 === t.options.rtl ? "previous" : "next"
                }
            }))
        }, t.prototype.lazyLoad = function() {
            function t(t) {
                e("img[data-lazy]", t).each(function() {
                    var t = e(this),
                        n = e(this).attr("data-lazy"),
                        i = e(this).attr("data-srcset"),
                        o = e(this).attr("data-sizes") || r.$slider.attr("data-sizes"),
                        s = document.createElement("img");
                    s.onload = function() {
                        t.animate({
                            opacity: 0
                        }, 100, function() {
                            i && (t.attr("srcset", i), o && t.attr("sizes", o)), t.attr("src", n).animate({
                                opacity: 1
                            }, 200, function() {
                                t.removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading")
                            }), r.$slider.trigger("lazyLoaded", [r, t, n])
                        })
                    }, s.onerror = function() {
                        t.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), r.$slider.trigger("lazyLoadError", [r, t, n])
                    }, s.src = n
                })
            }
            var n, i, o, r = this;
            if (!0 === r.options.centerMode ? !0 === r.options.infinite ? o = (i = r.currentSlide + (r.options.slidesToShow / 2 + 1)) + r.options.slidesToShow + 2 : (i = Math.max(0, r.currentSlide - (r.options.slidesToShow / 2 + 1)), o = r.options.slidesToShow / 2 + 1 + 2 + r.currentSlide) : (i = r.options.infinite ? r.options.slidesToShow + r.currentSlide : r.currentSlide, o = Math.ceil(i + r.options.slidesToShow), !0 === r.options.fade && (i > 0 && i--, o <= r.slideCount && o++)), n = r.$slider.find(".slick-slide").slice(i, o), "anticipated" === r.options.lazyLoad)
                for (var s = i - 1, a = o, l = r.$slider.find(".slick-slide"), u = 0; u < r.options.slidesToScroll; u++) s < 0 && (s = r.slideCount - 1), n = (n = n.add(l.eq(s))).add(l.eq(a)), s--, a++;
            t(n), r.slideCount <= r.options.slidesToShow ? t(r.$slider.find(".slick-slide")) : r.currentSlide >= r.slideCount - r.options.slidesToShow ? t(r.$slider.find(".slick-cloned").slice(0, r.options.slidesToShow)) : 0 === r.currentSlide && t(r.$slider.find(".slick-cloned").slice(-1 * r.options.slidesToShow))
        }, t.prototype.loadSlider = function() {
            var e = this;
            e.setPosition(), e.$slideTrack.css({
                opacity: 1
            }), e.$slider.removeClass("slick-loading"), e.initUI(), "progressive" === e.options.lazyLoad && e.progressiveLazyLoad()
        }, t.prototype.next = t.prototype.slickNext = function() {
            this.changeSlide({
                data: {
                    message: "next"
                }
            })
        }, t.prototype.orientationChange = function() {
            var e = this;
            e.checkResponsive(), e.setPosition()
        }, t.prototype.pause = t.prototype.slickPause = function() {
            var e = this;
            e.autoPlayClear(), e.paused = !0
        }, t.prototype.play = t.prototype.slickPlay = function() {
            var e = this;
            e.autoPlay(), e.options.autoplay = !0, e.paused = !1, e.focussed = !1, e.interrupted = !1
        }, t.prototype.postSlide = function(t) {
            var n = this;
            !n.unslicked && (n.$slider.trigger("afterChange", [n, t]), n.animating = !1, n.slideCount > n.options.slidesToShow && n.setPosition(), n.swipeLeft = null, n.options.autoplay && n.autoPlay(), !0 === n.options.accessibility && (n.initADA(), n.options.focusOnChange)) && e(n.$slides.get(n.currentSlide)).attr("tabindex", 0).focus()
        }, t.prototype.prev = t.prototype.slickPrev = function() {
            this.changeSlide({
                data: {
                    message: "previous"
                }
            })
        }, t.prototype.preventDefault = function(e) {
            e.preventDefault()
        }, t.prototype.progressiveLazyLoad = function(t) {
            t = t || 1;
            var n, i, o, r, s, a = this,
                l = e("img[data-lazy]", a.$slider);
            l.length ? (n = l.first(), i = n.attr("data-lazy"), o = n.attr("data-srcset"), r = n.attr("data-sizes") || a.$slider.attr("data-sizes"), (s = document.createElement("img")).onload = function() {
                o && (n.attr("srcset", o), r && n.attr("sizes", r)), n.attr("src", i).removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading"), !0 === a.options.adaptiveHeight && a.setPosition(), a.$slider.trigger("lazyLoaded", [a, n, i]), a.progressiveLazyLoad()
            }, s.onerror = function() {
                t < 3 ? setTimeout(function() {
                    a.progressiveLazyLoad(t + 1)
                }, 500) : (n.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), a.$slider.trigger("lazyLoadError", [a, n, i]), a.progressiveLazyLoad())
            }, s.src = i) : a.$slider.trigger("allImagesLoaded", [a])
        }, t.prototype.refresh = function(t) {
            var n, i, o = this;
            i = o.slideCount - o.options.slidesToShow, !o.options.infinite && o.currentSlide > i && (o.currentSlide = i), o.slideCount <= o.options.slidesToShow && (o.currentSlide = 0), n = o.currentSlide, o.destroy(!0), e.extend(o, o.initials, {
                currentSlide: n
            }), o.init(), t || o.changeSlide({
                data: {
                    message: "index",
                    index: n
                }
            }, !1)
        }, t.prototype.registerBreakpoints = function() {
            var t, n, i, o = this,
                r = o.options.responsive || null;
            if ("array" === e.type(r) && r.length) {
                for (t in o.respondTo = o.options.respondTo || "window", r)
                    if (i = o.breakpoints.length - 1, r.hasOwnProperty(t)) {
                        for (n = r[t].breakpoint; i >= 0;) o.breakpoints[i] && o.breakpoints[i] === n && o.breakpoints.splice(i, 1), i--;
                        o.breakpoints.push(n), o.breakpointSettings[n] = r[t].settings
                    } o.breakpoints.sort(function(e, t) {
                    return o.options.mobileFirst ? e - t : t - e
                })
            }
        }, t.prototype.reinit = function() {
            var t = this;
            t.$slides = t.$slideTrack.children(t.options.slide).addClass("slick-slide"), t.slideCount = t.$slides.length, t.currentSlide >= t.slideCount && 0 !== t.currentSlide && (t.currentSlide = t.currentSlide - t.options.slidesToScroll), t.slideCount <= t.options.slidesToShow && (t.currentSlide = 0), t.registerBreakpoints(), t.setProps(), t.setupInfinite(), t.buildArrows(), t.updateArrows(), t.initArrowEvents(), t.buildDots(), t.updateDots(), t.initDotEvents(), t.cleanUpSlideEvents(), t.initSlideEvents(), t.checkResponsive(!1, !0), !0 === t.options.focusOnSelect && e(t.$slideTrack).children().on("click.slick", t.selectHandler), t.setSlideClasses("number" == typeof t.currentSlide ? t.currentSlide : 0), t.setPosition(), t.focusHandler(),
                t.paused = !t.options.autoplay, t.autoPlay(), t.$slider.trigger("reInit", [t])
        }, t.prototype.resize = function() {
            var t = this;
            e(window).width() !== t.windowWidth && (clearTimeout(t.windowDelay), t.windowDelay = window.setTimeout(function() {
                t.windowWidth = e(window).width(), t.checkResponsive(), t.unslicked || t.setPosition()
            }, 50))
        }, t.prototype.removeSlide = t.prototype.slickRemove = function(e, t, n) {
            var i = this;
            return "boolean" == typeof e ? e = !0 === (t = e) ? 0 : i.slideCount - 1 : e = !0 === t ? --e : e, !(i.slideCount < 1 || e < 0 || e > i.slideCount - 1) && (i.unload(), !0 === n ? i.$slideTrack.children().remove() : i.$slideTrack.children(this.options.slide).eq(e).remove(), i.$slides = i.$slideTrack.children(this.options.slide), i.$slideTrack.children(this.options.slide).detach(), i.$slideTrack.append(i.$slides), i.$slidesCache = i.$slides, void i.reinit())
        }, t.prototype.setCSS = function(e) {
            var t, n, i = this,
                o = {};
            !0 === i.options.rtl && (e = -e), t = "left" == i.positionProp ? Math.ceil(e) + "px" : "0px", n = "top" == i.positionProp ? Math.ceil(e) + "px" : "0px", o[i.positionProp] = e, !1 === i.transformsEnabled ? i.$slideTrack.css(o) : (o = {}, !1 === i.cssTransitions ? (o[i.animType] = "translate(" + t + ", " + n + ")", i.$slideTrack.css(o)) : (o[i.animType] = "translate3d(" + t + ", " + n + ", 0px)", i.$slideTrack.css(o)))
        }, t.prototype.setDimensions = function() {
            var e = this;
            !1 === e.options.vertical ? !0 === e.options.centerMode && e.$list.css({
                padding: "0px " + e.options.centerPadding
            }) : (e.$list.height(e.$slides.first().outerHeight(!0) * e.options.slidesToShow), !0 === e.options.centerMode && e.$list.css({
                padding: e.options.centerPadding + " 0px"
            })), e.listWidth = e.$list.width(), e.listHeight = e.$list.height(), !1 === e.options.vertical && !1 === e.options.variableWidth ? (e.slideWidth = Math.ceil(e.listWidth / e.options.slidesToShow), e.$slideTrack.width(Math.ceil(e.slideWidth * e.$slideTrack.children(".slick-slide").length))) : !0 === e.options.variableWidth ? e.$slideTrack.width(5e3 * e.slideCount) : (e.slideWidth = Math.ceil(e.listWidth), e.$slideTrack.height(Math.ceil(e.$slides.first().outerHeight(!0) * e.$slideTrack.children(".slick-slide").length)));
            var t = e.$slides.first().outerWidth(!0) - e.$slides.first().width();
            !1 === e.options.variableWidth && e.$slideTrack.children(".slick-slide").width(e.slideWidth - t)
        }, t.prototype.setFade = function() {
            var t, n = this;
            n.$slides.each(function(i, o) {
                t = n.slideWidth * i * -1, !0 === n.options.rtl ? e(o).css({
                    position: "relative",
                    right: t,
                    top: 0,
                    zIndex: n.options.zIndex - 2,
                    opacity: 0
                }) : e(o).css({
                    position: "relative",
                    left: t,
                    top: 0,
                    zIndex: n.options.zIndex - 2,
                    opacity: 0
                })
            }), n.$slides.eq(n.currentSlide).css({
                zIndex: n.options.zIndex - 1,
                opacity: 1
            })
        }, t.prototype.setHeight = function() {
            var e = this;
            if (1 === e.options.slidesToShow && !0 === e.options.adaptiveHeight && !1 === e.options.vertical) {
                var t = e.$slides.eq(e.currentSlide).outerHeight(!0);
                e.$list.css("height", t)
            }
        }, t.prototype.setOption = t.prototype.slickSetOption = function() {
            var t, n, i, o, r, s = this,
                a = !1;
            if ("object" === e.type(arguments[0]) ? (i = arguments[0], a = arguments[1], r = "multiple") : "string" === e.type(arguments[0]) && (i = arguments[0], o = arguments[1], a = arguments[2], "responsive" === arguments[0] && "array" === e.type(arguments[1]) ? r = "responsive" : "undefined" != typeof arguments[1] && (r = "single")), "single" === r) s.options[i] = o;
            else if ("multiple" === r) e.each(i, function(e, t) {
                s.options[e] = t
            });
            else if ("responsive" === r)
                for (n in o)
                    if ("array" !== e.type(s.options.responsive)) s.options.responsive = [o[n]];
                    else {
                        for (t = s.options.responsive.length - 1; t >= 0;) s.options.responsive[t].breakpoint === o[n].breakpoint && s.options.responsive.splice(t, 1), t--;
                        s.options.responsive.push(o[n])
                    } a && (s.unload(), s.reinit())
        }, t.prototype.setPosition = function() {
            var e = this;
            e.setDimensions(), e.setHeight(), !1 === e.options.fade ? e.setCSS(e.getLeft(e.currentSlide)) : e.setFade(), e.$slider.trigger("setPosition", [e])
        }, t.prototype.setProps = function() {
            var e = this,
                t = document.body.style;
            e.positionProp = !0 === e.options.vertical ? "top" : "left", "top" === e.positionProp ? e.$slider.addClass("slick-vertical") : e.$slider.removeClass("slick-vertical"), void 0 === t.WebkitTransition && void 0 === t.MozTransition && void 0 === t.msTransition || !0 === e.options.useCSS && (e.cssTransitions = !0), e.options.fade && ("number" == typeof e.options.zIndex ? e.options.zIndex < 3 && (e.options.zIndex = 3) : e.options.zIndex = e.defaults.zIndex), void 0 !== t.OTransform && (e.animType = "OTransform", e.transformType = "-o-transform", e.transitionType = "OTransition", void 0 === t.perspectiveProperty && void 0 === t.webkitPerspective && (e.animType = !1)), void 0 !== t.MozTransform && (e.animType = "MozTransform", e.transformType = "-moz-transform", e.transitionType = "MozTransition", void 0 === t.perspectiveProperty && void 0 === t.MozPerspective && (e.animType = !1)), void 0 !== t.webkitTransform && (e.animType = "webkitTransform", e.transformType = "-webkit-transform", e.transitionType = "webkitTransition", void 0 === t.perspectiveProperty && void 0 === t.webkitPerspective && (e.animType = !1)), void 0 !== t.msTransform && (e.animType = "msTransform", e.transformType = "-ms-transform", e.transitionType = "msTransition", void 0 === t.msTransform && (e.animType = !1)), void 0 !== t.transform && !1 !== e.animType && (e.animType = "transform", e.transformType = "transform", e.transitionType = "transition"), e.transformsEnabled = e.options.useTransform && null !== e.animType && !1 !== e.animType
        }, t.prototype.setSlideClasses = function(e) {
            var t, n, i, o, r = this;
            if (n = r.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden", "true"), r.$slides.eq(e).addClass("slick-current"), !0 === r.options.centerMode) {
                var s = r.options.slidesToShow % 2 == 0 ? 1 : 0;
                t = Math.floor(r.options.slidesToShow / 2), !0 === r.options.infinite && (e >= t && e <= r.slideCount - 1 - t ? r.$slides.slice(e - t + s, e + t + 1).addClass("slick-active").attr("aria-hidden", "false") : (i = r.options.slidesToShow + e, n.slice(i - t + 1 + s, i + t + 2).addClass("slick-active").attr("aria-hidden", "false")), 0 === e ? n.eq(n.length - 1 - r.options.slidesToShow).addClass("slick-center") : e === r.slideCount - 1 && n.eq(r.options.slidesToShow).addClass("slick-center")), r.$slides.eq(e).addClass("slick-center")
            } else e >= 0 && e <= r.slideCount - r.options.slidesToShow ? r.$slides.slice(e, e + r.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false") : n.length <= r.options.slidesToShow ? n.addClass("slick-active").attr("aria-hidden", "false") : (o = r.slideCount % r.options.slidesToShow, i = !0 === r.options.infinite ? r.options.slidesToShow + e : e, r.options.slidesToShow == r.options.slidesToScroll && r.slideCount - e < r.options.slidesToShow ? n.slice(i - (r.options.slidesToShow - o), i + o).addClass("slick-active").attr("aria-hidden", "false") : n.slice(i, i + r.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false"));
            "ondemand" !== r.options.lazyLoad && "anticipated" !== r.options.lazyLoad || r.lazyLoad()
        }, t.prototype.setupInfinite = function() {
            var t, n, i, o = this;
            if (!0 === o.options.fade && (o.options.centerMode = !1), !0 === o.options.infinite && !1 === o.options.fade && (n = null, o.slideCount > o.options.slidesToShow)) {
                for (i = !0 === o.options.centerMode ? o.options.slidesToShow + 1 : o.options.slidesToShow, t = o.slideCount; t > o.slideCount - i; t -= 1) n = t - 1, e(o.$slides[n]).clone(!0).attr("id", "").attr("data-slick-index", n - o.slideCount).prependTo(o.$slideTrack).addClass("slick-cloned");
                for (t = 0; t < i + o.slideCount; t += 1) n = t, e(o.$slides[n]).clone(!0).attr("id", "").attr("data-slick-index", n + o.slideCount).appendTo(o.$slideTrack).addClass("slick-cloned");
                o.$slideTrack.find(".slick-cloned").find("[id]").each(function() {
                    e(this).attr("id", "")
                })
            }
        }, t.prototype.interrupt = function(e) {
            var t = this;
            e || t.autoPlay(), t.interrupted = e
        }, t.prototype.selectHandler = function(t) {
            var n = this,
                i = e(t.target).is(".slick-slide") ? e(t.target) : e(t.target).parents(".slick-slide"),
                o = parseInt(i.attr("data-slick-index"));
            return o || (o = 0), n.slideCount <= n.options.slidesToShow ? void n.slideHandler(o, !1, !0) : void n.slideHandler(o)
        }, t.prototype.slideHandler = function(e, t, n) {
            var i, o, r, s, a, l = null,
                u = this;
            if (t = t || !1, !(!0 === u.animating && !0 === u.options.waitForAnimate || !0 === u.options.fade && u.currentSlide === e)) return !1 === t && u.asNavFor(e), i = e, l = u.getLeft(i), s = u.getLeft(u.currentSlide), u.currentLeft = null === u.swipeLeft ? s : u.swipeLeft, !1 === u.options.infinite && !1 === u.options.centerMode && (e < 0 || e > u.getDotCount() * u.options.slidesToScroll) ? void(!1 === u.options.fade && (i = u.currentSlide, !0 !== n && u.slideCount > u.options.slidesToShow ? u.animateSlide(s, function() {
                u.postSlide(i)
            }) : u.postSlide(i))) : !1 === u.options.infinite && !0 === u.options.centerMode && (e < 0 || e > u.slideCount - u.options.slidesToScroll) ? void(!1 === u.options.fade && (i = u.currentSlide, !0 !== n && u.slideCount > u.options.slidesToShow ? u.animateSlide(s, function() {
                u.postSlide(i)
            }) : u.postSlide(i))) : (u.options.autoplay && clearInterval(u.autoPlayTimer), o = i < 0 ? u.slideCount % u.options.slidesToScroll != 0 ? u.slideCount - u.slideCount % u.options.slidesToScroll : u.slideCount + i : i >= u.slideCount ? u.slideCount % u.options.slidesToScroll != 0 ? 0 : i - u.slideCount : i, u.animating = !0, u.$slider.trigger("beforeChange", [u, u.currentSlide, o]), r = u.currentSlide, u.currentSlide = o, u.setSlideClasses(u.currentSlide), u.options.asNavFor && ((a = (a = u.getNavTarget()).slick("getSlick")).slideCount <= a.options.slidesToShow && a.setSlideClasses(u.currentSlide)), u.updateDots(), u.updateArrows(), !0 === u.options.fade ? (!0 !== n ? (u.fadeSlideOut(r), u.fadeSlide(o, function() {
                u.postSlide(o)
            })) : u.postSlide(o), void u.animateHeight()) : void(!0 !== n && u.slideCount > u.options.slidesToShow ? u.animateSlide(l, function() {
                u.postSlide(o)
            }) : u.postSlide(o)))
        }, t.prototype.startLoad = function() {
            var e = this;
            !0 === e.options.arrows && e.slideCount > e.options.slidesToShow && (e.$prevArrow.hide(), e.$nextArrow.hide()), !0 === e.options.dots && e.slideCount > e.options.slidesToShow && e.$dots.hide(), e.$slider.addClass("slick-loading")
        }, t.prototype.swipeDirection = function() {
            var e, t, n, i, o = this;
            return e = o.touchObject.startX - o.touchObject.curX, t = o.touchObject.startY - o.touchObject.curY, n = Math.atan2(t, e), (i = Math.round(180 * n / Math.PI)) < 0 && (i = 360 - Math.abs(i)), i <= 45 && i >= 0 ? !1 === o.options.rtl ? "left" : "right" : i <= 360 && i >= 315 ? !1 === o.options.rtl ? "left" : "right" : i >= 135 && i <= 225 ? !1 === o.options.rtl ? "right" : "left" : !0 === o.options.verticalSwiping ? i >= 35 && i <= 135 ? "down" : "up" : "vertical"
        }, t.prototype.swipeEnd = function() {
            var e, t, n = this;
            if (n.dragging = !1, n.swiping = !1, n.scrolling) return n.scrolling = !1, !1;
            if (n.interrupted = !1, n.shouldClick = !(n.touchObject.swipeLength > 10), void 0 === n.touchObject.curX) return !1;
            if (!0 === n.touchObject.edgeHit && n.$slider.trigger("edge", [n, n.swipeDirection()]), n.touchObject.swipeLength >= n.touchObject.minSwipe) {
                switch (t = n.swipeDirection()) {
                    case "left":
                    case "down":
                        e = n.options.swipeToSlide ? n.checkNavigable(n.currentSlide + n.getSlideCount()) : n.currentSlide + n.getSlideCount(), n.currentDirection = 0;
                        break;
                    case "right":
                    case "up":
                        e = n.options.swipeToSlide ? n.checkNavigable(n.currentSlide - n.getSlideCount()) : n.currentSlide - n.getSlideCount(), n.currentDirection = 1
                }
                "vertical" != t && (n.slideHandler(e), n.touchObject = {}, n.$slider.trigger("swipe", [n, t]))
            } else n.touchObject.startX !== n.touchObject.curX && (n.slideHandler(n.currentSlide), n.touchObject = {})
        }, t.prototype.swipeHandler = function(e) {
            var t = this;
            if (!(!1 === t.options.swipe || "ontouchend" in document && !1 === t.options.swipe || !1 === t.options.draggable && -1 !== e.type.indexOf("mouse"))) switch (t.touchObject.fingerCount = e.originalEvent && void 0 !== e.originalEvent.touches ? e.originalEvent.touches.length : 1, t.touchObject.minSwipe = t.listWidth / t.options.touchThreshold, !0 === t.options.verticalSwiping && (t.touchObject.minSwipe = t.listHeight / t.options.touchThreshold), e.data.action) {
                case "start":
                    t.swipeStart(e);
                    break;
                case "move":
                    t.swipeMove(e);
                    break;
                case "end":
                    t.swipeEnd(e)
            }
        }, t.prototype.swipeMove = function(e) {
            var t, n, i, o, r, s, a = this;
            return r = void 0 !== e.originalEvent ? e.originalEvent.touches : null, !(!a.dragging || a.scrolling || r && 1 !== r.length) && (t = a.getLeft(a.currentSlide), a.touchObject.curX = void 0 !== r ? r[0].pageX : e.clientX, a.touchObject.curY = void 0 !== r ? r[0].pageY : e.clientY, a.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(a.touchObject.curX - a.touchObject.startX, 2))), s = Math.round(Math.sqrt(Math.pow(a.touchObject.curY - a.touchObject.startY, 2))), !a.options.verticalSwiping && !a.swiping && s > 4 ? (a.scrolling = !0, !1) : (!0 === a.options.verticalSwiping && (a.touchObject.swipeLength = s), n = a.swipeDirection(), void 0 !== e.originalEvent && a.touchObject.swipeLength > 4 && (a.swiping = !0, e.preventDefault()), o = (!1 === a.options.rtl ? 1 : -1) * (a.touchObject.curX > a.touchObject.startX ? 1 : -1), !0 === a.options.verticalSwiping && (o = a.touchObject.curY > a.touchObject.startY ? 1 : -1), i = a.touchObject.swipeLength, a.touchObject.edgeHit = !1, !1 === a.options.infinite && (0 === a.currentSlide && "right" === n || a.currentSlide >= a.getDotCount() && "left" === n) && (i = a.touchObject.swipeLength * a.options.edgeFriction, a.touchObject.edgeHit = !0), !1 === a.options.vertical ? a.swipeLeft = t + i * o : a.swipeLeft = t + i * (a.$list.height() / a.listWidth) * o, !0 === a.options.verticalSwiping && (a.swipeLeft = t + i * o), !0 !== a.options.fade && !1 !== a.options.touchMove && (!0 === a.animating ? (a.swipeLeft = null, !1) : void a.setCSS(a.swipeLeft))))
        }, t.prototype.swipeStart = function(e) {
            var t, n = this;
            return n.interrupted = !0, 1 !== n.touchObject.fingerCount || n.slideCount <= n.options.slidesToShow ? (n.touchObject = {}, !1) : (void 0 !== e.originalEvent && void 0 !== e.originalEvent.touches && (t = e.originalEvent.touches[0]), n.touchObject.startX = n.touchObject.curX = void 0 !== t ? t.pageX : e.clientX, n.touchObject.startY = n.touchObject.curY = void 0 !== t ? t.pageY : e.clientY, void(n.dragging = !0))
        }, t.prototype.unfilterSlides = t.prototype.slickUnfilter = function() {
            var e = this;
            null !== e.$slidesCache && (e.unload(), e.$slideTrack.children(this.options.slide).detach(), e.$slidesCache.appendTo(e.$slideTrack), e.reinit())
        }, t.prototype.unload = function() {
            var t = this;
            e(".slick-cloned", t.$slider).remove(), t.$dots && t.$dots.remove(), t.$prevArrow && t.htmlExpr.test(t.options.prevArrow) && t.$prevArrow.remove(), t.$nextArrow && t.htmlExpr.test(t.options.nextArrow) && t.$nextArrow.remove(), t.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden", "true").css("width", "")
        }, t.prototype.unslick = function(e) {
            var t = this;
            t.$slider.trigger("unslick", [t, e]), t.destroy()
        }, t.prototype.updateArrows = function() {
            var e = this;
            Math.floor(e.options.slidesToShow / 2), !0 === e.options.arrows && e.slideCount > e.options.slidesToShow && !e.options.infinite && (e.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), e.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), 0 === e.currentSlide ? (e.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true"), e.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : e.currentSlide >= e.slideCount - e.options.slidesToShow && !1 === e.options.centerMode ? (e.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), e.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : e.currentSlide >= e.slideCount - 1 && !0 === e.options.centerMode && (e.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), e.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")))
        }, t.prototype.updateDots = function() {
            var e = this;
            null !== e.$dots && (e.$dots.find("li").removeClass("slick-active").end(), e.$dots.find("li").eq(Math.floor(e.currentSlide / e.options.slidesToScroll)).addClass("slick-active"))
        }, t.prototype.visibility = function() {
            var e = this;
            e.options.autoplay && (document[e.hidden] ? e.interrupted = !0 : e.interrupted = !1)
        }, e.fn.slick = function() {
            var e, n, i = this,
                o = arguments[0],
                r = Array.prototype.slice.call(arguments, 1),
                s = i.length;
            for (e = 0; e < s; e++)
                if ("object" == typeof o || void 0 === o ? i[e].slick = new t(i[e], o) : n = i[e].slick[o].apply(i[e].slick, r), void 0 !== n) return n;
            return i
        }
    }),
    function(e) {
        function t(t, n) {
            var i = e('.md_special[class$="toc"]:first .md_special_inner'),
                o = e('a[target-id="' + t + '"]', i),
                r = o.parents("li.collapsibe").children("a");
            e("a", i).removeClass("active"), n ? o.removeClass("active") : o.addClass("active"), n ? r.removeClass("active") : r.addClass("active");
            var s = o.position().top,
                a = s < 0 || s > i.height(),
                l = s > i.height() - 100;
            a ? i.stop().animate({
                scrollTop: o.position().top
            }, "slow") : l && i.stop().animate({
                scrollTop: i.scrollTop() + 100
            }, "fast")
        }

        function n(e, t) {
            var n = !1;
            return function() {
                n || (n = !0, setTimeout(function() {
                    n = !1, e.apply(null, arguments)
                }, t))
            }
        }
        e(function() {
            e(".header .navbar-toggle").click(function() {
                e("body").toggleClass("sidebar-open")
            })
        }), e(function() {
            e.cloudinary && e.cloudinary.responsive()
        }), e(function() {
            var n = e(".side-links a.current"),
                i = n.length ? n.attr("children_from_headings") : "true";
            if (i) {
                var o = parseInt("true" == i ? 3 : i);
                if (o) {
                    for (var r = "", s = 2, a = s; a < o; a++) r += a > s ? ", " : "", r += "h" + (a + 1);
                    var l = e('.md_special[class$="toc"] a[href]');
                    l.each(function(n) {
                        var i = this,
                            o = i.hash,
                            s = l.eq(n + 1)[0] ? l.eq(n + 1)[0].hash : "",
                            a = e('a[name="' + o.replace("#", "") + '"]', ".docs_content_col").nextUntil('a[name="' + s.replace("#", "") + '"]', r);
                        if (a.length > 0) {
                            var u = e('<ul class="sub-toc" />');
                            a.each(function() {
                                var t = this,
                                    n = e("a", t).attr("href");
                                u.append(e("<li />", {
                                    "class": "level-" + t.tagName
                                }).append(e("<a />", {
                                    text: t.innerText,
                                    href: n
                                })))
                            }), e(i).parent("li").addClass("collapsibe").append(u), e(i).prepend(e("<button/>", {
                                "class": "collapse-toggle",
                                title: "Expand Menu",
                                click: function(n) {
                                    n.preventDefault(), n.stopPropagation(), t(e(i).attr("target-id"), e(i).hasClass("active"))
                                }
                            }))
                        }
                    })
                }
            }
        }), e(function() {
            var i, o = e('.md_special[class$="toc"]:first'),
                r = 500;
            e("a", o).each(function(t) {
                var n = e(this).attr("href"),
                    i = n.substring(n.lastIndexOf("#") + 1);
                e('#content a[name="' + i + '"]').not(".scroll-target").first().addClass("scroll-target").attr("target-id", t), e(this).attr("target-id", t)
            }), e("a", o).on("click", function(n) {
                n.preventDefault(), t(e(this).attr("target-id"));
                var i = e(this).attr("target-id"),
                    o = e(this).attr("href");
                window.location = o, e(window).scrollTop(e('#content a.scroll-target[target-id="' + i + '"]').offset().top)
            }), e(window).on("load scroll resize", n(function() {
                var n, o = e(window).height() / 8;
                e("#content a.scroll-target").each(function() {
                    e(window).scrollTop() >= e(this).offset().top - o && (n = e(this).attr("target-id"))
                }), n !== i && (void 0 === n ? (t(i, !0), i = undefined) : (t(n), i = n))
            }, r))
        }), e(function() {
            e("a[data-popup=true]").on("click", function(t) {
                window.open(e(this).prop("href")), t.preventDefault()
            })
        }), e(function() {
            var t = e("#sidebar"),
                n = e(".current", t).offset();
            n && n.top > e(window).height() && t.animate({
                scrollTop: n.top - 65
            })
        }), e(function() {
            "undefined" != typeof jQuery.fn.slick && e(".carousel").slick({
                slidesToShow: 2,
                infinite: !1,
                responsive: [{
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 1,
                        infinite: !1
                    }
                }]
            }).on("click", ".slick-next", function() {
                "undefined" != typeof dataLayer && dataLayer.push({
                    event: "event to GA",
                    eventCategory: "doc homepage",
                    eventAction: "browse",
                    eventLabel: "whats new arrow - right"
                })
            }).on("click", ".slick-slide", function() {
                "undefined" != typeof dataLayer && dataLayer.push({
                    event: "event to GA",
                    eventCategory: "doc homepage",
                    eventAction: "navigate",
                    eventLabel: "whats new item - " + e(this).find("a").text()
                })
            })
        }), e(function() {
            e(".header .hasdrop").mouseenter(function() {
                var t = e("> ul.dropdown-menu", this),
                    n = t[0].getBoundingClientRect();
                t.css("max-height", e(window).height() - n.top - 20 + "px")
            })
        });
        var i, o, r = window.location.href,
            s = "https://cld-doc-feedback.herokuapp.com/",
            a = !0;
        (r.includes("docs-dev.cloudinary.com/documentation") || r.includes("staging.cloudinary.com/documentation")) && (s = "https://cld-doc-feedback-staging.herokuapp.com/", a = !1), e(function() {
            function t() {
                var t = "";
                t = 0 == a || "undefined" == ga ? "No cookie found" : ga.getAll()[0].get("clientId");
                var n = r(),
                    i = l(),
                    u = e("#doc-feedback").serializeObject(),
                    c = window.location.href;
                u.location = c, u.contact = e("#respond").prop("checked"), u.clientId = t, u.browser = n.name + " " + n.version, u.device = i, delete u["g-recaptcha-response"];
                var d = JSON.stringify(u),
                    p = s + "postreview";
                e.ajax({
                    type: "POST",
                    url: p,
                    data: d,
                    contentType: "application/json"
                }).done(function() {
                    e("#doc-feedback").trigger("reset"), e(".feedback-form").hide(), e(".success-message").show().delay(3e3).fadeOut(), e(".transparent-back").hide(), e(".spinner").hide(), "undefined" != typeof dataLayer && dataLayer.push({
                        event: "event to GA",
                        eventCategory: "doc feedback",
                        eventAction: "submit",
                        eventLabel: "rating score " + u.pageRating
                    })
                }).fail(function(e, t) {
                    console.log(t), console.log(e.status), o(e.status)
                })
            }

            function n() {
                var t = e("#respond"),
                    n = e("#cld-email"),
                    i = e(".feedback-contact"),
                    o = e("#cloudname");
                t.prop("checked") ? (i.show(), n.attr("required", "true")) : (n.removeAttr("required").val(""), o.val(""), i.hide())
            }

            function i(t) {
                if (t.matches) e(".form-open").prependTo(e("footer")), e(".tooltiptext").hide(), e(".g-recaptcha").attr("data-size", "compact");
                else {
                    var n = e(".md_autotoc").children(".md_special_inner");
                    e(".form-open").appendTo(n), e(".tooltiptext").show(), e(".g-recaptcha").attr("data-size", "normal")
                }
            }

            function o(t) {
                var n = e("#doc-feedback"),
                    i = e(".form-error"),
                    o = "";
                e(".spinner").hide(), n.hide(), 500 != t && 0 != t || (o = "It appears your request has failed to reach our servers."), 429 == t && (o = "We have received too many feedback requests from your IP address. Please wait before sending any more feedback."), "notHuman" == t && (o = "You must successfully complete the reCaptcha before you can submit your feedback."), e(".additional-message").text(o), i.show()
            }

            function r() {
                var e, t = navigator.userAgent,
                    n = t.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
                return /trident/i.test(n[1]) ? {
                    name: "IE",
                    version: (e = /\brv[ :]+(\d+)/g.exec(t) || [])[1] || ""
                } : "Chrome" === n[1] && null != (e = t.match(/\bOPR|Edge\/(\d+)/)) ? {
                    name: "Opera",
                    version: e[1]
                } : (n = n[2] ? [n[1], n[2]] : [navigator.appName, navigator.appVersion, "-?"], null != (e = t.match(/version\/(\d+)/i)) && n.splice(1, 1, e[1]), {
                    name: n[0],
                    version: n[1]
                })
            }

            function l() {
                function e(e) {
                    if (Array.isArray(e)) {
                        for (var t = 0, n = Array(e.length); t < e.length; t++) n[t] = e[t];
                        return n
                    }
                    return Array.from(e)
                }
                var t = navigator.userAgent;
                return [].concat(e(t.matchAll(/(\()(.*?)(\))/g)))[0][2]
            }
            if (e(".md_autotoc")[0]) {
                var u = e(".md_autotoc").children(".md_special_inner");
                e(".form-open").appendTo(u)
            } else {
                var c = e("<div>", {
                        "class": "md_special md_autotoc"
                    }),
                    d = e("<div>", {
                        "class": "md_special_inner"
                    });
                e(".form-open").appendTo(d), d.appendTo(c), c.appendTo(e(".docs_content.dynamic_content"))
            }
            e(".form-open a").on("click", function() {
                var t = e(this).attr("id"),
                    i = e("input[id='rating-" + t + "']"),
                    o = e(this).attr("rating");
                i.parent().children("img").attr("src", "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDI0IDI0IiBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIyNCI+PGc+PHBhdGggZD0iTTAsMGgyNHYyNEgwVjB6IiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTAsMGgyNHYyNEgwVjB6IiBmaWxsPSJub25lIi8+PC9nPjxnPjxwYXRoIGQ9Ik0xMiwxNy4yN2w0LjE1LDIuNTFjMC43NiwwLjQ2LDEuNjktMC4yMiwxLjQ5LTEuMDhsLTEuMS00LjcybDMuNjctMy4xOGMwLjY3LTAuNTgsMC4zMS0xLjY4LTAuNTctMS43NWwtNC44My0wLjQxIGwtMS44OS00LjQ2Yy0wLjM0LTAuODEtMS41LTAuODEtMS44NCwwTDkuMTksOC42M0w0LjM2LDkuMDRjLTAuODgsMC4wNy0xLjI0LDEuMTctMC41NywxLjc1bDMuNjcsMy4xOGwtMS4xLDQuNzIgYy0wLjIsMC44NiwwLjczLDEuNTQsMS40OSwxLjA4TDEyLDE3LjI3eiIgZmlsbD0iI2Y3YmMwMCIvPjwvZz48L3N2Zz4="), i.parent().prevAll("label.choice").children().attr("src", "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDI0IDI0IiBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIyNCI+PGc+PHBhdGggZD0iTTAsMGgyNHYyNEgwVjB6IiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTAsMGgyNHYyNEgwVjB6IiBmaWxsPSJub25lIi8+PC9nPjxnPjxwYXRoIGQ9Ik0xMiwxNy4yN2w0LjE1LDIuNTFjMC43NiwwLjQ2LDEuNjktMC4yMiwxLjQ5LTEuMDhsLTEuMS00LjcybDMuNjctMy4xOGMwLjY3LTAuNTgsMC4zMS0xLjY4LTAuNTctMS43NWwtNC44My0wLjQxIGwtMS44OS00LjQ2Yy0wLjM0LTAuODEtMS41LTAuODEtMS44NCwwTDkuMTksOC42M0w0LjM2LDkuMDRjLTAuODgsMC4wNy0xLjI0LDEuMTctMC41NywxLjc1bDMuNjcsMy4xOGwtMS4xLDQuNzIgYy0wLjIsMC44NiwwLjczLDEuNTQsMS40OSwxLjA4TDEyLDE3LjI3eiIgZmlsbD0iI2Y3YmMwMCIvPjwvZz48L3N2Zz4=");
                var u = "";
                u = 0 == a || "undefined" == ga ? "No cookie found" : ga.getAll()[0].get("clientId");
                var c = r(),
                    d = l();
                e(".form-error").hide(), e("#doc-feedback").show(), i.prop("checked", !0), e(".transparent-back").show(), e(".feedback-form").fadeIn();
                var p = new Object;
                p.pageRating = o, p.location = window.location.href, p.device = d + " | " + c.name, p.clientId = u;
                var f = s + "postreview?rating=true";
                e.ajax({
                    type: "POST",
                    url: f,
                    data: JSON.stringify(p),
                    contentType: "application/json"
                }).done(function() {
                    console.log("Done")
                }).fail(function(e, t) {
                    console.log(t), console.log(e.status)
                }), "undefined" != typeof dataLayer && dataLayer.push({
                    event: "event to GA",
                    eventCategory: "doc feedback",
                    eventAction: "rate page",
                    eventLabel: "rating score: " + o
                }), n()
            }), e(".form-open a").hover(function() {
                var t = e(this).prevAll(".tooltip").children();
                e(this).children().attr("src", "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDI0IDI0IiBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIyNCI+PGc+PHBhdGggZD0iTTAsMGgyNHYyNEgwVjB6IiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTAsMGgyNHYyNEgwVjB6IiBmaWxsPSJub25lIi8+PC9nPjxnPjxwYXRoIGQ9Ik0xMiwxNy4yN2w0LjE1LDIuNTFjMC43NiwwLjQ2LDEuNjktMC4yMiwxLjQ5LTEuMDhsLTEuMS00LjcybDMuNjctMy4xOGMwLjY3LTAuNTgsMC4zMS0xLjY4LTAuNTctMS43NWwtNC44My0wLjQxIGwtMS44OS00LjQ2Yy0wLjM0LTAuODEtMS41LTAuODEtMS44NCwwTDkuMTksOC42M0w0LjM2LDkuMDRjLTAuODgsMC4wNy0xLjI0LDEuMTctMC41NywxLjc1bDMuNjcsMy4xOGwtMS4xLDQuNzIgYy0wLjIsMC44NiwwLjczLDEuNTQsMS40OSwxLjA4TDEyLDE3LjI3eiIgZmlsbD0iI2Y3YmMwMCIvPjwvZz48L3N2Zz4="), t.attr("src", "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDI0IDI0IiBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIyNCI+PGc+PHBhdGggZD0iTTAsMGgyNHYyNEgwVjB6IiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTAsMGgyNHYyNEgwVjB6IiBmaWxsPSJub25lIi8+PC9nPjxnPjxwYXRoIGQ9Ik0xMiwxNy4yN2w0LjE1LDIuNTFjMC43NiwwLjQ2LDEuNjktMC4yMiwxLjQ5LTEuMDhsLTEuMS00LjcybDMuNjctMy4xOGMwLjY3LTAuNTgsMC4zMS0xLjY4LTAuNTctMS43NWwtNC44My0wLjQxIGwtMS44OS00LjQ2Yy0wLjM0LTAuODEtMS41LTAuODEtMS44NCwwTDkuMTksOC42M0w0LjM2LDkuMDRjLTAuODgsMC4wNy0xLjI0LDEuMTctMC41NywxLjc1bDMuNjcsMy4xOGwtMS4xLDQuNzIgYy0wLjIsMC44NiwwLjczLDEuNTQsMS40OSwxLjA4TDEyLDE3LjI3eiIgZmlsbD0iI2Y3YmMwMCIvPjwvZz48L3N2Zz4=")
            }, function() {
                var t = e(this).prevAll(".tooltip").children();
                e(this).children().attr("src", "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjI0Ij48cGF0aCBkPSJNMCAwaDI0djI0SDBWMHoiIGZpbGw9Im5vbmUiLz48cGF0aCBkPSJNMTkuNjUgOS4wNGwtNC44NC0uNDItMS44OS00LjQ1Yy0uMzQtLjgxLTEuNS0uODEtMS44NCAwTDkuMTkgOC42M2wtNC44My40MWMtLjg4LjA3LTEuMjQgMS4xNy0uNTcgMS43NWwzLjY3IDMuMTgtMS4xIDQuNzJjLS4yLjg2LjczIDEuNTQgMS40OSAxLjA4bDQuMTUtMi41IDQuMTUgMi41MWMuNzYuNDYgMS42OS0uMjIgMS40OS0xLjA4bC0xLjEtNC43MyAzLjY3LTMuMThjLjY3LS41OC4zMi0xLjY4LS41Ni0xLjc1ek0xMiAxNS40bC0zLjc2IDIuMjcgMS00LjI4LTMuMzItMi44OCA0LjM4LS4zOEwxMiA2LjFsMS43MSA0LjA0IDQuMzguMzgtMy4zMiAyLjg4IDEgNC4yOEwxMiAxNS40eiIgZmlsbD0iI2Y3YmMwMCIvPjwvc3ZnPg=="), t.attr("src", "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjI0Ij48cGF0aCBkPSJNMCAwaDI0djI0SDBWMHoiIGZpbGw9Im5vbmUiLz48cGF0aCBkPSJNMTkuNjUgOS4wNGwtNC44NC0uNDItMS44OS00LjQ1Yy0uMzQtLjgxLTEuNS0uODEtMS44NCAwTDkuMTkgOC42M2wtNC44My40MWMtLjg4LjA3LTEuMjQgMS4xNy0uNTcgMS43NWwzLjY3IDMuMTgtMS4xIDQuNzJjLS4yLjg2LjczIDEuNTQgMS40OSAxLjA4bDQuMTUtMi41IDQuMTUgMi41MWMuNzYuNDYgMS42OS0uMjIgMS40OS0xLjA4bC0xLjEtNC43MyAzLjY3LTMuMThjLjY3LS41OC4zMi0xLjY4LS41Ni0xLjc1ek0xMiAxNS40bC0zLjc2IDIuMjcgMS00LjI4LTMuMzItMi44OCA0LjM4LS4zOEwxMiA2LjFsMS43MSA0LjA0IDQuMzguMzgtMy4zMiAyLjg4IDEgNC4yOEwxMiAxNS40eiIgZmlsbD0iI2Y3YmMwMCIvPjwvc3ZnPg==")
            }), e("input:radio[name=pageRating]").change(function() {
                e(".myForm label.choice").children("img").attr("src", "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjI0Ij48cGF0aCBkPSJNMCAwaDI0djI0SDBWMHoiIGZpbGw9Im5vbmUiLz48cGF0aCBkPSJNMTkuNjUgOS4wNGwtNC44NC0uNDItMS44OS00LjQ1Yy0uMzQtLjgxLTEuNS0uODEtMS44NCAwTDkuMTkgOC42M2wtNC44My40MWMtLjg4LjA3LTEuMjQgMS4xNy0uNTcgMS43NWwzLjY3IDMuMTgtMS4xIDQuNzJjLS4yLjg2LjczIDEuNTQgMS40OSAxLjA4bDQuMTUtMi41IDQuMTUgMi41MWMuNzYuNDYgMS42OS0uMjIgMS40OS0xLjA4bC0xLjEtNC43MyAzLjY3LTMuMThjLjY3LS41OC4zMi0xLjY4LS41Ni0xLjc1ek0xMiAxNS40bC0zLjc2IDIuMjcgMS00LjI4LTMuMzItMi44OCA0LjM4LS4zOEwxMiA2LjFsMS43MSA0LjA0IDQuMzguMzgtMy4zMiAyLjg4IDEgNC4yOEwxMiAxNS40eiIgZmlsbD0iI2Y3YmMwMCIvPjwvc3ZnPg==");
                var t = e(this).parent();
                t.children("img").attr("src", "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDI0IDI0IiBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIyNCI+PGc+PHBhdGggZD0iTTAsMGgyNHYyNEgwVjB6IiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTAsMGgyNHYyNEgwVjB6IiBmaWxsPSJub25lIi8+PC9nPjxnPjxwYXRoIGQ9Ik0xMiwxNy4yN2w0LjE1LDIuNTFjMC43NiwwLjQ2LDEuNjktMC4yMiwxLjQ5LTEuMDhsLTEuMS00LjcybDMuNjctMy4xOGMwLjY3LTAuNTgsMC4zMS0xLjY4LTAuNTctMS43NWwtNC44My0wLjQxIGwtMS44OS00LjQ2Yy0wLjM0LTAuODEtMS41LTAuODEtMS44NCwwTDkuMTksOC42M0w0LjM2LDkuMDRjLTAuODgsMC4wNy0xLjI0LDEuMTctMC41NywxLjc1bDMuNjcsMy4xOGwtMS4xLDQuNzIgYy0wLjIsMC44NiwwLjczLDEuNTQsMS40OSwxLjA4TDEyLDE3LjI3eiIgZmlsbD0iI2Y3YmMwMCIvPjwvZz48L3N2Zz4="), t.prevAll("label.choice").children("img").attr("src", "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDI0IDI0IiBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIyNCI+PGc+PHBhdGggZD0iTTAsMGgyNHYyNEgwVjB6IiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTAsMGgyNHYyNEgwVjB6IiBmaWxsPSJub25lIi8+PC9nPjxnPjxwYXRoIGQ9Ik0xMiwxNy4yN2w0LjE1LDIuNTFjMC43NiwwLjQ2LDEuNjktMC4yMiwxLjQ5LTEuMDhsLTEuMS00LjcybDMuNjctMy4xOGMwLjY3LTAuNTgsMC4zMS0xLjY4LTAuNTctMS43NWwtNC44My0wLjQxIGwtMS44OS00LjQ2Yy0wLjM0LTAuODEtMS41LTAuODEtMS44NCwwTDkuMTksOC42M0w0LjM2LDkuMDRjLTAuODgsMC4wNy0xLjI0LDEuMTctMC41NywxLjc1bDMuNjcsMy4xOGwtMS4xLDQuNzIgYy0wLjIsMC44NiwwLjczLDEuNTQsMS40OSwxLjA4TDEyLDE3LjI3eiIgZmlsbD0iI2Y3YmMwMCIvPjwvZz48L3N2Zz4=")
            }), e("#doc-feedback").submit(function(n) {
                n.preventDefault(), e(".spinner").css("display", "inline");
                var i = grecaptcha.getResponse();
                if (0 == i.length) return o("notHuman"), !1;
                e.ajax({
                    type: "POST",
                    url: s + "verify_recaptcha?response=" + i
                }).done(function(e) {
                    e.success && (t(), grecaptcha.reset())
                }).fail(function(e, t) {
                    console.log(t), console.log(e.status), grecaptcha.reset()
                })
            }), e("#respond").on("change", function() {
                n()
            }), e(document).on("click", "#close, .transparent-back", function() {
                e(".feedback-form").fadeOut(), e(".transparent-back").hide(), e(".myForm label.choice").children("img").attr("src", "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjI0Ij48cGF0aCBkPSJNMCAwaDI0djI0SDBWMHoiIGZpbGw9Im5vbmUiLz48cGF0aCBkPSJNMTkuNjUgOS4wNGwtNC44NC0uNDItMS44OS00LjQ1Yy0uMzQtLjgxLTEuNS0uODEtMS44NCAwTDkuMTkgOC42M2wtNC44My40MWMtLjg4LjA3LTEuMjQgMS4xNy0uNTcgMS43NWwzLjY3IDMuMTgtMS4xIDQuNzJjLS4yLjg2LjczIDEuNTQgMS40OSAxLjA4bDQuMTUtMi41IDQuMTUgMi41MWMuNzYuNDYgMS42OS0uMjIgMS40OS0xLjA4bC0xLjEtNC43MyAzLjY3LTMuMThjLjY3LS41OC4zMi0xLjY4LS41Ni0xLjc1ek0xMiAxNS40bC0zLjc2IDIuMjcgMS00LjI4LTMuMzItMi44OCA0LjM4LS4zOEwxMiA2LjFsMS43MSA0LjA0IDQuMzguMzgtMy4zMiAyLjg4IDEgNC4yOEwxMiAxNS40eiIgZmlsbD0iI2Y3YmMwMCIvPjwvc3ZnPg==")
            }), e(".form-error button").on("click", function() {
                e(".form-error").hide(), e("#doc-feedback").show()
            }), e.fn.serializeObject = function() {
                var t = {},
                    n = this.serializeArray();
                return e.each(n, function() {
                    t[this.name] ? (t[this.name].push || (t[this.name] = [t[this.name]]), t[this.name].push(this.value || "")) : t[this.name] = this.value || ""
                }), t
            };
            var p = window.matchMedia("(max-width: 1200px)");
            i(p), p.addListener(i)
        }), i = window.location.href, o = document.querySelector("link[sizes*='32x32']"), i.includes("docs-dev.cloudinary.com/documentation") ? o.href = "https://cloudinary-res.cloudinary.com/image/upload/l_text:Verdana_15_Bold:DEV,co_white,b_black/docsite/brand-assets/cloudinary_favicon_32x32.png" : i.includes("staging.cloudinary.com/documentation") && (o.href = "https://cloudinary-res.cloudinary.com/image/upload/l_text:Verdana_15_Bold:STG,co_white,b_black/docsite/brand-assets/cloudinary_favicon_32x32.png")
    }(jQuery), $(function() {
        var e = [];
        $(".cld-video-player").each(function() {
            e.push($(this).attr("id"))
        }), e.forEach(function(e) {
            (e = window[e]).on("play", function() {
                e.currentTime() > 1 ? window.dataLayer.push({
                    event: "event to GA",
                    eventCategory: "video player",
                    eventAction: "play from timestamp",
                    eventLabel: "video: " + e.currentPublicId() + "|| time: " + e.currentTime()
                }) : window.dataLayer.push({
                    event: "event to GA",
                    eventCategory: "video player",
                    eventAction: "play from start",
                    eventLabel: "video: " + e.currentPublicId()
                })
            }), e.on("pause", function() {
                window.dataLayer.push({
                    event: "event to GA",
                    eventCategory: "video player",
                    eventAction: "video paused",
                    eventLabel: "video: " + e.currentPublicId() + "|| time: " + e.currentTime()
                })
            }), e.on("percentsplayed", function(t) {
                window.dataLayer.push({
                    event: "event to GA",
                    eventCategory: "video player",
                    eventAction: t.eventData.percent + " percent played",
                    eventLabel: "video: " + e.currentPublicId()
                })
            })
        })
    });