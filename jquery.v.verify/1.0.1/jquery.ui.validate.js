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
    var Validate = function(options){
        this.option =options;
    };

    Validate.prototype = {
        constructor:Validate,
        init:function(){
            var _this=this,_valObj=this.option.valObj;
            $.each(_valObj,function(i , va){
                //$(va.ValidateClass).data("validate",va)
                _this.eventVal(va)
            });
        },
        eventVal:function(b){
                $(b.ValidateClass).data("isFcous",true).focus(function(){
                    $(this).data("isFcous",true);
                        console.log()
                 typeof  b.onFocusCall == "function" &&   b.onFocusCall($(this))

                }).blur(function(){

                    var _this=this,
                        _mod = b.onBlurMod,
                        $this=$(this),
                        _str=$(this).val(),
                        _intBol= typeof b.isNull == "boolean" ? b.isNull= !0: b.isNull(_str);

                    if(!(_intBol && $this.data("isFcous"))) {
                        _mod && $.each(_mod, function (i, va) {

                            $this.data("isFcous", va.regFnc(_str));
                            if (!$this.data("isFcous")) {
                                va.magsCall && va.magsCall($this);
                                return $this.data("isFcous");
                            }

                        });
                    }

                    if($this.data("isFcous") && !_intBol) b.succeed && b.succeed($this);
                    if($this.data("isFcous") && _intBol)  b.succeed && b.initCall($this);
                })


        },
        submitCtrl:function(){
            var _this=this,
                _valObj=this.option.valObj,
                _subClass=this.option.subClass;

            $(_subClass).on("click",function(){
                    var submitIint=!0

                $.each(_valObj,function(i , va){

                   var $ValidateClass=$(va.ValidateClass),
                       str=$ValidateClass.val(),
                       _intBol= typeof va.isNull == "boolean" ? va.isNull = !0: va.isNull(str);
                    if(va.isNull){
                        va.isNullCall($ValidateClass);
                    }else{
                        $.each(va, function (key, vaj) {



                            /*$this.data("isFcous", va.regFnc(_str));
                             if (!$this.data("isFcous")) {
                             va.magsCall && va.magsCall($this);
                             return $this.data("isFcous");
                             }*/

                        });
                    }

                });


            })
        }


    };

    return Validate
}));
