function checkAll(t, e) {
    "." != t[0] && (t = "." + t), jQuery(t).removeAttr("checked"), jQuery(e).is(":checked") && jQuery(t).click()
}

function clickableSafeRedirect(t, e, n) {
    var i = t.target.tagName.toLowerCase(), r = t.target.parentNode.tagName.toLowerCase(),
        o = t.target.parentNode.parentNode.parentNode;
    return !jQuery(o).hasClass("collapsed") && void("button" != i && "a" != i && "button" != r && "a" != r && (n ? window.open(e) : window.location.href = e))
}

function popupWindow(t, e, n, i, r) {
    var o = (screen.width - n) / 2, a = (screen.height - i) / 2;
    o < 0 && (o = 0), a < 0 && (a = 0);
    var s = "height=" + i + ",";
    s += "width=" + n + ",", s += "top=" + a + ",", s += "left=" + o + ",", s += r, win = window.open(t, e, s), win.window.focus()
}

function addRenewalToCart(t, e) {
    jQuery("#domainRow" + t).attr("disabled", "disabled"), jQuery("#domainRow" + t).find("select,button").attr("disabled", "disabled"), jQuery(e).html('<span class="glyphicon glyphicon-shopping-cart"></span> Adding...');
    var n = jQuery("#renewalPeriod" + t).val();
    jQuery.post("clientarea.php", "addRenewalToCart=1&token=" + csrfToken + "&renewID=" + t + "&period=" + n, function (t) {
        jQuery("#cartItemCount").html(1 * jQuery("#cartItemCount").html() + 1), jQuery(e).html('<span class="glyphicon glyphicon-shopping-cart"></span> Added'), jQuery("#btnCheckout").fadeIn()
    })
}

function selectChangeNavigate(t) {
    window.location.href = $(t).val()
}

function extraTicketAttachment() {
    jQuery("#fileUploadsContainer").append('<input type="file" name="attachments[]" class="form-control" />')
}

function getStats(t) {
    jQuery.post("serverstatus.php", "getstats=1&num=" + t, function (e) {
        jQuery("#load" + t).html(e.load), jQuery("#uptime" + t).html(e.uptime)
    }, "json")
}

function checkPort(t, e) {
    jQuery.post("serverstatus.php", "ping=1&num=" + t + "&port=" + e, function (n) {
        jQuery("#port" + e + "_" + t).html(n)
    })
}

function getticketsuggestions() {
    currentcheckcontent = jQuery("#message").val(), currentcheckcontent != lastcheckcontent && "" != currentcheckcontent && (jQuery.post("submitticket.php", {
        action: "getkbarticles",
        text: currentcheckcontent
    }, function (t) {
        t && (jQuery("#searchresults").html(t), jQuery("#searchresults").hide().removeClass("hidden").slideDown())
    }), lastcheckcontent = currentcheckcontent), setTimeout("getticketsuggestions();", 3e3)
}

function refreshCustomFields(t) {
    jQuery("#customFieldsContainer").load("submitticket.php", {action: "getcustomfields", deptid: $(t).val()})
}

function autoSubmitFormByContainer(t) {
    jQuery("#" + t).find("form:first").submit()
}

function useDefaultWhois(t) {
    jQuery("." + t.substr(0, t.length - 1) + "customwhois").attr("disabled", !0), jQuery("." + t.substr(0, t.length - 1) + "defaultwhois").attr("disabled", !1), jQuery("#" + t.substr(0, t.length - 1) + "1").attr("checked", "checked")
}

function useCustomWhois(t) {
    jQuery("." + t.substr(0, t.length - 1) + "customwhois").attr("disabled", !1), jQuery("." + t.substr(0, t.length - 1) + "defaultwhois").attr("disabled", !0), jQuery("#" + t.substr(0, t.length - 1) + "2").attr("checked", "checked")
}

function editBillingAddress() {
    jQuery("#billingAddressSummary").hide(), jQuery(".cc-billing-address").hide().removeClass("hidden").fadeIn()
}

function showNewCardInputFields() {
    jQuery(".cc-details").hasClass("hidden") && jQuery(".cc-details").hide().removeClass("hidden"), jQuery(".cc-details").slideDown(), jQuery("#btnEditBillingAddress").removeAttr("disabled")
}

function hideNewCardInputFields() {
    jQuery(".cc-billing-address").slideUp(), jQuery(".cc-details").slideUp(), jQuery("#btnEditBillingAddress").attr("disabled", "disabled"), jQuery("#billingAddressSummary").hasClass("hidden") ? jQuery("#billingAddressSummary").hide().removeClass("hidden").slideDown() : jQuery("#billingAddressSummary").slideDown()
}

function getTicketSuggestions() {
    var t = jQuery("#inputMessage").val();
    t != lastTicketMsg && "" != t && (jQuery.post("submitticket.php", {action: "getkbarticles", text: t}, function (t) {
        t && (jQuery("#autoAnswerSuggestions").html(t), jQuery("#autoAnswerSuggestions").is(":visible") || jQuery("#autoAnswerSuggestions").hide().removeClass("hidden").slideDown())
    }), lastTicketMsg = t), setTimeout("getTicketSuggestions()", 3e3)
}

function smoothScroll(t) {
    $("html, body").animate({scrollTop: $(t).offset().top}, 500)
}

function openModal(t, e, n, i, r, o, a, s, d) {
    if (jQuery("#modalAjax .modal-title").html(n), i && jQuery("#modalAjax").children('div[class="modal-dialog"]').addClass(i), r && jQuery("#modalAjax").addClass(r), r && jQuery("#modalAjax").addClass(r), o ? (jQuery("#modalAjax .modal-submit").show().html(o), a && jQuery("#modalAjax .modal-submit").attr("id", a)) : jQuery("#modalAjax .modal-submit").hide(), s && jQuery("#modalAjaxClose").hide(), jQuery("#modalAjax .modal-body").html(""), jQuery("#modalSkip").hide(), jQuery("#modalAjax .modal-submit").prop("disabled", !0), jQuery("#modalAjax").modal("show"), jQuery.post(t, e, function (t) {
            updateAjaxModal(t)
        }, "json").fail(function () {
            jQuery("#modalAjax .modal-body").html("An error occurred while communicating with the server. Please try again."), jQuery("#modalAjax .loader").fadeOut()
        }), a) {
        var l = jQuery("#" + a);
        l.off("click"), l.on("click", function () {
            var t = jQuery("#modalAjax").find("form");
            jQuery("#modalAjax .loader").show();
            jQuery.post(t.attr("action"), t.serialize(), function (t) {
                d && (t.successDataTable = d), updateAjaxModal(t)
            }, "json").fail(function (t) {
                var e = t.responseJSON, n = "An error occurred while communicating with the server. Please try again.";
                e && e.data ? (e = e.data, e.errorMsg ? jQuery.growl.warning({
                    title: e.errorMsgTitle,
                    message: e.errorMsg
                }) : e.data.body ? jQuery("#modalAjax .modal-body").html(e.body) : jQuery("#modalAjax .modal-body").html(n)) : jQuery("#modalAjax .modal-body").html(n), jQuery("#modalAjax .loader").fadeOut()
            })
        })
    }
}

function updateAjaxModal(t) {
    if (t.successDataTable && WHMCS.ui.dataTable.getTableById(t.successDataTable, void 0).ajax.reload(), t.dismiss && dialogClose(), t.successMsg && jQuery.growl.notice({
            title: t.successMsgTitle,
            message: t.successMsg
        }), t.errorMsg && jQuery.growl.warning({
            title: t.errorMsgTitle,
            message: t.errorMsg
        }), t.title && jQuery("#modalAjax .modal-title").html(t.title), t.body ? jQuery("#modalAjax .modal-body").html(t.body) : t.url && jQuery.post(t.url, "", function (t) {
            jQuery("#modalAjax").find(".modal-body").html(t.body)
        }, "json").fail(function () {
            jQuery("#modalAjax").find(".modal-body").html("An error occurred while communicating with the server. Please try again."), jQuery("#modalAjax").find(".loader").fadeOut()
        }), t.submitlabel && (jQuery("#modalAjax .modal-submit").html(t.submitlabel).show(), t.submitId && jQuery("#modalAjax").find(".modal-submit").attr("id", t.submitId)), t.submitId) {
        var e = jQuery("#" + t.submitId);
        e.off("click"), e.on("click", function () {
            var t = jQuery("#modalAjax").find("form");
            jQuery("#modalAjax .loader").show();
            jQuery.post(t.attr("action"), t.serialize(), function (t) {
                updateAjaxModal(t)
            }, "json").fail(function () {
                jQuery("#modalAjax .modal-body").html("An error occurred while communicating with the server. Please try again."), jQuery("#modalAjax .loader").fadeOut()
            })
        })
    }
    jQuery("#modalAjax .loader").fadeOut(), jQuery("#modalAjax .modal-submit").removeProp("disabled")
}

function dialogSubmit() {
    jQuery("#modalAjax .modal-submit").prop("disabled", !0), jQuery("#modalAjax .loader").show(), jQuery.post("", jQuery("#modalAjax").find("form").serialize(), function (t) {
        updateAjaxModal(t)
    }, "json").fail(function () {
        jQuery("#modalAjax .modal-body").html("An error occurred while communicating with the server. Please try again."), jQuery("#modalAjax .loader").fadeOut()
    })
}

function dialogClose() {
    jQuery("#modalAjax").modal("hide")
}

if (function (t, e) {
        "object" == typeof module && "object" == typeof module.exports ? module.exports = t.document ? e(t, !0) : function (t) {
            if (!t.document) throw new Error("jQuery requires a window with a document");
            return e(t)
        } : e(t)
    }("undefined" != typeof window ? window : this, function (t, e) {
        function n(t) {
            var e = !!t && "length" in t && t.length, n = pt.type(t);
            return "function" !== n && !pt.isWindow(t) && ("array" === n || 0 === e || "number" == typeof e && e > 0 && e - 1 in t)
        }

        function i(t, e, n) {
            if (pt.isFunction(e)) return pt.grep(t, function (t, i) {
                return !!e.call(t, i, t) !== n
            });
            if (e.nodeType) return pt.grep(t, function (t) {
                return t === e !== n
            });
            if ("string" == typeof e) {
                if (xt.test(e)) return pt.filter(e, t, n);
                e = pt.filter(e, t)
            }
            return pt.grep(t, function (t) {
                return pt.inArray(t, e) > -1 !== n
            })
        }

        function r(t, e) {
            do t = t[e]; while (t && 1 !== t.nodeType);
            return t
        }

        function o(t) {
            var e = {};
            return pt.each(t.match(It) || [], function (t, n) {
                e[n] = !0
            }), e
        }

        function a() {
            it.addEventListener ? (it.removeEventListener("DOMContentLoaded", s), t.removeEventListener("load", s)) : (it.detachEvent("onreadystatechange", s), t.detachEvent("onload", s))
        }

        function s() {
            (it.addEventListener || "load" === t.event.type || "complete" === it.readyState) && (a(), pt.ready())
        }

        function d(t, e, n) {
            if (void 0 === n && 1 === t.nodeType) {
                var i = "data-" + e.replace(Et, "-$1").toLowerCase();
                if (n = t.getAttribute(i), "string" == typeof n) {
                    try {
                        n = "true" === n || "false" !== n && ("null" === n ? null : +n + "" === n ? +n : Nt.test(n) ? pt.parseJSON(n) : n)
                    } catch (t) {
                    }
                    pt.data(t, e, n)
                } else n = void 0
            }
            return n
        }

        function l(t) {
            var e;
            for (e in t) if (("data" !== e || !pt.isEmptyObject(t[e])) && "toJSON" !== e) return !1;
            return !0
        }

        function u(t, e, n, i) {
            if (Lt(t)) {
                var r, o, a = pt.expando, s = t.nodeType, d = s ? pt.cache : t, l = s ? t[a] : t[a] && a;
                if (l && d[l] && (i || d[l].data) || void 0 !== n || "string" != typeof e) return l || (l = s ? t[a] = nt.pop() || pt.guid++ : a), d[l] || (d[l] = s ? {} : {toJSON: pt.noop}), "object" != typeof e && "function" != typeof e || (i ? d[l] = pt.extend(d[l], e) : d[l].data = pt.extend(d[l].data, e)), o = d[l], i || (o.data || (o.data = {}), o = o.data), void 0 !== n && (o[pt.camelCase(e)] = n), "string" == typeof e ? (r = o[e], null == r && (r = o[pt.camelCase(e)])) : r = o, r
            }
        }

        function c(t, e, n) {
            if (Lt(t)) {
                var i, r, o = t.nodeType, a = o ? pt.cache : t, s = o ? t[pt.expando] : pt.expando;
                if (a[s]) {
                    if (e && (i = n ? a[s] : a[s].data)) {
                        pt.isArray(e) ? e = e.concat(pt.map(e, pt.camelCase)) : e in i ? e = [e] : (e = pt.camelCase(e), e = e in i ? [e] : e.split(" ")), r = e.length;
                        for (; r--;) delete i[e[r]];
                        if (n ? !l(i) : !pt.isEmptyObject(i)) return
                    }
                    (n || (delete a[s].data, l(a[s]))) && (o ? pt.cleanData([t], !0) : ct.deleteExpando || a != a.window ? delete a[s] : a[s] = void 0)
                }
            }
        }

        function h(t, e, n, i) {
            var r, o = 1, a = 20, s = i ? function () {
                    return i.cur()
                } : function () {
                    return pt.css(t, e, "")
                }, d = s(), l = n && n[3] || (pt.cssNumber[e] ? "" : "px"),
                u = (pt.cssNumber[e] || "px" !== l && +d) && Mt.exec(pt.css(t, e));
            if (u && u[3] !== l) {
                l = l || u[3], n = n || [], u = +d || 1;
                do o = o || ".5", u /= o, pt.style(t, e, u + l); while (o !== (o = s() / d) && 1 !== o && --a)
            }
            return n && (u = +u || +d || 0, r = n[1] ? u + (n[1] + 1) * n[2] : +n[2], i && (i.unit = l, i.start = u, i.end = r)), r
        }

        function p(t) {
            var e = Wt.split("|"), n = t.createDocumentFragment();
            if (n.createElement) for (; e.length;) n.createElement(e.pop());
            return n
        }

        function f(t, e) {
            var n, i, r = 0,
                o = "undefined" != typeof t.getElementsByTagName ? t.getElementsByTagName(e || "*") : "undefined" != typeof t.querySelectorAll ? t.querySelectorAll(e || "*") : void 0;
            if (!o) for (o = [], n = t.childNodes || t; null != (i = n[r]); r++) !e || pt.nodeName(i, e) ? o.push(i) : pt.merge(o, f(i, e));
            return void 0 === e || e && pt.nodeName(t, e) ? pt.merge([t], o) : o
        }

        function g(t, e) {
            for (var n, i = 0; null != (n = t[i]); i++) pt._data(n, "globalEval", !e || pt._data(e[i], "globalEval"))
        }

        function $(t) {
            Ft.test(t.type) && (t.defaultChecked = t.checked)
        }

        function m(t, e, n, i, r) {
            for (var o, a, s, d, l, u, c, h = t.length, m = p(e), v = [], y = 0; y < h; y++) if (a = t[y], a || 0 === a) if ("object" === pt.type(a)) pt.merge(v, a.nodeType ? [a] : a); else if (qt.test(a)) {
                for (d = d || m.appendChild(e.createElement("div")), l = (Bt.exec(a) || ["", ""])[1].toLowerCase(), c = zt[l] || zt._default, d.innerHTML = c[1] + pt.htmlPrefilter(a) + c[2], o = c[0]; o--;) d = d.lastChild;
                if (!ct.leadingWhitespace && Ut.test(a) && v.push(e.createTextNode(Ut.exec(a)[0])), !ct.tbody) for (a = "table" !== l || Vt.test(a) ? "<table>" !== c[1] || Vt.test(a) ? 0 : d : d.firstChild, o = a && a.childNodes.length; o--;) pt.nodeName(u = a.childNodes[o], "tbody") && !u.childNodes.length && a.removeChild(u);
                for (pt.merge(v, d.childNodes), d.textContent = ""; d.firstChild;) d.removeChild(d.firstChild);
                d = m.lastChild
            } else v.push(e.createTextNode(a));
            for (d && m.removeChild(d), ct.appendChecked || pt.grep(f(v, "input"), $), y = 0; a = v[y++];) if (i && pt.inArray(a, i) > -1) r && r.push(a); else if (s = pt.contains(a.ownerDocument, a), d = f(m.appendChild(a), "script"), s && g(d), n) for (o = 0; a = d[o++];) Qt.test(a.type || "") && n.push(a);
            return d = null, m
        }

        function v() {
            return !0
        }

        function y() {
            return !1
        }

        function b() {
            try {
                return it.activeElement
            } catch (t) {
            }
        }

        function C(t, e, n, i, r, o) {
            var a, s;
            if ("object" == typeof e) {
                "string" != typeof n && (i = i || n, n = void 0);
                for (s in e) C(t, s, n, i, e[s], o);
                return t
            }
            if (null == i && null == r ? (r = n, i = n = void 0) : null == r && ("string" == typeof n ? (r = i, i = void 0) : (r = i, i = n, n = void 0)), r === !1) r = y; else if (!r) return t;
            return 1 === o && (a = r, r = function (t) {
                return pt().off(t), a.apply(this, arguments)
            }, r.guid = a.guid || (a.guid = pt.guid++)), t.each(function () {
                pt.event.add(this, e, r, i, n)
            })
        }

        function w(t, e) {
            return pt.nodeName(t, "table") && pt.nodeName(11 !== e.nodeType ? e : e.firstChild, "tr") ? t.getElementsByTagName("tbody")[0] || t.appendChild(t.ownerDocument.createElement("tbody")) : t
        }

        function x(t) {
            return t.type = (null !== pt.find.attr(t, "type")) + "/" + t.type, t
        }

        function S(t) {
            var e = re.exec(t.type);
            return e ? t.type = e[1] : t.removeAttribute("type"), t
        }

        function T(t, e) {
            if (1 === e.nodeType && pt.hasData(t)) {
                var n, i, r, o = pt._data(t), a = pt._data(e, o), s = o.events;
                if (s) {
                    delete a.handle, a.events = {};
                    for (n in s) for (i = 0, r = s[n].length; i < r; i++) pt.event.add(e, n, s[n][i])
                }
                a.data && (a.data = pt.extend({}, a.data))
            }
        }

        function k(t, e) {
            var n, i, r;
            if (1 === e.nodeType) {
                if (n = e.nodeName.toLowerCase(), !ct.noCloneEvent && e[pt.expando]) {
                    r = pt._data(e);
                    for (i in r.events) pt.removeEvent(e, i, r.handle);
                    e.removeAttribute(pt.expando)
                }
                "script" === n && e.text !== t.text ? (x(e).text = t.text, S(e)) : "object" === n ? (e.parentNode && (e.outerHTML = t.outerHTML), ct.html5Clone && t.innerHTML && !pt.trim(e.innerHTML) && (e.innerHTML = t.innerHTML)) : "input" === n && Ft.test(t.type) ? (e.defaultChecked = e.checked = t.checked, e.value !== t.value && (e.value = t.value)) : "option" === n ? e.defaultSelected = e.selected = t.defaultSelected : "input" !== n && "textarea" !== n || (e.defaultValue = t.defaultValue)
            }
        }

        function D(t, e, n, i) {
            e = ot.apply([], e);
            var r, o, a, s, d, l, u = 0, c = t.length, h = c - 1, p = e[0], g = pt.isFunction(p);
            if (g || c > 1 && "string" == typeof p && !ct.checkClone && ie.test(p)) return t.each(function (r) {
                var o = t.eq(r);
                g && (e[0] = p.call(this, r, o.html())), D(o, e, n, i)
            });
            if (c && (l = m(e, t[0].ownerDocument, !1, t, i), r = l.firstChild, 1 === l.childNodes.length && (l = r), r || i)) {
                for (s = pt.map(f(l, "script"), x), a = s.length; u < c; u++) o = l, u !== h && (o = pt.clone(o, !0, !0), a && pt.merge(s, f(o, "script"))), n.call(t[u], o, u);
                if (a) for (d = s[s.length - 1].ownerDocument, pt.map(s, S), u = 0; u < a; u++) o = s[u], Qt.test(o.type || "") && !pt._data(o, "globalEval") && pt.contains(d, o) && (o.src ? pt._evalUrl && pt._evalUrl(o.src) : pt.globalEval((o.text || o.textContent || o.innerHTML || "").replace(oe, "")));
                l = r = null
            }
            return t
        }

        function _(t, e, n) {
            for (var i, r = e ? pt.filter(e, t) : t, o = 0; null != (i = r[o]); o++) n || 1 !== i.nodeType || pt.cleanData(f(i)), i.parentNode && (n && pt.contains(i.ownerDocument, i) && g(f(i, "script")), i.parentNode.removeChild(i));
            return t
        }

        function I(t, e) {
            var n = pt(e.createElement(t)).appendTo(e.body), i = pt.css(n[0], "display");
            return n.detach(), i
        }

        function A(t) {
            var e = it, n = le[t];
            return n || (n = I(t, e), "none" !== n && n || (de = (de || pt("<iframe frameborder='0' width='0' height='0'/>")).appendTo(e.documentElement), e = (de[0].contentWindow || de[0].contentDocument).document, e.write(), e.close(), n = I(t, e), de.detach()), le[t] = n), n
        }

        function j(t, e) {
            return {
                get: function () {
                    return t() ? void delete this.get : (this.get = e).apply(this, arguments)
                }
            }
        }

        function L(t) {
            if (t in Se) return t;
            for (var e = t.charAt(0).toUpperCase() + t.slice(1), n = xe.length; n--;) if (t = xe[n] + e, t in Se) return t
        }

        function N(t, e) {
            for (var n, i, r, o = [], a = 0, s = t.length; a < s; a++) i = t[a], i.style && (o[a] = pt._data(i, "olddisplay"), n = i.style.display, e ? (o[a] || "none" !== n || (i.style.display = ""), "" === i.style.display && Ot(i) && (o[a] = pt._data(i, "olddisplay", A(i.nodeName)))) : (r = Ot(i), (n && "none" !== n || !r) && pt._data(i, "olddisplay", r ? n : pt.css(i, "display"))));
            for (a = 0; a < s; a++) i = t[a], i.style && (e && "none" !== i.style.display && "" !== i.style.display || (i.style.display = e ? o[a] || "" : "none"));
            return t
        }

        function E(t, e, n) {
            var i = be.exec(e);
            return i ? Math.max(0, i[1] - (n || 0)) + (i[2] || "px") : e
        }

        function P(t, e, n, i, r) {
            for (var o = n === (i ? "border" : "content") ? 4 : "width" === e ? 1 : 0, a = 0; o < 4; o += 2) "margin" === n && (a += pt.css(t, n + Rt[o], !0, r)), i ? ("content" === n && (a -= pt.css(t, "padding" + Rt[o], !0, r)), "margin" !== n && (a -= pt.css(t, "border" + Rt[o] + "Width", !0, r))) : (a += pt.css(t, "padding" + Rt[o], !0, r), "padding" !== n && (a += pt.css(t, "border" + Rt[o] + "Width", !0, r)));
            return a
        }

        function M(t, e, n) {
            var i = !0, r = "width" === e ? t.offsetWidth : t.offsetHeight, o = fe(t),
                a = ct.boxSizing && "border-box" === pt.css(t, "boxSizing", !1, o);
            if (r <= 0 || null == r) {
                if (r = ge(t, e, o), (r < 0 || null == r) && (r = t.style[e]), ce.test(r)) return r;
                i = a && (ct.boxSizingReliable() || r === t.style[e]), r = parseFloat(r) || 0
            }
            return r + P(t, e, n || (a ? "border" : "content"), i, o) + "px"
        }

        function R(t, e, n, i, r) {
            return new R.prototype.init(t, e, n, i, r)
        }

        function O() {
            return t.setTimeout(function () {
                Te = void 0
            }), Te = pt.now()
        }

        function H(t, e) {
            var n, i = {height: t}, r = 0;
            for (e = e ? 1 : 0; r < 4; r += 2 - e) n = Rt[r], i["margin" + n] = i["padding" + n] = t;
            return e && (i.opacity = i.width = t), i
        }

        function F(t, e, n) {
            for (var i, r = (U.tweeners[e] || []).concat(U.tweeners["*"]), o = 0, a = r.length; o < a; o++) if (i = r[o].call(n, e, t)) return i
        }

        function B(t, e, n) {
            var i, r, o, a, s, d, l, u, c = this, h = {}, p = t.style, f = t.nodeType && Ot(t),
                g = pt._data(t, "fxshow");
            n.queue || (s = pt._queueHooks(t, "fx"), null == s.unqueued && (s.unqueued = 0, d = s.empty.fire, s.empty.fire = function () {
                s.unqueued || d()
            }), s.unqueued++, c.always(function () {
                c.always(function () {
                    s.unqueued--, pt.queue(t, "fx").length || s.empty.fire()
                })
            })), 1 === t.nodeType && ("height" in e || "width" in e) && (n.overflow = [p.overflow, p.overflowX, p.overflowY], l = pt.css(t, "display"), u = "none" === l ? pt._data(t, "olddisplay") || A(t.nodeName) : l, "inline" === u && "none" === pt.css(t, "float") && (ct.inlineBlockNeedsLayout && "inline" !== A(t.nodeName) ? p.zoom = 1 : p.display = "inline-block")), n.overflow && (p.overflow = "hidden", ct.shrinkWrapBlocks() || c.always(function () {
                p.overflow = n.overflow[0], p.overflowX = n.overflow[1], p.overflowY = n.overflow[2]
            }));
            for (i in e) if (r = e[i], De.exec(r)) {
                if (delete e[i], o = o || "toggle" === r, r === (f ? "hide" : "show")) {
                    if ("show" !== r || !g || void 0 === g[i]) continue;
                    f = !0
                }
                h[i] = g && g[i] || pt.style(t, i)
            } else l = void 0;
            if (pt.isEmptyObject(h)) "inline" === ("none" === l ? A(t.nodeName) : l) && (p.display = l); else {
                g ? "hidden" in g && (f = g.hidden) : g = pt._data(t, "fxshow", {}), o && (g.hidden = !f), f ? pt(t).show() : c.done(function () {
                    pt(t).hide()
                }), c.done(function () {
                    var e;
                    pt._removeData(t, "fxshow");
                    for (e in h) pt.style(t, e, h[e])
                });
                for (i in h) a = F(f ? g[i] : 0, i, c), i in g || (g[i] = a.start, f && (a.end = a.start, a.start = "width" === i || "height" === i ? 1 : 0))
            }
        }

        function Q(t, e) {
            var n, i, r, o, a;
            for (n in t) if (i = pt.camelCase(n), r = e[i], o = t[n], pt.isArray(o) && (r = o[1], o = t[n] = o[0]), n !== i && (t[i] = o, delete t[n]), a = pt.cssHooks[i], a && "expand" in a) {
                o = a.expand(o), delete t[i];
                for (n in o) n in t || (t[n] = o[n], e[n] = r)
            } else e[i] = r
        }

        function U(t, e, n) {
            var i, r, o = 0, a = U.prefilters.length, s = pt.Deferred().always(function () {
                delete d.elem
            }), d = function () {
                if (r) return !1;
                for (var e = Te || O(), n = Math.max(0, l.startTime + l.duration - e), i = n / l.duration || 0, o = 1 - i, a = 0, d = l.tweens.length; a < d; a++) l.tweens[a].run(o);
                return s.notifyWith(t, [l, o, n]), o < 1 && d ? n : (s.resolveWith(t, [l]), !1)
            }, l = s.promise({
                elem: t,
                props: pt.extend({}, e),
                opts: pt.extend(!0, {specialEasing: {}, easing: pt.easing._default}, n),
                originalProperties: e,
                originalOptions: n,
                startTime: Te || O(),
                duration: n.duration,
                tweens: [],
                createTween: function (e, n) {
                    var i = pt.Tween(t, l.opts, e, n, l.opts.specialEasing[e] || l.opts.easing);
                    return l.tweens.push(i), i
                },
                stop: function (e) {
                    var n = 0, i = e ? l.tweens.length : 0;
                    if (r) return this;
                    for (r = !0; n < i; n++) l.tweens[n].run(1);
                    return e ? (s.notifyWith(t, [l, 1, 0]), s.resolveWith(t, [l, e])) : s.rejectWith(t, [l, e]), this
                }
            }), u = l.props;
            for (Q(u, l.opts.specialEasing); o < a; o++) if (i = U.prefilters[o].call(l, t, u, l.opts)) return pt.isFunction(i.stop) && (pt._queueHooks(l.elem, l.opts.queue).stop = pt.proxy(i.stop, i)), i;
            return pt.map(u, F, l), pt.isFunction(l.opts.start) && l.opts.start.call(t, l), pt.fx.timer(pt.extend(d, {
                elem: t,
                anim: l,
                queue: l.opts.queue
            })), l.progress(l.opts.progress).done(l.opts.done, l.opts.complete).fail(l.opts.fail).always(l.opts.always)
        }

        function W(t) {
            return pt.attr(t, "class") || ""
        }

        function z(t) {
            return function (e, n) {
                "string" != typeof e && (n = e, e = "*");
                var i, r = 0, o = e.toLowerCase().match(It) || [];
                if (pt.isFunction(n)) for (; i = o[r++];) "+" === i.charAt(0) ? (i = i.slice(1) || "*", (t[i] = t[i] || []).unshift(n)) : (t[i] = t[i] || []).push(n)
            }
        }

        function q(t, e, n, i) {
            function r(s) {
                var d;
                return o[s] = !0, pt.each(t[s] || [], function (t, s) {
                    var l = s(e, n, i);
                    return "string" != typeof l || a || o[l] ? a ? !(d = l) : void 0 : (e.dataTypes.unshift(l), r(l), !1)
                }), d
            }

            var o = {}, a = t === Ye;
            return r(e.dataTypes[0]) || !o["*"] && r("*")
        }

        function V(t, e) {
            var n, i, r = pt.ajaxSettings.flatOptions || {};
            for (i in e) void 0 !== e[i] && ((r[i] ? t : n || (n = {}))[i] = e[i]);
            return n && pt.extend(!0, t, n), t
        }

        function G(t, e, n) {
            for (var i, r, o, a, s = t.contents, d = t.dataTypes; "*" === d[0];) d.shift(), void 0 === r && (r = t.mimeType || e.getResponseHeader("Content-Type"));
            if (r) for (a in s) if (s[a] && s[a].test(r)) {
                d.unshift(a);
                break
            }
            if (d[0] in n) o = d[0]; else {
                for (a in n) {
                    if (!d[0] || t.converters[a + " " + d[0]]) {
                        o = a;
                        break
                    }
                    i || (i = a)
                }
                o = o || i
            }
            if (o) return o !== d[0] && d.unshift(o), n[o]
        }

        function K(t, e, n, i) {
            var r, o, a, s, d, l = {}, u = t.dataTypes.slice();
            if (u[1]) for (a in t.converters) l[a.toLowerCase()] = t.converters[a];
            for (o = u.shift(); o;) if (t.responseFields[o] && (n[t.responseFields[o]] = e), !d && i && t.dataFilter && (e = t.dataFilter(e, t.dataType)), d = o, o = u.shift()) if ("*" === o) o = d; else if ("*" !== d && d !== o) {
                if (a = l[d + " " + o] || l["* " + o], !a) for (r in l) if (s = r.split(" "), s[1] === o && (a = l[d + " " + s[0]] || l["* " + s[0]])) {
                    a === !0 ? a = l[r] : l[r] !== !0 && (o = s[0], u.unshift(s[1]));
                    break
                }
                if (a !== !0) if (a && t.throws) e = a(e); else try {
                    e = a(e)
                } catch (t) {
                    return {state: "parsererror", error: a ? t : "No conversion from " + d + " to " + o}
                }
            }
            return {state: "success", data: e}
        }

        function J(t) {
            return t.style && t.style.display || pt.css(t, "display")
        }

        function X(t) {
            if (!pt.contains(t.ownerDocument || it, t)) return !0;
            for (; t && 1 === t.nodeType;) {
                if ("none" === J(t) || "hidden" === t.type) return !0;
                t = t.parentNode
            }
            return !1
        }

        function Y(t, e, n, i) {
            var r;
            if (pt.isArray(e)) pt.each(e, function (e, r) {
                n || rn.test(t) ? i(t, r) : Y(t + "[" + ("object" == typeof r && null != r ? e : "") + "]", r, n, i)
            }); else if (n || "object" !== pt.type(e)) i(t, e); else for (r in e) Y(t + "[" + r + "]", e[r], n, i)
        }

        function Z() {
            try {
                return new t.XMLHttpRequest
            } catch (t) {
            }
        }

        function tt() {
            try {
                return new t.ActiveXObject("Microsoft.XMLHTTP")
            } catch (t) {
            }
        }

        function et(t) {
            return pt.isWindow(t) ? t : 9 === t.nodeType && (t.defaultView || t.parentWindow)
        }

        var nt = [], it = t.document, rt = nt.slice, ot = nt.concat, at = nt.push, st = nt.indexOf, dt = {},
            lt = dt.toString, ut = dt.hasOwnProperty, ct = {}, ht = "1.12.4", pt = function (t, e) {
                return new pt.fn.init(t, e)
            }, ft = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, gt = /^-ms-/, $t = /-([\da-z])/gi, mt = function (t, e) {
                return e.toUpperCase()
            };
        pt.fn = pt.prototype = {
            jquery: ht, constructor: pt, selector: "", length: 0, toArray: function () {
                return rt.call(this)
            }, get: function (t) {
                return null != t ? t < 0 ? this[t + this.length] : this[t] : rt.call(this)
            }, pushStack: function (t) {
                var e = pt.merge(this.constructor(), t);
                return e.prevObject = this, e.context = this.context, e
            }, each: function (t) {
                return pt.each(this, t)
            }, map: function (t) {
                return this.pushStack(pt.map(this, function (e, n) {
                    return t.call(e, n, e)
                }))
            }, slice: function () {
                return this.pushStack(rt.apply(this, arguments))
            }, first: function () {
                return this.eq(0)
            }, last: function () {
                return this.eq(-1)
            }, eq: function (t) {
                var e = this.length, n = +t + (t < 0 ? e : 0);
                return this.pushStack(n >= 0 && n < e ? [this[n]] : [])
            }, end: function () {
                return this.prevObject || this.constructor()
            }, push: at, sort: nt.sort, splice: nt.splice
        }, pt.extend = pt.fn.extend = function () {
            var t, e, n, i, r, o, a = arguments[0] || {}, s = 1, d = arguments.length, l = !1;
            for ("boolean" == typeof a && (l = a, a = arguments[s] || {}, s++), "object" == typeof a || pt.isFunction(a) || (a = {}), s === d && (a = this, s--); s < d; s++) if (null != (r = arguments[s])) for (i in r) t = a[i], n = r[i], a !== n && (l && n && (pt.isPlainObject(n) || (e = pt.isArray(n))) ? (e ? (e = !1, o = t && pt.isArray(t) ? t : []) : o = t && pt.isPlainObject(t) ? t : {}, a[i] = pt.extend(l, o, n)) : void 0 !== n && (a[i] = n));
            return a
        }, pt.extend({
            expando: "jQuery" + (ht + Math.random()).replace(/\D/g, ""), isReady: !0, error: function (t) {
                throw new Error(t)
            }, noop: function () {
            }, isFunction: function (t) {
                return "function" === pt.type(t)
            }, isArray: Array.isArray || function (t) {
                return "array" === pt.type(t)
            }, isWindow: function (t) {
                return null != t && t == t.window
            }, isNumeric: function (t) {
                var e = t && t.toString();
                return !pt.isArray(t) && e - parseFloat(e) + 1 >= 0
            }, isEmptyObject: function (t) {
                var e;
                for (e in t) return !1;
                return !0
            }, isPlainObject: function (t) {
                var e;
                if (!t || "object" !== pt.type(t) || t.nodeType || pt.isWindow(t)) return !1;
                try {
                    if (t.constructor && !ut.call(t, "constructor") && !ut.call(t.constructor.prototype, "isPrototypeOf")) return !1
                } catch (t) {
                    return !1
                }
                if (!ct.ownFirst) for (e in t) return ut.call(t, e);
                for (e in t) ;
                return void 0 === e || ut.call(t, e)
            }, type: function (t) {
                return null == t ? t + "" : "object" == typeof t || "function" == typeof t ? dt[lt.call(t)] || "object" : typeof t
            }, globalEval: function (e) {
                e && pt.trim(e) && (t.execScript || function (e) {
                    t.eval.call(t, e)
                })(e)
            }, camelCase: function (t) {
                return t.replace(gt, "ms-").replace($t, mt)
            }, nodeName: function (t, e) {
                return t.nodeName && t.nodeName.toLowerCase() === e.toLowerCase()
            }, each: function (t, e) {
                var i, r = 0;
                if (n(t)) for (i = t.length; r < i && e.call(t[r], r, t[r]) !== !1; r++) ; else for (r in t) if (e.call(t[r], r, t[r]) === !1) break;
                return t
            }, trim: function (t) {
                return null == t ? "" : (t + "").replace(ft, "")
            }, makeArray: function (t, e) {
                var i = e || [];
                return null != t && (n(Object(t)) ? pt.merge(i, "string" == typeof t ? [t] : t) : at.call(i, t)), i
            }, inArray: function (t, e, n) {
                var i;
                if (e) {
                    if (st) return st.call(e, t, n);
                    for (i = e.length, n = n ? n < 0 ? Math.max(0, i + n) : n : 0; n < i; n++) if (n in e && e[n] === t) return n
                }
                return -1
            }, merge: function (t, e) {
                for (var n = +e.length, i = 0, r = t.length; i < n;) t[r++] = e[i++];
                if (n !== n) for (; void 0 !== e[i];) t[r++] = e[i++];
                return t.length = r, t
            }, grep: function (t, e, n) {
                for (var i, r = [], o = 0, a = t.length, s = !n; o < a; o++) i = !e(t[o], o), i !== s && r.push(t[o]);
                return r
            }, map: function (t, e, i) {
                var r, o, a = 0, s = [];
                if (n(t)) for (r = t.length; a < r; a++) o = e(t[a], a, i), null != o && s.push(o); else for (a in t) o = e(t[a], a, i), null != o && s.push(o);
                return ot.apply([], s)
            }, guid: 1, proxy: function (t, e) {
                var n, i, r;
                if ("string" == typeof e && (r = t[e], e = t, t = r), pt.isFunction(t)) return n = rt.call(arguments, 2), i = function () {
                    return t.apply(e || this, n.concat(rt.call(arguments)))
                }, i.guid = t.guid = t.guid || pt.guid++, i
            }, now: function () {
                return +new Date
            }, support: ct
        }), "function" == typeof Symbol && (pt.fn[Symbol.iterator] = nt[Symbol.iterator]), pt.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function (t, e) {
            dt["[object " + e + "]"] = e.toLowerCase()
        });
        var vt = function (t) {
            function e(t, e, n, i) {
                var r, o, a, s, d, l, c, p, f = e && e.ownerDocument, g = e ? e.nodeType : 9;
                if (n = n || [], "string" != typeof t || !t || 1 !== g && 9 !== g && 11 !== g) return n;
                if (!i && ((e ? e.ownerDocument || e : F) !== L && j(e), e = e || L, E)) {
                    if (11 !== g && (l = mt.exec(t))) if (r = l[1]) {
                        if (9 === g) {
                            if (!(a = e.getElementById(r))) return n;
                            if (a.id === r) return n.push(a), n
                        } else if (f && (a = f.getElementById(r)) && O(e, a) && a.id === r) return n.push(a), n
                    } else {
                        if (l[2]) return Y.apply(n, e.getElementsByTagName(t)), n;
                        if ((r = l[3]) && C.getElementsByClassName && e.getElementsByClassName) return Y.apply(n, e.getElementsByClassName(r)), n
                    }
                    if (C.qsa && !z[t + " "] && (!P || !P.test(t))) {
                        if (1 !== g) f = e, p = t; else if ("object" !== e.nodeName.toLowerCase()) {
                            for ((s = e.getAttribute("id")) ? s = s.replace(yt, "\\$&") : e.setAttribute("id", s = H), c = T(t), o = c.length, d = ht.test(s) ? "#" + s : "[id='" + s + "']"; o--;) c[o] = d + " " + h(c[o]);
                            p = c.join(","), f = vt.test(t) && u(e.parentNode) || e
                        }
                        if (p) try {
                            return Y.apply(n, f.querySelectorAll(p)), n
                        } catch (t) {
                        } finally {
                            s === H && e.removeAttribute("id")
                        }
                    }
                }
                return D(t.replace(st, "$1"), e, n, i)
            }

            function n() {
                function t(n, i) {
                    return e.push(n + " ") > w.cacheLength && delete t[e.shift()], t[n + " "] = i
                }

                var e = [];
                return t
            }

            function i(t) {
                return t[H] = !0, t
            }

            function r(t) {
                var e = L.createElement("div");
                try {
                    return !!t(e)
                } catch (t) {
                    return !1
                } finally {
                    e.parentNode && e.parentNode.removeChild(e), e = null
                }
            }

            function o(t, e) {
                for (var n = t.split("|"), i = n.length; i--;) w.attrHandle[n[i]] = e
            }

            function a(t, e) {
                var n = e && t,
                    i = n && 1 === t.nodeType && 1 === e.nodeType && (~e.sourceIndex || V) - (~t.sourceIndex || V);
                if (i) return i;
                if (n) for (; n = n.nextSibling;) if (n === e) return -1;
                return t ? 1 : -1
            }

            function s(t) {
                return function (e) {
                    var n = e.nodeName.toLowerCase();
                    return "input" === n && e.type === t
                }
            }

            function d(t) {
                return function (e) {
                    var n = e.nodeName.toLowerCase();
                    return ("input" === n || "button" === n) && e.type === t
                }
            }

            function l(t) {
                return i(function (e) {
                    return e = +e, i(function (n, i) {
                        for (var r, o = t([], n.length, e), a = o.length; a--;) n[r = o[a]] && (n[r] = !(i[r] = n[r]))
                    })
                })
            }

            function u(t) {
                return t && "undefined" != typeof t.getElementsByTagName && t
            }

            function c() {
            }

            function h(t) {
                for (var e = 0, n = t.length, i = ""; e < n; e++) i += t[e].value;
                return i
            }

            function p(t, e, n) {
                var i = e.dir, r = n && "parentNode" === i, o = Q++;
                return e.first ? function (e, n, o) {
                    for (; e = e[i];) if (1 === e.nodeType || r) return t(e, n, o)
                } : function (e, n, a) {
                    var s, d, l, u = [B, o];
                    if (a) {
                        for (; e = e[i];) if ((1 === e.nodeType || r) && t(e, n, a)) return !0
                    } else for (; e = e[i];) if (1 === e.nodeType || r) {
                        if (l = e[H] || (e[H] = {}), d = l[e.uniqueID] || (l[e.uniqueID] = {}), (s = d[i]) && s[0] === B && s[1] === o) return u[2] = s[2];
                        if (d[i] = u, u[2] = t(e, n, a)) return !0
                    }
                }
            }

            function f(t) {
                return t.length > 1 ? function (e, n, i) {
                    for (var r = t.length; r--;) if (!t[r](e, n, i)) return !1;
                    return !0
                } : t[0]
            }

            function g(t, n, i) {
                for (var r = 0, o = n.length; r < o; r++) e(t, n[r], i);
                return i
            }

            function $(t, e, n, i, r) {
                for (var o, a = [], s = 0, d = t.length, l = null != e; s < d; s++) (o = t[s]) && (n && !n(o, i, r) || (a.push(o), l && e.push(s)));
                return a
            }

            function m(t, e, n, r, o, a) {
                return r && !r[H] && (r = m(r)), o && !o[H] && (o = m(o, a)), i(function (i, a, s, d) {
                    var l, u, c, h = [], p = [], f = a.length, m = i || g(e || "*", s.nodeType ? [s] : s, []),
                        v = !t || !i && e ? m : $(m, h, t, s, d), y = n ? o || (i ? t : f || r) ? [] : a : v;
                    if (n && n(v, y, s, d), r) for (l = $(y, p), r(l, [], s, d), u = l.length; u--;) (c = l[u]) && (y[p[u]] = !(v[p[u]] = c));
                    if (i) {
                        if (o || t) {
                            if (o) {
                                for (l = [], u = y.length; u--;) (c = y[u]) && l.push(v[u] = c);
                                o(null, y = [], l, d)
                            }
                            for (u = y.length; u--;) (c = y[u]) && (l = o ? tt(i, c) : h[u]) > -1 && (i[l] = !(a[l] = c))
                        }
                    } else y = $(y === a ? y.splice(f, y.length) : y), o ? o(null, a, y, d) : Y.apply(a, y)
                })
            }

            function v(t) {
                for (var e, n, i, r = t.length, o = w.relative[t[0].type], a = o || w.relative[" "], s = o ? 1 : 0, d = p(function (t) {
                    return t === e
                }, a, !0), l = p(function (t) {
                    return tt(e, t) > -1
                }, a, !0), u = [function (t, n, i) {
                    var r = !o && (i || n !== _) || ((e = n).nodeType ? d(t, n, i) : l(t, n, i));
                    return e = null, r
                }]; s < r; s++) if (n = w.relative[t[s].type]) u = [p(f(u), n)]; else {
                    if (n = w.filter[t[s].type].apply(null, t[s].matches), n[H]) {
                        for (i = ++s; i < r && !w.relative[t[i].type]; i++) ;
                        return m(s > 1 && f(u), s > 1 && h(t.slice(0, s - 1).concat({value: " " === t[s - 2].type ? "*" : ""})).replace(st, "$1"), n, s < i && v(t.slice(s, i)), i < r && v(t = t.slice(i)), i < r && h(t))
                    }
                    u.push(n)
                }
                return f(u)
            }

            function y(t, n) {
                var r = n.length > 0, o = t.length > 0, a = function (i, a, s, d, l) {
                    var u, c, h, p = 0, f = "0", g = i && [], m = [], v = _, y = i || o && w.find.TAG("*", l),
                        b = B += null == v ? 1 : Math.random() || .1, C = y.length;
                    for (l && (_ = a === L || a || l); f !== C && null != (u = y[f]); f++) {
                        if (o && u) {
                            for (c = 0, a || u.ownerDocument === L || (j(u), s = !E); h = t[c++];) if (h(u, a || L, s)) {
                                d.push(u);
                                break
                            }
                            l && (B = b)
                        }
                        r && ((u = !h && u) && p--, i && g.push(u))
                    }
                    if (p += f, r && f !== p) {
                        for (c = 0; h = n[c++];) h(g, m, a, s);
                        if (i) {
                            if (p > 0) for (; f--;) g[f] || m[f] || (m[f] = J.call(d));
                            m = $(m)
                        }
                        Y.apply(d, m), l && !i && m.length > 0 && p + n.length > 1 && e.uniqueSort(d)
                    }
                    return l && (B = b, _ = v), g
                };
                return r ? i(a) : a
            }

            var b, C, w, x, S, T, k, D, _, I, A, j, L, N, E, P, M, R, O, H = "sizzle" + 1 * new Date, F = t.document,
                B = 0, Q = 0, U = n(), W = n(), z = n(), q = function (t, e) {
                    return t === e && (A = !0), 0
                }, V = 1 << 31, G = {}.hasOwnProperty, K = [], J = K.pop, X = K.push, Y = K.push, Z = K.slice,
                tt = function (t, e) {
                    for (var n = 0, i = t.length; n < i; n++) if (t[n] === e) return n;
                    return -1
                },
                et = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
                nt = "[\\x20\\t\\r\\n\\f]", it = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
                rt = "\\[" + nt + "*(" + it + ")(?:" + nt + "*([*^$|!~]?=)" + nt + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + it + "))|)" + nt + "*\\]",
                ot = ":(" + it + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + rt + ")*)|.*)\\)|)",
                at = new RegExp(nt + "+", "g"),
                st = new RegExp("^" + nt + "+|((?:^|[^\\\\])(?:\\\\.)*)" + nt + "+$", "g"),
                dt = new RegExp("^" + nt + "*," + nt + "*"),
                lt = new RegExp("^" + nt + "*([>+~]|" + nt + ")" + nt + "*"),
                ut = new RegExp("=" + nt + "*([^\\]'\"]*?)" + nt + "*\\]", "g"), ct = new RegExp(ot),
                ht = new RegExp("^" + it + "$"), pt = {
                    ID: new RegExp("^#(" + it + ")"),
                    CLASS: new RegExp("^\\.(" + it + ")"),
                    TAG: new RegExp("^(" + it + "|[*])"),
                    ATTR: new RegExp("^" + rt),
                    PSEUDO: new RegExp("^" + ot),
                    CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + nt + "*(even|odd|(([+-]|)(\\d*)n|)" + nt + "*(?:([+-]|)" + nt + "*(\\d+)|))" + nt + "*\\)|)", "i"),
                    bool: new RegExp("^(?:" + et + ")$", "i"),
                    needsContext: new RegExp("^" + nt + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + nt + "*((?:-\\d)?\\d*)" + nt + "*\\)|)(?=[^-]|$)", "i")
                }, ft = /^(?:input|select|textarea|button)$/i, gt = /^h\d$/i, $t = /^[^{]+\{\s*\[native \w/,
                mt = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, vt = /[+~]/, yt = /'|\\/g,
                bt = new RegExp("\\\\([\\da-f]{1,6}" + nt + "?|(" + nt + ")|.)", "ig"), Ct = function (t, e, n) {
                    var i = "0x" + e - 65536;
                    return i !== i || n ? e : i < 0 ? String.fromCharCode(i + 65536) : String.fromCharCode(i >> 10 | 55296, 1023 & i | 56320);
                }, wt = function () {
                    j()
                };
            try {
                Y.apply(K = Z.call(F.childNodes), F.childNodes), K[F.childNodes.length].nodeType
            } catch (t) {
                Y = {
                    apply: K.length ? function (t, e) {
                        X.apply(t, Z.call(e))
                    } : function (t, e) {
                        for (var n = t.length, i = 0; t[n++] = e[i++];) ;
                        t.length = n - 1
                    }
                }
            }
            C = e.support = {}, S = e.isXML = function (t) {
                var e = t && (t.ownerDocument || t).documentElement;
                return !!e && "HTML" !== e.nodeName
            }, j = e.setDocument = function (t) {
                var e, n, i = t ? t.ownerDocument || t : F;
                return i !== L && 9 === i.nodeType && i.documentElement ? (L = i, N = L.documentElement, E = !S(L), (n = L.defaultView) && n.top !== n && (n.addEventListener ? n.addEventListener("unload", wt, !1) : n.attachEvent && n.attachEvent("onunload", wt)), C.attributes = r(function (t) {
                    return t.className = "i", !t.getAttribute("className")
                }), C.getElementsByTagName = r(function (t) {
                    return t.appendChild(L.createComment("")), !t.getElementsByTagName("*").length
                }), C.getElementsByClassName = $t.test(L.getElementsByClassName), C.getById = r(function (t) {
                    return N.appendChild(t).id = H, !L.getElementsByName || !L.getElementsByName(H).length
                }), C.getById ? (w.find.ID = function (t, e) {
                    if ("undefined" != typeof e.getElementById && E) {
                        var n = e.getElementById(t);
                        return n ? [n] : []
                    }
                }, w.filter.ID = function (t) {
                    var e = t.replace(bt, Ct);
                    return function (t) {
                        return t.getAttribute("id") === e
                    }
                }) : (delete w.find.ID, w.filter.ID = function (t) {
                    var e = t.replace(bt, Ct);
                    return function (t) {
                        var n = "undefined" != typeof t.getAttributeNode && t.getAttributeNode("id");
                        return n && n.value === e
                    }
                }), w.find.TAG = C.getElementsByTagName ? function (t, e) {
                    return "undefined" != typeof e.getElementsByTagName ? e.getElementsByTagName(t) : C.qsa ? e.querySelectorAll(t) : void 0
                } : function (t, e) {
                    var n, i = [], r = 0, o = e.getElementsByTagName(t);
                    if ("*" === t) {
                        for (; n = o[r++];) 1 === n.nodeType && i.push(n);
                        return i
                    }
                    return o
                }, w.find.CLASS = C.getElementsByClassName && function (t, e) {
                    if ("undefined" != typeof e.getElementsByClassName && E) return e.getElementsByClassName(t)
                }, M = [], P = [], (C.qsa = $t.test(L.querySelectorAll)) && (r(function (t) {
                    N.appendChild(t).innerHTML = "<a id='" + H + "'></a><select id='" + H + "-\r\\' msallowcapture=''><option selected=''></option></select>", t.querySelectorAll("[msallowcapture^='']").length && P.push("[*^$]=" + nt + "*(?:''|\"\")"), t.querySelectorAll("[selected]").length || P.push("\\[" + nt + "*(?:value|" + et + ")"), t.querySelectorAll("[id~=" + H + "-]").length || P.push("~="), t.querySelectorAll(":checked").length || P.push(":checked"), t.querySelectorAll("a#" + H + "+*").length || P.push(".#.+[+~]")
                }), r(function (t) {
                    var e = L.createElement("input");
                    e.setAttribute("type", "hidden"), t.appendChild(e).setAttribute("name", "D"), t.querySelectorAll("[name=d]").length && P.push("name" + nt + "*[*^$|!~]?="), t.querySelectorAll(":enabled").length || P.push(":enabled", ":disabled"), t.querySelectorAll("*,:x"), P.push(",.*:")
                })), (C.matchesSelector = $t.test(R = N.matches || N.webkitMatchesSelector || N.mozMatchesSelector || N.oMatchesSelector || N.msMatchesSelector)) && r(function (t) {
                    C.disconnectedMatch = R.call(t, "div"), R.call(t, "[s!='']:x"), M.push("!=", ot)
                }), P = P.length && new RegExp(P.join("|")), M = M.length && new RegExp(M.join("|")), e = $t.test(N.compareDocumentPosition), O = e || $t.test(N.contains) ? function (t, e) {
                    var n = 9 === t.nodeType ? t.documentElement : t, i = e && e.parentNode;
                    return t === i || !(!i || 1 !== i.nodeType || !(n.contains ? n.contains(i) : t.compareDocumentPosition && 16 & t.compareDocumentPosition(i)))
                } : function (t, e) {
                    if (e) for (; e = e.parentNode;) if (e === t) return !0;
                    return !1
                }, q = e ? function (t, e) {
                    if (t === e) return A = !0, 0;
                    var n = !t.compareDocumentPosition - !e.compareDocumentPosition;
                    return n ? n : (n = (t.ownerDocument || t) === (e.ownerDocument || e) ? t.compareDocumentPosition(e) : 1, 1 & n || !C.sortDetached && e.compareDocumentPosition(t) === n ? t === L || t.ownerDocument === F && O(F, t) ? -1 : e === L || e.ownerDocument === F && O(F, e) ? 1 : I ? tt(I, t) - tt(I, e) : 0 : 4 & n ? -1 : 1)
                } : function (t, e) {
                    if (t === e) return A = !0, 0;
                    var n, i = 0, r = t.parentNode, o = e.parentNode, s = [t], d = [e];
                    if (!r || !o) return t === L ? -1 : e === L ? 1 : r ? -1 : o ? 1 : I ? tt(I, t) - tt(I, e) : 0;
                    if (r === o) return a(t, e);
                    for (n = t; n = n.parentNode;) s.unshift(n);
                    for (n = e; n = n.parentNode;) d.unshift(n);
                    for (; s[i] === d[i];) i++;
                    return i ? a(s[i], d[i]) : s[i] === F ? -1 : d[i] === F ? 1 : 0
                }, L) : L
            }, e.matches = function (t, n) {
                return e(t, null, null, n)
            }, e.matchesSelector = function (t, n) {
                if ((t.ownerDocument || t) !== L && j(t), n = n.replace(ut, "='$1']"), C.matchesSelector && E && !z[n + " "] && (!M || !M.test(n)) && (!P || !P.test(n))) try {
                    var i = R.call(t, n);
                    if (i || C.disconnectedMatch || t.document && 11 !== t.document.nodeType) return i
                } catch (t) {
                }
                return e(n, L, null, [t]).length > 0
            }, e.contains = function (t, e) {
                return (t.ownerDocument || t) !== L && j(t), O(t, e)
            }, e.attr = function (t, e) {
                (t.ownerDocument || t) !== L && j(t);
                var n = w.attrHandle[e.toLowerCase()],
                    i = n && G.call(w.attrHandle, e.toLowerCase()) ? n(t, e, !E) : void 0;
                return void 0 !== i ? i : C.attributes || !E ? t.getAttribute(e) : (i = t.getAttributeNode(e)) && i.specified ? i.value : null
            }, e.error = function (t) {
                throw new Error("Syntax error, unrecognized expression: " + t)
            }, e.uniqueSort = function (t) {
                var e, n = [], i = 0, r = 0;
                if (A = !C.detectDuplicates, I = !C.sortStable && t.slice(0), t.sort(q), A) {
                    for (; e = t[r++];) e === t[r] && (i = n.push(r));
                    for (; i--;) t.splice(n[i], 1)
                }
                return I = null, t
            }, x = e.getText = function (t) {
                var e, n = "", i = 0, r = t.nodeType;
                if (r) {
                    if (1 === r || 9 === r || 11 === r) {
                        if ("string" == typeof t.textContent) return t.textContent;
                        for (t = t.firstChild; t; t = t.nextSibling) n += x(t)
                    } else if (3 === r || 4 === r) return t.nodeValue
                } else for (; e = t[i++];) n += x(e);
                return n
            }, w = e.selectors = {
                cacheLength: 50,
                createPseudo: i,
                match: pt,
                attrHandle: {},
                find: {},
                relative: {
                    ">": {dir: "parentNode", first: !0},
                    " ": {dir: "parentNode"},
                    "+": {dir: "previousSibling", first: !0},
                    "~": {dir: "previousSibling"}
                },
                preFilter: {
                    ATTR: function (t) {
                        return t[1] = t[1].replace(bt, Ct), t[3] = (t[3] || t[4] || t[5] || "").replace(bt, Ct), "~=" === t[2] && (t[3] = " " + t[3] + " "), t.slice(0, 4)
                    }, CHILD: function (t) {
                        return t[1] = t[1].toLowerCase(), "nth" === t[1].slice(0, 3) ? (t[3] || e.error(t[0]), t[4] = +(t[4] ? t[5] + (t[6] || 1) : 2 * ("even" === t[3] || "odd" === t[3])), t[5] = +(t[7] + t[8] || "odd" === t[3])) : t[3] && e.error(t[0]), t
                    }, PSEUDO: function (t) {
                        var e, n = !t[6] && t[2];
                        return pt.CHILD.test(t[0]) ? null : (t[3] ? t[2] = t[4] || t[5] || "" : n && ct.test(n) && (e = T(n, !0)) && (e = n.indexOf(")", n.length - e) - n.length) && (t[0] = t[0].slice(0, e), t[2] = n.slice(0, e)), t.slice(0, 3))
                    }
                },
                filter: {
                    TAG: function (t) {
                        var e = t.replace(bt, Ct).toLowerCase();
                        return "*" === t ? function () {
                            return !0
                        } : function (t) {
                            return t.nodeName && t.nodeName.toLowerCase() === e
                        }
                    }, CLASS: function (t) {
                        var e = U[t + " "];
                        return e || (e = new RegExp("(^|" + nt + ")" + t + "(" + nt + "|$)")) && U(t, function (t) {
                            return e.test("string" == typeof t.className && t.className || "undefined" != typeof t.getAttribute && t.getAttribute("class") || "")
                        })
                    }, ATTR: function (t, n, i) {
                        return function (r) {
                            var o = e.attr(r, t);
                            return null == o ? "!=" === n : !n || (o += "", "=" === n ? o === i : "!=" === n ? o !== i : "^=" === n ? i && 0 === o.indexOf(i) : "*=" === n ? i && o.indexOf(i) > -1 : "$=" === n ? i && o.slice(-i.length) === i : "~=" === n ? (" " + o.replace(at, " ") + " ").indexOf(i) > -1 : "|=" === n && (o === i || o.slice(0, i.length + 1) === i + "-"))
                        }
                    }, CHILD: function (t, e, n, i, r) {
                        var o = "nth" !== t.slice(0, 3), a = "last" !== t.slice(-4), s = "of-type" === e;
                        return 1 === i && 0 === r ? function (t) {
                            return !!t.parentNode
                        } : function (e, n, d) {
                            var l, u, c, h, p, f, g = o !== a ? "nextSibling" : "previousSibling", $ = e.parentNode,
                                m = s && e.nodeName.toLowerCase(), v = !d && !s, y = !1;
                            if ($) {
                                if (o) {
                                    for (; g;) {
                                        for (h = e; h = h[g];) if (s ? h.nodeName.toLowerCase() === m : 1 === h.nodeType) return !1;
                                        f = g = "only" === t && !f && "nextSibling"
                                    }
                                    return !0
                                }
                                if (f = [a ? $.firstChild : $.lastChild], a && v) {
                                    for (h = $, c = h[H] || (h[H] = {}), u = c[h.uniqueID] || (c[h.uniqueID] = {}), l = u[t] || [], p = l[0] === B && l[1], y = p && l[2], h = p && $.childNodes[p]; h = ++p && h && h[g] || (y = p = 0) || f.pop();) if (1 === h.nodeType && ++y && h === e) {
                                        u[t] = [B, p, y];
                                        break
                                    }
                                } else if (v && (h = e, c = h[H] || (h[H] = {}), u = c[h.uniqueID] || (c[h.uniqueID] = {}), l = u[t] || [], p = l[0] === B && l[1], y = p), y === !1) for (; (h = ++p && h && h[g] || (y = p = 0) || f.pop()) && ((s ? h.nodeName.toLowerCase() !== m : 1 !== h.nodeType) || !++y || (v && (c = h[H] || (h[H] = {}), u = c[h.uniqueID] || (c[h.uniqueID] = {}), u[t] = [B, y]), h !== e));) ;
                                return y -= r, y === i || y % i === 0 && y / i >= 0
                            }
                        }
                    }, PSEUDO: function (t, n) {
                        var r, o = w.pseudos[t] || w.setFilters[t.toLowerCase()] || e.error("unsupported pseudo: " + t);
                        return o[H] ? o(n) : o.length > 1 ? (r = [t, t, "", n], w.setFilters.hasOwnProperty(t.toLowerCase()) ? i(function (t, e) {
                            for (var i, r = o(t, n), a = r.length; a--;) i = tt(t, r[a]), t[i] = !(e[i] = r[a])
                        }) : function (t) {
                            return o(t, 0, r)
                        }) : o
                    }
                },
                pseudos: {
                    not: i(function (t) {
                        var e = [], n = [], r = k(t.replace(st, "$1"));
                        return r[H] ? i(function (t, e, n, i) {
                            for (var o, a = r(t, null, i, []), s = t.length; s--;) (o = a[s]) && (t[s] = !(e[s] = o))
                        }) : function (t, i, o) {
                            return e[0] = t, r(e, null, o, n), e[0] = null, !n.pop()
                        }
                    }), has: i(function (t) {
                        return function (n) {
                            return e(t, n).length > 0
                        }
                    }), contains: i(function (t) {
                        return t = t.replace(bt, Ct), function (e) {
                            return (e.textContent || e.innerText || x(e)).indexOf(t) > -1
                        }
                    }), lang: i(function (t) {
                        return ht.test(t || "") || e.error("unsupported lang: " + t), t = t.replace(bt, Ct).toLowerCase(), function (e) {
                            var n;
                            do if (n = E ? e.lang : e.getAttribute("xml:lang") || e.getAttribute("lang")) return n = n.toLowerCase(), n === t || 0 === n.indexOf(t + "-"); while ((e = e.parentNode) && 1 === e.nodeType);
                            return !1
                        }
                    }), target: function (e) {
                        var n = t.location && t.location.hash;
                        return n && n.slice(1) === e.id
                    }, root: function (t) {
                        return t === N
                    }, focus: function (t) {
                        return t === L.activeElement && (!L.hasFocus || L.hasFocus()) && !!(t.type || t.href || ~t.tabIndex)
                    }, enabled: function (t) {
                        return t.disabled === !1
                    }, disabled: function (t) {
                        return t.disabled === !0
                    }, checked: function (t) {
                        var e = t.nodeName.toLowerCase();
                        return "input" === e && !!t.checked || "option" === e && !!t.selected
                    }, selected: function (t) {
                        return t.parentNode && t.parentNode.selectedIndex, t.selected === !0
                    }, empty: function (t) {
                        for (t = t.firstChild; t; t = t.nextSibling) if (t.nodeType < 6) return !1;
                        return !0
                    }, parent: function (t) {
                        return !w.pseudos.empty(t)
                    }, header: function (t) {
                        return gt.test(t.nodeName)
                    }, input: function (t) {
                        return ft.test(t.nodeName)
                    }, button: function (t) {
                        var e = t.nodeName.toLowerCase();
                        return "input" === e && "button" === t.type || "button" === e
                    }, text: function (t) {
                        var e;
                        return "input" === t.nodeName.toLowerCase() && "text" === t.type && (null == (e = t.getAttribute("type")) || "text" === e.toLowerCase())
                    }, first: l(function () {
                        return [0]
                    }), last: l(function (t, e) {
                        return [e - 1]
                    }), eq: l(function (t, e, n) {
                        return [n < 0 ? n + e : n]
                    }), even: l(function (t, e) {
                        for (var n = 0; n < e; n += 2) t.push(n);
                        return t
                    }), odd: l(function (t, e) {
                        for (var n = 1; n < e; n += 2) t.push(n);
                        return t
                    }), lt: l(function (t, e, n) {
                        for (var i = n < 0 ? n + e : n; --i >= 0;) t.push(i);
                        return t
                    }), gt: l(function (t, e, n) {
                        for (var i = n < 0 ? n + e : n; ++i < e;) t.push(i);
                        return t
                    })
                }
            }, w.pseudos.nth = w.pseudos.eq;
            for (b in{radio: !0, checkbox: !0, file: !0, password: !0, image: !0}) w.pseudos[b] = s(b);
            for (b in{submit: !0, reset: !0}) w.pseudos[b] = d(b);
            return c.prototype = w.filters = w.pseudos, w.setFilters = new c, T = e.tokenize = function (t, n) {
                var i, r, o, a, s, d, l, u = W[t + " "];
                if (u) return n ? 0 : u.slice(0);
                for (s = t, d = [], l = w.preFilter; s;) {
                    i && !(r = dt.exec(s)) || (r && (s = s.slice(r[0].length) || s), d.push(o = [])), i = !1, (r = lt.exec(s)) && (i = r.shift(), o.push({
                        value: i,
                        type: r[0].replace(st, " ")
                    }), s = s.slice(i.length));
                    for (a in w.filter) !(r = pt[a].exec(s)) || l[a] && !(r = l[a](r)) || (i = r.shift(), o.push({
                        value: i,
                        type: a,
                        matches: r
                    }), s = s.slice(i.length));
                    if (!i) break
                }
                return n ? s.length : s ? e.error(t) : W(t, d).slice(0)
            }, k = e.compile = function (t, e) {
                var n, i = [], r = [], o = z[t + " "];
                if (!o) {
                    for (e || (e = T(t)), n = e.length; n--;) o = v(e[n]), o[H] ? i.push(o) : r.push(o);
                    o = z(t, y(r, i)), o.selector = t
                }
                return o
            }, D = e.select = function (t, e, n, i) {
                var r, o, a, s, d, l = "function" == typeof t && t, c = !i && T(t = l.selector || t);
                if (n = n || [], 1 === c.length) {
                    if (o = c[0] = c[0].slice(0), o.length > 2 && "ID" === (a = o[0]).type && C.getById && 9 === e.nodeType && E && w.relative[o[1].type]) {
                        if (e = (w.find.ID(a.matches[0].replace(bt, Ct), e) || [])[0], !e) return n;
                        l && (e = e.parentNode), t = t.slice(o.shift().value.length)
                    }
                    for (r = pt.needsContext.test(t) ? 0 : o.length; r-- && (a = o[r], !w.relative[s = a.type]);) if ((d = w.find[s]) && (i = d(a.matches[0].replace(bt, Ct), vt.test(o[0].type) && u(e.parentNode) || e))) {
                        if (o.splice(r, 1), t = i.length && h(o), !t) return Y.apply(n, i), n;
                        break
                    }
                }
                return (l || k(t, c))(i, e, !E, n, !e || vt.test(t) && u(e.parentNode) || e), n
            }, C.sortStable = H.split("").sort(q).join("") === H, C.detectDuplicates = !!A, j(), C.sortDetached = r(function (t) {
                return 1 & t.compareDocumentPosition(L.createElement("div"))
            }), r(function (t) {
                return t.innerHTML = "<a href='#'></a>", "#" === t.firstChild.getAttribute("href")
            }) || o("type|href|height|width", function (t, e, n) {
                if (!n) return t.getAttribute(e, "type" === e.toLowerCase() ? 1 : 2)
            }), C.attributes && r(function (t) {
                return t.innerHTML = "<input/>", t.firstChild.setAttribute("value", ""), "" === t.firstChild.getAttribute("value")
            }) || o("value", function (t, e, n) {
                if (!n && "input" === t.nodeName.toLowerCase()) return t.defaultValue
            }), r(function (t) {
                return null == t.getAttribute("disabled")
            }) || o(et, function (t, e, n) {
                var i;
                if (!n) return t[e] === !0 ? e.toLowerCase() : (i = t.getAttributeNode(e)) && i.specified ? i.value : null
            }), e
        }(t);
        pt.find = vt, pt.expr = vt.selectors, pt.expr[":"] = pt.expr.pseudos, pt.uniqueSort = pt.unique = vt.uniqueSort, pt.text = vt.getText, pt.isXMLDoc = vt.isXML, pt.contains = vt.contains;
        var yt = function (t, e, n) {
            for (var i = [], r = void 0 !== n; (t = t[e]) && 9 !== t.nodeType;) if (1 === t.nodeType) {
                if (r && pt(t).is(n)) break;
                i.push(t)
            }
            return i
        }, bt = function (t, e) {
            for (var n = []; t; t = t.nextSibling) 1 === t.nodeType && t !== e && n.push(t);
            return n
        }, Ct = pt.expr.match.needsContext, wt = /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/, xt = /^.[^:#\[\.,]*$/;
        pt.filter = function (t, e, n) {
            var i = e[0];
            return n && (t = ":not(" + t + ")"), 1 === e.length && 1 === i.nodeType ? pt.find.matchesSelector(i, t) ? [i] : [] : pt.find.matches(t, pt.grep(e, function (t) {
                return 1 === t.nodeType
            }))
        }, pt.fn.extend({
            find: function (t) {
                var e, n = [], i = this, r = i.length;
                if ("string" != typeof t) return this.pushStack(pt(t).filter(function () {
                    for (e = 0; e < r; e++) if (pt.contains(i[e], this)) return !0
                }));
                for (e = 0; e < r; e++) pt.find(t, i[e], n);
                return n = this.pushStack(r > 1 ? pt.unique(n) : n), n.selector = this.selector ? this.selector + " " + t : t, n
            }, filter: function (t) {
                return this.pushStack(i(this, t || [], !1))
            }, not: function (t) {
                return this.pushStack(i(this, t || [], !0))
            }, is: function (t) {
                return !!i(this, "string" == typeof t && Ct.test(t) ? pt(t) : t || [], !1).length
            }
        });
        var St, Tt = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/, kt = pt.fn.init = function (t, e, n) {
            var i, r;
            if (!t) return this;
            if (n = n || St, "string" == typeof t) {
                if (i = "<" === t.charAt(0) && ">" === t.charAt(t.length - 1) && t.length >= 3 ? [null, t, null] : Tt.exec(t), !i || !i[1] && e) return !e || e.jquery ? (e || n).find(t) : this.constructor(e).find(t);
                if (i[1]) {
                    if (e = e instanceof pt ? e[0] : e, pt.merge(this, pt.parseHTML(i[1], e && e.nodeType ? e.ownerDocument || e : it, !0)), wt.test(i[1]) && pt.isPlainObject(e)) for (i in e) pt.isFunction(this[i]) ? this[i](e[i]) : this.attr(i, e[i]);
                    return this
                }
                if (r = it.getElementById(i[2]), r && r.parentNode) {
                    if (r.id !== i[2]) return St.find(t);
                    this.length = 1, this[0] = r
                }
                return this.context = it, this.selector = t, this
            }
            return t.nodeType ? (this.context = this[0] = t, this.length = 1, this) : pt.isFunction(t) ? "undefined" != typeof n.ready ? n.ready(t) : t(pt) : (void 0 !== t.selector && (this.selector = t.selector, this.context = t.context), pt.makeArray(t, this))
        };
        kt.prototype = pt.fn, St = pt(it);
        var Dt = /^(?:parents|prev(?:Until|All))/, _t = {children: !0, contents: !0, next: !0, prev: !0};
        pt.fn.extend({
            has: function (t) {
                var e, n = pt(t, this), i = n.length;
                return this.filter(function () {
                    for (e = 0; e < i; e++) if (pt.contains(this, n[e])) return !0
                })
            }, closest: function (t, e) {
                for (var n, i = 0, r = this.length, o = [], a = Ct.test(t) || "string" != typeof t ? pt(t, e || this.context) : 0; i < r; i++) for (n = this[i]; n && n !== e; n = n.parentNode) if (n.nodeType < 11 && (a ? a.index(n) > -1 : 1 === n.nodeType && pt.find.matchesSelector(n, t))) {
                    o.push(n);
                    break
                }
                return this.pushStack(o.length > 1 ? pt.uniqueSort(o) : o)
            }, index: function (t) {
                return t ? "string" == typeof t ? pt.inArray(this[0], pt(t)) : pt.inArray(t.jquery ? t[0] : t, this) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
            }, add: function (t, e) {
                return this.pushStack(pt.uniqueSort(pt.merge(this.get(), pt(t, e))))
            }, addBack: function (t) {
                return this.add(null == t ? this.prevObject : this.prevObject.filter(t))
            }
        }), pt.each({
            parent: function (t) {
                var e = t.parentNode;
                return e && 11 !== e.nodeType ? e : null
            }, parents: function (t) {
                return yt(t, "parentNode")
            }, parentsUntil: function (t, e, n) {
                return yt(t, "parentNode", n)
            }, next: function (t) {
                return r(t, "nextSibling")
            }, prev: function (t) {
                return r(t, "previousSibling")
            }, nextAll: function (t) {
                return yt(t, "nextSibling")
            }, prevAll: function (t) {
                return yt(t, "previousSibling")
            }, nextUntil: function (t, e, n) {
                return yt(t, "nextSibling", n)
            }, prevUntil: function (t, e, n) {
                return yt(t, "previousSibling", n)
            }, siblings: function (t) {
                return bt((t.parentNode || {}).firstChild, t)
            }, children: function (t) {
                return bt(t.firstChild)
            }, contents: function (t) {
                return pt.nodeName(t, "iframe") ? t.contentDocument || t.contentWindow.document : pt.merge([], t.childNodes)
            }
        }, function (t, e) {
            pt.fn[t] = function (n, i) {
                var r = pt.map(this, e, n);
                return "Until" !== t.slice(-5) && (i = n), i && "string" == typeof i && (r = pt.filter(i, r)), this.length > 1 && (_t[t] || (r = pt.uniqueSort(r)), Dt.test(t) && (r = r.reverse())), this.pushStack(r)
            }
        });
        var It = /\S+/g;
        pt.Callbacks = function (t) {
            t = "string" == typeof t ? o(t) : pt.extend({}, t);
            var e, n, i, r, a = [], s = [], d = -1, l = function () {
                for (r = t.once, i = e = !0; s.length; d = -1) for (n = s.shift(); ++d < a.length;) a[d].apply(n[0], n[1]) === !1 && t.stopOnFalse && (d = a.length, n = !1);
                t.memory || (n = !1), e = !1, r && (a = n ? [] : "")
            }, u = {
                add: function () {
                    return a && (n && !e && (d = a.length - 1, s.push(n)), function e(n) {
                        pt.each(n, function (n, i) {
                            pt.isFunction(i) ? t.unique && u.has(i) || a.push(i) : i && i.length && "string" !== pt.type(i) && e(i)
                        })
                    }(arguments), n && !e && l()), this
                }, remove: function () {
                    return pt.each(arguments, function (t, e) {
                        for (var n; (n = pt.inArray(e, a, n)) > -1;) a.splice(n, 1), n <= d && d--
                    }), this
                }, has: function (t) {
                    return t ? pt.inArray(t, a) > -1 : a.length > 0
                }, empty: function () {
                    return a && (a = []), this
                }, disable: function () {
                    return r = s = [], a = n = "", this
                }, disabled: function () {
                    return !a
                }, lock: function () {
                    return r = !0, n || u.disable(), this
                }, locked: function () {
                    return !!r
                }, fireWith: function (t, n) {
                    return r || (n = n || [], n = [t, n.slice ? n.slice() : n], s.push(n), e || l()), this
                }, fire: function () {
                    return u.fireWith(this, arguments), this
                }, fired: function () {
                    return !!i
                }
            };
            return u
        }, pt.extend({
            Deferred: function (t) {
                var e = [["resolve", "done", pt.Callbacks("once memory"), "resolved"], ["reject", "fail", pt.Callbacks("once memory"), "rejected"], ["notify", "progress", pt.Callbacks("memory")]],
                    n = "pending", i = {
                        state: function () {
                            return n
                        }, always: function () {
                            return r.done(arguments).fail(arguments), this
                        }, then: function () {
                            var t = arguments;
                            return pt.Deferred(function (n) {
                                pt.each(e, function (e, o) {
                                    var a = pt.isFunction(t[e]) && t[e];
                                    r[o[1]](function () {
                                        var t = a && a.apply(this, arguments);
                                        t && pt.isFunction(t.promise) ? t.promise().progress(n.notify).done(n.resolve).fail(n.reject) : n[o[0] + "With"](this === i ? n.promise() : this, a ? [t] : arguments)
                                    })
                                }), t = null
                            }).promise()
                        }, promise: function (t) {
                            return null != t ? pt.extend(t, i) : i
                        }
                    }, r = {};
                return i.pipe = i.then, pt.each(e, function (t, o) {
                    var a = o[2], s = o[3];
                    i[o[1]] = a.add, s && a.add(function () {
                        n = s
                    }, e[1 ^ t][2].disable, e[2][2].lock), r[o[0]] = function () {
                        return r[o[0] + "With"](this === r ? i : this, arguments), this
                    }, r[o[0] + "With"] = a.fireWith
                }), i.promise(r), t && t.call(r, r), r
            }, when: function (t) {
                var e, n, i, r = 0, o = rt.call(arguments), a = o.length,
                    s = 1 !== a || t && pt.isFunction(t.promise) ? a : 0, d = 1 === s ? t : pt.Deferred(),
                    l = function (t, n, i) {
                        return function (r) {
                            n[t] = this, i[t] = arguments.length > 1 ? rt.call(arguments) : r, i === e ? d.notifyWith(n, i) : --s || d.resolveWith(n, i)
                        }
                    };
                if (a > 1) for (e = new Array(a), n = new Array(a), i = new Array(a); r < a; r++) o[r] && pt.isFunction(o[r].promise) ? o[r].promise().progress(l(r, n, e)).done(l(r, i, o)).fail(d.reject) : --s;
                return s || d.resolveWith(i, o), d.promise()
            }
        });
        var At;
        pt.fn.ready = function (t) {
            return pt.ready.promise().done(t), this
        }, pt.extend({
            isReady: !1, readyWait: 1, holdReady: function (t) {
                t ? pt.readyWait++ : pt.ready(!0)
            }, ready: function (t) {
                (t === !0 ? --pt.readyWait : pt.isReady) || (pt.isReady = !0, t !== !0 && --pt.readyWait > 0 || (At.resolveWith(it, [pt]), pt.fn.triggerHandler && (pt(it).triggerHandler("ready"), pt(it).off("ready"))))
            }
        }), pt.ready.promise = function (e) {
            if (!At) if (At = pt.Deferred(), "complete" === it.readyState || "loading" !== it.readyState && !it.documentElement.doScroll) t.setTimeout(pt.ready); else if (it.addEventListener) it.addEventListener("DOMContentLoaded", s), t.addEventListener("load", s); else {
                it.attachEvent("onreadystatechange", s), t.attachEvent("onload", s);
                var n = !1;
                try {
                    n = null == t.frameElement && it.documentElement
                } catch (t) {
                }
                n && n.doScroll && !function e() {
                    if (!pt.isReady) {
                        try {
                            n.doScroll("left")
                        } catch (n) {
                            return t.setTimeout(e, 50)
                        }
                        a(), pt.ready()
                    }
                }()
            }
            return At.promise(e)
        }, pt.ready.promise();
        var jt;
        for (jt in pt(ct)) break;
        ct.ownFirst = "0" === jt, ct.inlineBlockNeedsLayout = !1, pt(function () {
            var t, e, n, i;
            n = it.getElementsByTagName("body")[0], n && n.style && (e = it.createElement("div"), i = it.createElement("div"), i.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", n.appendChild(i).appendChild(e), "undefined" != typeof e.style.zoom && (e.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1", ct.inlineBlockNeedsLayout = t = 3 === e.offsetWidth, t && (n.style.zoom = 1)), n.removeChild(i))
        }), function () {
            var t = it.createElement("div");
            ct.deleteExpando = !0;
            try {
                delete t.test
            } catch (t) {
                ct.deleteExpando = !1
            }
            t = null
        }();
        var Lt = function (t) {
            var e = pt.noData[(t.nodeName + " ").toLowerCase()], n = +t.nodeType || 1;
            return (1 === n || 9 === n) && (!e || e !== !0 && t.getAttribute("classid") === e)
        }, Nt = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/, Et = /([A-Z])/g;
        pt.extend({
            cache: {},
            noData: {"applet ": !0, "embed ": !0, "object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"},
            hasData: function (t) {
                return t = t.nodeType ? pt.cache[t[pt.expando]] : t[pt.expando], !!t && !l(t)
            },
            data: function (t, e, n) {
                return u(t, e, n)
            },
            removeData: function (t, e) {
                return c(t, e)
            },
            _data: function (t, e, n) {
                return u(t, e, n, !0)
            },
            _removeData: function (t, e) {
                return c(t, e, !0)
            }
        }), pt.fn.extend({
            data: function (t, e) {
                var n, i, r, o = this[0], a = o && o.attributes;
                if (void 0 === t) {
                    if (this.length && (r = pt.data(o), 1 === o.nodeType && !pt._data(o, "parsedAttrs"))) {
                        for (n = a.length; n--;) a[n] && (i = a[n].name, 0 === i.indexOf("data-") && (i = pt.camelCase(i.slice(5)), d(o, i, r[i])));
                        pt._data(o, "parsedAttrs", !0)
                    }
                    return r
                }
                return "object" == typeof t ? this.each(function () {
                    pt.data(this, t)
                }) : arguments.length > 1 ? this.each(function () {
                    pt.data(this, t, e)
                }) : o ? d(o, t, pt.data(o, t)) : void 0
            }, removeData: function (t) {
                return this.each(function () {
                    pt.removeData(this, t)
                })
            }
        }), pt.extend({
            queue: function (t, e, n) {
                var i;
                if (t) return e = (e || "fx") + "queue", i = pt._data(t, e), n && (!i || pt.isArray(n) ? i = pt._data(t, e, pt.makeArray(n)) : i.push(n)), i || []
            }, dequeue: function (t, e) {
                e = e || "fx";
                var n = pt.queue(t, e), i = n.length, r = n.shift(), o = pt._queueHooks(t, e), a = function () {
                    pt.dequeue(t, e)
                };
                "inprogress" === r && (r = n.shift(), i--), r && ("fx" === e && n.unshift("inprogress"), delete o.stop, r.call(t, a, o)), !i && o && o.empty.fire()
            }, _queueHooks: function (t, e) {
                var n = e + "queueHooks";
                return pt._data(t, n) || pt._data(t, n, {
                    empty: pt.Callbacks("once memory").add(function () {
                        pt._removeData(t, e + "queue"), pt._removeData(t, n)
                    })
                })
            }
        }), pt.fn.extend({
            queue: function (t, e) {
                var n = 2;
                return "string" != typeof t && (e = t, t = "fx", n--), arguments.length < n ? pt.queue(this[0], t) : void 0 === e ? this : this.each(function () {
                    var n = pt.queue(this, t, e);
                    pt._queueHooks(this, t), "fx" === t && "inprogress" !== n[0] && pt.dequeue(this, t)
                })
            }, dequeue: function (t) {
                return this.each(function () {
                    pt.dequeue(this, t)
                })
            }, clearQueue: function (t) {
                return this.queue(t || "fx", [])
            }, promise: function (t, e) {
                var n, i = 1, r = pt.Deferred(), o = this, a = this.length, s = function () {
                    --i || r.resolveWith(o, [o])
                };
                for ("string" != typeof t && (e = t, t = void 0), t = t || "fx"; a--;) n = pt._data(o[a], t + "queueHooks"), n && n.empty && (i++, n.empty.add(s));
                return s(), r.promise(e)
            }
        }), function () {
            var t;
            ct.shrinkWrapBlocks = function () {
                if (null != t) return t;
                t = !1;
                var e, n, i;
                return n = it.getElementsByTagName("body")[0], n && n.style ? (e = it.createElement("div"), i = it.createElement("div"), i.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", n.appendChild(i).appendChild(e), "undefined" != typeof e.style.zoom && (e.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:1px;width:1px;zoom:1", e.appendChild(it.createElement("div")).style.width = "5px", t = 3 !== e.offsetWidth), n.removeChild(i), t) : void 0
            }
        }();
        var Pt = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
            Mt = new RegExp("^(?:([+-])=|)(" + Pt + ")([a-z%]*)$", "i"), Rt = ["Top", "Right", "Bottom", "Left"],
            Ot = function (t, e) {
                return t = e || t, "none" === pt.css(t, "display") || !pt.contains(t.ownerDocument, t)
            }, Ht = function (t, e, n, i, r, o, a) {
                var s = 0, d = t.length, l = null == n;
                if ("object" === pt.type(n)) {
                    r = !0;
                    for (s in n) Ht(t, e, s, n[s], !0, o, a)
                } else if (void 0 !== i && (r = !0, pt.isFunction(i) || (a = !0), l && (a ? (e.call(t, i), e = null) : (l = e, e = function (t, e, n) {
                        return l.call(pt(t), n)
                    })), e)) for (; s < d; s++) e(t[s], n, a ? i : i.call(t[s], s, e(t[s], n)));
                return r ? t : l ? e.call(t) : d ? e(t[0], n) : o
            }, Ft = /^(?:checkbox|radio)$/i, Bt = /<([\w:-]+)/, Qt = /^$|\/(?:java|ecma)script/i, Ut = /^\s+/,
            Wt = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|dialog|figcaption|figure|footer|header|hgroup|main|mark|meter|nav|output|picture|progress|section|summary|template|time|video";
        !function () {
            var t = it.createElement("div"), e = it.createDocumentFragment(), n = it.createElement("input");
            t.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", ct.leadingWhitespace = 3 === t.firstChild.nodeType, ct.tbody = !t.getElementsByTagName("tbody").length, ct.htmlSerialize = !!t.getElementsByTagName("link").length, ct.html5Clone = "<:nav></:nav>" !== it.createElement("nav").cloneNode(!0).outerHTML, n.type = "checkbox", n.checked = !0, e.appendChild(n), ct.appendChecked = n.checked, t.innerHTML = "<textarea>x</textarea>", ct.noCloneChecked = !!t.cloneNode(!0).lastChild.defaultValue, e.appendChild(t), n = it.createElement("input"), n.setAttribute("type", "radio"), n.setAttribute("checked", "checked"), n.setAttribute("name", "t"), t.appendChild(n), ct.checkClone = t.cloneNode(!0).cloneNode(!0).lastChild.checked, ct.noCloneEvent = !!t.addEventListener, t[pt.expando] = 1, ct.attributes = !t.getAttribute(pt.expando)
        }();
        var zt = {
            option: [1, "<select multiple='multiple'>", "</select>"],
            legend: [1, "<fieldset>", "</fieldset>"],
            area: [1, "<map>", "</map>"],
            param: [1, "<object>", "</object>"],
            thead: [1, "<table>", "</table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            _default: ct.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"]
        };
        zt.optgroup = zt.option, zt.tbody = zt.tfoot = zt.colgroup = zt.caption = zt.thead, zt.th = zt.td;
        var qt = /<|&#?\w+;/, Vt = /<tbody/i;
        !function () {
            var e, n, i = it.createElement("div");
            for (e in{
                submit: !0,
                change: !0,
                focusin: !0
            }) n = "on" + e, (ct[e] = n in t) || (i.setAttribute(n, "t"), ct[e] = i.attributes[n].expando === !1);
            i = null
        }();
        var Gt = /^(?:input|select|textarea)$/i, Kt = /^key/, Jt = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
            Xt = /^(?:focusinfocus|focusoutblur)$/, Yt = /^([^.]*)(?:\.(.+)|)/;
        pt.event = {
            global: {},
            add: function (t, e, n, i, r) {
                var o, a, s, d, l, u, c, h, p, f, g, $ = pt._data(t);
                if ($) {
                    for (n.handler && (d = n, n = d.handler, r = d.selector), n.guid || (n.guid = pt.guid++), (a = $.events) || (a = $.events = {}), (u = $.handle) || (u = $.handle = function (t) {
                        return "undefined" == typeof pt || t && pt.event.triggered === t.type ? void 0 : pt.event.dispatch.apply(u.elem, arguments)
                    }, u.elem = t), e = (e || "").match(It) || [""], s = e.length; s--;) o = Yt.exec(e[s]) || [], p = g = o[1], f = (o[2] || "").split(".").sort(), p && (l = pt.event.special[p] || {}, p = (r ? l.delegateType : l.bindType) || p, l = pt.event.special[p] || {}, c = pt.extend({
                        type: p,
                        origType: g,
                        data: i,
                        handler: n,
                        guid: n.guid,
                        selector: r,
                        needsContext: r && pt.expr.match.needsContext.test(r),
                        namespace: f.join(".")
                    }, d), (h = a[p]) || (h = a[p] = [], h.delegateCount = 0, l.setup && l.setup.call(t, i, f, u) !== !1 || (t.addEventListener ? t.addEventListener(p, u, !1) : t.attachEvent && t.attachEvent("on" + p, u))), l.add && (l.add.call(t, c), c.handler.guid || (c.handler.guid = n.guid)), r ? h.splice(h.delegateCount++, 0, c) : h.push(c), pt.event.global[p] = !0);
                    t = null
                }
            },
            remove: function (t, e, n, i, r) {
                var o, a, s, d, l, u, c, h, p, f, g, $ = pt.hasData(t) && pt._data(t);
                if ($ && (u = $.events)) {
                    for (e = (e || "").match(It) || [""], l = e.length; l--;) if (s = Yt.exec(e[l]) || [], p = g = s[1], f = (s[2] || "").split(".").sort(), p) {
                        for (c = pt.event.special[p] || {}, p = (i ? c.delegateType : c.bindType) || p, h = u[p] || [], s = s[2] && new RegExp("(^|\\.)" + f.join("\\.(?:.*\\.|)") + "(\\.|$)"), d = o = h.length; o--;) a = h[o], !r && g !== a.origType || n && n.guid !== a.guid || s && !s.test(a.namespace) || i && i !== a.selector && ("**" !== i || !a.selector) || (h.splice(o, 1), a.selector && h.delegateCount--, c.remove && c.remove.call(t, a));
                        d && !h.length && (c.teardown && c.teardown.call(t, f, $.handle) !== !1 || pt.removeEvent(t, p, $.handle), delete u[p])
                    } else for (p in u) pt.event.remove(t, p + e[l], n, i, !0);
                    pt.isEmptyObject(u) && (delete $.handle, pt._removeData(t, "events"))
                }
            },
            trigger: function (e, n, i, r) {
                var o, a, s, d, l, u, c, h = [i || it], p = ut.call(e, "type") ? e.type : e,
                    f = ut.call(e, "namespace") ? e.namespace.split(".") : [];
                if (s = u = i = i || it, 3 !== i.nodeType && 8 !== i.nodeType && !Xt.test(p + pt.event.triggered) && (p.indexOf(".") > -1 && (f = p.split("."), p = f.shift(), f.sort()), a = p.indexOf(":") < 0 && "on" + p, e = e[pt.expando] ? e : new pt.Event(p, "object" == typeof e && e), e.isTrigger = r ? 2 : 3, e.namespace = f.join("."), e.rnamespace = e.namespace ? new RegExp("(^|\\.)" + f.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, e.result = void 0, e.target || (e.target = i), n = null == n ? [e] : pt.makeArray(n, [e]), l = pt.event.special[p] || {}, r || !l.trigger || l.trigger.apply(i, n) !== !1)) {
                    if (!r && !l.noBubble && !pt.isWindow(i)) {
                        for (d = l.delegateType || p, Xt.test(d + p) || (s = s.parentNode); s; s = s.parentNode) h.push(s), u = s;
                        u === (i.ownerDocument || it) && h.push(u.defaultView || u.parentWindow || t)
                    }
                    for (c = 0; (s = h[c++]) && !e.isPropagationStopped();) e.type = c > 1 ? d : l.bindType || p, o = (pt._data(s, "events") || {})[e.type] && pt._data(s, "handle"), o && o.apply(s, n), o = a && s[a], o && o.apply && Lt(s) && (e.result = o.apply(s, n), e.result === !1 && e.preventDefault());
                    if (e.type = p, !r && !e.isDefaultPrevented() && (!l._default || l._default.apply(h.pop(), n) === !1) && Lt(i) && a && i[p] && !pt.isWindow(i)) {
                        u = i[a], u && (i[a] = null), pt.event.triggered = p;
                        try {
                            i[p]()
                        } catch (t) {
                        }
                        pt.event.triggered = void 0, u && (i[a] = u)
                    }
                    return e.result
                }
            },
            dispatch: function (t) {
                t = pt.event.fix(t);
                var e, n, i, r, o, a = [], s = rt.call(arguments), d = (pt._data(this, "events") || {})[t.type] || [],
                    l = pt.event.special[t.type] || {};
                if (s[0] = t, t.delegateTarget = this, !l.preDispatch || l.preDispatch.call(this, t) !== !1) {
                    for (a = pt.event.handlers.call(this, t, d), e = 0; (r = a[e++]) && !t.isPropagationStopped();) for (t.currentTarget = r.elem, n = 0; (o = r.handlers[n++]) && !t.isImmediatePropagationStopped();) t.rnamespace && !t.rnamespace.test(o.namespace) || (t.handleObj = o, t.data = o.data, i = ((pt.event.special[o.origType] || {}).handle || o.handler).apply(r.elem, s), void 0 !== i && (t.result = i) === !1 && (t.preventDefault(), t.stopPropagation()));
                    return l.postDispatch && l.postDispatch.call(this, t), t.result
                }
            },
            handlers: function (t, e) {
                var n, i, r, o, a = [], s = e.delegateCount, d = t.target;
                if (s && d.nodeType && ("click" !== t.type || isNaN(t.button) || t.button < 1)) for (; d != this; d = d.parentNode || this) if (1 === d.nodeType && (d.disabled !== !0 || "click" !== t.type)) {
                    for (i = [], n = 0; n < s; n++) o = e[n], r = o.selector + " ", void 0 === i[r] && (i[r] = o.needsContext ? pt(r, this).index(d) > -1 : pt.find(r, this, null, [d]).length), i[r] && i.push(o);
                    i.length && a.push({elem: d, handlers: i})
                }
                return s < e.length && a.push({elem: this, handlers: e.slice(s)}), a
            },
            fix: function (t) {
                if (t[pt.expando]) return t;
                var e, n, i, r = t.type, o = t, a = this.fixHooks[r];
                for (a || (this.fixHooks[r] = a = Jt.test(r) ? this.mouseHooks : Kt.test(r) ? this.keyHooks : {}), i = a.props ? this.props.concat(a.props) : this.props, t = new pt.Event(o), e = i.length; e--;) n = i[e], t[n] = o[n];
                return t.target || (t.target = o.srcElement || it), 3 === t.target.nodeType && (t.target = t.target.parentNode), t.metaKey = !!t.metaKey, a.filter ? a.filter(t, o) : t
            },
            props: "altKey bubbles cancelable ctrlKey currentTarget detail eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
            fixHooks: {},
            keyHooks: {
                props: "char charCode key keyCode".split(" "), filter: function (t, e) {
                    return null == t.which && (t.which = null != e.charCode ? e.charCode : e.keyCode), t
                }
            },
            mouseHooks: {
                props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
                filter: function (t, e) {
                    var n, i, r, o = e.button, a = e.fromElement;
                    return null == t.pageX && null != e.clientX && (i = t.target.ownerDocument || it, r = i.documentElement, n = i.body, t.pageX = e.clientX + (r && r.scrollLeft || n && n.scrollLeft || 0) - (r && r.clientLeft || n && n.clientLeft || 0), t.pageY = e.clientY + (r && r.scrollTop || n && n.scrollTop || 0) - (r && r.clientTop || n && n.clientTop || 0)), !t.relatedTarget && a && (t.relatedTarget = a === t.target ? e.toElement : a), t.which || void 0 === o || (t.which = 1 & o ? 1 : 2 & o ? 3 : 4 & o ? 2 : 0), t
                }
            },
            special: {
                load: {noBubble: !0}, focus: {
                    trigger: function () {
                        if (this !== b() && this.focus) try {
                            return this.focus(), !1
                        } catch (t) {
                        }
                    }, delegateType: "focusin"
                }, blur: {
                    trigger: function () {
                        if (this === b() && this.blur) return this.blur(), !1
                    }, delegateType: "focusout"
                }, click: {
                    trigger: function () {
                        if (pt.nodeName(this, "input") && "checkbox" === this.type && this.click) return this.click(), !1
                    }, _default: function (t) {
                        return pt.nodeName(t.target, "a")
                    }
                }, beforeunload: {
                    postDispatch: function (t) {
                        void 0 !== t.result && t.originalEvent && (t.originalEvent.returnValue = t.result)
                    }
                }
            },
            simulate: function (t, e, n) {
                var i = pt.extend(new pt.Event, n, {
                    type: t, isSimulated: !0
                });
                pt.event.trigger(i, null, e), i.isDefaultPrevented() && n.preventDefault()
            }
        }, pt.removeEvent = it.removeEventListener ? function (t, e, n) {
            t.removeEventListener && t.removeEventListener(e, n)
        } : function (t, e, n) {
            var i = "on" + e;
            t.detachEvent && ("undefined" == typeof t[i] && (t[i] = null), t.detachEvent(i, n))
        }, pt.Event = function (t, e) {
            return this instanceof pt.Event ? (t && t.type ? (this.originalEvent = t, this.type = t.type, this.isDefaultPrevented = t.defaultPrevented || void 0 === t.defaultPrevented && t.returnValue === !1 ? v : y) : this.type = t, e && pt.extend(this, e), this.timeStamp = t && t.timeStamp || pt.now(), void(this[pt.expando] = !0)) : new pt.Event(t, e)
        }, pt.Event.prototype = {
            constructor: pt.Event,
            isDefaultPrevented: y,
            isPropagationStopped: y,
            isImmediatePropagationStopped: y,
            preventDefault: function () {
                var t = this.originalEvent;
                this.isDefaultPrevented = v, t && (t.preventDefault ? t.preventDefault() : t.returnValue = !1)
            },
            stopPropagation: function () {
                var t = this.originalEvent;
                this.isPropagationStopped = v, t && !this.isSimulated && (t.stopPropagation && t.stopPropagation(), t.cancelBubble = !0)
            },
            stopImmediatePropagation: function () {
                var t = this.originalEvent;
                this.isImmediatePropagationStopped = v, t && t.stopImmediatePropagation && t.stopImmediatePropagation(), this.stopPropagation()
            }
        }, pt.each({
            mouseenter: "mouseover",
            mouseleave: "mouseout",
            pointerenter: "pointerover",
            pointerleave: "pointerout"
        }, function (t, e) {
            pt.event.special[t] = {
                delegateType: e, bindType: e, handle: function (t) {
                    var n, i = this, r = t.relatedTarget, o = t.handleObj;
                    return r && (r === i || pt.contains(i, r)) || (t.type = o.origType, n = o.handler.apply(this, arguments), t.type = e), n
                }
            }
        }), ct.submit || (pt.event.special.submit = {
            setup: function () {
                return !pt.nodeName(this, "form") && void pt.event.add(this, "click._submit keypress._submit", function (t) {
                    var e = t.target,
                        n = pt.nodeName(e, "input") || pt.nodeName(e, "button") ? pt.prop(e, "form") : void 0;
                    n && !pt._data(n, "submit") && (pt.event.add(n, "submit._submit", function (t) {
                        t._submitBubble = !0
                    }), pt._data(n, "submit", !0))
                })
            }, postDispatch: function (t) {
                t._submitBubble && (delete t._submitBubble, this.parentNode && !t.isTrigger && pt.event.simulate("submit", this.parentNode, t))
            }, teardown: function () {
                return !pt.nodeName(this, "form") && void pt.event.remove(this, "._submit")
            }
        }), ct.change || (pt.event.special.change = {
            setup: function () {
                return Gt.test(this.nodeName) ? ("checkbox" !== this.type && "radio" !== this.type || (pt.event.add(this, "propertychange._change", function (t) {
                    "checked" === t.originalEvent.propertyName && (this._justChanged = !0)
                }), pt.event.add(this, "click._change", function (t) {
                    this._justChanged && !t.isTrigger && (this._justChanged = !1), pt.event.simulate("change", this, t)
                })), !1) : void pt.event.add(this, "beforeactivate._change", function (t) {
                    var e = t.target;
                    Gt.test(e.nodeName) && !pt._data(e, "change") && (pt.event.add(e, "change._change", function (t) {
                        !this.parentNode || t.isSimulated || t.isTrigger || pt.event.simulate("change", this.parentNode, t)
                    }), pt._data(e, "change", !0))
                })
            }, handle: function (t) {
                var e = t.target;
                if (this !== e || t.isSimulated || t.isTrigger || "radio" !== e.type && "checkbox" !== e.type) return t.handleObj.handler.apply(this, arguments)
            }, teardown: function () {
                return pt.event.remove(this, "._change"), !Gt.test(this.nodeName)
            }
        }), ct.focusin || pt.each({focus: "focusin", blur: "focusout"}, function (t, e) {
            var n = function (t) {
                pt.event.simulate(e, t.target, pt.event.fix(t))
            };
            pt.event.special[e] = {
                setup: function () {
                    var i = this.ownerDocument || this, r = pt._data(i, e);
                    r || i.addEventListener(t, n, !0), pt._data(i, e, (r || 0) + 1)
                }, teardown: function () {
                    var i = this.ownerDocument || this, r = pt._data(i, e) - 1;
                    r ? pt._data(i, e, r) : (i.removeEventListener(t, n, !0), pt._removeData(i, e))
                }
            }
        }), pt.fn.extend({
            on: function (t, e, n, i) {
                return C(this, t, e, n, i)
            }, one: function (t, e, n, i) {
                return C(this, t, e, n, i, 1)
            }, off: function (t, e, n) {
                var i, r;
                if (t && t.preventDefault && t.handleObj) return i = t.handleObj, pt(t.delegateTarget).off(i.namespace ? i.origType + "." + i.namespace : i.origType, i.selector, i.handler), this;
                if ("object" == typeof t) {
                    for (r in t) this.off(r, e, t[r]);
                    return this
                }
                return e !== !1 && "function" != typeof e || (n = e, e = void 0), n === !1 && (n = y), this.each(function () {
                    pt.event.remove(this, t, n, e)
                })
            }, trigger: function (t, e) {
                return this.each(function () {
                    pt.event.trigger(t, e, this)
                })
            }, triggerHandler: function (t, e) {
                var n = this[0];
                if (n) return pt.event.trigger(t, e, n, !0)
            }
        });
        var Zt = / jQuery\d+="(?:null|\d+)"/g, te = new RegExp("<(?:" + Wt + ")[\\s/>]", "i"),
            ee = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,
            ne = /<script|<style|<link/i, ie = /checked\s*(?:[^=]|=\s*.checked.)/i, re = /^true\/(.*)/,
            oe = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g, ae = p(it), se = ae.appendChild(it.createElement("div"));
        pt.extend({
            htmlPrefilter: function (t) {
                return t.replace(ee, "<$1></$2>")
            }, clone: function (t, e, n) {
                var i, r, o, a, s, d = pt.contains(t.ownerDocument, t);
                if (ct.html5Clone || pt.isXMLDoc(t) || !te.test("<" + t.nodeName + ">") ? o = t.cloneNode(!0) : (se.innerHTML = t.outerHTML, se.removeChild(o = se.firstChild)), !(ct.noCloneEvent && ct.noCloneChecked || 1 !== t.nodeType && 11 !== t.nodeType || pt.isXMLDoc(t))) for (i = f(o), s = f(t), a = 0; null != (r = s[a]); ++a) i[a] && k(r, i[a]);
                if (e) if (n) for (s = s || f(t), i = i || f(o), a = 0; null != (r = s[a]); a++) T(r, i[a]); else T(t, o);
                return i = f(o, "script"), i.length > 0 && g(i, !d && f(t, "script")), i = s = r = null, o
            }, cleanData: function (t, e) {
                for (var n, i, r, o, a = 0, s = pt.expando, d = pt.cache, l = ct.attributes, u = pt.event.special; null != (n = t[a]); a++) if ((e || Lt(n)) && (r = n[s], o = r && d[r])) {
                    if (o.events) for (i in o.events) u[i] ? pt.event.remove(n, i) : pt.removeEvent(n, i, o.handle);
                    d[r] && (delete d[r], l || "undefined" == typeof n.removeAttribute ? n[s] = void 0 : n.removeAttribute(s), nt.push(r))
                }
            }
        }), pt.fn.extend({
            domManip: D, detach: function (t) {
                return _(this, t, !0)
            }, remove: function (t) {
                return _(this, t)
            }, text: function (t) {
                return Ht(this, function (t) {
                    return void 0 === t ? pt.text(this) : this.empty().append((this[0] && this[0].ownerDocument || it).createTextNode(t))
                }, null, t, arguments.length)
            }, append: function () {
                return D(this, arguments, function (t) {
                    if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                        var e = w(this, t);
                        e.appendChild(t)
                    }
                })
            }, prepend: function () {
                return D(this, arguments, function (t) {
                    if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                        var e = w(this, t);
                        e.insertBefore(t, e.firstChild)
                    }
                })
            }, before: function () {
                return D(this, arguments, function (t) {
                    this.parentNode && this.parentNode.insertBefore(t, this)
                })
            }, after: function () {
                return D(this, arguments, function (t) {
                    this.parentNode && this.parentNode.insertBefore(t, this.nextSibling)
                })
            }, empty: function () {
                for (var t, e = 0; null != (t = this[e]); e++) {
                    for (1 === t.nodeType && pt.cleanData(f(t, !1)); t.firstChild;) t.removeChild(t.firstChild);
                    t.options && pt.nodeName(t, "select") && (t.options.length = 0)
                }
                return this
            }, clone: function (t, e) {
                return t = null != t && t, e = null == e ? t : e, this.map(function () {
                    return pt.clone(this, t, e)
                })
            }, html: function (t) {
                return Ht(this, function (t) {
                    var e = this[0] || {}, n = 0, i = this.length;
                    if (void 0 === t) return 1 === e.nodeType ? e.innerHTML.replace(Zt, "") : void 0;
                    if ("string" == typeof t && !ne.test(t) && (ct.htmlSerialize || !te.test(t)) && (ct.leadingWhitespace || !Ut.test(t)) && !zt[(Bt.exec(t) || ["", ""])[1].toLowerCase()]) {
                        t = pt.htmlPrefilter(t);
                        try {
                            for (; n < i; n++) e = this[n] || {}, 1 === e.nodeType && (pt.cleanData(f(e, !1)), e.innerHTML = t);
                            e = 0
                        } catch (t) {
                        }
                    }
                    e && this.empty().append(t)
                }, null, t, arguments.length)
            }, replaceWith: function () {
                var t = [];
                return D(this, arguments, function (e) {
                    var n = this.parentNode;
                    pt.inArray(this, t) < 0 && (pt.cleanData(f(this)), n && n.replaceChild(e, this))
                }, t)
            }
        }), pt.each({
            appendTo: "append",
            prependTo: "prepend",
            insertBefore: "before",
            insertAfter: "after",
            replaceAll: "replaceWith"
        }, function (t, e) {
            pt.fn[t] = function (t) {
                for (var n, i = 0, r = [], o = pt(t), a = o.length - 1; i <= a; i++) n = i === a ? this : this.clone(!0), pt(o[i])[e](n), at.apply(r, n.get());
                return this.pushStack(r)
            }
        });
        var de, le = {HTML: "block", BODY: "block"}, ue = /^margin/,
            ce = new RegExp("^(" + Pt + ")(?!px)[a-z%]+$", "i"), he = function (t, e, n, i) {
                var r, o, a = {};
                for (o in e) a[o] = t.style[o], t.style[o] = e[o];
                r = n.apply(t, i || []);
                for (o in e) t.style[o] = a[o];
                return r
            }, pe = it.documentElement;
        !function () {
            function e() {
                var e, u, c = it.documentElement;
                c.appendChild(d), l.style.cssText = "-webkit-box-sizing:border-box;box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%", n = r = s = !1, i = a = !0, t.getComputedStyle && (u = t.getComputedStyle(l), n = "1%" !== (u || {}).top, s = "2px" === (u || {}).marginLeft, r = "4px" === (u || {width: "4px"}).width, l.style.marginRight = "50%", i = "4px" === (u || {marginRight: "4px"}).marginRight, e = l.appendChild(it.createElement("div")), e.style.cssText = l.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0", e.style.marginRight = e.style.width = "0", l.style.width = "1px", a = !parseFloat((t.getComputedStyle(e) || {}).marginRight), l.removeChild(e)), l.style.display = "none", o = 0 === l.getClientRects().length, o && (l.style.display = "", l.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", l.childNodes[0].style.borderCollapse = "separate", e = l.getElementsByTagName("td"), e[0].style.cssText = "margin:0;border:0;padding:0;display:none", o = 0 === e[0].offsetHeight, o && (e[0].style.display = "", e[1].style.display = "none", o = 0 === e[0].offsetHeight)), c.removeChild(d)
            }

            var n, i, r, o, a, s, d = it.createElement("div"), l = it.createElement("div");
            l.style && (l.style.cssText = "float:left;opacity:.5", ct.opacity = "0.5" === l.style.opacity, ct.cssFloat = !!l.style.cssFloat, l.style.backgroundClip = "content-box", l.cloneNode(!0).style.backgroundClip = "", ct.clearCloneStyle = "content-box" === l.style.backgroundClip, d = it.createElement("div"), d.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute", l.innerHTML = "", d.appendChild(l), ct.boxSizing = "" === l.style.boxSizing || "" === l.style.MozBoxSizing || "" === l.style.WebkitBoxSizing, pt.extend(ct, {
                reliableHiddenOffsets: function () {
                    return null == n && e(), o
                }, boxSizingReliable: function () {
                    return null == n && e(), r
                }, pixelMarginRight: function () {
                    return null == n && e(), i
                }, pixelPosition: function () {
                    return null == n && e(), n
                }, reliableMarginRight: function () {
                    return null == n && e(), a
                }, reliableMarginLeft: function () {
                    return null == n && e(), s
                }
            }))
        }();
        var fe, ge, $e = /^(top|right|bottom|left)$/;
        t.getComputedStyle ? (fe = function (e) {
            var n = e.ownerDocument.defaultView;
            return n && n.opener || (n = t), n.getComputedStyle(e)
        }, ge = function (t, e, n) {
            var i, r, o, a, s = t.style;
            return n = n || fe(t), a = n ? n.getPropertyValue(e) || n[e] : void 0, "" !== a && void 0 !== a || pt.contains(t.ownerDocument, t) || (a = pt.style(t, e)), n && !ct.pixelMarginRight() && ce.test(a) && ue.test(e) && (i = s.width, r = s.minWidth, o = s.maxWidth, s.minWidth = s.maxWidth = s.width = a, a = n.width, s.width = i, s.minWidth = r, s.maxWidth = o), void 0 === a ? a : a + ""
        }) : pe.currentStyle && (fe = function (t) {
            return t.currentStyle
        }, ge = function (t, e, n) {
            var i, r, o, a, s = t.style;
            return n = n || fe(t), a = n ? n[e] : void 0, null == a && s && s[e] && (a = s[e]), ce.test(a) && !$e.test(e) && (i = s.left, r = t.runtimeStyle, o = r && r.left, o && (r.left = t.currentStyle.left), s.left = "fontSize" === e ? "1em" : a, a = s.pixelLeft + "px", s.left = i, o && (r.left = o)), void 0 === a ? a : a + "" || "auto"
        });
        var me = /alpha\([^)]*\)/i, ve = /opacity\s*=\s*([^)]*)/i, ye = /^(none|table(?!-c[ea]).+)/,
            be = new RegExp("^(" + Pt + ")(.*)$", "i"),
            Ce = {position: "absolute", visibility: "hidden", display: "block"},
            we = {letterSpacing: "0", fontWeight: "400"}, xe = ["Webkit", "O", "Moz", "ms"],
            Se = it.createElement("div").style;
        pt.extend({
            cssHooks: {
                opacity: {
                    get: function (t, e) {
                        if (e) {
                            var n = ge(t, "opacity");
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
            cssProps: {float: ct.cssFloat ? "cssFloat" : "styleFloat"},
            style: function (t, e, n, i) {
                if (t && 3 !== t.nodeType && 8 !== t.nodeType && t.style) {
                    var r, o, a, s = pt.camelCase(e), d = t.style;
                    if (e = pt.cssProps[s] || (pt.cssProps[s] = L(s) || s), a = pt.cssHooks[e] || pt.cssHooks[s], void 0 === n) return a && "get" in a && void 0 !== (r = a.get(t, !1, i)) ? r : d[e];
                    if (o = typeof n, "string" === o && (r = Mt.exec(n)) && r[1] && (n = h(t, e, r), o = "number"), null != n && n === n && ("number" === o && (n += r && r[3] || (pt.cssNumber[s] ? "" : "px")), ct.clearCloneStyle || "" !== n || 0 !== e.indexOf("background") || (d[e] = "inherit"), !(a && "set" in a && void 0 === (n = a.set(t, n, i))))) try {
                        d[e] = n
                    } catch (t) {
                    }
                }
            },
            css: function (t, e, n, i) {
                var r, o, a, s = pt.camelCase(e);
                return e = pt.cssProps[s] || (pt.cssProps[s] = L(s) || s), a = pt.cssHooks[e] || pt.cssHooks[s], a && "get" in a && (o = a.get(t, !0, n)), void 0 === o && (o = ge(t, e, i)), "normal" === o && e in we && (o = we[e]), "" === n || n ? (r = parseFloat(o), n === !0 || isFinite(r) ? r || 0 : o) : o
            }
        }), pt.each(["height", "width"], function (t, e) {
            pt.cssHooks[e] = {
                get: function (t, n, i) {
                    if (n) return ye.test(pt.css(t, "display")) && 0 === t.offsetWidth ? he(t, Ce, function () {
                        return M(t, e, i)
                    }) : M(t, e, i)
                }, set: function (t, n, i) {
                    var r = i && fe(t);
                    return E(t, n, i ? P(t, e, i, ct.boxSizing && "border-box" === pt.css(t, "boxSizing", !1, r), r) : 0)
                }
            }
        }), ct.opacity || (pt.cssHooks.opacity = {
            get: function (t, e) {
                return ve.test((e && t.currentStyle ? t.currentStyle.filter : t.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : e ? "1" : ""
            }, set: function (t, e) {
                var n = t.style, i = t.currentStyle, r = pt.isNumeric(e) ? "alpha(opacity=" + 100 * e + ")" : "",
                    o = i && i.filter || n.filter || "";
                n.zoom = 1, (e >= 1 || "" === e) && "" === pt.trim(o.replace(me, "")) && n.removeAttribute && (n.removeAttribute("filter"), "" === e || i && !i.filter) || (n.filter = me.test(o) ? o.replace(me, r) : o + " " + r)
            }
        }), pt.cssHooks.marginRight = j(ct.reliableMarginRight, function (t, e) {
            if (e) return he(t, {display: "inline-block"}, ge, [t, "marginRight"])
        }), pt.cssHooks.marginLeft = j(ct.reliableMarginLeft, function (t, e) {
            if (e) return (parseFloat(ge(t, "marginLeft")) || (pt.contains(t.ownerDocument, t) ? t.getBoundingClientRect().left - he(t, {marginLeft: 0}, function () {
                return t.getBoundingClientRect().left
            }) : 0)) + "px"
        }), pt.each({margin: "", padding: "", border: "Width"}, function (t, e) {
            pt.cssHooks[t + e] = {
                expand: function (n) {
                    for (var i = 0, r = {}, o = "string" == typeof n ? n.split(" ") : [n]; i < 4; i++) r[t + Rt[i] + e] = o[i] || o[i - 2] || o[0];
                    return r
                }
            }, ue.test(t) || (pt.cssHooks[t + e].set = E)
        }), pt.fn.extend({
            css: function (t, e) {
                return Ht(this, function (t, e, n) {
                    var i, r, o = {}, a = 0;
                    if (pt.isArray(e)) {
                        for (i = fe(t), r = e.length; a < r; a++) o[e[a]] = pt.css(t, e[a], !1, i);
                        return o
                    }
                    return void 0 !== n ? pt.style(t, e, n) : pt.css(t, e)
                }, t, e, arguments.length > 1)
            }, show: function () {
                return N(this, !0)
            }, hide: function () {
                return N(this)
            }, toggle: function (t) {
                return "boolean" == typeof t ? t ? this.show() : this.hide() : this.each(function () {
                    Ot(this) ? pt(this).show() : pt(this).hide()
                })
            }
        }), pt.Tween = R, R.prototype = {
            constructor: R, init: function (t, e, n, i, r, o) {
                this.elem = t, this.prop = n, this.easing = r || pt.easing._default, this.options = e, this.start = this.now = this.cur(), this.end = i, this.unit = o || (pt.cssNumber[n] ? "" : "px")
            }, cur: function () {
                var t = R.propHooks[this.prop];
                return t && t.get ? t.get(this) : R.propHooks._default.get(this)
            }, run: function (t) {
                var e, n = R.propHooks[this.prop];
                return this.options.duration ? this.pos = e = pt.easing[this.easing](t, this.options.duration * t, 0, 1, this.options.duration) : this.pos = e = t, this.now = (this.end - this.start) * e + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : R.propHooks._default.set(this), this
            }
        }, R.prototype.init.prototype = R.prototype, R.propHooks = {
            _default: {
                get: function (t) {
                    var e;
                    return 1 !== t.elem.nodeType || null != t.elem[t.prop] && null == t.elem.style[t.prop] ? t.elem[t.prop] : (e = pt.css(t.elem, t.prop, ""), e && "auto" !== e ? e : 0)
                }, set: function (t) {
                    pt.fx.step[t.prop] ? pt.fx.step[t.prop](t) : 1 !== t.elem.nodeType || null == t.elem.style[pt.cssProps[t.prop]] && !pt.cssHooks[t.prop] ? t.elem[t.prop] = t.now : pt.style(t.elem, t.prop, t.now + t.unit)
                }
            }
        }, R.propHooks.scrollTop = R.propHooks.scrollLeft = {
            set: function (t) {
                t.elem.nodeType && t.elem.parentNode && (t.elem[t.prop] = t.now)
            }
        }, pt.easing = {
            linear: function (t) {
                return t
            }, swing: function (t) {
                return .5 - Math.cos(t * Math.PI) / 2
            }, _default: "swing"
        }, pt.fx = R.prototype.init, pt.fx.step = {};
        var Te, ke, De = /^(?:toggle|show|hide)$/, _e = /queueHooks$/;
        pt.Animation = pt.extend(U, {
            tweeners: {
                "*": [function (t, e) {
                    var n = this.createTween(t, e);
                    return h(n.elem, t, Mt.exec(e), n), n
                }]
            }, tweener: function (t, e) {
                pt.isFunction(t) ? (e = t, t = ["*"]) : t = t.match(It);
                for (var n, i = 0, r = t.length; i < r; i++) n = t[i], U.tweeners[n] = U.tweeners[n] || [], U.tweeners[n].unshift(e)
            }, prefilters: [B], prefilter: function (t, e) {
                e ? U.prefilters.unshift(t) : U.prefilters.push(t)
            }
        }), pt.speed = function (t, e, n) {
            var i = t && "object" == typeof t ? pt.extend({}, t) : {
                complete: n || !n && e || pt.isFunction(t) && t,
                duration: t,
                easing: n && e || e && !pt.isFunction(e) && e
            };
            return i.duration = pt.fx.off ? 0 : "number" == typeof i.duration ? i.duration : i.duration in pt.fx.speeds ? pt.fx.speeds[i.duration] : pt.fx.speeds._default, null != i.queue && i.queue !== !0 || (i.queue = "fx"), i.old = i.complete, i.complete = function () {
                pt.isFunction(i.old) && i.old.call(this), i.queue && pt.dequeue(this, i.queue)
            }, i
        }, pt.fn.extend({
            fadeTo: function (t, e, n, i) {
                return this.filter(Ot).css("opacity", 0).show().end().animate({opacity: e}, t, n, i)
            }, animate: function (t, e, n, i) {
                var r = pt.isEmptyObject(t), o = pt.speed(e, n, i), a = function () {
                    var e = U(this, pt.extend({}, t), o);
                    (r || pt._data(this, "finish")) && e.stop(!0)
                };
                return a.finish = a, r || o.queue === !1 ? this.each(a) : this.queue(o.queue, a)
            }, stop: function (t, e, n) {
                var i = function (t) {
                    var e = t.stop;
                    delete t.stop, e(n)
                };
                return "string" != typeof t && (n = e, e = t, t = void 0), e && t !== !1 && this.queue(t || "fx", []), this.each(function () {
                    var e = !0, r = null != t && t + "queueHooks", o = pt.timers, a = pt._data(this);
                    if (r) a[r] && a[r].stop && i(a[r]); else for (r in a) a[r] && a[r].stop && _e.test(r) && i(a[r]);
                    for (r = o.length; r--;) o[r].elem !== this || null != t && o[r].queue !== t || (o[r].anim.stop(n), e = !1, o.splice(r, 1));
                    !e && n || pt.dequeue(this, t)
                })
            }, finish: function (t) {
                return t !== !1 && (t = t || "fx"), this.each(function () {
                    var e, n = pt._data(this), i = n[t + "queue"], r = n[t + "queueHooks"], o = pt.timers,
                        a = i ? i.length : 0;
                    for (n.finish = !0, pt.queue(this, t, []), r && r.stop && r.stop.call(this, !0), e = o.length; e--;) o[e].elem === this && o[e].queue === t && (o[e].anim.stop(!0), o.splice(e, 1));
                    for (e = 0; e < a; e++) i[e] && i[e].finish && i[e].finish.call(this);
                    delete n.finish
                })
            }
        }), pt.each(["toggle", "show", "hide"], function (t, e) {
            var n = pt.fn[e];
            pt.fn[e] = function (t, i, r) {
                return null == t || "boolean" == typeof t ? n.apply(this, arguments) : this.animate(H(e, !0), t, i, r)
            }
        }), pt.each({
            slideDown: H("show"),
            slideUp: H("hide"),
            slideToggle: H("toggle"),
            fadeIn: {opacity: "show"},
            fadeOut: {opacity: "hide"},
            fadeToggle: {opacity: "toggle"}
        }, function (t, e) {
            pt.fn[t] = function (t, n, i) {
                return this.animate(e, t, n, i)
            }
        }), pt.timers = [], pt.fx.tick = function () {
            var t, e = pt.timers, n = 0;
            for (Te = pt.now(); n < e.length; n++) t = e[n], t() || e[n] !== t || e.splice(n--, 1);
            e.length || pt.fx.stop(), Te = void 0
        }, pt.fx.timer = function (t) {
            pt.timers.push(t), t() ? pt.fx.start() : pt.timers.pop()
        }, pt.fx.interval = 13, pt.fx.start = function () {
            ke || (ke = t.setInterval(pt.fx.tick, pt.fx.interval))
        }, pt.fx.stop = function () {
            t.clearInterval(ke), ke = null
        }, pt.fx.speeds = {slow: 600, fast: 200, _default: 400}, pt.fn.delay = function (e, n) {
            return e = pt.fx ? pt.fx.speeds[e] || e : e, n = n || "fx", this.queue(n, function (n, i) {
                var r = t.setTimeout(n, e);
                i.stop = function () {
                    t.clearTimeout(r)
                }
            })
        }, function () {
            var t, e = it.createElement("input"), n = it.createElement("div"), i = it.createElement("select"),
                r = i.appendChild(it.createElement("option"));
            n = it.createElement("div"), n.setAttribute("className", "t"), n.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", t = n.getElementsByTagName("a")[0], e.setAttribute("type", "checkbox"), n.appendChild(e), t = n.getElementsByTagName("a")[0], t.style.cssText = "top:1px", ct.getSetAttribute = "t" !== n.className, ct.style = /top/.test(t.getAttribute("style")), ct.hrefNormalized = "/a" === t.getAttribute("href"), ct.checkOn = !!e.value, ct.optSelected = r.selected, ct.enctype = !!it.createElement("form").enctype, i.disabled = !0, ct.optDisabled = !r.disabled, e = it.createElement("input"), e.setAttribute("value", ""), ct.input = "" === e.getAttribute("value"), e.value = "t", e.setAttribute("type", "radio"), ct.radioValue = "t" === e.value
        }();
        var Ie = /\r/g, Ae = /[\x20\t\r\n\f]+/g;
        pt.fn.extend({
            val: function (t) {
                var e, n, i, r = this[0];
                {
                    if (arguments.length) return i = pt.isFunction(t), this.each(function (n) {
                        var r;
                        1 === this.nodeType && (r = i ? t.call(this, n, pt(this).val()) : t, null == r ? r = "" : "number" == typeof r ? r += "" : pt.isArray(r) && (r = pt.map(r, function (t) {
                            return null == t ? "" : t + ""
                        })), e = pt.valHooks[this.type] || pt.valHooks[this.nodeName.toLowerCase()], e && "set" in e && void 0 !== e.set(this, r, "value") || (this.value = r))
                    });
                    if (r) return e = pt.valHooks[r.type] || pt.valHooks[r.nodeName.toLowerCase()], e && "get" in e && void 0 !== (n = e.get(r, "value")) ? n : (n = r.value, "string" == typeof n ? n.replace(Ie, "") : null == n ? "" : n)
                }
            }
        }), pt.extend({
            valHooks: {
                option: {
                    get: function (t) {
                        var e = pt.find.attr(t, "value");
                        return null != e ? e : pt.trim(pt.text(t)).replace(Ae, " ")
                    }
                }, select: {
                    get: function (t) {
                        for (var e, n, i = t.options, r = t.selectedIndex, o = "select-one" === t.type || r < 0, a = o ? null : [], s = o ? r + 1 : i.length, d = r < 0 ? s : o ? r : 0; d < s; d++) if (n = i[d], (n.selected || d === r) && (ct.optDisabled ? !n.disabled : null === n.getAttribute("disabled")) && (!n.parentNode.disabled || !pt.nodeName(n.parentNode, "optgroup"))) {
                            if (e = pt(n).val(), o) return e;
                            a.push(e)
                        }
                        return a
                    }, set: function (t, e) {
                        for (var n, i, r = t.options, o = pt.makeArray(e), a = r.length; a--;) if (i = r[a], pt.inArray(pt.valHooks.option.get(i), o) > -1) try {
                            i.selected = n = !0
                        } catch (t) {
                            i.scrollHeight
                        } else i.selected = !1;
                        return n || (t.selectedIndex = -1), r
                    }
                }
            }
        }), pt.each(["radio", "checkbox"], function () {
            pt.valHooks[this] = {
                set: function (t, e) {
                    if (pt.isArray(e)) return t.checked = pt.inArray(pt(t).val(), e) > -1
                }
            }, ct.checkOn || (pt.valHooks[this].get = function (t) {
                return null === t.getAttribute("value") ? "on" : t.value
            })
        });
        var je, Le, Ne = pt.expr.attrHandle, Ee = /^(?:checked|selected)$/i, Pe = ct.getSetAttribute, Me = ct.input;
        pt.fn.extend({
            attr: function (t, e) {
                return Ht(this, pt.attr, t, e, arguments.length > 1)
            }, removeAttr: function (t) {
                return this.each(function () {
                    pt.removeAttr(this, t)
                })
            }
        }), pt.extend({
            attr: function (t, e, n) {
                var i, r, o = t.nodeType;
                if (3 !== o && 8 !== o && 2 !== o) return "undefined" == typeof t.getAttribute ? pt.prop(t, e, n) : (1 === o && pt.isXMLDoc(t) || (e = e.toLowerCase(), r = pt.attrHooks[e] || (pt.expr.match.bool.test(e) ? Le : je)), void 0 !== n ? null === n ? void pt.removeAttr(t, e) : r && "set" in r && void 0 !== (i = r.set(t, n, e)) ? i : (t.setAttribute(e, n + ""), n) : r && "get" in r && null !== (i = r.get(t, e)) ? i : (i = pt.find.attr(t, e), null == i ? void 0 : i))
            }, attrHooks: {
                type: {
                    set: function (t, e) {
                        if (!ct.radioValue && "radio" === e && pt.nodeName(t, "input")) {
                            var n = t.value;
                            return t.setAttribute("type", e), n && (t.value = n), e
                        }
                    }
                }
            }, removeAttr: function (t, e) {
                var n, i, r = 0, o = e && e.match(It);
                if (o && 1 === t.nodeType) for (; n = o[r++];) i = pt.propFix[n] || n, pt.expr.match.bool.test(n) ? Me && Pe || !Ee.test(n) ? t[i] = !1 : t[pt.camelCase("default-" + n)] = t[i] = !1 : pt.attr(t, n, ""), t.removeAttribute(Pe ? n : i)
            }
        }), Le = {
            set: function (t, e, n) {
                return e === !1 ? pt.removeAttr(t, n) : Me && Pe || !Ee.test(n) ? t.setAttribute(!Pe && pt.propFix[n] || n, n) : t[pt.camelCase("default-" + n)] = t[n] = !0, n
            }
        }, pt.each(pt.expr.match.bool.source.match(/\w+/g), function (t, e) {
            var n = Ne[e] || pt.find.attr;
            Me && Pe || !Ee.test(e) ? Ne[e] = function (t, e, i) {
                var r, o;
                return i || (o = Ne[e], Ne[e] = r, r = null != n(t, e, i) ? e.toLowerCase() : null, Ne[e] = o), r
            } : Ne[e] = function (t, e, n) {
                if (!n) return t[pt.camelCase("default-" + e)] ? e.toLowerCase() : null
            }
        }), Me && Pe || (pt.attrHooks.value = {
            set: function (t, e, n) {
                return pt.nodeName(t, "input") ? void(t.defaultValue = e) : je && je.set(t, e, n)
            }
        }), Pe || (je = {
            set: function (t, e, n) {
                var i = t.getAttributeNode(n);
                if (i || t.setAttributeNode(i = t.ownerDocument.createAttribute(n)), i.value = e += "", "value" === n || e === t.getAttribute(n)) return e
            }
        }, Ne.id = Ne.name = Ne.coords = function (t, e, n) {
            var i;
            if (!n) return (i = t.getAttributeNode(e)) && "" !== i.value ? i.value : null
        }, pt.valHooks.button = {
            get: function (t, e) {
                var n = t.getAttributeNode(e);
                if (n && n.specified) return n.value
            }, set: je.set
        }, pt.attrHooks.contenteditable = {
            set: function (t, e, n) {
                je.set(t, "" !== e && e, n)
            }
        }, pt.each(["width", "height"], function (t, e) {
            pt.attrHooks[e] = {
                set: function (t, n) {
                    if ("" === n) return t.setAttribute(e, "auto"), n
                }
            }
        })), ct.style || (pt.attrHooks.style = {
            get: function (t) {
                return t.style.cssText || void 0
            }, set: function (t, e) {
                return t.style.cssText = e + ""
            }
        });
        var Re = /^(?:input|select|textarea|button|object)$/i, Oe = /^(?:a|area)$/i;
        pt.fn.extend({
            prop: function (t, e) {
                return Ht(this, pt.prop, t, e, arguments.length > 1)
            }, removeProp: function (t) {
                return t = pt.propFix[t] || t, this.each(function () {
                    try {
                        this[t] = void 0, delete this[t]
                    } catch (t) {
                    }
                })
            }
        }), pt.extend({
            prop: function (t, e, n) {
                var i, r, o = t.nodeType;
                if (3 !== o && 8 !== o && 2 !== o) return 1 === o && pt.isXMLDoc(t) || (e = pt.propFix[e] || e, r = pt.propHooks[e]), void 0 !== n ? r && "set" in r && void 0 !== (i = r.set(t, n, e)) ? i : t[e] = n : r && "get" in r && null !== (i = r.get(t, e)) ? i : t[e]
            }, propHooks: {
                tabIndex: {
                    get: function (t) {
                        var e = pt.find.attr(t, "tabindex");
                        return e ? parseInt(e, 10) : Re.test(t.nodeName) || Oe.test(t.nodeName) && t.href ? 0 : -1
                    }
                }
            }, propFix: {for: "htmlFor", class: "className"}
        }), ct.hrefNormalized || pt.each(["href", "src"], function (t, e) {
            pt.propHooks[e] = {
                get: function (t) {
                    return t.getAttribute(e, 4)
                }
            }
        }), ct.optSelected || (pt.propHooks.selected = {
            get: function (t) {
                var e = t.parentNode;
                return e && (e.selectedIndex, e.parentNode && e.parentNode.selectedIndex), null
            }, set: function (t) {
                var e = t.parentNode;
                e && (e.selectedIndex, e.parentNode && e.parentNode.selectedIndex)
            }
        }), pt.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function () {
            pt.propFix[this.toLowerCase()] = this
        }), ct.enctype || (pt.propFix.enctype = "encoding");
        var He = /[\t\r\n\f]/g;
        pt.fn.extend({
            addClass: function (t) {
                var e, n, i, r, o, a, s, d = 0;
                if (pt.isFunction(t)) return this.each(function (e) {
                    pt(this).addClass(t.call(this, e, W(this)))
                });
                if ("string" == typeof t && t) for (e = t.match(It) || []; n = this[d++];) if (r = W(n), i = 1 === n.nodeType && (" " + r + " ").replace(He, " ")) {
                    for (a = 0; o = e[a++];) i.indexOf(" " + o + " ") < 0 && (i += o + " ");
                    s = pt.trim(i), r !== s && pt.attr(n, "class", s)
                }
                return this
            }, removeClass: function (t) {
                var e, n, i, r, o, a, s, d = 0;
                if (pt.isFunction(t)) return this.each(function (e) {
                    pt(this).removeClass(t.call(this, e, W(this)))
                });
                if (!arguments.length) return this.attr("class", "");
                if ("string" == typeof t && t) for (e = t.match(It) || []; n = this[d++];) if (r = W(n), i = 1 === n.nodeType && (" " + r + " ").replace(He, " ")) {
                    for (a = 0; o = e[a++];) for (; i.indexOf(" " + o + " ") > -1;) i = i.replace(" " + o + " ", " ");
                    s = pt.trim(i), r !== s && pt.attr(n, "class", s)
                }
                return this
            }, toggleClass: function (t, e) {
                var n = typeof t;
                return "boolean" == typeof e && "string" === n ? e ? this.addClass(t) : this.removeClass(t) : pt.isFunction(t) ? this.each(function (n) {
                    pt(this).toggleClass(t.call(this, n, W(this), e), e)
                }) : this.each(function () {
                    var e, i, r, o;
                    if ("string" === n) for (i = 0, r = pt(this), o = t.match(It) || []; e = o[i++];) r.hasClass(e) ? r.removeClass(e) : r.addClass(e); else void 0 !== t && "boolean" !== n || (e = W(this), e && pt._data(this, "__className__", e), pt.attr(this, "class", e || t === !1 ? "" : pt._data(this, "__className__") || ""))
                })
            }, hasClass: function (t) {
                var e, n, i = 0;
                for (e = " " + t + " "; n = this[i++];) if (1 === n.nodeType && (" " + W(n) + " ").replace(He, " ").indexOf(e) > -1) return !0;
                return !1
            }
        }), pt.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function (t, e) {
            pt.fn[e] = function (t, n) {
                return arguments.length > 0 ? this.on(e, null, t, n) : this.trigger(e)
            }
        }), pt.fn.extend({
            hover: function (t, e) {
                return this.mouseenter(t).mouseleave(e || t)
            }
        });
        var Fe = t.location, Be = pt.now(), Qe = /\?/,
            Ue = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;
        pt.parseJSON = function (e) {
            if (t.JSON && t.JSON.parse) return t.JSON.parse(e + "");
            var n, i = null, r = pt.trim(e + "");
            return r && !pt.trim(r.replace(Ue, function (t, e, r, o) {
                return n && e && (i = 0), 0 === i ? t : (n = r || e, i += !o - !r, "")
            })) ? Function("return " + r)() : pt.error("Invalid JSON: " + e)
        }, pt.parseXML = function (e) {
            var n, i;
            if (!e || "string" != typeof e) return null;
            try {
                t.DOMParser ? (i = new t.DOMParser, n = i.parseFromString(e, "text/xml")) : (n = new t.ActiveXObject("Microsoft.XMLDOM"), n.async = "false", n.loadXML(e))
            } catch (t) {
                n = void 0
            }
            return n && n.documentElement && !n.getElementsByTagName("parsererror").length || pt.error("Invalid XML: " + e), n
        };
        var We = /#.*$/, ze = /([?&])_=[^&]*/, qe = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm,
            Ve = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/, Ge = /^(?:GET|HEAD)$/, Ke = /^\/\//,
            Je = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/, Xe = {}, Ye = {}, Ze = "*/".concat("*"),
            tn = Fe.href, en = Je.exec(tn.toLowerCase()) || [];
        pt.extend({
            active: 0,
            lastModified: {},
            etag: {},
            ajaxSettings: {
                url: tn,
                type: "GET",
                isLocal: Ve.test(en[1]),
                global: !0,
                processData: !0,
                async: !0,
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                accepts: {
                    "*": Ze,
                    text: "text/plain",
                    html: "text/html",
                    xml: "application/xml, text/xml",
                    json: "application/json, text/javascript"
                },
                contents: {xml: /\bxml\b/, html: /\bhtml/, json: /\bjson\b/},
                responseFields: {xml: "responseXML", text: "responseText", json: "responseJSON"},
                converters: {"* text": String, "text html": !0, "text json": pt.parseJSON, "text xml": pt.parseXML},
                flatOptions: {url: !0, context: !0}
            },
            ajaxSetup: function (t, e) {
                return e ? V(V(t, pt.ajaxSettings), e) : V(pt.ajaxSettings, t)
            },
            ajaxPrefilter: z(Xe),
            ajaxTransport: z(Ye),
            ajax: function (e, n) {
                function i(e, n, i, r) {
                    var o, c, v, y, C, x = n;
                    2 !== b && (b = 2, d && t.clearTimeout(d), u = void 0, s = r || "", w.readyState = e > 0 ? 4 : 0, o = e >= 200 && e < 300 || 304 === e, i && (y = G(h, w, i)), y = K(h, y, w, o), o ? (h.ifModified && (C = w.getResponseHeader("Last-Modified"), C && (pt.lastModified[a] = C), C = w.getResponseHeader("etag"), C && (pt.etag[a] = C)), 204 === e || "HEAD" === h.type ? x = "nocontent" : 304 === e ? x = "notmodified" : (x = y.state, c = y.data, v = y.error, o = !v)) : (v = x, !e && x || (x = "error", e < 0 && (e = 0))), w.status = e, w.statusText = (n || x) + "", o ? g.resolveWith(p, [c, x, w]) : g.rejectWith(p, [w, x, v]), w.statusCode(m), m = void 0, l && f.trigger(o ? "ajaxSuccess" : "ajaxError", [w, h, o ? c : v]), $.fireWith(p, [w, x]), l && (f.trigger("ajaxComplete", [w, h]), --pt.active || pt.event.trigger("ajaxStop")))
                }

                "object" == typeof e && (n = e, e = void 0), n = n || {};
                var r, o, a, s, d, l, u, c, h = pt.ajaxSetup({}, n), p = h.context || h,
                    f = h.context && (p.nodeType || p.jquery) ? pt(p) : pt.event, g = pt.Deferred(),
                    $ = pt.Callbacks("once memory"), m = h.statusCode || {}, v = {}, y = {}, b = 0, C = "canceled",
                    w = {
                        readyState: 0, getResponseHeader: function (t) {
                            var e;
                            if (2 === b) {
                                if (!c) for (c = {}; e = qe.exec(s);) c[e[1].toLowerCase()] = e[2];
                                e = c[t.toLowerCase()]
                            }
                            return null == e ? null : e
                        }, getAllResponseHeaders: function () {
                            return 2 === b ? s : null
                        }, setRequestHeader: function (t, e) {
                            var n = t.toLowerCase();
                            return b || (t = y[n] = y[n] || t, v[t] = e), this
                        }, overrideMimeType: function (t) {
                            return b || (h.mimeType = t), this
                        }, statusCode: function (t) {
                            var e;
                            if (t) if (b < 2) for (e in t) m[e] = [m[e], t[e]]; else w.always(t[w.status]);
                            return this
                        }, abort: function (t) {
                            var e = t || C;
                            return u && u.abort(e), i(0, e), this
                        }
                    };
                if (g.promise(w).complete = $.add, w.success = w.done, w.error = w.fail, h.url = ((e || h.url || tn) + "").replace(We, "").replace(Ke, en[1] + "//"), h.type = n.method || n.type || h.method || h.type, h.dataTypes = pt.trim(h.dataType || "*").toLowerCase().match(It) || [""], null == h.crossDomain && (r = Je.exec(h.url.toLowerCase()), h.crossDomain = !(!r || r[1] === en[1] && r[2] === en[2] && (r[3] || ("http:" === r[1] ? "80" : "443")) === (en[3] || ("http:" === en[1] ? "80" : "443")))), h.data && h.processData && "string" != typeof h.data && (h.data = pt.param(h.data, h.traditional)), q(Xe, h, n, w), 2 === b) return w;
                l = pt.event && h.global, l && 0 === pt.active++ && pt.event.trigger("ajaxStart"), h.type = h.type.toUpperCase(), h.hasContent = !Ge.test(h.type), a = h.url, h.hasContent || (h.data && (a = h.url += (Qe.test(a) ? "&" : "?") + h.data, delete h.data), h.cache === !1 && (h.url = ze.test(a) ? a.replace(ze, "$1_=" + Be++) : a + (Qe.test(a) ? "&" : "?") + "_=" + Be++)), h.ifModified && (pt.lastModified[a] && w.setRequestHeader("If-Modified-Since", pt.lastModified[a]), pt.etag[a] && w.setRequestHeader("If-None-Match", pt.etag[a])), (h.data && h.hasContent && h.contentType !== !1 || n.contentType) && w.setRequestHeader("Content-Type", h.contentType), w.setRequestHeader("Accept", h.dataTypes[0] && h.accepts[h.dataTypes[0]] ? h.accepts[h.dataTypes[0]] + ("*" !== h.dataTypes[0] ? ", " + Ze + "; q=0.01" : "") : h.accepts["*"]);
                for (o in h.headers) w.setRequestHeader(o, h.headers[o]);
                if (h.beforeSend && (h.beforeSend.call(p, w, h) === !1 || 2 === b)) return w.abort();
                C = "abort";
                for (o in{success: 1, error: 1, complete: 1}) w[o](h[o]);
                if (u = q(Ye, h, n, w)) {
                    if (w.readyState = 1, l && f.trigger("ajaxSend", [w, h]), 2 === b) return w;
                    h.async && h.timeout > 0 && (d = t.setTimeout(function () {
                        w.abort("timeout")
                    }, h.timeout));
                    try {
                        b = 1, u.send(v, i)
                    } catch (t) {
                        if (!(b < 2)) throw t;
                        i(-1, t)
                    }
                } else i(-1, "No Transport");
                return w
            },
            getJSON: function (t, e, n) {
                return pt.get(t, e, n, "json")
            },
            getScript: function (t, e) {
                return pt.get(t, void 0, e, "script")
            }
        }), pt.each(["get", "post"], function (t, e) {
            pt[e] = function (t, n, i, r) {
                return pt.isFunction(n) && (r = r || i, i = n, n = void 0), pt.ajax(pt.extend({
                    url: t,
                    type: e,
                    dataType: r,
                    data: n,
                    success: i
                }, pt.isPlainObject(t) && t))
            }
        }), pt._evalUrl = function (t) {
            return pt.ajax({url: t, type: "GET", dataType: "script", cache: !0, async: !1, global: !1, throws: !0})
        }, pt.fn.extend({
            wrapAll: function (t) {
                if (pt.isFunction(t)) return this.each(function (e) {
                    pt(this).wrapAll(t.call(this, e))
                });
                if (this[0]) {
                    var e = pt(t, this[0].ownerDocument).eq(0).clone(!0);
                    this[0].parentNode && e.insertBefore(this[0]), e.map(function () {
                        for (var t = this; t.firstChild && 1 === t.firstChild.nodeType;) t = t.firstChild;
                        return t
                    }).append(this)
                }
                return this
            }, wrapInner: function (t) {
                return pt.isFunction(t) ? this.each(function (e) {
                    pt(this).wrapInner(t.call(this, e))
                }) : this.each(function () {
                    var e = pt(this), n = e.contents();
                    n.length ? n.wrapAll(t) : e.append(t)
                })
            }, wrap: function (t) {
                var e = pt.isFunction(t);
                return this.each(function (n) {
                    pt(this).wrapAll(e ? t.call(this, n) : t)
                })
            }, unwrap: function () {
                return this.parent().each(function () {
                    pt.nodeName(this, "body") || pt(this).replaceWith(this.childNodes)
                }).end()
            }
        }), pt.expr.filters.hidden = function (t) {
            return ct.reliableHiddenOffsets() ? t.offsetWidth <= 0 && t.offsetHeight <= 0 && !t.getClientRects().length : X(t)
        }, pt.expr.filters.visible = function (t) {
            return !pt.expr.filters.hidden(t)
        };
        var nn = /%20/g, rn = /\[\]$/, on = /\r?\n/g, an = /^(?:submit|button|image|reset|file)$/i,
            sn = /^(?:input|select|textarea|keygen)/i;
        pt.param = function (t, e) {
            var n, i = [], r = function (t, e) {
                e = pt.isFunction(e) ? e() : null == e ? "" : e, i[i.length] = encodeURIComponent(t) + "=" + encodeURIComponent(e)
            };
            if (void 0 === e && (e = pt.ajaxSettings && pt.ajaxSettings.traditional), pt.isArray(t) || t.jquery && !pt.isPlainObject(t)) pt.each(t, function () {
                r(this.name, this.value)
            }); else for (n in t) Y(n, t[n], e, r);
            return i.join("&").replace(nn, "+")
        }, pt.fn.extend({
            serialize: function () {
                return pt.param(this.serializeArray())
            }, serializeArray: function () {
                return this.map(function () {
                    var t = pt.prop(this, "elements");
                    return t ? pt.makeArray(t) : this
                }).filter(function () {
                    var t = this.type;
                    return this.name && !pt(this).is(":disabled") && sn.test(this.nodeName) && !an.test(t) && (this.checked || !Ft.test(t))
                }).map(function (t, e) {
                    var n = pt(this).val();
                    return null == n ? null : pt.isArray(n) ? pt.map(n, function (t) {
                        return {name: e.name, value: t.replace(on, "\r\n")}
                    }) : {name: e.name, value: n.replace(on, "\r\n")}
                }).get()
            }
        }), pt.ajaxSettings.xhr = void 0 !== t.ActiveXObject ? function () {
            return this.isLocal ? tt() : it.documentMode > 8 ? Z() : /^(get|post|head|put|delete|options)$/i.test(this.type) && Z() || tt()
        } : Z;
        var dn = 0, ln = {}, un = pt.ajaxSettings.xhr();
        t.attachEvent && t.attachEvent("onunload", function () {
            for (var t in ln) ln[t](void 0, !0)
        }), ct.cors = !!un && "withCredentials" in un, un = ct.ajax = !!un, un && pt.ajaxTransport(function (e) {
            if (!e.crossDomain || ct.cors) {
                var n;
                return {
                    send: function (i, r) {
                        var o, a = e.xhr(), s = ++dn;
                        if (a.open(e.type, e.url, e.async, e.username, e.password), e.xhrFields) for (o in e.xhrFields) a[o] = e.xhrFields[o];
                        e.mimeType && a.overrideMimeType && a.overrideMimeType(e.mimeType), e.crossDomain || i["X-Requested-With"] || (i["X-Requested-With"] = "XMLHttpRequest");
                        for (o in i) void 0 !== i[o] && a.setRequestHeader(o, i[o] + "");
                        a.send(e.hasContent && e.data || null), n = function (t, i) {
                            var o, d, l;
                            if (n && (i || 4 === a.readyState)) if (delete ln[s], n = void 0, a.onreadystatechange = pt.noop, i) 4 !== a.readyState && a.abort(); else {
                                l = {}, o = a.status, "string" == typeof a.responseText && (l.text = a.responseText);
                                try {
                                    d = a.statusText
                                } catch (t) {
                                    d = ""
                                }
                                o || !e.isLocal || e.crossDomain ? 1223 === o && (o = 204) : o = l.text ? 200 : 404
                            }
                            l && r(o, d, l, a.getAllResponseHeaders())
                        }, e.async ? 4 === a.readyState ? t.setTimeout(n) : a.onreadystatechange = ln[s] = n : n()
                    }, abort: function () {
                        n && n(void 0, !0)
                    }
                }
            }
        }), pt.ajaxSetup({
            accepts: {script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},
            contents: {script: /\b(?:java|ecma)script\b/},
            converters: {
                "text script": function (t) {
                    return pt.globalEval(t), t
                }
            }
        }), pt.ajaxPrefilter("script", function (t) {
            void 0 === t.cache && (t.cache = !1), t.crossDomain && (t.type = "GET", t.global = !1)
        }), pt.ajaxTransport("script", function (t) {
            if (t.crossDomain) {
                var e, n = it.head || pt("head")[0] || it.documentElement;
                return {
                    send: function (i, r) {
                        e = it.createElement("script"), e.async = !0, t.scriptCharset && (e.charset = t.scriptCharset), e.src = t.url, e.onload = e.onreadystatechange = function (t, n) {
                            (n || !e.readyState || /loaded|complete/.test(e.readyState)) && (e.onload = e.onreadystatechange = null, e.parentNode && e.parentNode.removeChild(e), e = null, n || r(200, "success"))
                        }, n.insertBefore(e, n.firstChild)
                    }, abort: function () {
                        e && e.onload(void 0, !0)
                    }
                }
            }
        });
        var cn = [], hn = /(=)\?(?=&|$)|\?\?/;
        pt.ajaxSetup({
            jsonp: "callback", jsonpCallback: function () {
                var t = cn.pop() || pt.expando + "_" + Be++;
                return this[t] = !0, t
            }
        }), pt.ajaxPrefilter("json jsonp", function (e, n, i) {
            var r, o, a,
                s = e.jsonp !== !1 && (hn.test(e.url) ? "url" : "string" == typeof e.data && 0 === (e.contentType || "").indexOf("application/x-www-form-urlencoded") && hn.test(e.data) && "data");
            if (s || "jsonp" === e.dataTypes[0]) return r = e.jsonpCallback = pt.isFunction(e.jsonpCallback) ? e.jsonpCallback() : e.jsonpCallback, s ? e[s] = e[s].replace(hn, "$1" + r) : e.jsonp !== !1 && (e.url += (Qe.test(e.url) ? "&" : "?") + e.jsonp + "=" + r), e.converters["script json"] = function () {
                return a || pt.error(r + " was not called"), a[0]
            }, e.dataTypes[0] = "json", o = t[r], t[r] = function () {
                a = arguments
            }, i.always(function () {
                void 0 === o ? pt(t).removeProp(r) : t[r] = o, e[r] && (e.jsonpCallback = n.jsonpCallback, cn.push(r)), a && pt.isFunction(o) && o(a[0]), a = o = void 0
            }), "script"
        }), pt.parseHTML = function (t, e, n) {
            if (!t || "string" != typeof t) return null;
            "boolean" == typeof e && (n = e, e = !1), e = e || it;
            var i = wt.exec(t), r = !n && [];
            return i ? [e.createElement(i[1])] : (i = m([t], e, r), r && r.length && pt(r).remove(), pt.merge([], i.childNodes))
        };
        var pn = pt.fn.load;
        pt.fn.load = function (t, e, n) {
            if ("string" != typeof t && pn) return pn.apply(this, arguments);
            var i, r, o, a = this, s = t.indexOf(" ");
            return s > -1 && (i = pt.trim(t.slice(s, t.length)), t = t.slice(0, s)), pt.isFunction(e) ? (n = e, e = void 0) : e && "object" == typeof e && (r = "POST"), a.length > 0 && pt.ajax({
                url: t,
                type: r || "GET",
                dataType: "html",
                data: e
            }).done(function (t) {
                o = arguments, a.html(i ? pt("<div>").append(pt.parseHTML(t)).find(i) : t)
            }).always(n && function (t, e) {
                a.each(function () {
                    n.apply(this, o || [t.responseText, e, t])
                })
            }), this
        }, pt.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function (t, e) {
            pt.fn[e] = function (t) {
                return this.on(e, t)
            }
        }), pt.expr.filters.animated = function (t) {
            return pt.grep(pt.timers, function (e) {
                return t === e.elem
            }).length
        }, pt.offset = {
            setOffset: function (t, e, n) {
                var i, r, o, a, s, d, l, u = pt.css(t, "position"), c = pt(t), h = {};
                "static" === u && (t.style.position = "relative"), s = c.offset(), o = pt.css(t, "top"), d = pt.css(t, "left"), l = ("absolute" === u || "fixed" === u) && pt.inArray("auto", [o, d]) > -1, l ? (i = c.position(), a = i.top, r = i.left) : (a = parseFloat(o) || 0, r = parseFloat(d) || 0), pt.isFunction(e) && (e = e.call(t, n, pt.extend({}, s))), null != e.top && (h.top = e.top - s.top + a), null != e.left && (h.left = e.left - s.left + r), "using" in e ? e.using.call(t, h) : c.css(h)
            }
        }, pt.fn.extend({
            offset: function (t) {
                if (arguments.length) return void 0 === t ? this : this.each(function (e) {
                    pt.offset.setOffset(this, t, e)
                });
                var e, n, i = {top: 0, left: 0}, r = this[0], o = r && r.ownerDocument;
                if (o) return e = o.documentElement, pt.contains(e, r) ? ("undefined" != typeof r.getBoundingClientRect && (i = r.getBoundingClientRect()), n = et(o), {
                    top: i.top + (n.pageYOffset || e.scrollTop) - (e.clientTop || 0),
                    left: i.left + (n.pageXOffset || e.scrollLeft) - (e.clientLeft || 0)
                }) : i
            }, position: function () {
                if (this[0]) {
                    var t, e, n = {top: 0, left: 0}, i = this[0];
                    return "fixed" === pt.css(i, "position") ? e = i.getBoundingClientRect() : (t = this.offsetParent(), e = this.offset(), pt.nodeName(t[0], "html") || (n = t.offset()), n.top += pt.css(t[0], "borderTopWidth", !0), n.left += pt.css(t[0], "borderLeftWidth", !0)), {
                        top: e.top - n.top - pt.css(i, "marginTop", !0),
                        left: e.left - n.left - pt.css(i, "marginLeft", !0)
                    }
                }
            }, offsetParent: function () {
                return this.map(function () {
                    for (var t = this.offsetParent; t && !pt.nodeName(t, "html") && "static" === pt.css(t, "position");) t = t.offsetParent;
                    return t || pe
                })
            }
        }), pt.each({scrollLeft: "pageXOffset", scrollTop: "pageYOffset"}, function (t, e) {
            var n = /Y/.test(e);
            pt.fn[t] = function (i) {
                return Ht(this, function (t, i, r) {
                    var o = et(t);
                    return void 0 === r ? o ? e in o ? o[e] : o.document.documentElement[i] : t[i] : void(o ? o.scrollTo(n ? pt(o).scrollLeft() : r, n ? r : pt(o).scrollTop()) : t[i] = r)
                }, t, i, arguments.length, null)
            }
        }), pt.each(["top", "left"], function (t, e) {
            pt.cssHooks[e] = j(ct.pixelPosition, function (t, n) {
                if (n) return n = ge(t, e), ce.test(n) ? pt(t).position()[e] + "px" : n
            })
        }), pt.each({Height: "height", Width: "width"}, function (t, e) {
            pt.each({padding: "inner" + t, content: e, "": "outer" + t}, function (n, i) {
                pt.fn[i] = function (i, r) {
                    var o = arguments.length && (n || "boolean" != typeof i),
                        a = n || (i === !0 || r === !0 ? "margin" : "border");
                    return Ht(this, function (e, n, i) {
                        var r;
                        return pt.isWindow(e) ? e.document.documentElement["client" + t] : 9 === e.nodeType ? (r = e.documentElement, Math.max(e.body["scroll" + t], r["scroll" + t], e.body["offset" + t], r["offset" + t], r["client" + t])) : void 0 === i ? pt.css(e, n, a) : pt.style(e, n, i, a)
                    }, e, o ? i : void 0, o, null)
                }
            })
        }), pt.fn.extend({
            bind: function (t, e, n) {
                return this.on(t, null, e, n)
            }, unbind: function (t, e) {
                return this.off(t, null, e)
            }, delegate: function (t, e, n, i) {
                return this.on(e, t, n, i)
            }, undelegate: function (t, e, n) {
                return 1 === arguments.length ? this.off(t, "**") : this.off(e, t || "**", n)
            }
        }), pt.fn.size = function () {
            return this.length
        }, pt.fn.andSelf = pt.fn.addBack, "function" == typeof define && define.amd && define("jquery", [], function () {
            return pt
        });
        var fn = t.jQuery, gn = t.$;
        return pt.noConflict = function (e) {
            return t.$ === pt && (t.$ = gn), e && t.jQuery === pt && (t.jQuery = fn), pt
        }, e || (t.jQuery = t.$ = pt), pt
    }), "undefined" == typeof jQuery) throw new Error("Bootstrap's JavaScript requires jQuery");
+function (t) {
    "use strict";
    var e = t.fn.jquery.split(" ")[0].split(".");
    if (e[0] < 2 && e[1] < 9 || 1 == e[0] && 9 == e[1] && e[2] < 1 || e[0] > 3) throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher, but lower than version 4")
}(jQuery), +function (t) {
    "use strict";

    function e() {
        var t = document.createElement("bootstrap"), e = {
            WebkitTransition: "webkitTransitionEnd",
            MozTransition: "transitionend",
            OTransition: "oTransitionEnd otransitionend",
            transition: "transitionend"
        };
        for (var n in e) if (void 0 !== t.style[n]) return {end: e[n]};
        return !1
    }

    t.fn.emulateTransitionEnd = function (e) {
        var n = !1, i = this;
        t(this).one("bsTransitionEnd", function () {
            n = !0
        });
        var r = function () {
            n || t(i).trigger(t.support.transition.end)
        };
        return setTimeout(r, e), this
    }, t(function () {
        t.support.transition = e(), t.support.transition && (t.event.special.bsTransitionEnd = {
            bindType: t.support.transition.end,
            delegateType: t.support.transition.end,
            handle: function (e) {
                if (t(e.target).is(this)) return e.handleObj.handler.apply(this, arguments)
            }
        })
    })
}(jQuery), +function (t) {
    "use strict";

    function e(e) {
        return this.each(function () {
            var n = t(this), r = n.data("bs.alert");
            r || n.data("bs.alert", r = new i(this)), "string" == typeof e && r[e].call(n)
        })
    }

    var n = '[data-dismiss="alert"]', i = function (e) {
        t(e).on("click", n, this.close)
    };
    i.VERSION = "3.3.7", i.TRANSITION_DURATION = 150, i.prototype.close = function (e) {
        function n() {
            a.detach().trigger("closed.bs.alert").remove()
        }

        var r = t(this), o = r.attr("data-target");
        o || (o = r.attr("href"), o = o && o.replace(/.*(?=#[^\s]*$)/, ""));
        var a = t("#" === o ? [] : o);
        e && e.preventDefault(), a.length || (a = r.closest(".alert")), a.trigger(e = t.Event("close.bs.alert")), e.isDefaultPrevented() || (a.removeClass("in"), t.support.transition && a.hasClass("fade") ? a.one("bsTransitionEnd", n).emulateTransitionEnd(i.TRANSITION_DURATION) : n())
    };
    var r = t.fn.alert;
    t.fn.alert = e, t.fn.alert.Constructor = i, t.fn.alert.noConflict = function () {
        return t.fn.alert = r, this
    }, t(document).on("click.bs.alert.data-api", n, i.prototype.close)
}(jQuery), +function (t) {
    "use strict";

    function e(e) {
        return this.each(function () {
            var i = t(this), r = i.data("bs.button"), o = "object" == typeof e && e;
            r || i.data("bs.button", r = new n(this, o)), "toggle" == e ? r.toggle() : e && r.setState(e)
        })
    }

    var n = function (e, i) {
        this.$element = t(e), this.options = t.extend({}, n.DEFAULTS, i), this.isLoading = !1
    };
    n.VERSION = "3.3.7", n.DEFAULTS = {loadingText: "loading..."}, n.prototype.setState = function (e) {
        var n = "disabled", i = this.$element, r = i.is("input") ? "val" : "html", o = i.data();
        e += "Text", null == o.resetText && i.data("resetText", i[r]()), setTimeout(t.proxy(function () {
            i[r](null == o[e] ? this.options[e] : o[e]), "loadingText" == e ? (this.isLoading = !0, i.addClass(n).attr(n, n).prop(n, !0)) : this.isLoading && (this.isLoading = !1, i.removeClass(n).removeAttr(n).prop(n, !1))
        }, this), 0)
    }, n.prototype.toggle = function () {
        var t = !0, e = this.$element.closest('[data-toggle="buttons"]');
        if (e.length) {
            var n = this.$element.find("input");
            "radio" == n.prop("type") ? (n.prop("checked") && (t = !1), e.find(".active").removeClass("active"), this.$element.addClass("active")) : "checkbox" == n.prop("type") && (n.prop("checked") !== this.$element.hasClass("active") && (t = !1), this.$element.toggleClass("active")), n.prop("checked", this.$element.hasClass("active")), t && n.trigger("change")
        } else this.$element.attr("aria-pressed", !this.$element.hasClass("active")), this.$element.toggleClass("active")
    };
    var i = t.fn.button;
    t.fn.button = e, t.fn.button.Constructor = n, t.fn.button.noConflict = function () {
        return t.fn.button = i, this
    }, t(document).on("click.bs.button.data-api", '[data-toggle^="button"]', function (n) {
        var i = t(n.target).closest(".btn");
        e.call(i, "toggle"), t(n.target).is('input[type="radio"], input[type="checkbox"]') || (n.preventDefault(), i.is("input,button") ? i.trigger("focus") : i.find("input:visible,button:visible").first().trigger("focus"))
    }).on("focus.bs.button.data-api blur.bs.button.data-api", '[data-toggle^="button"]', function (e) {
        t(e.target).closest(".btn").toggleClass("focus", /^focus(in)?$/.test(e.type))
    })
}(jQuery), +function (t) {
    "use strict";

    function e(e) {
        return this.each(function () {
            var i = t(this), r = i.data("bs.carousel"),
                o = t.extend({}, n.DEFAULTS, i.data(), "object" == typeof e && e),
                a = "string" == typeof e ? e : o.slide;
            r || i.data("bs.carousel", r = new n(this, o)), "number" == typeof e ? r.to(e) : a ? r[a]() : o.interval && r.pause().cycle()
        })
    }

    var n = function (e, n) {
        this.$element = t(e), this.$indicators = this.$element.find(".carousel-indicators"), this.options = n, this.paused = null, this.sliding = null, this.interval = null, this.$active = null, this.$items = null, this.options.keyboard && this.$element.on("keydown.bs.carousel", t.proxy(this.keydown, this)), "hover" == this.options.pause && !("ontouchstart" in document.documentElement) && this.$element.on("mouseenter.bs.carousel", t.proxy(this.pause, this)).on("mouseleave.bs.carousel", t.proxy(this.cycle, this))
    };
    n.VERSION = "3.3.7", n.TRANSITION_DURATION = 600, n.DEFAULTS = {
        interval: 5e3,
        pause: "hover",
        wrap: !0,
        keyboard: !0
    }, n.prototype.keydown = function (t) {
        if (!/input|textarea/i.test(t.target.tagName)) {
            switch (t.which) {
                case 37:
                    this.prev();
                    break;
                case 39:
                    this.next();
                    break;
                default:
                    return
            }
            t.preventDefault()
        }
    }, n.prototype.cycle = function (e) {
        return e || (this.paused = !1), this.interval && clearInterval(this.interval), this.options.interval && !this.paused && (this.interval = setInterval(t.proxy(this.next, this), this.options.interval)), this
    }, n.prototype.getItemIndex = function (t) {
        return this.$items = t.parent().children(".item"), this.$items.index(t || this.$active)
    }, n.prototype.getItemForDirection = function (t, e) {
        var n = this.getItemIndex(e), i = "prev" == t && 0 === n || "next" == t && n == this.$items.length - 1;
        if (i && !this.options.wrap) return e;
        var r = "prev" == t ? -1 : 1, o = (n + r) % this.$items.length;
        return this.$items.eq(o)
    }, n.prototype.to = function (t) {
        var e = this, n = this.getItemIndex(this.$active = this.$element.find(".item.active"));
        if (!(t > this.$items.length - 1 || t < 0)) return this.sliding ? this.$element.one("slid.bs.carousel", function () {
            e.to(t)
        }) : n == t ? this.pause().cycle() : this.slide(t > n ? "next" : "prev", this.$items.eq(t))
    }, n.prototype.pause = function (e) {
        return e || (this.paused = !0), this.$element.find(".next, .prev").length && t.support.transition && (this.$element.trigger(t.support.transition.end), this.cycle(!0)), this.interval = clearInterval(this.interval), this
    }, n.prototype.next = function () {
        if (!this.sliding) return this.slide("next")
    }, n.prototype.prev = function () {
        if (!this.sliding) return this.slide("prev")
    }, n.prototype.slide = function (e, i) {
        var r = this.$element.find(".item.active"), o = i || this.getItemForDirection(e, r), a = this.interval,
            s = "next" == e ? "left" : "right", d = this;
        if (o.hasClass("active")) return this.sliding = !1;
        var l = o[0], u = t.Event("slide.bs.carousel", {relatedTarget: l, direction: s});
        if (this.$element.trigger(u), !u.isDefaultPrevented()) {
            if (this.sliding = !0, a && this.pause(), this.$indicators.length) {
                this.$indicators.find(".active").removeClass("active");
                var c = t(this.$indicators.children()[this.getItemIndex(o)]);
                c && c.addClass("active")
            }
            var h = t.Event("slid.bs.carousel", {relatedTarget: l, direction: s});
            return t.support.transition && this.$element.hasClass("slide") ? (o.addClass(e), o[0].offsetWidth, r.addClass(s), o.addClass(s), r.one("bsTransitionEnd", function () {
                o.removeClass([e, s].join(" ")).addClass("active"), r.removeClass(["active", s].join(" ")), d.sliding = !1, setTimeout(function () {
                    d.$element.trigger(h)
                }, 0)
            }).emulateTransitionEnd(n.TRANSITION_DURATION)) : (r.removeClass("active"), o.addClass("active"), this.sliding = !1, this.$element.trigger(h)), a && this.cycle(), this
        }
    };
    var i = t.fn.carousel;
    t.fn.carousel = e, t.fn.carousel.Constructor = n, t.fn.carousel.noConflict = function () {
        return t.fn.carousel = i, this
    };
    var r = function (n) {
        var i, r = t(this), o = t(r.attr("data-target") || (i = r.attr("href")) && i.replace(/.*(?=#[^\s]+$)/, ""));
        if (o.hasClass("carousel")) {
            var a = t.extend({}, o.data(), r.data()), s = r.attr("data-slide-to");
            s && (a.interval = !1), e.call(o, a), s && o.data("bs.carousel").to(s), n.preventDefault()
        }
    };
    t(document).on("click.bs.carousel.data-api", "[data-slide]", r).on("click.bs.carousel.data-api", "[data-slide-to]", r), t(window).on("load", function () {
        t('[data-ride="carousel"]').each(function () {
            var n = t(this);
            e.call(n, n.data())
        })
    })
}(jQuery), +function (t) {
    "use strict";

    function e(e) {
        var n, i = e.attr("data-target") || (n = e.attr("href")) && n.replace(/.*(?=#[^\s]+$)/, "");
        return t(i)
    }

    function n(e) {
        return this.each(function () {
            var n = t(this), r = n.data("bs.collapse"),
                o = t.extend({}, i.DEFAULTS, n.data(), "object" == typeof e && e);
            !r && o.toggle && /show|hide/.test(e) && (o.toggle = !1), r || n.data("bs.collapse", r = new i(this, o)), "string" == typeof e && r[e]()
        })
    }

    var i = function (e, n) {
        this.$element = t(e), this.options = t.extend({}, i.DEFAULTS, n), this.$trigger = t('[data-toggle="collapse"][href="#' + e.id + '"],[data-toggle="collapse"][data-target="#' + e.id + '"]'), this.transitioning = null, this.options.parent ? this.$parent = this.getParent() : this.addAriaAndCollapsedClass(this.$element, this.$trigger), this.options.toggle && this.toggle()
    };
    i.VERSION = "3.3.7", i.TRANSITION_DURATION = 350, i.DEFAULTS = {toggle: !0}, i.prototype.dimension = function () {
        var t = this.$element.hasClass("width");
        return t ? "width" : "height"
    }, i.prototype.show = function () {
        if (!this.transitioning && !this.$element.hasClass("in")) {
            var e, r = this.$parent && this.$parent.children(".panel").children(".in, .collapsing");
            if (!(r && r.length && (e = r.data("bs.collapse"), e && e.transitioning))) {
                var o = t.Event("show.bs.collapse");
                if (this.$element.trigger(o), !o.isDefaultPrevented()) {
                    r && r.length && (n.call(r, "hide"), e || r.data("bs.collapse", null));
                    var a = this.dimension();
                    this.$element.removeClass("collapse").addClass("collapsing")[a](0).attr("aria-expanded", !0), this.$trigger.removeClass("collapsed").attr("aria-expanded", !0), this.transitioning = 1;
                    var s = function () {
                        this.$element.removeClass("collapsing").addClass("collapse in")[a](""), this.transitioning = 0, this.$element.trigger("shown.bs.collapse")
                    };
                    if (!t.support.transition) return s.call(this);
                    var d = t.camelCase(["scroll", a].join("-"));
                    this.$element.one("bsTransitionEnd", t.proxy(s, this)).emulateTransitionEnd(i.TRANSITION_DURATION)[a](this.$element[0][d])
                }
            }
        }
    }, i.prototype.hide = function () {
        if (!this.transitioning && this.$element.hasClass("in")) {
            var e = t.Event("hide.bs.collapse");
            if (this.$element.trigger(e), !e.isDefaultPrevented()) {
                var n = this.dimension();
                this.$element[n](this.$element[n]())[0].offsetHeight, this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded", !1), this.$trigger.addClass("collapsed").attr("aria-expanded", !1), this.transitioning = 1;
                var r = function () {
                    this.transitioning = 0, this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse")
                };
                return t.support.transition ? void this.$element[n](0).one("bsTransitionEnd", t.proxy(r, this)).emulateTransitionEnd(i.TRANSITION_DURATION) : r.call(this)
            }
        }
    }, i.prototype.toggle = function () {
        this[this.$element.hasClass("in") ? "hide" : "show"]()
    }, i.prototype.getParent = function () {
        return t(this.options.parent).find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]').each(t.proxy(function (n, i) {
            var r = t(i);
            this.addAriaAndCollapsedClass(e(r), r)
        }, this)).end()
    }, i.prototype.addAriaAndCollapsedClass = function (t, e) {
        var n = t.hasClass("in");
        t.attr("aria-expanded", n), e.toggleClass("collapsed", !n).attr("aria-expanded", n)
    };
    var r = t.fn.collapse;
    t.fn.collapse = n, t.fn.collapse.Constructor = i, t.fn.collapse.noConflict = function () {
        return t.fn.collapse = r, this
    }, t(document).on("click.bs.collapse.data-api", '[data-toggle="collapse"]', function (i) {
        var r = t(this);
        r.attr("data-target") || i.preventDefault();
        var o = e(r), a = o.data("bs.collapse"), s = a ? "toggle" : r.data();
        n.call(o, s)
    })
}(jQuery), +function (t) {
    "use strict";

    function e(e) {
        var n = e.attr("data-target");
        n || (n = e.attr("href"), n = n && /#[A-Za-z]/.test(n) && n.replace(/.*(?=#[^\s]*$)/, ""));
        var i = n && t(n);
        return i && i.length ? i : e.parent()
    }

    function n(n) {
        n && 3 === n.which || (t(r).remove(), t(o).each(function () {
            var i = t(this), r = e(i), o = {relatedTarget: this};
            r.hasClass("open") && (n && "click" == n.type && /input|textarea/i.test(n.target.tagName) && t.contains(r[0], n.target) || (r.trigger(n = t.Event("hide.bs.dropdown", o)), n.isDefaultPrevented() || (i.attr("aria-expanded", "false"), r.removeClass("open").trigger(t.Event("hidden.bs.dropdown", o)))))
        }))
    }

    function i(e) {
        return this.each(function () {
            var n = t(this), i = n.data("bs.dropdown");
            i || n.data("bs.dropdown", i = new a(this)), "string" == typeof e && i[e].call(n)
        })
    }

    var r = ".dropdown-backdrop", o = '[data-toggle="dropdown"]', a = function (e) {
        t(e).on("click.bs.dropdown", this.toggle)
    };
    a.VERSION = "3.3.7", a.prototype.toggle = function (i) {
        var r = t(this);
        if (!r.is(".disabled, :disabled")) {
            var o = e(r), a = o.hasClass("open");
            if (n(), !a) {
                "ontouchstart" in document.documentElement && !o.closest(".navbar-nav").length && t(document.createElement("div")).addClass("dropdown-backdrop").insertAfter(t(this)).on("click", n);
                var s = {relatedTarget: this};
                if (o.trigger(i = t.Event("show.bs.dropdown", s)), i.isDefaultPrevented()) return;
                r.trigger("focus").attr("aria-expanded", "true"), o.toggleClass("open").trigger(t.Event("shown.bs.dropdown", s))
            }
            return !1
        }
    }, a.prototype.keydown = function (n) {
        if (/(38|40|27|32)/.test(n.which) && !/input|textarea/i.test(n.target.tagName)) {
            var i = t(this);
            if (n.preventDefault(), n.stopPropagation(), !i.is(".disabled, :disabled")) {
                var r = e(i), a = r.hasClass("open");
                if (!a && 27 != n.which || a && 27 == n.which) return 27 == n.which && r.find(o).trigger("focus"), i.trigger("click");
                var s = " li:not(.disabled):visible a", d = r.find(".dropdown-menu" + s);
                if (d.length) {
                    var l = d.index(n.target);
                    38 == n.which && l > 0 && l--, 40 == n.which && l < d.length - 1 && l++, ~l || (l = 0), d.eq(l).trigger("focus")
                }
            }
        }
    };
    var s = t.fn.dropdown;
    t.fn.dropdown = i, t.fn.dropdown.Constructor = a, t.fn.dropdown.noConflict = function () {
        return t.fn.dropdown = s, this
    }, t(document).on("click.bs.dropdown.data-api", n).on("click.bs.dropdown.data-api", ".dropdown form", function (t) {
        t.stopPropagation()
    }).on("click.bs.dropdown.data-api", o, a.prototype.toggle).on("keydown.bs.dropdown.data-api", o, a.prototype.keydown).on("keydown.bs.dropdown.data-api", ".dropdown-menu", a.prototype.keydown)
}(jQuery), +function (t) {
    "use strict";

    function e(e, i) {
        return this.each(function () {
            var r = t(this), o = r.data("bs.modal"), a = t.extend({}, n.DEFAULTS, r.data(), "object" == typeof e && e);
            o || r.data("bs.modal", o = new n(this, a)), "string" == typeof e ? o[e](i) : a.show && o.show(i)
        })
    }

    var n = function (e, n) {
        this.options = n, this.$body = t(document.body), this.$element = t(e), this.$dialog = this.$element.find(".modal-dialog"), this.$backdrop = null, this.isShown = null, this.originalBodyPad = null, this.scrollbarWidth = 0, this.ignoreBackdropClick = !1, this.options.remote && this.$element.find(".modal-content").load(this.options.remote, t.proxy(function () {
            this.$element.trigger("loaded.bs.modal")
        }, this))
    };
    n.VERSION = "3.3.7", n.TRANSITION_DURATION = 300, n.BACKDROP_TRANSITION_DURATION = 150, n.DEFAULTS = {
        backdrop: !0,
        keyboard: !0,
        show: !0
    }, n.prototype.toggle = function (t) {
        return this.isShown ? this.hide() : this.show(t)
    }, n.prototype.show = function (e) {
        var i = this, r = t.Event("show.bs.modal", {relatedTarget: e});
        this.$element.trigger(r), this.isShown || r.isDefaultPrevented() || (this.isShown = !0, this.checkScrollbar(), this.setScrollbar(), this.$body.addClass("modal-open"), this.escape(), this.resize(), this.$element.on("click.dismiss.bs.modal", '[data-dismiss="modal"]', t.proxy(this.hide, this)), this.$dialog.on("mousedown.dismiss.bs.modal", function () {
            i.$element.one("mouseup.dismiss.bs.modal", function (e) {
                t(e.target).is(i.$element) && (i.ignoreBackdropClick = !0)
            })
        }), this.backdrop(function () {
            var r = t.support.transition && i.$element.hasClass("fade");
            i.$element.parent().length || i.$element.appendTo(i.$body), i.$element.show().scrollTop(0), i.adjustDialog(), r && i.$element[0].offsetWidth, i.$element.addClass("in"), i.enforceFocus();
            var o = t.Event("shown.bs.modal", {relatedTarget: e});
            r ? i.$dialog.one("bsTransitionEnd", function () {
                i.$element.trigger("focus").trigger(o)
            }).emulateTransitionEnd(n.TRANSITION_DURATION) : i.$element.trigger("focus").trigger(o)
        }))
    }, n.prototype.hide = function (e) {
        e && e.preventDefault(), e = t.Event("hide.bs.modal"), this.$element.trigger(e), this.isShown && !e.isDefaultPrevented() && (this.isShown = !1, this.escape(), this.resize(), t(document).off("focusin.bs.modal"), this.$element.removeClass("in").off("click.dismiss.bs.modal").off("mouseup.dismiss.bs.modal"), this.$dialog.off("mousedown.dismiss.bs.modal"), t.support.transition && this.$element.hasClass("fade") ? this.$element.one("bsTransitionEnd", t.proxy(this.hideModal, this)).emulateTransitionEnd(n.TRANSITION_DURATION) : this.hideModal())
    }, n.prototype.enforceFocus = function () {
        t(document).off("focusin.bs.modal").on("focusin.bs.modal", t.proxy(function (t) {
            document === t.target || this.$element[0] === t.target || this.$element.has(t.target).length || this.$element.trigger("focus")
        }, this))
    }, n.prototype.escape = function () {
        this.isShown && this.options.keyboard ? this.$element.on("keydown.dismiss.bs.modal", t.proxy(function (t) {
            27 == t.which && this.hide()
        }, this)) : this.isShown || this.$element.off("keydown.dismiss.bs.modal")
    }, n.prototype.resize = function () {
        this.isShown ? t(window).on("resize.bs.modal", t.proxy(this.handleUpdate, this)) : t(window).off("resize.bs.modal")
    }, n.prototype.hideModal = function () {
        var t = this;
        this.$element.hide(), this.backdrop(function () {
            t.$body.removeClass("modal-open"), t.resetAdjustments(), t.resetScrollbar(), t.$element.trigger("hidden.bs.modal")
        })
    }, n.prototype.removeBackdrop = function () {
        this.$backdrop && this.$backdrop.remove(), this.$backdrop = null
    }, n.prototype.backdrop = function (e) {
        var i = this, r = this.$element.hasClass("fade") ? "fade" : "";
        if (this.isShown && this.options.backdrop) {
            var o = t.support.transition && r;
            if (this.$backdrop = t(document.createElement("div")).addClass("modal-backdrop " + r).appendTo(this.$body), this.$element.on("click.dismiss.bs.modal", t.proxy(function (t) {
                    return this.ignoreBackdropClick ? void(this.ignoreBackdropClick = !1) : void(t.target === t.currentTarget && ("static" == this.options.backdrop ? this.$element[0].focus() : this.hide()))
                }, this)), o && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), !e) return;
            o ? this.$backdrop.one("bsTransitionEnd", e).emulateTransitionEnd(n.BACKDROP_TRANSITION_DURATION) : e()
        } else if (!this.isShown && this.$backdrop) {
            this.$backdrop.removeClass("in");
            var a = function () {
                i.removeBackdrop(), e && e()
            };
            t.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one("bsTransitionEnd", a).emulateTransitionEnd(n.BACKDROP_TRANSITION_DURATION) : a()
        } else e && e()
    }, n.prototype.handleUpdate = function () {
        this.adjustDialog()
    }, n.prototype.adjustDialog = function () {
        var t = this.$element[0].scrollHeight > document.documentElement.clientHeight;
        this.$element.css({
            paddingLeft: !this.bodyIsOverflowing && t ? this.scrollbarWidth : "",
            paddingRight: this.bodyIsOverflowing && !t ? this.scrollbarWidth : ""
        })
    }, n.prototype.resetAdjustments = function () {
        this.$element.css({paddingLeft: "", paddingRight: ""})
    }, n.prototype.checkScrollbar = function () {
        var t = window.innerWidth;
        if (!t) {
            var e = document.documentElement.getBoundingClientRect();
            t = e.right - Math.abs(e.left)
        }
        this.bodyIsOverflowing = document.body.clientWidth < t, this.scrollbarWidth = this.measureScrollbar()
    }, n.prototype.setScrollbar = function () {
        var t = parseInt(this.$body.css("padding-right") || 0, 10);
        this.originalBodyPad = document.body.style.paddingRight || "", this.bodyIsOverflowing && this.$body.css("padding-right", t + this.scrollbarWidth)
    }, n.prototype.resetScrollbar = function () {
        this.$body.css("padding-right", this.originalBodyPad)
    }, n.prototype.measureScrollbar = function () {
        var t = document.createElement("div");
        t.className = "modal-scrollbar-measure", this.$body.append(t);
        var e = t.offsetWidth - t.clientWidth;
        return this.$body[0].removeChild(t), e
    };
    var i = t.fn.modal;
    t.fn.modal = e, t.fn.modal.Constructor = n, t.fn.modal.noConflict = function () {
        return t.fn.modal = i, this
    }, t(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function (n) {
        var i = t(this), r = i.attr("href"), o = t(i.attr("data-target") || r && r.replace(/.*(?=#[^\s]+$)/, "")),
            a = o.data("bs.modal") ? "toggle" : t.extend({remote: !/#/.test(r) && r}, o.data(), i.data());
        i.is("a") && n.preventDefault(), o.one("show.bs.modal", function (t) {
            t.isDefaultPrevented() || o.one("hidden.bs.modal", function () {
                i.is(":visible") && i.trigger("focus")
            })
        }), e.call(o, a, this)
    })
}(jQuery), +function (t) {
    "use strict";

    function e(e) {
        return this.each(function () {
            var i = t(this), r = i.data("bs.tooltip"), o = "object" == typeof e && e;
            !r && /destroy|hide/.test(e) || (r || i.data("bs.tooltip", r = new n(this, o)), "string" == typeof e && r[e]())
        })
    }

    var n = function (t, e) {
        this.type = null, this.options = null, this.enabled = null, this.timeout = null, this.hoverState = null, this.$element = null, this.inState = null, this.init("tooltip", t, e)
    };
    n.VERSION = "3.3.7", n.TRANSITION_DURATION = 150, n.DEFAULTS = {
        animation: !0,
        placement: "top",
        selector: !1,
        template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
        trigger: "hover focus",
        title: "",
        delay: 0,
        html: !1,
        container: !1,
        viewport: {selector: "body", padding: 0}
    }, n.prototype.init = function (e, n, i) {
        if (this.enabled = !0, this.type = e, this.$element = t(n), this.options = this.getOptions(i), this.$viewport = this.options.viewport && t(t.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : this.options.viewport.selector || this.options.viewport), this.inState = {
                click: !1,
                hover: !1,
                focus: !1
            }, this.$element[0] instanceof document.constructor && !this.options.selector) throw new Error("`selector` option must be specified when initializing " + this.type + " on the window.document object!");
        for (var r = this.options.trigger.split(" "), o = r.length; o--;) {
            var a = r[o];
            if ("click" == a) this.$element.on("click." + this.type, this.options.selector, t.proxy(this.toggle, this)); else if ("manual" != a) {
                var s = "hover" == a ? "mouseenter" : "focusin", d = "hover" == a ? "mouseleave" : "focusout";
                this.$element.on(s + "." + this.type, this.options.selector, t.proxy(this.enter, this)), this.$element.on(d + "." + this.type, this.options.selector, t.proxy(this.leave, this))
            }
        }
        this.options.selector ? this._options = t.extend({}, this.options, {
            trigger: "manual",
            selector: ""
        }) : this.fixTitle()
    }, n.prototype.getDefaults = function () {
        return n.DEFAULTS
    }, n.prototype.getOptions = function (e) {
        return e = t.extend({}, this.getDefaults(), this.$element.data(), e), e.delay && "number" == typeof e.delay && (e.delay = {
            show: e.delay,
            hide: e.delay
        }), e
    }, n.prototype.getDelegateOptions = function () {
        var e = {}, n = this.getDefaults();
        return this._options && t.each(this._options, function (t, i) {
            n[t] != i && (e[t] = i)
        }), e
    }, n.prototype.enter = function (e) {
        var n = e instanceof this.constructor ? e : t(e.currentTarget).data("bs." + this.type);
        return n || (n = new this.constructor(e.currentTarget, this.getDelegateOptions()), t(e.currentTarget).data("bs." + this.type, n)), e instanceof t.Event && (n.inState["focusin" == e.type ? "focus" : "hover"] = !0), n.tip().hasClass("in") || "in" == n.hoverState ? void(n.hoverState = "in") : (clearTimeout(n.timeout), n.hoverState = "in", n.options.delay && n.options.delay.show ? void(n.timeout = setTimeout(function () {
            "in" == n.hoverState && n.show()
        }, n.options.delay.show)) : n.show())
    }, n.prototype.isInStateTrue = function () {
        for (var t in this.inState) if (this.inState[t]) return !0;
        return !1
    }, n.prototype.leave = function (e) {
        var n = e instanceof this.constructor ? e : t(e.currentTarget).data("bs." + this.type);
        if (n || (n = new this.constructor(e.currentTarget, this.getDelegateOptions()), t(e.currentTarget).data("bs." + this.type, n)), e instanceof t.Event && (n.inState["focusout" == e.type ? "focus" : "hover"] = !1), !n.isInStateTrue()) return clearTimeout(n.timeout), n.hoverState = "out", n.options.delay && n.options.delay.hide ? void(n.timeout = setTimeout(function () {
            "out" == n.hoverState && n.hide()
        }, n.options.delay.hide)) : n.hide()
    }, n.prototype.show = function () {
        var e = t.Event("show.bs." + this.type);
        if (this.hasContent() && this.enabled) {
            this.$element.trigger(e);
            var i = t.contains(this.$element[0].ownerDocument.documentElement, this.$element[0]);
            if (e.isDefaultPrevented() || !i) return;
            var r = this, o = this.tip(), a = this.getUID(this.type);
            this.setContent(), o.attr("id", a), this.$element.attr("aria-describedby", a), this.options.animation && o.addClass("fade");
            var s = "function" == typeof this.options.placement ? this.options.placement.call(this, o[0], this.$element[0]) : this.options.placement,
                d = /\s?auto?\s?/i, l = d.test(s);
            l && (s = s.replace(d, "") || "top"), o.detach().css({
                top: 0,
                left: 0,
                display: "block"
            }).addClass(s).data("bs." + this.type, this), this.options.container ? o.appendTo(this.options.container) : o.insertAfter(this.$element), this.$element.trigger("inserted.bs." + this.type);
            var u = this.getPosition(), c = o[0].offsetWidth, h = o[0].offsetHeight;
            if (l) {
                var p = s, f = this.getPosition(this.$viewport);
                s = "bottom" == s && u.bottom + h > f.bottom ? "top" : "top" == s && u.top - h < f.top ? "bottom" : "right" == s && u.right + c > f.width ? "left" : "left" == s && u.left - c < f.left ? "right" : s, o.removeClass(p).addClass(s)
            }
            var g = this.getCalculatedOffset(s, u, c, h);
            this.applyPlacement(g, s);
            var $ = function () {
                var t = r.hoverState;
                r.$element.trigger("shown.bs." + r.type), r.hoverState = null, "out" == t && r.leave(r)
            };
            t.support.transition && this.$tip.hasClass("fade") ? o.one("bsTransitionEnd", $).emulateTransitionEnd(n.TRANSITION_DURATION) : $()
        }
    }, n.prototype.applyPlacement = function (e, n) {
        var i = this.tip(), r = i[0].offsetWidth, o = i[0].offsetHeight, a = parseInt(i.css("margin-top"), 10),
            s = parseInt(i.css("margin-left"), 10);
        isNaN(a) && (a = 0), isNaN(s) && (s = 0), e.top += a, e.left += s, t.offset.setOffset(i[0], t.extend({
            using: function (t) {
                i.css({top: Math.round(t.top), left: Math.round(t.left)})
            }
        }, e), 0), i.addClass("in");
        var d = i[0].offsetWidth, l = i[0].offsetHeight;
        "top" == n && l != o && (e.top = e.top + o - l);
        var u = this.getViewportAdjustedDelta(n, e, d, l);
        u.left ? e.left += u.left : e.top += u.top;
        var c = /top|bottom/.test(n), h = c ? 2 * u.left - r + d : 2 * u.top - o + l,
            p = c ? "offsetWidth" : "offsetHeight";
        i.offset(e), this.replaceArrow(h, i[0][p], c)
    }, n.prototype.replaceArrow = function (t, e, n) {
        this.arrow().css(n ? "left" : "top", 50 * (1 - t / e) + "%").css(n ? "top" : "left", "")
    }, n.prototype.setContent = function () {
        var t = this.tip(), e = this.getTitle();
        t.find(".tooltip-inner")[this.options.html ? "html" : "text"](e), t.removeClass("fade in top bottom left right")
    }, n.prototype.hide = function (e) {
        function i() {
            "in" != r.hoverState && o.detach(), r.$element && r.$element.removeAttr("aria-describedby").trigger("hidden.bs." + r.type), e && e()
        }

        var r = this, o = t(this.$tip), a = t.Event("hide.bs." + this.type);
        if (this.$element.trigger(a), !a.isDefaultPrevented()) return o.removeClass("in"), t.support.transition && o.hasClass("fade") ? o.one("bsTransitionEnd", i).emulateTransitionEnd(n.TRANSITION_DURATION) : i(), this.hoverState = null, this
    }, n.prototype.fixTitle = function () {
        var t = this.$element;
        (t.attr("title") || "string" != typeof t.attr("data-original-title")) && t.attr("data-original-title", t.attr("title") || "").attr("title", "")
    }, n.prototype.hasContent = function () {
        return this.getTitle()
    }, n.prototype.getPosition = function (e) {
        e = e || this.$element;
        var n = e[0], i = "BODY" == n.tagName, r = n.getBoundingClientRect();
        null == r.width && (r = t.extend({}, r, {width: r.right - r.left, height: r.bottom - r.top}));
        var o = window.SVGElement && n instanceof window.SVGElement, a = i ? {top: 0, left: 0} : o ? null : e.offset(),
            s = {scroll: i ? document.documentElement.scrollTop || document.body.scrollTop : e.scrollTop()},
            d = i ? {width: t(window).width(), height: t(window).height()} : null;
        return t.extend({}, r, s, d, a)
    }, n.prototype.getCalculatedOffset = function (t, e, n, i) {
        return "bottom" == t ? {
            top: e.top + e.height,
            left: e.left + e.width / 2 - n / 2
        } : "top" == t ? {
            top: e.top - i,
            left: e.left + e.width / 2 - n / 2
        } : "left" == t ? {top: e.top + e.height / 2 - i / 2, left: e.left - n} : {
            top: e.top + e.height / 2 - i / 2,
            left: e.left + e.width
        }
    }, n.prototype.getViewportAdjustedDelta = function (t, e, n, i) {
        var r = {top: 0, left: 0};
        if (!this.$viewport) return r;
        var o = this.options.viewport && this.options.viewport.padding || 0, a = this.getPosition(this.$viewport);
        if (/right|left/.test(t)) {
            var s = e.top - o - a.scroll, d = e.top + o - a.scroll + i;
            s < a.top ? r.top = a.top - s : d > a.top + a.height && (r.top = a.top + a.height - d)
        } else {
            var l = e.left - o, u = e.left + o + n;
            l < a.left ? r.left = a.left - l : u > a.right && (r.left = a.left + a.width - u)
        }
        return r
    }, n.prototype.getTitle = function () {
        var t, e = this.$element, n = this.options;
        return t = e.attr("data-original-title") || ("function" == typeof n.title ? n.title.call(e[0]) : n.title)
    }, n.prototype.getUID = function (t) {
        do t += ~~(1e6 * Math.random()); while (document.getElementById(t));
        return t
    }, n.prototype.tip = function () {
        if (!this.$tip && (this.$tip = t(this.options.template), 1 != this.$tip.length)) throw new Error(this.type + " `template` option must consist of exactly 1 top-level element!");
        return this.$tip
    }, n.prototype.arrow = function () {
        return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow")
    }, n.prototype.enable = function () {
        this.enabled = !0
    }, n.prototype.disable = function () {
        this.enabled = !1
    }, n.prototype.toggleEnabled = function () {
        this.enabled = !this.enabled
    }, n.prototype.toggle = function (e) {
        var n = this;
        e && (n = t(e.currentTarget).data("bs." + this.type), n || (n = new this.constructor(e.currentTarget, this.getDelegateOptions()), t(e.currentTarget).data("bs." + this.type, n))), e ? (n.inState.click = !n.inState.click, n.isInStateTrue() ? n.enter(n) : n.leave(n)) : n.tip().hasClass("in") ? n.leave(n) : n.enter(n)
    }, n.prototype.destroy = function () {
        var t = this;
        clearTimeout(this.timeout), this.hide(function () {
            t.$element.off("." + t.type).removeData("bs." + t.type), t.$tip && t.$tip.detach(), t.$tip = null, t.$arrow = null, t.$viewport = null, t.$element = null
        })
    };
    var i = t.fn.tooltip;
    t.fn.tooltip = e, t.fn.tooltip.Constructor = n, t.fn.tooltip.noConflict = function () {
        return t.fn.tooltip = i, this
    }
}(jQuery), +function (t) {
    "use strict";

    function e(e) {
        return this.each(function () {
            var i = t(this), r = i.data("bs.popover"), o = "object" == typeof e && e;
            !r && /destroy|hide/.test(e) || (r || i.data("bs.popover", r = new n(this, o)), "string" == typeof e && r[e]())
        })
    }

    var n = function (t, e) {
        this.init("popover", t, e)
    };
    if (!t.fn.tooltip) throw new Error("Popover requires tooltip.js");
    n.VERSION = "3.3.7", n.DEFAULTS = t.extend({}, t.fn.tooltip.Constructor.DEFAULTS, {
        placement: "right",
        trigger: "click",
        content: "",
        template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
    }), n.prototype = t.extend({}, t.fn.tooltip.Constructor.prototype), n.prototype.constructor = n, n.prototype.getDefaults = function () {
        return n.DEFAULTS
    }, n.prototype.setContent = function () {
        var t = this.tip(), e = this.getTitle(), n = this.getContent();
        t.find(".popover-title")[this.options.html ? "html" : "text"](e), t.find(".popover-content").children().detach().end()[this.options.html ? "string" == typeof n ? "html" : "append" : "text"](n), t.removeClass("fade top bottom left right in"), t.find(".popover-title").html() || t.find(".popover-title").hide()
    }, n.prototype.hasContent = function () {
        return this.getTitle() || this.getContent()
    }, n.prototype.getContent = function () {
        var t = this.$element, e = this.options;
        return t.attr("data-content") || ("function" == typeof e.content ? e.content.call(t[0]) : e.content)
    }, n.prototype.arrow = function () {
        return this.$arrow = this.$arrow || this.tip().find(".arrow")
    };
    var i = t.fn.popover;
    t.fn.popover = e, t.fn.popover.Constructor = n, t.fn.popover.noConflict = function () {
        return t.fn.popover = i, this
    }
}(jQuery), +function (t) {
    "use strict";

    function e(n, i) {
        this.$body = t(document.body), this.$scrollElement = t(t(n).is(document.body) ? window : n), this.options = t.extend({}, e.DEFAULTS, i), this.selector = (this.options.target || "") + " .nav li > a", this.offsets = [], this.targets = [], this.activeTarget = null, this.scrollHeight = 0, this.$scrollElement.on("scroll.bs.scrollspy", t.proxy(this.process, this)), this.refresh(), this.process()
    }

    function n(n) {
        return this.each(function () {
            var i = t(this), r = i.data("bs.scrollspy"), o = "object" == typeof n && n;
            r || i.data("bs.scrollspy", r = new e(this, o)), "string" == typeof n && r[n]()
        })
    }

    e.VERSION = "3.3.7", e.DEFAULTS = {offset: 10}, e.prototype.getScrollHeight = function () {
        return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
    }, e.prototype.refresh = function () {
        var e = this, n = "offset", i = 0;
        this.offsets = [], this.targets = [], this.scrollHeight = this.getScrollHeight(), t.isWindow(this.$scrollElement[0]) || (n = "position", i = this.$scrollElement.scrollTop()), this.$body.find(this.selector).map(function () {
            var e = t(this), r = e.data("target") || e.attr("href"), o = /^#./.test(r) && t(r);
            return o && o.length && o.is(":visible") && [[o[n]().top + i, r]] || null
        }).sort(function (t, e) {
            return t[0] - e[0]
        }).each(function () {
            e.offsets.push(this[0]), e.targets.push(this[1])
        })
    }, e.prototype.process = function () {
        var t, e = this.$scrollElement.scrollTop() + this.options.offset, n = this.getScrollHeight(),
            i = this.options.offset + n - this.$scrollElement.height(), r = this.offsets, o = this.targets,
            a = this.activeTarget;
        if (this.scrollHeight != n && this.refresh(), e >= i) return a != (t = o[o.length - 1]) && this.activate(t);
        if (a && e < r[0]) return this.activeTarget = null, this.clear();
        for (t = r.length; t--;) a != o[t] && e >= r[t] && (void 0 === r[t + 1] || e < r[t + 1]) && this.activate(o[t])
    }, e.prototype.activate = function (e) {
        this.activeTarget = e, this.clear();
        var n = this.selector + '[data-target="' + e + '"],' + this.selector + '[href="' + e + '"]',
            i = t(n).parents("li").addClass("active");
        i.parent(".dropdown-menu").length && (i = i.closest("li.dropdown").addClass("active")), i.trigger("activate.bs.scrollspy")
    }, e.prototype.clear = function () {
        t(this.selector).parentsUntil(this.options.target, ".active").removeClass("active")
    };
    var i = t.fn.scrollspy;
    t.fn.scrollspy = n, t.fn.scrollspy.Constructor = e, t.fn.scrollspy.noConflict = function () {
        return t.fn.scrollspy = i, this
    }, t(window).on("load.bs.scrollspy.data-api", function () {
        t('[data-spy="scroll"]').each(function () {
            var e = t(this);
            n.call(e, e.data())
        })
    })
}(jQuery), +function (t) {
    "use strict";

    function e(e) {
        return this.each(function () {
            var i = t(this), r = i.data("bs.tab");
            r || i.data("bs.tab", r = new n(this)), "string" == typeof e && r[e]()
        })
    }

    var n = function (e) {
        this.element = t(e)
    };
    n.VERSION = "3.3.7", n.TRANSITION_DURATION = 150, n.prototype.show = function () {
        var e = this.element, n = e.closest("ul:not(.dropdown-menu)"), i = e.data("target");
        if (i || (i = e.attr("href"), i = i && i.replace(/.*(?=#[^\s]*$)/, "")), !e.parent("li").hasClass("active")) {
            var r = n.find(".active:last a"), o = t.Event("hide.bs.tab", {relatedTarget: e[0]}),
                a = t.Event("show.bs.tab", {relatedTarget: r[0]});
            if (r.trigger(o), e.trigger(a), !a.isDefaultPrevented() && !o.isDefaultPrevented()) {
                var s = t(i);
                this.activate(e.closest("li"), n), this.activate(s, s.parent(), function () {
                    r.trigger({type: "hidden.bs.tab", relatedTarget: e[0]}), e.trigger({
                        type: "shown.bs.tab",
                        relatedTarget: r[0]
                    })
                })
            }
        }
    }, n.prototype.activate = function (e, i, r) {
        function o() {
            a.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !1), e.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded", !0), s ? (e[0].offsetWidth, e.addClass("in")) : e.removeClass("fade"), e.parent(".dropdown-menu").length && e.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !0), r && r()
        }

        var a = i.find("> .active"),
            s = r && t.support.transition && (a.length && a.hasClass("fade") || !!i.find("> .fade").length);
        a.length && s ? a.one("bsTransitionEnd", o).emulateTransitionEnd(n.TRANSITION_DURATION) : o(), a.removeClass("in")
    };
    var i = t.fn.tab;
    t.fn.tab = e, t.fn.tab.Constructor = n, t.fn.tab.noConflict = function () {
        return t.fn.tab = i, this
    };
    var r = function (n) {
        n.preventDefault(), e.call(t(this), "show")
    };
    t(document).on("click.bs.tab.data-api", '[data-toggle="tab"]', r).on("click.bs.tab.data-api", '[data-toggle="pill"]', r)
}(jQuery), +function (t) {
    "use strict";

    function e(e) {
        return this.each(function () {
            var i = t(this), r = i.data("bs.affix"), o = "object" == typeof e && e;
            r || i.data("bs.affix", r = new n(this, o)), "string" == typeof e && r[e]()
        })
    }

    var n = function (e, i) {
        this.options = t.extend({}, n.DEFAULTS, i), this.$target = t(this.options.target).on("scroll.bs.affix.data-api", t.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", t.proxy(this.checkPositionWithEventLoop, this)), this.$element = t(e), this.affixed = null, this.unpin = null, this.pinnedOffset = null, this.checkPosition()
    };
    n.VERSION = "3.3.7", n.RESET = "affix affix-top affix-bottom", n.DEFAULTS = {
        offset: 0,
        target: window
    }, n.prototype.getState = function (t, e, n, i) {
        var r = this.$target.scrollTop(), o = this.$element.offset(), a = this.$target.height();
        if (null != n && "top" == this.affixed) return r < n && "top";
        if ("bottom" == this.affixed) return null != n ? !(r + this.unpin <= o.top) && "bottom" : !(r + a <= t - i) && "bottom";
        var s = null == this.affixed, d = s ? r : o.top, l = s ? a : e;
        return null != n && r <= n ? "top" : null != i && d + l >= t - i && "bottom"
    }, n.prototype.getPinnedOffset = function () {
        if (this.pinnedOffset) return this.pinnedOffset;
        this.$element.removeClass(n.RESET).addClass("affix");
        var t = this.$target.scrollTop(), e = this.$element.offset();
        return this.pinnedOffset = e.top - t
    }, n.prototype.checkPositionWithEventLoop = function () {
        setTimeout(t.proxy(this.checkPosition, this), 1)
    }, n.prototype.checkPosition = function () {
        if (this.$element.is(":visible")) {
            var e = this.$element.height(), i = this.options.offset, r = i.top, o = i.bottom,
                a = Math.max(t(document).height(), t(document.body).height());
            "object" != typeof i && (o = r = i), "function" == typeof r && (r = i.top(this.$element)), "function" == typeof o && (o = i.bottom(this.$element));
            var s = this.getState(a, e, r, o);
            if (this.affixed != s) {
                null != this.unpin && this.$element.css("top", "");
                var d = "affix" + (s ? "-" + s : ""), l = t.Event(d + ".bs.affix");
                if (this.$element.trigger(l), l.isDefaultPrevented()) return;
                this.affixed = s, this.unpin = "bottom" == s ? this.getPinnedOffset() : null, this.$element.removeClass(n.RESET).addClass(d).trigger(d.replace("affix", "affixed") + ".bs.affix")
            }
            "bottom" == s && this.$element.offset({top: a - e - o})
        }
    };
    var i = t.fn.affix;
    t.fn.affix = e, t.fn.affix.Constructor = n, t.fn.affix.noConflict = function () {
        return t.fn.affix = i, this
    }, t(window).on("load", function () {
        t('[data-spy="affix"]').each(function () {
            var n = t(this), i = n.data();
            i.offset = i.offset || {}, null != i.offsetBottom && (i.offset.bottom = i.offsetBottom), null != i.offsetTop && (i.offset.top = i.offsetTop), e.call(n, i)
        })
    })
}(jQuery), function (t) {
    "use strict";

    function e(t) {
        for (var e = window, n = t.split("."), i = n.pop(), r = 0, o = n.length; r < o; r++) e = e[n[r]];
        return function () {
            e[i].call(this)
        }
    }

    var n;
    if (!t.fn.popover) throw new Error("Confirmation requires popover.js");
    var i = function (t, e) {
        e.trigger = "click", this.init(t, e)
    };
    i.VERSION = "2.4.0", i.KEYMAP = {
        13: "Enter",
        27: "Escape",
        39: "ArrowRight",
        40: "ArrowDown"
    }, i.DEFAULTS = t.extend({}, t.fn.popover.Constructor.DEFAULTS, {
        placement: "top",
        title: "Are you sure?",
        popout: !1,
        singleton: !1,
        copyAttributes: "href target",
        buttons: null,
        onConfirm: t.noop,
        onCancel: t.noop,
        btnOkClass: "btn-xs btn-primary",
        btnOkIcon: "glyphicon glyphicon-ok",
        btnOkLabel: "Yes",
        btnCancelClass: "btn-xs btn-default",
        btnCancelIcon: "glyphicon glyphicon-remove",
        btnCancelLabel: "No",
        template: '<div class="popover confirmation"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"><p class="confirmation-content"></p><div class="confirmation-buttons text-center"><div class="btn-group"><a href="#" class="btn" data-apply="confirmation"></a><a href="#" class="btn" data-dismiss="confirmation"></a></div></div></div></div>'
    }), i.prototype = t.extend({}, t.fn.popover.Constructor.prototype), i.prototype.constructor = i, i.prototype.getDefaults = function () {
        return i.DEFAULTS
    }, i.prototype.init = function (e, n) {
        if (t.fn.popover.Constructor.prototype.init.call(this, "confirmation", e, n), (this.options.popout || this.options.singleton) && !n.rootSelector) throw new Error("The rootSelector option is required to use popout and singleton features since jQuery 3.");
        this.options._isDelegate = !1, n.selector ? this.options._selector = this._options._selector = n.rootSelector + " " + n.selector : n._selector ? (this.options._selector = n._selector, this.options._isDelegate = !0) : this.options._selector = n.rootSelector;
        var i = this;
        this.options.selector ? this.$element.on(this.options.trigger, this.options.selector, function (t, e) {
            e || (t.preventDefault(), t.stopPropagation(), t.stopImmediatePropagation())
        }) : (this.options._attributes = {}, this.options.copyAttributes ? "string" == typeof this.options.copyAttributes && (this.options.copyAttributes = this.options.copyAttributes.split(" ")) : this.options.copyAttributes = [], this.options.copyAttributes.forEach(function (t) {
            this.options._attributes[t] = this.$element.attr(t)
        }, this), this.$element.on(this.options.trigger, function (t, e) {
            e || (t.preventDefault(), t.stopPropagation(), t.stopImmediatePropagation())
        }), this.$element.on("show.bs.confirmation", function (e) {
            i.options.singleton && t(i.options._selector).not(t(this)).filter(function () {
                return void 0 !== t(this).data("bs.confirmation")
            }).confirmation("hide")
        })), this.options._isDelegate || (this.eventBody = !1, this.uid = this.$element[0].id || this.getUID("group_"), this.$element.on("shown.bs.confirmation", function (e) {
            i.options.popout && !i.eventBody && (i.eventBody = t("body").on("click.bs.confirmation." + i.uid, function (e) {
                t(i.options._selector).is(e.target) || (t(i.options._selector).filter(function () {
                    return void 0 !== t(this).data("bs.confirmation")
                }).confirmation("hide"), t("body").off("click.bs." + i.uid), i.eventBody = !1)
            }))
        }))
    }, i.prototype.hasContent = function () {
        return !0
    }, i.prototype.setContent = function () {
        var e = this, i = this.tip(), r = this.getTitle(), o = this.getContent();
        if (i.find(".popover-title")[this.options.html ? "html" : "text"](r), i.find(".confirmation-content").toggle(!!o).children().detach().end()[this.options.html ? "string" == typeof o ? "html" : "append" : "text"](o), i.on("click", function (t) {
                t.stopPropagation()
            }), this.options.buttons) {
            var a = i.find(".confirmation-buttons .btn-group").empty();
            this.options.buttons.forEach(function (n) {
                a.append(t('<a href="#"></a>').addClass(n.class || "btn btn-xs btn-default").html(n.label || "").attr(n.attr || {}).prepend(t("<i></i>").addClass(n.icon), " ").one("click", function (i) {
                    "#" === t(this).attr("href") && i.preventDefault(), n.onClick && n.onClick.call(e.$element), n.cancel ? (e.getOnCancel.call(e).call(e.$element), e.$element.trigger("canceled.bs.confirmation")) : (e.getOnConfirm.call(e).call(e.$element), e.$element.trigger("confirmed.bs.confirmation")), e.inState && (e.inState.click = !1), e.hide()
                }))
            }, this)
        } else i.find('[data-apply="confirmation"]').addClass(this.options.btnOkClass).html(this.options.btnOkLabel).attr(this.options._attributes).prepend(t("<i></i>").addClass(this.options.btnOkIcon), " ").off("click").one("click", function (n) {
            "#" === t(this).attr("href") && n.preventDefault(), e.getOnConfirm.call(e).call(e.$element), e.$element.trigger("confirmed.bs.confirmation"), e.$element.trigger(e.options.trigger, [!0]), e.hide()
        }), i.find('[data-dismiss="confirmation"]').addClass(this.options.btnCancelClass).html(this.options.btnCancelLabel).prepend(t("<i></i>").addClass(this.options.btnCancelIcon), " ").off("click").one("click", function (t) {
            t.preventDefault(), e.getOnCancel.call(e).call(e.$element), e.$element.trigger("canceled.bs.confirmation"), e.inState && (e.inState.click = !1), e.hide()
        });
        i.removeClass("fade top bottom left right in"), i.find(".popover-title").html() || i.find(".popover-title").hide(), n = this, t(window).off("keyup.bs.confirmation").on("keyup.bs.confirmation", this._onKeyup.bind(this))
    }, i.prototype.destroy = function () {
        n === this && (n = void 0, t(window).off("keyup.bs.confirmation")), t.fn.popover.Constructor.prototype.destroy.call(this)
    }, i.prototype.hide = function () {
        n === this && (n = void 0, t(window).off("keyup.bs.confirmation")), t.fn.popover.Constructor.prototype.hide.call(this)
    }, i.prototype._onKeyup = function (e) {
        if (!this.$tip) return n = void 0, void t(window).off("keyup.bs.confirmation");
        var r, o = e.key || i.KEYMAP[e.keyCode || e.which], a = this.$tip.find(".confirmation-buttons .btn-group"),
            s = a.find(".active");
        switch (o) {
            case"Escape":
                this.hide();
                break;
            case"ArrowRight":
                r = s.length && s.next().length ? s.next() : a.children().first(), s.removeClass("active"), r.addClass("active").focus();
                break;
            case"ArrowLeft":
                r = s.length && s.prev().length ? s.prev() : a.children().last(), s.removeClass("active"), r.addClass("active").focus()
        }
    }, i.prototype.getOnConfirm = function () {
        return this.$element.attr("data-on-confirm") ? e(this.$element.attr("data-on-confirm")) : this.options.onConfirm
    }, i.prototype.getOnCancel = function () {
        return this.$element.attr("data-on-cancel") ? e(this.$element.attr("data-on-cancel")) : this.options.onCancel
    };
    var r = t.fn.confirmation;
    t.fn.confirmation = function (e) {
        var n = "object" == typeof e && e || {};
        return n.rootSelector = this.selector || n.rootSelector, this.each(function () {
            var r = t(this), o = r.data("bs.confirmation");
            (o || "destroy" != e) && (o || r.data("bs.confirmation", o = new i(this, n)), "string" == typeof e && (o[e](), "hide" == e && o.inState && (o.inState.click = !1)))
        })
    }, t.fn.confirmation.Constructor = i, t.fn.confirmation.noConflict = function () {
        return t.fn.confirmation = r, this
    }
}(jQuery), function (t, e) {
    "object" != typeof t.WHMCS && (t.WHMCS = e)
}(window, {
    hasModule: function (t) {
        return "undefined" != typeof WHMCS[t] && Object.getOwnPropertyNames(WHMCS[t]).length > 0
    }, loadModule: function (t, e) {
        if (!this.hasModule(t)) if (WHMCS[t] = {}, "function" == typeof e) e.apply(WHMCS[t]); else for (var n in e) e.hasOwnProperty(n) && (WHMCS[t][n] = {}, e[n].apply(WHMCS[t][n]))
    }
}), function (t) {
    WHMCS.hasModule("authn") || WHMCS.loadModule("authn", t)
}({
    provider: function () {
        var t = !1;
        return this.feedbackContainer = function () {
            return jQuery(".providerLinkingFeedback")
        }, this.btnContainer = function () {
            return jQuery(".providerPreLinking")
        }, this.feedbackMessage = function (t) {
            "undefined" == typeof t && (t = "complete_sign_in");
            var e = jQuery("p.providerLinkingMsg-preLink-" + t);
            return e.length ? e.first().html() : ""
        }, this.showProgressMessage = function (e) {
            this.feedbackContainer().fadeIn("fast", function () {
                "function" != typeof e || t || (t = !0, e())
            })
        }, this.preLinkInit = function (t) {
            var e = '<i class="fa fa-fw fa-spinner fa-spin"></i> ';
            this.feedbackContainer().removeClass("alert-danger alert-success").addClass("alert alert-info").html(e + this.feedbackMessage()).hide();
            var n = this.btnContainer();
            if (n.length) if (n.data("hideOnPrelink")) {
                var i = this;
                n.fadeOut("false", function () {
                    i.showProgressMessage(t)
                })
            } else n.data("disableOnPrelink") ? (n.find(".btn").addClass("disabled"), this.showProgressMessage(t)) : this.showProgressMessage(t); else this.showProgressMessage(t)
        }, this.displayError = function (t, e, n) {
            jQuery("#providerLinkingMessages .provider-name").html(t);
            var i = this.feedbackMessage("connect_error");
            if (e) {
                var r = this.feedbackMessage(e);
                r && (i = r)
            }
            n && $(".btn-logged-in-admin").length > 0 && (i += " Error: " + n), this.feedbackContainer().removeClass("alert-info alert-success").addClass("alert alert-danger").html(i).slideDown()
        }, this.displaySuccess = function (t, e, n) {
            var i = n.icon, r = e.htmlTarget, o = e.targetLogin, a = e.targetRegister, s = n.name, d = "";
            switch (t.result) {
                case"logged_in":
                case"2fa_needed":
                    d = this.feedbackMessage("2fa_needed"), this.feedbackContainer().removeClass("alert-danger alert-warning alert-success").addClass("alert alert-info").html(d), window.location = t.redirect_url ? t.redirect_url : e.redirectUrl;
                    break;
                case"linking_complete":
                    var l = "";
                    l = t.remote_account.email ? t.remote_account.email : t.remote_account.firstname + " " + t.remote_account.lastname, l = l.trim(), d = this.feedbackMessage("linking_complete").trim().replace(":displayName", s), l && (d = d.replace(/\.$/, " (" + l + ").")), this.feedbackContainer().removeClass("alert-danger alert-warning alert-info").addClass("alert alert-success").html(i + d);
                    break;
                case"login_to_link":
                    if (r === o) d = this.feedbackMessage("login_to_link-signin-required"), this.feedbackContainer().removeClass("alert-danger alert-success alert-info").addClass("alert alert-warning").html(i + d); else {
                        var u = jQuery("input[name=email]"), c = jQuery("input[name=firstname]"),
                            h = jQuery("input[name=lastname]");
                        if ("" === u.val() && u.val(t.remote_account.email), "" === c.val() && c.val(t.remote_account.firstname), "" === h.val() && h.val(t.remote_account.lastname), r === a) "object" == typeof WHMCS.client.registration && WHMCS.client.registration.prefillPassword(), d = this.feedbackMessage("login_to_link-registration-required"), this.feedbackContainer().fadeOut("slow", function () {
                            $(this).removeClass("alert-danger alert-success alert-info").addClass("alert alert-warning").html(i + d).fadeIn("fast")
                        }); else {
                            "object" == typeof WHMCS.client.registration && WHMCS.client.registration.prefillPassword();
                            var p = this;
                            this.feedbackContainer().each(function (t, e) {
                                var n = $(e), r = n.siblings("div .providerPreLinking").data("linkContext");
                                n.fadeOut("slow", function () {
                                    d = "checkout-new" === r ? p.feedbackMessage("checkout-new") : p.feedbackMessage("login_to_link-signin-required"), n.removeClass("alert-danger alert-success alert-info").addClass("alert alert-warning").html(i + d).fadeIn("fast")
                                })
                            })
                        }
                    }
                    break;
                case"other_user_exists":
                    d = this.feedbackMessage("other_user_exists"), this.feedbackContainer().removeClass("alert-info alert-success").addClass("alert alert-danger").html(i + d).slideDown();
                    break;
                case"already_linked":
                    d = this.feedbackMessage("already_linked"), this.feedbackContainer().removeClass("alert-info alert-success").addClass("alert alert-danger").html(i + d).slideDown();
                    break;
                default:
                    d = this.feedbackMessage("default"), this.feedbackContainer().removeClass("alert-info alert-success").addClass("alert alert-danger").html(i + d).slideDown()
            }
        }, this.signIn = function (t, e, n, i, r) {
            jQuery.ajax(t).done(function (t) {
                i(), WHMCS.authn.provider.displaySuccess(t, e, n);
                var r = jQuery("#tableLinkedAccounts");
                r.length && WHMCS.ui.dataTable.getTableById("tableLinkedAccounts").ajax.reload()
            }).error(function () {
                r(), WHMCS.authn.provider.displayError()
            })
        }, this
    }
}), function (t) {
    WHMCS.hasModule("client") || WHMCS.loadModule("client", t)
}({
    registration: function () {
        return this.prefillPassword = function (t) {
            if (t = t || {}, "undefined" == typeof t.hideContainer) {
                var e = jQuery("#inputSecurityQId").attr("id") ? "#containerPassword" : "#containerNewUserSecurity";
                t.hideContainer = jQuery(e), t.hideInputs = !0
            } else "string" == typeof t.hideContainer && t.hideContainer.length && (t.hideContainer = jQuery(t.hideContainer));
            "undefined" == typeof t.form && (t.form = {password: [{id: "inputNewPassword1"}, {id: "inputNewPassword2"}]});
            var n = function () {
                for (var e = WHMCS.utils.simpleRNG(), n = 0, i = t.form.password.length; n < i; n++) jQuery("#" + t.form.password[n].id).val(e).trigger("keyup")
            };
            t.hideInputs ? t.hideContainer.slideUp("fast", n) : n()
        }, this
    }
}), function (t) {
    WHMCS.hasModule("ui") || WHMCS.loadModule("ui", t)
}({
    confirmation: function () {
        var t = [];
        return this.register = function (e) {
            return "undefined" == typeof e && (e = "[data-toggle=confirmation]"), t.indexOf(e) < 0 && t.push(e), jQuery(e).confirmation({rootSelector: e}), t
        }, this
    }, dataTable: function () {
        return this.tables = {}, this.register = function () {
            var t = this;
            jQuery("table.data-driven").each(function (e, n) {
                t.getTableById(n.id, void 0)
            })
        }, this.getTableById = function (t, e) {
            var n = this, i = jQuery("#" + t);
            if ("undefined" == typeof n.tables[t]) {
                "undefined" == typeof e && (e = {
                    dom: '<"listtable"ift>pl',
                    paging: !1,
                    lengthChange: !1,
                    searching: !1,
                    ordering: !0,
                    info: !1,
                    autoWidth: !0,
                    language: {emptyTable: i.data("lang-empty-table") ? i.data("lang-empty-table") : "No records found"}
                });
                var r = i.data("ajax-url");
                "undefined" != typeof r && (e.ajax = {url: r});
                var o = i.data("dom");
                "undefined" != typeof o && (e.dom = o);
                var a = i.data("searching");
                "undefined" != typeof a && (e.searching = a);
                var s = i.data("responsive");
                "undefined" != typeof s && (e.responsive = s);
                var d = i.data("ordering");
                "undefined" != typeof d && (e.ordering = d);
                var l = i.data("order");
                "undefined" != typeof l && l && (e.order = l);
                var u = i.data("columns");
                "undefined" != typeof u && u && (e.columns = u);
                var c = i.data("auto-width");
                "undefined" != typeof c && (e.autoWidth = c);
                var h = i.data("paging");
                "undefined" != typeof h && (e.paging = h);
                var p = i.data("length-change");
                "undefined" != typeof p && (e.lengthChange = p);
                var f = i.data("page-length");
                "undefined" != typeof f && (e.pageLength = f), n.tables[t] = n.initTable(i, e)
            } else if ("undefined" != typeof e) {
                var g = n.tables[t], $ = g.init(), m = jQuery.extend($, e);
                g.destroy(), n.tables[t] = n.initTable(i, m)
            }
            return n.tables[t]
        }, this.initTable = function (t, e) {
            var n = t.DataTable(e), i = this;
            return t.data("on-draw") ? n.on("draw.dt", function (e, n) {
                var i = t.data("on-draw");
                "function" == typeof window[i] && window[i](e, n)
            }) : t.data("on-draw-rebind-confirmation") && n.on("draw.dt", function (t) {
                i.rebindConfirmation(t)
            }), n
        }, this.rebindConfirmation = function (t) {
            for (var e = this, n = t.target.id, i = WHMCS.ui.confirmation.register(), r = 0, o = i.length; r < o; r++) jQuery(i[r]).on("confirmed.bs.confirmation", function (t) {
                t.preventDefault(), jQuery.post(jQuery(t.target).data("target-url"), {token: csrfToken}).done(function (t) {
                    "success" !== t.status && "okay" !== t.status || e.getTableById(n, void 0).ajax.reload()
                })
            })
        }, this
    }, toolTip: function () {
        this.registerClipboard = function () {
            var t = this;
            jQuery('[data-toggle="tooltip"]').tooltip();
            var e = new Clipboard(".copy-to-clipboard");
            e.on("success", function (e) {
                var n = jQuery(e.trigger);
                t.setTip(n, "Copied!"), t.hideTip(n)
            }), e.on("error", function (e) {
                t.setTip(e.trigger, "Press Ctrl+C to copy"), t.hideTip(e.trigger)
            }), $(".copy-to-clipboard").tooltip({trigger: "click", placement: "bottom"})
        }, this.setTip = function (t, e) {
            var n = t.data("bs.tooltip");
            return "in" !== n.hoverState && (n.hoverState = "in"), t.attr("data-original-title", e), n.show(), n
        }, this.hideTip = function (t) {
            return setTimeout(function () {
                t.data("bs.tooltip").hide()
            }, 2e3)
        }
    }
}), function (t) {
    WHMCS.hasModule("form") || WHMCS.loadModule("form", t)
}(function () {
    return this.register = function () {
        this.bindCheckAll()
    }, this.bindCheckAll = function () {
        var t = ".btn-check-all";
        jQuery(t).click(function (t) {
            var e = jQuery(t.target), n = jQuery("#" + e.data("checkbox-container") + ' input[type="checkbox"]');
            if (e.data("btn-check-toggle")) {
                var i = "Deselect All", r = "Select All";
                e.data("label-text-deselect") && (i = e.data("label-text-deselect")), e.data("label-text-select") && (r = e.data("label-text-select")), e.hasClass("toggle-active") ? (n.prop("checked", !1), e.text(i), e.removeClass("toggle-active")) : (n.prop("checked", !0), e.text(r), e.addClass("toggle-active"))
            } else e.data("btn-toggle-on") ? n.prop("checked", !0) : n.prop("checked", !1)
        })
    }, this
}), function (t) {
    WHMCS.hasModule("utils") || WHMCS.loadModule("utils", t)
}(function () {
    return this.simpleRNG = function () {
        for (var t = "./$_-#!,^*()|", e = 0, n = 0; e < 3; n++) e += Math.floor(10 * Math.random() / 2);
        e = Math.floor(e);
        for (var i = "", r = 0; r < e; r++) v = (Math.random() + 1).toString(24).split(".")[1], i += Math.random() > .5 ? btoa(v).substr(0, 4) : v, Math.random() > .5 && (i += t.substr(Math.floor(13 * Math.random()), 1));
        return i
    }, this.getRouteUrl = function (t) {
        return whmcsBaseUrl + "/index.php?rp=" + t
    }, this.validateBaseUrl = function () {
        "undefined" == typeof window.whmcsBaseUrl ? (console.log("Warning: The WHMCS Base URL definition is missing from your active template. Please refer to https://docs.whmcs.com/WHMCS_Base_URL_Template_Variable for more information and details of how to resolve this warning."), window.whmcsBaseUrl = this.autoDetermineBaseUrl(), window.whmcsBaseUrlAutoSet = !0) : "" === window.whmcsBaseUrl && "undefined" != typeof window.whmcsBaseUrlAutoSet && window.whmcsBaseUrlAutoSet === !0 && (window.whmcsBaseUrl = this.autoDetermineBaseUrl())
    }, this.autoDetermineBaseUrl = function () {
        var t = window.location.href, e = -1;
        if ("undefined" != typeof t && (e = t.indexOf(".php")), e === -1 && (t = jQuery("#Primary_Navbar-Home a").attr("href"), "undefined" != typeof t && (e = t.indexOf(".php"))), e !== -1) {
            t = t.substring(0, e);
            var n = t.lastIndexOf("/");
            if (n !== !1) return t.substring(0, n)
        }
        return ""
    }, this
}), WHMCS.utils.validateBaseUrl(), jQuery(document).ready(function () {
    function t(t, e, n) {
        n = n || saving;
        var i = /[^\s]+/g, r = [], o = 0, a = 0;
        if (t && (r = t.match(i), a = t.split(/\\r\\n|\\r|\\n/).length), r) for (var s = 0; s < r.length; s++) o += r[s].charCodeAt(0) >= 19968 ? r[s].length : 1;
        return '<div class="small-font">lines: ' + a + "&nbsp;&nbsp;&nbsp;words: " + o + (e ? '&nbsp;&nbsp;&nbsp;<span class="markdown-save">' + n + "</span>" : "") + "</div>"
    }

    function e() {
        o >= 0 && (0 == o && jQuery("span.markdown-save").html(saved), o--, setTimeout(e, 1e3))
    }

    if (jQuery("#languageChooser").popover({
            container: "body",
            placement: "bottom",
            template: '<div class="popover language-popover" role="tooltip"><div class="arrow"></div><div class="popover-content"></div></div>',
            html: !0,
            content: function () {
                return jQuery("#languageChooserContent").html()
            }
        }), jQuery("#loginOrRegister").popover({
            container: "body",
            placement: "bottom",
            template: '<div class="popover login-popover" role="tooltip"><div class="arrow"></div><div class="popover-content"></div></div>',
            html: !0,
            content: function () {
                return jQuery("#loginOrRegisterContent").html()
            }
        }), jQuery("#accountNotifications").popover({
            container: "body",
            placement: "bottom",
            template: '<div class="popover popover-user-notifications" role="tooltip"><div class="arrow"></div><div class="popover-inner"><h3 class="popover-title"></h3><div class="popover-content"><p></p></div></div></div>',
            html: !0,
            content: function () {
                return jQuery("#accountNotificationsContent").html()
            }
        }), jQuery(".truncate").each(function () {
            jQuery(this).attr("title", jQuery(this).text()).attr("data-toggle", "tooltip").attr("data-placement", "bottom")
        }), jQuery('[data-toggle="popover"]').popover({html: !0}), jQuery('[data-toggle="tooltip"]').tooltip(), jQuery("body").on("click", function (t) {
            jQuery('[data-toggle="popover"]').each(function () {
                jQuery(this).is(t.target) || 0 !== jQuery(this).has(t.target).length || 0 !== jQuery(".popover").has(t.target).length || jQuery(this).popover("hide")
            })
        }), jQuery(".list-group-tab-nav a").click(function () {
            if (jQuery(this).hasClass("disabled")) return !1;
            jQuery(".list-group-tab-nav a").removeClass("active"), jQuery(this).addClass("active");
            var t = this.href.split("#")[1];
            t && (window.location.hash = "#" + t)
        }), jQuery(".panel-minimise").click(function (t) {
            t.preventDefault(), jQuery(this).hasClass("minimised") ? (jQuery(this).parents(".panel").find(".panel-body, .list-group").slideDown(), jQuery(this).removeClass("minimised")) : (jQuery(this).parents(".panel").find(".panel-body, .list-group").slideUp(), jQuery(this).addClass("minimised"))
        }), jQuery(".container").width() <= 720 && (jQuery(".panel-sidebar").find(".panel-body, .list-group").hide(), jQuery(".panel-sidebar").find(".panel-minimise").addClass("minimised")), "" != jQuery(location).attr("hash").substr(1)) {
        var n = jQuery(location).attr("hash");
        jQuery(".tab-pane").removeClass("active"), jQuery(n).removeClass("fade").addClass("active"), jQuery(".list-group-tab-nav a").removeClass("active"), jQuery('a[href="' + n + '"]').addClass("active"), setTimeout(function () {
            window.scrollTo(0, 0)
        }, 1)
    }
    jQuery.prototype.bootstrapSwitch && jQuery(".toggle-switch-success").bootstrapSwitch({onColor: "success"}), jQuery(".panel-collapsable .panel-heading").click(function (t) {
        var e = jQuery(this);
        e.parents(".panel").hasClass("panel-collapsed") ? (e.parents(".panel").removeClass("panel-collapsed").find(".panel-body").slideDown(), e.find(".collapse-icon i").removeClass("fa-plus").addClass("fa-minus")) : (e.parents(".panel").addClass("panel-collapsed").find(".panel-body").slideUp(), e.find(".collapse-icon i").removeClass("fa-minus").addClass("fa-plus"))
    }), "#frmLogin".length > 0 && jQuery("#frmLogin input:text:visible:first").focus(), "#twofaactivation".length > 0 && jQuery("#twofaactivation input:text:visible:first,#twofaactivation input:password:visible:first").focus(), jQuery("#inputSubaccountActivate").click(function () {
        null != jQuery("#inputSubaccountActivate:checked").val() ? jQuery("#subacct-container").removeClass("hidden") : jQuery("#subacct-container").addClass("hidden")
    }), jQuery(".setBulkAction").click(function (t) {
        t.preventDefault();
        var e = jQuery(this).attr("id").replace("Link", ""), n = jQuery("#domainForm");
        if ("renewDomains" === e) n.attr("action", WHMCS.utils.getRouteUrl("/cart/domain/renew")); else {
            if (0 !== jQuery("#" + e).length) {
                var i = n.attr("action");
                n.attr("action", i + "#" + e)
            }
            jQuery("#bulkaction").val(e)
        }
        n.submit()
    }), jQuery(".stopEventBubble").click(function (t) {
        t.stopPropagation()
    }), jQuery(".tabControlLink").on("click", function (t) {
        t.preventDefault();
        var e = jQuery(this).attr("href");
        jQuery("a[href='/" + e + "']").click()
    }), jQuery(".ticket-reply .rating span.star").click(function (t) {
        window.location = "viewticket.php?tid=" + jQuery(this).parent(".rating").attr("ticketid") + "&c=" + jQuery(this).parent(".rating").attr("ticketkey") + "&rating=rate" + jQuery(this).parent(".rating").attr("ticketreplyid") + "_" + jQuery(this).attr("rate")
    }), jQuery("a.autoLinked").click(function (t) {
        t.preventDefault();
        var e = window.open();
        e.opener = null, e.location = t.target.href
    }), jQuery("#inputAllowSso").on("switchChange.bootstrapSwitch", function (t, e) {
        e ? (jQuery("#ssoStatusTextEnabled").removeClass("hidden").show(), jQuery("#ssoStatusTextDisabled").hide()) : (jQuery("#ssoStatusTextDisabled").removeClass("hidden").show(), jQuery("#ssoStatusTextEnabled").hide()), jQuery.post("clientarea.php", jQuery("#frmSingleSignOn").serialize())
    }), jQuery(".btn-service-sso").on("click", function (t) {
        t.preventDefault();
        var e = jQuery(this), n = e.parents("form");
        0 == n.length && (n = e.find("form")), n.hasClass("disabled") || (e.find(".loading").removeClass("hidden").show().end().attr("disabled", "disabled"), jQuery.post(window.location.href, n.serialize(), function (t) {
            e.find(".loading").hide().end().removeAttr("disabled"), n.find(".login-feedback").html(""), t.error && n.find(".login-feedback").html(t.error), void 0 !== t.redirect && "window|" === t.redirect.substr(0, 7) && window.open(t.redirect.substr(7), "_blank")
        }, "json"))
    }), jQuery(".btn-sidebar-form-submit").on("click", function (t) {
        t.preventDefault(), jQuery(this).find(".loading").removeClass("hidden").show().end().attr("disabled", "disabled");
        var e = jQuery(this).parents("form");
        0 == e.length && (e = jQuery(this).find("form")), 0 !== e.length && e.hasClass("disabled") === !1 ? e.submit() : jQuery(this).find(".loading").hide().end().removeAttr("disabled")
    }), jQuery(".email-verification .btn.close").click(function (t) {
        t.preventDefault(), jQuery.post("clientarea.php", "action=dismiss-email-banner&token=" + csrfToken), jQuery(".email-verification").hide()
    }), jQuery(".back-to-top").click(function (t) {
        t.preventDefault(), jQuery("body,html").animate({scrollTop: 0}, 500)
    }), jQuery(".choose-language").click(function (t) {
        t.preventDefault()
    });
    var i = 0, r = "clientMDE", o = 0;
    jQuery(".markdown-editor").each(function (n) {
        i++;
        var a = jQuery(this).data("auto-save-name"), s = jQuery(this).attr("id") + "-footer";
        "undefined" == typeof a && (a = "client_area"), window[r + i.toString()] = jQuery(this).markdown({
            footer: '<div id="' + s + '" class="markdown-editor-status"></div>',
            autofocus: !1,
            savable: !1,
            resize: "vertical",
            iconlibrary: "fa",
            language: locale,
            onShow: function (e) {
                var n = "", i = !1;
                "undefined" != typeof Storage && (n = localStorage.getItem(a), i = !0, n && "undefined" != typeof n && e.setContent(n)), jQuery("#" + s).html(t(n, i, saved))
            },
            onChange: function (n) {
                var i = n.getContent(), r = !1;
                "undefined" != typeof Storage && (o = 3, r = !0, localStorage.setItem(a, i), e()), jQuery("#" + s).html(t(i, r))
            },
            onPreview: function (t) {
                var e, n = t.getContent();
                return jQuery.ajax({
                    url: "clientarea.php",
                    async: !1,
                    data: {token: csrfToken, action: "parseMarkdown", content: n},
                    dataType: "json",
                    success: function (t) {
                        e = t
                    }
                }), e.body ? e.body : ""
            },
            additionalButtons: [[{
                name: "groupCustom",
                data: [{
                    name: "cmdHelp",
                    title: "Help",
                    hotkey: "Ctrl+F1",
                    btnClass: "btn open-modal",
                    icon: {
                        glyph: "glyphicons glyphicons-question-sign",
                        fa: "fa fa-question-circle",
                        "fa-3": "icon-question-sign"
                    },
                    callback: function (t) {
                        t.$editor.removeClass("md-fullscreen-mode")
                    }
                }]
            }]],
            hiddenButtons: ["cmdImage"]
        }), jQuery('button[data-handler="bootstrap-markdown-cmdHelp"]').attr("data-modal-title", markdownGuide).attr("href", "submitticket.php?action=markdown"), jQuery(this).closest("form").bind({
            submit: function () {
                "undefined" != typeof Storage && localStorage.removeItem(a)
            }
        })
    }), jQuery("#btnResendVerificationEmail").click(function () {
        jQuery.post("clientarea.php", {token: csrfToken, action: "resendVerificationEmail"}).done(function (t) {
            jQuery("#btnResendVerificationEmail").html("Email Sent").prop("disabled", !0)
        })
    });
    var a = jQuery("input[name=2fasetup]").parent("form");
    a.submit(function (t) {
        t.preventDefault(), openModal(a.attr("action"), a.serialize(), "Loading...")
    }), jQuery("#frmPayment").find("#btnSubmit").on("click", function () {
        jQuery(this).find("span").toggleClass("hidden")
    }), jQuery(".btn-resend-approver-email").click(function () {
        jQuery.post(jQuery(this).data("url"), {
            addonId: jQuery(this).data("addonid"),
            serviceId: jQuery(this).data("serviceid")
        }, function (t) {
            1 == t.success ? jQuery(".alert-table-ssl-manage").addClass("alert-success").text("Approver Email Resent").removeClass("hidden") : jQuery(".alert-table-ssl-manage").addClass("alert-danger").text("Error: " + t.message).removeClass("hidden")
        })
    }), jQuery(".tld-filters a").click(function (t) {
        t.preventDefault(), jQuery(this).hasClass("label-success") ? jQuery(this).removeClass("label-success") : jQuery(this).addClass("label-success"), jQuery(".tld-row").removeClass("filtered-row"), jQuery(".tld-filters a.label-success").each(function (t) {
            var e = jQuery(this).data("category");
            jQuery('.tld-row[data-category*="' + e + '"]').addClass("filtered-row")
        }), jQuery(".filtered-row:even").removeClass("highlighted"), jQuery(".filtered-row:odd").addClass("highlighted"), jQuery('.tld-row:not(".filtered-row")').fadeOut("", function () {
            0 === jQuery(".filtered-row").size() ? jQuery(".tld-row.no-tlds").show() : jQuery(".tld-row.no-tlds").hide()
        }), jQuery(".tld-row.filtered-row").fadeIn()
    }), jQuery(".filtered-row:even").removeClass("highlighted"), jQuery(".filtered-row:odd").addClass("highlighted"), WHMCS.ui.dataTable.register(), WHMCS.ui.confirmation.register(), jQuery("#frmReply").submit(function (t) {
        jQuery("#frmReply").find('input[type="submit"]').addClass("disabled").prop("disabled", !0)
    })
});
var lastTicketMsg;
jQuery(document).ready(function () {
    jQuery(document).on("click", ".open-modal", function (t) {
        t.preventDefault();
        var e = jQuery(this).attr("href"), n = jQuery(this).data("modal-size"), i = jQuery(this).data("modal-class"),
            r = jQuery(this).data("modal-title"), o = jQuery(this).data("btn-submit-id"),
            a = jQuery(this).data("btn-submit-label"), s = jQuery(this).data("btn-close-hide"),
            d = jQuery(this).attr("disabled"), l = jQuery(this).data("datatable-reload-success");
        d || openModal(e, "", r, n, i, a, o, s, l)
    }), jQuery("#modalAjax").on("hidden.bs.modal", function (t) {
        if (jQuery(this).hasClass("modal-feature-highlights")) {
            var e = jQuery("#cbFeatureHighlightsDismissForVersion").is(":checked");
            jQuery.post("whatsnew.php", {dismiss: "1", until_next_update: e ? "1" : "0", token: csrfToken})
        }
        jQuery("#modalAjax").find(".modal-body").empty(), jQuery("#modalAjax").children("div.modal-dialog").removeClass("modal-lg"), jQuery("#modalAjax").removeClass().addClass("modal whmcs-modal fade"), jQuery("#modalAjax .modal-title").html("Title"), jQuery("#modalAjax .modal-submit").html("Submit").removeClass().addClass("btn btn-primary modal-submit").removeAttr("id").removeAttr("disabled"), jQuery("#modalAjax .loader").show()
    })
}), function () {
    var t = [].slice;
    !function (e, n) {
        "use strict";
        var i;
        return i = function () {
            function t(t, n) {
                null == n && (n = {}), this.$element = e(t), this.options = e.extend({}, e.fn.bootstrapSwitch.defaults, {
                    state: this.$element.is(":checked"),
                    size: this.$element.data("size"),
                    animate: this.$element.data("animate"),
                    disabled: this.$element.is(":disabled"),
                    readonly: this.$element.is("[readonly]"),
                    indeterminate: this.$element.data("indeterminate"),
                    inverse: this.$element.data("inverse"),
                    radioAllOff: this.$element.data("radio-all-off"),
                    onColor: this.$element.data("on-color"),
                    offColor: this.$element.data("off-color"),
                    onText: this.$element.data("on-text"),
                    offText: this.$element.data("off-text"),
                    labelText: this.$element.data("label-text"),
                    handleWidth: this.$element.data("handle-width"),
                    labelWidth: this.$element.data("label-width"),
                    baseClass: this.$element.data("base-class"),
                    wrapperClass: this.$element.data("wrapper-class")
                }, n), this.$wrapper = e("<div>", {
                    class: function (t) {
                        return function () {
                            var e;
                            return e = ["" + t.options.baseClass].concat(t._getClasses(t.options.wrapperClass)), e.push(t.options.state ? "" + t.options.baseClass + "-on" : "" + t.options.baseClass + "-off"), null != t.options.size && e.push("" + t.options.baseClass + "-" + t.options.size), t.options.disabled && e.push("" + t.options.baseClass + "-disabled"), t.options.readonly && e.push("" + t.options.baseClass + "-readonly"), t.options.indeterminate && e.push("" + t.options.baseClass + "-indeterminate"), t.options.inverse && e.push("" + t.options.baseClass + "-inverse"), t.$element.attr("id") && e.push("" + t.options.baseClass + "-id-" + t.$element.attr("id")), e.join(" ")
                        }
                    }(this)()
                }), this.$container = e("<div>", {class: "" + this.options.baseClass + "-container"}), this.$on = e("<span>", {
                    html: this.options.onText,
                    class: "" + this.options.baseClass + "-handle-on " + this.options.baseClass + "-" + this.options.onColor
                }), this.$off = e("<span>", {
                    html: this.options.offText,
                    class: "" + this.options.baseClass + "-handle-off " + this.options.baseClass + "-" + this.options.offColor
                }), this.$label = e("<span>", {
                    html: this.options.labelText,
                    class: "" + this.options.baseClass + "-label"
                }), this.$element.on("init.bootstrapSwitch", function (e) {
                    return function () {
                        return e.options.onInit.apply(t, arguments)
                    }
                }(this)), this.$element.on("switchChange.bootstrapSwitch", function (e) {
                    return function () {
                        return e.options.onSwitchChange.apply(t, arguments)
                    }
                }(this)), this.$container = this.$element.wrap(this.$container).parent(), this.$wrapper = this.$container.wrap(this.$wrapper).parent(), this.$element.before(this.options.inverse ? this.$off : this.$on).before(this.$label).before(this.options.inverse ? this.$on : this.$off), this.options.indeterminate && this.$element.prop("indeterminate", !0), this._init(), this._elementHandlers(), this._handleHandlers(), this._labelHandlers(), this._formHandler(), this._externalLabelHandler(), this.$element.trigger("init.bootstrapSwitch")
            }

            return t.prototype._constructor = t, t.prototype.state = function (t, e) {
                return "undefined" == typeof t ? this.options.state : this.options.disabled || this.options.readonly ? this.$element : this.options.state && !this.options.radioAllOff && this.$element.is(":radio") ? this.$element : (this.options.indeterminate && this.indeterminate(!1), t = !!t, this.$element.prop("checked", t).trigger("change.bootstrapSwitch", e), this.$element)
            }, t.prototype.toggleState = function (t) {
                return this.options.disabled || this.options.readonly ? this.$element : this.options.indeterminate ? (this.indeterminate(!1), this.state(!0)) : this.$element.prop("checked", !this.options.state).trigger("change.bootstrapSwitch", t)
            }, t.prototype.size = function (t) {
                return "undefined" == typeof t ? this.options.size : (null != this.options.size && this.$wrapper.removeClass("" + this.options.baseClass + "-" + this.options.size), t && this.$wrapper.addClass("" + this.options.baseClass + "-" + t), this._width(), this._containerPosition(), this.options.size = t, this.$element)
            }, t.prototype.animate = function (t) {
                return "undefined" == typeof t ? this.options.animate : (t = !!t, t === this.options.animate ? this.$element : this.toggleAnimate())
            }, t.prototype.toggleAnimate = function () {
                return this.options.animate = !this.options.animate, this.$wrapper.toggleClass("" + this.options.baseClass + "-animate"), this.$element
            }, t.prototype.disabled = function (t) {
                return "undefined" == typeof t ? this.options.disabled : (t = !!t, t === this.options.disabled ? this.$element : this.toggleDisabled())
            }, t.prototype.toggleDisabled = function () {
                return this.options.disabled = !this.options.disabled, this.$element.prop("disabled", this.options.disabled), this.$wrapper.toggleClass("" + this.options.baseClass + "-disabled"), this.$element
            }, t.prototype.readonly = function (t) {
                return "undefined" == typeof t ? this.options.readonly : (t = !!t, t === this.options.readonly ? this.$element : this.toggleReadonly())
            }, t.prototype.toggleReadonly = function () {
                return this.options.readonly = !this.options.readonly, this.$element.prop("readonly", this.options.readonly), this.$wrapper.toggleClass("" + this.options.baseClass + "-readonly"), this.$element
            }, t.prototype.indeterminate = function (t) {
                return "undefined" == typeof t ? this.options.indeterminate : (t = !!t, t === this.options.indeterminate ? this.$element : this.toggleIndeterminate())
            }, t.prototype.toggleIndeterminate = function () {
                return this.options.indeterminate = !this.options.indeterminate, this.$element.prop("indeterminate", this.options.indeterminate), this.$wrapper.toggleClass("" + this.options.baseClass + "-indeterminate"), this._containerPosition(), this.$element
            }, t.prototype.inverse = function (t) {
                return "undefined" == typeof t ? this.options.inverse : (t = !!t, t === this.options.inverse ? this.$element : this.toggleInverse())
            }, t.prototype.toggleInverse = function () {
                var t, e;
                return this.$wrapper.toggleClass("" + this.options.baseClass + "-inverse"), e = this.$on.clone(!0), t = this.$off.clone(!0), this.$on.replaceWith(t), this.$off.replaceWith(e), this.$on = t, this.$off = e, this.options.inverse = !this.options.inverse, this.$element
            }, t.prototype.onColor = function (t) {
                var e;
                return e = this.options.onColor, "undefined" == typeof t ? e : (null != e && this.$on.removeClass("" + this.options.baseClass + "-" + e), this.$on.addClass("" + this.options.baseClass + "-" + t), this.options.onColor = t, this.$element)
            }, t.prototype.offColor = function (t) {
                var e;
                return e = this.options.offColor, "undefined" == typeof t ? e : (null != e && this.$off.removeClass("" + this.options.baseClass + "-" + e), this.$off.addClass("" + this.options.baseClass + "-" + t), this.options.offColor = t, this.$element)
            }, t.prototype.onText = function (t) {
                return "undefined" == typeof t ? this.options.onText : (this.$on.html(t), this._width(), this._containerPosition(), this.options.onText = t, this.$element)
            }, t.prototype.offText = function (t) {
                return "undefined" == typeof t ? this.options.offText : (this.$off.html(t), this._width(), this._containerPosition(), this.options.offText = t, this.$element)
            }, t.prototype.labelText = function (t) {
                return "undefined" == typeof t ? this.options.labelText : (this.$label.html(t), this._width(), this.options.labelText = t, this.$element)
            }, t.prototype.handleWidth = function (t) {
                return "undefined" == typeof t ? this.options.handleWidth : (this.options.handleWidth = t, this._width(), this._containerPosition(), this.$element)
            }, t.prototype.labelWidth = function (t) {
                return "undefined" == typeof t ? this.options.labelWidth : (this.options.labelWidth = t, this._width(), this._containerPosition(), this.$element)
            }, t.prototype.baseClass = function (t) {
                return this.options.baseClass
            }, t.prototype.wrapperClass = function (t) {
                return "undefined" == typeof t ? this.options.wrapperClass : (t || (t = e.fn.bootstrapSwitch.defaults.wrapperClass), this.$wrapper.removeClass(this._getClasses(this.options.wrapperClass).join(" ")), this.$wrapper.addClass(this._getClasses(t).join(" ")), this.options.wrapperClass = t, this.$element)
            }, t.prototype.radioAllOff = function (t) {
                return "undefined" == typeof t ? this.options.radioAllOff : (t = !!t, t === this.options.radioAllOff ? this.$element : (this.options.radioAllOff = t, this.$element))
            }, t.prototype.onInit = function (t) {
                return "undefined" == typeof t ? this.options.onInit : (t || (t = e.fn.bootstrapSwitch.defaults.onInit), this.options.onInit = t, this.$element)
            }, t.prototype.onSwitchChange = function (t) {
                return "undefined" == typeof t ? this.options.onSwitchChange : (t || (t = e.fn.bootstrapSwitch.defaults.onSwitchChange), this.options.onSwitchChange = t, this.$element)
            }, t.prototype.destroy = function () {
                var t;
                return t = this.$element.closest("form"), t.length && t.off("reset.bootstrapSwitch").removeData("bootstrap-switch"), this.$container.children().not(this.$element).remove(), this.$element.unwrap().unwrap().off(".bootstrapSwitch").removeData("bootstrap-switch"), this.$element
            }, t.prototype._width = function () {
                var t, e;
                return t = this.$on.add(this.$off), t.add(this.$label).css("width", ""), e = "auto" === this.options.handleWidth ? Math.max(this.$on.width(), this.$off.width()) : this.options.handleWidth, t.width(e), this.$label.width(function (t) {
                    return function (n, i) {
                        return "auto" !== t.options.labelWidth ? t.options.labelWidth : i < e ? e : i
                    }
                }(this)), this._handleWidth = this.$on.outerWidth(), this._labelWidth = this.$label.outerWidth(), this.$container.width(2 * this._handleWidth + this._labelWidth), this.$wrapper.width(this._handleWidth + this._labelWidth)
            }, t.prototype._containerPosition = function (t, e) {
                if (null == t && (t = this.options.state), this.$container.css("margin-left", function (e) {
                        return function () {
                            var n;
                            return n = [0, "-" + e._handleWidth + "px"], e.options.indeterminate ? "-" + e._handleWidth / 2 + "px" : t ? e.options.inverse ? n[1] : n[0] : e.options.inverse ? n[0] : n[1]
                        }
                    }(this)), e) return setTimeout(function () {
                    return e()
                }, 50)
            }, t.prototype._init = function () {
                var t, e;
                return t = function (t) {
                    return function () {
                        return t._width(), t._containerPosition(null, function () {
                            if (t.options.animate) return t.$wrapper.addClass("" + t.options.baseClass + "-animate")
                        })
                    }
                }(this), this.$wrapper.is(":visible") ? t() : e = n.setInterval(function (i) {
                    return function () {
                        if (i.$wrapper.is(":visible")) return t(), n.clearInterval(e)
                    }
                }(this), 50)
            }, t.prototype._elementHandlers = function () {
                return this.$element.on({
                    "change.bootstrapSwitch": function (t) {
                        return function (n, i) {
                            var r;
                            if (n.preventDefault(), n.stopImmediatePropagation(), r = t.$element.is(":checked"), t._containerPosition(r), r !== t.options.state) return t.options.state = r, t.$wrapper.toggleClass("" + t.options.baseClass + "-off").toggleClass("" + t.options.baseClass + "-on"), i ? void 0 : (t.$element.is(":radio") && e("[name='" + t.$element.attr("name") + "']").not(t.$element).prop("checked", !1).trigger("change.bootstrapSwitch", !0), t.$element.trigger("switchChange.bootstrapSwitch", [r]))
                        }
                    }(this), "focus.bootstrapSwitch": function (t) {
                        return function (e) {
                            return e.preventDefault(), t.$wrapper.addClass("" + t.options.baseClass + "-focused")
                        }
                    }(this), "blur.bootstrapSwitch": function (t) {
                        return function (e) {
                            return e.preventDefault(), t.$wrapper.removeClass("" + t.options.baseClass + "-focused")
                        }
                    }(this), "keydown.bootstrapSwitch": function (t) {
                        return function (e) {
                            if (e.which && !t.options.disabled && !t.options.readonly) switch (e.which) {
                                case 37:
                                    return e.preventDefault(), e.stopImmediatePropagation(), t.state(!1);
                                case 39:
                                    return e.preventDefault(), e.stopImmediatePropagation(), t.state(!0)
                            }
                        }
                    }(this)
                })
            }, t.prototype._handleHandlers = function () {
                return this.$on.on("click.bootstrapSwitch", function (t) {
                    return function (e) {
                        return e.preventDefault(), e.stopPropagation(), t.state(!1), t.$element.trigger("focus.bootstrapSwitch")
                    }
                }(this)), this.$off.on("click.bootstrapSwitch", function (t) {
                    return function (e) {
                        return e.preventDefault(), e.stopPropagation(), t.state(!0), t.$element.trigger("focus.bootstrapSwitch")
                    }
                }(this))
            }, t.prototype._labelHandlers = function () {
                return this.$label.on({
                    "mousedown.bootstrapSwitch touchstart.bootstrapSwitch": function (t) {
                        return function (e) {
                            if (!(t._dragStart || t.options.disabled || t.options.readonly)) return e.preventDefault(), e.stopPropagation(), t._dragStart = (e.pageX || e.originalEvent.touches[0].pageX) - parseInt(t.$container.css("margin-left"), 10), t.options.animate && t.$wrapper.removeClass("" + t.options.baseClass + "-animate"), t.$element.trigger("focus.bootstrapSwitch")
                        }
                    }(this), "mousemove.bootstrapSwitch touchmove.bootstrapSwitch": function (t) {
                        return function (e) {
                            var n;
                            if (null != t._dragStart && (e.preventDefault(), n = (e.pageX || e.originalEvent.touches[0].pageX) - t._dragStart, !(n < -t._handleWidth || n > 0))) return t._dragEnd = n, t.$container.css("margin-left", "" + t._dragEnd + "px")
                        }
                    }(this), "mouseup.bootstrapSwitch touchend.bootstrapSwitch": function (t) {
                        return function (e) {
                            var n;
                            if (t._dragStart) return e.preventDefault(), t.options.animate && t.$wrapper.addClass("" + t.options.baseClass + "-animate"), t._dragEnd ? (n = t._dragEnd > -(t._handleWidth / 2), t._dragEnd = !1, t.state(t.options.inverse ? !n : n)) : t.state(!t.options.state), t._dragStart = !1
                        }
                    }(this), "mouseleave.bootstrapSwitch": function (t) {
                        return function (e) {
                            return t.$label.trigger("mouseup.bootstrapSwitch")
                        }
                    }(this)
                })
            }, t.prototype._externalLabelHandler = function () {
                var t;
                return t = this.$element.closest("label"), t.on("click", function (e) {
                    return function (n) {
                        if (n.preventDefault(), n.stopImmediatePropagation(), n.target === t[0]) return e.toggleState()
                    }
                }(this))
            }, t.prototype._formHandler = function () {
                var t;
                if (t = this.$element.closest("form"), !t.data("bootstrap-switch")) return t.on("reset.bootstrapSwitch", function () {
                    return n.setTimeout(function () {
                        return t.find("input").filter(function () {
                            return e(this).data("bootstrap-switch")
                        }).each(function () {
                            return e(this).bootstrapSwitch("state", this.checked)
                        })
                    }, 1)
                }).data("bootstrap-switch", !0)
            }, t.prototype._getClasses = function (t) {
                var n, i, r, o;
                if (!e.isArray(t)) return ["" + this.options.baseClass + "-" + t];
                for (i = [], r = 0, o = t.length; r < o; r++) n = t[r], i.push("" + this.options.baseClass + "-" + n);
                return i
            }, t
        }(), e.fn.bootstrapSwitch = function () {
            var n, r, o;
            return r = arguments[0], n = 2 <= arguments.length ? t.call(arguments, 1) : [], o = this, this.each(function () {
                var t, a;
                if (t = e(this), a = t.data("bootstrap-switch"), a || t.data("bootstrap-switch", a = new i(this, r)), "string" == typeof r) return o = a[r].apply(a, n)
            }), o
        }, e.fn.bootstrapSwitch.Constructor = i, e.fn.bootstrapSwitch.defaults = {
            state: !0,
            size: null,
            animate: !0,
            disabled: !1,
            readonly: !1,
            indeterminate: !1,
            inverse: !1,
            radioAllOff: !1,
            onColor: "primary",
            offColor: "default",
            onText: "ON",
            offText: "OFF",
            labelText: "&nbsp;",
            handleWidth: "auto",
            labelWidth: "auto",
            baseClass: "bootstrap-switch",
            wrapperClass: "wrapper",
            onInit: function () {
            },
            onSwitchChange: function () {
            }
        }
    }(window.jQuery, window)
}.call(this), function (t) {
    "function" == typeof define && define.amd ? define(["jquery"], t) : t("object" == typeof exports ? require("jquery") : jQuery)
}(function (t) {
    "use strict";
    var e = function (e, n) {
        var i = ["autofocus", "savable", "hideable", "width", "height", "resize", "iconlibrary", "language", "footer", "fullscreen", "hiddenButtons", "disabledButtons"];
        t.each(i, function (i, r) {
            "undefined" != typeof t(e).data(r) && (n = "object" == typeof n ? n : {}, n[r] = t(e).data(r))
        }), this.$ns = "bootstrap-markdown", this.$element = t(e), this.$editable = {
            el: null,
            type: null,
            attrKeys: [],
            attrValues: [],
            content: null
        }, this.$options = t.extend(!0, {}, t.fn.markdown.defaults, n, this.$element.data("options")), this.$oldContent = null, this.$isPreview = !1, this.$isFullscreen = !1, this.$editor = null, this.$textarea = null, this.$handler = [], this.$callback = [], this.$nextTab = [], this.showEditor()
    };
    e.prototype = {
        constructor: e, __alterButtons: function (e, n) {
            var i = this.$handler, r = "all" == e, o = this;
            t.each(i, function (t, i) {
                var a = !0;
                a = !r && i.indexOf(e) < 0, a === !1 && n(o.$editor.find('button[data-handler="' + i + '"]'))
            })
        }, __buildButtons: function (e, n) {
            var i, r = this.$ns, o = this.$handler, a = this.$callback;
            for (i = 0; i < e.length; i++) {
                var s, d = e[i];
                for (s = 0; s < d.length; s++) {
                    var l, u = d[s].data, c = t("<div/>", {class: "btn-group"});
                    for (l = 0; l < u.length; l++) {
                        var h, p, f = u[l], g = r + "-" + f.name, $ = this.__getIcon(f.icon),
                            m = f.btnText ? f.btnText : "", v = f.btnClass ? f.btnClass : "btn",
                            y = f.tabIndex ? f.tabIndex : "-1", b = "undefined" != typeof f.hotkey ? f.hotkey : "",
                            C = "undefined" != typeof jQuery.hotkeys && "" !== b ? " (" + b + ")" : "";
                        h = t("<button></button>"), h.text(" " + this.__localize(m)).addClass("btn-default btn-sm").addClass(v), v.match(/btn\-(primary|success|info|warning|danger|link)/) && h.removeClass("btn-default"), h.attr({
                            type: "button",
                            title: this.__localize(f.title) + C,
                            tabindex: y,
                            "data-provider": r,
                            "data-handler": g,
                            "data-hotkey": b
                        }), f.toggle === !0 && h.attr("data-toggle", "button"), p = t("<span/>"), p.addClass($), p.prependTo(h), c.append(h), o.push(g), a.push(f.callback)
                    }
                    n.append(c)
                }
            }
            return n
        }, __setListener: function () {
            var e = "undefined" != typeof this.$textarea.attr("rows"),
                n = this.$textarea.val().split("\n").length > 5 ? this.$textarea.val().split("\n").length : "5",
                i = e ? this.$textarea.attr("rows") : n;
            this.$textarea.attr("rows", i), this.$options.resize && this.$textarea.css("resize", this.$options.resize), this.$textarea.on({
                focus: t.proxy(this.focus, this),
                keyup: t.proxy(this.keyup, this),
                change: t.proxy(this.change, this),
                select: t.proxy(this.select, this)
            }), this.eventSupported("keydown") && this.$textarea.on("keydown", t.proxy(this.keydown, this)), this.eventSupported("keypress") && this.$textarea.on("keypress", t.proxy(this.keypress, this)), this.$textarea.data("markdown", this)
        }, __handle: function (e) {
            var n = t(e.currentTarget), i = this.$handler, r = this.$callback, o = n.attr("data-handler"),
                a = i.indexOf(o), s = r[a];
            t(e.currentTarget).focus(), s(this), this.change(this), o.indexOf("cmdSave") < 0 && this.$textarea.focus(), e.preventDefault()
        }, __localize: function (e) {
            var n = t.fn.markdown.messages, i = this.$options.language;
            return "undefined" != typeof n && "undefined" != typeof n[i] && "undefined" != typeof n[i][e] ? n[i][e] : e
        }, __getIcon: function (t) {
            return "object" == typeof t ? t[this.$options.iconlibrary] : t
        }, setFullscreen: function (e) {
            var n = this.$editor, i = this.$textarea;
            e === !0 ? (n.addClass("md-fullscreen-mode"), t("body").addClass("md-nooverflow"), this.$options.onFullscreen(this)) : (n.removeClass("md-fullscreen-mode"), t("body").removeClass("md-nooverflow"), 1 == this.$isPreview && this.hidePreview().showPreview()), this.$isFullscreen = e, i.focus()
        }, showEditor: function () {
            var e, n = this, i = this.$ns, r = this.$element, o = (r.css("height"), r.css("width"), this.$editable),
                a = this.$handler, s = this.$callback, d = this.$options, l = t("<div/>", {
                    class: "md-editor", click: function () {
                        n.focus()
                    }
                });
            if (null === this.$editor) {
                var u = t("<div/>", {class: "md-header btn-toolbar"}), c = [];
                if (d.buttons.length > 0 && (c = c.concat(d.buttons[0])), d.additionalButtons.length > 0 && t.each(d.additionalButtons[0], function (e, n) {
                        var i = t.grep(c, function (t, e) {
                            return t.name === n.name
                        });
                        i.length > 0 ? i[0].data = i[0].data.concat(n.data) : c.push(d.additionalButtons[0][e])
                    }), d.reorderButtonGroups.length > 0 && (c = c.filter(function (t) {
                        return d.reorderButtonGroups.indexOf(t.name) > -1
                    }).sort(function (t, e) {
                        return d.reorderButtonGroups.indexOf(t.name) < d.reorderButtonGroups.indexOf(e.name) ? -1 : d.reorderButtonGroups.indexOf(t.name) > d.reorderButtonGroups.indexOf(e.name) ? 1 : 0
                    })), c.length > 0 && (u = this.__buildButtons([c], u)), d.fullscreen.enable && u.append('<div class="md-controls"><a class="md-control md-control-fullscreen" href="#"><span class="' + this.__getIcon(d.fullscreen.icons.fullscreenOn) + '"></span></a></div>').on("click", ".md-control-fullscreen", function (t) {
                        t.preventDefault(), n.setFullscreen(!0)
                    }), l.append(u), r.is("textarea")) r.before(l), e = r, e.addClass("md-input"), l.append(e); else {
                    var h = "function" == typeof toMarkdown ? toMarkdown(r.html()) : r.html(), p = t.trim(h);
                    e = t("<textarea/>", {
                        class: "md-input",
                        val: p
                    }), l.append(e), o.el = r, o.type = r.prop("tagName").toLowerCase(), o.content = r.html(), t(r[0].attributes).each(function () {
                        o.attrKeys.push(this.nodeName), o.attrValues.push(this.nodeValue)
                    }), r.replaceWith(l)
                }
                var f = t("<div/>", {class: "md-footer"}), g = !1, $ = "";
                if (d.savable) {
                    g = !0;
                    var m = "cmdSave";
                    a.push(m), s.push(d.onSave), f.append('<button class="btn btn-success" data-provider="' + i + '" data-handler="' + m + '"><i class="icon icon-white icon-ok"></i> ' + this.__localize("Save") + "</button>")
                }
                if ($ = "function" == typeof d.footer ? d.footer(this) : d.footer, "" !== t.trim($) && (g = !0, f.append($)), g && l.append(f), d.width && "inherit" !== d.width && (jQuery.isNumeric(d.width) ? (l.css("display", "table"), e.css("width", d.width + "px")) : l.addClass(d.width)), d.height && "inherit" !== d.height) if (jQuery.isNumeric(d.height)) {
                    var v = d.height;
                    u && (v = Math.max(0, v - u.outerHeight())), f && (v = Math.max(0, v - f.outerHeight())), e.css("height", v + "px")
                } else l.addClass(d.height);
                this.$editor = l, this.$textarea = e, this.$editable = o, this.$oldContent = this.getContent(), this.__setListener(), this.$editor.attr("id", (new Date).getTime()), this.$editor.on("click", '[data-provider="bootstrap-markdown"]', t.proxy(this.__handle, this)), (this.$element.is(":disabled") || this.$element.is("[readonly]")) && (this.$editor.addClass("md-editor-disabled"), this.disableButtons("all")), this.eventSupported("keydown") && "object" == typeof jQuery.hotkeys && u.find('[data-provider="bootstrap-markdown"]').each(function () {
                    var n = t(this), i = n.attr("data-hotkey");
                    "" !== i.toLowerCase() && e.bind("keydown", i, function () {
                        return n.trigger("click"), !1
                    })
                }), "preview" === d.initialstate ? this.showPreview() : "fullscreen" === d.initialstate && d.fullscreen.enable && this.setFullscreen(!0)
            } else this.$editor.show();
            return d.autofocus && (this.$textarea.focus(), this.$editor.addClass("active")), d.fullscreen.enable && d.fullscreen !== !1 && (this.$editor.append('<div class="md-fullscreen-controls"><a href="#" class="exit-fullscreen" title="Exit fullscreen"><span class="' + this.__getIcon(d.fullscreen.icons.fullscreenOff) + '"></span></a></div>'), this.$editor.on("click", ".exit-fullscreen", function (t) {
                t.preventDefault(), n.setFullscreen(!1)
            })), this.hideButtons(d.hiddenButtons), this.disableButtons(d.disabledButtons), d.onShow(this), this
        }, parseContent: function (t) {
            var e, t = t || this.$textarea.val();
            return e = this.$options.parser ? this.$options.parser(t) : "object" == typeof markdown ? markdown.toHTML(t) : "function" == typeof marked ? marked(t) : t
        }, showPreview: function () {
            var e, n, i = this.$options, r = this.$textarea, o = r.next(),
                a = t("<div/>", {class: "md-preview", "data-provider": "markdown-preview"});
            return 1 == this.$isPreview ? this : (this.$isPreview = !0, this.disableButtons("all").enableButtons("cmdPreview"), n = i.onPreview(this), e = "string" == typeof n ? n : this.parseContent(), a.html(e), o && "md-footer" == o.attr("class") ? a.insertBefore(o) : r.parent().append(a), a.css({
                width: r.outerWidth() + "px",
                height: r.outerHeight() + "px"
            }), this.$options.resize && a.css("resize", this.$options.resize), r.hide(), a.data("markdown", this), (this.$element.is(":disabled") || this.$element.is("[readonly]")) && (this.$editor.addClass("md-editor-disabled"), this.disableButtons("all")), this)
        }, hidePreview: function () {
            this.$isPreview = !1;
            var t = this.$editor.find('div[data-provider="markdown-preview"]');
            return t.remove(), this.enableButtons("all"), this.disableButtons(this.$options.disabledButtons), this.$textarea.show(), this.__setListener(), this
        }, isDirty: function () {
            return this.$oldContent != this.getContent()
        }, getContent: function () {
            return this.$textarea.val()
        }, setContent: function (t) {
            return this.$textarea.val(t),
                this
        }, findSelection: function (t) {
            var e, n = this.getContent();
            if (e = n.indexOf(t), e >= 0 && t.length > 0) {
                var i, r = this.getSelection();
                return this.setSelection(e, e + t.length), i = this.getSelection(), this.setSelection(r.start, r.end), i
            }
            return null
        }, getSelection: function () {
            var t = this.$textarea[0];
            return ("selectionStart" in t && function () {
                var e = t.selectionEnd - t.selectionStart;
                return {
                    start: t.selectionStart,
                    end: t.selectionEnd,
                    length: e,
                    text: t.value.substr(t.selectionStart, e)
                }
            } || function () {
                return null
            })()
        }, setSelection: function (t, e) {
            var n = this.$textarea[0];
            return ("selectionStart" in n && function () {
                n.selectionStart = t, n.selectionEnd = e
            } || function () {
                return null
            })()
        }, replaceSelection: function (t) {
            var e = this.$textarea[0];
            return ("selectionStart" in e && function () {
                return e.value = e.value.substr(0, e.selectionStart) + t + e.value.substr(e.selectionEnd, e.value.length), e.selectionStart = e.value.length, this
            } || function () {
                return e.value += t, jQuery(e)
            })()
        }, getNextTab: function () {
            if (0 === this.$nextTab.length) return null;
            var t, e = this.$nextTab.shift();
            return "function" == typeof e ? t = e() : "object" == typeof e && e.length > 0 && (t = e), t
        }, setNextTab: function (t, e) {
            if ("string" == typeof t) {
                var n = this;
                this.$nextTab.push(function () {
                    return n.findSelection(t)
                })
            } else if ("number" == typeof t && "number" == typeof e) {
                var i = this.getSelection();
                this.setSelection(t, e), this.$nextTab.push(this.getSelection()), this.setSelection(i.start, i.end)
            }
        }, __parseButtonNameParam: function (t) {
            return "string" == typeof t ? t.split(" ") : t
        }, enableButtons: function (e) {
            var n = this.__parseButtonNameParam(e), i = this;
            return t.each(n, function (t, e) {
                i.__alterButtons(n[t], function (t) {
                    t.removeAttr("disabled")
                })
            }), this
        }, disableButtons: function (e) {
            var n = this.__parseButtonNameParam(e), i = this;
            return t.each(n, function (t, e) {
                i.__alterButtons(n[t], function (t) {
                    t.attr("disabled", "disabled")
                })
            }), this
        }, hideButtons: function (e) {
            var n = this.__parseButtonNameParam(e), i = this;
            return t.each(n, function (t, e) {
                i.__alterButtons(n[t], function (t) {
                    t.addClass("hidden")
                })
            }), this
        }, showButtons: function (e) {
            var n = this.__parseButtonNameParam(e), i = this;
            return t.each(n, function (t, e) {
                i.__alterButtons(n[t], function (t) {
                    t.removeClass("hidden")
                })
            }), this
        }, eventSupported: function (t) {
            var e = t in this.$element;
            return e || (this.$element.setAttribute(t, "return;"), e = "function" == typeof this.$element[t]), e
        }, keyup: function (t) {
            var e = !1;
            switch (t.keyCode) {
                case 40:
                case 38:
                case 16:
                case 17:
                case 18:
                    break;
                case 9:
                    var n;
                    if (n = this.getNextTab(), null !== n) {
                        var i = this;
                        setTimeout(function () {
                            i.setSelection(n.start, n.end)
                        }, 500), e = !0
                    } else {
                        var r = this.getSelection();
                        r.start == r.end && r.end == this.getContent().length ? e = !1 : (this.setSelection(this.getContent().length, this.getContent().length), e = !0)
                    }
                    break;
                case 13:
                    e = !1;
                    break;
                case 27:
                    this.$isFullscreen && this.setFullscreen(!1), e = !1;
                    break;
                default:
                    e = !1
            }
            e && (t.stopPropagation(), t.preventDefault()), this.$options.onChange(this)
        }, change: function (t) {
            return this.$options.onChange(this), this
        }, select: function (t) {
            return this.$options.onSelect(this), this
        }, focus: function (e) {
            var n = this.$options, i = (n.hideable, this.$editor);
            return i.addClass("active"), t(document).find(".md-editor").each(function () {
                if (t(this).attr("id") !== i.attr("id")) {
                    var e;
                    e = t(this).find("textarea").data("markdown"), null === e && (e = t(this).find('div[data-provider="markdown-preview"]').data("markdown")), e && e.blur()
                }
            }), n.onFocus(this), this
        }, blur: function (e) {
            var n = this.$options, i = n.hideable, r = this.$editor, o = this.$editable;
            if (r.hasClass("active") || 0 === this.$element.parent().length) {
                if (r.removeClass("active"), i) if (null !== o.el) {
                    var a = t("<" + o.type + "/>"), s = this.getContent(), d = this.parseContent(s);
                    t(o.attrKeys).each(function (t, e) {
                        a.attr(o.attrKeys[t], o.attrValues[t])
                    }), a.html(d), r.replaceWith(a)
                } else r.hide();
                n.onBlur(this)
            }
            return this
        }
    };
    var n = t.fn.markdown;
    t.fn.markdown = function (n) {
        return this.each(function () {
            var i = t(this), r = i.data("markdown"), o = "object" == typeof n && n;
            r || i.data("markdown", r = new e(this, o))
        })
    }, t.fn.markdown.messages = {}, t.fn.markdown.defaults = {
        autofocus: !1,
        hideable: !1,
        savable: !1,
        width: "inherit",
        height: "inherit",
        resize: "none",
        iconlibrary: "glyph",
        language: "en",
        initialstate: "editor",
        parser: null,
        buttons: [[{
            name: "groupFont",
            data: [{
                name: "cmdBold",
                hotkey: "Ctrl+B",
                title: "Bold",
                icon: {glyph: "glyphicon glyphicon-bold", fa: "fa fa-bold", "fa-3": "icon-bold"},
                callback: function (t) {
                    var e, n, i = t.getSelection(), r = t.getContent();
                    e = 0 === i.length ? t.__localize("strong text") : i.text, "**" === r.substr(i.start - 2, 2) && "**" === r.substr(i.end, 2) ? (t.setSelection(i.start - 2, i.end + 2), t.replaceSelection(e), n = i.start - 2) : (t.replaceSelection("**" + e + "**"), n = i.start + 2), t.setSelection(n, n + e.length)
                }
            }, {
                name: "cmdItalic",
                title: "Italic",
                hotkey: "Ctrl+I",
                icon: {glyph: "glyphicon glyphicon-italic", fa: "fa fa-italic", "fa-3": "icon-italic"},
                callback: function (t) {
                    var e, n, i = t.getSelection(), r = t.getContent();
                    e = 0 === i.length ? t.__localize("emphasized text") : i.text, "_" === r.substr(i.start - 1, 1) && "_" === r.substr(i.end, 1) ? (t.setSelection(i.start - 1, i.end + 1), t.replaceSelection(e), n = i.start - 1) : (t.replaceSelection("_" + e + "_"), n = i.start + 1), t.setSelection(n, n + e.length)
                }
            }, {
                name: "cmdHeading",
                title: "Heading",
                hotkey: "Ctrl+H",
                icon: {glyph: "glyphicon glyphicon-header", fa: "fa fa-header", "fa-3": "icon-font"},
                callback: function (t) {
                    var e, n, i, r, o = t.getSelection(), a = t.getContent();
                    e = 0 === o.length ? t.__localize("heading text") : o.text + "\n", i = 4, "### " === a.substr(o.start - i, i) || (i = 3, "###" === a.substr(o.start - i, i)) ? (t.setSelection(o.start - i, o.end), t.replaceSelection(e), n = o.start - i) : o.start > 0 && (r = a.substr(o.start - 1, 1), !!r && "\n" != r) ? (t.replaceSelection("\n\n### " + e), n = o.start + 6) : (t.replaceSelection("### " + e), n = o.start + 4), t.setSelection(n, n + e.length)
                }
            }]
        }, {
            name: "groupLink",
            data: [{
                name: "cmdUrl",
                title: "URL/Link",
                hotkey: "Ctrl+L",
                icon: {glyph: "glyphicon glyphicon-link", fa: "fa fa-link", "fa-3": "icon-link"},
                callback: function (e) {
                    var n, i, r, o = e.getSelection();
                    e.getContent();
                    n = 0 === o.length ? e.__localize("enter link description here") : o.text, r = prompt(e.__localize("Insert Hyperlink"), "http://");
                    var a = new RegExp("^((http|https)://|(mailto:)|(//))[a-z0-9]", "i");
                    if (null !== r && "" !== r && "http://" !== r && a.test(r)) {
                        var s = t("<div>" + r + "</div>").text();
                        e.replaceSelection("[" + n + "](" + s + ")"), i = o.start + 1, e.setSelection(i, i + n.length)
                    }
                }
            }, {
                name: "cmdImage",
                title: "Image",
                hotkey: "Ctrl+G",
                icon: {glyph: "glyphicon glyphicon-picture", fa: "fa fa-picture-o", "fa-3": "icon-picture"},
                callback: function (e) {
                    var n, i, r, o = e.getSelection();
                    e.getContent();
                    n = 0 === o.length ? e.__localize("enter image description here") : o.text, r = prompt(e.__localize("Insert Image Hyperlink"), "http://");
                    var a = new RegExp("^((http|https)://|(//))[a-z0-9]", "i");
                    if (null !== r && "" !== r && "http://" !== r && a.test(r)) {
                        var s = t("<div>" + r + "</div>").text();
                        e.replaceSelection("![" + n + "](" + s + ' "' + e.__localize("enter image title here") + '")'), i = o.start + 2, e.setNextTab(e.__localize("enter image title here")), e.setSelection(i, i + n.length)
                    }
                }
            }]
        }, {
            name: "groupMisc",
            data: [{
                name: "cmdList",
                hotkey: "Ctrl+U",
                title: "Unordered List",
                icon: {glyph: "glyphicon glyphicon-list", fa: "fa fa-list", "fa-3": "icon-list-ul"},
                callback: function (e) {
                    var n, i, r = e.getSelection();
                    e.getContent();
                    if (0 === r.length) n = e.__localize("list text here"), e.replaceSelection("- " + n), i = r.start + 2; else if (r.text.indexOf("\n") < 0) n = r.text, e.replaceSelection("- " + n), i = r.start + 2; else {
                        var o = [];
                        o = r.text.split("\n"), n = o[0], t.each(o, function (t, e) {
                            o[t] = "- " + e
                        }), e.replaceSelection("\n\n" + o.join("\n")), i = r.start + 4
                    }
                    e.setSelection(i, i + n.length)
                }
            }, {
                name: "cmdListO",
                hotkey: "Ctrl+O",
                title: "Ordered List",
                icon: {glyph: "glyphicon glyphicon-th-list", fa: "fa fa-list-ol", "fa-3": "icon-list-ol"},
                callback: function (e) {
                    var n, i, r = e.getSelection();
                    e.getContent();
                    if (0 === r.length) n = e.__localize("list text here"), e.replaceSelection("1. " + n), i = r.start + 3; else if (r.text.indexOf("\n") < 0) n = r.text, e.replaceSelection("1. " + n), i = r.start + 3; else {
                        var o = [];
                        o = r.text.split("\n"), n = o[0], t.each(o, function (t, e) {
                            o[t] = "1. " + e
                        }), e.replaceSelection("\n\n" + o.join("\n")), i = r.start + 5
                    }
                    e.setSelection(i, i + n.length)
                }
            }, {
                name: "cmdCode",
                hotkey: "Ctrl+K",
                title: "Code",
                icon: {glyph: "glyphicon glyphicon-asterisk", fa: "fa fa-code", "fa-3": "icon-code"},
                callback: function (t) {
                    var e, n, i = t.getSelection(), r = t.getContent();
                    e = 0 === i.length ? t.__localize("code text here") : i.text, "```\n" === r.substr(i.start - 4, 4) && "\n```" === r.substr(i.end, 4) ? (t.setSelection(i.start - 4, i.end + 4), t.replaceSelection(e), n = i.start - 4) : "`" === r.substr(i.start - 1, 1) && "`" === r.substr(i.end, 1) ? (t.setSelection(i.start - 1, i.end + 1), t.replaceSelection(e), n = i.start - 1) : r.indexOf("\n") > -1 ? (t.replaceSelection("```\n" + e + "\n```"), n = i.start + 4) : (t.replaceSelection("`" + e + "`"), n = i.start + 1), t.setSelection(n, n + e.length)
                }
            }, {
                name: "cmdQuote",
                hotkey: "Ctrl+Q",
                title: "Quote",
                icon: {glyph: "glyphicon glyphicon-comment", fa: "fa fa-quote-left", "fa-3": "icon-quote-left"},
                callback: function (e) {
                    var n, i, r = e.getSelection();
                    e.getContent();
                    if (0 === r.length) n = e.__localize("quote here"), e.replaceSelection("> " + n), i = r.start + 2; else if (r.text.indexOf("\n") < 0) n = r.text, e.replaceSelection("> " + n), i = r.start + 2; else {
                        var o = [];
                        o = r.text.split("\n"), n = o[0], t.each(o, function (t, e) {
                            o[t] = "> " + e
                        }), e.replaceSelection("\n\n" + o.join("\n")), i = r.start + 4
                    }
                    e.setSelection(i, i + n.length)
                }
            }]
        }, {
            name: "groupUtil",
            data: [{
                name: "cmdPreview",
                toggle: !0,
                hotkey: "Ctrl+P",
                title: "Preview",
                btnText: "Preview",
                btnClass: "btn btn-primary btn-sm",
                icon: {glyph: "glyphicon glyphicon-search", fa: "fa fa-search", "fa-3": "icon-search"},
                callback: function (t) {
                    var e = t.$isPreview;
                    e === !1 ? t.showPreview() : t.hidePreview()
                }
            }]
        }]],
        additionalButtons: [],
        reorderButtonGroups: [],
        hiddenButtons: [],
        disabledButtons: [],
        footer: "",
        fullscreen: {
            enable: !0,
            icons: {
                fullscreenOn: {
                    fa: "fa fa-expand",
                    glyph: "glyphicon glyphicon-fullscreen",
                    "fa-3": "icon-resize-full"
                },
                fullscreenOff: {
                    fa: "fa fa-compress",
                    glyph: "glyphicon glyphicon-fullscreen",
                    "fa-3": "icon-resize-small"
                }
            }
        },
        onShow: function (t) {
        },
        onPreview: function (t) {
        },
        onSave: function (t) {
        },
        onBlur: function (t) {
        },
        onFocus: function (t) {
        },
        onChange: function (t) {
        },
        onFullscreen: function (t) {
        },
        onSelect: function (t) {
        }
    }, t.fn.markdown.Constructor = e, t.fn.markdown.noConflict = function () {
        return t.fn.markdown = n, this
    };
    var i = function (t) {
        var e = t;
        return e.data("markdown") ? void e.data("markdown").showEditor() : void e.markdown()
    }, r = function (e) {
        var n = t(document.activeElement);
        t(document).find(".md-editor").each(function () {
            var e = t(this), i = n.closest(".md-editor")[0] === this,
                r = e.find("textarea").data("markdown") || e.find('div[data-provider="markdown-preview"]').data("markdown");
            r && !i && r.blur()
        })
    };
    t(document).on("click.markdown.data-api", '[data-provide="markdown-editable"]', function (e) {
        i(t(this)), e.preventDefault()
    }).on("click focusin", function (t) {
        r(t)
    }).ready(function () {
        t('textarea[data-provide="markdown"]').each(function () {
            i(t(this))
        })
    })
}), function (t) {
    t.fn.markdown.messages.nl = {
        Bold: "غامق",
        Italic: "مائل",
        Heading: "عنوان",
        "URL/Link": "URL/رابط",
        Image: "صورة",
        List: "قائمة",
        Preview: "استعراض",
        "strong text": "نص غامق",
        "emphasized text": "نص هام",
        "heading text": "العنوان",
        "enter link description here": "ادخل وصف الرابط هنا",
        "Insert Hyperlink": "ادخل الرابط هنا",
        "enter image description here": "ادخل وصف الصورة هنا",
        "Insert Image Hyperlink": "ادخل رابط الصورة هنا",
        "enter image title here": "ادخل عنوان الصورة هنا",
        "list text here": "اكتب النص هنا"
    }
}(jQuery), function (t) {
    t.fn.markdown.messages.cs = {
        Bold: "Tučně",
        Italic: "Kurzíva",
        Heading: "Nadpis",
        "URL/Link": "URL/Odkaz",
        Image: "Obrázek",
        "Unordered List": "Seznam",
        "Ordered List": "Seřazený seznam",
        Code: "Úsek kódu",
        Quote: "Citace",
        Preview: "Náhled",
        "strong text": "tučný text",
        "emphasized text": "zdůrazněný text",
        "heading text": "text nadpisu",
        "enter link description here": "sem vlož popis odkazu",
        "Insert Hyperlink": "Vložit Hyperlink",
        "enter image description here": "sem vlož popis obrázku",
        "Insert Image Hyperlink": "Vlož adresu obrázku",
        "enter image title here": "sem vlož popis obrázku",
        "list text here": "položka seznamu"
    }
}(jQuery), function (t) {
    t.fn.markdown.messages.nb = {
        Bold: "Fed",
        Italic: "Kursiv",
        Heading: "Overskrift",
        "URL/Link": "URL/Link",
        Image: "Billede",
        List: "Liste",
        Preview: "Forhåndsvisning",
        "strong text": "stærk tekst",
        "emphasized text": "fremhævet tekst",
        "heading text": "overskrift tekst",
        "enter link description here": "Skriv link beskrivelse her",
        "Insert Hyperlink": "Indsæt link",
        "enter image description here": "Indsæt billede beskrivelse her",
        "Insert Image Hyperlink": "Indsæt billede link",
        "enter image title here": "Indsæt billede titel",
        "list text here": "Indsæt liste tekst her",
        "quote here": "Indsæt citat her",
        "code text here": "Indsæt kode her"
    }
}(jQuery), function (t) {
    t.fn.markdown.messages.de = {
        Bold: "Fett",
        Italic: "Kursiv",
        Heading: "Überschrift",
        "URL/Link": "Link hinzufügen",
        Image: "Bild hinzufügen",
        "Unordered List": "Unnummerierte Liste",
        "Ordered List": "Nummerierte Liste",
        Code: "Quelltext",
        Quote: "Zitat",
        Preview: "Vorschau",
        "strong text": "Sehr betonter Text",
        "emphasized text": "Betonter Text",
        "heading text": "Überschrift Text",
        "enter link description here": "Linkbeschreibung",
        "Insert Hyperlink": "URL",
        "enter image description here": "Bildbeschreibung",
        "Insert Image Hyperlink": "Bild-URL",
        "enter image title here": "Titel des Bildes",
        "list text here": "Aufzählungs-Text"
    }
}(jQuery), function (t) {
    t.fn.markdown.messages.es = {
        Bold: "Negrita",
        Italic: "Itálica",
        Heading: "Título",
        "URL/Link": "Inserte un link",
        Image: "Inserte una imagen",
        List: "Lista de items",
        Preview: "Previsualizar",
        "strong text": "texto importante",
        "emphasized text": "texto con énfasis",
        "heading text": "texto titular",
        "enter link description here": "descripción del link",
        "Insert Hyperlink": "Inserte un hipervínculo",
        "enter image description here": "descripción de la imagen",
        "Insert Image Hyperlink": "Inserte una imagen con un hipervínculo",
        "enter image title here": "Inserte una imagen con título",
        "list text here": "lista con texto"
    }
}(jQuery), function (t) {
    t.fn.markdown.messages.fa = {
        Bold: "توپر",
        Italic: "مورب",
        Heading: "عنوان",
        "URL/Link": "پیوند",
        Image: "تصویر",
        List: "فهرست",
        Preview: "پیش نمایش",
        "strong text": "متن ضخیم",
        "emphasized text": "نوشته تاکیدی",
        "heading text": "عنوان",
        "enter link description here": "توضیحات پیوند را بنویسید.",
        "Insert Hyperlink": "پیوند را درج نمایید:",
        "enter image description here": "توضیحی برای تصوی بنویسید.",
        "Insert Image Hyperlink": "آدرس تصویر را بنویسید.",
        "enter image title here": "عنوان تصویر را اینجا بنویسید",
        "list text here": "محل متن فهرست"
    }
}(jQuery), function (t) {
    t.fn.markdown.messages.fr = {
        Bold: "Gras",
        Italic: "Italique",
        Heading: "Titre",
        "URL/Link": "Insérer un lien HTTP",
        Image: "Insérer une image",
        List: "Liste à puces",
        Preview: "Prévisualiser",
        "strong text": "texte important",
        "emphasized text": "texte en italique",
        "heading text": "texte d'entête",
        "enter link description here": "entrez la description du lien ici",
        "Insert Hyperlink": "Insérez le lien hypertexte",
        "enter image description here": "entrez la description de l'image ici",
        "Insert Image Hyperlink": "Insérez le lien hypertexte de l'image",
        "enter image title here": "entrez le titre de l'image ici",
        "list text here": "texte à puce ici",
        Save: "Sauvegarder",
        "Ordered List": "Liste ordonnée",
        "Unordered List": "Liste désordonnée",
        Quote: "Citation",
        "quote here": "Votre citation",
        Code: "Code",
        "code text here": "écrire du code ici"
    }
}(jQuery), function (t) {
    t.fn.markdown.messages.ja = {
        Bold: "太字",
        Italic: "斜体",
        Heading: "見出し",
        "URL/Link": "リンク",
        Image: "画像",
        "Unordered List": "リスト",
        "Ordered List": "数字リスト",
        Code: "コード",
        Quote: "引用",
        Preview: "プレビュー",
        "strong text": "太字",
        "emphasized text": "強調",
        "heading text": "見出し",
        "enter link description here": "リンク説明",
        "Insert Hyperlink": "リンク挿入",
        "enter image description here": "画像説明",
        "Insert Image Hyperlink": "画像挿入",
        "enter image title here": "画像タイトル",
        "list text here": "リスト挿入",
        "code text here": "コード",
        "quote here": "引用挿入"
    }
}(jQuery), function (t) {
    t.fn.markdown.messages.kr = {
        Bold: "진하게",
        Italic: "이탤릭체",
        Heading: "머리글",
        "URL/Link": "링크주소",
        Image: "이미지",
        List: "리스트",
        Preview: "미리보기",
        "strong text": "강한 강조 텍스트",
        "emphasized text": "강조 텍스트",
        "heading text": "머리글 텍스트",
        "enter link description here": "여기에 링크의 설명을 적으세요",
        "Insert Hyperlink": "하이퍼링크 삽입",
        "enter image description here": "여기세 이미지 설명을 적으세요",
        "Insert Image Hyperlink": "이미지 링크 삽입",
        "enter image title here": "여기에 이미지 제목을 적으세요",
        "list text here": "리스트 텍스트"
    }
}(jQuery), function (t) {
    t.fn.markdown.messages.nb = {
        Bold: "Fet",
        Italic: "Kursiv",
        Heading: "Overskrift",
        "URL/Link": "URL/Lenke",
        Image: "Bilde",
        List: "Liste",
        Preview: "Forhåndsvisning",
        "strong text": "sterk tekst",
        "emphasized text": "streket tekst",
        "heading text": "overskriften tekst",
        "enter link description here": "Skriv linken beskrivelse her",
        "Insert Hyperlink": "Sett inn lenke",
        "enter image description here": "Angi bildebeskrivelse her",
        "Insert Image Hyperlink": "Sett inn lenke for bilde",
        "enter image title here": "Angi bildetittel her",
        "list text here": "liste tekst her"
    }
}(jQuery), function (t) {
    t.fn.markdown.messages.nl = {
        Bold: "Vet",
        Italic: "Cursief",
        Heading: "Titel",
        "URL/Link": "URL/Link",
        Image: "Afbeelding",
        List: "Lijst",
        Preview: "Voorbeeld",
        "strong text": "vet gedrukte tekst",
        "emphasized text": "schuin gedrukte tekst",
        "heading text": "Titel",
        "enter link description here": "Voer een link beschrijving in",
        "Insert Hyperlink": "Voer een http link in",
        "enter image description here": "Voer een afbeelding beschrijving in",
        "Insert Image Hyperlink": "Voer een afbeelding link in",
        "enter image title here": "Voer de afbeelding titel in",
        "list text here": "lijst item"
    }
}(jQuery), function (t) {
    t.fn.markdown.messages.pl = {
        Bold: "Pogrubienie",
        Italic: "Kursywa",
        Heading: "Nagłówek",
        "URL/Link": "Wstaw link",
        Image: "Wstaw obrazek",
        "Unordered List": "Lista punktowana",
        "Ordered List": "Lista numerowana",
        Code: "Kod źródłowy",
        Quote: "Cytat",
        Preview: "Podgląd",
        "strong text": "pogrubiony tekst",
        "emphasized text": "pochylony tekst",
        "heading text": "nagłówek",
        "enter link description here": "opis linka",
        "Insert Hyperlink": "Wstaw link",
        "enter image description here": "opis obrazka",
        "Insert Image Hyperlink": "Wstaw obrazek",
        "enter image title here": "tytuł obrazka",
        "list text here": "lista"
    }
}(jQuery), function (t) {
    t.fn.markdown.messages.sl = {
        Bold: "Odebeljeno",
        Italic: "Poševno",
        Heading: "Naslov",
        "URL/Link": "Povezava",
        Image: "Slika",
        "Unordered List": "Neurejen seznam",
        "Ordered List": "Urejen seznam",
        Code: "Koda",
        Quote: "Citat",
        Preview: "Predogled",
        "strong text": "odebeljeno besedilo",
        "emphasized text": "poševno besedilo",
        "heading text": "naslov",
        "enter link description here": "opis povezave",
        "Insert Hyperlink": "Vstavi povezavo",
        "enter image description here": "opis slike",
        "Insert Image Hyperlink": "Vstavi povezavo do slike",
        "enter image title here": "naslov slike",
        "list text here": "seznam"
    }
}(jQuery), function (t) {
    t.fn.markdown.messages.sv = {
        Bold: "Fet",
        Italic: "Kursiv",
        Heading: "Rubrik",
        "URL/Link": "URL/Länk",
        Image: "Bild",
        List: "Lista",
        Preview: "Förhandsgranska",
        "strong text": "fet text",
        "emphasized text": "överstruken text",
        "heading text": "Rubrik",
        "enter link description here": "Ange länk beskrivning här",
        "Insert Hyperlink": "Sätt in länk",
        "enter image description here": "Ange bild beskrivning här",
        "Insert Image Hyperlink": "Sätt in länk för bild",
        "enter image title here": "Ange bild rubrik här",
        "list text here": "list text"
    }
}(jQuery), function (t) {
    t.fn.markdown.messages.tr = {
        Bold: "Kalın",
        Italic: "İtalik",
        Heading: "Başlık",
        "URL/Link": "Link ekle",
        Image: "Resim ekle",
        List: "Liste Oluşturun",
        Preview: "Önizleme",
        "strong text": "kalın yazı",
        "emphasized text": "italik yazı",
        "heading text": "Başlık Yazısı",
        "enter link description here": "Link açıklamasını buraya girin",
        "Insert Hyperlink": "İnternet adresi girin",
        "enter image description here": "resim açıklamasını buraya ekleyin",
        "Insert Image Hyperlink": "Resim linkini ekleyin",
        "enter image title here": "resim başlığını buraya ekleyin",
        "list text here": "liste yazısı",
        Save: "Kaydet",
        "Ordered List": "Numaralı Liste",
        "Unordered List": "Madde imli liste",
        Quote: "Alıntı",
        "quote here": "alıntıyı buraya ekleyin",
        Code: "Kod",
        "code text here": "kodu buraya ekleyin"
    }
}(jQuery), function (t) {
    t.fn.markdown.messages.zh = {
        Bold: "粗体",
        Italic: "斜体",
        Heading: "标题",
        "URL/Link": "链接",
        Image: "图片",
        List: "列表",
        "Unordered List": "无序列表",
        "Ordered List": "有序列表",
        Code: "代码",
        Quote: "引用",
        Preview: "预览",
        "strong text": "粗体",
        "emphasized text": "强调",
        "heading text": "标题",
        "enter link description here": "输入链接说明",
        "Insert Hyperlink": "URL地址",
        "enter image description here": "输入图片说明",
        "Insert Image Hyperlink": "图片URL地址",
        "enter image title here": "在这里输入图片标题",
        "list text here": "这里是列表文本",
        "code text here": "这里输入代码",
        "quote here": "这里输入引用文本"
    }
}(jQuery), function (t) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], function (e) {
        return t(e, window, document)
    }) : "object" == typeof exports ? module.exports = function (e, n) {
        return e || (e = window), n || (n = "undefined" != typeof window ? require("jquery") : require("jquery")(e)), t(n, e, e.document)
    } : t(jQuery, window, document)
}(function (t, e, n, i) {
    "use strict";

    function r(e) {
        var n, i, o = "a aa ai ao as b fn i m o s ", a = {};
        t.each(e, function (t, s) {
            n = t.match(/^([^A-Z]+?)([A-Z])/), n && o.indexOf(n[1] + " ") !== -1 && (i = t.replace(n[0], n[2].toLowerCase()), a[i] = t, "o" === n[1] && r(e[t]))
        }), e._hungarianMap = a
    }

    function o(e, n, a) {
        e._hungarianMap || r(e);
        var s;
        t.each(n, function (r, d) {
            s = e._hungarianMap[r], s === i || !a && n[s] !== i || ("o" === s.charAt(0) ? (n[s] || (n[s] = {}), t.extend(!0, n[s], n[r]), o(e[s], n[s], a)) : n[s] = n[r])
        })
    }

    function a(t) {
        var e = Gt.defaults.oLanguage, n = t.sZeroRecords;
        !t.sEmptyTable && n && "No data available in table" === e.sEmptyTable && Nt(t, t, "sZeroRecords", "sEmptyTable"), !t.sLoadingRecords && n && "Loading..." === e.sLoadingRecords && Nt(t, t, "sZeroRecords", "sLoadingRecords"), t.sInfoThousands && (t.sThousands = t.sInfoThousands);
        var i = t.sDecimal;
        i && Qt(i)
    }

    function s(t) {
        fe(t, "ordering", "bSort"), fe(t, "orderMulti", "bSortMulti"), fe(t, "orderClasses", "bSortClasses"), fe(t, "orderCellsTop", "bSortCellsTop"), fe(t, "order", "aaSorting"), fe(t, "orderFixed", "aaSortingFixed"), fe(t, "paging", "bPaginate"), fe(t, "pagingType", "sPaginationType"), fe(t, "pageLength", "iDisplayLength"), fe(t, "searching", "bFilter"), "boolean" == typeof t.sScrollX && (t.sScrollX = t.sScrollX ? "100%" : ""), "boolean" == typeof t.scrollX && (t.scrollX = t.scrollX ? "100%" : "");
        var e = t.aoSearchCols;
        if (e) for (var n = 0, i = e.length; n < i; n++) e[n] && o(Gt.models.oSearch, e[n])
    }

    function d(e) {
        fe(e, "orderable", "bSortable"), fe(e, "orderData", "aDataSort"), fe(e, "orderSequence", "asSorting"), fe(e, "orderDataType", "sortDataType");
        var n = e.aDataSort;
        n && !t.isArray(n) && (e.aDataSort = [n])
    }

    function l(e) {
        if (!Gt.__browser) {
            var n = {};
            Gt.__browser = n;
            var i = t("<div/>").css({
                    position: "fixed",
                    top: 0,
                    left: 0,
                    height: 1,
                    width: 1,
                    overflow: "hidden"
                }).append(t("<div/>").css({
                    position: "absolute",
                    top: 1,
                    left: 1,
                    width: 100,
                    overflow: "scroll"
                }).append(t("<div/>").css({width: "100%", height: 10}))).appendTo("body"), r = i.children(),
                o = r.children();
            n.barWidth = r[0].offsetWidth - r[0].clientWidth, n.bScrollOversize = 100 === o[0].offsetWidth && 100 !== r[0].clientWidth, n.bScrollbarLeft = 1 !== Math.round(o.offset().left), n.bBounding = !!i[0].getBoundingClientRect().width, i.remove()
        }
        t.extend(e.oBrowser, Gt.__browser), e.oScroll.iBarWidth = Gt.__browser.barWidth
    }

    function u(t, e, n, r, o, a) {
        var s, d = r, l = !1;
        for (n !== i && (s = n, l = !0); d !== o;) t.hasOwnProperty(d) && (s = l ? e(s, t[d], d, t) : t[d], l = !0, d += a);
        return s
    }

    function c(e, i) {
        var r = Gt.defaults.column, o = e.aoColumns.length, a = t.extend({}, Gt.models.oColumn, r, {
            nTh: i ? i : n.createElement("th"),
            sTitle: r.sTitle ? r.sTitle : i ? i.innerHTML : "",
            aDataSort: r.aDataSort ? r.aDataSort : [o],
            mData: r.mData ? r.mData : o,
            idx: o
        });
        e.aoColumns.push(a);
        var s = e.aoPreSearchCols;
        s[o] = t.extend({}, Gt.models.oSearch, s[o]), h(e, o, t(i).data())
    }

    function h(e, n, r) {
        var a = e.aoColumns[n], s = e.oClasses, l = t(a.nTh);
        if (!a.sWidthOrig) {
            a.sWidthOrig = l.attr("width") || null;
            var u = (l.attr("style") || "").match(/width:\s*(\d+[pxem%]+)/);
            u && (a.sWidthOrig = u[1])
        }
        r !== i && null !== r && (d(r), o(Gt.defaults.column, r), r.mDataProp === i || r.mData || (r.mData = r.mDataProp), r.sType && (a._sManualType = r.sType), r.className && !r.sClass && (r.sClass = r.className), t.extend(a, r), Nt(a, r, "sWidth", "sWidthOrig"), r.iDataSort !== i && (a.aDataSort = [r.iDataSort]), Nt(a, r, "aDataSort"));
        var c = a.mData, h = D(c), p = a.mRender ? D(a.mRender) : null, f = function (t) {
            return "string" == typeof t && t.indexOf("@") !== -1
        };
        a._bAttrSrc = t.isPlainObject(c) && (f(c.sort) || f(c.type) || f(c.filter)), a._setter = null, a.fnGetData = function (t, e, n) {
            var r = h(t, e, i, n);
            return p && e ? p(r, e, t, n) : r
        }, a.fnSetData = function (t, e, n) {
            return _(c)(t, e, n)
        }, "number" != typeof c && (e._rowReadObject = !0), e.oFeatures.bSort || (a.bSortable = !1, l.addClass(s.sSortableNone));
        var g = t.inArray("asc", a.asSorting) !== -1, $ = t.inArray("desc", a.asSorting) !== -1;
        a.bSortable && (g || $) ? g && !$ ? (a.sSortingClass = s.sSortableAsc, a.sSortingClassJUI = s.sSortJUIAscAllowed) : !g && $ ? (a.sSortingClass = s.sSortableDesc, a.sSortingClassJUI = s.sSortJUIDescAllowed) : (a.sSortingClass = s.sSortable, a.sSortingClassJUI = s.sSortJUI) : (a.sSortingClass = s.sSortableNone, a.sSortingClassJUI = "")
    }

    function p(t) {
        if (t.oFeatures.bAutoWidth !== !1) {
            var e = t.aoColumns;
            mt(t);
            for (var n = 0, i = e.length; n < i; n++) e[n].nTh.style.width = e[n].sWidth
        }
        var r = t.oScroll;
        "" === r.sY && "" === r.sX || gt(t), Rt(t, null, "column-sizing", [t])
    }

    function f(t, e) {
        var n = m(t, "bVisible");
        return "number" == typeof n[e] ? n[e] : null
    }

    function g(e, n) {
        var i = m(e, "bVisible"), r = t.inArray(n, i);
        return r !== -1 ? r : null
    }

    function $(e) {
        var n = 0;
        return t.each(e.aoColumns, function (e, i) {
            i.bVisible && "none" !== t(i.nTh).css("display") && n++
        }), n
    }

    function m(e, n) {
        var i = [];
        return t.map(e.aoColumns, function (t, e) {
            t[n] && i.push(e)
        }), i
    }

    function v(t) {
        var e, n, r, o, a, s, d, l, u, c = t.aoColumns, h = t.aoData, p = Gt.ext.type.detect;
        for (e = 0, n = c.length; e < n; e++) if (d = c[e], u = [], !d.sType && d._sManualType) d.sType = d._sManualType; else if (!d.sType) {
            for (r = 0, o = p.length; r < o; r++) {
                for (a = 0, s = h.length; a < s && (u[a] === i && (u[a] = S(t, a, e, "type")), l = p[r](u[a], t), l || r === p.length - 1) && "html" !== l; a++) ;
                if (l) {
                    d.sType = l;
                    break
                }
            }
            d.sType || (d.sType = "string")
        }
    }

    function y(e, n, r, o) {
        var a, s, d, l, u, h, p, f = e.aoColumns;
        if (n) for (a = n.length - 1; a >= 0; a--) {
            p = n[a];
            var g = p.targets !== i ? p.targets : p.aTargets;
            for (t.isArray(g) || (g = [g]), d = 0, l = g.length; d < l; d++) if ("number" == typeof g[d] && g[d] >= 0) {
                for (; f.length <= g[d];) c(e);
                o(g[d], p)
            } else if ("number" == typeof g[d] && g[d] < 0) o(f.length + g[d], p); else if ("string" == typeof g[d]) for (u = 0, h = f.length; u < h; u++) ("_all" == g[d] || t(f[u].nTh).hasClass(g[d])) && o(u, p)
        }
        if (r) for (a = 0, s = r.length; a < s; a++) o(a, r[a])
    }

    function b(e, n, r, o) {
        var a = e.aoData.length, s = t.extend(!0, {}, Gt.models.oRow, {src: r ? "dom" : "data", idx: a});
        s._aData = n, e.aoData.push(s);
        for (var d = e.aoColumns, l = 0, u = d.length; l < u; l++) d[l].sType = null;
        e.aiDisplayMaster.push(a);
        var c = e.rowIdFn(n);
        return c !== i && (e.aIds[c] = s), !r && e.oFeatures.bDeferRender || E(e, a, r, o), a
    }

    function C(e, n) {
        var i;
        return n instanceof t || (n = t(n)), n.map(function (t, n) {
            return i = N(e, n), b(e, i.data, n, i.cells)
        })
    }

    function w(t, e) {
        return e._DT_RowIndex !== i ? e._DT_RowIndex : null
    }

    function x(e, n, i) {
        return t.inArray(i, e.aoData[n].anCells)
    }

    function S(t, e, n, r) {
        var o = t.iDraw, a = t.aoColumns[n], s = t.aoData[e]._aData, d = a.sDefaultContent,
            l = a.fnGetData(s, r, {settings: t, row: e, col: n});
        if (l === i) return t.iDrawError != o && null === d && (Lt(t, 0, "Requested unknown parameter " + ("function" == typeof a.mData ? "{function}" : "'" + a.mData + "'") + " for row " + e + ", column " + n, 4), t.iDrawError = o), d;
        if (l !== s && null !== l || null === d || r === i) {
            if ("function" == typeof l) return l.call(s)
        } else l = d;
        return null === l && "display" == r ? "" : l
    }

    function T(t, e, n, i) {
        var r = t.aoColumns[n], o = t.aoData[e]._aData;
        r.fnSetData(o, i, {settings: t, row: e, col: n})
    }

    function k(e) {
        return t.map(e.match(/(\\.|[^\.])+/g) || [""], function (t) {
            return t.replace(/\\./g, ".")
        })
    }

    function D(e) {
        if (t.isPlainObject(e)) {
            var n = {};
            return t.each(e, function (t, e) {
                e && (n[t] = D(e))
            }), function (t, e, r, o) {
                var a = n[e] || n._;
                return a !== i ? a(t, e, r, o) : t
            }
        }
        if (null === e) return function (t) {
            return t
        };
        if ("function" == typeof e) return function (t, n, i, r) {
            return e(t, n, i, r)
        };
        if ("string" != typeof e || e.indexOf(".") === -1 && e.indexOf("[") === -1 && e.indexOf("(") === -1) return function (t, n) {
            return t[e]
        };
        var r = function (e, n, o) {
            var a, s, d, l;
            if ("" !== o) for (var u = k(o), c = 0, h = u.length; c < h; c++) {
                if (a = u[c].match(ge), s = u[c].match($e), a) {
                    if (u[c] = u[c].replace(ge, ""), "" !== u[c] && (e = e[u[c]]), d = [], u.splice(0, c + 1), l = u.join("."), t.isArray(e)) for (var p = 0, f = e.length; p < f; p++) d.push(r(e[p], n, l));
                    var g = a[0].substring(1, a[0].length - 1);
                    e = "" === g ? d : d.join(g);
                    break
                }
                if (s) u[c] = u[c].replace($e, ""), e = e[u[c]](); else {
                    if (null === e || e[u[c]] === i) return i;
                    e = e[u[c]]
                }
            }
            return e
        };
        return function (t, n) {
            return r(t, n, e)
        }
    }

    function _(e) {
        if (t.isPlainObject(e)) return _(e._);
        if (null === e) return function () {
        };
        if ("function" == typeof e) return function (t, n, i) {
            e(t, "set", n, i)
        };
        if ("string" != typeof e || e.indexOf(".") === -1 && e.indexOf("[") === -1 && e.indexOf("(") === -1) return function (t, n) {
            t[e] = n
        };
        var n = function (e, r, o) {
            for (var a, s, d, l, u, c = k(o), h = c[c.length - 1], p = 0, f = c.length - 1; p < f; p++) {
                if (s = c[p].match(ge), d = c[p].match($e), s) {
                    if (c[p] = c[p].replace(ge, ""), e[c[p]] = [], a = c.slice(), a.splice(0, p + 1), u = a.join("."), t.isArray(r)) for (var g = 0, $ = r.length; g < $; g++) l = {}, n(l, r[g], u), e[c[p]].push(l); else e[c[p]] = r;
                    return
                }
                d && (c[p] = c[p].replace($e, ""), e = e[c[p]](r)), null !== e[c[p]] && e[c[p]] !== i || (e[c[p]] = {}), e = e[c[p]]
            }
            h.match($e) ? e = e[h.replace($e, "")](r) : e[h.replace(ge, "")] = r
        };
        return function (t, i) {
            return n(t, i, e)
        }
    }

    function I(t) {
        return de(t.aoData, "_aData")
    }

    function A(t) {
        t.aoData.length = 0, t.aiDisplayMaster.length = 0, t.aiDisplay.length = 0, t.aIds = {}
    }

    function j(t, e, n) {
        for (var r = -1, o = 0, a = t.length; o < a; o++) t[o] == e ? r = o : t[o] > e && t[o]--;
        r != -1 && n === i && t.splice(r, 1)
    }

    function L(t, e, n, r) {
        var o, a, s = t.aoData[e], d = function (n, i) {
            for (; n.childNodes.length;) n.removeChild(n.firstChild);
            n.innerHTML = S(t, e, i, "display")
        };
        if ("dom" !== n && (n && "auto" !== n || "dom" !== s.src)) {
            var l = s.anCells;
            if (l) if (r !== i) d(l[r], r); else for (o = 0, a = l.length; o < a; o++) d(l[o], o)
        } else s._aData = N(t, s, r, r === i ? i : s._aData).data;
        s._aSortData = null, s._aFilterData = null;
        var u = t.aoColumns;
        if (r !== i) u[r].sType = null; else {
            for (o = 0, a = u.length; o < a; o++) u[o].sType = null;
            P(t, s)
        }
    }

    function N(e, n, r, o) {
        var a, s, d, l = [], u = n.firstChild, c = 0, h = e.aoColumns, p = e._rowReadObject;
        o = o !== i ? o : p ? {} : [];
        var f = function (t, e) {
            if ("string" == typeof t) {
                var n = t.indexOf("@");
                if (n !== -1) {
                    var i = t.substring(n + 1), r = _(t);
                    r(o, e.getAttribute(i))
                }
            }
        }, g = function (e) {
            if (r === i || r === c) if (s = h[c], d = t.trim(e.innerHTML), s && s._bAttrSrc) {
                var n = _(s.mData._);
                n(o, d), f(s.mData.sort, e), f(s.mData.type, e), f(s.mData.filter, e)
            } else p ? (s._setter || (s._setter = _(s.mData)), s._setter(o, d)) : o[c] = d;
            c++
        };
        if (u) for (; u;) a = u.nodeName.toUpperCase(), "TD" != a && "TH" != a || (g(u), l.push(u)), u = u.nextSibling; else {
            l = n.anCells;
            for (var $ = 0, m = l.length; $ < m; $++) g(l[$])
        }
        var v = n.firstChild ? n : n.nTr;
        if (v) {
            var y = v.getAttribute("id");
            y && _(e.rowId)(o, y)
        }
        return {data: o, cells: l}
    }

    function E(e, i, r, o) {
        var a, s, d, l, u, c = e.aoData[i], h = c._aData, p = [];
        if (null === c.nTr) {
            for (a = r || n.createElement("tr"), c.nTr = a, c.anCells = p, a._DT_RowIndex = i, P(e, c), l = 0, u = e.aoColumns.length; l < u; l++) d = e.aoColumns[l], s = r ? o[l] : n.createElement(d.sCellType), s._DT_CellIndex = {
                row: i,
                column: l
            }, p.push(s), r && !d.mRender && d.mData === l || t.isPlainObject(d.mData) && d.mData._ === l + ".display" || (s.innerHTML = S(e, i, l, "display")), d.sClass && (s.className += " " + d.sClass), d.bVisible && !r ? a.appendChild(s) : !d.bVisible && r && s.parentNode.removeChild(s), d.fnCreatedCell && d.fnCreatedCell.call(e.oInstance, s, S(e, i, l), h, i, l);
            Rt(e, "aoRowCreatedCallback", null, [a, h, i])
        }
        c.nTr.setAttribute("role", "row")
    }

    function P(e, n) {
        var i = n.nTr, r = n._aData;
        if (i) {
            var o = e.rowIdFn(r);
            if (o && (i.id = o), r.DT_RowClass) {
                var a = r.DT_RowClass.split(" ");
                n.__rowc = n.__rowc ? pe(n.__rowc.concat(a)) : a, t(i).removeClass(n.__rowc.join(" ")).addClass(r.DT_RowClass)
            }
            r.DT_RowAttr && t(i).attr(r.DT_RowAttr), r.DT_RowData && t(i).data(r.DT_RowData)
        }
    }

    function M(e) {
        var n, i, r, o, a, s = e.nTHead, d = e.nTFoot, l = 0 === t("th, td", s).length, u = e.oClasses, c = e.aoColumns;
        for (l && (o = t("<tr/>").appendTo(s)), n = 0, i = c.length; n < i; n++) a = c[n], r = t(a.nTh).addClass(a.sClass), l && r.appendTo(o), e.oFeatures.bSort && (r.addClass(a.sSortingClass), a.bSortable !== !1 && (r.attr("tabindex", e.iTabIndex).attr("aria-controls", e.sTableId), kt(e, a.nTh, n))), a.sTitle != r[0].innerHTML && r.html(a.sTitle), Ht(e, "header")(e, r, a, u);
        if (l && B(e.aoHeader, s), t(s).find(">tr").attr("role", "row"), t(s).find(">tr>th, >tr>td").addClass(u.sHeaderTH), t(d).find(">tr>th, >tr>td").addClass(u.sFooterTH), null !== d) {
            var h = e.aoFooter[0];
            for (n = 0, i = h.length; n < i; n++) a = c[n], a.nTf = h[n].cell, a.sClass && t(a.nTf).addClass(a.sClass)
        }
    }

    function R(e, n, r) {
        var o, a, s, d, l, u, c, h, p, f = [], g = [], $ = e.aoColumns.length;
        if (n) {
            for (r === i && (r = !1), o = 0, a = n.length; o < a; o++) {
                for (f[o] = n[o].slice(), f[o].nTr = n[o].nTr, s = $ - 1; s >= 0; s--) e.aoColumns[s].bVisible || r || f[o].splice(s, 1);
                g.push([])
            }
            for (o = 0, a = f.length; o < a; o++) {
                if (c = f[o].nTr) for (; u = c.firstChild;) c.removeChild(u);
                for (s = 0, d = f[o].length; s < d; s++) if (h = 1, p = 1, g[o][s] === i) {
                    for (c.appendChild(f[o][s].cell), g[o][s] = 1; f[o + h] !== i && f[o][s].cell == f[o + h][s].cell;) g[o + h][s] = 1, h++;
                    for (; f[o][s + p] !== i && f[o][s].cell == f[o][s + p].cell;) {
                        for (l = 0; l < h; l++) g[o + l][s + p] = 1;
                        p++
                    }
                    t(f[o][s].cell).attr("rowspan", h).attr("colspan", p)
                }
            }
        }
    }

    function O(e) {
        var n = Rt(e, "aoPreDrawCallback", "preDraw", [e]);
        if (t.inArray(!1, n) !== -1) return void pt(e, !1);
        var r = [], o = 0, a = e.asStripeClasses, s = a.length, d = (e.aoOpenRows.length, e.oLanguage),
            l = e.iInitDisplayStart, u = "ssp" == Ft(e), c = e.aiDisplay;
        e.bDrawing = !0, l !== i && l !== -1 && (e._iDisplayStart = u ? l : l >= e.fnRecordsDisplay() ? 0 : l, e.iInitDisplayStart = -1);
        var h = e._iDisplayStart, p = e.fnDisplayEnd();
        if (e.bDeferLoading) e.bDeferLoading = !1, e.iDraw++, pt(e, !1); else if (u) {
            if (!e.bDestroying && !W(e)) return
        } else e.iDraw++;
        if (0 !== c.length) for (var f = u ? 0 : h, g = u ? e.aoData.length : p, m = f; m < g; m++) {
            var v = c[m], y = e.aoData[v];
            null === y.nTr && E(e, v);
            var b = y.nTr;
            if (0 !== s) {
                var C = a[o % s];
                y._sRowStripe != C && (t(b).removeClass(y._sRowStripe).addClass(C), y._sRowStripe = C)
            }
            Rt(e, "aoRowCallback", null, [b, y._aData, o, m]), r.push(b), o++
        } else {
            var w = d.sZeroRecords;
            1 == e.iDraw && "ajax" == Ft(e) ? w = d.sLoadingRecords : d.sEmptyTable && 0 === e.fnRecordsTotal() && (w = d.sEmptyTable), r[0] = t("<tr/>", {class: s ? a[0] : ""}).append(t("<td />", {
                valign: "top",
                colSpan: $(e),
                class: e.oClasses.sRowEmpty
            }).html(w))[0]
        }
        Rt(e, "aoHeaderCallback", "header", [t(e.nTHead).children("tr")[0], I(e), h, p, c]), Rt(e, "aoFooterCallback", "footer", [t(e.nTFoot).children("tr")[0], I(e), h, p, c]);
        var x = t(e.nTBody);
        x.children().detach(), x.append(t(r)), Rt(e, "aoDrawCallback", "draw", [e]), e.bSorted = !1, e.bFiltered = !1, e.bDrawing = !1
    }

    function H(t, e) {
        var n = t.oFeatures, i = n.bSort, r = n.bFilter;
        i && xt(t), r ? K(t, t.oPreviousSearch) : t.aiDisplay = t.aiDisplayMaster.slice(), e !== !0 && (t._iDisplayStart = 0), t._drawHold = e, O(t), t._drawHold = !1
    }

    function F(e) {
        var n = e.oClasses, i = t(e.nTable), r = t("<div/>").insertBefore(i), o = e.oFeatures,
            a = t("<div/>", {id: e.sTableId + "_wrapper", class: n.sWrapper + (e.nTFoot ? "" : " " + n.sNoFooter)});
        e.nHolding = r[0], e.nTableWrapper = a[0], e.nTableReinsertBefore = e.nTable.nextSibling;
        for (var s, d, l, u, c, h, p = e.sDom.split(""), f = 0; f < p.length; f++) {
            if (s = null, d = p[f], "<" == d) {
                if (l = t("<div/>")[0], u = p[f + 1], "'" == u || '"' == u) {
                    for (c = "", h = 2; p[f + h] != u;) c += p[f + h], h++;
                    if ("H" == c ? c = n.sJUIHeader : "F" == c && (c = n.sJUIFooter), c.indexOf(".") != -1) {
                        var g = c.split(".");
                        l.id = g[0].substr(1, g[0].length - 1), l.className = g[1]
                    } else "#" == c.charAt(0) ? l.id = c.substr(1, c.length - 1) : l.className = c;
                    f += h
                }
                a.append(l), a = t(l)
            } else if (">" == d) a = a.parent(); else if ("l" == d && o.bPaginate && o.bLengthChange) s = lt(e); else if ("f" == d && o.bFilter) s = G(e); else if ("r" == d && o.bProcessing) s = ht(e); else if ("t" == d) s = ft(e); else if ("i" == d && o.bInfo) s = it(e); else if ("p" == d && o.bPaginate) s = ut(e); else if (0 !== Gt.ext.feature.length) for (var $ = Gt.ext.feature, m = 0, v = $.length; m < v; m++) if (d == $[m].cFeature) {
                s = $[m].fnInit(e);
                break
            }
            if (s) {
                var y = e.aanFeatures;
                y[d] || (y[d] = []), y[d].push(s), a.append(s)
            }
        }
        r.replaceWith(a), e.nHolding = null
    }

    function B(e, n) {
        var i, r, o, a, s, d, l, u, c, h, p, f = t(n).children("tr"), g = function (t, e, n) {
            for (var i = t[e]; i[n];) n++;
            return n
        };
        for (e.splice(0, e.length), o = 0, d = f.length; o < d; o++) e.push([]);
        for (o = 0, d = f.length; o < d; o++) for (i = f[o], u = 0, r = i.firstChild; r;) {
            if ("TD" == r.nodeName.toUpperCase() || "TH" == r.nodeName.toUpperCase()) for (c = 1 * r.getAttribute("colspan"), h = 1 * r.getAttribute("rowspan"), c = c && 0 !== c && 1 !== c ? c : 1, h = h && 0 !== h && 1 !== h ? h : 1, l = g(e, o, u), p = 1 === c, s = 0; s < c; s++) for (a = 0; a < h; a++) e[o + a][l + s] = {
                cell: r,
                unique: p
            }, e[o + a].nTr = i;
            r = r.nextSibling
        }
    }

    function Q(t, e, n) {
        var i = [];
        n || (n = t.aoHeader, e && (n = [], B(n, e)));
        for (var r = 0, o = n.length; r < o; r++) for (var a = 0, s = n[r].length; a < s; a++) !n[r][a].unique || i[a] && t.bSortCellsTop || (i[a] = n[r][a].cell);
        return i
    }

    function U(e, n, i) {
        if (Rt(e, "aoServerParams", "serverParams", [n]), n && t.isArray(n)) {
            var r = {}, o = /(.*?)\[\]$/;
            t.each(n, function (t, e) {
                var n = e.name.match(o);
                if (n) {
                    var i = n[0];
                    r[i] || (r[i] = []), r[i].push(e.value)
                } else r[e.name] = e.value
            }), n = r
        }
        var a, s = e.ajax, d = e.oInstance, l = function (t) {
            Rt(e, null, "xhr", [e, t, e.jqXHR]), i(t)
        };
        if (t.isPlainObject(s) && s.data) {
            a = s.data;
            var u = t.isFunction(a) ? a(n, e) : a;
            n = t.isFunction(a) && u ? u : t.extend(!0, n, u), delete s.data
        }
        var c = {
            data: n, success: function (t) {
                var n = t.error || t.sError;
                n && Lt(e, 0, n), e.json = t, l(t)
            }, dataType: "json", cache: !1, type: e.sServerMethod, error: function (n, i, r) {
                var o = Rt(e, null, "xhr", [e, null, e.jqXHR]);
                t.inArray(!0, o) === -1 && ("parsererror" == i ? Lt(e, 0, "Invalid JSON response", 1) : 4 === n.readyState && Lt(e, 0, "Ajax error", 7)), pt(e, !1)
            }
        };
        e.oAjaxData = n, Rt(e, null, "preXhr", [e, n]), e.fnServerData ? e.fnServerData.call(d, e.sAjaxSource, t.map(n, function (t, e) {
            return {name: e, value: t}
        }), l, e) : e.sAjaxSource || "string" == typeof s ? e.jqXHR = t.ajax(t.extend(c, {url: s || e.sAjaxSource})) : t.isFunction(s) ? e.jqXHR = s.call(d, n, l, e) : (e.jqXHR = t.ajax(t.extend(c, s)), s.data = a)
    }

    function W(t) {
        return !t.bAjaxDataGet || (t.iDraw++, pt(t, !0), U(t, z(t), function (e) {
            q(t, e)
        }), !1)
    }

    function z(e) {
        var n, i, r, o, a = e.aoColumns, s = a.length, d = e.oFeatures, l = e.oPreviousSearch, u = e.aoPreSearchCols,
            c = [], h = wt(e), p = e._iDisplayStart, f = d.bPaginate !== !1 ? e._iDisplayLength : -1,
            g = function (t, e) {
                c.push({name: t, value: e})
            };
        g("sEcho", e.iDraw), g("iColumns", s), g("sColumns", de(a, "sName").join(",")), g("iDisplayStart", p), g("iDisplayLength", f);
        var $ = {
            draw: e.iDraw,
            columns: [],
            order: [],
            start: p,
            length: f,
            search: {value: l.sSearch, regex: l.bRegex}
        };
        for (n = 0; n < s; n++) r = a[n], o = u[n], i = "function" == typeof r.mData ? "function" : r.mData, $.columns.push({
            data: i,
            name: r.sName,
            searchable: r.bSearchable,
            orderable: r.bSortable,
            search: {value: o.sSearch, regex: o.bRegex}
        }), g("mDataProp_" + n, i), d.bFilter && (g("sSearch_" + n, o.sSearch), g("bRegex_" + n, o.bRegex), g("bSearchable_" + n, r.bSearchable)), d.bSort && g("bSortable_" + n, r.bSortable);
        d.bFilter && (g("sSearch", l.sSearch), g("bRegex", l.bRegex)), d.bSort && (t.each(h, function (t, e) {
            $.order.push({column: e.col, dir: e.dir}), g("iSortCol_" + t, e.col), g("sSortDir_" + t, e.dir)
        }), g("iSortingCols", h.length));
        var m = Gt.ext.legacy.ajax;
        return null === m ? e.sAjaxSource ? c : $ : m ? c : $
    }

    function q(t, e) {
        var n = function (t, n) {
                return e[t] !== i ? e[t] : e[n]
            }, r = V(t, e), o = n("sEcho", "draw"), a = n("iTotalRecords", "recordsTotal"),
            s = n("iTotalDisplayRecords", "recordsFiltered");
        if (o) {
            if (1 * o < t.iDraw) return;
            t.iDraw = 1 * o
        }
        A(t), t._iRecordsTotal = parseInt(a, 10), t._iRecordsDisplay = parseInt(s, 10);
        for (var d = 0, l = r.length; d < l; d++) b(t, r[d]);
        t.aiDisplay = t.aiDisplayMaster.slice(), t.bAjaxDataGet = !1, O(t), t._bInitComplete || st(t, e), t.bAjaxDataGet = !0, pt(t, !1)
    }

    function V(e, n) {
        var r = t.isPlainObject(e.ajax) && e.ajax.dataSrc !== i ? e.ajax.dataSrc : e.sAjaxDataProp;
        return "data" === r ? n.aaData || n[r] : "" !== r ? D(r)(n) : n
    }

    function G(e) {
        var i = e.oClasses, r = e.sTableId, o = e.oLanguage, a = e.oPreviousSearch, s = e.aanFeatures,
            d = '<input type="search" class="' + i.sFilterInput + '"/>', l = o.sSearch;
        l = l.match(/_INPUT_/) ? l.replace("_INPUT_", d) : l + d;
        var u = t("<div/>", {id: s.f ? null : r + "_filter", class: i.sFilter}).append(t("<label/>").append(l)),
            c = function () {
                var t = (s.f, this.value ? this.value : "");
                t != a.sSearch && (K(e, {
                    sSearch: t,
                    bRegex: a.bRegex,
                    bSmart: a.bSmart,
                    bCaseInsensitive: a.bCaseInsensitive
                }), e._iDisplayStart = 0, O(e))
            }, h = null !== e.searchDelay ? e.searchDelay : "ssp" === Ft(e) ? 400 : 0,
            p = t("input", u).val(a.sSearch).attr("placeholder", o.sSearchPlaceholder).bind("keyup.DT search.DT input.DT paste.DT cut.DT", h ? Ce(c, h) : c).bind("keypress.DT", function (t) {
                if (13 == t.keyCode) return !1
            }).attr("aria-controls", r);
        return t(e.nTable).on("search.dt.DT", function (t, i) {
            if (e === i) try {
                p[0] !== n.activeElement && p.val(a.sSearch)
            } catch (t) {
            }
        }), u[0]
    }

    function K(t, e, n) {
        var r = t.oPreviousSearch, o = t.aoPreSearchCols, a = function (t) {
            r.sSearch = t.sSearch, r.bRegex = t.bRegex, r.bSmart = t.bSmart, r.bCaseInsensitive = t.bCaseInsensitive
        }, s = function (t) {
            return t.bEscapeRegex !== i ? !t.bEscapeRegex : t.bRegex
        };
        if (v(t), "ssp" != Ft(t)) {
            Y(t, e.sSearch, n, s(e), e.bSmart, e.bCaseInsensitive), a(e);
            for (var d = 0; d < o.length; d++) X(t, o[d].sSearch, d, s(o[d]), o[d].bSmart, o[d].bCaseInsensitive);
            J(t)
        } else a(e);
        t.bFiltered = !0, Rt(t, null, "search", [t])
    }

    function J(e) {
        for (var n, i, r = Gt.ext.search, o = e.aiDisplay, a = 0, s = r.length; a < s; a++) {
            for (var d = [], l = 0, u = o.length; l < u; l++) i = o[l], n = e.aoData[i], r[a](e, n._aFilterData, i, n._aData, l) && d.push(i);
            o.length = 0, t.merge(o, d)
        }
    }

    function X(t, e, n, i, r, o) {
        if ("" !== e) for (var a, s = t.aiDisplay, d = Z(e, i, r, o), l = s.length - 1; l >= 0; l--) a = t.aoData[s[l]]._aFilterData[n], d.test(a) || s.splice(l, 1)
    }

    function Y(t, e, n, i, r, o) {
        var a, s, d, l = Z(e, i, r, o), u = t.oPreviousSearch.sSearch, c = t.aiDisplayMaster;
        if (0 !== Gt.ext.search.length && (n = !0), s = tt(t), e.length <= 0) t.aiDisplay = c.slice(); else for ((s || n || u.length > e.length || 0 !== e.indexOf(u) || t.bSorted) && (t.aiDisplay = c.slice()), a = t.aiDisplay, d = a.length - 1; d >= 0; d--) l.test(t.aoData[a[d]]._sFilterRow) || a.splice(d, 1)
    }

    function Z(e, n, i, r) {
        if (e = n ? e : me(e), i) {
            var o = t.map(e.match(/"[^"]+"|[^ ]+/g) || [""], function (t) {
                if ('"' === t.charAt(0)) {
                    var e = t.match(/^"(.*)"$/);
                    t = e ? e[1] : t
                }
                return t.replace('"', "")
            });
            e = "^(?=.*?" + o.join(")(?=.*?") + ").*$"
        }
        return new RegExp(e, r ? "i" : "")
    }

    function tt(t) {
        var e, n, i, r, o, a, s, d, l = t.aoColumns, u = Gt.ext.type.search, c = !1;
        for (n = 0, r = t.aoData.length; n < r; n++) if (d = t.aoData[n], !d._aFilterData) {
            for (a = [], i = 0, o = l.length; i < o; i++) e = l[i], e.bSearchable ? (s = S(t, n, i, "filter"), u[e.sType] && (s = u[e.sType](s)), null === s && (s = ""), "string" != typeof s && s.toString && (s = s.toString())) : s = "", s.indexOf && s.indexOf("&") !== -1 && (ve.innerHTML = s, s = ye ? ve.textContent : ve.innerText), s.replace && (s = s.replace(/[\r\n]/g, "")), a.push(s);
            d._aFilterData = a, d._sFilterRow = a.join("  "), c = !0
        }
        return c
    }

    function et(t) {
        return {search: t.sSearch, smart: t.bSmart, regex: t.bRegex, caseInsensitive: t.bCaseInsensitive}
    }

    function nt(t) {
        return {sSearch: t.search, bSmart: t.smart, bRegex: t.regex, bCaseInsensitive: t.caseInsensitive}
    }

    function it(e) {
        var n = e.sTableId, i = e.aanFeatures.i, r = t("<div/>", {class: e.oClasses.sInfo, id: i ? null : n + "_info"});
        return i || (e.aoDrawCallback.push({
            fn: rt,
            sName: "information"
        }), r.attr("role", "status").attr("aria-live", "polite"), t(e.nTable).attr("aria-describedby", n + "_info")), r[0]
    }

    function rt(e) {
        var n = e.aanFeatures.i;
        if (0 !== n.length) {
            var i = e.oLanguage, r = e._iDisplayStart + 1, o = e.fnDisplayEnd(), a = e.fnRecordsTotal(),
                s = e.fnRecordsDisplay(), d = s ? i.sInfo : i.sInfoEmpty;
            s !== a && (d += " " + i.sInfoFiltered), d += i.sInfoPostFix, d = ot(e, d);
            var l = i.fnInfoCallback;
            null !== l && (d = l.call(e.oInstance, e, r, o, a, s, d)), t(n).html(d)
        }
    }

    function ot(t, e) {
        var n = t.fnFormatNumber, i = t._iDisplayStart + 1, r = t._iDisplayLength, o = t.fnRecordsDisplay(),
            a = r === -1;
        return e.replace(/_START_/g, n.call(t, i)).replace(/_END_/g, n.call(t, t.fnDisplayEnd())).replace(/_MAX_/g, n.call(t, t.fnRecordsTotal())).replace(/_TOTAL_/g, n.call(t, o)).replace(/_PAGE_/g, n.call(t, a ? 1 : Math.ceil(i / r))).replace(/_PAGES_/g, n.call(t, a ? 1 : Math.ceil(o / r)))
    }

    function at(t) {
        var e, n, i, r = t.iInitDisplayStart, o = t.aoColumns, a = t.oFeatures, s = t.bDeferLoading;
        if (!t.bInitialised) return void setTimeout(function () {
            at(t)
        }, 200);
        for (F(t), M(t), R(t, t.aoHeader), R(t, t.aoFooter), pt(t, !0), a.bAutoWidth && mt(t), e = 0, n = o.length; e < n; e++) i = o[e], i.sWidth && (i.nTh.style.width = Ct(i.sWidth));
        Rt(t, null, "preInit", [t]), H(t);
        var d = Ft(t);
        ("ssp" != d || s) && ("ajax" == d ? U(t, [], function (n) {
            var i = V(t, n);
            for (e = 0; e < i.length; e++) b(t, i[e]);
            t.iInitDisplayStart = r, H(t), pt(t, !1), st(t, n)
        }, t) : (pt(t, !1), st(t)))
    }

    function st(t, e) {
        t._bInitComplete = !0, (e || t.oInit.aaData) && p(t), Rt(t, null, "plugin-init", [t, e]), Rt(t, "aoInitComplete", "init", [t, e])
    }

    function dt(t, e) {
        var n = parseInt(e, 10);
        t._iDisplayLength = n, Ot(t), Rt(t, null, "length", [t, n])
    }

    function lt(e) {
        for (var n = e.oClasses, i = e.sTableId, r = e.aLengthMenu, o = t.isArray(r[0]), a = o ? r[0] : r, s = o ? r[1] : r, d = t("<select/>", {
            name: i + "_length",
            "aria-controls": i,
            class: n.sLengthSelect
        }), l = 0, u = a.length; l < u; l++) d[0][l] = new Option(s[l], a[l]);
        var c = t("<div><label/></div>").addClass(n.sLength);
        return e.aanFeatures.l || (c[0].id = i + "_length"), c.children().append(e.oLanguage.sLengthMenu.replace("_MENU_", d[0].outerHTML)), t("select", c).val(e._iDisplayLength).bind("change.DT", function (n) {
            dt(e, t(this).val()), O(e)
        }), t(e.nTable).bind("length.dt.DT", function (n, i, r) {
            e === i && t("select", c).val(r)
        }), c[0]
    }

    function ut(e) {
        var n = e.sPaginationType, i = Gt.ext.pager[n], r = "function" == typeof i, o = function (t) {
            O(t)
        }, a = t("<div/>").addClass(e.oClasses.sPaging + n)[0], s = e.aanFeatures;
        return r || i.fnInit(e, a, o), s.p || (a.id = e.sTableId + "_paginate", e.aoDrawCallback.push({
            fn: function (t) {
                if (r) {
                    var e, n, a = t._iDisplayStart, d = t._iDisplayLength, l = t.fnRecordsDisplay(), u = d === -1,
                        c = u ? 0 : Math.ceil(a / d), h = u ? 1 : Math.ceil(l / d), p = i(c, h);
                    for (e = 0, n = s.p.length; e < n; e++) Ht(t, "pageButton")(t, s.p[e], e, p, c, h)
                } else i.fnUpdate(t, o)
            }, sName: "pagination"
        })), a
    }

    function ct(t, e, n) {
        var i = t._iDisplayStart, r = t._iDisplayLength, o = t.fnRecordsDisplay();
        0 === o || r === -1 ? i = 0 : "number" == typeof e ? (i = e * r, i > o && (i = 0)) : "first" == e ? i = 0 : "previous" == e ? (i = r >= 0 ? i - r : 0, i < 0 && (i = 0)) : "next" == e ? i + r < o && (i += r) : "last" == e ? i = Math.floor((o - 1) / r) * r : Lt(t, 0, "Unknown paging action: " + e, 5);
        var a = t._iDisplayStart !== i;
        return t._iDisplayStart = i, a && (Rt(t, null, "page", [t]), n && O(t)), a
    }

    function ht(e) {
        return t("<div/>", {
            id: e.aanFeatures.r ? null : e.sTableId + "_processing",
            class: e.oClasses.sProcessing
        }).html(e.oLanguage.sProcessing).insertBefore(e.nTable)[0]
    }

    function pt(e, n) {
        e.oFeatures.bProcessing && t(e.aanFeatures.r).css("display", n ? "block" : "none"), Rt(e, null, "processing", [e, n])
    }

    function ft(e) {
        var n = t(e.nTable);
        n.attr("role", "grid");
        var i = e.oScroll;
        if ("" === i.sX && "" === i.sY) return e.nTable;
        var r = i.sX, o = i.sY, a = e.oClasses, s = n.children("caption"), d = s.length ? s[0]._captionSide : null,
            l = t(n[0].cloneNode(!1)), u = t(n[0].cloneNode(!1)), c = n.children("tfoot"), h = "<div/>",
            p = function (t) {
                return t ? Ct(t) : null
            };
        c.length || (c = null);
        var f = t(h, {class: a.sScrollWrapper}).append(t(h, {class: a.sScrollHead}).css({
            overflow: "hidden",
            position: "relative",
            border: 0,
            width: r ? p(r) : "100%"
        }).append(t(h, {class: a.sScrollHeadInner}).css({
            "box-sizing": "content-box",
            width: i.sXInner || "100%"
        }).append(l.removeAttr("id").css("margin-left", 0).append("top" === d ? s : null).append(n.children("thead"))))).append(t(h, {class: a.sScrollBody}).css({
            position: "relative",
            overflow: "auto",
            width: p(r)
        }).append(n));
        c && f.append(t(h, {class: a.sScrollFoot}).css({
            overflow: "hidden",
            border: 0,
            width: r ? p(r) : "100%"
        }).append(t(h, {class: a.sScrollFootInner}).append(u.removeAttr("id").css("margin-left", 0).append("bottom" === d ? s : null).append(n.children("tfoot")))));
        var g = f.children(), $ = g[0], m = g[1], v = c ? g[2] : null;
        return r && t(m).on("scroll.DT", function (t) {
            var e = this.scrollLeft;
            $.scrollLeft = e, c && (v.scrollLeft = e)
        }), t(m).css(o && i.bCollapse ? "max-height" : "height", o), e.nScrollHead = $, e.nScrollBody = m, e.nScrollFoot = v, e.aoDrawCallback.push({
            fn: gt,
            sName: "scrolling"
        }), f[0]
    }

    function gt(e) {
        var n, r, o, a, s, d, l, u, c, h = e.oScroll, g = h.sX, $ = h.sXInner, m = h.sY, v = h.iBarWidth,
            y = t(e.nScrollHead), b = y[0].style, C = y.children("div"), w = C[0].style, x = C.children("table"),
            S = e.nScrollBody, T = t(S), k = S.style, D = t(e.nScrollFoot), _ = D.children("div"),
            I = _.children("table"), A = t(e.nTHead), j = t(e.nTable), L = j[0], N = L.style,
            E = e.nTFoot ? t(e.nTFoot) : null, P = e.oBrowser, M = P.bScrollOversize, R = de(e.aoColumns, "nTh"),
            O = [], H = [], F = [], B = [], U = function (t) {
                var e = t.style;
                e.paddingTop = "0", e.paddingBottom = "0", e.borderTopWidth = "0", e.borderBottomWidth = "0", e.height = 0
            }, W = S.scrollHeight > S.clientHeight;
        if (e.scrollBarVis !== W && e.scrollBarVis !== i) return e.scrollBarVis = W, void p(e);
        e.scrollBarVis = W, j.children("thead, tfoot").remove(), E && (d = E.clone().prependTo(j), r = E.find("tr"), a = d.find("tr")), s = A.clone().prependTo(j), n = A.find("tr"), o = s.find("tr"), s.find("th, td").removeAttr("tabindex"), g || (k.width = "100%", y[0].style.width = "100%"), t.each(Q(e, s), function (t, n) {
            l = f(e, t), n.style.width = e.aoColumns[l].sWidth
        }), E && $t(function (t) {
            t.style.width = ""
        }, a), c = j.outerWidth(), "" === g ? (N.width = "100%", M && (j.find("tbody").height() > S.offsetHeight || "scroll" == T.css("overflow-y")) && (N.width = Ct(j.outerWidth() - v)), c = j.outerWidth()) : "" !== $ && (N.width = Ct($), c = j.outerWidth()), $t(U, o), $t(function (e) {
            F.push(e.innerHTML), O.push(Ct(t(e).css("width")))
        }, o), $t(function (e, n) {
            t.inArray(e, R) !== -1 && (e.style.width = O[n])
        }, n), t(o).height(0), E && ($t(U, a), $t(function (e) {
            B.push(e.innerHTML), H.push(Ct(t(e).css("width")))
        }, a), $t(function (t, e) {
            t.style.width = H[e]
        }, r), t(a).height(0)), $t(function (t, e) {
            t.innerHTML = '<div class="dataTables_sizing" style="height:0;overflow:hidden;">' + F[e] + "</div>", t.style.width = O[e]
        }, o), E && $t(function (t, e) {
            t.innerHTML = '<div class="dataTables_sizing" style="height:0;overflow:hidden;">' + B[e] + "</div>", t.style.width = H[e]
        }, a), j.outerWidth() < c ? (u = S.scrollHeight > S.offsetHeight || "scroll" == T.css("overflow-y") ? c + v : c, M && (S.scrollHeight > S.offsetHeight || "scroll" == T.css("overflow-y")) && (N.width = Ct(u - v)), "" !== g && "" === $ || Lt(e, 1, "Possible column misalignment", 6)) : u = "100%", k.width = Ct(u), b.width = Ct(u), E && (e.nScrollFoot.style.width = Ct(u)), m || M && (k.height = Ct(L.offsetHeight + v));
        var z = j.outerWidth();
        x[0].style.width = Ct(z), w.width = Ct(z);
        var q = j.height() > S.clientHeight || "scroll" == T.css("overflow-y"),
            V = "padding" + (P.bScrollbarLeft ? "Left" : "Right");
        w[V] = q ? v + "px" : "0px", E && (I[0].style.width = Ct(z), _[0].style.width = Ct(z), _[0].style[V] = q ? v + "px" : "0px"), j.children("colgroup").insertBefore(j.children("thead")), T.scroll(), !e.bSorted && !e.bFiltered || e._drawHold || (S.scrollTop = 0)
    }

    function $t(t, e, n) {
        for (var i, r, o = 0, a = 0, s = e.length; a < s;) {
            for (i = e[a].firstChild, r = n ? n[a].firstChild : null; i;) 1 === i.nodeType && (n ? t(i, r, o) : t(i, o), o++), i = i.nextSibling, r = n ? r.nextSibling : null;
            a++
        }
    }

    function mt(n) {
        var i, r, o, a = n.nTable, s = n.aoColumns, d = n.oScroll, l = d.sY, u = d.sX, c = d.sXInner, h = s.length,
            g = m(n, "bVisible"), v = t("th", n.nTHead), y = a.getAttribute("width"), b = a.parentNode, C = !1,
            w = n.oBrowser, x = w.bScrollOversize, S = a.style.width;
        for (S && S.indexOf("%") !== -1 && (y = S), i = 0; i < g.length; i++) r = s[g[i]], null !== r.sWidth && (r.sWidth = vt(r.sWidthOrig, b), C = !0);
        if (x || !C && !u && !l && h == $(n) && h == v.length) for (i = 0; i < h; i++) {
            var T = f(n, i);
            null !== T && (s[T].sWidth = Ct(v.eq(i).width()))
        } else {
            var k = t(a).clone().css("visibility", "hidden").removeAttr("id");
            k.find("tbody tr").remove();
            var D = t("<tr/>").appendTo(k.find("tbody"));
            for (k.find("thead, tfoot").remove(), k.append(t(n.nTHead).clone()).append(t(n.nTFoot).clone()), k.find("tfoot th, tfoot td").css("width", ""), v = Q(n, k.find("thead")[0]), i = 0; i < g.length; i++) r = s[g[i]], v[i].style.width = null !== r.sWidthOrig && "" !== r.sWidthOrig ? Ct(r.sWidthOrig) : "", r.sWidthOrig && u && t(v[i]).append(t("<div/>").css({
                width: r.sWidthOrig,
                margin: 0,
                padding: 0,
                border: 0,
                height: 1
            }));
            if (n.aoData.length) for (i = 0; i < g.length; i++) o = g[i], r = s[o], t(yt(n, o)).clone(!1).append(r.sContentPadding).appendTo(D);
            t("[name]", k).removeAttr("name");
            var _ = t("<div/>").css(u || l ? {
                position: "absolute",
                top: 0,
                left: 0,
                height: 1,
                right: 0,
                overflow: "hidden"
            } : {}).append(k).appendTo(b);
            u && c ? k.width(c) : u ? (k.css("width", "auto"), k.removeAttr("width"), k.width() < b.clientWidth && y && k.width(b.clientWidth)) : l ? k.width(b.clientWidth) : y && k.width(y);
            var I = 0;
            for (i = 0; i < g.length; i++) {
                var A = t(v[i]), j = A.outerWidth() - A.width(),
                    L = w.bBounding ? Math.ceil(v[i].getBoundingClientRect().width) : A.outerWidth();
                I += L, s[g[i]].sWidth = Ct(L - j)
            }
            a.style.width = Ct(I), _.remove()
        }
        if (y && (a.style.width = Ct(y)), (y || u) && !n._reszEvt) {
            var N = function () {
                t(e).bind("resize.DT-" + n.sInstance, Ce(function () {
                    p(n)
                }))
            };
            x ? setTimeout(N, 1e3) : N(), n._reszEvt = !0
        }
    }

    function vt(e, i) {
        if (!e) return 0;
        var r = t("<div/>").css("width", Ct(e)).appendTo(i || n.body), o = r[0].offsetWidth;
        return r.remove(), o
    }

    function yt(e, n) {
        var i = bt(e, n);
        if (i < 0) return null;
        var r = e.aoData[i];
        return r.nTr ? r.anCells[n] : t("<td/>").html(S(e, i, n, "display"))[0]
    }

    function bt(t, e) {
        for (var n, i = -1, r = -1, o = 0, a = t.aoData.length; o < a; o++) n = S(t, o, e, "display") + "", n = n.replace(be, ""), n = n.replace(/&nbsp;/g, " "), n.length > i && (i = n.length, r = o);
        return r
    }

    function Ct(t) {
        return null === t ? "0px" : "number" == typeof t ? t < 0 ? "0px" : t + "px" : t.match(/\d$/) ? t + "px" : t
    }

    function wt(e) {
        var n, r, o, a, s, d, l, u = [], c = e.aoColumns, h = e.aaSortingFixed, p = t.isPlainObject(h), f = [],
            g = function (e) {
                e.length && !t.isArray(e[0]) ? f.push(e) : t.merge(f, e)
            };
        for (t.isArray(h) && g(h), p && h.pre && g(h.pre), g(e.aaSorting), p && h.post && g(h.post), n = 0; n < f.length; n++) for (l = f[n][0], a = c[l].aDataSort, r = 0, o = a.length; r < o; r++) s = a[r], d = c[s].sType || "string", f[n]._idx === i && (f[n]._idx = t.inArray(f[n][1], c[s].asSorting)), u.push({
            src: l,
            col: s,
            dir: f[n][1],
            index: f[n]._idx,
            type: d,
            formatter: Gt.ext.type.order[d + "-pre"]
        });
        return u
    }

    function xt(t) {
        var e, n, i, r, o, a = [], s = Gt.ext.type.order, d = t.aoData, l = (t.aoColumns, 0), u = t.aiDisplayMaster;
        for (v(t), o = wt(t), e = 0, n = o.length; e < n; e++) r = o[e], r.formatter && l++, _t(t, r.col);
        if ("ssp" != Ft(t) && 0 !== o.length) {
            for (e = 0, i = u.length; e < i; e++) a[u[e]] = e;
            l === o.length ? u.sort(function (t, e) {
                var n, i, r, s, l, u = o.length, c = d[t]._aSortData, h = d[e]._aSortData;
                for (r = 0; r < u; r++) if (l = o[r], n = c[l.col], i = h[l.col], s = n < i ? -1 : n > i ? 1 : 0, 0 !== s) return "asc" === l.dir ? s : -s;
                return n = a[t], i = a[e], n < i ? -1 : n > i ? 1 : 0
            }) : u.sort(function (t, e) {
                var n, i, r, l, u, c, h = o.length, p = d[t]._aSortData, f = d[e]._aSortData;
                for (r = 0; r < h; r++) if (u = o[r], n = p[u.col], i = f[u.col], c = s[u.type + "-" + u.dir] || s["string-" + u.dir], l = c(n, i), 0 !== l) return l;
                return n = a[t], i = a[e], n < i ? -1 : n > i ? 1 : 0
            })
        }
        t.bSorted = !0
    }

    function St(t) {
        for (var e, n, i = t.aoColumns, r = wt(t), o = t.oLanguage.oAria, a = 0, s = i.length; a < s; a++) {
            var d = i[a], l = d.asSorting, u = d.sTitle.replace(/<.*?>/g, ""), c = d.nTh;
            c.removeAttribute("aria-sort"), d.bSortable ? (r.length > 0 && r[0].col == a ? (c.setAttribute("aria-sort", "asc" == r[0].dir ? "ascending" : "descending"), n = l[r[0].index + 1] || l[0]) : n = l[0], e = u + ("asc" === n ? o.sSortAscending : o.sSortDescending)) : e = u, c.setAttribute("aria-label", e)
        }
    }

    function Tt(e, n, r, o) {
        var a, s = e.aoColumns[n], d = e.aaSorting, l = s.asSorting, u = function (e, n) {
            var r = e._idx;
            return r === i && (r = t.inArray(e[1], l)), r + 1 < l.length ? r + 1 : n ? null : 0
        };
        if ("number" == typeof d[0] && (d = e.aaSorting = [d]), r && e.oFeatures.bSortMulti) {
            var c = t.inArray(n, de(d, "0"));
            c !== -1 ? (a = u(d[c], !0), null === a && 1 === d.length && (a = 0), null === a ? d.splice(c, 1) : (d[c][1] = l[a], d[c]._idx = a)) : (d.push([n, l[0], 0]), d[d.length - 1]._idx = 0)
        } else d.length && d[0][0] == n ? (a = u(d[0]), d.length = 1, d[0][1] = l[a], d[0]._idx = a) : (d.length = 0, d.push([n, l[0]]), d[0]._idx = 0);
        H(e), "function" == typeof o && o(e)
    }

    function kt(t, e, n, i) {
        var r = t.aoColumns[n];
        Pt(e, {}, function (e) {
            r.bSortable !== !1 && (t.oFeatures.bProcessing ? (pt(t, !0), setTimeout(function () {
                Tt(t, n, e.shiftKey, i), "ssp" !== Ft(t) && pt(t, !1)
            }, 0)) : Tt(t, n, e.shiftKey, i))
        })
    }

    function Dt(e) {
        var n, i, r, o = e.aLastSort, a = e.oClasses.sSortColumn, s = wt(e), d = e.oFeatures;
        if (d.bSort && d.bSortClasses) {
            for (n = 0, i = o.length; n < i; n++) r = o[n].src, t(de(e.aoData, "anCells", r)).removeClass(a + (n < 2 ? n + 1 : 3));
            for (n = 0, i = s.length; n < i; n++) r = s[n].src, t(de(e.aoData, "anCells", r)).addClass(a + (n < 2 ? n + 1 : 3))
        }
        e.aLastSort = s
    }

    function _t(t, e) {
        var n, i = t.aoColumns[e], r = Gt.ext.order[i.sSortDataType];
        r && (n = r.call(t.oInstance, t, e, g(t, e)));
        for (var o, a, s = Gt.ext.type.order[i.sType + "-pre"], d = 0, l = t.aoData.length; d < l; d++) o = t.aoData[d], o._aSortData || (o._aSortData = []), o._aSortData[e] && !r || (a = r ? n[d] : S(t, d, e, "sort"), o._aSortData[e] = s ? s(a) : a)
    }

    function It(e) {
        if (e.oFeatures.bStateSave && !e.bDestroying) {
            var n = {
                time: +new Date,
                start: e._iDisplayStart,
                length: e._iDisplayLength,
                order: t.extend(!0, [], e.aaSorting),
                search: et(e.oPreviousSearch),
                columns: t.map(e.aoColumns, function (t, n) {
                    return {visible: t.bVisible, search: et(e.aoPreSearchCols[n])}
                })
            };
            Rt(e, "aoStateSaveParams", "stateSaveParams", [e, n]), e.oSavedState = n, e.fnStateSaveCallback.call(e.oInstance, e, n)
        }
    }

    function At(e, n) {
        var r, o, a = e.aoColumns;
        if (e.oFeatures.bStateSave) {
            var s = e.fnStateLoadCallback.call(e.oInstance, e);
            if (s && s.time) {
                var d = Rt(e, "aoStateLoadParams", "stateLoadParams", [e, s]);
                if (t.inArray(!1, d) === -1) {
                    var l = e.iStateDuration;
                    if (!(l > 0 && s.time < +new Date - 1e3 * l) && a.length === s.columns.length) {
                        for (e.oLoadedState = t.extend(!0, {}, s), s.start !== i && (e._iDisplayStart = s.start, e.iInitDisplayStart = s.start), s.length !== i && (e._iDisplayLength = s.length), s.order !== i && (e.aaSorting = [], t.each(s.order, function (t, n) {
                            e.aaSorting.push(n[0] >= a.length ? [0, n[1]] : n)
                        })), s.search !== i && t.extend(e.oPreviousSearch, nt(s.search)), r = 0, o = s.columns.length; r < o; r++) {
                            var u = s.columns[r];
                            u.visible !== i && (a[r].bVisible = u.visible), u.search !== i && t.extend(e.aoPreSearchCols[r], nt(u.search))
                        }
                        Rt(e, "aoStateLoaded", "stateLoaded", [e, s])
                    }
                }
            }
        }
    }

    function jt(e) {
        var n = Gt.settings, i = t.inArray(e, de(n, "nTable"));
        return i !== -1 ? n[i] : null
    }

    function Lt(t, n, i, r) {
        if (i = "DataTables warning: " + (t ? "table id=" + t.sTableId + " - " : "") + i, r && (i += ". For more information about this error, please see http://datatables.net/tn/" + r), n) e.console && console.log && console.log(i); else {
            var o = Gt.ext, a = o.sErrMode || o.errMode;
            if (t && Rt(t, null, "error", [t, r, i]), "alert" == a) alert(i); else {
                if ("throw" == a) throw new Error(i);
                "function" == typeof a && a(t, r, i)
            }
        }
    }

    function Nt(e, n, r, o) {
        return t.isArray(r) ? void t.each(r, function (i, r) {
            t.isArray(r) ? Nt(e, n, r[0], r[1]) : Nt(e, n, r)
        }) : (o === i && (o = r), void(n[r] !== i && (e[o] = n[r])))
    }

    function Et(e, n, i) {
        var r;
        for (var o in n) n.hasOwnProperty(o) && (r = n[o], t.isPlainObject(r) ? (t.isPlainObject(e[o]) || (e[o] = {}), t.extend(!0, e[o], r)) : i && "data" !== o && "aaData" !== o && t.isArray(r) ? e[o] = r.slice() : e[o] = r);
        return e
    }

    function Pt(e, n, i) {
        t(e).bind("click.DT", n, function (t) {
            e.blur(), i(t)
        }).bind("keypress.DT", n, function (t) {
            13 === t.which && (t.preventDefault(), i(t))
        }).bind("selectstart.DT", function () {
            return !1
        })
    }

    function Mt(t, e, n, i) {
        n && t[e].push({fn: n, sName: i})
    }

    function Rt(e, n, i, r) {
        var o = [];
        if (n && (o = t.map(e[n].slice().reverse(), function (t, n) {
                return t.fn.apply(e.oInstance, r)
            })), null !== i) {
            var a = t.Event(i + ".dt");
            t(e.nTable).trigger(a, r), o.push(a.result)
        }
        return o
    }

    function Ot(t) {
        var e = t._iDisplayStart, n = t.fnDisplayEnd(), i = t._iDisplayLength;
        e >= n && (e = n - i), e -= e % i, (i === -1 || e < 0) && (e = 0), t._iDisplayStart = e
    }

    function Ht(e, n) {
        var i = e.renderer, r = Gt.ext.renderer[n];
        return t.isPlainObject(i) && i[n] ? r[i[n]] || r._ : "string" == typeof i ? r[i] || r._ : r._
    }

    function Ft(t) {
        return t.oFeatures.bServerSide ? "ssp" : t.ajax || t.sAjaxSource ? "ajax" : "dom"
    }

    function Bt(t, e) {
        var n = [], i = We.numbers_length, r = Math.floor(i / 2);
        return e <= i ? n = ue(0, e) : t <= r ? (n = ue(0, i - 2), n.push("ellipsis"), n.push(e - 1)) : t >= e - 1 - r ? (n = ue(e - (i - 2), e), n.splice(0, 0, "ellipsis"), n.splice(0, 0, 0)) : (n = ue(t - r + 2, t + r - 1), n.push("ellipsis"), n.push(e - 1), n.splice(0, 0, "ellipsis"), n.splice(0, 0, 0)), n.DT_el = "span", n
    }

    function Qt(e) {
        t.each({
            num: function (t) {
                return ze(t, e)
            }, "num-fmt": function (t) {
                return ze(t, e, ee)
            }, "html-num": function (t) {
                return ze(t, e, Xt)
            }, "html-num-fmt": function (t) {
                return ze(t, e, Xt, ee)
            }
        }, function (t, n) {
            Wt.type.order[t + e + "-pre"] = n, t.match(/^html\-/) && (Wt.type.search[t + e] = Wt.type.search.html)
        })
    }

    function Ut(t) {
        return function () {
            var e = [jt(this[Gt.ext.iApiIndex])].concat(Array.prototype.slice.call(arguments));
            return Gt.ext.internal[t].apply(this, e)
        }
    }

    var Wt, zt, qt, Vt, Gt = function (e) {
            this.$ = function (t, e) {
                return this.api(!0).$(t, e)
            }, this._ = function (t, e) {
                return this.api(!0).rows(t, e).data()
            }, this.api = function (t) {
                return new zt(t ? jt(this[Wt.iApiIndex]) : this)
            }, this.fnAddData = function (e, n) {
                var r = this.api(!0),
                    o = t.isArray(e) && (t.isArray(e[0]) || t.isPlainObject(e[0])) ? r.rows.add(e) : r.row.add(e);
                return (n === i || n) && r.draw(), o.flatten().toArray()
            }, this.fnAdjustColumnSizing = function (t) {
                var e = this.api(!0).columns.adjust(), n = e.settings()[0], r = n.oScroll;
                t === i || t ? e.draw(!1) : "" === r.sX && "" === r.sY || gt(n)
            }, this.fnClearTable = function (t) {
                var e = this.api(!0).clear();
                (t === i || t) && e.draw()
            }, this.fnClose = function (t) {
                this.api(!0).row(t).child.hide()
            }, this.fnDeleteRow = function (t, e, n) {
                var r = this.api(!0), o = r.rows(t), a = o.settings()[0], s = a.aoData[o[0][0]];
                return o.remove(), e && e.call(this, a, s), (n === i || n) && r.draw(), s
            }, this.fnDestroy = function (t) {
                this.api(!0).destroy(t)
            }, this.fnDraw = function (t) {
                this.api(!0).draw(t)
            }, this.fnFilter = function (t, e, n, r, o, a) {
                var s = this.api(!0);
                null === e || e === i ? s.search(t, n, r, a) : s.column(e).search(t, n, r, a), s.draw()
            }, this.fnGetData = function (t, e) {
                var n = this.api(!0);
                if (t !== i) {
                    var r = t.nodeName ? t.nodeName.toLowerCase() : "";
                    return e !== i || "td" == r || "th" == r ? n.cell(t, e).data() : n.row(t).data() || null
                }
                return n.data().toArray()
            }, this.fnGetNodes = function (t) {
                var e = this.api(!0);
                return t !== i ? e.row(t).node() : e.rows().nodes().flatten().toArray()
            }, this.fnGetPosition = function (t) {
                var e = this.api(!0), n = t.nodeName.toUpperCase();
                if ("TR" == n) return e.row(t).index();
                if ("TD" == n || "TH" == n) {
                    var i = e.cell(t).index();
                    return [i.row, i.columnVisible, i.column]
                }
                return null
            }, this.fnIsOpen = function (t) {
                return this.api(!0).row(t).child.isShown()
            }, this.fnOpen = function (t, e, n) {
                return this.api(!0).row(t).child(e, n).show().child()[0]
            }, this.fnPageChange = function (t, e) {
                var n = this.api(!0).page(t);
                (e === i || e) && n.draw(!1)
            }, this.fnSetColumnVis = function (t, e, n) {
                var r = this.api(!0).column(t).visible(e);
                (n === i || n) && r.columns.adjust().draw()
            }, this.fnSettings = function () {
                return jt(this[Wt.iApiIndex])
            }, this.fnSort = function (t) {
                this.api(!0).order(t).draw()
            }, this.fnSortListener = function (t, e, n) {
                this.api(!0).order.listener(t, e, n)
            }, this.fnUpdate = function (t, e, n, r, o) {
                var a = this.api(!0);
                return n === i || null === n ? a.row(e).data(t) : a.cell(e, n).data(t), (o === i || o) && a.columns.adjust(), (r === i || r) && a.draw(), 0
            }, this.fnVersionCheck = Wt.fnVersionCheck;
            var n = this, r = e === i, u = this.length;
            r && (e = {}), this.oApi = this.internal = Wt.internal;
            for (var p in Gt.ext.internal) p && (this[p] = Ut(p));
            return this.each(function () {
                var p, f = {}, g = u > 1 ? Et(f, e, !0) : e, $ = 0, m = this.getAttribute("id"), v = !1, w = Gt.defaults,
                    x = t(this);
                if ("table" != this.nodeName.toLowerCase()) return void Lt(null, 0, "Non-table node initialisation (" + this.nodeName + ")", 2);
                s(w), d(w.column), o(w, w, !0), o(w.column, w.column, !0), o(w, t.extend(g, x.data()));
                var S = Gt.settings;
                for ($ = 0, p = S.length; $ < p; $++) {
                    var T = S[$];
                    if (T.nTable == this || T.nTHead.parentNode == this || T.nTFoot && T.nTFoot.parentNode == this) {
                        var k = g.bRetrieve !== i ? g.bRetrieve : w.bRetrieve,
                            _ = g.bDestroy !== i ? g.bDestroy : w.bDestroy;
                        if (r || k) return T.oInstance;
                        if (_) {
                            T.oInstance.fnDestroy();
                            break
                        }
                        return void Lt(T, 0, "Cannot reinitialise DataTable", 3)
                    }
                    if (T.sTableId == this.id) {
                        S.splice($, 1);
                        break
                    }
                }
                null !== m && "" !== m || (m = "DataTables_Table_" + Gt.ext._unique++, this.id = m);
                var I = t.extend(!0, {}, Gt.models.oSettings, {sDestroyWidth: x[0].style.width, sInstance: m, sTableId: m});
                I.nTable = this, I.oApi = n.internal, I.oInit = g, S.push(I), I.oInstance = 1 === n.length ? n : x.dataTable(), s(g), g.oLanguage && a(g.oLanguage), g.aLengthMenu && !g.iDisplayLength && (g.iDisplayLength = t.isArray(g.aLengthMenu[0]) ? g.aLengthMenu[0][0] : g.aLengthMenu[0]), g = Et(t.extend(!0, {}, w), g), Nt(I.oFeatures, g, ["bPaginate", "bLengthChange", "bFilter", "bSort", "bSortMulti", "bInfo", "bProcessing", "bAutoWidth", "bSortClasses", "bServerSide", "bDeferRender"]), Nt(I, g, ["asStripeClasses", "ajax", "fnServerData", "fnFormatNumber", "sServerMethod", "aaSorting", "aaSortingFixed", "aLengthMenu", "sPaginationType", "sAjaxSource", "sAjaxDataProp", "iStateDuration", "sDom", "bSortCellsTop", "iTabIndex", "fnStateLoadCallback", "fnStateSaveCallback", "renderer", "searchDelay", "rowId", ["iCookieDuration", "iStateDuration"], ["oSearch", "oPreviousSearch"], ["aoSearchCols", "aoPreSearchCols"], ["iDisplayLength", "_iDisplayLength"], ["bJQueryUI", "bJUI"]]), Nt(I.oScroll, g, [["sScrollX", "sX"], ["sScrollXInner", "sXInner"], ["sScrollY", "sY"], ["bScrollCollapse", "bCollapse"]]), Nt(I.oLanguage, g, "fnInfoCallback"), Mt(I, "aoDrawCallback", g.fnDrawCallback, "user"), Mt(I, "aoServerParams", g.fnServerParams, "user"), Mt(I, "aoStateSaveParams", g.fnStateSaveParams, "user"), Mt(I, "aoStateLoadParams", g.fnStateLoadParams, "user"), Mt(I, "aoStateLoaded", g.fnStateLoaded, "user"), Mt(I, "aoRowCallback", g.fnRowCallback, "user"), Mt(I, "aoRowCreatedCallback", g.fnCreatedRow, "user"), Mt(I, "aoHeaderCallback", g.fnHeaderCallback, "user"), Mt(I, "aoFooterCallback", g.fnFooterCallback, "user"), Mt(I, "aoInitComplete", g.fnInitComplete, "user"), Mt(I, "aoPreDrawCallback", g.fnPreDrawCallback, "user"), I.rowIdFn = D(g.rowId), l(I);
                var A = I.oClasses;
                if (g.bJQueryUI ? (t.extend(A, Gt.ext.oJUIClasses, g.oClasses), g.sDom === w.sDom && "lfrtip" === w.sDom && (I.sDom = '<"H"lfr>t<"F"ip>'), I.renderer ? t.isPlainObject(I.renderer) && !I.renderer.header && (I.renderer.header = "jqueryui") : I.renderer = "jqueryui") : t.extend(A, Gt.ext.classes, g.oClasses), x.addClass(A.sTable), I.iInitDisplayStart === i && (I.iInitDisplayStart = g.iDisplayStart, I._iDisplayStart = g.iDisplayStart), null !== g.iDeferLoading) {
                    I.bDeferLoading = !0;
                    var j = t.isArray(g.iDeferLoading);
                    I._iRecordsDisplay = j ? g.iDeferLoading[0] : g.iDeferLoading, I._iRecordsTotal = j ? g.iDeferLoading[1] : g.iDeferLoading
                }
                var L = I.oLanguage;
                t.extend(!0, L, g.oLanguage), "" !== L.sUrl && (t.ajax({
                    dataType: "json",
                    url: L.sUrl,
                    success: function (e) {
                        a(e), o(w.oLanguage, e), t.extend(!0, L, e), at(I)
                    },
                    error: function () {
                        at(I)
                    }
                }), v = !0), null === g.asStripeClasses && (I.asStripeClasses = [A.sStripeOdd, A.sStripeEven]);
                var N = I.asStripeClasses, E = x.children("tbody").find("tr").eq(0);
                t.inArray(!0, t.map(N, function (t, e) {
                    return E.hasClass(t)
                })) !== -1 && (t("tbody tr", this).removeClass(N.join(" ")), I.asDestroyStripes = N.slice());
                var P, M = [], R = this.getElementsByTagName("thead");
                if (0 !== R.length && (B(I.aoHeader, R[0]), M = Q(I)), null === g.aoColumns) for (P = [], $ = 0, p = M.length; $ < p; $++) P.push(null); else P = g.aoColumns;
                for ($ = 0, p = P.length; $ < p; $++) c(I, M ? M[$] : null);
                if (y(I, g.aoColumnDefs, P, function (t, e) {
                        h(I, t, e)
                    }), E.length) {
                    var O = function (t, e) {
                        return null !== t.getAttribute("data-" + e) ? e : null;
                    };
                    t(E[0]).children("th, td").each(function (t, e) {
                        var n = I.aoColumns[t];
                        if (n.mData === t) {
                            var r = O(e, "sort") || O(e, "order"), o = O(e, "filter") || O(e, "search");
                            null === r && null === o || (n.mData = {
                                _: t + ".display",
                                sort: null !== r ? t + ".@data-" + r : i,
                                type: null !== r ? t + ".@data-" + r : i,
                                filter: null !== o ? t + ".@data-" + o : i
                            }, h(I, t))
                        }
                    })
                }
                var H = I.oFeatures;
                if (g.bStateSave && (H.bStateSave = !0, At(I, g), Mt(I, "aoDrawCallback", It, "state_save")), g.aaSorting === i) {
                    var F = I.aaSorting;
                    for ($ = 0, p = F.length; $ < p; $++) F[$][1] = I.aoColumns[$].asSorting[0]
                }
                Dt(I), H.bSort && Mt(I, "aoDrawCallback", function () {
                    if (I.bSorted) {
                        var e = wt(I), n = {};
                        t.each(e, function (t, e) {
                            n[e.src] = e.dir
                        }), Rt(I, null, "order", [I, e, n]), St(I)
                    }
                }), Mt(I, "aoDrawCallback", function () {
                    (I.bSorted || "ssp" === Ft(I) || H.bDeferRender) && Dt(I)
                }, "sc");
                var U = x.children("caption").each(function () {
                    this._captionSide = x.css("caption-side")
                }), W = x.children("thead");
                0 === W.length && (W = t("<thead/>").appendTo(this)), I.nTHead = W[0];
                var z = x.children("tbody");
                0 === z.length && (z = t("<tbody/>").appendTo(this)), I.nTBody = z[0];
                var q = x.children("tfoot");
                if (0 === q.length && U.length > 0 && ("" !== I.oScroll.sX || "" !== I.oScroll.sY) && (q = t("<tfoot/>").appendTo(this)), 0 === q.length || 0 === q.children().length ? x.addClass(A.sNoFooter) : q.length > 0 && (I.nTFoot = q[0], B(I.aoFooter, I.nTFoot)), g.aaData) for ($ = 0; $ < g.aaData.length; $++) b(I, g.aaData[$]); else (I.bDeferLoading || "dom" == Ft(I)) && C(I, t(I.nTBody).children("tr"));
                I.aiDisplay = I.aiDisplayMaster.slice(), I.bInitialised = !0, v === !1 && at(I)
            }), n = null, this
        }, Kt = {}, Jt = /[\r\n]/g, Xt = /<.*?>/g, Yt = /^[\w\+\-]/, Zt = /[\w\+\-]$/,
        te = new RegExp("(\\" + ["/", ".", "*", "+", "?", "|", "(", ")", "[", "]", "{", "}", "\\", "$", "^", "-"].join("|\\") + ")", "g"),
        ee = /[',$£€¥%\u2009\u202F\u20BD\u20a9\u20BArfk]/gi, ne = function (t) {
            return !t || t === !0 || "-" === t
        }, ie = function (t) {
            var e = parseInt(t, 10);
            return !isNaN(e) && isFinite(t) ? e : null
        }, re = function (t, e) {
            return Kt[e] || (Kt[e] = new RegExp(me(e), "g")), "string" == typeof t && "." !== e ? t.replace(/\./g, "").replace(Kt[e], ".") : t
        }, oe = function (t, e, n) {
            var i = "string" == typeof t;
            return !!ne(t) || (e && i && (t = re(t, e)), n && i && (t = t.replace(ee, "")), !isNaN(parseFloat(t)) && isFinite(t))
        }, ae = function (t) {
            return ne(t) || "string" == typeof t
        }, se = function (t, e, n) {
            if (ne(t)) return !0;
            var i = ae(t);
            return i ? !!oe(he(t), e, n) || null : null
        }, de = function (t, e, n) {
            var r = [], o = 0, a = t.length;
            if (n !== i) for (; o < a; o++) t[o] && t[o][e] && r.push(t[o][e][n]); else for (; o < a; o++) t[o] && r.push(t[o][e]);
            return r
        }, le = function (t, e, n, r) {
            var o = [], a = 0, s = e.length;
            if (r !== i) for (; a < s; a++) t[e[a]][n] && o.push(t[e[a]][n][r]); else for (; a < s; a++) o.push(t[e[a]][n]);
            return o
        }, ue = function (t, e) {
            var n, r = [];
            e === i ? (e = 0, n = t) : (n = e, e = t);
            for (var o = e; o < n; o++) r.push(o);
            return r
        }, ce = function (t) {
            for (var e = [], n = 0, i = t.length; n < i; n++) t[n] && e.push(t[n]);
            return e
        }, he = function (t) {
            return t.replace(Xt, "")
        }, pe = function (t) {
            var e, n, i, r = [], o = t.length, a = 0;
            t:for (n = 0; n < o; n++) {
                for (e = t[n], i = 0; i < a; i++) if (r[i] === e) continue t;
                r.push(e), a++
            }
            return r
        };
    Gt.util = {
        throttle: function (t, e) {
            var n, r, o = e !== i ? e : 200;
            return function () {
                var e = this, a = +new Date, s = arguments;
                n && a < n + o ? (clearTimeout(r), r = setTimeout(function () {
                    n = i, t.apply(e, s)
                }, o)) : (n = a, t.apply(e, s))
            }
        }, escapeRegex: function (t) {
            return t.replace(te, "\\$1")
        }
    };
    var fe = function (t, e, n) {
            t[e] !== i && (t[n] = t[e])
        }, ge = /\[.*?\]$/, $e = /\(\)$/, me = Gt.util.escapeRegex, ve = t("<div>")[0], ye = ve.textContent !== i,
        be = /<.*?>/g, Ce = Gt.util.throttle, we = [], xe = Array.prototype, Se = function (e) {
            var n, i, r = Gt.settings, o = t.map(r, function (t, e) {
                return t.nTable
            });
            return e ? e.nTable && e.oApi ? [e] : e.nodeName && "table" === e.nodeName.toLowerCase() ? (n = t.inArray(e, o), n !== -1 ? [r[n]] : null) : e && "function" == typeof e.settings ? e.settings().toArray() : ("string" == typeof e ? i = t(e) : e instanceof t && (i = e), i ? i.map(function (e) {
                return n = t.inArray(this, o), n !== -1 ? r[n] : null
            }).toArray() : void 0) : []
        };
    zt = function (e, n) {
        if (!(this instanceof zt)) return new zt(e, n);
        var i = [], r = function (t) {
            var e = Se(t);
            e && (i = i.concat(e))
        };
        if (t.isArray(e)) for (var o = 0, a = e.length; o < a; o++) r(e[o]); else r(e);
        this.context = pe(i), n && t.merge(this, n), this.selector = {
            rows: null,
            cols: null,
            opts: null
        }, zt.extend(this, this, we)
    }, Gt.Api = zt, t.extend(zt.prototype, {
        any: function () {
            return 0 !== this.count()
        },
        concat: xe.concat,
        context: [],
        count: function () {
            return this.flatten().length
        },
        each: function (t) {
            for (var e = 0, n = this.length; e < n; e++) t.call(this, this[e], e, this);
            return this
        },
        eq: function (t) {
            var e = this.context;
            return e.length > t ? new zt(e[t], this[t]) : null
        },
        filter: function (t) {
            var e = [];
            if (xe.filter) e = xe.filter.call(this, t, this); else for (var n = 0, i = this.length; n < i; n++) t.call(this, this[n], n, this) && e.push(this[n]);
            return new zt(this.context, e)
        },
        flatten: function () {
            var t = [];
            return new zt(this.context, t.concat.apply(t, this.toArray()))
        },
        join: xe.join,
        indexOf: xe.indexOf || function (t, e) {
            for (var n = e || 0, i = this.length; n < i; n++) if (this[n] === t) return n;
            return -1
        },
        iterator: function (t, e, n, r) {
            var o, a, s, d, l, u, c, h, p = [], f = this.context, g = this.selector;
            for ("string" == typeof t && (r = n, n = e, e = t, t = !1), a = 0, s = f.length; a < s; a++) {
                var $ = new zt(f[a]);
                if ("table" === e) o = n.call($, f[a], a), o !== i && p.push(o); else if ("columns" === e || "rows" === e) o = n.call($, f[a], this[a], a), o !== i && p.push(o); else if ("column" === e || "column-rows" === e || "row" === e || "cell" === e) for (c = this[a], "column-rows" === e && (u = Ae(f[a], g.opts)), d = 0, l = c.length; d < l; d++) h = c[d], o = "cell" === e ? n.call($, f[a], h.row, h.column, a, d) : n.call($, f[a], h, a, d, u), o !== i && p.push(o)
            }
            if (p.length || r) {
                var m = new zt(f, t ? p.concat.apply([], p) : p), v = m.selector;
                return v.rows = g.rows, v.cols = g.cols, v.opts = g.opts, m
            }
            return this
        },
        lastIndexOf: xe.lastIndexOf || function (t, e) {
            return this.indexOf.apply(this.toArray.reverse(), arguments)
        },
        length: 0,
        map: function (t) {
            var e = [];
            if (xe.map) e = xe.map.call(this, t, this); else for (var n = 0, i = this.length; n < i; n++) e.push(t.call(this, this[n], n));
            return new zt(this.context, e)
        },
        pluck: function (t) {
            return this.map(function (e) {
                return e[t]
            })
        },
        pop: xe.pop,
        push: xe.push,
        reduce: xe.reduce || function (t, e) {
            return u(this, t, e, 0, this.length, 1)
        },
        reduceRight: xe.reduceRight || function (t, e) {
            return u(this, t, e, this.length - 1, -1, -1)
        },
        reverse: xe.reverse,
        selector: null,
        shift: xe.shift,
        sort: xe.sort,
        splice: xe.splice,
        toArray: function () {
            return xe.slice.call(this)
        },
        to$: function () {
            return t(this)
        },
        toJQuery: function () {
            return t(this)
        },
        unique: function () {
            return new zt(this.context, pe(this))
        },
        unshift: xe.unshift
    }), zt.extend = function (e, n, i) {
        if (i.length && n && (n instanceof zt || n.__dt_wrapper)) {
            var r, o, a, s = function (t, e, n) {
                return function () {
                    var i = e.apply(t, arguments);
                    return zt.extend(i, i, n.methodExt), i
                }
            };
            for (r = 0, o = i.length; r < o; r++) a = i[r], n[a.name] = "function" == typeof a.val ? s(e, a.val, a) : t.isPlainObject(a.val) ? {} : a.val, n[a.name].__dt_wrapper = !0, zt.extend(e, n[a.name], a.propExt)
        }
    }, zt.register = qt = function (e, n) {
        if (t.isArray(e)) for (var i = 0, r = e.length; i < r; i++) zt.register(e[i], n); else {
            var o, a, s, d, l = e.split("."), u = we, c = function (t, e) {
                for (var n = 0, i = t.length; n < i; n++) if (t[n].name === e) return t[n];
                return null
            };
            for (o = 0, a = l.length; o < a; o++) {
                d = l[o].indexOf("()") !== -1, s = d ? l[o].replace("()", "") : l[o];
                var h = c(u, s);
                h || (h = {
                    name: s,
                    val: {},
                    methodExt: [],
                    propExt: []
                }, u.push(h)), o === a - 1 ? h.val = n : u = d ? h.methodExt : h.propExt
            }
        }
    }, zt.registerPlural = Vt = function (e, n, r) {
        zt.register(e, r), zt.register(n, function () {
            var e = r.apply(this, arguments);
            return e === this ? this : e instanceof zt ? e.length ? t.isArray(e[0]) ? new zt(e.context, e[0]) : e[0] : i : e
        })
    };
    var Te = function (e, n) {
        if ("number" == typeof e) return [n[e]];
        var i = t.map(n, function (t, e) {
            return t.nTable
        });
        return t(i).filter(e).map(function (e) {
            var r = t.inArray(this, i);
            return n[r]
        }).toArray()
    };
    qt("tables()", function (t) {
        return t ? new zt(Te(t, this.context)) : this
    }), qt("table()", function (t) {
        var e = this.tables(t), n = e.context;
        return n.length ? new zt(n[0]) : e
    }), Vt("tables().nodes()", "table().node()", function () {
        return this.iterator("table", function (t) {
            return t.nTable
        }, 1)
    }), Vt("tables().body()", "table().body()", function () {
        return this.iterator("table", function (t) {
            return t.nTBody
        }, 1)
    }), Vt("tables().header()", "table().header()", function () {
        return this.iterator("table", function (t) {
            return t.nTHead
        }, 1)
    }), Vt("tables().footer()", "table().footer()", function () {
        return this.iterator("table", function (t) {
            return t.nTFoot
        }, 1)
    }), Vt("tables().containers()", "table().container()", function () {
        return this.iterator("table", function (t) {
            return t.nTableWrapper
        }, 1)
    }), qt("draw()", function (t) {
        return this.iterator("table", function (e) {
            "page" === t ? O(e) : ("string" == typeof t && (t = "full-hold" !== t), H(e, t === !1))
        })
    }), qt("page()", function (t) {
        return t === i ? this.page.info().page : this.iterator("table", function (e) {
            ct(e, t)
        })
    }), qt("page.info()", function (t) {
        if (0 === this.context.length) return i;
        var e = this.context[0], n = e._iDisplayStart, r = e.oFeatures.bPaginate ? e._iDisplayLength : -1,
            o = e.fnRecordsDisplay(), a = r === -1;
        return {
            page: a ? 0 : Math.floor(n / r),
            pages: a ? 1 : Math.ceil(o / r),
            start: n,
            end: e.fnDisplayEnd(),
            length: r,
            recordsTotal: e.fnRecordsTotal(),
            recordsDisplay: o,
            serverSide: "ssp" === Ft(e)
        }
    }), qt("page.len()", function (t) {
        return t === i ? 0 !== this.context.length ? this.context[0]._iDisplayLength : i : this.iterator("table", function (e) {
            dt(e, t)
        })
    });
    var ke = function (t, e, n) {
        if (n) {
            var i = new zt(t);
            i.one("draw", function () {
                n(i.ajax.json())
            })
        }
        if ("ssp" == Ft(t)) H(t, e); else {
            pt(t, !0);
            var r = t.jqXHR;
            r && 4 !== r.readyState && r.abort(), U(t, [], function (n) {
                A(t);
                for (var i = V(t, n), r = 0, o = i.length; r < o; r++) b(t, i[r]);
                H(t, e), pt(t, !1)
            })
        }
    };
    qt("ajax.json()", function () {
        var t = this.context;
        if (t.length > 0) return t[0].json
    }), qt("ajax.params()", function () {
        var t = this.context;
        if (t.length > 0) return t[0].oAjaxData
    }), qt("ajax.reload()", function (t, e) {
        return this.iterator("table", function (n) {
            ke(n, e === !1, t)
        })
    }), qt("ajax.url()", function (e) {
        var n = this.context;
        return e === i ? 0 === n.length ? i : (n = n[0], n.ajax ? t.isPlainObject(n.ajax) ? n.ajax.url : n.ajax : n.sAjaxSource) : this.iterator("table", function (n) {
            t.isPlainObject(n.ajax) ? n.ajax.url = e : n.ajax = e
        })
    }), qt("ajax.url().load()", function (t, e) {
        return this.iterator("table", function (n) {
            ke(n, e === !1, t)
        })
    });
    var De = function (e, n, r, o, a) {
        var s, d, l, u, c, h, p = [], f = typeof n;
        for (n && "string" !== f && "function" !== f && n.length !== i || (n = [n]), l = 0, u = n.length; l < u; l++) for (d = n[l] && n[l].split ? n[l].split(",") : [n[l]], c = 0, h = d.length; c < h; c++) s = r("string" == typeof d[c] ? t.trim(d[c]) : d[c]), s && s.length && (p = p.concat(s));
        var g = Wt.selector[e];
        if (g.length) for (l = 0, u = g.length; l < u; l++) p = g[l](o, a, p);
        return pe(p)
    }, _e = function (e) {
        return e || (e = {}), e.filter && e.search === i && (e.search = e.filter), t.extend({
            search: "none",
            order: "current",
            page: "all"
        }, e)
    }, Ie = function (t) {
        for (var e = 0, n = t.length; e < n; e++) if (t[e].length > 0) return t[0] = t[e], t[0].length = 1, t.length = 1, t.context = [t.context[e]], t;
        return t.length = 0, t
    }, Ae = function (e, n) {
        var i, r, o, a = [], s = e.aiDisplay, d = e.aiDisplayMaster, l = n.search, u = n.order, c = n.page;
        if ("ssp" == Ft(e)) return "removed" === l ? [] : ue(0, d.length);
        if ("current" == c) for (i = e._iDisplayStart, r = e.fnDisplayEnd(); i < r; i++) a.push(s[i]); else if ("current" == u || "applied" == u) a = "none" == l ? d.slice() : "applied" == l ? s.slice() : t.map(d, function (e, n) {
            return t.inArray(e, s) === -1 ? e : null
        }); else if ("index" == u || "original" == u) for (i = 0, r = e.aoData.length; i < r; i++) "none" == l ? a.push(i) : (o = t.inArray(i, s), (o === -1 && "removed" == l || o >= 0 && "applied" == l) && a.push(i));
        return a
    }, je = function (e, n, r) {
        var o = function (n) {
            var o = ie(n);
            if (null !== o && !r) return [o];
            var a = Ae(e, r);
            if (null !== o && t.inArray(o, a) !== -1) return [o];
            if (!n) return a;
            if ("function" == typeof n) return t.map(a, function (t) {
                var i = e.aoData[t];
                return n(t, i._aData, i.nTr) ? t : null
            });
            var s = ce(le(e.aoData, a, "nTr"));
            if (n.nodeName) {
                if (n._DT_RowIndex !== i) return [n._DT_RowIndex];
                if (n._DT_CellIndex) return [n._DT_CellIndex.row];
                var d = t(n).closest("*[data-dt-row]");
                return d.length ? [d.data("dt-row")] : []
            }
            if ("string" == typeof n && "#" === n.charAt(0)) {
                var l = e.aIds[n.replace(/^#/, "")];
                if (l !== i) return [l.idx]
            }
            return t(s).filter(n).map(function () {
                return this._DT_RowIndex
            }).toArray()
        };
        return De("row", n, o, e, r)
    };
    qt("rows()", function (e, n) {
        e === i ? e = "" : t.isPlainObject(e) && (n = e, e = ""), n = _e(n);
        var r = this.iterator("table", function (t) {
            return je(t, e, n)
        }, 1);
        return r.selector.rows = e, r.selector.opts = n, r
    }), qt("rows().nodes()", function () {
        return this.iterator("row", function (t, e) {
            return t.aoData[e].nTr || i
        }, 1)
    }), qt("rows().data()", function () {
        return this.iterator(!0, "rows", function (t, e) {
            return le(t.aoData, e, "_aData")
        }, 1)
    }), Vt("rows().cache()", "row().cache()", function (t) {
        return this.iterator("row", function (e, n) {
            var i = e.aoData[n];
            return "search" === t ? i._aFilterData : i._aSortData
        }, 1)
    }), Vt("rows().invalidate()", "row().invalidate()", function (t) {
        return this.iterator("row", function (e, n) {
            L(e, n, t)
        })
    }), Vt("rows().indexes()", "row().index()", function () {
        return this.iterator("row", function (t, e) {
            return e
        }, 1)
    }), Vt("rows().ids()", "row().id()", function (t) {
        for (var e = [], n = this.context, i = 0, r = n.length; i < r; i++) for (var o = 0, a = this[i].length; o < a; o++) {
            var s = n[i].rowIdFn(n[i].aoData[this[i][o]]._aData);
            e.push((t === !0 ? "#" : "") + s)
        }
        return new zt(n, e)
    }), Vt("rows().remove()", "row().remove()", function () {
        var t = this;
        return this.iterator("row", function (e, n, r) {
            var o, a, s, d, l, u, c = e.aoData, h = c[n];
            for (c.splice(n, 1), o = 0, a = c.length; o < a; o++) if (l = c[o], u = l.anCells, null !== l.nTr && (l.nTr._DT_RowIndex = o), null !== u) for (s = 0, d = u.length; s < d; s++) u[s]._DT_CellIndex.row = o;
            j(e.aiDisplayMaster, n), j(e.aiDisplay, n), j(t[r], n, !1), Ot(e);
            var p = e.rowIdFn(h._aData);
            p !== i && delete e.aIds[p]
        }), this.iterator("table", function (t) {
            for (var e = 0, n = t.aoData.length; e < n; e++) t.aoData[e].idx = e
        }), this
    }), qt("rows.add()", function (e) {
        var n = this.iterator("table", function (t) {
            var n, i, r, o = [];
            for (i = 0, r = e.length; i < r; i++) n = e[i], n.nodeName && "TR" === n.nodeName.toUpperCase() ? o.push(C(t, n)[0]) : o.push(b(t, n));
            return o
        }, 1), i = this.rows(-1);
        return i.pop(), t.merge(i, n), i
    }), qt("row()", function (t, e) {
        return Ie(this.rows(t, e))
    }), qt("row().data()", function (t) {
        var e = this.context;
        return t === i ? e.length && this.length ? e[0].aoData[this[0]]._aData : i : (e[0].aoData[this[0]]._aData = t, L(e[0], this[0], "data"), this)
    }), qt("row().node()", function () {
        var t = this.context;
        return t.length && this.length ? t[0].aoData[this[0]].nTr || null : null
    }), qt("row.add()", function (e) {
        e instanceof t && e.length && (e = e[0]);
        var n = this.iterator("table", function (t) {
            return e.nodeName && "TR" === e.nodeName.toUpperCase() ? C(t, e)[0] : b(t, e)
        });
        return this.row(n[0])
    });
    var Le = function (e, n, i, r) {
        var o = [], a = function (n, i) {
            if (t.isArray(n) || n instanceof t) for (var r = 0, s = n.length; r < s; r++) a(n[r], i); else if (n.nodeName && "tr" === n.nodeName.toLowerCase()) o.push(n); else {
                var d = t("<tr><td/></tr>").addClass(i);
                t("td", d).addClass(i).html(n)[0].colSpan = $(e), o.push(d[0])
            }
        };
        a(i, r), n._details && n._details.remove(), n._details = t(o), n._detailsShow && n._details.insertAfter(n.nTr)
    }, Ne = function (t, e) {
        var n = t.context;
        if (n.length) {
            var r = n[0].aoData[e !== i ? e : t[0]];
            r && r._details && (r._details.remove(), r._detailsShow = i, r._details = i)
        }
    }, Ee = function (t, e) {
        var n = t.context;
        if (n.length && t.length) {
            var i = n[0].aoData[t[0]];
            i._details && (i._detailsShow = e, e ? i._details.insertAfter(i.nTr) : i._details.detach(), Pe(n[0]))
        }
    }, Pe = function (t) {
        var e = new zt(t), n = ".dt.DT_details", i = "draw" + n, r = "column-visibility" + n, o = "destroy" + n,
            a = t.aoData;
        e.off(i + " " + r + " " + o), de(a, "_details").length > 0 && (e.on(i, function (n, i) {
            t === i && e.rows({page: "current"}).eq(0).each(function (t) {
                var e = a[t];
                e._detailsShow && e._details.insertAfter(e.nTr)
            })
        }), e.on(r, function (e, n, i, r) {
            if (t === n) for (var o, s = $(n), d = 0, l = a.length; d < l; d++) o = a[d], o._details && o._details.children("td[colspan]").attr("colspan", s)
        }), e.on(o, function (n, i) {
            if (t === i) for (var r = 0, o = a.length; r < o; r++) a[r]._details && Ne(e, r)
        }))
    }, Me = "", Re = Me + "row().child", Oe = Re + "()";
    qt(Oe, function (t, e) {
        var n = this.context;
        return t === i ? n.length && this.length ? n[0].aoData[this[0]]._details : i : (t === !0 ? this.child.show() : t === !1 ? Ne(this) : n.length && this.length && Le(n[0], n[0].aoData[this[0]], t, e), this)
    }), qt([Re + ".show()", Oe + ".show()"], function (t) {
        return Ee(this, !0), this
    }), qt([Re + ".hide()", Oe + ".hide()"], function () {
        return Ee(this, !1), this
    }), qt([Re + ".remove()", Oe + ".remove()"], function () {
        return Ne(this), this
    }), qt(Re + ".isShown()", function () {
        var t = this.context;
        return !(!t.length || !this.length) && (t[0].aoData[this[0]]._detailsShow || !1)
    });
    var He = /^(.+):(name|visIdx|visible)$/, Fe = function (t, e, n, i, r) {
        for (var o = [], a = 0, s = r.length; a < s; a++) o.push(S(t, r[a], e));
        return o
    }, Be = function (e, n, i) {
        var r = e.aoColumns, o = de(r, "sName"), a = de(r, "nTh"), s = function (n) {
            var s = ie(n);
            if ("" === n) return ue(r.length);
            if (null !== s) return [s >= 0 ? s : r.length + s];
            if ("function" == typeof n) {
                var d = Ae(e, i);
                return t.map(r, function (t, i) {
                    return n(i, Fe(e, i, 0, 0, d), a[i]) ? i : null
                })
            }
            var l = "string" == typeof n ? n.match(He) : "";
            if (l) switch (l[2]) {
                case"visIdx":
                case"visible":
                    var u = parseInt(l[1], 10);
                    if (u < 0) {
                        var c = t.map(r, function (t, e) {
                            return t.bVisible ? e : null
                        });
                        return [c[c.length + u]]
                    }
                    return [f(e, u)];
                case"name":
                    return t.map(o, function (t, e) {
                        return t === l[1] ? e : null
                    });
                default:
                    return []
            }
            if (n.nodeName && n._DT_CellIndex) return [n._DT_CellIndex.column];
            var h = t(a).filter(n).map(function () {
                return t.inArray(this, a)
            }).toArray();
            if (h.length || !n.nodeName) return h;
            var p = t(n).closest("*[data-dt-column]");
            return p.length ? [p.data("dt-column")] : []
        };
        return De("column", n, s, e, i)
    }, Qe = function (e, n, r) {
        var o, a, s, d, l = e.aoColumns, u = l[n], c = e.aoData;
        if (r === i) return u.bVisible;
        if (u.bVisible !== r) {
            if (r) {
                var h = t.inArray(!0, de(l, "bVisible"), n + 1);
                for (a = 0, s = c.length; a < s; a++) d = c[a].nTr, o = c[a].anCells, d && d.insertBefore(o[n], o[h] || null)
            } else t(de(e.aoData, "anCells", n)).detach();
            u.bVisible = r, R(e, e.aoHeader), R(e, e.aoFooter), It(e)
        }
    };
    qt("columns()", function (e, n) {
        e === i ? e = "" : t.isPlainObject(e) && (n = e, e = ""), n = _e(n);
        var r = this.iterator("table", function (t) {
            return Be(t, e, n)
        }, 1);
        return r.selector.cols = e, r.selector.opts = n, r
    }), Vt("columns().header()", "column().header()", function (t, e) {
        return this.iterator("column", function (t, e) {
            return t.aoColumns[e].nTh
        }, 1)
    }), Vt("columns().footer()", "column().footer()", function (t, e) {
        return this.iterator("column", function (t, e) {
            return t.aoColumns[e].nTf
        }, 1)
    }), Vt("columns().data()", "column().data()", function () {
        return this.iterator("column-rows", Fe, 1)
    }), Vt("columns().dataSrc()", "column().dataSrc()", function () {
        return this.iterator("column", function (t, e) {
            return t.aoColumns[e].mData
        }, 1)
    }), Vt("columns().cache()", "column().cache()", function (t) {
        return this.iterator("column-rows", function (e, n, i, r, o) {
            return le(e.aoData, o, "search" === t ? "_aFilterData" : "_aSortData", n)
        }, 1)
    }), Vt("columns().nodes()", "column().nodes()", function () {
        return this.iterator("column-rows", function (t, e, n, i, r) {
            return le(t.aoData, r, "anCells", e)
        }, 1)
    }), Vt("columns().visible()", "column().visible()", function (t, e) {
        var n = this.iterator("column", function (e, n) {
            return t === i ? e.aoColumns[n].bVisible : void Qe(e, n, t)
        });
        return t !== i && (this.iterator("column", function (n, i) {
            Rt(n, null, "column-visibility", [n, i, t, e])
        }), (e === i || e) && this.columns.adjust()), n
    }), Vt("columns().indexes()", "column().index()", function (t) {
        return this.iterator("column", function (e, n) {
            return "visible" === t ? g(e, n) : n
        }, 1)
    }), qt("columns.adjust()", function () {
        return this.iterator("table", function (t) {
            p(t)
        }, 1)
    }), qt("column.index()", function (t, e) {
        if (0 !== this.context.length) {
            var n = this.context[0];
            if ("fromVisible" === t || "toData" === t) return f(n, e);
            if ("fromData" === t || "toVisible" === t) return g(n, e)
        }
    }), qt("column()", function (t, e) {
        return Ie(this.columns(t, e))
    });
    var Ue = function (e, n, r) {
        var o, a, s, d, l, u, c, h = e.aoData, p = Ae(e, r), f = ce(le(h, p, "anCells")), g = t([].concat.apply([], f)),
            $ = e.aoColumns.length, m = function (n) {
                var r = "function" == typeof n;
                if (null === n || n === i || r) {
                    for (a = [], s = 0, d = p.length; s < d; s++) for (o = p[s], l = 0; l < $; l++) u = {
                        row: o,
                        column: l
                    }, r ? (c = h[o], n(u, S(e, o, l), c.anCells ? c.anCells[l] : null) && a.push(u)) : a.push(u);
                    return a
                }
                if (t.isPlainObject(n)) return [n];
                var f = g.filter(n).map(function (t, e) {
                    return {row: e._DT_CellIndex.row, column: e._DT_CellIndex.column}
                }).toArray();
                return f.length || !n.nodeName ? f : (c = t(n).closest("*[data-dt-row]"), c.length ? [{
                    row: c.data("dt-row"),
                    column: c.data("dt-column")
                }] : [])
            };
        return De("cell", n, m, e, r)
    };
    qt("cells()", function (e, n, r) {
        if (t.isPlainObject(e) && (e.row === i ? (r = e, e = null) : (r = n, n = null)), t.isPlainObject(n) && (r = n, n = null), null === n || n === i) return this.iterator("table", function (t) {
            return Ue(t, e, _e(r))
        });
        var o, a, s, d, l, u = this.columns(n, r), c = this.rows(e, r), h = this.iterator("table", function (t, e) {
            for (o = [], a = 0, s = c[e].length; a < s; a++) for (d = 0, l = u[e].length; d < l; d++) o.push({
                row: c[e][a],
                column: u[e][d]
            });
            return o
        }, 1);
        return t.extend(h.selector, {cols: n, rows: e, opts: r}), h
    }), Vt("cells().nodes()", "cell().node()", function () {
        return this.iterator("cell", function (t, e, n) {
            var r = t.aoData[e];
            return r && r.anCells ? r.anCells[n] : i
        }, 1)
    }), qt("cells().data()", function () {
        return this.iterator("cell", function (t, e, n) {
            return S(t, e, n)
        }, 1)
    }), Vt("cells().cache()", "cell().cache()", function (t) {
        return t = "search" === t ? "_aFilterData" : "_aSortData", this.iterator("cell", function (e, n, i) {
            return e.aoData[n][t][i]
        }, 1)
    }), Vt("cells().render()", "cell().render()", function (t) {
        return this.iterator("cell", function (e, n, i) {
            return S(e, n, i, t)
        }, 1)
    }), Vt("cells().indexes()", "cell().index()", function () {
        return this.iterator("cell", function (t, e, n) {
            return {row: e, column: n, columnVisible: g(t, n)}
        }, 1)
    }), Vt("cells().invalidate()", "cell().invalidate()", function (t) {
        return this.iterator("cell", function (e, n, i) {
            L(e, n, t, i)
        })
    }), qt("cell()", function (t, e, n) {
        return Ie(this.cells(t, e, n))
    }), qt("cell().data()", function (t) {
        var e = this.context, n = this[0];
        return t === i ? e.length && n.length ? S(e[0], n[0].row, n[0].column) : i : (T(e[0], n[0].row, n[0].column, t), L(e[0], n[0].row, "data", n[0].column), this)
    }), qt("order()", function (e, n) {
        var r = this.context;
        return e === i ? 0 !== r.length ? r[0].aaSorting : i : ("number" == typeof e ? e = [[e, n]] : e.length && !t.isArray(e[0]) && (e = Array.prototype.slice.call(arguments)), this.iterator("table", function (t) {
            t.aaSorting = e.slice()
        }))
    }), qt("order.listener()", function (t, e, n) {
        return this.iterator("table", function (i) {
            kt(i, t, e, n)
        })
    }), qt("order.fixed()", function (e) {
        if (!e) {
            var n = this.context, r = n.length ? n[0].aaSortingFixed : i;
            return t.isArray(r) ? {pre: r} : r
        }
        return this.iterator("table", function (n) {
            n.aaSortingFixed = t.extend(!0, {}, e)
        })
    }), qt(["columns().order()", "column().order()"], function (e) {
        var n = this;
        return this.iterator("table", function (i, r) {
            var o = [];
            t.each(n[r], function (t, n) {
                o.push([n, e])
            }), i.aaSorting = o
        })
    }), qt("search()", function (e, n, r, o) {
        var a = this.context;
        return e === i ? 0 !== a.length ? a[0].oPreviousSearch.sSearch : i : this.iterator("table", function (i) {
            i.oFeatures.bFilter && K(i, t.extend({}, i.oPreviousSearch, {
                sSearch: e + "",
                bRegex: null !== n && n,
                bSmart: null === r || r,
                bCaseInsensitive: null === o || o
            }), 1)
        })
    }), Vt("columns().search()", "column().search()", function (e, n, r, o) {
        return this.iterator("column", function (a, s) {
            var d = a.aoPreSearchCols;
            return e === i ? d[s].sSearch : void(a.oFeatures.bFilter && (t.extend(d[s], {
                sSearch: e + "",
                bRegex: null !== n && n,
                bSmart: null === r || r,
                bCaseInsensitive: null === o || o
            }), K(a, a.oPreviousSearch, 1)))
        })
    }), qt("state()", function () {
        return this.context.length ? this.context[0].oSavedState : null
    }), qt("state.clear()", function () {
        return this.iterator("table", function (t) {
            t.fnStateSaveCallback.call(t.oInstance, t, {})
        })
    }), qt("state.loaded()", function () {
        return this.context.length ? this.context[0].oLoadedState : null
    }), qt("state.save()", function () {
        return this.iterator("table", function (t) {
            It(t)
        })
    }), Gt.versionCheck = Gt.fnVersionCheck = function (t) {
        for (var e, n, i = Gt.version.split("."), r = t.split("."), o = 0, a = r.length; o < a; o++) if (e = parseInt(i[o], 10) || 0, n = parseInt(r[o], 10) || 0, e !== n) return e > n;
        return !0
    }, Gt.isDataTable = Gt.fnIsDataTable = function (e) {
        var n = t(e).get(0), i = !1;
        return t.each(Gt.settings, function (e, r) {
            var o = r.nScrollHead ? t("table", r.nScrollHead)[0] : null,
                a = r.nScrollFoot ? t("table", r.nScrollFoot)[0] : null;
            r.nTable !== n && o !== n && a !== n || (i = !0)
        }), i
    }, Gt.tables = Gt.fnTables = function (e) {
        var n = !1;
        t.isPlainObject(e) && (n = e.api, e = e.visible);
        var i = t.map(Gt.settings, function (n) {
            if (!e || e && t(n.nTable).is(":visible")) return n.nTable
        });
        return n ? new zt(i) : i
    }, Gt.camelToHungarian = o, qt("$()", function (e, n) {
        var i = this.rows(n).nodes(), r = t(i);
        return t([].concat(r.filter(e).toArray(), r.find(e).toArray()))
    }), t.each(["on", "one", "off"], function (e, n) {
        qt(n + "()", function () {
            var e = Array.prototype.slice.call(arguments);
            e[0].match(/\.dt\b/) || (e[0] += ".dt");
            var i = t(this.tables().nodes());
            return i[n].apply(i, e), this
        })
    }), qt("clear()", function () {
        return this.iterator("table", function (t) {
            A(t)
        })
    }), qt("settings()", function () {
        return new zt(this.context, this.context)
    }), qt("init()", function () {
        var t = this.context;
        return t.length ? t[0].oInit : null
    }), qt("data()", function () {
        return this.iterator("table", function (t) {
            return de(t.aoData, "_aData")
        }).flatten()
    }), qt("destroy()", function (n) {
        return n = n || !1, this.iterator("table", function (i) {
            var r, o = i.nTableWrapper.parentNode, a = i.oClasses, s = i.nTable, d = i.nTBody, l = i.nTHead,
                u = i.nTFoot, c = t(s), h = t(d), p = t(i.nTableWrapper), f = t.map(i.aoData, function (t) {
                    return t.nTr
                });
            i.bDestroying = !0, Rt(i, "aoDestroyCallback", "destroy", [i]), n || new zt(i).columns().visible(!0), p.unbind(".DT").find(":not(tbody *)").unbind(".DT"), t(e).unbind(".DT-" + i.sInstance), s != l.parentNode && (c.children("thead").detach(), c.append(l)), u && s != u.parentNode && (c.children("tfoot").detach(), c.append(u)), i.aaSorting = [], i.aaSortingFixed = [], Dt(i), t(f).removeClass(i.asStripeClasses.join(" ")), t("th, td", l).removeClass(a.sSortable + " " + a.sSortableAsc + " " + a.sSortableDesc + " " + a.sSortableNone), i.bJUI && (t("th span." + a.sSortIcon + ", td span." + a.sSortIcon, l).detach(), t("th, td", l).each(function () {
                var e = t("div." + a.sSortJUIWrapper, this);
                t(this).append(e.contents()), e.detach()
            })), h.children().detach(), h.append(f);
            var g = n ? "remove" : "detach";
            c[g](), p[g](), !n && o && (o.insertBefore(s, i.nTableReinsertBefore), c.css("width", i.sDestroyWidth).removeClass(a.sTable), r = i.asDestroyStripes.length, r && h.children().each(function (e) {
                t(this).addClass(i.asDestroyStripes[e % r])
            }));
            var $ = t.inArray(i, Gt.settings);
            $ !== -1 && Gt.settings.splice($, 1)
        })
    }), t.each(["column", "row", "cell"], function (t, e) {
        qt(e + "s().every()", function (t) {
            var n = this.selector.opts, r = this;
            return this.iterator(e, function (o, a, s, d, l) {
                t.call(r[e](a, "cell" === e ? s : n, "cell" === e ? n : i), a, s, d, l)
            })
        })
    }), qt("i18n()", function (e, n, r) {
        var o = this.context[0], a = D(e)(o.oLanguage);
        return a === i && (a = n), r !== i && t.isPlainObject(a) && (a = a[r] !== i ? a[r] : a._), a.replace("%d", r)
    }), Gt.version = "1.10.12", Gt.settings = [], Gt.models = {}, Gt.models.oSearch = {
        bCaseInsensitive: !0,
        sSearch: "",
        bRegex: !1,
        bSmart: !0
    }, Gt.models.oRow = {
        nTr: null,
        anCells: null,
        _aData: [],
        _aSortData: null,
        _aFilterData: null,
        _sFilterRow: null,
        _sRowStripe: "",
        src: null,
        idx: -1
    }, Gt.models.oColumn = {
        idx: null,
        aDataSort: null,
        asSorting: null,
        bSearchable: null,
        bSortable: null,
        bVisible: null,
        _sManualType: null,
        _bAttrSrc: !1,
        fnCreatedCell: null,
        fnGetData: null,
        fnSetData: null,
        mData: null,
        mRender: null,
        nTh: null,
        nTf: null,
        sClass: null,
        sContentPadding: null,
        sDefaultContent: null,
        sName: null,
        sSortDataType: "std",
        sSortingClass: null,
        sSortingClassJUI: null,
        sTitle: null,
        sType: null,
        sWidth: null,
        sWidthOrig: null
    }, Gt.defaults = {
        aaData: null,
        aaSorting: [[0, "asc"]],
        aaSortingFixed: [],
        ajax: null,
        aLengthMenu: [10, 25, 50, 100],
        aoColumns: null,
        aoColumnDefs: null,
        aoSearchCols: [],
        asStripeClasses: null,
        bAutoWidth: !0,
        bDeferRender: !1,
        bDestroy: !1,
        bFilter: !0,
        bInfo: !0,
        bJQueryUI: !1,
        bLengthChange: !0,
        bPaginate: !0,
        bProcessing: !1,
        bRetrieve: !1,
        bScrollCollapse: !1,
        bServerSide: !1,
        bSort: !0,
        bSortMulti: !0,
        bSortCellsTop: !1,
        bSortClasses: !0,
        bStateSave: !1,
        fnCreatedRow: null,
        fnDrawCallback: null,
        fnFooterCallback: null,
        fnFormatNumber: function (t) {
            return t.toString().replace(/\B(?=(\d{3})+(?!\d))/g, this.oLanguage.sThousands)
        },
        fnHeaderCallback: null,
        fnInfoCallback: null,
        fnInitComplete: null,
        fnPreDrawCallback: null,
        fnRowCallback: null,
        fnServerData: null,
        fnServerParams: null,
        fnStateLoadCallback: function (t) {
            try {
                return JSON.parse((t.iStateDuration === -1 ? sessionStorage : localStorage).getItem("DataTables_" + t.sInstance + "_" + location.pathname))
            } catch (t) {
            }
        },
        fnStateLoadParams: null,
        fnStateLoaded: null,
        fnStateSaveCallback: function (t, e) {
            try {
                (t.iStateDuration === -1 ? sessionStorage : localStorage).setItem("DataTables_" + t.sInstance + "_" + location.pathname, JSON.stringify(e))
            } catch (t) {
            }
        },
        fnStateSaveParams: null,
        iStateDuration: 7200,
        iDeferLoading: null,
        iDisplayLength: 10,
        iDisplayStart: 0,
        iTabIndex: 0,
        oClasses: {},
        oLanguage: {
            oAria: {
                sSortAscending: ": activate to sort column ascending",
                sSortDescending: ": activate to sort column descending"
            },
            oPaginate: {sFirst: "First", sLast: "Last", sNext: "Next", sPrevious: "Previous"},
            sEmptyTable: "No data available in table",
            sInfo: "Showing _START_ to _END_ of _TOTAL_ entries",
            sInfoEmpty: "Showing 0 to 0 of 0 entries",
            sInfoFiltered: "(filtered from _MAX_ total entries)",
            sInfoPostFix: "",
            sDecimal: "",
            sThousands: ",",
            sLengthMenu: "Show _MENU_ entries",
            sLoadingRecords: "Loading...",
            sProcessing: "Processing...",
            sSearch: "Search:",
            sSearchPlaceholder: "",
            sUrl: "",
            sZeroRecords: "No matching records found"
        },
        oSearch: t.extend({}, Gt.models.oSearch),
        sAjaxDataProp: "data",
        sAjaxSource: null,
        sDom: "lfrtip",
        searchDelay: null,
        sPaginationType: "simple_numbers",
        sScrollX: "",
        sScrollXInner: "",
        sScrollY: "",
        sServerMethod: "GET",
        renderer: null,
        rowId: "DT_RowId"
    }, r(Gt.defaults), Gt.defaults.column = {
        aDataSort: null,
        iDataSort: -1,
        asSorting: ["asc", "desc"],
        bSearchable: !0,
        bSortable: !0,
        bVisible: !0,
        fnCreatedCell: null,
        mData: null,
        mRender: null,
        sCellType: "td",
        sClass: "",
        sContentPadding: "",
        sDefaultContent: null,
        sName: "",
        sSortDataType: "std",
        sTitle: null,
        sType: null,
        sWidth: null
    }, r(Gt.defaults.column), Gt.models.oSettings = {
        oFeatures: {
            bAutoWidth: null,
            bDeferRender: null,
            bFilter: null,
            bInfo: null,
            bLengthChange: null,
            bPaginate: null,
            bProcessing: null,
            bServerSide: null,
            bSort: null,
            bSortMulti: null,
            bSortClasses: null,
            bStateSave: null
        },
        oScroll: {bCollapse: null, iBarWidth: 0, sX: null, sXInner: null, sY: null},
        oLanguage: {fnInfoCallback: null},
        oBrowser: {bScrollOversize: !1, bScrollbarLeft: !1, bBounding: !1, barWidth: 0},
        ajax: null,
        aanFeatures: [],
        aoData: [],
        aiDisplay: [],
        aiDisplayMaster: [],
        aIds: {},
        aoColumns: [],
        aoHeader: [],
        aoFooter: [],
        oPreviousSearch: {},
        aoPreSearchCols: [],
        aaSorting: null,
        aaSortingFixed: [],
        asStripeClasses: null,
        asDestroyStripes: [],
        sDestroyWidth: 0,
        aoRowCallback: [],
        aoHeaderCallback: [],
        aoFooterCallback: [],
        aoDrawCallback: [],
        aoRowCreatedCallback: [],
        aoPreDrawCallback: [],
        aoInitComplete: [],
        aoStateSaveParams: [],
        aoStateLoadParams: [],
        aoStateLoaded: [],
        sTableId: "",
        nTable: null,
        nTHead: null,
        nTFoot: null,
        nTBody: null,
        nTableWrapper: null,
        bDeferLoading: !1,
        bInitialised: !1,
        aoOpenRows: [],
        sDom: null,
        searchDelay: null,
        sPaginationType: "two_button",
        iStateDuration: 0,
        aoStateSave: [],
        aoStateLoad: [],
        oSavedState: null,
        oLoadedState: null,
        sAjaxSource: null,
        sAjaxDataProp: null,
        bAjaxDataGet: !0,
        jqXHR: null,
        json: i,
        oAjaxData: i,
        fnServerData: null,
        aoServerParams: [],
        sServerMethod: null,
        fnFormatNumber: null,
        aLengthMenu: null,
        iDraw: 0,
        bDrawing: !1,
        iDrawError: -1,
        _iDisplayLength: 10,
        _iDisplayStart: 0,
        _iRecordsTotal: 0,
        _iRecordsDisplay: 0,
        bJUI: null,
        oClasses: {},
        bFiltered: !1,
        bSorted: !1,
        bSortCellsTop: null,
        oInit: null,
        aoDestroyCallback: [],
        fnRecordsTotal: function () {
            return "ssp" == Ft(this) ? 1 * this._iRecordsTotal : this.aiDisplayMaster.length
        },
        fnRecordsDisplay: function () {
            return "ssp" == Ft(this) ? 1 * this._iRecordsDisplay : this.aiDisplay.length
        },
        fnDisplayEnd: function () {
            var t = this._iDisplayLength, e = this._iDisplayStart, n = e + t, i = this.aiDisplay.length,
                r = this.oFeatures, o = r.bPaginate;
            return r.bServerSide ? o === !1 || t === -1 ? e + i : Math.min(e + t, this._iRecordsDisplay) : !o || n > i || t === -1 ? i : n
        },
        oInstance: null,
        sInstance: null,
        iTabIndex: 0,
        nScrollHead: null,
        nScrollFoot: null,
        aLastSort: [],
        oPlugins: {},
        rowIdFn: null,
        rowId: null
    }, Gt.ext = Wt = {
        buttons: {},
        classes: {},
        builder: "-source-",
        errMode: "alert",
        feature: [],
        search: [],
        selector: {cell: [], column: [], row: []},
        internal: {},
        legacy: {ajax: null},
        pager: {},
        renderer: {pageButton: {}, header: {}},
        order: {},
        type: {detect: [], search: {}, order: {}},
        _unique: 0,
        fnVersionCheck: Gt.fnVersionCheck,
        iApiIndex: 0,
        oJUIClasses: {},
        sVersion: Gt.version
    }, t.extend(Wt, {
        afnFiltering: Wt.search,
        aTypes: Wt.type.detect,
        ofnSearch: Wt.type.search,
        oSort: Wt.type.order,
        afnSortData: Wt.order,
        aoFeatures: Wt.feature,
        oApi: Wt.internal,
        oStdClasses: Wt.classes,
        oPagination: Wt.pager
    }), t.extend(Gt.ext.classes, {
        sTable: "dataTable",
        sNoFooter: "no-footer",
        sPageButton: "paginate_button",
        sPageButtonActive: "current",
        sPageButtonDisabled: "disabled",
        sStripeOdd: "odd",
        sStripeEven: "even",
        sRowEmpty: "dataTables_empty",
        sWrapper: "dataTables_wrapper",
        sFilter: "dataTables_filter",
        sInfo: "dataTables_info",
        sPaging: "dataTables_paginate paging_",
        sLength: "dataTables_length",
        sProcessing: "dataTables_processing",
        sSortAsc: "sorting_asc",
        sSortDesc: "sorting_desc",
        sSortable: "sorting",
        sSortableAsc: "sorting_asc_disabled",
        sSortableDesc: "sorting_desc_disabled",
        sSortableNone: "sorting_disabled",
        sSortColumn: "sorting_",
        sFilterInput: "",
        sLengthSelect: "",
        sScrollWrapper: "dataTables_scroll",
        sScrollHead: "dataTables_scrollHead",
        sScrollHeadInner: "dataTables_scrollHeadInner",
        sScrollBody: "dataTables_scrollBody",
        sScrollFoot: "dataTables_scrollFoot",
        sScrollFootInner: "dataTables_scrollFootInner",
        sHeaderTH: "",
        sFooterTH: "",
        sSortJUIAsc: "",
        sSortJUIDesc: "",
        sSortJUI: "",
        sSortJUIAscAllowed: "",
        sSortJUIDescAllowed: "",
        sSortJUIWrapper: "",
        sSortIcon: "",
        sJUIHeader: "",
        sJUIFooter: ""
    }), function () {
        var e = "";
        e = "";
        var n = e + "ui-state-default", i = e + "css_right ui-icon ui-icon-",
            r = e + "fg-toolbar ui-toolbar ui-widget-header ui-helper-clearfix";
        t.extend(Gt.ext.oJUIClasses, Gt.ext.classes, {
            sPageButton: "fg-button ui-button " + n,
            sPageButtonActive: "ui-state-disabled",
            sPageButtonDisabled: "ui-state-disabled",
            sPaging: "dataTables_paginate fg-buttonset ui-buttonset fg-buttonset-multi ui-buttonset-multi paging_",
            sSortAsc: n + " sorting_asc",
            sSortDesc: n + " sorting_desc",
            sSortable: n + " sorting",
            sSortableAsc: n + " sorting_asc_disabled",
            sSortableDesc: n + " sorting_desc_disabled",
            sSortableNone: n + " sorting_disabled",
            sSortJUIAsc: i + "triangle-1-n",
            sSortJUIDesc: i + "triangle-1-s",
            sSortJUI: i + "carat-2-n-s",
            sSortJUIAscAllowed: i + "carat-1-n",
            sSortJUIDescAllowed: i + "carat-1-s",
            sSortJUIWrapper: "DataTables_sort_wrapper",
            sSortIcon: "DataTables_sort_icon",
            sScrollHead: "dataTables_scrollHead " + n,
            sScrollFoot: "dataTables_scrollFoot " + n,
            sHeaderTH: n,
            sFooterTH: n,
            sJUIHeader: r + " ui-corner-tl ui-corner-tr",
            sJUIFooter: r + " ui-corner-bl ui-corner-br"
        })
    }();
    var We = Gt.ext.pager;
    t.extend(We, {
        simple: function (t, e) {
            return ["previous", "next"]
        }, full: function (t, e) {
            return ["first", "previous", "next", "last"]
        }, numbers: function (t, e) {
            return [Bt(t, e)]
        }, simple_numbers: function (t, e) {
            return ["previous", Bt(t, e), "next"]
        }, full_numbers: function (t, e) {
            return ["first", "previous", Bt(t, e), "next", "last"]
        }, _numbers: Bt, numbers_length: 7
    }), t.extend(!0, Gt.ext.renderer, {
        pageButton: {
            _: function (e, i, r, o, a, s) {
                var d, l, u, c = e.oClasses, h = e.oLanguage.oPaginate, p = e.oLanguage.oAria.paginate || {}, f = 0,
                    g = function (n, i) {
                        var o, u, $, m, v = function (t) {
                            ct(e, t.data.action, !0)
                        };
                        for (o = 0, u = i.length; o < u; o++) if (m = i[o], t.isArray(m)) {
                            var y = t("<" + (m.DT_el || "div") + "/>").appendTo(n);
                            g(y, m)
                        } else {
                            switch (d = null, l = "", m) {
                                case"ellipsis":
                                    n.append('<span class="ellipsis">&#x2026;</span>');
                                    break;
                                case"first":
                                    d = h.sFirst, l = m + (a > 0 ? "" : " " + c.sPageButtonDisabled);
                                    break;
                                case"previous":
                                    d = h.sPrevious, l = m + (a > 0 ? "" : " " + c.sPageButtonDisabled);
                                    break;
                                case"next":
                                    d = h.sNext, l = m + (a < s - 1 ? "" : " " + c.sPageButtonDisabled);
                                    break;
                                case"last":
                                    d = h.sLast, l = m + (a < s - 1 ? "" : " " + c.sPageButtonDisabled);
                                    break;
                                default:
                                    d = m + 1, l = a === m ? c.sPageButtonActive : ""
                            }
                            null !== d && ($ = t("<a>", {
                                class: c.sPageButton + " " + l,
                                "aria-controls": e.sTableId,
                                "aria-label": p[m],
                                "data-dt-idx": f,
                                tabindex: e.iTabIndex,
                                id: 0 === r && "string" == typeof m ? e.sTableId + "_" + m : null
                            }).html(d).appendTo(n), Pt($, {action: m}, v), f++)
                        }
                    };
                try {
                    u = t(i).find(n.activeElement).data("dt-idx")
                } catch (t) {
                }
                g(t(i).empty(), o), u && t(i).find("[data-dt-idx=" + u + "]").focus()
            }
        }
    }), t.extend(Gt.ext.type.detect, [function (t, e) {
        var n = e.oLanguage.sDecimal;
        return oe(t, n) ? "num" + n : null
    }, function (t, e) {
        if (t && !(t instanceof Date) && (!Yt.test(t) || !Zt.test(t))) return null;
        var n = Date.parse(t);
        return null !== n && !isNaN(n) || ne(t) ? "date" : null
    }, function (t, e) {
        var n = e.oLanguage.sDecimal;
        return oe(t, n, !0) ? "num-fmt" + n : null
    }, function (t, e) {
        var n = e.oLanguage.sDecimal;
        return se(t, n) ? "html-num" + n : null
    }, function (t, e) {
        var n = e.oLanguage.sDecimal;
        return se(t, n, !0) ? "html-num-fmt" + n : null
    }, function (t, e) {
        return ne(t) || "string" == typeof t && t.indexOf("<") !== -1 ? "html" : null
    }]), t.extend(Gt.ext.type.search, {
        html: function (t) {
            return ne(t) ? t : "string" == typeof t ? t.replace(Jt, " ").replace(Xt, "") : ""
        }, string: function (t) {
            return ne(t) ? t : "string" == typeof t ? t.replace(Jt, " ") : t
        }
    });
    var ze = function (t, e, n, i) {
        return 0 === t || t && "-" !== t ? (e && (t = re(t, e)), t.replace && (n && (t = t.replace(n, "")), i && (t = t.replace(i, ""))), 1 * t) : -(1 / 0)
    };
    t.extend(Wt.type.order, {
        "date-pre": function (t) {
            return Date.parse(t) || 0
        }, "html-pre": function (t) {
            return ne(t) ? "" : t.replace ? t.replace(/<.*?>/g, "").toLowerCase() : t + ""
        }, "string-pre": function (t) {
            return ne(t) ? "" : "string" == typeof t ? t.toLowerCase() : t.toString ? t.toString() : ""
        }, "string-asc": function (t, e) {
            return t < e ? -1 : t > e ? 1 : 0
        }, "string-desc": function (t, e) {
            return t < e ? 1 : t > e ? -1 : 0
        }
    }), Qt(""), t.extend(!0, Gt.ext.renderer, {
        header: {
            _: function (e, n, i, r) {
                t(e.nTable).on("order.dt.DT", function (t, o, a, s) {
                    if (e === o) {
                        var d = i.idx;
                        n.removeClass(i.sSortingClass + " " + r.sSortAsc + " " + r.sSortDesc).addClass("asc" == s[d] ? r.sSortAsc : "desc" == s[d] ? r.sSortDesc : i.sSortingClass)
                    }
                })
            }, jqueryui: function (e, n, i, r) {
                t("<div/>").addClass(r.sSortJUIWrapper).append(n.contents()).append(t("<span/>").addClass(r.sSortIcon + " " + i.sSortingClassJUI)).appendTo(n), t(e.nTable).on("order.dt.DT", function (t, o, a, s) {
                    if (e === o) {
                        var d = i.idx;
                        n.removeClass(r.sSortAsc + " " + r.sSortDesc).addClass("asc" == s[d] ? r.sSortAsc : "desc" == s[d] ? r.sSortDesc : i.sSortingClass), n.find("span." + r.sSortIcon).removeClass(r.sSortJUIAsc + " " + r.sSortJUIDesc + " " + r.sSortJUI + " " + r.sSortJUIAscAllowed + " " + r.sSortJUIDescAllowed).addClass("asc" == s[d] ? r.sSortJUIAsc : "desc" == s[d] ? r.sSortJUIDesc : i.sSortingClassJUI)
                    }
                })
            }
        }
    });
    var qe = function (t) {
        return "string" == typeof t ? t.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;") : t
    };
    return Gt.render = {
        number: function (t, e, n, i, r) {
            return {
                display: function (o) {
                    if ("number" != typeof o && "string" != typeof o) return o;
                    var a = o < 0 ? "-" : "", s = parseFloat(o);
                    if (isNaN(s)) return qe(o);
                    o = Math.abs(s);
                    var d = parseInt(o, 10), l = n ? e + (o - d).toFixed(n).substring(2) : "";
                    return a + (i || "") + d.toString().replace(/\B(?=(\d{3})+(?!\d))/g, t) + l + (r || "")
                }
            }
        }, text: function () {
            return {display: qe}
        }
    }, t.extend(Gt.ext.internal, {
        _fnExternApiFunc: Ut,
        _fnBuildAjax: U,
        _fnAjaxUpdate: W,
        _fnAjaxParameters: z,
        _fnAjaxUpdateDraw: q,
        _fnAjaxDataSrc: V,
        _fnAddColumn: c,
        _fnColumnOptions: h,
        _fnAdjustColumnSizing: p,
        _fnVisibleToColumnIndex: f,
        _fnColumnIndexToVisible: g,
        _fnVisbleColumns: $,
        _fnGetColumns: m,
        _fnColumnTypes: v,
        _fnApplyColumnDefs: y,
        _fnHungarianMap: r,
        _fnCamelToHungarian: o,
        _fnLanguageCompat: a,
        _fnBrowserDetect: l,
        _fnAddData: b,
        _fnAddTr: C,
        _fnNodeToDataIndex: w,
        _fnNodeToColumnIndex: x,
        _fnGetCellData: S,
        _fnSetCellData: T,
        _fnSplitObjNotation: k,
        _fnGetObjectDataFn: D,
        _fnSetObjectDataFn: _,
        _fnGetDataMaster: I,
        _fnClearTable: A,
        _fnDeleteIndex: j,
        _fnInvalidate: L,
        _fnGetRowElements: N,
        _fnCreateTr: E,
        _fnBuildHead: M,
        _fnDrawHead: R,
        _fnDraw: O,
        _fnReDraw: H,
        _fnAddOptionsHtml: F,
        _fnDetectHeader: B,
        _fnGetUniqueThs: Q,
        _fnFeatureHtmlFilter: G,
        _fnFilterComplete: K,
        _fnFilterCustom: J,
        _fnFilterColumn: X,
        _fnFilter: Y,
        _fnFilterCreateSearch: Z,
        _fnEscapeRegex: me,
        _fnFilterData: tt,
        _fnFeatureHtmlInfo: it,
        _fnUpdateInfo: rt,
        _fnInfoMacros: ot,
        _fnInitialise: at,
        _fnInitComplete: st,
        _fnLengthChange: dt,
        _fnFeatureHtmlLength: lt,
        _fnFeatureHtmlPaginate: ut,
        _fnPageChange: ct,
        _fnFeatureHtmlProcessing: ht,
        _fnProcessingDisplay: pt,
        _fnFeatureHtmlTable: ft,
        _fnScrollDraw: gt,
        _fnApplyToChildren: $t,
        _fnCalculateColumnWidths: mt,
        _fnThrottle: Ce,
        _fnConvertToWidth: vt,
        _fnGetWidestNode: yt,
        _fnGetMaxLenString: bt,
        _fnStringToCss: Ct,
        _fnSortFlatten: wt,
        _fnSort: xt,
        _fnSortAria: St,
        _fnSortListener: Tt,
        _fnSortAttachListener: kt,
        _fnSortingClasses: Dt,
        _fnSortData: _t,
        _fnSaveState: It,
        _fnLoadState: At,
        _fnSettingsFromNode: jt,
        _fnLog: Lt,
        _fnMap: Nt,
        _fnBindAction: Pt,
        _fnCallbackReg: Mt,
        _fnCallbackFire: Rt,
        _fnLengthOverflow: Ot,
        _fnRenderer: Ht,
        _fnDataSource: Ft,
        _fnRowAttributes: P,
        _fnCalculateEnd: function () {
        }
    }), t.fn.dataTable = Gt, Gt.$ = t, t.fn.dataTableSettings = Gt.settings, t.fn.dataTableExt = Gt.ext, t.fn.DataTable = function (e) {
        return t(this).dataTable(e).api()
    }, t.each(Gt, function (e, n) {
        t.fn.DataTable[e] = n
    }), t.fn.dataTable
}), function (t) {
    "function" == typeof define && define.amd ? define(["jquery", "datatables.net"], function (e) {
        return t(e, window, document)
    }) : "object" == typeof exports ? module.exports = function (e, n) {
        return e || (e = window), n && n.fn.dataTable || (n = require("datatables.net")(e, n).$), t(n, e, e.document)
    } : t(jQuery, window, document)
}(function (t, e, n, i) {
    "use strict";
    var r = t.fn.dataTable;
    return t.extend(!0, r.defaults, {
        dom: "<'row'<'col-sm-6'l><'col-sm-6'f>><'row'<'col-sm-12'tr>><'row'<'col-sm-5'i><'col-sm-7'p>>",
        renderer: "bootstrap"
    }), t.extend(r.ext.classes, {
        sWrapper: "dataTables_wrapper form-inline dt-bootstrap",
        sFilterInput: "form-control input-sm",
        sLengthSelect: "form-control input-sm",
        sProcessing: "dataTables_processing panel panel-default"
    }), r.ext.renderer.pageButton.bootstrap = function (e, i, o, a, s, d) {
        var l, u, c, h = new r.Api(e), p = e.oClasses, f = e.oLanguage.oPaginate, g = e.oLanguage.oAria.paginate || {},
            $ = 0, m = function (n, i) {
                var r, a, c, v, y = function (e) {
                    e.preventDefault(), t(e.currentTarget).hasClass("disabled") || h.page() == e.data.action || h.page(e.data.action).draw("page")
                };
                for (r = 0, a = i.length; r < a; r++) if (v = i[r], t.isArray(v)) m(n, v); else {
                    switch (l = "", u = "", v) {
                        case"ellipsis":
                            l = "&#x2026;", u = "disabled";
                            break;
                        case"first":
                            l = f.sFirst, u = v + (s > 0 ? "" : " disabled");
                            break;
                        case"previous":
                            l = f.sPrevious, u = v + (s > 0 ? "" : " disabled");
                            break;
                        case"next":
                            l = f.sNext, u = v + (s < d - 1 ? "" : " disabled");
                            break;
                        case"last":
                            l = f.sLast, u = v + (s < d - 1 ? "" : " disabled");
                            break;
                        default:
                            l = v + 1, u = s === v ? "active" : ""
                    }
                    l && (c = t("<li>", {
                        class: p.sPageButton + " " + u,
                        id: 0 === o && "string" == typeof v ? e.sTableId + "_" + v : null
                    }).append(t("<a>", {
                        href: "#",
                        "aria-controls": e.sTableId,
                        "aria-label": g[v],
                        "data-dt-idx": $,
                        tabindex: e.iTabIndex
                    }).html(l)).appendTo(n), e.oApi._fnBindAction(c, {action: v}, y), $++)
                }
            };
        try {
            c = t(i).find(n.activeElement).data("dt-idx")
        } catch (t) {
        }
        m(t(i).empty().html('<ul class="pagination"/>').children("ul"), a), c && t(i).find("[data-dt-idx=" + c + "]").focus()
    }, r
}), function (t) {
    "function" == typeof define && define.amd ? define(["jquery", "datatables.net"], function (e) {
        return t(e, window, document)
    }) : "object" == typeof exports ? module.exports = function (e, n) {
        return e || (e = window), n && n.fn.dataTable || (n = require("datatables.net")(e, n).$), t(n, e, e.document)
    } : t(jQuery, window, document)
}(function (t, e, n, i) {
    "use strict";
    var r = t.fn.dataTable, o = function (e, n) {
        if (!r.versionCheck || !r.versionCheck("1.10.3")) throw"DataTables Responsive requires DataTables 1.10.3 or newer";
        this.s = {
            dt: new r.Api(e),
            columns: [],
            current: []
        }, this.s.dt.settings()[0].responsive || (n && "string" == typeof n.details ? n.details = {type: n.details} : n && n.details === !1 ? n.details = {type: !1} : n && n.details === !0 && (n.details = {type: "inline"}), this.c = t.extend(!0, {}, o.defaults, r.defaults.responsive, n), e.responsive = this, this._constructor())
    };
    t.extend(o.prototype, {
        _constructor: function () {
            var n = this, i = this.s.dt, o = i.settings()[0], a = t(e).width();
            i.settings()[0]._responsive = this, t(e).on("resize.dtr orientationchange.dtr", r.util.throttle(function () {
                var i = t(e).width();
                i !== a && (n._resize(), a = i)
            })), o.oApi._fnCallbackReg(o, "aoRowCreatedCallback", function (e, r, o) {
                t.inArray(!1, n.s.current) !== -1 && t("td, th", e).each(function (e) {
                    var r = i.column.index("toData", e);
                    n.s.current[r] === !1 && t(this).css("display", "none")
                })
            }), i.on("destroy.dtr", function () {
                i.off(".dtr"), t(i.table().body()).off(".dtr"), t(e).off("resize.dtr orientationchange.dtr"), t.each(n.s.current, function (t, e) {
                    e === !1 && n._setColumnVis(t, !0)
                })
            }), this.c.breakpoints.sort(function (t, e) {
                return t.width < e.width ? 1 : t.width > e.width ? -1 : 0
            }), this._classLogic(), this._resizeAuto();
            var s = this.c.details;
            s.type !== !1 && (n._detailsInit(), i.on("column-visibility.dtr", function (t, e, i, r) {
                n._classLogic(), n._resizeAuto(), n._resize()
            }), i.on("draw.dtr", function () {
                n._redrawChildren()
            }), t(i.table().node()).addClass("dtr-" + s.type)), i.on("column-reorder.dtr", function (t, e, i) {
                n._classLogic(), n._resizeAuto(), n._resize()
            }), i.on("column-sizing.dtr", function () {
                n._resizeAuto(), n._resize()
            }), i.on("init.dtr", function (e, r, o) {
                n._resizeAuto(), n._resize(), t.inArray(!1, n.s.current) && i.columns.adjust()
            }), this._resize()
        }, _columnsVisiblity: function (e) {
            var n, i, r = this.s.dt, o = this.s.columns, a = o.map(function (t, e) {
                return {columnIdx: e, priority: t.priority}
            }).sort(function (t, e) {
                return t.priority !== e.priority ? t.priority - e.priority : t.columnIdx - e.columnIdx
            }), s = t.map(o, function (n) {
                return (!n.auto || null !== n.minWidth) && (n.auto === !0 ? "-" : t.inArray(e, n.includeIn) !== -1)
            }), d = 0;
            for (n = 0, i = s.length; n < i; n++) s[n] === !0 && (d += o[n].minWidth);
            var l = r.settings()[0].oScroll, u = l.sY || l.sX ? l.iBarWidth : 0,
                c = r.table().container().offsetWidth - u, h = c - d;
            for (n = 0, i = s.length; n < i; n++) o[n].control && (h -= o[n].minWidth);
            var p = !1;
            for (n = 0, i = a.length; n < i; n++) {
                var f = a[n].columnIdx;
                "-" === s[f] && !o[f].control && o[f].minWidth && (p || h - o[f].minWidth < 0 ? (p = !0, s[f] = !1) : s[f] = !0, h -= o[f].minWidth)
            }
            var g = !1;
            for (n = 0, i = o.length; n < i; n++) if (!o[n].control && !o[n].never && !s[n]) {
                g = !0;
                break
            }
            for (n = 0, i = o.length; n < i; n++) o[n].control && (s[n] = g);
            return t.inArray(!0, s) === -1 && (s[0] = !0), s
        }, _classLogic: function () {
            var e = this, n = this.c.breakpoints, r = this.s.dt, o = r.columns().eq(0).map(function (e) {
                var n = this.column(e), o = n.header().className, a = r.settings()[0].aoColumns[e].responsivePriority;
                if (a === i) {
                    var s = t(n.header()).data("priority");
                    a = s !== i ? 1 * s : 1e4
                }
                return {className: o, includeIn: [], auto: !1, control: !1, never: !!o.match(/\bnever\b/), priority: a}
            }), a = function (e, n) {
                var i = o[e].includeIn;
                t.inArray(n, i) === -1 && i.push(n)
            }, s = function (t, i, r, s) {
                var d, l, u;
                if (r) {
                    if ("max-" === r) for (d = e._find(i).width, l = 0, u = n.length; l < u; l++) n[l].width <= d && a(t, n[l].name); else if ("min-" === r) for (d = e._find(i).width, l = 0, u = n.length; l < u; l++) n[l].width >= d && a(t, n[l].name); else if ("not-" === r) for (l = 0, u = n.length; l < u; l++) n[l].name.indexOf(s) === -1 && a(t, n[l].name)
                } else o[t].includeIn.push(i)
            };
            o.each(function (e, i) {
                for (var r = e.className.split(" "), o = !1, a = 0, d = r.length; a < d; a++) {
                    var l = t.trim(r[a]);
                    if ("all" === l) return o = !0, void(e.includeIn = t.map(n, function (t) {
                        return t.name
                    }));
                    if ("none" === l || e.never) return void(o = !0);
                    if ("control" === l) return o = !0, void(e.control = !0);
                    t.each(n, function (t, e) {
                        var n = e.name.split("-"),
                            r = new RegExp("(min\\-|max\\-|not\\-)?(" + n[0] + ")(\\-[_a-zA-Z0-9])?"), a = l.match(r);
                        a && (o = !0, a[2] === n[0] && a[3] === "-" + n[1] ? s(i, e.name, a[1], a[2] + a[3]) : a[2] !== n[0] || a[3] || s(i, e.name, a[1], a[2]))
                    })
                }
                o || (e.auto = !0)
            }), this.s.columns = o
        }, _detailsDisplay: function (e, n) {
            var i = this, r = this.s.dt, o = this.c.details;
            if (o && o.type !== !1) {
                var a = o.display(e, n, function () {
                    return o.renderer(r, e[0], i._detailsObj(e[0]))
                });
                a !== !0 && a !== !1 || t(r.table().node()).triggerHandler("responsive-display.dt", [r, e, a, n])
            }
        }, _detailsInit: function () {
            var e = this, n = this.s.dt, i = this.c.details;
            "inline" === i.type && (i.target = "td:first-child, th:first-child"), n.on("draw.dtr", function () {
                e._tabIndexes()
            }), e._tabIndexes(), t(n.table().body()).on("keyup.dtr", "td, th", function (e) {
                13 === e.keyCode && t(this).data("dtr-keyboard") && t(this).click()
            });
            var r = i.target, o = "string" == typeof r ? r : "td, th";
            t(n.table().body()).on("click.dtr mousedown.dtr mouseup.dtr", o, function (i) {
                if (t(n.table().node()).hasClass("collapsed") && n.row(t(this).closest("tr")).length) {
                    if ("number" == typeof r) {
                        var o = r < 0 ? n.columns().eq(0).length + r : r;
                        if (n.cell(this).index().column !== o) return
                    }
                    var a = n.row(t(this).closest("tr"));
                    "click" === i.type ? e._detailsDisplay(a, !1) : "mousedown" === i.type ? t(this).css("outline", "none") : "mouseup" === i.type && t(this).blur().css("outline", "")
                }
            })
        }, _detailsObj: function (e) {
            var n = this, i = this.s.dt;
            return t.map(this.s.columns, function (t, r) {
                if (!t.never && !t.control) return {
                    title: i.settings()[0].aoColumns[r].sTitle,
                    data: i.cell(e, r).render(n.c.orthogonal),
                    hidden: i.column(r).visible() && !n.s.current[r],
                    columnIndex: r,
                    rowIndex: e
                }
            })
        }, _find: function (t) {
            for (var e = this.c.breakpoints, n = 0, i = e.length; n < i; n++) if (e[n].name === t) return e[n]
        }, _redrawChildren: function () {
            var t = this, e = this.s.dt;
            e.rows({page: "current"}).iterator("row", function (n, i) {
                e.row(i);
                t._detailsDisplay(e.row(i), !0)
            })
        }, _resize: function () {
            var n, i, r = this, o = this.s.dt, a = t(e).width(), s = this.c.breakpoints, d = s[0].name,
                l = this.s.columns, u = this.s.current.slice();
            for (n = s.length - 1; n >= 0; n--) if (a <= s[n].width) {
                d = s[n].name;
                break
            }
            var c = this._columnsVisiblity(d);
            this.s.current = c;
            var h = !1;
            for (n = 0, i = l.length; n < i; n++) if (c[n] === !1 && !l[n].never && !l[n].control) {
                h = !0;
                break
            }
            t(o.table().node()).toggleClass("collapsed", h);
            var p = !1;
            o.columns().eq(0).each(function (t, e) {
                c[e] !== u[e] && (p = !0, r._setColumnVis(t, c[e]))
            }), p && (this._redrawChildren(), t(o.table().node()).trigger("responsive-resize.dt", [o, this.s.current]))
        }, _resizeAuto: function () {
            var e = this.s.dt, n = this.s.columns;
            if (this.c.auto && t.inArray(!0, t.map(n, function (t) {
                    return t.auto
                })) !== -1) {
                var i = (e.table().node().offsetWidth, e.columns, e.table().node().cloneNode(!1)),
                    r = t(e.table().header().cloneNode(!1)).appendTo(i),
                    o = t(e.table().body()).clone(!1, !1).empty().appendTo(i),
                    a = e.columns().header().filter(function (t) {
                        return e.column(t).visible()
                    }).to$().clone(!1).css("display", "table-cell");
                t(o).append(t(e.rows({page: "current"}).nodes()).clone(!1)).find("th, td").css("display", "");
                var s = e.table().footer();
                if (s) {
                    var d = t(s.cloneNode(!1)).appendTo(i), l = e.columns().footer().filter(function (t) {
                        return e.column(t).visible()
                    }).to$().clone(!1).css("display", "table-cell");
                    t("<tr/>").append(l).appendTo(d)
                }
                t("<tr/>").append(a).appendTo(r), "inline" === this.c.details.type && t(i).addClass("dtr-inline collapsed"), t(i).find("[name]").removeAttr("name");
                var u = t("<div/>").css({width: 1, height: 1, overflow: "hidden"}).append(i);
                u.insertBefore(e.table().node()), a.each(function (t) {
                    var i = e.column.index("fromVisible", t);
                    n[i].minWidth = this.offsetWidth || 0
                }), u.remove()
            }
        }, _setColumnVis: function (e, n) {
            var i = this.s.dt, r = n ? "" : "none";
            t(i.column(e).header()).css("display", r), t(i.column(e).footer()).css("display", r), i.column(e).nodes().to$().css("display", r)
        }, _tabIndexes: function () {
            var e = this.s.dt, n = e.cells({page: "current"}).nodes().to$(), i = e.settings()[0],
                r = this.c.details.target;
            n.filter("[data-dtr-keyboard]").removeData("[data-dtr-keyboard]");
            var o = "number" == typeof r ? ":eq(" + r + ")" : r;
            t(o, e.rows({page: "current"}).nodes()).attr("tabIndex", i.iTabIndex).data("dtr-keyboard", 1)
        }
    }), o.breakpoints = [{name: "desktop", width: 1 / 0}, {name: "tablet-l", width: 1024}, {
        name: "tablet-p",
        width: 768
    }, {name: "mobile-l", width: 480}, {name: "mobile-p", width: 320}], o.display = {
        childRow: function (e, n, i) {
            return n ? t(e.node()).hasClass("parent") ? (e.child(i(), "child").show(), !0) : void 0 : e.child.isShown() ? (e.child(!1), t(e.node()).removeClass("parent"), !1) : (e.child(i(), "child").show(), t(e.node()).addClass("parent"), !0)
        }, childRowImmediate: function (e, n, i) {
            return !n && e.child.isShown() || !e.responsive.hasHidden() ? (e.child(!1), t(e.node()).removeClass("parent"), !1) : (e.child(i(), "child").show(), t(e.node()).addClass("parent"), !0)
        }, modal: function (e) {
            return function (i, r, o) {
                if (r) t("div.dtr-modal-content").empty().append(o()); else {
                    var a = function () {
                            s.remove(), t(n).off("keypress.dtr")
                        },
                        s = t('<div class="dtr-modal"/>').append(t('<div class="dtr-modal-display"/>').append(t('<div class="dtr-modal-content"/>').append(o())).append(t('<div class="dtr-modal-close">&times;</div>').click(function () {
                            a()
                        }))).append(t('<div class="dtr-modal-background"/>').click(function () {
                            a()
                        })).appendTo("body");
                    t(n).on("keyup.dtr", function (t) {
                        27 === t.keyCode && (t.stopPropagation(), a())
                    })
                }
                e && e.header && t("div.dtr-modal-content").prepend("<h2>" + e.header(i) + "</h2>")
            }
        }
    }, o.renderer = {
        listHidden: function () {
            return function (e, n, i) {
                var r = t.map(i, function (t) {
                    return t.hidden ? '<li data-dtr-index="' + t.columnIndex + '" data-dt-row="' + t.rowIndex + '" data-dt-column="' + t.columnIndex + '"><span class="dtr-title">' + t.title + '</span> <span class="dtr-data">' + t.data + "</span></li>" : ""
                }).join("");
                return !!r && t('<ul data-dtr-index="' + n + '"/>').append(r)
            }
        }, tableAll: function (e) {
            return e = t.extend({tableClass: ""}, e), function (n, i, r) {
                var o = t.map(r, function (t) {
                    return '<tr data-dt-row="' + t.rowIndex + '" data-dt-column="' + t.columnIndex + '"><td>' + t.title + ":</td> <td>" + t.data + "</td></tr>"
                }).join("");
                return t('<table class="' + e.tableClass + '" width="100%"/>').append(o)
            }
        }
    }, o.defaults = {
        breakpoints: o.breakpoints,
        auto: !0,
        details: {display: o.display.childRow, renderer: o.renderer.listHidden(), target: 0, type: "inline"},
        orthogonal: "display"
    };
    var a = t.fn.dataTable.Api;
    return a.register("responsive()", function () {
        return this
    }), a.register("responsive.index()", function (e) {
        return e = t(e), {column: e.data("dtr-index"), row: e.parent().data("dtr-index")}
    }), a.register("responsive.rebuild()", function () {
        return this.iterator("table", function (t) {
            t._responsive && t._responsive._classLogic()
        })
    }), a.register("responsive.recalc()", function () {
        return this.iterator("table", function (t) {
            t._responsive && (t._responsive._resizeAuto(), t._responsive._resize())
        })
    }), a.register("responsive.hasHidden()", function () {
        var e = this.context[0];
        return !!e._responsive && t.inArray(!1, e._responsive.s.current) !== -1
    }), o.version = "2.1.0", t.fn.dataTable.Responsive = o, t.fn.DataTable.Responsive = o, t(n).on("preInit.dt.dtr", function (e, n, i) {
        if ("dt" === e.namespace && (t(n.nTable).hasClass("responsive") || t(n.nTable).hasClass("dt-responsive") || n.oInit.responsive || r.defaults.responsive)) {
            var a = n.oInit.responsive;
            a !== !1 && new o(n, t.isPlainObject(a) ? a : {})
        }
    }), o
}), function (t) {
    "function" == typeof define && define.amd ? define(["jquery", "datatables.net-bs", "datatables.net-responsive"], function (e) {
        return t(e, window, document)
    }) : "object" == typeof exports ? module.exports = function (e, n) {
        return e || (e = window), n && n.fn.dataTable || (n = require("datatables.net-bs")(e, n).$), n.fn.dataTable.Responsive || require("datatables.net-responsive")(e, n), t(n, e, e.document)
    } : t(jQuery, window, document)
}(function (t, e, n, i) {
    "use strict";
    var r = t.fn.dataTable, o = r.Responsive.display, a = o.modal,
        s = t('<div class="modal fade dtr-bs-modal" role="dialog"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button></div><div class="modal-body"/></div></div></div>');
    return o.modal = function (e) {
        return function (n, i, r) {
            t.fn.modal ? i || (e && e.header && s.find("div.modal-header").empty().append('<h4 class="modal-title">' + e.header(n) + "</h4>"), s.find("div.modal-body").empty().append(r()), s.appendTo("body").modal()) : a(n, i, r)
        }
    }, r.Responsive
}), !function (t) {
    "use strict";

    function e(t, e) {
        for (var n = 0; n < t.length; ++n) e(t[n], n)
    }

    function n(e, n) {
        this.$select = t(e), this.$select.attr("data-placeholder") && (n.nonSelectedText = this.$select.data("placeholder")), this.options = this.mergeOptions(t.extend({}, n, this.$select.data())), this.originalOptions = this.$select.clone()[0].options, this.query = "", this.searchTimeout = null, this.lastToggledInput = null, this.options.multiple = "multiple" === this.$select.attr("multiple"), this.options.onChange = t.proxy(this.options.onChange, this), this.options.onDropdownShow = t.proxy(this.options.onDropdownShow, this), this.options.onDropdownHide = t.proxy(this.options.onDropdownHide, this), this.options.onDropdownShown = t.proxy(this.options.onDropdownShown, this), this.options.onDropdownHidden = t.proxy(this.options.onDropdownHidden, this), this.buildContainer(), this.buildButton(), this.buildDropdown(), this.buildSelectAll(), this.buildDropdownOptions(), this.buildFilter(), this.updateButtonText(), this.updateSelectAll(), this.options.disableIfEmpty && t("option", this.$select).length <= 0 && this.disable(), this.$select.hide().after(this.$container)
    }

    "undefined" != typeof ko && ko.bindingHandlers && !ko.bindingHandlers.multiselect && (ko.bindingHandlers.multiselect = {
        after: ["options", "value", "selectedOptions"],
        init: function (e, n, i, r, o) {
            var a = t(e), s = ko.toJS(n());
            if (a.multiselect(s), i.has("options")) {
                var d = i.get("options");
                ko.isObservable(d) && ko.computed({
                    read: function () {
                        d(), setTimeout(function () {
                            var t = a.data("multiselect");
                            t && t.updateOriginalOptions(), a.multiselect("rebuild")
                        }, 1)
                    }, disposeWhenNodeIsRemoved: e
                })
            }
            if (i.has("value")) {
                var l = i.get("value");
                ko.isObservable(l) && ko.computed({
                    read: function () {
                        l(), setTimeout(function () {
                            a.multiselect("refresh")
                        }, 1)
                    }, disposeWhenNodeIsRemoved: e
                }).extend({rateLimit: 100, notifyWhenChangesStop: !0})
            }
            if (i.has("selectedOptions")) {
                var u = i.get("selectedOptions");
                ko.isObservable(u) && ko.computed({
                    read: function () {
                        u(), setTimeout(function () {
                            a.multiselect("refresh")
                        }, 1)
                    }, disposeWhenNodeIsRemoved: e
                }).extend({rateLimit: 100, notifyWhenChangesStop: !0})
            }
            ko.utils.domNodeDisposal.addDisposeCallback(e, function () {
                a.multiselect("destroy")
            })
        },
        update: function (e, n, i, r, o) {
            var a = t(e), s = ko.toJS(n());
            a.multiselect("setOptions", s), a.multiselect("rebuild")
        }
    }), n.prototype = {
        defaults: {
            buttonText: function (e, n) {
                if (0 === e.length) return this.nonSelectedText;
                if (this.allSelectedText && e.length === t("option", t(n)).length && 1 !== t("option", t(n)).length && this.multiple) return this.selectAllNumber ? this.allSelectedText + " (" + e.length + ")" : this.allSelectedText;
                if (e.length > this.numberDisplayed) return e.length + " " + this.nSelectedText;
                var i = "", r = this.delimiterText;
                return e.each(function () {
                    var e = void 0 !== t(this).attr("label") ? t(this).attr("label") : t(this).text();
                    i += e + r
                }), i.substr(0, i.length - 2)
            },
            buttonTitle: function (e, n) {
                if (0 === e.length) return this.nonSelectedText;
                var i = "", r = this.delimiterText;
                return e.each(function () {
                    var e = void 0 !== t(this).attr("label") ? t(this).attr("label") : t(this).text();
                    i += e + r
                }), i.substr(0, i.length - 2)
            },
            optionLabel: function (e) {
                return t(e).attr("label") || t(e).text()
            },
            onChange: function (t, e) {
            },
            onDropdownShow: function (t) {
            },
            onDropdownHide: function (t) {
            },
            onDropdownShown: function (t) {
            },
            onDropdownHidden: function (t) {
            },
            onSelectAll: function () {
            },
            enableHTML: !1,
            buttonClass: "btn btn-default",
            inheritClass: !1,
            buttonWidth: "auto",
            buttonContainer: '<div class="btn-group" />',
            dropRight: !1,
            selectedClass: "active",
            maxHeight: !1,
            checkboxName: !1,
            includeSelectAllOption: !1,
            includeSelectAllIfMoreThan: 0,
            selectAllText: " Select all",
            selectAllValue: "multiselect-all",
            selectAllName: !1,
            selectAllNumber: !0,
            enableFiltering: !1,
            enableCaseInsensitiveFiltering: !1,
            enableClickableOptGroups: !1,
            filterPlaceholder: "Search",
            filterBehavior: "text",
            includeFilterClearBtn: !0,
            preventInputChangeEvent: !1,
            nonSelectedText: "None selected",
            nSelectedText: "selected",
            allSelectedText: "All selected",
            numberDisplayed: 3,
            disableIfEmpty: !1,
            delimiterText: ", ",
            templates: {
                button: '<button type="button" class="multiselect dropdown-toggle" data-toggle="dropdown"><span class="multiselect-selected-text"></span> <b class="caret"></b></button>',
                ul: '<ul class="multiselect-container dropdown-menu"></ul>',
                filter: '<li class="multiselect-item filter"><div class="input-group"><span class="input-group-addon"><i class="glyphicon glyphicon-search"></i></span><input class="form-control multiselect-search" type="text"></div></li>',
                filterClearBtn: '<span class="input-group-btn"><button class="btn btn-default multiselect-clear-filter" type="button"><i class="glyphicon glyphicon-remove-circle"></i></button></span>',
                li: '<li><a tabindex="0"><label></label></a></li>',
                divider: '<li class="multiselect-item divider"></li>',
                liGroup: '<li class="multiselect-item multiselect-group"><label></label></li>'
            }
        }, constructor: n, buildContainer: function () {
            this.$container = t(this.options.buttonContainer), this.$container.on("show.bs.dropdown", this.options.onDropdownShow), this.$container.on("hide.bs.dropdown", this.options.onDropdownHide), this.$container.on("shown.bs.dropdown", this.options.onDropdownShown), this.$container.on("hidden.bs.dropdown", this.options.onDropdownHidden)
        }, buildButton: function () {
            this.$button = t(this.options.templates.button).addClass(this.options.buttonClass), this.$select.attr("class") && this.options.inheritClass && this.$button.addClass(this.$select.attr("class")), this.$select.prop("disabled") ? this.disable() : this.enable(), this.options.buttonWidth && "auto" !== this.options.buttonWidth && (this.$button.css({
                width: this.options.buttonWidth,
                overflow: "hidden",
                "text-overflow": "ellipsis"
            }), this.$container.css({width: this.options.buttonWidth}));
            var e = this.$select.attr("tabindex");
            e && this.$button.attr("tabindex", e), this.$container.prepend(this.$button)
        }, buildDropdown: function () {
            this.$ul = t(this.options.templates.ul), this.options.dropRight && this.$ul.addClass("pull-right"), this.options.maxHeight && this.$ul.css({
                "max-height": this.options.maxHeight + "px",
                "overflow-y": "auto",
                "overflow-x": "hidden"
            }), this.$container.append(this.$ul)
        }, buildDropdownOptions: function () {
            this.$select.children().each(t.proxy(function (e, n) {
                var i = t(n), r = i.prop("tagName").toLowerCase();
                i.prop("value") !== this.options.selectAllValue && ("optgroup" === r ? this.createOptgroup(n) : "option" === r && ("divider" === i.data("role") ? this.createDivider() : this.createOptionValue(n)))
            }, this)), t("li input", this.$ul).on("change", t.proxy(function (e) {
                var n = t(e.target), i = n.prop("checked") || !1, r = n.val() === this.options.selectAllValue;
                this.options.selectedClass && (i ? n.closest("li").addClass(this.options.selectedClass) : n.closest("li").removeClass(this.options.selectedClass));
                var o = n.val(), a = this.getOptionByValue(o), s = t("option", this.$select).not(a),
                    d = t("input", this.$container).not(n);
                if (r && (i ? this.selectAll() : this.deselectAll()), r || (i ? (a.prop("selected", !0), this.options.multiple ? a.prop("selected", !0) : (this.options.selectedClass && t(d).closest("li").removeClass(this.options.selectedClass), t(d).prop("checked", !1), s.prop("selected", !1), this.$button.click()), "active" === this.options.selectedClass && s.closest("a").css("outline", "")) : a.prop("selected", !1)), this.$select.change(), this.updateButtonText(), this.updateSelectAll(), this.options.onChange(a, i), this.options.preventInputChangeEvent) return !1
            }, this)), t("li a", this.$ul).on("mousedown", function (t) {
                if (t.shiftKey) return !1
            }), t("li a", this.$ul).on("touchstart click", t.proxy(function (e) {
                e.stopPropagation();
                var n = t(e.target);
                if (e.shiftKey && this.options.multiple) {
                    n.is("label") && (e.preventDefault(), n = n.find("input"), n.prop("checked", !n.prop("checked")));
                    var i = n.prop("checked") || !1;
                    if (null !== this.lastToggledInput && this.lastToggledInput !== n) {
                        var r = n.closest("li").index(), o = this.lastToggledInput.closest("li").index();
                        if (r > o) {
                            var a = o;
                            o = r, r = a
                        }
                        ++o;
                        var s = this.$ul.find("li").slice(r, o).find("input");
                        s.prop("checked", i), this.options.selectedClass && s.closest("li").toggleClass(this.options.selectedClass, i);
                        for (var d = 0, l = s.length; d < l; d++) {
                            var u = t(s[d]), c = this.getOptionByValue(u.val());
                            c.prop("selected", i)
                        }
                    }
                    n.trigger("change")
                }
                n.is("input") && !n.closest("li").is(".multiselect-item") && (this.lastToggledInput = n), n.blur()
            }, this)), this.$container.off("keydown.multiselect").on("keydown.multiselect", t.proxy(function (e) {
                if (!t('input[type="text"]', this.$container).is(":focus")) if (9 === e.keyCode && this.$container.hasClass("open")) this.$button.click(); else {
                    var n = t(this.$container).find("li:not(.divider):not(.disabled) a").filter(":visible");
                    if (!n.length) return;
                    var i = n.index(n.filter(":focus"));
                    38 === e.keyCode && i > 0 ? i-- : 40 === e.keyCode && i < n.length - 1 ? i++ : ~i || (i = 0);
                    var r = n.eq(i);
                    if (r.focus(), 32 === e.keyCode || 13 === e.keyCode) {
                        var o = r.find("input");
                        o.prop("checked", !o.prop("checked")), o.change()
                    }
                    e.stopPropagation(), e.preventDefault()
                }
            }, this)), this.options.enableClickableOptGroups && this.options.multiple && t("li.multiselect-group", this.$ul).on("click", t.proxy(function (e) {
                e.stopPropagation();
                var n = t(e.target).parent(), i = n.nextUntil("li.multiselect-group"),
                    r = i.filter(":visible:not(.disabled)"), o = !0, a = r.find("input");
                a.each(function () {
                    o = o && t(this).prop("checked")
                }), a.prop("checked", !o).trigger("change")
            }, this))
        }, createOptionValue: function (e) {
            var n = t(e);
            n.is(":selected") && n.prop("selected", !0);
            var i = this.options.optionLabel(e), r = n.val(), o = this.options.multiple ? "checkbox" : "radio",
                a = t(this.options.templates.li), s = t("label", a);
            s.addClass(o), this.options.enableHTML ? s.html(" " + i) : s.text(" " + i);
            var d = t("<input/>").attr("type", o);
            this.options.checkboxName && d.attr("name", this.options.checkboxName), s.prepend(d);
            var l = n.prop("selected") || !1;
            d.val(r), r === this.options.selectAllValue && (a.addClass("multiselect-item multiselect-all"), d.parent().parent().addClass("multiselect-all")), s.attr("title", n.attr("title")), this.$ul.append(a), n.is(":disabled") && d.attr("disabled", "disabled").prop("disabled", !0).closest("a").attr("tabindex", "-1").closest("li").addClass("disabled"), d.prop("checked", l), l && this.options.selectedClass && d.closest("li").addClass(this.options.selectedClass)
        }, createDivider: function (e) {
            var n = t(this.options.templates.divider);
            this.$ul.append(n)
        }, createOptgroup: function (e) {
            var n = t(e).prop("label"), i = t(this.options.templates.liGroup);
            this.options.enableHTML ? t("label", i).html(n) : t("label", i).text(n), this.options.enableClickableOptGroups && i.addClass("multiselect-group-clickable"), this.$ul.append(i), t(e).is(":disabled") && i.addClass("disabled"), t("option", e).each(t.proxy(function (t, e) {
                this.createOptionValue(e)
            }, this))
        }, buildSelectAll: function () {
            "number" == typeof this.options.selectAllValue && (this.options.selectAllValue = this.options.selectAllValue.toString());
            var e = this.hasSelectAll();
            if (!e && this.options.includeSelectAllOption && this.options.multiple && t("option", this.$select).length > this.options.includeSelectAllIfMoreThan) {
                this.options.includeSelectAllDivider && this.$ul.prepend(t(this.options.templates.divider));
                var n = t(this.options.templates.li);
                t("label", n).addClass("checkbox"), this.options.enableHTML ? t("label", n).html(" " + this.options.selectAllText) : t("label", n).text(" " + this.options.selectAllText),
                    this.options.selectAllName ? t("label", n).prepend('<input type="checkbox" name="' + this.options.selectAllName + '" />') : t("label", n).prepend('<input type="checkbox" />');
                var i = t("input", n);
                i.val(this.options.selectAllValue), n.addClass("multiselect-item multiselect-all"), i.parent().parent().addClass("multiselect-all"), this.$ul.prepend(n), i.prop("checked", !1)
            }
        }, buildFilter: function () {
            if (this.options.enableFiltering || this.options.enableCaseInsensitiveFiltering) {
                var e = Math.max(this.options.enableFiltering, this.options.enableCaseInsensitiveFiltering);
                if (this.$select.find("option").length >= e) {
                    if (this.$filter = t(this.options.templates.filter), t("input", this.$filter).attr("placeholder", this.options.filterPlaceholder), this.options.includeFilterClearBtn) {
                        var n = t(this.options.templates.filterClearBtn);
                        n.on("click", t.proxy(function (e) {
                            clearTimeout(this.searchTimeout), this.$filter.find(".multiselect-search").val(""), t("li", this.$ul).show().removeClass("filter-hidden"), this.updateSelectAll()
                        }, this)), this.$filter.find(".input-group").append(n)
                    }
                    this.$ul.prepend(this.$filter), this.$filter.val(this.query).on("click", function (t) {
                        t.stopPropagation()
                    }).on("input keydown", t.proxy(function (e) {
                        13 === e.which && e.preventDefault(), clearTimeout(this.searchTimeout), this.searchTimeout = this.asyncFunction(t.proxy(function () {
                            if (this.query !== e.target.value) {
                                this.query = e.target.value;
                                var n, i;
                                t.each(t("li", this.$ul), t.proxy(function (e, r) {
                                    var o = t("input", r).length > 0 ? t("input", r).val() : "",
                                        a = t("label", r).text(), s = "";
                                    if ("text" === this.options.filterBehavior ? s = a : "value" === this.options.filterBehavior ? s = o : "both" === this.options.filterBehavior && (s = a + "\n" + o), o !== this.options.selectAllValue && a) {
                                        var d = !1;
                                        this.options.enableCaseInsensitiveFiltering && s.toLowerCase().indexOf(this.query.toLowerCase()) > -1 ? d = !0 : s.indexOf(this.query) > -1 && (d = !0), t(r).toggle(d).toggleClass("filter-hidden", !d), t(r).hasClass("multiselect-group") ? (n = r, i = d) : (d && t(n).show().removeClass("filter-hidden"), !d && i && t(r).show().removeClass("filter-hidden"))
                                    }
                                }, this))
                            }
                            this.updateSelectAll()
                        }, this), 300, this)
                    }, this))
                }
            }
        }, destroy: function () {
            this.$container.remove(), this.$select.show(), this.$select.data("multiselect", null)
        }, refresh: function () {
            t("option", this.$select).each(t.proxy(function (e, n) {
                var i = t("li input", this.$ul).filter(function () {
                    return t(this).val() === t(n).val()
                });
                t(n).is(":selected") ? (i.prop("checked", !0), this.options.selectedClass && i.closest("li").addClass(this.options.selectedClass)) : (i.prop("checked", !1), this.options.selectedClass && i.closest("li").removeClass(this.options.selectedClass)), t(n).is(":disabled") ? i.attr("disabled", "disabled").prop("disabled", !0).closest("li").addClass("disabled") : i.prop("disabled", !1).closest("li").removeClass("disabled")
            }, this)), this.updateButtonText(), this.updateSelectAll()
        }, select: function (e, n) {
            t.isArray(e) || (e = [e]);
            for (var i = 0; i < e.length; i++) {
                var r = e[i];
                if (null !== r && void 0 !== r) {
                    var o = this.getOptionByValue(r), a = this.getInputByValue(r);
                    void 0 !== o && void 0 !== a && (this.options.multiple || this.deselectAll(!1), this.options.selectedClass && a.closest("li").addClass(this.options.selectedClass), a.prop("checked", !0), o.prop("selected", !0), n && this.options.onChange(o, !0))
                }
            }
            this.updateButtonText(), this.updateSelectAll()
        }, clearSelection: function () {
            this.deselectAll(!1), this.updateButtonText(), this.updateSelectAll()
        }, deselect: function (e, n) {
            t.isArray(e) || (e = [e]);
            for (var i = 0; i < e.length; i++) {
                var r = e[i];
                if (null !== r && void 0 !== r) {
                    var o = this.getOptionByValue(r), a = this.getInputByValue(r);
                    void 0 !== o && void 0 !== a && (this.options.selectedClass && a.closest("li").removeClass(this.options.selectedClass), a.prop("checked", !1), o.prop("selected", !1), n && this.options.onChange(o, !1))
                }
            }
            this.updateButtonText(), this.updateSelectAll()
        }, selectAll: function (e, n) {
            var e = "undefined" == typeof e || e, i = t("li input[type='checkbox']:enabled", this.$ul),
                r = i.filter(":visible"), o = i.length, a = r.length;
            if (e ? (r.prop("checked", !0), t("li:not(.divider):not(.disabled)", this.$ul).filter(":visible").addClass(this.options.selectedClass)) : (i.prop("checked", !0), t("li:not(.divider):not(.disabled)", this.$ul).addClass(this.options.selectedClass)), o === a || e === !1) t("option:enabled", this.$select).prop("selected", !0); else {
                var s = r.map(function () {
                    return t(this).val()
                }).get();
                t("option:enabled", this.$select).filter(function (e) {
                    return t.inArray(t(this).val(), s) !== -1
                }).prop("selected", !0)
            }
            n && this.options.onSelectAll()
        }, deselectAll: function (e) {
            var e = "undefined" == typeof e || e;
            if (e) {
                var n = t("li input[type='checkbox']:not(:disabled)", this.$ul).filter(":visible");
                n.prop("checked", !1);
                var i = n.map(function () {
                    return t(this).val()
                }).get();
                t("option:enabled", this.$select).filter(function (e) {
                    return t.inArray(t(this).val(), i) !== -1
                }).prop("selected", !1), this.options.selectedClass && t("li:not(.divider):not(.disabled)", this.$ul).filter(":visible").removeClass(this.options.selectedClass)
            } else t("li input[type='checkbox']:enabled", this.$ul).prop("checked", !1), t("option:enabled", this.$select).prop("selected", !1), this.options.selectedClass && t("li:not(.divider):not(.disabled)", this.$ul).removeClass(this.options.selectedClass)
        }, rebuild: function () {
            this.$ul.html(""), this.options.multiple = "multiple" === this.$select.attr("multiple"), this.buildSelectAll(), this.buildDropdownOptions(), this.buildFilter(), this.updateButtonText(), this.updateSelectAll(), this.options.disableIfEmpty && t("option", this.$select).length <= 0 ? this.disable() : this.enable(), this.options.dropRight && this.$ul.addClass("pull-right")
        }, dataprovider: function (n) {
            var i = 0, r = this.$select.empty();
            t.each(n, function (n, o) {
                var a;
                t.isArray(o.children) ? (i++, a = t("<optgroup/>").attr({
                    label: o.label || "Group " + i,
                    disabled: !!o.disabled
                }), e(o.children, function (e) {
                    a.append(t("<option/>").attr({
                        value: e.value,
                        label: e.label || e.value,
                        title: e.title,
                        selected: !!e.selected,
                        disabled: !!e.disabled
                    }))
                })) : a = t("<option/>").attr({
                    value: o.value,
                    label: o.label || o.value,
                    title: o.title,
                    selected: !!o.selected,
                    disabled: !!o.disabled
                }), r.append(a)
            }), this.rebuild()
        }, enable: function () {
            this.$select.prop("disabled", !1), this.$button.prop("disabled", !1).removeClass("disabled")
        }, disable: function () {
            this.$select.prop("disabled", !0), this.$button.prop("disabled", !0).addClass("disabled")
        }, setOptions: function (t) {
            this.options = this.mergeOptions(t)
        }, mergeOptions: function (e) {
            return t.extend(!0, {}, this.defaults, this.options, e)
        }, hasSelectAll: function () {
            return t("li.multiselect-all", this.$ul).length > 0
        }, updateSelectAll: function () {
            if (this.hasSelectAll()) {
                var e = t("li:not(.multiselect-item):not(.filter-hidden) input:enabled", this.$ul), n = e.length,
                    i = e.filter(":checked").length, r = t("li.multiselect-all", this.$ul), o = r.find("input");
                i > 0 && i === n ? (o.prop("checked", !0), r.addClass(this.options.selectedClass), this.options.onSelectAll()) : (o.prop("checked", !1), r.removeClass(this.options.selectedClass))
            }
        }, updateButtonText: function () {
            var e = this.getSelected();
            this.options.enableHTML ? t(".multiselect .multiselect-selected-text", this.$container).html(this.options.buttonText(e, this.$select)) : t(".multiselect .multiselect-selected-text", this.$container).text(this.options.buttonText(e, this.$select)), t(".multiselect", this.$container).attr("title", this.options.buttonTitle(e, this.$select))
        }, getSelected: function () {
            return t("option", this.$select).filter(":selected")
        }, getOptionByValue: function (e) {
            for (var n = t("option", this.$select), i = e.toString(), r = 0; r < n.length; r += 1) {
                var o = n[r];
                if (o.value === i) return t(o)
            }
        }, getInputByValue: function (e) {
            for (var n = t("li input", this.$ul), i = e.toString(), r = 0; r < n.length; r += 1) {
                var o = n[r];
                if (o.value === i) return t(o)
            }
        }, updateOriginalOptions: function () {
            this.originalOptions = this.$select.clone()[0].options
        }, asyncFunction: function (t, e, n) {
            var i = Array.prototype.slice.call(arguments, 3);
            return setTimeout(function () {
                t.apply(n || window, i)
            }, e)
        }, setAllSelectedText: function (t) {
            this.options.allSelectedText = t, this.updateButtonText()
        }
    }, t.fn.multiselect = function (e, i, r) {
        return this.each(function () {
            var o = t(this).data("multiselect"), a = "object" == typeof e && e;
            o || (o = new n(this, a), t(this).data("multiselect", o)), "string" == typeof e && (o[e](i, r), "destroy" === e && t(this).data("multiselect", !1))
        })
    }, t.fn.multiselect.Constructor = n, t(function () {
        t("select[data-role=multiselect]").multiselect()
    })
}(window.jQuery), function (t) {
    "function" == typeof define && define.amd ? define(["jquery"], function (e) {
        t(e, window, document)
    }) : "object" == typeof module && module.exports ? module.exports = t(require("jquery"), window, document) : t(jQuery, window, document)
}(function (t, e, n, i) {
    "use strict";

    function r(e, n) {
        this.telInput = t(e), this.options = t.extend({}, s, n), this.ns = "." + o + a++, this.isGoodBrowser = Boolean(e.setSelectionRange), this.hadInitialPlaceholder = Boolean(t(e).attr("placeholder"))
    }

    var o = "intlTelInput", a = 1, s = {
            allowDropdown: !0,
            autoHideDialCode: !0,
            autoPlaceholder: "polite",
            customPlaceholder: null,
            dropdownContainer: "",
            excludeCountries: [],
            formatOnDisplay: !0,
            geoIpLookup: null,
            hiddenInput: "",
            initialCountry: "",
            nationalMode: !0,
            onlyCountries: [],
            placeholderNumberType: "MOBILE",
            preferredCountries: ["us", "gb"],
            separateDialCode: !1,
            utilsScript: ""
        }, d = {UP: 38, DOWN: 40, ENTER: 13, ESC: 27, PLUS: 43, A: 65, Z: 90, SPACE: 32, TAB: 9},
        l = ["800", "822", "833", "844", "855", "866", "877", "880", "881", "882", "883", "884", "885", "886", "887", "888", "889"];
    t(e).on("load", function () {
        t.fn[o].windowLoaded = !0
    }), r.prototype = {
        _init: function () {
            return this.options.nationalMode && (this.options.autoHideDialCode = !1), this.options.separateDialCode && (this.options.autoHideDialCode = this.options.nationalMode = !1), this.isMobile = /Android.+Mobile|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent), this.isMobile && (t("body").addClass("iti-mobile"), this.options.dropdownContainer || (this.options.dropdownContainer = "body")), this.autoCountryDeferred = new t.Deferred, this.utilsScriptDeferred = new t.Deferred, this.selectedCountryData = {}, this._processCountryData(), this._generateMarkup(), this._setInitialState(), this._initListeners(), this._initRequests(), [this.autoCountryDeferred, this.utilsScriptDeferred]
        }, _processCountryData: function () {
            this._processAllCountries(), this._processCountryCodes(), this._processPreferredCountries()
        }, _addCountryCode: function (t, e, n) {
            e in this.countryCodes || (this.countryCodes[e] = []);
            var i = n || 0;
            this.countryCodes[e][i] = t
        }, _processAllCountries: function () {
            if (this.options.onlyCountries.length) {
                var t = this.options.onlyCountries.map(function (t) {
                    return t.toLowerCase()
                });
                this.countries = u.filter(function (e) {
                    return t.indexOf(e.iso2) > -1
                })
            } else if (this.options.excludeCountries.length) {
                var e = this.options.excludeCountries.map(function (t) {
                    return t.toLowerCase()
                });
                this.countries = u.filter(function (t) {
                    return e.indexOf(t.iso2) === -1
                })
            } else this.countries = u
        }, _processCountryCodes: function () {
            this.countryCodes = {};
            for (var t = 0; t < this.countries.length; t++) {
                var e = this.countries[t];
                if (this._addCountryCode(e.iso2, e.dialCode, e.priority), e.areaCodes) for (var n = 0; n < e.areaCodes.length; n++) this._addCountryCode(e.iso2, e.dialCode + e.areaCodes[n])
            }
        }, _processPreferredCountries: function () {
            this.preferredCountries = [];
            for (var t = 0; t < this.options.preferredCountries.length; t++) {
                var e = this.options.preferredCountries[t].toLowerCase(), n = this._getCountryData(e, !1, !0);
                n && this.preferredCountries.push(n)
            }
        }, _generateMarkup: function () {
            this.telInput.attr("autocomplete", "off");
            var e = "intl-tel-input";
            this.options.allowDropdown && (e += " allow-dropdown"), this.options.separateDialCode && (e += " separate-dial-code"), this.telInput.wrap(t("<div>", {class: e})), this.flagsContainer = t("<div>", {class: "flag-container"}).insertBefore(this.telInput);
            var n = t("<div>", {class: "selected-flag"});
            n.appendTo(this.flagsContainer), this.selectedFlagInner = t("<div>", {class: "iti-flag"}).appendTo(n), this.options.separateDialCode && (this.selectedDialCode = t("<div>", {class: "selected-dial-code"}).appendTo(n)), this.options.allowDropdown ? (n.attr("tabindex", "0"), t("<div>", {class: "iti-arrow"}).appendTo(n), this.countryList = t("<ul>", {class: "country-list hide"}), this.preferredCountries.length && (this._appendListItems(this.preferredCountries, "preferred"), t("<li>", {class: "divider"}).appendTo(this.countryList)), this._appendListItems(this.countries, ""), this.countryListItems = this.countryList.children(".country"), this.options.dropdownContainer ? this.dropdown = t("<div>", {class: "intl-tel-input iti-container"}).append(this.countryList) : this.countryList.appendTo(this.flagsContainer)) : this.countryListItems = t(), this.options.hiddenInput && (this.hiddenInput = t("<input>", {
                type: "hidden",
                name: this.options.hiddenInput
            }).insertBefore(this.telInput))
        }, _appendListItems: function (t, e) {
            for (var n = "", i = 0; i < t.length; i++) {
                var r = t[i];
                n += "<li class='country " + e + "' data-dial-code='" + r.dialCode + "' data-country-code='" + r.iso2 + "'>", n += "<div class='flag-box'><div class='iti-flag " + r.iso2 + "'></div></div>", n += "<span class='country-name'>" + r.name + "</span>", n += "<span class='dial-code'>+" + r.dialCode + "</span>", n += "</li>"
            }
            this.countryList.append(n)
        }, _setInitialState: function () {
            var t = this.telInput.val();
            this._getDialCode(t) && (!this._isRegionlessNanp(t) || this.options.nationalMode && !this.options.initialCountry) ? this._updateFlagFromNumber(t) : "auto" !== this.options.initialCountry && (this.options.initialCountry ? this._setFlag(this.options.initialCountry.toLowerCase()) : (this.defaultCountry = this.preferredCountries.length ? this.preferredCountries[0].iso2 : this.countries[0].iso2, t || this._setFlag(this.defaultCountry)), t || this.options.nationalMode || this.options.autoHideDialCode || this.options.separateDialCode || this.telInput.val("+" + this.selectedCountryData.dialCode)), t && this._updateValFromNumber(t)
        }, _initListeners: function () {
            this._initKeyListeners(), this.options.autoHideDialCode && this._initFocusListeners(), this.options.allowDropdown && this._initDropdownListeners(), this.hiddenInput && this._initHiddenInputListener()
        }, _initHiddenInputListener: function () {
            var t = this, e = this.telInput.closest("form");
            e.length && e.submit(function () {
                t.hiddenInput.val(t.getNumber())
            })
        }, _initDropdownListeners: function () {
            var t = this, e = this.telInput.closest("label");
            e.length && e.on("click" + this.ns, function (e) {
                t.countryList.hasClass("hide") ? t.telInput.focus() : e.preventDefault()
            });
            var n = this.selectedFlagInner.parent();
            n.on("click" + this.ns, function (e) {
                !t.countryList.hasClass("hide") || t.telInput.prop("disabled") || t.telInput.prop("readonly") || t._showDropdown()
            }), this.flagsContainer.on("keydown" + t.ns, function (e) {
                var n = t.countryList.hasClass("hide");
                !n || e.which != d.UP && e.which != d.DOWN && e.which != d.SPACE && e.which != d.ENTER || (e.preventDefault(), e.stopPropagation(), t._showDropdown()), e.which == d.TAB && t._closeDropdown()
            })
        }, _initRequests: function () {
            var n = this;
            this.options.utilsScript ? t.fn[o].windowLoaded ? t.fn[o].loadUtils(this.options.utilsScript, this.utilsScriptDeferred) : t(e).on("load", function () {
                t.fn[o].loadUtils(n.options.utilsScript, n.utilsScriptDeferred)
            }) : this.utilsScriptDeferred.resolve(), "auto" === this.options.initialCountry ? this._loadAutoCountry() : this.autoCountryDeferred.resolve()
        }, _loadAutoCountry: function () {
            t.fn[o].autoCountry ? this.handleAutoCountry() : t.fn[o].startedLoadingAutoCountry || (t.fn[o].startedLoadingAutoCountry = !0, "function" == typeof this.options.geoIpLookup && this.options.geoIpLookup(function (e) {
                t.fn[o].autoCountry = e.toLowerCase(), setTimeout(function () {
                    t(".intl-tel-input input").intlTelInput("handleAutoCountry")
                })
            }))
        }, _initKeyListeners: function () {
            var t = this;
            this.telInput.on("keyup" + this.ns, function () {
                t._updateFlagFromNumber(t.telInput.val()) && t._triggerCountryChange()
            }), this.telInput.on("cut" + this.ns + " paste" + this.ns, function () {
                setTimeout(function () {
                    t._updateFlagFromNumber(t.telInput.val()) && t._triggerCountryChange()
                })
            })
        }, _cap: function (t) {
            var e = this.telInput.attr("maxlength");
            return e && t.length > e ? t.substr(0, e) : t
        }, _initFocusListeners: function () {
            var e = this;
            this.telInput.on("mousedown" + this.ns, function (t) {
                e.telInput.is(":focus") || e.telInput.val() || (t.preventDefault(), e.telInput.focus())
            }), this.telInput.on("focus" + this.ns, function (t) {
                e.telInput.val() || e.telInput.prop("readonly") || !e.selectedCountryData.dialCode || (e.telInput.val("+" + e.selectedCountryData.dialCode), e.telInput.one("keypress.plus" + e.ns, function (t) {
                    t.which == d.PLUS && e.telInput.val("")
                }), setTimeout(function () {
                    var t = e.telInput[0];
                    if (e.isGoodBrowser) {
                        var n = e.telInput.val().length;
                        t.setSelectionRange(n, n)
                    }
                }))
            });
            var n = this.telInput.prop("form");
            n && t(n).on("submit" + this.ns, function () {
                e._removeEmptyDialCode()
            }), this.telInput.on("blur" + this.ns, function () {
                e._removeEmptyDialCode()
            })
        }, _removeEmptyDialCode: function () {
            var t = this.telInput.val(), e = "+" == t.charAt(0);
            if (e) {
                var n = this._getNumeric(t);
                n && this.selectedCountryData.dialCode != n || this.telInput.val("")
            }
            this.telInput.off("keypress.plus" + this.ns)
        }, _getNumeric: function (t) {
            return t.replace(/\D/g, "")
        }, _showDropdown: function () {
            this._setDropdownPosition();
            var t = this.countryList.children(".active");
            t.length && (this._highlightListItem(t), this._scrollTo(t)), this._bindDropdownListeners(), this.selectedFlagInner.children(".iti-arrow").addClass("up"), this.telInput.trigger("open:countrydropdown")
        }, _setDropdownPosition: function () {
            var n = this;
            if (this.options.dropdownContainer && this.dropdown.appendTo(this.options.dropdownContainer), this.dropdownHeight = this.countryList.removeClass("hide").outerHeight(), !this.isMobile) {
                var i = this.telInput.offset(), r = i.top, o = t(e).scrollTop(),
                    a = r + this.telInput.outerHeight() + this.dropdownHeight < o + t(e).height(),
                    s = r - this.dropdownHeight > o;
                if (this.countryList.toggleClass("dropup", !a && s), this.options.dropdownContainer) {
                    var d = !a && s ? 0 : this.telInput.innerHeight();
                    this.dropdown.css({top: r + d, left: i.left}), t(e).on("scroll" + this.ns, function () {
                        n._closeDropdown()
                    })
                }
            }
        }, _bindDropdownListeners: function () {
            var e = this;
            this.countryList.on("mouseover" + this.ns, ".country", function (n) {
                e._highlightListItem(t(this))
            }), this.countryList.on("click" + this.ns, ".country", function (n) {
                e._selectListItem(t(this))
            });
            var i = !0;
            t("html").on("click" + this.ns, function (t) {
                i || e._closeDropdown(), i = !1
            });
            var r = "", o = null;
            t(n).on("keydown" + this.ns, function (t) {
                t.preventDefault(), t.which == d.UP || t.which == d.DOWN ? e._handleUpDownKey(t.which) : t.which == d.ENTER ? e._handleEnterKey() : t.which == d.ESC ? e._closeDropdown() : (t.which >= d.A && t.which <= d.Z || t.which == d.SPACE) && (o && clearTimeout(o), r += String.fromCharCode(t.which), e._searchForCountry(r), o = setTimeout(function () {
                    r = ""
                }, 1e3))
            })
        }, _handleUpDownKey: function (t) {
            var e = this.countryList.children(".highlight").first(), n = t == d.UP ? e.prev() : e.next();
            n.length && (n.hasClass("divider") && (n = t == d.UP ? n.prev() : n.next()), this._highlightListItem(n), this._scrollTo(n))
        }, _handleEnterKey: function () {
            var t = this.countryList.children(".highlight").first();
            t.length && this._selectListItem(t)
        }, _searchForCountry: function (t) {
            for (var e = 0; e < this.countries.length; e++) if (this._startsWith(this.countries[e].name, t)) {
                var n = this.countryList.children("[data-country-code=" + this.countries[e].iso2 + "]").not(".preferred");
                this._highlightListItem(n), this._scrollTo(n, !0);
                break
            }
        }, _startsWith: function (t, e) {
            return t.substr(0, e.length).toUpperCase() == e
        }, _updateValFromNumber: function (t) {
            if (this.options.formatOnDisplay && e.intlTelInputUtils && this.selectedCountryData) {
                var n = this.options.separateDialCode || !this.options.nationalMode && "+" == t.charAt(0) ? intlTelInputUtils.numberFormat.INTERNATIONAL : intlTelInputUtils.numberFormat.NATIONAL;
                t = intlTelInputUtils.formatNumber(t, this.selectedCountryData.iso2, n)
            }
            t = this._beforeSetNumber(t), this.telInput.val(t)
        }, _updateFlagFromNumber: function (e) {
            e && this.options.nationalMode && "1" == this.selectedCountryData.dialCode && "+" != e.charAt(0) && ("1" != e.charAt(0) && (e = "1" + e), e = "+" + e);
            var n = this._getDialCode(e), i = null, r = this._getNumeric(e);
            if (n) {
                var o = this.countryCodes[this._getNumeric(n)], a = t.inArray(this.selectedCountryData.iso2, o) > -1,
                    s = "+1" == n && r.length >= 4, d = "1" == this.selectedCountryData.dialCode;
                if ((!d || !this._isRegionlessNanp(r)) && (!a || s)) for (var l = 0; l < o.length; l++) if (o[l]) {
                    i = o[l];
                    break
                }
            } else "+" == e.charAt(0) && r.length ? i = "" : e && "+" != e || (i = this.defaultCountry);
            return null !== i && this._setFlag(i)
        }, _isRegionlessNanp: function (e) {
            var n = this._getNumeric(e);
            if ("1" == n.charAt(0)) {
                var i = n.substr(1, 3);
                return t.inArray(i, l) > -1
            }
            return !1
        }, _highlightListItem: function (t) {
            this.countryListItems.removeClass("highlight"), t.addClass("highlight")
        }, _getCountryData: function (t, e, n) {
            for (var i = e ? u : this.countries, r = 0; r < i.length; r++) if (i[r].iso2 == t) return i[r];
            if (n) return null;
            throw new Error("No country data for '" + t + "'")
        }, _setFlag: function (t) {
            var e = this.selectedCountryData.iso2 ? this.selectedCountryData : {};
            this.selectedCountryData = t ? this._getCountryData(t, !1, !1) : {}, this.selectedCountryData.iso2 && (this.defaultCountry = this.selectedCountryData.iso2), this.selectedFlagInner.attr("class", "iti-flag " + t);
            var n = t ? this.selectedCountryData.name + ": +" + this.selectedCountryData.dialCode : "Unknown";
            if (this.selectedFlagInner.parent().attr("title", n), this.options.separateDialCode) {
                var i = this.selectedCountryData.dialCode ? "+" + this.selectedCountryData.dialCode : "",
                    r = this.telInput.parent();
                e.dialCode && r.removeClass("iti-sdc-" + (e.dialCode.length + 1)), i && r.addClass("iti-sdc-" + i.length), this.selectedDialCode.text(i)
            }
            return this._updatePlaceholder(), this.countryListItems.removeClass("active"), t && this.countryListItems.find(".iti-flag." + t).first().closest(".country").addClass("active"), e.iso2 !== t
        }, _updatePlaceholder: function () {
            var t = "aggressive" === this.options.autoPlaceholder || !this.hadInitialPlaceholder && (this.options.autoPlaceholder === !0 || "polite" === this.options.autoPlaceholder);
            if (e.intlTelInputUtils && t) {
                var n = intlTelInputUtils.numberType[this.options.placeholderNumberType],
                    i = this.selectedCountryData.iso2 ? intlTelInputUtils.getExampleNumber(this.selectedCountryData.iso2, this.options.nationalMode, n) : "";
                i = this._beforeSetNumber(i), "function" == typeof this.options.customPlaceholder && (i = this.options.customPlaceholder(i, this.selectedCountryData)), this.telInput.attr("placeholder", i)
            }
        }, _selectListItem: function (t) {
            var e = this._setFlag(t.attr("data-country-code"));
            if (this._closeDropdown(), this._updateDialCode(t.attr("data-dial-code"), !0), this.telInput.focus(), this.isGoodBrowser) {
                var n = this.telInput.val().length;
                this.telInput[0].setSelectionRange(n, n)
            }
            e && this._triggerCountryChange()
        }, _closeDropdown: function () {
            this.countryList.addClass("hide"), this.selectedFlagInner.children(".iti-arrow").removeClass("up"), t(n).off(this.ns), t("html").off(this.ns), this.countryList.off(this.ns), this.options.dropdownContainer && (this.isMobile || t(e).off("scroll" + this.ns), this.dropdown.detach()), this.telInput.trigger("close:countrydropdown")
        }, _scrollTo: function (t, e) {
            var n = this.countryList, i = n.height(), r = n.offset().top, o = r + i, a = t.outerHeight(),
                s = t.offset().top, d = s + a, l = s - r + n.scrollTop(), u = i / 2 - a / 2;
            if (s < r) e && (l -= u), n.scrollTop(l); else if (d > o) {
                e && (l += u);
                var c = i - a;
                n.scrollTop(l - c)
            }
        }, _updateDialCode: function (t, e) {
            var n, i = this.telInput.val();
            if (t = "+" + t, "+" == i.charAt(0)) {
                var r = this._getDialCode(i);
                n = r ? i.replace(r, t) : t
            } else {
                if (this.options.nationalMode || this.options.separateDialCode) return;
                if (i) n = t + i; else {
                    if (!e && this.options.autoHideDialCode) return;
                    n = t
                }
            }
            this.telInput.val(n)
        }, _getDialCode: function (e) {
            var n = "";
            if ("+" == e.charAt(0)) for (var i = "", r = 0; r < e.length; r++) {
                var o = e.charAt(r);
                if (t.isNumeric(o) && (i += o, this.countryCodes[i] && (n = e.substr(0, r + 1)), 4 == i.length)) break
            }
            return n
        }, _getFullNumber: function () {
            var e, n = t.trim(this.telInput.val()), i = this.selectedCountryData.dialCode, r = this._getNumeric(n),
                o = "1" == r.charAt(0) ? r : "1" + r;
            return e = this.options.separateDialCode ? "+" + i : "+" != n.charAt(0) && "1" != n.charAt(0) && i && "1" == i.charAt(0) && 4 == i.length && i != o.substr(0, 4) ? i.substr(1) : "", e + n
        }, _beforeSetNumber: function (t) {
            if (this.options.separateDialCode) {
                var e = this._getDialCode(t);
                if (e) {
                    null !== this.selectedCountryData.areaCodes && (e = "+" + this.selectedCountryData.dialCode);
                    var n = " " === t[e.length] || "-" === t[e.length] ? e.length + 1 : e.length;
                    t = t.substr(n)
                }
            }
            return this._cap(t)
        }, _triggerCountryChange: function () {
            this.telInput.trigger("countrychange", this.selectedCountryData)
        }, handleAutoCountry: function () {
            "auto" === this.options.initialCountry && (this.defaultCountry = t.fn[o].autoCountry, this.telInput.val() || this.setCountry(this.defaultCountry), this.autoCountryDeferred.resolve())
        }, handleUtils: function () {
            e.intlTelInputUtils && (this.telInput.val() && this._updateValFromNumber(this.telInput.val()), this._updatePlaceholder()), this.utilsScriptDeferred.resolve()
        }, destroy: function () {
            if (this.allowDropdown && (this._closeDropdown(), this.selectedFlagInner.parent().off(this.ns), this.telInput.closest("label").off(this.ns)), this.options.autoHideDialCode) {
                var e = this.telInput.prop("form");
                e && t(e).off(this.ns)
            }
            this.telInput.off(this.ns);
            var n = this.telInput.parent();
            n.before(this.telInput).remove()
        }, getExtension: function () {
            return e.intlTelInputUtils ? intlTelInputUtils.getExtension(this._getFullNumber(), this.selectedCountryData.iso2) : ""
        }, getNumber: function (t) {
            return e.intlTelInputUtils ? intlTelInputUtils.formatNumber(this._getFullNumber(), this.selectedCountryData.iso2, t) : ""
        }, getNumberType: function () {
            return e.intlTelInputUtils ? intlTelInputUtils.getNumberType(this._getFullNumber(), this.selectedCountryData.iso2) : -99
        }, getSelectedCountryData: function () {
            return this.selectedCountryData
        }, getValidationError: function () {
            return e.intlTelInputUtils ? intlTelInputUtils.getValidationError(this._getFullNumber(), this.selectedCountryData.iso2) : -99
        }, isValidNumber: function () {
            var n = t.trim(this._getFullNumber()), i = this.options.nationalMode ? this.selectedCountryData.iso2 : "";
            return e.intlTelInputUtils ? intlTelInputUtils.isValidNumber(n, i) : null
        }, setCountry: function (t) {
            t = t.toLowerCase(), this.selectedFlagInner.hasClass(t) || (this._setFlag(t), this._updateDialCode(this.selectedCountryData.dialCode, !1), this._triggerCountryChange())
        }, setNumber: function (t) {
            var e = this._updateFlagFromNumber(t);
            this._updateValFromNumber(t), e && this._triggerCountryChange()
        }
    }, t.fn[o] = function (e) {
        var n = arguments;
        if (e === i || "object" == typeof e) {
            var a = [];
            return this.each(function () {
                if (!t.data(this, "plugin_" + o)) {
                    var n = new r(this, e), i = n._init();
                    a.push(i[0]), a.push(i[1]), t.data(this, "plugin_" + o, n)
                }
            }), t.when.apply(null, a)
        }
        if ("string" == typeof e && "_" !== e[0]) {
            var s;
            return this.each(function () {
                var i = t.data(this, "plugin_" + o);
                i instanceof r && "function" == typeof i[e] && (s = i[e].apply(i, Array.prototype.slice.call(n, 1))), "destroy" === e && t.data(this, "plugin_" + o, null)
            }), s !== i ? s : this
        }
    }, t.fn[o].getCountryData = function () {
        return u
    }, t.fn[o].loadUtils = function (e, n) {
        t.fn[o].loadedUtilsScript ? n && n.resolve() : (t.fn[o].loadedUtilsScript = !0, t.ajax({
            type: "GET",
            url: e,
            complete: function () {
                t(".intl-tel-input input").intlTelInput("handleUtils")
            },
            dataType: "script",
            cache: !0
        }))
    }, t.fn[o].defaults = s, t.fn[o].version = "12.0.2";
    for (var u = [["Afghanistan (‫افغانستان‬‎)", "af", "93"], ["Albania (Shqipëri)", "al", "355"], ["Algeria (‫الجزائر‬‎)", "dz", "213"], ["American Samoa", "as", "1684"], ["Andorra", "ad", "376"], ["Angola", "ao", "244"], ["Anguilla", "ai", "1264"], ["Antigua and Barbuda", "ag", "1268"], ["Argentina", "ar", "54"], ["Armenia (Հայաստան)", "am", "374"], ["Aruba", "aw", "297"], ["Australia", "au", "61", 0], ["Austria (Österreich)", "at", "43"], ["Azerbaijan (Azərbaycan)", "az", "994"], ["Bahamas", "bs", "1242"], ["Bahrain (‫البحرين‬‎)", "bh", "973"], ["Bangladesh (বাংলাদেশ)", "bd", "880"], ["Barbados", "bb", "1246"], ["Belarus (Беларусь)", "by", "375"], ["Belgium (België)", "be", "32"], ["Belize", "bz", "501"], ["Benin (Bénin)", "bj", "229"], ["Bermuda", "bm", "1441"], ["Bhutan (འབྲུག)", "bt", "975"], ["Bolivia", "bo", "591"], ["Bosnia and Herzegovina (Босна и Херцеговина)", "ba", "387"], ["Botswana", "bw", "267"], ["Brazil (Brasil)", "br", "55"], ["British Indian Ocean Territory", "io", "246"], ["British Virgin Islands", "vg", "1284"], ["Brunei", "bn", "673"], ["Bulgaria (България)", "bg", "359"], ["Burkina Faso", "bf", "226"], ["Burundi (Uburundi)", "bi", "257"], ["Cambodia (កម្ពុជា)", "kh", "855"], ["Cameroon (Cameroun)", "cm", "237"], ["Canada", "ca", "1", 1, ["204", "226", "236", "249", "250", "289", "306", "343", "365", "387", "403", "416", "418", "431", "437", "438", "450", "506", "514", "519", "548", "579", "581", "587", "604", "613", "639", "647", "672", "705", "709", "742", "778", "780", "782", "807", "819", "825", "867", "873", "902", "905"]], ["Cape Verde (Kabu Verdi)", "cv", "238"], ["Caribbean Netherlands", "bq", "599", 1], ["Cayman Islands", "ky", "1345"], ["Central African Republic (République centrafricaine)", "cf", "236"], ["Chad (Tchad)", "td", "235"], ["Chile", "cl", "56"], ["China (中国)", "cn", "86"], ["Christmas Island", "cx", "61", 2], ["Cocos (Keeling) Islands", "cc", "61", 1], ["Colombia", "co", "57"], ["Comoros (‫جزر القمر‬‎)", "km", "269"], ["Congo (DRC) (Jamhuri ya Kidemokrasia ya Kongo)", "cd", "243"], ["Congo (Republic) (Congo-Brazzaville)", "cg", "242"], ["Cook Islands", "ck", "682"], ["Costa Rica", "cr", "506"], ["Côte d’Ivoire", "ci", "225"], ["Croatia (Hrvatska)", "hr", "385"], ["Cuba", "cu", "53"], ["Curaçao", "cw", "599", 0], ["Cyprus (Κύπρος)", "cy", "357"], ["Czech Republic (Česká republika)", "cz", "420"], ["Denmark (Danmark)", "dk", "45"], ["Djibouti", "dj", "253"], ["Dominica", "dm", "1767"], ["Dominican Republic (República Dominicana)", "do", "1", 2, ["809", "829", "849"]], ["Ecuador", "ec", "593"], ["Egypt (‫مصر‬‎)", "eg", "20"], ["El Salvador", "sv", "503"], ["Equatorial Guinea (Guinea Ecuatorial)", "gq", "240"], ["Eritrea", "er", "291"], ["Estonia (Eesti)", "ee", "372"], ["Ethiopia", "et", "251"], ["Falkland Islands (Islas Malvinas)", "fk", "500"], ["Faroe Islands (Føroyar)", "fo", "298"], ["Fiji", "fj", "679"], ["Finland (Suomi)", "fi", "358", 0], ["France", "fr", "33"], ["French Guiana (Guyane française)", "gf", "594"], ["French Polynesia (Polynésie française)", "pf", "689"], ["Gabon", "ga", "241"], ["Gambia", "gm", "220"], ["Georgia (საქართველო)", "ge", "995"], ["Germany (Deutschland)", "de", "49"], ["Ghana (Gaana)", "gh", "233"], ["Gibraltar", "gi", "350"], ["Greece (Ελλάδα)", "gr", "30"], ["Greenland (Kalaallit Nunaat)", "gl", "299"], ["Grenada", "gd", "1473"], ["Guadeloupe", "gp", "590", 0], ["Guam", "gu", "1671"], ["Guatemala", "gt", "502"], ["Guernsey", "gg", "44", 1], ["Guinea (Guinée)", "gn", "224"], ["Guinea-Bissau (Guiné Bissau)", "gw", "245"], ["Guyana", "gy", "592"], ["Haiti", "ht", "509"], ["Honduras", "hn", "504"], ["Hong Kong (香港)", "hk", "852"], ["Hungary (Magyarország)", "hu", "36"], ["Iceland (Ísland)", "is", "354"], ["India (भारत)", "in", "91"], ["Indonesia", "id", "62"], ["Iran (‫ایران‬‎)", "ir", "98"], ["Iraq (‫العراق‬‎)", "iq", "964"], ["Ireland", "ie", "353"], ["Isle of Man", "im", "44", 2], ["Israel (‫ישראל‬‎)", "il", "972"], ["Italy (Italia)", "it", "39", 0], ["Jamaica", "jm", "1876"], ["Japan (日本)", "jp", "81"], ["Jersey", "je", "44", 3], ["Jordan (‫الأردن‬‎)", "jo", "962"], ["Kazakhstan (Казахстан)", "kz", "7", 1], ["Kenya", "ke", "254"], ["Kiribati", "ki", "686"], ["Kosovo", "xk", "383"], ["Kuwait (‫الكويت‬‎)", "kw", "965"], ["Kyrgyzstan (Кыргызстан)", "kg", "996"], ["Laos (ລາວ)", "la", "856"], ["Latvia (Latvija)", "lv", "371"], ["Lebanon (‫لبنان‬‎)", "lb", "961"], ["Lesotho", "ls", "266"], ["Liberia", "lr", "231"], ["Libya (‫ليبيا‬‎)", "ly", "218"], ["Liechtenstein", "li", "423"], ["Lithuania (Lietuva)", "lt", "370"], ["Luxembourg", "lu", "352"], ["Macau (澳門)", "mo", "853"], ["Macedonia (FYROM) (Македонија)", "mk", "389"], ["Madagascar (Madagasikara)", "mg", "261"], ["Malawi", "mw", "265"], ["Malaysia", "my", "60"], ["Maldives", "mv", "960"], ["Mali", "ml", "223"], ["Malta", "mt", "356"], ["Marshall Islands", "mh", "692"], ["Martinique", "mq", "596"], ["Mauritania (‫موريتانيا‬‎)", "mr", "222"], ["Mauritius (Moris)", "mu", "230"], ["Mayotte", "yt", "262", 1], ["Mexico (México)", "mx", "52"], ["Micronesia", "fm", "691"], ["Moldova (Republica Moldova)", "md", "373"], ["Monaco", "mc", "377"], ["Mongolia (Монгол)", "mn", "976"], ["Montenegro (Crna Gora)", "me", "382"], ["Montserrat", "ms", "1664"], ["Morocco (‫المغرب‬‎)", "ma", "212", 0], ["Mozambique (Moçambique)", "mz", "258"], ["Myanmar (Burma) (မြန်မာ)", "mm", "95"], ["Namibia (Namibië)", "na", "264"], ["Nauru", "nr", "674"], ["Nepal (नेपाल)", "np", "977"], ["Netherlands (Nederland)", "nl", "31"], ["New Caledonia (Nouvelle-Calédonie)", "nc", "687"], ["New Zealand", "nz", "64"], ["Nicaragua", "ni", "505"], ["Niger (Nijar)", "ne", "227"], ["Nigeria", "ng", "234"], ["Niue", "nu", "683"], ["Norfolk Island", "nf", "672"], ["North Korea (조선 민주주의 인민 공화국)", "kp", "850"], ["Northern Mariana Islands", "mp", "1670"], ["Norway (Norge)", "no", "47", 0], ["Oman (‫عُمان‬‎)", "om", "968"], ["Pakistan (‫پاکستان‬‎)", "pk", "92"], ["Palau", "pw", "680"], ["Palestine (‫فلسطين‬‎)", "ps", "970"], ["Panama (Panamá)", "pa", "507"], ["Papua New Guinea", "pg", "675"], ["Paraguay", "py", "595"], ["Peru (Perú)", "pe", "51"], ["Philippines", "ph", "63"], ["Poland (Polska)", "pl", "48"], ["Portugal", "pt", "351"], ["Puerto Rico", "pr", "1", 3, ["787", "939"]], ["Qatar (‫قطر‬‎)", "qa", "974"], ["Réunion (La Réunion)", "re", "262", 0], ["Romania (România)", "ro", "40"], ["Russia (Россия)", "ru", "7", 0], ["Rwanda", "rw", "250"], ["Saint Barthélemy", "bl", "590", 1], ["Saint Helena", "sh", "290"], ["Saint Kitts and Nevis", "kn", "1869"], ["Saint Lucia", "lc", "1758"], ["Saint Martin (Saint-Martin (partie française))", "mf", "590", 2], ["Saint Pierre and Miquelon (Saint-Pierre-et-Miquelon)", "pm", "508"], ["Saint Vincent and the Grenadines", "vc", "1784"], ["Samoa", "ws", "685"], ["San Marino", "sm", "378"], ["São Tomé and Príncipe (São Tomé e Príncipe)", "st", "239"], ["Saudi Arabia (‫المملكة العربية السعودية‬‎)", "sa", "966"], ["Senegal (Sénégal)", "sn", "221"], ["Serbia (Србија)", "rs", "381"], ["Seychelles", "sc", "248"], ["Sierra Leone", "sl", "232"], ["Singapore", "sg", "65"], ["Sint Maarten", "sx", "1721"], ["Slovakia (Slovensko)", "sk", "421"], ["Slovenia (Slovenija)", "si", "386"], ["Solomon Islands", "sb", "677"], ["Somalia (Soomaaliya)", "so", "252"], ["South Africa", "za", "27"], ["South Korea (대한민국)", "kr", "82"], ["South Sudan (‫جنوب السودان‬‎)", "ss", "211"], ["Spain (España)", "es", "34"], ["Sri Lanka (ශ්‍රී ලංකාව)", "lk", "94"], ["Sudan (‫السودان‬‎)", "sd", "249"], ["Suriname", "sr", "597"], ["Svalbard and Jan Mayen", "sj", "47", 1], ["Swaziland", "sz", "268"], ["Sweden (Sverige)", "se", "46"], ["Switzerland (Schweiz)", "ch", "41"], ["Syria (‫سوريا‬‎)", "sy", "963"], ["Taiwan (台灣)", "tw", "886"], ["Tajikistan", "tj", "992"], ["Tanzania", "tz", "255"], ["Thailand (ไทย)", "th", "66"], ["Timor-Leste", "tl", "670"], ["Togo", "tg", "228"], ["Tokelau", "tk", "690"], ["Tonga", "to", "676"], ["Trinidad and Tobago", "tt", "1868"], ["Tunisia (‫تونس‬‎)", "tn", "216"], ["Turkey (Türkiye)", "tr", "90"], ["Turkmenistan", "tm", "993"], ["Turks and Caicos Islands", "tc", "1649"], ["Tuvalu", "tv", "688"], ["U.S. Virgin Islands", "vi", "1340"], ["Uganda", "ug", "256"], ["Ukraine (Україна)", "ua", "380"], ["United Arab Emirates (‫الإمارات العربية المتحدة‬‎)", "ae", "971"], ["United Kingdom", "gb", "44", 0], ["United States", "us", "1", 0], ["Uruguay", "uy", "598"], ["Uzbekistan (Oʻzbekiston)", "uz", "998"], ["Vanuatu", "vu", "678"], ["Vatican City (Città del Vaticano)", "va", "39", 1], ["Venezuela", "ve", "58"], ["Vietnam (Việt Nam)", "vn", "84"], ["Wallis and Futuna (Wallis-et-Futuna)", "wf", "681"], ["Western Sahara (‫الصحراء الغربية‬‎)", "eh", "212", 1], ["Yemen (‫اليمن‬‎)", "ye", "967"], ["Zambia", "zm", "260"], ["Zimbabwe", "zw", "263"], ["Åland Islands", "ax", "358", 1]], c = 0; c < u.length; c++) {
        var h = u[c];
        u[c] = {name: h[0], iso2: h[1], dialCode: h[2], priority: h[3] || 0, areaCodes: h[4] || null}
    }
}), function () {
    function t(t) {
        return "string" == typeof t
    }

    function e(t, e) {
        var n = t.split("."), i = rt;
        n[0] in i || !i.execScript || i.execScript("var " + n[0]);
        for (var r; n.length && (r = n.shift());) n.length || void 0 === e ? i = i[r] ? i[r] : i[r] = {} : i[r] = e
    }

    function n(t, e) {
        function n() {
        }

        n.prototype = e.prototype, t.aa = e.prototype, t.prototype = new n, t.prototype.constructor = t, t.$ = function (t, n, i) {
            for (var r = Array(arguments.length - 2), o = 2; o < arguments.length; o++) r[o - 2] = arguments[o];
            return e.prototype[n].apply(t, r)
        }
    }

    function i(t, e) {
        t.sort(e || r)
    }

    function r(t, e) {
        return t > e ? 1 : t < e ? -1 : 0
    }

    function o(t) {
        var e, n = [], i = 0;
        for (e in t) n[i++] = t[e];
        return n
    }

    function a(t, e) {
        switch (this.a = t, this.h = !!e.i, this.b = e.c, this.m = e.type, this.l = !1, this.b) {
            case dt:
            case lt:
            case ut:
            case ct:
            case ht:
            case st:
            case at:
                this.l = !0
        }
        this.g = e.defaultValue
    }

    function s(t, e) {
        this.b = t, this.a = {};
        for (var n = 0; n < e.length; n++) {
            var i = e[n];
            this.a[i.a] = i
        }
    }

    function d(t) {
        return t = o(t.a), i(t, function (t, e) {
            return t.a - e.a
        }), t
    }

    function l() {
        this.a = {}, this.g = this.f().a, this.b = this.h = null
    }

    function u(t, e) {
        for (var n = d(t.f()), i = 0; i < n.length; i++) {
            var r = n[i], o = r.a;
            if (null != e.a[o]) {
                t.b && delete t.b[r.a];
                var a = 11 == r.b || 10 == r.b;
                if (r.h) for (var r = f(e, o), s = 0; s < r.length; s++) {
                    var l = t, h = o, p = a ? r[s].clone() : r[s];
                    l.a[h] || (l.a[h] = []), l.a[h].push(p), l.b && delete l.b[h]
                } else r = c(e, o), a ? (a = c(t, o)) ? u(a, r) : $(t, o, r.clone()) : $(t, o, r)
            }
        }
    }

    function c(t, e) {
        var n = t.a[e];
        if (null == n) return null;
        if (t.h) {
            if (!(e in t.b)) {
                var i = t.h, r = t.g[e];
                if (null != n) if (r.h) {
                    for (var o = [], a = 0; a < n.length; a++) o[a] = i.a(r, n[a]);
                    n = o
                } else n = i.a(r, n);
                return t.b[e] = n
            }
            return t.b[e]
        }
        return n
    }

    function h(t, e, n) {
        var i = c(t, e);
        return t.g[e].h ? i[n || 0] : i
    }

    function p(t, e) {
        var n;
        if (null != t.a[e]) n = h(t, e, void 0); else t:{
            if (n = t.g[e], void 0 === n.g) {
                var i = n.m;
                if (i === Boolean) n.g = !1; else if (i === Number) n.g = 0; else {
                    if (i !== String) {
                        n = new i;
                        break t
                    }
                    n.g = n.l ? "0" : ""
                }
            }
            n = n.g
        }
        return n
    }

    function f(t, e) {
        return c(t, e) || []
    }

    function g(t, e) {
        return t.g[e].h ? null != t.a[e] ? t.a[e].length : 0 : null != t.a[e] ? 1 : 0
    }

    function $(t, e, n) {
        t.a[e] = n, t.b && (t.b[e] = n)
    }

    function m(t, e) {
        var n, i = [];
        for (n in e) 0 != n && i.push(new a(n, e[n]));
        return new s(t, i)
    }

    function v() {
    }

    function y() {
    }

    function b() {
    }

    function C(t, e) {
        null != t && this.a.apply(this, arguments)
    }

    function w() {
        l.call(this)
    }

    function x() {
        l.call(this)
    }

    function S() {
        l.call(this)
    }

    function T() {
        l.call(this)
    }

    function k() {
        this.a = {}
    }

    function D(t) {
        var e = t.search(Tt);
        return 0 <= e ? (t = t.substring(e), t = t.replace(Dt, ""), e = t.search(kt), 0 <= e && (t = t.substring(0, e))) : t = "", t
    }

    function _(t) {
        return !(2 > t.length) && K(At, t)
    }

    function I(t) {
        return K(_t, t) ? L(t, wt) : L(t, Ct)
    }

    function A(t) {
        var e = I(t.toString());
        t.b = "", t.a(e)
    }

    function j(t) {
        return !!t && (1 != g(t, 9) || -1 != f(t, 9)[0])
    }

    function L(t, e) {
        for (var n, i = new C, r = t.length, o = 0; o < r; ++o) n = t.charAt(o), n = e[n.toUpperCase()], null != n && i.a(n);
        return i.toString()
    }

    function N(t) {
        return null != t && isNaN(t) && t.toUpperCase() in bt
    }

    function E(t, e, n) {
        if (0 == h(e, 2) && null != e.a[5]) {
            var i = p(e, 5);
            if (0 < i.length) return i
        }
        var i = p(e, 1), r = M(e);
        if (0 == n) return R(i, 0, r, "");
        if (!(i in yt)) return r;
        t = P(t, i, U(i)), e = null != e.a[3] && h(e, 3).length ? 3 == n ? ";ext=" + h(e, 3) : null != t.a[13] ? h(t, 13) + p(e, 3) : " ext. " + p(e, 3) : "";
        t:{
            t = f(t, 20).length && 2 != n ? f(t, 20) : f(t, 19);
            for (var o, a = t.length, s = 0; s < a; ++s) {
                o = t[s];
                var d = g(o, 3);
                if ((!d || !r.search(h(o, 3, d - 1))) && (d = new RegExp(h(o, 1)), K(d, r))) {
                    t = o;
                    break t
                }
            }
            t = null
        }
        return t && (a = t, t = p(a, 2), o = new RegExp(h(a, 1)), p(a, 5), a = p(a, 4), r = 2 == n && null != a && 0 < a.length ? r.replace(o, t.replace(jt, a)) : r.replace(o, t), 3 == n && (r = r.replace(RegExp("^[-x‐-―−ー－-／  ­​⁠　()（）［］.\\[\\]/~⁓∼～]+"), ""), r = r.replace(RegExp("[-x‐-―−ー－-／  ­​⁠　()（）［］.\\[\\]/~⁓∼～]+", "g"), "-"))), R(i, n, r, e)
    }

    function P(t, e, n) {
        return "001" == n ? F(t, "" + e) : F(t, n)
    }

    function M(t) {
        if (null == t.a[2]) return "";
        var e = "" + h(t, 2);
        return null != t.a[4] && h(t, 4) && 0 < p(t, 8) ? Array(p(t, 8) + 1).join("0") + e : e
    }

    function R(t, e, n, i) {
        switch (e) {
            case 0:
                return "+" + t + n + i;
            case 1:
                return "+" + t + " " + n + i;
            case 3:
                return "tel:+" + t + "-" + n + i;
            default:
                return n + i
        }
    }

    function O(t, e) {
        switch (e) {
            case 4:
                return h(t, 5);
            case 3:
                return h(t, 4);
            case 1:
                return h(t, 3);
            case 0:
            case 2:
                return h(t, 2);
            case 5:
                return h(t, 6);
            case 6:
                return h(t, 8);
            case 7:
                return h(t, 7);
            case 8:
                return h(t, 21);
            case 9:
                return h(t, 25);
            case 10:
                return h(t, 28);
            default:
                return h(t, 1)
        }
    }

    function H(t, e) {
        return B(t, h(e, 1)) ? B(t, h(e, 5)) ? 4 : B(t, h(e, 4)) ? 3 : B(t, h(e, 6)) ? 5 : B(t, h(e, 8)) ? 6 : B(t, h(e, 7)) ? 7 : B(t, h(e, 21)) ? 8 : B(t, h(e, 25)) ? 9 : B(t, h(e, 28)) ? 10 : B(t, h(e, 2)) ? h(e, 18) || B(t, h(e, 3)) ? 2 : 0 : !h(e, 18) && B(t, h(e, 3)) ? 1 : -1 : -1
    }

    function F(t, e) {
        if (null == e) return null;
        e = e.toUpperCase();
        var n = t.a[e];
        if (!n) {
            if (n = bt[e], !n) return null;
            n = (new b).b(S.f(), n), t.a[e] = n
        }
        return n
    }

    function B(t, e) {
        var n = t.length;
        return !(0 < g(e, 9) && -1 == ot(f(e, 9), n)) && K(p(e, 2), t)
    }

    function Q(t, e) {
        if (!e) return null;
        var n = p(e, 1);
        if (n = yt[n]) if (1 == n.length) n = n[0]; else t:{
            for (var i, r = M(e), o = n.length, a = 0; a < o; a++) {
                i = n[a];
                var s = F(t, i);
                if (null != s.a[23]) {
                    if (!r.search(h(s, 23))) {
                        n = i;
                        break t
                    }
                } else if (-1 != H(r, s)) {
                    n = i;
                    break t
                }
            }
            n = null
        } else n = null;
        return n
    }

    function U(t) {
        return (t = yt[t]) ? t[0] : "ZZ"
    }

    function W(t, e, n, r) {
        var o = O(n, r), a = g(o, 9) ? f(o, 9) : f(h(n, 1), 9), o = f(o, 10);
        if (2 == r) {
            if (!j(O(n, 0))) return W(t, e, n, 1);
            t = O(n, 1), j(t) && (a = a.concat(g(t, 9) ? f(t, 9) : f(h(n, 1), 9)), i(a), o.length ? (o = o.concat(f(t, 10)), i(o)) : o = f(t, 10))
        }
        return -1 == a[0] ? 5 : (e = e.length, -1 < ot(o, e) ? 4 : (n = a[0], n == e ? 0 : n > e ? 2 : a[a.length - 1] < e ? 3 : -1 < ot(a, e, 1) ? 0 : 5))
    }

    function z(t, e, n, i, r, o) {
        if (!e.length) return 0;
        e = new C(e);
        var a;
        n && (a = h(n, 11)), null == a && (a = "NonMatch");
        var s = e.toString();
        if (s.length) if (xt.test(s)) s = s.replace(xt, ""), e.b = "", e.a(I(s)), a = 1; else {
            if (s = new RegExp(a), A(e), a = e.toString(), a.search(s)) a = !1; else {
                var s = a.match(s)[0].length, d = a.substring(s).match(St);
                d && null != d[1] && 0 < d[1].length && "0" == L(d[1], Ct) ? a = !1 : (e.b = "", e.a(a.substring(s)), a = !0)
            }
            a = a ? 5 : 20
        } else a = 20;
        if (r && $(o, 6, a), 20 != a) {
            if (2 >= e.b.length) throw Error("Phone number too short after IDD");
            t:{
                if (t = e.toString(), t.length && "0" != t.charAt(0)) for (r = t.length, e = 1; 3 >= e && e <= r; ++e) if (n = parseInt(t.substring(0, e), 10), n in yt) {
                    i.a(t.substring(e)), i = n;
                    break t
                }
                i = 0
            }
            if (i) return $(o, 1, i), i;
            throw Error("Invalid country calling code")
        }
        return n && (a = p(n, 10), s = "" + a, d = e.toString(), !d.lastIndexOf(s, 0) && (s = new C(d.substring(s.length)), d = h(n, 1), d = new RegExp(p(d, 2)), q(s, n, null), s = s.toString(), !K(d, e.toString()) && K(d, s) || 3 == W(t, e.toString(), n, -1))) ? (i.a(s), r && $(o, 6, 10), $(o, 1, a), a) : ($(o, 1, 0), 0)
    }

    function q(t, e, n) {
        var i = t.toString(), r = i.length, o = h(e, 15);
        if (r && null != o && o.length) {
            var a = new RegExp("^(?:" + o + ")");
            if (r = a.exec(i)) {
                var o = new RegExp(p(h(e, 1), 2)), s = K(o, i), d = r.length - 1;
                e = h(e, 16), null != e && e.length && null != r[d] && r[d].length ? (i = i.replace(a, e), (!s || K(o, i)) && (n && 0 < d && n.a(r[1]), t.set(i))) : s && !K(o, i.substring(r[0].length)) || (n && 0 < d && null != r[d] && n.a(r[1]), t.set(i.substring(r[0].length)))
            }
        }
    }

    function V(t, e, n) {
        if (!N(n) && 0 < e.length && "+" != e.charAt(0)) throw Error("Invalid country calling code");
        return G(t, e, n, !0)
    }

    function G(t, e, n, i) {
        if (null == e) throw Error("The string supplied did not seem to be a phone number");
        if (250 < e.length) throw Error("The string supplied is too long to be a phone number");
        var r = new C, o = e.indexOf(";phone-context=");
        if (0 <= o) {
            var a = o + 15;
            if ("+" == e.charAt(a)) {
                var s = e.indexOf(";", a);
                0 < s ? r.a(e.substring(a, s)) : r.a(e.substring(a))
            }
            a = e.indexOf("tel:"), r.a(e.substring(0 <= a ? a + 4 : 0, o))
        } else r.a(D(e));
        if (o = r.toString(), a = o.indexOf(";isub="), 0 < a && (r.b = "", r.a(o.substring(0, a))), !_(r.toString())) throw Error("The string supplied did not seem to be a phone number");
        if (o = r.toString(), !(N(n) || null != o && 0 < o.length && xt.test(o))) throw Error("Invalid country calling code");
        o = new T, i && $(o, 5, e);
        t:{
            if (e = r.toString(), a = e.search(It), 0 <= a && _(e.substring(0, a))) for (var s = e.match(It), d = s.length, l = 1; l < d; ++l) if (null != s[l] && 0 < s[l].length) {
                r.b = "", r.a(e.substring(0, a)), e = s[l];
                break t
            }
            e = ""
        }
        0 < e.length && $(o, 3, e), a = F(t, n), e = new C, s = 0, d = r.toString();
        try {
            s = z(t, d, a, e, i, o)
        } catch (n) {
            if ("Invalid country calling code" != n.message || !xt.test(d)) throw n;
            if (d = d.replace(xt, ""), s = z(t, d, a, e, i, o), !s) throw n
        }
        if (s ? (r = U(s), r != n && (a = P(t, s, r))) : (A(r), e.a(r.toString()), null != n ? (s = p(a, 10), $(o, 1, s)) : i && (delete o.a[6], o.b && delete o.b[6])), 2 > e.b.length) throw Error("The string supplied is too short to be a phone number");
        if (a && (n = new C, r = new C(e.toString()), q(r, a, n), t = W(t, r.toString(), a, -1), 2 != t && 4 != t && 5 != t && (e = r, i && 0 < n.toString().length && $(o, 7, n.toString()))), i = e.toString(), t = i.length, 2 > t) throw Error("The string supplied is too short to be a phone number");
        if (17 < t) throw Error("The string supplied is too long to be a phone number");
        if (1 < i.length && "0" == i.charAt(0)) {
            for ($(o, 4, !0), t = 1; t < i.length - 1 && "0" == i.charAt(t);) t++;
            1 != t && $(o, 8, t)
        }
        return $(o, 2, parseInt(i, 10)), o
    }

    function K(t, e) {
        var n = "string" == typeof t ? e.match("^(?:" + t + ")$") : e.match(t);
        return !(!n || n[0].length != e.length)
    }

    for (var J = "function" == typeof Object.defineProperties ? Object.defineProperty : function (t, e, n) {
        if (n.get || n.set) throw new TypeError("ES3 does not support getters and setters.");
        t != Array.prototype && t != Object.prototype && (t[e] = n.value)
    }, X = "undefined" != typeof window && window === this ? this : "undefined" != typeof global && null != global ? global : this, Y = ["String", "prototype", "repeat"], Z = 0; Z < Y.length - 1; Z++) {
        var tt = Y[Z];
        tt in X || (X[tt] = {}), X = X[tt]
    }
    var et = Y[Y.length - 1], nt = X[et], it = nt ? nt : function (t) {
        var e;
        if (null == this) throw new TypeError("The 'this' value for String.prototype.repeat must not be null or undefined");
        if (e = this + "", 0 > t || 1342177279 < t) throw new RangeError("Invalid count value");
        t |= 0;
        for (var n = ""; t;) 1 & t && (n += e), (t >>>= 1) && (e += e);
        return n
    };
    it != nt && null != it && J(X, et, {configurable: !0, writable: !0, value: it});
    var rt = this, ot = Array.prototype.indexOf ? function (t, e, n) {
        return Array.prototype.indexOf.call(t, e, n)
    } : function (e, n, i) {
        if (i = null == i ? 0 : 0 > i ? Math.max(0, e.length + i) : i, t(e)) return t(n) && 1 == n.length ? e.indexOf(n, i) : -1;
        for (; i < e.length; i++) if (i in e && e[i] === n) return i;
        return -1
    }, at = 1, st = 2, dt = 3, lt = 4, ut = 6, ct = 16, ht = 18;
    l.prototype.has = function (t) {
        return null != this.a[t.a]
    }, l.prototype.get = function (t, e) {
        return h(this, t.a, e)
    }, l.prototype.set = function (t, e) {
        $(this, t.a, e)
    }, l.prototype.clone = function () {
        var t = new this.constructor;
        return t != this && (t.a = {}, t.b && (t.b = {}), u(t, this)), t
    }, v.prototype.b = function (t) {
        throw new t.b, Error("Unimplemented")
    }, v.prototype.a = function (e, n) {
        if (11 == e.b || 10 == e.b) return n instanceof l ? n : this.b(e.m.prototype.f(), n);
        if (14 == e.b) {
            if (t(n) && pt.test(n)) {
                var i = Number(n);
                if (0 < i) return i
            }
            return n
        }
        if (!e.l) return n;
        if (i = e.m, i === String) {
            if ("number" == typeof n) return String(n)
        } else if (i === Number && t(n) && ("Infinity" === n || "-Infinity" === n || "NaN" === n || pt.test(n))) return Number(n);
        return n
    };
    var pt = /^-?[0-9]+$/;
    n(y, v), y.prototype.b = function (t, e) {
        var n = new t.b;
        return n.h = this, n.a = e, n.b = {}, n
    }, n(b, y), b.prototype.a = function (t, e) {
        return 8 == t.b ? !!e : v.prototype.a.apply(this, arguments)
    }, C.prototype.b = "", C.prototype.set = function (t) {
        this.b = "" + t
    }, C.prototype.a = function (t, e, n) {
        if (this.b += String(t), null != e) for (var i = 1; i < arguments.length; i++) this.b += arguments[i];
        return this
    }, C.prototype.toString = function () {
        return this.b
    }, n(w, l);
    var ft = null;
    n(x, l);
    var gt = null;
    n(S, l);
    var $t = null;
    w.prototype.f = function () {
        var t = ft;
        return t || (ft = t = m(w, {
            0: {name: "NumberFormat", j: "i18n.phonenumbers.NumberFormat"},
            1: {name: "pattern", required: !0, c: 9, type: String},
            2: {name: "format", required: !0, c: 9, type: String},
            3: {name: "leading_digits_pattern", i: !0, c: 9, type: String},
            4: {name: "national_prefix_formatting_rule", c: 9, type: String},
            6: {name: "national_prefix_optional_when_formatting", c: 8, defaultValue: !1, type: Boolean},
            5: {name: "domestic_carrier_code_formatting_rule", c: 9, type: String}
        })), t
    }, w.f = w.prototype.f, x.prototype.f = function () {
        var t = gt;
        return t || (gt = t = m(x, {
            0: {name: "PhoneNumberDesc", j: "i18n.phonenumbers.PhoneNumberDesc"},
            2: {name: "national_number_pattern", c: 9, type: String},
            9: {name: "possible_length", i: !0, c: 5, type: Number},
            10: {name: "possible_length_local_only", i: !0, c: 5, type: Number},
            6: {name: "example_number", c: 9, type: String}
        })), t
    }, x.f = x.prototype.f, S.prototype.f = function () {
        var t = $t;
        return t || ($t = t = m(S, {
            0: {name: "PhoneMetadata", j: "i18n.phonenumbers.PhoneMetadata"},
            1: {name: "general_desc", c: 11, type: x},
            2: {name: "fixed_line", c: 11, type: x},
            3: {name: "mobile", c: 11, type: x},
            4: {name: "toll_free", c: 11, type: x},
            5: {name: "premium_rate", c: 11, type: x},
            6: {name: "shared_cost", c: 11, type: x},
            7: {name: "personal_number", c: 11, type: x},
            8: {name: "voip", c: 11, type: x},
            21: {name: "pager", c: 11, type: x},
            25: {name: "uan", c: 11, type: x},
            27: {name: "emergency", c: 11, type: x},
            28: {name: "voicemail", c: 11, type: x},
            24: {name: "no_international_dialling", c: 11, type: x},
            9: {name: "id", required: !0, c: 9, type: String},
            10: {name: "country_code", c: 5, type: Number},
            11: {name: "international_prefix", c: 9, type: String},
            17: {name: "preferred_international_prefix", c: 9, type: String},
            12: {name: "national_prefix", c: 9, type: String},
            13: {name: "preferred_extn_prefix", c: 9, type: String},
            15: {name: "national_prefix_for_parsing", c: 9, type: String},
            16: {name: "national_prefix_transform_rule", c: 9, type: String},
            18: {name: "same_mobile_and_fixed_line_pattern", c: 8, defaultValue: !1, type: Boolean},
            19: {name: "number_format", i: !0, c: 11, type: w},
            20: {name: "intl_number_format", i: !0, c: 11, type: w},
            22: {name: "main_country_for_code", c: 8, defaultValue: !1, type: Boolean},
            23: {name: "leading_digits", c: 9, type: String},
            26: {name: "leading_zero_possible", c: 8, defaultValue: !1, type: Boolean}
        })), t
    }, S.f = S.prototype.f, n(T, l);
    var mt = null, vt = {w: 0, v: 1, u: 5, s: 10, o: 20};
    T.prototype.f = function () {
        var t = mt;
        return t || (mt = t = m(T, {
            0: {name: "PhoneNumber", j: "i18n.phonenumbers.PhoneNumber"},
            1: {name: "country_code", required: !0, c: 5, type: Number},
            2: {name: "national_number", required: !0, c: 4, type: Number},
            3: {name: "extension", c: 9, type: String},
            4: {name: "italian_leading_zero", c: 8, type: Boolean},
            8: {name: "number_of_leading_zeros", c: 5, defaultValue: 1, type: Number},
            5: {name: "raw_input", c: 9, type: String},
            6: {name: "country_code_source", c: 14, defaultValue: 0, type: vt},
            7: {name: "preferred_domestic_carrier_code", c: 9, type: String}
        })), t
    }, T.ctor = T, T.ctor.f = T.prototype.f;
    var yt = {
        1: "US AG AI AS BB BM BS CA DM DO GD GU JM KN KY LC MP MS PR SX TC TT VC VG VI".split(" "),
        7: ["RU", "KZ"],
        20: ["EG"],
        27: ["ZA"],
        30: ["GR"],
        31: ["NL"],
        32: ["BE"],
        33: ["FR"],
        34: ["ES"],
        36: ["HU"],
        39: ["IT", "VA"],
        40: ["RO"],
        41: ["CH"],
        43: ["AT"],
        44: ["GB", "GG", "IM", "JE"],
        45: ["DK"],
        46: ["SE"],
        47: ["NO", "SJ"],
        48: ["PL"],
        49: ["DE"],
        51: ["PE"],
        52: ["MX"],
        53: ["CU"],
        54: ["AR"],
        55: ["BR"],
        56: ["CL"],
        57: ["CO"],
        58: ["VE"],
        60: ["MY"],
        61: ["AU", "CC", "CX"],
        62: ["ID"],
        63: ["PH"],
        64: ["NZ"],
        65: ["SG"],
        66: ["TH"],
        81: ["JP"],
        82: ["KR"],
        84: ["VN"],
        86: ["CN"],
        90: ["TR"],
        91: ["IN"],
        92: ["PK"],
        93: ["AF"],
        94: ["LK"],
        95: ["MM"],
        98: ["IR"],
        211: ["SS"],
        212: ["MA", "EH"],
        213: ["DZ"],
        216: ["TN"],
        218: ["LY"],
        220: ["GM"],
        221: ["SN"],
        222: ["MR"],
        223: ["ML"],
        224: ["GN"],
        225: ["CI"],
        226: ["BF"],
        227: ["NE"],
        228: ["TG"],
        229: ["BJ"],
        230: ["MU"],
        231: ["LR"],
        232: ["SL"],
        233: ["GH"],
        234: ["NG"],
        235: ["TD"],
        236: ["CF"],
        237: ["CM"],
        238: ["CV"],
        239: ["ST"],
        240: ["GQ"],
        241: ["GA"],
        242: ["CG"],
        243: ["CD"],
        244: ["AO"],
        245: ["GW"],
        246: ["IO"],
        247: ["AC"],
        248: ["SC"],
        249: ["SD"],
        250: ["RW"],
        251: ["ET"],
        252: ["SO"],
        253: ["DJ"],
        254: ["KE"],
        255: ["TZ"],
        256: ["UG"],
        257: ["BI"],
        258: ["MZ"],
        260: ["ZM"],
        261: ["MG"],
        262: ["RE", "YT"],
        263: ["ZW"],
        264: ["NA"],
        265: ["MW"],
        266: ["LS"],
        267: ["BW"],
        268: ["SZ"],
        269: ["KM"],
        290: ["SH", "TA"],
        291: ["ER"],
        297: ["AW"],
        298: ["FO"],
        299: ["GL"],
        350: ["GI"],
        351: ["PT"],
        352: ["LU"],
        353: ["IE"],
        354: ["IS"],
        355: ["AL"],
        356: ["MT"],
        357: ["CY"],
        358: ["FI", "AX"],
        359: ["BG"],
        370: ["LT"],
        371: ["LV"],
        372: ["EE"],
        373: ["MD"],
        374: ["AM"],
        375: ["BY"],
        376: ["AD"],
        377: ["MC"],
        378: ["SM"],
        380: ["UA"],
        381: ["RS"],
        382: ["ME"],
        385: ["HR"],
        386: ["SI"],
        387: ["BA"],
        389: ["MK"],
        420: ["CZ"],
        421: ["SK"],
        423: ["LI"],
        500: ["FK"],
        501: ["BZ"],
        502: ["GT"],
        503: ["SV"],
        504: ["HN"],
        505: ["NI"],
        506: ["CR"],
        507: ["PA"],
        508: ["PM"],
        509: ["HT"],
        590: ["GP", "BL", "MF"],
        591: ["BO"],
        592: ["GY"],
        593: ["EC"],
        594: ["GF"],
        595: ["PY"],
        596: ["MQ"],
        597: ["SR"],
        598: ["UY"],
        599: ["CW", "BQ"],
        670: ["TL"],
        672: ["NF"],
        673: ["BN"],
        674: ["NR"],
        675: ["PG"],
        676: ["TO"],
        677: ["SB"],
        678: ["VU"],
        679: ["FJ"],
        680: ["PW"],
        681: ["WF"],
        682: ["CK"],
        683: ["NU"],
        685: ["WS"],
        686: ["KI"],
        687: ["NC"],
        688: ["TV"],
        689: ["PF"],
        690: ["TK"],
        691: ["FM"],
        692: ["MH"],
        800: ["001"],
        808: ["001"],
        850: ["KP"],
        852: ["HK"],
        853: ["MO"],
        855: ["KH"],
        856: ["LA"],
        870: ["001"],
        878: ["001"],
        880: ["BD"],
        881: ["001"],
        882: ["001"],
        883: ["001"],
        886: ["TW"],
        888: ["001"],
        960: ["MV"],
        961: ["LB"],
        962: ["JO"],
        963: ["SY"],
        964: ["IQ"],
        965: ["KW"],
        966: ["SA"],
        967: ["YE"],
        968: ["OM"],
        970: ["PS"],
        971: ["AE"],
        972: ["IL"],
        973: ["BH"],
        974: ["QA"],
        975: ["BT"],
        976: ["MN"],
        977: ["NP"],
        979: ["001"],
        992: ["TJ"],
        993: ["TM"],
        994: ["AZ"],
        995: ["GE"],
        996: ["KG"],
        998: ["UZ"]
    }, bt = {
        AC: [, [, , "[46]\\d{4}|[01589]\\d{5}", , , , , , , [5, 6]], [, , "6[2-467]\\d{3}", , , , "62889", , , [5]], [, , "4\\d{4}", , , , "40123", , , [5]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "AC", 247, "00", , , , , , , , , , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , "[01589]\\d{5}", , , , "542011", , , [6]], , , [, , , , , , , , , [-1]]],
        AD: [, [, , "[16]\\d{5,8}|[37-9]\\d{5}", , , , , , , [6, 8, 9]], [, , "[78]\\d{5}", , , , "712345", , , [6]], [, , "(?:3\\d|6(?:[0-8]|90\\d{2}))\\d{4}", , , , "312345", , , [6, 9]], [, , "180[02]\\d{4}", , , , "18001234", , , [8]], [, , "[19]\\d{5}", , , , "912345", , , [6]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "AD", 376, "00", , , , , , , , [[, "(\\d{3})(\\d{3})", "$1 $2", ["[137-9]|6[0-8]"]], [, "(\\d{4})(\\d{4})", "$1 $2", ["180", "180[02]"]], [, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["690"]]], , [, , , , , , , , , [-1]], , , [, , "1800\\d{4}", , , , "18000000", , , [8]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        AE: [, [, , "[2-79]\\d{7,8}|800\\d{2,9}", , , , , , , [5, 6, 7, 8, 9, 10, 11, 12]], [, , "[2-4679][2-8]\\d{6}", , , , "22345678", , , [8], [7]], [, , "5[024-68]\\d{7}", , , , "501234567", , , [9]], [, , "400\\d{6}|800\\d{2,9}", , , , "800123456"], [, , "900[02]\\d{5}", , , , "900234567", , , [9]], [, , "700[05]\\d{5}", , , , "700012345", , , [9]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "AE", 971, "00", "0", , , "0", , , , [[, "([2-4679])(\\d{3})(\\d{4})", "$1 $2 $3", ["[2-4679][2-8]"], "0$1"], [, "(5\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["5"], "0$1"], [, "([479]00)(\\d)(\\d{5})", "$1 $2 $3", ["[479]0"], "$1"], [, "([68]00)(\\d{2,9})", "$1 $2", ["60|8"], "$1"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , "600[25]\\d{5}", , , , "600212345", , , [9]], , , [, , , , , , , , , [-1]]],
        AF: [, [, , "[2-7]\\d{8}", , , , , , , [9], [7]], [, , "(?:[25][0-8]|[34][0-4]|6[0-5])[2-9]\\d{6}", , , , "234567890", , , , [7]], [, , "7(?:[014-9]\\d|2[89]|30)\\d{6}", , , , "701234567"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "AF", 93, "00", "0", , , "0", , , , [[, "([2-7]\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["[2-7]"], "0$1"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        AG: [, [, , "[2589]\\d{9}", , , , , , , [10], [7]], [, , "268(?:4(?:6[0-38]|84)|56[0-2])\\d{4}", , , , "2684601234", , , , [7]], [, , "268(?:464|7(?:1[3-9]|2\\d|3[246]|64|7[0-689]|8[02-68]))\\d{4}", , , , "2684641234", , , , [7]], [, , "8(?:00|33|44|55|66|77|88)[2-9]\\d{6}", , , , "8002123456"], [, , "900[2-9]\\d{6}", , , , "9002123456"], [, , , , , , , , , [-1]], [, , "5(?:00|22|33|44|66|77|88)[2-9]\\d{6}", , , , "5002345678"], [, , "26848[01]\\d{4}", , , , "2684801234", , , , [7]], "AG", 1, "011", "1", , , "1", , , , , , [, , "26840[69]\\d{4}", , , , "2684061234", , , , [7]], , "268", [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        AI: [, [, , "[2589]\\d{9}", , , , , , , [10], [7]], [, , "2644(?:6[12]|9[78])\\d{4}", , , , "2644612345", , , , [7]], [, , "264(?:235|476|5(?:3[6-9]|8[1-4])|7(?:29|72))\\d{4}", , , , "2642351234", , , , [7]], [, , "8(?:00|33|44|55|66|77|88)[2-9]\\d{6}", , , , "8002123456"], [, , "900[2-9]\\d{6}", , , , "9002123456"], [, , , , , , , , , [-1]], [, , "5(?:00|22|33|44|66|77|88)[2-9]\\d{6}", , , , "5002345678"], [, , , , , , , , , [-1]], "AI", 1, "011", "1", , , "1", , , , , , [, , , , , , , , , [-1]], , "264", [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        AL: [, [, , "[2-57]\\d{7}|6\\d{8}|8\\d{5,7}|9\\d{5}", , , , , , , [6, 7, 8, 9], [5]], [, , "(?:2(?:1(?:0[2-9]|[1-9]\\d)|[247]\\d{2}|[35][2-9]\\d|[68](?:0[2-9]|[1-9]\\d)|9(?:[089][2-9]|[1-7]\\d))|3(?:1(?:[04-9][2-9]|[1-3]\\d)|[2-6]\\d{2}|[79](?:[09][2-9]|[1-8]\\d)|8(?:0[2-9]|[1-9]\\d))|4\\d{3}|5(?:1(?:[05-9][2-9]|[1-4]\\d)|[2-578]\\d{2}|6(?:[06-9][2-9]|[1-5]\\d)|9(?:[089][2-9]|[1-7]\\d))|8(?:[19](?:[06-9][2-9]|[1-5]\\d)|[2-6]\\d{2}|[78](?:[089][2-9]|[1-7]\\d)))\\d{4}", , , , "22345678", , , [8], [5, 6, 7]], [, , "6(?:[689][2-9]|7[2-6])\\d{6}", , , , "662123456", , , [9]], [, , "800\\d{4}", , , , "8001234", , , [7]], [, , "900[1-9]\\d{2}", , , , "900123", , , [6]], [, , "808[1-9]\\d{2}", , , , "808123", , , [6]], [, , "700[2-9]\\d{4}", , , , "70021234", , , [8]], [, , , , , , , , , [-1]], "AL", 355, "00", "0", , , "0", , , , [[, "(4)(\\d{3})(\\d{4})", "$1 $2 $3", ["4[0-6]"], "0$1"], [, "(6\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["6"], "0$1"], [, "(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["[2358][2-5]|4[7-9]"], "0$1"], [, "(\\d{3})(\\d{3,5})", "$1 $2", ["[235][16-9]|8[016-9]|[79]"], "0$1"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        AM: [, [, , "[1-9]\\d{7}", , , , , , , [8], [5, 6]], [, , "(?:1[0-2]\\d|2(?:2[2-46]|3[1-8]|4[2-69]|5[2-7]|6[1-9]|8[1-7])|3[12]2|47\\d)\\d{5}", , , , "10123456", , , , [5, 6]], [, , "(?:4[1349]|55|77|88|9[1-9])\\d{6}", , , , "77123456"], [, , "800\\d{5}", , , , "80012345"], [, , "90[016]\\d{5}", , , , "90012345"], [, , "80[1-4]\\d{5}", , , , "80112345"], [, , , , , , , , , [-1]], [, , "60(?:2[078]|[3-7]\\d|8[0-5])\\d{4}", , , , "60271234"], "AM", 374, "00", "0", , , "0", , , , [[, "(\\d{2})(\\d{6})", "$1 $2", ["1|47"], "(0$1)"], [, "(\\d{2})(\\d{6})", "$1 $2", ["4[1349]|[5-7]|88|9[1-9]"], "0$1"], [, "(\\d{3})(\\d{5})", "$1 $2", ["[23]"], "(0$1)"], [, "(\\d{3})(\\d{2})(\\d{3})", "$1 $2 $3", ["8|90"], "0 $1"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        AO: [, [, , "[29]\\d{8}", , , , , , , [9]], [, , "2\\d(?:[26-9]\\d|\\d[26-9])\\d{5}", , , , "222123456"], [, , "9[1-49]\\d{7}", , , , "923123456"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "AO", 244, "00", , , , , , , , [[, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        AR: [, [, , "11\\d{8}|[2368]\\d{9}|9\\d{10}", , , , , , , [10, 11], [6, 7, 8]], [, , "11\\d{8}|(?:2(?:2(?:[013]\\d|2[13-79]|4[1-6]|5[2457]|6[124-8]|7[1-4]|8[13-6]|9[1267])|3(?:1[467]|2[03-6]|3[13-8]|[49][2-6]|5[2-8]|[067]\\d)|4(?:7[3-8]|9\\d)|6(?:[01346]\\d|2[24-6]|5[15-8])|80\\d|9(?:[0124789]\\d|3[1-6]|5[234]|6[2-46]))|3(?:3(?:2[79]|6\\d|8[2578])|4(?:[78]\\d|0[0124-9]|[1-35]\\d|4[24-7]|6[02-9]|9[123678])|5(?:[138]\\d|2[1245]|4[1-9]|6[2-4]|7[1-6])|6[24]\\d|7(?:[0469]\\d|1[1568]|2[013-9]|3[145]|5[14-8]|7[2-57]|8[0-24-9])|8(?:[013578]\\d|2[15-7]|4[13-6]|6[1-357-9]|9[124]))|670\\d)\\d{6}", , , , "1123456789", , , [10], [6, 7, 8]], [, , "675\\d{7}|9(?:11[2-9]\\d{7}|(?:2(?:2[013]|3[067]|49|6[01346]|80|9[147-9])|3(?:36|4[12358]|5[138]|6[24]|7[069]|8[013578]))[2-9]\\d{6}|\\d{4}[2-9]\\d{5})", , , , "91123456789", , , , [6, 7, 8]], [, , "800\\d{7}", , , , "8001234567", , , [10]], [, , "60[04579]\\d{7}", , , , "6001234567", , , [10]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "AR", 54, "00", "0", , , "0?(?:(11|2(?:2(?:02?|[13]|2[13-79]|4[1-6]|5[2457]|6[124-8]|7[1-4]|8[13-6]|9[1267])|3(?:02?|1[467]|2[03-6]|3[13-8]|[49][2-6]|5[2-8]|[67])|4(?:7[3-578]|9)|6(?:[0136]|2[24-6]|4[6-8]?|5[15-8])|80|9(?:0[1-3]|[19]|2\\d|3[1-6]|4[02568]?|5[2-4]|6[2-46]|72?|8[23]?))|3(?:3(?:2[79]|6|8[2578])|4(?:0[0-24-9]|[12]|3[5-8]?|4[24-7]|5[4-68]?|6[02-9]|7[126]|8[2379]?|9[1-36-8])|5(?:1|2[1245]|3[237]?|4[1-46-9]|6[2-4]|7[1-6]|8[2-5]?)|6[24]|7(?:[069]|1[1568]|2[15]|3[145]|4[13]|5[14-8]|7[2-57]|8[126])|8(?:[01]|2[15-7]|3[2578]?|4[13-6]|5[4-8]?|6[1-357-9]|7[36-8]?|8[5-8]?|9[124])))?15)?", "9$1", , , [[, "([68]\\d{2})(\\d{3})(\\d{4})", "$1-$2-$3", ["[68]"], "0$1"], [, "(\\d{2})(\\d{4})", "$1-$2", ["[2-9]"], "$1"], [, "(\\d{3})(\\d{4})", "$1-$2", ["[2-9]"], "$1"], [, "(\\d{4})(\\d{4})", "$1-$2", ["[2-9]"], "$1"], [, "(9)(11)(\\d{4})(\\d{4})", "$2 15-$3-$4", ["911"], "0$1"], [, "(9)(\\d{3})(\\d{3})(\\d{4})", "$2 15-$3-$4", ["9(?:2[234689]|3[3-8])", "9(?:2(?:2[013]|3[067]|49|6[01346]|80|9[147-9])|3(?:36|4[1-358]|5[138]|6[24]|7[069]|8[013578]))", "9(?:2(?:2(?:0[013-9]|[13])|3(?:0[013-9]|[67])|49|6(?:[0136]|4[0-59])|8|9(?:[19]|44|7[013-9]|8[14]))|3(?:36|4(?:[12]|3[456]|[58]4)|5(?:1|3[0-24-689]|8[46])|6|7[069]|8(?:[01]|34|[578][45])))", "9(?:2(?:2(?:0[013-9]|[13])|3(?:0[013-9]|[67])|49|6(?:[0136]|4[0-59])|8|9(?:[19]|44|7[013-9]|8[14]))|3(?:36|4(?:[12]|3(?:4|5[014]|6[1239])|[58]4)|5(?:1|3[0-24-689]|8[46])|6|7[069]|8(?:[01]|34|[578][45])))"], "0$1"], [, "(9)(\\d{4})(\\d{2})(\\d{4})", "$2 15-$3-$4", ["9[23]"], "0$1"], [, "(11)(\\d{4})(\\d{4})", "$1 $2-$3", ["1"], "0$1", , 1], [, "(\\d{3})(\\d{3})(\\d{4})", "$1 $2-$3", ["2(?:2[013]|3[067]|49|6[01346]|80|9[147-9])|3(?:36|4[1-358]|5[138]|6[24]|7[069]|8[013578])", "2(?:2(?:0[013-9]|[13])|3(?:0[013-9]|[67])|49|6(?:[0136]|4[0-59])|8|9(?:[19]|44|7[013-9]|8[14]))|3(?:36|4(?:[12]|3[456]|[58]4)|5(?:1|3[0-24-689]|8[46])|6|7[069]|8(?:[01]|34|[578][45]))", "2(?:2(?:0[013-9]|[13])|3(?:0[013-9]|[67])|49|6(?:[0136]|4[0-59])|8|9(?:[19]|44|7[013-9]|8[14]))|3(?:36|4(?:[12]|3(?:4|5[014]|6[1239])|[58]4)|5(?:1|3[0-24-689]|8[46])|6|7[069]|8(?:[01]|34|[578][45]))"], "0$1", , 1], [, "(\\d{4})(\\d{2})(\\d{4})", "$1 $2-$3", ["[23]"], "0$1", , 1], [, "(\\d{3})", "$1", ["1[012]|911"], "$1"]], [[, "([68]\\d{2})(\\d{3})(\\d{4})", "$1-$2-$3", ["[68]"], "0$1"], [, "(9)(11)(\\d{4})(\\d{4})", "$1 $2 $3-$4", ["911"]], [, "(9)(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3-$4", ["9(?:2[234689]|3[3-8])", "9(?:2(?:2[013]|3[067]|49|6[01346]|80|9[147-9])|3(?:36|4[1-358]|5[138]|6[24]|7[069]|8[013578]))", "9(?:2(?:2(?:0[013-9]|[13])|3(?:0[013-9]|[67])|49|6(?:[0136]|4[0-59])|8|9(?:[19]|44|7[013-9]|8[14]))|3(?:36|4(?:[12]|3[456]|[58]4)|5(?:1|3[0-24-689]|8[46])|6|7[069]|8(?:[01]|34|[578][45])))", "9(?:2(?:2(?:0[013-9]|[13])|3(?:0[013-9]|[67])|49|6(?:[0136]|4[0-59])|8|9(?:[19]|44|7[013-9]|8[14]))|3(?:36|4(?:[12]|3(?:4|5[014]|6[1239])|[58]4)|5(?:1|3[0-24-689]|8[46])|6|7[069]|8(?:[01]|34|[578][45])))"]], [, "(9)(\\d{4})(\\d{2})(\\d{4})", "$1 $2 $3-$4", ["9[23]"]], [, "(11)(\\d{4})(\\d{4})", "$1 $2-$3", ["1"], "0$1", , 1], [, "(\\d{3})(\\d{3})(\\d{4})", "$1 $2-$3", ["2(?:2[013]|3[067]|49|6[01346]|80|9[147-9])|3(?:36|4[1-358]|5[138]|6[24]|7[069]|8[013578])", "2(?:2(?:0[013-9]|[13])|3(?:0[013-9]|[67])|49|6(?:[0136]|4[0-59])|8|9(?:[19]|44|7[013-9]|8[14]))|3(?:36|4(?:[12]|3[456]|[58]4)|5(?:1|3[0-24-689]|8[46])|6|7[069]|8(?:[01]|34|[578][45]))", "2(?:2(?:0[013-9]|[13])|3(?:0[013-9]|[67])|49|6(?:[0136]|4[0-59])|8|9(?:[19]|44|7[013-9]|8[14]))|3(?:36|4(?:[12]|3(?:4|5[014]|6[1239])|[58]4)|5(?:1|3[0-24-689]|8[46])|6|7[069]|8(?:[01]|34|[578][45]))"], "0$1", , 1], [, "(\\d{4})(\\d{2})(\\d{4})", "$1 $2-$3", ["[23]"], "0$1", , 1]], [, , , , , , , , , [-1]], , , [, , "810\\d{7}", , , , "8101234567", , , [10]], [, , "810\\d{7}", , , , "8101234567", , , [10]], , , [, , , , , , , , , [-1]]],
        AS: [, [, , "[5689]\\d{9}", , , , , , , [10], [7]], [, , "6846(?:22|33|44|55|77|88|9[19])\\d{4}", , , , "6846221234", , , , [7]], [, , "684(?:2(?:5[2468]|72)|7(?:3[13]|70))\\d{4}", , , , "6847331234", , , , [7]], [, , "8(?:00|33|44|55|66|77|88)[2-9]\\d{6}", , , , "8002123456"], [, , "900[2-9]\\d{6}", , , , "9002123456"], [, , , , , , , , , [-1]], [, , "5(?:00|22|33|44|66|77|88)[2-9]\\d{6}", , , , "5002345678"], [, , , , , , , , , [-1]], "AS", 1, "011", "1", , , "1", , , , , , [, , , , , , , , , [-1]], , "684", [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        AT: [, [, , "[1-9]\\d{3,12}", , , , , , , [4, 5, 6, 7, 8, 9, 10, 11, 12, 13], [3]], [, , "1\\d{3,12}|(?:2(?:1[467]|2[13-8]|5[2357]|6[1-46-8]|7[1-8]|8[124-7]|9[1458])|3(?:1[1-8]|3[23568]|4[5-7]|5[1378]|6[1-38]|8[3-68])|4(?:2[1-8]|35|63|7[1368]|8[2457])|5(?:12|2[1-8]|3[357]|4[147]|5[12578]|6[37])|6(?:13|2[1-47]|4[1-35-8]|5[468]|62)|7(?:2[1-8]|3[25]|4[13478]|5[68]|6[16-8]|7[1-6]|9[45]))\\d{3,10}", , , , "1234567890", , , , [3]], [, , "6(?:5[0-3579]|6[013-9]|[7-9]\\d)\\d{4,10}", , , , "664123456", , , [7, 8, 9, 10, 11, 12, 13]], [, , "800\\d{6,10}", , , , "800123456", , , [9, 10, 11, 12, 13]], [, , "9(?:0[01]|3[019])\\d{6,10}", , , , "900123456", , , [9, 10, 11, 12, 13]], [, , "8(?:10\\d|2(?:[01]\\d|8\\d?))\\d{5,9}", , , , "810123456", , , [8, 9, 10, 11, 12, 13]], [, , , , , , , , , [-1]], [, , "780\\d{6,10}", , , , "780123456", , , [9, 10, 11, 12, 13]], "AT", 43, "00", "0", , , "0", , , , [[, "(116\\d{3})", "$1", ["116"], "$1"], [, "(1)(\\d{3,12})", "$1 $2", ["1"], "0$1"], [, "(5\\d)(\\d{3,5})", "$1 $2", ["5[079]"], "0$1"], [, "(5\\d)(\\d{3})(\\d{3,4})", "$1 $2 $3", ["5[079]"], "0$1"], [, "(5\\d)(\\d{4})(\\d{4,7})", "$1 $2 $3", ["5[079]"], "0$1"], [, "(\\d{3})(\\d{3,10})", "$1 $2", ["316|46|51|732|6(?:5[0-3579]|[6-9])|7(?:[28]0)|[89]"], "0$1"], [, "(\\d{4})(\\d{3,9})", "$1 $2", ["2|3(?:1[1-578]|[3-8])|4[2378]|5[2-6]|6(?:[12]|4[1-9]|5[468])|7(?:2[1-8]|35|4[1-8]|[5-79])"], "0$1"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , "5(?:(?:0[1-9]|17)\\d{2,10}|[79]\\d{3,11})|720\\d{6,10}", , , , "50123", , , [5, 6, 7, 8, 9, 10, 11, 12, 13]], , , [, , , , , , , , , [-1]]],
        AU: [, [, , "1\\d{4,9}|[2-578]\\d{8}", , , , , , , [5, 6, 7, 8, 9, 10]], [, , "[237]\\d{8}|8(?:[6-8]\\d{3}|9(?:[02-9]\\d{2}|1(?:[0-57-9]\\d|6[0135-9])))\\d{4}", , , , "212345678", , , [9], [8]], [, , "14(?:5\\d|71)\\d{5}|4(?:[0-3]\\d|4[47-9]|5[0-25-9]|6[6-9]|7[02-9]|8[147-9]|9[017-9])\\d{6}", , , , "412345678", , , [9]], [, , "180(?:0\\d{3}|2)\\d{3}", , , , "1800123456", , , [7, 10]], [, , "19(?:0[0126]\\d|[679])\\d{5}", , , , "1900123456", , , [8, 10]], [, , "13(?:00\\d{3}|45[0-4]|\\d)\\d{3}", , , , "1300123456", , , [6, 8, 10]], [, , "500\\d{6}", , , , "500123456", , , [9]], [, , "550\\d{6}", , , , "550123456", , , [9]], "AU", 61, "(?:14(?:1[14]|34|4[17]|[56]6|7[47]|88)0011)|001[14-689]", "0", , , "0", , "0011", , [[, "([2378])(\\d{4})(\\d{4})", "$1 $2 $3", ["[2378]"], "(0$1)"], [, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[45]|14"], "0$1"], [, "(16)(\\d{3,4})", "$1 $2", ["16"], "0$1"], [, "(16)(\\d{3})(\\d{2,4})", "$1 $2 $3", ["16"], "0$1"], [, "(1[389]\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["1(?:[38]0|90)", "1(?:[38]00|90)"], "$1"], [, "(180)(2\\d{3})", "$1 $2", ["180", "1802"], "$1"], [, "(19\\d)(\\d{3})", "$1 $2", ["19[13]"], "$1"], [, "(19\\d{2})(\\d{4})", "$1 $2", ["19[679]"], "$1"], [, "(13)(\\d{2})(\\d{2})", "$1 $2 $3", ["13[1-9]"], "$1"]], , [, , "16\\d{3,7}", , , , "1612345", , , [5, 6, 7, 8, 9]], 1, , [, , "1(?:3(?:00\\d{3}|45[0-4]|\\d)\\d{3}|80(?:0\\d{6}|2\\d{3}))", , , , "1300123456", , , [6, 7, 8, 10]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        AW: [, [, , "[25-9]\\d{6}", , , , , , , [7]], [, , "5(?:2\\d|8[1-9])\\d{4}", , , , "5212345"], [, , "(?:5(?:6\\d|9[2-478])|6(?:[039]0|22|4[01]|6[0-2])|7[34]\\d|9(?:6[45]|9[4-8]))\\d{4}", , , , "5601234"], [, , "800\\d{4}", , , , "8001234"], [, , "900\\d{4}", , , , "9001234"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , "28\\d{5}|501\\d{4}", , , , "5011234"], "AW", 297, "00", , , , , , , , [[, "(\\d{3})(\\d{4})", "$1 $2"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        AX: [, [, , "[15]\\d{6,9}|2\\d{4,9}|3\\d{5,9}|4\\d{7,10}|[67]\\d{7,9}|8\\d{7,8}", , , , , , , [5, 6, 7, 8, 9, 10, 11]], [, , "18[1-8]\\d{4,6}", , , , "181234567", , , [7, 8, 9]], [, , "4(?:[0-8]\\d{6,8}|9\\d{9})|50\\d{6,8}", , , , "412345678", , , [8, 9, 10, 11]], [, , "800\\d{5,6}", , , , "800123456", , , [8, 9]], [, , "[67]00\\d{5,6}", , , , "600123456", , , [8, 9]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "AX", 358, "00|99(?:[02469]|5(?:11|33|5[59]|88|9[09]))", "0", , , "0", , "00", , , , [, , , , , , , , , [-1]], , , [, , "100\\d{4,6}|20(?:0\\d{4,6}|2[023]\\d{4,5}|9[89]\\d{1,6})|300\\d{3,7}|60(?:[12]\\d{5,6}|6\\d{7})|7(?:1\\d{7}|3\\d{8}|5[03-9]\\d{5,6})", , , , "1001234", , , [5, 6, 7, 8, 9, 10]], [, , "10(?:0\\d{4,6}|[1-9]\\d{5,7})|2(?:0(?:0\\d{4,6}|[13-8]\\d{5,7}|2(?:[023]\\d{4,5}|[14-9]\\d{4,6})|9(?:[0-7]\\d{4,6}|[89]\\d{1,6}))|9\\d{5,8})|3(?:0(?:0\\d{3,7}|[1-57-9]\\d{5,7}|6(?:\\d{3}|\\d{5,7}))|93\\d{5,7})|60(?:[12]\\d{5,6}|6\\d{7})|7(?:1\\d{7}|3\\d{8}|5[03-9]\\d{5,6})", , , , "10112345", , , [5, 6, 7, 8, 9, 10]], , , [, , , , , , , , , [-1]]],
        AZ: [, [, , "[1-9]\\d{8}", , , , , , , [9], [7]], [, , "(?:1[28]\\d{3}|2(?:02|1[24]|2[2-4]|33|[45]2|6[23])\\d{2}|365(?:[0-46-9]\\d|5[0-35-9]))\\d{4}", , , , "123123456", , , , [7]], [, , "(?:36554|(?:4[04]|5[015]|60|7[07])\\d{3})\\d{4}", , , , "401234567"], [, , "88\\d{7}", , , , "881234567"], [, , "900200\\d{3}", , , , "900200123"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "AZ", 994, "00", "0", , , "0", , , , [[, "(\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["(?:1[28]|2(?:[45]2|[0-36])|365)"], "(0$1)"], [, "(\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[4-8]"], "0$1"], [, "(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["9"], "0$1"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        BA: [, [, , "[3-9]\\d{7,8}", , , , , , , [8, 9], [6]], [, , "(?:[35]\\d|49)\\d{6}", , , , "30123456", , , [8], [6]], [, , "6(?:0(?:3\\d|40)|[1-356]\\d|44[0-6]|71[137])\\d{5}", , , , "61123456"], [, , "8[08]\\d{6}", , , , "80123456", , , [8]], [, , "9[0246]\\d{6}", , , , "90123456", , , [8]], [, , "8[12]\\d{6}", , , , "82123456", , , [8]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "BA", 387, "00", "0", , , "0", , , , [[, "(\\d{2})(\\d{3})(\\d{3})", "$1 $2-$3", ["[3-5]"], "0$1"], [, "(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["6[1-356]|[7-9]"], "0$1"], [, "(\\d{2})(\\d{2})(\\d{2})(\\d{3})", "$1 $2 $3 $4", ["6[047]"], "0$1"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , "70[23]\\d{5}", , , , "70223456", , , [8]], , , [, , , , , , , , , [-1]]],
        BB: [, [, , "[2589]\\d{9}", , , , , , , [10], [7]], [, , "246(?:2(?:2[78]|7[0-4])|4(?:1[024-6]|2\\d|3[2-9])|5(?:20|[34]\\d|54|7[1-3])|6(?:2\\d|38)|7(?:37|57)|9(?:1[89]|63))\\d{4}", , , , "2464123456", , , , [7]], [, , "246(?:2(?:[356]\\d|4[0-57-9]|8[0-79])|45\\d|8(?:[2-5]\\d|83))\\d{4}", , , , "2462501234", , , , [7]], [, , "8(?:00|33|44|55|66|77|88)[2-9]\\d{6}", , , , "8002123456"], [, , "900\\d{7}|246976\\d{4}", , , , "9002123456", , , , [7]], [, , , , , , , , , [-1]], [, , "5(?:00|22|33|44|66|77|88)[2-9]\\d{6}", , , , "5002345678"], [, , "24631\\d{5}", , , , "2463101234", , , , [7]], "BB", 1, "011", "1", , , "1", , , , , , [, , , , , , , , , [-1]], , "246", [, , , , , , , , , [-1]], [, , "246(?:292|367|4(?:1[7-9]|3[01]|44|67)|736)\\d{4}", , , , "2464301234", , , , [7]], , , [, , , , , , , , , [-1]]],
        BD: [, [, , "[2-79]\\d{5,9}|1\\d{9}|8[0-7]\\d{4,8}", , , , , , , [6, 7, 8, 9, 10]], [, , "2(?:[45]\\d{3}|7(?:1[0-267]|2[0-289]|3[0-29]|4[01]|5[1-3]|6[013]|7[0178]|91)|8(?:0[125]|[139][1-6]|2[0157-9]|41|6[1-35]|7[1-5]|8[1-8]|90)|9(?:0[0-2]|1[0-4]|2[568]|3[3-6]|5[5-7]|6[0167]|7[15]|8[0146-9]))\\d{4}|3(?:12?[5-7]\\d{2}|0(?:2(?:[025-79]\\d|[348]\\d{1,2})|3(?:[2-4]\\d|[56]\\d?))|2(?:1\\d{2}|2(?:[12]\\d|[35]\\d{1,2}|4\\d?))|3(?:1\\d{2}|2(?:[2356]\\d|4\\d{1,2}))|4(?:1\\d{2}|2(?:2\\d{1,2}|[47]|5\\d{2}))|5(?:1\\d{2}|29)|[67]1\\d{2}|8(?:1\\d{2}|2(?:2\\d{2}|3|4\\d)))\\d{3}|4(?:0(?:2(?:[09]\\d|7)|33\\d{2})|1\\d{3}|2(?:1\\d{2}|2(?:[25]\\d?|[348]\\d|[67]\\d{1,2}))|3(?:1\\d{2}(?:\\d{2})?|2(?:[045]\\d|[236-9]\\d{1,2})|32\\d{2})|4(?:[18]\\d{2}|2(?:[2-46]\\d{2}|3)|5[25]\\d{2})|5(?:1\\d{2}|2(?:3\\d|5))|6(?:[18]\\d{2}|2(?:3(?:\\d{2})?|[46]\\d{1,2}|5\\d{2}|7\\d)|5(?:3\\d?|4\\d|[57]\\d{1,2}|6\\d{2}|8))|71\\d{2}|8(?:[18]\\d{2}|23\\d{2}|54\\d{2})|9(?:[18]\\d{2}|2[2-5]\\d{2}|53\\d{1,2}))\\d{3}|5(?:02[03489]\\d{2}|1\\d{2}|2(?:1\\d{2}|2(?:2(?:\\d{2})?|[457]\\d{2}))|3(?:1\\d{2}|2(?:[37](?:\\d{2})?|[569]\\d{2}))|4(?:1\\d{2}|2[46]\\d{2})|5(?:1\\d{2}|26\\d{1,2})|6(?:[18]\\d{2}|2|53\\d{2})|7(?:1|24)\\d{2}|8(?:1|26)\\d{2}|91\\d{2})\\d{3}|6(?:0(?:1\\d{2}|2(?:3\\d{2}|4\\d{1,2}))|2(?:2[2-5]\\d{2}|5(?:[3-5]\\d{2}|7)|8\\d{2})|3(?:1|2[3478])\\d{2}|4(?:1|2[34])\\d{2}|5(?:1|2[47])\\d{2}|6(?:[18]\\d{2}|6(?:2(?:2\\d|[34]\\d{2})|5(?:[24]\\d{2}|3\\d|5\\d{1,2})))|72[2-5]\\d{2}|8(?:1\\d{2}|2[2-5]\\d{2})|9(?:1\\d{2}|2[2-6]\\d{2}))\\d{3}|7(?:(?:02|[3-589]1|6[12]|72[24])\\d{2}|21\\d{3}|32)\\d{3}|8(?:(?:4[12]|[5-7]2|1\\d?)|(?:0|3[12]|[5-7]1|217)\\d)\\d{4}|9(?:[35]1|(?:[024]2|81)\\d|(?:1|[24]1)\\d{2})\\d{3}", , , , "27111234", , , [6, 7, 8, 9]], [, , "(?:1[13-9]\\d|(?:3[78]|44)[02-9]|6(?:44|6[02-9]))\\d{7}", , , , "1812345678", , , [10]], [, , "80[03]\\d{7}", , , , "8001234567", , , [10]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , "96(?:0[49]|1[0-4]|6[69])\\d{6}", , , , "9604123456", , , [10]], "BD", 880, "00", "0", , , "0", , , , [[, "(2)(\\d{7,8})", "$1-$2", ["2"], "0$1"], [, "(\\d{2})(\\d{4,6})", "$1-$2", ["[3-79]1"], "0$1"], [, "(\\d{4})(\\d{3,6})", "$1-$2", ["1|3(?:0|[2-58]2)|4(?:0|[25]2|3[23]|[4689][25])|5(?:[02-578]2|6[25])|6(?:[0347-9]2|[26][25])|7[02-9]2|8(?:[023][23]|[4-7]2)|9(?:[02][23]|[458]2|6[016])"], "0$1"], [, "(\\d{3})(\\d{3,7})", "$1-$2", ["[3-79][2-9]|8"], "0$1"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        BE: [, [, , "[1-9]\\d{7,8}", , , , , , , [8, 9]], [, , "(?:1[0-69]|[23][2-8]|4[23]|5\\d|6[013-57-9]|71|8[1-79]|9[2-4])\\d{6}|80[2-8]\\d{5}", , , , "12345678", , , [8]], [, , "4(?:6[0135-8]|[79]\\d|8[3-9])\\d{6}", , , , "470123456", , , [9]], [, , "800\\d{5}", , , , "80012345", , , [8]], [, , "(?:70[2-467]|90[0-79])\\d{5}", , , , "90123456", , , [8]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "BE", 32, "00", "0", , , "0", , , , [[, "(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["4[6-9]"], "0$1"], [, "(\\d)(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[23]|4[23]|9[2-4]"], "0$1"], [, "(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[156]|7[018]|8(?:0[1-9]|[1-79])"], "0$1"], [, "(\\d{3})(\\d{2})(\\d{3})", "$1 $2 $3", ["(?:80|9)0"], "0$1"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , "78\\d{6}", , , , "78123456", , , [8]], , , [, , , , , , , , , [-1]]],
        BF: [, [, , "[25-7]\\d{7}", , , , , , , [8]], [, , "2(?:0(?:49|5[23]|6[56]|9[016-9])|4(?:4[569]|5[4-6]|6[56]|7[0179])|5(?:[34]\\d|50|6[5-7]))\\d{4}", , , , "20491234"], [, , "(?:5[15-8]|[67]\\d)\\d{6}", , , , "70123456"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "BF", 226, "00", , , , , , , , [[, "(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        BG: [, [, , "[23567]\\d{5,7}|[489]\\d{6,8}", , , , , , , [6, 7, 8, 9], [4, 5]], [, , "2\\d{5,7}|(?:[36]\\d|5[1-9]|8[1-6]|9[1-7])\\d{5,6}|(?:4(?:[124-7]\\d|3[1-6])|7(?:0[1-9]|[1-9]\\d))\\d{4,5}", , , , "2123456", , , [6, 7, 8], [4, 5]], [, , "(?:8[7-9]\\d|9(?:8\\d|9[69]))\\d{6}|4(?:3[0789]|8\\d)\\d{5}", , , , "48123456", , , [8, 9]], [, , "800\\d{5}", , , , "80012345", , , [8]], [, , "90\\d{6}", , , , "90123456", , , [8]], [, , , , , , , , , [-1]], [, , "700\\d{5}", , , , "70012345", , , [8]], [, , , , , , , , , [-1]], "BG", 359, "00", "0", , , "0", , , , [[, "(2)(\\d)(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["2"], "0$1"], [, "(2)(\\d{3})(\\d{3,4})", "$1 $2 $3", ["2"], "0$1"], [, "(\\d{3})(\\d{4})", "$1 $2", ["43[124-7]|70[1-9]"], "0$1"], [, "(\\d{3})(\\d{3})(\\d{2})", "$1 $2 $3", ["43[124-7]|70[1-9]"], "0$1"], [, "(\\d{3})(\\d{2})(\\d{3})", "$1 $2 $3", ["[78]00"], "0$1"], [, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["99[69]"], "0$1"], [, "(\\d{2})(\\d{3})(\\d{2,3})", "$1 $2 $3", ["[356]|4[124-7]|7[1-9]|8[1-6]|9[1-7]"], "0$1"], [, "(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["48|8[7-9]|9[08]"], "0$1"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        BH: [, [, , "[136-9]\\d{7}", , , , , , , [8]], [, , "(?:1(?:3[1356]|6[0156]|7\\d)\\d|6(?:1[16]\\d|500|6(?:0\\d|3[12]|44|7[7-9])|9[69][69])|7(?:1(?:11|78)|7\\d{2}))\\d{4}", , , , "17001234"], [, , "(?:3(?:[1-4679]\\d|5[013-69]|8[0-47-9])\\d|6(?:3(?:00|33|6[16])|6(?:[69]\\d|3[03-9]|7[0-6])))\\d{4}", , , , "36001234"], [, , "80\\d{6}", , , , "80123456"], [, , "(?:87|9[014578])\\d{6}", , , , "90123456"], [, , "84\\d{6}", , , , "84123456"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "BH", 973, "00", , , , , , , , [[, "(\\d{4})(\\d{4})", "$1 $2"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        BI: [, [, , "[267]\\d{7}", , , , , , , [8]], [, , "22\\d{6}", , , , "22201234"], [, , "(?:29|6[189]|7[124-9])\\d{6}", , , , "79561234"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "BI", 257, "00", , , , , , , , [[, "(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        BJ: [, [, , "[2689]\\d{7}", , , , , , , [8]], [, , "2(?:02|1[037]|2[45]|3[68])\\d{5}", , , , "20211234"], [, , "(?:6[1-8]|9[03-9])\\d{6}", , , , "90011234"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , "857[58]\\d{4}", , , , "85751234"], "BJ", 229, "00", , , , , , , , [[, "(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[2689]"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , "81\\d{6}", , , , "81123456"], , , [, , , , , , , , , [-1]]],
        BL: [, [, , "[56]\\d{8}", , , , , , , [9]], [, , "590(?:2[7-9]|5[12]|87)\\d{4}", , , , "590271234"], [, , "690(?:0[05-9]|[1-9]\\d)\\d{4}", , , , "690001234"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "BL", 590, "00", "0", , , "0", , , , , , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        BM: [, [, , "[4589]\\d{9}", , , , , , , [10], [7]], [, , "441(?:2(?:02|23|61|[3479]\\d)|[46]\\d{2}|5(?:4\\d|60|89)|824)\\d{4}", , , , "4412345678", , , , [7]], [, , "441(?:[37]\\d|5[0-39])\\d{5}", , , , "4413701234", , , , [7]], [, , "8(?:00|33|44|55|66|77|88)[2-9]\\d{6}", , , , "8002123456"], [, , "900[2-9]\\d{6}", , , , "9002123456"], [, , , , , , , , , [-1]], [, , "5(?:00|22|33|44|66|77|88)[2-9]\\d{6}", , , , "5002345678"], [, , , , , , , , , [-1]], "BM", 1, "011", "1", , , "1", , , , , , [, , , , , , , , , [-1]], , "441", [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        BN: [, [, , "[2-578]\\d{6}", , , , , , , [7]], [, , "2(?:[013-9]\\d|2[0-7])\\d{4}|[3-5]\\d{6}", , , , "2345678"], [, , "22[89]\\d{4}|[78]\\d{6}", , , , "7123456"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "BN", 673, "00", , , , , , , , [[, "([2-578]\\d{2})(\\d{4})", "$1 $2"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        BO: [, [, , "[23467]\\d{7}|8\\d{8}", , , , , , , [8, 9], [7]], [, , "(?:2(?:2\\d{2}|5(?:11|[258]\\d|9[67])|6(?:12|2\\d|9[34])|8(?:2[34]|39|62))|3(?:3\\d{2}|4(?:6\\d|8[24])|8(?:25|42|5[257]|86|9[25])|9(?:2\\d|3[234]|4[248]|5[24]|6[2-6]|7\\d))|4(?:4\\d{2}|6(?:11|[24689]\\d|72)))\\d{4}", , , , "22123456", , , [8], [7]], [, , "[67]\\d{7}", , , , "71234567", , , [8]], [, , "80017\\d{4}", , , , "800171234", , , [9]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "BO", 591, "00(1\\d)?", "0", , , "0(1\\d)?", , , , [[, "([234])(\\d{7})", "$1 $2", ["[234]"], , "0$CC $1"], [, "([67]\\d{7})", "$1", ["[67]"], , "0$CC $1"], [, "(800)(\\d{2})(\\d{4})", "$1 $2 $3", ["800"], , "0$CC $1"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        BQ: [, [, , "[347]\\d{6}", , , , , , , [7]], [, , "(?:318[023]|41(?:6[023]|70)|7(?:1[578]|50)\\d)\\d{3}", , , , "7151234"], [, , "(?:31(?:8[14-8]|9[14578])|416[145-9]|7(?:0[01]|7[07]|8\\d|9[056])\\d)\\d{3}", , , , "3181234"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "BQ", 599, "00", , , , , , , , , , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        BR: [, [, , "[1-46-9]\\d{7,10}|5(?:[0-4]\\d{7,9}|5(?:[2-8]\\d{7}|9\\d{7,8}))", , , , , , , [8, 9, 10, 11]], [, , "(?:[14689][1-9]|2[12478]|3[1-578]|5[13-5]|7[13-579])[2-5]\\d{7}", , , , "1123456789", , , [10], [8]], [, , "(?:[189][1-9]|2[12478])(?:7|9\\d)\\d{7}|(?:3[1-578]|[46][1-9]|5[13-5]|7[13-579])(?:[6-8]|9\\d?)\\d{7}", , , , "11961234567", , , [10, 11], [8]], [, , "800\\d{6,7}", , , , "800123456", , , [9, 10]], [, , "(?:300|[59]00\\d?)\\d{6}", , , , "300123456", , , [9, 10]], [, , "(?:300\\d(?:\\d{2})?|40(?:0\\d|20))\\d{4}", , , , "40041234", , , [8, 10]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "BR", 55, "00(?:1[245]|2[1-35]|31|4[13]|[56]5|99)", "0", , , "0(?:(1[245]|2[1-35]|31|4[13]|[56]5|99)(\\d{10,11}))?", "$2", , , [[, "(\\d{4})(\\d{4})", "$1-$2", ["(?:300|40[02])", "(?:300|40(?:0|20))"]], [, "([3589]00)(\\d{2,3})(\\d{4})", "$1 $2 $3", ["[3589]00"], "0$1"], [, "(\\d{3,5})", "$1", ["1[125689]"], "$1"], [, "(\\d{4})(\\d{4})", "$1-$2", ["[2-9](?:[1-9]|0[1-9])"], "$1"], [, "(\\d{5})(\\d{4})", "$1-$2", ["9(?:[1-9]|0[1-9])"], "$1"], [, "(\\d{2})(\\d{4})(\\d{4})", "$1 $2-$3", ["[1-9][1-9]"], "($1)", "0 $CC ($1)"], [, "(\\d{2})(\\d{5})(\\d{4})", "$1 $2-$3", ["[1-9][1-9]9"], "($1)", "0 $CC ($1)"]], [[, "(\\d{4})(\\d{4})", "$1-$2", ["(?:300|40[02])", "(?:300|40(?:0|20))"]], [, "([3589]00)(\\d{2,3})(\\d{4})", "$1 $2 $3", ["[3589]00"], "0$1"], [, "(\\d{2})(\\d{4})(\\d{4})", "$1 $2-$3", ["[1-9][1-9]"], "($1)", "0 $CC ($1)"], [, "(\\d{2})(\\d{5})(\\d{4})", "$1 $2-$3", ["[1-9][1-9]9"], "($1)", "0 $CC ($1)"]], [, , , , , , , , , [-1]], , , [, , "(?:300\\d|40(?:0\\d|20))\\d{4}", , , , "40041234", , , [8]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        BS: [, [, , "[2589]\\d{9}", , , , , , , [10], [7]], [, , "242(?:3(?:02|[236][1-9]|4[0-24-9]|5[0-68]|7[3467]|8[0-4]|9[2-467])|461|502|6(?:0[1-3]|12|7[67]|8[78]|9[89])|7(?:02|88))\\d{4}", , , , "2423456789", , , , [7]], [, , "242(?:3(?:5[79]|[79]5)|4(?:[2-4][1-9]|5[1-8]|6[2-8]|7\\d|81)|5(?:2[45]|3[35]|44|5[1-9]|65|77)|6[34]6|7(?:27|38)|8(?:0[1-9]|1[02-9]|2\\d|99))\\d{4}", , , , "2423591234", , , , [7]], [, , "242300\\d{4}|8(?:00|33|44|55|66|77|88)[2-9]\\d{6}", , , , "8002123456", , , , [7]], [, , "900[2-9]\\d{6}", , , , "9002123456"], [, , , , , , , , , [-1]], [, , "5(?:00|22|33|44|66|77|88)[2-9]\\d{6}", , , , "5002345678"], [, , , , , , , , , [-1]], "BS", 1, "011", "1", , , "1", , , , , , [, , , , , , , , , [-1]], , "242", [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        BT: [, [, , "[1-8]\\d{6,7}", , , , , , , [7, 8], [6]], [, , "(?:2[3-6]|[34][5-7]|5[236]|6[2-46]|7[246]|8[2-4])\\d{5}", , , , "2345678", , , [7], [6]], [, , "(?:1[67]|77)\\d{6}", , , , "17123456", , , [8]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "BT", 975, "00", , , , , , , , [[, "(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["1|77"]], [, "([2-8])(\\d{3})(\\d{3})", "$1 $2 $3", ["[2-68]|7[246]"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        BW: [, [, , "[2-79]\\d{6,7}", , , , , , , [7, 8]], [, , "(?:2(?:4[0-48]|6[0-24]|9[0578])|3(?:1[0-35-9]|55|[69]\\d|7[01])|4(?:6[03]|7[1267]|9[0-5])|5(?:3[0389]|4[0489]|7[1-47]|88|9[0-49])|6(?:2[1-35]|5[149]|8[067]))\\d{4}", , , , "2401234", , , [7]], [, , "7(?:[1-6]\\d|7[014-8])\\d{5}", , , , "71123456", , , [8]], [, , , , , , , , , [-1]], [, , "90\\d{5}", , , , "9012345", , , [7]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , "79[12][01]\\d{4}", , , , "79101234", , , [8]], "BW", 267, "00", , , , , , , , [[, "(\\d{3})(\\d{4})", "$1 $2", ["[2-6]"]], [, "(7\\d)(\\d{3})(\\d{3})", "$1 $2 $3", ["7"]], [, "(90)(\\d{5})", "$1 $2", ["9"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        BY: [, [, , "[1-4]\\d{8}|800\\d{3,7}|[89]\\d{9,10}", , , , , , , [6, 7, 8, 9, 10, 11], [5]], [, , "(?:1(?:5(?:1[1-5]|[24]\\d|6[2-4]|9[1-7])|6(?:[235]\\d|4[1-7])|7\\d{2})|2(?:1(?:[246]\\d|3[0-35-9]|5[1-9])|2(?:[235]\\d|4[0-8])|3(?:[26]\\d|3[02-79]|4[024-7]|5[03-7])))\\d{5}", , , , "152450911", , , [9], [5, 6, 7]], [, , "(?:2(?:5[5679]|9[1-9])|33\\d|44\\d)\\d{6}", , , , "294911911", , , [9]], [, , "8(?:0[13]|20\\d)\\d{7}|800\\d{3,7}", , , , "8011234567"], [, , "(?:810|902)\\d{7}", , , , "9021234567", , , [10]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , "249\\d{6}", , , , "249123456", , , [9]], "BY", 375, "810", "8", , , "8?0?", , "8~10", , [[, "(\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1 $2-$3-$4", ["17[0-3589]|2[4-9]|[34]", "17(?:[02358]|1[0-2]|9[0189])|2[4-9]|[34]"], "8 0$1"], [, "(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2-$3-$4", ["1(?:5[24]|6[235]|7[467])|2(?:1[246]|2[25]|3[26])", "1(?:5[24]|6(?:2|3[04-9]|5[0346-9])|7(?:[46]|7[37-9]))|2(?:1[246]|2[25]|3[26])"], "8 0$1"], [, "(\\d{4})(\\d{2})(\\d{3})", "$1 $2-$3", ["1(?:5[169]|6[3-5]|7[179])|2(?:1[35]|2[34]|3[3-5])", "1(?:5[169]|6(?:3[1-3]|4|5[125])|7(?:1[3-9]|7[0-24-6]|9[2-7]))|2(?:1[35]|2[34]|3[3-5])"], "8 0$1"], [, "([89]\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["8[01]|9"], "8 $1"], [, "(82\\d)(\\d{4})(\\d{4})", "$1 $2 $3", ["82"], "8 $1"], [, "(800)(\\d{3})", "$1 $2", ["800"], "8 $1"], [, "(800)(\\d{2})(\\d{2,4})", "$1 $2 $3", ["800"], "8 $1"]], , [, , , , , , , , , [-1]], , , [, , "8(?:0[13]|10|20\\d)\\d{7}|800\\d{3,7}|902\\d{7}", , , , "82012345678"], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        BZ: [, [, , "[2-8]\\d{6}|0\\d{10}", , , , , , , [7, 11]], [, , "(?:2(?:[02]\\d|36)|[3-58][02]\\d|7(?:[02]\\d|32))\\d{4}", , , , "2221234", , , [7]], [, , "6[0-35-7]\\d{5}", , , , "6221234", , , [7]], [, , "0800\\d{7}", , , , "08001234123", , , [11]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "BZ", 501, "00", , , , , , , , [[, "(\\d{3})(\\d{4})", "$1-$2", ["[2-8]"]], [, "(0)(800)(\\d{4})(\\d{3})", "$1-$2-$3-$4", ["0"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        CA: [, [, , "[2-9]\\d{9}|3\\d{6}", , , , , , , [7, 10]], [, , "(?:2(?:04|[23]6|[48]9|50)|3(?:06|43|65)|4(?:03|1[68]|3[178]|50)|5(?:06|1[49]|48|79|8[17])|6(?:0[04]|13|22|39|47)|7(?:0[59]|78|8[02])|8(?:[06]7|19|25|73)|90[25])[2-9]\\d{6}|310\\d{4}", , , , "2042345678", , , [10], [7]], [, , "(?:2(?:04|[23]6|[48]9|50)|3(?:06|43|65)|4(?:03|1[68]|3[178]|50)|5(?:06|1[49]|48|79|8[17])|6(?:0[04]|13|22|39|47)|7(?:0[59]|78|8[02])|8(?:[06]7|19|25|73)|90[25])[2-9]\\d{6}", , , , "2042345678", , , [10], [7]], [, , "8(?:00|33|44|55|66|77|88)[2-9]\\d{6}|310\\d{4}", , , , "8002123456"], [, , "900[2-9]\\d{6}", , , , "9002123456", , , [10]], [, , , , , , , , , [-1]], [, , "5(?:00|22|33|44|66|77|88)[2-9]\\d{6}", , , , "5002345678", , , [10]], [, , , , , , , , , [-1]], "CA", 1, "011", "1", , , "1", , , , , , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        CC: [, [, , "[1458]\\d{5,9}", , , , , , , [6, 7, 9, 10], [8]], [, , "89162\\d{4}", , , , "891621234", , , [9], [8]], [, , "14(?:5\\d|71)\\d{5}|4(?:[0-2]\\d|3[0-57-9]|4[47-9]|5[0-25-9]|6[6-9]|7[02-9]|8[147-9]|9[017-9])\\d{6}", , , , "412345678", , , [9]], [, , "180(?:0\\d{3}|2)\\d{3}", , , , "1800123456", , , [7, 10]], [, , "190[0126]\\d{6}", , , , "1900123456", , , [10]], [, , "13(?:00\\d{2})?\\d{4}", , , , "1300123456", , , [6, 10]], [, , "500\\d{6}", , , , "500123456", , , [9]], [, , "550\\d{6}", , , , "550123456", , , [9]], "CC", 61, "(?:14(?:1[14]|34|4[17]|[56]6|7[47]|88))?001[14-689]", "0", , , "0", , "0011", , , , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        CD: [, [, , "[2-6]\\d{6}|[18]\\d{6,8}|9\\d{8}", , , , , , , [7, 9]], [, , "1(?:2\\d{7}|\\d{6})|[2-6]\\d{6}", , , , "1234567"], [, , "8(?:[0-2459]\\d{2}|8)\\d{5}|9[017-9]\\d{7}", , , , "991234567"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "CD", 243, "00", "0", , , "0", , , , [[, "(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["12"], "0$1"], [, "([89]\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["8[0-2459]|9"], "0$1"], [, "(\\d{2})(\\d{2})(\\d{3})", "$1 $2 $3", ["88"], "0$1"], [, "(\\d{2})(\\d{5})", "$1 $2", ["[1-6]"], "0$1"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        CF: [, [, , "[278]\\d{7}", , , , , , , [8]], [, , "2[12]\\d{6}", , , , "21612345"], [, , "7[0257]\\d{6}", , , , "70012345"], [, , , , , , , , , [-1]], [, , "8776\\d{4}", , , , "87761234"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "CF", 236, "00", , , , , , , , [[, "(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        CG: [, [, , "[028]\\d{8}", , , , , , , [9]], [, , "222[1-589]\\d{5}", , , , "222123456"], [, , "0[14-6]\\d{7}", , , , "061234567"], [, , , , , , , , , [-1]], [, , "80(?:0\\d{2}|11[01])\\d{4}", , , , "800123456"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "CG", 242, "00", , , , , , , , [[, "(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["801"]], [, "(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[02]"]], [, "(\\d)(\\d{4})(\\d{4})", "$1 $2 $3", ["800"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        CH: [, [, , "[2-9]\\d{8}|860\\d{9}", , , , , , , [9, 12]], [, , "(?:2[12467]|3[1-4]|4[134]|5[256]|6[12]|[7-9]1)\\d{7}", , , , "212345678", , , [9]], [, , "7[5-9]\\d{7}", , , , "781234567", , , [9]], [, , "800\\d{6}", , , , "800123456", , , [9]], [, , "90[016]\\d{6}", , , , "900123456", , , [9]], [, , "84[0248]\\d{6}", , , , "840123456", , , [9]], [, , "878\\d{6}", , , , "878123456", , , [9]], [, , , , , , , , , [-1]], "CH", 41, "00", "0", , , "0", , , , [[, "([2-9]\\d)(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[2-7]|[89]1"], "0$1"], [, "([89]\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["8[047]|90"], "0$1"], [, "(\\d{3})(\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4 $5", ["860"], "0$1"]], , [, , "74[0248]\\d{6}", , , , "740123456", , , [9]], , , [, , , , , , , , , [-1]], [, , "5[18]\\d{7}", , , , "581234567", , , [9]], , , [, , "860\\d{9}", , , , "860123456789", , , [12]]],
        CI: [, [, , "[02-8]\\d{7}", , , , , , , [8]], [, , "(?:2(?:0[023]|1[02357]|[23][045]|4[03-5])|3(?:0[06]|1[069]|[2-4][07]|5[09]|6[08]))\\d{5}", , , , "21234567"], [, , "(?:0[1-9]|4\\d|5[14-9]|6[015-79]|[78][4-9])\\d{6}", , , , "01234567"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "CI", 225, "00", , , , , , , , [[, "(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        CK: [, [, , "[2-8]\\d{4}", , , , , , , [5]], [, , "(?:2\\d|3[13-7]|4[1-5])\\d{3}", , , , "21234"], [, , "[5-8]\\d{4}", , , , "71234"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "CK", 682, "00", , , , , , , , [[, "(\\d{2})(\\d{3})", "$1 $2"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        CL: [, [, , "(?:[2-9]|600|123)\\d{7,8}", , , , , , , [9, 10, 11], [7, 8]], [, , "2(?:1962\\d{4}|2\\d{7}|32[0-467]\\d{5})|(?:3[2-5]|[47][1-35]|5[1-3578]|6[13-57]|9[3-9])\\d{7}", , , , "221234567", , , [9], [7, 8]], [, , "2(?:1962\\d{4}|2\\d{7}|32[0-467]\\d{5})|(?:3[2-5]|[47][1-35]|5[1-3578]|6[13-57]|9[3-9])\\d{7}", , , , "961234567", , , [9], [8]], [, , "800\\d{6}|1230\\d{7}", , , , "800123456", , , [9, 11]], [, , , , , , , , , [-1]], [, , "600\\d{7,8}", , , , "6001234567", , , [10, 11]], [, , , , , , , , , [-1]], [, , "44\\d{7}", , , , "441234567", , , [9]], "CL", 56, "(?:0|1(?:1[0-69]|2[0-57]|5[13-58]|69|7[0167]|8[018]))0", "0", , , "0|(1(?:1[0-69]|2[0-57]|5[13-58]|69|7[0167]|8[018]))", , , 1, [[, "(\\d)(\\d{4})(\\d{4})", "$1 $2 $3", ["2[23]"], "($1)", "$CC ($1)"], [, "(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[357]|4[1-35]|6[13-57]"], "($1)", "$CC ($1)"], [, "(9)(\\d{4})(\\d{4})", "$1 $2 $3", ["9"], "0$1"], [, "(44)(\\d{3})(\\d{4})", "$1 $2 $3", ["44"], "0$1"], [, "([68]00)(\\d{3})(\\d{3,4})", "$1 $2 $3", ["60|8"], "$1"], [, "(600)(\\d{3})(\\d{2})(\\d{3})", "$1 $2 $3 $4", ["60"], "$1"], [, "(1230)(\\d{3})(\\d{4})", "$1 $2 $3", ["1"], "$1"], [, "(\\d{5})(\\d{4})", "$1 $2", ["219"], "($1)", "$CC ($1)"], [, "(\\d{4,5})", "$1", ["[1-9]"], "$1"]], [[, "(\\d)(\\d{4})(\\d{4})", "$1 $2 $3", ["2[23]"], "($1)", "$CC ($1)"], [, "(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[357]|4[1-35]|6[13-57]"], "($1)", "$CC ($1)"], [, "(9)(\\d{4})(\\d{4})", "$1 $2 $3", ["9"], "0$1"], [, "(44)(\\d{3})(\\d{4})", "$1 $2 $3", ["44"], "0$1"], [, "([68]00)(\\d{3})(\\d{3,4})", "$1 $2 $3", ["60|8"], "$1"], [, "(600)(\\d{3})(\\d{2})(\\d{3})", "$1 $2 $3 $4", ["60"], "$1"], [, "(1230)(\\d{3})(\\d{4})", "$1 $2 $3", ["1"], "$1"], [, "(\\d{5})(\\d{4})", "$1 $2", ["219"], "($1)", "$CC ($1)"]], [, , , , , , , , , [-1]], , , [, , "600\\d{7,8}", , , , "6001234567", , , [10, 11]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        CM: [, [, , "[2368]\\d{7,8}", , , , , , , [8, 9]], [, , "2(?:22|33|4[23])\\d{6}", , , , "222123456", , , [9]], [, , "6[5-9]\\d{7}", , , , "671234567", , , [9]], [, , "88\\d{6}", , , , "88012345", , , [8]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "CM", 237, "00", , , , , , , , [[, "([26])(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4 $5", ["[26]"]], [, "(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[23]|88"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        CN: [, [, , "[1-7]\\d{6,11}|8[0-357-9]\\d{6,9}|9\\d{7,10}", , , , , , , [7, 8, 9, 10, 11, 12], [5, 6]], [, , "21(?:100\\d{2}|95\\d{3,4}|\\d{8,10})|(?:10|2[02-57-9]|3(?:11|7[179])|4(?:[15]1|3[1-35])|5(?:1\\d|2[37]|3[12]|51|7[13-79]|9[15])|7(?:31|5[457]|6[09]|91)|8(?:[57]1|98))(?:100\\d{2}|95\\d{3,4}|\\d{8})|(?:3(?:1[02-9]|35|49|5\\d|7[02-68]|9[1-68])|4(?:1[02-9]|2[179]|3[3-9]|5[2-9]|6[4789]|7\\d|8[23])|5(?:3[03-9]|4[36]|5[02-9]|6[1-46]|7[028]|80|9[2-46-9])|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[17]\\d|2[248]|3[04-9]|4[3-6]|5[0-4689]|6[2368]|9[02-9])|8(?:078|1[236-8]|2[5-7]|3\\d|5[1-9]|7[02-9]|8[3678]|9[1-7])|9(?:0[1-3689]|1[1-79]|[379]\\d|4[13]|5[1-5]))(?:100\\d{2}|95\\d{3,4}|\\d{7})|80(?:29|6[03578]|7[018]|81)\\d{4}", , , , "1012345678", , , , [5, 6]], [, , "1(?:[38]\\d|4[57]|5[0-35-9]|7[0-35-8])\\d{8}", , , , "13123456789", , , [11]], [, , "(?:10)?800\\d{7}", , , , "8001234567", , , [10, 12]], [, , "16[08]\\d{5}", , , , "16812345", , , [8]], [, , "400\\d{7}|950\\d{7,8}|(?:10|2[0-57-9]|3(?:[157]\\d|35|49|9[1-68])|4(?:[17]\\d|2[179]|[35][1-9]|6[4789]|8[23])|5(?:[1357]\\d|2[37]|4[36]|6[1-46]|80|9[1-9])|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]\\d|2[248]|3[014-9]|4[3-6]|6[023689])|8(?:1[236-8]|2[5-7]|[37]\\d|5[14-9]|8[3678]|9[1-8])|9(?:0[1-3689]|1[1-79]|[379]\\d|4[13]|5[1-5]))96\\d{3,4}", , , , "4001234567", , , [7, 8, 9, 10, 11], [5, 6]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "CN", 86, "(1(?:[129]\\d{3}|79\\d{2}))?00", "0", , , "(1(?:[129]\\d{3}|79\\d{2}))|0", , "00", , [[, "(80\\d{2})(\\d{4})", "$1 $2", ["80[2678]"], "0$1", "$CC $1", 1], [, "([48]00)(\\d{3})(\\d{4})", "$1 $2 $3", ["[48]00"]], [, "(\\d{5,6})", "$1", ["100|95"]], [, "(\\d{2})(\\d{5,6})", "$1 $2", ["(?:10|2\\d)[19]", "(?:10|2\\d)(?:10|9[56])", "(?:10|2\\d)(?:100|9[56])"], "0$1", "$CC $1"], [, "(\\d{3})(\\d{5,6})", "$1 $2", ["[3-9]", "[3-9]\\d{2}[19]", "[3-9]\\d{2}(?:10|9[56])"], "0$1", "$CC $1"], [, "(\\d{3,4})(\\d{4})", "$1 $2", ["[2-9]"]], [, "(21)(\\d{4})(\\d{4,6})", "$1 $2 $3", ["21"], "0$1", "$CC $1", 1], [, "([12]\\d)(\\d{4})(\\d{4})", "$1 $2 $3", ["10[1-9]|2[02-9]", "10[1-9]|2[02-9]", "10(?:[1-79]|8(?:[1-9]|0[1-9]))|2[02-9]"], "0$1", "$CC $1", 1], [, "(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["3(?:1[02-9]|35|49|5|7[02-68]|9[1-68])|4(?:1[02-9]|2[179]|[35][2-9]|6[4789]|7\\d|8[23])|5(?:3[03-9]|4[36]|5[02-9]|6[1-46]|7[028]|80|9[2-46-9])|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]|2[248]|3[04-9]|4[3-6]|6[2368])|8(?:1[236-8]|2[5-7]|3|5[1-9]|7[02-9]|8[3678]|9[1-7])|9(?:0[1-3689]|1[1-79]|[379]|4[13]|5[1-5])"], "0$1", "$CC $1", 1], [, "(\\d{3})(\\d{4})(\\d{4})", "$1 $2 $3", ["3(?:11|7[179])|4(?:[15]1|3[1-35])|5(?:1|2[37]|3[12]|51|7[13-79]|9[15])|7(?:31|5[457]|6[09]|91)|8(?:[57]1|98)"], "0$1", "$CC $1", 1], [, "(\\d{4})(\\d{3})(\\d{4})", "$1 $2 $3", ["807", "8078"], "0$1", "$CC $1", 1], [, "(\\d{3})(\\d{4})(\\d{4})", "$1 $2 $3", ["1[3-578]"], , "$CC $1"], [, "(10800)(\\d{3})(\\d{4})", "$1 $2 $3", ["108", "1080", "10800"]], [, "(\\d{3})(\\d{7,8})", "$1 $2", ["950"]]], [[, "(80\\d{2})(\\d{4})", "$1 $2", ["80[2678]"], "0$1", "$CC $1", 1], [, "([48]00)(\\d{3})(\\d{4})", "$1 $2 $3", ["[48]00"]], [, "(\\d{2})(\\d{5,6})", "$1 $2", ["(?:10|2\\d)[19]", "(?:10|2\\d)(?:10|9[56])", "(?:10|2\\d)(?:100|9[56])"], "0$1", "$CC $1"], [, "(\\d{3})(\\d{5,6})", "$1 $2", ["[3-9]", "[3-9]\\d{2}[19]", "[3-9]\\d{2}(?:10|9[56])"], "0$1", "$CC $1"], [, "(21)(\\d{4})(\\d{4,6})", "$1 $2 $3", ["21"], "0$1", "$CC $1", 1], [, "([12]\\d)(\\d{4})(\\d{4})", "$1 $2 $3", ["10[1-9]|2[02-9]", "10[1-9]|2[02-9]", "10(?:[1-79]|8(?:[1-9]|0[1-9]))|2[02-9]"], "0$1", "$CC $1", 1], [, "(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["3(?:1[02-9]|35|49|5|7[02-68]|9[1-68])|4(?:1[02-9]|2[179]|[35][2-9]|6[4789]|7\\d|8[23])|5(?:3[03-9]|4[36]|5[02-9]|6[1-46]|7[028]|80|9[2-46-9])|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]|2[248]|3[04-9]|4[3-6]|6[2368])|8(?:1[236-8]|2[5-7]|3|5[1-9]|7[02-9]|8[3678]|9[1-7])|9(?:0[1-3689]|1[1-79]|[379]|4[13]|5[1-5])"], "0$1", "$CC $1", 1], [, "(\\d{3})(\\d{4})(\\d{4})", "$1 $2 $3", ["3(?:11|7[179])|4(?:[15]1|3[1-35])|5(?:1|2[37]|3[12]|51|7[13-79]|9[15])|7(?:31|5[457]|6[09]|91)|8(?:[57]1|98)"], "0$1", "$CC $1", 1], [, "(\\d{4})(\\d{3})(\\d{4})", "$1 $2 $3", ["807", "8078"], "0$1", "$CC $1", 1], [, "(\\d{3})(\\d{4})(\\d{4})", "$1 $2 $3", ["1[3-578]"], , "$CC $1"], [, "(10800)(\\d{3})(\\d{4})", "$1 $2 $3", ["108", "1080", "10800"]], [, "(\\d{3})(\\d{7,8})", "$1 $2", ["950"]]], [, , , , , , , , , [-1]], , , [, , "(?:4|(?:10)?8)00\\d{7}|950\\d{7,8}", , , , "4001234567", , , [10, 11, 12]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        CO: [, [, , "(?:[13]\\d{0,3}|[24-8])\\d{7}", , , , , , , [8, 10, 11], [7]], [, , "[124-8][2-9]\\d{6}", , , , "12345678", , , [8], [7]], [, , "3(?:0[0-5]|1\\d|2[0-3]|5[01])\\d{7}", , , , "3211234567", , , [10]], [, , "1800\\d{7}", , , , "18001234567", , , [11]], [, , "19(?:0[01]|4[78])\\d{7}", , , , "19001234567", , , [11]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "CO", 57, "00(?:4(?:[14]4|56)|[579])", "0", , , "0([3579]|4(?:44|56))?", , , , [[, "(\\d)(\\d{7})", "$1 $2", ["1(?:8[2-9]|9[0-3]|[2-7])|[24-8]", "1(?:8[2-9]|9(?:09|[1-3])|[2-7])|[24-8]"], "($1)", "0$CC $1"], [, "(\\d{3})(\\d{7})", "$1 $2", ["3"], , "0$CC $1"], [, "(1)(\\d{3})(\\d{7})", "$1-$2-$3", ["1(?:80|9[04])", "1(?:800|9(?:0[01]|4[78]))"], "0$1"]], [[, "(\\d)(\\d{7})", "$1 $2", ["1(?:8[2-9]|9[0-3]|[2-7])|[24-8]", "1(?:8[2-9]|9(?:09|[1-3])|[2-7])|[24-8]"], "($1)", "0$CC $1"], [, "(\\d{3})(\\d{7})", "$1 $2", ["3"], , "0$CC $1"], [, "(1)(\\d{3})(\\d{7})", "$1 $2 $3", ["1(?:80|9[04])", "1(?:800|9(?:0[01]|4[78]))"]]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        CR: [, [, , "[24-9]\\d{7,9}", , , , , , , [8, 10]], [, , "2[0-24-7]\\d{6}", , , , "22123456", , , [8]], [, , "5(?:0[01]|7[0-3])\\d{5}|6(?:[0-4]\\d{3}|500[01])\\d{3}|(?:7[0-3]|8[3-9])\\d{6}", , , , "83123456", , , [8]], [, , "800\\d{7}", , , , "8001234567", , , [10]], [, , "90[059]\\d{7}", , , , "9001234567", , , [10]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , "210[0-6]\\d{4}|4\\d{7}|5100\\d{4}", , , , "40001234", , , [8]], "CR", 506, "00", , , , "(19(?:0[012468]|1[09]|20|66|77|99))", , , , [[, "(\\d{4})(\\d{4})", "$1 $2", ["[24-7]|8[3-9]"], , "$CC $1"], [, "(\\d{3})(\\d{3})(\\d{4})", "$1-$2-$3", ["[89]0"], , "$CC $1"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        CU: [, [, , "[2-57]\\d{5,7}", , , , , , , [6, 7, 8], [4, 5]], [, , "2[1-4]\\d{5,6}|3(?:1\\d{6}|[23]\\d{4,6})|4(?:[125]\\d{5,6}|[36]\\d{6}|[78]\\d{4,6})|7\\d{6,7}", , , , "71234567", , , , [4, 5]], [, , "5\\d{7}", , , , "51234567", , , [8]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "CU", 53, "119", "0", , , "0", , , , [[, "(\\d)(\\d{6,7})", "$1 $2", ["7"], "(0$1)"], [, "(\\d{2})(\\d{4,6})", "$1 $2", ["[2-4]"], "(0$1)"], [, "(\\d)(\\d{7})", "$1 $2", ["5"], "0$1"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        CV: [, [, , "[259]\\d{6}", , , , , , , [7]], [, , "2(?:2[1-7]|3[0-8]|4[12]|5[1256]|6\\d|7[1-3]|8[1-5])\\d{4}", , , , "2211234"], [, , "(?:9\\d|59)\\d{5}", , , , "9911234"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "CV", 238, "0", , , , , , , , [[, "(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        CW: [, [, , "[169]\\d{6,7}", , , , , , , [7, 8]], [, , "9(?:[48]\\d{2}|50\\d|7(?:2[0-24]|[34]\\d|6[35-7]|77|8[7-9]))\\d{4}", , , , "94151234", , , [8]], [, , "9(?:5(?:[12467]\\d|3[01])|6(?:[15-9]\\d|3[01]))\\d{4}", , , , "95181234", , , [8]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , "60[0-2]\\d{4}", , , , "6001234", , , [7]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "CW", 599, "00", , , , , , , , [[, "(\\d{3})(\\d{4})", "$1 $2", ["[13-7]"]], [, "(9)(\\d{3})(\\d{4})", "$1 $2 $3", ["9"]]], , [, , "955\\d{5}", , , , "95581234", , , [8]], 1, , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        CX: [, [, , "[1458]\\d{5,9}", , , , , , , [6, 7, 8, 9, 10]], [, , "89164\\d{4}", , , , "891641234", , , [9], [8]], [, , "14(?:5\\d|71)\\d{5}|4(?:[0-2]\\d|3[0-57-9]|4[47-9]|5[0-25-9]|6[6-9]|7[02-9]|8[147-9]|9[017-9])\\d{6}", , , , "412345678", , , [9]], [, , "180(?:0\\d{3}|2)\\d{3}", , , , "1800123456", , , [7, 10]], [, , "190[0126]\\d{6}", , , , "1900123456", , , [10]], [, , "13(?:00\\d{2})?\\d{4}", , , , "1300123456", , , [6, 8, 10]], [, , "500\\d{6}", , , , "500123456", , , [9]], [, , "550\\d{6}", , , , "550123456", , , [9]], "CX", 61, "(?:14(?:1[14]|34|4[17]|[56]6|7[47]|88))?001[14-689]", "0", , , "0", , "0011", , , , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        CY: [, [, , "[257-9]\\d{7}", , , , , , , [8]], [, , "2[2-6]\\d{6}", , , , "22345678"], [, , "9[4-79]\\d{6}", , , , "96123456"], [, , "800\\d{5}", , , , "80001234"], [, , "90[09]\\d{5}", , , , "90012345"], [, , "80[1-9]\\d{5}", , , , "80112345"], [, , "700\\d{5}", , , , "70012345"], [, , , , , , , , , [-1]], "CY", 357, "00", , , , , , , , [[, "(\\d{2})(\\d{6})", "$1 $2"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , "(?:50|77)\\d{6}", , , , "77123456"], , , [, , , , , , , , , [-1]]],
        CZ: [, [, , "[2-8]\\d{8}|9\\d{8,11}", , , , , , , [9, 10, 11, 12]], [, , "2\\d{8}|(?:3[1257-9]|4[16-9]|5[13-9])\\d{7}", , , , "212345678", , , [9]], [, , "(?:60[1-8]|7(?:0[2-5]|[2379]\\d))\\d{6}", , , , "601123456", , , [9]], [, , "800\\d{6}", , , , "800123456", , , [9]], [, , "9(?:0[05689]|76)\\d{6}", , , , "900123456", , , [9]], [, , "8[134]\\d{7}", , , , "811234567", , , [9]], [, , "70[01]\\d{6}", , , , "700123456", , , [9]], [, , "9[17]0\\d{6}", , , , "910123456", , , [9]], "CZ", 420, "00", , , , , , , , [[, "([2-9]\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["[2-8]|9[015-7]"]], [, "(96\\d)(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3 $4", ["96"]], [, "(9\\d)(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3 $4", ["9[36]"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , "9(?:5\\d|7[234])\\d{6}", , , , "972123456", , , [9]], , , [, , "9(?:3\\d{9}|6\\d{7,10})", , , , "93123456789"]],
        DE: [, [, , "[1-35-9]\\d{3,14}|4(?:[0-8]\\d{3,12}|9(?:[0-37]\\d|4(?:[1-35-8]|4\\d?)|5\\d{1,2}|6[1-8]\\d?)\\d{2,8})", , , , , , , [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], [3]], [, , "2\\d{5,13}|3(?:0\\d{3,13}|2\\d{9}|[3-9]\\d{4,13})|4(?:0\\d{3,12}|\\d{5,13})|5(?:0[2-8]|[1256]\\d|[38][0-8]|4\\d{0,2}|[79][0-7])\\d{3,11}|6(?:\\d{5,13}|9\\d{3,12})|7(?:0[2-8]|[1-9]\\d)\\d{3,10}|8(?:0[2-9]|[1-8]\\d|9\\d?)\\d{3,10}|9(?:0[6-9]\\d{3,10}|1\\d{4,12}|[2-9]\\d{4,11})", , , , "30123456", , , [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], [3, 4]], [, , "1(?:5[0-25-9]\\d{8}|6[023]\\d{7,8}|7\\d{8,9})", , , , "15123456789", , , [10, 11]], [, , "800\\d{7,12}", , , , "8001234567890", , , [10, 11, 12, 13, 14, 15]], [, , "137[7-9]\\d{6}|900(?:[135]\\d{6}|9\\d{7})", , , , "9001234567", , , [10, 11]], [, , "1(?:3(?:7[1-6]\\d{6}|8\\d{4})|80\\d{5,11})", , , , "18012345", , , [7, 8, 9, 10, 11, 12, 13, 14]], [, , "700\\d{8}", , , , "70012345678", , , [11]], [, , , , , , , , , [-1]], "DE", 49, "00", "0", , , "0", , , , [[, "(1\\d{2})(\\d{7,8})", "$1 $2", ["1[67]"], "0$1"], [, "(15\\d{3})(\\d{6})", "$1 $2", ["15[0568]"], "0$1"], [, "(1\\d{3})(\\d{7})", "$1 $2", ["15"], "0$1"], [, "(\\d{2})(\\d{3,11})", "$1 $2", ["3[02]|40|[68]9"], "0$1"], [, "(\\d{3})(\\d{3,11})", "$1 $2", ["2(?:\\d1|0[2389]|1[24]|28|34)|3(?:[3-9][15]|40)|[4-8][1-9]1|9(?:06|[1-9]1)"], "0$1"], [, "(\\d{4})(\\d{2,11})", "$1 $2", ["[24-6]|[7-9](?:\\d[1-9]|[1-9]\\d)|3(?:[3569][02-46-9]|4[2-4679]|7[2-467]|8[2-46-8])", "[24-6]|[7-9](?:\\d[1-9]|[1-9]\\d)|3(?:3(?:0[1-467]|2[127-9]|3[124578]|[46][1246]|7[1257-9]|8[1256]|9[145])|4(?:2[135]|3[1357]|4[13578]|6[1246]|7[1356]|9[1346])|5(?:0[14]|2[1-3589]|3[1357]|4[1246]|6[1-4]|7[1346]|8[13568]|9[1246])|6(?:0[356]|2[1-489]|3[124-6]|4[1347]|6[13]|7[12579]|8[1-356]|9[135])|7(?:2[1-7]|3[1357]|4[145]|6[1-5]|7[1-4])|8(?:21|3[1468]|4[1347]|6[0135-9]|7[1467]|8[136])|9(?:0[12479]|2[1358]|3[1357]|4[134679]|6[1-9]|7[136]|8[147]|9[1468]))"], "0$1"], [, "(3\\d{4})(\\d{1,10})", "$1 $2", ["3"], "0$1"], [, "(800)(\\d{7,12})", "$1 $2", ["800"], "0$1"], [, "(\\d{3})(\\d)(\\d{4,10})", "$1 $2 $3", ["(?:18|90)0|137", "1(?:37|80)|900[1359]"], "0$1"], [, "(1\\d{2})(\\d{5,11})", "$1 $2", ["181"], "0$1"], [, "(18\\d{3})(\\d{6})", "$1 $2", ["185", "1850", "18500"], "0$1"], [, "(18\\d{2})(\\d{7})", "$1 $2", ["18[68]"], "0$1"], [, "(18\\d)(\\d{8})", "$1 $2", ["18[2-579]"], "0$1"], [, "(700)(\\d{4})(\\d{4})", "$1 $2 $3", ["700"], "0$1"], [, "(138)(\\d{4})", "$1 $2", ["138"], "0$1"], [, "(15[013-68])(\\d{2})(\\d{8})", "$1 $2 $3", ["15[013-68]"], "0$1"], [, "(15[279]\\d)(\\d{2})(\\d{7})", "$1 $2 $3", ["15[279]"], "0$1"], [, "(1[67]\\d)(\\d{2})(\\d{7,8})", "$1 $2 $3", ["1(?:6[023]|7)"], "0$1"]], , [, , "16(?:4\\d{1,10}|[89]\\d{1,11})", , , , "16412345", , , [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]], , , [, , , , , , , , , [-1]], [, , "18(?:1\\d{5,11}|[2-9]\\d{8})", , , , "18500123456", , , [8, 9, 10, 11, 12, 13, 14]], , , [, , "1(?:5(?:(?:2\\d55|7\\d99|9\\d33)\\d{7}|(?:[034568]00|113)\\d{8})|6(?:013|255|399)\\d{7,8}|7(?:[015]13|[234]55|[69]33|[78]99)\\d{7,8})", , , , "177991234567", , , [12, 13]]],
        DJ: [, [, , "[27]\\d{7}", , , , , , , [8]], [, , "2(?:1[2-5]|7[45])\\d{5}", , , , "21360003"], [, , "77\\d{6}", , , , "77831001"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "DJ", 253, "00", , , , , , , , [[, "(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        DK: [, [, , "[2-9]\\d{7}", , , , , , , [8]], [, , "(?:[2-7]\\d|8[126-9]|9[1-36-9])\\d{6}", , , , "32123456"], [, , "(?:[2-7]\\d|8[126-9]|9[1-36-9])\\d{6}", , , , "20123456"], [, , "80\\d{6}", , , , "80123456"], [, , "90\\d{6}", , , , "90123456"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "DK", 45, "00", , , , , , , 1, [[, "(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        DM: [, [, , "[57-9]\\d{9}", , , , , , , [10], [7]], [, , "767(?:2(?:55|66)|4(?:2[01]|4[0-25-9])|50[0-4]|70[1-3])\\d{4}", , , , "7674201234", , , , [7]], [, , "767(?:2(?:[234689]5|7[5-7])|31[5-7]|61[1-7])\\d{4}", , , , "7672251234", , , , [7]], [, , "8(?:00|33|44|55|66|77|88)[2-9]\\d{6}", , , , "8002123456"], [, , "900[2-9]\\d{6}", , , , "9002123456"], [, , , , , , , , , [-1]], [, , "5(?:00|22|33|44|66|77|88)[2-9]\\d{6}", , , , "5002345678"], [, , , , , , , , , [-1]], "DM", 1, "011", "1", , , "1", , , , , , [, , , , , , , , , [-1]], , "767", [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        DO: [, [, , "[589]\\d{9}", , , , , , , [10], [7]], [, , "8(?:[04]9[2-9]\\d{6}|29(?:2(?:[0-59]\\d|6[04-9]|7[0-27]|8[0237-9])|3(?:[0-35-9]\\d|4[7-9])|[45]\\d{2}|6(?:[0-27-9]\\d|[3-5][1-9]|6[0135-8])|7(?:0[013-9]|[1-37]\\d|4[1-35689]|5[1-4689]|6[1-57-9]|8[1-79]|9[1-8])|8(?:0[146-9]|1[0-48]|[248]\\d|3[1-79]|5[01589]|6[013-68]|7[124-8]|9[0-8])|9(?:[0-24]\\d|3[02-46-9]|5[0-79]|60|7[0169]|8[57-9]|9[02-9]))\\d{4})", , , , "8092345678", , , , [7]], [, , "8[024]9[2-9]\\d{6}", , , , "8092345678", , , , [7]], [, , "8(?:00|33|44|55|66|77|88)[2-9]\\d{6}", , , , "8002123456"], [, , "900[2-9]\\d{6}", , , , "9002123456"], [, , , , , , , , , [-1]], [, , "5(?:00|22|33|44|66|77|88)[2-9]\\d{6}", , , , "5002345678"], [, , , , , , , , , [-1]], "DO", 1, "011", "1", , , "1", , , , , , [, , , , , , , , , [-1]], , "8[024]9", [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        DZ: [, [, , "(?:[1-4]|[5-9]\\d)\\d{7}", , , , , , , [8, 9]], [, , "(?:1\\d|2[013-79]|3[0-8]|4[0135689])\\d{6}|9619\\d{5}", , , , "12345678"], [, , "(?:5[4-6]|7[7-9])\\d{7}|6(?:[569]\\d|7[0-6])\\d{6}", , , , "551234567", , , [9]], [, , "800\\d{6}", , , , "800123456", , , [9]], [, , "80[3-689]1\\d{5}", , , , "808123456", , , [9]], [, , "80[12]1\\d{5}", , , , "801123456", , , [9]], [, , , , , , , , , [-1]], [, , "98[23]\\d{6}", , , , "983123456", , , [9]], "DZ", 213, "00", "0", , , "0", , , , [[, "([1-4]\\d)(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[1-4]"], "0$1"], [, "([5-8]\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[5-8]"], "0$1"], [, "(9\\d)(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["9"], "0$1"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        EC: [, [, , "1\\d{9,10}|[2-8]\\d{7}|9\\d{8}", , , , , , , [8, 9, 10, 11], [7]], [, , "[2-7][2-7]\\d{6}", , , , "22123456", , , [8], [7]], [, , "9(?:(?:39|[45][89]|7[7-9]|[89]\\d)\\d|6(?:[017-9]\\d|2[0-4]))\\d{5}", , , , "991234567", , , [9]], [, , "1800\\d{6,7}", , , , "18001234567", , , [10, 11]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , "[2-7]890\\d{4}", , , , "28901234", , , [8]], "EC", 593, "00", "0", , , "0", , , , [[, "(\\d)(\\d{3})(\\d{4})", "$1 $2-$3", ["[247]|[356][2-8]"], "(0$1)"], [, "(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["9"], "0$1"], [, "(1800)(\\d{3})(\\d{3,4})", "$1 $2 $3", ["1"], "$1"]], [[, "(\\d)(\\d{3})(\\d{4})", "$1-$2-$3", ["[247]|[356][2-8]"]], [, "(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["9"], "0$1"], [, "(1800)(\\d{3})(\\d{3,4})", "$1 $2 $3", ["1"], "$1"]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        EE: [, [, , "[3-9]\\d{6,7}|800\\d{6,7}", , , , , , , [7, 8, 10]], [, , "(?:3[23589]|4[3-8]|6\\d|7[1-9]|88)\\d{5}", , , , "3212345", , , [7]], [, , "(?:5\\d|8[1-5])\\d{6}|5(?:[02]\\d{2}|1(?:[0-8]\\d|95)|5[0-478]\\d|64[0-4]|65[1-589])\\d{3}", , , , "51234567", , , [7, 8]], [, , "800(?:0\\d{3}|1\\d|[2-9])\\d{3}", , , , "80012345"], [, , "(?:40\\d{2}|900)\\d{4}", , , , "9001234", , , [7, 8]], [, , , , , , , , , [-1]], [, , "70[0-2]\\d{5}", , , , "70012345", , , [8]], [, , , , , , , , , [-1]], "EE", 372, "00", , , , , , , , [[, "([3-79]\\d{2})(\\d{4})", "$1 $2", ["[369]|4[3-8]|5(?:[0-2]|5[0-478]|6[45])|7[1-9]", "[369]|4[3-8]|5(?:[02]|1(?:[0-8]|95)|5[0-478]|6(?:4[0-4]|5[1-589]))|7[1-9]"]], [, "(70)(\\d{2})(\\d{4})", "$1 $2 $3", ["70"]], [, "(8000)(\\d{3})(\\d{3})", "$1 $2 $3", ["800", "8000"]], [, "([458]\\d{3})(\\d{3,4})", "$1 $2", ["40|5|8(?:00|[1-5])", "40|5|8(?:00[1-9]|[1-5])"]]], , [, , , , , , , , , [-1]], , , [, , "800[2-9]\\d{3}", , , , "8002123", , , [7]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        EG: [, [, , "1\\d{4,9}|[2456]\\d{8}|3\\d{7}|[89]\\d{8,9}", , , , , , , [8, 9, 10], [7]], [, , "(?:1(?:3[23]\\d|5(?:[23]|9\\d))|2[2-4]\\d{2}|3\\d{2}|4(?:0[2-5]|[578][23]|64)\\d|5(?:0[2-7]|[57][23])\\d|6[24-689]3\\d|8(?:2[2-57]|4[26]|6[237]|8[2-4])\\d|9(?:2[27]|3[24]|52|6[2356]|7[2-4])\\d)\\d{5}", , , , "234567890", , , [8, 9], [7]], [, , "1(?:0[0-269]|1[0-245]|2[0-278]|55)\\d{7}", , , , "1001234567", , , [10]], [, , "800\\d{7}", , , , "8001234567", , , [10]], [, , "900\\d{7}", , , , "9001234567", , , [10]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "EG", 20, "00", "0", , , "0", , , , [[, "(\\d)(\\d{7,8})", "$1 $2", ["[23]"], "0$1"], [, "(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["1[012]|[89]00"], "0$1"], [, "(\\d{2})(\\d{6,7})", "$1 $2", ["1[35]|[4-6]|[89][2-9]"], "0$1"], [, "(\\d{4})(\\d{3})(\\d{3})", "$1 $2 $3", ["155"], "0$1"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        EH: [, [, , "[5-9]\\d{8}", , , , , , , [9]], [, , "528[89]\\d{5}", , , , "528812345"], [, , "(?:6(?:[0-79]\\d|8[0-247-9])|7(?:[07][07]|6[12]))\\d{6}", , , , "650123456"], [, , "80\\d{7}", , , , "801234567"], [, , "89\\d{7}", , , , "891234567"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , "5924[01]\\d{4}", , , , "592401234"], "EH", 212, "00", "0", , , "0", , , , , , [, , , , , , , , , [-1]], , "528[89]", [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        ER: [, [, , "[178]\\d{6}", , , , , , , [7], [6]], [, , "1(?:1[12568]|20|40|55|6[146])\\d{4}|8\\d{6}", , , , "8370362", , , , [6]], [, , "17[1-3]\\d{4}|7\\d{6}", , , , "7123456"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "ER", 291, "00", "0", , , "0", , , , [[, "(\\d)(\\d{3})(\\d{3})", "$1 $2 $3", , "0$1"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        ES: [, [, , "[5-9]\\d{8}", , , , , , , [9]], [, , "8(?:[1356]\\d|[28][0-8]|[47][1-9])\\d{6}|9(?:[135]\\d{7}|[28][0-8]\\d{6}|4[1-9]\\d{6}|6(?:[0-8]\\d{6}|9(?:0(?:[0-57-9]\\d{4}|6(?:0[0-8]|1[1-9]|[2-9]\\d)\\d{2})|[1-9]\\d{5}))|7(?:[124-9]\\d{2}|3(?:[0-8]\\d|9[1-9]))\\d{4})", , , , "810123456"], [, , "(?:6\\d{6}|7[1-48]\\d{5}|9(?:6906(?:09|10)|7390\\d{2}))\\d{2}", , , , "612345678"], [, , "[89]00\\d{6}", , , , "800123456"], [, , "80[367]\\d{6}", , , , "803123456"], [, , "90[12]\\d{6}", , , , "901123456"], [, , "70\\d{7}", , , , "701234567"], [, , , , , , , , , [-1]], "ES", 34, "00", , , , , , , , [[, "([89]00)(\\d{3})(\\d{3})", "$1 $2 $3", ["[89]00"]], [, "([5-9]\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[568]|[79][0-8]"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , "51\\d{7}", , , , "511234567"], , , [, , , , , , , , , [-1]]],
        ET: [, [, , "[1-59]\\d{8}", , , , , , , [9], [7]], [, , "(?:11(?:1(?:1[124]|2[2-57]|3[1-5]|5[5-8]|8[6-8])|2(?:13|3[6-8]|5[89]|7[05-9]|8[2-6])|3(?:2[01]|3[0-289]|4[1289]|7[1-4]|87)|4(?:1[69]|3[2-49]|4[0-3]|6[5-8])|5(?:1[578]|44|5[0-4])|6(?:18|2[69]|39|4[5-7]|5[1-5]|6[0-59]|8[015-8]))|2(?:2(?:11[1-9]|22[0-7]|33\\d|44[1467]|66[1-68])|5(?:11[124-6]|33[2-8]|44[1467]|55[14]|66[1-3679]|77[124-79]|880))|3(?:3(?:11[0-46-8]|22[0-6]|33[0134689]|44[04]|55[0-6]|66[01467])|4(?:44[0-8]|55[0-69]|66[0-3]|77[1-5]))|4(?:6(?:22[0-24-7]|33[1-5]|44[13-69]|55[14-689]|660|88[1-4])|7(?:11[1-9]|22[1-9]|33[13-7]|44[13-6]|55[1-689]))|5(?:7(?:227|55[05]|(?:66|77)[14-8])|8(?:11[149]|22[013-79]|33[0-68]|44[013-8]|550|66[1-5]|77\\d)))\\d{4}", , , , "111112345", , , , [7]], [, , "9(?:[1-46-8]\\d|5[89])\\d{6}", , , , "911234567"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "ET", 251, "00", "0", , , "0", , , , [[, "([1-59]\\d)(\\d{3})(\\d{4})", "$1 $2 $3", , "0$1"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        FI: [, [, , "[16]\\d{6,9}|2\\d{4,9}|[35]\\d{5,9}|4\\d{7,10}|7\\d{7,9}|[89]\\d{6,8}", , , , , , , [5, 6, 7, 8, 9, 10, 11]], [, , "1[3-79][1-8]\\d{4,6}|[235689][1-8]\\d{5,7}", , , , "131234567", , , [7, 8, 9]], [, , "4(?:[0-8]\\d{6,8}|9\\d{9})|50\\d{4,8}", , , , "412345678", , , [6, 7, 8, 9, 10, 11]], [, , "800\\d{5,6}", , , , "800123456", , , [8, 9]], [, , "[67]00\\d{5,6}", , , , "600123456", , , [8, 9]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "FI", 358, "00|99(?:[02469]|5(?:11|33|5[59]|88|9[09]))", "0", , , "0", , "00", , [[, "(\\d{3})(\\d{3,7})", "$1 $2", ["(?:[1-3]00|[6-8]0)"], "0$1"], [, "(116\\d{3})", "$1", ["116"], "$1"], [, "(\\d{2})(\\d{3,9})", "$1 $2", ["1(?:0[1-9]|[3-9])|2(?:0[1-9]|9)|30[1-9]|4|50|7(?:[13]|5[03-9])"], "0$1"], [, "(75\\d{3})", "$1", ["75[12]"], "0$1"], [, "(\\d)(\\d{5,9})", "$1 $2", ["[235689][1-8]"], "0$1"], [, "(39\\d)(\\d{3})(\\d{3})", "$1 $2 $3", ["39"], "0$1"]], [[, "(\\d{3})(\\d{3,7})", "$1 $2", ["(?:[1-3]00|[6-8]0)"], "0$1"], [, "(116\\d{3})", "$1", ["116"], "$1"], [, "(\\d{2})(\\d{3,9})", "$1 $2", ["1(?:0[1-9]|[3-9])|2(?:0[1-9]|9)|30[1-9]|4|50|7(?:[13]|5[03-9])"], "0$1"], [, "(\\d)(\\d{5,9})", "$1 $2", ["[235689][1-8]"], "0$1"], [, "(39\\d)(\\d{3})(\\d{3})", "$1 $2 $3", ["39"], "0$1"]], [, , , , , , , , , [-1]], 1, , [, , "100\\d{4,6}|20(?:0\\d{4,6}|2[023]\\d{4,5}|9[89]\\d{1,6})|300\\d{3,7}|60(?:[12]\\d{5,6}|6\\d{7})|7(?:1\\d{7}|3\\d{8}|5[03-9]\\d{5,6})", , , , "1001234", , , [5, 6, 7, 8, 9, 10]], [, , "10(?:0\\d{4,6}|[1-9]\\d{5,7})|2(?:0(?:0\\d{4,6}|[13-8]\\d{5,7}|2(?:[023]\\d{4,5}|[14-9]\\d{4,6})|9(?:[0-7]\\d{4,6}|[89]\\d{1,6}))|9\\d{5,8})|3(?:0(?:0\\d{3,7}|[1-57-9]\\d{5,7}|6(?:\\d{3}|\\d{5,7}))|93\\d{5,7})|60(?:[12]\\d{5,6}|6\\d{7})|7(?:1\\d{7}|3\\d{8}|5[03-9]\\d{5,6})", , , , "10112345", , , [5, 6, 7, 8, 9, 10]], , , [, , , , , , , , , [-1]]],
        FJ: [, [, , "[35-9]\\d{6}|0\\d{10}", , , , , , , [7, 11]], [, , "(?:3[0-5]|6[25-7]|8[58])\\d{5}", , , , "3212345", , , [7]], [, , "(?:5[018]|[79]\\d|8[034679])\\d{5}", , , , "7012345", , , [7]], [, , "0800\\d{7}", , , , "08001234567", , , [11]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "FJ", 679, "0(?:0|52)", , , , , , "00", , [[, "(\\d{3})(\\d{4})", "$1 $2", ["[35-9]"]], [, "(\\d{4})(\\d{3})(\\d{4})", "$1 $2 $3", ["0"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        FK: [, [, , "[2-7]\\d{4}", , , , , , , [5]], [, , "[2-47]\\d{4}", , , , "31234"], [, , "[56]\\d{4}", , , , "51234"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "FK", 500, "00", , , , , , , , , , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        FM: [, [, , "[39]\\d{6}", , , , , , , [7]], [, , "3[2357]0[1-9]\\d{3}|9[2-6]\\d{5}", , , , "3201234"], [, , "3[2357]0[1-9]\\d{3}|9[2-7]\\d{5}", , , , "3501234"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "FM", 691, "00", , , , , , , , [[, "(\\d{3})(\\d{4})", "$1 $2"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        FO: [, [, , "[2-9]\\d{5}", , , , , , , [6]], [, , "(?:20|[3-4]\\d|8[19])\\d{4}", , , , "201234"], [, , "(?:[27][1-9]|5\\d)\\d{4}", , , , "211234"], [, , "80[257-9]\\d{3}", , , , "802123"], [, , "90(?:[1345][15-7]|2[125-7]|99)\\d{2}", , , , "901123"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , "(?:6[0-36]|88)\\d{4}", , , , "601234"], "FO", 298, "00", , , , "(10(?:01|[12]0|88))", , , , [[, "(\\d{6})", "$1", , , "$CC $1"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        FR: [, [, , "[1-9]\\d{8}", , , , , , , [9]], [, , "[1-5]\\d{8}", , , , "123456789"], [, , "(?:6\\d|7[3-9])\\d{7}", , , , "612345678"], [, , "80[0-5]\\d{6}", , , , "801234567"], [, , "89[1-37-9]\\d{6}", , , , "891123456"], [, , "8(?:1[0-29]|2[0156]|84|90)\\d{6}", , , , "810123456"], [, , , , , , , , , [-1]], [, , "9\\d{8}", , , , "912345678"], "FR", 33, "00", "0", , , "0", , , , [[, "([1-79])(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4 $5", ["[1-79]"], "0$1"], [, "(1\\d{2})(\\d{3})", "$1 $2", ["11"], "$1"], [, "(8\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["8"], "0 $1"]], [[, "([1-79])(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4 $5", ["[1-79]"], "0$1"], [, "(8\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["8"], "0 $1"]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , "80[6-9]\\d{6}", , , , "806123456"], , , [, , , , , , , , , [-1]]],
        GA: [, [, , "0?\\d{7}", , , , , , , [7, 8]], [, , "01\\d{6}", , , , "01441234", , , [8]], [, , "0?[2-7]\\d{6}", , , , "06031234"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "GA", 241, "00", , , , , , , , [[, "(\\d)(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[2-7]"], "0$1"], [, "(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["0"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        GB: [, [, , "\\d{7,10}", , , , , , , [7, 9, 10], [4, 5, 6, 8]], [, , "2(?:0[01378]|3[0189]|4[017]|8[0-46-9]|9[0-2])\\d{7}|1(?:1(?:3[0-48]|[46][0-4]|5[0-26-9]|[78][0-49])|21[0-7]|31[0-8]|[4-69]1\\d)\\d{6}|1(?:2(?:0[024-9]|2[3-9]|3[3-79]|4[1-689]|[58][02-9]|6[0-47-9]|7[013-9]|9\\d)|3(?:0\\d|[25][02-9]|3[02-579]|[468][0-46-9]|7[1-35-79]|9[2-578])|4(?:0[03-9]|[28][02-57-9]|[37]\\d|4[02-69]|5[0-8]|[69][0-79])|5(?:0[1-35-9]|2[024-9]|3[015689]|4[02-9]|5[03-9]|6\\d|7[0-35-9]|8[0-468]|9[0-57-9])|6(?:0[034689]|2[0-35689]|[38][013-9]|4[1-467]|5[0-69]|6[13-9]|7[0-8]|9[0124578])|7(?:0[0246-9]|2\\d|3[0236-8]|4[03-9]|5[0-46-9]|6[013-9]|7[0-35-9]|8[024-9]|9[02-9])|8(?:0[35-9]|2[1-57-9]|3[02-578]|4[0-578]|5[124-9]|6[2-69]|7\\d|8[02-9]|9[02569])|9(?:0[02-589]|2[02-689]|3[1-57-9]|4[2-9]|5[0-579]|6[2-47-9]|7[0-24578]|8\\d|9[2-57]))\\d{6}|1(?:2(?:0(?:46[1-4]|87[2-9])|545[1-79]|76(?:2\\d|3[1-8]|6[1-6])|9(?:7(?:2[0-4]|3[2-5])|8(?:2[2-8]|7[0-47-9]|8[345])))|3(?:638[2-5]|647[23]|8(?:47[04-9]|64[0157-9]))|4(?:044[1-7]|20(?:2[23]|8\\d)|6(?:0(?:30|5[2-57]|6[1-8]|7[2-8])|140)|8(?:052|87[123]))|5(?:24(?:3[2-79]|6\\d)|276\\d|6(?:26[06-9]|686))|6(?:06(?:4\\d|7[4-79])|295[567]|35[34]\\d|47(?:24|61)|59(?:5[08]|6[67]|74)|955[0-4])|7(?:26(?:6[13-9]|7[0-7])|442\\d|50(?:2[0-3]|[3-68]2|76))|8(?:27[56]\\d|37(?:5[2-5]|8[239])|84(?:3[2-58]))|9(?:0(?:0(?:6[1-8]|85)|52\\d)|3583|4(?:66[1-8]|9(?:2[01]|81))|63(?:23|3[1-4])|9561))\\d{3}|176888[2-46-8]\\d{2}|16977[23]\\d{3}", , , , "1212345678", , , [9, 10], [4, 5, 6, 7, 8]], [, , "7(?:[1-3]\\d{3}|4(?:[0-46-9]\\d{2}|5(?:[0-689]\\d|7[0-57-9]))|5(?:0[0-8]|[13-9]\\d|2[0-35-9])\\d|7(?:0(?:0[01]|[1-9]\\d)|[1-7]\\d{2}|8[02-9]\\d|9[0-689]\\d)|8(?:[014-9]\\d|[23][0-8])\\d|9(?:[024-9]\\d{2}|1(?:[02-9]\\d|1[028])|3[0-689]\\d))\\d{5}", , , , "7400123456", , , [10]], [, , "80(?:0(?:1111|\\d{6,7})|8\\d{7})|500\\d{6}", , , , "8001234567"], [, , "(?:87[123]|9(?:[01]\\d|8[2349]))\\d{7}", , , , "9012345678", , , [10]], [, , "8(?:4(?:5464\\d|[2-5]\\d{7})|70\\d{7})", , , , "8431234567", , , [7, 10]], [, , "70\\d{8}", , , , "7012345678", , , [10]], [, , "56\\d{8}", , , , "5612345678", , , [10]], "GB", 44, "00", "0", " x", , "0", , , , [[, "(7\\d{3})(\\d{6})", "$1 $2", ["7(?:[1-57-9]|62)", "7(?:[1-57-9]|624)"], "0$1"], [, "(\\d{2})(\\d{4})(\\d{4})", "$1 $2 $3", ["2|5[56]|7[06]"], "0$1"], [, "(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["1(?:1|\\d1)|3|9[018]"], "0$1"], [, "(\\d{5})(\\d{4,5})", "$1 $2", ["1(?:38|5[23]|69|76|94)", "1(?:387|5(?:24|39)|697|768|946)", "1(?:3873|5(?:242|39[456])|697[347]|768[347]|9467)"], "0$1"], [, "(1\\d{3})(\\d{5,6})", "$1 $2", ["1"], "0$1"], [, "(800)(\\d{4})", "$1 $2", ["800", "8001", "80011", "800111", "8001111"], "0$1"], [, "(845)(46)(4\\d)", "$1 $2 $3", ["845", "8454", "84546", "845464"], "0$1"], [, "(8\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["8(?:4[2-5]|7[0-3])"], "0$1"], [, "(80\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["80"], "0$1"], [, "([58]00)(\\d{6})", "$1 $2", ["[58]00"], "0$1"]], , [, , "76(?:0[012]|2[356]|4[0134]|5[49]|6[0-369]|77|81|9[39])\\d{6}", , , , "7640123456", , , [10]], 1, , [, , , , , , , , , [-1]], [, , "(?:3[0347]|55)\\d{8}", , , , "5512345678", , , [10]], , , [, , , , , , , , , [-1]]],
        GD: [, [, , "[4589]\\d{9}", , , , , , , [10], [7]], [, , "473(?:2(?:3[0-2]|69)|3(?:2[89]|86)|4(?:[06]8|3[5-9]|4[0-49]|5[5-79]|68|73|90)|63[68]|7(?:58|84)|800|938)\\d{4}", , , , "4732691234", , , , [7]], [, , "473(?:4(?:0[2-79]|1[04-9]|2[0-5]|58)|5(?:2[01]|3[3-8])|901)\\d{4}", , , , "4734031234", , , , [7]], [, , "8(?:00|33|44|55|66|77|88)[2-9]\\d{6}", , , , "8002123456"], [, , "900[2-9]\\d{6}", , , , "9002123456"], [, , , , , , , , , [-1]], [, , "5(?:00|22|33|44|66|77|88)[2-9]\\d{6}", , , , "5002345678"], [, , , , , , , , , [-1]], "GD", 1, "011", "1", , , "1", , , , , , [, , , , , , , , , [-1]], , "473", [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        GE: [, [, , "[34578]\\d{8}", , , , , , , [9], [6]], [, , "(?:3(?:[256]\\d|4[124-9]|7[0-4])|4(?:1\\d|2[2-7]|3[1-79]|4[2-8]|7[239]|9[1-7]))\\d{6}", , , , "322123456", , , , [6]], [, , "5(?:[14]4|5[0157-9]|68|7[0147-9]|9[0-35-9])\\d{6}", , , , "555123456"], [, , "800\\d{6}", , , , "800123456"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , "706\\d{6}", , , , "706123456"], "GE", 995, "00", "0", , , "0", , , , [[, "(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[348]"], "0$1"], [, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["7"], "0$1"], [, "(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["5"], "$1"]], , [, , , , , , , , , [-1]], , , [, , "706\\d{6}", , , , "706123456"], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        GF: [, [, , "[56]\\d{8}", , , , , , , [9]], [, , "594(?:10|2[012457-9]|3[0-57-9]|4[3-9]|5[7-9]|6[0-3]|9[014])\\d{4}", , , , "594101234"], [, , "694(?:[0249]\\d|1[2-9]|3[0-48])\\d{4}", , , , "694201234"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "GF", 594, "00", "0", , , "0", , , , [[, "(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", , "0$1"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        GG: [, [, , "[135789]\\d{6,9}", , , , , , , [7, 9, 10], [6]], [, , "1481[25-9]\\d{5}", , , , "1481256789", , , [10], [6]], [, , "7(?:781\\d|839\\d|911[17])\\d{5}", , , , "7781123456", , , [10]], [, , "80(?:0(?:1111|\\d{6,7})|8\\d{7})|500\\d{6}", , , , "8001234567"], [, , "(?:87[123]|9(?:[01]\\d|8[0-3]))\\d{7}", , , , "9012345678", , , [10]], [, , "8(?:4(?:5464\\d|[2-5]\\d{7})|70\\d{7})", , , , "8431234567", , , [7, 10]], [, , "70\\d{8}", , , , "7012345678", , , [10]], [, , "56\\d{8}", , , , "5612345678", , , [10]], "GG", 44, "00", "0", , , "0", , , , , , [, , "76(?:0[012]|2[356]|4[0134]|5[49]|6[0-369]|77|81|9[39])\\d{6}", , , , "7640123456", , , [10]], , , [, , , , , , , , , [-1]], [, , "(?:3[0347]|55)\\d{8}", , , , "5512345678", , , [10]], , , [, , , , , , , , , [-1]]],
        GH: [, [, , "[235]\\d{8}|8\\d{7}", , , , , , , [8, 9], [7]], [, , "3(?:0(?:[237]\\d|80)|[167](?:2[0-6]|7\\d|80)|2(?:2[0-5]|7\\d|80)|3(?:2[0-3]|7\\d|80)|4(?:2[013-9]|3[01]|7\\d|80)|5(?:2[0-7]|7\\d|80)|8(?:2[0-2]|7\\d|80)|9(?:[28]0|7\\d))\\d{5}", , , , "302345678", , , [9], [7]], [, , "(?:2[034678]\\d|5(?:[0457]\\d|6[01]))\\d{6}", , , , "231234567", , , [9]], [, , "800\\d{5}", , , , "80012345", , , [8]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "GH", 233, "00", "0", , , "0", , , , [[, "(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[235]"], "0$1"], [, "(\\d{3})(\\d{5})", "$1 $2", ["8"], "0$1"]], , [, , , , , , , , , [-1]], , , [, , "800\\d{5}", , , , "80012345", , , [8]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        GI: [, [, , "[256]\\d{7}", , , , , , , [8]], [, , "2(?:00\\d{2}|1(?:6[24-7]\\d|90[0-2])|2(?:2[2457]\\d|50[0-2]))\\d{3}", , , , "20012345"], [, , "(?:5[46-8]|62)\\d{6}", , , , "57123456"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "GI", 350, "00", , , , , , , , [[, "(\\d{3})(\\d{5})", "$1 $2", ["2"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        GL: [, [, , "[1-689]\\d{5}", , , , , , , [6]], [, , "(?:19|3[1-6]|6[14689]|8[14-79]|9\\d)\\d{4}", , , , "321000"], [, , "[245][2-9]\\d{4}", , , , "221234"], [, , "80\\d{4}", , , , "801234"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , "3[89]\\d{4}", , , , "381234"], "GL", 299, "00", , , , , , , , [[, "(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        GM: [, [, , "[2-9]\\d{6}", , , , , , , [7]], [, , "(?:4(?:[23]\\d{2}|4(?:1[024679]|[6-9]\\d))|5(?:54[0-7]|6(?:[67]\\d)|7(?:1[04]|2[035]|3[58]|48))|8\\d{3})\\d{3}", , , , "5661234"], [, , "[23679]\\d{6}", , , , "3012345"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "GM", 220, "00", , , , , , , , [[, "(\\d{3})(\\d{4})", "$1 $2"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        GN: [, [, , "[367]\\d{7,8}", , , , , , , [8, 9]], [, , "30(?:24|3[12]|4[1-35-7]|5[13]|6[189]|[78]1|9[1478])\\d{4}", , , , "30241234", , , [8]], [, , "6[02356]\\d{7}", , , , "601123456", , , [9]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , "722\\d{6}", , , , "722123456", , , [9]], "GN", 224, "00", , , , , , , , [[, "(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["3"]], [, "(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[67]"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        GP: [, [, , "[56]\\d{8}", , , , , , , [9]], [, , "590(?:0[13468]|1[012]|2[0-68]|3[28]|4[0-8]|5[579]|6[0189]|70|8[0-689]|9\\d)\\d{4}", , , , "590201234"], [, , "690(?:0[05-9]|[1-9]\\d)\\d{4}", , , , "690001234"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "GP", 590, "00", "0", , , "0", , , , [[, "([56]90)(\\d{2})(\\d{4})", "$1 $2-$3", , "0$1"]], , [, , , , , , , , , [-1]], 1, , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        GQ: [, [, , "[23589]\\d{8}", , , , , , , [9]], [, , "3(?:3(?:3\\d[7-9]|[0-24-9]\\d[46])|5\\d{2}[7-9])\\d{4}", , , , "333091234"], [, , "(?:222|55[15])\\d{6}", , , , "222123456"], [, , "80\\d[1-9]\\d{5}", , , , "800123456"], [, , "90\\d[1-9]\\d{5}", , , , "900123456"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "GQ", 240, "00", , , , , , , , [[, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[235]"]], [, "(\\d{3})(\\d{6})", "$1 $2", ["[89]"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        GR: [, [, , "[26-9]\\d{9}", , , , , , , [10]], [, , "2(?:1\\d{2}|2(?:2[1-46-9]|3[1-8]|4[1-7]|5[1-4]|6[1-8]|7[1-5]|[89][1-9])|3(?:1\\d|2[1-57]|[35][1-3]|4[13]|7[1-7]|8[124-6]|9[1-79])|4(?:1\\d|2[1-8]|3[1-4]|4[13-5]|6[1-578]|9[1-5])|5(?:1\\d|[29][1-4]|3[1-5]|4[124]|5[1-6])|6(?:1\\d|3[1245]|4[1-7]|5[13-9]|[269][1-6]|7[14]|8[1-5])|7(?:1\\d|2[1-5]|3[1-6]|4[1-7]|5[1-57]|6[135]|9[125-7])|8(?:1\\d|2[1-5]|[34][1-4]|9[1-57]))\\d{6}", , , , "2123456789"], [, , "69\\d{8}", , , , "6912345678"], [, , "800\\d{7}", , , , "8001234567"], [, , "90[19]\\d{7}", , , , "9091234567"], [, , "8(?:0[16]|12|25)\\d{7}", , , , "8011234567"], [, , "70\\d{8}", , , , "7012345678"], [, , , , , , , , , [-1]], "GR", 30, "00", , , , , , , , [[, "([27]\\d)(\\d{4})(\\d{4})", "$1 $2 $3", ["21|7"]], [, "(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["2[2-9]1|[689]"]], [, "(2\\d{3})(\\d{6})", "$1 $2", ["2[2-9][02-9]"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        GT: [, [, , "[2-7]\\d{7}|1[89]\\d{9}", , , , , , , [8, 11]], [, , "[267][2-9]\\d{6}", , , , "22456789", , , [8]], [, , "[345]\\d{7}", , , , "51234567", , , [8]], [, , "18[01]\\d{8}", , , , "18001112222", , , [11]], [, , "19\\d{9}", , , , "19001112222", , , [11]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "GT", 502, "00", , , , , , , , [[, "(\\d{4})(\\d{4})", "$1 $2", ["[2-7]"]], [, "(\\d{4})(\\d{3})(\\d{4})", "$1 $2 $3", ["1"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        GU: [, [, , "[5689]\\d{9}", , , , , , , [10], [7]], [, , "671(?:3(?:00|3[39]|4[349]|55|6[26])|4(?:56|7[1-9]|8[0236-9])|5(?:55|6[2-5]|88)|6(?:3[2-578]|4[24-9]|5[34]|78|8[5-9])|7(?:[079]7|2[0167]|3[45]|47|8[789])|8(?:[2-5789]8|6[48])|9(?:2[29]|6[79]|7[179]|8[789]|9[78]))\\d{4}", , , , "6713001234", , , , [7]], [, , "671(?:3(?:00|3[39]|4[349]|55|6[26])|4(?:56|7[1-9]|8[0236-9])|5(?:55|6[2-5]|88)|6(?:3[2-578]|4[24-9]|5[34]|78|8[5-9])|7(?:[079]7|2[0167]|3[45]|47|8[789])|8(?:[2-5789]8|6[48])|9(?:2[29]|6[79]|7[179]|8[789]|9[78]))\\d{4}", , , , "6713001234", , , , [7]], [, , "8(?:00|33|44|55|66|77|88)[2-9]\\d{6}", , , , "8002123456"], [, , "900[2-9]\\d{6}", , , , "9002123456"], [, , , , , , , , , [-1]], [, , "5(?:00|22|33|44|66|77|88)[2-9]\\d{6}", , , , "5002345678"], [, , , , , , , , , [-1]], "GU", 1, "011", "1", , , "1", , , 1, , , [, , , , , , , , , [-1]], , "671", [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        GW: [, [, , "(?:4(?:0\\d{5}|4\\d{7})|9\\d{8})", , , , , , , [7, 9]], [, , "443\\d{6}", , , , "443201234", , , [9]], [, , "9(?:5(?:5\\d|6[0-2])|6(?:5[0-2]|6\\d|9[012])|77\\d)\\d{5}", , , , "955012345", , , [9]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , "40\\d{5}", , , , "4012345", , , [7]], "GW", 245, "00", , , , , , , , [[, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["44|9[567]"]], [, "(\\d{3})(\\d{4})", "$1 $2", ["40"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        GY: [, [, , "[2-46-9]\\d{6}", , , , , , , [7]], [, , "(?:2(?:1[6-9]|2[0-35-9]|3[1-4]|5[3-9]|6\\d|7[0-24-79])|3(?:2[25-9]|3\\d)|4(?:4[0-24]|5[56])|77[1-57])\\d{4}", , , , "2201234"], [, , "6\\d{6}", , , , "6091234"], [, , "(?:289|862)\\d{4}", , , , "2891234"], [, , "9008\\d{3}", , , , "9008123"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "GY", 592, "001", , , , , , , , [[, "(\\d{3})(\\d{4})", "$1 $2"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        HK: [, [, , "[235-7]\\d{7}|8\\d{7,8}|9\\d{4,10}", , , , , , , [5, 6, 7, 8, 9, 11]], [, , "(?:2(?:[13-8]\\d|2[013-9]|9[0-24-9])|3(?:[1569][0-24-9]|4[0-246-9]|7[0-24-69]|89)|58[01])\\d{5}", , , , "21234567", , , [8]], [, , "(?:5(?:[1-59][0-46-9]|6[0-4689]|7[0-469])|6(?:0[1-9]|[1459]\\d|[2368][0-57-9]|7[0-79])|9(?:0[1-9]|1[02-9]|[2358][0-8]|[467]\\d))\\d{5}", , , , "51234567", , , [8]], [, , "800\\d{6}", , , , "800123456", , , [9]], [, , "900(?:[0-24-9]\\d{7}|3\\d{1,4})", , , , "90012345678", , , [5, 6, 7, 8, 11]], [, , , , , , , , , [-1]], [, , "8(?:1[1-4679]|2[0-367]|3[02-47])\\d{5}", , , , "81123456", , , [8]], [, , , , , , , , , [-1]], "HK", 852, "00(?:[126-9]|30|5[09])?", , , , , , "00", , [[, "(\\d{4})(\\d{4})", "$1 $2", ["[235-7]|[89](?:0[1-9]|[1-9])"]], [, "(800)(\\d{3})(\\d{3})", "$1 $2 $3", ["800"]], [, "(900)(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3 $4", ["900"]], [, "(900)(\\d{2,5})", "$1 $2", ["900"]]], , [, , "7(?:1[0-369]|[23][0-37-9]|47|5[1578]|6[0235]|7[278]|8[236-9]|9[025-9])\\d{5}", , , , "71234567", , , [8]], , , [, , , , , , , , , [-1]], [, , "30(?:0[1-9]|[15-7]\\d|2[047]|89)\\d{4}", , , , "30161234", , , [8]], , , [, , , , , , , , , [-1]]],
        HN: [, [, , "[237-9]\\d{7}", , , , , , , [8]], [, , "2(?:2(?:0[019]|1[1-36]|[23]\\d|4[04-6]|5[57]|7[01389]|8[0146-9]|9[012])|4(?:07|2[3-59]|3[13-689]|4[0-68]|5[1-35])|5(?:16|4[03-5]|5\\d|6[4-6]|74)|6(?:[056]\\d|17|3[04]|4[0-378]|[78][0-8]|9[01])|7(?:6[46-9]|7[02-9]|8[034])|8(?:79|8[0-35789]|9[1-57-9]))\\d{4}", , , , "22123456"], [, , "[37-9]\\d{7}", , , , "91234567"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "HN", 504, "00", , , , , , , , [[, "(\\d{4})(\\d{4})", "$1-$2"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        HR: [, [, , "[1-7]\\d{5,8}|[89]\\d{6,8}", , , , , , , [6, 7, 8, 9]], [, , "1\\d{7}|(?:2[0-3]|3[1-5]|4[02-47-9]|5[1-3])\\d{6,7}", , , , "12345678", , , [8, 9], [6, 7]], [, , "9(?:01\\d|[1259]\\d{2}|7(?:[0679]\\d|51)|8\\d{1,2})\\d{5}", , , , "921234567", , , [8, 9]], [, , "80[01]\\d{4,6}", , , , "800123456", , , [7, 8, 9]], [, , "6(?:[01]\\d{0,2}|[459]\\d{2})\\d{4}", , , , "611234", , , [6, 7, 8]], [, , , , , , , , , [-1]], [, , "7[45]\\d{6}", , , , "74123456", , , [8]], [, , , , , , , , , [-1]], "HR", 385, "00", "0", , , "0", , , , [[, "(1)(\\d{4})(\\d{3})", "$1 $2 $3", ["1"], "0$1"], [, "([2-5]\\d)(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[2-5]"], "0$1"], [, "(9\\d)(\\d{3})(\\d{3,4})", "$1 $2 $3", ["9"], "0$1"], [, "(6[01])(\\d{2})(\\d{2,3})", "$1 $2 $3", ["6[01]"], "0$1"], [, "([67]\\d)(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[67]"], "0$1"], [, "(80[01])(\\d{2})(\\d{2,3})", "$1 $2 $3", ["8"], "0$1"], [, "(80[01])(\\d{3})(\\d{3})", "$1 $2 $3", ["8"], "0$1"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , "(?:62\\d?|72)\\d{6}", , , , "62123456", , , [8, 9]], , , [, , , , , , , , , [-1]]],
        HT: [, [, , "[2-489]\\d{7}", , , , , , , [8]], [, , "2(?:2\\d|5[1-5]|81|9[149])\\d{5}", , , , "22453300"], [, , "[34]\\d{7}", , , , "34101234"], [, , "8\\d{7}", , , , "80012345"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , "(?:9(?:[67][0-4]|8[0-3589]|9\\d))\\d{5}", , , , "98901234"], "HT", 509, "00", , , , , , , , [[, "(\\d{2})(\\d{2})(\\d{4})", "$1 $2 $3"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        HU: [, [, , "[1-9]\\d{7,8}", , , , , , , [8, 9], [6]], [, , "(?:1\\d|2[2-9]|3[2-7]|4[24-9]|5[2-79]|6[23689]|7[2-9]|8[2-57-9]|9[2-69])\\d{6}", , , , "12345678", , , [8], [6]], [, , "(?:[257]0|3[01])\\d{7}", , , , "201234567", , , [9]], [, , "[48]0\\d{6}", , , , "80123456", , , [8]], [, , "9[01]\\d{6}", , , , "90123456", , , [8]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , "21\\d{7}", , , , "211234567", , , [9]], "HU", 36, "00", "06", , , "06", , , , [[, "(1)(\\d{3})(\\d{4})", "$1 $2 $3", ["1"], "($1)"], [, "(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[2-9]"], "($1)"]], , [, , , , , , , , , [-1]], , , [, , "[48]0\\d{6}", , , , "80123456", , , [8]], [, , "38\\d{7}", , , , "381234567", , , [9]], , , [, , , , , , , , , [-1]]],
        ID: [, [, , "(?:[1-79]\\d{6,10}|8\\d{7,11})", , , , , , , [7, 8, 9, 10, 11, 12], [5, 6]], [, , "2(?:1(?:14\\d{3}|[0-8]\\d{6,7}|500\\d{3}|9\\d{6})|2\\d{6,8}|4\\d{7,8})|(?:2(?:[35][1-4]|6[0-8]|7[1-6]|8\\d|9[1-8])|3(?:1|[25][1-8]|3[1-68]|4[1-3]|6[1-3568]|7[0-469]|8\\d)|4(?:0[1-589]|1[01347-9]|2[0-36-8]|3[0-24-68]|43|5[1-378]|6[1-5]|7[134]|8[1245])|5(?:1[1-35-9]|2[25-8]|3[124-9]|4[1-3589]|5[1-46]|6[1-8])|6(?:19?|[25]\\d|3[1-69]|4[1-6])|7(?:02|[125][1-9]|[36]\\d|4[1-8]|7[0-36-9])|9(?:0[12]|1[013-8]|2[0-479]|5[125-8]|6[23679]|7[159]|8[01346]))\\d{5,8}", , , , "612345678", , , [7, 8, 9, 10, 11], [5, 6]], [, , "(?:2(?:1(?:3[145]|4[01]|5[1-469]|60|8[0359]|9\\d)|2(?:88|9[1256])|3[1-4]9|4(?:36|91)|5(?:1[349]|[2-4]9)|6[0-7]9|7(?:[1-36]9|4[39])|8[1-5]9|9[1-48]9)|3(?:19[1-3]|2[12]9|3[13]9|4(?:1[69]|39)|5[14]9|6(?:1[69]|2[89])|709)|4[13]19|5(?:1(?:19|8[39])|4[129]9|6[12]9)|6(?:19[12]|2(?:[23]9|77))|7(?:1[13]9|2[15]9|419|5(?:1[89]|29)|6[15]9|7[178]9))\\d{5,6}|8[1-35-9]\\d{7,10}", , , , "812345678", , , [9, 10, 11, 12]], [, , "177\\d{6,8}|800\\d{5,7}", , , , "8001234567", , , [8, 9, 10, 11]], [, , "809\\d{7}", , , , "8091234567", , , [10]], [, , "804\\d{7}", , , , "8041234567", , , [10]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "ID", 62, "0(?:0[1789]|10(?:00|1[67]))", "0", , , "0", , , , [[, "(\\d{2})(\\d{5,8})", "$1 $2", ["2[124]|[36]1"], "(0$1)"], [, "(\\d{3})(\\d{5,8})", "$1 $2", ["[4579]|2[035-9]|[36][02-9]"], "(0$1)"], [, "(8\\d{2})(\\d{3,4})(\\d{3})", "$1-$2-$3", ["8[1-35-9]"], "0$1"], [, "(8\\d{2})(\\d{4})(\\d{4,5})", "$1-$2-$3", ["8[1-35-9]"], "0$1"], [, "(1)(500)(\\d{3})", "$1 $2 $3", ["15"], "$1"], [, "(177)(\\d{6,8})", "$1 $2", ["17"], "0$1"], [, "(800)(\\d{5,7})", "$1 $2", ["800"], "0$1"], [, "(804)(\\d{3})(\\d{4})", "$1 $2 $3", ["804"], "0$1"], [, "(80\\d)(\\d)(\\d{3})(\\d{3})", "$1 $2 $3 $4", ["80[79]"], "0$1"]], , [, , , , , , , , , [-1]], , , [, , "8071\\d{6}", , , , "8071123456", , , [10]], [, , "1500\\d{3}|8071\\d{6}", , , , "8071123456", , , [7, 10]], , , [, , , , , , , , , [-1]]],
        IE: [, [, , "[124-9]\\d{6,9}", , , , , , , [7, 8, 9, 10], [5, 6]], [, , "1\\d{7,8}|2(?:1\\d{6,7}|3\\d{7}|[24-9]\\d{5})|4(?:0[24]\\d{5}|[1-469]\\d{7}|5\\d{6}|7\\d{5}|8[0-46-9]\\d{7})|5(?:0[45]\\d{5}|1\\d{6}|[23679]\\d{7}|8\\d{5})|6(?:1\\d{6}|[237-9]\\d{5}|[4-6]\\d{7})|7[14]\\d{7}|9(?:1\\d{6}|[04]\\d{7}|[35-9]\\d{5})", , , , "2212345", , , , [5, 6]], [, , "8(?:22\\d{6}|[35-9]\\d{7})", , , , "850123456", , , [9]], [, , "1800\\d{6}", , , , "1800123456", , , [10]], [, , "15(?:1[2-8]|[2-8]0|9[089])\\d{6}", , , , "1520123456", , , [10]], [, , "18[59]0\\d{6}", , , , "1850123456", , , [10]], [, , "700\\d{6}", , , , "700123456", , , [9]], [, , "76\\d{7}", , , , "761234567", , , [9]], "IE", 353, "00", "0", , , "0", , , , [[, "(1)(\\d{3,4})(\\d{4})", "$1 $2 $3", ["1"], "(0$1)"], [, "(\\d{2})(\\d{5})", "$1 $2", ["2[24-9]|47|58|6[237-9]|9[35-9]"], "(0$1)"], [, "(\\d{3})(\\d{5})", "$1 $2", ["40[24]|50[45]"], "(0$1)"], [, "(48)(\\d{4})(\\d{4})", "$1 $2 $3", ["48"], "(0$1)"], [, "(818)(\\d{3})(\\d{3})", "$1 $2 $3", ["81"], "(0$1)"], [, "(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[24-69]|7[14]"], "(0$1)"], [, "(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["76|8[35-9]"], "0$1"], [, "(8\\d)(\\d)(\\d{3})(\\d{4})", "$1 $2 $3 $4", ["8[35-9]5"], "0$1"], [, "(700)(\\d{3})(\\d{3})", "$1 $2 $3", ["70"], "0$1"], [, "(\\d{4})(\\d{3})(\\d{3})", "$1 $2 $3", ["1(?:8[059]|5)", "1(?:8[059]0|5)"], "$1"]], , [, , , , , , , , , [-1]], , , [, , "18[59]0\\d{6}", , , , "1850123456", , , [10]], [, , "818\\d{6}", , , , "818123456", , , [9]], , , [, , "8[35-9]5\\d{7}", , , , "8551234567", , , [10]]],
        IL: [, [, , "1\\d{6,11}|[2-589]\\d{3}(?:\\d{3,6})?|6\\d{3}|7\\d{6,9}", , , , , , , [4, 7, 8, 9, 10, 11, 12]], [, , "(?:153\\d{1,2}|[2-489])\\d{7}", , , , "21234567", , , [8, 11, 12], [7]], [, , "5(?:[0-47-9]\\d{2}|5(?:01|2[23]|3[2-4]|4[45]|5[5689]|6[6-8]|7[0178]|8[6-9]|9[2-9])|6[2-9]\\d)\\d{5}", , , , "501234567", , , [9]], [, , "1(?:80[019]\\d{3}|255)\\d{3}", , , , "1800123456", , , [7, 10]], [, , "1(?:212|(?:9(?:0[01]|19)|200)\\d{2})\\d{4}", , , , "1919123456", , , [8, 9, 10]], [, , "1700\\d{6}", , , , "1700123456", , , [10]], [, , , , , , , , , [-1]], [, , "7(?:18\\d|2[23]\\d|3[237]\\d|47\\d|6[58]\\d|7\\d{2}|8(?:2\\d|33|55|77|81)|9[2579]\\d)\\d{5}", , , , "771234567", , , [9]], "IL", 972, "0(?:0|1[2-9])", "0", , , "0", , , , [[, "([2-489])(\\d{3})(\\d{4})", "$1-$2-$3", ["[2-489]"], "0$1"], [, "([57]\\d)(\\d{3})(\\d{4})", "$1-$2-$3", ["[57]"], "0$1"], [, "(153)(\\d{1,2})(\\d{3})(\\d{4})", "$1 $2 $3 $4", ["153"], "$1"], [, "(1)([7-9]\\d{2})(\\d{3})(\\d{3})", "$1-$2-$3-$4", ["1[7-9]"], "$1"], [, "(1255)(\\d{3})", "$1-$2", ["125"], "$1"], [, "(1200)(\\d{3})(\\d{3})", "$1-$2-$3", ["120"], "$1"], [, "(1212)(\\d{2})(\\d{2})", "$1-$2-$3", ["121"], "$1"], [, "(1599)(\\d{6})", "$1-$2", ["1599"], "$1"], [, "(151)(\\d{1,2})(\\d{3})(\\d{4})", "$1-$2 $3-$4", ["151"], "$1"], [, "(\\d{4})", "*$1", ["[2-689]"], "$1"]], , [, , , , , , , , , [-1]], , , [, , "1700\\d{6}|[2-689]\\d{3}", , , , "1700123456", , , [4, 10]], [, , "[2-689]\\d{3}|1599\\d{6}", , , , "1599123456", , , [4, 10]], , , [, , "151\\d{8,9}", , , , "15112340000", , , [11, 12]]],
        IM: [, [, , "[135789]\\d{6,9}", , , , , , , [10], [6]], [, , "1624[5-8]\\d{5}", , , , "1624756789", , , , [6]], [, , "7(?:4576|[59]24\\d|624[2-4])\\d{5}", , , , "7924123456"], [, , "808162\\d{4}", , , , "8081624567"], [, , "(?:872299|90[0167]624)\\d{4}", , , , "9016247890"], [, , "8(?:4(?:40[49]06|5624\\d)|70624\\d)\\d{3}", , , , "8456247890"], [, , "70\\d{8}", , , , "7012345678"], [, , "56\\d{8}", , , , "5612345678"], "IM", 44, "00", "0", , , "0", , , , , , [, , "7624[01689]\\d{5}", , , , "7624012345"], , , [, , , , , , , , , [-1]], [, , "3(?:08162\\d|3\\d{5}|4(?:40[49]06|5624\\d)|7(?:0624\\d|2299\\d))\\d{3}|55\\d{8}", , , , "5512345678"], , , [, , , , , , , , , [-1]]],
        IN: [, [, , "008\\d{9}|1\\d{7,12}|[2-9]\\d{9,10}", , , , , , , [8, 9, 10, 11, 12, 13], [6, 7]], [, , "(?:11|2[02]|33|4[04]|79)[2-7]\\d{7}|3880\\d{6}|80[2-467]\\d{7}|(?:1(?:2[0-249]|3[0-25]|4[145]|[59][14]|6[014]|7[1257]|8[01346])|2(?:1[257]|3[013]|4[01]|5[0137]|6[0158]|78|8[1568]|9[14])|3(?:26|4[1-3]|5[34]|6[01489]|7[02-46]|8[159])|4(?:1[36]|2[1-47]|3[15]|5[12]|6[0-26-9]|7[0-24-9]|8[013-57]|9[014-7])|5(?:1[025]|[36][25]|22|4[28]|5[12]|[78]1|9[15])|6(?:12|[2345]1|57|6[13]|7[14]|80)|7(?:12|2[14]|3[134]|4[47]|5[15]|[67]1|88)|8(?:16|2[014]|3[126]|6[136]|7[078]|8[34]|91))[2-7]\\d{6}|(?:(?:1(?:2[35-8]|3[346-9]|4[236-9]|[59][0235-9]|6[235-9]|7[34689]|8[257-9])|2(?:1[134689]|3[24-8]|4[2-8]|5[25689]|6[2-4679]|7[13-79]|8[2-479]|9[235-9])|3(?:01|1[79]|2[1-5]|4[25-8]|5[125689]|6[235-7]|7[157-9]|8[2-467])|4(?:1[14578]|2[5689]|3[2-467]|5[4-7]|6[35]|73|8[2689]|9[2389])|5(?:[16][146-9]|2[14-8]|3[1346]|4[14-69]|5[46]|7[2-4]|8[2-8]|9[246])|6(?:1[1358]|2[2457]|3[2-4]|4[235-7]|[57][2-689]|6[24-578]|8[1-6])|8(?:1[1357-9]|2[235-8]|3[03-57-9]|4[0-24-9]|5\\d|6[2457-9]|7[1-6]|8[1256]|9[2-4]))\\d|7(?:(?:1[013-9]|2[0235-9]|3[2679]|4[1-35689]|5[2-46-9]|[67][02-9]|9\\d)\\d|8(?:2[0-6]|[013-8]\\d)))[2-7]\\d{5}", , , , "1123456789", , , [10], [6, 7, 8]], [, , "(?:600[1-3]\\d|7(?:0\\d{3}|19[0-5]\\d|2(?:[0235679]\\d{2}|[14][017-9]\\d|8(?:[0-59]\\d|[678][089]))|3(?:[05-8]\\d{2}|1(?:[089]\\d|11|7[5-8])|2(?:[0-49][089]|[5-8]\\d)|3[017-9]\\d|4(?:[07-9]\\d|11)|9(?:[016-9]\\d|[2-5][089]))|4(?:0\\d{2}|1(?:[015-9]\\d|[23][089]|4[089])|2(?:0[089]|[1-7][089]|[89]\\d)|3(?:[0-8][089]|9\\d)|4(?:[089]\\d|11|7[02-8])|[56]\\d[089]|7(?:[089]\\d|11|7[02-8])|8(?:[0-24-7][089]|[389]\\d)|9(?:[0-6][089]|7[089]|[89]\\d))|5(?:[0346-8]\\d{2}|1(?:[07-9]\\d|11)|2(?:[04-9]\\d|[123][089])|5[017-9]\\d|9(?:[0-6][089]|[7-9]\\d))|6(?:0(?:[0-47]\\d|[5689][089])|(?:1[0-257-9]|[6-9]\\d)\\d|2(?:[0-4]\\d|[5-9][089])|3(?:[02-8][089]|[19]\\d)|4\\d[089]|5(?:[0-367][089]|[4589]\\d))|7(?:0(?:0[02-9]|[13-6][089]|[289]\\d|7[89])|[1-9]\\d{2})|8(?:[0-79]\\d{2}|8(?:[089]\\d|11|7[02-9]))|9(?:[089]\\d{2}|313|7(?:[02-8]\\d|9[07-9])))|8(?:0(?:[01589]\\d{2}|6[67]\\d|7(?:[02-8]\\d|9[05-9]))|1(?:[02-57-9]\\d{2}|1(?:[0-35-9]\\d|4[0-46-9])|6(?:[089]\\d|7[02-8]))|2(?:0(?:[089]\\d|7[02])|[14](?:[089]\\d|7[02-8])|[235-9]\\d{2})|3(?:[0357-9]\\d{2}|1(?:[089]\\d|7[02-6])|2(?:[09]\\d|77|8[0-689])|4(?:0[1-7]|[1-9]\\d)|6(?:[089]\\d|7[02-7]))|[45]\\d{3}|6(?:[02457-9]\\d{2}|1(?:[089]\\d|7[02-8])|3(?:[089]\\d|7[02-8])|6(?:[08]\\d|7[02-8]|9\\d))|7(?:0[07-9]\\d|[1-69]\\d{2}|[78](?:[089]\\d|7[02-8]))|8(?:[0-25-9]\\d{2}|3(?:[089]\\d|7[02-8])|4(?:[0489]\\d|7[02-68]))|9(?:[02-9]\\d{2}|1(?:[0289]\\d|7[2-6])))|9\\d{4})\\d{5}", , , , "8123456789", , , [10]], [, , "00800\\d{7}|1(?:600\\d{6}|80(?:0\\d{4,9}|3\\d{9}))", , , , "1800123456"], [, , "186[12]\\d{9}", , , , "1861123456789", , , [13]], [, , "1860\\d{7}", , , , "18603451234", , , [11]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "IN", 91, "00", "0", , , "0", , , , [[, "(\\d{8})", "$1", ["561", "5616", "56161"], "$1", , 1], [, "(\\d{5})(\\d{5})", "$1 $2", ["600|7(?:[02-8]|19|9[037-9])|8(?:0[015-9]|[1-9])|9", "600|7(?:[078]|19[0-5]|2(?:[02356-9]|[14][017-9]|9[389])|3(?:[025-9]|1[017-9]|[34][017-9])|4(?:[0-35689]|[47][017-9])|5(?:[02346-9]|1[017-9]|5[017-9])|6(?:[02-9]|1[0-257-9])|9(?:[089]|31|7[02-9]))|8(?:0(?:[01589]|6[67]|7[02-9])|1(?:[0-57-9]|6[07-9])|2(?:0[07-9]|[14][07-9]|[235-9])|3(?:[03-57-9]|[126][07-9])|[45]|6(?:[02457-9]|[136][07-9])|7(?:[078][07-9]|[1-69])|8(?:[0-25-9]|3[07-9]|4[047-9])|9(?:[02-9]|1[027-9]))|9", "600|7(?:0|19[0-5]|2(?:[0235679]|[14][017-9]|8(?:[0-569]|[78][089])|9[389])|3(?:[05-8]|1(?:[0189]|7[5-9])|2(?:[5-8]|[0-49][089])|3[017-9]|4(?:[07-9]|11)|9(?:[01689]|[2345][089]|40|7[0189]))|4(?:[056]|1(?:[0135-9]|[23][089]|2[089]|4[089])|2(?:0[089]|[1-7][089]|[89])|3(?:[0-8][089]|9)|4(?:[089]|11|7[02-8])|7(?:[089]|11|7[02-8])|8(?:[0-24-7][089]|[389])|9(?:[0-7][089]|[89]))|5(?:[0346-9]|1[017-9]|2(?:[03-9]|[12][089])|5[017-9])|6(?:[0346-9]|1[0-257-9]|2(?:[0-4]\\d|[5-9][089])|5(?:[0-367][089]|[4589]))|7(?:0(?:[02-9]|1[089])|[1-9])|8(?:[0-79]|8(?:0[0189]|11|8[013-9]|9))|9(?:[089]|313|7(?:[02-8]|9[07-9])))|8(?:0(?:[01589]|6[67]|7(?:[02-8]|9[05-9]))|1(?:[02-57-9]|1(?:[0-35-9]|4[0-46-9])|6(?:[089]|7[02-8]))|2(?:0(?:[089]|7[02])|[14](?:[089]|7[02-8])|[235-9])|3(?:[0357-9]|1(?:[089]|7[02-6])|2(?:[09]|77|8[0-689])|4(?:0[1-7]|[1-9])|6(?:[089]|7[02-7]))|[45]|6(?:[02457-9]|1(?:[089]|7[02-8])|3(?:[089]|7[02-8])|6(?:[08]|7[02-8]|9\\d))|7(?:0[07-9]|[1-69]|7(?:[089]|7[02-8])|8(?:[089]|7[02-8]))|8(?:[0-25-9]|3(?:[089]|7[02-8])|4(?:[0489]|7[02-68]))|9(?:[02-9]|1(?:[0289]|7[2-6])))|9"], "0$1", , 1], [, "(\\d{2})(\\d{4})(\\d{4})", "$1 $2 $3", ["11|2[02]|33|4[04]|79[1-9]|80[2-46]"], "0$1", , 1], [, "(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["1(?:2[0-249]|3[0-25]|4[145]|[59][14]|7[1257]|[68][1-9])|2(?:1[257]|3[013]|4[01]|5[0137]|6[0158]|78|8[1568]|9[14])|3(?:26|4[1-3]|5[34]|6[01489]|7[02-46]|8[159])|4(?:1[36]|2[1-47]|3[15]|5[12]|6[0-26-9]|7[0-24-9]|8[013-57]|9[014-7])|5(?:1[025]|[36][25]|22|4[28]|5[12]|[78]1|9[15])|6(?:12|[2-4]1|5[17]|6[13]|7[14]|80)|7(?:12|2[14]|3[134]|4[47]|5[15]|[67]1|88)|8(?:16|2[014]|3[126]|6[136]|7[078]|8[34]|91)"], "0$1", , 1], [, "(\\d{4})(\\d{3})(\\d{3})", "$1 $2 $3", ["1(?:[23579]|[468][1-9])|[2-8]"], "0$1", , 1], [, "(\\d{2})(\\d{3})(\\d{4})(\\d{3})", "$1 $2 $3 $4", ["008"], "0$1", , 1], [, "(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["140"], "$1", , 1], [, "(\\d{4})(\\d{2})(\\d{4})", "$1 $2 $3", ["160", "1600"], "$1", , 1], [, "(\\d{4})(\\d{4,5})", "$1 $2", ["180", "1800"], "$1", , 1], [, "(\\d{4})(\\d{2,4})(\\d{4})", "$1 $2 $3", ["180", "1800"], "$1", , 1], [, "(\\d{4})(\\d{3,4})(\\d{4})", "$1 $2 $3", ["186", "1860"], "$1", , 1], [, "(\\d{4})(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3 $4", ["18[06]"], "$1", , 1]], , [, , , , , , , , , [-1]], , , [, , "00800\\d{7}|1(?:600\\d{6}|8(?:0(?:0\\d{4,9}|3\\d{9})|6(?:0\\d{7}|[12]\\d{9})))", , , , "1800123456"], [, , "140\\d{7}", , , , "1409305260", , , [10]], , , [, , , , , , , , , [-1]]],
        IO: [, [, , "3\\d{6}", , , , , , , [7]], [, , "37\\d{5}", , , , "3709100"], [, , "38\\d{5}", , , , "3801234"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "IO", 246, "00", , , , , , , , [[, "(\\d{3})(\\d{4})", "$1 $2"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        IQ: [, [, , "[1-7]\\d{7,9}", , , , , , , [8, 9, 10], [6, 7]], [, , "1\\d{7}|(?:2[13-5]|3[02367]|4[023]|5[03]|6[026])\\d{6,7}", , , , "12345678", , , [8, 9], [6, 7]], [, , "7[3-9]\\d{8}", , , , "7912345678", , , [10]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "IQ", 964, "00", "0", , , "0", , , , [[, "(1)(\\d{3})(\\d{4})", "$1 $2 $3", ["1"], "0$1"], [, "([2-6]\\d)(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[2-6]"], "0$1"], [, "(7\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["7"], "0$1"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        IR: [, [, , "[1-8]\\d{5,9}|9(?:[0-4]\\d{8}|9\\d{8})", , , , , , , [6, 7, 10], [4, 5, 8]], [, , "(?:(?:1[137]|2[13-68]|3[1458]|4[145]|5[1468]|6[16]|7[1467]|8[13467])(?:\\d{8}|(?:[16]|[289]\\d?)\\d{3}))|94(?:000|11[1-7]|2\\d{2}|440)\\d{5}", , , , "2123456789", , , , [4, 5, 8]], [, , "9(?:0[1-3]\\d{2}|[1-3]\\d{3}|9(?:0\\d{2}|44\\d|810|9(?:00|11|9[89])))\\d{5}", , , , "9123456789", , , [10]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , "(?:[2-6]0\\d|993)\\d{7}", , , , "9932123456", , , [10]], "IR", 98, "00", "0", , , "0", , , , [[, "(\\d{2})(\\d{4})(\\d{4})", "$1 $2 $3", ["[1-8]"], "0$1"], [, "(\\d{2})(\\d{4,5})", "$1 $2", ["[1-8]"], "0$1"], [, "(\\d{4,5})", "$1", ["96"], "0$1"], [, "(\\d{3})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["9"], "0$1"]], , [, , "943\\d{7}", , , , "9432123456", , , [10]], , , [, , "(?:9411[1-7]|94440)\\d{5}", , , , "9411110000", , , [10]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        IS: [, [, , "[4-9]\\d{6}|38\\d{7}", , , , , , , [7, 9]], [, , "(?:4(?:1[0-24-69]|2[0-7]|[37][0-8]|4[0-245]|5[0-68]|6\\d|8[0-36-8])|5(?:05|[156]\\d|2[02578]|3[0-79]|4[03-7]|7[0-2578]|8[0-35-9]|9[013-689])|87[23])\\d{4}", , , , "4101234", , , [7]], [, , "38[589]\\d{6}|(?:6(?:1[1-8]|2[0-6]|3[027-9]|4[014679]|5[0159]|[67][0-69]|9\\d)|7(?:5[057]|[6-8]\\d)|8(?:2[0-59]|3[0-4]|[469]\\d|5[1-9]|88))\\d{4}", , , , "6111234"], [, , "800\\d{4}", , , , "8001234", , , [7]], [, , "90\\d{5}", , , , "9011234", , , [7]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , "49\\d{5}", , , , "4921234", , , [7]], "IS", 354, "1(?:0(?:01|10|20)|100)|00", , , , , , "00", , [[, "(\\d{3})(\\d{4})", "$1 $2", ["[4-9]"]], [, "(3\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["3"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , "809\\d{4}", , , , "8091234", , , [7]], , , [, , "(?:6(?:2[78]|49|8\\d)|8(?:7[0189]|80)|95[48])\\d{4}", , , , "6271234", , , [7]]],
        IT: [, [, , "[01589]\\d{5,10}|3(?:[12457-9]\\d{8}|[36]\\d{7,9})", , , , , , , [6, 7, 8, 9, 10, 11]], [, , "0(?:[26]\\d{4,9}|(?:1(?:[0159]\\d|[27][1-5]|31|4[1-4]|6[1356]|8[2-57])|3(?:[0159]\\d|2[1-4]|3[12]|[48][1-6]|6[2-59]|7[1-7])|4(?:[0159]\\d|[23][1-9]|4[245]|6[1-5]|7[1-4]|81)|5(?:[0159]\\d|2[1-5]|3[2-6]|4[1-79]|6[4-6]|7[1-578]|8[3-8])|7(?:[0159]\\d|2[12]|3[1-7]|4[2346]|6[13569]|7[13-6]|8[1-59])|8(?:[0159]\\d|2[34578]|3[1-356]|[6-8][1-5])|9(?:[0159]\\d|[238][1-5]|4[12]|6[1-8]|7[1-6]))\\d{2,7})", , , , "0212345678"], [, , "3(?:[12457-9]\\d{8}|6\\d{7,8}|3\\d{7,9})", , , , "3123456789", , , [9, 10, 11]], [, , "80(?:0\\d{6}|3\\d{3})", , , , "800123456", , , [6, 9]], [, , "0878\\d{5}|1(?:44|6[346])\\d{6}|89(?:2\\d{3}|4(?:[0-4]\\d{2}|[5-9]\\d{4})|5(?:[0-4]\\d{2}|[5-9]\\d{6})|9\\d{6})", , , , "899123456", , , [6, 8, 9, 10]], [, , "84(?:[08]\\d{6}|[17]\\d{3})", , , , "848123456", , , [6, 9]], [, , "1(?:78\\d|99)\\d{6}", , , , "1781234567", , , [9, 10]], [, , "55\\d{8}", , , , "5512345678", , , [10]], "IT", 39, "00", , , , , , , , [[, "(\\d{2})(\\d{3,4})(\\d{4})", "$1 $2 $3", ["0[26]|55"]], [, "(0[26])(\\d{4})(\\d{5})", "$1 $2 $3", ["0[26]"]], [, "(0[26])(\\d{4,6})", "$1 $2", ["0[26]"]], [, "(0\\d{2})(\\d{3,4})(\\d{4})", "$1 $2 $3", ["0[13-57-9][0159]"]], [, "(\\d{3})(\\d{3,6})", "$1 $2", ["0[13-57-9][0159]|8(?:03|4[17]|9[245])", "0[13-57-9][0159]|8(?:03|4[17]|9(?:2|[45][0-4]))"]], [, "(0\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["0[13-57-9][2-46-8]"]], [, "(0\\d{3})(\\d{2,6})", "$1 $2", ["0[13-57-9][2-46-8]"]], [, "(\\d{3})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[13]|8(?:00|4[08]|9[59])", "[13]|8(?:00|4[08]|9(?:5[5-9]|9))"]], [, "(\\d{4})(\\d{4})", "$1 $2", ["894", "894[5-9]"]], [, "(\\d{3})(\\d{4})(\\d{4})", "$1 $2 $3", ["3"]]], , [, , , , , , , , , [-1]], 1, , [, , "848\\d{6}", , , , "848123456", , , [9]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        JE: [, [, , "[135789]\\d{6,9}", , , , , , , [10], [6]], [, , "1534[0-24-8]\\d{5}", , , , "1534456789", , , , [6]], [, , "7(?:509\\d|7(?:00[378]|97[7-9])|829\\d|937\\d)\\d{5}", , , , "7797712345"], [, , "80(?:07(?:35|81)|8901)\\d{4}", , , , "8007354567"], [, , "(?:871206|90(?:066[59]|1810|71(?:07|55)))\\d{4}", , , , "9018105678"], [, , "8(?:4(?:4(?:4(?:05|42|69)|703)|5(?:041|800))|70002)\\d{4}", , , , "8447034567"], [, , "701511\\d{4}", , , , "7015115678"], [, , "56\\d{8}", , , , "5612345678"], "JE", 44, "00", "0", , , "0", , , , , , [, , "76(?:0[012]|2[356]|4[0134]|5[49]|6[0-369]|77|81|9[39])\\d{6}", , , , "7640123456"], , , [, , , , , , , , , [-1]], [, , "3(?:0(?:07(?:35|81)|8901)|3\\d{4}|4(?:4(?:4(?:05|42|69)|703)|5(?:041|800))|7(?:0002|1206))\\d{4}|55\\d{8}", , , , "5512345678"], , , [, , , , , , , , , [-1]]],
        JM: [, [, , "[589]\\d{9}", , , , , , , [10], [7]], [, , "876(?:5(?:0[12]|1[0-468]|2[35]|63)|6(?:0[1-3579]|1[027-9]|[23]\\d|40|5[06]|6[2-589]|7[05]|8[04]|9[4-9])|7(?:0[2-689]|[1-6]\\d|8[056]|9[45])|9(?:0[1-8]|1[02378]|[2-8]\\d|9[2-468]))\\d{4}", , , , "8765123456", , , , [7]], [, , "876(?:2[14-9]\\d|[348]\\d{2}|5(?:0[3-9]|[2-57-9]\\d|6[0-24-9])|7(?:0[07]|7\\d|8[1-47-9]|9[0-36-9])|9(?:[01]9|9[0579]))\\d{4}", , , , "8762101234", , , , [7]], [, , "8(?:00|33|44|55|66|77|88)[2-9]\\d{6}", , , , "8002123456"], [, , "900[2-9]\\d{6}", , , , "9002123456"], [, , , , , , , , , [-1]], [, , "5(?:00|22|33|44|66|77|88)[2-9]\\d{6}", , , , "5002345678"], [, , , , , , , , , [-1]], "JM", 1, "011", "1", , , "1", , , , , , [, , , , , , , , , [-1]], , "876", [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        JO: [, [, , "[235-9]\\d{7,8}", , , , , , , [8, 9]], [, , "(?:2(?:6(?:2[0-35-9]|3[0-57-8]|4[24-7]|5[0-24-8]|[6-8][023]|9[0-3])|7(?:0[1-79]|10|2[014-7]|3[0-689]|4[019]|5[0-3578]))|32(?:0[1-69]|1[1-35-7]|2[024-7]|3\\d|4[0-3]|[57][023]|6[03])|53(?:0[0-3]|[13][023]|2[0-59]|49|5[0-35-9]|6[15]|7[45]|8[1-6]|9[0-36-9])|6(?:2[50]0|3(?:00|33)|4(?:0[0125]|1[2-7]|2[0569]|[38][07-9]|4[025689]|6[0-589]|7\\d|9[0-2])|5(?:[01][056]|2[034]|3[0-57-9]|4[17-8]|5[0-69]|6[0-35-9]|7[1-379]|8[0-68]|9[02-39]))|87(?:[02]0|7[08]|90))\\d{4}", , , , "62001234", , , [8]], [, , "7(?:55|7[025-9]|8[0-25-9]|9[0-25-9])\\d{6}", , , , "790123456", , , [9]], [, , "80\\d{6}", , , , "80012345", , , [8]], [, , "900\\d{5}", , , , "90012345", , , [8]], [, , "85\\d{6}", , , , "85012345", , , [8]], [, , "70\\d{7}", , , , "700123456", , , [9]], [, , , , , , , , , [-1]], "JO", 962, "00", "0", , , "0", , , , [[, "(\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["[2356]|87"], "(0$1)"], [, "(7)(\\d{4})(\\d{4})", "$1 $2 $3", ["7[457-9]"], "0$1"], [, "(\\d{2})(\\d{7})", "$1 $2", ["70"], "0$1"], [, "(\\d{3})(\\d{5,6})", "$1 $2", ["8[0158]|9"], "0$1"]], , [, , "74(?:66|77)\\d{5}", , , , "746612345", , , [9]], , , [, , , , , , , , , [-1]], [, , "8(?:10|8\\d)\\d{5}", , , , "88101234", , , [8]], , , [, , , , , , , , , [-1]]],
        JP: [, [, , "[1-9]\\d{8,9}|00(?:[36]\\d{7,14}|7\\d{5,7}|8\\d{7})", , , , , , , [8, 9, 10, 11, 12, 13, 14, 15, 16, 17]], [, , "(?:1(?:1[235-8]|2[3-6]|3[3-9]|4[2-6]|[58][2-8]|6[2-7]|7[2-9]|9[1-9])|2[2-9]\\d|[36][1-9]\\d|4(?:6[02-8]|[2-578]\\d|9[2-59])|5(?:6[1-9]|7[2-8]|[2-589]\\d)|7(?:3[4-9]|4[02-9]|[25-9]\\d)|8(?:3[2-9]|4[5-9]|5[1-9]|8[03-9]|[2679]\\d)|9(?:[679][1-9]|[2-58]\\d))\\d{6}", , , , "312345678", , , [9]], [, , "[7-9]0[1-9]\\d{7}", , , , "9012345678", , , [10]], [, , "120\\d{6}|800\\d{7}|00(?:37\\d{6,13}|66\\d{6,13}|777(?:[01]\\d{2}|5\\d{3}|8\\d{4})|882[1245]\\d{4})", , , , "120123456"], [, , "990\\d{6}", , , , "990123456", , , [9]], [, , , , , , , , , [-1]], [, , "60\\d{7}", , , , "601234567", , , [9]], [, , "50[1-9]\\d{7}", , , , "5012345678", , , [10]], "JP", 81, "010", "0", , , "0", , , , [[, "(\\d{3})(\\d{3})(\\d{3})", "$1-$2-$3", ["(?:12|57|99)0"], "0$1"], [, "(\\d{3})(\\d{3})(\\d{4})", "$1-$2-$3", ["800"], "0$1"], [, "(\\d{4})(\\d{4})", "$1-$2", ["0077"], "$1"], [, "(\\d{4})(\\d{2})(\\d{3,4})", "$1-$2-$3", ["0077"], "$1"], [, "(\\d{4})(\\d{2})(\\d{4})", "$1-$2-$3", ["0088"], "$1"], [, "(\\d{4})(\\d{3})(\\d{3,4})", "$1-$2-$3", ["00(?:37|66)"], "$1"], [, "(\\d{4})(\\d{4})(\\d{4,5})", "$1-$2-$3", ["00(?:37|66)"], "$1"], [, "(\\d{4})(\\d{5})(\\d{5,6})", "$1-$2-$3", ["00(?:37|66)"], "$1"], [, "(\\d{4})(\\d{6})(\\d{6,7})", "$1-$2-$3", ["00(?:37|66)"], "$1"], [, "(\\d{2})(\\d{4})(\\d{4})", "$1-$2-$3", ["[2579]0|80[1-9]"], "0$1"], [, "(\\d{4})(\\d)(\\d{4})", "$1-$2-$3", ["1(?:26|3[79]|4[56]|5[4-68]|6[3-5])|5(?:76|97)|499|746|8(?:3[89]|63|47|51)|9(?:49|80|9[16])", "1(?:267|3(?:7[247]|9[278])|4(?:5[67]|66)|5(?:47|58|64|8[67])|6(?:3[245]|48|5[4-68]))|5(?:76|97)9|499[2468]|7468|8(?:3(?:8[78]|96)|636|477|51[24])|9(?:496|802|9(?:1[23]|69))", "1(?:267|3(?:7[247]|9[278])|4(?:5[67]|66)|5(?:47|58|64|8[67])|6(?:3[245]|48|5[4-68]))|5(?:769|979[2-69])|499[2468]|7468|8(?:3(?:8[78]|96[2457-9])|636[2-57-9]|477|51[24])|9(?:496|802|9(?:1[23]|69))"], "0$1"], [, "(\\d{3})(\\d{2})(\\d{4})", "$1-$2-$3", ["1(?:2[3-6]|3[3-9]|4[2-6]|5[2-8]|[68][2-7]|7[2-689]|9[1-578])|2(?:2[03-689]|3[3-58]|4[0-468]|5[04-8]|6[013-8]|7[06-9]|8[02-57-9]|9[13])|4(?:2[28]|3[689]|6[035-7]|7[05689]|80|9[3-5])|5(?:3[1-36-9]|4[4578]|5[013-8]|6[1-9]|7[2-8]|8[14-7]|9[4-9])|7(?:2[15]|3[5-9]|4[02-9]|6[135-8]|7[0-4689]|9[014-9])|8(?:2[49]|3[3-8]|4[5-8]|5[2-9]|6[35-9]|7[579]|8[03-579]|9[2-8])|9(?:[23]0|4[02-46-9]|5[024-79]|6[4-9]|7[2-47-9]|8[02-7]|9[3-7])", "1(?:2[3-6]|3[3-9]|4[2-6]|5(?:[236-8]|[45][2-69])|[68][2-7]|7[2-689]|9[1-578])|2(?:2(?:[04-689]|3[23])|3[3-58]|4[0-468]|5(?:5[78]|7[2-4]|[0468][2-9])|6(?:[0135-8]|4[2-5])|7(?:[0679]|8[2-7])|8(?:[024578]|3[25-9]|9[6-9])|9(?:11|3[2-4]))|4(?:2(?:2[2-9]|8[237-9])|3[689]|6[035-7]|7(?:[059][2-8]|[68])|80|9[3-5])|5(?:3[1-36-9]|4[4578]|5[013-8]|6[1-9]|7[2-8]|8[14-7]|9(?:[89][2-8]|[4-7]))|7(?:2[15]|3[5-9]|4[02-9]|6[135-8]|7[0-4689]|9(?:[017-9]|4[6-8]|5[2-478]|6[2-589]))|8(?:2(?:4[4-8]|9[2-8])|3(?:7[2-6]|[3-6][2-9]|8[2-5])|4[5-8]|5[2-9]|6(?:[37]|5[4-7]|6[2-9]|8[2-8]|9[236-9])|7[579]|8[03-579]|9[2-8])|9(?:[23]0|4[02-46-9]|5[024-79]|6[4-9]|7[2-47-9]|8[02-7]|9(?:3[34]|[4-7]))", "1(?:2[3-6]|3[3-9]|4[2-6]|5(?:[236-8]|[45][2-69])|[68][2-7]|7[2-689]|9[1-578])|2(?:2(?:[04-689]|3[23])|3[3-58]|4[0-468]|5(?:5[78]|7[2-4]|[0468][2-9])|6(?:[0135-8]|4[2-5])|7(?:[0679]|8[2-7])|8(?:[024578]|3[25-9]|9[6-9])|9(?:11|3[2-4]))|4(?:2(?:2[2-9]|8[237-9])|3[689]|6[035-7]|7(?:[059][2-8]|[68])|80|9[3-5])|5(?:3[1-36-9]|4[4578]|5[013-8]|6[1-9]|7[2-8]|8[14-7]|9(?:[89][2-8]|[4-7]))|7(?:2[15]|3[5-9]|4[02-9]|6[135-8]|7[0-4689]|9(?:[017-9]|4[6-8]|5[2-478]|6[2-589]))|8(?:2(?:4[4-8]|9(?:[3578]|20|4[04-9]|6[56]))|3(?:7(?:[2-5]|6[0-59])|[3-6][2-9]|8[2-5])|4[5-8]|5[2-9]|6(?:[37]|5(?:[467]|5[014-9])|6(?:[2-8]|9[02-69])|8[2-8]|9(?:[236-8]|9[23]))|7[579]|8[03-579]|9[2-8])|9(?:[23]0|4[02-46-9]|5[024-79]|6[4-9]|7[2-47-9]|8[02-7]|9(?:3(?:3[02-9]|4[0-24689])|4[2-69]|[5-7]))", "1(?:2[3-6]|3[3-9]|4[2-6]|5(?:[236-8]|[45][2-69])|[68][2-7]|7[2-689]|9[1-578])|2(?:2(?:[04-689]|3[23])|3[3-58]|4[0-468]|5(?:5[78]|7[2-4]|[0468][2-9])|6(?:[0135-8]|4[2-5])|7(?:[0679]|8[2-7])|8(?:[024578]|3[25-9]|9[6-9])|9(?:11|3[2-4]))|4(?:2(?:2[2-9]|8[237-9])|3[689]|6[035-7]|7(?:[059][2-8]|[68])|80|9[3-5])|5(?:3[1-36-9]|4[4578]|5[013-8]|6[1-9]|7[2-8]|8[14-7]|9(?:[89][2-8]|[4-7]))|7(?:2[15]|3[5-9]|4[02-9]|6[135-8]|7[0-4689]|9(?:[017-9]|4[6-8]|5[2-478]|6[2-589]))|8(?:2(?:4[4-8]|9(?:[3578]|20|4[04-9]|6(?:5[25]|60)))|3(?:7(?:[2-5]|6[0-59])|[3-6][2-9]|8[2-5])|4[5-8]|5[2-9]|6(?:[37]|5(?:[467]|5[014-9])|6(?:[2-8]|9[02-69])|8[2-8]|9(?:[236-8]|9[23]))|7[579]|8[03-579]|9[2-8])|9(?:[23]0|4[02-46-9]|5[024-79]|6[4-9]|7[2-47-9]|8[02-7]|9(?:3(?:3[02-9]|4[0-24689])|4[2-69]|[5-7]))"], "0$1"], [, "(\\d{2})(\\d{3})(\\d{4})", "$1-$2-$3", ["1|2(?:2[37]|5[5-9]|64|78|8[39]|91)|4(?:2[2689]|64|7[347])|5(?:[2-589]|39)|60|8(?:[46-9]|3[279]|2[124589])|9(?:[235-8]|93)", "1|2(?:2[37]|5(?:[57]|[68]0|9[19])|64|78|8[39]|917)|4(?:2(?:[68]|20|9[178])|64|7[347])|5(?:[2-589]|39[67])|60|8(?:[46-9]|3[279]|2[124589])|9(?:[235-8]|93[34])", "1|2(?:2[37]|5(?:[57]|[68]0|9(?:17|99))|64|78|8[39]|917)|4(?:2(?:[68]|20|9[178])|64|7[347])|5(?:[2-589]|39[67])|60|8(?:[46-9]|3[279]|2[124589])|9(?:[235-8]|93(?:31|4))"], "0$1"], [, "(\\d{3})(\\d{2})(\\d{4})", "$1-$2-$3", ["2(?:9[14-79]|74|[34]7|[56]9)|82|993"], "0$1"], [, "(\\d)(\\d{4})(\\d{4})", "$1-$2-$3", ["3|4(?:2[09]|7[01])|6[1-9]"], "0$1"], [, "(\\d{2})(\\d{3})(\\d{4})", "$1-$2-$3", ["[2479][1-9]"], "0$1"]], [[, "(\\d{3})(\\d{3})(\\d{3})", "$1-$2-$3", ["(?:12|57|99)0"], "0$1"], [, "(\\d{3})(\\d{3})(\\d{4})", "$1-$2-$3", ["800"], "0$1"], [, "(\\d{2})(\\d{4})(\\d{4})", "$1-$2-$3", ["[2579]0|80[1-9]"], "0$1"], [, "(\\d{4})(\\d)(\\d{4})", "$1-$2-$3", ["1(?:26|3[79]|4[56]|5[4-68]|6[3-5])|5(?:76|97)|499|746|8(?:3[89]|63|47|51)|9(?:49|80|9[16])", "1(?:267|3(?:7[247]|9[278])|4(?:5[67]|66)|5(?:47|58|64|8[67])|6(?:3[245]|48|5[4-68]))|5(?:76|97)9|499[2468]|7468|8(?:3(?:8[78]|96)|636|477|51[24])|9(?:496|802|9(?:1[23]|69))", "1(?:267|3(?:7[247]|9[278])|4(?:5[67]|66)|5(?:47|58|64|8[67])|6(?:3[245]|48|5[4-68]))|5(?:769|979[2-69])|499[2468]|7468|8(?:3(?:8[78]|96[2457-9])|636[2-57-9]|477|51[24])|9(?:496|802|9(?:1[23]|69))"], "0$1"], [, "(\\d{3})(\\d{2})(\\d{4})", "$1-$2-$3", ["1(?:2[3-6]|3[3-9]|4[2-6]|5[2-8]|[68][2-7]|7[2-689]|9[1-578])|2(?:2[03-689]|3[3-58]|4[0-468]|5[04-8]|6[013-8]|7[06-9]|8[02-57-9]|9[13])|4(?:2[28]|3[689]|6[035-7]|7[05689]|80|9[3-5])|5(?:3[1-36-9]|4[4578]|5[013-8]|6[1-9]|7[2-8]|8[14-7]|9[4-9])|7(?:2[15]|3[5-9]|4[02-9]|6[135-8]|7[0-4689]|9[014-9])|8(?:2[49]|3[3-8]|4[5-8]|5[2-9]|6[35-9]|7[579]|8[03-579]|9[2-8])|9(?:[23]0|4[02-46-9]|5[024-79]|6[4-9]|7[2-47-9]|8[02-7]|9[3-7])", "1(?:2[3-6]|3[3-9]|4[2-6]|5(?:[236-8]|[45][2-69])|[68][2-7]|7[2-689]|9[1-578])|2(?:2(?:[04-689]|3[23])|3[3-58]|4[0-468]|5(?:5[78]|7[2-4]|[0468][2-9])|6(?:[0135-8]|4[2-5])|7(?:[0679]|8[2-7])|8(?:[024578]|3[25-9]|9[6-9])|9(?:11|3[2-4]))|4(?:2(?:2[2-9]|8[237-9])|3[689]|6[035-7]|7(?:[059][2-8]|[68])|80|9[3-5])|5(?:3[1-36-9]|4[4578]|5[013-8]|6[1-9]|7[2-8]|8[14-7]|9(?:[89][2-8]|[4-7]))|7(?:2[15]|3[5-9]|4[02-9]|6[135-8]|7[0-4689]|9(?:[017-9]|4[6-8]|5[2-478]|6[2-589]))|8(?:2(?:4[4-8]|9[2-8])|3(?:7[2-6]|[3-6][2-9]|8[2-5])|4[5-8]|5[2-9]|6(?:[37]|5[4-7]|6[2-9]|8[2-8]|9[236-9])|7[579]|8[03-579]|9[2-8])|9(?:[23]0|4[02-46-9]|5[024-79]|6[4-9]|7[2-47-9]|8[02-7]|9(?:3[34]|[4-7]))", "1(?:2[3-6]|3[3-9]|4[2-6]|5(?:[236-8]|[45][2-69])|[68][2-7]|7[2-689]|9[1-578])|2(?:2(?:[04-689]|3[23])|3[3-58]|4[0-468]|5(?:5[78]|7[2-4]|[0468][2-9])|6(?:[0135-8]|4[2-5])|7(?:[0679]|8[2-7])|8(?:[024578]|3[25-9]|9[6-9])|9(?:11|3[2-4]))|4(?:2(?:2[2-9]|8[237-9])|3[689]|6[035-7]|7(?:[059][2-8]|[68])|80|9[3-5])|5(?:3[1-36-9]|4[4578]|5[013-8]|6[1-9]|7[2-8]|8[14-7]|9(?:[89][2-8]|[4-7]))|7(?:2[15]|3[5-9]|4[02-9]|6[135-8]|7[0-4689]|9(?:[017-9]|4[6-8]|5[2-478]|6[2-589]))|8(?:2(?:4[4-8]|9(?:[3578]|20|4[04-9]|6[56]))|3(?:7(?:[2-5]|6[0-59])|[3-6][2-9]|8[2-5])|4[5-8]|5[2-9]|6(?:[37]|5(?:[467]|5[014-9])|6(?:[2-8]|9[02-69])|8[2-8]|9(?:[236-8]|9[23]))|7[579]|8[03-579]|9[2-8])|9(?:[23]0|4[02-46-9]|5[024-79]|6[4-9]|7[2-47-9]|8[02-7]|9(?:3(?:3[02-9]|4[0-24689])|4[2-69]|[5-7]))", "1(?:2[3-6]|3[3-9]|4[2-6]|5(?:[236-8]|[45][2-69])|[68][2-7]|7[2-689]|9[1-578])|2(?:2(?:[04-689]|3[23])|3[3-58]|4[0-468]|5(?:5[78]|7[2-4]|[0468][2-9])|6(?:[0135-8]|4[2-5])|7(?:[0679]|8[2-7])|8(?:[024578]|3[25-9]|9[6-9])|9(?:11|3[2-4]))|4(?:2(?:2[2-9]|8[237-9])|3[689]|6[035-7]|7(?:[059][2-8]|[68])|80|9[3-5])|5(?:3[1-36-9]|4[4578]|5[013-8]|6[1-9]|7[2-8]|8[14-7]|9(?:[89][2-8]|[4-7]))|7(?:2[15]|3[5-9]|4[02-9]|6[135-8]|7[0-4689]|9(?:[017-9]|4[6-8]|5[2-478]|6[2-589]))|8(?:2(?:4[4-8]|9(?:[3578]|20|4[04-9]|6(?:5[25]|60)))|3(?:7(?:[2-5]|6[0-59])|[3-6][2-9]|8[2-5])|4[5-8]|5[2-9]|6(?:[37]|5(?:[467]|5[014-9])|6(?:[2-8]|9[02-69])|8[2-8]|9(?:[236-8]|9[23]))|7[579]|8[03-579]|9[2-8])|9(?:[23]0|4[02-46-9]|5[024-79]|6[4-9]|7[2-47-9]|8[02-7]|9(?:3(?:3[02-9]|4[0-24689])|4[2-69]|[5-7]))"], "0$1"], [, "(\\d{2})(\\d{3})(\\d{4})", "$1-$2-$3", ["1|2(?:2[37]|5[5-9]|64|78|8[39]|91)|4(?:2[2689]|64|7[347])|5(?:[2-589]|39)|60|8(?:[46-9]|3[279]|2[124589])|9(?:[235-8]|93)", "1|2(?:2[37]|5(?:[57]|[68]0|9[19])|64|78|8[39]|917)|4(?:2(?:[68]|20|9[178])|64|7[347])|5(?:[2-589]|39[67])|60|8(?:[46-9]|3[279]|2[124589])|9(?:[235-8]|93[34])", "1|2(?:2[37]|5(?:[57]|[68]0|9(?:17|99))|64|78|8[39]|917)|4(?:2(?:[68]|20|9[178])|64|7[347])|5(?:[2-589]|39[67])|60|8(?:[46-9]|3[279]|2[124589])|9(?:[235-8]|93(?:31|4))"], "0$1"], [, "(\\d{3})(\\d{2})(\\d{4})", "$1-$2-$3", ["2(?:9[14-79]|74|[34]7|[56]9)|82|993"], "0$1"], [, "(\\d)(\\d{4})(\\d{4})", "$1-$2-$3", ["3|4(?:2[09]|7[01])|6[1-9]"], "0$1"], [, "(\\d{2})(\\d{3})(\\d{4})", "$1-$2-$3", ["[2479][1-9]"], "0$1"]], [, , "20\\d{8}", , , , "2012345678", , , [10]], , , [, , "00(?:37\\d{6,13}|66\\d{6,13}|777(?:[01]\\d{2}|5\\d{3}|8\\d{4})|882[1245]\\d{4})", , , , "00777012"], [, , "570\\d{6}", , , , "570123456", , , [9]], , , [, , , , , , , , , [-1]]],
        KE: [, [, , "20\\d{6,7}|[4-9]\\d{6,9}", , , , , , , [7, 8, 9, 10]], [, , "20\\d{6,7}|4(?:0\\d{6,7}|[136]\\d{7}|[245]\\d{5,7})|5(?:[08]\\d{7}|[1-79]\\d{5,7})|6(?:[01457-9]\\d{5,7}|2\\d{7}|6\\d{6,7})", , , , "202012345", , , [7, 8, 9]], [, , "7(?:[0-3679]\\d|4[0-46-9]|5[0-6]|8[0-25-9])\\d{6}", , , , "712123456", , , [9]], [, , "800[24-8]\\d{5,6}", , , , "800223456", , , [9, 10]], [, , "900[02-9]\\d{5}", , , , "900223456", , , [9]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "KE", 254, "000", "0", , , "005|0", , , , [[, "(\\d{2})(\\d{5,7})", "$1 $2", ["[24-6]"], "0$1"], [, "(\\d{3})(\\d{6})", "$1 $2", ["7"], "0$1"], [, "(\\d{3})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[89]"], "0$1"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        KG: [, [, , "[235-8]\\d{8,9}", , , , , , , [9, 10], [5, 6]], [, , "(?:3(?:1(?:[256]\\d|3[1-9]|47)|2(?:22|3[0-479]|6[0-7])|4(?:22|5[6-9]|6\\d)|5(?:22|3[4-7]|59|6\\d)|6(?:22|5[35-7]|6\\d)|7(?:22|3[468]|4[1-9]|59|[67]\\d)|9(?:22|4[1-8]|6\\d))|6(?:09|12|2[2-4])\\d)\\d{5}", , , , "312123456", , , [9], [5, 6]], [, , "(?:20[0-35]|5[0-24-7]\\d|7[07]\\d)\\d{6}", , , , "700123456", , , [9]], [, , "800\\d{6,7}", , , , "800123456"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "KG", 996, "00", "0", , , "0", , , , [[, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[25-7]|31[25]"], "0$1"], [, "(\\d{4})(\\d{5})", "$1 $2", ["3(?:1[36]|[2-9])"], "0$1"], [, "(\\d{3})(\\d{3})(\\d)(\\d{3})", "$1 $2 $3 $4", ["8"], "0$1"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        KH: [, [, , "[1-9]\\d{7,9}", , , , , , , [8, 9, 10], [6, 7]], [, , "(?:2[3-6]|3[2-6]|4[2-4]|[5-7][2-5])(?:[237-9]|4[56]|5\\d|6\\d?)\\d{5}|23(?:4[234]|8\\d{2})\\d{4}", , , , "23756789", , , [8, 9], [6, 7]], [, , "(?:1(?:[013-79]\\d|[28]\\d{1,2})|2[3-6]48|3(?:[18]\\d{2}|[2-6]48)|4[2-4]48|5[2-5]48|6(?:[016-9]\\d|[2-5]48)|7(?:[07-9]\\d|[16]\\d{2}|[2-5]48)|8(?:[013-79]\\d|8\\d{2})|9(?:6\\d{2}|7\\d{1,2}|[0-589]\\d))\\d{5}", , , , "91234567", , , [8, 9]], [, , "1800(?:1\\d|2[019])\\d{4}", , , , "1800123456", , , [10]], [, , "1900(?:1\\d|2[09])\\d{4}", , , , "1900123456", , , [10]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "KH", 855, "00[14-9]", "0", , , "0", , , , [[, "(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["1\\d[1-9]|[2-9]"], "0$1"], [, "(1[89]00)(\\d{3})(\\d{3})", "$1 $2 $3", ["1[89]0"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        KI: [, [, , "[2458]\\d{4}|3\\d{4,7}|7\\d{7}", , , , , , , [5, 8]], [, , "(?:[24]\\d|3[1-9]|50|8[0-5])\\d{3}|7(?:27|31|5[0-4])\\d{5}", , , , "31234"], [, , "7[23]0\\d{5}", , , , "72012345", , , [8]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , "30(?:0[01]\\d{2}|12(?:11|20))\\d{2}", , , , "30010000", , , [8]], "KI", 686, "00", , , , "0", , , , , , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        KM: [, [, , "[3478]\\d{6}", , , , , , , [7]], [, , "7[4-7]\\d{5}", , , , "7712345"], [, , "[34]\\d{6}", , , , "3212345"], [, , , , , , , , , [-1]], [, , "(?:39[01]|8\\d{2})\\d{4}", , , , "8001234"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "KM", 269, "00", , , , , , , , [[, "(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        KN: [, [, , "[589]\\d{9}", , , , , , , [10], [7]], [, , "869(?:2(?:29|36)|302|4(?:6[015-9]|70))\\d{4}", , , , "8692361234", , , , [7]], [, , "869(?:5(?:5[6-8]|6[5-7])|66\\d|76[02-7])\\d{4}", , , , "8697652917", , , , [7]], [, , "8(?:00|33|44|55|66|77|88)[2-9]\\d{6}", , , , "8002123456"], [, , "900[2-9]\\d{6}", , , , "9002123456"], [, , , , , , , , , [-1]], [, , "5(?:00|22|33|44|66|77|88)[2-9]\\d{6}", , , , "5002345678"], [, , , , , , , , , [-1]], "KN", 1, "011", "1", , , "1", , , , , , [, , , , , , , , , [-1]], , "869", [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        KP: [, [, , "1\\d{9}|[28]\\d{7}", , , , , , , [8, 10], [6, 7]], [, , "2\\d{7}|85\\d{6}", , , , "21234567", , , [8], [6, 7]], [, , "19[123]\\d{7}", , , , "1921234567", , , [10]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "KP", 850, "00|99", "0", , , "0", , , , [[, "(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["1"], "0$1"], [, "(\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["2"], "0$1"], [, "(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["8"], "0$1"]], , [, , , , , , , , , [-1]], , , [, , "2(?:[0-24-9]\\d{2}|3(?:[0-79]\\d|8[02-9]))\\d{4}", , , , "23821234", , , [8]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        KR: [, [, , "007\\d{9,11}|[1-7]\\d{3,9}|8\\d{8}", , , , , , , [4, 5, 6, 8, 9, 10, 12, 13, 14], [3, 7]], [, , "(?:2|3[1-3]|[46][1-4]|5[1-5])(?:1\\d{2,3}|[1-9]\\d{6,7})", , , , "22123456", , , [4, 5, 6, 8, 9, 10], [3, 7]], [, , "1[0-26-9]\\d{7,8}", , , , "1000000000", , , [9, 10]], [, , "(?:00798\\d{0,2}|80)\\d{7}", , , , "801234567", , , [9, 12, 13, 14]], [, , "60[2-9]\\d{6}", , , , "602345678", , , [9]], [, , , , , , , , , [-1]], [, , "50\\d{8}", , , , "5012345678", , , [10]], [, , "70\\d{8}", , , , "7012345678", , , [10]], "KR", 82, "00(?:[124-68]|3\\d{2}|7(?:[0-8]\\d|9[0-79]))", "0", , , "0(8[1-46-8]|85\\d{2})?", , , , [[, "(\\d{5})(\\d{3,4})(\\d{4})", "$1 $2 $3", ["00798"], "$1", "0$CC-$1"], [, "(\\d{5})(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3 $4", ["00798"], "$1", "0$CC-$1"], [, "(\\d{2})(\\d{4})(\\d{4})", "$1-$2-$3", ["1(?:0|1[19]|[69]9|5[458])|[57]0", "1(?:0|1[19]|[69]9|5(?:44|59|8))|[57]0"], "0$1", "0$CC-$1"], [, "(\\d{2})(\\d{3,4})(\\d{4})", "$1-$2-$3", ["1(?:[01]|5[1-4]|6[2-8]|[7-9])|[68]0|[3-6][1-9][1-9]", "1(?:[01]|5(?:[1-3]|4[56])|6[2-8]|[7-9])|[68]0|[3-6][1-9][1-9]"], "0$1", "0$CC-$1"], [, "(\\d{3})(\\d)(\\d{4})", "$1-$2-$3", ["131", "1312"], "0$1", "0$CC-$1"], [, "(\\d{3})(\\d{2})(\\d{4})", "$1-$2-$3", ["131", "131[13-9]"], "0$1", "0$CC-$1"], [, "(\\d{3})(\\d{3})(\\d{4})", "$1-$2-$3", ["13[2-9]"], "0$1", "0$CC-$1"], [, "(\\d{2})(\\d{2})(\\d{3})(\\d{4})", "$1-$2-$3-$4", ["30"], "0$1", "0$CC-$1"], [, "(\\d)(\\d{3,4})(\\d{4})", "$1-$2-$3", ["2[1-9]"], "0$1", "0$CC-$1"], [, "(\\d)(\\d{3,4})", "$1-$2", ["21[0-46-9]"], "0$1", "0$CC-$1"], [, "(\\d{2})(\\d{3,4})", "$1-$2", ["[3-6][1-9]1", "[3-6][1-9]1(?:[0-46-9])"], "0$1", "0$CC-$1"], [, "(\\d{4})(\\d{4})", "$1-$2", ["1(?:5[246-9]|6[04678]|8[03579])", "1(?:5(?:22|44|66|77|88|99)|6(?:00|44|6[16]|70|88)|8(?:00|33|55|77|99))"], "$1", "0$CC-$1"]], [[, "(\\d{2})(\\d{4})(\\d{4})", "$1-$2-$3", ["1(?:0|1[19]|[69]9|5[458])|[57]0", "1(?:0|1[19]|[69]9|5(?:44|59|8))|[57]0"], "0$1", "0$CC-$1"], [, "(\\d{2})(\\d{3,4})(\\d{4})", "$1-$2-$3", ["1(?:[01]|5[1-4]|6[2-8]|[7-9])|[68]0|[3-6][1-9][1-9]", "1(?:[01]|5(?:[1-3]|4[56])|6[2-8]|[7-9])|[68]0|[3-6][1-9][1-9]"], "0$1", "0$CC-$1"], [, "(\\d{3})(\\d)(\\d{4})", "$1-$2-$3", ["131", "1312"], "0$1", "0$CC-$1"], [, "(\\d{3})(\\d{2})(\\d{4})", "$1-$2-$3", ["131", "131[13-9]"], "0$1", "0$CC-$1"], [, "(\\d{3})(\\d{3})(\\d{4})", "$1-$2-$3", ["13[2-9]"], "0$1", "0$CC-$1"], [, "(\\d{2})(\\d{2})(\\d{3})(\\d{4})", "$1-$2-$3-$4", ["30"], "0$1", "0$CC-$1"], [, "(\\d)(\\d{3,4})(\\d{4})", "$1-$2-$3", ["2[1-9]"], "0$1", "0$CC-$1"], [, "(\\d)(\\d{3,4})", "$1-$2", ["21[0-46-9]"], "0$1", "0$CC-$1"], [, "(\\d{2})(\\d{3,4})", "$1-$2", ["[3-6][1-9]1", "[3-6][1-9]1(?:[0-46-9])"], "0$1", "0$CC-$1"], [, "(\\d{4})(\\d{4})", "$1-$2", ["1(?:5[246-9]|6[04678]|8[03579])", "1(?:5(?:22|44|66|77|88|99)|6(?:00|44|6[16]|70|88)|8(?:00|33|55|77|99))"], "$1", "0$CC-$1"]], [, , "15\\d{7,8}", , , , "1523456789", , , [9, 10]], , , [, , "00798\\d{7,9}", , , , "007981234567", , , [12, 13, 14]], [, , "1(?:5(?:22|44|66|77|88|99)|6(?:00|44|6[16]|70|88)|8(?:00|33|55|77|99))\\d{4}", , , , "15441234", , , [8]], , , [, , , , , , , , , [-1]]],
        KW: [, [, , "[12569]\\d{6,7}", , , , , , , [7, 8]], [, , "(?:18\\d|2(?:[23]\\d{2}|4(?:[1-35-9]\\d|44)|5(?:0[034]|[2-46]\\d|5[1-3]|7[1-7])))\\d{4}", , , , "22345678"], [, , "(?:5(?:[05]\\d{2}|1[0-7]\\d|2(?:22|5[25])|6[56]\\d)|6(?:0[034679]\\d|222|5[015-9]\\d|6\\d{2}|7(?:0[013-9]|[67]\\d)|9(?:[069]\\d|3[039]))|9(?:0[09]\\d|22\\d|4[01479]\\d|55\\d|6[0679]\\d|7(?:02|[1-9]\\d)|8[057-9]\\d|9\\d{2}))\\d{4}", , , , "50012345", , , [8]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "KW", 965, "00", , , , , , , , [[, "(\\d{4})(\\d{3,4})", "$1 $2", ["[16]|2(?:[0-35-9]|4[0-35-9])|9[024-9]|52[25]"]], [, "(\\d{3})(\\d{5})", "$1 $2", ["244|5(?:[015]|6[56])"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        KY: [, [, , "[3589]\\d{9}", , , , , , , [10], [7]], [, , "345(?:2(?:22|44)|444|6(?:23|38|40)|7(?:4[35-79]|6[6-9]|77)|8(?:00|1[45]|25|[48]8)|9(?:14|4[035-9]))\\d{4}", , , , "3452221234", , , , [7]], [, , "345(?:32[1-9]|5(?:1[67]|2[5-79]|4[6-9]|50|76)|649|9(?:1[67]|2[2-9]|3[689]))\\d{4}", , , , "3453231234", , , , [7]], [, , "8(?:00|33|44|55|66|77|88)[2-9]\\d{6}", , , , "8002345678"], [, , "900[2-9]\\d{6}|345976\\d{4}", , , , "9002345678"], [, , , , , , , , , [-1]], [, , "5(?:00|22|33|44|66|77|88)[2-9]\\d{6}", , , , "5002345678"], [, , , , , , , , , [-1]], "KY", 1, "011", "1", , , "1", , , , , , [, , "345849\\d{4}", , , , "3458491234"], , "345", [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        KZ: [, [, , "(?:33\\d|7\\d{2}|80[089])\\d{7}", , , , , , , [10]], [, , "33622\\d{5}|7(?:1(?:0(?:[23]\\d|4[0-3]|59|63)|1(?:[23]\\d|4[0-79]|59)|2(?:[23]\\d|59)|3(?:2\\d|3[0-79]|4[0-35-9]|59)|4(?:[24]\\d|3[013-9]|5[1-9])|5(?:2\\d|3[1-9]|4[0-7]|59)|6(?:[234]\\d|5[19]|61)|72\\d|8(?:[27]\\d|3[1-46-9]|4[0-5]))|2(?:1(?:[23]\\d|4[46-9]|5[3469])|2(?:2\\d|3[0679]|46|5[12679])|3(?:[234]\\d|5[139])|4(?:2\\d|3[1235-9]|59)|5(?:[23]\\d|4[01246-8]|59|61)|6(?:2\\d|3[1-9]|4[0-4]|59)|7(?:[2379]\\d|40|5[279])|8(?:[23]\\d|4[0-3]|59)|9(?:2\\d|3[124578]|59)))\\d{5}", , , , "7123456789"], [, , "7(?:0[012578]|47|6[02-4]|7[15-8]|85)\\d{7}", , , , "7710009998"], [, , "800\\d{7}", , , , "8001234567"], [, , "809\\d{7}", , , , "8091234567"], [, , , , , , , , , [-1]], [, , "808\\d{7}", , , , "8081234567"], [, , "751\\d{7}", , , , "7511234567"], "KZ", 7, "810", "8", , , "8", , "8~10", , , , [, , , , , , , , , [-1]], , , [, , "751\\d{7}", , , , "7511234567"], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        LA: [, [, , "[2-8]\\d{7,9}", , , , , , , [8, 9, 10], [6]], [, , "(?:2[13]|3(?:0\\d|[14])|[5-7][14]|41|8[1468])\\d{6}", , , , "21212862", , , [8, 9], [6]], [, , "20(?:2[2389]|5[24-689]|7[6-8]|9[125-9])\\d{6}", , , , "2023123456", , , [10]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "LA", 856, "00", "0", , , "0", , , , [[, "(20)(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3 $4", ["20"], "0$1"], [, "([2-8]\\d)(\\d{3})(\\d{3})", "$1 $2 $3", ["2[13]|3[14]|[4-8]"], "0$1"], [, "(30)(\\d{2})(\\d{2})(\\d{3})", "$1 $2 $3 $4", ["30"], "0$1"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        LB: [, [, , "[13-9]\\d{6,7}", , , , , , , [7, 8]], [, , "(?:[14-6]\\d{2}|7(?:[2-57]\\d|62|8[0-7]|9[04-9])|8[02-9]\\d|9\\d{2})\\d{4}", , , , "1123456", , , [7]], [, , "(?:3\\d|7(?:[01]\\d|6[013-9]|8[89]|9[1-3])|81\\d)\\d{5}", , , , "71123456"], [, , , , , , , , , [-1]], [, , "9[01]\\d{6}", , , , "90123456", , , [8]], [, , "80\\d{6}", , , , "80123456", , , [8]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "LB", 961, "00", "0", , , "0", , , , [[, "(\\d)(\\d{3})(\\d{3})", "$1 $2 $3", ["[13-6]|7(?:[2-57]|62|8[0-7]|9[04-9])|8[02-9]|9"], "0$1"], [, "([7-9]\\d)(\\d{3})(\\d{3})", "$1 $2 $3", ["[89][01]|7(?:[01]|6[013-9]|8[89]|9[1-3])"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        LC: [, [, , "[5789]\\d{9}", , , , , , , [10], [7]], [, , "758(?:4(?:30|5[0-9]|6[2-9]|8[0-2])|57[0-2]|638)\\d{4}", , , , "7584305678", , , , [7]], [, , "758(?:28[4-7]|384|4(?:6[01]|8[4-9])|5(?:1[89]|20|84)|7(?:1[2-9]|2\\d|3[01]))\\d{4}", , , , "7582845678", , , , [7]], [, , "8(?:00|33|44|55|66|77|88)[2-9]\\d{6}", , , , "8002123456"], [, , "900[2-9]\\d{6}", , , , "9002123456"], [, , , , , , , , , [-1]], [, , "5(?:00|22|33|44|66|77|88)[2-9]\\d{6}", , , , "5002345678"], [, , , , , , , , , [-1]], "LC", 1, "011", "1", , , "1", , , , , , [, , , , , , , , , [-1]], , "758", [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        LI: [, [, , "6\\d{8}|[23789]\\d{6}", , , , , , , [7, 9]], [, , "(?:2(?:01|1[27]|3\\d|6[02-578]|96)|3(?:7[0135-7]|8[048]|9[0269]))\\d{4}", , , , "2345678", , , [7]], [, , "6(?:5(?:09|1\\d|20)|6(?:0[0-6]|10|2[06-9]|39))\\d{5}|7(?:[37-9]\\d|42|56)\\d{4}", , , , "660234567"], [, , "80(?:02[28]|9\\d{2})\\d{2}", , , , "8002222", , , [7]], [, , "90(?:02[258]|1(?:23|3[14])|66[136])\\d{2}", , , , "9002222", , , [7]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "LI", 423, "00", "0", , , "0|10(?:01|20|66)", , , , [[, "(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3", ["[23789]"]], [, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["6[56]"]], [, "(69)(7\\d{2})(\\d{4})", "$1 $2 $3", ["697"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , "870(?:28|87)\\d{2}", , , , "8702812", , , [7]], , , [, , "697(?:42|56|[78]\\d)\\d{4}", , , , "697861234", , , [9]]],
        LK: [, [, , "[1-9]\\d{8}", , , , , , , [9], [7]], [, , "1(?:1[2-57]\\d{6}|973\\d{5})|(?:2[13-7]|3[1-8]|4[157]|5[12457]|6[35-7]|[89]1)[2-57]\\d{6}", , , , "112345678", , , , [7]], [, , "7[0125-8]\\d{7}", , , , "712345678"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "LK", 94, "00", "0", , , "0", , , , [[, "(\\d{2})(\\d{1})(\\d{6})", "$1 $2 $3", ["[1-689]"], "0$1"], [, "(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["7"], "0$1"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        LR: [, [, , "2\\d{7,8}|[378]\\d{8}|4\\d{6}|5\\d{6,8}", , , , , , , [7, 8, 9]], [, , "(?:2\\d{3}|33333)\\d{4}", , , , "21234567", , , [8, 9]], [, , "(?:20\\d{2}|330\\d|4[67]|5(?:55)?\\d|77\\d{2}|88\\d{2})\\d{5}", , , , "770123456", , , [7, 9]], [, , , , , , , , , [-1]], [, , "332(?:02|[2-5]\\d)\\d{4}", , , , "332021234", , , [9]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "LR", 231, "00", "0", , , "0", , , , [[, "(2\\d)(\\d{3})(\\d{3})", "$1 $2 $3", ["2"], "0$1"], [, "([4-5])(\\d{3})(\\d{3})", "$1 $2 $3", ["[45]"], "0$1"], [, "(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[23578]"], "0$1"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        LS: [, [, , "[2568]\\d{7}", , , , , , , [8]], [, , "2\\d{7}", , , , "22123456"], [, , "[56]\\d{7}", , , , "50123456"], [, , "800[256]\\d{4}", , , , "80021234"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "LS", 266, "00", , , , , , , , [[, "(\\d{4})(\\d{4})", "$1 $2"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        LT: [, [, , "[3-9]\\d{7}", , , , , , , [8]], [, , "(?:3[1478]|4[124-6]|52)\\d{6}", , , , "31234567"], [, , "6\\d{7}", , , , "61234567"], [, , "800\\d{5}", , , , "80012345"], [, , "9(?:0[0239]|10)\\d{5}", , , , "90012345"], [, , "808\\d{5}", , , , "80812345"], [, , "700\\d{5}", , , , "70012345"], [, , , , , , , , , [-1]], "LT", 370, "00", "8", , , "[08]", , , , [[, "([34]\\d)(\\d{6})", "$1 $2", ["37|4(?:1|5[45]|6[2-4])"], "(8-$1)", , 1], [, "([3-6]\\d{2})(\\d{5})", "$1 $2", ["3[148]|4(?:[24]|6[09])|528|6"], "(8-$1)", , 1], [, "([7-9]\\d{2})(\\d{2})(\\d{3})", "$1 $2 $3", ["[7-9]"], "8 $1", , 1], [, "(5)(2\\d{2})(\\d{4})", "$1 $2 $3", ["52[0-79]"], "(8-$1)", , 1]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , "70[67]\\d{5}", , , , "70712345"], , , [, , , , , , , , , [-1]]],
        LU: [, [, , "[24-9]\\d{3,10}|3(?:[0-46-9]\\d{2,9}|5[013-9]\\d{1,8})", , , , , , , [4, 5, 6, 7, 8, 9, 10, 11]], [, , "(?:2[2-9]\\d{2,9}|(?:[3457]\\d{2}|8(?:0[2-9]|[13-9]\\d)|9(?:0[89]|[2-579]\\d))\\d{1,8})", , , , "27123456"], [, , "6[25-79][18]\\d{6}", , , , "628123456", , , [9]], [, , "800\\d{5}", , , , "80012345", , , [8]], [, , "90[015]\\d{5}", , , , "90012345", , , [8]], [, , "801\\d{5}", , , , "80112345", , , [8]], [, , "70\\d{6}", , , , "70123456", , , [8]], [, , "20(?:1\\d{5}|[2-689]\\d{1,7})", , , , "20201234", , , [4, 5, 6, 7, 8, 9, 10]], "LU", 352, "00", , , , "(15(?:0[06]|1[12]|35|4[04]|55|6[26]|77|88|99)\\d)", , , , [[, "(\\d{2})(\\d{3})", "$1 $2", ["[2-5]|7[1-9]|[89](?:[1-9]|0[2-9])"], , "$CC $1"], [, "(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3", ["[2-5]|7[1-9]|[89](?:[1-9]|0[2-9])"], , "$CC $1"], [, "(\\d{2})(\\d{2})(\\d{3})", "$1 $2 $3", ["20"], , "$CC $1"], [, "(\\d{2})(\\d{2})(\\d{2})(\\d{1,2})", "$1 $2 $3 $4", ["2(?:[0367]|4[3-8])"], , "$CC $1"], [, "(\\d{2})(\\d{2})(\\d{2})(\\d{3})", "$1 $2 $3 $4", ["20"], , "$CC $1"], [, "(\\d{2})(\\d{2})(\\d{2})(\\d{2})(\\d{1,2})", "$1 $2 $3 $4 $5", ["2(?:[0367]|4[3-8])"], , "$CC $1"], [, "(\\d{2})(\\d{2})(\\d{2})(\\d{1,4})", "$1 $2 $3 $4", ["2(?:[12589]|4[12])|[3-5]|7[1-9]|8(?:[1-9]|0[2-9])|9(?:[1-9]|0[2-46-9])"], , "$CC $1"], [, "(\\d{3})(\\d{2})(\\d{3})", "$1 $2 $3", ["70|80[01]|90[015]"], , "$CC $1"], [, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["6"], , "$CC $1"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        LV: [, [, , "[2689]\\d{7}", , , , , , , [8]], [, , "6\\d{7}", , , , "63123456"], [, , "2\\d{7}", , , , "21234567"], [, , "80\\d{6}", , , , "80123456"], [, , "90\\d{6}", , , , "90123456"], [, , "81\\d{6}", , , , "81123456"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "LV", 371, "00", , , , , , , , [[, "([2689]\\d)(\\d{3})(\\d{3})", "$1 $2 $3"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        LY: [, [, , "[25679]\\d{8}", , , , , , , [9], [7]], [, , "(?:2[1345]|5[1347]|6[123479]|71)\\d{7}", , , , "212345678", , , , [7]], [, , "9[1-6]\\d{7}", , , , "912345678"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "LY", 218, "00", "0", , , "0", , , , [[, "([25679]\\d)(\\d{7})", "$1-$2", , "0$1"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        MA: [, [, , "[5-9]\\d{8}", , , , , , , [9]], [, , "5(?:2(?:[015-79]\\d|2[02-9]|3[2-57]|4[2-8]|8[235-7])\\d|3(?:[0-48]\\d|[57][2-9]|6[2-8]|9[3-9])\\d|4[067]\\d{2}|5[03]\\d{2})\\d{4}", , , , "520123456"], [, , "(?:6(?:[0-79]\\d|8[0-247-9])|7(?:[07][07]|6[12]))\\d{6}", , , , "650123456"], [, , "80\\d{7}", , , , "801234567"], [, , "89\\d{7}", , , , "891234567"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , "5924[01]\\d{4}", , , , "592401234"], "MA", 212, "00", "0", , , "0", , , , [[, "([5-7]\\d{2})(\\d{6})", "$1-$2", ["5(?:2[015-7]|3[0-4])|[67]"], "0$1"], [, "([58]\\d{3})(\\d{5})", "$1-$2", ["5(?:2[2-489]|3[5-9]|92)|892", "5(?:2(?:[2-48]|9[0-7])|3(?:[5-79]|8[0-7])|924)|892"], "0$1"], [, "(5\\d{4})(\\d{4})", "$1-$2", ["5(?:29|38)", "5(?:29|38)[89]"], "0$1"], [, "([5]\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["5(?:4[067]|5[03])"], "0$1"], [, "(8[09])(\\d{7})", "$1-$2", ["8(?:0|9[013-9])"], "0$1"]], , [, , , , , , , , , [-1]], 1, , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        MC: [, [, , "[34689]\\d{7,8}", , , , , , , [8, 9]], [, , "870\\d{5}|9[2-47-9]\\d{6}", , , , "99123456", , , [8]], [, , "3\\d{7}|4(?:4\\d|5[1-9])\\d{5}|6\\d{8}", , , , "612345678"], [, , "90\\d{6}", , , , "90123456", , , [8]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "MC", 377, "00", "0", , , "0", , , , [[, "(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[39]"], "$1"], [, "(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["4"], "0$1"], [, "(6)(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4 $5", ["6"], "0$1"], [, "(\\d{3})(\\d{3})(\\d{2})", "$1 $2 $3", ["8"], "$1"]], , [, , , , , , , , , [-1]], , , [, , "870\\d{5}", , , , "87012345", , , [8]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        MD: [, [, , "[235-9]\\d{7}", , , , , , , [8]], [, , "(?:2[1-9]\\d|3[1-79]\\d|5(?:33|5[257]))\\d{5}", , , , "22212345"], [, , "(?:562|6\\d{2}|7(?:[189]\\d|6[07]|7[457-9]))\\d{5}", , , , "62112345"], [, , "800\\d{5}", , , , "80012345"], [, , "90[056]\\d{5}", , , , "90012345"], [, , "808\\d{5}", , , , "80812345"], [, , , , , , , , , [-1]], [, , "3[08]\\d{6}", , , , "30123456"], "MD", 373, "00", "0", , , "0", , , , [[, "(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["22|3"], "0$1"], [, "([25-7]\\d{2})(\\d{2})(\\d{3})", "$1 $2 $3", ["2[13-9]|[5-7]"], "0$1"], [, "([89]\\d{2})(\\d{5})", "$1 $2", ["[89]"], "0$1"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , "803\\d{5}", , , , "80312345"], , , [, , , , , , , , , [-1]]],
        ME: [, [, , "[2-9]\\d{7,8}", , , , , , , [8], [6]], [, , "(?:20[2-8]|3(?:0[2-7]|[12][235-7]|3[24-7])|4(?:0[2-467]|1[267])|5(?:0[2467]|1[267]|2[2367]))\\d{5}", , , , "30234567", , , , [6]], [, , "6(?:00\\d|3[024]\\d|6[0-25]\\d|[7-9]\\d{2})\\d{4}", , , , "67622901"], [, , "80[0-258]\\d{5}", , , , "80080002"], [, , "(?:9(?:4[1568]|5[178]))\\d{5}", , , , "94515151"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , "78[1-49]\\d{5}", , , , "78108780"], "ME", 382, "00", "0", , , "0", , , , [[, "(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["[2-57-9]|6[036-9]"], "0$1"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , "77[1-9]\\d{5}", , , , "77273012"], , , [, , , , , , , , , [-1]]],
        MF: [, [, , "[56]\\d{8}", , , , , , , [9]], [, , "590(?:[02][79]|13|5[0-268]|[78]7)\\d{4}", , , , "590271234"], [, , "690(?:0[05-9]|[1-9]\\d)\\d{4}", , , , "690001234"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "MF", 590, "00", "0", , , "0", , , , , , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        MG: [, [, , "[23]\\d{8}", , , , , , , [9], [7]], [, , "20(?:2\\d{2}|4[47]\\d|5[3467]\\d|6[279]\\d|7(?:2[29]|[35]\\d)|8[268]\\d|9[245]\\d)\\d{4}", , , , "202123456", , , , [7]], [, , "3[2-49]\\d{7}", , , , "321234567"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , "22\\d{7}", , , , "221234567"], "MG", 261, "00", "0", , , "0", , , , [[, "([23]\\d)(\\d{2})(\\d{3})(\\d{2})", "$1 $2 $3 $4", , "0$1"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        MH: [, [, , "[2-6]\\d{6}", , , , , , , [7]], [, , "(?:247|528|625)\\d{4}", , , , "2471234"], [, , "(?:235|329|45[56]|545)\\d{4}", , , , "2351234"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , "635\\d{4}", , , , "6351234"], "MH", 692, "011", "1", , , "1", , , , [[, "(\\d{3})(\\d{4})", "$1-$2"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        MK: [, [, , "[2-578]\\d{7}", , , , , , , [8], [6, 7]], [, , "(?:2(?:[23]\\d|5[124578]|6[01])|3(?:1[3-6]|[23][2-6]|4[2356])|4(?:[23][2-6]|4[3-6]|5[256]|6[25-8]|7[24-6]|8[4-6]))\\d{5}", , , , "22212345", , , , [6, 7]], [, , "7(?:[0-25-8]\\d{2}|32\\d|421|9[23]\\d)\\d{4}", , , , "72345678"], [, , "800\\d{5}", , , , "80012345"], [, , "5[02-9]\\d{6}", , , , "50012345"], [, , "8(?:0[1-9]|[1-9]\\d)\\d{5}", , , , "80123456"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "MK", 389, "00", "0", , , "0", , , , [[, "(2)(\\d{3})(\\d{4})", "$1 $2 $3", ["2"], "0$1"], [, "([347]\\d)(\\d{3})(\\d{3})", "$1 $2 $3", ["[347]"], "0$1"], [, "([58]\\d{2})(\\d)(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[58]"], "0$1"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        ML: [, [, , "[246-9]\\d{7}", , , , , , , [8]], [, , "(?:2(?:0(?:2\\d|7[0-8])|1(?:2[5-7]|[3-689]\\d))|44[1239]\\d)\\d{4}", , , , "20212345"], [, , "(?:2(?:079|17\\d)|[679]\\d{3}|8[239]\\d{2})\\d{4}", , , , "65012345"], [, , "80\\d{6}", , , , "80012345"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "ML", 223, "00", , , , , , , , [[, "(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[246-9]"]], [, "(\\d{4})", "$1", ["67|74"]]], [[, "(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[246-9]"]]], [, , , , , , , , , [-1]], , , [, , "80\\d{6}", , , , "80012345"], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        MM: [, [, , "[178]\\d{5,7}|[24-6]\\d{5,8}|9(?:[279]\\d{0,2}|5|[34]\\d{1,2}|6(?:\\d{1,2})?|8(?:\\d{2})?)\\d{6}", , , , , , , [6, 7, 8, 9, 10], [5]], [, , "1(?:2\\d{1,2}|[35]\\d|4(?:\\d|2[236]|39)|6\\d?|[89][0-6]\\d)\\d{4}|2(?:2(?:000\\d{3}|\\d{4})|3\\d{4}|4(?:0\\d{5}|26\\d{4}|39\\d{4}|\\d{4})|5(?:1\\d{3,6}|[02-9]\\d{3,5})|[6-9]\\d{4})|4(?:2[245-8]|3(?:2(?:02)?|[346]|56?)|[46][2-6]|5[3-5])\\d{4}|5(?:2(?:2(?:\\d{1,2})?|[3-8])|3[2-68]|4(?:21?|[4-8])|5[23]|6[2-4]|7[2-8]|8[24-7]|9[2-7])\\d{4}|6(?:0[23]|1(?:2(?:0|4\\d)?|[356])|2[2-6]|3[24-6]|4(?:2(?:4\\d)?|[3-6])|5[2-4]|6[2-8]|7(?:[2367]|4(?:\\d|39)|5\\d?|8[145]\\d)|8[245]|9(?:20?|4))\\d{4}|7(?:[04][24-8]|1(?:20?|[3-7])|22|3[2-4]|5[2-7])\\d{4}|8(?:1(?:2\\d{1,2}|[3-689]\\d)|2(?:2\\d|3(?:\\d|20)|[4-8]\\d)|3[24]\\d|4[24-7]\\d|5[245]\\d|6[23]\\d)\\d{3}", , , , "1234567", , , [6, 7, 8, 9], [5]], [, , "17[01]\\d{4}|9(?:2(?:[0-4]|5\\d{2}|6[0-5]\\d)|3(?:[0-36]|4[069])\\d|4(?:0[0-4]\\d|[1379]\\d|2\\d{2}|4[0-589]\\d|5\\d{2}|88)|5[0-6]|6(?:1\\d|9\\d{2}|\\d)|7(?:3\\d|[6-9]\\d{2})|8(?:\\d|9\\d{2})|9(?:1\\d|[5-7]\\d{2}|[089]))\\d{5}", , , , "92123456", , , [7, 8, 9, 10]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , "1333\\d{4}", , , , "13331234", , , [8]], "MM", 95, "00", "0", , , "0", , , , [[, "(\\d)(\\d{3})(\\d{3,4})", "$1 $2 $3", ["1|2[245]"], "0$1"], [, "(2)(\\d{4})(\\d{4})", "$1 $2 $3", ["251"], "0$1"], [, "(\\d)(\\d{2})(\\d{3})", "$1 $2 $3", ["16|2"], "0$1"], [, "(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["432|67|81"], "0$1"], [, "(\\d{2})(\\d{2})(\\d{3,4})", "$1 $2 $3", ["[4-8]"], "0$1"], [, "(9)(\\d{3})(\\d{4,6})", "$1 $2 $3", ["9(?:2[0-4]|[35-9]|4[137-9])"], "0$1"], [, "(9)([34]\\d{4})(\\d{4})", "$1 $2 $3", ["9(?:3[0-36]|4[0-57-9])"], "0$1"], [, "(9)(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3 $4", ["92[56]"], "0$1"], [, "(9)(\\d{3})(\\d{3})(\\d{2})", "$1 $2 $3 $4", ["93"], "0$1"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        MN: [, [, , "[12]\\d{7,9}|[57-9]\\d{7}", , , , , , , [8, 9, 10], [6, 7]], [, , "[12](?:1\\d|2(?:[1-3]\\d?|7\\d)|3[2-8]\\d{1,2}|4[2-68]\\d{1,2}|5[1-4689]\\d{1,2})\\d{5}|5[0568]\\d{6}", , , , "50123456", , , , [6, 7]], [, , "(?:8(?:[05689]\\d|3[01])|9[013-9]\\d)\\d{5}", , , , "88123456", , , [8]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , "7[05-8]\\d{6}", , , , "75123456", , , [8]], "MN", 976, "001", "0", , , "0", , , , [[, "([12]\\d)(\\d{2})(\\d{4})", "$1 $2 $3", ["[12]1"], "0$1"], [, "([12]2\\d)(\\d{5,6})", "$1 $2", ["[12]2[1-3]"], "0$1"], [, "([12]\\d{3})(\\d{5})", "$1 $2", ["[12](?:27|[3-5])", "[12](?:27|[3-5]\\d)2"], "0$1"], [, "(\\d{4})(\\d{4})", "$1 $2", ["[57-9]"], "$1"], [, "([12]\\d{4})(\\d{4,5})", "$1 $2", ["[12](?:27|[3-5])", "[12](?:27|[3-5]\\d)[4-9]"], "0$1"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        MO: [, [, , "[268]\\d{7}", , , , , , , [8]], [, , "(?:28[2-57-9]|8[2-57-9]\\d)\\d{5}", , , , "28212345"], [, , "6(?:[2356]\\d|8[158])\\d{5}", , , , "66123456"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "MO", 853, "00", , , , , , , , [[, "([268]\\d{3})(\\d{4})", "$1 $2"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        MP: [, [, , "[5689]\\d{9}", , , , , , , [10], [7]], [, , "670(?:2(?:3[3-7]|56|8[5-8])|32[1238]|4(?:33|8[348])|5(?:32|55|88)|6(?:64|70|82)|78[3589]|8[3-9]8|989)\\d{4}", , , , "6702345678", , , , [7]], [, , "670(?:2(?:3[3-7]|56|8[5-8])|32[1238]|4(?:33|8[348])|5(?:32|55|88)|6(?:64|70|82)|78[3589]|8[3-9]8|989)\\d{4}", , , , "6702345678", , , , [7]], [, , "8(?:00|33|44|55|66|77|88)[2-9]\\d{6}", , , , "8002123456"], [, , "900[2-9]\\d{6}", , , , "9002123456"], [, , , , , , , , , [-1]], [, , "5(?:00|22|33|44|66|77|88)[2-9]\\d{6}", , , , "5002345678"], [, , , , , , , , , [-1]], "MP", 1, "011", "1", , , "1", , , 1, , , [, , , , , , , , , [-1]], , "670", [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        MQ: [, [, , "[56]\\d{8}", , , , , , , [9]], [, , "596(?:0[2-5]|[12]0|3[05-9]|4[024-8]|[5-7]\\d|89|9[4-8])\\d{4}", , , , "596301234"], [, , "696(?:[0-47-9]\\d|5[0-6]|6[0-4])\\d{4}", , , , "696201234"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "MQ", 596, "00", "0", , , "0", , , , [[, "(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", , "0$1"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        MR: [, [, , "[2-48]\\d{7}", , , , , , , [8]], [, , "25[08]\\d{5}|35\\d{6}|45[1-7]\\d{5}", , , , "35123456"], [, , "[234][0-46-9]\\d{6}", , , , "22123456"], [, , "800\\d{5}", , , , "80012345"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "MR", 222, "00", , , , , , , , [[, "([2-48]\\d)(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        MS: [, [, , "[5689]\\d{9}", , , , , , , [10], [7]], [, , "664491\\d{4}", , , , "6644912345", , , , [7]], [, , "66449[2-6]\\d{4}", , , , "6644923456", , , , [7]], [, , "8(?:00|33|44|55|66|77|88)[2-9]\\d{6}", , , , "8002123456"], [, , "900[2-9]\\d{6}", , , , "9002123456"], [, , , , , , , , , [-1]], [, , "5(?:00|22|33|44|66|77|88)[2-9]\\d{6}", , , , "5002345678"], [, , , , , , , , , [-1]], "MS", 1, "011", "1", , , "1", , , , , , [, , , , , , , , , [-1]], , "664", [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        MT: [, [, , "[2357-9]\\d{7}", , , , , , , [8]], [, , "2(?:0(?:[169]\\d|3[1-4])|[1-357]\\d{2})\\d{4}", , , , "21001234"], [, , "(?:7(?:210|[79]\\d{2})|9(?:2(?:1[01]|31)|69[67]|8(?:1[1-3]|89|97)|9\\d{2}))\\d{4}", , , , "96961234"], [, , "800[3467]\\d{4}", , , , "80071234"], [, , "5(?:0(?:0(?:37|43)|6\\d{2}|70\\d|9[0168]\\d)|[12]\\d0[1-5])\\d{3}", , , , "50037123"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , "3550\\d{4}", , , , "35501234"], "MT", 356, "00", , , , , , , , [[, "(\\d{4})(\\d{4})", "$1 $2"]], , [, , "7117\\d{4}", , , , "71171234"], , , [, , , , , , , , , [-1]], [, , "501\\d{5}", , , , "50112345"], , , [, , , , , , , , , [-1]]],
        MU: [, [, , "[2-9]\\d{6,7}", , , , , , , [7, 8]], [, , "(?:2(?:[03478]\\d|1[0-7]|6[1-69])|4(?:[013568]\\d|2[4-7])|5(?:44\\d|471)|6\\d{2}|8(?:14|3[129]))\\d{4}", , , , "2012345"], [, , "5(?:2[59]\\d|4(?:2[1-389]|4\\d|7[1-9]|9\\d)|7\\d{2}|8(?:[0-25689]\\d|4[3479]|7[15-8])|9[0-8]\\d)\\d{4}", , , , "52512345", , , [8]], [, , "80[012]\\d{4}", , , , "8001234", , , [7]], [, , "30\\d{5}", , , , "3012345", , , [7]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , "3(?:20|9\\d)\\d{4}", , , , "3201234", , , [7]], "MU", 230, "0(?:0|[2-7]0|33)", , , , , , "020", , [[, "([2-46-9]\\d{2})(\\d{4})", "$1 $2", ["[2-46-9]"]], [, "(5\\d{3})(\\d{4})", "$1 $2", ["5"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        MV: [, [, , "[346-8]\\d{6,9}|9(?:00\\d{7}|\\d{6})", , , , , , , [7, 10]], [, , "(?:3(?:0[0-3]|3[0-59])|6(?:[57][02468]|6[024568]|8[024689]|90))\\d{4}", , , , "6701234", , , [7]], [, , "(?:46[46]|7[3-9]\\d|9[15-9]\\d)\\d{4}", , , , "7712345", , , [7]], [, , "800\\d{7}", , , , "8001234567", , , [10]], [, , "900\\d{7}", , , , "9001234567", , , [10]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "MV", 960, "0(?:0|19)", , , , , , "00", , [[, "(\\d{3})(\\d{4})", "$1-$2", ["[3467]|9(?:[1-9]|0[1-9])"]], [, "(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["[89]00"]]], , [, , "781\\d{4}", , , , "7812345", , , [7]], , , [, , , , , , , , , [-1]], [, , "4[05]0\\d{4}", , , , "4001234", , , [7]], , , [, , , , , , , , , [-1]]],
        MW: [, [, , "(?:1(?:\\d{2})?|[2789]\\d{2})\\d{6}", , , , , , , [7, 9]], [, , "(?:1[2-9]|21\\d{2})\\d{5}", , , , "1234567"], [, , "(?:111|77\\d|88\\d|99\\d)\\d{6}", , , , "991234567", , , [9]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "MW", 265, "00", "0", , , "0", , , , [[, "(\\d)(\\d{3})(\\d{3})", "$1 $2 $3", ["1"], "0$1"], [, "(2\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["2"], "0$1"], [, "(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[1789]"], "0$1"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        MX: [, [, , "[1-9]\\d{9,10}", , , , , , , [10, 11], [7, 8]], [, , "(?:33|55|81)\\d{8}|(?:2(?:0[01]|2[1-9]|3[1-35-8]|4[13-9]|7[1-689]|8[1-578]|9[467])|3(?:1[1-79]|[2458][1-9]|7[1-8]|9[1-5])|4(?:1[1-57-9]|[24-6][1-9]|[37][1-8]|8[1-35-9]|9[2-689])|5(?:88|9[1-79])|6(?:1[2-68]|[234][1-9]|5[1-3689]|6[12457-9]|7[1-7]|8[67]|9[4-8])|7(?:[13467][1-9]|2[1-8]|5[13-9]|8[1-69]|9[17])|8(?:2[13-689]|3[1-6]|4[124-6]|6[1246-9]|7[1-378]|9[12479])|9(?:1[346-9]|2[1-4]|3[2-46-8]|5[1348]|[69][1-9]|7[12]|8[1-8]))\\d{7}", , , , "2221234567", , , [10], [7, 8]], [, , "1(?:(?:33|55|81)\\d{8}|(?:2(?:2[1-9]|3[1-35-8]|4[13-9]|7[1-689]|8[1-578]|9[467])|3(?:1[1-79]|[2458][1-9]|7[1-8]|9[1-5])|4(?:1[1-57-9]|[24-6][1-9]|[37][1-8]|8[1-35-9]|9[2-689])|5(?:88|9[1-79])|6(?:1[2-68]|[2-4][1-9]|5[1-3689]|6[12457-9]|7[1-7]|8[67]|9[4-8])|7(?:[13467][1-9]|2[1-8]|5[13-9]|8[1-69]|9[17])|8(?:2[13-689]|3[1-6]|4[124-6]|6[1246-9]|7[1-378]|9[12479])|9(?:1[346-9]|2[1-4]|3[2-46-8]|5[1348]|[69][1-9]|7[12]|8[1-8]))\\d{7})", , , , "12221234567", , , [11]], [, , "8(?:00|88)\\d{7}", , , , "8001234567", , , [10]], [, , "900\\d{7}", , , , "9001234567", , , [10]], [, , "300\\d{7}", , , , "3001234567", , , [10]], [, , "500\\d{7}", , , , "5001234567", , , [10]], [, , , , , , , , , [-1]], "MX", 52, "0[09]", "01", , , "0[12]|04[45](\\d{10})", "1$1", , , [[, "([358]\\d)(\\d{4})(\\d{4})", "$1 $2 $3", ["33|55|81"], "01 $1", , 1], [, "(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["[2467]|3[0-2457-9]|5[089]|8[02-9]|9[0-35-9]"], "01 $1", , 1], [, "(1)([358]\\d)(\\d{4})(\\d{4})", "044 $2 $3 $4", ["1(?:33|55|81)"], "$1", , 1], [, "(1)(\\d{3})(\\d{3})(\\d{4})", "044 $2 $3 $4", ["1(?:[2467]|3[0-2457-9]|5[089]|8[2-9]|9[1-35-9])"], "$1", , 1]], [[, "([358]\\d)(\\d{4})(\\d{4})", "$1 $2 $3", ["33|55|81"], "01 $1", , 1], [, "(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["[2467]|3[0-2457-9]|5[089]|8[02-9]|9[0-35-9]"], "01 $1", , 1], [, "(1)([358]\\d)(\\d{4})(\\d{4})", "$1 $2 $3 $4", ["1(?:33|55|81)"]], [, "(1)(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3 $4", ["1(?:[2467]|3[0-2457-9]|5[089]|8[2-9]|9[1-35-9])"]]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        MY: [, [, , "[13-9]\\d{7,9}", , , , , , , [8, 9, 10], [6, 7]], [, , "(?:3[2-9]\\d|[4-9][2-9])\\d{6}", , , , "323456789", , , [8, 9], [6, 7]], [, , "1(?:1[1-6]\\d{2}|[02-4679][2-9]\\d|59\\d{2}|8(?:1[23]|[2-9]\\d))\\d{5}", , , , "123456789", , , [9, 10]], [, , "1[378]00\\d{6}", , , , "1300123456", , , [10]], [, , "1600\\d{6}", , , , "1600123456", , , [10]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , "154\\d{7}", , , , "1541234567", , , [10]], "MY", 60, "00", "0", , , "0", , , , [[, "([4-79])(\\d{3})(\\d{4})", "$1-$2 $3", ["[4-79]"], "0$1"], [, "(3)(\\d{4})(\\d{4})", "$1-$2 $3", ["3"], "0$1"], [, "([18]\\d)(\\d{3})(\\d{3,4})", "$1-$2 $3", ["1[02-46-9][1-9]|8"], "0$1"], [, "(1)([36-8]00)(\\d{2})(\\d{4})", "$1-$2-$3-$4", ["1[36-8]0"]], [, "(11)(\\d{4})(\\d{4})", "$1-$2 $3", ["11"], "0$1"], [, "(15[49])(\\d{3})(\\d{4})", "$1-$2 $3", ["15"], "0$1"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        MZ: [, [, , "[28]\\d{7,8}", , , , , , , [8, 9]], [, , "2(?:[1346]\\d|5[0-2]|[78][12]|93)\\d{5}", , , , "21123456", , , [8]], [, , "8[2-7]\\d{7}", , , , "821234567", , , [9]], [, , "800\\d{6}", , , , "800123456", , , [9]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "MZ", 258, "00", , , , , , , , [[, "([28]\\d)(\\d{3})(\\d{3,4})", "$1 $2 $3", ["2|8[2-7]"]], [, "(80\\d)(\\d{3})(\\d{3})", "$1 $2 $3", ["80"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        NA: [, [, , "[68]\\d{7,8}", , , , , , , [8, 9]], [, , "6(?:1(?:17|2(?:[0189]\\d|[2-6]|7\\d?)|3(?:[01378]|2\\d)|4(?:[024]|10?|3[15]?)|69|7[014])|2(?:17|5(?:[0-36-8]|4\\d?)|69|70)|3(?:17|2(?:[0237]\\d?|[14-689])|34|6[289]|7[01]|81)|4(?:17|2(?:[012]|7\\d?)|4(?:[06]|1\\d?)|5(?:[01357]|[25]\\d?)|69|7[01])|5(?:17|2(?:[0459]|[23678]\\d?)|69|7[01])|6(?:17|2(?:5|6\\d?)|38|42|69|7[01])|7(?:17|2(?:[569]|[234]\\d?)|3(?:0\\d?|[13])|6[89]|7[01]))\\d{4}", , , , "61221234"], [, , "(?:60|8[125])\\d{7}", , , , "811234567", , , [9]], [, , , , , , , , , [-1]], [, , "8701\\d{5}", , , , "870123456", , , [9]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , "8(?:3\\d{2}|86)\\d{5}", , , , "88612345"], "NA", 264, "00", "0", , , "0", , , , [[, "(8\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["8[1235]"], "0$1"], [, "(6\\d)(\\d{3})(\\d{3,4})", "$1 $2 $3", ["6"], "0$1"], [, "(88)(\\d{3})(\\d{3})", "$1 $2 $3", ["88"], "0$1"], [, "(870)(\\d{3})(\\d{3})", "$1 $2 $3", ["870"], "0$1"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        NC: [, [, , "[2-57-9]\\d{5}", , , , , , , [6]], [, , "(?:2[03-9]|3[0-5]|4[1-7]|88)\\d{4}", , , , "201234"], [, , "(?:5[0-4]|[79]\\d|8[0-79])\\d{4}", , , , "751234"], [, , , , , , , , , [-1]], [, , "36\\d{4}", , , , "366711"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "NC", 687, "00", , , , , , , , [[, "(\\d{2})(\\d{2})(\\d{2})", "$1.$2.$3", ["[2-46-9]|5[0-4]"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        NE: [, [, , "[0289]\\d{7}", , , , , , , [8]], [, , "2(?:0(?:20|3[1-7]|4[134]|5[14]|6[14578]|7[1-578])|1(?:4[145]|5[14]|6[14-68]|7[169]|88))\\d{4}", , , , "20201234"], [, , "(?:8[089]|9\\d)\\d{6}", , , , "93123456"], [, , "08\\d{6}", , , , "08123456"], [, , "09\\d{6}", , , , "09123456"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "NE", 227, "00", , , , , , , , [[, "(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[289]|09"]], [, "(08)(\\d{3})(\\d{3})", "$1 $2 $3", ["08"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        NF: [, [, , "[13]\\d{5}", , , , , , , [6], [5]], [, , "(?:1(?:06|17|28|39)|3[012]\\d)\\d{3}", , , , "106609", , , , [5]], [, , "3[58]\\d{4}", , , , "381234", , , , [5]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "NF", 672, "00", , , , , , , , [[, "(\\d{2})(\\d{4})", "$1 $2", ["1"]], [, "(\\d)(\\d{5})", "$1 $2", ["3"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        NG: [, [, , "[1-6]\\d{5,8}|9\\d{5,9}|[78]\\d{5,13}", , , , , , , [7, 8, 10, 11, 12, 13, 14], [5, 6]], [, , "[12]\\d{6,7}|9(?:0[3-9]|[1-9]\\d)\\d{5}|(?:3\\d|4[023568]|5[02368]|6[02-469]|7[4-69]|8[2-9])\\d{6}|(?:4[47]|5[14579]|6[1578]|7[0-357])\\d{5,6}|(?:78|41)\\d{5}", , , , "12345678", , , [7, 8], [5, 6]], [, , "(?:1(?:7[34]\\d|8(?:04|[124579]\\d|8[0-3])|95\\d)|287[0-7]|3(?:18[1-8]|88[0-7]|9(?:8[5-9]|6[1-5]))|4(?:28[0-2]|6(?:7[1-9]|8[02-47])|88[0-2])|5(?:2(?:7[7-9]|8\\d)|38[1-79]|48[0-7]|68[4-7])|6(?:2(?:7[7-9]|8\\d)|4(?:3[7-9]|[68][129]|7[04-69]|9[1-8])|58[0-2]|98[7-9])|7(?:38[0-7]|69[1-8]|78[2-4])|8(?:28[3-9]|38[0-2]|4(?:2[12]|3[147-9]|5[346]|7[4-9]|8[014-689]|90)|58[1-8]|78[2-9]|88[5-7])|98[07]\\d)\\d{4}|(?:70(?:[1-689]\\d|7[0-3])|8(?:0(?:1[01]|[2-9]\\d)|1(?:[0-8]\\d|9[01]))|90[235-9]\\d)\\d{6}", , , , "8021234567", , , [8, 10]], [, , "800\\d{7,11}", , , , "80017591759", , , [10, 11, 12, 13, 14]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "NG", 234, "009", "0", , , "0", , , , [[, "(\\d)(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[12]|9(?:0[3-9]|[1-9])"], "0$1"], [, "(\\d{2})(\\d{3})(\\d{2,3})", "$1 $2 $3", ["[3-6]|7(?:[1-79]|0[1-9])|8[2-9]"], "0$1"], [, "(\\d{3})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["70|8[01]|90[235-9]"], "0$1"], [, "([78]00)(\\d{4})(\\d{4,5})", "$1 $2 $3", ["[78]00"], "0$1"], [, "([78]00)(\\d{5})(\\d{5,6})", "$1 $2 $3", ["[78]00"], "0$1"], [, "(78)(\\d{2})(\\d{3})", "$1 $2 $3", ["78"], "0$1"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , "700\\d{7,11}", , , , "7001234567", , , [10, 11, 12, 13, 14]], , , [, , , , , , , , , [-1]]],
        NI: [, [, , "[125-8]\\d{7}", , , , , , , [8]], [, , "2\\d{7}", , , , "21234567"], [, , "(?:5(?:5[0-7]|[78]\\d)|6(?:20|3[035]|4[045]|5[05]|77|8[1-9]|9[059])|7[5-8]\\d|8\\d{2})\\d{5}", , , , "81234567"], [, , "1800\\d{4}", , , , "18001234"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "NI", 505, "00", , , , , , , , [[, "(\\d{4})(\\d{4})", "$1 $2"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        NL: [, [, , "1\\d{4,8}|[2-7]\\d{8}|[89]\\d{6,9}", , , , , , , [5, 6, 7, 8, 9, 10]], [, , "(?:1[0135-8]|2[02-69]|3[0-68]|4[0135-9]|[57]\\d|8[478])\\d{7}", , , , "101234567", , , [9]], [, , "6[1-58]\\d{7}", , , , "612345678", , , [9]], [, , "800\\d{4,7}", , , , "8001234", , , [7, 8, 9, 10]], [, , "90[069]\\d{4,7}", , , , "9061234", , , [7, 8, 9, 10]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , "(?:6760|85\\d{2})\\d{5}", , , , "851234567", , , [9]], "NL", 31, "00", "0", , , "0", , , , [[, "([1-578]\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["1[035]|2[0346]|3[03568]|4[0356]|5[0358]|7|8[4578]"], "0$1"], [, "([1-5]\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["1[16-8]|2[259]|3[124]|4[17-9]|5[124679]"], "0$1"], [, "(6)(\\d{8})", "$1 $2", ["6[0-57-9]"], "0$1"], [, "(66)(\\d{7})", "$1 $2", ["66"], "0$1"], [, "(14)(\\d{3,4})", "$1 $2", ["14"], "$1"], [, "([89]0\\d)(\\d{4,7})", "$1 $2", ["80|9"], "0$1"]], , [, , "66\\d{7}", , , , "662345678", , , [9]], , , [, , "14\\d{3,4}", , , , "14123", , , [5, 6]], [, , "140(?:1(?:[035]|[16-8]\\d)|2(?:[0346]|[259]\\d)|3(?:[03568]|[124]\\d)|4(?:[0356]|[17-9]\\d)|5(?:[0358]|[124679]\\d)|7\\d|8[458])", , , , "14020", , , [5, 6]], , , [, , , , , , , , , [-1]]],
        NO: [, [, , "0\\d{4}|[2-9]\\d{7}", , , , , , , [5, 8]], [, , "(?:2[1-4]|3[1-3578]|5[1-35-7]|6[1-4679]|7[0-8])\\d{6}", , , , "21234567", , , [8]], [, , "(?:4[015-8]|5[89]|87|9\\d)\\d{6}", , , , "40612345", , , [8]], [, , "80[01]\\d{5}", , , , "80012345", , , [8]], [, , "82[09]\\d{5}", , , , "82012345", , , [8]], [, , "810(?:0[0-6]|[2-8]\\d)\\d{3}", , , , "81021234", , , [8]], [, , "880\\d{5}", , , , "88012345", , , [8]], [, , "85[0-5]\\d{5}", , , , "85012345", , , [8]], "NO", 47, "00", , , , , , , , [[, "([489]\\d{2})(\\d{2})(\\d{3})", "$1 $2 $3", ["[489]"]], [, "([235-7]\\d)(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[235-7]"]]], , [, , , , , , , , , [-1]], 1, , [, , , , , , , , , [-1]], [, , "0\\d{4}|81(?:0(?:0[7-9]|1\\d)|5\\d{2})\\d{3}", , , , "01234"], , , [, , "81[23]\\d{5}", , , , "81212345", , , [8]]],
        NP: [, [, , "[1-8]\\d{7}|9(?:[1-69]\\d{6,8}|7[2-6]\\d{5,7}|8\\d{8})", , , , , , , [8, 10], [6, 7]], [, , "(?:1[0-6]\\d|2[13-79][2-6]|3[135-8][2-6]|4[146-9][2-6]|5[135-7][2-6]|6[13-9][2-6]|7[15-9][2-6]|8[1-46-9][2-6]|9[1-79][2-6])\\d{5}", , , , "14567890", , , [8], [6, 7]], [, , "9(?:6[013]|7[245]|8[0-24-6])\\d{7}", , , , "9841234567", , , [10]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "NP", 977, "00", "0", , , "0", , , , [[, "(1)(\\d{7})", "$1-$2", ["1[2-6]"], "0$1"], [, "(\\d{2})(\\d{6})", "$1-$2", ["1[01]|[2-8]|9(?:[1-69]|7[15-9])"], "0$1"], [, "(9\\d{2})(\\d{7})", "$1-$2", ["9(?:6[013]|7[245]|8)"], "$1"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        NR: [, [, , "[458]\\d{6}", , , , , , , [7]], [, , "(?:444|888)\\d{4}", , , , "4441234"], [, , "55[5-9]\\d{4}", , , , "5551234"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "NR", 674, "00", , , , , , , , [[, "(\\d{3})(\\d{4})", "$1 $2"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        NU: [, [, , "[1-5]\\d{3}", , , , , , , [4]], [, , "[34]\\d{3}", , , , "4002"], [, , "[125]\\d{3}", , , , "1234"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "NU", 683, "00", , , , , , , , , , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        NZ: [, [, , "6[235-9]\\d{6}|[2-57-9]\\d{7,9}", , , , , , , [8, 9, 10], [7]], [, , "(?:3[2-79]|[49][2-9]|6[235-9]|7[2-57-9])\\d{6}|24099\\d{3}", , , , "32345678", , , [8], [7]], [, , "2(?:[028]\\d{7,8}|1(?:[03]\\d{5,7}|[12457]\\d{5,6}|[689]\\d{5})|[79]\\d{7})", , , , "211234567"], [, , "508\\d{6,7}|80\\d{6,8}", , , , "800123456"], [, , "90\\d{6,7}", , , , "900123456", , , [8, 9]], [, , , , , , , , , [-1]], [, , "70\\d{7}", , , , "701234567", , , [9]], [, , , , , , , , , [-1]], "NZ", 64, "0(?:0|161)", "0", , , "0", , "00", , [[, "(\\d)(\\d{3})(\\d{4})", "$1-$2 $3", ["240|[346]|7[2-57-9]|9[1-9]"], "0$1"], [, "(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["21"], "0$1"], [, "(\\d{2})(\\d{3})(\\d{3,5})", "$1 $2 $3", ["2(?:1[1-9]|[69]|7[0-35-9])|70|86"], "0$1"], [, "(2\\d)(\\d{3,4})(\\d{4})", "$1 $2 $3", ["2[028]"], "0$1"], [, "(\\d{3})(\\d{2})(\\d{3})", "$1 $2 $3", ["90"], "0$1"], [, "(\\d{3})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["2(?:10|74)|5|[89]0"], "0$1"]], , [, , "[28]6\\d{6,7}", , , , "26123456", , , [8, 9]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        OM: [, [, , "(?:5|[279]\\d)\\d{6}|800\\d{5,6}", , , , , , , [7, 8, 9]], [, , "2[2-6]\\d{6}", , , , "23123456", , , [8]], [, , "7[19]\\d{6}|9(?:0[1-9]|[1-9]\\d)\\d{5}", , , , "92123456", , , [8]], [, , "8007\\d{4,5}|500\\d{4}", , , , "80071234"], [, , "900\\d{5}", , , , "90012345", , , [8]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "OM", 968, "00", , , , , , , , [[, "(2\\d)(\\d{6})", "$1 $2", ["2"]], [, "([79]\\d{3})(\\d{4})", "$1 $2", ["[79]"]], [, "([58]00)(\\d{4,6})", "$1 $2", ["[58]"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        PA: [, [, , "[1-9]\\d{6,7}", , , , , , , [7, 8]], [, , "(?:1(?:0[0-8]|1[49]|2[37]|3[0137]|4[147]|5[05]|6[58]|7[0167]|8[58]|9[139])|2(?:[0235679]\\d|1[0-7]|4[04-9]|8[028])|3(?:[09]\\d|1[014-7]|2[0-3]|3[03]|4[03-57]|55|6[068]|7[06-8]|8[06-9])|4(?:3[013-69]|4\\d|7[0-589])|5(?:[01]\\d|2[0-7]|[56]0|79)|7(?:0[09]|2[0-267]|3[06]|[469]0|5[06-9]|7[0-24-79]|8[7-9])|8(?:09|[34]\\d|5[0134]|8[02])|9(?:0[6-9]|1[016-8]|2[036-8]|3[3679]|40|5[0489]|6[06-9]|7[046-9]|8[36-8]|9[1-9]))\\d{4}", , , , "2001234", , , [7]], [, , "(?:1[16]1|21[89]|8(?:1[01]|7[23]))\\d{4}|6(?:[024-9]\\d|1[0-5]|3[0-24-9])\\d{5}", , , , "60012345"], [, , "80[09]\\d{4}", , , , "8001234", , , [7]], [, , "(?:779|8(?:55|60|7[78])|9(?:00|81))\\d{4}", , , , "8601234", , , [7]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "PA", 507, "00", , , , , , , , [[, "(\\d{3})(\\d{4})", "$1-$2", ["[1-57-9]"]], [, "(\\d{4})(\\d{4})", "$1-$2", ["6"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        PE: [, [, , "[14-9]\\d{7,8}", , , , , , , [8, 9], [6, 7]], [, , "(?:1\\d|4[1-4]|5[1-46]|6[1-7]|7[2-46]|8[2-4])\\d{6}", , , , "11234567", , , [8], [6, 7]], [, , "9\\d{8}", , , , "912345678", , , [9]], [, , "800\\d{5}", , , , "80012345", , , [8]], [, , "805\\d{5}", , , , "80512345", , , [8]], [, , "801\\d{5}", , , , "80112345", , , [8]], [, , "80[24]\\d{5}", , , , "80212345", , , [8]], [, , , , , , , , , [-1]], "PE", 51, "19(?:1[124]|77|90)00", "0", " Anexo ", , "0", , , , [[, "(1)(\\d{7})", "$1 $2", ["1"], "(0$1)"], [, "([4-8]\\d)(\\d{6})", "$1 $2", ["[4-7]|8[2-4]"], "(0$1)"], [, "(\\d{3})(\\d{5})", "$1 $2", ["80"], "(0$1)"], [, "(9\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["9"], "$1"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        PF: [, [, , "4\\d{5,7}|8\\d{7}", , , , , , , [6, 8]], [, , "4(?:[09][45689]\\d|4)\\d{4}", , , , "40412345"], [, , "8[79]\\d{6}", , , , "87123456", , , [8]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "PF", 689, "00", , , , , , , , [[, "(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["4[09]|8[79]"]], [, "(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3", ["44"]]], , [, , , , , , , , , [-1]], , , [, , "44\\d{4}", , , , "441234", , , [6]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        PG: [, [, , "[1-9]\\d{6,7}", , , , , , , [7, 8]], [, , "(?:3[0-2]\\d|4[257]\\d|5[34]\\d|64[1-9]|77(?:[0-24]\\d|30)|85[02-46-9]|9[78]\\d)\\d{4}", , , , "3123456", , , [7]], [, , "7(?:[0-689]\\d|75)\\d{5}", , , , "70123456", , , [8]], [, , "180\\d{4}", , , , "1801234", , , [7]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , "2(?:0[0-47]|7[568])\\d{4}", , , , "2751234", , , [7]], "PG", 675, "140[1-3]|00", , , , , , "00", , [[, "(\\d{3})(\\d{4})", "$1 $2", ["[13-689]|27"]], [, "(\\d{4})(\\d{4})", "$1 $2", ["20|7"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        PH: [, [, , "2\\d{5,7}|[3-9]\\d{7,9}|1800\\d{7,9}", , , , , , , [6, 8, 9, 10, 11, 12, 13], [5, 7]], [, , "2\\d{5}(?:\\d{2})?|(?:3[2-68]|4[2-9]|5[2-6]|6[2-58]|7[24578]|8[2-8])\\d{7}|88(?:22\\d{6}|42\\d{4})", , , , "21234567", , , [6, 8, 9, 10], [5, 7]], [, , "(?:81[37]|9(?:0[5-9]|1[024-9]|2[0-35-9]|3[02-9]|4[235-9]|5[056]|6[5-7]|7[34-79]|89|9[4-9]))\\d{7}", , , , "9051234567", , , [10]], [, , "1800\\d{7,9}", , , , "180012345678", , , [11, 12, 13]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "PH", 63, "00", "0", , , "0", , , , [[, "(2)(\\d{3})(\\d{4})", "$1 $2 $3", ["2"], "(0$1)"], [, "(2)(\\d{5})", "$1 $2", ["2"], "(0$1)"], [, "(\\d{4})(\\d{4,6})", "$1 $2", ["3(?:23|39|46)|4(?:2[3-6]|[35]9|4[26]|76)|5(?:22|44)|642|8(?:62|8[245])", "3(?:230|397|461)|4(?:2(?:35|[46]4|51)|396|4(?:22|63)|59[347]|76[15])|5(?:221|446)|642[23]|8(?:622|8(?:[24]2|5[13]))"], "(0$1)"], [, "(\\d{5})(\\d{4})", "$1 $2", ["346|4(?:27|9[35])|883", "3469|4(?:279|9(?:30|56))|8834"], "(0$1)"], [, "([3-8]\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["[3-8]"], "(0$1)"], [, "(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["81|9"], "0$1"], [, "(1800)(\\d{3})(\\d{4})", "$1 $2 $3", ["1"]], [, "(1800)(\\d{1,2})(\\d{3})(\\d{4})", "$1 $2 $3 $4", ["1"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        PK: [, [, , "1\\d{8}|[2-8]\\d{5,11}|9(?:[013-9]\\d{4,9}|2\\d(?:111\\d{6}|\\d{3,7}))", , , , , , , [8, 9, 10, 11, 12], [6, 7]], [, , "(?:21|42)[2-9]\\d{7}|(?:2[25]|4[0146-9]|5[1-35-7]|6[1-8]|7[14]|8[16]|91)[2-9]\\d{6}|(?:2(?:3[2358]|4[2-4]|9[2-8])|45[3479]|54[2-467]|60[468]|72[236]|8(?:2[2-689]|3[23578]|4[3478]|5[2356])|9(?:2[2-8]|3[27-9]|4[2-6]|6[3569]|9[25-8]))[2-9]\\d{5,6}|58[126]\\d{7}", , , , "2123456789", , , [9, 10], [6, 7, 8]], [, , "3(?:[014]\\d|2[0-5]|3[0-7]|55|64)\\d{7}", , , , "3012345678", , , [10]], [, , "800\\d{5}", , , , "80012345", , , [8]], [, , "900\\d{5}", , , , "90012345", , , [8]], [, , , , , , , , , [-1]], [, , "122\\d{6}", , , , "122044444", , , [9]], [, , , , , , , , , [-1]], "PK", 92, "00", "0", , , "0", , , , [[, "(\\d{2})(111)(\\d{3})(\\d{3})", "$1 $2 $3 $4", ["(?:2[125]|4[0-246-9]|5[1-35-7]|6[1-8]|7[14]|8[16]|91)1", "(?:2[125]|4[0-246-9]|5[1-35-7]|6[1-8]|7[14]|8[16]|91)11", "(?:2[125]|4[0-246-9]|5[1-35-7]|6[1-8]|7[14]|8[16]|91)111"], "(0$1)"], [, "(\\d{3})(111)(\\d{3})(\\d{3})", "$1 $2 $3 $4", ["2[349]|45|54|60|72|8[2-5]|9[2-9]", "(?:2[349]|45|54|60|72|8[2-5]|9[2-9])\\d1", "(?:2[349]|45|54|60|72|8[2-5]|9[2-9])\\d11", "(?:2[349]|45|54|60|72|8[2-5]|9[2-9])\\d111"], "(0$1)"], [, "(\\d{2})(\\d{7,8})", "$1 $2", ["(?:2[125]|4[0-246-9]|5[1-35-7]|6[1-8]|7[14]|8[16]|91)[2-9]"], "(0$1)"], [, "(\\d{3})(\\d{6,7})", "$1 $2", ["2[349]|45|5(?:4|8[12])|60|72|8[2-5]|9[2-9]", "(?:2[349]|45|5(?:4|8[12])|60|72|8[2-5]|9[2-9])\\d[2-9]"], "(0$1)"], [, "(3\\d{2})(\\d{7})", "$1 $2", ["3"], "0$1"], [, "(1\\d{3})(\\d{5,6})", "$1 $2", ["1"], "$1"], [, "(586\\d{2})(\\d{5})", "$1 $2", ["586"], "(0$1)"], [, "([89]00)(\\d{3})(\\d{2})", "$1 $2 $3", ["[89]00"], "0$1"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , "(?:2(?:[125]|3[2358]|4[2-4]|9[2-8])|4(?:[0-246-9]|5[3479])|5(?:[1-35-7]|4[2-467])|6(?:[1-8]|0[468])|7(?:[14]|2[236])|8(?:[16]|2[2-689]|3[23578]|4[3478]|5[2356])|9(?:1|22|3[27-9]|4[2-6]|6[3569]|9[2-7]))111\\d{6}", , , , "21111825888", , , [11, 12]], , , [, , , , , , , , , [-1]]],
        PL: [, [, , "[1-57-9]\\d{6,8}|6\\d{5,8}", , , , , , , [6, 7, 8, 9]], [, , "(?:1[2-8]|2[2-69]|3[2-4]|4[1-468]|5[24-689]|6[1-3578]|7[14-7]|8[1-79]|9[145])(?:\\d{7}|19\\d{3})", , , , "123456789", , , [7, 9]], [, , "(?:45|5[0137]|6[069]|7[2389]|88)\\d{7}", , , , "512345678", , , [9]], [, , "800\\d{6}", , , , "800123456", , , [9]], [, , "70[01346-8]\\d{6}", , , , "701234567", , , [9]], [, , "801\\d{6}", , , , "801234567", , , [9]], [, , , , , , , , , [-1]], [, , "39\\d{7}", , , , "391234567", , , [9]], "PL", 48, "00", , , , , , , , [[, "(\\d{3})(\\d{3})", "$1 $2", ["11[68]|64"]], [, "(\\d{5})", "$1", ["19"]], [, "(\\d{2})(\\d{2})(\\d{3})", "$1 $2 $3", ["1[2-8]|2[2-69]|3[2-4]|4[1-468]|5[24-689]|6[1-3578]|7[14-7]|8[1-79]|9[145]"]], [, "(\\d{3})(\\d{2})(\\d{2,3})", "$1 $2 $3", ["64"]], [, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["26|39|45|5[0137]|6[0469]|7[02389]|8[08]"]], [, "(\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[14]|2[0-57-9]|3[2-4]|5[24-689]|6[1-3578]|7[14-7]|8[1-79]|9[145]"]]], , [, , "64\\d{4,7}", , , , "641234567"], , , [, , , , , , , , , [-1]], [, , "804\\d{6}", , , , "804123456", , , [9]], , , [, , , , , , , , , [-1]]],
        PM: [, [, , "[45]\\d{5}", , , , , , , [6]], [, , "41\\d{4}", , , , "411234"], [, , "(?:40|55)\\d{4}", , , , "551234"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "PM", 508, "00", "0", , , "0", , , , [[, "([45]\\d)(\\d{2})(\\d{2})", "$1 $2 $3", , "0$1"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        PR: [, [, , "[5789]\\d{9}", , , , , , , [10], [7]], [, , "(?:787|939)[2-9]\\d{6}", , , , "7872345678", , , , [7]], [, , "(?:787|939)[2-9]\\d{6}", , , , "7872345678", , , , [7]], [, , "8(?:00|33|44|55|66|77|88)[2-9]\\d{6}", , , , "8002345678"], [, , "900[2-9]\\d{6}", , , , "9002345678"], [, , , , , , , , , [-1]], [, , "5(?:00|22|33|44|66|77|88)[2-9]\\d{6}", , , , "5002345678"], [, , , , , , , , , [-1]], "PR", 1, "011", "1", , , "1", , , 1, , , [, , , , , , , , , [-1]], , "787|939", [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        PS: [, [, , "1\\d{9}|[24589]\\d{7,8}", , , , , , , [8, 9, 10], [7]], [, , "(?:22[234789]|42[45]|82[01458]|92[369])\\d{5}", , , , "22234567", , , [8], [7]], [, , "5[69]\\d{7}", , , , "599123456", , , [9]], [, , "1800\\d{6}", , , , "1800123456", , , [10]], [, , , , , , , , , [-1]], [, , "1700\\d{6}", , , , "1700123456", , , [10]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "PS", 970, "00", "0", , , "0", , , , [[, "([2489])(2\\d{2})(\\d{4})", "$1 $2 $3", ["[2489]"], "0$1"], [, "(5[69]\\d)(\\d{3})(\\d{3})", "$1 $2 $3", ["5"], "0$1"], [, "(1[78]00)(\\d{3})(\\d{3})", "$1 $2 $3", ["1"], "$1"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        PT: [, [, , "[2-46-9]\\d{8}", , , , , , , [9]], [, , "2(?:[12]\\d|[35][1-689]|4[1-59]|6[1-35689]|7[1-9]|8[1-69]|9[1256])\\d{6}", , , , "212345678"], [, , "9(?:[1236]\\d{2}|480)\\d{5}", , , , "912345678"], [, , "80[02]\\d{6}", , , , "800123456"], [, , "6(?:0[178]|4[68])\\d{6}|76(?:0[1-57]|1[2-47]|2[237])\\d{5}", , , , "760123456"], [, , "80(?:8\\d|9[1579])\\d{5}", , , , "808123456"], [, , "884[0-4689]\\d{5}", , , , "884123456"], [, , "30\\d{7}", , , , "301234567"], "PT", 351, "00", , , , , , , , [[, "(2\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["2[12]"]], [, "([2-46-9]\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["2[3-9]|[346-9]"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , "7(?:0(?:7\\d|8[17]))\\d{5}", , , , "707123456"], , , [, , "600\\d{6}", , , , "600110000"]],
        PW: [, [, , "[2-8]\\d{6}", , , , , , , [7]], [, , "2552255|(?:277|345|488|5(?:35|44|87)|6(?:22|54|79)|7(?:33|47)|8(?:24|55|76))\\d{4}", , , , "2771234"], [, , "(?:6[234689]0|77[45789])\\d{4}", , , , "6201234"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "PW", 680, "01[12]", , , , , , , , [[, "(\\d{3})(\\d{4})", "$1 $2"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        PY: [, [, , "5[0-5]\\d{4,7}|[2-46-9]\\d{5,8}", , , , , , , [6, 7, 8, 9], [5]], [, , "(?:[26]1|3[289]|4[124678]|7[123]|8[1236])\\d{5,7}|(?:2(?:2[4568]|7[15]|9[1-5])|3(?:18|3[167]|4[2357]|51)|4(?:18|2[45]|3[12]|5[13]|64|71|9[1-47])|5(?:[1-4]\\d|5[0234])|6(?:3[1-3]|44|7[1-4678])|7(?:17|4[0-4]|6[1-578]|75|8[0-8])|858)\\d{5,6}", , , , "212345678", , , [7, 8, 9], [5, 6]], [, , "9(?:6[12]|[78][1-6]|9[1-5])\\d{6}", , , , "961456789", , , [9]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , "8700[0-4]\\d{4}", , , , "870012345", , , [9]], "PY", 595, "00", "0", , , "0", , , , [[, "(\\d{2})(\\d{5})", "$1 $2", ["(?:[26]1|3[289]|4[124678]|7[123]|8[1236])"], "(0$1)"], [, "(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["(?:[26]1|3[289]|4[124678]|7[123]|8[1236])"], "(0$1)"], [, "(\\d{3})(\\d{3,6})", "$1 $2", ["[2-9]0"], "0$1"], [, "(\\d{3})(\\d{6})", "$1 $2", ["9[1-9]"], "0$1"], [, "(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["8700"]], [, "(\\d{3})(\\d{4,5})", "$1 $2", ["[2-8][1-9]"], "(0$1)"], [, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[2-8][1-9]"], "0$1"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , "[2-9]0\\d{4,7}", , , , "201234567"], , , [, , , , , , , , , [-1]]],
        QA: [, [, , "[2-8]\\d{6,7}", , , , , , , [7, 8]], [, , "4[04]\\d{6}", , , , "44123456", , , [8]], [, , "[3567]\\d{7}", , , , "33123456", , , [8]], [, , "800\\d{4}", , , , "8001234", , , [7]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "QA", 974, "00", , , , , , , , [[, "([28]\\d{2})(\\d{4})", "$1 $2", ["[28]"]], [, "([3-7]\\d{3})(\\d{4})", "$1 $2", ["[3-7]"]]], , [, , "2(?:[12]\\d|61)\\d{4}", , , , "2123456", , , [7]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        RE: [, [, , "[268]\\d{8}", , , , , , , [9]], [, , "262\\d{6}", , , , "262161234"], [, , "69(?:2\\d{2}|3(?:0[0-46]|1[013]|2[0-2]|3[039]|4[0-7]|5[05]|6[06]|7[07]|8[0-38]|9[0-479]))\\d{4}", , , , "692123456"], [, , "80\\d{7}", , , , "801234567"], [, , "89[1-37-9]\\d{6}", , , , "891123456"], [, , "8(?:1[019]|2[0156]|84|90)\\d{6}", , , , "810123456"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "RE", 262, "00", "0", , , "0", , , , [[, "([268]\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", , "0$1"]], , [, , , , , , , , , [-1]], 1, "262|69|8", [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        RO: [, [, , "[23]\\d{5,8}|[7-9]\\d{8}", , , , , , , [6, 9]], [, , "2(?:1(?:\\d{7}|9\\d{3})|[3-6](?:\\d{7}|\\d9\\d{2}))|3(?:1\\d{4}(?:\\d{3})?|[3-6]\\d{7})", , , , "211234567"], [, , "7(?:[0-8]\\d{2}|99\\d)\\d{5}", , , , "712345678", , , [9]], [, , "800\\d{6}", , , , "800123456", , , [9]], [, , "90[036]\\d{6}", , , , "900123456", , , [9]], [, , "801\\d{6}", , , , "801123456", , , [9]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "RO", 40, "00", "0", " int ", , "0", , , , [[, "(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[23]1"], "0$1"], [, "(\\d{2})(\\d{4})", "$1 $2", ["[23]1"], "0$1"], [, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[23][3-7]|[7-9]"], "0$1"], [, "(2\\d{2})(\\d{3})", "$1 $2", ["2[3-6]"], "0$1"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , "37\\d{7}", , , , "372123456", , , [9]], , , [, , , , , , , , , [-1]]],
        RS: [, [, , "[126-9]\\d{4,11}|3(?:[0-79]\\d{3,10}|8[2-9]\\d{2,9})", , , , , , , [6, 7, 8, 9, 10, 11, 12], [5]], [, , "(?:1(?:[02-9][2-9]|1[1-9])\\d|2(?:[0-24-7][2-9]\\d|[389](?:0[2-9]|[2-9]\\d))|3(?:[0-8][2-9]\\d|9(?:[2-9]\\d|0[2-9])))\\d{3,8}", , , , "10234567", , , [7, 8, 9, 10, 11, 12], [5, 6]], [, , "6(?:[0-689]|7\\d)\\d{6,7}", , , , "601234567", , , [8, 9, 10]], [, , "800\\d{3,9}", , , , "80012345"], [, , "(?:90[0169]|78\\d)\\d{3,7}", , , , "90012345"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "RS", 381, "00", "0", , , "0", , , , [[, "([23]\\d{2})(\\d{4,9})", "$1 $2", ["(?:2[389]|39)0"], "0$1"], [, "([1-3]\\d)(\\d{5,10})", "$1 $2", ["1|2(?:[0-24-7]|[389][1-9])|3(?:[0-8]|9[1-9])"], "0$1"], [, "(6\\d)(\\d{6,8})", "$1 $2", ["6"], "0$1"], [, "([89]\\d{2})(\\d{3,9})", "$1 $2", ["[89]"], "0$1"], [, "(7[26])(\\d{4,9})", "$1 $2", ["7[26]"], "0$1"], [, "(7[08]\\d)(\\d{4,9})", "$1 $2", ["7[08]"], "0$1"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , "7[06]\\d{4,10}", , , , "700123456"], , , [, , , , , , , , , [-1]]],
        RU: [, [, , "[3489]\\d{9}", , , , , , , [10]], [, , "(?:3(?:0[12]|4[1-35-79]|5[1-3]|65|8[1-58]|9[0145])|4(?:01|1[1356]|2[13467]|7[1-5]|8[1-7]|9[1-689])|8(?:1[1-8]|2[01]|3[13-6]|4[0-8]|5[15]|6[1-35-79]|7[1-37-9]))\\d{7}", , , , "3011234567"], [, , "9\\d{9}", , , , "9123456789"], [, , "80[04]\\d{7}", , , , "8001234567"], [, , "80[39]\\d{7}", , , , "8091234567"], [, , , , , , , , , [-1]], [, , "808\\d{7}", , , , "8081234567"], [, , , , , , , , , [-1]], "RU", 7, "810", "8", , , "8", , "8~10", , [[, "(\\d{3})(\\d{2})(\\d{2})", "$1-$2-$3", ["[1-79]"], "$1", , 1], [, "([3489]\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1 $2-$3-$4", ["[34689]"], "8 ($1)", , 1], [, "(7\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["7"], "8 ($1)", , 1]], [[, "([3489]\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1 $2-$3-$4", ["[34689]"], "8 ($1)", , 1], [, "(7\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["7"], "8 ($1)", , 1]], [, , , , , , , , , [-1]], 1, , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        RW: [, [, , "[027-9]\\d{7,8}", , , , , , , [8, 9]], [, , "2[258]\\d{7}|06\\d{6}", , , , "250123456"], [, , "7[238]\\d{7}", , , , "720123456", , , [9]], [, , "800\\d{6}", , , , "800123456", , , [9]], [, , "900\\d{6}", , , , "900123456", , , [9]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "RW", 250, "00", "0", , , "0", , , , [[, "(2\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["2"], "$1"], [, "([7-9]\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["[7-9]"], "0$1"], [, "(0\\d)(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["0"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        SA: [, [, , "1\\d{7,8}|(?:[2-467]|92)\\d{7}|5\\d{8}|8\\d{9}", , , , , , , [8, 9, 10], [7]], [, , "11\\d{7}|1?(?:2[24-8]|3[35-8]|4[3-68]|6[2-5]|7[235-7])\\d{6}", , , , "112345678", , , [8, 9], [7]], [, , "(?:5(?:[013-689]\\d|7[0-36-8])|811\\d)\\d{6}", , , , "512345678", , , [9, 10]], [, , "800\\d{7}", , , , "8001234567", , , [10]], [, , , , , , , , , [-1]], [, , "92[05]\\d{6}", , , , "920012345", , , [9]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "SA", 966, "00", "0", , , "0", , , , [[, "([1-467])(\\d{3})(\\d{4})", "$1 $2 $3", ["[1-467]"], "0$1"], [, "(1\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["1[1-467]"], "0$1"], [, "(5\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["5"], "0$1"], [, "(92\\d{2})(\\d{5})", "$1 $2", ["92"], "$1"], [, "(800)(\\d{3})(\\d{4})", "$1 $2 $3", ["80"], "$1"], [, "(811)(\\d{3})(\\d{3,4})", "$1 $2 $3", ["81"], "0$1"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        SB: [, [, , "[1-9]\\d{4,6}", , , , , , , [5, 7]], [, , "(?:1[4-79]|[23]\\d|4[0-2]|5[03]|6[0-37])\\d{3}", , , , "40123", , , [5]], [, , "48\\d{3}|7(?:30|[46-8]\\d|5[025-9]|9[0-5])\\d{4}|8[4-9]\\d{5}|9(?:1[2-9]|2[013-9]|3[0-2]|[46]\\d|5[0-46-9]|7[0-689]|8[0-79]|9[0-8])\\d{4}", , , , "7421234"], [, , "1[38]\\d{3}", , , , "18123", , , [5]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , "5[12]\\d{3}", , , , "51123", , , [5]], "SB", 677, "0[01]", , , , , , , , [[, "(\\d{2})(\\d{5})", "$1 $2", ["[7-9]"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        SC: [, [, , "[24689]\\d{5,6}", , , , , , , [7]], [, , "4[2-46]\\d{5}", , , , "4217123"], [, , "2[5-8]\\d{5}", , , , "2510123"], [, , "8000\\d{3}", , , , "8000000"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , "(?:64\\d|971)\\d{4}", , , , "6412345"], "SC", 248, "0(?:[02]|10?)", , , , , , "00", , [[, "(\\d)(\\d{3})(\\d{3})", "$1 $2 $3", ["[246]"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        SD: [, [, , "[19]\\d{8}", , , , , , , [9]], [, , "1(?:[125]\\d|8[3567])\\d{6}", , , , "121231234"], [, , "9[0-3569]\\d{7}", , , , "911231234"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "SD", 249, "00", "0", , , "0", , , , [[, "(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", , "0$1"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        SE: [, [, , "[1-35-9]\\d{5,11}|4\\d{6,8}", , , , , , , [6, 7, 8, 9, 10, 12]], [, , "1(?:0[1-8]\\d{6}|[136]\\d{5,7}|(?:2[0-35]|4[0-4]|5[0-25-9]|7[13-6]|[89]\\d)\\d{5,6})|2(?:[136]\\d{5,7}|(?:2[0-7]|4[0136-8]|5[0138]|7[018]|8[01]|9[0-57])\\d{5,6})|3(?:[356]\\d{5,7}|(?:0[0-4]|1\\d|2[0-25]|4[056]|7[0-2]|8[0-3]|9[023])\\d{5,6})|4(?:[0246]\\d{5,7}|(?:1[013-8]|3[0135]|5[14-79]|7[0-246-9]|8[0156]|9[0-689])\\d{5,6})|5(?:0[0-6]|[15][0-5]|2[0-68]|3[0-4]|4\\d|6[03-5]|7[013]|8[0-79]|9[01])\\d{5,6}|6(?:[03]\\d{5,7}|(?:1[1-3]|2[0-4]|4[02-57]|5[0-37]|6[0-3]|7[0-2]|8[0247]|9[0-356])\\d{5,6})|8\\d{6,8}|9(?:0[1-9]\\d{4,6}|(?:1[0-68]|2\\d|3[02-5]|4[0-3]|5[0-4]|[68][01]|7[0135-8])\\d{5,6})", , , , "8123456", , , [7, 8, 9]], [, , "7[02369]\\d{7}", , , , "701234567", , , [9]], [, , "20\\d{4,7}", , , , "20123456", , , [6, 7, 8, 9]], [, , "649\\d{6}|9(?:00|39|44)[1-8]\\d{3,6}", , , , "9001234567", , , [7, 8, 9, 10]], [, , "77(?:0\\d{3}(?:\\d{3})?|[1-7]\\d{6})", , , , "771234567", , , [6, 9]], [, , "75[1-8]\\d{6}", , , , "751234567", , , [9]], [, , , , , , , , , [-1]], "SE", 46, "00", "0", , , "0", , , , [[, "(8)(\\d{2,3})(\\d{2,3})(\\d{2})", "$1-$2 $3 $4", ["8"], "0$1"], [, "([1-69]\\d)(\\d{2,3})(\\d{2})(\\d{2})", "$1-$2 $3 $4", ["1[013689]|2[0136]|3[1356]|4[0246]|54|6[03]|90"], "0$1"], [, "([1-469]\\d)(\\d{3})(\\d{2})", "$1-$2 $3", ["1[136]|2[136]|3[356]|4[0246]|6[03]|90"], "0$1"], [, "(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1-$2 $3 $4", ["1[2457]|2(?:[247-9]|5[0138])|3[0247-9]|4[1357-9]|5[0-35-9]|6(?:[124-689]|7[0-2])|9(?:[125-8]|3[0-5]|4[0-3])"], "0$1"], [, "(\\d{3})(\\d{2,3})(\\d{2})", "$1-$2 $3", ["1[2457]|2(?:[247-9]|5[0138])|3[0247-9]|4[1357-9]|5[0-35-9]|6(?:[124-689]|7[0-2])|9(?:[125-8]|3[0-5]|4[0-3])"], "0$1"], [, "(7\\d)(\\d{3})(\\d{2})(\\d{2})", "$1-$2 $3 $4", ["7"], "0$1"], [, "(77)(\\d{2})(\\d{2})", "$1-$2$3", ["7"], "0$1"], [, "(20)(\\d{2,3})(\\d{2})", "$1-$2 $3", ["20"], "0$1"], [, "(9[034]\\d)(\\d{2})(\\d{2})(\\d{3})", "$1-$2 $3 $4", ["9[034]"], "0$1"], [, "(9[034]\\d)(\\d{4})", "$1-$2", ["9[034]"], "0$1"], [, "(\\d{3})(\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1-$2 $3 $4 $5", ["25[245]|67[3-6]"], "0$1"]], [[, "(8)(\\d{2,3})(\\d{2,3})(\\d{2})", "$1 $2 $3 $4", ["8"]], [, "([1-69]\\d)(\\d{2,3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["1[013689]|2[0136]|3[1356]|4[0246]|54|6[03]|90"]], [, "([1-469]\\d)(\\d{3})(\\d{2})", "$1 $2 $3", ["1[136]|2[136]|3[356]|4[0246]|6[03]|90"]], [, "(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["1[2457]|2(?:[247-9]|5[0138])|3[0247-9]|4[1357-9]|5[0-35-9]|6(?:[124-689]|7[0-2])|9(?:[125-8]|3[0-5]|4[0-3])"]], [, "(\\d{3})(\\d{2,3})(\\d{2})", "$1 $2 $3", ["1[2457]|2(?:[247-9]|5[0138])|3[0247-9]|4[1357-9]|5[0-35-9]|6(?:[124-689]|7[0-2])|9(?:[125-8]|3[0-5]|4[0-3])"]], [, "(7\\d)(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["7"]], [, "(77)(\\d{2})(\\d{2})", "$1 $2 $3", ["7"]], [, "(20)(\\d{2,3})(\\d{2})", "$1 $2 $3", ["20"]], [, "(9[034]\\d)(\\d{2})(\\d{2})(\\d{3})", "$1 $2 $3 $4", ["9[034]"]], [, "(9[034]\\d)(\\d{4})", "$1 $2", ["9[034]"]], [, "(\\d{3})(\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4 $5", ["25[245]|67[3-6]"]]], [, , "74[02-9]\\d{6}", , , , "740123456", , , [9]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , "(?:25[245]|67[3-6])\\d{9}", , , , "254123456789", , , [12]]],
        SG: [, [, , "[36]\\d{7}|[17-9]\\d{7,10}", , , , , , , [8, 10, 11]], [, , "6[1-9]\\d{6}", , , , "61234567", , , [8]], [, , "(?:8[1-8]|9[0-8])\\d{6}", , , , "81234567", , , [8]], [, , "1?800\\d{7}", , , , "18001234567", , , [10, 11]], [, , "1900\\d{7}", , , , "19001234567", , , [11]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , "3[12]\\d{6}", , , , "31234567", , , [8]], "SG", 65, "0[0-3]\\d", , , , , , , , [[, "([3689]\\d{3})(\\d{4})", "$1 $2", ["[369]|8[1-9]"]], [, "(1[89]00)(\\d{3})(\\d{4})", "$1 $2 $3", ["1[89]"]], [, "(7000)(\\d{4})(\\d{3})", "$1 $2 $3", ["70"]], [, "(800)(\\d{3})(\\d{4})", "$1 $2 $3", ["80"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , "7000\\d{7}", , , , "70001234567", , , [11]], , , [, , , , , , , , , [-1]]],
        SH: [, [, , "[256]\\d{4}", , , , , , , [4, 5]], [, , "2(?:[0-57-9]\\d|6[4-9])\\d{2}", , , , "22158"], [, , "[56]\\d{4}", , , , "51234", , , [5]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , "262\\d{2}", , , , "26212", , , [5]], "SH", 290, "00", , , , , , , , , , [, , , , , , , , , [-1]], 1, , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        SI: [, [, , "[1-7]\\d{6,7}|[89]\\d{4,7}", , , , , , , [5, 6, 7, 8]], [, , "(?:1\\d|[25][2-8]|3[24-8]|4[24-8]|7[3-8])\\d{6}", , , , "11234567", , , [8], [7]], [, , "(?:[37][01]\\d|4[0139]\\d|51\\d|6(?:[48]\\d|9[69]))\\d{5}", , , , "31234567", , , [8]], [, , "80\\d{4,6}", , , , "80123456", , , [6, 7, 8]], [, , "90\\d{4,6}|89[1-3]\\d{2,5}", , , , "90123456"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , "(?:59|8[1-3])\\d{6}", , , , "59012345", , , [8]], "SI", 386, "00", "0", , , "0", , , , [[, "(\\d)(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[12]|3[24-8]|4[24-8]|5[2-8]|7[3-8]"], "(0$1)"], [, "([3-7]\\d)(\\d{3})(\\d{3})", "$1 $2 $3", ["[37][01]|4[0139]|51|6"], "0$1"], [, "([89][09])(\\d{3,6})", "$1 $2", ["[89][09]"], "0$1"], [, "([58]\\d{2})(\\d{5})", "$1 $2", ["59|8[1-3]"], "0$1"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        SJ: [, [, , "0\\d{4}|[45789]\\d{7}", , , , , , , [5, 8]], [, , "79\\d{6}", , , , "79123456", , , [8]], [, , "(?:4[015-8]|5[89]|9\\d)\\d{6}", , , , "41234567", , , [8]], [, , "80[01]\\d{5}", , , , "80012345", , , [8]], [, , "82[09]\\d{5}", , , , "82012345", , , [8]], [, , "810(?:0[0-6]|[2-8]\\d)\\d{3}", , , , "81021234", , , [8]], [, , "880\\d{5}", , , , "88012345", , , [8]], [, , "85[0-5]\\d{5}", , , , "85012345", , , [8]], "SJ", 47, "00", , , , , , , , , , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , "0\\d{4}|81(?:0(?:0[7-9]|1\\d)|5\\d{2})\\d{3}", , , , "01234"], , , [, , "81[23]\\d{5}", , , , "81212345", , , [8]]],
        SK: [, [, , "(?:[2-68]\\d{5,8}|9\\d{6,8})", , , , , , , [6, 7, 9]], [, , "2(?:1(?:6\\d{3,4}|7\\d{3})|[2-9]\\d{7})|[3-5][1-8](?:1(?:6\\d{2,3}|7\\d{3})|\\d{7})", , , , "221234567"], [, , "9(?:0(?:[1-8]\\d|9[1-9])|(?:1[0-24-9]|[45]\\d)\\d)\\d{5}", , , , "912123456", , , [9]], [, , "800\\d{6}", , , , "800123456", , , [9]], [, , "9(?:[78]\\d{7}|00\\d{6})", , , , "900123456", , , [9]], [, , "8[5-9]\\d{7}", , , , "850123456", , , [9]], [, , , , , , , , , [-1]], [, , "6(?:02|5[0-4]|9[0-6])\\d{6}", , , , "690123456", , , [9]], "SK", 421, "00", "0", , , "0", , , , [[, "(2)(1[67])(\\d{3,4})", "$1 $2 $3", ["21[67]"], "0$1"], [, "([3-5]\\d)(1[67])(\\d{2,3})", "$1 $2 $3", ["[3-5]"], "0$1"], [, "(2)(\\d{3})(\\d{3})(\\d{2})", "$1/$2 $3 $4", ["2"], "0$1"], [, "([3-5]\\d)(\\d{3})(\\d{2})(\\d{2})", "$1/$2 $3 $4", ["[3-5]"], "0$1"], [, "([689]\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["[689]"], "0$1"], [, "(9090)(\\d{3})", "$1 $2", ["9090"], "0$1"]], , [, , "9090\\d{3}", , , , "9090123", , , [7]], , , [, , "(?:602|8(?:00|[5-9]\\d)|9(?:00|[78]\\d))\\d{6}|9090\\d{3}", , , , "800123456", , , [7, 9]], [, , "96\\d{7}", , , , "961234567", , , [9]], , , [, , , , , , , , , [-1]]],
        SL: [, [, , "[2-9]\\d{7}", , , , , , , [8], [6]], [, , "[235]2[2-4][2-9]\\d{4}", , , , "22221234", , , , [6]], [, , "(?:2[15]|3[03-5]|4[04]|5[05]|66|7[6-9]|8[08]|99)\\d{6}", , , , "25123456"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "SL", 232, "00", "0", , , "0", , , , [[, "(\\d{2})(\\d{6})", "$1 $2", , "(0$1)"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        SM: [, [, , "[05-7]\\d{7,9}", , , , , , , [8, 10], [6]], [, , "0549(?:8[0157-9]|9\\d)\\d{4}", , , , "0549886377", , , [10], [6]], [, , "6[16]\\d{6}", , , , "66661212", , , [8]], [, , , , , , , , , [-1]], [, , "7[178]\\d{6}", , , , "71123456", , , [8]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , "5[158]\\d{6}", , , , "58001110", , , [8]], "SM", 378, "00", , , , "(?:0549)?([89]\\d{5})", "0549$1", , , [[, "(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[5-7]"]], [, "(0549)(\\d{6})", "$1 $2", ["0"]], [, "(\\d{6})", "0549 $1", ["[89]"]]], [[, "(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[5-7]"]], [, "(0549)(\\d{6})", "($1) $2", ["0"]], [, "(\\d{6})", "(0549) $1", ["[89]"]]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        SN: [, [, , "[3789]\\d{8}", , , , , , , [9]], [, , "3(?:0(?:1[0-2]|80)|282|3(?:8[1-9]|9[3-9])|611)\\d{5}", , , , "301012345"], [, , "7(?:[06-8]\\d|21|90)\\d{6}", , , , "701234567"], [, , "800\\d{6}", , , , "800123456"], [, , "88[4689]\\d{6}", , , , "884123456"], [, , "81[02468]\\d{6}", , , , "810123456"], [, , , , , , , , , [-1]], [, , "39[01]\\d{6}|3392\\d{5}|93330\\d{4}", , , , "933301234"], "SN", 221, "00", , , , , , , , [[, "(\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[379]"]], [, "(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["8"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        SO: [, [, , "[1-9]\\d{5,8}", , , , , , , [6, 7, 8, 9]], [, , "(?:1\\d{1,2}|2[0-79]\\d|3[0-46-8]?\\d|4[0-7]?\\d|59\\d|8[125])\\d{4}", , , , "4012345", , , [6, 7]], [, , "(?:15\\d|2(?:4\\d|8)|3[59]\\d{2}|4[89]\\d{2}|6[1-9]?\\d{2}|7(?:[1-8]\\d|9\\d{1,2})|8[08]\\d{2}|9(?:0[67]|[2-9])\\d)\\d{5}", , , , "71123456", , , [7, 8, 9]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "SO", 252, "00", "0", , , "0", , , , [[, "(\\d{6})", "$1", ["[134]"]], [, "(\\d)(\\d{6})", "$1 $2", ["2[0-79]|[13-5]"]], [, "(\\d)(\\d{7})", "$1 $2", ["24|[67]"]], [, "(\\d{2})(\\d{4})", "$1 $2", ["8[125]"]], [, "(\\d{2})(\\d{5,7})", "$1 $2", ["15|28|6[1-35-9]|799|9[2-9]"]], [, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["3[59]|4[89]|6[24-6]|79|8[08]|90"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        SR: [, [, , "[2-8]\\d{5,6}", , , , , , , [6, 7]], [, , "(?:2[1-3]|3[0-7]|4\\d|5[2-58]|68\\d)\\d{4}", , , , "211234"], [, , "(?:7[124-7]|8[1-9])\\d{5}", , , , "7412345", , , [7]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , "56\\d{4}", , , , "561234", , , [6]], "SR", 597, "00", , , , , , , , [[, "(\\d{3})(\\d{3})", "$1-$2", ["[2-4]|5[2-58]"]], [, "(\\d{2})(\\d{2})(\\d{2})", "$1-$2-$3", ["56"]], [, "(\\d{3})(\\d{4})", "$1-$2", ["[6-8]"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        SS: [, [, , "[19]\\d{8}", , , , , , , [9]], [, , "18\\d{7}", , , , "181234567"], [, , "(?:12|9[1257])\\d{7}", , , , "977123456"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "SS", 211, "00", "0", , , "0", , , , [[, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", , "0$1"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        ST: [, [, , "[29]\\d{6}", , , , , , , [7]], [, , "22\\d{5}", , , , "2221234"], [, , "9(?:0(?:0[5-9]|[1-9]\\d)|[89]\\d{2})\\d{3}", , , , "9812345"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "ST", 239, "00", , , , , , , , [[, "(\\d{3})(\\d{4})", "$1 $2"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        SV: [, [, , "[267]\\d{7}|[89]\\d{6}(?:\\d{4})?", , , , , , , [7, 8, 11]], [, , "2[1-6]\\d{6}", , , , "21234567", , , [8]], [, , "[67]\\d{7}", , , , "70123456", , , [8]], [, , "800\\d{4}(?:\\d{4})?", , , , "8001234", , , [7, 11]], [, , "900\\d{4}(?:\\d{4})?", , , , "9001234", , , [7, 11]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "SV", 503, "00", , , , , , , , [[, "(\\d{4})(\\d{4})", "$1 $2", ["[267]"]], [, "(\\d{3})(\\d{4})", "$1 $2", ["[89]"]], [, "(\\d{3})(\\d{4})(\\d{4})", "$1 $2 $3", ["[89]"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        SX: [, [, , "[5789]\\d{9}", , , , , , , [10], [7]], [, , "7215(?:4[2-8]|8[239]|9[056])\\d{4}", , , , "7215425678", , , , [7]], [, , "7215(?:1[02]|2\\d|5[034679]|8[014-8])\\d{4}", , , , "7215205678", , , , [7]], [, , "8(?:00|33|44|55|66|77|88)[2-9]\\d{6}", , , , "8002123456"], [, , "900[2-9]\\d{6}", , , , "9002123456"], [, , , , , , , , , [-1]], [, , "5(?:00|22|33|44|66|77|88)[2-9]\\d{6}", , , , "5002345678"], [, , , , , , , , , [-1]], "SX", 1, "011", "1", , , "1", , , , , , [, , , , , , , , , [-1]], , "721", [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        SY: [, [, , "[1-59]\\d{7,8}", , , , , , , [8, 9], [6, 7]], [, , "(?:1(?:1\\d?|4\\d|[2356])|2(?:1\\d?|[235])|3(?:[13]\\d|4)|4[13]|5[1-3])\\d{6}", , , , "112345678", , , , [6, 7]], [, , "9(?:22|[3-589]\\d|6[024-9])\\d{6}", , , , "944567890", , , [9]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "SY", 963, "00", "0", , , "0", , , , [[, "(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[1-5]"], "0$1", , 1], [, "(9\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["9"], "0$1", , 1]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        SZ: [, [, , "[027]\\d{7}", , , , , , , [8]], [, , "2[2-9]\\d{6}", , , , "22171234"], [, , "7[6-9]\\d{6}", , , , "76123456"], [, , "0800\\d{4}", , , , "08001234"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "SZ", 268, "00", , , , , , , , [[, "(\\d{4})(\\d{4})", "$1 $2", ["[027]"]]], , [, , , , , , , , , [-1]], , , [, , "0800\\d{4}", , , , "08001234"], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        TA: [, [, , "8\\d{3}", , , , , , , [4]], [, , "8\\d{3}", , , , "8999"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "TA", 290, "00", , , , , , , , , , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        TC: [, [, , "[5689]\\d{9}", , , , , , , [10], [7]], [, , "649(?:712|9(?:4\\d|50))\\d{4}", , , , "6497121234", , , , [7]], [, , "649(?:2(?:3[129]|4[1-7])|3(?:3[1-389]|4[1-8])|4[34][1-3])\\d{4}", , , , "6492311234", , , , [7]], [, , "8(?:00|33|44|55|66|77|88)[2-9]\\d{6}", , , , "8002345678"], [, , "900[2-9]\\d{6}", , , , "9002345678"], [, , , , , , , , , [-1]], [, , "5(?:00|22|33|44|66|77|88)[2-9]\\d{6}", , , , "5002345678"], [, , "64971[01]\\d{4}", , , , "6497101234", , , , [7]], "TC", 1, "011", "1", , , "1", , , , , , [, , , , , , , , , [-1]], , "649", [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        TD: [, [, , "[2679]\\d{7}", , , , , , , [8]], [, , "22(?:[3789]0|5[0-5]|6[89])\\d{4}", , , , "22501234"], [, , "(?:6[023568]\\d|77\\d|9\\d{2})\\d{5}", , , , "63012345"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "TD", 235, "00|16", , , , , , "00", , [[, "(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        TG: [, [, , "[29]\\d{7}", , , , , , , [8]], [, , "2(?:2[2-7]|3[23]|44|55|66|77)\\d{5}", , , , "22212345"], [, , "9[0-36-9]\\d{6}", , , , "90112345"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "TG", 228, "00", , , , , , , , [[, "(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[29]"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        TH: [, [, , "1\\d{8,9}|[2-9]\\d{7,8}", , , , , , , [8, 9, 10]], [, , "(?:2\\d|3[2-9]|4[2-5]|5[2-6]|7[3-7])\\d{6}", , , , "21234567", , , [8]], [, , "(?:14|6[1-6]|[89]\\d)\\d{7}", , , , "812345678", , , [9]], [, , "1800\\d{6}", , , , "1800123456", , , [10]], [, , "1900\\d{6}", , , , "1900123456", , , [10]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , "6[08]\\d{7}", , , , "601234567", , , [9]], "TH", 66, "00", "0", , , "0", , , , [[, "(2)(\\d{3})(\\d{4})", "$1 $2 $3", ["2"], "0$1"], [, "([13-9]\\d)(\\d{3})(\\d{3,4})", "$1 $2 $3", ["14|[3-9]"], "0$1"], [, "(1[89]00)(\\d{3})(\\d{3})", "$1 $2 $3", ["1"], "$1"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        TJ: [, [, , "[3-57-9]\\d{8}", , , , , , , [9], [3, 5, 7]], [, , "(?:3(?:1[3-5]|2[245]|3[12]|4[24-7]|5[25]|72)|4(?:46|74|87))\\d{6}", , , , "372123456", , , , [3, 5, 7]], [, , "(?:41[18]|(?:5[05]|77|88|9[0-35-9])\\d)\\d{6}", , , , "917123456"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "TJ", 992, "810", "8", , , "8", , "8~10", , [[, "([349]\\d{2})(\\d{2})(\\d{4})", "$1 $2 $3", ["[34]7|91[78]"], "$1", , 1], [, "([457-9]\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["4[148]|[578]|9(?:1[59]|[0235-9])"], "$1", , 1], [, "(331700)(\\d)(\\d{2})", "$1 $2 $3", ["331", "3317", "33170", "331700"], "$1", , 1], [, "(\\d{4})(\\d)(\\d{4})", "$1 $2 $3", ["3[1-5]", "3(?:[1245]|3(?:[02-9]|1[0-589]))"], "$1", , 1]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        TK: [, [, , "[2-47]\\d{3,6}", , , , , , , [4, 5, 6, 7]], [, , "(?:2[2-4]|[34]\\d)\\d{2,5}", , , , "3101"], [, , "7[2-4]\\d{2,5}", , , , "7290"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "TK", 690, "00", , , , , , , , , , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        TL: [, [, , "[2-489]\\d{6}|7\\d{6,7}", , , , , , , [7, 8]], [, , "(?:2[1-5]|3[1-9]|4[1-4])\\d{5}", , , , "2112345", , , [7]], [, , "7[3-8]\\d{6}", , , , "77212345", , , [8]], [, , "80\\d{5}", , , , "8012345", , , [7]], [, , "90\\d{5}", , , , "9012345", , , [7]], [, , , , , , , , , [-1]], [, , "70\\d{5}", , , , "7012345", , , [7]], [, , , , , , , , , [-1]], "TL", 670, "00", , , , , , , , [[, "(\\d{3})(\\d{4})", "$1 $2", ["[2-489]|70"]], [, "(\\d{4})(\\d{4})", "$1 $2", ["7[3-8]"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        TM: [, [, , "[1-6]\\d{7}", , , , , , , [8]], [, , "(?:1(?:2\\d|3[1-9])|2(?:22|4[0-35-8])|3(?:22|4[03-9])|4(?:22|3[128]|4\\d|6[15])|5(?:22|5[7-9]|6[014-689]))\\d{5}", , , , "12345678"], [, , "6[1-9]\\d{6}", , , , "66123456"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "TM", 993, "810", "8", , , "8", , "8~10", , [[, "(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2-$3-$4", ["12"], "(8 $1)"], [, "(\\d{2})(\\d{6})", "$1 $2", ["6"], "8 $1"], [, "(\\d{3})(\\d)(\\d{2})(\\d{2})", "$1 $2-$3-$4", ["13|[2-5]"], "(8 $1)"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        TN: [, [, , "[2-57-9]\\d{7}", , , , , , , [8]], [, , "3(?:[012]\\d|6[0-4]|91)\\d{5}|7\\d{7}|81200\\d{3}", , , , "71234567"], [, , "(?:[259]\\d|4[0-6])\\d{6}", , , , "20123456"], [, , "8010\\d{4}", , , , "80101234"], [, , "88\\d{6}", , , , "88123456"], [, , "8[12]10\\d{4}", , , , "81101234"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "TN", 216, "00", , , , , , , , [[, "(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        TO: [, [, , "[02-8]\\d{4,6}", , , , , , , [5, 7]], [, , "(?:2\\d|3[1-8]|4[1-4]|[56]0|7[0149]|8[05])\\d{3}", , , , "20123", , , [5]], [, , "(?:7[578]|8[47-9])\\d{5}", , , , "7715123", , , [7]], [, , "0800\\d{3}", , , , "0800222", , , [7]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "TO", 676, "00", , , , , , , , [[, "(\\d{2})(\\d{3})", "$1-$2", ["[1-6]|7[0-4]|8[05]"]], [, "(\\d{3})(\\d{4})", "$1 $2", ["7[5-9]|8[47-9]"]], [, "(\\d{4})(\\d{3})", "$1 $2", ["0"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        TR: [, [, , "[2-589]\\d{9}|444\\d{4}", , , , , , , [7, 10]], [, , "(?:2(?:[13][26]|[28][2468]|[45][268]|[67][246])|3(?:[13][28]|[24-6][2468]|[78][02468]|92)|4(?:[16][246]|[23578][2468]|4[26]))\\d{7}", , , , "2123456789", , , [10]], [, , "5(?:(?:0[1-7]|22|[34]\\d|5[1-59]|9[246])\\d{2}|6161)\\d{5}", , , , "5012345678", , , [10]], [, , "800\\d{7}", , , , "8001234567", , , [10]], [, , "900\\d{7}", , , , "9001234567", , , [10]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "TR", 90, "00", "0", , , "0", , , , [[, "(\\d{3})(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[23]|4(?:[0-35-9]|4[0-35-9])"], "(0$1)", , 1], [, "(\\d{3})(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["5[02-69]"], "0$1", , 1], [, "(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["51|[89]"], "0$1", , 1], [, "(444)(\\d{1})(\\d{3})", "$1 $2 $3", ["444"]]], , [, , "512\\d{7}", , , , "5123456789", , , [10]], , , [, , "444\\d{4}", , , , "4441444", , , [7]], [, , "444\\d{4}|850\\d{7}", , , , "4441444"], , , [, , , , , , , , , [-1]]],
        TT: [, [, , "[589]\\d{9}", , , , , , , [10], [7]], [, , "868(?:2(?:01|[23]\\d)|6(?:0[79]|1[02-8]|2[1-9]|[3-69]\\d|7[0-79])|82[124])\\d{4}", , , , "8682211234", , , , [7]], [, , "868(?:2(?:6[6-9]|[789]\\d)|3(?:0[1-9]|1[02-9]|[2-9]\\d)|4[6-9]\\d|6(?:20|78|8\\d)|7(?:0[1-9]|1[02-9]|[2-9]\\d))\\d{4}", , , , "8682911234", , , , [7]], [, , "8(?:00|33|44|55|66|77|88)[2-9]\\d{6}", , , , "8002345678"], [, , "900[2-9]\\d{6}", , , , "9002345678"], [, , , , , , , , , [-1]], [, , "5(?:00|22|33|44|66|77|88)[2-9]\\d{6}", , , , "5002345678"], [, , , , , , , , , [-1]], "TT", 1, "011", "1", , , "1", , , , , , [, , , , , , , , , [-1]], , "868", [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , "868619\\d{4}", , , , "8686191234", , , , [7]]],
        TV: [, [, , "[279]\\d{4,6}", , , , , , , [5, 6, 7]], [, , "2[02-9]\\d{3}", , , , "20123", , , [5]], [, , "(?:70\\d|90)\\d{4}", , , , "901234", , , [6, 7]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "TV", 688, "00", , , , , , , , , , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        TW: [, [, , "2\\d{6,8}|[3-689]\\d{7,8}|7\\d{7,9}", , , , , , , [7, 8, 9, 10]], [, , "2(?:[235-8]\\d{7}|4\\d{6,7})|[3-8]\\d{7,8}", , , , "221234567", , , [8, 9]], [, , "9\\d{8}", , , , "912345678", , , [9]], [, , "800\\d{6}", , , , "800123456", , , [9]], [, , "20(?:2|[013-9]\\d{2})\\d{4}", , , , "203123456", , , [7, 9]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , "70\\d{8}", , , , "7012345678", , , [10]], "TW", 886, "0(?:0[25679]|19)", "0", "#", , "0", , , , [[, "(20)(\\d)(\\d{4})", "$1 $2 $3", ["202"], "0$1"], [, "(20)(\\d{3})(\\d{4})", "$1 $2 $3", ["20[013-9]"], "0$1"], [, "([2-8])(\\d{3,4})(\\d{4})", "$1 $2 $3", ["2[23-8]|[3-6]|[78][1-9]"], "0$1"], [, "([89]\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["80|9"], "0$1"], [, "(70)(\\d{4})(\\d{4})", "$1 $2 $3", ["70"], "0$1"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        TZ: [, [, , "\\d{9}", , , , , , , [7, 9]], [, , "2[2-8]\\d{7}", , , , "222345678"], [, , "(?:6[2-9]|7[13-9])\\d{7}", , , , "621234567", , , [9]], [, , "80[08]\\d{6}", , , , "800123456", , , [9]], [, , "90\\d{7}", , , , "900123456", , , [9]], [, , "8(?:40|6[01])\\d{6}", , , , "840123456", , , [9]], [, , , , , , , , , [-1]], [, , "41\\d{7}", , , , "412345678", , , [9]], "TZ", 255, "00[056]", "0", , , "0", , , , [[, "([24]\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["[24]"], "0$1"], [, "([67]\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["[67]"], "0$1"], [, "([89]\\d{2})(\\d{2})(\\d{4})", "$1 $2 $3", ["[89]"], "0$1"]], , [, , , , , , , , , [-1]], , , [, , "(?:8(?:[04]0|6[01])|90\\d)\\d{6}", , , , "800123456", , , [9]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        UA: [, [, , "[3-9]\\d{8}", , , , , , , [9], [5, 6, 7]], [, , "(?:3[1-8]|4[13-8]|5[1-7]|6[12459])\\d{7}", , , , "311234567", , , , [5, 6, 7]], [, , "(?:39|50|6[36-8]|7[1-3]|9[1-9])\\d{7}", , , , "391234567"], [, , "800\\d{6}", , , , "800123456"], [, , "900[2-49]\\d{5}", , , , "900212345"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , "89\\d{7}", , , , "891234567"], "UA", 380, "00", "0", , , "0", , "0~0", , [[, "([3-9]\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["[38]9|4(?:[45][0-5]|87)|5(?:0|6[37]|7[37])|6[36-8]|7|9[1-9]", "[38]9|4(?:[45][0-5]|87)|5(?:0|6(?:3[14-7]|7)|7[37])|6[36-8]|7|9[1-9]"], "0$1"], [, "([3-689]\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["3[1-8]2|4[13678]2|5(?:[12457]2|6[24])|6(?:[49]2|[12][29]|5[24])|8[0-8]|90", "3(?:[1-46-8]2[013-9]|52)|4(?:[1378]2|62[013-9])|5(?:[12457]2|6[24])|6(?:[49]2|[12][29]|5[24])|8[0-8]|90"], "0$1"], [, "([3-6]\\d{3})(\\d{5})", "$1 $2", ["3(?:5[013-9]|[1-46-8])|4(?:[137][013-9]|6|[45][6-9]|8[4-6])|5(?:[1245][013-9]|6[0135-9]|3|7[4-6])|6(?:[49][013-9]|5[0135-9]|[12][13-8])", "3(?:5[013-9]|[1-46-8](?:22|[013-9]))|4(?:[137][013-9]|6(?:[013-9]|22)|[45][6-9]|8[4-6])|5(?:[1245][013-9]|6(?:3[02389]|[015689])|3|7[4-6])|6(?:[49][013-9]|5[0135-9]|[12][13-8])"], "0$1"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        UG: [, [, , "\\d{9}", , , , , , , [9], [5, 6, 7]], [, , "20(?:[0147]\\d{2}|2(?:40|[5-9]\\d)|3(?:0[0-4]|[23]\\d)|5[0-4]\\d|6[035-9]\\d|8[0-2]\\d)\\d{4}|[34]\\d{8}", , , , "312345678", , , , [5, 6, 7]], [, , "7(?:(?:0[0-7]|[15789]\\d|30|4[0-4])\\d|2(?:[03]\\d|60))\\d{5}", , , , "712345678"], [, , "800[123]\\d{5}", , , , "800123456"], [, , "90[123]\\d{6}", , , , "901123456"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "UG", 256, "00[057]", "0", , , "0", , , , [[, "(\\d{3})(\\d{6})", "$1 $2", ["[7-9]|20(?:[013-8]|2[5-9])|4(?:6[45]|[7-9])"], "0$1"], [, "(\\d{2})(\\d{7})", "$1 $2", ["3|4(?:[1-5]|6[0-36-9])"], "0$1"], [, "(2024)(\\d{5})", "$1 $2", ["2024"], "0$1"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        US: [, [, , "[2-9]\\d{9}", , , , , , , [10], [7]], [, , "(?:2(?:0[1-35-9]|1[02-9]|2[04589]|3[149]|4[08]|5[1-46]|6[0279]|7[026]|8[13])|3(?:0[1-57-9]|1[02-9]|2[0135]|3[0-24679]|4[67]|5[12]|6[014]|8[056])|4(?:0[124-9]|1[02-579]|2[3-5]|3[0245]|4[0235]|58|6[39]|7[0589]|8[04])|5(?:0[1-57-9]|1[0235-8]|20|3[0149]|4[01]|5[19]|6[1-47]|7[013-5]|8[056])|6(?:0[1-35-9]|1[024-9]|2[03689]|3[016]|4[16]|5[017]|6[0-279]|78|8[012])|7(?:0[1-46-8]|1[02-9]|2[0457]|3[1247]|4[037]|5[47]|6[02359]|7[02-59]|8[156])|8(?:0[1-68]|1[02-8]|28|3[0-25]|4[3578]|5[046-9]|6[02-5]|7[028])|9(?:0[1346-9]|1[02-9]|2[0589]|3[014678]|4[0179]|5[12469]|7[0-3589]|8[04-69]))[2-9]\\d{6}", , , , "2015550123", , , , [7]], [, , "(?:2(?:0[1-35-9]|1[02-9]|2[04589]|3[149]|4[08]|5[1-46]|6[0279]|7[026]|8[13])|3(?:0[1-57-9]|1[02-9]|2[0135]|3[0-24679]|4[67]|5[12]|6[014]|8[056])|4(?:0[124-9]|1[02-579]|2[3-5]|3[0245]|4[0235]|58|6[39]|7[0589]|8[04])|5(?:0[1-57-9]|1[0235-8]|20|3[0149]|4[01]|5[19]|6[1-47]|7[013-5]|8[056])|6(?:0[1-35-9]|1[024-9]|2[03689]|3[016]|4[16]|5[017]|6[0-279]|78|8[012])|7(?:0[1-46-8]|1[02-9]|2[0457]|3[1247]|4[037]|5[47]|6[02359]|7[02-59]|8[156])|8(?:0[1-68]|1[02-8]|28|3[0-25]|4[3578]|5[046-9]|6[02-5]|7[028])|9(?:0[1346-9]|1[02-9]|2[0589]|3[014678]|4[0179]|5[12469]|7[0-3589]|8[04-69]))[2-9]\\d{6}", , , , "2015550123", , , , [7]], [, , "8(?:00|33|44|55|66|77|88)[2-9]\\d{6}", , , , "8002345678"], [, , "900[2-9]\\d{6}", , , , "9002345678"], [, , , , , , , , , [-1]], [, , "5(?:00|22|33|44|66|77|88)[2-9]\\d{6}", , , , "5002345678"], [, , , , , , , , , [-1]], "US", 1, "011", "1", , , "1", , , 1, [[, "(\\d{3})(\\d{4})", "$1-$2", , , , 1], [, "(\\d{3})(\\d{3})(\\d{4})", "($1) $2-$3", , , , 1]], [[, "(\\d{3})(\\d{3})(\\d{4})", "$1-$2-$3"]], [, , , , , , , , , [-1]], 1, , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        UY: [, [, , "[2489]\\d{6,7}", , , , , , , [7, 8]], [, , "2\\d{7}|4[2-7]\\d{6}", , , , "21231234", , , [8], [7]], [, , "9[1-9]\\d{6}", , , , "94231234", , , [8]], [, , "80[05]\\d{4}", , , , "8001234", , , [7]], [, , "90[0-8]\\d{4}", , , , "9001234", , , [7]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "UY", 598, "0(?:1[3-9]\\d|0)", "0", " int. ", , "0", , "00", , [[, "(\\d{4})(\\d{4})", "$1 $2", ["[24]"]], [, "(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["9[1-9]"], "0$1"], [, "(\\d{3})(\\d{4})", "$1 $2", ["[89]0"], "0$1"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        UZ: [, [, , "[679]\\d{8}", , , , , , , [9], [7]], [, , "(?:6(?:1(?:22|3[124]|4[1-4]|5[123578]|64)|2(?:22|3[0-57-9]|41)|5(?:22|3[3-7]|5[024-8])|6\\d{2}|7(?:[23]\\d|7[69])|9(?:22|4[1-8]|6[135]))|7(?:0(?:5[4-9]|6[0146]|7[12456]|9[135-8])|1[12]\\d|2(?:22|3[1345789]|4[123579]|5[14])|3(?:2\\d|3[1578]|4[1-35-7]|5[1-57]|61)|4(?:2\\d|3[1-579]|7[1-79])|5(?:22|5[1-9]|6[1457])|6(?:22|3[12457]|4[13-8])|9(?:22|5[1-9])))\\d{5}", , , , "662345678", , , , [7]], [, , "6(?:1(?:2(?:98|2[01])|35[0-4]|50\\d|61[23]|7(?:[01][017]|4\\d|55|9[5-9]))|2(?:11\\d|2(?:[12]1|9[01379])|5(?:[126]\\d|3[0-4])|7\\d{2})|5(?:19[01]|2(?:27|9[26])|30\\d|59\\d|7\\d{2})|6(?:2(?:1[5-9]|2[0367]|38|41|52|60)|3[79]\\d|4(?:56|83)|7(?:[07]\\d|1[017]|3[07]|4[047]|5[057]|67|8[0178]|9[79])|9[0-3]\\d)|7(?:2(?:24|3[237]|4[5-9]|7[15-8])|5(?:7[12]|8[0589])|7(?:0\\d|[39][07])|9(?:0\\d|7[079]))|9(?:2(?:1[1267]|5\\d|3[01]|7[0-4])|5[67]\\d|6(?:2[0-26]|8\\d)|7\\d{2}))\\d{4}|7(?:0\\d{3}|1(?:13[01]|6(?:0[47]|1[67]|66)|71[3-69]|98\\d)|2(?:2(?:2[79]|95)|3(?:2[5-9]|6[0-6])|57\\d|7(?:0\\d|1[17]|2[27]|3[37]|44|5[057]|66|88))|3(?:2(?:1[0-6]|21|3[469]|7[159])|33\\d|5(?:0[0-4]|5[579]|9\\d)|7(?:[0-3579]\\d|4[0467]|6[67]|8[078])|9[4-6]\\d)|4(?:2(?:29|5[0257]|6[0-7]|7[1-57])|5(?:1[0-4]|8\\d|9[5-9])|7(?:0\\d|1[024589]|2[0127]|3[0137]|[46][07]|5[01]|7[5-9]|9[079])|9(?:7[015-9]|[89]\\d))|5(?:112|2(?:0\\d|2[29]|[49]4)|3[1568]\\d|52[6-9]|7(?:0[01578]|1[017]|[23]7|4[047]|[5-7]\\d|8[78]|9[079]))|6(?:2(?:2[1245]|4[2-4])|39\\d|41[179]|5(?:[349]\\d|5[0-2])|7(?:0[017]|[13]\\d|22|44|55|67|88))|9(?:22[128]|3(?:2[0-4]|7\\d)|57[05629]|7(?:2[05-9]|3[37]|4\\d|60|7[2579]|87|9[07])))\\d{4}|9[0-57-9]\\d{7}", , , , "912345678"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "UZ", 998, "810", "8", , , "8", , "8~10", , [[, "([679]\\d)(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", , "8 $1"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        VA: [, [, , "(?:0(?:878\\d{5}|6698\\d{5})|[1589]\\d{5,10}|3(?:[12457-9]\\d{8}|[36]\\d{7,9}))", , , , , , , [6, 8, 9, 10, 11]], [, , "06698\\d{5}", , , , "0669812345", , , [10]], [, , "3(?:[12457-9]\\d{8}|6\\d{7,8}|3\\d{7,9})", , , , "3123456789", , , [9, 10, 11]], [, , "80(?:0\\d{6}|3\\d{3})", , , , "800123456", , , [6, 9]], [, , "0878\\d{5}|1(?:44|6[346])\\d{6}|89(?:2\\d{3}|4(?:[0-4]\\d{2}|[5-9]\\d{4})|5(?:[0-4]\\d{2}|[5-9]\\d{6})|9\\d{6})", , , , "899123456", , , [6, 8, 9, 10]], [, , "84(?:[08]\\d{6}|[17]\\d{3})", , , , "848123456", , , [6, 9]], [, , "1(?:78\\d|99)\\d{6}", , , , "1781234567", , , [9, 10]], [, , "55\\d{8}", , , , "5512345678", , , [10]], "VA", 39, "00", , , , , , , , , , [, , , , , , , , , [-1]], , , [, , "848\\d{6}", , , , "848123456", , , [9]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        VC: [, [, , "[5789]\\d{9}", , , , , , , [10], [7]], [, , "784(?:266|3(?:6[6-9]|7\\d|8[0-24-6])|4(?:38|5[0-36-8]|8[0-8])|5(?:55|7[0-2]|93)|638|784)\\d{4}", , , , "7842661234", , , , [7]], [, , "784(?:4(?:3[0-5]|5[45]|89|9[0-58])|5(?:2[6-9]|3[0-4]))\\d{4}", , , , "7844301234", , , , [7]], [, , "8(?:00|33|44|55|66|77|88)[2-9]\\d{6}", , , , "8002345678"], [, , "900[2-9]\\d{6}", , , , "9002345678"], [, , , , , , , , , [-1]], [, , "5(?:00|22|33|44|66|77|88)[2-9]\\d{6}", , , , "5002345678"], [, , , , , , , , , [-1]], "VC", 1, "011", "1", , , "1", , , , , , [, , , , , , , , , [-1]], , "784", [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        VE: [, [, , "[24589]\\d{9}", , , , , , , [10], [7]], [, , "(?:2(?:12|3[457-9]|[58][1-9]|[467]\\d|9[1-6])|50[01])\\d{7}", , , , "2121234567", , , , [7]], [, , "4(?:1[24-8]|2[46])\\d{7}", , , , "4121234567"], [, , "800\\d{7}", , , , "8001234567"], [, , "900\\d{7}", , , , "9001234567"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "VE", 58, "00", "0", , , "0", , , , [[, "(\\d{3})(\\d{7})", "$1-$2", , "0$1", "$CC $1"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        VG: [, [, , "[2589]\\d{9}", , , , , , , [10], [7]], [, , "284(?:(?:229|4(?:22|9[45])|774|8(?:52|6[459]))\\d{4}|496[0-5]\\d{3})", , , , "2842291234", , , , [7]], [, , "284(?:(?:3(?:0[0-3]|4[0-7]|68|9[34])|4(?:4[0-6]|68|99)|54[0-57])\\d{4}|496[6-9]\\d{3})", , , , "2843001234", , , , [7]], [, , "8(?:00|33|44|55|66|77|88)[2-9]\\d{6}", , , , "8002345678"], [, , "900[2-9]\\d{6}", , , , "9002345678"], [, , , , , , , , , [-1]], [, , "5(?:00|22|33|44|66|77|88)[2-9]\\d{6}", , , , "5002345678"], [, , , , , , , , , [-1]], "VG", 1, "011", "1", , , "1", , , , , , [, , , , , , , , , [-1]], , "284", [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        VI: [, [, , "[3589]\\d{9}", , , , , , , [10], [7]], [, , "340(?:2(?:01|2[0678]|44|77)|3(?:32|44)|4(?:22|7[34])|5(?:1[34]|55)|6(?:26|4[23]|77|9[023])|7(?:1[2-589]|27|7\\d)|884|998)\\d{4}", , , , "3406421234", , , , [7]], [, , "340(?:2(?:01|2[0678]|44|77)|3(?:32|44)|4(?:22|7[34])|5(?:1[34]|55)|6(?:26|4[23]|77|9[023])|7(?:1[2-589]|27|7\\d)|884|998)\\d{4}", , , , "3406421234", , , , [7]], [, , "8(?:00|33|44|55|66|77|88)[2-9]\\d{6}", , , , "8002345678"], [, , "900[2-9]\\d{6}", , , , "9002345678"], [, , , , , , , , , [-1]], [, , "5(?:00|22|33|44|66|77|88)[2-9]\\d{6}", , , , "5002345678"], [, , , , , , , , , [-1]], "VI", 1, "011", "1", , , "1", , , 1, , , [, , , , , , , , , [-1]], , "340", [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        VN: [, [, , "[167]\\d{6,9}|[2-59]\\d{7,9}|8\\d{6,8}", , , , , , , [7, 8, 9, 10]], [, , "(?:2(?:0[3-9]|1[0-689]|2[0-25-9]|3[2-9]|[48][2-7]|5[124-9]|6[0-39]|7[0-7]|9[0-4679])|4\\d|5(?:0[01]|[5-9])|6(?:[0-46-8]|5[01])|7[0235])\\d{7}|8(?:[2-5]\\d|6[236]|7[13])\\d{6}", , , , "2101234567", , , [9, 10]], [, , "(?:9\\d|1(?:2\\d|6[2-9]|8[68]|99))\\d{7}|8(?:6[89]|8\\d|9[89])\\d{6}", , , , "912345678", , , [9, 10]], [, , "1800\\d{4,6}", , , , "1800123456", , , [8, 9, 10]], [, , "1900\\d{4,6}", , , , "1900123456", , , [8, 9, 10]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "VN", 84, "00", "0", , , "0", , , , [[, "([17]99)(\\d{4})", "$1 $2", ["[17]99"], "0$1", , 1], [, "([48])(\\d{4})(\\d{4})", "$1 $2 $3", ["4|8(?:[2-5]|6[236]|7[13])"], "0$1", , 1], [, "(\\d{2})(\\d{4})(\\d{3,4})", "$1 $2 $3", ["2[48]|5[5-9]|6[0-46-8]|7[0235]"], "0$1", , 1], [, "(80)(\\d{5})", "$1 $2", ["80"], "0$1", , 1], [, "(69\\d)(\\d{4,5})", "$1 $2", ["69"], "0$1", , 1], [, "(\\d{3})(\\d{4})(\\d{3})", "$1 $2 $3", ["2[0-35-79]|50|65"], "0$1", , 1], [, "([89]\\d)(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["8(?:8|9[89])|9"], "0$1", , 1], [, "(1[2689]\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["1(?:[26]|8[68]|99)"], "0$1", , 1], [, "(86[89])(\\d{3})(\\d{3})", "$1 $2 $3", ["86[89]"], "0$1", , 1], [, "(1[89]00)(\\d{4,6})", "$1 $2", ["1[89]0"], "$1", , 1]], , [, , , , , , , , , [-1]], , , [, , "[17]99\\d{4}|69\\d{5,6}", , , , "1992000", , , [7, 8]], [, , "[17]99\\d{4}|69\\d{5,6}|80\\d{5}", , , , "1992000", , , [7, 8]], , , [, , , , , , , , , [-1]]],
        VU: [, [, , "[2-57-9]\\d{4,6}", , , , , , , [5, 7]], [, , "(?:2[02-9]\\d|3(?:[5-7]\\d|8[0-8])|48[4-9]|88\\d)\\d{2}", , , , "22123", , , [5]], [, , "(?:5(?:7[2-5]|[0-689]\\d)|7[013-7]\\d)\\d{4}", , , , "5912345", , , [7]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "VU", 678, "00", , , , , , , , [[, "(\\d{3})(\\d{4})", "$1 $2", ["[579]"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , "3[03]\\d{3}|900\\d{4}", , , , "30123"], , , [, , , , , , , , , [-1]]],
        WF: [, [, , "[4-8]\\d{5}", , , , , , , [6]], [, , "(?:50|68|72)\\d{4}", , , , "501234"], [, , "(?:50|68|72|8[23])\\d{4}", , , , "501234"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "WF", 681, "00", , , , , , , , [[, "(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , "[48]0\\d{4}", , , , "401234"]],
        WS: [, [, , "[2-8]\\d{4,6}", , , , , , , [5, 6, 7]], [, , "(?:[2-5]\\d|6[1-9]|84\\d{2})\\d{3}", , , , "22123", , , [5, 7]], [, , "(?:60|7[25-7]\\d)\\d{4}", , , , "601234", , , [6, 7]], [, , "800\\d{3}", , , , "800123", , , [6]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "WS", 685, "0", , , , , , , , [[, "(8\\d{2})(\\d{3,4})", "$1 $2", ["8"]], [, "(7\\d)(\\d{5})", "$1 $2", ["7"]], [, "(\\d{5})", "$1", ["[2-6]"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        YE: [, [, , "[1-7]\\d{6,8}", , , , , , , [7, 8, 9], [6]], [, , "(?:1(?:7\\d|[2-68])|2[2-68]|3[2358]|4[2-58]|5[2-6]|6[3-58]|7[24-68])\\d{5}", , , , "1234567", , , [7, 8], [6]], [, , "7[0137]\\d{7}", , , , "712345678", , , [9]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "YE", 967, "00", "0", , , "0", , , , [[, "([1-7])(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[1-6]|7[24-68]"], "0$1"], [, "(7\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["7[0137]"], "0$1"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        YT: [, [, , "[268]\\d{8}", , , , , , , [9]], [, , "269(?:6[0-4]|50)\\d{4}", , , , "269601234"], [, , "639(?:0[0-79]|1[019]|[26]\\d|3[09]|[45]0|7[06]|9[04-79])\\d{4}", , , , "639012345"], [, , "80\\d{7}", , , , "801234567"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "YT", 262, "00", "0", , , "0", , , , , , [, , , , , , , , , [-1]], , "269|63", [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        ZA: [, [, , "[1-79]\\d{8}|8\\d{4,8}", , , , , , , [5, 6, 7, 8, 9]], [, , "(?:1[0-8]|2[1-378]|3[1-69]|4\\d|5[1346-8])\\d{7}", , , , "101234567", , , [9]], [, , "(?:6\\d|7[0-46-9])\\d{7}|8(?:[1-4]\\d{1,5}|5\\d{5})\\d{2}", , , , "711234567"], [, , "80\\d{7}", , , , "801234567", , , [9]], [, , "86[2-9]\\d{6}|9[0-2]\\d{7}", , , , "862345678", , , [9]], [, , "860\\d{6}", , , , "860123456", , , [9]], [, , , , , , , , , [-1]], [, , "87\\d{7}", , , , "871234567", , , [9]], "ZA", 27, "00", "0", , , "0", , , , [[, "(860)(\\d{3})(\\d{3})", "$1 $2 $3", ["860"], "0$1"], [, "(\\d{2})(\\d{3,4})", "$1 $2", ["8[1-4]"], "0$1"], [, "(\\d{2})(\\d{3})(\\d{2,3})", "$1 $2 $3", ["8[1-4]"], "0$1"], [, "(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[1-79]|8(?:[0-57]|6[1-9])"], "0$1"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , "861\\d{6}", , , , "861123456", , , [9]], , , [, , , , , , , , , [-1]]],
        ZM: [, [, , "[289]\\d{8}", , , , , , , [9]], [, , "21[1-8]\\d{6}", , , , "211234567"], [, , "9(?:5[034589]|[67]\\d)\\d{6}", , , , "955123456"], [, , "800\\d{6}", , , , "800123456"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "ZM", 260, "00", "0", , , "0", , , , [[, "([29]\\d)(\\d{7})", "$1 $2", ["[29]"], "0$1"], [, "(800)(\\d{3})(\\d{3})", "$1 $2 $3", ["8"], "0$1"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        ZW: [, [, , "2(?:[0-2457-9]\\d{3,8}|6(?:[14]\\d{7}|\\d{4}))|[13-79]\\d{4,9}|8[06]\\d{5,8}", , , , , , , [5, 6, 7, 8, 9, 10], [3, 4]], [, , "(?:2(?:0(?:4\\d|5\\d{2})|2[278]\\d|48\\d|7(?:[1-7]\\d|[089]\\d{2})|8(?:[2-57-9]|[146]\\d{2})|98)|3(?:08|17|3[78]|7(?:[19]|[56]\\d)|8[37]|98)|5[15][78]|6(?:28\\d{2}|37|6[78]|75\\d|98|8(?:7\\d|8)))\\d{3}|(?:2(?:1[39]|2[0157]|31|[56][14]|7[35]|84)|329)\\d{7}|(?:1(?:3\\d{2}|[4-8]|9\\d)|2(?:0\\d{2}|12|292|[569]\\d)|3(?:[26]|[013459]\\d)|5(?:0|1[2-4]|26|[37]2|5\\d{2}|[689]\\d)|6(?:[39]|[01246]\\d|[78]\\d{2}))\\d{3}|(?:29\\d|39|54)\\d{6}|(?:(?:25|54)83\\d|2582\\d{2}|65[2-8])\\d{2}|(?:4\\d{6,7}|9[2-9]\\d{4,5})", , , , "1312345", , , , [3, 4]], [, , "(?:7(?:1[2-8]|3[2-9]|7[1-9]|8[2-5])|8644)\\d{6}", , , , "712345678", , , [9, 10]], [, , "80(?:[01]\\d|20|8[0-8])\\d{3}", , , , "8001234", , , [7]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , "86(?:1[12]|30|55|77|8[368])\\d{6}", , , , "8686123456", , , [10]], "ZW", 263, "00", "0", , , "0", , , , [[, "([49])(\\d{3})(\\d{2,4})", "$1 $2 $3", ["4|9[2-9]"], "0$1"], [, "(7\\d)(\\d{3})(\\d{3,4})", "$1 $2 $3", ["7"], "0$1"], [, "(86\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["86[24]"], "0$1"], [, "([2356]\\d{2})(\\d{3,5})", "$1 $2", ["2(?:0[45]|2[278]|[49]8|[78])|3(?:08|17|3[78]|7[1569]|8[37]|98)|5[15][78]|6(?:[29]8|[38]7|6[78]|75|[89]8)"], "0$1"], [, "(\\d{3})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["2(?:1[39]|2[0157]|31|[56][14]|7[35]|84)|329"], "0$1"], [, "([1-356]\\d)(\\d{3,5})", "$1 $2", ["1[3-9]|2[02569]|3[0-69]|5[05689]|6\\d"], "0$1"], [, "([235]\\d)(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[23]9|54"], "0$1"], [, "([25]\\d{3})(\\d{3,5})", "$1 $2", ["(?:25|54)8", "258[23]|5483"], "0$1"], [, "(8\\d{3})(\\d{6})", "$1 $2", ["86"], "0$1"], [, "(80\\d)(\\d{4})", "$1 $2", ["80"], "0$1"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        800: [, [, , "\\d{8}", , , , , , , [8]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , "\\d{8}", , , , "12345678"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "001", 800, , , , , , , , 1, [[, "(\\d{4})(\\d{4})", "$1 $2"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        808: [, [, , "\\d{8}", , , , , , , [8]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , "\\d{8}", , , , "12345678"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "001", 808, , , , , , , , 1, [[, "(\\d{4})(\\d{4})", "$1 $2"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        870: [, [, , "[35-7]\\d{8}", , , , , , , [9]], [, , , , , , , , , [-1]], [, , "(?:[356]\\d|7[6-8])\\d{7}", , , , "301234567"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "001", 870, , , , , , , , , [[, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        878: [, [, , "1\\d{11}", , , , , , , [12]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , "10\\d{10}", , , , "101234567890"], "001", 878, , , , , , , , 1, [[, "(\\d{2})(\\d{5})(\\d{5})", "$1 $2 $3"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        881: [, [, , "[67]\\d{8}", , , , , , , [9]], [, , , , , , , , , [-1]], [, , "[67]\\d{8}", , , , "612345678"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "001", 881, , , , , , , , , [[, "(\\d)(\\d{3})(\\d{5})", "$1 $2 $3", ["[67]"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        882: [, [, , "[13]\\d{6,11}", , , , , , , [7, 8, 9, 10, 11, 12]], [, , , , , , , , , [-1]], [, , "3(?:2\\d{3}|37\\d{2}|4(?:2|7\\d{3}))\\d{4}", , , , "3421234", , , [7, 9, 10]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , "1(?:3(?:0[0347]|[13][0139]|2[035]|4[013568]|6[0459]|7[06]|8[15678]|9[0689])\\d{4}|6\\d{5,10})|3(?:45|9\\d{3})\\d{7}", , , , "390123456789"], "001", 882, , , , , , , , , [[, "(\\d{2})(\\d{4})(\\d{3})", "$1 $2 $3", ["3[23]"]], [, "(\\d{2})(\\d{5})", "$1 $2", ["16|342"]], [, "(\\d{2})(\\d{4})(\\d{4})", "$1 $2 $3", ["34[57]"]], [, "(\\d{3})(\\d{4})(\\d{4})", "$1 $2 $3", ["348"]], [, "(\\d{2})(\\d{2})(\\d{4})", "$1 $2 $3", ["1"]], [, "(\\d{2})(\\d{3,4})(\\d{4})", "$1 $2 $3", ["16"]], [, "(\\d{2})(\\d{4,5})(\\d{5})", "$1 $2 $3", ["16|39"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , "348[57]\\d{7}", , , , "34851234567", , , [11]]],
        883: [, [, , "51\\d{7}(?:\\d{3})?", , , , , , , [9, 12]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , "51(?:00\\d{5}(?:\\d{3})?|[13]0\\d{8})", , , , "510012345"], "001", 883, , , , , , , , 1, [[, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["510"]], [, "(\\d{3})(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3 $4", ["510"]], [, "(\\d{4})(\\d{4})(\\d{4})", "$1 $2 $3", ["51[13]"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]],
        888: [, [, , "\\d{11}", , , , , , , [11]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "001", 888, , , , , , , , 1, [[, "(\\d{3})(\\d{3})(\\d{5})", "$1 $2 $3"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , "\\d{11}", , , , "12345678901"], , , [, , , , , , , , , [-1]]],
        979: [, [, , "\\d{9}", , , , , , , [9]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , "\\d{9}", , , , "123456789"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "001", 979, , , , , , , , 1, [[, "(\\d)(\\d{4})(\\d{4})", "$1 $2 $3"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]]
    };
    k.a = function () {
        return k.b ? k.b : k.b = new k
    };
    var Ct = {
            0: "0",
            1: "1",
            2: "2",
            3: "3",
            4: "4",
            5: "5",
            6: "6",
            7: "7",
            8: "8",
            9: "9",
            "０": "0",
            "１": "1",
            "２": "2",
            "３": "3",
            "４": "4",
            "５": "5",
            "６": "6",
            "７": "7",
            "８": "8",
            "９": "9",
            "٠": "0",
            "١": "1",
            "٢": "2",
            "٣": "3",
            "٤": "4",
            "٥": "5",
            "٦": "6",
            "٧": "7",
            "٨": "8",
            "٩": "9",
            "۰": "0",
            "۱": "1",
            "۲": "2",
            "۳": "3",
            "۴": "4",
            "۵": "5",
            "۶": "6",
            "۷": "7",
            "۸": "8",
            "۹": "9"
        }, wt = {
            0: "0",
            1: "1",
            2: "2",
            3: "3",
            4: "4",
            5: "5",
            6: "6",
            7: "7",
            8: "8",
            9: "9",
            "０": "0",
            "１": "1",
            "２": "2",
            "３": "3",
            "４": "4",
            "５": "5",
            "６": "6",
            "７": "7",
            "８": "8",
            "９": "9",
            "٠": "0",
            "١": "1",
            "٢": "2",
            "٣": "3",
            "٤": "4",
            "٥": "5",
            "٦": "6",
            "٧": "7",
            "٨": "8",
            "٩": "9",
            "۰": "0",
            "۱": "1",
            "۲": "2",
            "۳": "3",
            "۴": "4",
            "۵": "5",
            "۶": "6",
            "۷": "7",
            "۸": "8",
            "۹": "9",
            A: "2",
            B: "2",
            C: "2",
            D: "3",
            E: "3",
            F: "3",
            G: "4",
            H: "4",
            I: "4",
            J: "5",
            K: "5",
            L: "5",
            M: "6",
            N: "6",
            O: "6",
            P: "7",
            Q: "7",
            R: "7",
            S: "7",
            T: "8",
            U: "8",
            V: "8",
            W: "9",
            X: "9",
            Y: "9",
            Z: "9"
        }, xt = RegExp("^[+＋]+"), St = RegExp("([0-9０-９٠-٩۰-۹])"), Tt = RegExp("[+＋0-9０-９٠-٩۰-۹]"), kt = /[\\\/] *x/,
        Dt = RegExp("[^0-9０-９٠-٩۰-۹A-Za-z#]+$"), _t = /(?:.*?[A-Za-z]){3}.*/,
        It = RegExp("(?:;ext=([0-9０-９٠-٩۰-۹]{1,7})|[  \\t,]*(?:e?xt(?:ensi(?:ó?|ó))?n?|ｅ?ｘｔｎ?|[;,xｘ#＃~～]|int|anexo|ｉｎｔ)[:\\.．]?[  \\t,-]*([0-9０-９٠-٩۰-۹]{1,7})#?|[- ]+([0-9０-９٠-٩۰-۹]{1,5})#)$", "i"),
        At = RegExp("^[0-9０-９٠-٩۰-۹]{2}$|^[+＋]*(?:[-x‐-―−ー－-／  ­​⁠　()（）［］.\\[\\]/~⁓∼～*]*[0-9０-９٠-٩۰-۹]){3,}[-x‐-―−ー－-／  ­​⁠　()（）［］.\\[\\]/~⁓∼～*A-Za-z0-9０-９٠-٩۰-۹]*(?:;ext=([0-9０-９٠-٩۰-۹]{1,7})|[  \\t,]*(?:e?xt(?:ensi(?:ó?|ó))?n?|ｅ?ｘｔｎ?|[;,xｘ#＃~～]|int|anexo|ｉｎｔ)[:\\.．]?[  \\t,-]*([0-9０-９٠-٩۰-۹]{1,7})#?|[- ]+([0-9０-９٠-٩۰-۹]{1,5})#)?$", "i"),
        jt = /(\$\d)/;
    e("intlTelInputUtils", {}), e("intlTelInputUtils.formatNumber", function (t, e, n) {
        try {
            var i = k.a(), r = V(i, t, e);
            return E(i, r, "undefined" == typeof n ? 0 : n)
        } catch (e) {
            return t
        }
    }), e("intlTelInputUtils.getExampleNumber", function (t, e, n) {
        try {
            var i, r = k.a();
            t:{
                if (N(t)) {
                    var o = O(F(r, t), n);
                    try {
                        if (null != o.a[6]) {
                            var a = h(o, 6);
                            i = G(r, a, t, !1);
                            break t
                        }
                    } catch (t) {
                    }
                }
                i = null
            }
            return E(r, i, e ? 2 : 1)
        } catch (t) {
            return ""
        }
    }), e("intlTelInputUtils.getExtension", function (t, e) {
        try {
            return h(V(k.a(), t, e), 3)
        } catch (t) {
            return ""
        }
    }), e("intlTelInputUtils.getNumberType", function (t, e) {
        try {
            var n, i = k.a(), r = V(i, t, e), o = Q(i, r), a = P(i, p(r, 1), o);
            if (a) {
                var s = M(r);
                n = H(s, a)
            } else n = -1;
            return n
        } catch (t) {
            return -99
        }
    }), e("intlTelInputUtils.getValidationError", function (t, e) {
        try {
            var n, i = k.a(), r = V(i, t, e), o = M(r), a = p(r, 1);
            if (a in yt) {
                var s = P(i, a, U(a));
                n = W(i, o, s, -1)
            } else n = 1;
            return n
        } catch (t) {
            return "Invalid country calling code" == t.message ? 1 : "The string supplied did not seem to be a phone number" == t.message ? 4 : "Phone number too short after IDD" == t.message || "The string supplied is too short to be a phone number" == t ? 2 : "The string supplied is too long to be a phone number" == t.message ? 3 : -99
        }
    }), e("intlTelInputUtils.isValidNumber", function (t, e) {
        try {
            var n, i, r = k.a(), o = V(r, t, e), a = Q(r, o), s = p(o, 1), d = P(r, s, a);
            if (!(i = !d)) {
                var l;
                if (l = "001" != a) {
                    var u, c = F(r, a);
                    if (!c) throw Error("Invalid region code: " + a);
                    u = p(c, 10), l = s != u
                }
                i = l
            }
            if (i) n = !1; else {
                var h = M(o);
                n = -1 != H(h, d)
            }
            return n
        } catch (t) {
            return !1
        }
    }), e("intlTelInputUtils.numberFormat", {
        E164: 0,
        INTERNATIONAL: 1,
        NATIONAL: 2,
        RFC3966: 3
    }), e("intlTelInputUtils.numberType", {
        FIXED_LINE: 0,
        MOBILE: 1,
        FIXED_LINE_OR_MOBILE: 2,
        TOLL_FREE: 3,
        PREMIUM_RATE: 4,
        SHARED_COST: 5,
        VOIP: 6,
        PERSONAL_NUMBER: 7,
        PAGER: 8,
        UAN: 9,
        VOICEMAIL: 10,
        UNKNOWN: -1
    }), e("intlTelInputUtils.validationError", {
        IS_POSSIBLE: 0,
        INVALID_COUNTRY_CODE: 1,
        TOO_SHORT: 2,
        TOO_LONG: 3,
        NOT_A_NUMBER: 4
    })
}(), jQuery(document).ready(function () {
    if (jQuery("body").data("phone-cc-input")) {
        var t = jQuery('input[name^="phone"], input[name$="phone"]').not('input[type="hidden"]');
        if (t.length) {
            var e = jQuery('[name^="country"], [name$="country"]'), n = "us", i = t.attr("name");
            e.length && (n = e.val().toLowerCase(), "um" === n && (n = "us")), t.before('<input id="populatedCountryCode' + i + '" type="hidden" name="country-calling-code-' + i + '" value="" />'), t.intlTelInput({
                preferredCountries: [n, "us", "gb"].filter(function (t, e, n) {
                    return n.indexOf(t) === e
                }), initialCountry: n, autoPlaceholder: "polite", separateDialCode: !0
            }), t.on("countrychange", function (t, e) {
                jQuery("#populatedCountryCode" + i).val(e.dialCode), jQuery(this).val() === "+" + e.dialCode && jQuery(this).val("")
            }), t.on("blur keydown", function (t) {
                if ("blur" === t.type || "keydown" === t.type && 13 === t.keyCode) {
                    var e = jQuery(this).intlTelInput("getNumber"),
                        n = jQuery(this).intlTelInput("getSelectedCountryData"), i = "+" + n.dialCode;
                    0 === e.indexOf(i) && (e.match(/\+/g) || []).length > 1 && (e = e.substr(i.length)), jQuery(this).intlTelInput("setNumber", e)
                }
            }), jQuery("#populatedCountryCode" + i).val(t.intlTelInput("getSelectedCountryData").dialCode), e.on("change", function () {
                if ("" === t.val()) {
                    var e = jQuery(this).val().toLowerCase();
                    "um" === e && (e = "us"), t.intlTelInput("setCountry", e)
                }
            }), t.parents("div.form-group").find(".field-icon").addClass("hidden").end(), t.removeClass("field").addClass("form-control")
        }
        var r = jQuery('input[name$="][Phone Number]"], input[name$="][Phone]"]').not('input[type="hidden"]');
        r.length && jQuery.each(r, function (t, e) {
            var n = jQuery(this), i = n.attr("name");
            i = i.replace("contactdetails[", "").replace("][Phone Number]", "").replace("][Phone]", "");
            var r = jQuery('[name$="' + i + '][Country]"]'), o = r.val().toLowerCase();
            "um" === o && (o = "us"), n.before('<input id="populated' + i + 'CountryCode" type="hidden" name="contactdetails[' + i + '][Phone Country Code]" value="" />'), n.intlTelInput({
                preferredCountries: [o, "us", "gb"].filter(function (t, e, n) {
                    return n.indexOf(t) === e
                }), initialCountry: o, autoPlaceholder: "polite", separateDialCode: !0
            }), n.on("countrychange", function (t, e) {
                jQuery("#populated" + i + "CountryCode").val(e.dialCode), jQuery(this).val() === "+" + e.dialCode && jQuery(this).val("")
            }), n.on("blur keydown", function (t) {
                if ("blur" === t.type || "keydown" === t.type && 13 === t.keyCode) {
                    var e = jQuery(this).intlTelInput("getNumber"),
                        n = jQuery(this).intlTelInput("getSelectedCountryData"), i = "+" + n.dialCode;
                    0 === e.indexOf(i) && (e.match(/\+/g) || []).length > 1 && (e = e.substr(i.length)), jQuery(this).intlTelInput("setNumber", e)
                }
            }), jQuery("#populated" + i + "CountryCode").val(n.intlTelInput("getSelectedCountryData").dialCode), r.on("blur", function () {
                if ("" === n.val()) {
                    var t = jQuery(this).val().toLowerCase();
                    "um" === t && (t = "us"), n.intlTelInput("setCountry", t)
                }
            })
        })
    }
});