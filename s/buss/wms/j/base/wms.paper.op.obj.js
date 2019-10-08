import { gf } from "/s/buss/g/j/g.f.js";
import { gotoRfMgr, currentShipmentPaperid, setCurrentShipmentPaperid } from "/s/buss/wms/rf/j/rf.main.js";

var _tasktype = null;

class PaperOp {
    del(that) {
        var cbox = gf.checkNotNull("paperid");
        if (!cbox) { return; }
        layer.confirm(`是否${that.name}${cbox}？`, function (index) {
            gf.ajax(that.url, { paperids: cbox.join(",") }, "json", function (s) {
                layer.msg(s.msg);
                window.datagrid.loadData();
            });
        });
    }; edit(that) {
        var cbox = gf.checkOnlyOne("paperid");
        if (!cbox) { return; }

        let url = `/${_tasktype}/main/findOneData.shtml`;
        gf.ajax(url, { paperid: cbox }, "json", function (s) {
            if (!s.object) {
                layer.msg(`该单无法${that.name}！`);
                return;
            }
            let main = s.object.main;
            if (!main || (main["status"] != "1") || main["delflag"] != "0") {
                layer.msg(`该单无法${that.name}！`);
                return;
            }
            window.pageii = layer.open({
                title: `${that.name}：` + cbox,
                type: 2,
                area: localStorage.layerArea.split(","),
                content: that.url + "?paperid=" + cbox
            });
        });
    }; picking(that) {
        var cbox = gf.checkOnlyOne("paperid");
        if (!cbox) { return; }

        let url = `/${_tasktype}/main/findOneData.shtml`;
        gf.ajax(url, { paperid: cbox }, "json", function (s) {
            if (!s.object) {
                layer.msg(`该单无法${that.name}！`);
                return;
            }
            let main = s.object.main;
            if (!main || (main["status"] != "TAKED" && main["status"] != "SCANED") || main["delflag"] != "0") {
                layer.msg(`该单无法${that.name}！`);
                return;
            }
            window.pageii = layer.open({
                title: `${that.name}：` + cbox,
                type: 2,
                area: localStorage.layerArea.split(","),
                content: that.url + "?paperid=" + cbox
            });
        });
    }; add(that) {
        window.pageii = layer.open({
            title: `${that.name}`,
            type: 2,
            area: localStorage.layerArea.split(","),
            content: that.url
        });
    }; detail(that) {
        var cbox = gf.checkOnlyOne("paperid");
        if (!cbox) { return; }
        window.pageii = layer.open({
            title: `${that.name}：` + cbox,
            type: 2,
            area: localStorage.layerArea.split(","),
            content: that.url + cbox
        });
    }; gotoRfShipment(that) {
        window.pageii = layer.open({
            title: `${that.name}`,
            type: 2,
            area: localStorage.layerArea.split(","),
            content: that.url
        });
    }; doJob(param, that, callback) {
        var paperid;
        if (that.paperid) {
            paperid = that.paperid;
        } else {
            paperid = gf.checkOnlyOne("paperid");
        }
        if (!paperid) { return; }
        layer.confirm(`是否${that.name}${paperid}？`, function (index) {
            gf.ajax(that.url, { paperid: paperid }, "json", function (s) {
                if (s.code >= 0) {
                    layer.msg(`成功${that.name}！`);
                    if (window.datagrid) window.datagrid.loadData();
                    else if (parent.datagrid) parent.datagrid.loadData();
                    if (callback) { callback(paperid); }
                } else {
                    layer.msg(`${that.name}失败！` + s.msg);
                }
            });
        });
    }; send(that) {
        paperOp.doJob("send", that);
    }; execute(that) {
        paperOp.doJob("execute", that);
    }; over(that) {
        paperOp.doJob("over", that, function (paperid) {
            if (paperid == currentShipmentPaperid()) {
                setCurrentShipmentPaperid("");
            }
            if (parent && parent.layer) { parent.layer.close(parent.pageii); }
        });
    }; cancel(that) {
        paperOp.doJob("cancel", that);
    }; taked(that) {
        if (currentShipmentPaperid()) {
            let msg = function () {
                return ("当前有出库单尚未完成处理，是否前去处理？" + currentShipmentPaperid())
            };
            layer.confirm(msg(), {
                btn: ['是', '否，仍然接单']
            }, function () {
                gotoRfMgr("shipment");
            }, function () {
                paperOp.doJob("taked", that, function (paperid) {
                    setCurrentShipmentPaperid(paperid);
                });
            });
        } else {
            paperOp.doJob("taked", that, function (paperid) {
                setCurrentShipmentPaperid(paperid);
            });
        }
    }; whichAgv(that) {
        var cbox = gf.checkOnlyOne("paperid");
        if (!cbox) { return; }
        gf.ajax(that.url, { key: cbox + "%" }, "json", function (s) {
            var info = "";
            for (var item of s) {
                info = info + item.key + ":" + item.value + "<br/>";
            }
            if (!info) { info = "未找到执行信息！"; }
            layer.msg(info);
        });
    }; whichOne(that) {
        var cbox = gf.checkOnlyOne("json");
        if (!cbox) { return; }
        var info = "";
        if (cbox) {
            Object.keys(cbox).forEach(function (key) {
                info = info + key + ":" + cbox[key] + "<br/>";
            });
        }
        if (!info) { info = "未找到相关信息！"; }
        layer.msg(info);
    }; import(that) {
        var info = "";
        if (!info) { info = "未找到相关信息！"; }
        layer.msg(info);
    }
}

var paperOp = new PaperOp();

var doInitPaperOp = function (tasktype) {
    _tasktype = tasktype;
}

export { doInitPaperOp, paperOp };