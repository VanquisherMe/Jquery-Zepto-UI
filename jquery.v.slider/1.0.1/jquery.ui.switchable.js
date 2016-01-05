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

        var _this=this,_op,$navItem="",$navClass;

        _this.el = $(element);
        _op=_this.option=  $.extend({}, Switchable.DEFAULTS, options || {});
        _this.len =_this.el.find("."+_op.mainClass).size();

        //
        for(var i=0; i<_this.len; i++){
            _op.step ? ( $navItem += '<li class="'+ _op.navItem +'">' +(_op.step++)+'</li>') : ( $navItem += '<li class="'+ _op.navItem +'"></li>')
        }
        $navClass='<ul class="'+ _op.navClass +'">'+ $navItem +'</ul>';
        _this.el.append($navClass);
        _this.init();
    };
    Switchable.VERSION = '1.0.0';
    Switchable.DEFAULTS={
            type:"tab",//类型
            direction: "left",// 布局方向

            contentClass: "ui-switchable-panel-main", //面板包含元素
            mainClass: "ui-switchable-panel",//面板 元素
            mainSelectedClass: "ui-switchable-panel-selected", //面板 当前 活动 元素

            bodyClass: "ui-switchable-panel-body",//面板内容 包含的 元素  mainClass 的父级元素

            navClass: "ui-switchable-trigger",//导航 包含元素
            navItem: "ui-switchable-item",//导航元素
            navSelectedClass: "ui-switchable-selected",//导航活动当前元素

             prevClass: "ui-switchable-prev", //上一页
             nextClass: "ui-switchable-next",  // 下一页
            contentPage:"ui-switchable-page", //箭头包裹

            bodyExtra: "ui-switchable-extra",


            autoPlay:!1, //是否自动播放
            mouseenterStopPlay: !0, //鼠标进入停滞播放
            playDirection: "next", //播放的方向

            event: "mouseover", // 鼠标移入navItem 的事件
            speed: 400,         // 动画播放的时间

            delay: 150,         //关于自播放 延时时间
            defaultPanel: 0,    //默认面板 初始索引 [索引值]

            stayTime:5e3, //停留时间

            includeMargin:!1, //计算 元素 单位的时候 是否计算 margin 值

           width: 0,
           height: 0,
           seamlessLoop: !1, //无缝循环
            step: 1, // 步数 索引初始值
            visible: 1,
            easing: "swing",
            hasLoop: !1,

            callback: null ,
            onNext: null ,
            onPrev: null ,
    };
    Switchable.prototype.init =function(){
        var _this = this,_op = _this.options;


    };
    //切换入口
    Switchable.prototype.switchTo=function(){};
    Switchable.prototype.switchNavTo=function(){};
    Switchable.prototype.switchMainTo=function(){};
    //切换类型
    Switchable.prototype.switchType=function(){
        var _this = this,_op = _this.options;
        switch (_op.type) {
            case "tab":
                _this.tab(a);
                break;
            case "focus":
                _this.focus(a);
                break;
            case "slider":
                _this.slider(a);
                break;
/*            case "carousel":
                _this.carousel(a);
                break;
            case "imgscroll":
                _this.imgscroll(a)*/
            default:
                //选择类型有误
              console.log("\u9009\u62e9\u7c7b\u578b\u6709\u8bef");
        }
    };

    //效果层
    Switchable.prototype.tab=function(){};
    Switchable.prototype.focus=function(){};
    Switchable.prototype.slider=function(){};
    Switchable.prototype.carousel=function(){};
    Switchable.prototype.imgscroll=function(){};

    // Switchable plugin definition
    // =====================
    function Plugin(option) {
        return new Switchable(this , option)
    }

    $.fn.switchable             = Plugin;
    $.fn.switchable.Constructor = Switchable;
}));



