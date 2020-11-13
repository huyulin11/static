import { taskSiteLogic, taskSiteLocation } from "/s/buss/acs/FANCY/j/acs.site.info.js";
import { gv } from "/s/buss/g/j/g.v.js";
import { go } from "/s/buss/g/j/g.o.js";

var dom = document.getElementById("container");
var myChart = echarts.init(dom);
var app = {};
var option = null;
var initDatas = (sitedatas) => {
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
                // links: [],
                links: [{
                    source: 0,
                    target: 1,
                    symbolSize: [5, 20],
                    label: {
                        show: true
                    },
                    lineStyle: {
                        width: 5,
                        curveness: 0.2
                    }
                }, {
                    source: '站点2',
                    target: '站点1',
                    label: {
                        show: true
                    },
                    lineStyle: {
                        curveness: 0.2
                    }
                }, {
                    source: '站点1',
                    target: '站点3',
                    label: {
                        show: true
                    },
                }, {
                    source: '站点2',
                    target: '站点3'
                }, {
                    source: '站点2',
                    target: '站点4'
                }, {
                    source: '站点1',
                    target: '站点4'
                }],
                lineStyle: {
                    opacity: 0.9,
                    width: 2,
                    curveness: 0
                }
            }
        ]
    };
};
gv.getSite(function (datas) {
    console.log(datas);
    let newDatas = go.transList(datas, o => {
        return { name: o.id, x: Math.random() * 2100, y: Math.random() * 1500 };
    });
    initDatas(newDatas);
    if (option && typeof option === "object") {
        myChart.setOption(option, true);
    }
});