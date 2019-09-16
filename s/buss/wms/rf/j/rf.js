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
            initReceipt: function () {
                $(container).find("#startReceipt").on("click", function () {
                    vm.startReceipt();
                });

                $(container).find("#sub").on("click", function () {
                    vm.sub();
                });

                $(container).find("#back").on("click", function () {
                    if (parent.pageii) {
                        parent.layer.close(parent.pageii);
                    } else {
                        window.location.href = "/s/buss/wms/rf/h/rfMgr.html";
                    }
                });

                if (localStorage.receiptPaperId) {
                    $(container).find("h1").each(function () {
                        $(this).html($(this).html() + localStorage.receiptPaperId);
                    });
                }
                $("#su").focus();
            },
            initMain: function () {
                $("#rootContainer").find("#logout").on("click", function () {
                    window.location.href = "/logout.shtml";
                });
                $("#rootContainer").find("button[id!='logout']").on("click", function () {
                    gf.layerOpen({ content: `/s/buss/wms/rf/h/${$(this).attr('id')}.html` });
                });
            },
            startReceipt: function () {
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