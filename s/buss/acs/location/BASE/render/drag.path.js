import { getClosestPoint } from "/s/buss/acs/location/BASE/render/add.path.js";
import { getM, getMPoint } from "/s/buss/acs/location/BASE/render/render.d.js";
import { gf } from "/s/buss/g/j/g.f.js";
import { updatetaskSiteLogic } from "/s/buss/acs/FANCY/j/acs.site.info.js";
import { datas } from "/s/buss/acs/location/BASE/location.data.js";
import { dToStrig } from "/s/buss/acs/location/BASE/render/path.direction.js";
import { renderSvg } from "/s/buss/acs/location/BASE/location.render.js";


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
    var side = getSide(x1, x2, y1, y2);
    saveLogic(side, siteid, nextid, oldnext);
    setTimeout(renderSvg, 3000);
}

export var deleteLogic = function (value, bool) {
    gf.doAjax({
        url: `/tasksitelogic/deleteEntity.shtml`, type: "POST",
        dataType: "JSON", data: value,
        success: (obj) => {
            updatetaskSiteLogic(value.siteid, value.nextid, "", bool);
        }
    });
};

export var getSide = function (x1, x2, y1, y2) {
    var side;
    if (x1 < x2) {
        if (y1 > y2) {
            side = 1;
        } else if (y1 < y2) {
            side = 2;
        }
    } else if (x1 > x2) {
        if (y1 > y2) {
            side = 2;
        } else if (y1 < y2) {
            side = 1;
        }
    }
    return side;
};

var saveLogic = function (side, siteid, nextid, oldnext) {
    var json = {
        "TaskSiteLogicFormMap.siteid": siteid,
        "TaskSiteLogicFormMap.nextid": nextid,
        "TaskSiteLogicFormMap.side": side,
        "TaskSiteLogicFormMap.distance": 1,
    }
    gf.ajax(`/tasksitelogic/addEntity.shtml`, json, "json", function (data) {
        if (data.code > 0 && oldnext) {
            var result = { "siteid": siteid, "nextid": oldnext };
            deleteLogic(result, true);
            updatetaskSiteLogic(siteid, oldnext, json);
        };
    });
};