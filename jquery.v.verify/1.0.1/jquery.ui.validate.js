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
    var Validate = function(){};

    Validate.prototype = {
        constructor:Validate,
        init:function(obj){
            var _this=this
            $.each(obj,function(i , va){

                //$(va.ValidateClass).data("validate",va)
                _this.eventVal(va)
            });

        },
        eventVal:function(b){
            console.log(b)

            var _op=this.options

                $(b.ValidateClass).data("isFcous",true).focus(function(){
                    $(this).data("isFcous",true);
                        console.log()
                 typeof  b.onFocusCall == "function" &&   b.onFocusCall($(this))

                }).blur(function(){
                    console.log($(this))
                    var _this=this,
                        _mod = b.onBlurMod,
                        $this=$(this),
                        _str=$(this).val(),
                        _intBol= typeof b.isNull == "boolean" ? b.isNull: b.isNull(_str);

                    if(!(_intBol && $this.data("isFcous"))) {

                        _mod && $.each(_mod, function (i, va) {

                            $this.data("isFcous", va.regFnc(_str));

                            if (!$this.data("isFcous")) {

                                va.magsCall && va.magsCall($this);
                                return $this.data("isFcous");
                            }

                        });
                    }
                    console.log($this.data("isFcous"))
                    console.log(_intBol)
                    if($this.data("isFcous") && !_intBol) b.succeed && b.succeed($this)
                    if($this.data("isFcous") && _intBol)  b.succeed && b.initCall($this)
                })


        }


    };

    return Validate
}));
