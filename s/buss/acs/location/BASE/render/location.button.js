import { gfbtn } from "/s/buss/g/j/g.f.btn.js";
import { datas } from "/s/buss/acs/location/BASE/location.data.js";
import { conf } from "/s/buss/acs/location/BASE/location.conf.js";

var flag = false;
export let tempBtns = [{
    id: "show", name: "隐藏", class: "btn-show",
    bind: function () {
        flag = !flag;
        if (flag) {
            hide();
            d3.select(".doc-buttons").select("#show").text("显示");
            return !flag;
        };
        show();
        d3.select(".doc-buttons").select("#show").text("隐藏");
        return !flag;
    }
}];

export var hide = function () {
    conf.svg.selectAll("text").remove();
}

export var show = function () {
    datas.init()
    conf.textHome.selectAll("text")
        .data(datas.lastTaskPath.concat(datas.udfPoints))
        .attr("id", function (d) {
            var id = 't' + d[0];
            return id;
        })
        .attr("x", function (d) {
            return conf.padding.left + conf.xScale(d[1]) + 7;
        })
        .attr("y", function (d) {
            return conf.height - conf.padding.bottom - conf.yScale(d[2]) - 7;
        })
        .attr("stroke", "black")
        .attr("font-size", "15px")
        .attr("font-family", "sans-serif")
        .text(function (d) {
            return d[0];
        })
        .enter()
        .append("text")
        .attr("id", function (d) {
            var id = 't' + d[0];
            return id;
        })
        .attr("x", function (d) {
            return conf.padding.left + conf.xScale(d[1]) + 7;
        })
        .attr("y", function (d) {
            return conf.height - conf.padding.bottom - conf.yScale(d[2]) - 7;
        })
        .attr("stroke", "black")
        .attr("font-size", "15px")
        .attr("font-family", "sans-serif")
        .text(function (d) {
            return d[0];
        });
}

gfbtn.bindByRes("div.doc-buttons", tempBtns);