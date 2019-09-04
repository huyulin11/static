import { currentAgvId } from '/s/buss/acs/FANCY/j/agv/agv.id.js';
var agvId = currentAgvId;

var _target;

var container = function () {
    if ($(_target).length == 0) {
        console.log("get " + _target + " err");
        return null;
    }
    return $(_target);
}

var doWork = taskname => {
    let addedData = "";
    if (taskname == 'SPEEDCTRL') addedData = "&speedctrl=" + $("#speedctrl").val();
    if (taskname == 'OBSTACLECTRL') addedData = "&channel=" + $("#channel").val();
    jQuery.ajax({
        url: "/de/acs/agv.shtml",
        type: "post",
        dataType: "json",
        data: $("#cacheform").serialize() + "&agvId=" + agvId + "&testtype=" + taskname + addedData,
        success: function (data) {
            alert(data);
            container().find("button").removeAttr("disabled");
        },
        error: function (e) {
            layer.msg("数据中断，请刷新界面或重新登录！");
            container().find("button").removeAttr("disabled");
        },
        timeout: 6000
    });
}

export var init = function (target) {
    _target = target;
    if (!container()) {
        alert("加载标签失败！");
        return;
    }
    let tasksiteStr = `<input type="text" class="form-control bigSearch" placeholder="请输入站点编号" name="tasksite" id="tasksite">`;
    let speedStr = `<input type="text" class="form-control bigSearch" placeholder="请输入速度百分比" name="speed" id="speed">`;
    let typeSelectStr = `<select id="type" name="type" data-key=1>
        <option value ="1">停车</option>
        <option value="2">左转</option>
        <option value ="3">右转</option>
        <option value ="4">变速</option></select > `;
    let cacheButtonStr = '<td><button id="DOCACHE">缓存指令</button></td>';

    let agvActions =
        [
            { id: 'CLEARCACHE', name: '清空缓存指令' },
            { id: 'HOOKUP', name: '挂钩升起' },
            { id: 'HOOKDOWN', name: '挂钩落下' },
            { id: 'FAST', name: '加速' },
            { id: 'SLOW', name: '减速' },
            { id: 'START', name: '启动' },
            { id: '0501', name: '换向' },
            { id: '0502', name: '前进' },
            { id: '0503', name: '后退' },
            { id: '0702', name: '左转' },
            { id: '0703', name: '右转' },
        ];
    let otherButtonsTrs = "";
    let otherButtonsTds = "";
    let numInRow = 4;
    let index = 0;
    for (var item of agvActions) {
        index++;
        otherButtonsTds = `${otherButtonsTds}<td><button id="${item.id}">${item.name}</button></td>`;
        if (index >= numInRow) {
            index = 0;
            otherButtonsTrs = `${otherButtonsTrs}<tr>${otherButtonsTds}</tr>`;
            otherButtonsTds = "";
        }
    }
    if (otherButtonsTds) otherButtonsTrs = `${otherButtonsTrs}<tr>${otherButtonsTds}</tr>`;

    let speedCtrlStr = `<input type="text" class="form-control bigSearch" placeholder="请输入速度百分比" name="speedctrl" id="speedctrl">`;
    let speedButtonStr = `<td>${speedCtrlStr}</td><td><button id="SPEEDCTRL">更新速度</button></td>`;

    let obstacleStr = `<input type="text" class="form-control bigSearch" placeholder="请输入避障通道ID" name="channel" id="channel">`;
    let obstacleButtonStr = `<td><form>${obstacleStr}</form></td><td><button id="OBSTACLECTRL">切换避障通道</button></td>`;
    let getFormStr = function (type) {
        return `<td><form id='cacheform'>${tasksiteStr}${typeSelectStr}` + (type == '4' ? speedStr : "") + "</form></td>";
    }

    container().find("tr#cacheContainer").append(getFormStr(null) + cacheButtonStr);
    container().find("table#otherContainer").append(otherButtonsTrs);
    container().find("tr#speedContainer").append(speedButtonStr);
    container().find("tr#obstacleContainer").append(obstacleButtonStr);

    container().delegate("select#type", "change", function () {
        var type = $(this).val();
        if (type == '4') {
            container().find("tr#cacheContainer").find("form").append(speedStr);
        } else {
            container().find("tr#cacheContainer").find("form input#speed").remove();
        }
    });

    container().delegate("button", "click", function () {
        var task = $(this).attr("id");
        var tasksite = $("input#tasksite").val();
        var type = $("#type").val();
        var speed = $("input#speed").val();
        if (task == 'cache' && (tasksite == "" || (type == '4' && speed == ""))) {
            alert("缓存数据有问题！");
            return;
        }
        if (!confirm('是否确认执行该操作?')) { return; }
        $("div#tempAgvMgr button").attr("disabled", "disabled");
        setTimeout(() => {
            doWork(task);
        }, 1000);
    });
}