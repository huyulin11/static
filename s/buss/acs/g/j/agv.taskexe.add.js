export var taskexe = new Object();

taskexe.addTaskById = function (agvId, tasktype, whenError) {
    return addTask(agvId, tasktype, whenError, "/json/op/addTaskById.shtml ");
}

taskexe.addTask = function (agvId, tasktype, whenError) {
    return addTask(agvId, tasktype, whenError);
}

taskexe.addCtrlTask = function (agvId, tasktype, whenError) {
    return addTask(agvId, tasktype, whenError, "/json/op/addCtrlTask.shtml");
}

taskexe.addCtrlTaskRtnCode = function (agvId, tasktype, whenError) {
    return addTaskRtnCode(agvId, tasktype, whenError, "/json/op/addCtrlTask.shtml");
}

taskexe.addATaskBySystem = function (lapId) {
    return addTask(null, null, null, "/json/op/addATaskBySystem.shtml?lapId=" + lapId);
}

taskexe.addTaskTo = function (agvId, tasktype, to) {
    return addTaskTo(agvId, tasktype, to);
}

var addTask = function (agvId, tasktype, whenError, urlInfo) {
    return _addTask(agvId, tasktype, whenError, urlInfo).msg;
}

var addTaskRtnCode = function (agvId, tasktype, whenError, urlInfo) {
    return _addTask(agvId, tasktype, whenError, urlInfo).code;
}

var _addTask = function (agvId, tasktype, whenError, urlInfo) {
    var rtnData;
    jQuery.ajax({
        url: (urlInfo) ? urlInfo : "/json/op/addTask.shtml",
        type: "post",
        data: {
            tasktype: tasktype,
            taskid: tasktype,
            agvId: agvId
        },
        async: false,
        dataType: "json",
        success: function (data) {
            rtnData = data;
        },
        error: function (e) {
            layer.msg("数据中断，请刷新界面或重新登录！");
        },
        timeout: 5000
    });
    return rtnData;
}

var addTaskTo = function (agvId, tasktype, to) {
    return _addTaskTo(agvId, tasktype, to).msg;
}

var _addTaskTo = function (agvId, tasktype, to) {
    var rtnData;
    let targetUrl = "/json/op/addTaskTo.shtml ";
    if (localStorage.projectKey == 'TAIKAI_JY' && (tasktype == "FETCH" || tasktype == "DELIVER")) {
        targetUrl = "/json/op/fancy/addTaskTo.shtml";
    }
    jQuery.ajax({
        url: targetUrl,
        type: "post",
        data: {
            tasktype: tasktype,
            to: to,
            agvId: agvId
        },
        async: false,
        dataType: "json",
        success: function (data) {
            rtnData = data;
        },
        error: function (e) {
            layer.msg("数据中断，请刷新界面或重新登录！");
        },
        timeout: 2000
    });
    return rtnData;
}