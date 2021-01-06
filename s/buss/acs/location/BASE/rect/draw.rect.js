import { conf } from "/s/buss/acs/location/BASE/location.conf.js";
import { xnumToWindow, ynumToWindow } from "/s/buss/acs/location/BASE/render/trans.location.js";

export var drawRect = function (rectdata) {
    if (rectdata.length > 0) {
        conf.rectHome.selectAll("rect").data(rectdata)
            .enter()
            .append("rect")
            .attr('x', function (d) {
                return xnumToWindow(d.x);
            })
            .attr('y', function (d) {
                return ynumToWindow(d.y);
            })
            .attr('id', function (d) {
                return 'rect' + d.id;
            })
            .attr('width', function (d) {
                return d.width;
            })
            .attr('height', function (d) {
                return d.height;
            })
            .attr('fill', '#e0e053')
            .attr('stroke', 'orange')
            .attr('stroke-width', 3)
            .attr('opacity',0.5)
    }
}