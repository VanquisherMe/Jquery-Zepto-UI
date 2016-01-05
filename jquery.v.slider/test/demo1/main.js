/**
 * developer:Chen.
 * time:2015/12/9 0009
 */

requirejs(['jquery','jquery.ui.switchable'],function($,switchable){

    $(".focus-demo-01").switchable({
        contentClass:"focus-main",
        mainClass:"focus-panel"
    })

});