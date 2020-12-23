import { conf } from "/s/buss/acs/location/BASE/location.conf.js";
import { started, draged, ended, createPoint, deleteLocation } from "/s/buss/acs/location/BASE/render/drag.create.point.js";
import { updateID } from "/s/buss/acs/location/BASE/render/update.point.js";
import { createPath } from "/s/buss/acs/location/BASE/render/add.path.js";
import { dragedPath, endedPath, startedPath, deleteLogic } from "/s/buss/acs/location/BASE/render/drag.path.js";
import { datas } from "/s/buss/acs/location/BASE/location.data.js";

export var move = function () {

    dragPoint();

    addPoint();

    updatePoint();

    dragPath();

    rightClickPath();
}

var rightClickPath = function () {
    conf.svg.selectAll("path")
        .on("contextmenu", function (d, i) {
            d3.event.preventDefault();
            if (d3.event.button == 2) {
                var path = d3.select(this);
                var siteid = $(this).attr('from'), nextid = $(this).attr('to');
                var value = { "siteid": siteid, "nextid": nextid };
                layer.confirm('是否删除？', {
                    btn: ['是', '否']
                }, function (index) {
                    if (siteid && nextid) {
                        deleteLogic(value, true);
                    }
                    path.remove();
                });
            }
        });
}

export var dragPath = function () {
    conf.svg.selectAll(".clashLine").call(
        d3.drag()
            .on('start.a', startedPath)
            .on('drag.a', dragedPath)
            .on('end.a', endedPath)
    );
};

export var updatePoint = function () {
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
                    conf.svg.selectAll(".post").call(
                        d3.drag()
                            .on('start', startedPath)
                            .on('drag', dragedPath)
                            .on('end', endedPath)
                    );
                    rightClickPath();
                });
                d3.select("#btn3").on("click", function () {
                    deleteLocation(id);
                    datas.init();
                    conf.svg.selectAll("circle").filter(function (e) { return e && e[0] == id; }).remove();
                    conf.svg.selectAll("path").filter(function (e) { return e && e.to == id; }).remove();
                    conf.svg.selectAll("path").filter(function (e) { return e && e.from == id; }).remove();
                });
            }
        });
}

export var dragPoint = function () {
    d3.selectAll("circle").call(
        d3.drag()
            .on('start', started)
            .on('end', ended)
            .on('drag', draged)
    );
}

export var addPoint = function () {
    d3.select("body")
        .select("#coordinate")
        .select("svg")
        .on("dblclick", createPoint);
}