import { conf } from "/s/buss/acs/location/BASE/location.conf.js";
import { started, draged, ended, createPoint } from "/s/buss/acs/location/YZK/create.newpoint.js";


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
}

