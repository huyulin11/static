export var renderSelect = function (that) {
    var type = $(that).data("patten");
    var initval = $(that).data("initval");
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
        _tl = jQuery.parseJSON(localStorage.dic).filter(function (e) { return e.type == type; });
    }
    if (!initval) {
        $(that).append("<option value=" + ">" + "----请选择----" + "</option>");
    }
    for (var ii of _tl) {
        var value = ii.value;
        if (!value) { value = ii.ip + ":" + ii.port; }
        $(that).append("<option value='" + ii.key + "' "
            + ((ii.key == initval) ? "selected" : "")
            + ">" + value + "</option>");
    }
}

export var renderAll = function () {
    $("select.jsSelect").each(function () {
        renderSelect(this);
    });
}