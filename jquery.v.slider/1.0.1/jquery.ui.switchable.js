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

        var _this=this,_op,$navItem="",$navClass,$contentPage="",$bodyExtra;
        _this.el = $(element);
        _op=_this.option=  $.extend({}, Switchable.DEFAULTS, options || {});
        _this.len =_this.el.find("."+_op.mainClass).size();

        //自动播放定时器
        _this.autoInterval = null;
        //延时触发
        _this.eventTimer = null;

        //判断 是否 有  nav
        if(_op.navClass){
            for(var i=0; i<_this.len; i++){
                $navItem += '<li class="'+ _op.navItem + ("0" == i ? " "+_op.navSelectedClass : "")+'">' + (_op.step ?_op.step++ : "")+'</li>';
            }
            $navClass='<ul class="'+ _op.navClass +'">'+ $navItem +'</ul>';

            //_this.el.append($navClass);
        }
        //判断 是否 有  翻页
        if(_op.contentPage){
            $contentPage='<div class="'+_op.contentPage+'"><a href="javascript:void(0)" class="'+_op.prevClass+'">&lt;</a><a href="javascript:void(0)" class="'+_op.nextClass+'">&gt;</a></div>';
        }
        _op.bodyExtra ? ($bodyExtra = '<div class="'+_op.bodyExtra+'">'+$navClass + $contentPage +'</div>') : ($bodyExtra = $navClass + $contentPage );

        _this.el.append($bodyExtra);
        //初始化 完成
        _this.nav = _this.el.find("." + _op.navItem);

        console.log(_this.nav)


    };
    Switchable.VERSION = '1.0.0';
    Switchable.DEFAULTS={
            type:"tab",//类型
            direction: "left",// 布局方向

            contentClass: "ui-switchable-panel-main", //面板包含元素
            mainClass: "ui-switchable-panel",//面板 元素
            mainSelectedClass: "ui-switchable-panel-selected", //面板 当前 活动 元素

            bodyClass: "ui-switchable-panel-body",//面板内容 包含的 元素  mainClass 的父级元素

            navClass: "ui-switchable-trigger",//导航 包含元素   [bool ： 判断是否需要插入 navClass]
            navItem: "ui-switchable-item",//导航元素
            navSelectedClass: "ui-switchable-selected",//导航活动当前元素

             prevClass: "ui-switchable-prev", //上一页
             nextClass: "ui-switchable-next",  // 下一页
            contentPage:"ui-switchable-page", //箭头包裹       _this.el.append($navClass);


            bodyExtra: false, //"ui-switchable-extra"


            autoPlay:!1, //是否自动播放
            mouseenterStopPlay: !0, //鼠标进入停滞播放
            playDirection: "next", //播放的方向

            event: "mouseover", // 鼠标移入navItem 的事件
            speed: 400,         // 动画播放的时间

            delay: 150,         //切换 延迟时间,保证快速 切换 不闪动
            defaultPanel: 0,    //默认面板 初始索引 [索引值]

            stayTime:5e3,  //停留时间

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
    Switchable.prototype.eventBind=function(){
        var _this = this,_op = _this.options;
        //鼠标 移入 nav 的 时候
        _this.nav.on(_this.event,function(){
            var $current= $(this)
            clearInterval( _this.autoInterval );
            //当前移入的 元素 记录在 current
            0 === _op.delay ? (_this.current = $current.index(),
                _this.switchTo(_this.current)):(clearTimeout(_this.eventTimer),
                _this.eventTimer = setTimeout(function() {
                        b.current =  $current.index(),
                            _this.switchTo(_this.current)
                    }
                    , _op.delay));

        })
    };
    //切换入口
    Switchable.prototype.switchTo=function(i){
        var _this = this,_op = _this.options;
        if ("undefined" == typeof i){
            console.log("\u7d22\u5f15\u4e0d\u662f\u4e00\u4e2a\u6570\u5b57")

        }

        _this.switchNavTo(i);
            _this.switchMainTo(i)

    };
    Switchable.prototype.switchNavTo=function(i){

    };
    Switchable.prototype.switchMainTo=function(i){

    };
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



