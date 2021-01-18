import { conf } from "/s/buss/acs/location/location.conf.js";
import { started, draged, ended, createPoint } from "/s/buss/acs/location/point/point.event.js";
import { updateID } from "/s/buss/acs/location/point/point.event.update.js";
import { createPath } from "/s/buss/acs/location/path/add.path.js";
import { dragedPath, endedPath, startedPath } from "/s/buss/acs/location/path/drag.path.js";
import { datas } from "/s/buss/acs/location/location.data.js";
import { deleteLocation } from "/s/buss/acs/location/url/siteinfo.url.js";
import { deleteLogic } from "/s/buss/acs/location/url/logic.url.js";
import { startedNewPath, dragedNewPath, endedNewPath } from "/s/buss/acs/location/path/new.path.drag.js";

export var mouseEvent = function (flag) {
    dragPoint(flag);
    dblclick(flag);
    rightClickPoint(flag);
    dragPath(flag);
    rightClickPath(flag);
    bandBodyClick();
}
export var bandBodyClick = function () {
    conf.svg.on("contextmenu", function (d, i) {
        d3.event.preventDefault();
    })
}

export var dragPoint = function (flag) {
    conf.pointHome.selectAll("circle").call(
        d3.drag()
            .on('start', flag ? started : null)
            .on('end', flag ? ended : null)
            .on('drag', flag ? draged : null)
    );
}

var dblclick = function (flag) {
    conf.svg.on("dblclick", flag ? createPoint : null);
}

export var dragPath = function (flag) {
    conf.svg.selectAll(".clashLine").call(
        d3.drag()
            .on('start.a', flag ? startedPath : null)
            .on('drag.a', flag ? dragedPath : null)
            .on('end.a', flag ? endedPath : null)
    );
}

var rightClickPath = function (flag) {
    if (flag) {
        conf.svg.selectAll(".clashLine")
            .on("contextmenu", function (d, i) {
                d3.event.preventDefault();
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
            });
    } else {
        conf.svg.selectAll(".clashLine")
            .on("contextmenu", null)
    }
}

export var rightClickPoint = function (flag) {
    if (flag) {
        conf.svg.selectAll("circle")
            .on("contextmenu", function (d, i) {
                d3.event.preventDefault();
                if (d3.event.button == 2) {
                    var id = $(this).attr('id');
                    var tips = layer.tips('<input type="button" id="btn1" style="width: 76px;height: 30px" value="修改站点"><br><input type="button" id="btn2" style="width: 76px;height: 30px" value="新增路径"><br><input type="button" id="btn3" style="width: 76px;height: 30px" value="删除站点">',
                        '#' + id,
                        {
                            tips: [2, '#e6e6e6'],
                            time: 10000
                        });
                    d3.select("body").on("click", function () {
                        return layer.close(tips);
                    });
                    var x = $(this).attr('cx'), y = $(this).attr('cy');
                    var circle = d3.select(this);
                    d3.select("#btn1").on("click", function () {
                        updateID(circle, id, x, y);
                    });
                    d3.select("#btn2").on("click", function () {
                        createPath(id, x, y);
                        d3.selectAll(".clashLine").call(
                            d3.drag()
                                .on("start", startedNewPath)
                                .on("drag", dragedNewPath)
                                .on("end", endedNewPath)
                        );
                        rightClickPath(true);
                    });
                    d3.select("#btn3").on("click", function () {
                        deleteLocation(id);
                        datas.init();
                        d3.select("#t" + id).remove();
                        circle.remove();
                        conf.svg.selectAll("path").filter(function (e) { return e && e.to == id; }).remove();
                        conf.svg.selectAll("path").filter(function (e) { return e && e.from == id; }).remove();
                    });
                }
            });
    } else {
        conf.svg.selectAll("circle")
            .on("contextmenu", null)
    }
}