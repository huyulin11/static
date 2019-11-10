export var renderSelect = function (that) {
    var type = $(that).data("patten");
    var gather = $(that).data("patten-gather");
    gather = gather ? gather.split(",") : "";
    var initval = $(that).data("initval");
    var _items;
    try {
        if (type.indexOf(".") > 0) {
            var ll = type.split('.');
            _items = gv;
            _items = gv[ll[0]].getT(ll[1]);
        } else {
            _items = gv.getT(type);
        }
    } catch (error) {
        _items = jQuery.parseJSON(localStorage.dic).filter(function (e) { return e.type == type; });
    }
    if (!initval) {
        $(that).append("<option value=" + ">" + "----请选择----" + "</option>");
    }
    for (var item of _items) {
        var value = item.value;
        if (gather && !gather.includes(item.key)) continue;
        if (!value) { value = item.ip + ":" + item.port; }
        $(that).append("<option value='" + item.key + "' "
            + ((item.key == initval) ? "selected" : "")
            + ">" + value + "</option>");
    }
}

export var renderAll = function () {
    $("select.jsSelect").each(function () {
        renderSelect(this);
    });
}