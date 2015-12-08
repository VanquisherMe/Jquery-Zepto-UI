/**
 * developer：Chen.
 * @WrapTab: 选项卡包裹的域
 * @BoxTab:  包裹切换的块
 * @ListTab: 切换的块
 * @state:   0 [ show]
 *            1 [ fadeIn ]
 */


;(function (factory) {
    if (typeof define === "function" && define.amd) {
        // AMD模式
        define([ "jquery" ], factory);
    } else {
        // 全局模式
        factory(jQuery);
    }
}(function ($) {
    $.fn.pullDown = function(options) {





    };

    $.fn.pullDown.defaults={



    }
}));
