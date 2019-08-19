export var overlay = new Object();

(function () {
    var _getOverLay = function () {
        var num = $(".black_overlay").length;
        if (num == 0) {
            $("body").append("<div class='black_overlay'>" + "<div id='imgdiv'>" +
                "<img alt='' src='/s/i/loading2.gif'>" + "</div>" + "</div>");
            $("body").append("<style>.black_overlay {" +
                "text-align: center;" + "display: block;" + "position: fixed;" +
                "top: 0%;" + "left: 0%;" + "width: 10%;" + "height: 10%;" +
                "z-index: 0;" + "-moz-opacity: 0.8;" + "opacity: .50;" +
                "filter: alpha(opacity = 80);</style>");
        }
        return $(".black_overlay");
    }

    overlay.hide = function () {
        _getOverLay().hide();
    }

    overlay.show = function () {
        // _getOverLay().show();
    }
})(jQuery);