/**
 * developer：Mr Chen
 * time:2015/10/3.
 * tab.js
 *
 * 包含 dom ：JS_***
 *
 * $('J_class').         选项卡包裹的域
 *
 *  stateInit:  number,          初始化显示
 *
 *
 * tabBtn:               切换的选项的按钮
 * tabBox:               切换的盒子
 *
 * tabBtnEvent           0  [click]
 *                       1  [mouseover]
 * tabBoxStatus:  【注意 ajax 没缓存状态设置无效】       0 [ show]
 *                                                      1 [ fadeIn ]
 *                                                      2 ["active"]
 *
 *  isAjax           :    Boolean      是否启用AJax 形式
 *  AjaPortCallback  ：   []           接口参数
 *  AjaCache  :             true [表示元素会自动增加dom，直至每一个都点过，就不在请求 当前函数而是直接 切换选项]
 *                          false[每次都请求 当前的函数]
 *
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

    var Tab=function(element , options){
        this.element = $(element);
        this.option=options;

        //是否 初始化的判断值
        this.element.data("data-init",0);
        this.init();

    };
    Tab.prototype.init=function(){
        var $elem = this.element,_op=this.option;

        if(_op.isAjax){
            this.tabAjaxInit()
        }else{
            this.tabInit()
        }

    };


    Tab.prototype.tabAjaxInit=function(){
        var $this=this, $elem = this.element,_op=this.option;
        var $tabBtn=$elem.find(_op.tabBtn), $tabBox=$elem.find(_op.tabBox);
        //初始化 视图

        //如果是 需要缓存的状态 则为每一个按钮 添加缓存状态【0：未缓存 , 1:已经缓存】
        if(_op.AjaCache){
            $tabBtn.each(function(){
                $(this).data("cache" ,0);

            });
            //创建对应 btn  的 box
            $this.createHTML()
        }else{
            $elem.find(_op.tabBox).eq(0).show();
        }

        this.tabTriggerFnc();
    };

    Tab.prototype.createHTML=function(){
        var $elem = this.element,_op=this.option;
        var $tabBtn=$elem.find(_op.tabBtn), $tabBox=$elem.find(_op.tabBox),
            $tabBoxParent = $tabBox.parent(),
            $createtabBox=$tabBox.clone();

        //清除 box 元素 重新 放入
             $tabBoxParent.empty();

        $tabBtn.each(function(){

            $tabBoxParent.append($createtabBox.clone().empty());
            console.log($tabBoxParent)
        })



    };


    Tab.prototype.tabInit=function(){
        var $elem = this.element,_op=this.option;
        var $tabBtn=$elem.find(_op.tabBtn), $tabBox=$elem.find(_op.tabBox);

        //初始化 视图

        this.tabTriggerFnc()


    };

    Tab.prototype.tabTriggerFnc=function(){
        var $this=this, $elem = this.element,_op=this.option;
        var Nevent=this.tabBtnEventFnc(),
            $tabBox=$elem.find(_op.tabBox);


        $elem.find(_op.tabBtn).on(Nevent[_op.tabBtnEvent],function(e){
            e.preventDefault();
            var $self = $(this),StaI=$self.index();

            //判断是否是 初始化 执行
            if($elem.data("data-init") == 1 && StaI == _op.stateInit){
                return
            }else{
                $elem.data("data-init",1)
            }


            _op.stateInit =StaI;
            $this.tabBtnSync($(this));

            /*if ajax*/
            if(_op.isAjax){

                 if(_op.AjaCache){
                    //判断 当前是否 缓存
                     if($self.data("cache") == 0){
                         $self.data("cache",1);
                         AjaPortCallbackFnc(_op.stateInit , $elem.find(_op.tabBox).eq(_op.stateInit));
                     }

                     $this.tabViewSync($tabBox.eq(_op.stateInit))

                 }else{
                    AjaPortCallbackFnc(_op.stateInit , $elem.find(_op.tabBox).eq(0))

                 }

            }else{

                $this.tabViewSync($tabBox.eq(_op.stateInit))
            }

        }).eq(_op.stateInit).trigger(Nevent[_op.tabBtnEvent]);

        //ajax 函数 加载 对象 回调
        function AjaPortCallbackFnc(i , dom){
            _op.AjaPortCallback[i](function(data){
                console.log(data);
                dom.empty().append(data)
            })
        }


    };

    //视图 同步
    Tab.prototype.tabViewSync=function(Nelem){
        var _op=this.option;
        if(_op.tabBoxStatus == 0){
            Nelem.show().siblings().hide()
        }


        if(_op.tabBoxStatus == 1){
            Nelem.fadeIn(800).siblings().fadeOut(600)
        }

        if(_op.tabBoxStatus == 2){

            this.tabBtnSync(Nelem)
        }

    };

    Tab.prototype.tabBtnSync=function(Nelem){
        Nelem.addClass('active').siblings().removeClass('active')
    };


    //默认事件状态
    Tab.prototype.tabBtnEventFnc=function(){
        return [
            "click",
            "mouseover"
        ]
    };




    // TAB PLUGIN DEFINITION
    // =====================

    function Plugin(option) {
        return this.each(function () {
            var $this = $(this);
            var data  = $this.data('rn.tab');

            if (!data) $this.data('rn.tab', (data = new Tab(this , option) ))


        })
    }

    $.fn.tab             = Plugin;
    $.fn.tab.Constructor = Tab;
}));
