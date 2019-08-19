var dom = document.getElementById("container");
var myChart = echarts.init(dom);
option = null;
var currentType = "bar";
var d = [0, 1, 2, 3, 4];
var loaded = true;

var typeAndData = function () {

}

var option = {
    title: {
        text: '档案局每日任务量( 次 )',
        top: '10px',
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    toolbox: {
        feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ['line', 'bar'] },
            restore: { show: true },
            saveAsImage: { show: true }
        }
    },
    legend: {
        data: legenddata
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: [
        {
            type: 'category',
            data: xAxisdata
        }
    ],
    yAxis: [
        {
            type: 'value'
        }
    ],
    textStyle: [

    ],
    series: [
        {
            name: legenddata[0],
            type: 'bar',
            stack: '数量',
            data: data0
        },
        {
            name: legenddata[1],
            type: 'bar',
            stack: '数量',
            data: data1
        },
        {
            name: legenddata[2],
            type: 'bar',
            stack: '数量',
            data: data2
        },
        {
            name: legenddata[3],
            type: 'bar',
            stack: '数量',
            data: data3
        },
        {
            name: ' 其 他 ',
            type: 'bar',
            stack: '数量',
            label: {
                normal: {
                    show: true,
                    position: 'top',
                    textStyle: {
                        color: '#888'
                    },
                    formatter: ''
                }
            },
            data: data4    //思路一：给series集合末尾多加一栏用于展示合计，但是值都是0；缺点：必须根据xAxis的data生成一组为空的数据，且tooltip不能加trigger: 'axis',这个条件，不然会展示合计：0
        }
    ]
};

var series = option["series"];
var fun = function (params) {
    var data = 0;
    for (var i = 0; i < series.length - 1; i++) {
        data += series[i].data[params.dataIndex];
    }
    return data
}
//加载页面时候替换最后一个series的formatter
series[series.length - 1]["label"]["normal"]["formatter"] = fun

if (option && typeof option === "object") {
    myChart.setOption(option, false);
}

var fresh = function () {
    var fun1 = function (params) {
        var data = 0;
        for (var i = 0; i < d.length; i++) {
            for (var j = 0; j < series.length; j++) {
                if (d[i] == j) {
                    data += series[j].data[params.dataIndex]; //重新计算总和
                }
            }
        }
        return data
    }
    series[series.length - 1]["label"]["normal"]["formatter"] = fun1
    for (var i = 0; i < series.length; i++) {
        if (currentType === "line") {
            series[i]["type"] = "line";
        } else if (currentType === "bar") {
            series[i]["type"] = "bar";
        }
    }
    myChart.setOption(option, false);
}

//legend点击事件，根据传过来的obj.selected得到状态是true的legend对应的series的下标，再去计算总和
myChart.on("legendselectchanged", function (obj) {
    var b = obj.selected;
    d = [];
    for (var key in b) {
        if (b[key]) {
            for (var i = 0; i < series.length; i++) {
                var changename = series[i]["name"];
                if (changename == key) {
                    d.push(i);//得到状态是true的legend对应的series的下标
                }
            }
        }
    }
    fresh();
});

myChart.on('magictypechanged', function (param) {
    if (param.currentType === "line") {
        currentType = "line";
    } else if (param.currentType === "bar") {
        currentType = "bar";
    }
});

$("#themeArea").click(function () {
    var val = $('input:radio[name="theme"]:checked').val();
    if (val == null) {
        return false;
    } else {
        myChart.dispose();
        myChart = echarts.init(document.getElementById('container'), val);
        myChart.setOption(option);
    }
});