import { getClosestPoint } from "/s/buss/acs/location/BASE/render/add.path.js";
import { getM, getMPoint } from "/s/buss/acs/location/BASE/render/render.d.js";
import { gf } from "/s/buss/g/j/g.f.js";
import { updatetaskSiteLogic } from "/s/buss/acs/FANCY/j/acs.site.info.js";
import { datas } from "/s/buss/acs/location/BASE/location.data.js";
import { dToStrig } from "/s/buss/acs/location/BASE/render/path.direction.js";

export var startedPath = function () {
    datas.init();
    d3.select(this).attr("class", "savaPath");
    d3.selectAll(".post").remove();
}
export var dragedPath = function () {
    const { x, y } = d3.event;
    var s = $(this).attr("d");
    var mPoint = getMPoint(s);
    d3.select(this)
        .attr("d", function (d) {
            return dToStrig(mPoint[0], x, mPoint[1], y);
        });
    d3.select("#w" + $(this).attr("id"))
        .attr("d", function () {
            return dToStrig(mPoint[0], x, mPoint[1], y);
        })
}
export var endedPath = function (id) {
    var siteid = $(this).attr("from");
    var oldnext = $(this).attr("to");
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
            return dToStrig(x1, x2, y1, y2);
        })
    d3.select("#w" + $(this).attr("id"))
        .attr("d", function () {
            return dToStrig(x1, x2, y1, y2);
        })
    saveLogic(siteid, nextid, oldnext);
}

var deleteLogic = function (siteid, oldnext) {
    gf.doAjax({
        url: `/tasksitelogic/deleteEntity.shtml`, type: "POST",
        dataType: "JSON", data: { "siteid": siteid, "nextid": oldnext },
    });
};

var saveLogic = function (siteid, nextid, oldnext) {
    var json = {
        "TaskSiteLogicFormMap.siteid": siteid,
        "TaskSiteLogicFormMap.nextid": nextid,
        "TaskSiteLogicFormMap.side": 2,
        "TaskSiteLogicFormMap.distance": 1,
    }
    gf.ajax(`/tasksitelogic/addEntity.shtml`, json, "json", function (data) {
        layer.msg(data.msg ? data.msg : '保存成功！');
        if (data.code > 0 && oldnext) {
            deleteLogic(siteid, oldnext);
        };
        updatetaskSiteLogic(siteid, oldnext, json);
    });
};