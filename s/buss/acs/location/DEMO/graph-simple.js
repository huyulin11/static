import { taskSiteLogic, taskSiteLocation } from "/s/buss/acs/FANCY/j/acs.site.info.js";
import { gv } from "/s/buss/g/j/g.v.js";
import { go } from "/s/buss/g/j/g.o.js";

var dom = document.getElementById("container");
var myChart = echarts.init(dom);
var app = {};
var option = null;
var renderChart = (sitedatas, logicdatas) => {
    option = {
        title: {
            text: 'Graph 简单示例'
        },
        tooltip: {},
        animationDurationUpdate: 1500,
        animationEasingUpdate: 'quinticInOut',
        series: [
            {
                type: 'graph',
                layout: 'none',
                symbolSize: 15,
                roam: true,
                label: {
                    show: true
                },
                edgeSymbol: ['circle', 'arrow'],
                edgeSymbolSize: [4, 10],
                edgeLabel: {
                    fontSize: 20
                },
                data: sitedatas,
                links: logicdatas,
                lineStyle: {
                    opacity: 0.9,
                    width: 2,
                    curveness: 0
                }
            }
        ]
    };
    if (option && typeof option === "object") {
        myChart.setOption(option, true);
    }
};
let renderBySites = (datas) => {
    taskSiteLocation((locations) => {
        datas.map((site) => {
            let arr = locations.filter((location) => {
                return location.id == site.id;
            });
            return Object.assign(site, arr[0]);
        });
        console.log(datas);
        let newDatas = go.transList(datas, o => {
            return { name: o.id, x: o.x | 0, y: o.y | 0 };
        });
        taskSiteLogic(function (logics) {
            let newLogics = go.transList(logics, o => {
                return { source: o.siteid, target: o.nextid };
            });
            renderChart(newDatas, newLogics);
        });
    });
};
gv.getSite(function (datas) {
    renderBySites(datas);
});