/**
 * Created by Chen on 16/3/8.
 *
 *
 *
 */

;!function(window , undefined){
    "use strict";

    var $,win,ready = {
        type: ['dialog', 'page', 'iframe', 'loading', 'tips']
    };

 var   tpl= {
            mask: '<div class="ui-mask"></div>',
            close: '<a class="ui-dialog-close"><span class="ui-icon ui-icon-delete"></span></a>',
            title: '<div class="ui-dialog-title"><span></span></div>',
            wrap: '<div class="ui-dialog"></div>',
            conten: '<div class="ui-dialog-content"></div>',
            button: '<div class="ui-dialog-btn"><a class="ui-dialog-btn-submit"></a><a class="ui-dialog-btn-cancel"></a></div>'
    };



    var Classdialog = function(setings){

    };

    Classdialog.pt = Classdialog.prototype;

    Classdialog.pt.config = {
        type: 0, //
        shade: 0.3,
        fix: true,
        move: doms[1],
        title: '&#x4FE1;&#x606F;',
        offset: 'auto',
        area: 'auto',
        closeBtn: 1,
        time: 0, //0表示不自动关闭
        zIndex: 19900112,
        maxWidth: 360,
        shift: 0,
        icon: -1,
        scrollbar: true, //是否允许浏览器滚动条
        tips: 2
    };

    //容器
    Classdialog.pt.vessel=function(){
        var that = this, times = that.index, config = that.config;
    };
    /** 内置成员 */
    window.layer = layer;


    //主入口
    ready.run = function(){
        $ = jQuery;
        win = $(window);
        tpl.html = $('html');
        layer.open = function(deliver){
            var o = new Classdialog(deliver);
            return o.index;
        };
    };
    'function' === typeof define ? define(function(){
        ready.run();
        return dialog;
    }) : function(){
        dialog.run();
    }();
}(window);
