import { renderList } from '/s/buss/acs/FANCY/j/agv.list.render.one.js';
import { overlay } from '/s/buss/g/j/g.overlay.js';

var reloadFlag = 0;
var intervalVal;

var agvDiv = function () {
    if ($("div#agvDiv").length == 0) {
        $("#rootContainer").prepend(`<div id='agvDiv' class='fixed'>
                <fieldset><legend>运输工具</legend>
                <div id='agvDiv' class='withBorder'>
                </div></fieldset></div>`);
    }
    return $("div#agvDiv");
}

var getAgvList = function () {
    jQuery.ajax({
        url: "/s/jsons/" + localStorage.getItem("projectKey") + "/agv/agvList.json",
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
    doWhenSuccess(data);
}

var doWhenSuccess = function (data) {
    reloadFlag = 0;
    agvDiv().html("");
    renderList(data, agvDiv());
    resizeTable();
}

var openAGVMGR = function (tmpAgvId, layerName) {
    {
        var height = "300px";
        if (localStorage.projectKey != 'HONGFU_ZHENMU') height = $(window).height();
        localStorage.setItem("currentAgvId", tmpAgvId);
        $("#oneAgv").css("height", height).attr("src", "/s/buss/acs/" + localStorage.getItem("projectKey") + "/h/agv/agv.html?agvId=" + tmpAgvId);
        return;
    }
    if (tmpAgvId == 1) {
        layerOpen({ content: '/s/buss/acs/h/agv.one.html?agvId=' + tmpAgvId, title: layerName, offset: 'rb' });
    } else {
        layerOpen({ content: '/s/buss/acs/h/agv.one.html?agvId=' + tmpAgvId, title: layerName, offset: 'rb' });
    }
}

var init = function () {
    getAgvList();
    intervalVal = setInterval(getAgvList, 3000);

    var currentAgvId = localStorage.getItem("currentAgvId");
    if (currentAgvId) {
        openAGVMGR(currentAgvId);
    }

    agvDiv().delegate("button", "click", function () {
        openAGVMGR($(this).attr("id"), $(this).html());
    });
}

init();
