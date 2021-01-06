import { gf } from "/s/buss/g/j/g.f.js?f=crmv000001";
import { gflayer } from "/s/buss/g/j/g.f.layer.js";
import { renderModel } from "/s/buss/g/j/g.banner.control.js?f=crmv000001";
import { ITEM_LOGIN } from "/s/buss/acs/FANCY/j/acs.control.conf.js?f=crmv000001";

let layerArea = () => {
    if (gf.isPc()) { return ["95%", "90%"]; }
    else { return ["99%", "99%"]; }
};
window.layerArea = layerArea;

let confs = [ITEM_LOGIN];
confs.push({ type: "LAYER", area: layerArea, url: "/s/buss/crm/client/client.add.html", key: 'add', target: 'div#addContainer', height: "90%", width: "90%" });
renderModel(confs);


$("div#target").delegate("button.item", "click", function () {
    let _key = $(this).data('key');
    window.pageii = gflayer.open({
        area: layerArea(),
        title: "编辑",
        type: 2,
        content: `/s/buss/crm/client/client.add.html?key=${_key}`
    });
});

$("div#target").delegate(".delete", "click", function (e) {
    let _key = $(this).data("key");
    layer.confirm(`确认删除该联系人？（${$(this).data("姓名")}-${$(this).data("电话")}）`, {
        btn: ['确定', '取消'],
        btn1: function () {
            gf.doAjax({
                url: `/app/conf/delByLogic.shtml`, type: "POST",
                data: { table: "CRM_CLIENTS", key: _key },
                whenSuccess: () => {
                    gf.refreshEvent();
                }
            });
        },
    });
});