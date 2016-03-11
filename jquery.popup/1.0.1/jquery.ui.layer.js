/**
 * Created by Chen on 16/3/8.
 *
 *
 *
 */

;!function(window , undefined){
    "use strict";

    var $,win,ready = {
        type: [
            'dialog',
            'page',
            'iframe',
            'loading',
            'tips'],
        btn: ['&#x786E;&#x5B9A;','&#x53D6;&#x6D88;'],
        tpl:{

            close: '<a class="ui-layer-close"><span class="ui-icon ui-icon-delete"></span></a>', //关闭按钮
            title: '<div class="ui-layer-title"><span><%=title%></span></div>',  //title
            conten: '<div class="ui-layer-content"></div>',  //内容块
            button: '<div class="ui-layer-btn"> <%if(submit){%><a class="ui-layer-btn-submit"><%=submit%></a><%}%> <%if(cancel){%><a class="ui-layer-btn-cancel"><%=cancel%></a><%}%></div>',
            wrap: '<div class="ui-layer"></div>', // 包裹的容器
            mask: '<div class="ui-layer-mask"></div>', //黑色遮罩层
            tips: '<div class="ui-layer-tips"></div>'
        }
    };
    //默认内置方法。
var layer = {
    v: '1.0.0',
    ie6: !!window.ActiveXObject && !window.XMLHttpRequest,  //判斷 ie6
    index: 0,
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


    var Classlayer = function(options){
        var _this = this;
        //每次 new calsslayer 的时候 ++index,保持每一个 的弹出层的唯一性
        //这也是 close 时候的依据
        _this.index = ++layer.index;
        _this.options = $.extend({}, _this.DEFAULTS, options);
        _this.creat();
    };

    Classlayer.pt = Classlayer.prototype;

    Classlayer.pt.DEFAULTS = {
        // 是否有
        main:!0,
        content:!0,
        title: !0,
        mask:!0,
        //设置 layer  tpl 的模板 类  ["calss","aaaaa"]
        extendMainClass:null,
        mainClassd:null,    //   'wrap' add class
        contentClass:null, //  'content' add class
        titleClass: null,  //  'title' add class
        maskClass:null,   //  'mask' add class
        //  button
        hasButton:!0,
        submitButton: "\u786e\u8ba4",
        cancelButton: "\u53d6\u6d88",

        closeButton:!0,

        target:"body",  //弹出层 的目标层

        type: 0, //
        shade: 0.3,
        fix: true,
        //move: doms[1],

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

    ////容器
    Classlayer.pt.creat =function(conType, callback){
        //var _this = this, times = that.index, config = that.config,

        this.vessel()

    };
    //创建骨架
    Classlayer.pt.vessel =function(){
        var _this =this,
            _op=_this.options,
            times = _this.index + _op.zIndex,
            _tpl=ready.tpl,titleHTML="";
            _this.isInit = !1;

        //设置 title
        _op.title && (titleHTML = template.compile(_tpl.title)({
            title: _op.title
        }));
        //按钮层
        var buttonHTML = template.compile(_tpl.button)({
            submit: $.trim(_op.submitButton),
            cancel: $.trim(_op.cancelButton)
        });



        var mainHTML =  titleHTML + _tpl.conten +(_op.hasButton ? buttonHTML : "");
        // 内容填充
        //_op.content &&  $(_tpl.content).children("span").html(_this.content);
        //填充 button
        _this.el = $(_tpl.wrap),
        _op.extendMainClass && _this.el.addClass(_op.extendMainClass),
            $(mainHTML).appendTo(_this.el),
            _this.content = _this.el.find(".ui-layer-content"),
            _this.title = _this.el.find(".ui-layer-title"),
        _op.mainClass && _this.el.attr(_op.mainId[0],_op.mainId[1]),
        _op.contentClass && _this.content.attr(_op.mainId[0],_op.mainId[1]),
        _op.titleClass && _this.title.attr(_op.mainId[0], _op.mainId[1]),
        _op.closeButton && _this.el.append(_op.close),
        _this.el.attr({"times":_this.index,"id":"ui-layer"+_this.index});

        _this.el.css({
            display:"none",
            zIndex:times,
            position: (layer.ie6 || (_op.target != "body")) ? "absolute" : "fixed"
        }).appendTo(_op.target)

    };

    /** 内置成员 */
    window.layer = layer;

    //关闭layer总方法
    layer.close = function(index){
        var layero = $('#ui-layer'+ index), type = layero.attr('type');
        if(!layero[0]) return;
        if(type === ready.type[1] && layero.attr('conType') === 'object'){
            layero.children(':not(.'+ doms[5] +')').remove();
            for(var i = 0; i < 2; i++){
                layero.find('.layui-layer-wrap').unwrap().hide();
            }
        } else {
            //低版本IE 回收 iframe
            if(type === ready.type[2]){
                try {
                    var iframe = $('#'+doms[4]+index)[0];
                    iframe.contentWindow.document.write('');
                    iframe.contentWindow.close();
                    layero.find('.'+doms[5])[0].removeChild(iframe);
                } catch(e){}
            }
            layero[0].innerHTML = '';
            layero.remove();
        }
        $('#layui-layer-moves, #layui-layer-shade' + index).remove();
        layer.ie6 && ready.reselect();
        ready.rescollbar(index);
        $(document).off('keydown', ready.enter);
        typeof ready.end[index] === 'function' && ready.end[index]();
        delete ready.end[index];
    };
    //关闭所有层
        layer.closeAll = function(type){
            $('.ui-layer').each(function(){
                var othis = $(this);
                var is = type ? (othis.attr('type') === type) : 1;
                is && layer.close(othis.attr('times'));
                is = null;
            });
        };

    //主入口
    ready.run = function(){
        $ = jQuery;
        win = $(window);
        layer.open = function(deliver){
            var o = new Classlayer(deliver);
            console.log(o.index);
            return o.index;
        };
    };
    'function' === typeof define ? define(function(){
        ready.run();
        return layer;
    }) : function(){
        ready.run();
    }();
}(window);
