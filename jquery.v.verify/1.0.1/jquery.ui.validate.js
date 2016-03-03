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

                            if(!va.isCustom){
                                $this.data("isFcous", typeof va.regFnc =="function" ? va.regFnc(_str) :va.regFnc);
                                if (!$this.data("isFcous")) {
                                    va.magsCall && va.magsCall($this);
                                    return $this.data("isFcous");
                                }
                            }else{
                                va.magsCall && va.magsCall($this);
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

            $(_subClass).data("isCommit",false).on("click",function(){
                    var submitIint=!0,$this=$(this)

                $.each(_valObj,function(i , va){

                   var $ValidateClass=$(va.ValidateClass),
                       regFncBol=!1,
                       str=$ValidateClass.val(),
                       _intBol = typeof va.isNull == "function" ? va.isNull(str) : va.isNull = !0,
                       _onBlurMod = typeof  va.onBlurMod == "boolean" ? va.onBlurMod = !1 :va.onBlurMod;
                        console.log(_intBol)
                    if(_intBol){
                        va.isNullCall($ValidateClass);
                    }else{
                        _onBlurMod  && $.each(_onBlurMod, function (key, vaj) {
                            if(!vaj.isCustom){

                                regFncBol = typeof vaj.regFnc =="function" ? vaj.regFnc(str) :vaj.regFnc;
                                !regFncBol && typeof vaj.magsCall == "function" && vaj.magsCall($ValidateClass) ;
                                    return regFncBol;
                            }else{
                                vaj.magsCall && vaj.magsCall($ValidateClass);
                            }

                        });

                    }

                });



            })
        }


    };

    return Validate
}));
