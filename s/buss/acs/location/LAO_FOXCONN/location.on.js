import { conf } from "/s/buss/acs/location/BASE/location.conf.js";
import { started, draged, ended } from "/s/buss/acs/location/YZK/create.newpoint.js";


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
        .on("click", function () {
            let x=d3.event.offsetX,y=d3.event.offsetY;
            conf.svg.append("circle")
                .attr("fill", "blue")
                .attr("cx", x)
                .attr("cy", y)
                .attr("r", 5)
        })
}

