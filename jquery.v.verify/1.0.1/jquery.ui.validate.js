/**
 * Created by Chen on 16/2/29.
 */

!(function (factory) {
    if (typeof define === "function" && define.amd) {
        // AMD模式
        define("jquery.ui.validate",["jquery","jquery.ui.validateRegExp"], factory);
    } else {
        // 全局模式
        factory();
    }
}(function ($,validateRegExp ,undefined) {
/*
        console.log(validateRegExp);
        var Validate=function(elements , options){
            var _this = this, _op,
                _initState = !0;
            _this.el = $(elements);
            _op = _this.options = $.extend({}, Validate.DEFAULTS, options || {});

            $.each(obj,function(i , va){

                $(va.ValidatClass).data("validate",va)
            });

        };

        Validate.VERSION = '1.0.0';
        Validate.DEFAULTS={



        };
        Validate.prototype.eventfocus =function(){
            var _this = this, _op =_this.options;

        };

        function Plugin(option) {

            return new Validate(this, option)

        }

        $.fn.validate = Plugin;
        $.fn.validate.Constructor = Validate;*/

    var Validate = {
        init:function(obj){
            var _this=this
            $.each(obj,function(i , va){

                //$(va.ValidateClass).data("validate",va)
                _this.eventVal(va)
            });

        },
        eventVal:function(b){

            var _op=this.options

                $(b.ValidateClass).data("isFcous",true).focus(function(){
                    $(this).data("isFcous",true);
                    b.onFocusCall($(this))
                }).blur(function(){
                    var _this=this,
                        _mod = b.onBlurMod,
                        _intBol=true,
                        $this=$(this),
                        _str=$(this).val();

                    console.log(b.isNull(_str) && $this.data("isFcous"))
                    if(!(b.isNull(_str) && $this.data("isFcous"))) {

                        $.each(_mod, function (i, va) {
                            console.log(va)

                            $this.data("isFcous", va.regFnc(_str));

                            if (!$this.data("isFcous")) {

                                va.magsCall($this);
                                return $this.data("isFcous");
                            }

                        });
                    }
                    console.log($this.data("isFcous"))
                    if($this.data("isFcous")) b.succeed($this)
                })


        }


    };

    return Validate
}));
