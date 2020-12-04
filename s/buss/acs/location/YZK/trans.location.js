import { conf } from "/s/buss/acs/location/BASE/location.conf.js";

conf.xReScale = d3.scaleLinear().domain([0, conf.xAxisWidth]).range(conf.domainXVal);
conf.yReScale = d3.scaleLinear().domain([0, conf.yAxisWidth]).range(conf.domainYVal);

export var windowToDB = function (id, x, y) {
    var ids = parseInt(id);
    var x1 = conf.xReScale(x - conf.padding.left);
    var y1 = conf.yReScale(conf.height - conf.padding.bottom - y);
    var result = { "id": ids, "x": x1, "y": y1 };
    console.log(result);
    return result;
}

conf.xScale = d3.scaleLinear().domain(conf.domainXVal).range([0, conf.xAxisWidth]);
conf.yScale = d3.scaleLinear().domain(conf.domainYVal).range([0, conf.yAxisWidth]);

export var dbToWindow = function (x1,y1) {
    var x = conf.padding.left + conf.xScale(x1);
    var y = conf.height - conf.padding.bottom - conf.yScale(y1);
    var result = [x,y];
    return  result;
}
