
var numInLine = 2;

var getShowVal = function (agvinfo) {
    var val = new Object();
    var moveStatusVal = "";
    if (agvinfo.movestatus == "CONTINUE") {
        moveStatusVal += "启";
    } else if (agvinfo.movestatus == "PAUSE_SYS") {
        moveStatusVal += "交管自停";
    } else if (agvinfo.movestatus == "PAUSE_SELF") {
        moveStatusVal += "路口自停";
    } else if (agvinfo.movestatus == "PAUSE_OUT_ERR") {
        moveStatusVal += "脱轨错停";
    } else if (agvinfo.movestatus == "PAUSE_REPATH_ERR") {
        moveStatusVal += "规划错停";
    } else if (agvinfo.movestatus == "PAUSE_CACHE_ERR") {
        moveStatusVal += "缓存错停";
    } else if (agvinfo.movestatus == "PAUSE_USER") {
        moveStatusVal += "手停";
    }
    val.moveStatusVal = "行驶状态:" + moveStatusVal;

    var siteStatusVal = "";
    if (agvinfo.sitestatus == "INIT") {
        siteStatusVal += "初始站点";
    } else if (agvinfo.sitestatus == "MOVING") {
        siteStatusVal += "行驶中";
    } else if (agvinfo.sitestatus == "WINDOW_GET") {
        siteStatusVal += "窗口获取档案";
    } else if (agvinfo.sitestatus == "ALLOC_STOCK") {
        siteStatusVal += "货位放货";
    } else if (agvinfo.sitestatus == "WINDOW_STOCK") {
        siteStatusVal += "窗口放货";
    } else if (agvinfo.sitestatus == "ALLOC_SCAN") {
        siteStatusVal += "窗口扫描";
    } else if (agvinfo.sitestatus == "ALLOC_GET") {
        siteStatusVal += "货位取货";
    } else if (agvinfo.sitestatus == "CHARGING") {
        siteStatusVal += "正在充电";
    } else if (agvinfo.sitestatus == "WAITING_AUTODOOR") {
        siteStatusVal += "等待自动门";
    } else if (agvinfo.sitestatus == "WAITING_LIFT") {
        siteStatusVal += "等待电梯";
    } else if (agvinfo.sitestatus == "HOOK_UP") {
        siteStatusVal += "挂钩升起";
    } else if (agvinfo.sitestatus == "HOOK_DOWN") {
        siteStatusVal += "挂钩下降";
    }
    val.siteStatusVal = "站点状态:" + siteStatusVal;

    var taskStatusVal = "";
    var colorStyle = "";
    if (agvinfo.taskstatus == "FREE") {
        taskStatusVal += "空闲";
    } else if (agvinfo.taskstatus == "GOTO_INIT") {
        taskStatusVal += "返回起点";
        colorStyle = "green";
    } else if (agvinfo.taskstatus == "RECEIPT") {
        taskStatusVal += "入库";
        colorStyle = "gray";
    } else if (agvinfo.taskstatus == "SHIPMENT") {
        taskStatusVal += "出库";
        colorStyle = "gray";
    } else if (agvinfo.taskstatus == "INVENTORY") {
        taskStatusVal += "盘点";
        colorStyle = "gray";
    } else if (agvinfo.taskstatus == "TRANSPORT") {
        taskStatusVal += "运输";
        colorStyle = "gray";
    } else if (agvinfo.taskstatus == "DELIVER") {
        taskStatusVal += "送货";
        colorStyle = "gray";
    } else if (agvinfo.taskstatus == "GOTO_CHARGE" || agvinfo.taskstatus == "BACK_CHARGE") {
        var chargeInfo = "";
        if (agvinfo.chargeid) {
            if (agvinfo.chargeid == 13) {
                chargeInfo = "-1号充电站"
            } else if (agvinfo.chargeid == 14) {
                chargeInfo = "-2号充电站";
            } else if (agvinfo.chargeid == 0) {
                chargeInfo = "-暂未找到合适充电站";
            }
        } else if (agvinfo.chargeid == 0) {
            chargeInfo = "-暂未找到合适充电站";
        }
        if (agvinfo.taskstatus == "GOTO_CHARGE") {
            taskStatusVal += "前往充电" + chargeInfo;
        } else {
            taskStatusVal += "停止充电返回" + chargeInfo;
        }
        colorStyle = "red";
    } else {
        taskStatusVal += agvinfo.taskstatus;
    }
    val.colorStyle = "style='background-color:" + colorStyle + ";'";
    val.taskStatusVal = "任务状态:" + taskStatusVal + (agvinfo.taskexesid ? "<br/>" + agvinfo.taskexesid : "");
    val.currentsite = "当前站点:" + (agvinfo.currentsite ? agvinfo.currentsite : "");
    val.battery = "当前电压:" + (agvinfo.battery ? agvinfo.battery : "");
    val.speed = "当前速度(%):" + (agvinfo.speed ? agvinfo.speed : "");
    val.agvstatus = "AGV反馈状态:" + (agvinfo.agvstatus ? agvinfo.agvstatus : "");
    return val;
}

var renderList = function (agvs, agvDiv) {
    var dl = agvs.length;
    var numOfRow = dl >= numInLine ? numInLine : dl;
    $.each(agvs, function (n, agvinfo) {
        renderOne(numOfRow, agvinfo, agvDiv);
    });
}

var renderOne = function (numOfRow, agvinfo, agvDiv) {
    var currentTable = "table.agv[data-area='" + agvinfo.environment + "']";
    if ($(currentTable).length <= 0) {
        agvDiv.append("<hr class='withBorder'/>" +
            "<table class='agv' data-area='" + agvinfo.environment + "'><caption style='color:black'>"
            + (agvinfo.environment == 1 ? "AGV列表" : "二楼仓库AGV列表") + "↓" + "</caption></table>");
    }

    var showVal = getShowVal(agvinfo);

    var relativeHD = localStorage.projectKey == 'CSY_DAJ' ?
        ("<tr><td colspan='2'>" + "关联硬件状态:" + (agvinfo.plcstatus ? agvinfo.plcstatus : "正常") + "</td></tr>") : "";
    var tmpStr = "<td class='agv'>" + "<div>"
        + "<button id='" + agvinfo.id + "'" + showVal.colorStyle + ">" + "<table cellspacing='0px' cellspadding='2px'>"
        + "<tr><td>" + agvinfo.id + "号AGV" + "</td>" + "<td>" + showVal.moveStatusVal + "</td></tr>"
        + "<tr><td>" + showVal.siteStatusVal + "</td>" + "<td>" + showVal.currentsite + "</td></tr>"
        + "<tr><td>" + showVal.battery + "</td>" + "<td>" + showVal.speed + "</td></tr>"
        + "<tr><td colspan='2'>" + showVal.taskStatusVal + "</td></tr>"
        + "<tr><td colspan='2'>" + showVal.agvstatus + "</td></tr>"
        + relativeHD + "</table>" + "</button></div></td>";

    if ($(currentTable).find("tr.agvTr:last").find("td.agv").length >= numOfRow || $(currentTable).find("tr.agvTr:last").length == 0) {
        $(currentTable).append("<tr class='agvTr'></tr>");
    }
    $(currentTable).find("tr.agvTr:last").append(tmpStr);
}