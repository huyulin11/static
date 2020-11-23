import { gf } from "/s/buss/g/j/g.f.js";
import { conf } from "/s/buss/acs/location/BASE/location.conf.js";

conf.xReScale = d3.scaleLinear().domain([0, conf.xAxisWidth]).range(conf.domainXVal);
conf.yReScale = d3.scaleLinear().domain([0, conf.yAxisWidth]).range(conf.domainYVal);

export var move = function () {
    d3.selectAll("circle").call(
        d3.drag()
            .on('start', started)
            .on('end', ended)
            .on('drag', draged)
    )
}
// function ticked() {
//     d3.selectAll("line").attr("x1", function (d) {
//         return d.source.x;
//     })
//         .attr("y1", function (d) {
//             return d.source.y;
//         })
//         .attr("x2", function (d) {
//             return d.target.x;
//         })
//         .attr("y2", function (d) {
//             return d.target.y;
//         });

//     d3.selectAll("circle").attr("cx", function (d) {
//         return d.x;
//     })
//         .attr("cy", function (d) {
//             return d.y;
//         });

//     svg_texts.attr("x", function (d) {
//         return d.x;
//     })
//         .attr("y", function (d) {
//             return d.y;
//         });
// }
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
    var ids = parseInt(id)
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
