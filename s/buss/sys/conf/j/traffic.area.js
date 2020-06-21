import { gf } from "/s/buss/g/j/g.f.js";
import { gv } from "/s/buss/g/j/g.v.js";
import { dataGrid } from "/s/j/kf.grid.js";
import "/s/buss/sys/lap/j/lap.info.edit.name.js";

let _columns = [{
    colkey: "key",
    name: "key",
    hide: true,
}, {
    colkey: "key",
    name: "关键字",
    renderData: function (rowindex, data, rowdata, column) {
        return data;
    }
}, {
    colkey: "value",
    name: "内容",
    renderData: function (rowindex, data, rowdata, column) {
        return data;
    }
}, {
    colkey: "delflag",
    name: "是否删除",
    hide: true,
    renderData: function (rowindex, data, rowdata, column) {
        if (data == "1") {
            $("tr[d-tree='" + rowdata.dtee + "']").css("color", "#dcdcdc");
            return "已删除";
        } else {
            return "使用中";
        }
    }
}];

window.datagrid = dataGrid({
    pagId: 'paging',
    columns: _columns,
    jsonUrl: `/app/conf/findByPage.shtml`,
    checkbox: false,
    serNumber: true,
    pageSize: 10,
    data: { "TABLE_KEY": "agv_cross_lock_objs", "ORDER_BY_KEY": "key" }
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

let add = (that) => {
    window.pageii = layer.open({
        title: `${that.name}`,
        type: 2,
        area: gf.layerArea(),
        content: that.url
    });
};
let btnAdd = {
    url: `/s/buss/wms/h/AddUI.html`,
    id: "add", name: "增加", class: "btn-primary",
    bind: function () {
        add(this);
    },
};
let tempBtns = [btnAdd];
gf.bindBtns("div.doc-buttons", tempBtns);