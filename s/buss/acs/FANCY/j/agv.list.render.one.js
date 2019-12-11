import { findIotInfo } from "/s/buss/acs/FANCY/j/iot.info.js";
import { agvNum } from "/s/buss/acs/FANCY/j/agv.list.js";

var numInLine = 1;

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
    } else if (agvinfo.sitestatus == "REVOLVE") {
        siteStatusVal += "旋转中";
    } else if (agvinfo.sitestatus == "STOP_WORK") {
        siteStatusVal += "停车工作";
    } else if (agvinfo.sitestatus == "WAIT") {
        siteStatusVal += "按钮确认";
    } else if (agvinfo.sitestatus == "PI") {
        siteStatusVal += "交管中";
    }
    val.siteStatusVal = "站点状态:" + siteStatusVal;

    var taskStatusVal = "";
    var colorStyle = "";
    var json = "";
    var target = "";
    var remark = "";
    if (agvinfo.json) {
        json = JSON.parse(agvinfo.json);
        if (json) {
            target = json.TO;
            remark = json.REMARK;
        }
    }
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
    } else if (agvinfo.taskstatus == "FETCH") {
        taskStatusVal += "取货";
        colorStyle = "gray";
    } else if (agvinfo.taskstatus == "GOTO_CHARGE" || agvinfo.taskstatus == "BACK_CHARGE") {
        var chargeInfo = "";
        if (localStorage.projectKey == 'CSY_DAJ') {
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
        }
        if (agvinfo.taskstatus == "GOTO_CHARGE") {
            taskStatusVal += "前往充电" + chargeInfo;
        } else {
            taskStatusVal += "停止充电返回" + chargeInfo;
        }
        colorStyle = "#D24D57";
    } else {
        taskStatusVal += agvinfo.taskstatus;
    }
    if (agvinfo.agvstatus == "未连接") {
        colorStyle = "#D0D0D0";
    }
    val.colorStyle = colorStyle;
    val.taskStatusVal = "任务状态:" + taskStatusVal + ((agvinfo.taskstatus != "FREE" && target) ? "-" + target : "") + "<br/>"
        + (agvinfo.taskexesid ? agvinfo.taskexesid : (agvinfo.taskstatus == "FREE" || (agvinfo.taskstatus == "GOTO_CHARGE" && agvinfo.sitestatus == "CHARGING") ? "" : "阻塞中"));
    val.currentsite = "当前站点:" + (agvinfo.currentsite ? agvinfo.currentsite : "");
    val.battery = "当前电压:" + (agvinfo.battery ? agvinfo.battery : "");
    val.speed = "当前速度(%):" + (agvinfo.speed ? agvinfo.speed : "");
    val.agvstatus = "AGV反馈状态:" + (agvinfo.agvstatus ? agvinfo.agvstatus : "");
    val.remark = (remark ? remark : "");

    if (localStorage.projectKey == 'TAIKAI_JY') {
        let temp = findIotInfo(agvinfo.id, "agvbusstype");
        if (temp == 'TON_1') { val.agvbusstype = "1吨车"; } else if (temp == 'TON_2') { val.agvbusstype = "2吨车"; }
    }

    return val;
}

export var renderList = function (agvs, agvDiv) {
    if (agvNum >= 6) numInLine = 3;
    var numOfRow = agvNum >= numInLine ? numInLine : agvNum;
    $.each(agvs, function (n, agvinfo) {
        renderOne(numOfRow, agvinfo, agvDiv);
    });
}

var renderOne = function (numOfRow, agvinfo, agvDiv) {
    var currentTable = `table.agv[data-area='${agvinfo.environment}']`;
    if ($(currentTable).length <= 0) {
        agvDiv.append(`<hr class='withBorder'/><table class='agv' 
        data-area='${agvinfo.environment}'><caption style='color:black'>
        ${agvinfo.environment == 1 ? "" : "二楼仓库AGV列表↓"}</caption></table>`);
    }

    var showVal = getShowVal(agvinfo);

    var relativeHD = localStorage.projectKey == 'CSY_DAJ' ?
        (`<tr><td colspan='2'>关联硬件状态:${agvinfo.plcstatus ? agvinfo.plcstatus : "正常"}</td></tr>`) : ``;
    var agvbusstype = localStorage.projectKey == 'TAIKAI_JY' ?
        (`<tr><td colspan='2'>车类型:${showVal.agvbusstype ? showVal.agvbusstype : "未知"}</td></tr>`) : ``;
    var siteStatusVal = ['CSY_DAJ', 'LAO_FOXCONN', 'TAIKAI_JY', 'LAO_DBWY'].indexOf(localStorage.projectKey) >= 0 ?
        `<tr><td>${showVal.siteStatusVal}</td><td>${showVal.currentsite}</td></tr>` : ``;

    var tmpStr = `<td class='agv'><div>
        <button id='${agvinfo.id}' style='background-color:${showVal.colorStyle};'>
        <table cellspacing='0px' cellspadding='2px'>
        <tr><td>${agvinfo.id}号AGV</td>
        <td>${showVal.moveStatusVal}</td></tr>${siteStatusVal}
        <tr><td>${showVal.battery}</td><td>${showVal.speed}</td></tr>
        <tr><td colspan='2'>${showVal.taskStatusVal}</td></tr>
        <tr><td colspan='2'>${showVal.agvstatus}</td></tr>
        <tr><td colspan='2'>${showVal.remark}</td></tr>
        ${relativeHD}${agvbusstype}</table></button>
        </div></td>`;

    if ($(currentTable).find("tr.agvTr:last").find("td.agv").length >= numOfRow
        || $(currentTable).find("tr.agvTr:last").length == 0) {
        $(currentTable).append("<tr class='agvTr'></tr>");
    }
    $(currentTable).find("tr.agvTr:last").append(tmpStr);
}