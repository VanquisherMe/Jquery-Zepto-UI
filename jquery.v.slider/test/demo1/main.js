/**
 * developer:Chen.
 * time:2015/12/9 0009
 */

requirejs(['jquery','jquery.ui.switchable'],function($,switchable){

    $(".focus-demo-01").switchable({
        type:"focus",
        isAutoPlay:true,
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

});