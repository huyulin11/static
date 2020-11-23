import { gf } from "/s/buss/g/j/g.f.js";

export let tempBtns = [{
    id: "add", name: "新增", class: "btn-info",
    bind: function () {
        add(this);
    }
},/*{
    url: `/app/conf/del.shtml`,
    id: "del", name: "删除", class: "btn-danger",
    bind: function () {
		del(this);
    },
 },*/{
    id: "show", name: "显示", class: "btn-show",
    bind: function () {
        
    }
}];
// let del = (that) => {
//     var cbox = gf.checkOnlyOne("key");
//     if (!cbox) { return; }
//     layer.confirm(`是否${that.name}${cbox}？`, function (index) {
//         gf.doAjax({
//             url: that.url, type: "POST",
//             data: { table: "TASK_SITE_LOCATION", key: cbox }
// 		});
//     });
// }
let add = (that) => {
    layer.prompt({ title: '输入id', formType: 0 }, function (key, index1) {
        layer.close(index1);
        layer.prompt({ title: '输入x', formType: 0 }, function (x1, index2) {
            layer.close(index2);
            layer.prompt({ title: '输入y', formType: 0 }, function (y1, index3) {
                if (window.confirm(`确定新增id：${key},${x1},${y1}？`)) {
                    layer.close(index3);
                    let id = key;
                    let x = x1;
                    let y = y1;
                    let value = { id, x, y };
                    let text = JSON.stringify(value);
                    gf.doAjax({
                        url: `/app/conf/set.shtml`, type: "POST",
                        data: { table: "TASK_SITE_LOCATION", key: id, value: text }
                    });
                }
            })
        })
    });
}
gf.bindBtns("div.doc-buttons", tempBtns);
