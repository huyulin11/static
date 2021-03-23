import rightclick from "/s/buss/acs/location/path/path.rightclick.js";
import movePath from "/s/buss/acs/location/path/path.drag.js";
import { conf } from "/s/buss/acs/location/location.conf.js";


export default {
    rightClickPath(flag) {
        conf.svg.selectAll(".clashLine")
            .on("contextmenu", flag ? rightClickPathHandling : null);
    },
    dragPath(flag) {
        conf.svg.selectAll(".clashLine").call(
            d3.drag()
                .on('start.a', flag ? movePath.start : null)
                .on('drag.a', flag ? movePath.drag : null)
                .on('end.a', flag ? movePath.end : null)
        );
    }
}

var rightClickPathHandling = function (d, i) {
    if (d3.event.button == 2) {
        d3.event.stopPropagation();
        d3.event.preventDefault();
        var path = d3.select(this);
        var side = d3.select(this).data()[0].side;
        d3.selectAll('#tipsloc').remove();
        let x = d3.event.offsetX,
            y = d3.event.offsetY;
        d3.select('svg').append('circle')
            .attr('id', 'tipsloc')
            .attr('cx', x)
            .attr('cy', y)
            .attr('fill', 'none')
            .attr('r', 4);
        var tips = layer.tips('<input type="button" id="delpath" style="width: 76px;height: 30px" value="删除路径"><br>'
            + '<input type="button" id="editderction" style="width: 76px;height: 30px" value="修改方向">',
            '#tipsloc', { tips: [2, '#e6e6e6'], time: 10000 });
        d3.select("body").on("click", function () { return layer.close(tips); });
        d3.select("#delpath").on("click", function () { rightclick.deletePath(path) })
        d3.select("#editderction").on("click", function () { rightclick.changeDirection(path, side) })
    }
}