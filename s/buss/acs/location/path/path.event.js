import { deleteLogic } from "/s/buss/acs/location/url/logic.url.js";

export var delPath = function (d, i) {
    if (d3.event.button == 2) {
        var path = d3.select(this);
        var wPath = d3.select("#w" + $(this).attr("from") + $(this).attr("to"));
        var marPath = d3.select("#mar" + $(this).attr("from") + $(this).attr("to"));
        var siteid = $(this).attr('from'), nextid = $(this).attr('to');
        var value = { "siteid": siteid, "nextid": nextid };
        let ii = layer.confirm('是否删除？', {
            btn: ['是', '否']
        }, function (index) {
            if (siteid && nextid) {
                deleteLogic(value, true);
            }
            path.remove();
            wPath.remove();
            marPath.remove();
            layer.close(ii);
        });
    }
}