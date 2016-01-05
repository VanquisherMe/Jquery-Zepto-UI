/**
 * developer:Chen.
 * time:2015/12/9 0009
 */


requirejs.config({
    "baseUrl": "/Jquery-Zepto-UI",
    "paths": {
        "jquery": "public/jquery",
        "jquery.easing":"public/jquery.easing",
        "jquery.ui.switchable":"jquery.v.slider/1.0.1/jquery.ui.switchable"

        //"layer":"public/layer/layer"

    },
    //priority: ['jquery'],
    shim:{
        "public/layer/layer":{
            deps: ['jquery'],
            exports:"layer"
        },
        "public/jquery.easing":{
            deps: ['jquery'],
            exports:"easing"
        }

    },

    urlArgs: "v=" +  (new Date()).getTime()
});

