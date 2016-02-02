/* developer: MrChen
 jquery.ui.switchable  */


!(function (factory) {
    if (typeof define === "function" && define.amd) {
        // AMD模式
        define("jquery.ui.switchable",[ "jquery","public/jquery.easing"], factory);
    } else {
        // 全局模式
        factory(jQuery);
    }
}(function ($ ,easing,undefined) {
    var Switchable=function(element , options){

        var _this=this,_op,
            _initState=!0;
        _this.el = $(element);
        _op=_this.options=  $.extend({}, Switchable.DEFAULTS, options || {});

        if(_this.addClassfnc(),
                //如果显示的数量 小于了 步数成立，就让 显示数 == 步数
        _op.visible < _op.step &&(_op.visible = _op.step ),
                _this.nav = _this.el.find("." + _op.navItem),
                _this.main = _this.el.find("." + _op.mainClass),
                _op.step = Math.max(_op.step || 1, 1),
                _this.len =_this.main.size(),
                _this.content = _this.el.find("." + _op.contentClass),
                _this.mainWidth = _this.main.outerWidth(_op.includeMargin),
                _this.mainHeight = _this.main.outerHeight(_op.includeMargin),
                _initState=_op.step < _this.len,
                "tab" == _op.type && _op.navSelectedClass && _this.nav.length > 0){
                var e=-1;
                _this.nav.each(function(i){
                    var $this = a(this);
                    $this.hasClass(_op.navSelectedClass) && (-1 == e ? e = i : $this.removeClass(_op.navSelectedClass))
                }),
                e > -1 && (_op.defaultPanel = e)
        }
        if(_op.width && (_this.mainWidth = _op.width),
                _this.mainHeight = _this.main.outerHeight(_op.includeMargin),
            _op.height && (_this.mainHeight = _op.height),
                _this.cloneCount = Math.max(_op.step, _op.visible),
            _op.seamlessLoop && _initState){
                var front = [],
                    behind = [],
                    _cloneCount = _this.cloneCount;

                for (var i = 0; _cloneCount > i; i++){
                    front.push(_this.main.eq(i).clone().attr("data-switchable-clone", 1).data("switchable-clone-from", _cloneCount + i)),
                        behind.push(_this.main.eq(_this.len - (i + 1)).clone().attr("data-switchable-clone", 1).data("switchable-clone-from",  _this.len + i));
                }
                for (var j = 0; _cloneCount > j; j++){
                    _this.content.prepend(behind[j]).append(front[j]);
                }
                _this.main = _this.el.find("." + _op.mainClass)
            }

            _this.main.each(function(b) {
                    $(this).data("switchable-idx", b)
                }
            );


        //初始化 完成

        var  idefaultPanel=_op.defaultPanel;

        _this.last = idefaultPanel,  //记录 上次一次的 索引
        _this.current = idefaultPanel, //初始当前值
        _this.isInit = !0, //初始当前值
            _op.seamlessLoop && _initState ? _this.switchTo(idefaultPanel, idefaultPanel + _this.cloneCount) : _this.switchTo(idefaultPanel, idefaultPanel),
        //_this.switchTo(idefaultPanel),
        _this.autoInterval = null, //自动播放定时器
        _this.eventTimer = null;  //延时触发
        _initState && ( _this.autoPlay(),
            _this.eventBind());
    };
    Switchable.VERSION = '1.0.0';
    Switchable.DEFAULTS={
            type:"tab",//类型
            direction: "left",   //和slider 相关的属性 "left" ,"top"

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


            isAutoPlay:!1, //是否自动播放
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
            step: 1,        //  每次走的 步数
            seamlessLoop: !1, //无缝循环

            visible: 1,     // 显示 的个数 { 针对 slider}
            easing: "swing",
            hasLoop: !1,
            counter:1, // 索引 计数器 [ false]
            callback: null ,
            onNext: null ,
            onPrev: null
    };
    Switchable.prototype.addClassfnc=function(){

    };
    Switchable.prototype.eventBind=function(){
        var _this = this,_op = _this.options;
        //鼠标 移入 nav 的 时候
        (_op.navClass && _this.nav) && ( _this.nav.on(_op.event,function(){
            var $current= $(this);
            clearInterval( _this.autoInterval );
            //当前移入的 元素 记录在 current
            0 === _op.delay ? (_this.current = $current.index(),
                _this.switchTo(_this.current , _op.seamlessLoop ? _this.current + _this.cloneCount : _this.current)):(clearTimeout(_this.eventTimer),
                _this.eventTimer = setTimeout(function() {
                    _this.current =  $current.index();
                            _this.switchTo(_this.current, _op.seamlessLoop ? _this.current + _this.cloneCount : _this.current)
                    }, _op.delay));

        }).on("mouseleave",function(){
            clearTimeout(_this.eventTimer);
            _op.mouseenterStopPlay || _this.autoPlay()
        }));
        // 如果 event 是 click

        //鼠标 移入 切换 面板
        _op.mouseenterStopPlay && (_this.el.on("mouseenter", function() {
                clearInterval(_this.autoInterval)
            }).on("mouseleave", function() {

                _this.autoPlay();

            }));
            _this.page()

    };
    //切换入口
    Switchable.prototype.switchTo=function(_iNav,iMain){

        var _this = this,_op = _this.options;
        if ("undefined" == typeof _iNav || "undefined" == typeof iMain ){
            console.log("\u7d22\u5f15\u4e0d\u662f\u4e00\u4e2a\u6570\u5b57")

        }else{
            _this.switchNavTo(_iNav);
                 _this.switchMainTo(iMain)
        }

    };
    Switchable.prototype.switchNavTo=function(i){
        var _this = this,_op = _this.options;

        _this.nav.removeClass(_op.navSelectedClass);
            _this.nav.eq(i).addClass(_op.navSelectedClass)

    };
    Switchable.prototype.switchMainTo=function(i){
        var _this = this,_op = _this.options;
        if(_this.switchType(i),(null  != _op.callback)){

            _op.callback.call(_this);
        }
        _this.last = i;
    };
    //切换类型
    Switchable.prototype.switchType=function(i){
        var _this = this,_op = _this.options;
        switch (_op.type) {
            case "tab":
                _this.tab(i);
                break;
            case "focus":
                _this.focus(i);
                break;
            case "slider":
                _this.slider(i);
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
    Switchable.prototype.focus=function(i){
        var _this = this,_op = _this.options;

        _this.isInit ? (_this.main.parent().css({
            position: "relative"
        }),
            _this.main.css({
                position: "absolute",
                zIndex: 0,
                opacity: 0
            }).show(),
            _this.main.eq(i).css({
                zIndex: 1,
                opacity: 1
            }),
            _op.isPlayLock = !1) : (setTimeout(function() {
                _op.isPlayLock = !1
            }
            , _op.speed),
            _this.main.eq(_this.last).css({
                zIndex: 0
            }).stop(!0).animate({
                    opacity: 1
                }, _op.speed, _op.easing, function() {
                    $(this).css("opacity", 0)
                }
            )),
            _this.main.eq(i).css({
                zIndex: 1
            }).stop(!0).animate({
                opacity: 1
            }, _op.speed, _op.easing),
            _this.isInit = !1

    };
    Switchable.prototype.slider=function(i){
        console.log(i)
        var _this = this,
            _op = _this.options,
            _mainWidth =_this.mainWidth,
            _mainHeight =_this.mainHeight,
            $content = _this.content,
            _l=_mainWidth * i,
            _t=_mainHeight * i;
        _this.isInit ? ("left" == _op.direction ? (_this.main.css({
            "float": "left"
        }),
           /* $content.css({
                width: _mainWidth * _this.len
            }),*/
            $content.css(_op.seamlessLoop ? {
                width: _mainWidth * (_this.len + 2 * _this.cloneCount)
            } : {
                width: _mainWidth * _this.len
            }),
            $content.css({
                left: -_l
            })) : "top" == _op.direction && $content.css({
            top: -_t
        }),
            $content.parent().css({
                position: "relative"
            }),
            $content.css({
                position: "absolute"
            }),
            _this.isInit = !1,
            _op.isPlayLock = !1) :(setTimeout(function() {
                _op.isPlayLock = !1
            }
            , _op.speed),
            "left" == _op.direction ? $content.stop(!0).animate({
                left: -_l
            }, _op.speed, _op.easing) : "top" == _op.direction && $content.stop(!0).animate({
                top: -_t
            }, _op.speed, _op.easing))
    };
    Switchable.prototype.carousel=function(){};
    Switchable.prototype.imgscroll=function(){};

    //事件
    Switchable.prototype.page=function(){
        var _this = this,_op = _this.options,$prevClass = _this.el.find("." + _op.prevClass),$nextClass = _this.el.find("." + _op.nextClass);
        $prevClass.on("click", function(e) {
                _op.isPlayLock && _this.content && _this.content.length > 0  || (_op.isPlayLock = !0,
                    _this.prev(),
                    e.stopPropagation())
            }
        );
            $nextClass.on("click", function(e) {
                _op.isPlayLock && _this.content && _this.content.length > 0 || (_op.isPlayLock = !0,
                        _this.next(),
                        e.stopPropagation())
                }
            )
    };

    Switchable.prototype.next=function(){
        var _this = this,_op = _this.options;
        var difference = 0;


        _this.current = _this.current + _op.step;
        _this.offsetIndex()
        _this.current >= _this.len && (_this.current = 0);
        console.log( _this.cloneCount)
        console.log( _this.current)
        _this.switchTo( _this.current, _op.seamlessLoop ? _this.current + _this.cloneCount : _this.current);
        $.isFunction(_op.onNext) && _op.onNext.call(_this)
    };
    Switchable.prototype.prev=function(){
        var _this = this,_op = _this.options;
        _this.current -= _op.step;
        _this.current < 0 && (_this.current =  _this.len - _op.step);
        _this.switchTo( _this.current, _op.seamlessLoop ? _this.current + _this.cloneCount : _this.current);
        $.isFunction(_op.onPrev) && _op.onPrev.call(_this);

    };
    Switchable.prototype.offsetIndex=function(a){
        var _this = this;
        var $content = _this.content;
        var _op = _this.options;
        var _mainWidth = _this.mainWidth;
        var _mainHeight = _this.mainHeight;
        var w = null ;
        var h = null ;
        var i = null ;

            console.log( _this.current)
            console.log( _this.len)
        _this.current >= _this.len && $content.css({ left : 0})

      /*  a && _op.seamlessLoop ? ( ) :*/

    };
    Switchable.prototype.autoPlay=function(){
        var _this = this;
        _this.options.isAutoPlay && _this.startPlay()
    };
    Switchable.prototype.startPlay=function(){
        var _this = this,_op = _this.options;
        _this.stopPlay();

        _this.autoInterval = setInterval(function() {
                _this.main.length <= _op.step ? _this.stopPlay() : "prev" == _op.playDirection ? _this.prev() : _this.next()
            }
            , _op.stayTime)
    };
    Switchable.prototype.stopPlay=function(){
        var _this = this;
        clearInterval(_this.autoInterval)
    };



    // Switchable plugin definition
    // =====================
    function Plugin(option) {
        return new Switchable(this , option)
    }

    $.fn.switchable             = Plugin;
    $.fn.switchable.Constructor = Switchable;
}));



