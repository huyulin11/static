import { conf } from "/s/buss/acs/location/location.conf.js";
import { event as pointEvent } from "/s/buss/acs/location/point/point.event.js";
import { createPath } from "/s/buss/acs/location/path/add.path.js";
import { dragedPath, endedPath, startedPath } from "/s/buss/acs/location/path/drag.path.js";
import { delPath } from "/s/buss/acs/location/path/path.event.js";
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
    conf.svg.on("contextmenu", function () {
        d3.event.preventDefault();
    });
}

export var dragPoint = function (flag) {
    conf.pointHome.selectAll("circle").call(
        d3.drag()
            .on('start', flag ? pointEvent.start : null)
            .on('drag', flag ? pointEvent.drag : null)
            .on('end', flag ? pointEvent.end : null)
    );
}

export var rightClickPoint = function (flag) {
    conf.pointHome.selectAll("circle")
        .on("contextmenu", flag ? rightClickPointHandling : null);
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
    conf.svg.selectAll(".clashLine")
        .on("contextmenu", flag ? delPath : null);
}

var rightClickPointHandling = function (d, i) {
    if (d3.event.button == 2) {
        var point = $(this);
        var id = point.attr('id')
        var tips = layer.tips('<input type="button" id="edit" style="width: 76px;height: 30px" value="修改站点"><br>'
            + '<input type="button" id="addPath" style="width: 76px;height: 30px" value="新增路径"><br>'
            + '<input type="button" id="del" style="width: 76px;height: 30px" value="删除站点">',
            '#' + id, { tips: [2, '#e6e6e6'], time: 10000 });
        d3.select("body").on("click", function () { return layer.close(tips); });
        var x = point.attr('cx'), y = point.attr('cy');
        d3.select("#edit").on("click", function () { pointEvent.updateID(point); });
        d3.select("#addPath").on("click", function () {
            createPath(id, x, y);
            d3.selectAll(".clashLine").call(
                d3.drag()
                    .on("start", startedNewPath)
                    .on("drag", dragedNewPath)
                    .on("end", endedNewPath)
            );
            rightClickPath(true);
        });
        d3.select("#del").on("click", function () { pointEvent.delPoint(point); });
    }
}