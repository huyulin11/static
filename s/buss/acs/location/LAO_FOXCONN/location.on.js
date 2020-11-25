import { gf } from "/s/buss/g/j/g.f.js";
import { conf } from "/s/buss/acs/location/BASE/location.conf.js";
import { datas } from "/s/buss/acs/location/BASE/location.data.js";

conf.xReScale = d3.scaleLinear().domain([0, conf.xAxisWidth]).range(conf.domainXVal);
conf.yReScale = d3.scaleLinear().domain([0, conf.yAxisWidth]).range(conf.domainYVal);

export var move = function () {
    d3.selectAll("circle").call(
        d3.drag()
            .on('start', started)
            .on('end', ended)
            .on('drag', draged)
    );
    function started() {
    }
    function draged() {
        const { x, y } = d3.event;
        var id = $(this).attr('id');
        d3.select(this)
            .attr('cx', x)
            .attr('cy', y);
        d3.select("#t" + id)
            .attr("x", x)
            .attr("y", y);
        conf.svg.selectAll("line").data(datas.point)
            .attr("x1", function (d) {
                if (d.from == id) return x;
                return conf.padding.left + conf.xScale(d.rightXaxis);
            }).attr("y1", function (d) {
                if (d.from == id) return y;
                return conf.height - conf.padding.bottom - conf.yScale(d.upYaxis);
            }).attr("x2", function (d) {
                if (d.to == id) return x;
                return conf.padding.left + conf.xScale(d.leftXaxis);
            }).attr("y2", function (d) {
                if (d.to == id) return y;
                return conf.height - conf.padding.bottom - conf.yScale(d.downYaxis);
            })
    }
    function ended() {
        const { x, y } = d3.event;
        d3.select(this)
            .attr('cx', x)
            .attr('cy', y);
        var id = $(this).attr('id');
        saveLocation(id, x, y);
    }
}

function saveLocation(id, x, y) {
    var ids = parseInt(id);
    var x1 = conf.xReScale(x - conf.padding.left);
    var y1 = conf.yReScale(conf.height - conf.padding.bottom - y);
    var arr = { id, x1, y1 };
    console.log(arr);
    var result = JSON.stringify({ "id": ids, "x": x1, "y": y1 });
    gf.doAjax({
        url: `/app/conf/set.shtml`, type: "POST",
        data: { table: "TASK_SITE_LOCATION", key: ids, value: result }
    });
}
