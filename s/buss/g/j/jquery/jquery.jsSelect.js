(function ($) {
    $("select.jsSelect").each(function () {
        var type = $(this).data("patten");
        var initval = $(this).data("initval");
        var _tl;
        try {
            if (type.indexOf(".") > 0) {
                var ll = type.split('.');
                _tl = gv;
                _tl = gv[ll[0]].getT(ll[1]);
            } else {
                _tl = gv.getT(type);
            }
        } catch (error) {
            _tl = jQuery.parseJSON(localStorage.getItem("dic")).filter(function (e) { return e.type == type; });
        }
        if (!initval) {
            $(this).append("<option value=" + ">" + "----请选择----" + "</option>");
        }
        for (var ii of _tl) {
            var value = ii.value;
            if (!value) { value = ii.ip + ":" + ii.port; }
            $(this).append("<option value='" + ii.key + "' "
                + ((ii.key == initval) ? "selected" : "")
                + ">" + value + "</option>");
        }
    });
})(jQuery);