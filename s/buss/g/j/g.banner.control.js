import { gflayer } from "/s/buss/g/j/g.f.layer.js";
import { gf } from "/s/buss/g/j/g.f.js";

gf.quote("/s/c/app.banner.ctrl.css");

let initEventFlag = false;

let _container = (confs) => {
    if (confs.container) return confs.container;
    return "topCtrlContainer";
};

export let renderModel = (confs) => {
    let containers = [];
    if (confs instanceof Array) {
        for (let conf of confs) {
            let container = _container(conf);
            if (!containers.includes(container)) { containers.push(container); }
            if ($("#" + container).length == 0) {
                let topContainer = $(`<div id="${container}"></div>`);
                $("body").append(topContainer);
            }
            _doRenderModel(conf, container);
        }
    } else {
        let container = _container(confs);
        if (!containers.includes(container)) { containers.push(container); }
        _doRenderModel(confs, container);
    }
    if (!initEventFlag) {
        initEventFlag = true;
        for (let __container of containers) {
            _initEvent(__container);
        }
    }
}

let _initReady = (key, url, position) => {
    let eleContainer = $(`<div id="${key}Container" class="fixed"></div>`);
    $(eleContainer).append(`<iframe id='${key}Frame' class='frameInContainer'></iframe>`);
    $(eleContainer).css("height", position.height || "50%").css("width", position.width || "80%")
        .css("top", position.top || "auto")
        .css("bottom", position.bottom || "auto")
        .css("left", position.left || "auto")
        .css("right", position.right || "auto");
    $(eleContainer).find(`iframe#${key}Frame`).attr("src", url).attr("frameborder", "no");
    $("body").append(eleContainer);
}

let _doRenderModel = (conf, container) => {
    let { init, whenInit, key, target, click, url, self, type, width, height, position } = conf;
    if (!position) position = {};
    if (!container) { container = _container(conf); }
    if (type === 'LINK' || type === 'LAYER') {
        let style = $(`<style id='${key}HideDiv_style'></style>`);
        $(style).append(`#${key}HideDiv.close {background-image: url(/s//i/icon/${key}.png);}`);
        $("head").append(style);
        $("#" + container).prepend(`<div id='${key}HideDiv' class='close hideToggle' data-url='${url}' data-type='${type}' data-self='${self ? self : ""}'></div>`);
        return;
    }

    if (whenInit) { whenInit(); }
    if (init) {
        if (init instanceof Function) {
            init();
        } else {
            if (width) { position.width = width; }
            if (height) { position.height = height; }
            _initReady(key, url, position);
        }
    }
    let style = $(`<style id='${key}HideDiv_style'></style>`);
    $(style).append(`#${key}HideDiv.close {background-image: url(/s//i/icon/${key}Close.png);}`)
        .append(`#${key}HideDiv.open {background-image: url(/s//i/icon/${key}Open.png);}`);
    $("head").append(style);
    let op = $(`<div id='${key}HideDiv' class='close hideToggle'></div>`);
    if (target) $(op).data("target", target);
    if (click) $(op).bind("click", click);
    $("#" + container).prepend(op);
}

let _initEvent = (container) => {
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
        $("#" + container).find("div.hideToggle").each(function () {
            var target = $(this).data("target");
            if (target && target != thatTarget) {
                hideCtrl(this);
            }
        });
    }

    $("#" + container).delegate("div.hideToggle", "click", function () {
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
                    let _conf = {
                        type: 2,
                        content: url
                    };
                    let _layerArea = window.layerArea;
                    if (_layerArea) {
                        _conf.area = typeof layerArea == 'function' ? _layerArea() : _layerArea;
                    }
                    window.pageii = gflayer.open(_conf);
                } else {
                    window.open(url, self ? "_self" : false);
                }
            }
        }
    });
};