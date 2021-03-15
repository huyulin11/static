var legenddata = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '101', '102', '103', '104', '105', '106', '107'];//有待优化为通用功能
var xAxisdata = [];
var xAxis = 14;
var taskJsonData = [];
var data0 = [], data1 = [], data2 = [],
    data3 = [], data4 = [], data5 = [],
    data6 = [], data7 = [], data8 = [],
    data9 = [], data10 = [], data11 = [],
    data12 = [], data13 = [], data14 = [],
    data15 = [], data16 = [], data17 = [],
    data18 = [], data19 = [];
var loaded = false;

var selectArea = function (val) {
    xAxisdata = [];
    data0 = []; data1 = []; data2 = [];
    data3 = []; data4 = []; data5 = [];
    data6 = []; data7 = []; data8 = [];
    data9 = []; data10 = []; data11 = [];
    data12 = []; data13 = []; data14 = [];
    data15 = []; data16 = []; data17 = [];
    data18 = [], data19 = [];
    var notask = true;
    var curDate = new Date();
    curDate = curDate.getTime() - (val - 1) * 24 * 60 * 60 * 1000;
    curDate = new Date(curDate);
    for (var i = 0; i < val; i++) {
        date = curDate.format("yyyyMMdd");
        for (var value of taskJsonData) {
            if (value.key === date) {
                var tasks = JSON.parse(value.value);
                var isNull = function (key, data) {
                    key ? data.push(key) : data.push(0);
                }
                isNull(tasks[1], data0); isNull(tasks[2], data1); isNull(tasks[3], data2);
                isNull(tasks[4], data3); isNull(tasks[5], data4); isNull(tasks[6], data5);
                isNull(tasks[7], data6); isNull(tasks[8], data7); isNull(tasks[9], data8);
                isNull(tasks[10], data9); isNull(tasks[11], data10); isNull(tasks[12], data11);
                isNull(tasks[101], data12); isNull(tasks[102], data13); isNull(tasks[103], data14);
                isNull(tasks[104], data15); isNull(tasks[105], data16); isNull(tasks[106], data17);
                isNull(tasks[107], data18);
                notask = false;
                break;
            }
        }
        if (notask) {
            data0.push(0); data1.push(0); data2.push(0);
            data3.push(0); data4.push(0); data5.push(0);
            data6.push(0); data7.push(0); data8.push(0);
            data9.push(0); data10.push(0); data11.push(0);
            data12.push(0); data13.push(0); data14.push(0);
            data15.push(0); data16.push(0); data17.push(0);
            data18.push(0);
        }
        xAxisdata.push(date);
        data19.push(0);
        notask = true;
        curDate = curDate.getTime() + 24 * 60 * 60 * 1000;
        curDate = new Date(curDate);
    }
    if (loaded) {
        option["xAxis"][0]["data"] = xAxisdata;
        series[0]["data"] = data0; series[1]["data"] = data1; series[2]["data"] = data2;
        series[3]["data"] = data3; series[4]["data"] = data4; series[5]["data"] = data5;
        series[6]["data"] = data6; series[7]["data"] = data7; series[8]["data"] = data8;
        series[9]["data"] = data9; series[10]["data"] = data10; series[11]["data"] = data11;
        series[12]["data"] = data12; series[13]["data"] = data13; series[14]["data"] = data14;
        series[15]["data"] = data15; series[16]["data"] = data16; series[17]["data"] = data17;
        series[18]["data"] = data18; series[19]["data"] = data19;
        fresh();
    }
}

var taskQuantity = function () {
    $.ajax({
        url: "/s/jsons/" + localStorage.projectKey + "/taskQuantity.json",
        type: "get",
        async: false,
        dataType: "json",
        cache: false,
        success: function (data) {
            taskJsonData = data;
            selectArea(xAxis);
        }
    });
}

$("#selectArea").change(function () {
    xAxis = $(this).val()
    selectArea(xAxis);
});

taskQuantity();
setInterval(taskQuantity, 60 * 1000);