/* product-home/1.0.0 focus.js Date:2015-12-17 15:28:48 */
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
                    }
                    , 4e3 - (b - j))
            }
        );
        var n;
        var o = function() {
                clearTimeout(n),
                    l.find(".slider-page").show()
            }
            ;
        var p = function() {
                n = setTimeout(function() {
                        l.find(".slider-page").hide()
                    }
                    , 100)
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
                            5 == m.current ? e.attr("data-lazy-img", "done").attr("src", +d.image_url) : e.attr("data-lazy-img", d.image_url).attr("src", "//misc.360buyimg.com/lib/img/e/blank.gif"),
                                (new Image).src = d.exposal_url
                        }
                    }
                ) : !1
            }()
    }
);