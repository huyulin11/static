var legenddata = ['入库', '出库', '盘点', '充电'];
var xAxisdata = [];
var xAxis = 14;
var taskJsonData = [];
var data0 = [];
var data1 = [];
var data2 = [];
var data3 = [];
var data4 = [];
var loaded = false;

var selectArea = function (val) {
    xAxisdata = [];
    data0 = [];
    data1 = [];
    data2 = [];
    data3 = [];
    data4 = [];
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
                isNull(tasks.RECEIPT, data0);
                isNull(tasks.SHIPMENT, data1);
                isNull(tasks.INVENTORY, data2);
                isNull(tasks.GOTO_CHARGE, data3);
                notask = false;
                break;
            }
        }
        if (notask) {
            data0.push(0);
            data1.push(0);
            data2.push(0);
            data3.push(0);
        }
        xAxisdata.push(date);
        data4.push(0);
        notask = true;
        curDate = curDate.getTime() + 24 * 60 * 60 * 1000;
        curDate = new Date(curDate);
    }
    if (loaded) {
        option["xAxis"][0]["data"] = xAxisdata;
        series[0]["data"] = data0;
        series[1]["data"] = data1;
        series[2]["data"] = data2;
        series[3]["data"] = data3;
        series[4]["data"] = data4;
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