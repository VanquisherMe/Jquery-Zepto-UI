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

        console.log(validateRegExp);

        var Validate=function(elements , options){
            var _this = this, _op,
                _initState = !0;
            _this.el = $(elements);
            _op = _this.options = $.extend({}, Validate.DEFAULTS, options || {});



        };

        Validate.VERSION = '1.0.0';
        Validate.DEFAULTS={
            errorClass:"error", //tips class
            mags:"您是否忘记了什么",
            reg:!1

        };
        Validate.prototype.init =function(){
            var _this = this, _op =_this.options;



        };

        function Plugin(option) {
            return new Validate(this, option)
        }

        $.fn.validate = Plugin;
        $.fn.validate.Constructor = Validate;

}));
