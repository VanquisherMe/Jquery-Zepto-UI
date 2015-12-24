/* jdf-1.0.0/ globalInit.js Date:2015-09-15 18:39:11 */
define("//misc.360buyimg.com/jdf/1.0.0/unit/globalInit/2.0.0/globalInit.js", ["//misc.360buyimg.com/jdf/1.0.0/ui/switchable/1.0.0/switchable.js", "//misc.360buyimg.com/jdf/1.0.0/ui/dropdown/1.0.0/dropdown.js", "//misc.360buyimg.com/jdf/1.0.0/ui/dialog/1.0.0/dialog.js", "//misc.360buyimg.com/jdf/1.0.0/ui/lazyload/1.0.0/lazyload.js", "//misc.360buyimg.com/jdf/1.0.0/unit/trimPath/1.0.0/trimPath.js", "//misc.360buyimg.com/jdf/1.0.0/unit/getjsonp/1.0.0/getjsonp.js", "//misc.360buyimg.com/jdf/1.0.0/unit/login/1.0.0/login.js", "//misc.360buyimg.com/jdf/1.0.0/unit/event/1.0.0/event.js", "//misc.360buyimg.com/jdf/1.0.0/unit/hotkey/1.0.0/hotkey.js", "//misc.360buyimg.com/jdf/1.0.0/unit/globalReco/1.0.0/globalReco.js", "//misc.360buyimg.com/jdf/1.0.0/unit/cookie/1.0.0/cookie.js", "//misc.360buyimg.com/jdf/1.0.0/unit/search/1.0.0/search.js", "//misc.360buyimg.com/jdf/1.0.0/unit/setUserInfo/1.0.0/setUserInfo.js", "//misc.360buyimg.com/jdf/1.0.0/ui/areamini/1.0.0/areamini.js", "//misc.360buyimg.com/jdf/1.0.0/unit/localStorage/1.0.0/localStorage.js", "//misc.360buyimg.com/jdf/1.0.0/unit/myjd/2.0.0/myjd.js", "//misc.360buyimg.com/jdf/1.0.0/unit/shortcut/2.0.0/shortcut.js", "//misc.360buyimg.com/jdf/1.0.0/unit/shoppingcart/2.0.0/shoppingcart.js", "//misc.360buyimg.com/jdf/1.0.0/unit/category/2.0.0/category.js", "//misc.360buyimg.com/jdf/1.0.0/unit/log/1.0.0/log.js"], function(require) {
    require("//misc.360buyimg.com/jdf/1.0.0/ui/switchable/1.0.0/switchable.js");
    require("//misc.360buyimg.com/jdf/1.0.0/ui/dropdown/1.0.0/dropdown.js");
    require("//misc.360buyimg.com/jdf/1.0.0/ui/dialog/1.0.0/dialog.js");
    require("//misc.360buyimg.com/jdf/1.0.0/ui/lazyload/1.0.0/lazyload.js");
    require("//misc.360buyimg.com/jdf/1.0.0/unit/trimPath/1.0.0/trimPath.js");
    require("//misc.360buyimg.com/jdf/1.0.0/unit/getjsonp/1.0.0/getjsonp.js");
    require("//misc.360buyimg.com/jdf/1.0.0/unit/login/1.0.0/login.js");
    require("//misc.360buyimg.com/jdf/1.0.0/unit/event/1.0.0/event.js");
    var k = require("//misc.360buyimg.com/jdf/1.0.0/unit/hotkey/1.0.0/hotkey.js");
    require("//misc.360buyimg.com/jdf/1.0.0/unit/globalReco/1.0.0/globalReco.js");
    require("//misc.360buyimg.com/jdf/1.0.0/unit/cookie/1.0.0/cookie.js");
    require("//misc.360buyimg.com/jdf/1.0.0/unit/search/1.0.0/search.js");
    require("//misc.360buyimg.com/jdf/1.0.0/unit/setUserInfo/1.0.0/setUserInfo.js");
    require("//misc.360buyimg.com/jdf/1.0.0/ui/areamini/1.0.0/areamini.js");
    require("//misc.360buyimg.com/jdf/1.0.0/unit/localStorage/1.0.0/localStorage.js");
    require("//misc.360buyimg.com/jdf/1.0.0/unit/myjd/2.0.0/myjd.js");
    var s = require("//misc.360buyimg.com/jdf/1.0.0/unit/shortcut/2.0.0/shortcut.js");
    var t = require("//misc.360buyimg.com/jdf/1.0.0/unit/shoppingcart/2.0.0/shoppingcart.js");
    var u = require("//misc.360buyimg.com/jdf/1.0.0/unit/category/2.0.0/category.js");
    require("//misc.360buyimg.com/jdf/1.0.0/unit/log/1.0.0/log.js");
    function w() {
        k(),
            s(),
            t(),
            u()
    }
    return w
});
/* jdf-1.0.0/ localStorage.js Date:2015-09-15 18:39:11 */
define("//misc.360buyimg.com/jdf/1.0.0/unit/localStorage/1.0.0/localStorage.js", [], function() {
    var c = {
        check: function() {
            return "object" == typeof window.localStorage
        },
        has: function(a) {
            return localStorage.getItem(a) ? !0 : !1
        },
        set: function(a, b) {
            try {
                localStorage.setItem(a, JSON.stringify(b))
            } catch (c) {}
        },
        get: function(a) {
            try {
                return JSON.parse(localStorage.getItem(a))
            } catch (b) {}
        },
        remove: function(a) {
            localStorage.removeItem(a)
        },
        clearByReg: function(a) {
            var b = new RegExp(a);
            var c = window.localStorage;
            for (var d in c)
                b.test(d) && this.remove(d)
        },
        clear: function() {
            localStorage.clear()
        }
    };
    return c
});
/* jdf-1.0.0/ cookie.js Date:2015-09-15 18:39:12 */
define("//misc.360buyimg.com/jdf/1.0.0/unit/cookie/1.0.0/cookie.js", [], function() {
    var c = function(a, b, c) {
            if ("undefined" == typeof b) {
                var i = null ;
                if (document.cookie && "" != document.cookie) {
                    var j = document.cookie.split(";");
                    for (var k = 0; k < j.length; k++) {
                        var l = jQuery.trim(j[k]).split("=");
                        if (l[0] == a && l.length > 1) {
                            try {
                                i = decodeURIComponent(l[1])
                            } catch (m) {
                                i = l[1]
                            }
                            break
                        }
                    }
                }
                return i
            }
            c = c || {},
            null  === b && (b = "",
                c.expires = -1);
            var d = "";
            if (c.expires && ("number" == typeof c.expires || c.expires.toUTCString)) {
                var e;
                "number" == typeof c.expires ? (e = new Date,
                    e.setTime(e.getTime() + 24 * c.expires * 60 * 60 * 1e3)) : e = c.expires,
                    d = "; expires=" + e.toUTCString()
            }
            var f = c.path ? "; path=" + c.path : "";
            var g = c.domain ? "; domain=" + c.domain : "";
            var h = c.secure ? "; secure" : "";
            document.cookie = [a, "=", encodeURIComponent(b), d, f, g, h].join("")
        }
        ;
    return c
});
/* jdf-1.0.0/ lazyload.js Date:2015-09-15 18:39:14 */
!function(a) {
    function c(b, c, d) {
        !b.attr("src") && c && (b.attr("src", d.blankImgUrl),
            b.addClass(d.placeholderClass)),
            b.attr("src", c),
            b.attr(d.source, "done"),
        c || b.attr("src") || b.attr("src", d.blankImgUrl),
        c && (b[0].onerror = function() {
                b.attr("src", d.blankImgUrl).removeClass(d.placeholderClass).addClass(d.errorClass)
            }
                ,
                b[0].onload = function() {
                    b.removeClass(d.placeholderClass)
                }
        ),
        a.isFunction(d.onchange) && d.onchange.call(b)
    }
    function d(b, c, d) {
        "function" == typeof define && define.cmd ? seajs.use(b, function(a) {
            a.init(c),
                d()
        }) : (a.ajax({
            url: b,
            dataType: "script",
            cache: !0
        }),
            d())
    }
    function e(a, b, c) {
        "0" == a.attr("data-lazyload-fn") && (a.attr("data-lazyload-fn", "done"),
            c(),
        b.onchange && b.onchange(a))
    }
    a.ui.define("lazyload", {
        options: {
            type: "img",
            source: "data-lazy-path",
            init: "data-lazy-init",
            delay: 100,
            space: 100,
            onchange: null ,
            placeholderClass: "loading-style2",
            errorClass: "err-poster",
            blankImgUrl: "//misc.360buyimg.com/lib/img/e/blank.gif"
        },
        init: function() {
            var b = this;
            var f = this.options;
            var g = null ;
            var h = null ;
            var i = null ;
            "img" == f.type && ("data-lazy-path" == f.source && (f.source = "data-lazy-img"),
                i = f.source + "-install");
            var j = "div";
            if ("img" == f.type) {
                if (j = "IMG",
                        g = a("img[" + f.source + "][" + f.source + "!=done]", b.el),
                        h = g.size(),
                        !h)
                    return !1
            } else
                "fn" == f.type && (j = f.source);
            var k = function() {
                    g = "img" == f.type ? a("img[" + f.source + "][" + f.source + "!=done]", b.el) : a(j, b.el),
                        h = g.size();
                    var k = a(document).scrollTop();
                    var l = k + a.page.clientHeight() + f.space;
                    a.each(g, function() {
                        var g = a(this);
                        var i = null ;
                        if (("js" == f.type || "img" == f.type) && (i = g.attr(f.source)),
                            i || "fn" == f.type || "img" == f.type) {
                            var j = b.getTop(g[0]);
                            if (j > 0 && h > 0 && j > k - g.outerHeight() && l > j) {
                                var m = g.attr(f.init);
                                "img" == f.type ? (m = g.attr(f.source),
                                    "done" != m ? (c(g, m, f),
                                        h -= 1) : "done" == m && (h -= 1)) : "js" == f.type ? d(i, m, function() {
                                    h -= 1,
                                        g.attr(f.init, "done")
                                }) : "fn" == f.type && e(g, f, function() {
                                    h -= 1
                                })
                            }
                        }
                    }),
                    h || ("img" == f.type && i && b.el.removeAttr(i),
                        a(window).unbind("scroll", m),
                        a(window).unbind("resize", m))
                }
                ;
            var l = setTimeout(k, 0);
            var m = function() {
                    l && clearTimeout(l),
                        l = setTimeout(k, f.delay)
                }
                ;
            "1" != b.el.attr(i) && (b.el.attr(i, 1),
                a(window).bind("scroll", m),
                a(window).bind("resize", m)),
            "fn" == f.type && f.source.attr("data-lazyload-fn", "0")
        },
        getTop: function(a) {
            var b = a.offsetTop;
            if (null  != a.parentNode) {
                var c = a.offsetParent;
                for (; null  != c; )
                    b += c.offsetTop,
                        c = c.offsetParent
            }
            return b
        }
    })
}(jQuery);
/* jdf-1.0.0/ switchable.js Date:2015-09-15 18:39:14 */
!function(a, b) {
    a.ui.define("switchable", {
        options: {
            hasCssLink: !1,
            baseVersion: "1.0.0",
            cssLinkVersion: "1.0.0",
            type: "tab",
            direction: "left",
            hasSetup: !1,
            navClass: "ui-switchable-trigger",
            navItem: "ui-switchable-item",
            navSelectedClass: "ui-switchable-selected",
            navDisabledClass: "disabled",
            navIframe: "data-iframe",
            contentClass: "ui-switchable-panel-main",
            mainClass: "ui-switchable-panel",
            mainSelectedClass: "ui-switchable-panel-selected",
            bodyClass: "ui-switchable-panel-body",
            hasPage: !1,
            autoLock: !1,
            prevClass: "ui-switchable-prev",
            nextClass: "ui-switchable-next",
            pagCancelClass: "ui-switchable-page-cancel",
            hasArrow: !1,
            arrowClass: "ui-switchable-arrow",
            event: "mouseover",
            speed: 400,
            callback: null ,
            onNext: null ,
            onPrev: null ,
            delay: 150,
            defaultPanel: 0,
            autoPlay: !1,
            playDirection: "next",
            stayTime: 5e3,
            mouseenterStopPlay: !0,
            includeMargin: !1,
            width: 0,
            height: 0,
            seamlessLoop: !1,
            hasHash: !1,
            imgscrollClass: "ui-switchable-imgscroll-img",
            imgscrollItemClass: "ui-switchable-imgscroll-item",
            imgscrollLazyload: !1,
            step: 1,
            visible: 1,
            easing: "swing",
            hasLoop: !1
        },
        init: function() {
            var b = this;
            var c = b.options;
            var d = !0;
            if (b.addClass(),
                c.visible < c.step && (c.visible = c.step),
                    b.nav = b.el.find("." + c.navItem),
                    b.main = b.el.find("." + c.mainClass),
                    c.step = Math.max(c.step || 1, 1),
                    b.size = b.main.size(),
                    b.pageCount = Math.ceil(b.main.size() / c.step),
                    b.content = b.el.find("." + c.contentClass),
                    b.mainWidth = b.main.outerWidth(c.includeMargin),
                    d = c.step < b.size,
                "tab" == c.type && c.navSelectedClass && b.nav.length > 0) {
                var e = -1;
                b.nav.each(function(b) {
                    var d = a(this);
                    d.hasClass(c.navSelectedClass) && (-1 == e ? e = b : d.removeClass(c.navSelectedClass))
                }),
                e > -1 && (c.defaultPanel = e)
            }
            if (c.width && (b.mainWidth = c.width),
                    b.mainHeight = b.main.outerHeight(c.includeMargin),
                c.height && (b.mainHeight = c.height),
                    b.cloneCount = Math.max(c.step, c.visible),
                c.seamlessLoop && d) {
                var f = [];
                var g = [];
                var h = b.cloneCount;
                for (var i = 0; h > i; i++)
                    f.push(b.main.eq(i).clone().attr("data-switchable-clone", 1).data("switchable-clone-from", h + i)),
                        g.push(b.main.eq(b.size - (i + 1)).clone().attr("data-switchable-clone", 1).data("switchable-clone-from", b.size + i));
                for (var j = 0; h > j; j++)
                    b.content.prepend(g[j]).append(f[j]);
                b.main = b.el.find("." + c.mainClass)
            }
            b.main.each(function(b) {
                a(this).data("switchable-idx", b)
            });
            var k = c.defaultPanel;
            c.hasHash && (k = b.getHash(k)),
                b.last = k,
                b.current = k,
                b.isInit = !0,
                c.seamlessLoop && d ? b.switchTo(k, k + b.cloneCount) : b.switchTo(k, k),
                b.autoInterval = null ,
                b.eventTimer = null ,
            c.hasPage && (d && b.page(),
            c.autoLock && b.updatePageButState()),
            d && (b.autoPlay(),
                b.bind())
        },
        addClass: function() {},
        bind: function() {
            var b = this;
            var c = b.options;
            b.nav.each(function(d) {
                var e = a(this);
                e.bind(c.event, function() {
                    clearInterval(b.autoInterval),
                    c.navDisabledClass && e.hasClass(c.navDisabledClass) || (0 === c.delay ? (b.current = d,
                        b.switchTo(d, c.seamlessLoop ? d + b.cloneCount : d)) : (clearTimeout(b.eventTimer),
                        b.eventTimer = setTimeout(function() {
                            b.current = d,
                                b.switchTo(d, c.seamlessLoop ? d + b.cloneCount : d)
                        }, c.delay)))
                }).bind("mouseleave", function() {
                    clearTimeout(b.eventTimer),
                    c.mouseenterStopPlay || b.autoPlay()
                }),
                "click" == c.event && e.bind("mouseover", function() {
                    clearTimeout(b.eventTimer),
                        clearInterval(b.autoInterval)
                })
            }),
            c.mouseenterStopPlay && b.el.each(function() {
                a(this).bind("mouseenter", function() {
                    clearInterval(b.autoInterval)
                }).bind("mouseleave", function() {
                    b.autoPlay()
                })
            }),
            !a.browser.isMobile() || "focus" != c.type && "slider" != c.type || (b.main.swipeLeft(function() {
                b.next()
            }),
                b.main.swipeRight(function() {
                    b.prev()
                }))
        },
        getHash: function(b) {
            var c = this;
            var d = window.location.hash;
            if ("" != d) {
                var e = c.nav;
                var f = null ;
                if (a.each(e, function(b) {
                        a(this).attr("data-hash") == d && (f = b)
                    }),
                    null  != f) {
                    b = f;
                    var g = c.nav.eq(f).offset().top;
                    var h = a.browser.webkit ? 50 : 0;
                    setTimeout(function() {
                        a(window).scrollTop(g)
                    }, h)
                }
            }
            return b
        },
        setHash: function(a) {
            var b = this;
            if (b.options.hasHash) {
                if (b.isInit && !window.location.hash)
                    return;
                var c = b.nav.eq(a).attr("data-hash");
                c = c.replace(/#/, ""),
                    window.location.hash = c
            }
        },
        switchTo: function(a, b) {
            var c = this;
            if ("undefined" == typeof b)
                var b = a;
            c.switchNavTo(a),
                c.switchMainTo(b)
        },
        switchNavTo: function(a) {
            var b = this;
            var c = b.options;
            b.nav.removeClass(c.navSelectedClass),
                b.nav.eq(a).addClass(c.navSelectedClass),
                b.setHash(a)
        },
        switchMainTo: function(b) {
            var c = this;
            var d = c.options;
            if (c.iframe(b),
                "imgscroll" != d.type && (c.main.removeClass(d.mainSelectedClass),
                    c.main.eq(b).addClass(d.mainSelectedClass)),
                c.isInit || c.last != b) {
                if (c.switchType(b),
                    null  != d.callback) {
                    var e = b;
                    var f = !1;
                    var g = this.main.eq(e);
                    e + 1 == c.pageCount && (f = !0),
                    d.seamlessLoop && this.main.each(function() {
                        return e == a(this).data("switchable-clone-from") ? (g = g.add(a(this)),
                            !1) : void 0
                    }),
                        d.callback.call(c, e, f, g)
                }
                c.last = b
            }
        },
        switchType: function(a) {
            var b = this;
            var c = b.options;
            switch (c.type) {
                case "tab":
                    b.tab(a);
                    break;
                case "focus":
                    b.focus(a);
                    break;
                case "slider":
                    b.slider(a);
                    break;
                case "carousel":
                    b.carousel(a);
                    break;
                case "imgscroll":
                    b.imgscroll(a)
            }
        },
        switchDefault: function(a) {
            var b = this;
            b.main.hide(),
                b.main.eq(a).show()
        },
        tab: function(a) {
            var b = this;
            var c = b.options;
            if (c.hasSetup || b.switchDefault(a),
                    c.hasArrow) {
                var d = c.arrowClass;
                var e = b.nav.eq(a).outerWidth(!0) * a;
                if (b.isInit) {
                    var f = b.nav.parent();
                    f.prepend('<div class="' + d + '"><b></b></div>').css({
                        position: "relative"
                    }),
                        b.el.find("." + d).css({
                            left: e
                        }),
                        b.isPlayLock = !1
                } else
                    setTimeout(function() {
                        b.isPlayLock = !1
                    }, c.speed),
                        b.el.find("." + d).stop(!0).animate({
                            left: e
                        }, c.speed, c.easing)
            }
            b.isInit = !1
        },
        focus: function(b) {
            var c = this;
            var d = c.options;
            c.isInit ? (c.main.parent().css({
                position: "relative"
            }),
                c.main.css({
                    position: "absolute",
                    zIndex: 0,
                    opacity: 0
                }).show(),
                c.main.eq(b).css({
                    zIndex: 1,
                    opacity: 1
                }),
                c.isPlayLock = !1) : (setTimeout(function() {
                c.isPlayLock = !1
            }, d.speed),
                c.main.eq(c.last).css({
                    zIndex: 0
                }).stop(!0).animate({
                    opacity: 1
                }, d.speed, d.easing, function() {
                    a(this).css("opacity", 0)
                })),
                c.main.eq(b).css({
                    zIndex: 1
                }).stop(!0).animate({
                    opacity: 1
                }, d.speed, d.easing),
                c.isInit = !1
        },
        slider: function(a) {
            var b = this;
            var c = b.options;
            var d = b.content;
            var e = b.mainHeight;
            var f = e * a;
            var g = b.mainWidth;
            var h = g * a;
            b.isInit ? ("left" == c.direction ? (b.main.css({
                "float": "left"
            }),
                d.css(c.seamlessLoop ? {
                    width: g * (b.size + 2 * b.cloneCount)
                } : {
                    width: g * b.size
                }),
                d.css({
                    left: -h
                })) : "top" == c.direction && d.css({
                top: -f
            }),
                d.parent().css({
                    position: "relative"
                }),
                d.css({
                    position: "absolute"
                }),
                b.switchDefault(a),
                b.isInit = !1,
                b.isPlayLock = !1) : (setTimeout(function() {
                b.isPlayLock = !1
            }, c.speed),
                "left" == c.direction ? d.stop(!0).animate({
                    left: -h
                }, c.speed, c.easing) : "top" == c.direction && d.stop(!0).animate({
                    top: -f
                }, c.speed, c.easing)),
                b.main.show()
        },
        carousel: function(a) {
            var b = this;
            b.slider(a)
        },
        imgscroll: function(b) {
            var c = this;
            var d = c.options;
            var e = c.mainWidth;
            var f = c.el.find("." + d.imgscrollClass);
            if (c.isInit) {
                c.el.find("." + d.bodyClass).css({
                    position: "relative",
                    overflow: "hidden",
                    width: e * d.visible
                }),
                    c.content.css({
                        position: "absolute",
                        width: e * c.size
                    }),
                    c.main.css({
                        "float": "left"
                    });
                var g = d.mainSelectedClass;
                if (c.main.eq(0).addClass(g),
                        !f.attr("src")) {
                    var h = c.el.find("." + d.imgscrollItemClass).eq(0).attr("data-url");
                    f.attr("src", h)
                }
                if (d.imgscrollLazyload)
                    for (var b = c.current; b < d.visible + 1; b++) {
                        var i = c.main.eq(b).find("." + d.imgscrollItemClass);
                        var h = i.attr("data-src");
                        i.attr("src", h)
                    }
                c.main.bind(d.event, function() {
                    var b = a(this);
                    var e = b.find("." + d.imgscrollItemClass).attr("data-url");
                    c.main.removeClass(g),
                        b.addClass(g),
                        f.attr("src", e)
                }),
                    c.isInit = !1,
                    c.isPlayLock = !1
            } else {
                setTimeout(function() {
                    c.isPlayLock = !1
                }, d.speed);
                var j = c.current * e;
                if (d.imgscrollLazyload) {
                    var i = c.main.eq(d.visible + c.current).find("." + d.imgscrollItemClass);
                    var h = i.attr("data-src");
                    i.attr("src", h)
                }
                c.content.stop(!0).animate({
                    left: -j
                }, d.speed)
            }
        },
        page: function() {
            var a = this;
            var b = a.options;
            var c = a.el.find("." + b.nextClass);
            var d = a.el.find("." + b.prevClass);
            d.bind("click", function(c) {
                a.isPlayLock && a.content && a.content.length > 0 || b.autoLock && 0 == a.current || (a.isPlayLock = !0,
                    a.prev(),
                    c.stopPropagation())
            }),
                c.bind("click", function(c) {
                    a.isPlayLock && a.content && a.content.length > 0 || b.autoLock && a.current >= a.size - b.visible || (a.isPlayLock = !0,
                        a.next(),
                        c.stopPropagation())
                })
        },
        next: function() {
            var b = this;
            var c = b.options;
            b.current = b.current + c.step,
                b.offsetIndex();
            var d = 0;
            !c.seamlessLoop && c.hasLoop && (d = -c.visible + c.step),
            b.current >= b.size + d && (b.current = 0);
            var e = c.visible > c.step ? c.visible : c.step;
            !c.seamlessLoop && b.current + e > b.size && (b.current = b.size > e ? b.size - e : 0);
            var f = c.seamlessLoop ? b.current + b.cloneCount : b.current;
            b.switchTo(b.current, f),
                b.updatePageButState(),
            a.isFunction(c.onNext) && c.onNext.call(b)
        },
        prev: function() {
            var b = this;
            var c = b.options;
            c.seamlessLoop ? b.offsetIndex(!0) : (b.current -= c.step,
            b.current < 0 && (b.current = b.current > -c.step ? 0 : b.size - c.step));
            var d = c.seamlessLoop ? b.current + b.cloneCount : b.current;
            b.switchTo(b.current, d),
                b.updatePageButState(),
            a.isFunction(c.onPrev) && c.onPrev.call(b)
        },
        updatePageButState: function() {
            var a = this;
            var b = a.options;
            if (b.hasPage && b.autoLock) {
                var c = a.el.find("." + b.nextClass);
                var d = a.el.find("." + b.prevClass);
                var e = b.pagCancelClass;
                a.current >= a.size - Math.max(b.visible, b.step) ? c.addClass(e) : c.removeClass(e),
                    a.current <= 0 ? d.addClass(e) : d.removeClass(e)
            }
        },
        offsetIndex: function(a) {
            var b = this;
            var c = b.content;
            var d = b.options;
            var e = b.mainWidth;
            var f = b.mainHeight;
            var g = null ;
            var h = null ;
            var i = null ;
            a && d.seamlessLoop ? (i = b.current,
                b.current <= 0 ? (i = b.size - d.step + b.current,
                    g = -((b.size + (b.cloneCount + b.current)) * e),
                    h = -((b.size + (b.cloneCount + b.current)) * f)) : i -= d.step,
                b.current = i) : b.current >= b.size && d.seamlessLoop && (i = b.current - b.size,
                g = -((i + b.cloneCount - d.step) * e),
                h = -((i + b.cloneCount - d.step) * f),
                b.current = i),
                null  != g && "left" == d.direction ? c.css({
                    left: g
                }) : null  != h && "top" == d.direction && c.css({
                    top: h
                })
        },
        autoPlay: function() {
            var a = this;
            a.options.autoPlay && a.startPlay()
        },
        startPlay: function() {
            var a = this;
            var b = a.options;
            a.stopPlay(),
                a.autoInterval = setInterval(function() {
                    a.main.length <= b.step ? a.stopPlay() : "prev" == b.playDirection ? a.prev() : a.next()
                }, b.stayTime)
        },
        stopPlay: function() {
            var a = this;
            clearInterval(a.autoInterval)
        },
        iframe: function(a) {
            var b = this;
            var c = b.main.eq(a);
            var d = b.nav.eq(a);
            var e = d.attr(b.options.navIframe);
            if (e) {
                var f = document.createElement("iframe");
                f.src = e,
                    f.border = 0,
                    f.frameborder = "no",
                    f.marginwidth = 0,
                    f.marginheight = 0,
                    c.html(f),
                    d.removeAttr(b.options.navIframe)
            }
        },
        update: function(c, d) {
            var e = this;
            var f = e.options;
            var g = e.main.length;
            var h = -1;
            var i = -1;
            var j = !1;
            if (a.isFunction(c) && (d = c,
                    c = 0),
                    isNaN(parseInt(c)) ? (c.hasClass(f.mainClass) || (c = c.closest("." + f.mainClass)),
                    c.hasClass(f.mainClass) && (i = c.data("switchable-idx"))) : i = c,
                    h = i,
                f.autoPlay && (e.stopPlay(),
                    f.autoPlay = !1,
                    j = !0),
                f.seamlessLoop && g > f.step) {
                var k = e.main.length - 2 * f.step;
                var l = !1;
                e.main.each(function() {
                    var c = a(this);
                    "1" == c.data("switchable-clone") && (l = !0,
                        a(this).remove())
                }),
                l && (h = i < f.step || i >= k + f.step ? i >= k + f.step ? i - k - f.step : k - f.step + i : i - f.step)
            }
            if (f.hasPage) {
                var m = e.el.find("." + f.nextClass);
                var n = e.el.find("." + f.prevClass);
                m.unbind("click"),
                    n.unbind("click")
            }
            e.main = e.el.find("." + f.mainClass),
                g = e.main.length;
            var o = function(a) {
                    if (a == b || null  == a) {
                        var c = e.el.find("." + f.mainClass).length;
                        g > c ? h -= g - c : h = c > g ? c > f.visible ? c - f.visible : 0 : e.current,
                        0 > h && (h = 0),
                        j && (f.autoPlay = !0),
                        f.autoLock && !f.seamlessLoop && h + f.visible >= c && (h = c - f.visible,
                        0 > h && (h = 0))
                    } else
                        h = a;
                    f.defaultPanel = h,
                        e.init()
                }
                ;
            d.call(e.main.eq(h), e.content, h, o) ? e.el.find("." + f.mainClass).each(function(b) {
                a(this).data("switchable-idx", b)
            }) : o()
        }
    })
}(jQuery);
/* jdf-1.0.0/ easing.js Date:2015-09-15 18:39:14 */
!function(a, b) {
    jQuery.easing.jswing = jQuery.easing.swing,
        jQuery.extend(jQuery.easing, {
            def: "easeOutQuad",
            swing: function(a, b, c, d, e) {
                return jQuery.easing[jQuery.easing.def](a, b, c, d, e)
            },
            easeInQuad: function(a, b, c, d, e) {
                return d * (b /= e) * b + c
            },
            easeOutQuad: function(a, b, c, d, e) {
                return -d * (b /= e) * (b - 2) + c
            },
            easeInOutQuad: function(a, b, c, d, e) {
                return (b /= e / 2) < 1 ? d / 2 * b * b + c : -d / 2 * (--b * (b - 2) - 1) + c
            },
            easeInCubic: function(a, b, c, d, e) {
                return d * (b /= e) * b * b + c
            },
            easeOutCubic: function(a, b, c, d, e) {
                return d * ((b = b / e - 1) * b * b + 1) + c
            },
            easeInOutCubic: function(a, b, c, d, e) {
                return (b /= e / 2) < 1 ? d / 2 * b * b * b + c : d / 2 * ((b -= 2) * b * b + 2) + c
            },
            easeInQuart: function(a, b, c, d, e) {
                return d * (b /= e) * b * b * b + c
            },
            easeOutQuart: function(a, b, c, d, e) {
                return -d * ((b = b / e - 1) * b * b * b - 1) + c
            },
            easeInOutQuart: function(a, b, c, d, e) {
                return (b /= e / 2) < 1 ? d / 2 * b * b * b * b + c : -d / 2 * ((b -= 2) * b * b * b - 2) + c
            },
            easeInQuint: function(a, b, c, d, e) {
                return d * (b /= e) * b * b * b * b + c
            },
            easeOutQuint: function(a, b, c, d, e) {
                return d * ((b = b / e - 1) * b * b * b * b + 1) + c
            },
            easeInOutQuint: function(a, b, c, d, e) {
                return (b /= e / 2) < 1 ? d / 2 * b * b * b * b * b + c : d / 2 * ((b -= 2) * b * b * b * b + 2) + c
            },
            easeInSine: function(a, b, c, d, e) {
                return -d * Math.cos(b / e * (Math.PI / 2)) + d + c
            },
            easeOutSine: function(a, b, c, d, e) {
                return d * Math.sin(b / e * (Math.PI / 2)) + c
            },
            easeInOutSine: function(a, b, c, d, e) {
                return -d / 2 * (Math.cos(Math.PI * b / e) - 1) + c
            },
            easeInExpo: function(a, b, c, d, e) {
                return 0 == b ? c : d * Math.pow(2, 10 * (b / e - 1)) + c
            },
            easeOutExpo: function(a, b, c, d, e) {
                return b == e ? c + d : d * (-Math.pow(2, -10 * b / e) + 1) + c
            },
            easeInOutExpo: function(a, b, c, d, e) {
                return 0 == b ? c : b == e ? c + d : (b /= e / 2) < 1 ? d / 2 * Math.pow(2, 10 * (b - 1)) + c : d / 2 * (-Math.pow(2, -10 * --b) + 2) + c
            },
            easeInCirc: function(a, b, c, d, e) {
                return -d * (Math.sqrt(1 - (b /= e) * b) - 1) + c
            },
            easeOutCirc: function(a, b, c, d, e) {
                return d * Math.sqrt(1 - (b = b / e - 1) * b) + c
            },
            easeInOutCirc: function(a, b, c, d, e) {
                return (b /= e / 2) < 1 ? -d / 2 * (Math.sqrt(1 - b * b) - 1) + c : d / 2 * (Math.sqrt(1 - (b -= 2) * b) + 1) + c
            },
            easeInElastic: function(a, b, c, d, e) {
                var f = 1.70158;
                var g = 0;
                var h = d;
                if (0 == b)
                    return c;
                if (1 == (b /= e))
                    return c + d;
                if (g || (g = .3 * e),
                    h < Math.abs(d)) {
                    h = d;
                    var f = g / 4
                } else
                    var f = g / (2 * Math.PI) * Math.asin(d / h);
                return -(h * Math.pow(2, 10 * (b -= 1)) * Math.sin(2 * (b * e - f) * Math.PI / g)) + c
            },
            easeOutElastic: function(a, b, c, d, e) {
                var f = 1.70158;
                var g = 0;
                var h = d;
                if (0 == b)
                    return c;
                if (1 == (b /= e))
                    return c + d;
                if (g || (g = .3 * e),
                    h < Math.abs(d)) {
                    h = d;
                    var f = g / 4
                } else
                    var f = g / (2 * Math.PI) * Math.asin(d / h);
                return h * Math.pow(2, -10 * b) * Math.sin(2 * (b * e - f) * Math.PI / g) + d + c
            },
            easeInOutElastic: function(a, b, c, d, e) {
                var f = 1.70158;
                var g = 0;
                var h = d;
                if (0 == b)
                    return c;
                if (2 == (b /= e / 2))
                    return c + d;
                if (g || (g = .3 * e * 1.5),
                    h < Math.abs(d)) {
                    h = d;
                    var f = g / 4
                } else
                    var f = g / (2 * Math.PI) * Math.asin(d / h);
                return 1 > b ? -.5 * h * Math.pow(2, 10 * (b -= 1)) * Math.sin(2 * (b * e - f) * Math.PI / g) + c : h * Math.pow(2, -10 * (b -= 1)) * Math.sin(2 * (b * e - f) * Math.PI / g) * .5 + d + c
            },
            easeInBack: function(a, c, d, e, f, g) {
                return g == b && (g = 1.70158),
                e * (c /= f) * c * ((g + 1) * c - g) + d
            },
            easeOutBack: function(a, c, d, e, f, g) {
                return g == b && (g = 1.70158),
                e * ((c = c / f - 1) * c * ((g + 1) * c + g) + 1) + d
            },
            easeInOutBack: function(a, c, d, e, f, g) {
                return g == b && (g = 1.70158),
                    (c /= f / 2) < 1 ? e / 2 * c * c * (((g *= 1.525) + 1) * c - g) + d : e / 2 * ((c -= 2) * c * (((g *= 1.525) + 1) * c + g) + 2) + d
            },
            easeInBounce: function(a, b, c, d, e) {
                return d - jQuery.easing.easeOutBounce(a, e - b, 0, d, e) + c
            },
            easeOutBounce: function(a, b, c, d, e) {
                return (b /= e) < 1 / 2.75 ? 7.5625 * d * b * b + c : 2 / 2.75 > b ? d * (7.5625 * (b -= 1.5 / 2.75) * b + .75) + c : 2.5 / 2.75 > b ? d * (7.5625 * (b -= 2.25 / 2.75) * b + .9375) + c : d * (7.5625 * (b -= 2.625 / 2.75) * b + .984375) + c
            },
            easeInOutBounce: function(a, b, c, d, e) {
                return e / 2 > b ? .5 * jQuery.easing.easeInBounce(a, 2 * b, 0, d, e) + c : .5 * jQuery.easing.easeOutBounce(a, 2 * b - e, 0, d, e) + .5 * d + c
            }
        })
}(jQuery);
/* jdf-1.0.0/ fixable.js Date:2015-09-15 18:39:14 */
!function(a) {
    var c = [];
    function d(a) {
        c.push(a)
    }
    a(window).bind("resize", function() {
        a.each(c, function(a, b) {
            b.onResize()
        })
    });
    function e(b, c) {
        var d = this.el;
        var e = this.options;
        var f = e.context;
        var g = f.offset().left;
        var h = f.offset().top;
        var i = f.outerWidth();
        var j = f.outerHeight();
        var k = a.page.clientWidth();
        var l = a.page.clientHeight();
        var m = {
            xValue: b,
            yValue: c
        };
        "left" == e.x ? ("center" == e.xValue ? m.xValue = i / 100 * 50 - d.outerWidth() / 2 : -1 != ("" + b).indexOf("%") && (m.xValue = i / 100 * parseInt(b)),
            m.xValue += g) : "right" == e.x && ("center" == e.xValue ? m.xValue = i / 100 * 50 - d.outerWidth() / 2 : -1 != ("" + b).indexOf("%") && (m.xValue = i / 100 * parseInt(b)),
            m.xValue += k - (g + i));
        var n = h + j > l ? l : j;
        return "top" == e.y ? ("center" == e.yValue ? m.yValue = n / 100 * 50 - d.outerHeight() / 2 : -1 != ("" + c).indexOf("%") && (m.yValue = n / 100 * parseInt(c)),
        l > h + j && (m.yValue += h)) : "bottom" == e.y && ("center" == e.yValue ? m.yValue = n / 100 * 50 - d.outerHeight() / 2 : -1 != ("" + c).indexOf("%") && (m.yValue = n / 100 * parseInt(c)),
        l > h + j && (m.yValue += l - (h + j))),
            m
    }
    function f() {
        var b = this.el;
        var c = this.options;
        var d = a.browser.isIE6();
        var f = {};
        var g = c.context;
        var h = c.xValue;
        var i = c.yValue;
        if ("center" == h) {
            var j = b.outerWidth() / 2;
            d ? h = a.page.clientWidth() / 2 - j : (g || (f.marginLeft = -j),
                h = "50%")
        }
        if ("center" == i) {
            var k = b.outerHeight() / 2;
            d ? i = a.page.clientHeight() / 2 - k : (g || (f.marginTop = -k),
                i = "50%")
        }
        if (g) {
            var l = e.call(this, h, i);
            h = l.xValue,
                i = l.yValue
        }
        d ? (f.position = "absolute",
        -1 != ("" + h).indexOf("%") && (h = a.page.clientWidth() / 100 * parseInt(h)),
        -1 != ("" + i).indexOf("%") && (i = a.page.clientHeight() / 100 * parseInt(i)),
        0 > h && (h = 1),
        0 > i && (i = 1),
        "top" == c.y && b[0].style.setExpression("top", "eval((document.documentElement||document.body).scrollTop+" + i + ") + 'px'"),
        "bottom" == c.y && b[0].style.setExpression("top", "eval((document.documentElement||document.body).scrollTop+ " + -i + " + (document.documentElement||document.body).clientHeight-this.offsetHeight-(parseInt(this.currentStyle.marginTop,10)||0)-(parseInt(this.currentStyle.marginBottom,10)||0))+'px'"),
        "left" == c.x && b[0].style.setExpression("left", "eval((document.documentElement||document.body).scrollLeft+" + h + ") + 'px'"),
        "right" == c.x && b[0].style.setExpression("left", "(eval((document.documentElement||document.body).scrollLeft + " + -h + " + (document.documentElement||document.body).clientWidth-this.offsetWidth)-(parseInt(this.currentStyle.marginLeft,10)||0)-(parseInt(this.currentStyle.marginRight,10)||0)) + 'px'"),
            a("html").eq(0).css("text-overflow", "ellipsis")) : (f.position = "fixed",
            f[c.x] = h,
            f[c.y] = i),
            b.css(f)
    }
    a.ui.define("fixable", {
        options: {
            context: null ,
            delay: 50,
            x: "left",
            y: "top",
            xValue: 0,
            yValue: 0,
            zIndex: null
        },
        resizeThread: -1,
        init: function() {
            var a = this;
            var b = a.el;
            var c = a.options;
            null  != c.zIndex && b.css("z-index", c.zIndex),
            c.context && 0 == c.context.length && (c.context = null ),
                f.call(a),
            a.options.delay >= 0 && d(a)
        },
        onResize: function() {
            var a = this;
            var b = a.options;
            clearTimeout(a.resizeThread),
                a.resizeThread = setTimeout(function() {
                    f.call(a)
                }, b.delay)
        }
    })
}(jQuery);
/* jdf-1.0.0/ smartkey.js Date:2015-09-15 18:39:13 */
!function(a) {
    var c = {};
    var d = [];
    var e = null ;
    var f = null ;
    var g = !1;
    var h = !1;
    var i = {
        27: "esc",
        9: "tab",
        32: "space",
        13: "enter",
        8: "backspace",
        145: "scrollclock",
        20: "capslock",
        144: "numlock",
        19: "pause",
        45: "insert",
        36: "home",
        46: "delete",
        35: "end",
        33: "pageup",
        34: "pagedown",
        37: "left",
        38: "up",
        39: "right",
        40: "down",
        112: "f1",
        113: "f2",
        114: "f3",
        115: "f4",
        116: "f5",
        117: "f6",
        118: "f7",
        119: "f8",
        18: "alt",
        120: "f9",
        121: "f10",
        122: "f11",
        123: "f12",
        17: "ctrl",
        16: "shift",
        109: "-",
        107: "=",
        219: "[",
        221: "]",
        220: "\\",
        222: "'",
        187: "=",
        188: ",",
        189: "-",
        190: ".",
        191: "/",
        96: "0",
        97: "1",
        98: "2",
        99: "3",
        100: "4",
        101: "5",
        102: "6",
        103: "7",
        104: "8",
        105: "9",
        106: "*",
        110: ".",
        111: "/",
        48: "0",
        49: "1",
        50: "2",
        51: "3",
        52: "4",
        53: "5",
        54: "6",
        55: "7",
        56: "8",
        57: "9",
        65: "a",
        66: "b",
        67: "c",
        68: "d",
        69: "e",
        70: "f",
        71: "g",
        72: "h",
        73: "i",
        74: "j",
        75: "k",
        76: "l",
        77: "m",
        78: "n",
        79: "o",
        80: "p",
        81: "q",
        82: "r",
        83: "s",
        84: "t",
        85: "u",
        86: "v",
        87: "w",
        88: "x",
        89: "y",
        90: "z"
    };
    var j = {
        27: "esc",
        9: "tab",
        13: "enter",
        17: "ctrl",
        16: "shift",
        18: "alt",
        20: "capslock",
        144: "numlock",
        35: "end",
        33: "pageup",
        34: "pagedown",
        37: "left",
        38: "up",
        39: "right",
        40: "down"
    };
    var k = function(b, d) {
            this.el = b,
                this.name = d.name,
                this.keys = d.keys,
                this.excludeInput = d.excludeInput,
                this.callback = d.callback,
                c[d.name] = this,
            null  != b && (b.bind("click", function() {
                h = !0,
                    f = b,
                    setTimeout(function() {
                        h = !1
                    }, 50)
            }),
            g || (g = !0,
                a(document).bind("click", function() {
                    h || (f = null )
                })))
        }
        ;
    function l(b) {
        var g = d.join("+");
        a.each(c, function(c, d) {
            (b && !d.excludeInput || !b && d.excludeInput) && a.each(d.keys, function(a, b) {
                return g == b ? (f == d.el ? d.callback.call(d.el, e) : null  == f && d.callback(e),
                    !1) : void 0
            })
        })
    }
    function m() {
        for (var a = 0; a < d.length; a++)
            if (d[a].length > 1)
                return !0;
        return !1
    }
    a(document).bind("keydown", function(a) {
        var b = document.activeElement.tagName.toLowerCase();
        var c = a ? a : window.event;
        var f = null ;
        "input" == b || "textarea" == b ? (f = j[c.keyCode || c.which],
        f && f != e && (e = f,
            d = [f],
            l(!0),
            e = null )) : (f = i[c.keyCode || c.which],
        f && f != e && (e = f,
            d.push(f),
            l(!1)))
    }),
        a(document).bind("keyup", function(a) {
            var b = document.activeElement.tagName.toLowerCase();
            var c = a ? a : window.event;
            if (f = i[c.keyCode || c.which],
                "input" == b || "textarea" == b)
                d = [],
                    e = null ;
            else {
                var f = i[c.keyCode || c.which];
                for (var g = d.length - 1; g >= 0; g--)
                    f == d[g] && d.splice(g, 1);
                m() && (d = []),
                    e = null
            }
        }),
        a.ui.define("smartkey", {
            options: {
                name: null ,
                keys: null ,
                excludeInput: !0,
                callback: null
            },
            hotKey: null ,
            init: function() {
                var a = this;
                var b = a.el;
                var c = a.options;
                (b[0] == document.body || b[0] == document || b[0] == window) && (b = null ),
                    a.hotKey = new k(b,c)
            }
        })
}(jQuery);
/* jdf-1.0.0/ elevator.js Date:2015-09-15 18:39:14 */
!function(a) {
    var c = -1;
    var d = -1;
    var e = [];
    var f = function(b, c) {
            var d = this;
            a.extend(d, c),
                d.self = b,
                d.isPlay = !1,
                d.isScrolling = !1,
                d.scrollThread = -1,
                d.resizeThread = -1,
                d.currentIdx = -1,
                d.floorList.each(function(b) {
                    a(this).attr("data-idx", b)
                }),
                d.handlers.each(function(b) {
                    a(this).attr("data-idx") || a(this).attr("data-idx", b)
                }),
                d.onScroll(),
                e.push(d)
        }
        ;
    f.prototype.onScroll = function() {
        var b = this;
        b.isPlay || (b.isScrolling || (b.isScrolling = !0,
        a.isFunction(b.onStart) && b.onStart()),
            clearTimeout(b.scrollThread),
            b.scrollThread = setTimeout(function() {
                var c = !1;
                var d = i(b.floorList);
                d && (c = !0,
                a.isFunction(b.onEnd) && b.onEnd.call(b, d)),
                    g(b, c),
                c || a.isFunction(b.onOut) && b.onOut.call(b),
                    b.isScrolling = !1
            }, 200))
    }
        ,
        f.prototype.onResize = function() {
            var b = this;
            clearTimeout(b.resizeThread),
                b.resizeThread = setTimeout(function() {
                    a.isFunction(b.onResizeCallback) && b.onResizeCallback.call(b)
                }, 200)
        }
        ,
        f.prototype.remove = function() {
            var b = this;
            return a.each(e, function(a, c) {
                return b == c ? (e.slice(a, 1),
                    !0) : void 0
            }),
                !1
        }
    ;
    function g(b, c) {
        if ("auto" == b.threshold)
            c ? b.elevatorBox.show() : b.elevatorBox.hide();
        else if (null  != b.threshold) {
            var d = a("body").scrollTop() || a("html").scrollTop();
            var e = b.threshold;
            b.threshold instanceof a && (e = b.threshold.offset().top),
                e > d ? b.elevatorBox.hide() : b.elevatorBox.show()
        }
    }
    function h(b, c) {
        var d = a("body,html");
        b.effectSmooth && d.stop(),
            d.animate({
                scrollTop: b.top
            }, b.delay, b.easing, function() {
                c && (c(),
                    c = null )
            })
    }
    function i(b) {
        var c = [];
        var d = a(window).height();
        var e = a("body").scrollTop() || a("html").scrollTop();
        var f = 0;
        var g = 0;
        var h = 0;
        var i = null ;
        var j = !1;
        return a.each(b, function() {
            if (i = a(this),
                    f = i.offset().top,
                    g = i.outerHeight(),
                    h = f + g,
                h > e && e + d > f) {
                var b = 0;
                e > f && (b = h - e),
                f > e && e + d > f && (b = e + d - f),
                !j && b > d / 3 && (j = !0,
                    b = 9999),
                    c.push({
                        floor: i,
                        ch: b
                    })
            }
        }),
            c.length > 0 ? (c.sort(function(a, b) {
                return a.ch < b.ch ? -1 : 1
            }),
                c.pop().floor) : null
    }
    function j(a, b, c) {
        a.removeClass(c),
            b.addClass(c)
    }
    function k(a, b, c, d) {
        return {
            handler: a[d],
            floor: b[d],
            from: c || -1,
            to: d
        }
    }
    a(window).bind("scroll", function() {
        clearTimeout(c),
            c = setTimeout(function() {
                clearTimeout(c),
                    a.each(e, function(a, b) {
                        b.onScroll()
                    })
            }, 50)
    }),
        a(window).bind("resize", function() {
            clearTimeout(d),
                d = setTimeout(function() {
                    a.each(e, function(a, b) {
                        b.onResize()
                    })
                }, 50)
        }),
        a.ui.define("elevator", {
            options: {
                floorClass: "floor",
                elevatorClass: "elevator",
                handlerClass: "handler",
                selectClass: null ,
                event: "click",
                delay: 300,
                easing: null ,
                effectSmooth: !0,
                threshold: "auto",
                floorScrollMargin: 0,
                onStart: null ,
                onEnd: null ,
                onOut: null
            },
            floorList: null ,
            elevatorBox: null ,
            handlers: null ,
            elevator: null ,
            init: function() {
                var b = this;
                var c = b.options;
                var d = b.el;
                var e = b.floorList = d.find("." + c.floorClass);
                var g = b.elevatorBox = a("." + c.elevatorClass);
                var i = b.handlers = a("." + c.handlerClass, g);
                if (c.floorScrollMargin = isNaN(parseInt(c.floorScrollMargin)) ? 0 : parseInt(c.floorScrollMargin),
                    e.length > 0 && e.length == i.length) {
                    null  != c.threshold && g.hide();
                    var l = b.elevator = new f(b,{
                        floorList: e,
                        elevatorBox: g,
                        handlers: i,
                        delay: c.delay,
                        threshold: c.threshold,
                        selectClass: c.selectClass,
                        onStart: function() {
                            a.isFunction(c.onStart) && c.onStart.call(b, k(i, e, l ? l.currentIdx : -1, -1))
                        },
                        onEnd: function(d) {
                            if (d) {
                                var f = d.attr("data-idx");
                                var g = l.currentIdx;
                                if (l.currentIdx = f,
                                    f < l.handlers.length && f > -1) {
                                    var h = a(l.handlers.filter("[data-idx=" + f + "]"));
                                    if (!h || h.length < 1)
                                        return !1;
                                    j(i, h, c.selectClass),
                                    a.isFunction(c.onEnd) && c.onEnd.call(b, k(i, e, g, f))
                                }
                            }
                        },
                        onOut: function() {
                            c.selectClass && i.removeClass(c.selectClass),
                            a.isFunction(c.onOut) && c.onOut.call(b, g)
                        }
                    });
                    if (c.event) {
                        var m = -1;
                        i.live(c.event, function(d) {
                            var f = a(this);
                            var n = f.attr("data-idx");
                            var o = a(e[n]);
                            var p = l.currentIdx;
                            var q = null ;
                            clearTimeout(m),
                                l.isPlay = !0,
                                l.currentIdx = n,
                                q = k(i, e, p, n),
                            a.isFunction(c.onStart) && c.onStart.call(b, q),
                            c.selectClass && j(i, f, c.selectClass),
                                h({
                                    top: o.offset().top + c.floorScrollMargin,
                                    delay: c.delay,
                                    easing: c.easing,
                                    effectSmooth: c.effectSmooth
                                }, function() {
                                    a.isFunction(c.onEnd) && c.onEnd.call(b, q),
                                        m = setTimeout(function() {
                                            l.isPlay = !1
                                        }, 100),
                                        g.show()
                                }),
                                d.preventDefault()
                        })
                    }
                }
            },
            "goto": function(a) {
                var b = this;
                var c = b.options;
                var d = b.handlers;
                return 0 > a || a >= d.length || !c.event ? !1 : void d.eq(a).trigger(c.event)
            }
        })
}(jQuery);
/* product-home/1.0.0 hotwords.js Date:2015-12-01 17:15:35 */
define("product/home/1.0.0/widget/hotwords/hotwords.js", ["jdf/1.0.0/unit/cookie/1.0.0/cookie.js"], function(require) {
    var c = require("jdf/1.0.0/unit/cookie/1.0.0/cookie.js");
    function d() {
        var a = (c("__jda") || "").split(".");
        a = a.length >= 2 ? a[1] : "-1",
            $.ajax({
                url: "//ai.jd.com/index/hotWords.php",
                data: {
                    pin: c("pin") || 0,
                    uuid: a
                },
                dataType: "jsonp",
                scriptCharset: "utf-8",
                cache: !0,
                jsonpCallback: "cathot",
                success: function(a) {
                    if (a && "object" == typeof a) {
                        a = a.data;
                        var b = "";
                        var c = [];
                        var d = 0;
                        if ($.each(a, function(a, e) {
                                var f = "h|keycount|2015|03b" + (a + 1);
                                if (e.n)
                                    if (2 == e.c)
                                        c.push(e.n);
                                    else if (9 > d) {
                                        var g = 1 == e.c ? 'class="style-red"' : "";
                                        b += '<a href="' + e.u + '" target="_blank" ' + g + ' clstag="' + f + '">' + e.n + "</a>",
                                            d++
                                    }
                            }),
                                c.length) {
                            var e = Math.floor(c.length * Math.random());
                            var f = c[e];
                            $("#search-2014 #key").val(f).bind("focus", function() {
                                var a = this;
                                a.value == f && (a.value = "",
                                    a.style.color = "#333")
                            }).bind("blur", function() {
                                var a = this;
                                a.value || (a.value = f,
                                    a.style.color = "#999")
                            })
                        }
                        $("#hotwords-2014").html(b)
                    }
                }
            })
    }
    return d
});
/* product-home/1.0.0 elevator.js Date:2015-11-20 12:12:47 */
define("product/home/1.0.0/widget/elevator/elevator.js", ["jdf/1.0.0/ui/easing/1.0.0/easing.js", "jdf/1.0.0/ui/fixable/1.0.0/fixable.js", "jdf/1.0.0/ui/smartkey/1.0.0/smartkey.js", "jdf/1.0.0/ui/elevator/1.0.0/elevator.js"], function(require, a) {
    require("jdf/1.0.0/ui/easing/1.0.0/easing.js"),
        require("jdf/1.0.0/ui/fixable/1.0.0/fixable.js"),
        require("jdf/1.0.0/ui/smartkey/1.0.0/smartkey.js"),
        require("jdf/1.0.0/ui/elevator/1.0.0/elevator.js");
    function c() {
        var a = $(".floor:eq(0)");
        if (a && a.length > 0) {
            var b = [];
            var c = [];
            $(".floor").each(function(a) {
                b.push({
                    f: a + 1 + "F",
                    n: $(this).data("title")
                })
            }),
                $.each(b, function(a, b) {
                    c.push('<li class="handler" clstag="h|keycount|2015|15' + (9 > a ? "0" + (a + 1) : a + 1) + '"><a href="javascript:;">' + b.f + '</a><a href="javascript:;" class="etitle">' + b.n + "</a></li>")
                }),
                $("body").append('<div id="elevator" class="elevator"><ul ' + (pageConfig.wideVersion ? "" : 'style="display: none;"') + ">" + c.join("") + "</ul></div>");
            var d = $("#elevator");
            pageConfig.wideVersion && (d.fixable({
                x: "left",
                y: "top",
                xValue: -(d.width() + 5),
                yValue: "center",
                zIndex: 5,
                context: a
            }),
                d.delegate(".handler", "mouseenter", function() {
                    $(this).addClass("hover")
                }),
                d.delegate(".handler", "mouseleave", function() {
                    $(this).removeClass("hover")
                }));
            var e = $("body").elevator({
                floorClass: "floor",
                elevatorClass: "elevator",
                handlerClass: "handler",
                selectClass: "current",
                delay: 1200,
                easing: "easeOutCirc",
                onStart: function() {},
                onEnd: function(a) {
                    $(a.floor).addClass("floor-current").siblings().removeClass("floor-current")
                }
            });
            var f = [];
            e.handlers.each(function(a) {
                var b = "f+" + (a + 1);
                f.push(b)
            }),
                $("body").smartkey({
                    name: "elevator",
                    keys: f,
                    callback: function(a) {
                        e.goto(a - 1)
                    }
                })
        }
    }
    a.init = c
});
/* product-home/1.0.0 focus.js Date:2015-12-21 14:14:36 */
seajs.use(["jdf/1.0.0/ui/switchable/1.0.0/switchable", "jdf/1.0.0/ui/lazyload/1.0.0/lazyload.js"], function() {
    var c = pageConfig.focusData;
    var d = ""
        , e = "";
    pageConfig.clog = {};
    for (var f = 0; f < c.length; f++) {
        var g = c[f];
        var h = g.length;
        h && (g = pageConfig.FN_GetRandomData(g),
            pageConfig.clog.logDomain = g.logDomain,
            pageConfig.clog.logV = g.logV,
        pageConfig.wideVersion && pageConfig.compatible || (g.src = g.srcB,
            g.width = g.widthB),
            d += '				<li class="slider-panel ' + ("0" == g.index ? "slider-panel-selected" : "") + '" style="background-color:#' + g.ext1 + ';">					<div class="inner">						<a target="_blank" href="' + g.href + '" fclog="' + g.clog + '" clstag="h|keycount|2015|08a' + (f + 1) + '">							<img  data-lazy-img="' + g.src + '" width="' + g.width + '" height="' + g.height + '" alt="' + g.alt + '" src="//misc.360buyimg.com/lib/img/e/blank.gif" />						</a>					</div>				</li>',
            e += '<li class="slider-item ' + ("0" == g.index ? "slider-selected" : "") + '">' + (f + 1) + "</li>")
    }
    var i = '		<ul class="slider-main">' + d + '</ul>		<div class="slider-extra">			<ul class="slider-nav">' + e + '</ul>				<div class="slider-page">					<a href="javascript:void(0)" class="slider-prev">&lt;</a> 					<a href="javascript:void(0)" class="slider-next">&gt;</a> 			</div>		</div>	';
    var j = null ;
    var k = null ;
    var l = $("#focus");
    l.find(".slider").html(i);
    var m = l.switchable({
        type: "focus",
        hasPage: !0,
        autoPlay: !0,
        mainSelectedClass: "slider-panel-selected",
        navSelectedClass: "slider-selected",
        bodyClass: "slider-body",
        contentClass: "slider-main",
        navItem: "slider-item",
        mainClass: "slider-panel",
        prevClass: "slider-prev",
        nextClass: "slider-next",
        event: "mouseenter",
        stayTime: 4e3,
        callback: function(a) {
            this.el.find("." + this.options.mainClass).eq(a).lazyload({
                delay: 0
            }),
                clearTimeout(k),
                j = new Date
        }
    });
    l.hover(function(a) {
        clearTimeout(k);
        var b = new Date;
        "mouseenter" == a.type ? (j = b,
            m.stopPlay()) : b - j >= 4e3 ? m.next() : k = setTimeout(function() {
            m.stopPlay(),
                m.next(),
                m.autoPlay()
        }, 4e3 - (b - j))
    });
    var n;
    var o = function() {
            clearTimeout(n),
                l.find(".slider-page").show()
        }
        ;
    var p = function() {
            n = setTimeout(function() {
                l.find(".slider-page").hide()
            }, 100)
        }
        ;
    l.find(".slider-panel").size() > 1 && (l.find(".slider-panel a").bind("mouseenter", o).bind("mouseleave", p),
        l.find(".slider-page a").bind("mouseenter", o).bind("mouseleave", p)),
        function() {
            var a = new Date(pageConfig.timestamp);
            if ((isNaN(a) || 14506272e5 > a || a >= 14507136e5) && !/test_rtb=1/.test(location.search))
                return !1;
            var b = 1753;
            pageConfig.wideVersion && pageConfig.compatible || (b = 1754);
            var c = $(".slider .slider-panel:eq(5)", l);
            return c.length ? void $.getJSON("//x.jd.com/focus?spread_type=1&ad_type=10&template=0&ad_ids=" + b + ":1&callback=?", function(a) {
                if (a && $.isArray(a[b]) && a[b].length) {
                    var d = a[b][0];
                    $("a:eq(0)", c).attr("href", d.click_url),
                        d.image_url = "//img13.360buyimg.com/da/" + d.image_url;
                    var e = $("a:eq(0) img", c);
                    5 == m.current ? e.attr("data-lazy-img", "done").attr("src", d.image_url) : e.attr("data-lazy-img", d.image_url).attr("src", "//misc.360buyimg.com/lib/img/e/blank.gif"),
                        (new Image).src = d.exposal_url
                }
            }) : !1
        }()
});
/* product-home/1.0.0 lifeserv.js Date:2015-11-20 12:12:46 */
seajs.use(["jdf/1.0.0/ui/easing/1.0.0/easing"], function() {
    var a = $("#lifeserv");
    var b = $([".fore1", ".fore2", ".fore3", ".fore4"].join(","), a);
    var c = ["h|keycount|2015|10b02x", "h|keycount|2015|10b01x", "h|keycount|2015|10b03x", "h|keycount|2015|10b04x"];
    var d = $(".mc-inner", a);
    var e = $("div", d);
    var f = b.eq(0).parent();
    var g = !1;
    var h = -1;
    var i = 150;
    var j = 150;
    var k = null ;
    var l = !1;
    var m = 208;
    var n = 28;
    var o = !1;
    var p = 41;
    var q = 13;
    var r = -1;
    var s = -1;
    function t() {
        clearTimeout(h),
            e.addClass("hide"),
            d.addClass("hide")
    }
    function u() {
        b.removeClass("current"),
            e.addClass("hide")
    }
    function v() {
        clearTimeout(h),
            b.removeClass("current"),
            f.removeClass("lifeserv-current"),
            b.find(".cw-icon").stop().animate({
                paddingTop: p
            }, j),
            b.find(".ci-left").stop().animate({
                top: q
            }, j),
            d.stop().animate({
                top: n + 40
            }, j, function() {
                setTimeout(function() {
                    d.animate({
                        top: m
                    }, j, function() {
                        e.addClass("hide"),
                            d.addClass("hide")
                    })
                }, 0)
            }),
            l = !1,
            y()
    }
    !function() {
        e.each(function(a) {
            var b = $(this);
            b.data("idx") || b.attr("data-idx", a)
        }),
            b.each(function(a) {
                var b = $(this);
                b.data("idx") || b.attr("data-idx", a)
            }),
            d.css({
                top: m
            }),
            b.bind("mouseenter", function() {
                var a = $(this);
                if (g) {
                    if (3 == a.index())
                        return void setTimeout(function() {
                            g = !1
                        }, 0);
                    g = !1
                }
                clearTimeout(s),
                    clearTimeout(r),
                    r = setTimeout(function() {
                        var g = a.data("iframe");
                        var h = a.data("idx");
                        var j = e.filter("[data-idx=" + h + "]");
                        null  != k && k.get(0) != a.get(0) && e.find("iframe").blur(),
                            k = a,
                        l || t(),
                            u(),
                        g && (j.html('<a class="close" clstag="' + c[h] + '">\xd7</a><iframe width="250" height="185" frameborder="0" scrolling="no" src="' + g + '"></iframe>'),
                            a.data("iframe", null )),
                            j.removeClass("hide"),
                            d.hasClass("hide") ? (l = !0,
                                o = !1,
                                d.removeClass("hide").stop().animate({
                                    top: n + 40
                                }, i, function() {
                                    setTimeout(function() {
                                        b.find(".cw-icon").animate({
                                            paddingTop: 0
                                        }, i),
                                            b.find(".ci-left").animate({
                                                top: -25
                                            }, i),
                                            d.animate({
                                                top: n
                                            }, i, function() {
                                                k.addClass("current"),
                                                    f.addClass("lifeserv-current"),
                                                    o = !0,
                                                    x()
                                            })
                                    }, 0)
                                })) : o && a.addClass("current")
                    }, 200)
            }),
            b.bind("mouseleave", function() {
                clearTimeout(r)
            }),
            a.delegate(".close", "click", function(a) {
                g = !0,
                    b.removeClass("simple"),
                    b.removeClass("current"),
                    v(),
                    a.preventDefault()
            })
    }();
    var w = null ;
    var x = function(b) {
            w ? y() : w = function(b) {
                $.contains(a.get(0), b.target) || a.get(0) == b.target || (clearTimeout(r),
                    clearTimeout(s),
                    s = setTimeout(function() {
                        v()
                    }, 200))
            }
                ,
            b && b.stopPropagation(),
                $(document).bind("click", w)
        }
        ;
    var y = function() {
        $(document).unbind("click", w)
    }
});
/* product-home/1.0.0 patch.js Date:2015-12-01 17:15:36 */
define("product/home/1.0.0/js/patch.js", [], function(require, a) {
    function c() {
        /\?v=2014/.test(location.search) && (createCookie("jd2015", 3, 30, "/;domain=www.jd.com"),
            window.location = "//www.jd.com/?" + Math.random()),
            function() {
                pageConfig.toolbar || $("body").append('<div id="research" class="research" clstag="h|keycount|2015|16c">						<a href="http://sale.jd.com/act/FuQOjkwoBfd6JPLe.html" target="_blank">							<em class="icon-dog"></em>							<em class="research-text"><span>\u6709\u5956\u8c03\u67e5</span></em>						</a>					</div>'),
                    $("#research").fixable({
                        x: "right",
                        y: "bottom",
                        xValue: 0,
                        yValue: "50%",
                        zIndex: 10
                    }),
                    setTimeout(function() {
                        $("#research").css({
                            width: 91
                        }),
                            $("#research").addClass("researchhover")
                    }, 600);
                var a = setTimeout(function() {
                    $("#research").removeClass("researchhover")
                }, 1200);
                var b = setTimeout(function() {
                    $("#research").css({
                        width: 31
                    })
                }, 1600);
                var c;
                $("#research").bind("mouseenter", function() {
                    clearTimeout(a),
                        clearTimeout(b),
                        clearTimeout(c),
                        $("#research").css({
                            width: 91
                        }),
                        $(this).addClass("researchhover")
                }).bind("mouseleave", function() {
                    $(this).removeClass("researchhover"),
                        c = setTimeout(function() {
                            $("#research").css({
                                width: 31
                            })
                        }, 400)
                })
            }(),
            function() {
                setTimeout(function() {
                    $.ajax({
                        url: "//ai.jd.com/jdip/useripinfo.php?type=jd2015",
                        dataType: "jsonp",
                        success: function(a) {
                            if (void 0 !== a && 0 !== a.type) {
                                var b = $("#shortcut-2014");
                                var c = $('<div id="inter-enter" style="width: 100%; height: 49px; overflow: hidden; background:#4d4e62;"></div>');
                                var d = "http://en.jd.com/";
                                var e = '<a href="' + d + '" target="_blank" class="inter-link" style="display: block; width:100%; height: 49px; text-align: center;" clstag="h|keycount|2015|00b"><div class="w"><img src="//img30.360buyimg.com/ads/jfs/t463/311/1350191938/18754/313404d9/54cef1e3N796d7688.jpg" alt="" width="792" height="49" style="vertical-align: top; "></div></a>';
                                c.html(e),
                                    b.before(c)
                            }
                        }
                    })
                }, 3e3)
            }(),
            function() {
                setTimeout(function() {
                    $("body").append('<img src="//jcm.jd.com/pre" width="1" height="1" />')
                }, 3e3)
            }()
    }
    a.init = c
});
