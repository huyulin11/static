let initEventFlag = false;

export let renderModel = (confs) => {
    if (confs instanceof Array) {
        for (let conf of confs) {
            doRenderModel(conf);
        }
    } else {
        doRenderModel(confs);
    }
    if (!initEventFlag) {
        initEventFlag = true;
        initEvent();
    }
}

let doRenderModel = (conf) => {
    let { init, key, target, click, url, self, type } = conf;
    if (type === 'LINK') {
        let style = $(`<style id='${key}HideDiv_style'></style>`);
        $(style).append(`#${key}HideDiv.close {background-image: url(/s//i/icon/${key}.png);}`);
        $("head").append(style);
        $("#topCtrlContainer").prepend(`<div id='${key}HideDiv' class='close hideToggle' data-url='${url}' data-self='${self ? self : ""}'></div>`);
        return;
    }

    if (init) init();
    let style = $(`<style id='${key}HideDiv_style'></style>`);
    $(style).append(`#${key}HideDiv.close {background-image: url(/s//i/icon/${key}Close.png);}`)
        .append(`#${key}HideDiv.open {background-image: url(/s//i/icon/${key}Open.png);}`);
    $("head").append(style);
    let op = $(`<div id='${key}HideDiv' class='close hideToggle'></div>`);
    if (target) $(op).data("target", target);
    if (click) $(op).bind("click", click);
    $("#topCtrlContainer").prepend(op);
}

let initEvent = () => {
    var showCtrl = function (that) {
        var thatTarget = $(that).data("target");
        $(thatTarget).show(100);
        $(that).removeClass("close");
        $(that).addClass("open");
    }

    var hideCtrl = function (that) {
        var thatTarget = $(that).data("target");
        $(thatTarget).hide(100);
        $(that).removeClass("open");
        $(that).addClass("close");
    }

    var hideAllCtrl = function (thatTarget) {
        $("#topCtrlContainer").find("div.hideToggle").each(function () {
            var target = $(this).data("target");
            if (target && target != thatTarget) {
                hideCtrl(this);
            }
        });
    }

    $("#topCtrlContainer").delegate("div.hideToggle", "click", function () {
        var target = $(this).data("target");
        if (target) {
            hideAllCtrl(target);
            if ($(this).hasClass("open")) {
                hideCtrl(this);
            } else {
                showCtrl(this);
            }
        } else {
            var url = $(this).data("url");
            var self = $(this).data("self");
            if (url) {
                window.open(url, self ? "_self" : false);
            }
        }
    });
};