import { dbToWindow } from "/s/buss/acs/location/render/trans.location.js";
import { dToStrig } from "/s/buss/acs/location/render/path.direction.js";
import { show } from "/s/buss/acs/location/render/location.button.js";
import { conf } from "/s/buss/acs/location/location.conf.js";
import { doubleDToStrig } from "/s/buss/acs/location/path/double.path.draw.js";

export var drawPath = function (data) {
    conf.pathHome1.selectAll("path").data(data)
        .enter()
        .append("path")
        .attr("id", function (d) {
            return 'p' + d.id;
        })
        .attr("from", function (d) {
            return d.from;
        })
        .attr("to", function (d) {
            return d.to;
        })
        .attr("d", function (d) {
            var result1 = dbToWindow(d.leftXaxis, d.downYaxis);
            var result2 = dbToWindow(d.rightXaxis, d.upYaxis);
            if (!d.isDouble) {
                return dToStrig(result1[0], result2[0], result1[1], result2[1]);
            } else {
                return doubleDToStrig(result1[0], result2[0], result1[1], result2[1]);
            }
        })
        .attr("class", "clashLine")
        .attr("fill", "none")
        .attr("stroke", "#8a8a8a")
        .attr("stroke-width", "6.5px")
        .attr("style", function (d) {
            return "marker-end:url(#mar" + d.id + ");"
        });

    // conf.pathHome2.selectAll("path").data(data)
    //     .enter()
    //     .append("path")
    //     .attr("id", function (d) {
    //         return "w" + d.id;
    //     })
    //     .attr("from", function (d) {
    //         return d.from;
    //     })
    //     .attr("to", function (d) {
    //         return d.to;
    //     })
    //     .attr("d", function (d) {
    //         var result1 = dbToWindow(d.leftXaxis, d.downYaxis);
    //         var result2 = dbToWindow(d.rightXaxis, d.upYaxis);
    //         return dToStrig(result1[0], result2[0], result1[1], result2[1]);
    //     })
    //     .attr("class", "whiteLine")
    //     .attr("fill", "none")
    //     .attr("stroke", "#ffffff")
    //     .style("stroke-dasharray", "10, 7")
    //     .attr("stroke-width", "1px");

    show();

}