import { getClosestPoint } from "/s/buss/acs/location/BASE/render/add.path.js";
import { getM, getMPoint } from "/s/buss/acs/location/BASE/render/render.d.js";
import { gf } from "/s/buss/g/j/g.f.js";

export var startedPath = function () {
    d3.select(this).attr("class", "savaPath");
    d3.selectAll(".post").remove();
}
export var dragedPath = function () {
    const { x, y } = d3.event;
    var s = $(this).attr("d");
    d3.select(this)
        .attr("d", function (d) {
            return getM(s) + "L" + parseFloat(x) + "," + parseFloat(y);
        })
        .attr("style", "marker-end:url(#triangle);");
}
export var endedPath = function (id) {
    // var siteid;
    // if (id) { siteid = id; }
    var siteid = $(this).attr("from");
    let s = $(this).attr("d");
    const { x, y } = d3.event;
    var point = getClosestPoint(siteid, x, y);
    var nextid = point.nextid;
    var arr = getMPoint(s);
    var x1 = arr[0], y1 = arr[1];
    var x2 = point.x2, y2 = point.y2;
    d3.select(this)
        .attr("from", siteid)
        .attr("to", nextid)
        .attr("d", function () {
            return getM(s) +
                "L" + (x1 + x2) * 0.5 + "," + (y1 + y2) * 0.5 +
                getL2(x2, y2);
        })
        .attr("style", "marker-end:url(#triangle);");
    saveLogic(siteid, nextid);
}

var saveLogic = function (siteid, nextid) {
    var json = {
        "TaskSiteLogicFormMap.siteid": siteid,
        "TaskSiteLogicFormMap.nextid": nextid,
        "TaskSiteLogicFormMap.side": 2,
        "TaskSiteLogicFormMap.distance": 1,
    }
    gf.ajax(`/tasksitelogic/addEntity.shtml`, json, "json", function (data) {
        layer.msg(data.msg ? data.msg : '保存成功！');
    });
};

var getL2 = function (x, y) {
    return "L" + x + "," + y;
};