import { getAgvList, openAGVMGR } from '/s/buss/acs/FANCY/j/agv.list.js';
import { overlay } from '/s/buss/g/j/g.overlay.js';
import { gf } from "/s/buss/g/j/g.f.js";
import { ws } from "/s/buss/g/j/websocket.js";

export let renderListCtrl = (container, innerAgvDetail) => {
    let hideFlag = ($("#topCtrlContainer").find("#agvsHideDiv").length == 0);
    let checks = [
        { key: "toggleShowAgvListDetail", name: "隐藏详情", },
    ];
    if (innerAgvDetail) {
        checks.push({ key: "toggleOnlyCurrent", name: "仅显示当前车辆", hide: hideFlag, },
            { key: "toggleAutoShow", name: "自动展现", hide: hideFlag, });
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
    if ($(container).find(`#agvListCtrl`).length == 0) {
        $(container).prepend(`<div id='agvListCtrl' style='font-size:10px;text-align:left;'></div>`);
    }
    let $agvListCtrl = $(container).find(`#agvListCtrl`);
    for (let check of checks) {
        if (check.hide) { continue; }
        let key = check.key;
        let name = check.name;
        if ($(container).find(`#${key}`).length == 0) {
            $($agvListCtrl).append(`<span>${name}</span><input type="checkbox" id="${key}" title="${name}" ${localStorage[key] ? "checked" : ""}>`);
            let checkChangeFun = function (that) {
                if (that.checked) {
                    localStorage[key] = true;
                } else {
                    localStorage[key] = "";
                }
                getAgvList();
            }
            $(container).delegate(`input:checkbox#${key}`, "change", function (e) { checkChangeFun(this); });
        }
    }
};