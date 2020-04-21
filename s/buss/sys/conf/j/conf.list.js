import { gf } from "/s/buss/g/j/g.f.js";
import { gv } from "/s/buss/g/j/g.v.js";
import { dataGrid } from "/s/j/kf.grid.js";
import "/s/buss/sys/lap/j/lap.info.edit.name.js";

let tempBtns = [{
    id: "back", name: "返回", class: "btn-info",
    bind: function () {
        window.history.back();
    }
}];
gf.bindBtns("div.doc-buttons", tempBtns);

let _type = gf.urlParam("type");
let _columns = [{
    colkey: "id",
    name: "id",
    hide: true,
}, {
    colkey: "key",
    name: "名称",
    renderData: function (rowindex, data, rowdata, column) {
        return data;
        // return "<div class='changable'>" + "<span>" + data + "</span>" + "&nbsp;&nbsp;&nbsp;&nbsp;"
        // 	+ "<a class='editLapName'><img src='/s/i/edit.png'/></a>" + "</div>";
    }
}, {
    colkey: "value",
    name: "值",
    renderData: function (rowindex, data, rowdata, column) {
        return data;
    }
}, {
    colkey: "delflag",
    name: "是否删除",
    renderData: function (rowindex, data, rowdata, column) {
        if (data == "1") {
            $("tr[d-tree='" + rowdata.dtee + "']").css("color", "#dcdcdc");
            return "已删除";
        } else {
            return "使用中";
        }
    }
}];

if (_type == 'PROD_LINE') {
    let op = {
        colkey: "status",
        name: "状态",
        renderData: function (rowindex, data, rowdata, column) {
            if (rowdata.delflag == "1") {
                return gv.get("LAP_STATUS", data);
            }
            if (!data) { data = "NORMAL"; }
            let json = { id: rowdata.id, name: rowdata.name };
            let btnStr = `<button type="button" class="edit btn btn-primary marR10" ${gf.jsonToLabelData(json)}>保存</button>`;
            return gv.select("LAP_STATUS", data) + btnStr;
        }
    };
    _columns = _columns.concat(op);
}

window.datagrid = dataGrid({
    pagId: 'paging',
    columns: _columns,
    jsonUrl: `/app/conf/findByPage.shtml`,
    checkbox: false,
    serNumber: true,
    data: { "TABLE_KEY": "CONF_KEY", "key": "EXPIRE_TIME" }
});

$("#paging").delegate(".edit", "click", function (e) {
    let id = $(this).data("id");
    let name = $(this).data("name");
    let targetVal = $(this).parent("td").find("select").val();
    let target = $(this).parent("td").find("select").find("option:selected").text();
    if (window.confirm(`是否要改变${name}的状态为${target}？`)) {
        gf.doAjax({
            url: `/sys/lap/bjjk/huirui/editStatus.shtml`,
            data: { id: id, status: targetVal }
        });
    }
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