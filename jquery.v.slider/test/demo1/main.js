/**
 * developer:Chen.
 * time:2015/12/9 0009
 */

requirejs(['jquery','jquery.ui.switchable'],function($,switchable){

    $(".focus-demo-01").switchable({
        type:"focus",
        isAutoPlay:!0,
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
        //direction:"top",
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
    $(".slider-demo-02_1").switchable({
        type:"slider",
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
    $(".slider-demo-02_2").switchable({
        type:"slider",
        counter:!1, // 索引 计数器 [ false]
        seamlessLoop:!0,
        contentClass:"slider-main",
        mainClass:"slider-panel",
        bodyExtra:"slider-extra",
        navClass:"slider-nav",
        navItem:"slider-item",
        prevClass:"slider-prev",
        nextClass:"slider-next",
        navSelectedClass:"slider-active",
        contentPage:"slider-page",
        step: 2,
        visible: 4,
    })
    $(".slider-demo-02_3").switchable({
        type:"slider",
        counter:!1, // 索引 计数器 [ false]
        seamlessLoop:!0,
        contentClass:"slider-main",
        mainClass:"slider-panel",
        bodyExtra:"slider-extra",
        navClass:"slider-nav",
        navItem:"slider-item",
        prevClass:"slider-prev",
        nextClass:"slider-next",
        navSelectedClass:"slider-active",
        contentPage:"slider-page",
        step: 3,
        visible: 4
    })
    $(".slider-demo-02_4").switchable({
        type:"slider",
        counter:!1, // 索引 计数器 [ false]
        //seamlessLoop:!0,
        contentClass:"slider-main",
        mainClass:"slider-panel",
        bodyExtra:"slider-extra",
        navClass:"slider-nav",
        navItem:"slider-item",
        prevClass:"slider-prev",
        nextClass:"slider-next",
        navSelectedClass:"slider-active",
        contentPage:"slider-page",
        step: 2,
        visible: 6,
    })
    $(".slider-demo-03").switchable({
        type:"slider",
        counter:!1, // 索引 计数器 [ false]
        direction:"top",
        seamlessLoop:!0,
        contentClass:"slider-main",
        mainClass:"slider-panel",
        bodyExtra:"slider-extra",
        navClass:"slider-nav",
        navItem:"slider-item",
        prevClass:"slider-prev",
        nextClass:"slider-next",
        navSelectedClass:"slider-active",
        contentPage:"slider-page",
        isAutoPlay:!0,
        stayTime:1e3
    })

    $(".slider-demo-03_1").switchable({
        type:"slider",
        counter:!1, // 索引 计数器 [ false]
        direction:"top",
        contentClass:"slider-main",
        mainClass:"slider-panel",
        bodyExtra:"slider-extra",
        navClass:"slider-nav",
        navItem:"slider-item",
        prevClass:"slider-prev",
        nextClass:"slider-next",
        navSelectedClass:"slider-active",
        contentPage:"slider-page",
        isAutoPlay:!0,
        stayTime:1e3
    });


    $(".tab-demo-04").switchable({
        type:"tab",
        defaultPanel:0,
        event:"click",
        counter:!1, // 索引 计数器 [ false]
        contentClass:"tab-main",
        mainClass:"tab-panel",
        bodyExtra:"tab-extra",
        navClass:"tab-nav",
        navItem:"tab-item",
        navSelectedClass:"tab-active",
        contentPage:"tab-page",
        hasArrow:!0,
        arrowClass:"tab-arrow",
        delay:0,
        isAutoPlay:!0
    });

    $(".tab-demo-05").switchable({
        type:"tab",
        defaultPanel:0,
        counter:!1, // 索引 计数器 [ false]
        contentClass:"tab-main",
        mainClass:"tab-panel",
        bodyExtra:"tab-extra",
        navClass:"tab-nav",
        navItem:"tab-item",
        navSelectedClass:"tab-active",
        contentPage:"tab-page",
        delay:0
    })

});