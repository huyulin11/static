import { gf } from "/s/buss/g/j/g.f.js";
import { conf } from "/s/buss/acs/location/BASE/location.conf.js";

conf.xReScale = d3.scaleLinear().domain([0, conf.xAxisWidth]).range(conf.domainXVal);
conf.yReScale = d3.scaleLinear().domain([0, conf.yAxisWidth]).range(conf.domainYVal);

export var move = function () {
    d3.selectAll("circle").on("mousedown", function () {
        var id = $(this).attr('id');
        console.log(id + "," + $(this).attr('cx') + "," + $(this).attr('cy'));
    }).call(
        d3.drag()
            .on('start', started)
            .on('end', ended)
            .on('drag', draged)
    )
    function started() {

    }
    function draged() {
        const { x, y } = d3.event
        d3.select(this)
            .attr('cx', x)
            .attr('cy', y)
    }
    function ended() {
        const { x, y } = d3.event;
        d3.select(this)
            .attr('cx', x)
            .attr('cy', y);
        var id = $(this).attr('id');
        var x1 = conf.xReScale(x - conf.padding.left);
        var y1 = conf.yReScale(conf.height - conf.padding.bottom - y);
        var arr = { id, x1, y1 };
        console.log(arr);
        var result = JSON.stringify({ "id": id, "x": x1, "y": y1 });
        gf.doAjax({
            url: `/app/conf/set.shtml`, type: "POST",
            data: { table: "TASK_SITE_LOCATION", key: id, value: result }
        });
    }

}
