/**
 * developer：Chen.
 *
 *  delayLoad；
 *
 * @@@@@@@@@@@@@@@@@@@@@@@@@
 *  src：                “data-src”
 *  container：          $(window)
 *  callback：           $.noop
 *  requestType:        "get" "post",
 *  datas:{}            【注意】 post请求下
 *  undUrl:         "../imglib/webImgLib/cp.jpg"   当没有 src 的情况 下 路劲
 *
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
    var DelayLoad=function(element , options,cache){

        //console.log(options)
        this.element = $(element);
        this.option=  $.extend({}, DelayLoad.DEFAULTS, options || {});


        //缓存数组 引入
        this.option.cache=cache;
        this.option.contop=0;

        this.LoadCacheFnc();
        this.LoadingImg();
        var _this=this;

        this.option.container.on("scroll", function(){
            _this.LoadingImg();
        });
    };

    DelayLoad.DEFAULTS={
        src: "data-src",
        container: $(window),
        callback: $.noop,
        requestType:"get",
        datas:{}
    };

    //加载 缓存 数组
    DelayLoad.prototype.LoadCacheFnc=function(){
        var _this=this, $elem=this.element,_op=this.option;
        $elem.each(function(){
            var node = $(this).get(0).tagName.toLowerCase(), srcImg = $(this).attr(_op["src"]);

            var data = {
                obj: $(this),
                tag: node,
                src: srcImg
            };
            _op.cache.push(data);
        })
    };

    DelayLoad.prototype.LoadingImg=function(){
        var _this=this,_op=this.option;

        var contHeight = _op.container.height();

        //获得卷入的 距离
        if ($(window).get(0) === window) {
            _op.contop = $(window).scrollTop();
        } else {
            _op.contop = _op.container.offset().top;
        }

        $.each(_op.cache, function(i, data) {
            var $self = data.obj, tag = data.tag, url = data.src,newimg=data.newImg, selft, selfb;

            if ($self) {
                selft = $self.offset().top;
                //selfb = selft + $self.height();
                //if ((selft >= 0 && selft < contHeight) || (selfb > 0 && selfb <= contHeight))
                if (selft+500 < _op.contop+contHeight)
                {
                    if (url) {
                        //在浏览器窗口内
                        if (tag === "img") {
                            //图片，改变src
                            _this.loadImgCallback($self,url);
                        } else {

                            if(_op.requestType == "get"){
                                $.get(url+"?"+ $.now()).success(function(data){
                                    //console.log(data)
                                    _this. loadBoxCallback(data);
                                });
                            }

                            if(_op.requestType == "post"){
                                $.post(url+"?"+ $.now(),_op.datas,"json").success(function(data){
                                    _this. loadBoxCallback(data);
                                });
                            }

                        }
                    } else {
                        // 可以判断类型
                        _this.undeCallback($self);
                    }
                    //将已经加载的 img 变成 null

                    data.obj = null;

                }
            }
        });

    };

    //进入屏幕加载
    DelayLoad.prototype.loadImgCallback = function($obj,_url) {
        var _this=this, _op=this.option;

        if ($.isFunction(_op.callback)) {
            //当有路径的情况 确new 不到 img 使用默认状态 图片

            _this.newImageFnc(_url, function(imgurl){
                    var call=  $obj.attr("src", imgurl);
                    _op.callback.call(call.get(0));
                },
                function(_hint){
                    _this.undeCallback($obj);
                    console.log("路径错误："+_hint)
                })


        }
    };

    //异步获取页面信息处理
    DelayLoad.prototype.loadBoxCallback = function(data) {
        var $this=this.element, _op=this.option;
        if ($.isFunction(_op.callback)) {
            _op.callback($this,data);
        }
    };
    //当找不到路径 或者没有 new 出IMG
    DelayLoad.prototype.undeCallback =function(call){
        var _op=this.option;
        call.attr("src" ,_op.undUrl )
    };

    //检测图片是否存在
    DelayLoad.prototype.newImageFnc=function(imgurl, callback,errorcallback){
        var img = new Image();

        img.onload = function () {
            callback && $.isFunction(callback) && callback(imgurl)
        };
        img.onerror=function(){
            errorcallback && $.isFunction(errorcallback) && errorcallback(imgurl)

        };
        img.src = imgurl;

    };



    // LOADIMG PLUGIN DEFINITION
    // =====================

    function Plugin(option) {
        //每次调用 的时候 生成 相对自己的 缓存数组
        var cache=[];
        return new DelayLoad(this , option,cache)

    }

    $.fn.delayLoad             = Plugin;
    $.fn.delayLoad.Constructor = DelayLoad;

}));

