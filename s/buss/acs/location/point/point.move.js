import { conf } from "/s/buss/acs/location/location.conf.js";


export default {
    move() {
        var id = d3.select(this).attr("id");
        var delPath = conf.svg.selectAll(".clashLine")
            .filter(function (e) { return e && e.from == id; });
        delPath.attr('id', function (d) {
            delPath.attr("stroke", "#FF5722");
            d3.select("#mar" + d.id).select("path").attr("fill", "#FF5722");
            return "p" + d.id;
        });
    },
    out() {
        var id = d3.select(this).attr("id");
        var delPath = conf.svg.selectAll(".clashLine")
            .filter(function (e) { return e && e.from == id; });
        var id = [];
        delPath.attr('id', function (d) {
            var color = d.side == 2 ? "#113a7394" : "#1b81d6b3";
            id.push({ "id": d.id, "color": color });
            return "p" + d.id;
        });
        for (var i of id) {
            console.log(i);
            d3.select("#p" + i.id).attr("stroke", i.color);
            d3.select("#mar" + i.id).select("path").attr("fill", i.color);
        }
    }
}