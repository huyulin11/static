export var taskexe = new Object();

taskexe.addTaskById = function (agvId, tasktype) {
    _addTask(agvId, tasktype, "/json/op/addTaskById.shtml ");
}

taskexe.addTask = function (agvId, tasktype) {
    _addTask(agvId, tasktype, "/json/op/addTask.shtml");
}

taskexe.addCtrlTask = function (agvId, tasktype, devId) {
    _addTask(agvId, tasktype, "/json/op/addCtrlTask.shtml", devId);
}

taskexe.addCtrlTaskFromBtn = (that, tips, opType) => {
    var open = $(that).data("open");
    if (open) {
        tips = '是否确定关闭' + tips + '？';
        opType = "stop" + opType;
    } else {
        tips = '是否确定开启' + tips + '？';
        opType = "open" + opType;
    }
    if (window.confirm(tips)) {
        taskexe.addCtrlTask(0, opType);
    }
}

taskexe.addTaskToSite = (agvId, task, targetSite) => {
    let checkSite = function () {
        if (localStorage.projectKey == "CSY_CDBP") { return false; }
        return (isNaN(Number(targetSite)) && isNaN(Number(targetSite.replace(/#/g, ""))));
    }
    if (!targetSite || checkSite()) {
        layer.msg("请输入有效的目标站点编号！");
        return;
    }
    taskexe.addTaskTo(agvId, task, targetSite);
}

taskexe.addTaskTo = function (agvId, tasktype, to, callback) {
    _addTaskTo(agvId, tasktype, to, callback);
}

var _addTask = function (agvId, tasktype, urlInfo, devId) {
    jQuery.ajax({
        url: urlInfo,
        type: "post", dataType: "json",
        async: true,
        timeout: 5000,
        data: {
            tasktype: tasktype,
            taskid: tasktype,
            agvId: agvId,
            devId: devId
        },
        success: function (data) {
            layer.msg(data.msg);
        },
        error: function (e) {
            layer.msg("数据中断，请刷新界面或重新登录！");
        }
    });
}

var _addTaskTo = function (agvId, tasktype, to, callback) {
    // if (localStorage.projectKey == 'TAIKAI_JY' && (tasktype == "FETCH" || tasktype == "DELIVER")) {
    //     targetUrl = "/json/op/fancy/addTaskTo.shtml";
    // }
    jQuery.ajax({
        url: "/json/op/addTaskTo.shtml ",
        type: "post", dataType: "json",
        async: true,
        timeout: 5000,
        data: {
            tasktype: tasktype,
            to: to,
            agvId: agvId
        },
        success: function (data) {
            if (callback) {
                callback(data);
            } else {
                layer.msg(data.msg);
            }
        },
        error: function (e) {
            layer.msg("数据中断，请刷新界面或重新登录！");
        }
    });
}