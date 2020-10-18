export var taskexe = new Object();

taskexe.addTaskById = function (agvId, tasktype) {
    _doAddTask(agvId, tasktype, "/json/op/addTaskById.shtml ");
}

taskexe.addTask = function (agvId, tasktype) {
    _doAddTask(agvId, tasktype);
}

taskexe.addCtrlTask = function (agvId, tasktype, devId) {
    _doAddTask(agvId, tasktype, "/json/op/addCtrlTask.shtml", devId);
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

taskexe.addTaskTo = function (agvId, tasktype, to, callback) {
    addTaskTo(agvId, tasktype, to, callback);
}

var _doAddTask = function (agvId, tasktype, urlInfo, devId) {
    _addTask(agvId, tasktype, urlInfo, devId);
}

var _addTask = function (agvId, tasktype, urlInfo, devId) {
    jQuery.ajax({
        url: (urlInfo) ? urlInfo : "/json/op/addTask.shtml",
        type: "post",
        data: {
            tasktype: tasktype,
            taskid: tasktype,
            agvId: agvId,
            devId: devId
        },
        async: true,
        dataType: "json",
        success: function (data) {
            layer.msg(data.msg);
        },
        error: function (e) {
            layer.msg("数据中断，请刷新界面或重新登录！");
        },
        timeout: 5000
    });
}

var addTaskTo = function (agvId, tasktype, to, callback) {
    _addTaskTo(agvId, tasktype, to, callback);
}

var _addTaskTo = function (agvId, tasktype, to, callback) {
    let targetUrl = "/json/op/addTaskTo.shtml ";
    // if (localStorage.projectKey == 'TAIKAI_JY' && (tasktype == "FETCH" || tasktype == "DELIVER")) {
    //     targetUrl = "/json/op/fancy/addTaskTo.shtml";
    // }
    jQuery.ajax({
        url: targetUrl,
        type: "post",
        data: {
            tasktype: tasktype,
            to: to,
            agvId: agvId
        },
        async: true,
        dataType: "json",
        success: function (data) {
            if (callback) {
                callback(data);
            } else {
                layer.msg(data.msg);
            }
        },
        error: function (e) {
            layer.msg("数据中断，请刷新界面或重新登录！");
        },
        timeout: 5000
    });
}