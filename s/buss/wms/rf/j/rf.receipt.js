import { gf } from "/s/buss/g/j/g.f.js";
import { currentReceiptPaperid, setCurrentReceiptPaperid } from "/s/buss/wms/rf/j/rf.main.js";
import "/s/j/vue/vue.min.js";

let container = "#rootContainer";
let _paperid = gf.urlParam("paperid");
if (_paperid) {
    setCurrentReceiptPaperid(_paperid);
} else {
    if (currentReceiptPaperid()) {
        if (window.confirm("有入库任务尚未结束，是否继续？" + currentReceiptPaperid())) {
            _paperid = currentReceiptPaperid();
        }
    }
}

var initReceipt = function () {
    $(container).find("#start").on("click", function () { start(); });
    $(container).find("#sub").on("click", function () { sub(); });
    $(container).find("#cancel").on("click", function () { cancel(); });
    $(container).find("#back").on("click", function () { window.history.back(); });
    $(container).find("#send").on("click", function () { send(); });
    $(container).find("#execute").on("click", function () { execute(); });

    if (_paperid) {
        let url = `/receipt/main/findOneData.shtml`;
        gf.ajax(url, { paperid: _paperid }, "json", function (s) {
            if (s.code < 0) {
                layer.msg(_paperid + s.msg);
                _paperid = "";
                return;
            }
            let main = s.object.main;
            if (!main || main["status"] != "1" || main["delflag"] != "0") {
                layer.msg(_paperid + "该单无法继续操作，如需查看请移步入库单管理！");
                _paperid = "";
                return;
            } else {
                $(container).find("h2").html(`正在${main.receipttype == '2' ? "返料入库" : "入库"}` + _paperid);
            }
        });
    }
    $("#su").focus();
}, start = function () {
    if (_paperid) {
        layer.msg("当前入库单尚未处理完成，不能再呼叫空车！");
        return;
    }
    gf.doAjax({
        url: "/receipt/detail/addEntity.shtml",
        data: { warehouse: 2 },
        success: function (data) {
            data = JSON.parse(data);
            layer.msg(data.msg);
            if (data.code >= 0) {
                _paperid = data.object;
                window.location.reload();
            }
        }
    });
}, send = function () {
    if (!_paperid) {
        layer.msg("没有生成对应入库单，不能进行执行操作！");
        return;
    }
    gf.doAjax({
        url: `/receipt/main/send.shtml?paperid=${_paperid}`,
        success: function (data) {
            data = JSON.parse(data);
            layer.msg(data.msg);
            if (data.code >= 0) {
                _paperid = "";
                window.location.reload();
            }
        }
    });
}, execute = function () {
    if (!_paperid) {
        layer.msg("没有生成对应入库单，不能进行执行操作！");
        return;
    }
    gf.doAjax({
        url: `/receipt/main/execute.shtml?paperid=${_paperid}`,
        success: function (data) {
            data = JSON.parse(data);
            layer.msg(data.msg);
            if (data.code >= 0) {
                _paperid = "";
                window.location.reload();
            }
        }
    });
}, cancel = function () {
    if (!_paperid) {
        layer.msg("没有生成对应入库单，不能进行取消操作！");
        return;
    }
    if (window.confirm("取消操作将删除当前正在操作的入库单，是否继续？")) {
        gf.doAjax({
            url: `/receipt/main/deleteEntity.shtml?paperid=${_paperid}`,
            success: function (data) {
                data = JSON.parse(data);
                layer.msg(data.msg);
                if (data.code >= 0) {
                    _paperid = "";
                    window.location.reload();
                }
            }
        });
    }
}, sub = function () {
    let su = $("#su").val();
    let tu = $("#tu").val();
    if (!su || !tu) {
        layer.msg("tu与su均不能为空！");
        if (!su) {
            $("#su").focus();
        } else if (!tu) {
            $("#tu").focus();
        }
        return;
    }
    if (_paperid) {
        gf.doAjax({
            url: `/receipt/detail/addItem.shtml?paperid=${_paperid}`,
            data: { item: su, userdef3: tu },
            success: function (data) {
                if (typeof data == "string") data = JSON.parse(data);
                layer.msg(data.msg + ":su:" + su + ",tu:" + tu);
                $("#su").val("");
                $("#tu").val("");
                $("#su").focus();
            }
        });
    } else {
        layer.msg("无有效入库单，请先呼叫空架生成入库单！");
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
                $("#tu").focus();
            },
            tuEnter: function () {
                sub();
            },
        }
    });
}