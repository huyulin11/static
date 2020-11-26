import { gf } from "/s/buss/g/j/g.f.js";
import { conf } from "/s/buss/acs/location/BASE/location.conf.js";
import { datas, dataLocation } from "/s/buss/acs/location/BASE/location.data.js";
import { renderSvg } from "/s/buss/acs/location/BASE/location.render.js";
import { taskSiteLocation, updateTaskSiteLocation } from "/s/buss/acs/FANCY/j/acs.site.info.js";

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
        conf.svg.selectAll("line").filter(function (e) { return e && e.from == id; })
            .attr("x1", function (d) {
                return x;
            }).attr("y1", function (d) {
                return y;
            }).attr("x2", function (d) {
                return conf.padding.left + conf.xScale(d.rightXaxis);
            }).attr("y2", function (d) {
                return conf.height - conf.padding.bottom - conf.yScale(d.upYaxis);
            });
        conf.svg.selectAll("line").filter(function (e) { return e && e.to == id; })
            .attr("x1", function (d) {
                return conf.padding.left + conf.xScale(d.leftXaxis);
            }).attr("y1", function (d) {
                return conf.height - conf.padding.bottom - conf.yScale(d.downYaxis);
            }).attr("x2", function (d) {
                return x;
            }).attr("y2", function (d) {
                return y;
            });
    }
    function ended() {
        const { x, y } = d3.event;
        d3.select(this)
            .attr('cx', x)
            .attr('cy', y);
        var id = $(this).attr('id');
        saveLocation(id, x, y);
        setTimeout(renderSvg, 10000);
    }
}

function saveLocation(id, x, y) {
    var ids = parseInt(id);
    var x1 = conf.xReScale(x - conf.padding.left);
    var y1 = conf.yReScale(conf.height - conf.padding.bottom - y);
    var arr = { id, x1, y1 };
    console.log(arr);
    var result = JSON.stringify({ "id": ids, "x": x1, "y": y1 });
    updateTaskSiteLocation(id, result);
    gf.doAjax({
        url: `/app/conf/set.shtml`, type: "POST",
        data: { table: "TASK_SITE_LOCATION", key: ids, value: result }
    });
}
