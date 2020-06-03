import { gf } from "/s/buss/g/j/g.f.js";
import { gv } from "/s/buss/g/j/g.v.js";
import { dataGrid } from "/s/j/kf.grid.js";
import "/s/buss/sys/lap/j/lap.info.edit.name.js";
import { getInput } from "/s/buss/g/j/g.input.render.js";

let _columns = [{
    colkey: "id",
    name: "id",
    hide: true,
}, {
    colkey: "key",
    name: "时间",
    renderData: function (rowindex, data, rowdata, column) {
        return data;
    }
}, {
    colkey: "value",
    name: "任务信息",
    renderData: function (rowindex, data, rowdata, column) {
        try {
            let json = JSON.parse(data);
            if (json instanceof Array) {
                for (let item of json) {
                    console.log(item);
                }
                return "json_Array配置";
            } else if (json instanceof Object) {
                let info = "";
                info += "类型：" + json.tasktype + ";";
                let jsonTo = json.to;
                info += "路线:";
                let path = [];
                for (let item of jsonTo) {
                    path.push(item.name + "[" + gv.get("ARRIVED_SITE_ACT_TYPE", item.arrivedact) + "]");
                }
                info += path.join("->");
                return info;
            }
        } catch (error) {
        }
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
    refreshTime: 3000,
    data: { "TABLE_KEY": "AGV_CACHED_TASK", "ORDER_BY_KEY": "key" }
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