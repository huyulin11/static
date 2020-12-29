import { sku } from "/s/buss/wms/sku/info/j/wms.sku.js";
import { getSingleTask } from "/s/buss/acs/g/j/singletask.js";
import { allocOp } from "/s/buss/wms/alloc/item/j/alloc.op.js";
import { gf } from "/s/buss/g/j/g.f.js";

$("table.alloc").delegate("button.item", "click", function () {
    let _key = $(this).data('key');
    window.pageii = gf.layerOpen({
        title: "编辑",
        type: 2,
        content: `/s/buss/crm/client/client.add.html?key=${_key}`
    });
});

$("table.alloc").delegate(".delete", "click", function (e) {
    let _key = $(this).data("key");
    layer.confirm(`确认删除该联系人？（${$(this).data("姓名")}-${$(this).data("电话")}）`, {
        btn: ['确定', '取消'],
        btn1: function () {
            gf.doAjax({
                url: `/app/conf/del.shtml`, type: "POST",
                data: { table: "CRM_CLIENTS", key: _key }
            });
        },
    });
});