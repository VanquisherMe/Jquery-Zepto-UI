/* jdf-1.0.0/ dropdown.js Date:2015-12-11 15:43:35 */
!function(a) {
    a.ui.define("dropdown", {
        options: {
            hasCssLink: !1,
            baseVersion: "1.0.0",
            cssLinkVersion: "1.0.0",
            item: "ui-dropdown-item",
            trigger: !1,
            current: "ui-dropdown-hover",
            bodyClass: "ui-dropdown-bd",
            subBodyClass: "ui-dropdown-sub",
            topspeed: !1,
            boundary: 10,
            enterDelay: 0,
            leaveDelay: 0,
            zIndex: 1e3,
            align: "bottom",
            left: null ,
            top: null ,
            submenuLeft: 0,
            submenuTop: 0,
            onchange: null ,
            onmouseleave: null
        },
        init: function() {
            this.mouseLocs = [],
                this.lastDelayLoc = null ,
                this._create(),
                this.bind()
        },
        _create: function() {
            var a = this.options;
            this.item = a.trigger ? this.el : this.el.find("." + a.item),
                this.body = this.el.find("." + a.bodyClass);
            var b = a.top;
            var c = a.left;
            "bottom" == a.align && null  == a.top && (a.top = this.item.outerHeight()),
            "right" == a.align && (a.top = 0,
            null  == a.left && (a.left = this.item.outerWidth())),
            (null  != b || null  != c) && this.body.css({
                position: "absolute",
                top: a.top,
                left: a.left,
                zIndex: a.zIndex
            }),
                this.el.find("." + a.subBodyClass).css({
                    zIndex: a.zIndex + 1
                }),
                this.bodyOuterWidth = this.body.outerWidth(),
                this.bodyBorderWidth = 2 * this.getStyle(this.body[0], "borderWidth")
        },
        bind: function() {
            var b = this;
            var c = this.options;
            var d = !1;
            var e, f;
            var g = 3;
            var h = null ;
            var i = null ;
            var j = !1;
            this.el.bind("mouseenter", function() {
                clearTimeout(e)
            }),
                this.el.bind("mouseleave", function() {
                    d && (e = setTimeout(function() {
                        b.removeClass()
                    }, c.leaveDelay)),
                    c.onmouseleave && c.onmouseleave(a(this)),
                        h = null
                }),
                this.item.bind("mouseenter", function() {
                    if (j)
                        return !1;
                    var e = a(this);
                    var g = function() {
                            j = !0,
                                h = e.index(),
                                b.removeClass(),
                                e.addClass(c.current),
                                d = !0,
                            c.onchange && c.onchange(e)
                        }
                        ;
                    f = setTimeout(function() {
                        0 == b.topspeed(e) && (g(),
                            clearTimeout(i))
                    }, c.enterDelay),
                    c.topspeed && (i = setTimeout(function() {
                        h != e.index() && g()
                    }, 700))
                }),
                this.item.bind("mouseleave", function() {
                    clearTimeout(f),
                        clearTimeout(i),
                        j = !1
                }),
                this.el.find("." + c.subBodyClass).bind("mouseenter", function() {
                    var d = b.bodyOuterWidth - b.bodyBorderWidth + c.submenuLeft;
                    var e = b.getStyle(a(this)[0], "paddingLeft");
                    d = a.browser.isIE6() ? d - e : d;
                    var f = 0 + c.submenuTop;
                    a(this).find("." + c.bodyClass).show().css({
                        left: d,
                        top: f
                    })
                }).bind("mouseleave", function() {
                    a(this).find("." + c.bodyClass).hide()
                }),
            c.topspeed && a(document).mousemove(function(a) {
                b.mouseLocs.push({
                    x: a.pageX,
                    y: a.pageY
                }),
                b.mouseLocs.length > g && b.mouseLocs.shift()
            })
        },
        removeClass: function() {
            this.item.removeClass(this.options.current)
        },
        getStyle: function(a, b) {
            if (a) {
                var c = window.getComputedStyle ? window.getComputedStyle(a, null )[b] : a.currentStyle[b];
                return c = parseInt(c),
                c || (c = 0),
                    c
            }
        },
        topspeed: function() {
            var a = this.options;
            if (!a.topspeed)
                return 0;
            var b = this.el;
            var c = b.offset()
                , d = {
                x: c.left,
                y: c.top
            }
                , e = {
                x: c.left + b.outerWidth(),
                y: d.y
            }
                , f = {
                x: c.left,
                y: c.top + b.outerHeight()
            }
                , g = {
                x: c.left + b.outerWidth(),
                y: f.y
            };
            if (loc = this.mouseLocs[this.mouseLocs.length - 1],
                    prevLoc = this.mouseLocs[0],
                    !loc)
                return 0;
            if (prevLoc || (prevLoc = loc),
                prevLoc.x < c.left || prevLoc.x > g.x || prevLoc.y < c.top || prevLoc.y > g.y)
                return 0;
            if (this.lastDelayLoc && loc.x == this.lastDelayLoc.x && loc.y == this.lastDelayLoc.y)
                return 0;
            function h(a, b) {
                return (b.y - a.y) / (b.x - a.x)
            }
            var i = e
                , j = g;
            var k = h(loc, i)
                , l = h(prevLoc, i)
                , m = h(loc, j)
                , n = h(prevLoc, j);
            return l > k && m > n ? prevLoc.x - d.x < a.boundary ? 0 : (this.lastDelayLoc = loc,
                300) : (this.lastDelayLoc = null ,
                0)
        }
    })
}(jQuery);
/* jdf-1.0.0/ dialog.js Date:2015-09-15 18:39:14 */
!function(a) {
    a.ui.define("dialog", {
        options: {
            hasCssLink: !0,
            baseVersion: "1.0.0",
            cssLinkVersion: "1.0.0",
            maskHas: !0,
            maskClass: "ui-mask",
            maskIframe: !1,
            maskClose: !1,
            opacity: .15,
            zIndex: 9998,
            type: "text",
            source: null ,
            extendMainClass: null ,
            autoIframe: !0,
            autoOpen: !0,
            autoCloseTime: 0,
            title: !0,
            hasButton: !1,
            submitButton: "\u786e\u8ba4",
            cancelButton: "\u53d6\u6d88",
            onSubmit: null ,
            onCancel: null ,
            closeButton: !0,
            onReady: null ,
            width: 480,
            height: null ,
            fixed: !1,
            autoUpdate: !1,
            maskId: null ,
            mainId: null ,
            contentId: null ,
            titleId: null ,
            iframeName: "dialogIframe",
            iframeTimestamp: !0
        },
        init: function() {
            var b = this.options;
            a.browser.isIE6() && (b.fixed = !1),
                this.createMain(),
                this.createMask(),
                this.mainStyle(),
                b.autoOpen ? this.open() : this.hide(),
                this.bind()
        },
        show: function() {
            this.mask && this.mask.show(),
                this.el.show()
        },
        hide: function() {
            this.mask && this.mask.hide(),
                this.el.hide()
        },
        tpl: {
            mask: '<div class="ui-mask"></div>',
            close: '<a class="ui-dialog-close" title="\u5173\u95ed"><span class="ui-icon ui-icon-delete"></span></a>',
            title: '<div class="ui-dialog-title">						<span><%=title%></span>					</div>				',
            wrap: '<div class="ui-dialog"></div>',
            conten: '<div class="ui-dialog-content"></div>',
            button: '<div class="ui-dialog-btn">						<%if($.trim(submit)){%><a class="ui-dialog-btn-submit"><%=submit%></a><%}%>						<%if($.trim(cancel)){%><a class="ui-dialog-btn-cancel"><%=cancel%></a><%}%>					</div>				'
        },
        createMain: function() {
            var c = this.options;
            var d = "";
            c.title && (d = a.tpl(this.tpl.title, {
                title: c.title
            }));
            var e = a.tpl(this.tpl.button, {
                submit: this.options.submitButton,
                cancel: this.options.cancelButton
            });
            var f = d + this.tpl.conten + (c.hasButton ? e : "");
            this.el = a(this.tpl.wrap),
            c.extendMainClass && this.el.addClass(c.extendMainClass),
                a(f).appendTo(this.el),
                this.el.appendTo("body"),
                this.content = this.el.find(".ui-dialog-content"),
                this.title = this.el.find(".ui-dialog-title"),
            c.mainId && this.el.attr("id", c.mainId),
            c.contentId && this.content.attr("id", c.contentId),
            c.titleId && this.title.attr("id", c.titleId),
            c.closeButton && this.el.append(this.tpl.close)
        },
        createMask: function() {
            var b = this;
            var c = this.options;
            if (c.maskHas) {
                {
                    this.mask = a(document.createElement("div"))
                }
                this.mask.addClass(c.maskClass).css({
                    position: "absolute",
                    left: 0,
                    top: 0,
                    opacity: c.opacity,
                    zIndex: c.zIndex,
                    backgroundColor: "#000",
                    width: a.page.docWidth(),
                    height: a.page.docHeight()
                }),
                c.maskId && this.mask.attr("id", c.maskId),
                a("." + c.maskClass)[0] || this.mask.appendTo("body"),
                (a.browser.isIE6() || c.maskIframe) && this.mask.append('<iframe src="about:blank" class="jdMaskIframe" frameBorder="0" style="width:100%;height:100%;position:absolute;z-index:' + (c.zIndex + 1) + ';opacity:0;filter:alpha(opacity=0);top:0;left:0;">'),
                    a(window).resize(function() {
                        b.mask.css({
                            width: a.page.docWidth(),
                            height: a.page.docHeight()
                        })
                    })
            }
        },
        getPadding: function(a) {
            return {
                width: parseInt(a.css("paddingLeft"), 10) + parseInt(a.css("paddingRight"), 10),
                height: parseInt(a.css("paddingTop"), 10) + parseInt(a.css("paddingBottom"), 10)
            }
        },
        mainStyle: function() {
            var b = this.options;
            b.title && (b.height = b.height ? b.height + 28 : b.height,
                this.title.css({
                    width: b.width - this.getPadding(this.content).width
                })),
                this.content.css({
                    height: b.height ? b.height : "",
                    width: b.width ? b.width - this.getPadding(this.content).width : "",
                    overflow: "hidden"
                }),
            b.width && this.el.css({
                width: b.width
            });
            var c = b.fixed && !a.browser.isIE6() ? "fixed" : "absolute";
            this.el.css({
                position: c,
                zIndex: b.zIndex + 2,
                display: "block",
                overflow: "hidden"
            }),
                this.updateMain()
        },
        updateMain: function() {
            var b = this.options;
            var c = a.page.docWidth() != a.page.clientWidth() ? 16 : 0;
            var d = b.fixed ? 0 : a(document).scrollTop();
            var e = b.fixed ? 0 : a(document).scrollLeft();
            var f = (a.page.clientHeight() - this.el.outerHeight()) / 2 + d;
            var g = a.browser.msie && a.browser.version < 10 ? 0 : 8;
            var h = (a.page.clientWidth() - c - (b.width ? b.width + g : 0)) / 2 + e;
            0 > f && (f = 0),
            0 > h && (h = 0),
                this.el.css({
                    top: f,
                    left: h
                })
        },
        bind: function() {
            var b = this;
            var c = this.options;
            this.options.closeButton && this.el.find(".ui-dialog-close").bind("click", function() {
                b.close()
            }),
            this.options.autoUpdate && a(window).resize(function() {
                b.updateMain()
            }),
            c.hasButton && (this.el.find(".ui-dialog-btn-submit").bind("click", function() {
                c.onSubmit && c.onSubmit.call(this)
            }),
                this.el.find(".ui-dialog-btn-cancel").bind("click", function() {
                    b.close()
                })),
            this.options.maskHas && this.options.maskClose && a(this.mask).bind("click", function() {
                b.close()
            })
        },
        open: function() {
            this.openType(),
                this.autoClose(),
                this.show(),
                this.iframeSet(),
            this.options.onReady && this.options.onReady.call(this)
        },
        openType: function() {
            var b = this.options;
            var c = this;
            switch (b.type) {
                case "text":
                    this.content.html(b.source);
                    break;
                case "html":
                    a(b.source).clone().appendTo(this.content);
                    break;
                case "iframe":
                    var d = {
                        width: "100%",
                        height: "100%"
                    };
                    b.iframeTimestamp && !/&t=/.test(b.source) && (b.source += (b.source.indexOf("?") > -1 ? "&" : "?") + "t=" + (new Date).getTime()),
                        this.iframe = a('<iframe src="' + b.source + '" id="' + b.iframeName + '" name="' + b.iframeName + '" marginwidth="0" marginheight="0" frameborder="0" scrolling="no" style="border:0"></iframe>').css(d).appendTo(this.content);
                    break;
                case "image":
                    var e = b.width ? 'width="' + b.width + '"' : "";
                    var f = b.height ? 'height="' + b.height + '"' : "";
                    var g = a("<img src=" + b.source + " " + e + f + "/>");
                    g.appendTo(this.content),
                        g.bind("load", function() {
                            c.updateMain()
                        });
                    break;
                case "json":
            }
            c.updateMain()
        },
        close: function() {
            var a = this.options;
            this.options.autoCloseTime;
            this.el.remove(),
            this.mask && this.mask.remove(),
            a.onCancel && a.onCancel.call(this)
        },
        autoClose: function() {
            var b = this;
            var c = this.options.autoCloseTime;
            if (c) {
                var d = c;
                a("<div class='ui-dialog-autoclose'><span id='ui-autoclose'>" + d + "</span>\u79d2\u540e\u81ea\u52a8\u5173\u95ed</div>").appendTo(this.el),
                    clearInterval(window.autoCloseTimerDialog),
                    window.autoCloseTimerDialog = setInterval(function() {
                        d--,
                            a("#ui-autoclose").html(d),
                        0 == d && (d = c,
                            b.close(),
                            clearInterval(window.autoCloseTimerDialog))
                    }, 1e3),
                    this.updateMain()
            }
        },
        getIframeHeight: function(a) {
            var b = a[0].contentWindow.document;
            return b.body.scrollHeight && b.documentElement.scrollHeight ? Math.min(b.body.scrollHeight, b.documentElement.scrollHeight) : b.documentElement.scrollHeight ? b.documentElement.scrollHeight : b.body.scrollHeight ? b.body.scrollHeight : void 0
        },
        syncHeight: function() {
            this.options;
            var b;
            try {
                b = this.getIframeHeight(this.iframe)
            } catch (c) {
                b = 100
            }
            this.iframe.css({
                height: b
            }),
                this.updateMain()
        },
        iframeSet: function() {
            var a = this;
            var b = this.options;
            "iframe" == b.type && b.autoIframe && this.iframe.one("load", function() {
                a.syncHeight()
            })
        }
    }),
        a.closeDialog = function() {
            a(".ui-dialog,.ui-mask").remove(),
                clearInterval(window.autoCloseTimerDialog)
        }
}(jQuery);
/* jdf-1.0.0/ areamini.js Date:2015-09-15 18:39:15 */
!function(a) {
    var c = window;
    var e = [1, 72, 0, 0];
    var f = e.join("-");
    var g = -1;
    var h = {
        province: {
            "\u5317\u4eac": 1,
            "\u4e0a\u6d77": 2,
            "\u5929\u6d25": 3,
            "\u91cd\u5e86": 4,
            "\u6cb3\u5317": 5,
            "\u5c71\u897f": 6,
            "\u6cb3\u5357": 7,
            "\u8fbd\u5b81": 8,
            "\u5409\u6797": 9,
            "\u9ed1\u9f99\u6c5f": 10,
            "\u5185\u8499\u53e4": 11,
            "\u6c5f\u82cf": 12,
            "\u5c71\u4e1c": 13,
            "\u5b89\u5fbd": 14,
            "\u6d59\u6c5f": 15,
            "\u798f\u5efa": 16,
            "\u6e56\u5317": 17,
            "\u6e56\u5357": 18,
            "\u5e7f\u4e1c": 19,
            "\u5e7f\u897f": 20,
            "\u6c5f\u897f": 21,
            "\u56db\u5ddd": 22,
            "\u6d77\u5357": 23,
            "\u8d35\u5dde": 24,
            "\u4e91\u5357": 25,
            "\u897f\u85cf": 26,
            "\u9655\u897f": 27,
            "\u7518\u8083": 28,
            "\u9752\u6d77": 29,
            "\u5b81\u590f": 30,
            "\u65b0\u7586": 31,
            "\u53f0\u6e7e": 32,
            "\u9999\u6e2f": 42,
            "\u6fb3\u95e8": 43,
            "\u9493\u9c7c\u5c9b": 84
        },
        city: {
            1: "1-72-2799",
            2: "2-2813-51976",
            3: "3-51035-39620",
            4: "4-113-9775",
            5: "5-142-143",
            6: "6-303-304",
            7: "7-412-415",
            8: "8-560-567",
            9: "9-639-640",
            10: "10-727-728",
            11: "11-799-801",
            12: "12-904-905",
            13: "13-2900-2908",
            14: "14-1151-1153",
            15: "15-1158-1224",
            16: "16-1303-1305",
            17: "17-1432-1435",
            18: "18-1482-1485",
            19: "19-1601-3633",
            20: "20-3168-3169",
            21: "21-1827-1828",
            22: "22-2103-2105",
            23: "23-3690-3693",
            24: "24-2144-2145",
            25: "25-4108-6823",
            26: "26-3970-3972",
            27: "27-2428-2429",
            28: "28-2525-2526",
            29: "29-2580-2581",
            30: "30-2628-2629",
            31: "31-4110-4122",
            32: "32-2768-2769",
            42: "42-2754-2755",
            43: "43-2770-2771",
            84: "84-1310-0"
        },
        area: {},
        serverLocal: null ,
        provinceList: null
    };
    h.province = function() {
        var b = {};
        return a.each(h.province, function(a, c) {
            b[c] = a
        }),
            b
    }();
    var i = {
        getUrl: "//uprofile.jd.com/u/getadds?callback=?",
        setUrl: "//uprofile.jd.com/u/setadds",
        sync: function(b, c) {
            var d = "jd.com" == document.domain;
            if (a.isFunction(b)) {
                if (h.serverLocal)
                    return h.serverLocal;
                d ? b({
                    addr: j("ipLoc-djd")
                }) : a.getJSON(this.getUrl, function(a) {
                    h.serverLocal = a,
                        b(a)
                })
            } else if (d) {
                var e = {
                    domain: ".jd.com",
                    path: "/",
                    expires: 10
                };
                j("areaId", c, e),
                    j("ipLoc-djd", b, e)
            } else
                h.serverLocal = {
                    adds: b
                },
                    a.ajax({
                        url: this.setUrl,
                        type: "get",
                        dataType: "jsonp",
                        data: h.serverLocal
                    })
        }
    };
    var j = function(a, b, c) {
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
    function k(a) {
        return (a || "").replace(/(^\s*)|(\s*$)/g, "")
    }
    function l(a) {
        var b = arguments;
        if (b.length > 1) {
            for (var c = 0, d = b.length; d > c; c++)
                if (l(b[c]))
                    return !0;
            return !1
        }
        return "undefined" === String(a) || "null" === String(a) || ("string" == typeof a ? "" === k(a) : !1)
    }
    function m(a, b) {
        var c = {
            provinceId: 0,
            provinceName: "",
            cityId: 0,
            cityName: "",
            districtId: 0,
            districtName: "",
            townId: 0,
            townName: ""
        };
        var d = a.split("-");
        0 == d[0] && (d = e);
        var f = o(d[0]).value;
        c.provinceId = f.id,
            c.provinceName = f.name,
            b(c)
    }
    function n() {
        var a = [];
        if (h.provinceList && h.provinceList.length > 0)
            a = h.provinceList;
        else {
            for (var b in h.province)
                a.push({
                    id: b,
                    name: h.province[b]
                });
            h.provinceList = a
        }
        return a
    }
    function o(a) {
        var b = {
            id: a,
            name: ""
        };
        var c = null ;
        var d = 0;
        return c = h.province[a],
        c || (c = h.province[e[0]],
            d = 1,
            b.id = e[0]),
            b.name = c,
        {
            value: b,
            isDefault: d
        }
    }
    function p(a, b) {
        var c = a.initArea || j(a.cookieMapping.allLocal) || a.defaultArea || f;
        l(a.initArea) && a.syncServer ? i.sync(function(a) {
            var d = a && a.adds || c;
            m(d || c, b)
        }) : m(c, b)
    }
    function q(a) {
        return a && [{
                id: a.provinceId,
                name: a.provinceName
            }, {
                id: a.cityId,
                name: a.cityName
            }, {
                id: a.districtId,
                name: a.districtName
            }, {
                id: a.townId,
                name: a.townName
            }] || []
    }
    function r(b, c, d) {
        a.each(q(b), function(a, b) {
            l(b.id) || 0 == b.id || (c.push(b.id),
                d.push(b.name))
        })
    }
    function s(b, c, d, e) {
        var f = "";
        if (c.name.length >= d.longerAreaSize ? f = "longer-area" : c.name.length >= d.longAreaSize && (f = "long-area"),
            e && d.className.selected || f) {
            var g = a(b);
            e && d.className.selected && g.find("a:first").addClass(d.className.selected),
            f && g.addClass(f),
                b = a("<div/>").html(g).html(),
                b = b.replace(/&lt;/g, "<").replace(/&gt;/g, ">")
        }
        return c.tpl ? a.tpl(c.tpl, c) : a.tpl(b, c)
    }
    function t(b, c, d, e) {
        var f = this;
        var g = f.options.provinceList;
        var h = [];
        var i = [];
        return i = g ? g : n(),
            a.each(i, function(a, b) {
                h.push(s(c, b, f.options, b.id == e.provinceId))
            }),
            a.tpl(b, {
                list: h.join(""),
                index: d
            })
    }
    function u() {
        var b = this;
        var c = b.el;
        var d = b.options;
        var e = d.className;
        a("." + e.content_content, c).undelegate("a[data-id]", "click").delegate("a[data-id]", "click", function(f) {
            f.preventDefault();
            var g = a(this);
            var h = {
                id: g.data("id"),
                name: g.html()
            };
            var i = A(c, h.id, 0);
            d.className.selected && a("." + e.content_content + " a." + d.className.selected, c).removeClass(d.className.selected),
                m(i, function(c) {
                    d.className.selected && g.addClass(d.className.selected),
                    d.selectedClose && x.call(b, !1),
                        C.call(b, c),
                    a.isFunction(d.onChange) && d.onChange.call(b, g, h, c),
                    d.writeCookie && v(d, c.provinceId, i),
                    d.syncServer && d.writeServer && w(i, c.provinceId)
                })
        }),
            a("." + e.content_content, c).undelegate("a[data-onchange=1]", "click").delegate("a[data-onchange=1]", "click", function() {
                var f = a(this);
                d.className.selected && (a("." + e.content_content + " a." + d.className.selected, c).removeClass(d.className.selected),
                    f.addClass(d.className.selected)),
                d.selectedClose && x.call(b, !1),
                a.isFunction(d.onChange) && d.onChange.call(b, f)
            })
    }
    function v(a, b, c) {
        j(a.cookieMapping.areaId, b, a.cookieOpts),
            j(a.cookieMapping.allLocal, c, a.cookieOpts)
    }
    function w(a, b) {
        i.sync(a, b)
    }
    function x(a) {
        var b = this;
        var c = b.options.className.hover;
        a ? (g > -1 && (clearTimeout(g),
            g = -1),
            y.call(b),
            b.el.addClass(c),
            g = setTimeout(function() {
                b.el.addClass(c)
            }, 1)) : (g > -1 && (clearTimeout(g),
            g = -1),
            b.el.removeClass(c))
    }
    function y() {
        var b = this;
        var d = b.el;
        var e = a(b.css.content);
        var f = a(b.css.text).width();
        var g = e.width();
        var h = a(c).width();
        var i = d.offset().left;
        var j = a(b.css.text).offset().left;
        if (e.data("left") ? e.css("left", e.data("left")) : e.data("left", e.css("left")),
            i + g > h) {
            var k = g - f - 10;
            k > j && (k -= k - j + f - 20),
                e.css({
                    left: "-" + k + "px"
                })
        } else
            i < -1 * parseInt(e.css("left")) && e.css({
                left: "0px"
            })
    }
    function z(a) {
        return a ? [a.provinceId, a.cityId, a.districtId, a.townId] : [0, 0, 0, 0]
    }
    function A(a, b) {
        var d = a.data("select-local");
        return d = d && d.split("-") || [0, 0, 0, 0],
            "object" == typeof b ? d = z(b) : (d = h.city[b],
            d && (d = (d + "-0").split("-"))),
            d = d.join("-"),
            a.data("select-local", d),
            d
    }
    function B(b, c) {
        var d = this;
        var e = d.el;
        var f = d.options;
        var g = f.tplContentWrap;
        var h = f.tplContentItem;
        a(d.css.content_content).html(t.call(d, g, h, 0, b)),
        -1 == c && A(e, b),
            u.call(d, f)
    }
    function C(b) {
        var c = this;
        var d = []
            , e = [];
        r(b, e, d),
            e = e.join("-"),
            d = d.join(""),
            a(c.css.text_text).html(d).attr("data-id", e).attr("title", d)
    }
    function D(b, c) {
        var d = {};
        return a.each(c, function(e, f) {
            var g = e.split("_");
            var h = [];
            var i = g.length;
            a.each(g, function(a, b) {
                return h.push("." + c[b]),
                    i > 1 && 2 + a == i ? (h.push("." + f),
                        !1) : void 0
            }),
                d[e] = b + " " + h.join(" ")
        }),
            d
    }
    a.ui.define("areamini", {
        options: {
            hasCssLink: !0,
            baseVersion: "1.0.0",
            cssLinkVersion: "1.0.0",
            syncServer: !1,
            initArea: null ,
            defaultArea: null ,
            provinceList: null ,
            provinceExtend: !0,
            longAreaSize: 4,
            longerAreaSize: 12,
            cookieMapping: {
                areaId: "areaId",
                allLocal: "ipLoc-djd"
            },
            writeCookie: !0,
            cookieOpts: {
                expires: null ,
                path: null ,
                domain: null ,
                secure: null
            },
            writeServer: !0,
            className: {
                hover: "ui-areamini-hover",
                text: "ui-areamini-text-wrap",
                text_text: "ui-areamini-text",
                content: "ui-areamini-content-wrap",
                close: "ui-areamini-close",
                content_tab: "ui-areamini-tab",
                content_content: "ui-areamini-content",
                content_content_list: "ui-areamini-content-list",
                selected: ""
            },
            tplContentWrap: '<ul class="ui-areamini-content-list"><%=list%></ul>',
            tplContentItem: '<li><a data-id="<%=id%>" href="javascript:void(0)"><%=name%></a></li>',
            event: "hover",
            onReady: null ,
            onChange: null ,
            selectedClose: !0
        },
        css: {},
        init: function() {
            var b = this;
            var c = b.options;
            var d = b.el;
            c.scopeLevel = 1,
                b.css = D("#" + d[0].id, c.className),
            c.provinceList && c.provinceExtend && (c.provinceList = a.extend(!0, [], n().concat(c.provinceList))),
                p(c, function(e) {
                    C.call(b, e),
                        B.call(b, e, -1);
                    var f = "hover" == c.event ? "mouseenter" : "click";
                    a(b.css.text).bind(f, function() {
                        return x.call(b, !0),
                            !1
                    }),
                        a(d).bind("mouseleave", function() {
                            x.call(b, !1)
                        }),
                        a(b.css.close).bind("click", function() {
                            x.call(b, !1)
                        }),
                    a.isFunction(c.onReady) && c.onReady.call(b, e)
                })
        },
        hide: function() {
            var a = this;
            var b = a.options.className.hover;
            a.el.removeClass(b)
        },
        show: function() {
            var a = this;
            var b = a.options.className.hover;
            a.el.addClass(b)
        }
    })
}(jQuery);
/* jdf-1.0.0/ trimPath.js Date:2015-09-15 18:39:09 */
var TrimPath;
!function() {
    null  == TrimPath && (TrimPath = new Object),
    null  == TrimPath.evalEx && (TrimPath.evalEx = function(src) {
            return eval(src)
        }
    );
    var UNDEFINED;
    null  == Array.prototype.pop && (Array.prototype.pop = function() {
            return 0 === this.length ? UNDEFINED : this[--this.length]
        }
    ),
    null  == Array.prototype.push && (Array.prototype.push = function() {
            for (var a = 0; a < arguments.length; ++a)
                this[this.length] = arguments[a];
            return this.length
        }
    ),
        TrimPath.parseTemplate = function(a, b, c) {
            null  == c && (c = TrimPath.parseTemplate_etc);
            var d = parse(a, b, c);
            var e = TrimPath.evalEx(d, b, 1);
            return null  != e ? new c.Template(b,a,d,e,c) : null
        }
    ;
    try {
        String.prototype.process = function(a, b) {
            var c = TrimPath.parseTemplate(this, null );
            return null  != c ? c.process(a, b) : this
        }
    } catch (e) {}
    TrimPath.parseTemplate_etc = {},
        TrimPath.parseTemplate_etc.statementTag = "forelse|for|if|elseif|else|var|macro",
        TrimPath.parseTemplate_etc.statementDef = {
            "if": {
                delta: 1,
                prefix: "if (",
                suffix: ") {",
                paramMin: 1
            },
            "else": {
                delta: 0,
                prefix: "} else {"
            },
            elseif: {
                delta: 0,
                prefix: "} else if (",
                suffix: ") {",
                paramDefault: "true"
            },
            "/if": {
                delta: -1,
                prefix: "}"
            },
            "for": {
                delta: 1,
                paramMin: 3,
                prefixFunc: function(a, b, c, d) {
                    if ("in" != a[2])
                        throw new d.ParseError(c,b.line,"bad for loop statement: " + a.join(" "));
                    var e = a[1];
                    var f = "__LIST__" + e;
                    return ["var ", f, " = ", a[3], ";", "var __LENGTH_STACK__;", "if (typeof(__LENGTH_STACK__) == 'undefined' || !__LENGTH_STACK__.length) __LENGTH_STACK__ = new Array();", "__LENGTH_STACK__[__LENGTH_STACK__.length] = 0;", "if ((", f, ") != null) { ", "var ", e, "_ct = 0;", "for (var ", e, "_index in ", f, ") { ", e, "_ct++;", "if (typeof(", f, "[", e, "_index]) == 'function') {continue;}", "__LENGTH_STACK__[__LENGTH_STACK__.length - 1]++;", "var ", e, " = ", f, "[", e, "_index];"].join("")
                }
            },
            forelse: {
                delta: 0,
                prefix: "} } if (__LENGTH_STACK__[__LENGTH_STACK__.length - 1] == 0) { if (",
                suffix: ") {",
                paramDefault: "true"
            },
            "/for": {
                delta: -1,
                prefix: "} }; delete __LENGTH_STACK__[__LENGTH_STACK__.length - 1];"
            },
            "var": {
                delta: 0,
                prefix: "var ",
                suffix: ";"
            },
            macro: {
                delta: 1,
                prefixFunc: function(a) {
                    var e = a[1].split("(")[0];
                    return ["var ", e, " = function", a.slice(1).join(" ").substring(e.length), "{ var _OUT_arr = []; var _OUT = { write: function(m) { if (m) _OUT_arr.push(m); } }; "].join("")
                }
            },
            "/macro": {
                delta: -1,
                prefix: " return _OUT_arr.join(''); };"
            }
        },
        TrimPath.parseTemplate_etc.modifierDef = {
            eat: function() {
                return ""
            },
            escape: function(a) {
                return String(a).replace(/&/g, "&").replace(/</g, "<").replace(/>/g, ">")
            },
            capitalize: function(a) {
                return String(a).toUpperCase()
            },
            "default": function(a, b) {
                return null  != a ? a : b
            }
        },
        TrimPath.parseTemplate_etc.modifierDef.h = TrimPath.parseTemplate_etc.modifierDef.escape,
        TrimPath.parseTemplate_etc.Template = function(a, b, c, d, e) {
            this.process = function(a, b) {
                null  == a && (a = {}),
                null  == a._MODIFIERS && (a._MODIFIERS = {}),
                null  == a.defined && (a.defined = function(b) {
                        return void 0 != a[b]
                    }
                );
                for (var c in e.modifierDef)
                    null  == a._MODIFIERS[c] && (a._MODIFIERS[c] = e.modifierDef[c]);
                null  == b && (b = {});
                var f = [];
                var g = {
                    write: function(a) {
                        f.push(a)
                    }
                };
                try {
                    d(g, a, b)
                } catch (h) {
                    if (1 == b.throwExceptions)
                        throw h;
                    var i = new String(f.join("") + "[ERROR: " + h.toString() + (h.message ? "; " + h.message : "") + "]");
                    return i.exception = h,
                        i
                }
                return f.join("")
            }
                ,
                this.name = a,
                this.source = b,
                this.sourceFunc = c,
                this.toString = function() {
                    return "TrimPath.Template [" + a + "]"
                }
        }
        ,
        TrimPath.parseTemplate_etc.ParseError = function(a, b, c) {
            this.name = a,
                this.line = b,
                this.message = c
        }
        ,
        TrimPath.parseTemplate_etc.ParseError.prototype.toString = function() {
            return "TrimPath template ParseError in " + this.name + ": line " + this.line + ", " + this.message
        }
    ;
    var parse = function(a, b, c) {
            a = cleanWhiteSpace(a);
            var d = ["var TrimPath_Template_TEMP = function(_OUT, _CONTEXT, _FLAGS) { with (_CONTEXT) {"];
            var e = {
                stack: [],
                line: 1
            };
            var f = -1;
            for (; f + 1 < a.length; ) {
                var g = f;
                for (g = a.indexOf("{", g + 1); g >= 0; ) {
                    var h = a.indexOf("}", g + 1);
                    var i = a.substring(g, h);
                    var j = i.match(/^\{(cdata|minify|eval)/);
                    if (j) {
                        var k = j[1];
                        var l = g + k.length + 1;
                        var m = a.indexOf("}", l);
                        if (m >= 0) {
                            var n;
                            n = 0 >= m - l ? "{/" + k + "}" : a.substring(l + 1, m);
                            var o = a.indexOf(n, m + 1);
                            if (o >= 0) {
                                emitSectionText(a.substring(f + 1, g), d);
                                var p = a.substring(m + 1, o);
                                "cdata" == k ? emitText(p, d) : "minify" == k ? emitText(scrubWhiteSpace(p), d) : "eval" == k && null  != p && p.length > 0 && d.push("_OUT.write( (function() { " + p + " })() );"),
                                    g = f = o + n.length - 1
                            }
                        }
                    } else if ("$" != a.charAt(g - 1) && "\\" != a.charAt(g - 1)) {
                        var q = "/" == a.charAt(g + 1) ? 2 : 1;
                        if (0 == a.substring(g + q, g + 10 + q).search(TrimPath.parseTemplate_etc.statementTag))
                            break
                    }
                    g = a.indexOf("{", g + 1)
                }
                if (0 > g)
                    break;
                var h = a.indexOf("}", g + 1);
                if (0 > h)
                    break;
                emitSectionText(a.substring(f + 1, g), d),
                    emitStatement(a.substring(g, h + 1), e, d, b, c),
                    f = h
            }
            if (emitSectionText(a.substring(f + 1), d),
                0 != e.stack.length)
                throw new c.ParseError(b,e.line,"unclosed, unmatched statement(s): " + e.stack.join(","));
            return d.push("}}; TrimPath_Template_TEMP"),
                d.join("")
        }
        ;
    var emitStatement = function(a, b, c, d, e) {
            var f = a.slice(1, -1).split(" ");
            var g = e.statementDef[f[0]];
            if (null  == g)
                return void emitSectionText(a, c);
            if (g.delta < 0) {
                if (b.stack.length <= 0)
                    throw new e.ParseError(d,b.line,"close tag does not match any previous statement: " + a);
                b.stack.pop()
            }
            if (g.delta > 0 && b.stack.push(a),
                null  != g.paramMin && g.paramMin >= f.length)
                throw new e.ParseError(d,b.line,"statement needs more parameters: " + a);
            if (c.push(null  != g.prefixFunc ? g.prefixFunc(f, b, d, e) : g.prefix),
                null  != g.suffix) {
                if (f.length <= 1)
                    null  != g.paramDefault && c.push(g.paramDefault);
                else
                    for (var h = 1; h < f.length; h++)
                        h > 1 && c.push(" "),
                            c.push(f[h]);
                c.push(g.suffix)
            }
        }
        ;
    var emitSectionText = function(a, b) {
            if (!(a.length <= 0)) {
                var c = 0;
                var d = a.length - 1;
                for (; c < a.length && "\n" == a.charAt(c); )
                    c++;
                for (; d >= 0 && (" " == a.charAt(d) || "	" == a.charAt(d)); )
                    d--;
                if (c > d && (d = c),
                    c > 0) {
                    b.push('if (_FLAGS.keepWhitespace == true) _OUT.write("');
                    var e = a.substring(0, c).replace("\n", "\\n");
                    "\n" == e.charAt(e.length - 1) && (e = e.substring(0, e.length - 1)),
                        b.push(e),
                        b.push('");')
                }
                var f = a.substring(c, d + 1).split("\n");
                for (var g = 0; g < f.length; g++)
                    emitSectionTextLine(f[g], b),
                    g < f.length - 1 && b.push('_OUT.write("\\n");\n');
                if (d + 1 < a.length) {
                    b.push('if (_FLAGS.keepWhitespace == true) _OUT.write("');
                    var e = a.substring(d + 1).replace("\n", "\\n");
                    "\n" == e.charAt(e.length - 1) && (e = e.substring(0, e.length - 1)),
                        b.push(e),
                        b.push('");')
                }
            }
        }
        ;
    var emitSectionTextLine = function(a, b) {
            var c = "}";
            var d = -1;
            for (; d + c.length < a.length; ) {
                var e = "${"
                    , f = "}";
                var g = a.indexOf(e, d + c.length);
                if (0 > g)
                    break;
                "%" == a.charAt(g + 2) && (e = "${%",
                    f = "%}");
                var h = a.indexOf(f, g + e.length);
                if (0 > h)
                    break;
                emitText(a.substring(d + c.length, g), b);
                var i = a.substring(g + e.length, h).replace(/\|\|/g, "#@@#").split("|");
                for (var j in i)
                    i[j].replace && (i[j] = i[j].replace(/#@@#/g, "||"));
                b.push("_OUT.write("),
                    emitExpression(i, i.length - 1, b),
                    b.push(");"),
                    d = h,
                    c = f
            }
            emitText(a.substring(d + c.length), b)
        }
        ;
    var emitText = function(a, b) {
            null  == a || a.length <= 0 || (a = a.replace(/\\/g, "\\\\"),
                a = a.replace(/\n/g, "\\n"),
                a = a.replace(/"/g, '\\"'),
                b.push('_OUT.write("'),
                b.push(a),
                b.push('");'))
        }
        ;
    var emitExpression = function(a, b, c) {
            var d = a[b];
            if (0 >= b)
                return void c.push(d);
            var e = d.split(":");
            c.push('_MODIFIERS["'),
                c.push(e[0]),
                c.push('"]('),
                emitExpression(a, b - 1, c),
            e.length > 1 && (c.push(","),
                c.push(e[1])),
                c.push(")")
        }
        ;
    var cleanWhiteSpace = function(a) {
            return a = a.replace(/\t/g, "    "),
                a = a.replace(/\r\n/g, "\n"),
                a = a.replace(/\r/g, "\n"),
                a = a.replace(/^(\s*\S*(\s+\S+)*)\s*$/, "$1")
        }
        ;
    var scrubWhiteSpace = function(a) {
            return a = a.replace(/^\s+/g, ""),
                a = a.replace(/\s+$/g, ""),
                a = a.replace(/\s+/g, " "),
                a = a.replace(/^(\s*\S*(\s+\S+)*)\s*$/, "$1")
        }
        ;
    TrimPath.parseDOMTemplate = function(a, b, c) {
        null  == b && (b = document);
        var d = b.getElementById(a);
        var e = d.value;
        return null  == e && (e = d.innerHTML),
            e = e.replace(/</g, "<").replace(/>/g, ">"),
            TrimPath.parseTemplate(e, a, c)
    }
        ,
        TrimPath.processDOMTemplate = function(a, b, c, d, e) {
            return TrimPath.parseDOMTemplate(a, d, e).process(b, c)
        }
}();
/* jdf-1.0.0/ getjsonp.js Date:2015-09-15 18:39:12 */
!function($) {
    $.extend({
        _jsonp: {
            scripts: {},
            counter: 1,
            charset: "gb2312",
            head: document.getElementsByTagName("head")[0],
            name: function(callback) {
                var name = "_jsonp_" + (new Date).getTime() + "_" + this.counter;
                this.counter++;
                var cb = function(json) {
                        eval("delete " + name),
                            callback(json),
                            $._jsonp.head.removeChild($._jsonp.scripts[name]),
                            delete $._jsonp.scripts[name]
                    }
                    ;
                return eval(name + " = cb"),
                    name
            },
            load: function(a, b, c, d) {
                var e = document.createElement("script");
                e.type = c || "text/javascript",
                    e.charset = d || this.charset,
                    e.src = a,
                    this.head.appendChild(e),
                    this.scripts[b] = e
            }
        },
        getJSONP: function(a, b, c, d) {
            var e = $._jsonp.name(b);
            var a = a.replace(/{callback};/, e);
            return $._jsonp.load(a, e, c, d),
                this
        }
    })
}(jQuery);
/* jdf-1.0.0/ login.js Date:2015-12-01 13:54:04 */
define("//misc.360buyimg.com/jdf/1.0.0/unit/login/1.0.0/login.js", ["//misc.360buyimg.com/jdf/1.0.0/unit/setUserInfo/1.0.0/setUserInfo.js", "//misc.360buyimg.com/jdf/1.0.0/unit/event/1.0.0/event.js", "//misc.360buyimg.com/jdf/1.0.0/ui/dialog/1.0.0/dialog.js"], function(require) {
    var c = require("//misc.360buyimg.com/jdf/1.0.0/unit/setUserInfo/1.0.0/setUserInfo.js");
    var d = require("//misc.360buyimg.com/jdf/1.0.0/unit/event/1.0.0/event.js");
    require("//misc.360buyimg.com/jdf/1.0.0/ui/dialog/1.0.0/dialog.js");
    var f = {};
    window.jdModelCallCenter = f;
    var g = function() {
            return "https:" == document.location.protocol ? "https://" : "http://"
        }
        ;
    d.on("loginSuccessByIframe", function() {
        c({
            callback: function() {
                $.closeDialog(),
                    $.ajax({
                        url: g() + "passport.jd.com/loginservice.aspx?callback=?",
                        data: {
                            method: "Login"
                        },
                        dataType: "json",
                        success: function(a) {
                            null  != a && a.Identity.IsAuthenticated && d.trigger("loginSuccessCallback", a)
                        }
                    })
            }
        })
    });
    var h = {
        loginService: g() + "passport.jd.com/loginservice.aspx?callback=?",
        loginMethod: "Login",
        loginUrl: g() + "passport.jd.com/new/login.aspx",
        returnUrl: location.href,
        automatic: !1,
        complete: null ,
        modal: !1,
        clstag1: 0,
        clstag2: 0,
        firstCheck: !0
    };
    var i = function(a) {
            a = $.extend({}, h, a || {});
            var b = {
                login: function() {
                    var b = navigator.userAgent.toLowerCase()
                        , c = "ucweb" == b.match(/ucweb/i) || "rv:1.2.3.4" == b.match(/rv:1.2.3.4/i);
                    return c ? void (location.href = a.loginUrl + "?ReturnUrl=" + escape(returnUrl)) : ($.closeDialog(),
                        void (this.loginDialog = $("body").dialog({
                            title: "\u60a8\u5c1a\u672a\u767b\u5f55",
                            width: 410,
                            height: 420,
                            autoIframe: !1,
                            type: "iframe",
                            fixed: !0,
                            mainId: "loginDialogBody",
                            source: "https://passport.jd.com/uc/popupLogin2013?clstag1=" + a.clstag1 + "&clstag2=" + a.clstag2 + "&r=" + Math.random(),
                            autoUpdate: !0
                        })))
                },
                regist: function() {
                    $.closeDialog(),
                        this.registDialog = $("body").dialog({
                            title: "\u60a8\u5c1a\u672a\u767b\u5f55",
                            width: 410,
                            height: 470,
                            type: "iframe",
                            fixed: !0,
                            mainId: "registDialogBody",
                            source: "https://reg.jd.com/reg/popupPerson?clstag1=" + a.clstag1 + "&clstag2=" + a.clstag2 + "&r=" + Math.random(),
                            autoUpdate: !0
                        })
                }
            };
            if (f.regist = function() {
                    b.regist()
                }
                    ,
                    f.login = function() {
                        b.login()
                    }
                    ,
                    f.init = function(a) {
                        d.trigger("loginSuccessByIframe", a)
                    }
                    ,
                "" != a.loginService && "" != a.loginMethod) {
                var c = function(c) {
                        if (null  != c && (a.automatic && null  != a.complete && a.complete(c),
                            c.Identity.IsAuthenticated && null  != a.complete && !a.automatic && a.complete(c),
                            !c.Identity.IsAuthenticated && "" != a.loginUrl && !a.automatic))
                            if (a.modal) {
                                function e(b) {
                                    null  != a.complete && a.complete(b)
                                }
                                a.firstCheck && (b.login(),
                                    d.off("loginSuccessCallback"),
                                    d.on("loginSuccessCallback", e))
                            } else
                                location.href = a.loginUrl + "?ReturnUrl=" + escape(a.returnUrl)
                    }
                    ;
                a.firstCheck ? j(a, c) : (b.login(),
                    d.on("loginSuccessCallback", function(b) {
                        null  != a.complete && a.complete(b)
                    }))
            }
        }
        ;
    function j(a, b) {
        $.ajax({
            url: a.loginService,
            data: {
                method: a.loginMethod
            },
            dataType: "jsonp",
            scriptCharset: "gbk",
            success: function(a) {
                b(a)
            }
        })
    }
    return i.isLogin = function(a, b) {
        $.isFunction(a) ? (b = a,
            a = h) : a = $.extend({}, h, a || {}),
        $.isFunction(b) || (b = function() {}
        );
        var c = function(a) {
                a && a.Identity ? b(a.Identity.IsAuthenticated, a) : b(!1, null )
            }
            ;
        j(a, c)
    }
        ,
        i
});
/* jdf-1.0.0/ event.js Date:2015-09-15 18:39:12 */
define("//misc.360buyimg.com/jdf/1.0.0/unit/event/1.0.0/event.js", [], function() {
    var c = {
        on: function(a, b) {
            var c = this;
            this.list = this.list || (this.list = []),
                this.list[a] = this.list[a] || [];
            if ("undefined" == typeof b)
                var b = function() {
                        c[a] && c[a]()
                    }
                    ;
            "function" == typeof b && this.list[a].push(b)
        },
        off: function(a, b) {
            if ("function" == typeof b) {
                if ("undefined" != typeof this.list) {
                    var c = this.list[a];
                    if (c) {
                        var d = c.length;
                        for (; d--; )
                            c[d] === b && c.splice(d, 1)
                    }
                }
            } else
                this.list[a] = []
        },
        trigger: function(a, b) {
            if ("undefined" != typeof this.list) {
                var c = this.list[a];
                if (c)
                    for (var d in c)
                        c.hasOwnProperty(d) && "function" == typeof c[d] && c[d](b)
            }
        },
        removeAll: function() {
            this.list = []
        }
    };
    return c
});
/* jdf-1.0.0/ hotkey.js Date:2015-09-15 18:39:11 */
define("//misc.360buyimg.com/jdf/1.0.0/unit/hotkey/1.0.0/hotkey.js", [], function() {
    function c() {
        document.onkeyup = function(a) {
            var b = document.activeElement.tagName.toLowerCase();
            if ("input" != b && "textarea" != b) {
                var a = a ? a : window.event
                    , c = a.keyCode || a.which;
                switch (c) {
                    case 68:
                        window.pageConfig.clientViewTop || (window.pageConfig.clientViewTop = 0),
                            window.pageConfig.clientViewTop += document.documentElement.clientHeight,
                            window.scrollTo(0, pageConfig.clientViewTop);
                        break;
                    case 83:
                        window.scrollTo(0, 0),
                            window.pageConfig.clientViewTop = 0,
                            document.getElementById("key").focus();
                        break;
                    case 84:
                        window.scrollTo(0, 0),
                            window.pageConfig.clientViewTop = 0
                }
            }
        }
    }
    return c
});
/* jdf-1.0.0/ globalReco.js Date:2015-09-15 18:39:11 */
define("//misc.360buyimg.com/jdf/1.0.0/unit/globalReco/1.0.0/globalReco.js", [], function() {
    var c = function(a) {
            if (this.param = $.extend({
                    lid: readCookie("ipLoc-djd") || "",
                    lim: 6,
                    ec: "utf-8",
                    uuid: -1,
                    pin: readCookie("pin") || ""
                }, a.param),
                    this.$el = a.$el,
                    this.template = a.template,
                    this.reBuildJSON = a.reBuildJSON,
                    this.skuHooks = a.skuHooks || "SKUS_recommend",
                    this.ext = a.ext || {},
                    this.callback = a.callback || function() {}
                    ,
                    this.debug = a.debug,
                    !this.param.p)
                throw new Error("The param [p] is not Specificed");
            this.init()
        }
        ;
    return c.prototype = {
        init: function() {
            var a = readCookie("__jda");
            this.param.lid = this.param.lid.indexOf("-") > 0 ? this.param.lid.split("-")[0] : "1",
                this.param.uuid = a ? "-" == a.split(".")[1] ? -1 : a.split(".")[1] : -1,
                this.get(this.rid)
        },
        get: function() {
            var c = this;
            var d;
            var e = pageConfig.queryParam;
            var f = [];
            if (pageConfig.product)
                for (d = 0; d < pageConfig.product.cat.length; d++)
                    this.param["c" + (d + 1)] = pageConfig.product.cat[d];
            if (e) {
                for (var g in e)
                    e.hasOwnProperty(g) && ("c1" == g || "c2" == g || "c3" == g ? c.param[g] = e[g] : f.push(g + ":" + e[g]));
                c.param.hi = f.join(",")
            }
            this.debug && console.info("//diviner.jd.com/diviner?" + decodeURIComponent($.param(this.param))),
                $.ajax({
                    url: "//diviner.jd.com/diviner?" + decodeURIComponent($.param(this.param)),
                    dataType: "jsonp",
                    scriptCharset: this.param.ec,
                    cache: !0,
                    jsonpCallback: "call" + parseInt(1e5 * Math.random(), 10),
                    success: function(a) {
                        var b = !!(a.success && a && a.data && a.data.length);
                        b ? c.set(a) : c.$el.html('<div class="ac">\u300c\u6682\u65e0\u6570\u636e\u300d</div>'),
                        this.debug && console.log(a),
                            c.callback.apply(c, [b, a])
                    }
                })
        },
        set: function(a) {
            pageConfig[this.skuHooks] = [],
                a.skuHooks = this.skuHooks,
                a.ext = this.ext,
            this.reBuildJSON && this.reBuildJSON > 0 && (a.data = tools.reBuildJSON(a.data, this.reBuildJSON)),
            this.debug && alert(this.template.process(a));
            try {
                this.$el.show().html(this.template.process(a))
            } catch (b) {
                /isdebug/.test(location.href) && "undefined" != typeof console && console.error("[pid=" + this.param.p + "] " + b)
            }
            this.setTrackCode(a.impr)
        },
        setTrackCode: function(a) {
            var b = this.$el.find("li");
            var c = this;
            var d = "&m=UA-J2011-1&ref=" + encodeURIComponent(document.referrer);
            b.each(function() {
                var a = $(this).attr("data-clk");
                $(this).bind("click", function(b) {
                    var e = $(b.target);
                    (e.is("a") || e.is("img") || e.is("span")) && c.newImage(a + d, !0),
                    e.is("input") && 1 == e.attr("checked") && c.newImage(a + d, !0)
                })
            }),
                this.newImage(a + d, !0)
        },
        newImage: function(a, b, c) {
            var d = new Image;
            a = b ? a + "&random=" + Math.random() + new Date : a,
                d.onload = function() {
                    "undefined" != typeof c && c(a)
                }
                ,
                d.setAttribute("src", a)
        }
    },
        c
});
/* jdf-1.0.0/ search.js Date:2015-11-28 00:20:38 */
window.searchlog = window.searchlog || function() {
        var a = "//sstat." + pageConfig.FN_getDomain() + "/scslog?args=";
        var b = "{keyword}^#psort#^#page#^#cid#^" + encodeURIComponent(document.referrer);
        var c = "2";
        var d = "";
        var e = "";
        var f = function() {
                var f = "";
                var g = "";
                var h = "";
                var i = "0";
                if (arguments.length > 0)
                    if (0 == arguments[0])
                        f = a + c + "^" + b + "^^^58^^" + e + "^" + d;
                    else if (1 == arguments[0]) {
                        f = 10 != c ? a + "1^" + b + "^" : a + "11^" + b + "^";
                        for (var j = 1; j < arguments.length; j++)
                            f += encodeURI(arguments[j]) + "^";
                        arguments.length > 3 && "51" == arguments[3] && (g = arguments[1]),
                        arguments.length > 3 && "55" == arguments[3] && (h = arguments[1]),
                        arguments.length > 3 && "56" == arguments[3] && (i = arguments[1]);
                        for (var j = 0, k = 5 - arguments.length; k > j; j++)
                            f += "^";
                        f += e + "^" + d
                    }
                f = f.replace("#cid#", g),
                    f = f.replace("#psort#", h),
                    f = f.replace("#page#", i),
                    $.getScript(f);
                try {
                    JA.tracker.ngloader("search.000006", {
                        url: window.location.href
                    })
                } catch (l) {}
            }
            ;
        return f
    }();
function search(a) {
    var b, c = "http://search.jd.com/Search?keyword={keyword}&enc={enc}{additional}";
    var d = search.additinal || "";
    var e = document.getElementById(a);
    var f = e.value;
    if (f = f.replace(/^\s*(.*?)\s*$/, "$1"),
        f.length > 100 && (f = f.substring(0, 100)),
        "" == f)
        return void (window.location.href = window.location.href);
    var g = 0;
    "undefined" != typeof window.pageConfig && "undefined" != typeof window.pageConfig.searchType && (g = window.pageConfig.searchType);
    var h = "&cid{level}={cid}";
    var i = "string" == typeof search.cid ? search.cid : "";
    var j = "string" == typeof search.cLevel ? search.cLevel : "";
    var k = "string" == typeof search.ev_val ? search.ev_val : "";
    switch (g) {
        case 0:
            break;
        case 1:
            j = "-1",
                d += "&book=y";
            break;
        case 2:
            j = "-1",
                d += "&mvd=music";
            break;
        case 3:
            j = "-1",
                d += "&mvd=movie";
            break;
        case 4:
            j = "-1",
                d += "&mvd=education";
            break;
        case 5:
            var l = "&other_filters=%3Bcid1%2CL{cid1}M{cid1}[cid2]";
            switch (j) {
                case "51":
                    h = l.replace(/\[cid2]/, ""),
                        h = h.replace(/\{cid1}/g, "5272");
                    break;
                case "52":
                    h = l.replace(/\{cid1}/g, "5272"),
                        h = h.replace(/\[cid2]/, "%3Bcid2%2CL{cid}M{cid}");
                    break;
                case "61":
                    h = l.replace(/\[cid2]/, ""),
                        h = h.replace(/\{cid1}/g, "5273");
                    break;
                case "62":
                    h = l.replace(/\{cid1}/g, "5273"),
                        h = h.replace(/\[cid2]/, "%3Bcid2%2CL{cid}M{cid}");
                    break;
                case "71":
                    h = l.replace(/\[cid2]/, ""),
                        h = h.replace(/\{cid1}/g, "5274");
                    break;
                case "72":
                    h = l.replace(/\{cid1}/g, "5274"),
                        h = h.replace(/\[cid2]/, "%3Bcid2%2CL{cid}M{cid}");
                    break;
                case "81":
                    h = l.replace(/\[cid2]/, ""),
                        h = h.replace(/\{cid1}/g, "5275");
                    break;
                case "82":
                    h = l.replace(/\{cid1}/g, "5275"),
                        h = h.replace(/\[cid2]/, "%3Bcid2%2CL{cid}M{cid}")
            }
            c = "http://search.e.jd.com/searchDigitalBook?ajaxSearch=0&enc=utf-8&key={keyword}&page=1{additional}";
            break;
        case 6:
            j = "-1",
                c = "http://music.jd.com/8_0_desc_0_0_1_15.html?key={keyword}";
            break;
        case 7:
            c = "http://s.e.jd.com/Search?key={keyword}&enc=utf-8";
            break;
        case 8:
            c = "http://search.jd.hk/Search?keyword={keyword}&enc=utf-8"
    }
    if ("string" == typeof i && "" != i && "string" == typeof j) {
        var m = /^(?:[1-8])?([1-3])$/;
        j = "-1" == j ? "" : m.test(j) ? RegExp.$1 : "";
        var n = h.replace(/\{level}/, j);
        n = n.replace(/\{cid}/g, i),
            d += n
    }
    "string" == typeof k && "" != k && (d += "&ev=" + k),
        f = encodeURIComponent(f),
        b = c.replace(/\{keyword}/, f),
        b = b.replace(/\{enc}/, "utf-8"),
        b = b.replace(/\{additional}/, d),
    "object" == typeof $o && ("string" == typeof $o.lastKeyword && (b += "&wq=" + encodeURIComponent($o.lastKeyword)),
    "string" == typeof $o.pvid && (b += "&pvid=" + $o.pvid)),
    ("undefined" == typeof search.isSubmitted || 0 == search.isSubmitted) && (setTimeout(function() {
        window.location.href = b
    }, 10),
        search.isSubmitted = !0)
}
var $o = function(a) {
    var b = $("#key");
    if (!(b.length < 1)) {
        var c = {};
        c.replace = function(a, b) {
            return a.replace(/#{(.*?)}/g, function() {
                var a = arguments[1];
                return "undefined" != typeof b[a] ? b[a] : arguments[0]
            })
        }
            ,
            c.genPvid = function() {
                var a = parseInt(readCookie("__jdu") || "");
                return a || (a = Math.round(1e12 * Math.random())),
                    (a.toString(36) + "." + (new Date).getTime().toString(36)).split("").reverse().join("")
            }
            ,
            c.getQueryString = function(b, c) {
                var d = new RegExp("(^|\\?|&)" + b + "=([^&]*)(\\s|&|$)","i");
                var e = c ? c : a.location.search;
                return d.test(e) ? RegExp.$2 : ""
            }
            ,
            String.prototype.isEmpty = function() {
                return 0 == this.length
            }
            ,
            c.textSelect = function(a, b, c) {
                if ("string" == typeof a && (a = document.getElementById(a)),
                        a) {
                    var d = 1 * b
                        , e = 1 * c
                        , f = a.value.length;
                    if (f)
                        if (d || (d = 0),
                            e || (e = f),
                            d > f && (d = f),
                            0 > d && (d = f + d),
                            0 > e && (e = f + e),
                                a.createTextRange) {
                            var g = a.createTextRange();
                            g.moveStart("character", -f),
                                g.moveEnd("character", -f),
                                g.moveStart("character", d),
                                g.moveEnd("character", e),
                                g.select()
                        } else
                            a.setSelectionRange(d, e),
                                a.focus()
                }
            }
            ,
            c.getSelectText = function(a) {
                return document.selection ? document.selection.createRange().text : a ? a.value.substring(a.selectionStart, a.selectionEnd) : ""
            }
        ;
        var d = '<a style="color:#005AA0" onclick="$o.del(event)">\u5220\u9664</a>';
        var e = "\u641c\u7d22\u5386\u53f2"
            , f = "\u7ea6#{amount}\u4e2a\u5546\u54c1"
            , g = 'history="1"'
            , h = 'style="color:#005AA0"';
        var i = '<li id="d_#{id}" suggest-pos="#{suggest_pos}" title="#{title}" onclick="$o.clickItem(this)" #{history_mark}><div class="search-item" #{history_style}>#{keyword}</div><div class="search-count">#{search_count}</div></li>';
        var j = '<li class="brand-search"><div id="d_#{id}" class="info J_shop_box" style="cursor:default;">\u7f51\u53cb\u66f4\u559c\u6b22\u4ee5\u4e0b\u54c1\u724c</div>#{categorys}</li>';
        var k = '<li class="fore1"><div id="d_#{id}" suggest-pos="#{suggest_pos}" class="fore1" title="#{title}" onclick="$o.clickItem(this)" #{history_mark}><div class="search-item" #{history_style}>#{keyword}</div><div class="search-count">#{search_count}</div></div>#{categorys}</li>';
        var l = '<div id="d_#{id}" suggest-pos="#{suggest_pos}" class="#{className}" title="#{title}" cid="#{cid}" cLevel="#{cLevel}" onclick="$o.clickItem(this)"><div class="search-item">\u5728<strong>#{cname}</strong>\u5206\u7c7b\u4e2d\u641c\u7d22</div><div class="search-count">\u7ea6#{amount}\u4e2a\u5546\u54c1</div></div>';
        var n = '<div id="d_#{id}" suggest-pos="#{suggest_pos}" class="#{className}" title="#{title}" gp="1" onclick="$o.clickItem(this)"><div class="search-item">\u5728<strong>\u5168\u7403\u8d2d</strong>\u4e0b\u641c\u7d22</div><div class="search-count">\u7ea6#{amount}\u4e2a\u5546\u54c1</div></div>';
        var o = '<div id="d_#{id}" suggest-pos="#{suggest_pos}" class="#{className}" title="#{title}" act="#{act_value}" onclick="$o.clickItem(this)"><div class="search-item">\u5728<strong>#{act_name}</strong>\u7684\u5546\u54c1\u4e2d\u641c\u7d22</div><div class="search-count">\u7ea6#{amount}\u4e2a\u5546\u54c1</div></div>';
        var p = '<div id="d_#{id}" class="bs-item J_shop_box"><a class="logo" href="//mall.jd.com/index-#{shop_id}.html"><img width="90" height="30" src="#{shop_logo}"/></a><a class="name" href="//mall.jd.com/index-#{shop_id}.html">#{shop_name}</a></div>';
        var q = c.genPvid();
        var r = "//dd-search.jd.com/?ver=2&zip=1&key=#{keyword}&pvid=" + q + "&t=#{time}";
        var s = "#FFDFC6";
        var t = "#FFF";
        var u = $("#shelper");
        var v = null  != navigator.userAgent.toLowerCase().match(/chrome/);
        var w = {
            "\u4f18\u8863\u5e93": {
                id: 103760,
                name: "Gap\u5b98\u65b9\u65d7\u8230\u5e97",
                logo: "jfs/t490/213/882341181/3193/2ce3cd8/5493d0b1N34dad42b.png"
            },
            UNIQLO: {
                id: 103760,
                name: "Gap\u5b98\u65b9\u65d7\u8230\u5e97",
                logo: "jfs/t490/213/882341181/3193/2ce3cd8/5493d0b1N34dad42b.png"
            },
            "\u4f18\u8863\u5e93\u65d7\u8230\u5e97": {
                id: 103760,
                name: "Gap\u5b98\u65b9\u65d7\u8230\u5e97",
                logo: "jfs/t490/213/882341181/3193/2ce3cd8/5493d0b1N34dad42b.png"
            },
            "\u4f18\u8863\u5e93\u5b98\u65b9\u65d7\u8230\u5e97": {
                id: 103760,
                name: "Gap\u5b98\u65b9\u65d7\u8230\u5e97",
                logo: "jfs/t490/213/882341181/3193/2ce3cd8/5493d0b1N34dad42b.png"
            },
            "\u4f18\u8863\u5e93\u7537\u88c5": {
                id: 103760,
                name: "Gap\u5b98\u65b9\u65d7\u8230\u5e97",
                logo: "jfs/t490/213/882341181/3193/2ce3cd8/5493d0b1N34dad42b.png"
            },
            "\u4f18\u8863\u5e93\u5973\u88c5": {
                id: 103760,
                name: "Gap\u5b98\u65b9\u65d7\u8230\u5e97",
                logo: "jfs/t490/213/882341181/3193/2ce3cd8/5493d0b1N34dad42b.png"
            },
            "\u4f18\u8863\u5e93\u7537\u886c\u886b": {
                id: 103760,
                name: "Gap\u5b98\u65b9\u65d7\u8230\u5e97",
                logo: "jfs/t490/213/882341181/3193/2ce3cd8/5493d0b1N34dad42b.png"
            },
            "\u4f18\u8863\u5e93\u7fbd\u7ed2\u670d": {
                id: 103760,
                name: "Gap\u5b98\u65b9\u65d7\u8230\u5e97",
                logo: "jfs/t490/213/882341181/3193/2ce3cd8/5493d0b1N34dad42b.png"
            },
            "\u4f18\u8863\u5e93\u7fbd\u7ed2\u670d\u8f7b\u8584\u5973": {
                id: 103760,
                name: "Gap\u5b98\u65b9\u65d7\u8230\u5e97",
                logo: "jfs/t490/213/882341181/3193/2ce3cd8/5493d0b1N34dad42b.png"
            },
            "\u4f18\u8863\u5e93\u7fbd\u7ed2\u670d\u8f7b\u8584\u7537": {
                id: 103760,
                name: "Gap\u5b98\u65b9\u65d7\u8230\u5e97",
                logo: "jfs/t490/213/882341181/3193/2ce3cd8/5493d0b1N34dad42b.png"
            },
            ZARA: {
                id: 156248,
                name: "MANGO\u65d7\u8230\u5e97",
                logo: "jfs/t1783/336/92027725/26116/c8490c46/55cc4736Na8d3436f.jpg"
            },
            "ZARA\u65d7\u8230\u5e97": {
                id: 156248,
                name: "MANGO\u65d7\u8230\u5e97",
                logo: "jfs/t1783/336/92027725/26116/c8490c46/55cc4736Na8d3436f.jpg"
            },
            "ZARA\u5b98\u65b9\u65d7\u8230\u5e97": {
                id: 156248,
                name: "MANGO\u65d7\u8230\u5e97",
                logo: "jfs/t1783/336/92027725/26116/c8490c46/55cc4736Na8d3436f.jpg"
            },
            "ZARA\u7537\u88c5": {
                id: 103760,
                name: "Gap\u5b98\u65b9\u65d7\u8230\u5e97",
                logo: "jfs/t490/213/882341181/3193/2ce3cd8/5493d0b1N34dad42b.png"
            },
            "ZARA\u5973\u88c5": {
                id: 73434,
                name: "Forever21\u65d7\u8230\u5e97",
                logo: "jfs/t166/336/2687046160/2415/cf7a53a3/53d5e104N9508871f.jpg"
            },
            "ZARA\u5305\u5305": {
                id: 156248,
                name: "MANGO\u65d7\u8230\u5e97",
                logo: "jfs/t1783/336/92027725/26116/c8490c46/55cc4736Na8d3436f.jpg"
            },
            "ZARA\u8fde\u8863\u88d9": {
                id: 73434,
                name: "Forever21\u65d7\u8230\u5e97",
                logo: "jfs/t166/336/2687046160/2415/cf7a53a3/53d5e104N9508871f.jpg"
            },
            "ZARA\u6bdb\u5462\u5916\u5957\u5973": {
                id: 73434,
                name: "Forever21\u65d7\u8230\u5e97",
                logo: "jfs/t166/336/2687046160/2415/cf7a53a3/53d5e104N9508871f.jpg"
            },
            "ZARA\u76ae\u8863": {
                id: 156248,
                name: "MANGO\u65d7\u8230\u5e97",
                logo: "jfs/t1783/336/92027725/26116/c8490c46/55cc4736Na8d3436f.jpg"
            },
            "ZARA\u7537\u5916\u5957": {
                id: 103760,
                name: "Gap\u5b98\u65b9\u65d7\u8230\u5e97",
                logo: "jfs/t490/213/882341181/3193/2ce3cd8/5493d0b1N34dad42b.png"
            },
            "\u6728\u6797\u68ee": {
                id: 110459,
                name: "CELE\u65d7\u8230\u5e97",
                logo: "jfs/t2059/336/1039378251/12707/77ce3d29/5656badaN5cb142ba.jpg"
            },
            "\u6728\u6797\u68ee\u7537\u978b": {
                id: 110459,
                name: "CELE\u65d7\u8230\u5e97",
                logo: "jfs/t2059/336/1039378251/12707/77ce3d29/5656badaN5cb142ba.jpg"
            },
            "\u6728\u6797\u68ee\u5b98\u65b9\u65d7\u8230\u5e97": {
                id: 110459,
                name: "CELE\u65d7\u8230\u5e97",
                logo: "jfs/t2059/336/1039378251/12707/77ce3d29/5656badaN5cb142ba.jpg"
            },
            CA: {
                id: 82408,
                name: "CACHE CACHE\u65d7\u8230\u5e97",
                logo: "jfs/t412/339/566737070/17968/504efcc4/542373f9Nfcca787b.jpg"
            },
            "C&A": {
                id: 82408,
                name: "CACHE CACHE\u65d7\u8230\u5e97",
                logo: "jfs/t412/339/566737070/17968/504efcc4/542373f9Nfcca787b.jpg"
            },
            HM: {
                id: 138089,
                name: "UR\u65d7\u8230\u5e97",
                logo: "jfs/t1528/256/277269146/8807/5d0c8484/55702da4N5b794649.jpg"
            },
            "H&M": {
                id: 138089,
                name: "UR\u65d7\u8230\u5e97",
                logo: "jfs/t1528/256/277269146/8807/5d0c8484/55702da4N5b794649.jpg"
            },
            "STELLA LUNA": {
                id: 60979,
                name: "Nine West\u7396\u7199\u65d7\u8230\u5e97",
                logo: "g15/M07/10/08/rBEhWFMw6rUIAAAAAAAWThRwvs4AAKongO3b-cAABZm967.jpg"
            },
            "\u963f\u739b\u65bd": {
                id: 20550,
                name: "\u54e5\u5f1f\u5b98\u65b9\u65d7\u8230\u5e97",
                logo: "jfs/t1165/292/210609680/4846/34b4321a/550a562dNacfa692b.jpg"
            },
            AMASS: {
                id: 20550,
                name: "\u54e5\u5f1f\u5b98\u65b9\u65d7\u8230\u5e97",
                logo: "jfs/t1165/292/210609680/4846/34b4321a/550a562dNacfa692b.jpg"
            },
            "\u65e0\u5370\u826f\u54c1": {
                id: 31554,
                name: "\u8335\u66fc\u65d7\u8230\u5e97",
                logo: "g10/M00/01/0E/rBEQWFEGJ8cIAAAAAABW75-Gv7kAAASIwBEQwUAAFcH289.jpg"
            },
            IT: {
                id: 48720,
                name: "crz\u65d7\u8230\u5e97",
                logo: "g15/M04/14/1A/rBEhWlNGG9kIAAAAAAAYSMYbT1MAALhkAAmoy8AABhg940.jpg"
            },
            "\u963f\u739b\u65bd\u5973\u88c5\u6b63\u54c1": {
                id: 20550,
                name: "\u54e5\u5f1f\u5b98\u65b9\u65d7\u8230\u5e97",
                logo: "jfs/t1165/292/210609680/4846/34b4321a/550a562dNacfa692b.jpg"
            }
        };
        r += function() {
            var d = "&curr_url=" + encodeURIComponent(a.location.host + a.location.pathname)
                , e = "";
            if (a.QUERY_KEYWORD && (d += "&search_key=" + encodeURIComponent(a.QUERY_KEYWORD)),
                a.pageConfig && a.pageConfig.product && a.pageConfig.product.cat)
                e = "&cid1=" + (a.pageConfig.product.cat[0] || ""),
                    e += "&cid2=" + (a.pageConfig.product.cat[1] || ""),
                    e += "&cid3=" + (a.pageConfig.product.cat[2] || "");
            else if ("list.jd.com" == a.location.host)
                if (a.pageConfig && a.pageConfig.queryParam)
                    e = "&cid1=" + (a.pageConfig.queryParam.c1 || ""),
                        e += "&cid2=" + (a.pageConfig.queryParam.c2 || ""),
                        e += "&cid3=" + (a.pageConfig.queryParam.c3 || "");
                else {
                    var f = decodeURIComponent(c.getQueryString("cat")).split(",");
                    e = "&cid1=" + (f[0] || ""),
                        e = "&cid2=" + (f[1] || ""),
                        e = "&cid3=" + (f[2] || "")
                }
            return d + e
        }(a.location.href);
        function x() {
            this.length = 0,
                this.index = -1,
                this.iLastModified = 0,
                this.lastKeyword = !1,
                this.keep_keyword = "",
                this.pvid = q,
                this.enable_remind = !0,
                this.IME = !1
        }
        x.prototype.init = function() {
            this.length = 0,
                this.index = -1,
                search.additinal = ""
        }
            ,
            x.prototype.hideTip = function() {
                this.init(),
                    this.lastKeyword = !1;
                var a = c.getSelectText(b[0]);
                this.keep_keyword && a && this.keep_keyword + a == b.val() && b.val(this.keep_keyword),
                    u.html("").hide()
            }
            ,
            x.prototype.clickItem = function(a) {
                var c = a.getAttribute("cid")
                    , d = "&suggest=" + a.getAttribute("suggest-pos");
                search.cid = null  != c && "" != c ? c : null ;
                var e = a.getAttribute("cLevel");
                search.cLevel = null  != e && "" != e ? e : null ;
                var f = a.getAttribute("title");
                null  == f || $.trim(f).isEmpty() || b.val(f),
                null  !== a.getAttribute("pm_type") && (d += "&prom_type=0"),
                null  !== a.getAttribute("gp") && (d += "&gp=1"),
                null  !== a.getAttribute("act") && (d += a.getAttribute("act")),
                    search.additinal = d,
                    search("key")
            }
            ,
            x.prototype.mouseenter = function(a) {
                var a = $(a);
                a.attr("history") && a.find(".search-count").html(d),
                    a.hasClass("J_shop_box") ? a.find(".name").css("text-decoration", "underline") : a.css("background", s);
                var b = a.attr("id").split("_")
                    , c = parseInt(b[1], 10);
                if (c != this.index) {
                    if (this.index > -1) {
                        var f = $("#d_" + this.index);
                        f.css("background", t),
                        f.attr("history") && f.find(".search-count").html(e),
                        f.hasClass("J_shop_box") && f.find(".name").css("text-decoration", "none")
                    }
                    this.index = c
                }
            }
            ,
            x.prototype.mouseleave = function(a) {
                a.css("background", t),
                a.attr("history") && a.find(".search-count").html(e)
            }
            ,
            x.prototype.selectItemNode = function(a) {
                var c = this;
                var f = $("#d_" + c.index + ":visible");
                f.css("background-color", t),
                f.attr("history") && f.find(".search-count").html(e),
                f.hasClass("J_shop_box") && f.find(".name").css("text-decoration", "none"),
                -1 == c.index && -1 == a && (a = 0),
                    c.index = (c.length + c.index + a) % c.length;
                var g = $("#d_" + c.index)
                    , h = "&suggest=" + g.attr("suggest-pos");
                if (g.length > 0) {
                    g.attr("history") && g.find(".search-count").html(d),
                        g.hasClass("J_shop_box") ? g.find(".name").css("text-decoration", "underline") : g.css("background-color", s);
                    var i = g.attr("title");
                    null  == i || $.trim(i).isEmpty() || b.val(i);
                    var j = g.attr("cid");
                    search.cid = null  != j && "" != j ? j : null ;
                    var k = g.attr("cLevel");
                    search.cLevel = null  != k && "" != k ? k : null ,
                    "undefined" != typeof g.attr("pm_type") && (h += "&prom_type=0"),
                    "undefined" != typeof g.attr("gp") && (h += "&gp=1"),
                    "undefined" != typeof g.attr("act") && (h += g.attr("act")),
                        search.additinal = h
                }
            }
            ,
            x.prototype.input = function() {
                var a = this;
                a.timeoutId && clearTimeout(a.timeoutId),
                    a.timeoutId = setTimeout(function() {
                        var d = $.trim(b.val());
                        if (d === a.lastKeyword || !(d || readCookie("_pst") || readCookie("_tp")))
                            return !1;
                        a.lastKeyword = d;
                        var e = c.replace(r, {
                            keyword: encodeURIComponent(d),
                            time: (new Date).getTime()
                        });
                        $.ajax({
                            url: e,
                            dataType: "jsonp",
                            scriptCharset: "utf-8",
                            jsonp: "callback",
                            cache: !0,
                            success: function(b) {
                                return function(c) {
                                    a.iLastModified > b || (a.iLastModified = b,
                                    c && a.onloadItems(c))
                                }
                            }((new Date).getTime())
                        })
                    }, 150)
            }
            ,
            x.prototype.keydown_up = function(c) {
                var d = this;
                var e = c || a.event;
                0 == b.length && (b = $("#key")),
                0 == u.length && (u = $("tie"));
                var f = e.keyCode;
                switch (f) {
                    case 38:
                        d.selectItemNode(-1);
                        break;
                    case 40:
                        d.selectItemNode(1);
                        break;
                    case 27:
                        d.hideTip();
                        break;
                    case 37:
                        break;
                    case 39:
                        break;
                    default:
                        d.IME = 229 == f,
                            8 == f || 46 == f ? d.disableRemind() : d.enable_remind = !0,
                        $.browser.mozilla || d.input()
                }
            }
            ,
            x.prototype.onloadItems = function(d) {
                if (0 == d.length)
                    return void this.hideTip();
                var q = this;
                q.init();
                var r = 0;
                a.pageConfig && a.pageConfig.searchType && (r = a.pageConfig.searchType);
                var s = 1
                    , t = sCategoriesHtml = "";
                var v = 0
                    , x = 0
                    , y = $.trim(b.val())
                    , z = y.toUpperCase();
                for (var A = 0, B = d.length; B > A; A++) {
                    var C = d[A];
                    if (C.rem && this.remindKey(C.rem.rei, C.rem.req),
                        C && C.key && (C.key != y || 0 == x)) {
                        var D = $.trim(C.key)
                            , E = C.his ? e : c.replace(f, {
                            amount: C.qre
                        })
                            , F = C.his ? g : ""
                            , G = C.his ? h : "";
                        var H = D.indexOf(y);
                        var I = D;
                        if (y.length && 0 == H && !C.his && (I = y + "<strong>" + D.substring(H + y.length) + "</strong>"),
                            0 == x) {
                            if ("object" == typeof w[z]) {
                                var J = w[z];
                                sCategoriesHtml += c.replace(p, {
                                    id: ++v,
                                    shop_id: J.id,
                                    shop_name: J.name,
                                    shop_logo: "//img30.360buyimg.com/n1/s90x30_" + J.logo
                                }),
                                    t += c.replace(j, {
                                        id: 0,
                                        categorys: sCategoriesHtml
                                    }),
                                    x++;
                                continue
                            }
                            if ((0 == r || 1 == r) && (C.wor && (sCategoriesHtml += c.replace(n, {
                                    id: ++v,
                                    title: D,
                                    className: "item1",
                                    amount: C.wor,
                                    suggest_pos: s + ".wor.0"
                                })),
                                C.acq && C.acu && (sCategoriesHtml += c.replace(o, {
                                    id: ++v,
                                    title: D,
                                    className: "item1",
                                    act_name: C.acq,
                                    act_value: C.acu,
                                    amount: C.acc,
                                    suggest_pos: s + ".acq.0"
                                }))),
                                C.ci && C.ci.length > 0)
                                for (var K = 0, L = C.ci.length; L > K; K++) {
                                    var M = C.ci[K].cid;
                                    if (0 == r) {
                                        if ("string" == typeof M && /^[1-8]4$/.test(M))
                                            continue
                                    } else if (5 == r) {
                                        if ("string" == typeof M && !/^[5-8]2$/.test(M))
                                            continue
                                    } else if (1 == r || 2 == r || 3 == r || 4 == r)
                                        continue;sCategoriesHtml += c.replace(l, {
                                        id: ++v,
                                        title: D,
                                        cid: M,
                                        cLevel: C.ci[K].cle,
                                        className: "item1",
                                        cname: C.ci[K].cna,
                                        amount: C.ci[K].cre,
                                        suggest_pos: s + ".cid." + (K + 1)
                                    })
                                }
                            0 == v && (v = -1)
                        }
                        t += 0 == x && v > 0 ? c.replace(k, {
                            id: 0,
                            title: D,
                            keyword: I,
                            suggest_pos: s++ + (C.his ? ".his.0" : ".def.0"),
                            categorys: sCategoriesHtml,
                            search_count: E,
                            history_mark: F,
                            history_style: G
                        }) : c.replace(i, {
                            id: ++v,
                            title: D,
                            keyword: I,
                            suggest_pos: s++ + (C.his ? ".his.0" : ".def.0"),
                            search_count: E,
                            history_mark: F,
                            history_style: G
                        }),
                            x++
                    }
                }
                q.length = ++v,
                    "" != t ? (t += '<li class="close" onclick="$o.hideTip()">\u5173\u95ed</li>',
                        u.html(t).show(),
                        u.find('[id^="d_"]').bind("mouseleave", function() {
                            q.mouseleave($(this))
                        }).bind("mouseenter", function() {
                            q.mouseenter($(this))
                        })) : u.html("").hide()
            }
            ,
            x.prototype.disableRemind = function() {
                search.additinal = "&suggest=1.rem.1",
                    this.enable_remind = !1
            }
            ,
            x.prototype.remindKey = function(a, d) {
                b.val() == a && this.enable_remind && (v && this.IME && /\w/.test(a.substr(-1)) || (b.val(d),
                    this.keep_keyword = a,
                    search.additinal = "&suggest=1.rem.0",
                    c.textSelect("key", a.length)))
            }
            ,
            x.prototype.bind_input = function() {
                $.browser.mozilla ? (b.bind("keydown", function(a) {
                    y.keydown_up(a)
                }),
                    b.bind("input", function(a) {
                        y.input(a)
                    })) : b.bind("keydown", function(a) {
                    y.keydown_up(a)
                }),
                    b.focus(function() {
                        setTimeout(function() {
                            y.input()
                        }, 10)
                    }),
                    u.parent().bind("mouseenter", function() {
                        y.e_position = !0,
                        y.timeoutId && clearTimeout(y.timeoutId)
                    }).bind("mouseleave", function() {
                        y.e_position = !1,
                            y.timeoutId = setTimeout(function() {
                                y.hideTip()
                            }, 500)
                    }),
                    $(document).click(function() {
                        y.e_position || y.hideTip()
                    })
            }
            ,
            x.prototype.del = function(c) {
                var d = this;
                c = c ? c : a.event,
                    a.event ? (c.cancelBubble = !0,
                        c.returnValue = !1) : (c.stopPropagation(),
                        c.preventDefault());
                var e = $(c.srcElement ? c.srcElement : c.target)
                    , f = e.parent().parent().attr("title");
                $.ajax({
                    url: "//search.jd.com/suggest.php?op=del&callback=?&key=" + encodeURIComponent(f),
                    dataType: "jsonp",
                    scriptCharset: "utf-8",
                    beforeSend: function() {
                        e.parents("li").hide()
                    },
                    success: function() {
                        d.lastKeyword = !1,
                            b.focus()
                    }
                })
            }
        ;
        var y = new x;
        return y.bind_input(),
            y
    }
}(window);
/* jdf-1.0.0/ setUserInfo.js Date:2015-09-15 18:39:10 */
define("//misc.360buyimg.com/jdf/1.0.0/unit/setUserInfo/1.0.0/setUserInfo.js", [], function() {
    var c = function(a) {
            a = $.extend({
                el: $("#loginbar,#ttbar-login"),
                callback: null
            }, a || {});
            var b = function() {
                    return "https:" == document.location.protocol ? "https://" : "http://"
                }
                ;
            $.ajax({
                url: b() + "passport.jd.com/new/helloService.ashx",
                dataType: "jsonp",
                scriptCharset: "GBK",
                success: function(b) {
                    if (b) {
                        var c = function() {
                                b.info && a.el.html(b.info),
                                a.callback && a.callback(b)
                            }
                            ;
                        if (b.sso) {
                            var d = 0
                                , e = b.sso.length;
                            $.each(b.sso, function() {
                                $.getJSON(this, function() {
                                    d++,
                                    d == e - 1 && c()
                                })
                            })
                        } else
                            c()
                    }
                }
            })
        }
        ;
    return c
});
/* jdf-1.0.0/ myjd.js Date:2015-12-10 15:02:41 */
define("//misc.360buyimg.com/jdf/1.0.0/unit/myjd/2.0.0/myjd.js", ["//misc.360buyimg.com/jdf/1.0.0/unit/login/1.0.0/login.js", "//misc.360buyimg.com/jdf/1.0.0/ui/dropdown/1.0.0/dropdown.js", "//misc.360buyimg.com/jdf/1.0.0/unit/globalReco/1.0.0/globalReco.js", "//misc.360buyimg.com/jdf/1.0.0/unit/cookie/1.0.0/cookie.js"], function(require) {
    var c = require("//misc.360buyimg.com/jdf/1.0.0/unit/login/1.0.0/login.js");
    require("//misc.360buyimg.com/jdf/1.0.0/ui/dropdown/1.0.0/dropdown.js");
    var e = require("//misc.360buyimg.com/jdf/1.0.0/unit/globalReco/1.0.0/globalReco.js");
    var f = require("//misc.360buyimg.com/jdf/1.0.0/unit/cookie/1.0.0/cookie.js");
    var g = {
        init: function() {
            var a = $("#ttbar-myjd");
            a.find(".dd").html('<div class="dd-spacer"></div><div class="dd-inner"><span class="loading"></span></div>'),
                this.el = a,
                this.bind()
        },
        bind: function() {
            var b = this;
            this.el.dropdown({
                enterDelay: 100,
                trigger: !0,
                current: "hover",
                onchange: function(a) {
                    a.attr("data-load") || (a.attr("data-load", 1),
                        b.checkLoginInit())
                }
            })
        },
        checkLoginInit: function() {
            var a = this;
            c({
                automatic: !0,
                complete: function(b) {
                    if (b) {
                        var c = "";
                        b.Identity.IsAuthenticated ? (c = a.tpl(1, b.Identity.Unick),
                            a.hasLoginInit()) : c = a.tpl(0, ""),
                            a.el.find(".dd").html(c),
                            a.viewlist(),
                            a.baitiaoInit()
                    }
                }
            })
        },
        tpl: function(a, b) {
            var c = "//misc.360buyimg.com/lib/img/e/blank.gif";
            var d = '<div class="u-name"><a href="http://home.jd.com/">' + b + '</a><a id="userLevel" href="http://vip.jd.com/" target="_blank" class="user-level1"></a></div>';
            0 == a && (c = "//i.jd.com/commons/img/no-img_mid_.jpg",
                d = '<div class="u-name u-login"><a href="javascript:login();" class="link-login">\u4f60\u597d\uff0c\u8bf7\u767b\u5f55</a></div>');
            var e = '					<div class="u-pic"><a href="http://home.jd.com/"><img src="' + c + '" width="60" height="60" /></a></div>' + d + '					<div class="u-extra">						<a href="http://quan.jd.com/user_quan.action" target="_blank">\u4f18\u60e0\u5238<span id="num-ticket"></span></a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;						<a href="http://joycenter.jd.com/msgCenter/queryHistoryMessage.action" target="_blank">\u6d88\u606f<span id="num-tip"></span></a>					</div>			';
            var f = '<div class="dd-spacer"></div>				<div class="userinfo">' + e + '</div>				<div class="otherlist">					<div class="fore1">						<div class="item">							<a href="http://order.jd.com/center/list.action" clstag="" target="_blank">\u5f85\u5904\u7406\u8ba2\u5355<span id="num-unfinishedorder"></span></a>						</div>						<div class="item">							<a href="http://club.jd.com/myjd/userConsultationList_1.html" clstag="" target="_blank">\u54a8\u8be2\u56de\u590d<span id="num-consultation"></span></a>						</div>						<div class="item">							<a href="http://t.jd.com/product/followProductList.action?isReduce=true" clstag="" target="_blank">\u964d\u4ef7\u5546\u54c1<span id="num-reduction"></span></a>						</div>						<div class="item">							<a href="http://myjd.jd.com/repair/orderlist.action" clstag="" target="_blank">\u8fd4\u4fee\u9000\u6362\u8d27</a>						</div>					</div>					<div class="fore2">						<div class="item">							<a href="http://t.jd.com/home/follow" clstag="" target="_blank">\u6211\u7684\u5173\u6ce8</a>						</div>						<div class="item">							<a href="http://bean.jd.com/myJingBean/list" clstag="" target="_blank">\u6211\u7684\u4eac\u8c46</a>						</div>						<div class="item">							<a href="http://trade.jr.jd.com/centre/browse.action" clstag="" target="_blank">\u6211\u7684\u7406\u8d22</a>						</div>						<div class="item baitiao hide">							<a href="http://baitiao.jd.com/" clstag="jr|keycount|njdhome|wdbaitiao" target="_blank">\u6211\u7684\u767d\u6761</a>						</div>					</div>				</div>				<div class="viewlist" style="display:none;">					<div class="smt">						<h4>\u6211\u7684\u8db3\u8ff9</h4>						<span class="extra">							<a target="_blank" href="http://my.jd.com/history/list.html">\u66f4\u591a&nbsp;&gt;</a>						</span>					</div>					<div class="smc"></div>				</div>			';
            return f
        },
        hasLoginInit: function() {
            var a = this;
            $.ajax({
                url: "//minijd.jd.com/getHomeCount",
                dataType: "jsonp",
                success: function(b) {
                    b && 0 == b.error && a.el.find("#num-unfinishedorder").html(a.numStyleSet(b.orderCount))
                }
            }),
                $.ajax({
                    url: "//club.jd.com/index.php?mod=Consultation&action=havingReplyCount",
                    dataType: "jsonp",
                    success: function(b) {
                        b && a.el.find("#num-consultation").html(a.numStyleSet(b.cnt))
                    }
                }),
                $.ajax({
                    url: "//follow-soa.jd.com/rpc/product/queryForReduceProductCount.action?",
                    data: {
                        sysName: "misc"
                    },
                    dataType: "jsonp",
                    success: function(b) {
                        b && b.data > 0 && a.el.find("#num-reduction").html(a.numStyleSet(b.data))
                    }
                }),
                $.ajax({
                    url: "//quan.jd.com/getcouponcount.action",
                    dataType: "jsonp",
                    success: function(b) {
                        b && a.el.find("#num-ticket").html(a.numStyleSet(b.CouponCount))
                    }
                }),
                $.ajax({
                    url: "//joycenter.jd.com/msgCenter/init.action",
                    dataType: "jsonp",
                    success: function(b) {
                        b && "G001001" == b.result && a.el.find("#num-tip").html(a.numStyleSet(b.msgUnreadCount))
                    }
                }),
                $.ajax({
                    url: "//i.jd.com/user/petName/getUserInfoForMiniJd.action",
                    dataType: "jsonp",
                    success: function(b) {
                        if (b) {
                            b.imgUrl && a.el.find(".u-pic img").attr("src", b.imgUrl);
                            var c = b.userLevel;
                            if (c) {
                                var d = {
                                    1: "\u6ce8\u518c\u4f1a\u5458",
                                    2: "\u94dc\u724c\u4f1a\u5458",
                                    3: "\u94f6\u724c\u4f1a\u5458",
                                    4: "\u91d1\u724c\u4f1a\u5458",
                                    5: "\u94bb\u77f3\u4f1a\u5458"
                                };
                                $("#userLevel").attr({
                                    "class": "user-level" + c,
                                    title: d[c]
                                })
                            }
                        }
                    }
                })
        },
        numStyleSet: function(a) {
            return 0 == a ? "" : '<span class="num" style="color:#c00">&nbsp;' + a + "</span>"
        },
        viewlist: function() {
            var a = this;
            new e({
                $el: $("#jduc-viewlist"),
                skuHooks: "SKUS_recent_view",
                template: "",
                param: {
                    p: 202001,
                    sku: "",
                    ck: "pin,ipLocation,atw,aview",
                    lim: 5
                },
                callback: function(b, c) {
                    if (b && c) {
                        var d = "";
                        c = c.data;
                        var e = 0;
                        $.each(c, function(a, b) {
                            4 > e && b.sku && b.img && (d += '<div class="item"><a href="http://item.jd.com/' + b.sku + '.html" target="_blank" title="' + b.t + '"><img src="' + pageConfig.FN_GetImageDomain(b.sku) + "n5/" + b.img + '" width="50" height="50" alt="' + b.t + '" /></a></div>',
                                e++)
                        });
                        var f = a.el.find(".viewlist");
                        f.find(".smc").html(d),
                            f.show()
                    }
                }
            })
        },
        baitiaoInit: function() {
            var b = this;
            f("pin") ? this.baitiaoLinkSet(function(a) {
                var c = b.el.find(".baitiao");
                3 == a.status && a.btUrl && c.html('<a href="' + a.btUrl + '" target="_blank">' + a.btName + "</a>"),
                    c.show()
            }) : b.el.find(".baitiao").show()
        },
        baitiaoLinkSet: function(a) {
            $.ajax({
                url: "//baitiao.jd.com/ious/queryBT",
                type: "get",
                dataType: "jsonp",
                success: function(b) {
                    b && b.btList && b.btList[0] && a(b.btList[0])
                }
            })
        }
    };
    function h() {
        g.init()
    }
    return h
});
/* jdf-1.0.0/ shortcut.js Date:2015-12-21 11:41:53 */
define("//misc.360buyimg.com/jdf/1.0.0/unit/shortcut/2.0.0/shortcut.js", ["//misc.360buyimg.com/jdf/1.0.0/ui/dropdown/1.0.0/dropdown.js", "//misc.360buyimg.com/jdf/1.0.0/ui/areamini/1.0.0/areamini.js", "//misc.360buyimg.com/jdf/1.0.0/unit/setUserInfo/1.0.0/setUserInfo.js", "//misc.360buyimg.com/jdf/1.0.0/unit/myjd/2.0.0/myjd.js", "//misc.360buyimg.com/jdf/1.0.0/unit/localStorage/1.0.0/localStorage.js", "//misc.360buyimg.com/jdf/1.0.0/unit/cookie/1.0.0/cookie.js"], function(require) {
    require("//misc.360buyimg.com/jdf/1.0.0/ui/dropdown/1.0.0/dropdown.js");
    require("//misc.360buyimg.com/jdf/1.0.0/ui/areamini/1.0.0/areamini.js");
    var e = require("//misc.360buyimg.com/jdf/1.0.0/unit/setUserInfo/1.0.0/setUserInfo.js");
    var f = require("//misc.360buyimg.com/jdf/1.0.0/unit/myjd/2.0.0/myjd.js");
    var g = require("//misc.360buyimg.com/jdf/1.0.0/unit/localStorage/1.0.0/localStorage.js");
    var h = require("//misc.360buyimg.com/jdf/1.0.0/unit/cookie/1.0.0/cookie.js");
    function i() {
        var a = $("#footer-2014 .copyright");
        if (a.length) {
            var b = a.html();
            var c = (new Date).getFullYear();
            2016 == c && a.html(b.replace("2004-2015", "2004-2016"))
        }
    }
    function j() {
        i();
        var a = $("#shortcut-2014");
        var b = '<div class="dd-spacer"></div><div class="dd-inner"><span class="loading"></span></div>';
        e({
            el: $("#ttbar-login")
        });
        var c = '			<div class="dt cw-icon ui-areamini-text-wrap" style="display:none;">				<i class="ci-right"><s>\u25c7</s></i>				\u9001\u81f3\uff1a<span class="ui-areamini-text"></span> 			</div>			<div class="dd dorpdown-layer">				<div class="dd-spacer"></div>				<div class="ui-areamini-content-wrap"> 					<div class="ui-areamini-content"></div> 				</div> 			</div>		';
        $("#ttbar-mycity").html(c).areamini({
            hasCssLink: !1,
            className: {
                hover: "hover",
                selected: "selected"
            },
            provinceList: [{
                name: "\u6d77\u5916",
                tpl: '<div class="item"><a href="http://en.jd.com/" target="_blank" data-onchange="1"><%=name%></a></div>'
            }],
            tplContentWrap: '<div class="ui-areamini-content-list"><%=list%></div>',
            tplContentItem: '<div class="item"><a data-id="<%=id%>" href="javascript:void(0)"><%=name%></a></div>',
            syncServer: !0,
            writeCookie: !1,
            threeWordDeal: function(a) {
                var b = a.find(".ui-areamini-text").html();
                var c = a.find(".dd-spacer");
                3 == b.length ? c.addClass("dd-spacer-extend") : c.removeClass("dd-spacer-extend")
            },
            onReady: function() {
                this.el.find(".ui-areamini-text-wrap").show();
                var b = h("areaId");
                if (g.check() && b) {
                    var c = "areaId";
                    g.get(c) ? g.get(c) != b && (g.set(c, b),
                        g.clearByReg("^jd_home_2015_")) : g.set(c, b)
                }
                this.options.threeWordDeal(this.el)
            },
            onChange: function(a, b) {
                this.options.threeWordDeal(this.el),
                "undefined" != typeof b && window.location.reload()
            }
        }),
            f();
        var d = '			<div class="dd dorpdown-layer">				<div class="dd-spacer"></div>				<div class="dd-inner" id="ttbar-apps-main">' + b + "				</div>			</div>		";
        $("#ttbar-apps").append(d).attr("aid", "2_955_6342").dropdown({
            enterDelay: 50,
            trigger: !0,
            current: "hover",
            onchange: function(a) {
                a.attr("data-load") || (a.attr("data-load", 1),
                    $.ajax({
                        url: "//nfa.jd.com/loadFa.js?aid=2_955_6342",
                        dataType: "script",
                        success: function() {}
                    }))
            }
        });
        var j = '			<div class="dd dorpdown-layer">				<div class="dd-spacer"></div>				<div class="dd-inner" id="ttbar-atte-main">' + b + "				</div>			</div>		";
        $("#ttbar-atte").append(j).attr("aid", "2_955_6494").dropdown({
            enterDelay: 50,
            trigger: !0,
            current: "hover",
            onchange: function(a) {
                a.attr("data-load") || (a.attr("data-load", 1),
                    $.ajax({
                        url: "//nfa.jd.com/loadFa.js?aid=2_955_6494",
                        dataType: "script",
                        success: function() {}
                    }))
            }
        }),
            a.find("#ttbar-serv .dd").html(b),
            a.find("#ttbar-serv").dropdown({
                enterDelay: 50,
                trigger: !0,
                current: "hover",
                onchange: function(b) {
                    if (!b.attr("data-load")) {
                        b.attr("data-load", 1);
                        var c = setTimeout(function() {
                            d("//d.jd.com/client/get")
                        }, 3e3);
                        var d = function(b) {
                                $.ajax({
                                    url: b,
                                    dataType: "jsonp",
                                    scriptCharset: "gb2312",
                                    cache: !0,
                                    jsonpCallback: "getClientCallback",
                                    success: function(b) {
                                        if (b && "object" == typeof b) {
                                            clearTimeout(c),
                                                b = b.data;
                                            var d = '<div class="dd-spacer"></div>';
                                            var e = ['<div class="item-client">\u5ba2\u6237</div>'];
                                            var f = ['<div class="item-business">\u5546\u6237</div>'];
                                            $.each(b, function(a) {
                                                var c = b[a];
                                                var d = !c.type;
                                                0 == c.c && e.push('<div class="item"><a href="' + c.u + '" target="_blank" ' + d + ">" + c.n + "</a></div>"),
                                                1 == c.c && f.push('<div class="item"><a href="' + c.u + '" target="_blank" ' + d + ">" + c.n + "</a></div>")
                                            }),
                                                d += e.join(""),
                                            f.length > 1 && (d += f.join("")),
                                                a.find("#ttbar-serv .dd").html(d)
                                        }
                                    }
                                })
                            }
                            ;
                        d("//dc.3.cn/client/get")
                    }
                }
            }),
            a.find("#ttbar-navs .dd").html(b),
            a.find("#ttbar-navs").dropdown({
                enterDelay: 50,
                trigger: !0,
                current: "hover",
                leaveDelay: 100,
                onchange: function(b) {
                    if (!b.attr("data-load")) {
                        b.attr("data-load", 1);
                        var c = setTimeout(function() {
                            d("//d.jd.com/navigation/get")
                        }, 3e3);
                        var d = function(b) {
                                $.ajax({
                                    url: b,
                                    dataType: "jsonp",
                                    scriptCharset: "gb2312",
                                    cache: !0,
                                    jsonpCallback: "getNavigationCallback",
                                    success: function(b) {
                                        if (b && "object" == typeof b) {
                                            clearTimeout(c),
                                                b = b.data;
                                            var d = '<div class="dd-spacer"></div>';
                                            $.each(b, function(a) {
                                                var c = b[a];
                                                var e = c.s;
                                                var f = "";
                                                $.each(e, function(a) {
                                                    var b = e[a];
                                                    var c = b.c ? 'class="' + b.c + '"' : "";
                                                    f += '<div class="item"><a href="' + b.u + '" target="_blank" ' + c + ">" + b.n + "</a></div>"
                                                });
                                                var g = c.n;
                                                var h = c.c ? 'class="' + c.c + '"' : "";
                                                c.u && (g = '<a href="' + c.u + '" target="_blank" ' + h + ">" + c.n + "</a>"),
                                                    d += '<dl class="fore' + (a + 1) + '">									<dt>' + g + "</dt>									<dd>										" + f + "									</dd>								</dl>"
                                            }),
                                                a.find("#ttbar-navs .dd").html(d)
                                        }
                                    }
                                })
                            }
                            ;
                        d("//dc.3.cn/navigation/get")
                    }
                }
            })
    }
    return j
});
/* jdf-1.0.0/ shoppingcart.js Date:2015-12-01 14:05:08 */
define("//misc.360buyimg.com/jdf/1.0.0/unit/shoppingcart/2.0.0/shoppingcart.js", ["//misc.360buyimg.com/jdf/1.0.0/ui/dropdown/1.0.0/dropdown.js", "//misc.360buyimg.com/jdf/1.0.0/unit/trimPath/1.0.0/trimPath.js"], function(require) {
    require("//misc.360buyimg.com/jdf/1.0.0/ui/dropdown/1.0.0/dropdown.js");
    require("//misc.360buyimg.com/jdf/1.0.0/unit/trimPath/1.0.0/trimPath.js");
    window.pageConfig = window.pageConfig || {},
        pageConfig.shoppingcartUrl = $("#settleup-url").attr("data-from") ? $("#settleup-url").attr("data-from") : "//cart.jd.com/";
    var e = {
        el: null ,
        init: function() {
            var a = this;
            var b = function() {
                    null  != a.DATA_Amount && $("#shopping-amount").html(a.DATA_Amount)
                }
                ;
            document.getElementById("settleup") ? (null  != a.DATA_Amount && $("#settleup s").eq(0).addClass("shopping"),
                this.el = $("#settleup dl")) : document.getElementById("settleup-2013") ? this.el = $("#settleup-2013 dl") : document.getElementById("settleup-2014") && (this.el = $("#settleup-2014"),
                this.el.find(".ci-right").html("&gt;"),
                this.el.find(".dorpdown-layer").html('<div class="spacer"></div><div id="settleup-content"><span class="loading"></span></div>'),
                this.el.find(".cw-icon .ci-right").after('<i class="ci-count" id="shopping-amount"></i>')),
                b(),
            null  != this.el && this.el.dropdown({
                enterDelay: 500,
                trigger: !0,
                current: "hover",
                onchange: function() {
                    a.FN_Refresh(),
                        $("#settleup-url").attr("href", pageConfig.shoppingcartUrl)
                }
            })
        },
        DATA_Cookie: "cn",
        DATA_Amount: readCookie("cn") || "0",
        URL_Serv: "//cart.jd.com/cart/miniCartServiceNew.action",
        TPL_Iframe: '<iframe scrolling="no" frameborder="0" marginheight="0" marginwidth="0" id="settleup-iframe"></iframe>',
        TPL_NoGoods: '<div class="spacer"></div><div class="prompt"><div class="nogoods"><b></b>\u8d2d\u7269\u8f66\u4e2d\u8fd8\u6ca1\u6709\u5546\u54c1\uff0c\u8d76\u7d27\u9009\u8d2d\u5427\uff01</div></div>',
        TPL_List: {
            wrap: '<div class="spacer"></div><div id="settleup-content"><div class="smt"><h4 class="fl">\u6700\u65b0\u52a0\u5165\u7684\u5546\u54c1</h4></div><div class="smc"></div><div class="smb ar"><div class="p-total">\u5171<b>${Num}</b>\u4ef6\u5546\u54c1\u3000\u5171\u8ba1<strong>\uffe5 ${TotalPromotionPrice.toFixed(2)}</strong></div><a href="${pageConfig.shoppingcartUrl}" title="\u53bb\u8d2d\u7269\u8f66" id="btn-payforgoods">\u53bb\u8d2d\u7269\u8f66</a></div></div>',
            sigle: '<ul id="mcart-sigle">{for list in TheSkus}  <li>      <div class="p-img fl"><a href="http://item.jd.com/${list.Id}.html" target="_blank"><img src="${pageConfig.FN_GetImageDomain(list.Id)}n5/${list.ImgUrl}" width="50" height="50" alt=""></a></div>      <div class="p-name fl"><a href="http://item.jd.com/${list.Id}.html" title="${list.Name}" target="_blank">${list.Name}</a></div>      <div class="p-detail fr ar">          <span class="p-price"><strong>\uffe5${list.PromotionPrice.toFixed(2)}</strong>\xd7${list.Num}</span>          <br>          {if parseInt(list.FanPrice)>0}          <span class="hl-green">\u8fd4\u73b0\uff1a\uffe5<em>${list.FanPrice}</em></span>          <br>          {/if}          {if parseInt(list.Score)>0}          <span class="hl-orange">\u9001\u4eac\u8c46\uff1a<em>${list.Score}</em></span>          <br>          {/if}          <a class="delete" data-id="${list.Id}" data-type="RemoveProduct" href="javascript:void(0)">\u5220\u9664</a>      </div>      {for jq in list.CouponAD}      <div class="gift-jq">[\u8d60\u5238] \u8d60\u9001${jq.Jing}\u4eac\u5238 ${jq.LimitAd}</a></div>      {/for}  </li>{/for}</ul>',
            gift: '<ul id="mcart-gift">{for list in TheGifts}  <li>      <div class="p-img fl"><a href="http://item.jd.com/${list.MainSKU.Id}.html" target="_blank"><img src="${pageConfig.FN_GetImageDomain(list.MainSKU.Id)}n5/${list.MainSKU.ImgUrl}" width="50" height="50" alt=""></a></div>      <div class="p-name fl"><a href="http://item.jd.com/${list.MainSKU.Id}.html" title="${list.MainSKU.Name}" target="_blank">${list.MainSKU.Name}</a></div>      <div class="p-detail fr ar">          <span class="p-price"><strong>\uffe5${list.PromotionPrice.toFixed(2)}</strong>\xd7${list.Num}</span>          <br>          {if parseInt(list.FanPrice)>0}          <span class="hl-green">\u8fd4\u73b0\uff1a\uffe5<em>${list.FanPrice}</em></span>          <br>          {/if}          {if parseInt(list.Score)>0}          <span class="hl-orange">\u9001\u4eac\u8c46\uff1a<em>${list.Score}</em></span>          <br>          {/if}          <a class="delete" data-id="${list.MainSKU.Id}" data-type="RemoveProduct" href="#delete">\u5220\u9664</a>      </div>      {for gift in list.Skus}      <div class="gift"><a href="http://item.jd.com/${gift.Id}.html" target="_blank">[{if gift.Type==2}\u8d60\u54c1{/if}{if gift.Type==1}\u9644\u4ef6{/if}] ${gift.Name}</a></div>      {/for}      {for jq in list.CouponAD}      <div class="gift-jq">[\u8d60\u5238] \u8d60\u9001${jq.Jing}\u5143\u4eac\u5238 ${jq.LimitAd}</a></div>      {/for}  </li>  {/for}</ul>',
            suit: '{for suit in TheSuit}<ul id="mcart-suit">  <li class="dt">      <div class="fl"><span>[\u5957\u88c5]</span> ${suit.Name}</div>      <div class="fr"><em>\u5c0f\u8ba1\uff1a\uffe5${(suit.PromotionPrice*suit.Num).toFixed(2)}</em></div>      <div class="clr"></div>  </li>  {for list in suit.Skus}  <li>      <div class="p-img fl"><a href="http://item.jd.com/${list.Id}.html" target="_blank"><img src="${pageConfig.FN_GetImageDomain(list.Id)}n5/${list.ImgUrl}" width="50" height="50" alt=""></a></div>      <div class="p-name fl"><span></span><a href="http://item.jd.com/${list.Id}.html" title="${list.Name}" target="_blank">${list.Name}</a></div>      <div class="p-detail fr ar">          <span class="p-price"><strong>\uffe5${list.PromotionPrice.toFixed(2)}</strong>\xd7${list.Num}</span>          <br>          {if parseInt(list.FanPrice)>0}          <span class="hl-green">\u8fd4\u73b0\uff1a\uffe5<em>${list.FanPrice}</em></span>          <br>          {/if}          {if parseInt(list.Score)>0}          <span class="hl-orange">\u9001\u4eac\u8c46\uff1a<em>${list.Score}</em></span>          <br>          {/if}          <a class="delete" data-id="${list.Id}|${suit.Id}" data-type="RemoveSuit" href="javascript:void(0)">\u5220\u9664</a>      </div>      {for gift in list.Gifts}      <div class="gift"><a href="http://item.jd.com/${gift.Id}.html" target="_blank">[{if gift.Type==2}\u8d60\u54c1{/if}{if gift.Type==1}\u9644\u4ef6{/if}] ${gift.Name}</a></div>      {/for}      {for jq in list.CouponAD}      <div class="gift-jq">[\u8d60\u5238] \u8d60\u9001${jq.Jing}\u5143\u4eac\u5238 ${jq.LimitAd}</a></div>      {/for}  </li>  {/for}</ul>{/for}',
            mj: '{for mj in ManJian}<ul id="mcart-mj">  <li class="dt">      <div class="fl"><span class="hl-green">\u6ee1\u51cf</span>{if mj.ManFlag} \u5df2\u8d2d\u6ee1{if mj.ManNum>0}${mj.ManNum}\u4ef6{else}${mj.ManPrice}\u5143{/if}\uff0c\u5df2\u51cf${mj.JianPrice}\u5143{else}\u8d2d\u6ee1{if mj.ManNum>0}${mj.ManNum}\u4ef6{else}${mj.ManPrice}\u5143{/if}\uff0c\u5373\u53ef\u4eab\u53d7\u6ee1\u51cf\u4f18\u60e0{/if}</div>      <div class="fr"><em>\u5c0f\u8ba1\uff1a\uffe5${(mj.PromotionPrice*mj.Num).toFixed(2)}</em></div>      <div class="clr"></div>  </li>  {for list in mj.Skus}  <li>      <div class="p-img fl"><a href="http://item.jd.com/${list.Id}.html" target="_blank"><img src="${pageConfig.FN_GetImageDomain(list.Id)}n5/${list.ImgUrl}" width="50" height="50" alt=""></a></div>      <div class="p-name fl"><span></span><a href="http://item.jd.com/${list.Id}.html" title="${list.Name}" target="_blank">${list.Name}</a></div>      <div class="p-detail fr ar">          <span class="p-price"><strong>\uffe5${list.PromotionPrice.toFixed(2)}</strong>\xd7${list.Num}</span>          <br>          {if parseInt(list.FanPrice)>0}          <span class="hl-green">\u8fd4\u73b0\uff1a\uffe5<em>${list.FanPrice}</em></span>          <br>          {/if}          {if parseInt(list.Score)>0}          <span class="hl-orange">\u9001\u4eac\u8c46\uff1a<em>${list.Score}</em></span>          <br>          {/if}          <a class="delete" data-id="${list.Id}|${mj.Id}" data-type="RemoveSuit" href="#delete">\u5220\u9664</a>      </div>      {for gift in list.Gifts}      <div class="gift"><a href="http://item.jd.com/${gift.Id}.html" target="_blank">[{if gift.Type==2}\u8d60\u54c1{/if}{if gift.Type==1}\u9644\u4ef6{/if}] ${gift.Name}</a></div>      {/for}      {for jq in list.CouponAD}      <div class="gift-jq">[\u8d60\u5238] \u8d60\u9001${jq.Jing}\u5143\u4eac\u5238 ${jq.LimitAd}</a></div>      {/for}  </li>  {/for}</ul>{/for}',
            mz: '{for mz in ManZeng}<ul id="mcart-mz">  <li class="dt">      <div class="fl"><span class="hl-orange">\u6ee1\u8d60</span>          {if mz.ManFlag}              \u5df2\u8d2d\u6ee1${mz.ManPrice}\u5143\uff0c\u60a8{if mz.ManGifts.length>0}\u5df2{else}\u53ef{/if}\u9886\u8d60\u54c1          {else}              \u8d2d\u6ee1${mz.ManPrice}\u5143\uff0c\u5373\u53ef\u9886\u53d6\u8d60\u54c1          {/if}      </div>      <div class="fr"><em>\u5c0f\u8ba1\uff1a\uffe5${(mz.PromotionPrice*mz.Num).toFixed(2)}</em></div>      <div class="clr"></div>  </li>  {for gift in mz.ManGifts}<li class="dt-mz"><a href="${gift.Id}" target="_blank">[\u8d60\u54c1]${gift.Name}</a>\xd7${gift.Num}</li>{/for}  {for list in mz.Skus}  <li>      <div class="p-img fl"><a href="http://item.jd.com/${list.Id}.html" target="_blank"><img src="${pageConfig.FN_GetImageDomain(list.Id)}n5/${list.ImgUrl}" width="50" height="50" alt=""></a></div>      <div class="p-name fl"><span></span><a href="http://item.jd.com/${list.Id}.html" title="${list.Name}" target="_blank">${list.Name}</a></div>      <div class="p-detail fr ar">          <span class="p-price"><strong>\uffe5${list.PromotionPrice.toFixed(2)}</strong>\xd7${list.Num}</span>          <br>          {if parseInt(list.FanPrice)>0}          <span class="hl-green">\u8fd4\u73b0\uff1a\uffe5<em>${list.FanPrice}</em></span>          <br>          {/if}          {if parseInt(list.Score)>0}          <span class="hl-orange">\u9001\u4eac\u8c46\uff1a<em>${list.Score}</em></span>          <br>          {/if}          <a class="delete" data-id="${list.Id}|${mz.Id}" data-type="RemoveSuit" href="#delete">\u5220\u9664</a>      </div>      {for gift in list.Gifts}      <div class="gift"><a href="http://item.jd.com/${gift.Id}.html" target="_blank">[{if gift.Type==2}\u8d60\u54c1{/if}{if gift.Type==1}\u9644\u4ef6{/if}] ${gift.Name}</a></div>      {/for}      {for jq in list.CouponAD}      <div class="gift-jq">[\u8d60\u5238] \u8d60\u9001${jq.Jing}\u5143\u4eac\u5238 ${jq.LimitAd}</a></div>      {/for}  </li>  {/for}</ul>{/for}'
        },
        FN_BindEvents: function() {
            var a = this;
            $("#settleup-content .delete").bind("click", function() {
                var b = $(this).attr("data-id").split("|")
                    , c = $(this).attr("data-type")
                    , d = {
                    method: c,
                    cartId: b[0]
                };
                b && (b.length > 1 && b[1] && (d.targetId = b[1]),
                    $.ajax({
                        url: a.URL_Serv,
                        data: d,
                        dataType: "jsonp",
                        success: function(b) {
                            b.Result && a.FN_Refresh()
                        }
                    }))
            })
        },
        FN_Refresh: function() {
            var a = this;
            var b = this.el;
            var c;
            c = /dl/.test(b.selector) ? b.find("dd").eq(0) : b.find(".dorpdown-layer").eq(0);
            var e = function(b) {
                    var d = b.Cart
                        , e = d.TheSkus.length + d.TheSuit.length + d.TheGifts.length + d.ManJian.length + d.ManZeng.length
                        , f = a.TPL_List.sigle.process(b.Cart)
                        , g = a.TPL_List.gift.process(b.Cart)
                        , h = a.TPL_List.suit.process(b.Cart)
                        , i = a.TPL_List.mz.process(b.Cart)
                        , j = a.TPL_List.mj.process(b.Cart);
                    if (e > 0 ? (c.html(a.TPL_List.wrap.process(b.Cart)),
                            c.find("#settleup-content .smc").html(f + g + h + j + i),
                            $("#settleup-url").attr("href", pageConfig.shoppingcartUrl)) : c.html(a.TPL_NoGoods),
                        $.browser.msie && 6 == $.browser.version) {
                        var k = $("#settleup-content");
                        k.before(a.TPL_Iframe);
                        var l = $("#settleup-iframe");
                        l.height(k.height())
                    }
                    a.FN_BindEvents()
                }
                ;
            $.ajax({
                url: a.URL_Serv,
                data: {
                    method: "GetCart"
                },
                dataType: "jsonp",
                success: function(a) {
                    e(a)
                }
            }),
                a.DATA_Amount = readCookie(a.DATA_Cookie),
            null  != a.DATA_Amount && $("#shopping-amount").html(a.DATA_Amount).parent().show()
        }
    };
    function f() {
        e.init()
    }
    return f
});
/* jdf-1.0.0/ category.js Date:2015-09-15 18:39:12 */
define("//misc.360buyimg.com/jdf/1.0.0/unit/category/2.0.0/category.js", ["//misc.360buyimg.com/jdf/1.0.0/ui/lazyload/1.0.0/lazyload.js", "//misc.360buyimg.com/jdf/1.0.0/ui/dropdown/1.0.0/dropdown.js"], function(require) {
    require("//misc.360buyimg.com/jdf/1.0.0/ui/lazyload/1.0.0/lazyload.js"),
        require("//misc.360buyimg.com/jdf/1.0.0/ui/dropdown/1.0.0/dropdown.js");
    var c = {
        config: {
            el: $("#categorys-2014 .dd"),
            mainId: $("#categorys-2014"),
            dataUrl: "//dc.3.cn/category/get"
        },
        init: function(a) {
            var b = this;
            var c = $.extend({
                type: null ,
                mainId: null ,
                el: null
            }, a);
            if (c.mainId && (b.config.mainId = $(c.mainId)),
                c.el && (b.config.el = $(c.el)),
                b.config.mainId.attr("data-type") && (c.type = b.config.mainId.attr("data-type")),
                b.isHome() || "home" == c.type)
                b.config.mainId.bind("mouseenter", function() {
                    $(this).attr("data-load") || (b.getDataInit(),
                        $(this).attr("data-load", 1)),
                        b.config.el.show()
                }).one("mouseleave", function() {
                    b.config.mainId.find(".dd-inner .item").removeClass("hover")
                }),
                    b.config.mainId.find(".dd-inner .item").one("mouseenter", function() {
                        if (!b.config.mainId.attr("data-load")) {
                            var a = $(this).attr("data-index");
                            b.getDataInit(a),
                                b.config.el.show(),
                                b.config.mainId.attr("data-load", 1)
                        }
                    });
            else if ("mini" == c.type)
                b.config.mainId.bind("mouseenter", function() {
                    $(this).attr("data-load") || b.getDataInit(void 0, "mini"),
                        $(this).attr("data-load", 1),
                        b.config.mainId.addClass("hover"),
                        b.config.el.addClass("hover").show()
                }).bind("mouseleave", function() {
                    b.config.mainId.removeClass("hover"),
                        b.config.el.hide()
                });
            else if ("default" == c.type) {
                b.config.mainId.find(".dd").size() || (b.config.mainId.append('<div class="dd" style="display:none;"></div>'),
                    b.config.el = function() {
                        return $("#categorys-2014 .dd")
                    }()),
                    b.config.mainId.find(".dt a").append('<i class="ci-right"><s>\u25c7</s></i>'),
                    b.config.mainId.css({
                        height: "auto",
                        left: 0,
                        position: "absolute"
                    });
                var d = $("#navitems-2014");
                d.css({
                    "padding-left": 210
                }),
                $.browser.msie && $.browser.version <= 7 && !pageConfig.wideVersion && d.css({
                    marginRight: "-210px"
                }),
                    $(".dd", d).css({
                        "margin-top": 0,
                        "padding-top": 2
                    }),
                    b.config.mainId.bind("mouseenter", function() {
                        if ($(this).attr("data-load") || (b.getDataInit(),
                                $(this).attr("data-load", 1)),
                                b.config.el.show(),
                                b.config.mainId.addClass("hover"),
                                $.browser.msie) {
                            var a = 2;
                            $.browser.version < 9 && (a = 0,
                            $.browser.version < 7 && (a = 5)),
                                $(".ci-right s", b.config.mainId).css("top", a + "px")
                        }
                    }).bind("mouseleave", function() {
                        b.config.el.hide(),
                            b.config.mainId.removeClass("hover"),
                        $.browser.msie && $(".ci-right s", b.config.mainId).css("top", "-9px")
                    })
            }
        },
        getDataInit: function(a, b, c) {
            var d = this;
            $.ajax({
                url: d.config.dataUrl,
                dataType: "jsonp",
                scriptCharset: "gb2312",
                cache: !0,
                jsonpCallback: "getCategoryCallback",
                success: function(e) {
                    "mini" == b ? (d.render2(e),
                        d.bigiframe(d.config.el.find(".dd-inner"))) : (d.render(e),
                        d.bigiframe(d.config.el.find(".dorpdown-layer")),
                        d.bind(a)),
                    c && c()
                }
            })
        },
        imgIndex: 0,
        getLinkHtml: function(a, b, c, d, e, f) {
            var g = a.split("|");
            var h = [];
            g[0] = g[0].replace(/ /g, "");
            var j = /^\d.*\d$/.test(g[0]) ? g[0] : "http://" + g[0].replace(/^http\:\/\//g, "");
            if ("undefined" != typeof d) {
                var k = "";
                2 == d ? (k = "channel.jd.com",
                g[0] && (j = /^\d.*\d$/.test(g[0]) ? "http://" + k + "/" + g[0] + ".html" : (/^http/.test(g[0]) ? "" : "http://") + g[0])) : 3 == d && (/^\d.*\d$/.test(g[0]) ? 2 == g[0].split("-").length ? j = "http://channel.jd.com/" + g[0] + ".html" : 3 == g[0].split("-").length && (j = "http://list.jd.com/list.html?cat=" + g[0].replace(/\-/g, ",")) : j = (/^http/.test(g[0]) ? "" : "http://") + g[0])
            }
            1 == g[3] && h.push("style-red"),
            g[2] && h.push("img-link"),
            h.length > 0 && (h = 'class="' + h.join(" ") + '"');
            var l = "";
            return l = g[0] ? '<a href="' + j + '" ' + h + ' target="_blank">' : "<span>",
                g[2] ? (this.imgIndex > 4 && (this.imgIndex = 0),
                    b = b ? ' width="' + b + '"' : "",
                    c = c ? ' height="' + c + '"' : "",
                    l += '<img src="//misc.360buyimg.com/lib/img/e/blank.gif" data-lazy-img="//img1' + this.imgIndex + ".360buyimg.com/" + g[2] + '"  ' + b + c + " />",
                    this.imgIndex += 1) : l += (e ? e : "") + g[1] + (f ? f : ""),
                l += g[0] ? "</a>" : "</span>"
        },
        render: function(a) {
            var b = this;
            var c = a.data;
            var d = ""
                , e = "";
            $.each(c, function(a, f) {
                var g = "";
                var h = "";
                $.each(c[a].s, function(d) {
                    var e = c[a].s[d];
                    var i = !1;
                    h += b.getLinkHtml(e.n) + (d < c[a].s.length - 1 ? "\u3001" : ""),
                    "n" == f.id && 0 == d && (i = !0,
                        g += '<div class="subitems-main1">'),
                        $.each(e.s, function(a) {
                            var c = e.s[a].s;
                            var d = b.getLinkHtml(e.s[a].n, null , null , 2, null , "<i>&gt;</i>");
                            var f = "<dt>" + d + "</dt>";
                            var h = "";
                            0 != c && $.each(c, function(a) {
                                h += b.getLinkHtml(c[a].n, null , 16, 3)
                            }),
                                h = "<dd>" + h + "</dd>",
                                g += '<dl class="fore' + (a + 1) + '">' + f + h + "</dl>",
                            i && 6 == a && (g += '</div><div class="subitems-main2">')
                        }),
                    i && (g += "</div>")
                });
                var i = function(b) {
                        var c = 10 > a + 1 ? "0" + (a + 1) : a + 1;
                        return ' clstag="h|keycount|2015|05' + c + b + '"'
                    }
                    ;
                d += '<div class="item fore' + (a + 1) + '" data-index="' + (a + 1) + '" ' + i("a") + ">						<h3>" + h + "</h3>						<i>&gt;</i>					</div>				",
                    g = '<div class="subitems"' + i("c") + ">" + g + "</div>";
                var j = "";
                $.each(c[a].c, function(d) {
                    var e = c[a].c[d];
                    j += b.getLinkHtml(e, null , 24)
                }),
                j && (j = '<span class="line"></span><div class="sale">' + j + "</div>");
                var k = "";
                $.each(c[a].t, function(d) {
                    var e = c[a].t[d];
                    k += b.getLinkHtml(e, null , 24, null , null , "<i>&gt;</i>")
                }),
                    k = '<div class="channels">' + k + "</div>" + j,
                    k = '<div class="item-channels"' + i("b") + ">" + k + "</div>";
                var l = "";
                var m = 0;
                $.each(c[a].b, function(d) {
                    if (8 > d) {
                        var e = c[a].b[d];
                        l += b.getLinkHtml(e, 83, 35),
                            m += 1
                    }
                }),
                m > 0 && m % 2 == 1 && (l += '<a><img src="//img10.360buyimg.com/da/jfs/t757/162/604852976/158/9ed36f8/54c8699bNc2cfc6a1.png"></a>'),
                    l = '<div class="item-brands"' + i("d") + '><div class="brands-inner">' + l + "</div></div>";
                var n = "";
                $.each(c[a].p, function(d) {
                    if (2 > d) {
                        var e = c[a].p[d];
                        n += b.getLinkHtml(e, 168, 134)
                    }
                }),
                    n = '<div class="item-promotions"' + i("e") + ">" + n + "</div>",
                    e += '<div class="item-sub" id="category-item-' + (a + 1) + '" data-id="' + c[a].id + '">' + l + k + g + n + "</div>"
            }),
                e = '<div class="dorpdown-layer" style="display: none;">				' + e + "				</div>			",
                d = '<div class="dd-inner">' + d + "</div>",
                b.config.el.append(b.isHome() ? e : d + e)
        },
        render2: function(a) {
            var b = this;
            var c = a.data;
            var d = "";
            $.each(c, function(a) {
                var f = "";
                $.each(c[a].s, function(d) {
                    var e = c[a].s[d];
                    f += b.getLinkHtml(e.n) + (d < c[a].s.length - 1 ? "\u3001" : "")
                });
                var g = function(b) {
                        var c = 10 > a + 1 ? "0" + (a + 1) : a + 1;
                        return ' clstag="h|keycount|2015|05' + c + b + '"'
                    }
                    ;
                d += '<div class="item fore' + (a + 1) + '" data-index="' + (a + 1) + '" ' + g("a") + ">						<h3>" + f + "</h3>					</div>				"
            }),
                d = '<div class="dd-inner">' + d + "</div>",
                b.config.el.html(d)
        },
        bind: function(a) {
            var b = this;
            var c = function(a) {
                    b.config.el.find(".dorpdown-layer").show(),
                        b.config.el.find(".item-sub").removeClass("hover");
                    var c = b.config.el.find(".item-sub").eq(a - 1);
                    c.addClass("hover"),
                        c.lazyload(),
                        b.topRest()
                }
                ;
            b.config.el.dropdown({
                item: "item",
                current: "hover",
                topspeed: !0,
                bodyClass: "item-sub",
                onchange: function(a) {
                    c(a.attr("data-index")),
                    $.browser.msie && 6 == $.browser.version && b.iframeName && $("#" + b.iframeName).height(b.iframeContext.outerHeight())
                },
                onmouseleave: function() {
                    b.config.mainId.find(".dd-inner .item.hover").removeClass("hover"),
                        b.config.el.find(".dorpdown-layer").hide(),
                        b.config.el.find(".item-sub").removeClass("hover"),
                    $.browser.msie && 6 == $.browser.version && b.iframeName && $("#" + b.iframeName).height(0)
                }
            }),
            "undefined" != typeof a && (c(a),
                b.config.el.find(".item").removeClass("hover"),
                b.config.el.find(".item").eq(a - 1).addClass("hover"))
        },
        topRest: function() {
            var a = this;
            var b = a.config.el.offset().top;
            var c = $(window).scrollTop();
            b = c > b ? c - b + 44 : "",
                a.config.el.find(".dorpdown-layer").css({
                    top: b
                })
        },
        isHome: function() {
            return "undefined" != typeof pageConfig ? pageConfig.navId && "jdhome2015" == pageConfig.navId : !1
        },
        bigiframe: function(a, b, c) {
            var d = this;
            if (a && $.browser.msie && 6 == $.browser.version) {
                "undefined" == typeof b && (b = a.outerWidth()),
                "undefined" == typeof c && (c = a.outerHeight()),
                100 > c && (c = $(window).height()),
                    d.iframeName = "categoryIe6BgIframe",
                    d.iframeContext = a;
                var e = '<iframe src="javascript:false;" frameBorder="0" style="width:' + b + "px;height:" + c + 'px;position:absolute;z-index:-1;opacity:0;filter:alpha(opacity=0);top:0;left:0;" id="' + d.iframeName + '">';
                a.append(e)
            }
        }
    };
    function d(a) {
        c.init(a)
    }
    return d
});
/* jdf-1.0.0/ log.js Date:2015-11-27 16:28:41 */
!function() {
    if (!window.uba_lab_tag) {
        window.uba_lab_tag = !0;
        var a = {
            "www.jd.com": ['/li[id="ttbar-myjd"]/div[1]', '/div[id="ttbar-apps-main"]', '/div[id="ttbar-atte-main"]', '/li[id="ttbar-serv"]/div[1]', '/li[id="ttbar-navs"]/div[1]', '/li[id="d_', '/div[id="settleup-content"]', '/ul[id="mcart-sigle"]', '/div[id="settleup-content"]', '/div[id="category-item']
        };
        function b(a, b) {
            var c = !1;
            for (var d = 0, e = a.length; e > d; d++) {
                var f = a[d];
                f = f.replace(/\[/gm, "\\["),
                    f = f.replace(/\]/gm, "\\]");
                var g = new RegExp(f);
                if (g.test(b)) {
                    c = !0;
                    break
                }
            }
            return c
        }
        var c = {
            addHandler: function(a, b, c) {
                a.addEventListener ? a.addEventListener(b, c, !1) : a.attachEvent ? a.attachEvent("on" + b, c) : a["on" + b] = c
            },
            removeHandler: function(a, b, c) {
                a.addEventListener ? a.removeEventListener(b, c, !1) : a.attachEvent ? a.detachEvent("on" + b, c) : a["on" + b] = null
            },
            getEvent: function(a) {
                return a ? a : window.event
            },
            getTarget: function(a) {
                return a.target || a.srcElement
            },
            preventDefault: function(a) {
                a.preventDefault ? a.preventDefault() : a.returnValue = !1
            },
            stopPropagation: function(a) {
                a.stopPropagaiton ? a.stopPropagaiton : a.cancelBubble = !0
            }
        };
        function d(a) {
            var b = 0;
            var c = a.parentNode.firstChild;
            for (; c; c = c.nextSibling)
                if (1 === c.nodeType) {
                    if (c === a)
                        break;
                    b += 1
                }
            return b
        }
        function e(a) {
            if ("html" == a.nodeName.toLowerCase() || "body" == a.nodeName.toLowerCase())
                return null ;
            var b = function(a) {
                    var c = a.parentNode;
                    var e = "";
                    if (c)
                        try {
                            c.getAttribute("id") ? e += c.nodeName.toLowerCase() + '[id="' + c.getAttribute("id") + '"]/' : (e += c.nodeName.toLowerCase() + "[" + d(c) + "]/",
                                e += b(c))
                        } catch (f) {}
                    return e
                }
                ;
            var c;
            return c = a.getAttribute("id") ? a.nodeName.toLowerCase() + '[id="' + a.getAttribute("id") + '"]/' : a.nodeName.toLowerCase() + "[" + d(a) + "]/" + b(a),
                c.split("/").reverse().join("/")
        }
        function f(a) {
            var b = c.getTarget(a);
            var d = e(b);
            if (!document.getElementById("tracelessLogDebug")) {
                var f = document.createElement("textarea");
                var g = 900;
                var h = 20;
                f.id = "tracelessLogDebug",
                    f.style.border = "1px #C81623 solid",
                    f.style.padding = "5px 10px",
                    f.style.width = g + "px",
                    f.style.height = h + "px",
                    f.style.background = "#C81623",
                    f.style.color = "#fff",
                    f.style.zIndex = 100,
                    f.style.opacity = .7,
                    f.style.position = "fixed",
                    f.style.left = "50%",
                    f.style.top = "0px",
                    f.style.marginLeft = "-" + g / 2 + "px",
                    document.getElementsByTagName("body")[0].appendChild(f)
            }
            "tracelessLogDebug" != b.getAttribute("id") && (document.getElementById("tracelessLogDebug").innerHTML = d),
                c.preventDefault(a)
        }
        var g = function(a, b) {
                var c = function(a) {
                        for (var b = 0, c = 0; c < a.length; c++)
                            b = (b << 5) - b + a.charCodeAt(c),
                                b &= b;
                        return b
                    }
                    ;
                return Math.abs(c(a)) % b
            }
            ;
        var h = function(a) {
                var b = a + "=";
                var c = document.cookie.split(";");
                for (var d = 0; d < c.length; d++) {
                    var e = c[d];
                    for (; " " == e.charAt(0); )
                        e = e.substring(1, e.length);
                    if (0 == e.indexOf(b))
                        return e.substring(b.length, e.length)
                }
                return null
            }
            ;
        function i() {
            var a = 0;
            return document.documentElement && document.documentElement.scrollTop ? a = document.documentElement.scrollTop : document.body && (a = document.body.scrollTop),
                a
        }
        var j = function(a) {
                var b = "uas_log_" + (new Date).getTime();
                var c = window[b] = new Image;
                c.onload = c.onerror = function() {
                    window[b] = null
                }
                    ,
                    c.src = a,
                    c = null
            }
            ;
        var k = h("pin") ? h("pin") : "";
        var l = h("__jda") ? h("__jda").split(".")[1] : "";
        var m = h("__jdb") ? h("__jdb").split(".")[2] : "";
        var n = h("__jda") ? h("__jda").split(".")[5] : "";
        var o = 1;
        var p = function(a) {
                if (a.clientX > 1 && a.clientY > 1) {
                    var b = a.clientX - window.screen.width / 2;
                    var c = a.clientY + i();
                    var d = window.screen.width;
                    var e = "cw=" + b + "$ch=" + c + "$sw=" + d + "$zb=" + n + "$labt=" + o;
                    e = encodeURIComponent(e);
                    var f = encodeURIComponent(document.referrer);
                    var g = "//mercury.jd.com/log.gif?t=uas.000000&m=UA-J2011-1&pin=" + k + "&uid=" + l + "&sid=" + m + "&v=" + e + "&ref=" + f + "&rm=" + (new Date).getTime();
                    j(g)
                }
            }
            ;
        var q = function(a) {
                var b = "d=" + a + "$zb=" + n + "$labt=2";
                b = encodeURIComponent(b);
                var c = encodeURIComponent(document.referrer);
                var d = "//mercury.jd.com/log.gif?t=uas.000000&m=UA-J2011-1&pin=" + k + "&uid=" + l + "&sid=" + m + "&v=" + b + "&ref=" + c + "&rm=" + (new Date).getTime();
                j(d)
            }
            ;
        /isdebug=(-\d)*-30/.test(location.search) && c.addHandler(document, "click", function(a) {
            c.getEvent(a);
            f(a)
        }),
        /http\:\/\/china\.jd\.com/.test(location.href) && l && r(),
        /http\:\/\/channel\.jd\.com\/beautysale\.html/.test(location.href) && l && r(),
        /http\:\/\/channel\.jd\.com\/fashion\.html/.test(location.href) && l && r();
        function r() {
            var a = "boolean" == typeof document.hidden ? !0 : !1;
            if (a) {
                var b = $(window);
                var c = [];
                function d() {
                    var a = b.scrollTop();
                    var c = b.height() + a;
                    var d = {
                        t: a,
                        b: c
                    };
                    return d
                }
                function e() {
                    if (c.length > 0) {
                        for (var a = 0; a < c.length; a++)
                            c[a].d = parseFloat(c[a].d.toFixed(2));
                        var b = JSON.stringify(c);
                        q(b)
                    }
                }
                var f;
                var g;
                var h;
                setInterval(function() {
                    a && document.hidden === !1 && (e(),
                        c = [])
                }, 5e3);
                function i() {
                    window.clearTimeout(g),
                        window.clearInterval(f),
                        g = window.setTimeout(function() {
                            h = d(),
                                h.d = 1,
                                c.push(h),
                                f = window.setInterval(function() {
                                    a && document.hidden === !1 && (0 === c.length ? (h.d = 0,
                                        c.push(h)) : h.d += .01)
                                }, 10)
                        }, 1e3)
                }
                b.bind("scroll", function() {
                    i()
                }),
                    i()
            }
        }
        window.onload = function() {
            l && $.ajax({
                url: "//d.jd.com/lab/get",
                dataType: "jsonp",
                jsonpCallback: "lab",
                cache: !0,
                success: function(d) {
                    d && $.each(d, function(f) {
                        var h = d[f];
                        var i = (new Date).getTime();
                        if (h.url && h.startOn && h.endOn && h.percent) {
                            var j = h.url;
                            if (location.href.indexOf(j) > -1 && i >= h.startOn && i <= h.endOn + 864e5 && g(l, 1e4) <= 100 * parseInt(h.percent))
                                return c.addHandler(document, "click", function(d) {
                                    var f = c.getEvent(d);
                                    a[j] ? b(a[j], e(c.getTarget(d))) || p(f) : p(f)
                                }),
                                    !1
                        }
                    })
                }
            })
        }
    }
}();