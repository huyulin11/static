import { gf } from "/s/buss/g/j/g.f.js";
import { gv } from "/s/buss/g/j/g.v.js";
import { getInput } from "/s/buss/g/j/g.input.render.js";
import { dataGrid } from "/s/j/kf.grid.js";
import "/s/buss/sys/lap/j/lap.info.edit.name.js";

let param = "browser_params";

let _columns = [{
    colkey: "id",
    name: "id",
    hide: true,
}, {
    colkey: "name",
    name: "名称",
}, {
    colkey: "item",
    name: "当前值",
    renderData: function (rowindex, data, rowdata, column) {
        let col = {
            name: "值", key: "item", notnull: true, type: "input",
        };
        let json = { item: data, fresh: rowdata.fresh };
        let html = getInput(col, { value: localStorage[data] || '--', width: '50%', });
        let btnStr = `<button type="button" class="edit btn btn-primary marR10" ${gf.jsonToLabelData(json)}>保存</button>`;
        $(html).append(btnStr);
        return html;
    }
}];

$("#paging").delegate(".edit", "click", function (e) {
    let item = $(this).data("item");
    let fresh = $(this).data("fresh");
    let targetVal = $(this).parents("td").find("input#item").val();
    if (localStorage[item] == targetVal) { gflayer.parentMsg("无修改！"); return; }
    if (window.confirm(`确认修改(确认后页面将全部刷新)？`)) {
        localStorage[item] = targetVal;
        gflayer.parentMsg("修改完成！");
        setTimeout(() => {
            if (fresh) { parent.location.reload(); }
        }, 2000);
    }
});

let datas = [{ name: "表格高度", item: "gridHeight", fresh: true }];
window.datagrid = dataGrid({
    pagId: 'paging',
    columns: _columns,
    jsonDatas: datas,
    checkbox: false,
    serNumber: true,
    pageSize: 10,
    fenyeInTail: true,
    data: { "TABLE_KEY": param, "ORDER_BY_KEY": "key" }
});

let doSearch = function () {
    var searchParams = $("#searchForm").serialize();
    window.datagrid.setOptions({
        data: searchParams
    });
}

$("#search").on("click", function () {
    doSearch();
});

$("#searchForm").on("submit", function () {
    doSearch();
    return false;
});