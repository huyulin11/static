import { conf } from "/s/buss/acs/location/location.conf.js";
import pointDrag from "/s/buss/acs/location/point/point.drag.js";
import pointRightClick from "/s/buss/acs/location/point/point.rightClick.js";
import pointMove from "/s/buss/acs/location/point/point.move.js";

export default {
    dragPoint(flag) {
        conf.pointHome.selectAll("circle").call(
            d3.drag()
                .on('start', flag ? pointDrag.start : null)
                .on('drag', flag ? pointDrag.drag : null)
                .on('end', flag ? pointDrag.end : null)
        );
    },
    rightClickPoint(flag) {
        conf.pointHome.selectAll("circle")
            .on("contextmenu", flag ? rightClickPointHandling : null);
    },
    movePoint(flag) {
        conf.pointHome.selectAll("circle")
            .on("mouseover", flag ? pointMove.move : null);
    },
    moveoutPoint(flag) {
        conf.pointHome.selectAll("circle")
            .on("mouseout", flag ? pointMove.out : null);
    }
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
        d3.select("#edit").on("click", function () { pointRightClick.updateID(point); });
        d3.select("#addPath").on("click", function () { pointRightClick.addPath(point); });
        d3.select("#del").on("click", function () { pointRightClick.delPoint(point); });
    }
}