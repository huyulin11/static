import { renderList } from '/s/buss/acs/FANCY/j/agv.list.render.one.js';
import { overlay } from '/s/buss/g/j/g.overlay.js';
import { gf } from "/s/buss/g/j/g.f.js";
import { ws } from "/s/buss/g/j/websocket.js";

export var agvNum = 0;
let innerAgvDetail = ["CSY_DAJ", "TAIKAI_JY", "QDTY_SELF"].includes(localStorage.projectKey);

var agvDiv = function () {
    if ($("div#agvDiv").length == 0) {
        let agvDiv = $(`<div id='agvDiv' class='fixed withBorder'></div>`);
        $("body").prepend(agvDiv);
        if (agvNum >= 6) { $("div#agvDiv").addClass("big"); }
    }
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
    agvDiv().find("table.agv").remove();
    renderList(data, agvDiv());
    gf.resizeTable();
}

var openAGVMGR = function (tmpAgvId, layerName) {
    let url = "/s/buss/acs/" + localStorage.projectKey + "/h/agv/agv.html?agvId=" + tmpAgvId;
    if (innerAgvDetail) {
        localStorage.currentAgvId = tmpAgvId;
        var height = "300px";
        if (localStorage.projectKey != 'HONGFU_ZHENMU') height = $(window).height();
        $("#mainPage").css("height", height).attr("src", url); return;
    }
    layer.open({
        type: 2,
        title: '单车管理',
        shadeClose: true,
        shade: 0.5,
        maxmin: true,
        area: gf.isPc() ? gf.layerArea() : ['95%', '70%'],
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

    if (agvDiv().find('#toggleShowAgvListDetail').length == 0) {
        agvDiv().prepend(`<div style='font-size:10px;text-align:left;'><span>选中隐藏详情</span><input type="checkbox" 
        id="toggleShowAgvListDetail" title="选中隐藏详情" ${localStorage.toggleShowAgvListDetail ? "checked" : ""}></div>`);
        agvDiv().delegate("input:checkbox#toggleShowAgvListDetail", "change", function (e) {
            if (this.checked) {
                localStorage.toggleShowAgvListDetail = true;
            } else {
                localStorage.toggleShowAgvListDetail = "";
            }
            getAgvList();
        });
    }
    if (innerAgvDetail) {
        var currentAgvId = localStorage.currentAgvId;
        if (currentAgvId) {
            openAGVMGR(currentAgvId);
        }
    }
}
