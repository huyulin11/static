import { conf } from "/s/buss/acs/location/location.conf.js";
import { tool } from "/s/buss/acs/location/location.tool.js";
import { pathTool } from "/s/buss/acs/location/path/path.tool.js";

export var drawPath = function (data) {
    conf.pathHome1.selectAll("path").data(data)
        .enter().append("path")
        .attr("id", function (d) {
            return 'p' + d.id;
        })
        .attr("class", "clashLine")
        .attr("from", function (d) {
            return d.from;
        }).attr("to", function (d) {
            return d.to;
        }).attr("d", function (d) {
            var result1 = tool.dbToWindow(d.leftXaxis, d.downYaxis);
            var result2 = tool.dbToWindow(d.rightXaxis, d.upYaxis);
            if (!d.isDouble) {
                return pathTool.dPath(result1[0], result2[0], result1[1], result2[1]);
            } else {
                return pathTool.dDoublePath(result1[0], result2[0], result1[1], result2[1]);
            }
        })
        .attr("fill", "none")
        .attr("stroke", "#8a8a8a")
        .attr("stroke-width", function () {
            return localStorage.pathwidth;
        }).attr("style", function (d) {
            return "marker-end:url(#mar" + d.id + ");";
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
    //         return pathTool.dPath(result1[0], result2[0], result1[1], result2[1]);
    //     })
    //     .attr("class", "whiteLine")
    //     .attr("fill", "none")
    //     .attr("stroke", "#ffffff")
    //     .style("stroke-dasharray", "10, 7")
    //     .attr("stroke-width", "1px");
}

export var addPath = function (siteid, nextid, x1, x2, y1, y2) {
    conf.pathHome1.append("path")
        .attr("id", "p" + siteid + nextid)
        .attr("class", "clashLine")
        .attr("from", siteid)
        .attr("to", nextid)
        .attr("d", pathTool.dPath(x1, x2, y1, y2))
        .attr("fill", "none")
        .attr("stroke", "#8a8a8a")
        .attr("stroke-width", function () { return localStorage.pathwidth })
        .attr("style", function (d) {
            return "marker-end:url(#mar" + siteid + nextid + ");"
        });
}