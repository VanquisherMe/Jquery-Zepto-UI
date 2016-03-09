/**
 * Created by Chen on 16/3/8.
 *
 *
 *
 */

;!function(window , undefined){
    "use strict";

    var $,win,ready = {
        type: ['dialog', 'page', 'iframe', 'loading', 'tips'],
        btn: ['&#x786E;&#x5B9A;','&#x53D6;&#x6D88;'],
        tpl:{
            mask: '<div class="ui-mask"></div>',
            close: '<a class="ui-dialog-close"><span class="ui-icon ui-icon-delete"></span></a>',
            title: '<div class="ui-dialog-title"><span></span></div>',
            wrap: '<div class="ui-dialog"></div>',
            conten: '<div class="ui-dialog-content"></div>',
            button: '<div class="ui-dialog-btn"><a class="ui-dialog-btn-submit"></a><a class="ui-dialog-btn-cancel"></a></div>'
        }
    };
    //默认内置方法。
var layer = {
    v: '2.1',
    ie6: !!window.ActiveXObject && !window.XMLHttpRequest,
    index: 0,

    config: function(options, fn){
        var item = 0;
        options = options || {};
        layer.cache = ready.config = $.extend(ready.config, options);
        layer.path = ready.config.path || layer.path;
        typeof options.extend === 'string' && (options.extend = [options.extend]);
        layer.use('skin/layer.css', (options.extend && options.extend.length > 0) ? (function loop(){
            var ext = options.extend;
            layer.use(ext[ext[item] ? item : item-1], item < ext.length ? function(){
                ++item;
                return loop;
            }() : fn);
        }()) : fn);
        return this;
    },

    //载入配件
    use: function(module, fn, readyMethod){
        var i = 0, head = $('head')[0];
        var module = module.replace(/\s/g, '');
        var iscss = /\.css$/.test(module);
        var node = document.createElement(iscss ? 'link' : 'script');
        var id = 'layui_layer_' + module.replace(/\.|\//g, '');
        if(!layer.path) return;
        if(iscss){
            node.rel = 'stylesheet';
        }
        node[iscss ? 'href' : 'src'] = /^http:\/\//.test(module) ? module : layer.path + module;
        node.id = id;
        if(!$('#'+ id)[0]){
            head.appendChild(node);
        }
        //轮询加载就绪
        ;(function poll() {
            ;(iscss ? parseInt($('#'+id).css('width')) === 1989 : layer[readyMethod||id]) ? function(){
                fn && fn();
                try { iscss || head.removeChild(node); } catch(e){};
            }() : setTimeout(poll, 100);
        }());
        return this;
    },

    ready: function(path, fn){
        var type = typeof path === 'function';
        if(type) fn = path;
        layer.config($.extend(ready.config, function(){
            return type ? {} : {path: path};
        }()), fn);
        return this;
    },

    //各种快捷引用
    alert: function(content, options, yes){
        var type = typeof options === 'function';
        if(type) yes = options;
        return layer.open($.extend({
            content: content,
            yes: yes
        }, type ? {} : options));
    },

    confirm: function(content, options, yes, cancel){
        var type = typeof options === 'function';
        if(type){
            cancel = yes;
            yes = options;
        }
        return layer.open($.extend({
            content: content,
            btn: ready.btn,
            yes: yes,
            cancel: cancel
        }, type ? {} : options));
    },

    msg: function(content, options, end){ //最常用提示层
        var type = typeof options === 'function', rskin = ready.config.skin;
        var skin = (rskin ? rskin + ' ' + rskin + '-msg' : '')||'layui-layer-msg';
        var shift = doms.anim.length - 1;
        if(type) end = options;
        return layer.open($.extend({
            content: content,
            time: 3000,
            shade: false,
            skin: skin,
            title: false,
            closeBtn: false,
            btn: false,
            end: end
        }, (type && !ready.config.skin) ? {
            skin: skin + ' layui-layer-hui',
            shift: shift
        } : function(){
            options = options || {};
            if(options.icon === -1 || options.icon === undefined && !ready.config.skin){
                options.skin = skin + ' ' + (options.skin||'layui-layer-hui');
            }
            return options;
        }()));
    },

    load: function(icon, options){
        return layer.open($.extend({
            type: 3,
            icon: icon || 0,
            shade: 0.01
        }, options));
    },

    tips: function(content, follow, options){
        return layer.open($.extend({
            type: 4,
            content: [content, follow],
            closeBtn: false,
            time: 3000,
            maxWidth: 210
        }, options));
    }
};


    var Classlayer = function(setings){
        var _this = this;
        //每次 new calsslayer 的时候 ++index,保持每一个 的弹出层的唯一性
        //这也是 close 时候的依据
        _this.index = ++layer.index;
        _this.config = $.extend({}, _this.config, ready.config, setings);
        _this.creat();
    };

    Classlayer.pt = Classlayer.prototype;

    Classlayer.pt.config = {

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
    Classlayer.pt.vessel=function(conType, callback){
        var _this = this, times = that.index, config = that.config;
        var zIndex = config.zIndex + times, titype = typeof config.title === 'object';

    };
    //创建骨架
    Classlayer.pt.creat =function(){

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
