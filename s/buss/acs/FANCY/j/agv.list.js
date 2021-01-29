import { renderList } from '/s/buss/acs/FANCY/j/agv.list.render.one.js';
import { renderListCtrl } from '/s/buss/acs/FANCY/j/agv.list.ctrl.js';
import { overlay } from '/s/buss/g/j/g.overlay.js';
import { gf } from "/s/buss/g/j/g.f.js";
import { gflayer } from "/s/buss/g/j/g.f.layer.js";
import { ws } from "/s/buss/g/j/websocket.js";

export var agvNum = 0;
let innerAgvDetail = ["CSY_DAJ", "TAIKAI_JY", "QDTY_SELF", "KFKJ_SELF"].includes(localStorage.projectKey);

var agvDiv = function () {
    if ($("div#agvDiv").length == 0) {
        let agvDiv = $(`<div id='agvDiv' class='fixed withBorder'></div>`);
        $("body").prepend(agvDiv);
    }
    return $("div#agvDiv");
}

export var getAgvList = function () {
    jQuery.ajax({
        url: "/s/jsons/" + localStorage.projectKey + "/agv/agvList.json",
        type: "GET",
        dataType: "json",
        cache: false,
        error: function (e) {
        },
        complete: function () {
            setTimeout(function () {
                overlay.hide();
            }, 1000);
        },
        timeout: 6000,
        success: whenSuccess
    });
}

var whenSuccess = function (data) {
    overlay.show();
    agvNum = data.length;
    if (agvNum >= 6) { if (!$("div#agvDiv").hasClass("big")) $("div#agvDiv").addClass("big"); }
    doWhenSuccess(data);
}

var doWhenSuccess = function (data) {
    agvDiv().find("table.agv").remove();
    renderList(data, agvDiv());
    gf.resizeTable();
}

export var openAGVMGR = function (tmpAgvId, layerName) {
    let url = "/s/buss/acs/" + localStorage.projectKey + "/h/agv/agv.html?agvId=" + tmpAgvId;
    if (innerAgvDetail) {
        localStorage.currentAgvId = tmpAgvId;
        var height = "300px";
        if (localStorage.projectKey != 'HONGFU_ZHENMU') height = $(window).height();
        $("#mainPage").css("height", height).attr("src", url); return;
    }
    gflayer.open({
        type: 2,
        title: '单车管理',
        shade: 0.5,
        maxmin: true,
        content: url
    });
    return;
}

var checkLogin = function () {
    gf.checkLogin();
}

export var initAgvList = function () {
    ws("ws://" + window.document.location.hostname + ":9080" + "/websocket/agvsinfo", (event) => {
        let json = JSON.parse(event.data);
        whenSuccess(json);
    }, null, () => {
        getAgvList();
        setInterval(getAgvList, 3000);
    });
    if (localStorage.projectKey == 'TAIKAI_JY')
        setInterval(checkLogin, 5 * 60 * 1000);

    agvDiv().delegate("button", "click", function () {
        openAGVMGR($(this).attr("id"), $(this).html());
    });
    renderListCtrl(agvDiv(), innerAgvDetail);
}
