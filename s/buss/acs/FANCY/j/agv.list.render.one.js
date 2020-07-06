import { findIotInfo } from "/s/buss/acs/FANCY/j/iot.info.js";
import { agvNum } from "/s/buss/acs/FANCY/j/agv.list.js";

var numInLine = 1;
let showPlcstatus = ['CSY_DAJ'].includes(localStorage.projectKey);
let showAgvbusstype = ['TAIKAI_JY'].includes(localStorage.projectKey);
let showSiteStatusVal = ['CSY_DAJ', 'LAO_FOXCONN', 'TAIKAI_JY', 'LAO_DBWY'].includes(localStorage.projectKey);
let showBattery = !['YZBD_QSKJ', 'YZBD_NRDW'].includes(localStorage.projectKey);
let showSpeed = !['YZBD_QSKJ', 'YZBD_NRDW'].includes(localStorage.projectKey);

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
        agvDiv.append(`<table class='agv' data-area='${agvinfo.environment}'></table>`);
    }

    var showVal = getShowVal(agvinfo);

    var relativeHD = showPlcstatus ? (`<tr><td colspan='2'>关联硬件状态:${agvinfo.plcstatus ? agvinfo.plcstatus : "正常"}</td></tr>`) : ``;
    var agvbusstype = showAgvbusstype ? (`<tr><td colspan='2'>车类型:${showVal.agvbusstype ? showVal.agvbusstype : "未知"}</td></tr>`) : ``;
    var siteStatusVal = showSiteStatusVal ? `<tr><td>${showVal.siteStatusVal}</td><td>${showVal.currentsite}</td></tr>` : ``;
    var batteryDes = showBattery ? `<td>${showVal.battery}</td>` : ``;
    var speedDes = showSpeed ? `<td>${showVal.speed}</td>` : ``;

    let name = findIotInfo(agvinfo.id, "name");
    var tmpStr = `<td class='agv'><div>
    <button id='${agvinfo.id}' style='background-color:${showVal.colorStyle};'>
        <table cellspacing='0px' cellspadding='2px'>
        <tr><td>${name}</td><td>${showVal.moveStatusVal}</td></tr>
        ${siteStatusVal}
        <tr>${batteryDes}${speedDes}</tr>
        <tr><td colspan='2'>${showVal.taskStatusVal}</td></tr>
        <tr><td colspan='2'>${showVal.agvstatus}</td></tr>
        <tr><td colspan='2'>${showVal.remark}</td></tr>
        ${relativeHD}
        ${agvbusstype}
        </table></button>
        </div></td>`;

    if ($(currentTable).find("tr.agvTr:last").find("td.agv").length >= numOfRow
        || $(currentTable).find("tr.agvTr:last").length == 0) {
        $(currentTable).append("<tr class='agvTr'></tr>");
    }
    $(currentTable).find("tr.agvTr:last").append(tmpStr);
}

var getShowVal = function (agvinfo) {
    var val = new Object();
    val.moveStatusVal = "行驶状态:" + movestatus(agvinfo.movestatus);
    val.siteStatusVal = "站点状态:" + sitestatus(agvinfo.sitestatus);

    val.colorStyle = colorStyle(agvinfo);
    var target = agvinfo.taskstatus != "FREE" ? targetV(agvinfo) : "";
    let shortLength = 20;
    let shortTarget = target.length > shortLength ? (target.substr(0, shortLength) + "...") : target;
    shortTarget = shortTarget ? "（" + shortTarget + "）" : "";
    target = `<span title='${target}'>${shortTarget}</span>`;
    let taskDesc = agvinfo.taskexesid ? agvinfo.taskexesid :
        (agvinfo.taskstatus == "FREE" || (agvinfo.taskstatus == "GOTO_CHARGE" && agvinfo.sitestatus == "CHARGING") ? "" : "阻塞中");
    val.taskStatusVal = "任务状态:" + taskstatus(agvinfo) + target + "<br/>" + taskDesc;
    val.currentsite = "站点:" + (agvinfo.currentsite ? agvinfo.currentsite : "");
    val.battery = "电量:" + (agvinfo.battery ? agvinfo.battery : "");
    val.speed = "速度:" + (agvinfo.speed != undefined ? agvinfo.speed : "");
    if (agvinfo.id == 2) console.log(agvinfo.speed)
    val.agvstatus = "AGV反馈状态:" + (agvinfo.agvstatus ? agvinfo.agvstatus : "");

    if (localStorage.projectKey == 'TAIKAI_JY') {
        let temp = findIotInfo(agvinfo.id, "agvbusstype");
        if (temp == 'TON_1') { val.agvbusstype = "1吨车"; } else if (temp == 'TON_2') { val.agvbusstype = "2吨车"; }
    }

    return val;
}

let targetV = (agvinfo) => {
    if (!agvinfo.json) {
        return "";
    }
    var json = JSON.parse(agvinfo.json);
    if (!json) {
        return "";
    }
    var target = "";
    target = json.to;
    try {
        let targetJson = target;
        if (typeof target == 'string') {
            targetJson = JSON.parse(target);
        }
        if (targetJson instanceof Array) {
            let showTarget = [];
            for (let i of targetJson) {
                showTarget.push(i.id);
            }
            target = showTarget.join("、");
        } else if (targetJson instanceof Object) {
            target = targetJson.id;
        }
    } catch (error) {
    }
    return target ? target : "";
}

let taskstatus = (agvinfo) => {
    var taskStatusVal = "";
    if (agvinfo.taskstatus == "FREE") {
        taskStatusVal += "空闲";
    } else if (agvinfo.taskstatus == "GOTO_INIT") {
        taskStatusVal += "返回起点";
    } else if (agvinfo.taskstatus == "RECEIPT") {
        taskStatusVal += "入库";
    } else if (agvinfo.taskstatus == "SHIPMENT") {
        taskStatusVal += "出库";
    } else if (agvinfo.taskstatus == "INVENTORY") {
        taskStatusVal += "盘点";
    } else if (agvinfo.taskstatus == "TRANSPORT") {
        taskStatusVal += "运输";
    } else if (agvinfo.taskstatus == "DELIVER") {
        taskStatusVal += "送货";
    } else if (agvinfo.taskstatus == "FETCH") {
        taskStatusVal += "取货";
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
    } else {
        taskStatusVal += agvinfo.taskstatus;
    }
    return taskStatusVal;
}

let colorStyle = (agvinfo) => {
    if (agvinfo.taskstatus == "FREE") {
        return null;
    }
    if (agvinfo.agvstatus == "未连接") {
        return "#D0D0D0";
    }
    if (agvinfo.inCharging || agvinfo.taskstatus == "GOTO_CHARGE" || agvinfo.taskstatus == "BACK_CHARGE") {
        return "#D24D57";
    }
    if (agvinfo.taskstatus == "GOTO_INIT") {
        return "green";
    }
    return "gray";
}

let movestatus = (movestatus) => {
    if (movestatus == "CONTINUE") {
        return "启";
    } else if (movestatus == "PAUSE_SYS") {
        return "交管自停";
    } else if (movestatus == "PAUSE_SELF") {
        return "路口自停";
    } else if (movestatus == "PAUSE_OUT_ERR") {
        return "脱轨错停";
    } else if (movestatus == "PAUSE_REPATH_ERR") {
        return "规划错停";
    } else if (movestatus == "PAUSE_CACHE_ERR") {
        return "缓存错停";
    } else if (movestatus == "PAUSE_USER") {
        return "手停";
    }
    return movestatus;
}

let sitestatus = (sitestatus) => {
    if (sitestatus == "INIT") {
        return "初始站点";
    } else if (sitestatus == "MOVING") {
        return "行驶中";
    } else if (sitestatus == "WINDOW_GET") {
        return "窗口获取档案";
    } else if (sitestatus == "ALLOC_STOCK") {
        return "货位放货";
    } else if (sitestatus == "WINDOW_STOCK") {
        return "窗口放货";
    } else if (sitestatus == "ALLOC_SCAN") {
        return "窗口扫描";
    } else if (sitestatus == "ALLOC_GET") {
        return "货位取货";
    } else if (sitestatus == "CHARGING") {
        return "正在充电";
    } else if (sitestatus == "WAITING_AUTODOOR") {
        return "等待自动门";
    } else if (sitestatus == "WAITING_LIFT") {
        return "等待电梯";
    } else if (sitestatus == "HOOK_UP") {
        return "挂钩升起";
    } else if (sitestatus == "HOOK_DOWN") {
        return "挂钩下降";
    } else if (sitestatus == "REVOLVE") {
        return "旋转中";
    } else if (sitestatus == "STOP_WORK") {
        return "停车工作";
    } else if (sitestatus == "WAIT") {
        return "按钮确认";
    } else if (sitestatus == "PI") {
        return "交管中";
    }
    return sitestatus;
}