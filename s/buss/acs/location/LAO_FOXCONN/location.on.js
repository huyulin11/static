import { gf } from "/s/buss/g/j/g.f.js";
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
        var arr = { id, x, y };
        console.log(arr);
        var result = JSON.stringify(arr);
        gf.doAjax({
            url: `/app/conf/set.shtml`, type: "POST",
            data: { table: "TASK_SITE_LOCATION", key: id, value: result }
        });
    }
}
