let initEventFlag = false;

export let renderModel = (confs) => {
    if ($("#topCtrlContainer").length == 0) {
        let topContainer = $(`<div id="topCtrlContainer"></div>`);
        $("body").append(topContainer);
    }
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

let initReady = (key, url, width, height) => {
    let container = $(`<div id="${key}Container" class="fixed"></div>`);
    $(container).append(`<iframe id='${key}Frame'></iframe>`);
    $(container).css("height", height || "50%").css("width", width || "80%");
    $(container).find(`iframe#${key}Frame`).css("height", "100%").css("width", "100%").attr("src", url).attr("frameborder", "no");
    $("body").append(container);
}

let doRenderModel = (conf) => {
    let { init, key, target, click, url, self, type, width, height } = conf;
    if (type === 'LINK' || type === 'LAYER') {
        let style = $(`<style id='${key}HideDiv_style'></style>`);
        $(style).append(`#${key}HideDiv.close {background-image: url(/s//i/icon/${key}.png);}`);
        $("head").append(style);
        $("#topCtrlContainer").prepend(`<div id='${key}HideDiv' class='close hideToggle' data-url='${url}' data-type='${type}' data-self='${self ? self : ""}'></div>`);
        return;
    }

    if (init) {
        if (init instanceof Function) {
            init();
        } else {
            initReady(key, url, width, height);
        }
    }
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
            var type = $(this).data("type");
            var self = $(this).data("self");
            if (url) {
                if (type === 'LAYER') {
                    window.pageii = gf.layerOpen({
                        type: 2,
                        content: url
                    });
                } else {
                    window.open(url, self ? "_self" : false);
                }
            }
        }
    });
};