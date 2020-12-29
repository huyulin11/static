import { getClosestPoint } from "/s/buss/acs/location/BASE/render/add.path.js";
import { getM, getMPoint } from "/s/buss/acs/location/BASE/render/render.d.js";
import { datas } from "/s/buss/acs/location/BASE/location.data.js";
import { dToStrig } from "/s/buss/acs/location/BASE/render/path.direction.js";
import { saveLogic } from "/s/buss/acs/location/BASE/render/s/logic.url.js";


export var startedPath = function () {
    datas.init();
    d3.select(this).attr("class", "tempSave");
    d3.select("#pathHome3").selectAll(".clashLine").remove();
}
export var dragedPath = function () {
    const { x, y } = d3.event;
    var s = $(this).attr("d");
    var mPoint = getMPoint(s);
    d3.select(this)
        .attr("d", function (d) {
            return dToStrig(mPoint[0], x, mPoint[1], y);
        });
    d3.select("#w" + $(this).attr("from") + $(this).attr("to"))
        .attr("d", function () {
            return dToStrig(mPoint[0], x, mPoint[1], y);
        })
}
export var endedPath = function () {
    var siteid = $(this).attr("from");
    var oldnext = $(this).attr("to");
    let s = $(this).attr("d");
    const { x, y } = d3.event;
    var point = getClosestPoint(siteid, x, y);
    var nextid = point.nextid;
    var arr = getMPoint(s);
    var x1 = arr[0], y1 = arr[1];
    var x2 = point.x2, y2 = point.y2;
    var flag = $("#p" + siteid + nextid)[0];
    var side = getSide(x1, x2, y1, y2);
    if (!flag) {
        saveLogic(side, siteid, nextid, oldnext);
        d3.select(this)
            .attr("class", "clashLine")
            .attr("id", "p" + siteid + nextid)
            .attr("from", siteid)
            .attr("to", nextid)
            .attr("d", function () {
                return dToStrig(x1, x2, y1, y2);
            })
            .attr("style", "marker-end:url(#triangle);");
        d3.select("#w" + siteid + oldnext)
            .attr("id", "w" + siteid + nextid)
            .attr("d", function () {
                return dToStrig(x1, x2, y1, y2);
            })
    } else {
        layer.msg('调整失败，与原路径相同');
        if (oldnext) {
            var xOld = parseFloat($('#' + oldnext).attr('cx'));
            var yOld = parseFloat($('#' + oldnext).attr('cy'));
            d3.select(this).attr("class", "clashLine").attr('d', function () {
                return dToStrig(x1, xOld, y1, yOld);
            });
            d3.select("#w" + $(this).attr("from") + $(this).attr("to")).attr("d", function () {
                return dToStrig(x1, xOld, y1, yOld);
            })
        } else d3.select(this).remove();
    }
}

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

