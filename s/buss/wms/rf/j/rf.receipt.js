import { gf } from "/s/buss/g/j/g.f.js";
import { rfMgr } from "/s/buss/wms/rf/j/rf.main.js";
import "/s/j/vue/vue.min.js";

let container = "#rootContainer";

var currentPaperid = function () {
    return localStorage.__receiptPaperId;
};
var setCurrentPaperid = function (val) {
    return localStorage.__receiptPaperId = val;
};
export var initRf = function () {
    var vm = new Vue({
        data: {},
        el: container,
        created: function () {
        },
        mounted: function () {
            this.initReceipt();
            gf.resizeTable();
        },
        methods: {
            initReceipt: function () {
                $(container).find("#start").on("click", function () { vm.start(); });
                $(container).find("#sub").on("click", function () { vm.sub(); });
                $(container).find("#cancel").on("click", function () { vm.cancel(); });
                $(container).find("#rfMgr").on("click", function () { rfMgr(); });
                $(container).find("#execute").on("click", function () { vm.execute(); });

                if (currentPaperid()) {
                    let url = `/receipt/main/findOneData.shtml`;
                    gf.ajax(url, { paperid: currentPaperid() }, "json", function (s) {
                        if (s.code < 0) {
                            layer.msg(currentPaperid() + s.msg);
                            setCurrentPaperid("");
                            return;
                        }
                        let main = s.object.main;
                        if (main["status"] != "1" || main["delflag"] != "0") {
                            layer.msg(currentPaperid() + "该单无法继续操作，如需查看请移步入库单管理！");
                            setCurrentPaperid("");
                            return;
                        } else {
                            $(container).find("h1").each(function () {
                                $(this).html("正在入库" + currentPaperid());
                            });
                        }
                    });
                }
                $("#su").focus();
            },
            start: function () {
                if (currentPaperid()) {
                    layer.msg("当前入库单尚未处理完成，不能再呼叫空车！");
                    return;
                }
                gf.doAjax({
                    url: "/receipt/detail/addEntity.shtml",
                    data: { warehouse: 4 },
                    success: function (data) {
                        data = JSON.parse(data);
                        layer.msg(data.msg);
                        if (data.code >= 0) {
                            setCurrentPaperid(data.object);
                            window.location.reload();
                        }
                    }
                });
            },
            execute: function () {
                if (!currentPaperid()) {
                    layer.msg("没有生成对应入库单，不能进行执行操作！");
                    return;
                }
                gf.doAjax({
                    url: `/receipt/main/execute.shtml?paperid=${currentPaperid()}`,
                    success: function (data) {
                        data = JSON.parse(data);
                        layer.msg(data.msg);
                        if (data.code >= 0) {
                            setCurrentPaperid("");
                            window.location.reload();
                        }
                    }
                });
            },
            cancel: function () {
                if (!currentPaperid()) {
                    layer.msg("没有生成对应入库单，不能进行取消操作！");
                    return;
                }
                if (window.confirm("取消操作将删除当前正在操作的入库单，是否继续？")) {
                    gf.doAjax({
                        url: `/receipt/main/deleteEntity.shtml?paperid=${currentPaperid()}`,
                        success: function (data) {
                            data = JSON.parse(data);
                            layer.msg(data.msg);
                            if (data.code >= 0) {
                                setCurrentPaperid("");
                                window.location.reload();
                            }
                        }
                    });
                }
            },
            suEnter: function () {
                $("#tu").focus();
            },
            tuEnter: function () {
                vm.sub();
            },
            sub: function () {
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
                if (currentPaperid()) {
                    gf.doAjax({
                        url: `/receipt/detail/addItem.shtml?paperid=${currentPaperid()}`,
                        data: { item: su, userdef3: tu },
                        success: function (data) {
                            layer.msg(data + ":su:" + su + ",tu:" + tu);
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
        },
    });
}