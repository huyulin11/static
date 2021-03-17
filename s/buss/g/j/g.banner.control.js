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
    $(eleContainer).css("height", position.height || "50%").css("width", position.width || "80%");
    if (position.top) $(eleContainer).css("top", position.top);
    if (position.bottom) $(eleContainer).css("bottom", position.bottom);
    if (position.left) $(eleContainer).css("left", position.left);
    if (position.right) $(eleContainer).css("right", position.right);
    $(eleContainer).find(`iframe#${key}Frame`).attr("src", url).attr("frameborder", "no");
    $("body").append(eleContainer);
}

let _doRenderModel = (conf, container) => {
    let { init, whenInit, key, target, click, url, self, type, width, height, position, title } = conf;
    if (!position) position = {};
    if (!container) { container = _container(conf); }
    let hideDivObj = $(`<div id='${key}HideDiv' class='close hideToggle'></div>`);
    $("#" + container).prepend(hideDivObj);

    if (title) $(hideDivObj).attr("title", title);
    if (type === 'LINK' || type === 'LAYER') {
        let style = $(`<style id='${key}HideDiv_style'></style>`);
        $(style).append(`#${key}HideDiv.close {background-image: url(/s//i/icon/${key}.png);}`);
        $("head").append(style);
        if (url) $(hideDivObj).data("url", url);
        if (type) $(hideDivObj).data("type", type);
        if (self) $(hideDivObj).data("self", self);
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
    if (target) $(hideDivObj).data("target", target);
    if (click) $(hideDivObj).bind("click", click);
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