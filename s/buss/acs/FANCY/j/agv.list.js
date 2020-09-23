import { renderList } from '/s/buss/acs/FANCY/j/agv.list.render.one.js';
import { overlay } from '/s/buss/g/j/g.overlay.js';
import { gf } from "/s/buss/g/j/g.f.js";
import { ws } from "/s/buss/g/j/websocket.js";

var reloadFlag = 0;
var intervalVal;
export var agvNum = 0;

var agvDiv = function () {
    if ($("div#agvDiv").length == 0) {
        let agvDiv = $(`<div id='agvDiv' class='fixed' style='z-index:1;'>
        <div id='agvDiv' class='withBorder'></div></div>`);
        $("body").prepend(agvDiv);
    }
    if (agvNum >= 6) { $("div#agvDiv").addClass("big"); }
    return $("div#agvDiv");
}

var getAgvList = function () {
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
    doWhenSuccess(data);
}

var doWhenSuccess = function (data) {
    reloadFlag = 0;
    agvDiv().html("");
    renderList(data, agvDiv());
    gf.resizeTable();
}

let innerAgvDetail = ["CSY_DAJ", "LAO_FOXCONN", "TAIKAI_JY"].includes(localStorage.projectKey);

var openAGVMGR = function (tmpAgvId, layerName) {
    let url = "/s/buss/acs/" + localStorage.projectKey + "/h/agv/agv.html?agvId=" + tmpAgvId;
    if (innerAgvDetail) {
        localStorage.currentAgvId = tmpAgvId;
        var height = "300px";
        if (localStorage.projectKey != 'HONGFU_ZHENMU') height = $(window).height();
        $("#mainPage").css("height", height).attr("src", url); return;
    }
    console.log(url);
    layer.open({
        type: 2,
        title: '单车管理',
        shadeClose: false,
        shade: 0.5,
        maxmin: true,
        area: gf.layerArea(),
        content: url
    });
    return;
}

var checkLogin = function () {
    gf.checkLogin();
}

var init = function () {
    ws("ws://127.0.0.1:9080/websocket/agvsinfo", (event) => {
        let json = JSON.parse(event.data);
        whenSuccess(json);
    }, null, () => {
        getAgvList();
        intervalVal = setInterval(getAgvList, 3000);
    });
    if (localStorage.projectKey == 'TAIKAI_JY')
        setInterval(checkLogin, 5 * 60 * 1000);

    agvDiv().delegate("button", "click", function () {
        openAGVMGR($(this).attr("id"), $(this).html());
    });

    if (innerAgvDetail) {
        var currentAgvId = localStorage.currentAgvId;
        if (currentAgvId) {
            openAGVMGR(currentAgvId);
        }
    }

    var height = "300px";
    if (localStorage.projectKey != 'HONGFU_ZHENMU') height = $(window).height();
}

init();
