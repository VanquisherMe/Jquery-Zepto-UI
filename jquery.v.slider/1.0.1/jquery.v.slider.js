/**
 * developer：Chen.
 *
 * banenr 广告 图展示
 *
 * $('J_class').
 *  switchDom:'.J_SwitchDom',                       切换的主体
 *  stateInit:0,                                    初始化显示
 *
 * *  sliderBtnStatus:[show：直接显示]                控件状态
 *                  [fadeIn：直接显示]
 *
 *  sliderBtn:true                                  左右控件
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
}(function ($ ,easing,undefined) {

    var slider={
        v: '1.0.1'
    };



    var slideClass = function(options){
        var _this=this;
        //获得当前设置的实际参数
        this.option=  $.extend({}, slideClass.DEFAULTS, options || {});
        //获得切换的个数

        this.len=$(_this.retc(this.option.vessel)).find(_this.retc(this.option.handover_Dom)).length;

        //初始化 组件配置
        this.creat();
    };


    slideClass.DEFAULTS={
        stateInit:0,                                            //   [number]  初始化显示 的对象是第几个
        vessel:"slider-vessel",                                 //   [string]  包含元素
        handover_Dom:"handover-dom",                            //   [string]  具体切换的元素对象

        sliderBtn_Parent:false,                                 //   [Boole/string]  左右按钮的父级元素
        slider_Btn:"slider-btn",                                 //   [Boole/string]  左右控件
        slider_Btn_Next:"slider-btn-next",
        slider_Btn_Prev:"slider-btn-prev",

        slider_Nav:"slider-nav",                                 //   [Boole/string]  滑动器导航
        slider_Nav_Parent:false,                                 //   [Boole/string]   滑动器导航-父元素
        loop:false,
        loopGap :1500
    };

    //返回 类字符串
    slideClass.prototype.retc=function(str){
        return '.'+str
    };
    //初始化 组件配置 方法
    slideClass.prototype.creat=function(){
        var _this=this, _op=this.option;

        //init 显示 初始显示
        $(_this.retc(_op.vessel)).find(_this.retc(_op.handover_Dom)).eq(_op.stateInit)
            .css({
                display:"block",
                zIndex:1
            });

        //判断 是否添加 sliderNav
        if(_op.slider_Nav){
            this.sliderNavFnc()
        }
       /* //是否添加 左右切换控件
        if(_op.slider_Btn){
            this.sliderBtnFnc()
        }
        //设置循环
        if(_op.loop){
            this.loopFnc()
        }*/

    };
    slideClass.prototype.sliderNavFnc=function(){
        var _this=this,_op=this.option;

        //如果存在 导航父级 就放在里面 如果不在就 插入到容器下

         var _len=this.len,
             $sliderNav=this.sliderNavHTML( _len);

        if(_op.slider_Nav_Parent){
            $(_this.retc(_op.vessel)).find(_this.retc(_op.slider_Nav_Parent)).append($sliderNav)
        }else{
            $(_this.retc(_op.vessel)).append($sliderNav)
        }

        //设置 $sliderNav 的宽度 保持居中
        $sliderNav.css({width:$sliderNav.find('li').outerWidth(true)*_len})
            .find('li').eq(_op.stateInit).addClass('active');
        //event
        $sliderNav.find('li').on("mouseover",function(){
            var nI=$(this).index();
            _op.stateInit = nI;
            _this.viewSync();
        })

    };
    slideClass.prototype.sliderBtnFnc=function(){
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
    slideClass.prototype.loopFnc=function(){
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
    slideClass.prototype.stateIndex=function(bol){
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
    slideClass.prototype.viewSync=function(){
        var $this=this, $elem = this.element,_op=this.option;

        //扩展 对应的参数 做出调整
        $elem.find(_op.switchDom).eq(_op.stateInit).stop().fadeIn(1200).siblings(_op.switchDom).stop().fadeOut(300);

        if(_op.sliderNav){
            $elem.find('.J_sliderNav li').eq(_op.stateInit).addClass('active').siblings('li').removeClass('active');
        }
    };


    //滑动器 导航
    slideClass.prototype.sliderNavHTML= function(len){
        console.log(len)
        var strHTML='',_op=this.option;
        for(var i=0; i<len; i++){
            strHTML+='<li></li>'
        }
        return $('<ul class="'+ _op.slider_Nav +'">'+strHTML+'</ul> ')
    };

    slideClass.prototype.sliderBtnHTML= function(){
        var _op=this.option;
        return $('<a class="'+_op.slider_Btn+' '+ _op.slider_Btn_Prev +'"> < </a><a class="'+_op.slider_Btn+' '+_op.slider_Btn_Next +'"> > </a> ')
    };
    //添加 主入口 方法
    slider.slide=function(deliver){
        new slideClass(deliver);
    };


    return slider
}));



