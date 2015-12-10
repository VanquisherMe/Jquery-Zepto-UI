/**
 * developer:Chen.
 * time:2015/12/9 0009
 */

requirejs(['jquery','jquery.v.slider',"public/layer/layer"],function($,slider,layer){
   //console.log($)
   console.log(slider)
    slider.slide();
   console.log(layer)
    layer.msg('玩命提示中');
});