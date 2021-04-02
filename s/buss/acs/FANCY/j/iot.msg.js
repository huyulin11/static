import { ws } from "/s/buss/g/j/websocket.js";
import { ITEM_PAUSE } from "/s/buss/acs/FANCY/j/acs.control.conf.js";
import { renderModel } from "/s/buss/g/j/g.banner.control.js";
import { gflayer } from "/s/buss/g/j/g.f.layer.js";

let _container;
let pauseCtrlObj = Object.assign(ITEM_PAUSE, {
    title: "启/停(自动刷新)",
    click: function () {
        if (_pause) {
            _pause = false;
            layer.msg('自动刷新');
        } else {
            _pause = true;
            layer.msg('暂停刷新');
        }
    }
});

let _pause = false;
renderModel(pauseCtrlObj);

let deal = function (json) {
    if (_pause) return;
    let showMsg = `编号:${json.id}消息:${json.msg}`;
    let _current = $(`<div id='${json.id}'></div>`);
    $(_current).append(showMsg);
    if ($(_container).find(`div#${json.id}`).length > 0) {
        $(_container).find(`div#${json.id}`).html(showMsg);
    } else {
        $(_container).append(_current);
    }
}

export var init = function (container) {
    _container = $(container);
    ws("ws://" + window.document.location.hostname + ":9080" + "/websocket/iotmsg", (event) => {
        let json = JSON.parse(event.data);
        deal(json);
    }, null, () => {
        console.log("解析iotmsg异常");
    });
}
