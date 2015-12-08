/**
 * developer：Chen.
 *
 * Popup
 * 弹出层
 *
 *  $(). 表示 append 的域 ： "body"  或者 自定义的盒子元素
 *  如果不是 "body" 会启用 absolute 定位 默认fixed
 *  当前dom 在html 里面 ，并且不改变 位置 ，如果位置不对 将会 添加到 元素里面
 *------------------------------------------------
 * skin [皮肤] 【"string"】:        这里可以添加 包裹域的 class，【空格 隔开即可】
 * shade[遮罩] 【"number"】：        默认为 0.3；
 * title[标题]【"string"】：
 * content[内容] 【"string"】:      【自定义：".class" || '<div></div>'】
 *                                  【注意在：tierType：【alert || confirm 】模式下 content只是描述内容】
 *
 * closeBtn[关闭按钮]【Boole】:     false
 * offset[坐标] 【"arr" 坐标无需再css中设置 】:      【default：["auto","auto","auto","auto"]】：设置的时候注意 left top right bottom =》["0" , "0",false,false]
 * area[宽高] 【"arr" 优先依赖css 这里会高于 css 权限】:        【default：false】[1000,300]
 * shift:                           【default：0】  fadeIn
 *                                  css3在扩展 = ["class"] 当等于数组的时候 添加类
 *
 *
 * tierType[层类型]：[0：custom]
 *           [1: alert]---------------------------------------------------------------------AlertBtn【"arr"】:  【default：["确定"]】如果不需要 == false
 *                                                                                              @@回调
 *                                                                                            callConfirm 【"function"】:  [callBack()]
 *
 *           [2: confirm]------------------------------------------------------------------- ConfirmBtn【"arr"】：【default：["是","否"]】 必须存在
 *                                                                                           @@回调
 *                                                                                          callConfirm 【"function"】:  [callBack()]
 *                                                                                          callCancel 【"function"】:   [callBack()]
 *
 * @@@@@@@@@@@@@回调
 * callSuccess ["function"]:  callSuccess( "$当前层" ,[_this.closeFnc 函数])
 * callEnd ["function"]: 关闭后 回调
 * times:   毫秒    延时退出
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

    var Popup=function(element , options){
/*        console.log($(element))
        console.log(options)*/
        this.element = $(element);

        this.option=  $.extend({}, Popup.DEFAULTS, options || {});
        this.option.isDestroy=null;
        this.option.ZIndex=$.fn.popup.tier++;
        this.option.tierMark=Popup.NAMECACHE["PopupZ"]+this.option.ZIndex;
        //初始化 插入对象
        this.createTier();


    };

    Popup.DEFAULTS={
        skin: "popup-main",
        shade:0.3,
        title:false,
        closeBtn:false,
        AlertBtn:["确定"],
        ConfirmBtn:["是","否"],
        offset:["auto","auto","auto","auto"], //left top right bottom
        area:false,
        shift:0
    };
    //缓存 命名空间
    /**
     *   @ Popup:            主要样式
     *   @ PopupShade :      遮罩
     *   @ PopupZ：          z-index 的类
     *   @ PopupCloseBtn :   false
     *   @ PopupTit:         头部块
     *   @ PopupContent：    内容部分【存在于 alertHTML confirmHTML】
     *   @ PopupAlert   ：　alert class
     *   @ PopupConfirm :   Confirm class
     *   @ |_ PopupBtn_01:  按钮 确定
     *   @ |_ PopupBtn_02:  按钮 取消
     *   @
    */
    Popup.NAMECACHE={
        Popup:"Popup",
        popupShade:"popup-shade",
        PopupZ:"PopupZ_",
        PopupCloseBtn:"Popup-closeBtn",
        PopupTit:"Popup_tit",
        PopupAlert:"Popup_Alert",
        PopupConfirm:"Popup_Confirm",
        PopupBtn_01:"Popup_btn_01",
        PopupBtn_02:"Popup_btn_02",

        PopupDestroy:"Popup_destroy",
        PopupNone:"Popup_none"

    };



    Popup.prototype.alertHTML=function(_op){
        var _conten = _op.content || '',_nameCache=Popup.NAMECACHE,
            alertHtml = '<div class="'+_nameCache["PopupAlert"]+" "+_nameCache["Popup"]+'">'+
                '<div class="'+_nameCache["PopupContent"]+'">'+_conten+'</div>' + this.PopupBtnHTML(_op)+

                '</div>' ;

        return alertHtml
    };

    Popup.prototype.confirmHTML=function(_op){
        var _conten = _op.content || '',_nameCache=Popup.NAMECACHE,confirmHtml;

        confirmHtml = '<div class="'+_nameCache["PopupConfirm"]+" "+_nameCache["Popup"]+'">' +
            '<div class="'+_nameCache["PopupContent"]+'">'+_conten+'</div>' + this.PopupBtnHTML(_op)+

            '</div>';

        return confirmHtml
    };

    Popup.prototype.PopupBtnHTML=function(_op){
        var _nameCache=Popup.NAMECACHE,
            BtnHTML="";
        if(_op.tierType == 1){
            if(_op.AlertBtn && $.isArray(_op.AlertBtn)){
                BtnHTML  ='<div class="'+_nameCache["PopupBtn_01"]+'"><button>'+_op["AlertBtn"][0]+'</button></div>' ;
            }

        }

        if(_op.tierType == 2){
            BtnHTML  = '<div class="'+_nameCache["PopupBtn_01"]+'"><button>'+_op["ConfirmBtn"][0]+'</button></div>' +
                    '<div class="'+_nameCache["PopupBtn_02"]+'"><button>'+_op["ConfirmBtn"][1]+'</button></div>';
        }

        return BtnHTML;
    };

    //title
    Popup.prototype.titleHTML=function(){
        var _op=this.option, _nameCache=Popup.NAMECACHE,confirmHtml;
         if(_op.title){
             return '<div class="'+_nameCache["PopupTit"]+'">'+_op.title+'</div>'

         }
    }
    //shade
    Popup.prototype.shadeInit=function(){
        var _this= this, $elem=this.element,_op=this.option,_nameCache=Popup.NAMECACHE;
        var $shade = $('<div class="'+_nameCache["popupShade"]+'"></div>');

        if(_op.shade){
            //console.log(_op.shade)
            $shade.css({
                "z-index":_op.ZIndex-1,
                "opacity":_op.shade,
                "filter":'alpha(opacity='+_op.shade*100+')'
            });

            //判断 元素 用什么定位
            if(_this.isPosition($elem)){
                $shade.css({"position":"absolute"})
            }

            $elem.append($shade);
            //绑定关闭 事件
            $elem.find($shade).on("click",function(e){
                e.preventDefault();
                _this.closeFnc($("."+_op.tierMark));
                e.stopPropagation();
            })

        }



    };
    Popup.prototype.appendElementFnc=function($html){
        var $elem=this.element,_op=this.option;

        if(typeof  $html == "object"){

            if(this.isDestroy){
                $elem.append($html)

            }else{
                if($elem.find($html).length == 0){
                    $elem.append($html)
                }
            }

        }else{
            $.error("_op.content is not “object” in  customInit")
        }
        // 在返回 当前对象之前 更新当前 层数
        return $elem.find($html).css({zIndex:_op.ZIndex})

    };
    //vessel
    Popup.prototype.vessel=function(callback){
        var _this=this,$elem=this.element,_op=this.option,_nameCache=Popup.NAMECACHE;

        if(_op.tierType == 1){
            _op.content=this.alertHTML(_op)
        }

        if(_op.tierType == 2){
            _op.content=this.confirmHTML(_op)
        }

        //包装 对象
        _op.content= this.packObjFnc(_op.content);

        //判断 title 的存在
        if(_op.title ) {_op.content.prepend(_this.titleHTML())}


        //添加class =>  PopupZ_*******
        _op.content.addClass(_op.tierMark);

        //添加 皮肤
        _op.content=this.addSkin(_op.content , _op.skin);

        //根据元素插入的域 判断 用什么定位 默认为 fixed
        if(this.isPosition($elem)){
            _op.content.css({"position":"absolute"})
        }

        //判断是否 添加 关闭按钮 Popup-CloseBtn
        this.PopupCloseBtnFnc();

        callback(_op.content)

    };

    //创建层 并且插入 域------------------------------------------------------------------------------
    Popup.prototype.createTier=function(){
        var _this=this, $elem=this.element,_op=this.option;
            if(_op.content){
                this.vessel(function($html){
                    //打开前，先把先销毁 或者 隐藏 之前 的层
                    _this.closeFnc();
                    //判断并 加入遮罩
                    _this.shadeInit();
                    //这里已经 返回的是 $elem.find("层")
                    _op.content=_this.appendElementFnc($html);

                    _this.callbackFnc()
                    // 读取宽高 获得定位
                    _this.areaFnc().offsetFnc();

                    //显示动画
                    _this.animatFnc();

                });
            }else{
                $.error("_op.content is undefined")
            }



    };

    //PopupCloseBtn
    Popup.prototype.PopupCloseBtnFnc=function(){
        var _this=this, $elem=this.element,_op=this.option,
            closeBtnHtml;

        if(_op.closeBtn){
            closeBtnHtml = $('<div class="'+Popup.NAMECACHE["PopupCloseBtn"]+'"></div>');
            _op.content.append(closeBtnHtml);

            _op.content.find("."+Popup.NAMECACHE["PopupCloseBtn"]).on("click",function(){
                _this.closeFnc($("."+_op.tierMark))
            })
        }
    };
    //area
    Popup.prototype.areaFnc=function(){
        var _op=this.option;

        if(_op.area && $.isArray(_op.area)){
            _op.content.css({
                "width":_op.area[0],
                "height":_op.area[1]
            })
        }

        return this
    };
    //offset
    Popup.prototype.offsetFnc=function(){
        var $elem=this.element,_op=this.option,_w,_h;

        if(_op.offset[0] != "auto" || _op.offset[1] != "auto" || _op.offset[2] != "auto" || _op.offset[3] != "auto"){

            if(_op.offset[0]){_op.content.css({left:_op.offset[0]});}
            if(_op.offset[1]){_op.content.css({top:_op.offset[1]});}
            if(_op.offset[2]){_op.content.css({right:_op.offset[2]});}
            if(_op.offset[3]){_op.content.css({bottom:_op.offset[3]});}

        }else{

            _w=_op.content.outerWidth()/2;
            _h=_op.content.outerHeight()/2;

            _op.content.css({
                left: "50%",
                 top: "50%",
                marginLeft:-_w,
                marginTop:-_h
            })

        }
    };

    Popup.prototype.animatFnc=function(){
        var _this=this,$elem=this.element,_op=this.option,bol=true;
        if($.isArray(_op.shift)){
            _op.content.addClass(_op.shift[0]);
            //css3 扩展
            _op.content.one("webkitTransitionEnd transitionend",function(){
                bol=false;
                _this.setTimeoutFnc();
            });

            if(bol){
                _this.setTimeoutFnc();
            }


        }else{
            if(_op.shift == 0){
                _op.content.css({zIndex:_op.ZIndex}).fadeIn("fast",function(){

                    if( _op.callSuccess){
                        _op.callSuccess(_op.content ,_this)
                    }
                    _this.setTimeoutFnc();
                });
            }
        }

    };

    Popup.prototype.callbackFnc=function(){
       var _this=this, _op=this.option,_nameCache=Popup.NAMECACHE;

        if(_op.content.find("."+_nameCache["PopupBtn_01"]).length != 0){
            _op.content.find("."+_nameCache["PopupBtn_01"]).on("click",function(){
                _this.closeFnc(_op.content);
                if(_op.callConfirm){_op.callConfirm()}
            })
        }
        if(_op.content.find("."+_nameCache["PopupBtn_02"]).length != 0){
            _op.content.find("."+_nameCache["PopupBtn_02"]).on("click",function(){
                _this.closeFnc(_op.content);
                if(_op.callCancel) _op.callCancel()

            })
        }


    };

    //自动延时 关闭
    Popup.prototype.setTimeoutFnc=function(){
        var _this=this,_op=this.option;

        if(_op.times){
            _op.timer=setTimeout(function(){
                //如果自动 关闭时间开启
                //元素 依然存在 并且 是显示的 ，再自动关闭
                if(_op.content.length != 0 && _op.content.is(":visible")){
                    _this.closeFnc($("."+_op.tierMark))
                }

            },_op.times)
        }

    };
    //隐藏 or 销毁 所有
    Popup.prototype.closeFnc=function($dom){
        var _op=this.option,_nameCache=Popup.NAMECACHE;
        //console.log(_op)
        //删除遮罩
        $("."+_nameCache["popupShade"]).remove();

        if($dom){

            $dom.fadeOut("fast",function(){

                if($dom.hasClass(_nameCache["PopupDestroy"])){$dom.remove();}


                if(_op.callEnd && $.isFunction(_op.callEnd)){
                    _op.callEnd()
                }
            });


        }else{
            $("."+_nameCache["PopupDestroy"]).remove();
            $("."+_nameCache["PopupNone"]).hide();
        }




    };


    //添加 skin 域
    Popup.prototype.addSkin=function($content ,_skin){

        return  $content.addClass(_skin);
    };

    //不管是什么 类型 包装成 对象 obj isDestroy 记录当前类型
    Popup.prototype.packObjFnc=function(_d){
            var _this=this,_op=this.option,_nameCache=Popup.NAMECACHE,
                $dom;
        _d= $.trim(_d);

        //判断当前是否销毁
        switch(typeof _d  === "string")
        {
            case _d.charAt(0) == ".":
                _this.isDestroy = false;
                $dom= $(_d).addClass(_nameCache["PopupNone"]);
                //console.log("class")
                break;
            case _d.charAt(0) == "#":
                _this.isDestroy = false;
                $dom= $(_d).addClass(_nameCache["PopupNone"]);
                //console.log("id")
                break;
            case _d.charAt(0) == "<":
                _this.isDestroy = true;
                $dom= $(_d).addClass(_nameCache["PopupDestroy"]);
                //console.log("html")
                break;
            default :
                $.error("请 明确 content 格式")
        }

        return $dom;
    };

    //判断 this.element 是不是 除了 html , body 的元素
    Popup.prototype.isPosition=function($elem){

       var _tagName = $elem.get(0).tagName.toLowerCase();
        //console.log(_tagName)
        if(_tagName == "body"){
            return false
        }

        return true
    };

    // POPUP PLUGIN DEFINITION
    // =====================

    function Plugin(option) {

        return this.each(function () {
            var $this = $(this);
             $this.data('rn.popup', new Popup(this , option))


        })
    }

    $.fn.popup             = Plugin;
    $.fn.popup.Constructor = Popup;
    //记录层 初始层 19900112
    $.fn.popup.tier = 19900112;


}));

