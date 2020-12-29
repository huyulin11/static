import { gf } from "/s/buss/g/j/g.f.js";
import { gfconf } from "/s/buss/g/j/g.f.conf.js";
import "/s/j/vue/vue.min.js";
import { findAlloc } from "/s/buss/wms/j/receipt.main.fun.js";

gf.checkLoginError();

let container = "#rootContainer";
let _alloc = gf.urlParam("alloc");
let _paperid;

var getCurrentReceiptPaperid = function (callback) {
    gfconf.getConf("__currentReceiptPaperid", (p) => {
        _paperid = p;
        callback();
    });
};
var setCurrentReceiptPaperid = function (val, callback) {
    gfconf.setConf("__currentReceiptPaperid", val, (p) => {
        _paperid = val;
        if (callback) { callback(); }
    });
};

var initReceipt = function () {
    $(container).find("#start").on("click", function () { start(); });
    $(container).find("#sub").on("click", function () { sub(); });
    $(container).find("#cancel").on("click", function () { cancel(); });
    $(container).find("#clean").on("click", function () { $("#su,#tu").val(""); $("#tu").focus(); });
    $(container).find("#back").on("click", function () { window.history.back(); });
    $(container).find("#send").on("click", function () { send(); });
    $(container).find("#execute").on("click", function () { execute(); });

    let title = "冷库入库";
    $(document).attr("title", title);
    if (_paperid) {
        let url = `/receipt/main/findOneData.shtml`;
        gf.ajax(url, { paperid: _paperid }, "json", function (s) {
            if (s.code < 0) {
                setCurrentReceiptPaperid("", () => {
                    gf.layerMsg(_paperid + s.msg, () => { window.location.reload(); });
                });
                return;
            }
            let main = s.object.main;
            if (!main || main["status"] != "NEW" || main["delflag"] != "0") {
                setCurrentReceiptPaperid("", () => {
                    gf.layerMsg(_paperid + "该单无法继续操作，如需查看请移步入库单管理！", () => { window.location.reload(); });
                });
                return;
            } else {
                findAlloc(_paperid, function (info) {
                    info = info ? ("-" + info) : "";
                    title = `正在${main.receipttype == '2' ? "返料入库" : "入库"}` + info;
                    $(container).find("h2").html(title);
                });
            }
        });
    } else {
        $(container).find("h2").html(title);
    }
    if (_alloc) {
        start(_alloc);
    }
    $("#tu").focus();
}, start = function (alloc) {
    if (_paperid) {
        gf.layerMsg("当前入库单尚未处理完成，不能再呼叫空车！");
        return;
    }
    gf.doAjax({
        url: "/receipt/detail/addEntity.shtml?alloc=" + (alloc ? alloc : ""),
        data: { warehouse: 2 },
        success: function (data) {
            data = JSON.parse(data);
            gf.layerMsg(data.msg);
            if (data.code >= 0) {
                setCurrentReceiptPaperid(data.object, () => {
                    window.location.reload();
                });
            }
        }
    });
}, send = function () {
    if (!_paperid) {
        gf.layerMsg("没有生成对应入库单，不能进行执行操作！");
        return;
    }
    gf.doAjax({
        url: `/receipt/main/send.shtml?paperid=${_paperid}`,
        success: function (data) {
            data = JSON.parse(data);
            gf.layerMsg(data.msg);
            if (data.code >= 0) {
                setCurrentReceiptPaperid("", () => {
                    if (_alloc) {
                        parent.layer.close(parent.pageii);
                    } else {
                        window.location.reload();
                    }
                });
            }
        }
    });
}, execute = function () {
    if (!_paperid) {
        gf.layerMsg("没有生成对应入库单，不能进行执行操作！");
        return;
    }
    gf.doAjax({
        url: `/receipt/main/execute.shtml?paperid=${_paperid}`,
        success: function (data) {
            data = JSON.parse(data);
            gf.layerMsg(data.msg);
            if (data.code >= 0) {
                setCurrentReceiptPaperid("", () => {
                    if (_alloc) {
                        parent.layer.close(parent.pageii);
                    } else {
                        window.location.reload();
                    }
                });
            }
        }
    });
}, cancel = function () {
    if (!_paperid) {
        gf.layerMsg("没有生成对应入库单，不能进行撤销操作！");
        return;
    }
    if (window.confirm("撤销操作将清除当前正在操作的入库单，是否继续？")) {
        gf.doAjax({
            url: `/receipt/main/deleteEntity.shtml?paperid=${_paperid}`,
            success: function (data) {
                data = JSON.parse(data);
                gf.layerMsg(data.msg);
                if (data.code >= 0) {
                    setCurrentReceiptPaperid("", () => {
                        if (_alloc) {
                            parent.layer.close(parent.pageii);
                        } else {
                            window.location.reload();
                        }
                    });
                }
            }
        });
    }
}, sub = function () {
    let su = $("#su").val();
    let tu = $("#tu").val();
    if (!su || !tu) {
        layer.msg("货位号与SU均不能为空！");
        if (!tu) {
            $("#tu").focus();
        } else if (!su) {
            $("#su").focus();
        }
        return;
    }
    if (su.trim().length != 9) {
        layer.msg("SU格式需为9位！");
        $("#su").focus();
        return;
    }
    if (_paperid) {
        gf.doAjax({
            url: `/receipt/detail/addItem.shtml?paperid=${_paperid}`,
            data: { item: su, userdef3: tu },
            success: function (data) {
                if (typeof data == "string") data = JSON.parse(data);
                gf.layerMsg(data.msg, function () {
                    $("#tu").focus();
                });
                $("#tu").val("");
                $("#su").val("");
                $("#tu").focus();
            }
        });
    } else {
        gf.layerMsg("无有效入库单，请先呼叫料架生成入库单！");
        setCurrentReceiptPaperid("", () => {
            window.location.reload();
        });
        return;
    }
}
export var initRf = function () {
    let fun = () => {
        new Vue({
            data: {},
            el: container,
            created: function () {
            },
            mounted: function () {
                initReceipt();
                gf.resizeTable();
            },
            methods: {
                suEnter: function () {
                    sub();
                },
                tuEnter: function () {
                    $("#su").focus();
                },
            }
        });
    };
    getCurrentReceiptPaperid(fun);
}