import { conf } from "/s/buss/acs/location/BASE/location.conf.js";
import { started, draged, ended, createPoint } from "/s/buss/acs/location/YZK/drag.create.point.js";
import { updateID } from "/s/buss/acs/location/YZK/update.point.js";

export var move = function () {

    d3.selectAll("circle").call(
        d3.drag()
            .on('start', started)
            .on('end', ended)
            .on('drag', draged)
    );

    d3.select("body")
        .select("#coordinate")
        .select("svg")
        .on("click", createPoint);


    conf.svg.selectAll("circle")
        .on("contextmenu", function (d, i) {
            d3.event.preventDefault();
            if (d3.event.button == 2) {
                var id = $(this).attr('id')
                let x = d3.event.offsetX, y = d3.event.offsetY;
                updateID(id, x, y);
            }
        });
}

