/* developer: MrChen
 jquery.ui.switchable  */


!(function (factory) {
    if (typeof define === "function" && define.amd) {
        // AMD模式
        define("jquery.ui.switchable",[ "jquery"], factory);
    } else {
        // 全局模式
        factory(jQuery);
    }
}(function ($ ,undefined) {
    var Switchable=function(element , options){
        var _this=this;
        _this.element = $(element);
        _this.option=options;
        _this.init();
    };
    Switchable.DEFAULTS={
            baseVersion: "1.0.0",  //版本
            cssLinkVersion: "1.0.0",//css 版本
            type:"tab",//类型
            direction: "left",// 布局方向

            navClass: "ui-switchable-trigger",//导航 包含元素
            navItem: "ui-switchable-item",//导航元素
            navSelectedClass: "ui-switchable-selected",//导航活动当前元素

            contentClass: "ui-switchable-panel-main", //面板包含元素
            mainClass: "ui-switchable-panel",//面板 元素
            mainSelectedClass: "ui-switchable-panel-selected", //面板 当前 活动 元素

            bodyClass: "ui-switchable-panel-body",//面板内容 包含的 元素  mainClass 的父级元素


             prevClass: "ui-switchable-prev", //上一页
             nextClass: "ui-switchable-next",  // 下一页

            autoPlay:!1, //是否自动播放
            mouseenterStopPlay: !0, //鼠标进入停滞播放
            playDirection: "next", //播放的方向

            event: "mouseover", // 鼠标移入navItem 的事件
            speed: 400,         // 动画播放的时间
            callback: null ,
            onNext: null ,
            onPrev: null ,

            delay: 150,         //关于自播放 延时时间
            defaultPanel: 0,    //默认面板 初始索引 [索引值]

            stayTime:5e3, //停留时间

            includeMargin:!1, //计算 元素 单位的时候 是否计算 margin 值

           width: 0,
           height: 0,
           seamlessLoop: !1, //无缝循环
            step: 1,
            visible: 1,
            easing: "swing",
            hasLoop: !1
    };
    Switchable.prototype.init =function(){


    };

    // Switchable plugin definition
    // =====================
    function Plugin(option) {
        return new Switchable(this , option)
    }

    $.fn.switchable             = Plugin;
    $.fn.switchable.Constructor = Switchable;
}));



