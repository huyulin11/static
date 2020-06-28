import { gf } from "/s/buss/g/j/g.f.js";
import { currentReceiptPaperid, setCurrentReceiptPaperid } from "/s/buss/wms/rf/j/rf.main.js";
import "/s/j/vue/vue.min.js";
import { findAlloc } from "/s/buss/wms/j/receipt.main.fun.js";

gf.checkLoginError();

let container = "#rootContainer";
let _paperid = gf.urlParam("paperid");
let _alloc = gf.urlParam("alloc");
if (_paperid) {
    setCurrentReceiptPaperid(_paperid);
} else {
    if (currentReceiptPaperid()) {
        _paperid = currentReceiptPaperid();
        // if (window.confirm("有入库任务尚未结束，是否继续？" + currentReceiptPaperid())) {
        // }
    }
}

var initReceipt = function () {
    $(container).find("#start").on("click", function () { start(); });
    $(container).find("#sub").on("click", function () { sub(); });
    $(container).find("#cancel").on("click", function () { cancel(); });
    $(container).find("#clean").on("click", function () { $("#su,#tu").val(""); });
    $(container).find("#back").on("click", function () { window.history.back(); });
    $(container).find("#send").on("click", function () { send(); });
    $(container).find("#execute").on("click", function () { execute(); });

    let title = "冷库入库";
    if (_paperid) {
        let url = `/receipt/main/findOneData.shtml`;
        gf.ajax(url, { paperid: _paperid }, "json", function (s) {
            if (s.code < 0) {
                gf.layerMsg(_paperid + s.msg);
                _paperid = "";
                setCurrentReceiptPaperid("");
                return;
            }
            let main = s.object.main;
            if (!main || main["status"] != "NEW" || main["delflag"] != "0") {
                gf.layerMsg(_paperid + "该单无法继续操作，如需查看请移步入库单管理！");
                _paperid = "";
                setCurrentReceiptPaperid("");
                return;
            } else {
                findAlloc(_paperid, function (info) {
                    info = info ? ("-" + info) : "";
                    title = `正在${main.receipttype == '2' ? "返料入库" : "入库"}` + info;
                    $(container).find("h2").html(title);
                    $(document).attr("title", title);
                });
            }
        });
    } else {
        $(container).find("h2").html(title);
        $(document).attr("title", title);
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
                _paperid = data.object;
                setCurrentReceiptPaperid(_paperid);
                window.location.reload();
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
                _paperid = "";
                setCurrentReceiptPaperid("");
                if (_alloc) {
                    parent.layer.close(parent.pageii);
                } else {
                    window.location.reload();
                }
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
                _paperid = "";
                setCurrentReceiptPaperid("");
                if (_alloc) {
                    parent.layer.close(parent.pageii);
                } else {
                    window.location.reload();
                }
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
                    _paperid = "";
                    setCurrentReceiptPaperid("");
                    if (_alloc) {
                        parent.layer.close(parent.pageii);
                    } else {
                        window.location.reload();
                    }
                }
            }
        });
    }
}, sub = function () {
    let su = $("#su").val();
    let tu = $("#tu").val();
    if (!su || !tu) {
        gf.layerMsg("货位号与SU均不能为空！");
        if (!su) {
            $("#su").focus();
        } else if (!tu) {
            $("#tu").focus();
        }
        return;
    }
    if (su.trim().length != 9) {
        gf.layerMsg("SU格式错误！");
        $("#su").focus();
        return;
    }
    if (_paperid) {
        gf.doAjax({
            url: `/receipt/detail/addItem.shtml?paperid=${_paperid}`,
            data: { item: su, userdef3: tu },
            success: function (data) {
                if (typeof data == "string") data = JSON.parse(data);
                gf.layerMsg(data.msg);
                $("#su").val("");
                $("#su").focus();
            }
        });
    } else {
        gf.layerMsg("无有效入库单，请先呼叫料架生成入库单！");
        return;
    }
}
export var initRf = function () {
    var vm = new Vue({
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
}