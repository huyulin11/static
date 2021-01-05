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
    gf.layerOpen({
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

    let hideFlag = ($("#topCtrlContainer").find("#agvsHideDiv").length == 0);
    let checks = [
        { key: "toggleShowAgvListDetail", name: "选中隐藏详情", },
        { key: "toggleOnlyCurrent", name: "仅显示当前AGV", hide: hideFlag, },
        { key: "toggleAutoShow", name: "自动展现", hide: hideFlag, },
    ];
    if (agvDiv().find(`#agvListCtrl`).length == 0) {
        agvDiv().prepend(`<div id='agvListCtrl' style='font-size:10px;text-align:left;'></div>`);
    }
    let $agvListCtrl = agvDiv().find(`#agvListCtrl`);
    for (let check of checks) {
        if (check.hide) { continue; }
        let key = check.key;
        let name = check.name;
        if (agvDiv().find(`#${key}`).length == 0) {
            $($agvListCtrl).append(`<span>${name}</span><input type="checkbox" id="${key}" title="${name}" ${localStorage[key] ? "checked" : ""}>`);
            let checkChangeFun = function (that) {
                if (that.checked) {
                    localStorage[key] = true;
                } else {
                    localStorage[key] = "";
                }
                getAgvList();
            }
            agvDiv().delegate(`input:checkbox#${key}`, "change", function (e) { checkChangeFun(this); });
        }
    }
    if (innerAgvDetail) {
        var currentAgvId = localStorage.currentAgvId;
        if (currentAgvId) {
            openAGVMGR(currentAgvId);
        }
        if (localStorage.toggleAutoShow) {
            setTimeout(() => {
                if ($("#taskHideDiv").hasClass('close')) $("#taskHideDiv").trigger("click");
                if ($("#agvsHideDiv").hasClass('close')) $("#agvsHideDiv").trigger("click");
            }, 3000);
        }
    }
}
