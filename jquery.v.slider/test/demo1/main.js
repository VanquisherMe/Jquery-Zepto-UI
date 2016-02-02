/**
 * developer:Chen.
 * time:2015/12/9 0009
 */

requirejs(['jquery','jquery.ui.switchable'],function($,switchable){

    $(".focus-demo-01").switchable({
        type:"focus",
/*        isAutoPlay:!0,*/
        contentClass:"focus-main",
        mainClass:"focus-panel",
        bodyExtra:"focus-extra",
        navClass:"focus-nav",
        navItem:"focus-item",
        prevClass:"focus-prev",
        nextClass:"focus-next",
        navSelectedClass:"focus-active",
        contentPage:"focus-page"

    })

    $(".slider-demo-02").switchable({
        type:"slider",
        seamlessLoop:!0,
        counter:!1, // 索引 计数器 [ false]
        contentClass:"slider-main",
        mainClass:"slider-panel",
        bodyExtra:"slider-extra",
        navClass:"slider-nav",
        navItem:"slider-item",
        prevClass:"slider-prev",
        nextClass:"slider-next",
        navSelectedClass:"slider-active",
        contentPage:"slider-page"

    })


});