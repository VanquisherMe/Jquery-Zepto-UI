/**
 * developer：Chen.
 *
 * banenr 广告 图展示
 *
 * $('J_class').
 *  switchDom:'.J_SwitchDom',                       切换的主体
 *  stateInit:0,                                    初始化显示
 *
 *  sliderBtn:true                                  左右控件
 *  sliderBtnStatus:[show：直接显示]                控件状态
 *                  [fadeIn：直接显示]
 *  sliderBtnParent                                 左右控件-父元素
 *
 *  sliderNav:true,                                 滑动器导航
 *  sliderNavParent                                 滑动器导航-父元素
 *
 *  loop:true,                                      是否循环
 *  loopGap :1500                                   切换时间

 */

;(function (factory) {
    if (typeof define === "function" && define.amd) {
        // AMD模式
        define([ "jquery" ,"public/jquery.easing"], factory);
    } else {
        // 全局模式
        factory(jQuery);
    }
}(function ($) {

    var Slider = function(element , options){
        this.element = $(element);
        this.option=options;

        this.len=this.element.find(this.option.switchDom).length;
        //console.log(this.init)
        this.init();
    };
    Slider.DEFAULTS={
        /* dom 对象 集*/
        handover_DOM:".handover_dom",  // [string]  具体切换的元素对象

        /*插件 参数*/
        stateInit:0,                   // [number]  初始化显示 的对象是第几个
        sliderBtn:true                //  [number] 左右控件



    };


    Slider.prototype.init=function(){
        var $elem = this.element,_op=this.option;
        //console.log(this.sliderNav);
        //init 显示 初始显示
        $elem.find(_op.switchDom).eq(_op.stateInit).show();
        //判断 是否添加 sliderNav
        if(_op.sliderNav){
            this.sliderNavFnc()
        }
        //是否添加 左右切换控件
        if(_op.sliderBtn){
            this.sliderBtnFnc()
        }
        //设置循环
        if(_op.loop){
            this.loopFnc()
        }

    };


    Slider.prototype.sliderNavFnc=function(){
        var $this=this, $elem = this.element,_op=this.option;

        //如果存在 导航父级 就放在里面 如果不在就在放在 bnr域下
        var _len=this.len,
            $sliderNav=this.sliderNavHTML( _len);

        if(_op.sliderNavParent){
            $elem.find(_op.sliderNavParent).append($sliderNav)
        }else{
            $elem.append($sliderNav)
        }

        //设置 $sliderNav 的宽度 保持居中
        $sliderNav.css({width:$sliderNav.find('li').outerWidth(true)*_len})
            .find('li').eq(_op.stateInit).addClass('active');
        //event
        $sliderNav.find('li').on("mouseover",function(){
            var nI=$(this).index();
            _op.stateInit = nI;
            $this.viewSync();
        })

    };
    Slider.prototype.sliderBtnFnc=function(){
        var $this=this, $elem = this.element,_op=this.option;

        var $sliderBtn =this.sliderBtnHTML();
        if(_op.sliderBtnParent){
            //console.log( _elem.find(_op.sliderBtnParent))
            $elem.find(_op.sliderBtnParent).append($sliderBtn)
        }else{
            $elem.append($sliderBtn)
        }

        //计算位置
        $sliderBtn.css({top:$elem.height()/2-$sliderBtn.outerHeight(true)/2});
        //event
        //判断 btn  的状态
        if(_op.sliderBtnStatus == "show"){
            $sliderBtn.css({display:'block'})
        }

        if(_op.sliderBtnStatus == "fadeIn"){
            $elem.hover(function(){
                    $sliderBtn.fadeIn()
                },
                function(){
                    $sliderBtn.fadeOut()
                });
        }



        $elem.find('.sliderBtn-Prev').on("click",function(){
            $this.stateIndex(false);
            //console.log(_op.stateInit)
            $this.viewSync();
        });

        $elem.find('.sliderBtn-Next').on("click",function(){
            $this.stateIndex(true);
            //console.log(_op.stateInit)
            $this.viewSync();
        })




    };

    //loop 循环
    Slider.prototype.loopFnc=function(){
        var $this=this, $elem = this.element,_op=this.option;
        //console.log(_op.loopGap)
        setloopInterval( $elem.Tim ,_op.loopGap)

        $elem.hover(function(){
                clearInterval($elem.Tim)
            },
            function(){

                setloopInterval( $elem.Tim ,_op.loopGap)
                /* $elem.Tim=setInterval(function(){
                 setloop()
                 },_op.loopGap);*/
            });

        function setloopInterval(_tim , _loopGap){
            $elem.Tim=setInterval(function(){
                setloop()
            },_op.loopGap);
        }

        function setloop(){
            $this.stateIndex(true);
            $this.viewSync();
        }

    };

    //获得当前 索引
    Slider.prototype.stateIndex=function(bol){
        var _op=this.option,
            len= this.len,
            staI=_op.stateInit;

        if(bol){
            staI++;
            if(staI > len-1){
                staI =  0;
            }

        }else{
            staI--;
            if(staI < 0){
                staI =  len-1;
            }

        }
        _op.stateInit=staI;

    };

    //同步 view
    Slider.prototype.viewSync=function(){
        var $this=this, $elem = this.element,_op=this.option;

        //扩展 对应的参数 做出调整
        $elem.find(_op.switchDom).eq(_op.stateInit).stop().fadeIn(1200).siblings(_op.switchDom).stop().fadeOut(300);

        if(_op.sliderNav){
            $elem.find('.J_sliderNav li').eq(_op.stateInit).addClass('active').siblings('li').removeClass('active');
        }
    };



    Slider.prototype.sliderNavHTML= function(len){
        var strHTML='';
        for(var i=0; i<len; i++){
            strHTML+='<li></li>'
        }

        return $('<ul class="J_sliderNav">'+strHTML+'</ul> ')
    };
    Slider.prototype.sliderBtnHTML= function(){

        return $('<a class="sliderBtns sliderBtn-Prev "> < </a><a class="sliderBtns sliderBtn-Next "> > </a> ')
    };



    return Slider
}));



