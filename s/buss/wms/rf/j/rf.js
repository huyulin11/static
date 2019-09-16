import { gf } from "/s/buss/g/j/g.f.js";
import "/s/j/vue/vue.min.js";

let container = "#rootContainer";
let _type = null;

export var initRf = function (type) {
    _type = type;

    var vm = new Vue({
        data: {},
        el: container,
        created: function () {
        },
        mounted: function () {
            if (_type == "receipt") {
                this.initReceipt();
            } else if (_type == "main") {
                this.initMain();
            }
            gf.resizeTable();
        },
        methods: {
            initMain: function () {
                $("#rootContainer").find("#logout").on("click", function () {
                    window.location.href = "/logout.shtml";
                });
                $("#rootContainer").find("button[id!='logout']").on("click", function () {
                    gf.layerOpen({ content: `/s/buss/wms/rf/h/${$(this).attr('id')}.html` });
                });
            },
            initReceipt: function () {
                $(container).find("#start").on("click", function () { vm.start(); });
                $(container).find("#sub").on("click", function () { vm.sub(); });
                $(container).find("#cancel").on("click", function () { vm.cancel(); });
                $(container).find("#back").on("click", function () { vm.backMain(); });
                $(container).find("#execute").on("click", function () { vm.execute(); });

                if (localStorage.receiptPaperId) {
                    let url = `/receipt/main/findOneData.shtml`;
                    gf.ajax(url, { paperid: localStorage.receiptPaperId }, "json", function (s) {
                        let main = s.object.main;
                        if (main["status"] != "1" || main["delflag"] != "0") {
                            layer.msg(localStorage.receiptPaperId + "该单无法继续操作，如需查看请移步入库单管理！");
                            localStorage.receiptPaperId = "";
                            return;
                        } else {
                            $(container).find("h1").each(function () {
                                $(this).html("正在入库" + localStorage.receiptPaperId);
                            });
                        }
                    });
                }
                $("#su").focus();
            },
            start: function () {
                if (localStorage.receiptPaperId) {
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
                            localStorage.receiptPaperId = data.object;
                            window.location.reload();
                        }
                    }
                });
            },
            execute: function () {
                if (!localStorage.receiptPaperId) {
                    layer.msg("没有生成对应入库单，不能进行执行操作！");
                    return;
                }
                gf.doAjax({
                    url: `/receipt/main/execute.shtml?paperid=${localStorage.receiptPaperId}`,
                    success: function (data) {
                        data = JSON.parse(data);
                        layer.msg(data.msg);
                        if (data.code >= 0) {
                            localStorage.receiptPaperId = "";
                            window.location.reload();
                        }
                    }
                });
            },
            cancel: function () {
                if (!localStorage.receiptPaperId) {
                    layer.msg("没有生成对应入库单，不能进行取消操作！");
                    return;
                }
                if (window.confirm("取消操作将删除当前正在操作的入库单，是否继续？")) {
                    gf.doAjax({
                        url: `/receipt/main/deleteEntity.shtml?paperid=${localStorage.receiptPaperId}`,
                        success: function (data) {
                            data = JSON.parse(data);
                            layer.msg(data.msg);
                            if (data.code >= 0) {
                                localStorage.receiptPaperId = "";
                                window.location.reload();
                            }
                        }
                    });
                }
            },
            backMain: function () {
                if (parent.pageii) {
                    parent.layer.close(parent.pageii);
                } else {
                    window.location.href = "/s/buss/wms/rf/h/rfMgr.html";
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
                if (localStorage.receiptPaperId) {
                    gf.doAjax({
                        url: `/receipt/detail/addItem.shtml?paperid=${localStorage.receiptPaperId}`,
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