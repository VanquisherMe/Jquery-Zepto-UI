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
        _this.clickState=true
        //获得当前设置的实际参数
        this.option=  $.extend({}, slideClass.DEFAULTS, options || {});
        //获得切换的个数

        this.len=$(_this.retc(this.option.vessel)).find(_this.retc(this.option.handover_Dom)).length;

        //初始化 组件配置
        this.creat();
    };


    slideClass.DEFAULTS={
        stateInit:0,                                            //   [number]  初始化显示 的对象是第几个
        sliderBtn_Wrap_w:"auto",
        vessel:"slider-vessel",                                 //   [string]  包含元素
        handover_Dom:"handover-dom",                            //   [string]  具体切换的元素对象


        sliderBtn_Parent:false,                                 //   [Boole/string]  左右按钮的父级元素
        sliderBtn_Wrap:"sliderBtn_wrap",
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
                zIndex:2
            });

        //判断 是否添加 sliderNav
        if(_op.slider_Nav){
            this.sliderNavFnc()
        }
       //是否添加 左右切换控件
        if(_op.slider_Btn){
            this.sliderBtnFnc()
        }
        //设置循环
         if(_op.loop){
            this.loopFnc()
        }

    };
    slideClass.prototype.sliderNavFnc=function(){
        var _this=this,_op=this.option,navW;

        //如果存在 导航父级 就放在里面 如果不在就 插入到容器下
         var _len=this.len,
             $sliderNav=this.sliderNavHTML( _len);

        if(_op.slider_Nav_Parent){
            $(_this.retc(_op.vessel)).find(_this.retc(_op.slider_Nav_Parent)).append($sliderNav)
        }else{
            $(_this.retc(_op.vessel)).append($sliderNav)
        }
            navW=   $sliderNav.find('li').outerWidth(true)*_len;
        //设置 $sliderNav 的宽度 保持居中
        $sliderNav
            .css({
                width :navW,
                marginLeft:-navW/2,
                bottom:"10px",
                left  :"50%"
                })
            .find('li').eq(_op.stateInit).addClass('active');
        //event
        $sliderNav.find('li').on("mouseover",function(){
            //_op.stateInit = $(this).index();
            _this.viewSync($(this).index());
        })

    };
    slideClass.prototype.sliderBtnFnc=function(){
        var _this=this,_op=this.option,$v=$(_this.retc(_op.vessel));

        var $sliderBtnWrap =_this.sliderBtnHTML(),$sliderBtn=$sliderBtnWrap.find(_this.retc(_op.slider_Btn));
        if(_op.slider_Nav_Parent){
            //console.log( _elem.find(_op.sliderBtnParent))
            $v.find(_this.retc(_op.slider_Nav_Parent)).append($sliderBtnWrap)
        }else{
            console.log($v.height()/2-$sliderBtnWrap.outerHeight(true)/2)
            $v.append($sliderBtnWrap);
            $sliderBtnWrap.css({
                position: "absolute",
                width:_op.sliderBtn_Wrap_w,
                marginLeft:-_op.sliderBtn_Wrap_w/2,
                left:"50%",
                top:$v.height()/2-$sliderBtn.outerHeight(true)/2
            })
        }
        //event
        //判断 btn  的状态

        $v.on("mouseover",function(){
            $sliderBtn.show()
        });

        $v.on("mouseleave",function(){
            $sliderBtn.hide()
        });



        $v.find(_this.retc(_op.slider_Btn_Prev)).on("click",function(e){
            e.preventDefault()
            if(_this.clickState){
                _this.clickState=false
                _this.stateIndex(false);
                //_this.viewSync();
            }
            e.stopPropagation()
            return false
        });

        $v.find(_this.retc(_op.slider_Btn_Next)).on("click",function(e){
            e.preventDefault()
            if(_this.clickState){
                _this.clickState=false
                _this.stateIndex(true);
                //_this.viewSync();
            }
            e.stopPropagation()
            return false
        })

    };

    //loop 循环
    slideClass.prototype.loopFnc=function(){
        var _this=this,_op=this.option,$v=$(_this.retc(_op.vessel));
        //console.log(_op.loopGap)
        setloopInterval( _this.Tim ,_op.loopGap)
        $v.on("mouseover",function(){
            clearInterval(_this.Tim)
        });

        $v.on("mouseleave",function(){
            setloopInterval( _this.Tim ,_op.loopGap)
        });

        function setloopInterval(_tim , _loopGap){
            _this.Tim=setInterval(function(){
                _this.stateIndex(true);
            },_op.loopGap);
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
        //_op.stateInit=staI;
        this.viewSync(staI);
    };

    //同步 view
    slideClass.prototype.viewSync=function(i){
        var _this=this,_op=this.option;

        _op.stateInit=i;
        //扩展 对应的参数 做出调整
        $(_this.retc(_op.vessel)).find(_this.retc(_op.handover_Dom)).eq(_op.stateInit)
            .css({zIndex:2})
            .stop().fadeIn(600,function(){
            _this.clickState=true
        }).siblings(_this.retc(_op.handover_Dom))
            .css({zIndex:1}).stop().fadeOut(360);

        if(_op.slider_Nav){
            $(_this.retc(_op.vessel))
                .find(_this.retc(_op.slider_Nav))
                .find('li').eq(_op.stateInit).addClass('active').siblings('li').removeClass('active');
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
        return $('<div class="'+_op.sliderBtn_Wrap+'"><a class="'+_op.slider_Btn+' '+ _op.slider_Btn_Prev +'"></a><a class="'+_op.slider_Btn+' '+_op.slider_Btn_Next +'"></a></div> ')
    };
    //添加 主入口 方法
    slider.slide=function(deliver){
        new slideClass(deliver);
    };


    return slider
}));



