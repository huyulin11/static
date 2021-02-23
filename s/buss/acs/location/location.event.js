import { conf } from "/s/buss/acs/location/location.conf.js";
import { event as pointEvent } from "/s/buss/acs/location/point/point.event.js";
import { event as pathEvent } from "/s/buss/acs/location/path/path.event.js";
import { createPath } from "/s/buss/acs/location/path/path.event.add.js";

export var mouseEvent = function (flag) {
    dragPoint(flag);
    rightClickPoint(flag);
    dragPath(flag);
    rightClickPath(flag);
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
            .on('start.a', flag ? pathEvent.start : null)
            .on('drag.a', flag ? pathEvent.drag : null)
            .on('end.a', flag ? pathEvent.end : null)
    );
}

export var rightClickPath = function (flag) {
    conf.svg.selectAll(".clashLine")
        .on("contextmenu", flag ? pathEvent.delPath : null);
}

var rightClickPointHandling = function (d, i) {
    if (d3.event.button == 2) {
        d3.event.stopPropagation();
        d3.event.preventDefault();
        var point = d3.select(this);
        var tips = layer.tips('<input type="button" id="edit" style="width: 76px;height: 30px" value="修改站点"><br>'
            + '<input type="button" id="addPath" style="width: 76px;height: 30px" value="新增路径"><br>'
            + '<input type="button" id="del" style="width: 76px;height: 30px" value="删除站点">',
            '#' + point.attr('id'), { tips: [2, '#e6e6e6'], time: 10000 });
        d3.select("body").on("click", function () { return layer.close(tips); });
        d3.select("#edit").on("click", function () { pointEvent.updateID(point); });
        d3.select("#addPath").on("click", function () { createPath(point); });
        d3.select("#del").on("click", function () { pointEvent.delPoint(point); });
    }
}