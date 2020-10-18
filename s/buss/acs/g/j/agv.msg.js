import { renderCtrlBtns } from "/s/buss/acs/FANCY/j/acs.control.js";

var container = function () {
    if ($("#tipsOper").length == 0) {
        $("#msgContainer").append("<fieldset><legend>系统消息</legend><div id='tipsOper'></div></fieldset>");
    }
    return $("#tipsOper");
}

var lastMsgMap = new Map();
var msgLen = 0;
var addMsg = function (msg, level, agvId) {

    var w = "";
    if (agvId) {
        if (agvId > 0) {
            w = "<span class='redFont tips'>" + agvId + "号车：</span>";
        } else {
            w = "<span class='redFont tips'>系统消息：</span>";
        }
    } else {
        agvId = 0;
    }

    var tip = "div#tips" + agvId;

    if ($(tip).length <= 0) {
        container().append("<div id='tips" + agvId + "'>" + w + "</div>");
    }

    if (msg != "" && (lastMsgMap.get(agvId) == null || lastMsgMap.get(agvId) != msg)) {
        lastMsgMap.set(agvId, msg);
        var fontClass = (level == 1 ? "redFont" : (level == 2 ? "blueFont" : "redFont"));
        if ($(tip).find("span").length > 2) {
            var rm = $(tip).find("span").length - 2;
            $(tip).find("span:lt(" + rm + "):gt(0)").remove();
        }

        $(tip).append("<span " + "class='tips " + fontClass + "' data-id='" + msgLen + "'" + ">**" + msg + "**<br/></span>");
        $(tip).find("span[data-id!=" + (msgLen++) + "]:gt(0)").addClass("greyFont");
    }
}

export var refreshAgvsInfo = function () {
    jQuery.ajax({
        url: "/s/jsons/" + localStorage.projectKey + "/agv/agvInfo0.json",
        type: "GET",
        dataType: "json",
        cache: false,
        success: function (data) {
            $.each(data, function (n, value) {
                if (value.systemWarning) addMsg(value.systemWarning, 1, n);
                if (n > 0) {
                    if (value.currentTask != null && value.currentTask.length > 0) {
                        var msg = (value.currentTask[0].opflag == "OVER" ? "执行结束：" : "正在执行：") + value.currentTask[0].taskText;
                        addMsg(msg, 3, n);
                    }
                } else {
                    renderCtrlBtns(value);
                }
            });
        },
        error: function (e) {
        },
        timeout: 5000
    });
}