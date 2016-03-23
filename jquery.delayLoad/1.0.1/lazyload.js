/**
 * Created by Chen on 16/3/23.
 */
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