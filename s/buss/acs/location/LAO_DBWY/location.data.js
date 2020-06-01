(function () {
    var getLatestMsg = function () {
        jQuery.ajax({
            url: "/json/open/yufeng/getLatestMsg.shtml",
            type: "post",
            dataType: "json",
            success: function (data) {
                if (data == null) {
                    return;
                }
                for (var a in data) {
                    if (data[a] == null) {
                        continue;
                    }
                    getAgvInfo(data[a]);
                    var arr;
                    if (!datasetMap[a]) {
                        arr = [];
                    } else {
                        arr = datasetMap[a];
                    }
                    if (data[a].x != null && data[a].y != null) {
                        arr.push([data[a].x, data[a].y]);
                    }
                    datasetMap[a] = arr;

                    var arrDeta;
                    if (!datasetDetaMap[a]) {
                        arrDeta = [];
                    } else {
                        arrDeta = datasetDetaMap[a];
                    }
                    if (data[a].x != null && data[a].y != null) {
                        if (a > 3 && data[a].x == 0 && data[a].y == 0) {
                            arrDeta.push(testInitPoint[a]);;
                        } else {
                            arrDeta.push([data[a].x, data[a].y]);
                        }
                    }
                    datasetDetaMap[a] = arrDeta;
                }
            },
            complete: function (data) {
            },
            error: function (e) {
                console.log("数据中断，稍后重试！");
            },
            timeout: 5000
        });
    };

    var task = function (thisTask, thisSpeed) {
        if (thisTask == "0") { if (thisSpeed == '0') { return "停车"; } return "正在运行"; }
        if (thisTask == "1") { return "待上货"; }
        if (thisTask == "2") { return "待卸货"; }
        return "无";
    }

    var error = function (thisError) {
        $("div#agvs").css("background", "red");
        if (thisError == "1") { return "有障碍物"; }
        if (thisError == "2") { return "GPS无差分信号"; }
        $("div#agvs").css("background", "rgba(137, 168, 196, 0.3)");
        return "无";
    }

    var getAgvInfo = function (data) {
        if (data) {
            $("div#agvs").html("");
            $("div#agvs").append(
                "车辆状态：" + task(data.task, data.speed) + "<br/>" +
                "电量：" + data.battery + "<br/>" +
                "速度：" + data.speed + "<br/>" +
                "错误：" + error(data.error) + "<br/>" +
                "坐标：(" + data.y / 1000000 + "," + data.x / 1000000 + ")<br/>" +
                "是否授权：" + (data.taskIsfinished == "0" ? "是" : "否") + "<br/>");
        }
    }

    var getTaskPathData = function () {
        jQuery.ajax({
            url: "/json/data/getTaskPathData.shtml?received=" + receivedTaskData,
            type: "post",
            dataType: "json",
            success: function (data) {
                if (data.code) {
                    if (data.code == -2) {
                        datasetMap[9999] = [];
                        receivedTaskData = "false";
                        return;
                    } else if (data.code == -1) {
                        return;
                    }
                }
                if (data == null) {
                    return;
                }
                for (var a in data) {
                    var arr;
                    if (!datasetMap[9999]) {
                        arr = [];
                    } else {
                        arr = datasetMap[9999];
                    }
                    for (var v in data[a]) {
                        if (data[a][v].x != null && data[a][v].y != null) {
                            arr.push([data[a][v].x, data[a][v].y]);
                        }
                        datasetMap[9999] = arr;
                    }
                }
                receivedTaskData = "true";
            },
            complete: function (data) {
            },
            error: function (e) {
                console.log("数据中断，稍后重试！");
            },
            timeout: 5000
        });
    };

    var getClashArea = function () {
        jQuery.ajax({
            url: "/json/data/getClashArea.shtml",
            type: "post",
            dataType: "json",
            success: function (data) {
                if (data == null) {
                    return;
                }
                clashArea = data;
            },
            timeout: 5000
        });
    };

    //setInterval(getLatestMsg, 500);
    //setInterval(getTaskPathData, 2000);
    // setInterval(getClashArea, 2000);

})(jQuery);
