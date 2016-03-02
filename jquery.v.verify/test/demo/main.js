/**
 * Created by Chen on 16/2/29.
 */

requirejs(['jquery',"jquery.ui.validateRegExp",'jquery.ui.validate'],function($,validateRegExp,Validate){


    var weakPwdArray = ["123456", "123456789", "111111", "5201314", "12345678", "123123", "password", "1314520", "123321", "7758521", "1234567", "5211314", "666666", "520520", "woaini", "520131", "11111111", "888888", "hotmail.com", "112233", "123654", "654321", "1234567890", "a123456", "88888888", "163.com", "000000", "yahoo.com.cn", "sohu.com", "yahoo.cn", "111222tianya", "163.COM", "tom.com", "139.com", "wangyut2", "pp.com", "yahoo.com", "147258369", "123123123", "147258", "987654321", "100200", "zxcvbnm", "123456a", "521521", "7758258", "111222", "110110", "1314521", "11111111", "12345678", "a321654", "111111", "123123", "5201314", "00000000", "q123456", "123123123", "aaaaaa", "a123456789", "qq123456", "11112222", "woaini1314", "a123123", "a111111", "123321", "a5201314", "z123456", "liuchang", "a000000", "1314520", "asd123", "88888888", "1234567890", "7758521", "1234567", "woaini520", "147258369", "123456789a", "woaini123", "q1q1q1q1", "a12345678", "qwe123", "123456q", "121212", "asdasd", "999999", "1111111", "123698745", "137900", "159357", "iloveyou", "222222", "31415926", "123456", "111111", "123456789", "123123", "9958123", "woaini521", "5201314", "18n28n24a5", "abc123", "password", "123qwe", "123456789", "12345678", "11111111", "dearbook", "00000000", "123123123", "1234567890", "88888888", "111111111", "147258369", "987654321", "aaaaaaaa", "1111111111", "66666666", "a123456789", "11223344", "1qaz2wsx", "xiazhili", "789456123", "password", "87654321", "qqqqqqqq", "000000000", "qwertyuiop", "qq123456", "iloveyou", "31415926", "12344321", "0000000000", "asdfghjkl", "1q2w3e4r", "123456abc", "0123456789", "123654789", "12121212", "qazwsxedc", "abcd1234", "12341234", "110110110", "asdasdasd", "123456", "22222222", "123321123", "abc123456", "a12345678", "123456123", "a1234567", "1234qwer", "qwertyui", "123456789a", "qq.com", "369369", "163.com", "ohwe1zvq", "xiekai1121", "19860210", "1984130", "81251310", "502058", "162534", "690929", "601445", "1814325", "as1230", "zz123456", "280213676", "198773", "4861111", "328658", "19890608", "198428", "880126", "6516415", "111213", "195561", "780525", "6586123", "caonima99", "168816", "123654987", "qq776491", "hahabaobao", "198541", "540707", "leqing123", "5403693", "123456", "123456789", "111111", "5201314", "123123", "12345678", "1314520", "123321", "7758521", "1234567", "5211314", "520520", "woaini", "520131", "666666", "RAND#a#8", "hotmail.com", "112233", "123654", "888888", "654321", "1234567890", "a123456"];
    var register={
        regName:{
            ValidateClass:"#username",
            isNull:function(str){
                var reg_isNull = new RegExp(validateRegExp.empty).test(str);
                return (reg_isNull);
            },
            isNullCall:function(t){
                t.parent().parent().find(".error").show().addClass("errorTips").html("请输入用户名请输入用户名");
            },
            onFocusCall:function(t){
                t.parent().find(".icon").hasClass("sucess") && t.parent().find(".icon").removeClass("sucess");
                t.parent().parent().find(".error").show().removeClass("errorTips").html("4-20位字符,支持汉字、字母、数字及\"-\"、\"_\"组合")
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
                                t.parent().parent().find(".error").show().addClass("errorTips").html("用户名长度只能在4-20位字符之间");
                            }
                        },
                        badFormat:{
                            regFnc:function(str){
                                return new RegExp(validateRegExp.username).test(str);
                            },
                            magsCall: function(t){
                                //alert("用户名只能由中文、英文、数字及\"-\"、\"_\"组成")
                                t.parent().parent().find(".error").show().addClass("errorTips").html("用户名只能由中文、英文、数字及\"-\"、\"_\"组成");
                            }
                        },
                        fullNumberName:{
                            regFnc:function(str){
                                return !new RegExp(validateRegExp.fullNumber).test(str);
                            },
                            magsCall: function(t){
                                //alert("用户名不能是纯数字，请重新输入")
                                t.parent().parent().find(".error").show().addClass("errorTips").html("用户名不能是纯数字，请重新输入");
                            }
                        }
            },
            succeed:function(t){
                t.parent().find(".icon").addClass("sucess")
                t.parent().parent().find(".error").hide().removeClass("errorTips").empty()
            },
            initCall:function(t){
                t.parent().parent().find(".error").hide().removeClass("errorTips").empty()
            }
        },
        pwd:{
            ValidateClass:"#password",
            isNull:function(str){
                var reg_isNull = new RegExp(validateRegExp.empty).test(str);
                return (reg_isNull);
            },
            isNullCall:function(t){
                t.parent().parent().find(".error").show().addClass("errorTips").html("请输入密码");
            },
            onFocusCall:function(t){
                t.parent().find(".icon").hasClass("sucess") && t.parent().find(".icon").removeClass("sucess");
                t.parent().parent().find(".error").show().removeClass("errorTips").html("6-20位字符，建议由字母，数字和符号两种以上组合")
            },
            onBlurMod:{
                badLength:  {
                    regFnc:function(str){
                        console.log(str.length >= 6 && str.length <= 20)
                        return str.length >= 6 && str.length <= 20
                    },
                    magsCall: function(t){
                        //alert("用户名长度只能在4-20位字符之间")

                        t.parent().parent().find(".error").show().addClass("errorTips").html("密码长度只能在6-20位字符之间");
                    }
                },
                badFormat:{
                    regFnc:function(str){
                        return new RegExp(validateRegExp.password).test(str);
                    },
                    magsCall: function(t){
                        //alert("用户名只能由中文、英文、数字及\"-\"、\"_\"组成")
                        t.parent().parent().find(".error").show().addClass("errorTips").html("用户名只能由中文、英文、数字及\"-\"、\"_\"组成");
                    }
                },
                simplePwd:{
                    regFnc:function(str){
                        var _weakPwdArray =!0;
                        for (var i = 0; i < weakPwdArray.length; i++) {
                            if (weakPwdArray[i] == str) {
                                _weakPwdArray = !1;
                                break;
                            }
                        }
                        console.log(_weakPwdArray)
                        return _weakPwdArray;
                        //return !new RegExp(validateRegExp.fullNumber).test(str);
                    },
                    magsCall: function(t){
                        //alert("用户名不能是纯数字，请重新输入")
                        t.parent().parent().find(".error").show().addClass("errorTips").html("该密码比较简单，有被盗风险，建议您更改为复杂密码");
                    }
                }

            },
            succeed:function(t){
                t.parent().find(".icon").addClass("sucess")
                t.parent().parent().find(".error").hide().removeClass("errorTips").empty()
            },
            initCall:function(t){
                t.parent().parent().find(".error").hide().removeClass("errorTips").empty()
            }
        },
        pwdRepeat:{
            ValidateClass:"#OncePassword",
            isNull:function(str){
                var reg_isNull = new RegExp(validateRegExp.empty).test(str);
                return (reg_isNull);
            },
            isNullCall:function(t){
                t.parent().parent().find(".error").show().addClass("errorTips").html("请输入密码");
            },
            onFocusCall:function(t){
                t.parent().find(".icon").hasClass("sucess") && t.parent().find(".icon").removeClass("sucess");
                t.parent().parent().find(".error").show().removeClass("errorTips").html("请再次输入密码")
            },
            onBlurMod:{
                badLength:  {
                    regFnc:function(str){
                        console.log(str.length >= 6 && str.length <= 20)
                        return str.length >= 6 && str.length <= 20
                    },
                    magsCall: function(t){
                        //alert("用户名长度只能在4-20位字符之间")
                        t.parent().parent().find(".error").show().addClass("errorTips").html("密码长度只能在6-20位字符之间");
                    }
                },
                badFormat:{
                    regFnc:function(str){
                        return new RegExp(validateRegExp.password).test(str);
                    },
                    magsCall: function(t){
                        //alert("用户名只能由中文、英文、数字及\"-\"、\"_\"组成")
                        t.parent().parent().find(".error").show().addClass("errorTips").html("用户名只能由中文、英文、数字及\"-\"、\"_\"组成");
                    }
                },
                fitPwd:{
                    regFnc:function(str){
                        var _password =$("#password").val();

                        return _password.length === str.length && _password === str;
                        //return !new RegExp(validateRegExp.fullNumber).test(str);
                    },
                    magsCall: function(t){
                        //alert("用户名不能是纯数字，请重新输入")
                        t.parent().parent().find(".error").show().addClass("errorTips").html("两次输入密码不一致");
                    }
                }

            },
            succeed:function(t){
                t.parent().find(".icon").addClass("sucess")
                t.parent().parent().find(".error").hide().removeClass("errorTips").empty()
            },
            initCall:function(t){
                t.parent().parent().find(".error").hide().removeClass("errorTips").empty()
            }
        },
        phone: {
            ValidateClass:"#phone",
            isNull:function(str){
                var reg_isNull = new RegExp(validateRegExp.empty).test(str);
                return (reg_isNull);
            },
            isNullCall:function(t){
                t.parent().parent().find(".error").show().addClass("errorTips").html("请输入手机号码");
            },
            onFocusCall:function(t){
                t.parent().find(".icon").hasClass("sucess") && t.parent().find(".icon").removeClass("sucess");
                t.parent().parent().find(".error").show().removeClass("errorTips").html("完成验证后请用该手机号码，登录或者找回密码")
            },
            onBlurMod:{
                badFormat:{
                    regFnc:function(str){
                        return new RegExp(validateRegExp.mobile).test(str);
                    },
                    magsCall: function(t){
                        //alert("用户名只能由中文、英文、数字及\"-\"、\"_\"组成")
                        t.parent().parent().find(".error").show().addClass("errorTips").html("手机号码格式有误，请输入正确的手机号");
                    }
                }
            },
            succeed:function(t){
                t.parent().find(".icon").addClass("sucess")
                t.parent().parent().find(".error").hide().removeClass("errorTips").empty()
            },
            initCall:function(t){
                t.parent().parent().find(".error").hide().removeClass("errorTips").empty()
            }
        },
        validateCode:{
            ValidateClass:"#ValidateCode",
            isNull: !0,
            onFocusCall:!0,
            onBlurMod:!1,
            succeed:!1,
            initCall:!1
        },
        code:{
            ValidateClass:"#code",
            isNull:function(str){
                var reg_isNull = new RegExp(validateRegExp.empty).test(str);
                return (reg_isNull);
            },
            isNullCall:function(t){
                t.parent().parent().find(".error").show().addClass("errorTips").html("请输入短信验证码");
            },
            onFocusCall:function(t){

                t.parent().parent().find(".error").show().removeClass("errorTips").html("请输入短信验证码，完成验证")
            },
            onBlurMod:!1,
            succeed:function(t){

                t.parent().parent().find(".error").hide().removeClass("errorTips").empty()
            },
            initCall:function(t){
                t.parent().parent().find(".error").hide().removeClass("errorTips").empty()
            }
        }
    };

   var regr = new Validate
    console.log(regr)
    regr.init(register);

    console.log(regr)

});