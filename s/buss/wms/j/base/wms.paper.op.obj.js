import { gf } from "/s/buss/g/j/g.f.js";
import { gv } from "/s/buss/g/j/g.v.js";
import { currentShipmentPaperid, setCurrentShipmentPaperid } from "/s/buss/wms/rf/j/rf.main.js";

var _tasktype = null;

let _receipttype = gf.urlParam("receipttype");

export var btns = {};
var initBtns = function () {
    btns.add = {
        url: `/s/buss/wms/h/${_tasktype}AddUI.html?receipttype=${_receipttype}`,
        id: "add", name: "增加", class: "btn-primary",
        bind: function () {
            paperOp.add(this);
        },
    }; btns.detail = {
        url: `/s/buss/wms/h/${_tasktype}Details.html?${_tasktype}MainFormMap.paperid=`,
        id: "detail", name: "明细", class: "btn-primary",
        bind: function () {
            paperOp.detail(this);
        },
    }; btns.edit = {
        url: `/s/buss/wms/h/${_tasktype}AddUI.html`,
        id: "edit", name: "修改", class: "btn-warning",
        bind: function () {
            paperOp.edit(this);
        },
    }; btns.send = {
        url: `/${_tasktype}/main/send.shtml`,
        id: "send", name: "下达", class: "btn-warning",
        bind: function () {
            paperOp.doJob("send", this);
        },
    }; btns.execute = {
        url: `/${_tasktype}/main/execute.shtml`,
        id: "execute", name: "执行", class: "btn-warning",
        bind: function () {
            paperOp.doJob("execute", this);
        },
    }; btns.taked = {
        url: `/${_tasktype}/main/taked.shtml`,
        id: "taked", name: "接单", class: "btn-warning",
        bind: function () {
            paperOp.doJob("taked", this, function (paperid) {
                setCurrentShipmentPaperid(paperid);
            });
        },
    }; btns.over = {
        url: `/${_tasktype}/main/over.shtml`,
        id: "over", name: "结束", class: "btn-danger",
        bind: function () {
            paperOp.doJob("over", this, function (paperid) {
                if (paperid == currentShipmentPaperid()) {
                    setCurrentShipmentPaperid("");
                }
                if (parent && parent.layer) { parent.layer.close(parent.pageii); }
            });
        },
    }; btns.del = {
        url: `/${_tasktype}/main/deleteEntity.shtml`,
        id: "del", name: "撤销", class: "btn-danger",
        bind: function () {
            paperOp.del(this);
        },
    }; btns.deleteSub = {
        url: `/${_tasktype}/main/deleteBySub.shtml`,
        id: "deleteSub", name: "提交撤销", class: "btn-danger",
        bind: function () {
            paperOp.doJob("deleteSub", this);
        },
    }; btns.deleteSure = {
        url: `/shipment/main/deleteBySure.shtml`,
        id: "deleteSure", name: "确定撤销", class: "btn-danger",
        bind: function () {
            paperOp.doDeleteSure(this);
        },
    }; btns.refresh = {
        id: "refresh", name: "刷新", class: "btn-info",
        bind: function () {
            window.datagrid.loadData();
        },
    }; btns.callShipmentFromCold = {
        url: `/agv/huirui/callShipmentFromCold.shtml`,
        id: "callShipmentFromCold", name: "呼叫料架", class: "btn-info",
        bind: function () {
            var cbox = gf.checkOnlyOne("userdef3");
            if (!cbox) { return; }
            let that = this;
            let work = function (index) {
                gf.ajax(that.url, { key: cbox }, "json", function (s) {
                    var layerMsg = "下发呼叫指令成功！"
                    if (s.msg)
                        layerMsg = s.msg;
                    gf.layerMsg(layerMsg);
                });
            }
            layer.confirm(`对${cbox}，确定呼叫AGV送出料架？`, function (index) { work(index); });
        },
    }; btns.backShipmentToCold = {
        url: `/agv/huirui/backShipmentToCold.shtml`,
        id: "backShipmentToCold", name: "料架返库", class: "btn-info",
        bind: function () {
            var cbox = gf.checkOnlyOne("userdef3");
            if (!cbox) { return; }
            let that = this;
            let work = function (index) {
                gf.ajax(that.url, { key: cbox }, "json", function (s) {
                    var layerMsg = "下发呼叫指令成功！"
                    if (s.msg)
                        layerMsg = s.msg;
                    gf.layerMsg(layerMsg);
                });
            }
            layer.confirm(`对${cbox}，确定让AGV送料架返库？`, function (index) { work(index); });
        },
    }; btns.whichAgv = {
        url: `/app/conf/get.shtml?table=task_agv`,
        id: "whichAgv", name: "执行AGV", class: "btn-info",
        bind: function () {
            var cbox = gf.checkOnlyOne("paperid");
            if (!cbox) { return; }
            gf.ajax(this.url, { key: cbox + "%" }, "json", function (s) {
                var info = "";
                for (var item of s) {
                    info = info + item.key + ":" + item.value + "<br/>";
                }
                if (!info) { info = "未找到执行信息！"; }
                gf.layerMsg(info);
            });
        },
    }; btns.inventoryResult = {
        id: "inventoryResult", name: "盘点结果", class: "btn-primary",
        bind: function () {
            var cbox = gf.checkOnlyOne("paperid");
            if (!cbox) { return; }
            this.url = `/s/buss/wms/h/inventory.result.list.html?paperid=${cbox}`;
            paperOp.layerOpen(this);
        },
    }; btns.whichOne = {
        id: "whichOne", name: "经办", class: "btn-info",
        bind: function () {
            var cbox = gf.checkOnlyOne("json");
            if (!cbox) { return; }
            var info = "";
            if (cbox) {
                Object.keys(cbox).forEach(function (key) {
                    info = info + key + ":" + cbox[key] + "<br/>";
                });
            }
            if (!info) { info = "未找到相关信息！"; }
            gf.layerMsg(info);
        },
    }; btns.stockOut = {
        url: `/s/buss/wms/h/shipmentMainMgr.html?status=2:TAKED:PICKED&type=RF${escape("出库")}`,
        id: "stockOut", name: "RF-出库", class: "btn-primary",
        bind: function () {
            window.location.href = this.url;
        },
    }; btns.receiptColdOne = {
        url: `/s/buss/wms/rf/h/rf.receipt.html?warehouse=2`,
        id: "receiptColdOne", name: "RF-冷库按单入库", class: "btn-warning",
        bind: function () {
            paperOp.receiptColdOne(this);
        },
    }; btns.receiptColdMore = {
        url: `/s/buss/wms/rf/h/rf.receipt.html?warehouse=2`,
        id: "receiptColdMore", name: "RF-冷库入库", class: "btn-warning",
        bind: function () {
            window.location.href = this.url;
        },
    }; btns.pickOne = {
        url: `/s/buss/wms/rf/h/rf.picking.html`,
        id: "pickOne", name: "RF-按单拣配", class: "btn-warning",
        bind: function () {
            paperOp.pickOne(this);
        },
    }; btns.back = {
        id: "back", name: "返回", class: "btn-info",
        bind: function () {
            window.history.back();
        },
    };
    let editSeq = function (seq) {
        return {
            resKey: "editSeq" + seq, id: "editSeq" + seq, name: seq == 1 ? "等级取消" : "优先级为" + seq,
            class: "btn-info", url: '/shipment/util/editSeq.shtml',
            bind: function () {
                paperOp.editSeq(this, seq);
            }
        }
    }
    let editSeqDetail = function (seq) {
        return {
            resKey: "editSeqDetail", id: "editSeqDetail", name: "顺序设置",
            class: "btn-info", url: '/shipment/util/editSeq.shtml',
            bind: function () {
                // paperOp.editSeq(this, seq, true);
                sessionStorage.editSeq = true;
                window.location.reload();
            }
        }
    }
    btns.editSeq1 = editSeq(1); btns.editSeq2 = editSeq(2); btns.editSeq3 = editSeq(3);
    btns.editSeqDetail = editSeqDetail(1);

    btns[`pick`] = {
        url: `/s/buss/wms/rf/h/rf.picking.html`,
        id: `pick`, name: `RF-拣配`, class: "btn-default",
        bind: function () {
            window.location.href = this.url;
        },
    }; btns[`combine`] = {
        url: `/s/buss/wms/rf/h/rf.combine.html`,
        id: `combine`, name: `RF-组盘`, class: "btn-default",
        bind: function () {
            window.location.href = this.url;
        },
    };

    for (let ware of gv.getT("WAREHOUSE")) {
        btns[`pick${ware.key}`] = {
            url: `/s/buss/wms/rf/h/rf.picking.html?warehouse=${ware.key}`,
            id: `pick${ware.key}`, name: `RF-${ware.value}拣配`, class: "btn-default",
            bind: function () {
                window.location.href = this.url;
            },
        };
    }
}

class PaperOp {
    del(that) {
        var cbox = gf.checkNotNull("paperid");
        if (!cbox) { return; }
        layer.confirm(`是否${that.name}${cbox}？`, function (index) {
            gf.ajax(that.url, { paperids: cbox.join(":") }, "json", function (s) {
                gf.layerMsg(s.msg);
                window.datagrid.loadData();
            });
        });
    }; edit(that) {
        var cbox = gf.checkOnlyOne("paperid");
        if (!cbox) { return; }

        let url = `/${_tasktype}/main/findOneData.shtml`;
        gf.ajax(url, { paperid: cbox }, "json", function (s) {
            if (!s.object) {
                gf.layerMsg(`该单无法${that.name}！`);
                return;
            }
            let main = s.object.main;
            if (!main || (main["status"] != "NEW") || main["delflag"] != "0") {
                gf.layerMsg(`该单无法${that.name}！`);
                return;
            }
            window.pageii = layer.open({
                title: `${that.name}：` + cbox,
                type: 2,
                area: gf.layerArea(),
                content: that.url + "?paperid=" + cbox
            });
        });
    }; pickOne(that) {
        var cbox = gf.checkOnlyOne("paperid");
        if (!cbox) { return; }

        let url = `/${_tasktype}/main/findOneData.shtml`;
        gf.ajax(url, { paperid: cbox }, "json", function (s) {
            if (!s.object) {
                gf.layerMsg(`该单无法${that.name}！`);
                return;
            }
            let main = s.object.main;
            if (!main || (main["status"] != "TOSEND" && main["status"] != "PICKING") || main["delflag"] != "0") {
                gf.layerMsg(`该单无法${that.name}！`);
                return;
            }
            window.location.href = that.url + "?paperid=" + cbox
        });
    }; receiptColdOne(that) {
        var cbox = gf.checkOnlyOne("paperid");
        if (!cbox) { return; }

        let url = `/${_tasktype}/main/findOneData.shtml`;
        gf.ajax(url, { paperid: cbox }, "json", function (s) {
            if (!s.object) {
                gf.layerMsg(`该单无法${that.name}！`);
                return;
            }
            let main = s.object.main;
            if (!main || (main["status"] != "NEW") || main["delflag"] != "0") {
                gf.layerMsg(`该单无法${that.name}！`);
                return;
            }
            window.location.href = that.url + "&paperid=" + cbox
        });
    }; add(that) {
        window.pageii = layer.open({
            title: `${that.name}`,
            type: 2,
            area: gf.layerArea(),
            content: that.url
        });
    }; layerOpen(that) {
        window.pageii = layer.open({
            title: `${that.name}`,
            type: 2,
            area: gf.layerAreaSmall(),
            content: that.url
        });
    }; detail(that) {
        var cbox = gf.checkOnlyOne("paperid");
        if (!cbox) { return; }
        window.pageii = layer.open({
            title: `${that.name}：` + cbox,
            type: 2,
            area: gf.layerArea(),
            content: that.url + cbox
        });
    }; doJob(param, that, callback) {
        var paperid;
        if (that.paperid) {
            paperid = that.paperid;
        } else {
            paperid = gf.checkOnlyOne("paperid");
        }
        if (!paperid) { return; }
        var lock = false;
        layer.confirm(`是否${that.name}${paperid}？`, function (index) {
            if (!lock) {
                lock = true;
                gf.ajax(that.url, { paperid: paperid }, "json", function (s) {
                    if (s.code >= 0) {
                        gf.layerMsg(`成功${that.name}！`);
                        if (window.datagrid) window.datagrid.loadData();
                        else if (parent.datagrid) parent.datagrid.loadData();
                        if (callback) { callback(paperid); }
                    } else {
                        gf.layerMsg(`${that.name}失败！` + s.msg);
                    }
                });
            }
        });
    }; doDeleteSure(that) {
        var detailid = gf.checkOnlyOne("id");
        var item = gf.checkOnlyOne("item");
        if (!detailid || !item) { return; }
        layer.prompt({ title: "请输入需撤销的SU信息" }, function (val, index) {
            layer.close(index);
            if (item == val) {
                layer.confirm(`是否${that.name}？`, function (index) {
                    gf.ajax(that.url, { detailid: detailid }, "json");
                });
            } else {
                layer.msg('SU校验失败！');
            }
        });
    }; editSeq(that, seq, detailFlag) {
        var json = {
            "sequence": seq
        };
        json.company = gf.checkOnlyOne("company");
        json.item = gf.checkOnlyOne("item", true);
        json.userdef4 = gf.checkOnlyOne("userdef4", true);
        if (!json.company) { return; }
        if (detailFlag) {
            layer.prompt({ title: "请输入需要调整的顺序" }, function (target, index) {
                if (!target || isNaN(target) || target < 0 || target >= 100) {
                    gf.layerMsg("提交内容应为大于0小于100的数值！");
                    return;
                }
                json.detailSeq = target;
                json.type = "BY_SU";
                gf.ajax(that.url, json, "json");
                layer.close(index);
            });
        } else {
            layer.confirm('选择修改的类型', {
                btn: ['按单号', '按SU'],
                btn1: function () {
                    layer.confirm(`是否确定提交操作？`, function (index) {
                        json.type = "BY_PAPER";
                        gf.ajax(that.url, json, "json");
                    });
                },
                btn2: function () {
                    layer.confirm(`是否确定提交操作？`, function (index) {
                        json.type = "BY_SU";
                        gf.ajax(that.url, json, "json");
                    });
                },
            });
        }
    }
}

var paperOp = new PaperOp();

var doInitPaperOp = function (tasktype) {
    _tasktype = tasktype;
    initBtns();
}

var overPaper = function (paperid) {
    let obj = {};
    Object.assign(obj, btns.over, { paperid: paperid });
    paperOp.over(obj);
}

export { doInitPaperOp, paperOp, overPaper };