import { conf } from "/s/buss/acs/location/BASE/location.conf.js";
import { datas } from "/s/buss/acs/location/BASE/location.data.js";

datas.init();

conf.domainYVal = [-1700, 100];
conf.domainXVal = [-100, 3000];
conf.xScale = d3.scaleLinear().domain(conf.domainXVal).range([0, conf.xAxisWidth]);
conf.yScale = d3.scaleLinear().domain(conf.domainYVal).range([0, conf.yAxisWidth]);
conf.xReScale = d3.scaleLinear().domain([0, conf.xAxisWidth]).range(conf.domainXVal);
conf.yReScale = d3.scaleLinear().domain([0, conf.yAxisWidth]).range(conf.domainYVal);