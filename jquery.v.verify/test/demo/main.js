/**
 * Created by Chen on 16/2/29.
 */

requirejs(['jquery',"jquery.ui.validateRegExp",'jquery.ui.validate'],function($,validateRegExp,validate){
    console.log(validateRegExp)
    //当前页 验证函数
    var validateRules={
        isNull: function(str) {
            var reg_isNull = new RegExp(validateRegExp.isNull).test(str)
            return (!reg_isNull || typeof str != "string");
        },
        isUid:function(str){
            return new RegExp(validateRegExp.username+"{6,20}").test(str);
        },
        isPwd:function(str){
            return new RegExp(validateRegExp.password+"{8,20}").test(str);
        }


    };

    var validatePrompt = {
        regName: {
            onFocus:"4-20位字符,支持汉字、字母、数字及\"-\"、\"_\"组合",
            succeed: "",
            isNull: "请输入用户名",
            error: {
                beUsed: "该用户名已被使用，请重新输入。如果您是该用户，请立刻<a href='......' class='flk13'>登录</a>",
                badLength: "用户名长度只能在4-20位字符之间",
                badFormat: "用户名只能由中文、英文、数字及\"-\"、\"_\"组成",
                fullNumberName: "用户名不能是纯数字，请重新输入"
            },
            onFocusExpand: function() {
                $("#morePinDiv").removeClass().addClass("intelligent-error hide");
            }
        },
        pwd: {
            onFocus: "<span>6-20位字符，建议由字母，数字和符号两种以上组合</span>",
            succeed: "",
            isNull: "请输入密码",
            error: {
                badLength: "密码长度只能在6-20位字符之间",
                badFormat: "密码只能由英文、数字及标点符号组成",
                simplePwd: "<span>该密码比较简单，有被盗风险，建议您更改为复杂密码，如字母+数字的组合</span>",
                weakPwd: "<span>该密码比较简单，有被盗风险，建议您更改为复杂密码</span>"
            },
            onFocusExpand: function() {
                $("#pwdstrength").hide();
            }
        },
        pwdRepeat: {
            onFocus: "请再次输入密码",
            succeed: "",
            isNull: "请确认密码",
            error: {
                badLength: "密码长度只能在6-20位字符之间",
                badFormat2: "两次输入密码不一致",
                badFormat1: "密码只能由英文、数字及标点符号组成"
            }
        },
        phone: {
            onFocus: "请输入手机号码",
            succeed: "",
            isNull: "请输入手机号码",
            error: ""
        },
        protocol: {
            onFocus: "",
            succeed: "",
            isNull: "请先阅读并同意《京东用户注册协议》",
            error: ""
        },
        empty: {
            onFocus: "",
            succeed: "",
            isNull: "",
            error: ""
        }
    };

    var register={
        regName:{
            ValidateClass:"#username",
            isNull:function(str){
                var reg_isNull = new RegExp(validateRegExp.notempty).test(str)
                return (!reg_isNull || typeof str != "string");
            },
            isNullCall:function(t){
                t.parent().find(".error").show().addClass("errorTips").html("请输入用户名请输入用户名");
            },
            onFocusCall:function(t){
                console.log(t)
                t.parent().find(".error").removeClass("errorTips").html("4-20位字符,支持汉字、字母、数字及\"-\"、\"_\"组合")
            },
            onBlurMod:{
                        //ajax 检测 用户名是否相同
                        /*beUsed: function(t,s) {
                            if(new RegExp(validateRegExp.username+"{6,20}").test(s)){
                                t.parent().find(".error").html("该用户名已被使用，请重新输入。如果您是该用户，请立刻<a href='......' class='flk13'>登录</a>");
                                return false;
                            }
                        },*/
                        badLength:{
                            regFnc:function(str){
                                var strlen=str.replace(/[^\x00-\xff]/g, "**")
                                return strlen.length >= 4 && strlen.length <= 20
                            },
                            magsCall: function(t){
                                //alert("用户名长度只能在4-20位字符之间")

                                t.parent().find(".error").show().addClass("errorTips").html("用户名长度只能在4-20位字符之间");
                            }
                        },
                        badFormat:{
                            regFnc:function(str){
                                return new RegExp(validateRegExp.username).test(str);
                            },
                            magsCall: function(t){
                                //alert("用户名只能由中文、英文、数字及\"-\"、\"_\"组成")

                                t.parent().find(".error").show().addClass("errorTips").html("用户名只能由中文、英文、数字及\"-\"、\"_\"组成");
                            }
                        },
                        fullNumberName:{
                            regFnc:function(str){
                                return !new RegExp(validateRegExp.fullNumber).test(str);
                            },
                            magsCall: function(t){
                                //alert("用户名不能是纯数字，请重新输入")
                                t.parent().find(".error").show().addClass("errorTips").html("用户名不能是纯数字，请重新输入");
                            }
                        }

            },
            succeed:function(t){
                t.parent().find(".error").hide().removeClass("errorTips").empty()
            }


        }
    };

    validate.init(register)

});