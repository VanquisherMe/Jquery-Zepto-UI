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
        this.element = $(element);
        this.option=options;
    };
   Switchable.DEFAULTS={
            baseVersion: "1.0.0",  //版本
            cssLinkVersion: "1.0.0",//css 版本
            type:"tab",//类型
            direction: "left",// 左边移动

            navClass: "ui-switchable-trigger",//导航 包含元素
            navItem: "ui-switchable-item",//导航元素
            navSelectedClass: "ui-switchable-selected",//导航活动当前元素

            contentClass: "ui-switchable-panel-main", //面板包含元素
            mainClass: "ui-switchable-panel",//面板 元素
            mainSelectedClass: "ui-switchable-panel-selected", //面板 当前 活动 元素

            bodyClass: "ui-switchable-panel-body",//面板内容 包含的 元素  mainClass 的父级元素
    };

    // Switchable plugin definition
    // =====================
    function Plugin(option) {
        return new Switchable(this , option)
    }

    $.fn.switchable             = Plugin;
    $.fn.switchable.Constructor = Switchable;
}));



